import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { getName, getVersion } from "@tauri-apps/api/app";
import { currentMonitor, getCurrentWindow, PhysicalPosition, primaryMonitor } from "@tauri-apps/api/window";
import { disable, enable, isEnabled } from "@tauri-apps/plugin-autostart";
import { relaunch } from "@tauri-apps/plugin-process";
import { check, type Update } from "@tauri-apps/plugin-updater";
import { labelsFor, supportedLanguages, type AutostartStatus, type SettingsTab, type UpdateStatus } from "./app/i18n";
import { defaultSettings, loadSettings, saveSettings, settingsStorageKey } from "./app/settings";
import { manualSheetOptions, selectSheet, sheetFamily, visibleShortcuts } from "./app/sheets";
import { distributionFromEnv, repositoryUrl, updateStateClass } from "./app/updates";
import "./styles.css";
import type {
  ActiveApp,
  BlurLevel,
  LanguageCode,
  SheetMode,
  ShortcutPlacementPreset,
  TextSize,
  ThemeMode,
  UserSettings
} from "./types";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("Missing #app root");
}

const app: HTMLElement = root;
const currentWindow = getCurrentWindow();
const isSettingsWindow = currentWindow.label === "settings";
const isShortcutsWindow = currentWindow.label === "shortcuts";

let settings = loadSettings();
let activeApp: ActiveApp | null = null;
let panelMode: "shortcuts" | "placement" = "shortcuts";
let settingsTab: SettingsTab = "general";
let autostartStatus: AutostartStatus = "syncing";
let updateStatus: UpdateStatus = "idle";
let pendingUpdate: Update | null = null;
let updateVersion: string | null = null;
let aboutModalOpen = false;
let placementSnapshot: Pick<UserSettings, "shortcutPlacementMode" | "shortcutPlacementPreset" | "shortcutCustomPosition"> | null = null;
let closeCaptureBound = false;
let appInfo = {
  name: "Merken",
  version: "0.1.0"
};

const appIconUrl = new URL("../src-tauri/icons/32x32.png", import.meta.url).href;

const textSizes: TextSize[] = ["xs", "sm", "md", "lg", "xl"];
const blurLevels: BlurLevel[] = ["none", "light", "medium", "strong", "max"];
const themeModes: ThemeMode[] = ["dark", "colorblind"];
const sheetModes: SheetMode[] = ["auto", "os", "manual"];
const shortcutPlacementPresets: ShortcutPlacementPreset[] = ["top-left", "top-right", "bottom-left", "bottom-right", "center"];
const settingsTabs: SettingsTab[] = ["general", "appearance", "sheets", "expert", "about"];
const distribution = distributionFromEnv(import.meta.env.VITE_MERKEN_DISTRIBUTION);

async function refreshActiveApp(): Promise<void> {
  try {
    activeApp = await invoke<ActiveApp>("get_active_app");
  } catch {
    activeApp = { processName: null, title: null, sheetId: null };
  }
}

function updateSettings(next: Partial<UserSettings>): void {
  settings = { ...settings, ...next };
  saveSettings(settings);
  render();
}

async function setTrayLanguage(language: LanguageCode): Promise<void> {
  try {
    await invoke("set_tray_language", { language });
  } catch {
    // The web preview has no Tauri backend; the UI can still update immediately.
  }
}

async function setPanelKeepVisible(keepVisible: boolean): Promise<void> {
  try {
    await invoke("set_panel_keep_visible", { keepVisible });
  } catch {
    // The browser preview has no native backend.
  }
}

async function applyShortcutPlacement(): Promise<void> {
  try {
    if (settings.shortcutPlacementMode === "custom" && settings.shortcutCustomPosition) {
      await currentWindow.setPosition(new PhysicalPosition(settings.shortcutCustomPosition.x, settings.shortcutCustomPosition.y));
      return;
    }

    const monitor = (await currentMonitor()) ?? (await primaryMonitor());
    if (!monitor) {
      return;
    }

    const size = await currentWindow.outerSize();
    const workArea = monitor.workArea;
    const margin = 16;
    const left = workArea.position.x + margin;
    const top = workArea.position.y + margin;
    const right = workArea.position.x + workArea.size.width - size.width - margin;
    const bottom = workArea.position.y + workArea.size.height - size.height - margin;
    const centerX = workArea.position.x + Math.round((workArea.size.width - size.width) / 2);
    const centerY = workArea.position.y + Math.round((workArea.size.height - size.height) / 2);
    const positions: Record<ShortcutPlacementPreset, { x: number; y: number }> = {
      "top-left": { x: left, y: top },
      "top-right": { x: right, y: top },
      "bottom-left": { x: left, y: bottom },
      "bottom-right": { x: right, y: bottom },
      center: { x: centerX, y: centerY }
    };
    const position = positions[settings.shortcutPlacementPreset];

    await currentWindow.setPosition(new PhysicalPosition(position.x, position.y));
  } catch {
    // Positioning is native-only; ignore in web preview.
  }
}

async function refreshAppInfo(): Promise<void> {
  try {
    const [name, version] = await Promise.all([getName(), getVersion()]);
    appInfo = { name, version };
  } catch {
    appInfo = { name: "Merken", version: "0.1.0" };
  }
}

async function syncAutostart(): Promise<void> {
  autostartStatus = "syncing";
  render();

  try {
    const enabled = await isEnabled();

    if (settings.startWithWindows && !enabled) {
      await enable();
      autostartStatus = "enabled";
      render();
      return;
    }

    if (!settings.startWithWindows && enabled) {
      await disable();
      autostartStatus = "disabled";
      render();
      return;
    }

    autostartStatus = enabled ? "enabled" : "disabled";
  } catch {
    autostartStatus = "unavailable";
  }

  render();
}

async function setStartWithWindows(enabled: boolean): Promise<void> {
  updateSettings({ startWithWindows: enabled });
  await syncAutostart();
}

async function openTaskbarSettings(): Promise<void> {
  updateSettings({ trayVisibilityPromptDismissed: true });

  try {
    await invoke("open_taskbar_settings");
  } catch (error) {
    console.warn("Unable to open Windows taskbar settings.", error);
  }
}

async function openLatestRelease(): Promise<void> {
  try {
    await invoke("open_latest_release");
  } catch (error) {
    console.warn("Unable to open latest release.", error);
  }
}

async function openRepository(): Promise<void> {
  try {
    await invoke("open_repository");
  } catch (error) {
    console.warn("Unable to open repository.", error);
  }
}

async function checkForUpdates(silent = false): Promise<void> {
  if (!isSettingsWindow) {
    return;
  }

  pendingUpdate = null;
  updateVersion = null;
  updateStatus = "checking";

  if (!silent) {
    render();
  }

  try {
    const update = await check({ timeout: 15000 });

    if (update?.available) {
      pendingUpdate = update;
      updateVersion = update.version;
      updateStatus = "available";
    } else {
      updateStatus = "upToDate";
    }
  } catch (error) {
    console.warn("Unable to check for updates.", error);
    updateStatus = "error";
  }

  render();
}

async function installPendingUpdate(): Promise<void> {
  if (!pendingUpdate) {
    await checkForUpdates(false);
  }

  if (!pendingUpdate) {
    return;
  }

  updateStatus = "installing";
  render();

  try {
    await pendingUpdate.downloadAndInstall();
    updateStatus = "installed";
    render();
    await relaunch();
  } catch (error) {
    console.warn("Unable to install update.", error);
    updateStatus = "error";
    render();
  }
}

async function handleUpdateAction(): Promise<void> {
  if (updateStatus === "available") {
    if (distribution === "portable") {
      await openLatestRelease();
      return;
    }

    await installPendingUpdate();
    return;
  }

  await checkForUpdates(false);
}

function formatUpdateLabel(template: string): string {
  return template.replace("{version}", updateVersion ?? appInfo.version);
}

function updateStatusText(): string {
  const labels = labelsFor(settings.language);

  if (updateStatus === "checking") {
    return labels.settings.updateChecking;
  }

  if (updateStatus === "upToDate") {
    return labels.settings.updateUpToDate;
  }

  if (updateStatus === "available") {
    return formatUpdateLabel(distribution === "portable" ? labels.settings.updatePortableAvailable : labels.settings.updateAvailable);
  }

  if (updateStatus === "installing") {
    return labels.settings.updateInstalling;
  }

  if (updateStatus === "installed") {
    return labels.settings.updateInstalled;
  }

  if (updateStatus === "error") {
    return labels.settings.updateError;
  }

  if (updateStatus === "unconfigured") {
    return labels.settings.updateUnconfigured;
  }

  return labels.settings.updateIdle;
}

function renderKey(key: string): string {
  return `<kbd>${key}</kbd>`;
}

function textSizeClass(textSize: TextSize): string {
  return `text-${textSize}`;
}

function blurClass(blur: BlurLevel): string {
  return `blur-${blur}`;
}

function themeClass(theme: ThemeMode): string {
  return theme === "dark" ? "" : `theme-${theme}`;
}

function render(): void {
  const labels = labelsFor(settings.language);
  const sheet = visibleShortcuts(selectSheet(settings, activeApp), settings.expertMode);
  const isPlacement = panelMode === "placement";
  const categories = sheet.categories
    .map(
      (category) => `
        <section class="shortcut-section">
          <h2>${category.title}</h2>
          <div class="shortcut-list">
            ${category.shortcuts
              .map(
                (shortcut) => `
                  <article class="shortcut-row">
                    <div class="keys">${shortcut.keys.map(renderKey).join("")}</div>
                    <strong>${shortcut.label}</strong>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");

  app.className = `${themeClass(settings.theme)} ${textSizeClass(settings.textSize)} ${blurClass(settings.blur)}`;
  app.innerHTML = `
    <section class="panel ${isSettingsWindow ? "panel-settings" : "panel-shortcuts"} ${isPlacement ? "panel-placement" : ""}" aria-label="Merken">
      ${
        isSettingsWindow
          ? renderSettings()
          : `
            <div class="content">${categories}</div>
            ${
              isPlacement
                ? `
                  <div class="placement-bar">
                    <span>${labels.settings.placementHelp}</span>
                    <button type="button" id="confirm-placement">${labels.settings.confirmPlacement}</button>
                    <button type="button" id="cancel-placement">${labels.settings.cancelPlacement}</button>
                  </div>
                `
                : ""
            }
          `
      }
    </section>
    ${
      aboutModalOpen
        ? `
          <div class="modal-backdrop" role="presentation">
            <section class="modal" role="dialog" aria-modal="true" aria-labelledby="about-title">
              <h2 id="about-title">${labels.modal.aboutTitle}</h2>
              <dl>
                <div>
                  <dt>${labels.modal.name}</dt>
                  <dd>${appInfo.name}</dd>
                </div>
                <div>
                  <dt>${labels.modal.version}</dt>
                  <dd>${appInfo.version}</dd>
                </div>
                <div>
                  <dt>${labels.modal.publisher}</dt>
                  <dd>Idao</dd>
                </div>
                <div>
                  <dt>GitHub</dt>
                  <dd>${repositoryUrl}</dd>
                </div>
                <div>
                  <dt>${labels.modal.license}</dt>
                  <dd>${labels.modal.licenseValue}</dd>
                </div>
              </dl>
              <button type="button" id="close-about">${labels.modal.close}</button>
            </section>
          </div>
        `
        : ""
    }
  `;

  bindEvents();
}

function renderSettings(): string {
  const labels = labelsFor(settings.language);

  return `
    <form class="settings-shell" id="settings-form">
      <aside class="settings-sidebar" aria-label="${labels.settings.about}">
        <div class="brand">
          <img class="brand-mark" src="${appIconUrl}" alt="" aria-hidden="true" />
          <strong>Merken</strong>
        </div>
        <nav class="settings-tabs" aria-label="Options">
          ${settingsTabs
            .map(
              (tab) => `
                <button type="button" class="settings-tab ${settingsTab === tab ? "active" : ""}" data-settings-tab="${tab}">
                  <span aria-hidden="true">${settingsTabIcon(tab)}</span>
                  ${labels.tabs[tab]}
                </button>
              `
            )
            .join("")}
        </nav>
        <button type="button" class="settings-sidebar-footer" id="check-update-sidebar">
          <span>${labels.settings.update}</span>
          <small class="${updateStateClass(updateStatus)}">${formatUpdateLabel(labels.settings.updateCheck)}</small>
        </button>
      </aside>
      <main class="settings-page">
        <header class="settings-header">
          <h1>${labels.tabs[settingsTab]}</h1>
          <button type="button" class="settings-close" id="close-settings" aria-label="Fermer">x</button>
        </header>
        ${renderSettingsTab()}
      </main>
    </form>
  `;
}

function settingsTabIcon(tab: SettingsTab): string {
  const icons: Record<SettingsTab, string> = {
    general: "G",
    appearance: "A",
    sheets: "F",
    expert: "E",
    about: "i"
  };

  return icons[tab];
}

function renderSettingsTab(): string {
  const labels = labelsFor(settings.language);

  if (settingsTab === "appearance") {
    return `
      <section class="settings-group">
        <h2>${labels.sections.display}</h2>
        ${renderSelectRow(labels.settings.theme, "theme", themeModes, settings.theme, (theme) => labels.theme[theme])}
        ${renderSelectRow(labels.settings.textSize, "textSize", textSizes, settings.textSize, (size) => labels.textSize[size])}
        ${renderSelectRow(labels.settings.transparency, "blur", blurLevels, settings.blur, (blur) => labels.transparency[blur])}
      </section>
      <section class="settings-group">
        <h2>${labels.sections.shortcutPlacement}</h2>
        ${renderSelectRow(
          labels.settings.placementPreset,
          "shortcutPlacementPreset",
          shortcutPlacementPresets,
          settings.shortcutPlacementPreset,
          (preset) => labels.shortcutPlacementPreset[preset]
        )}
        <button type="button" class="secondary-button" id="adjust-placement">${labels.settings.adjustPlacement}</button>
      </section>
    `;
  }

  if (settingsTab === "sheets") {
    return `
      <section class="settings-group">
        <h2>${labels.sections.behavior}</h2>
        ${renderSelectRow(labels.settings.sheet, "sheetMode", sheetModes, settings.sheetMode, (mode) => labels.sheetMode[mode])}
        ${renderSelectRow(labels.settings.manualSheet, "manualSheetId", manualSheetOptions(settings.language).map((option) => option.key), sheetFamily(settings.manualSheetId), (key) => manualSheetOptions(settings.language).find((option) => option.key === key)?.label ?? key)}
      </section>
      <section class="settings-group">
        <h2>${labels.sections.availableSheets}</h2>
        <p class="settings-note">${labels.settings.sheetLibraryIntro}</p>
        <div class="sheet-library">
          ${manualSheetOptions(settings.language)
            .map(
              (option) => `
                <label class="sheet-family-row">
                  <input type="checkbox" checked disabled />
                  <span>${option.label}</span>
                  <small>${labels.settings.sheetLibraryPending}</small>
                </label>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }

  if (settingsTab === "expert") {
    return `
      <section class="settings-group">
        <h2>${labels.sections.expertDisplay}</h2>
        <p class="settings-note">${labels.settings.expertIntro}</p>
        ${renderToggleRow(labels.settings.expertMode, "expertMode", settings.expertMode)}
        <div class="pending-panel">${labels.settings.expertPending}</div>
      </section>
    `;
  }

  if (settingsTab === "about") {
    return `
      <section class="settings-group">
        <h2>${labels.sections.application}</h2>
        ${renderInfoRow(labels.modal.name, appInfo.name)}
        ${renderInfoRow(labels.modal.version, appInfo.version)}
        ${renderInfoRow(labels.modal.publisher, "Idao")}
        ${renderInfoRow(labels.modal.license, labels.modal.licenseValue)}
        ${renderLinkRow(labels.settings.repository, repositoryUrl, "open-repository")}
        <button type="button" class="link-button settings-update" id="check-update">
          <span>${labels.settings.update}</span>
          <small class="${updateStateClass(updateStatus)}">${updateStatusText()}</small>
        </button>
      </section>
    `;
  }

  return `
      <section class="settings-group">
        <h2>${labels.sections.basics}</h2>
        ${renderSelectRow(labels.settings.language, "language", supportedLanguages, settings.language, (language) => labelsFor(language).languageName)}
        ${renderToggleRow(labels.settings.startWithWindows, "startWithWindows", settings.startWithWindows, labels.autostart[autostartStatus])}
        <button type="button" class="link-button settings-update" id="open-taskbar-settings">
          <span>${labels.settings.trayVisibility}</span>
          <small>${labels.settings.trayVisibilityHelp}</small>
        </button>
      </section>
    <section class="settings-group">
      <h2>${labels.sections.behavior}</h2>
      ${renderSelectRow(labels.settings.sheet, "sheetMode", sheetModes, settings.sheetMode, (mode) => labels.sheetMode[mode])}
      <button type="button" class="secondary-button" id="reset-settings">${labels.settings.reset}</button>
    </section>
  `;
}

function renderSelectRow<T extends string>(
  label: string,
  name: string,
  values: T[],
  selected: T,
  labelForValue: (value: T) => string
): string {
  return `
    <label class="settings-row">
      <span>${label}</span>
      <select name="${name}">
        ${values.map((value) => `<option value="${value}" ${selected === value ? "selected" : ""}>${labelForValue(value)}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderToggleRow(label: string, name: string, checked: boolean, status?: string): string {
  return `
    <label class="settings-row toggle-row">
      <span>${label}${status ? `<small>${status}</small>` : ""}</span>
      <input type="checkbox" name="${name}" ${checked ? "checked" : ""} />
      <i aria-hidden="true"></i>
    </label>
  `;
}

function renderInfoRow(label: string, value: string): string {
  return `
    <div class="settings-row info-row">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `;
}

function renderLinkRow(label: string, value: string, id: string): string {
  return `
    <button type="button" class="link-button settings-row info-row" id="${id}">
      <span>${label}</span>
      <strong>${value}</strong>
    </button>
  `;
}

function isInteractiveElement(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest("button, select, input, a, label, textarea, [data-settings-tab]"));
}

async function startWindowDrag(): Promise<void> {
  try {
    await invoke("start_native_drag");
  } catch (error) {
    console.warn("Unable to start native window drag.", error);

    try {
      await currentWindow.startDragging();
    } catch (fallbackError) {
      console.warn("Unable to start frontend window drag.", fallbackError);
    }
  }
}

async function hideCurrentWindow(): Promise<void> {
  try {
    await invoke("hide_current_window");
  } catch {
    await currentWindow.hide();
  }
}

async function requestPlacementMode(): Promise<void> {
  if (isSettingsWindow) {
    try {
      await invoke("show_shortcuts_placement");
    } catch {
      // The browser preview has no native shortcuts window.
    }
    return;
  }

  await enterPlacementMode();
}

async function enterPlacementMode(): Promise<void> {
  settings = loadSettings();
  placementSnapshot = {
    shortcutPlacementMode: settings.shortcutPlacementMode,
    shortcutPlacementPreset: settings.shortcutPlacementPreset,
    shortcutCustomPosition: settings.shortcutCustomPosition
  };
  panelMode = "placement";
  await setPanelKeepVisible(true);
  await refreshActiveApp();
  await applyShortcutPlacement();
  render();
}

async function confirmPlacement(): Promise<void> {
  try {
    const position = await currentWindow.outerPosition();
    updateSettings({
      shortcutPlacementMode: "custom",
      shortcutCustomPosition: { x: position.x, y: position.y }
    });
  } catch {
    saveSettings(settings);
  }

  placementSnapshot = null;
  panelMode = "shortcuts";
  await setPanelKeepVisible(false);
  await hideShortcutsWindow();
}

async function cancelPlacement(): Promise<void> {
  if (placementSnapshot) {
    settings = { ...settings, ...placementSnapshot };
    saveSettings(settings);
  }

  placementSnapshot = null;
  panelMode = "shortcuts";
  await setPanelKeepVisible(false);
  await hideShortcutsWindow();
}

async function hideShortcutsWindow(): Promise<void> {
  try {
    await invoke("hide_shortcuts");
  } catch {
    await hideCurrentWindow();
  }
}

function bindEvents(): void {
  if (!closeCaptureBound) {
    closeCaptureBound = true;
    document.addEventListener(
      "pointerdown",
      (event) => {
        if (event.target instanceof Element && event.target.closest("#close-settings")) {
          event.preventDefault();
          event.stopPropagation();
          void hideCurrentWindow();
        }
      },
      { capture: true }
    );
  }

  document.querySelector(".panel-settings")?.addEventListener("pointerdown", (event) => {
    if (event instanceof PointerEvent && event.button === 0 && !isInteractiveElement(event.target)) {
      event.preventDefault();
      void startWindowDrag();
    }
  });

  document.querySelector(".panel-placement")?.addEventListener("pointerdown", (event) => {
    if (event instanceof PointerEvent && event.button === 0 && !isInteractiveElement(event.target)) {
      event.preventDefault();
      void startWindowDrag();
    }
  });

  document.querySelector("#close-settings")?.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    void hideCurrentWindow();
  });

  document.querySelector("#close-settings")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    void hideCurrentWindow();
  });

  document.querySelectorAll<HTMLButtonElement>("[data-settings-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      settingsTab = button.dataset.settingsTab as SettingsTab;
      render();
    });
  });

  document.querySelector("#reset-settings")?.addEventListener("click", () => {
    settings = defaultSettings;
    updateStatus = "idle";
    saveSettings(settings);
    void setTrayLanguage(settings.language);
    render();
  });

  document.querySelector("#open-about")?.addEventListener("click", () => {
    aboutModalOpen = true;
    render();
  });

  document.querySelector("#close-about")?.addEventListener("click", () => {
    aboutModalOpen = false;
    render();
  });

  document.querySelectorAll("#check-update, #check-update-sidebar").forEach((button) => {
    button.addEventListener("click", () => {
      void handleUpdateAction();
    });
  });

  document.querySelector("#open-taskbar-settings")?.addEventListener("click", () => {
    void openTaskbarSettings();
  });

  document.querySelector("#open-repository")?.addEventListener("click", () => {
    void openRepository();
  });

  document.querySelector("#adjust-placement")?.addEventListener("click", () => {
    void requestPlacementMode();
  });

  document.querySelector("#confirm-placement")?.addEventListener("click", () => {
    void confirmPlacement();
  });

  document.querySelector("#cancel-placement")?.addEventListener("click", () => {
    void cancelPlacement();
  });

  document.querySelector("#settings-form")?.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;

    if (target.name === "startWithWindows") {
      void setStartWithWindows(Boolean(value));
      return;
    }

    if (target.name === "shortcutPlacementPreset") {
      updateSettings({
        shortcutPlacementMode: "preset",
        shortcutPlacementPreset: value as ShortcutPlacementPreset,
        shortcutCustomPosition: null
      });
      return;
    }

    updateSettings({ [target.name]: value } as Partial<UserSettings>);

    if (target.name === "language") {
      void setTrayLanguage(value as LanguageCode);
    }
  });
}

document.addEventListener("keydown", async (event) => {
  if (event.key === "Escape") {
    if (panelMode === "placement") {
      await cancelPlacement();
      return;
    }

    await hideCurrentWindow();
  }
});

await listen<string>("merken:shortcuts-mode", async (event) => {
  if (!isShortcutsWindow) {
    return;
  }

  if (event.payload === "placement") {
    await enterPlacementMode();
    return;
  }

  settings = loadSettings();
  panelMode = "shortcuts";
  placementSnapshot = null;
  await setPanelKeepVisible(false);
  await refreshActiveApp();
  await applyShortcutPlacement();
  render();
});

window.addEventListener("storage", (event) => {
  if (event.key === settingsStorageKey) {
    settings = loadSettings();
    render();
  }
});

await Promise.all([refreshActiveApp(), refreshAppInfo()]);
void setTrayLanguage(settings.language);
render();
void syncAutostart();
