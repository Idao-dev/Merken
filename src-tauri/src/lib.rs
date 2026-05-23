use serde::Serialize;
use std::sync::{Arc, Mutex};
use std::{thread, time::Duration};
use tauri::{
    Emitter,
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager, Runtime, State, WebviewWindow, WindowEvent,
};

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct ActiveApp {
    process_name: Option<String>,
    title: Option<String>,
    sheet_id: Option<String>,
}

struct PanelState {
    keep_visible: Mutex<bool>,
}

struct ActiveAppState {
    last_active_app: Arc<Mutex<Option<ActiveApp>>>,
}

#[tauri::command]
fn get_active_app(state: State<'_, ActiveAppState>) -> ActiveApp {
    active_window::read_remembered_active_app(&state.last_active_app)
}

#[tauri::command]
fn set_tray_language(app: tauri::AppHandle, language: String) -> tauri::Result<()> {
    if let Some(tray) = app.tray_by_id("main") {
        tray.set_menu(Some(create_tray_menu(&app, &language)?))?;
    }

    Ok(())
}

#[tauri::command]
fn set_panel_keep_visible(state: State<'_, PanelState>, keep_visible: bool) {
    if let Ok(mut value) = state.keep_visible.lock() {
        *value = keep_visible;
    }
}

#[tauri::command]
fn start_native_drag(window: WebviewWindow) -> tauri::Result<()> {
    window.start_dragging()
}

#[tauri::command]
fn hide_current_window(window: WebviewWindow) -> tauri::Result<()> {
    window.hide()
}

#[tauri::command]
fn open_taskbar_settings() -> Result<(), String> {
    system_settings::open_taskbar_settings()
}

#[tauri::command]
fn open_latest_release() -> Result<(), String> {
    system_settings::open_url("https://github.com/Idao-dev/Merken/releases/latest")
}

#[tauri::command]
fn open_repository() -> Result<(), String> {
    system_settings::open_url("https://github.com/Idao-dev/Merken")
}

#[tauri::command]
fn show_shortcuts_placement(app: tauri::AppHandle) {
    show_shortcuts(&app, ShortcutsMode::Placement);
}

#[tauri::command]
fn show_settings_window(app: tauri::AppHandle) {
    show_settings(&app);
}

#[tauri::command]
fn hide_shortcuts(app: tauri::AppHandle) {
    if let Some(window) = app.get_webview_window("shortcuts") {
        let _ = window.hide();
    }
}

pub fn run() {
    tauri::Builder::default()
        .manage(PanelState {
            keep_visible: Mutex::new(false),
        })
        .manage(ActiveAppState {
            last_active_app: Arc::new(Mutex::new(None)),
        })
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            show_shortcuts(app, ShortcutsMode::Shortcuts);
        }))
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            None,
        ))
        .setup(|app| {
            create_tray(app)?;
            let active_app_state = app.state::<ActiveAppState>();
            active_window::start_foreground_watcher(active_app_state.last_active_app.clone());
            Ok(())
        })
        .on_window_event(|window, event| {
            if matches!(event, WindowEvent::Focused(false)) {
                if window.label() == "settings" {
                    let window = window.clone();
                    thread::spawn(move || {
                        thread::sleep(Duration::from_millis(140));
                        if !window.is_focused().unwrap_or(false) {
                            let _ = window.hide();
                        }
                    });
                    return;
                }

                if window.label() != "shortcuts" {
                    return;
                }

                let keep_visible = window
                    .state::<PanelState>()
                    .keep_visible
                    .lock()
                    .map(|value| *value)
                    .unwrap_or(false);

                if !keep_visible {
                    let _ = window.hide();
                }
            }
        })
        .invoke_handler(tauri::generate_handler![
            get_active_app,
            set_tray_language,
            set_panel_keep_visible,
            start_native_drag,
            hide_current_window,
            open_taskbar_settings,
            open_latest_release,
            open_repository,
            show_shortcuts_placement,
            show_settings_window,
            hide_shortcuts
        ])
        .run(tauri::generate_context!())
        .expect("error while running Merken");
}

fn create_tray<R: Runtime>(app: &tauri::App<R>) -> tauri::Result<()> {
    let menu = create_tray_menu(app, "fr")?;

    let mut tray = TrayIconBuilder::with_id("main")
        .tooltip("Merken")
        .menu(&menu)
        .show_menu_on_left_click(false)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "options" => show_settings(app),
            "quit" => app.exit(0),
            _ => {}
        })
        .on_tray_icon_event(|tray, event| {
            if let TrayIconEvent::Click {
                button: MouseButton::Left,
                button_state: MouseButtonState::Up,
                ..
            } = event
            {
                toggle_shortcuts(&tray.app_handle());
            }
        });

    if let Some(icon) = app.default_window_icon().cloned() {
        tray = tray.icon(icon);
    }

    tray.build(app)?;

    Ok(())
}

fn create_tray_menu<R: Runtime, M: Manager<R>>(app: &M, language: &str) -> tauri::Result<Menu<R>> {
    let (options_label, quit_label) = if language == "en" {
        ("Options", "Quit")
    } else {
        ("Options", "Quitter")
    };
    let options = MenuItem::with_id(app, "options", options_label, true, None::<&str>)?;
    let quit = MenuItem::with_id(app, "quit", quit_label, true, None::<&str>)?;

    Menu::with_items(app, &[&options, &quit])
}

enum ShortcutsMode {
    Shortcuts,
    Placement,
}

impl ShortcutsMode {
    fn as_str(&self) -> &'static str {
        match self {
            Self::Shortcuts => "shortcuts",
            Self::Placement => "placement",
        }
    }
}

fn toggle_shortcuts<R: Runtime>(app: &tauri::AppHandle<R>) {
    if let Some(window) = app.get_webview_window("shortcuts") {
        if window.is_visible().unwrap_or(false) {
            let _ = window.hide();
            return;
        }
    }

    show_shortcuts(app, ShortcutsMode::Shortcuts);
}

fn show_shortcuts<R: Runtime>(app: &tauri::AppHandle<R>, mode: ShortcutsMode) {
    if let Some(window) = app.get_webview_window("shortcuts") {
        let _ = window.emit("merken:shortcuts-mode", mode.as_str());
        let _ = window.show();
        let _ = window.set_focus();
    }
}

fn show_settings<R: Runtime>(app: &tauri::AppHandle<R>) {
    if let Some(window) = app.get_webview_window("settings") {
        let _ = window.show();
        let _ = window.set_focus();
    }
}

mod active_window {
    use super::ActiveApp;
    use std::sync::{Arc, Mutex, OnceLock};

    static ACTIVE_APP_TARGET: OnceLock<Arc<Mutex<Option<ActiveApp>>>> = OnceLock::new();

    pub fn read_active_app() -> ActiveApp {
        let (process_name, title) = platform_active_window();
        build_active_app(process_name, title)
    }

    pub fn read_remembered_active_app(target: &Arc<Mutex<Option<ActiveApp>>>) -> ActiveApp {
        if let Ok(value) = target.lock() {
            if let Some(active_app) = value.clone() {
                return active_app;
            }
        }

        read_active_app()
    }

    pub fn start_foreground_watcher(target: Arc<Mutex<Option<ActiveApp>>>) {
        let initial_app = read_active_app();
        remember_active_app(&target, initial_app);

        #[cfg(windows)]
        start_windows_foreground_watcher(target);

        #[cfg(not(windows))]
        let _ = target;
    }

    fn build_active_app(process_name: Option<String>, title: Option<String>) -> ActiveApp {
        let sheet_id = process_name.as_deref().and_then(map_process_to_sheet);

        ActiveApp {
            process_name,
            title,
            sheet_id: sheet_id.map(ToOwned::to_owned),
        }
    }

    fn remember_active_app(target: &Arc<Mutex<Option<ActiveApp>>>, active_app: ActiveApp) {
        if !is_trackable_user_app(&active_app) {
            return;
        }

        if let Ok(mut value) = target.lock() {
            *value = Some(active_app);
        }
    }

    fn is_trackable_user_app(active_app: &ActiveApp) -> bool {
        let process_name = match active_app.process_name.as_deref() {
            Some(process_name) => process_name.to_ascii_lowercase(),
            None => return false,
        };

        if matches!(
            process_name.as_str(),
            "merken.exe" | "shellexperiencehost.exe" | "startmenuexperiencehost.exe"
        ) {
            return false;
        }

        if process_name == "explorer.exe" {
            return active_app
                .title
                .as_deref()
                .map(is_file_explorer_title)
                .unwrap_or(false);
        }

        true
    }

    fn is_file_explorer_title(title: &str) -> bool {
        let normalized_title = title.trim().to_ascii_lowercase();

        !normalized_title.is_empty()
            && !matches!(
                normalized_title.as_str(),
                "program manager"
                    | "notification overflow"
                    | "system tray overflow"
                    | "taskbar"
                    | "barre des taches"
                    | "barre des tâches"
                    | "zone de notification"
                    | "icones cachees"
                    | "icônes cachées"
            )
    }

    fn map_process_to_sheet(process_name: &str) -> Option<&'static str> {
        match process_name.to_ascii_lowercase().as_str() {
            "excel.exe" => Some("excel-fr"),
            "winword.exe" => Some("word-fr"),
            "powerpnt.exe" => Some("powerpoint-fr"),
            "outlook.exe" => Some("outlook-fr"),
            _ => None,
        }
    }

    #[cfg(not(windows))]
    fn platform_active_window() -> (Option<String>, Option<String>) {
        (None, None)
    }

    #[cfg(windows)]
    fn platform_active_window() -> (Option<String>, Option<String>) {
        use windows::{
            Win32::{
                Foundation::CloseHandle,
                System::Threading::{OpenProcess, PROCESS_QUERY_LIMITED_INFORMATION},
                UI::WindowsAndMessaging::{
                    GetForegroundWindow, GetWindowThreadProcessId,
                },
            },
        };

        unsafe {
            let hwnd = GetForegroundWindow();
            if hwnd.0.is_null() {
                return (None, None);
            }

            let title = read_window_title(hwnd);
            let mut process_id = 0;
            GetWindowThreadProcessId(hwnd, Some(&mut process_id));

            if process_id == 0 {
                return (None, title);
            }

            let handle = match OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, false, process_id) {
                Ok(handle) => handle,
                Err(_) => return (None, title),
            };

            let process_name = read_process_name(handle);
            let _ = CloseHandle(handle);

            (process_name, title)
        }
    }

    #[cfg(windows)]
    fn start_windows_foreground_watcher(target: Arc<Mutex<Option<ActiveApp>>>) {
        use std::thread;

        if ACTIVE_APP_TARGET.set(target).is_err() {
            return;
        }

        thread::spawn(|| {
            use windows::Win32::UI::{
                Accessibility::{
                    SetWinEventHook, HWINEVENTHOOK,
                },
                WindowsAndMessaging::{
                    DispatchMessageW, GetMessageW, TranslateMessage, EVENT_SYSTEM_FOREGROUND, MSG,
                    WINEVENT_OUTOFCONTEXT,
                },
            };

            unsafe extern "system" fn foreground_event_callback(
                _hook: HWINEVENTHOOK,
                _event: u32,
                hwnd: windows::Win32::Foundation::HWND,
                _id_object: i32,
                _id_child: i32,
                _event_thread: u32,
                _event_time: u32,
            ) {
                if hwnd.0.is_null() {
                    return;
                }

                if let Some(target) = ACTIVE_APP_TARGET.get() {
                    let (process_name, title) = read_window_app(hwnd);
                    remember_active_app(target, build_active_app(process_name, title));
                }
            }

            unsafe {
                let hook = SetWinEventHook(
                    EVENT_SYSTEM_FOREGROUND,
                    EVENT_SYSTEM_FOREGROUND,
                    None,
                    Some(foreground_event_callback),
                    0,
                    0,
                    WINEVENT_OUTOFCONTEXT,
                );

                if hook.0.is_null() {
                    return;
                }

                let mut message = MSG::default();
                while GetMessageW(&mut message, None, 0, 0).into() {
                    let _ = TranslateMessage(&message);
                    DispatchMessageW(&message);
                }
            }
        });
    }

    #[cfg(windows)]
    unsafe fn read_window_title(hwnd: windows::Win32::Foundation::HWND) -> Option<String> {
        use windows::Win32::UI::WindowsAndMessaging::{GetWindowTextLengthW, GetWindowTextW};

        let length = GetWindowTextLengthW(hwnd);
        if length <= 0 {
            return None;
        }

        let mut buffer = vec![0u16; length as usize + 1];
        let written = GetWindowTextW(hwnd, &mut buffer);
        if written <= 0 {
            return None;
        }

        Some(String::from_utf16_lossy(&buffer[..written as usize]))
    }

    #[cfg(windows)]
    unsafe fn read_window_app(hwnd: windows::Win32::Foundation::HWND) -> (Option<String>, Option<String>) {
        use windows::Win32::{
            Foundation::CloseHandle,
            System::Threading::{OpenProcess, PROCESS_QUERY_LIMITED_INFORMATION},
            UI::WindowsAndMessaging::GetWindowThreadProcessId,
        };

        let title = read_window_title(hwnd);
        let mut process_id = 0;
        GetWindowThreadProcessId(hwnd, Some(&mut process_id));

        if process_id == 0 {
            return (None, title);
        }

        let handle = match OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, false, process_id) {
            Ok(handle) => handle,
            Err(_) => return (None, title),
        };

        let process_name = read_process_name(handle);
        let _ = CloseHandle(handle);

        (process_name, title)
    }

    #[cfg(windows)]
    unsafe fn read_process_name(handle: windows::Win32::Foundation::HANDLE) -> Option<String> {
        use std::path::Path;
        use windows::{
            core::PWSTR,
            Win32::System::Threading::{QueryFullProcessImageNameW, PROCESS_NAME_FORMAT},
        };

        let mut buffer = vec![0u16; 260];
        let mut size = buffer.len() as u32;

        if QueryFullProcessImageNameW(
            handle,
            PROCESS_NAME_FORMAT(0),
            PWSTR(buffer.as_mut_ptr()),
            &mut size,
        )
        .is_err()
        {
            return None;
        }

        let path = String::from_utf16_lossy(&buffer[..size as usize]);
        Path::new(&path)
            .file_name()
            .and_then(|name| name.to_str())
            .map(ToOwned::to_owned)
    }
}

mod system_settings {
    pub fn open_taskbar_settings() -> Result<(), String> {
        open_url("ms-settings:taskbar")
    }

    pub fn open_url(url: &str) -> Result<(), String> {
        #[cfg(windows)]
        {
            use windows::core::HSTRING;
            use windows::Win32::UI::{Shell::ShellExecuteW, WindowsAndMessaging::SW_SHOWNORMAL};

            let operation = HSTRING::from("open");
            let target = HSTRING::from(url);

            unsafe {
                let result = ShellExecuteW(None, &operation, &target, None, None, SW_SHOWNORMAL);

                if result.0 as isize <= 32 {
                    return Err(format!("Unable to open {}.", url));
                }
            }

            Ok(())
        }

        #[cfg(not(windows))]
        {
            let _ = url;
            Err("Opening system URLs is only available on Windows.".to_owned())
        }
    }
}
