use serde::Serialize;
use std::sync::{Arc, Mutex};
use std::{thread, time::Duration};
use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Emitter, Manager, PhysicalPosition, Runtime, State, WebviewWindow, WindowEvent,
};

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct ActiveApp {
    process_name: Option<String>,
    title: Option<String>,
    sheet_id: Option<String>,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct ShortcutsOpenRequest {
    mode: String,
    active_app: ActiveApp,
    preserve_position: bool,
}

struct PanelState {
    keep_visible: Mutex<bool>,
    shortcuts_request: Mutex<Option<ShortcutsOpenRequest>>,
    preview_request: Mutex<Option<ShortcutsOpenRequest>>,
}

struct ActiveAppState {
    last_active_app: Arc<Mutex<Option<ActiveApp>>>,
}

#[tauri::command]
fn get_active_app(state: State<'_, ActiveAppState>) -> ActiveApp {
    let active_app = active_window::read_remembered_or_current_active_app(&state.last_active_app);

    #[cfg(debug_assertions)]
    active_window::debug_log_active_app("get_active_app return", &active_app);

    active_app
}

#[tauri::command]
fn set_tray_language(app: tauri::AppHandle, language: String) -> tauri::Result<()> {
    if let Some(tray) = app.tray_by_id("main") {
        tray.set_menu(Some(create_tray_menu(&app, &language)?))?;
    }

    Ok(())
}

#[tauri::command]
fn set_panel_keep_visible(app: tauri::AppHandle, state: State<'_, PanelState>, keep_visible: bool) {
    if let Ok(mut value) = state.keep_visible.lock() {
        *value = keep_visible;
    };
    log_window_lifecycle(&app, format!("set keep_visible={keep_visible}"));
}

#[tauri::command]
fn get_shortcuts_open_request(
    window: WebviewWindow,
    state: State<'_, PanelState>,
) -> Option<ShortcutsOpenRequest> {
    let request = match window.label() {
        "shortcuts" => state
            .shortcuts_request
            .lock()
            .ok()
            .and_then(|value| value.clone()),
        "shortcuts-preview" => state
            .preview_request
            .lock()
            .ok()
            .and_then(|value| value.clone()),
        _ => None,
    };
    log_window_lifecycle(
        &window.app_handle(),
        format!(
            "get pending request label={} has_request={}",
            window.label(),
            request.is_some()
        ),
    );
    request
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
fn show_shortcuts_preview(
    app: tauri::AppHandle,
    sheet_id: String,
    preserve_position: Option<bool>,
) {
    let active_app = ActiveApp {
        process_name: None,
        title: None,
        sheet_id: Some(sheet_id),
    };

    show_shortcuts_with_active_app(
        &app,
        ShortcutsMode::Preview,
        active_app,
        preserve_position.unwrap_or(false),
    );
}

#[tauri::command]
fn show_settings_window(app: tauri::AppHandle) {
    show_settings(&app);
}

#[tauri::command]
fn hide_shortcuts(app: tauri::AppHandle) {
    hide_shortcuts_window(&app);
}

#[tauri::command]
fn hide_shortcuts_preview(app: tauri::AppHandle) {
    hide_shortcuts_preview_window(&app);
}

#[tauri::command]
fn position_shortcuts_preview_window(app: tauri::AppHandle) -> tauri::Result<()> {
    position_shortcuts_preview_if_ready(&app)
}

pub fn run() {
    tauri::Builder::default()
        .manage(PanelState {
            keep_visible: Mutex::new(false),
            shortcuts_request: Mutex::new(None),
            preview_request: Mutex::new(None),
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
                log_window_lifecycle(
                    &window.app_handle(),
                    format!("focus lost label={}", window.label()),
                );
                if window.label() == "settings" {
                    let settings = window.clone();
                    let app = window.app_handle().clone();
                    thread::spawn(move || {
                        thread::sleep(Duration::from_millis(140));
                        if should_keep_preview_pair_visible(&app) {
                            log_window_lifecycle(&app, "keep preview pair after settings blur");
                            return;
                        }

                        if !settings.is_focused().unwrap_or(false) {
                            log_window_lifecycle(
                                &app,
                                "hide settings + preview after settings blur",
                            );
                            let _ = settings.hide();
                            hide_shortcuts_preview_window(&app);
                        }
                    });
                    return;
                }

                if window.label() == "shortcuts-preview" {
                    let app = window.app_handle().clone();
                    thread::spawn(move || {
                        thread::sleep(Duration::from_millis(140));
                        if should_keep_preview_pair_visible(&app) {
                            log_window_lifecycle(&app, "keep preview pair after preview blur");
                            return;
                        }

                        log_window_lifecycle(&app, "hide settings + preview after preview blur");
                        hide_settings_window(&app);
                        hide_shortcuts_preview_window(&app);
                    });
                    return;
                }

                if window.label() != "shortcuts" {
                    return;
                }

                let shortcuts = window.clone();
                let app = window.app_handle().clone();
                thread::spawn(move || {
                    thread::sleep(Duration::from_millis(140));
                    let is_focused = shortcuts.is_focused().unwrap_or(false);
                    let keep_visible = is_panel_keep_visible(&app);

                    log_window_lifecycle(
                        &app,
                        format!(
                            "normal blur check focused={is_focused} keep_visible={keep_visible}"
                        ),
                    );

                    if should_hide_unfocused_shortcuts(is_focused, keep_visible) {
                        log_window_lifecycle(&app, "hide normal shortcuts after blur");
                        let _ = shortcuts.hide();
                    }
                });
            }
        })
        .invoke_handler(tauri::generate_handler![
            get_active_app,
            get_shortcuts_open_request,
            set_tray_language,
            set_panel_keep_visible,
            start_native_drag,
            hide_current_window,
            open_taskbar_settings,
            open_latest_release,
            open_repository,
            show_shortcuts_placement,
            show_shortcuts_preview,
            show_settings_window,
            hide_shortcuts,
            hide_shortcuts_preview,
            position_shortcuts_preview_window
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

#[derive(Clone, Copy, PartialEq, Eq)]
enum ShortcutsMode {
    Shortcuts,
    Placement,
    Preview,
}

impl ShortcutsMode {
    fn as_str(&self) -> &'static str {
        match self {
            Self::Shortcuts => "shortcuts",
            Self::Placement => "placement",
            Self::Preview => "preview",
        }
    }
}

fn toggle_shortcuts<R: Runtime>(app: &tauri::AppHandle<R>) {
    if let Some(window) = app.get_webview_window("shortcuts") {
        if window.is_visible().unwrap_or(false) {
            hide_shortcuts_window(app);
            return;
        }
    }

    show_shortcuts(app, ShortcutsMode::Shortcuts);
}

fn show_shortcuts<R: Runtime>(app: &tauri::AppHandle<R>, mode: ShortcutsMode) {
    let active_app_state = app.state::<ActiveAppState>();
    let active_app =
        active_window::read_remembered_or_current_active_app(&active_app_state.last_active_app);

    #[cfg(debug_assertions)]
    {
        active_window::debug_log_show_shortcuts_snapshot(
            &active_app_state.last_active_app,
            mode.as_str(),
        );
        active_window::debug_log_active_app("show_shortcuts payload", &active_app);
    }

    show_shortcuts_with_active_app(app, mode, active_app, false);
}

fn show_shortcuts_with_active_app<R: Runtime>(
    app: &tauri::AppHandle<R>,
    mode: ShortcutsMode,
    active_app: ActiveApp,
    preserve_position: bool,
) {
    set_shortcuts_keep_visible(app, matches!(mode, ShortcutsMode::Placement));
    hide_inactive_shortcuts_window(app, mode);

    if let Some(window) = app.get_webview_window(shortcuts_window_label(mode)) {
        let request = build_shortcuts_open_request(mode, active_app, preserve_position);
        let is_visible = window.is_visible().unwrap_or(false);
        log_window_lifecycle(
            app,
            format!(
                "open request mode={} target={} visible={} preserve_position={}",
                mode.as_str(),
                window.label(),
                is_visible,
                preserve_position
            ),
        );
        if should_stage_shortcuts_before_open(mode, is_visible) {
            stage_shortcuts_before_open(&window);
        } else if should_position_preview_before_show(mode, is_visible) {
            let _ = position_shortcuts_preview_if_ready(app);
        }

        set_shortcuts_open_request(app, mode, Some(request.clone()));
        match window.show() {
            Ok(()) => log_window_lifecycle(app, format!("show target={}", window.label())),
            Err(error) => log_window_lifecycle(
                app,
                format!("show failed target={} error={error}", window.label()),
            ),
        }
        if should_focus_after_show(mode) {
            match window.set_focus() {
                Ok(()) => log_window_lifecycle(app, format!("focus target={}", window.label())),
                Err(error) => log_window_lifecycle(
                    app,
                    format!("focus failed target={} error={error}", window.label()),
                ),
            }
        }
        match window.emit("merken:shortcuts-open-request", request) {
            Ok(()) => log_window_lifecycle(app, format!("emit open target={}", window.label())),
            Err(error) => log_window_lifecycle(
                app,
                format!("emit open failed target={} error={error}", window.label()),
            ),
        }
    }
}

fn shortcuts_window_label(mode: ShortcutsMode) -> &'static str {
    match mode {
        ShortcutsMode::Preview => "shortcuts-preview",
        ShortcutsMode::Shortcuts | ShortcutsMode::Placement => "shortcuts",
    }
}

fn inactive_shortcuts_window_label(mode: ShortcutsMode) -> &'static str {
    match mode {
        ShortcutsMode::Preview => "shortcuts",
        ShortcutsMode::Shortcuts | ShortcutsMode::Placement => "shortcuts-preview",
    }
}

fn hide_inactive_shortcuts_window<R: Runtime>(app: &tauri::AppHandle<R>, mode: ShortcutsMode) {
    let inactive_label = inactive_shortcuts_window_label(mode);
    if let Some(window) = app.get_webview_window(inactive_label) {
        let _ = window.hide();
    }
    clear_shortcuts_open_request(app, inactive_label);
}

fn build_shortcuts_open_request(
    mode: ShortcutsMode,
    active_app: ActiveApp,
    preserve_position: bool,
) -> ShortcutsOpenRequest {
    ShortcutsOpenRequest {
        mode: mode.as_str().to_owned(),
        active_app,
        preserve_position,
    }
}

fn show_settings<R: Runtime>(app: &tauri::AppHandle<R>) {
    if let Some(window) = app.get_webview_window("settings") {
        let _ = window.show();
        let _ = window.set_focus();
    }
}

fn hide_settings_window<R: Runtime>(app: &tauri::AppHandle<R>) {
    if let Some(window) = app.get_webview_window("settings") {
        let _ = window.hide();
    }
}

fn hide_shortcuts_window<R: Runtime>(app: &tauri::AppHandle<R>) {
    set_shortcuts_keep_visible(app, false);

    if let Some(window) = app.get_webview_window("shortcuts") {
        log_window_lifecycle(app, "hide normal shortcuts");
        let _ = window.hide();
    }
    clear_shortcuts_open_request(app, "shortcuts");
}

fn hide_shortcuts_preview_window<R: Runtime>(app: &tauri::AppHandle<R>) {
    if let Some(window) = app.get_webview_window("shortcuts-preview") {
        log_window_lifecycle(app, "hide preview shortcuts");
        let _ = window.hide();
    }
    clear_shortcuts_open_request(app, "shortcuts-preview");
}

fn should_keep_preview_pair_visible<R: Runtime>(app: &tauri::AppHandle<R>) -> bool {
    should_keep_preview_pair_visible_from_focus(
        is_window_focused(app, "settings"),
        is_window_focused(app, "shortcuts-preview"),
    )
}

fn is_panel_keep_visible<R: Runtime>(app: &tauri::AppHandle<R>) -> bool {
    let state = app.state::<PanelState>();
    state
        .keep_visible
        .lock()
        .map(|value| *value)
        .unwrap_or(false)
}

fn is_window_focused<R: Runtime>(app: &tauri::AppHandle<R>, label: &str) -> bool {
    app.get_webview_window(label)
        .and_then(|window| window.is_focused().ok())
        .unwrap_or(false)
}

fn should_keep_preview_pair_visible_from_focus(
    settings_focused: bool,
    preview_focused: bool,
) -> bool {
    settings_focused || preview_focused
}

fn should_stage_shortcuts_before_open(mode: ShortcutsMode, is_visible: bool) -> bool {
    !is_visible && !matches!(mode, ShortcutsMode::Preview)
}

fn should_position_preview_before_show(mode: ShortcutsMode, is_visible: bool) -> bool {
    !is_visible && matches!(mode, ShortcutsMode::Preview)
}

fn should_focus_after_show(mode: ShortcutsMode) -> bool {
    !matches!(mode, ShortcutsMode::Preview)
}

fn stage_shortcuts_before_open<R: Runtime>(window: &WebviewWindow<R>) {
    let _ = window.set_position(PhysicalPosition::new(-32000, -32000));
}

fn should_hide_unfocused_shortcuts(is_focused: bool, keep_visible: bool) -> bool {
    !is_focused && !keep_visible
}

fn set_shortcuts_keep_visible<R: Runtime>(app: &tauri::AppHandle<R>, keep_visible: bool) {
    let state = app.state::<PanelState>();

    if let Ok(mut value) = state.keep_visible.lock() {
        *value = keep_visible;
    };
}

fn set_shortcuts_open_request<R: Runtime>(
    app: &tauri::AppHandle<R>,
    mode: ShortcutsMode,
    request: Option<ShortcutsOpenRequest>,
) {
    clear_shortcuts_open_request(app, shortcuts_window_label(mode));
    let state = app.state::<PanelState>();
    let slot = match mode {
        ShortcutsMode::Preview => &state.preview_request,
        ShortcutsMode::Shortcuts | ShortcutsMode::Placement => &state.shortcuts_request,
    };

    if let Ok(mut value) = slot.lock() {
        *value = request;
    };
}

fn clear_shortcuts_open_request<R: Runtime>(app: &tauri::AppHandle<R>, label: &str) {
    let state = app.state::<PanelState>();
    let slot = match label {
        "shortcuts" => Some(&state.shortcuts_request),
        "shortcuts-preview" => Some(&state.preview_request),
        _ => None,
    };

    let Some(slot) = slot else {
        return;
    };

    if let Ok(mut value) = slot.lock() {
        *value = None;
    };
}

fn position_shortcuts_preview_if_ready<R: Runtime>(app: &tauri::AppHandle<R>) -> tauri::Result<()> {
    if let (Some(settings), Some(shortcuts)) = (
        app.get_webview_window("settings"),
        app.get_webview_window("shortcuts-preview"),
    ) {
        position_shortcuts_preview(&settings, &shortcuts)?;
    }

    Ok(())
}

fn log_window_lifecycle<R: Runtime>(_app: &tauri::AppHandle<R>, _message: impl AsRef<str>) {}

fn position_shortcuts_preview<R: Runtime>(
    settings: &WebviewWindow<R>,
    shortcuts: &WebviewWindow<R>,
) -> tauri::Result<()> {
    let settings_position = settings.outer_position()?;
    let settings_size = settings.outer_size()?;
    let shortcuts_size = shortcuts.outer_size()?;
    let margin = 12;
    let fallback_x = settings_position.x + settings_size.width as i32 + margin;
    let fallback_y = settings_position.y;

    let Some(monitor) = settings.current_monitor()? else {
        return shortcuts.set_position(PhysicalPosition::new(fallback_x, fallback_y));
    };

    let work_area = monitor.work_area();
    let work_left = work_area.position.x;
    let work_top = work_area.position.y;
    let work_right = work_left + work_area.size.width as i32;
    let work_bottom = work_top + work_area.size.height as i32;
    let shortcuts_width = shortcuts_size.width as i32;
    let shortcuts_height = shortcuts_size.height as i32;
    let right_x = fallback_x;
    let left_x = settings_position.x - shortcuts_width - margin;
    let min_x = work_left;
    let max_x = (work_right - shortcuts_width).max(work_left);
    let min_y = work_top;
    let max_y = (work_bottom - shortcuts_height).max(work_top);

    let x = if right_x + shortcuts_width <= work_right {
        right_x
    } else if left_x >= work_left {
        left_x
    } else {
        right_x.clamp(min_x, max_x)
    };
    let y = settings_position.y.clamp(min_y, max_y);

    shortcuts.set_position(PhysicalPosition::new(x, y))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn active_app(process_name: &str, sheet_id: &str) -> ActiveApp {
        ActiveApp {
            process_name: Some(process_name.to_owned()),
            title: Some("Test window".to_owned()),
            sheet_id: Some(sheet_id.to_owned()),
        }
    }

    #[test]
    fn builds_shortcuts_open_request_payload() {
        let request = build_shortcuts_open_request(
            ShortcutsMode::Shortcuts,
            active_app("vlc.exe", "vlc-fr"),
            false,
        );

        assert_eq!(request.mode, "shortcuts");
        assert_eq!(request.active_app.process_name.as_deref(), Some("vlc.exe"));
        assert_eq!(request.active_app.sheet_id.as_deref(), Some("vlc-fr"));
        assert!(!request.preserve_position);
    }

    #[test]
    fn builds_placement_open_request_payload() {
        let request = build_shortcuts_open_request(
            ShortcutsMode::Placement,
            active_app("EXCEL.EXE", "excel-fr"),
            false,
        );

        assert_eq!(request.mode, "placement");
        assert_eq!(
            request.active_app.process_name.as_deref(),
            Some("EXCEL.EXE")
        );
        assert_eq!(request.active_app.sheet_id.as_deref(), Some("excel-fr"));
        assert!(!request.preserve_position);
    }

    #[test]
    fn builds_preview_open_request_payload() {
        let request = build_shortcuts_open_request(
            ShortcutsMode::Preview,
            active_app("vlc.exe", "vlc-fr"),
            true,
        );

        assert_eq!(request.mode, "preview");
        assert_eq!(request.active_app.sheet_id.as_deref(), Some("vlc-fr"));
        assert!(request.preserve_position);
    }

    #[test]
    fn hides_unfocused_shortcuts_when_not_kept_visible() {
        assert!(should_hide_unfocused_shortcuts(false, false));
        assert!(!should_hide_unfocused_shortcuts(true, false));
        assert!(!should_hide_unfocused_shortcuts(false, true));
    }

    #[test]
    fn routes_shortcuts_modes_to_dedicated_windows() {
        assert_eq!(
            shortcuts_window_label(ShortcutsMode::Shortcuts),
            "shortcuts"
        );
        assert_eq!(
            shortcuts_window_label(ShortcutsMode::Placement),
            "shortcuts"
        );
        assert_eq!(
            shortcuts_window_label(ShortcutsMode::Preview),
            "shortcuts-preview"
        );
    }

    #[test]
    fn routes_inactive_shortcuts_windows_to_hide() {
        assert_eq!(
            inactive_shortcuts_window_label(ShortcutsMode::Shortcuts),
            "shortcuts-preview"
        );
        assert_eq!(
            inactive_shortcuts_window_label(ShortcutsMode::Placement),
            "shortcuts-preview"
        );
        assert_eq!(
            inactive_shortcuts_window_label(ShortcutsMode::Preview),
            "shortcuts"
        );
    }

    #[test]
    fn keeps_preview_pair_only_when_settings_or_preview_has_focus() {
        assert!(should_keep_preview_pair_visible_from_focus(true, false));
        assert!(should_keep_preview_pair_visible_from_focus(false, true));
        assert!(!should_keep_preview_pair_visible_from_focus(false, false));
    }

    #[test]
    fn stages_hidden_normal_windows_before_opening() {
        assert!(should_stage_shortcuts_before_open(
            ShortcutsMode::Shortcuts,
            false
        ));
        assert!(should_stage_shortcuts_before_open(
            ShortcutsMode::Placement,
            false
        ));
        assert!(!should_stage_shortcuts_before_open(
            ShortcutsMode::Shortcuts,
            true
        ));
    }

    #[test]
    fn positions_hidden_preview_before_showing() {
        assert!(!should_stage_shortcuts_before_open(
            ShortcutsMode::Preview,
            false
        ));
        assert!(should_position_preview_before_show(
            ShortcutsMode::Preview,
            false
        ));
        assert!(!should_position_preview_before_show(
            ShortcutsMode::Preview,
            true
        ));
        assert!(!should_position_preview_before_show(
            ShortcutsMode::Shortcuts,
            false
        ));
    }

    #[test]
    fn focuses_only_interactive_shortcuts_windows_after_showing() {
        assert!(should_focus_after_show(ShortcutsMode::Shortcuts));
        assert!(should_focus_after_show(ShortcutsMode::Placement));
        assert!(!should_focus_after_show(ShortcutsMode::Preview));
    }
}

mod active_window {
    use super::ActiveApp;
    use std::sync::{Arc, Mutex, OnceLock};

    static ACTIVE_APP_TARGET: OnceLock<Arc<Mutex<Option<ActiveApp>>>> = OnceLock::new();

    #[cfg(debug_assertions)]
    pub fn debug_log_active_app(context: &str, active_app: &ActiveApp) {
        eprintln!(
            "[merken:active-window] {context}: process={:?}, title={:?}, sheet={:?}",
            active_app.process_name, active_app.title, active_app.sheet_id
        );
    }

    #[cfg(debug_assertions)]
    fn debug_log_message(message: &str) {
        eprintln!("[merken:active-window] {message}");
    }

    #[cfg(debug_assertions)]
    pub fn debug_log_show_shortcuts_snapshot(target: &Arc<Mutex<Option<ActiveApp>>>, mode: &str) {
        debug_log_message(&format!("show_shortcuts mode={mode}"));

        match read_cached_active_app(target) {
            Some(active_app) => debug_log_active_app("show_shortcuts cached", &active_app),
            None => debug_log_message("show_shortcuts cached: none"),
        }

        let direct_active_app = read_active_app();
        debug_log_active_app(
            "show_shortcuts direct foreground snapshot",
            &direct_active_app,
        );
    }

    pub fn read_active_app() -> ActiveApp {
        let (process_name, title) = platform_active_window();
        build_active_app(process_name, title)
    }

    pub fn read_remembered_or_current_active_app(
        target: &Arc<Mutex<Option<ActiveApp>>>,
    ) -> ActiveApp {
        read_cached_or_current_with(target, read_active_app)
    }

    pub fn read_cached_active_app(target: &Arc<Mutex<Option<ActiveApp>>>) -> Option<ActiveApp> {
        target.lock().ok().and_then(|value| value.clone())
    }

    fn read_cached_or_current_with<F>(
        target: &Arc<Mutex<Option<ActiveApp>>>,
        read_current: F,
    ) -> ActiveApp
    where
        F: FnOnce() -> ActiveApp,
    {
        if let Some(active_app) = read_cached_active_app(target) {
            #[cfg(debug_assertions)]
            debug_log_active_app("get_active_app source=cache", &active_app);

            return active_app;
        }

        let active_app = read_current();
        #[cfg(debug_assertions)]
        debug_log_active_app("get_active_app source=fallback_direct_read", &active_app);

        remember_active_app(target, active_app.clone(), "fallback_direct_read");
        active_app
    }

    pub fn start_foreground_watcher(target: Arc<Mutex<Option<ActiveApp>>>) {
        let initial_app = read_active_app();
        #[cfg(debug_assertions)]
        debug_log_active_app("startup direct foreground snapshot", &initial_app);

        remember_active_app(&target, initial_app, "startup");

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

    fn remember_active_app(
        target: &Arc<Mutex<Option<ActiveApp>>>,
        active_app: ActiveApp,
        _source: &str,
    ) {
        if let Some(_reason) = ignored_user_app_reason(&active_app) {
            #[cfg(debug_assertions)]
            eprintln!(
                "[merken:active-window] ignore source={_source} reason={_reason}: process={:?}, title={:?}, sheet={:?}",
                active_app.process_name, active_app.title, active_app.sheet_id
            );

            return;
        }

        if let Ok(mut value) = target.lock() {
            *value = Some(active_app);
            #[cfg(debug_assertions)]
            {
                if let Some(active_app) = value.as_ref() {
                    debug_log_active_app(&format!("cache update source={_source}"), active_app);
                }
            }
        } else {
            #[cfg(debug_assertions)]
            debug_log_message(&format!(
                "cache update source={_source} failed: mutex poisoned"
            ));
        }
    }

    #[cfg(test)]
    fn is_trackable_user_app(active_app: &ActiveApp) -> bool {
        ignored_user_app_reason(active_app).is_none()
    }

    fn ignored_user_app_reason(active_app: &ActiveApp) -> Option<&'static str> {
        let process_name = match active_app.process_name.as_deref() {
            Some(process_name) => process_name.to_ascii_lowercase(),
            None => return Some("missing_process"),
        };

        if matches!(
            process_name.as_str(),
            "merken.exe" | "shellexperiencehost.exe" | "startmenuexperiencehost.exe"
        ) {
            return Some("shell_or_merken_process");
        }

        if process_name == "explorer.exe" {
            let is_file_explorer = active_app
                .title
                .as_deref()
                .map(is_file_explorer_title)
                .unwrap_or(false);

            if !is_file_explorer {
                return Some("explorer_without_user_title");
            }
        }

        if active_app.sheet_id.is_none()
            && active_app
                .title
                .as_deref()
                .map(str::trim)
                .unwrap_or_default()
                .is_empty()
        {
            return Some("unknown_process_without_title");
        }

        None
    }

    fn is_file_explorer_title(title: &str) -> bool {
        let normalized_title = title.trim().to_lowercase();

        if normalized_title.is_empty() {
            return false;
        }

        !is_shell_explorer_title(&normalized_title)
    }

    fn is_shell_explorer_title(normalized_title: &str) -> bool {
        matches!(
            normalized_title,
            "program manager"
                | "notification overflow"
                | "notification area overflow"
                | "system tray overflow"
                | "system tray overflow window"
                | "taskbar"
                | "barre des taches"
                | "barre des tâches"
                | "zone de notification"
                | "icones cachees"
                | "icônes cachées"
        ) || normalized_title.contains("tray overflow")
            || normalized_title.contains("notification overflow")
            || normalized_title.contains("notification area overflow")
            || normalized_title.contains("dépassement de capacité de la barre d’état système")
            || normalized_title.contains("depassement de capacite de la barre d'etat systeme")
    }

    fn map_process_to_sheet(process_name: &str) -> Option<&'static str> {
        match process_name.to_ascii_lowercase().as_str() {
            "applicationframehost.exe" | "searchhost.exe" => Some("windows-core-fr"),
            "explorer.exe" => Some("file-explorer-fr"),
            "systemsettings.exe" => Some("windows-core-fr"),
            "microsoft.photos.exe" | "photos.exe" => Some("photos-fr"),
            "microsoft.media.player.exe" | "wmplayer.exe" | "zunemusic.exe" | "zunevideo.exe" => {
                Some("media-player-fr")
            }
            "windowsterminal.exe" | "wt.exe" | "powershell.exe" | "pwsh.exe" => {
                Some("terminal-powershell-fr")
            }
            "msedge.exe" | "chrome.exe" | "firefox.exe" | "brave.exe" => Some("browsers-fr"),
            "excel.exe" => Some("excel-fr"),
            "winword.exe" => Some("word-fr"),
            "powerpnt.exe" => Some("powerpoint-fr"),
            "outlook.exe" | "olk.exe" => Some("outlook-fr"),
            "thunderbird.exe" => Some("thunderbird-fr"),
            "obsidian.exe" => Some("obsidian-fr"),
            "vlc.exe" => Some("vlc-fr"),
            _ => None,
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        fn active_app(process_name: &str, title: Option<&str>) -> ActiveApp {
            ActiveApp {
                process_name: Some(process_name.to_owned()),
                title: title.map(ToOwned::to_owned),
                sheet_id: None,
            }
        }

        fn mapped_active_app(process_name: &str, title: Option<&str>) -> ActiveApp {
            build_active_app(Some(process_name.to_owned()), title.map(ToOwned::to_owned))
        }

        #[test]
        fn maps_known_processes_to_sheet_ids() {
            let cases = [
                ("applicationframehost.exe", Some("windows-core-fr")),
                ("searchhost.exe", Some("windows-core-fr")),
                ("explorer.exe", Some("file-explorer-fr")),
                ("systemsettings.exe", Some("windows-core-fr")),
                ("microsoft.photos.exe", Some("photos-fr")),
                ("photos.exe", Some("photos-fr")),
                ("microsoft.media.player.exe", Some("media-player-fr")),
                ("wmplayer.exe", Some("media-player-fr")),
                ("windowsterminal.exe", Some("terminal-powershell-fr")),
                ("powershell.exe", Some("terminal-powershell-fr")),
                ("pwsh.exe", Some("terminal-powershell-fr")),
                ("msedge.exe", Some("browsers-fr")),
                ("chrome.exe", Some("browsers-fr")),
                ("firefox.exe", Some("browsers-fr")),
                ("brave.exe", Some("browsers-fr")),
                ("excel.exe", Some("excel-fr")),
                ("winword.exe", Some("word-fr")),
                ("powerpnt.exe", Some("powerpoint-fr")),
                ("outlook.exe", Some("outlook-fr")),
                ("olk.exe", Some("outlook-fr")),
                ("thunderbird.exe", Some("thunderbird-fr")),
                ("obsidian.exe", Some("obsidian-fr")),
                ("vlc.exe", Some("vlc-fr")),
                ("unknown.exe", None),
            ];

            for (process_name, expected_sheet_id) in cases {
                assert_eq!(
                    map_process_to_sheet(process_name),
                    expected_sheet_id,
                    "{process_name}"
                );
            }
        }

        #[test]
        fn maps_processes_case_insensitively() {
            assert_eq!(map_process_to_sheet("CHROME.EXE"), Some("browsers-fr"));
            assert_eq!(map_process_to_sheet("EXCEL.EXE"), Some("excel-fr"));
        }

        #[test]
        fn keeps_cached_user_apps_when_shell_windows_arrive() {
            let cases = [
                ("vlc.exe", Some("VLC media player"), Some("vlc-fr")),
                ("excel.exe", Some("Book1 - Excel"), Some("excel-fr")),
                ("explorer.exe", Some("Documents"), Some("file-explorer-fr")),
            ];

            for (process_name, title, expected_sheet_id) in cases {
                let target = Arc::new(Mutex::new(None));
                remember_active_app(&target, mapped_active_app(process_name, title), "test");
                remember_active_app(
                    &target,
                    mapped_active_app("explorer.exe", Some("Taskbar")),
                    "test",
                );
                remember_active_app(
                    &target,
                    mapped_active_app(
                        "explorer.exe",
                        Some("Fenêtre de dépassement de capacité de la barre d’état système."),
                    ),
                    "test",
                );
                remember_active_app(
                    &target,
                    mapped_active_app("merken.exe", Some("Merken")),
                    "test",
                );
                remember_active_app(
                    &target,
                    mapped_active_app("FreeFileSync_x64.exe", None),
                    "test",
                );

                let cached = read_cached_active_app(&target).expect("expected cached app");

                assert_eq!(
                    cached.process_name.as_deref(),
                    Some(process_name),
                    "{process_name}"
                );
                assert_eq!(
                    cached.sheet_id.as_deref(),
                    expected_sheet_id,
                    "{process_name}"
                );
            }
        }

        #[test]
        fn prefers_cache_over_late_direct_reads() {
            let target = Arc::new(Mutex::new(Some(mapped_active_app(
                "vlc.exe",
                Some("VLC media player"),
            ))));
            let active_app = read_cached_or_current_with(&target, || {
                mapped_active_app("merken.exe", Some("Merken"))
            });

            assert_eq!(active_app.process_name.as_deref(), Some("vlc.exe"));
            assert_eq!(active_app.sheet_id.as_deref(), Some("vlc-fr"));
        }

        #[test]
        fn falls_back_to_direct_read_when_cache_is_empty() {
            let target = Arc::new(Mutex::new(None));
            let active_app = read_cached_or_current_with(&target, || {
                mapped_active_app("excel.exe", Some("Book1 - Excel"))
            });
            let cached = read_cached_active_app(&target).expect("expected cached app");

            assert_eq!(active_app.process_name.as_deref(), Some("excel.exe"));
            assert_eq!(active_app.sheet_id.as_deref(), Some("excel-fr"));
            assert_eq!(cached.process_name.as_deref(), Some("excel.exe"));
            assert_eq!(cached.sheet_id.as_deref(), Some("excel-fr"));
        }

        #[test]
        fn keeps_browser_and_non_browser_mappings_distinct() {
            assert_eq!(map_process_to_sheet("chrome.exe"), Some("browsers-fr"));
            assert_eq!(map_process_to_sheet("firefox.exe"), Some("browsers-fr"));
            assert_eq!(map_process_to_sheet("vlc.exe"), Some("vlc-fr"));
            assert_eq!(
                map_process_to_sheet("explorer.exe"),
                Some("file-explorer-fr")
            );
            assert_ne!(
                map_process_to_sheet("chrome.exe"),
                map_process_to_sheet("vlc.exe")
            );
            assert_ne!(
                map_process_to_sheet("chrome.exe"),
                map_process_to_sheet("explorer.exe")
            );
        }

        #[test]
        fn filters_non_user_windows_from_tracking() {
            assert!(!is_trackable_user_app(&active_app(
                "merken.exe",
                Some("Merken")
            )));
            assert!(!is_trackable_user_app(&active_app(
                "shellexperiencehost.exe",
                Some("Shell")
            )));
            assert!(!is_trackable_user_app(&active_app(
                "explorer.exe",
                Some("Program Manager")
            )));
            assert!(!is_trackable_user_app(&active_app(
                "explorer.exe",
                Some("Taskbar")
            )));
            assert!(!is_trackable_user_app(&active_app(
                "explorer.exe",
                Some("System Tray Overflow Window")
            )));
            assert!(!is_trackable_user_app(&active_app(
                "explorer.exe",
                Some("Fenêtre de dépassement de capacité de la barre d’état système.")
            )));
            assert!(!is_trackable_user_app(&active_app("explorer.exe", None)));
            assert!(!is_trackable_user_app(&active_app(
                "FreeFileSync_x64.exe",
                None
            )));
        }

        #[test]
        fn keeps_user_windows_trackable() {
            assert!(is_trackable_user_app(&active_app(
                "chrome.exe",
                Some("Example")
            )));
            assert!(is_trackable_user_app(&active_app(
                "excel.exe",
                Some("Book1")
            )));
            assert!(is_trackable_user_app(&active_app(
                "explorer.exe",
                Some("Documents")
            )));
            assert!(is_trackable_user_app(&active_app(
                "unknown.exe",
                Some("A real user window")
            )));
        }
    }

    #[cfg(not(windows))]
    fn platform_active_window() -> (Option<String>, Option<String>) {
        (None, None)
    }

    #[cfg(windows)]
    fn platform_active_window() -> (Option<String>, Option<String>) {
        use windows::Win32::{
            Foundation::CloseHandle,
            System::Threading::{OpenProcess, PROCESS_QUERY_LIMITED_INFORMATION},
            UI::WindowsAndMessaging::{GetForegroundWindow, GetWindowThreadProcessId},
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
            #[cfg(debug_assertions)]
            debug_log_message("foreground watcher already initialized");

            return;
        }

        thread::spawn(|| {
            use windows::Win32::UI::{
                Accessibility::{SetWinEventHook, HWINEVENTHOOK},
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
                    let active_app = build_active_app(process_name, title);
                    #[cfg(debug_assertions)]
                    debug_log_active_app("foreground_event raw", &active_app);
                    remember_active_app(target, active_app, "foreground_event");
                }
            }

            unsafe {
                #[cfg(debug_assertions)]
                debug_log_message("foreground watcher installing EVENT_SYSTEM_FOREGROUND hook");

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
                    #[cfg(debug_assertions)]
                    debug_log_message("foreground watcher hook install failed");

                    return;
                }

                #[cfg(debug_assertions)]
                debug_log_message("foreground watcher hook installed");

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
    unsafe fn read_window_app(
        hwnd: windows::Win32::Foundation::HWND,
    ) -> (Option<String>, Option<String>) {
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
