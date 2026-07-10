import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { getName, getVersion } from "@tauri-apps/api/app";
import { currentMonitor, getCurrentWindow, LogicalSize, PhysicalPosition, primaryMonitor } from "@tauri-apps/api/window";
import { disable, enable, isEnabled } from "@tauri-apps/plugin-autostart";
import { relaunch } from "@tauri-apps/plugin-process";
import { check, type Update } from "@tauri-apps/plugin-updater";
import { labelsFor, supportedLanguages, type AutostartStatus, type SettingsTab, type UpdateStatus } from "./app/i18n";
import { normalizePanelTransparency, panelAppearanceForTransparency } from "./app/appearance";
import { keycapPresentation } from "./app/keycaps";
import { defaultSettings, loadSettings, saveSettings, settingsStorageKey, shortcutKeyboardLayouts } from "./app/settings";
import {
  availableShortcutLevels,
  customPreferenceFromLevel,
  ensureCustomPreference,
  findSheetForSettingsFamily,
  isShortcutIncluded,
  layoutShortcutCategories,
  manualSheetOptions,
  selectSheet,
  sheetBadgeKeys,
  sheetFamily,
  sheetShortcutPreference,
  shouldShowShortcutBaselineWarning,
  sharedCommandKeys,
  shortcutKeysForLayout,
  shortcutRowLayout,
  shortcutThemeState,
  shortcutDisplayLevels,
  updateCustomCategoryPreference,
  updateCustomShortcutPreference,
  visibleShortcuts
} from "./app/sheets";
import { distributionFromEnv, isUpdateActionBusy, repositoryUrl, updateStateClass } from "./app/updates";
import {
  canStartWindowDrag,
  chooseShortcutFit,
  fitLogicalWindowSize,
  isPointerOnScrollbar,
  settingsWindowPreferredSize,
  sameShortcutFitState,
  shortcutFitDefaultState,
  shortcutWindowSizeForRenderedPanel,
  type LogicalWindowSize,
  type ShortcutFitContent,
  type ShortcutFitState,
  type WindowWorkArea
} from "./app/windowSizing";
import "./styles.css";
import type {
  ActiveApp,
  LanguageCode,
  SheetMode,
  ShortcutDisplayChoice,
  ShortcutDisplayLevel,
  ShortcutSheetPreference,
  ShortcutSheet,
  ShortcutPlacementPreset,
  ShortcutWarningLevel,
  ShortcutWarningMode,
  TextSize,
  ThemeMode,
  UserSettings
} from "./types";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("Missing #app root");
}

type ShortcutsOpenMode = "shortcuts" | "placement" | "preview";

interface ShortcutsOpenRequest {
  mode: ShortcutsOpenMode;
  activeApp: ActiveApp;
  preservePosition: boolean;
}

const app: HTMLElement = root;
const currentWindow = getCurrentWindow();
const isSettingsWindow = currentWindow.label === "settings";
const isShortcutsWindow = currentWindow.label === "shortcuts";
const isShortcutsPreviewWindow = currentWindow.label === "shortcuts-preview";
const isShortcutPanelWindow = isShortcutsWindow || isShortcutsPreviewWindow;

let settings = loadSettings();
let activeApp: ActiveApp | null = null;
let panelMode: "shortcuts" | "placement" = "shortcuts";
let settingsTab: SettingsTab = "general";
let selectedSettingsSheetFamily = sheetFamily(settings.manualSheetId);
let selectedCustomizationSheetFamily = selectedSettingsSheetFamily;
let autostartStatus: AutostartStatus = "syncing";
let updateStatus: UpdateStatus = "idle";
let pendingUpdate: Update | null = null;
let updateVersion: string | null = null;
let aboutModalOpen = false;
let resetConfirmationOpen = false;
let trayIconVisibilityStatus: AutostartStatus = "syncing";
let placementSnapshot: Pick<UserSettings, "shortcutPlacementMode" | "shortcutPlacementPreset" | "shortcutCustomPosition"> | null = null;
let closeCaptureBound = false;
let shortcutMoveListenerBound = false;
let shortcutFocusAutoHideBound = false;
let currentShortcutsOpenMode: ShortcutsOpenMode = "shortcuts";
let activeShortcutDragMode: ShortcutsOpenMode | null = null;
let shortcutDragMoved = false;
let shortcutDragSaveTimer: number | null = null;
let shortcutDragClearTimer: number | null = null;
let shortcutAutoHideTimer: number | null = null;
let shortcutPreviewMovedManually = false;
let responsiveWindowResizeBound = false;
let lastAppliedWindowSize: LogicalWindowSize | null = null;
let currentShortcutFitState: ShortcutFitState = shortcutFitDefaultState;
let devicePixelRatioMediaCleanup: (() => void) | null = null;
let appInfo = {
  name: "Merken",
  version: "0.1.0"
};

interface SettingsScrollSnapshot {
  settingsPage: number;
  customizationEditor: number;
}

const appIconUrl = new URL("../src-tauri/icons/32x32.png", import.meta.url).href;

const textSizes: TextSize[] = ["xs", "sm", "md", "lg", "xl"];
const themeModes: ThemeMode[] = ["dark", "light"];
const sheetModes: SheetMode[] = ["auto", "os", "manual"];
const shortcutPlacementPresets: ShortcutPlacementPreset[] = ["top-left", "top-right", "bottom-left", "bottom-right", "center"];
const shortcutWarningModes: ShortcutWarningMode[] = ["all", "danger-only", "off"];
const settingsTabs: SettingsTab[] = ["general", "appearance", "sheets", "customization", "about"];
const shortcutDisplayChoices: ShortcutDisplayChoice[] = [...shortcutDisplayLevels, "custom"];
const customizationTargetStorageKey = "merken.customizationTarget.v1";
const shortcutPreviewMovedStorageKey = "merken.shortcutPreviewMoved.v1";
const distribution = distributionFromEnv(import.meta.env.VITE_MERKEN_DISTRIBUTION);

function debugActiveAppLog(message: string, details?: unknown): void {
  if (import.meta.env.DEV) {
    console.debug("[merken:active-app]", message, details ?? "");
  }
}

function escapeHtml(value: string | number | boolean): string {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

function escapeAttribute(value: string | number | boolean): string {
  return escapeHtml(value);
}

function debugSheetSelection(context: string, selectedSheet: ShortcutSheet): void {
  if (!isShortcutPanelWindow) {
    return;
  }

  debugActiveAppLog(context, {
    activeApp,
    language: settings.language,
    shortcutLanguage: settings.shortcutLanguage,
    keyboardLayout: settings.keyboardLayout,
    panelMode,
    selectedSheetId: selectedSheet.id,
    sheetMode: settings.sheetMode
  });
}

async function refreshActiveApp(): Promise<void> {
  try {
    activeApp = await invoke<ActiveApp>("get_active_app");
    debugActiveAppLog("refreshActiveApp success", activeApp);
  } catch (error) {
    activeApp = { processName: null, title: null, sheetId: null };
    debugActiveAppLog("refreshActiveApp failed", error);
  }
}

function useActiveApp(nextActiveApp: ActiveApp, context: string): void {
  activeApp = nextActiveApp;
  debugActiveAppLog(context, activeApp);
}

function updateSettings(next: Partial<UserSettings>): void {
  settings = { ...settings, ...next };
  saveSettings(settings);
  renderSettingsStateChange();
}

function saveShortcutSheetPreference(family: string, preference: ShortcutSheetPreference): void {
  settings = {
    ...settings,
    shortcutSheetPreferences: {
      ...settings.shortcutSheetPreferences,
      [family]: preference
    }
  };
  saveSettings(settings);
}

function updateShortcutSheetLevel(family: string, level: ShortcutDisplayLevel): void {
  selectedSettingsSheetFamily = family;
  saveShortcutSheetPreference(family, {
    mode: "level",
    level
  });
  renderPreservingSettingsScroll();
}

function ensureCustomPreferenceForFamily(family: string): ShortcutSheetPreference | null {
  const sheet = findSheetForSettingsFamily(family, settings);

  if (!sheet) {
    return null;
  }

  const preference = sheetShortcutPreference(settings, sheet);
  const customPreference = preference.mode === "custom" ? preference : customPreferenceFromLevel(sheet, preference.level);

  saveShortcutSheetPreference(family, customPreference);
  return customPreference;
}

async function openCustomizationForFamily(family: string): Promise<void> {
  if (!ensureCustomPreferenceForFamily(family)) {
    return;
  }

  selectedSettingsSheetFamily = family;
  selectedCustomizationSheetFamily = family;

  if (isShortcutsWindow) {
    localStorage.setItem(customizationTargetStorageKey, family);
    await showSettingsWindow();
    await showShortcutPreviewForFamily(family);
    return;
  }

  settingsTab = "customization";
  render();
}

function applyCustomizationTarget(family: string | null): void {
  if (!isSettingsWindow || !family || !findSheetForSettingsFamily(family, settings)) {
    return;
  }

  settings = loadSettings();
  selectedSettingsSheetFamily = family;
  selectedCustomizationSheetFamily = family;
  settingsTab = "customization";
  ensureCustomPreferenceForFamily(family);
  localStorage.removeItem(customizationTargetStorageKey);
}

function updateCustomCategory(family: string, categoryId: string, checked: boolean): void {
  const sheet = findSheetForSettingsFamily(family, settings);
  const category = sheet?.categories.find((candidate) => candidate.id === categoryId);

  if (!sheet || !category) {
    return;
  }

  const preference = ensureCustomPreference(sheet, sheetShortcutPreference(settings, sheet));
  saveShortcutSheetPreference(family, updateCustomCategoryPreference(preference, category, checked));
  selectedCustomizationSheetFamily = family;
  renderPreservingSettingsScroll();
}

function updateCustomShortcut(family: string, categoryId: string, shortcutId: string, checked: boolean): void {
  const sheet = findSheetForSettingsFamily(family, settings);
  const category = sheet?.categories.find((candidate) => candidate.id === categoryId);
  const shortcut = category?.shortcuts.find((candidate) => candidate.id === shortcutId);

  if (!sheet || !category || !shortcut) {
    return;
  }

  const preference = ensureCustomPreference(sheet, sheetShortcutPreference(settings, sheet));
  saveShortcutSheetPreference(family, updateCustomShortcutPreference(preference, category, shortcut, checked));
  selectedCustomizationSheetFamily = family;
  renderPreservingSettingsScroll();
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

function nextAnimationFrame(): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });
}

function cssPixels(value: string): number {
  return Number.parseFloat(value) || 0;
}

function measureRenderedPanelWindowSize(targetSize?: LogicalWindowSize): LogicalWindowSize | null {
  const panel = document.querySelector<HTMLElement>(".panel");

  if (!panel) {
    return null;
  }

  const previousWidth = panel.style.width;
  const previousMaxHeight = panel.style.maxHeight;

  if (targetSize) {
    panel.style.width = `${Math.max(1, targetSize.width - 18)}px`;
    panel.style.maxHeight = "none";
  }

  try {
    const rect = panel.getBoundingClientRect();
    const style = getComputedStyle(panel);

    return {
      width: Math.ceil(Math.max(1, rect.width + cssPixels(style.marginLeft) + cssPixels(style.marginRight))),
      height: Math.ceil(Math.max(1, rect.height + cssPixels(style.marginTop) + cssPixels(style.marginBottom)))
    };
  } finally {
    if (targetSize) {
      panel.style.width = previousWidth;
      panel.style.maxHeight = previousMaxHeight;
    }
  }
}

async function currentWindowWorkArea(): Promise<WindowWorkArea | null> {
  try {
    const monitor = (await currentMonitor()) ?? (await primaryMonitor());

    if (!monitor) {
      return null;
    }

    return {
      size: {
        width: monitor.workArea.size.width,
        height: monitor.workArea.size.height
      },
      scaleFactor: monitor.scaleFactor || (await currentWindow.scaleFactor())
    };
  } catch {
    return null;
  }
}

function sameLogicalWindowSize(left: LogicalWindowSize | null, right: LogicalWindowSize): boolean {
  return Boolean(left && Math.abs(left.width - right.width) < 1 && Math.abs(left.height - right.height) < 1);
}

async function setCurrentWindowLogicalSize(size: LogicalWindowSize): Promise<void> {
  if (sameLogicalWindowSize(lastAppliedWindowSize, size)) {
    return;
  }

  await currentWindow.setSize(new LogicalSize(size.width, size.height));
  lastAppliedWindowSize = size;
}

async function resizeShortcutsWindowToPanel(): Promise<void> {
  if (!isShortcutPanelWindow) {
    return;
  }

  try {
    const workArea = await currentWindowWorkArea();
    const fitChanged = updateShortcutFitState(workArea);

    if (fitChanged) {
      render();
    }

    await setCurrentWindowLogicalSize(
      shortcutWindowSizeForRenderedPanel(
        currentShortcutFitState.desiredSize,
        measureRenderedPanelWindowSize(currentShortcutFitState.desiredSize)
      )
    );
  } catch (error) {
    debugActiveAppLog("resize shortcuts window failed", error);
  }
}

async function resizeSettingsWindowToWorkArea(): Promise<void> {
  if (!isSettingsWindow) {
    return;
  }

  try {
    const size = fitLogicalWindowSize(settingsWindowPreferredSize, settingsWindowPreferredSize, await currentWindowWorkArea());

    await setCurrentWindowLogicalSize(size);
  } catch (error) {
    debugActiveAppLog("resize settings window failed", error);
  }
}

async function resizeCurrentWindowToLayout(): Promise<void> {
  if (isShortcutPanelWindow) {
    await resizeShortcutsWindowToPanel();

    if (isShortcutsPreviewWindow && !shortcutPreviewMovedManually) {
      await positionShortcutsPreviewWindow();
    }

    if (isShortcutsWindow && currentShortcutsOpenMode === "shortcuts" && settings.shortcutPlacementMode !== "custom") {
      await applyShortcutPlacement();
    }

    return;
  }

  await resizeSettingsWindowToWorkArea();
}

async function positionShortcutsPreviewWindow(): Promise<void> {
  try {
    await invoke("position_shortcuts_preview_window");
  } catch {
    // The browser preview has no native shortcuts window.
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

async function syncTrayIconVisibility(): Promise<void> {
  if (!isSettingsWindow) {
    return;
  }

  trayIconVisibilityStatus = "syncing";
  render();

  try {
    await invoke("set_tray_icon_visibility", { visible: settings.trayIconVisible });
    trayIconVisibilityStatus = settings.trayIconVisible ? "enabled" : "disabled";
  } catch (error) {
    trayIconVisibilityStatus = "unavailable";
    console.warn("Unable to sync the Windows tray icon visibility.", error);
  }

  render();
}

async function setTrayIconVisible(enabled: boolean): Promise<void> {
  const previous = settings.trayIconVisible;

  settings = { ...settings, trayIconVisible: enabled };
  saveSettings(settings);
  trayIconVisibilityStatus = "syncing";
  renderSettingsStateChange();

  try {
    await invoke("set_tray_icon_visibility", { visible: enabled });
    trayIconVisibilityStatus = enabled ? "enabled" : "disabled";
  } catch (error) {
    settings = { ...settings, trayIconVisible: previous };
    saveSettings(settings);
    trayIconVisibilityStatus = "unavailable";
    console.warn("Unable to change the Windows tray icon visibility.", error);
  }

  renderSettingsStateChange();
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

async function copyCommandToClipboard(command: string, button: HTMLButtonElement): Promise<void> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(command);
    } else {
      copyTextWithFallback(command);
    }

    showCopiedState(button);
  } catch (error) {
    console.warn("Unable to copy command.", error);
  }
}

function copyTextWithFallback(value: string): void {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function showCopiedState(button: HTMLButtonElement): void {
  const labels = labelsFor(settings.language);
  const previousText = button.textContent ?? "";

  button.textContent = labels.settings.shortcutCopied;
  window.setTimeout(() => {
    if (button.isConnected) {
      button.textContent = previousText || labels.settings.shortcutCopy;
    }
  }, 900);
}

async function showSettingsWindow(): Promise<void> {
  try {
    await invoke("show_settings_window");
  } catch {
    // The browser preview has no native settings window.
  }
}

async function showShortcutPreviewForFamily(family: string): Promise<void> {
  const sheet = findSheetForSettingsFamily(family, settings);

  if (!sheet) {
    return;
  }

  try {
    const preservePosition = isSettingsWindow && shortcutPreviewMovedManually;

    await invoke("show_shortcuts_preview", { sheetId: sheet.id, preservePosition });
  } catch {
    // The browser preview has no native shortcuts window.
  }
}

async function hideShortcutPreview(resetMovedState = false): Promise<void> {
  if (resetMovedState) {
    shortcutPreviewMovedManually = false;
  }

  try {
    await invoke("hide_shortcuts_preview");
  } catch {
    // The browser preview has no native shortcuts window.
  }
}

async function syncSettingsShortcutPreview(): Promise<void> {
  if (!isSettingsWindow) {
    return;
  }

  try {
    if (!(await currentWindow.isVisible())) {
      return;
    }
  } catch {
    // The browser preview has no native window visibility state.
  }

  if (settingsTab === "sheets") {
    await showShortcutPreviewForFamily(selectedSettingsSheetFamily);
    return;
  }

  if (settingsTab === "customization") {
    await showShortcutPreviewForFamily(selectedCustomizationSheetFamily);
    return;
  }

  await hideShortcutPreview();
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
  if (isUpdateActionBusy(updateStatus)) {
    return;
  }

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

function updateStatusClassName(): string {
  const classes = [updateStateClass(updateStatus)];

  if (updateStatus === "checking" || updateStatus === "installing") {
    classes.push("state-progress");
  }

  return classes.filter(Boolean).join(" ");
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

function updateActionDisabledAttribute(): string {
  return isUpdateActionBusy(updateStatus) ? "disabled" : "";
}

function renderKey(key: string): string {
  const keycap = keycapPresentation(key);
  const classNames = [keycap.isSymbol ? "key-symbol" : "", keycap.className].filter(Boolean).join(" ");
  const classAttribute = classNames ? ` class="${escapeAttribute(classNames)}"` : "";

  return `<kbd${classAttribute} aria-label="${escapeAttribute(keycap.accessibleLabel)}" title="${escapeAttribute(keycap.accessibleLabel)}"><span class="keycap-label">${escapeHtml(keycap.label)}</span></kbd>`;
}

function renderSheetBadges(family: string): string {
  const labels = labelsFor(settings.language);

  return sheetBadgeKeys(family)
    .map((badgeKey) => {
      const badge = labels.sheetBadge[badgeKey];
      const badgeClassName =
        badgeKey === "windows-native"
          ? "sheet-badge-native"
          : badgeKey.startsWith("office-")
            ? "sheet-badge-office"
            : "sheet-badge-browser";
      const className = `sheet-badge ${badgeClassName}`;

      return `<span class="${escapeAttribute(className)}" title="${escapeAttribute(badge.help)}" aria-label="${escapeAttribute(badge.help)}">${escapeHtml(badge.label)}</span>`;
    })
    .join("");
}

function renderShortcutCommand(command: string | undefined): string {
  if (!command) {
    return "";
  }

  return `<small class="shortcut-command"><code>${escapeHtml(command)}</code></small>`;
}

function renderShortcutCommandLine(command: string | undefined): string {
  if (!command) {
    return "";
  }

  const labels = labelsFor(settings.language);

  return `
    <span class="shortcut-command-line">
      <code>${escapeHtml(command)}</code>
      <button
        type="button"
        class="shortcut-copy-button"
        data-copy-command="${escapeAttribute(command)}"
        aria-label="${escapeAttribute(labels.settings.shortcutCopyHelp)}"
        title="${escapeAttribute(labels.settings.shortcutCopyHelp)}"
      >${escapeHtml(labels.settings.shortcutCopy)}</button>
    </span>
  `;
}

function shouldShowWarningLevel(level: ShortcutWarningLevel): boolean {
  if (settings.shortcutWarningMode === "off") {
    return false;
  }

  return settings.shortcutWarningMode === "all" || level === "danger";
}

function shortcutPreventionNoteEntries(family: string, sheet: ShortcutSheet): { level: ShortcutWarningLevel; text: string }[] {
  const labels = labelsFor(settings.language);
  const notes = new Map<string, { level: ShortcutWarningLevel; text: string }>();

  if (shouldShowShortcutBaselineWarning(family) && shouldShowWarningLevel("info")) {
    notes.set(`info:${labels.settings.shortcutBaselineWarning}`, {
      level: "info",
      text: labels.settings.shortcutBaselineWarning
    });
  }

  for (const category of sheet.categories) {
    for (const shortcut of category.shortcuts) {
      if (!shortcut.warning || !shortcut.warningLevel || !shouldShowWarningLevel(shortcut.warningLevel)) {
        continue;
      }

      notes.set(`${shortcut.warningLevel}:${shortcut.warning}`, {
        level: shortcut.warningLevel,
        text: shortcut.warning
      });
    }
  }

  return [...notes.values()];
}

function renderShortcutPreventionNotes(family: string, sheet: ShortcutSheet): string {
  const notes = shortcutPreventionNoteEntries(family, sheet);

  if (notes.length === 0) {
    return "";
  }

  return `
    <div class="shortcut-prevention-notes">
      ${notes
        .map(
          (note) => `<p class="shortcut-prevention-note shortcut-prevention-note-${escapeAttribute(note.level)}">${escapeHtml(note.text)}</p>`
        )
        .join("")}
    </div>
  `;
}

function renderShortcutCategory(category: ShortcutSheet["categories"][number], cellWidth: number): string {
  const commandKeys = sharedCommandKeys(category, settings.keyboardLayout);
  const commandKeyHeader = commandKeys ? `<div class="section-keys">${commandKeys.map(renderKey).join("")}</div>` : "";
  const listClassName = commandKeys ? "shortcut-list shortcut-command-list" : "shortcut-list";

  return `
    <section class="shortcut-section ${commandKeys ? "shortcut-command-section" : ""}">
      <header class="shortcut-section-header">
        <h2>${escapeHtml(category.title)}</h2>
        ${commandKeyHeader}
      </header>
      <div class="${escapeAttribute(listClassName)}">
        ${category.shortcuts
          .map((shortcut) =>
            commandKeys
              ? `
                <article class="shortcut-row shortcut-command-row">
                  <span class="shortcut-text">
                    <strong>${escapeHtml(shortcut.label)}</strong>
                    ${renderShortcutCommandLine(shortcut.command)}
                  </span>
                </article>
              `
              : renderShortcutRow(shortcut, cellWidth)
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderShortcutRow(shortcut: ShortcutSheet["categories"][number]["shortcuts"][number], cellWidth: number): string {
  const rowLayout = shortcutRowLayout(shortcut, settings.keyboardLayout, cellWidth);
  const rowClassName = ["shortcut-row", rowLayout === "stacked" ? "shortcut-row-stacked" : ""].filter(Boolean).join(" ");

  return `
    <article class="${escapeAttribute(rowClassName)}">
      <div class="keys">${shortcutKeysForLayout(shortcut, settings.keyboardLayout).map(renderKey).join("")}</div>
      <span class="shortcut-text">
        <strong>${escapeHtml(shortcut.label)}</strong>
        ${renderShortcutCommand(shortcut.command)}
      </span>
    </article>
  `;
}

function renderShortcutCategories(sheet: ShortcutSheet, cellWidth: number): string {
  return layoutShortcutCategories(sheet.categories).map((category) => renderShortcutCategory(category, cellWidth)).join("");
}

function renderShortcutChoiceSwitch(
  family: string,
  preference: ShortcutSheetPreference,
  availableLevels: Record<ShortcutDisplayLevel, boolean>,
  className = ""
): string {
  const labels = labelsFor(settings.language);
  const selectedChoice: ShortcutDisplayChoice = preference.mode === "custom" ? "custom" : preference.level;

  return `
    <div class="level-switch ${escapeAttribute(className)}" role="group" aria-label="${escapeAttribute(labels.settings.sheetLevel)}">
      ${shortcutDisplayChoices
        .map((choice) => {
          const available = choice === "custom" || availableLevels[choice];

          return `
            <button
              type="button"
              class="${selectedChoice === choice ? "active" : ""}"
              data-shortcut-family="${escapeAttribute(family)}"
              data-shortcut-choice="${escapeAttribute(choice)}"
              aria-pressed="${selectedChoice === choice}"
              ${available ? "" : "disabled"}
            >
              ${escapeHtml(labels.shortcutDisplayChoice[choice])}
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function textSizeClass(textSize: TextSize): string {
  return `text-${textSize}`;
}

function applyPanelTransparency(value: number): void {
  const appearance = panelAppearanceForTransparency(value);

  app.style.setProperty("--panel-background-opacity", `${appearance.backgroundOpacity}%`);
  app.style.setProperty("--panel-backdrop-blur", `${appearance.backdropBlur}px`);
  app.style.setProperty("--panel-saturation", String(appearance.saturation));
}

function themeClass(theme: ThemeMode): string {
  return theme === "dark" ? "" : "theme-light";
}

function contrastClass(enhancedContrast: boolean): string {
  return enhancedContrast ? "theme-enhanced-contrast" : "";
}

function captureSettingsScroll(): SettingsScrollSnapshot {
  return {
    settingsPage: document.querySelector<HTMLElement>(".settings-page")?.scrollTop ?? 0,
    customizationEditor: document.querySelector<HTMLElement>(".customization-editor")?.scrollTop ?? 0
  };
}

function restoreSettingsScroll(snapshot: SettingsScrollSnapshot): void {
  const settingsPage = document.querySelector<HTMLElement>(".settings-page");
  const customizationEditor = document.querySelector<HTMLElement>(".customization-editor");

  if (settingsPage) {
    settingsPage.scrollTop = snapshot.settingsPage;
  }

  if (customizationEditor) {
    customizationEditor.scrollTop = snapshot.customizationEditor;
  }
}

function renderPreservingSettingsScroll(): void {
  const scrollSnapshot = captureSettingsScroll();

  render();
  restoreSettingsScroll(scrollSnapshot);
}

function renderSettingsStateChange(): void {
  if (isSettingsWindow) {
    renderPreservingSettingsScroll();
    return;
  }

  render();
}

function currentVisibleShortcutSheet(): { family: string; selectedSheet: ShortcutSheet; sheet: ShortcutSheet } {
  const selectedSheet = selectSheet(settings, activeApp);
  const selectedSheetPreference = sheetShortcutPreference(settings, selectedSheet);
  const selectedSheetFamily = sheetFamily(selectedSheet.id);

  return {
    family: selectedSheetFamily,
    selectedSheet,
    sheet: visibleShortcuts(selectedSheet, selectedSheetPreference)
  };
}

function shortcutFitContentForSheet(family: string, sheet: ShortcutSheet): ShortcutFitContent {
  return {
    categoryShortcutCounts: sheet.categories.map((category) => category.shortcuts.length),
    noteCount: shortcutPreventionNoteEntries(family, sheet).length
  };
}

function updateShortcutFitState(workArea: WindowWorkArea | null): boolean {
  if (!isShortcutPanelWindow) {
    return false;
  }

  const { family, sheet } = currentVisibleShortcutSheet();
  const nextFitState = chooseShortcutFit(shortcutFitContentForSheet(family, sheet), workArea);

  if (sameShortcutFitState(currentShortcutFitState, nextFitState)) {
    return false;
  }

  currentShortcutFitState = nextFitState;
  return true;
}

function shortcutPanelStyle(fitState: ShortcutFitState): string {
  const panelWidth = Math.max(1, fitState.desiredSize.width - 18);
  const panelHeight = Math.max(1, fitState.desiredSize.height - 18);

  return [
    `--shortcut-column-count: ${fitState.columnCount}`,
    `--shortcut-panel-max-width: ${panelWidth}px`,
    `--shortcut-panel-max-height: ${panelHeight}px`,
    `--shortcut-fit-cell-width: ${fitState.cellWidth}px`
  ].join("; ");
}

function render(): void {
  const labels = labelsFor(settings.language);
  const { family: selectedSheetFamily, selectedSheet, sheet } = currentVisibleShortcutSheet();
  const isPlacement = panelMode === "placement";
  const shortcutFitState = currentShortcutFitState;
  const categories = renderShortcutCategories(sheet, shortcutFitState.cellWidth);
  const shortcutPreventionNotes = !isPlacement ? renderShortcutPreventionNotes(selectedSheetFamily, sheet) : "";
  const panelClassName = [
    "panel",
    isSettingsWindow ? "panel-settings" : "panel-shortcuts",
    isPlacement ? "panel-placement" : "",
    !isSettingsWindow ? `shortcut-density-${shortcutFitState.density}` : "",
    !isSettingsWindow ? `shortcut-columns-${shortcutFitState.columnCount}` : ""
  ]
    .filter(Boolean)
    .join(" ");
  const panelStyleAttribute = !isSettingsWindow ? ` style="${escapeAttribute(shortcutPanelStyle(shortcutFitState))}"` : "";

  debugSheetSelection("render selected sheet", selectedSheet);
  applyPanelTransparency(settings.panelTransparency);

  app.className = [
    themeClass(settings.theme),
    contrastClass(settings.enhancedContrast),
    textSizeClass(settings.textSize)
  ]
    .filter(Boolean)
    .join(" ");
  app.innerHTML = `
    <section class="${escapeAttribute(panelClassName)}"${panelStyleAttribute} aria-label="Merken">
      ${
        isSettingsWindow
          ? renderSettings()
          : `
            <div class="content">${categories}</div>
            ${shortcutPreventionNotes}
            ${
              isPlacement
                ? `
                  <div class="placement-bar">
                    <span>${escapeHtml(labels.settings.placementHelp)}</span>
                    <button type="button" id="confirm-placement">${escapeHtml(labels.settings.confirmPlacement)}</button>
                    <button type="button" id="cancel-placement">${escapeHtml(labels.settings.cancelPlacement)}</button>
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
              <h2 id="about-title">${escapeHtml(labels.modal.aboutTitle)}</h2>
              <dl>
                <div>
                  <dt>${escapeHtml(labels.modal.name)}</dt>
                  <dd>${escapeHtml(appInfo.name)}</dd>
                </div>
                <div>
                  <dt>${escapeHtml(labels.modal.version)}</dt>
                  <dd>${escapeHtml(appInfo.version)}</dd>
                </div>
                <div>
                  <dt>${escapeHtml(labels.modal.publisher)}</dt>
                  <dd>Idao</dd>
                </div>
                <div>
                  <dt>GitHub</dt>
                  <dd>${escapeHtml(repositoryUrl)}</dd>
                </div>
                <div>
                  <dt>${escapeHtml(labels.modal.license)}</dt>
                  <dd>${escapeHtml(labels.modal.licenseValue)}</dd>
                </div>
              </dl>
              <button type="button" id="close-about">${escapeHtml(labels.modal.close)}</button>
            </section>
          </div>
        `
        : ""
    }
    ${
      resetConfirmationOpen
        ? `
          <div class="modal-backdrop" role="presentation">
            <section class="modal modal-confirm" role="dialog" aria-modal="true" aria-labelledby="reset-title" aria-describedby="reset-message">
              <h2 id="reset-title">${escapeHtml(labels.modal.resetTitle)}</h2>
              <p id="reset-message">${escapeHtml(labels.modal.resetMessage)}</p>
              <div class="modal-actions">
                <button type="button" id="cancel-reset">${escapeHtml(labels.modal.resetCancel)}</button>
                <button type="button" class="danger-button" id="confirm-reset">${escapeHtml(labels.modal.resetConfirm)}</button>
              </div>
            </section>
          </div>
        `
        : ""
    }
  `;

  bindEvents();
  void syncSettingsShortcutPreview();
}

function renderSettings(): string {
  const labels = labelsFor(settings.language);

  return `
    <form class="settings-shell" id="settings-form">
      <aside class="settings-sidebar" aria-label="${escapeAttribute(labels.settings.about)}">
        <div class="brand">
          <img class="brand-mark" src="${escapeAttribute(appIconUrl)}" alt="" aria-hidden="true" />
          <strong>Merken</strong>
        </div>
        <nav class="settings-tabs" aria-label="Options">
          ${settingsTabs
            .map(
              (tab) => `
                <button type="button" class="settings-tab ${settingsTab === tab ? "active" : ""}" data-settings-tab="${escapeAttribute(tab)}">
                  ${escapeHtml(labels.tabs[tab])}
                </button>
              `
            )
            .join("")}
        </nav>
        <button type="button" class="settings-sidebar-footer" id="check-update-sidebar" ${updateActionDisabledAttribute()}>
          <span class="settings-sidebar-update-title">
            <span>${escapeHtml(labels.settings.update)}</span>
            <small class="settings-sidebar-version">Version ${escapeHtml(appInfo.version)}</small>
          </span>
          <small class="${escapeAttribute(updateStatusClassName())}">${escapeHtml(updateStatusText())}</small>
        </button>
      </aside>
      <main class="settings-page">
        <header class="settings-header">
          <h1>${escapeHtml(labels.tabs[settingsTab])}</h1>
          <button type="button" class="settings-close" id="close-settings" aria-label="Fermer">x</button>
        </header>
        ${renderSettingsTab()}
      </main>
    </form>
  `;
}

function renderSettingsTab(): string {
  const labels = labelsFor(settings.language);

  if (settingsTab === "appearance") {
    return `
      <section class="settings-group">
        <h2>${escapeHtml(labels.sections.display)}</h2>
        ${renderSelectRow(labels.settings.theme, "theme", themeModes, settings.theme, (theme) => labels.theme[theme])}
        ${renderToggleRow(
          labels.settings.enhancedContrast,
          "enhancedContrast",
          settings.enhancedContrast
        )}
        ${renderSelectRow(labels.settings.textSize, "textSize", textSizes, settings.textSize, (size) => labels.textSize[size])}
        ${renderRangeRow(labels.settings.transparency, "panelTransparency", settings.panelTransparency)}
      </section>
      <section class="settings-group">
        <h2>${escapeHtml(labels.sections.shortcutPlacement)}</h2>
        ${renderSelectRow(
          labels.settings.placementPreset,
          "shortcutPlacementPreset",
          shortcutPlacementPresets,
          settings.shortcutPlacementPreset,
          (preset) => labels.shortcutPlacementPreset[preset]
        )}
      </section>
    `;
  }

  if (settingsTab === "sheets") {
    return `
      <section class="settings-group">
        <h2>${escapeHtml(labels.sections.behavior)}</h2>
        ${renderSelectRow(labels.settings.sheet, "sheetMode", sheetModes, settings.sheetMode, (mode) => labels.sheetMode[mode])}
        ${renderSelectRow(labels.settings.manualSheet, "manualSheetId", manualSheetOptions(settings.language, true).map((option) => option.key), sheetFamily(settings.manualSheetId), (key) => manualSheetOptions(settings.language, true).find((option) => option.key === key)?.label ?? key)}
      </section>
      <section class="settings-group">
        <h2>${escapeHtml(labels.sections.availableSheets)}</h2>
        <p class="settings-note">${escapeHtml(labels.settings.sheetLibraryIntro)}</p>
        <div class="sheet-library">
          ${renderSheetLibraryRows()}
        </div>
      </section>
    `;
  }

  if (settingsTab === "customization") {
    return renderCustomizationTab();
  }

  if (settingsTab === "about") {
    return `
      <section class="settings-group">
        <h2>${escapeHtml(labels.sections.application)}</h2>
        ${renderInfoRow(labels.modal.name, appInfo.name)}
        ${renderInfoRow(labels.modal.version, appInfo.version)}
        ${renderInfoRow(labels.modal.publisher, "Idao")}
        ${renderInfoRow(labels.modal.license, labels.modal.licenseValue)}
        ${renderLinkRow(labels.settings.repository, repositoryUrl, "open-repository")}
        <button type="button" class="link-button settings-update" id="check-update" ${updateActionDisabledAttribute()}>
          <span>${escapeHtml(labels.settings.update)}</span>
          <small class="${escapeAttribute(updateStatusClassName())}">${escapeHtml(updateStatusText())}</small>
        </button>
      </section>
    `;
  }

  return `
      <section class="settings-group">
        <h2>${escapeHtml(labels.sections.functioning)}</h2>
        ${renderSelectRow(
          labels.settings.language,
          "language",
          supportedLanguages,
          settings.language,
          (language) => labelsFor(language).languageName,
          labels.settings.languageHelp
        )}
        ${renderSelectRow(
          labels.settings.shortcutLanguage,
          "shortcutLanguage",
          supportedLanguages,
          settings.shortcutLanguage,
          (language) => labelsFor(language).languageName,
          labels.settings.shortcutLanguageHelp
        )}
        ${renderSelectRow(
          labels.settings.keyboardLayout,
          "keyboardLayout",
          shortcutKeyboardLayouts,
          settings.keyboardLayout,
          (layout) => labels.keyboardLayout[layout],
          labels.settings.keyboardLayoutHelp
        )}
        ${renderToggleRow(labels.settings.startWithWindows, "startWithWindows", settings.startWithWindows, labels.autostart[autostartStatus])}
        ${renderToggleRow(labels.settings.trayIconVisible, "trayIconVisible", settings.trayIconVisible, labels.autostart[trayIconVisibilityStatus])}
        ${renderSelectRow(
          labels.settings.shortcutWarningMode,
          "shortcutWarningMode",
          shortcutWarningModes,
          settings.shortcutWarningMode,
          (mode) => labels.shortcutWarningMode[mode]
        )}
      </section>
      <section class="settings-group">
      <h2>${escapeHtml(labels.sections.reset)}</h2>
      <p class="settings-note">${escapeHtml(labels.settings.resetHelp)}</p>
      <button type="button" class="secondary-button reset-button" id="reset-settings">${escapeHtml(labels.settings.reset)}</button>
    </section>
  `;
}

function renderSheetLibraryRows(): string {
  return manualSheetOptions(settings.language)
    .map((option) => {
      const sheet = findSheetForSettingsFamily(option.key, settings);

      if (!sheet) {
        return "";
      }

      const preference = sheetShortcutPreference(settings, sheet);

      return `
        <div class="sheet-family-row ${selectedSettingsSheetFamily === option.key ? "active" : ""}">
          <button type="button" class="sheet-family-name" data-sheet-preview-family="${escapeAttribute(option.key)}"><span>${escapeHtml(option.label)}</span>${renderSheetBadges(option.key)}</button>
          ${renderShortcutChoiceSwitch(option.key, preference, availableShortcutLevels(sheet), "sheet-level-switch")}
        </div>
      `;
    })
    .join("");
}

function renderCustomizationTab(): string {
  const labels = labelsFor(settings.language);
  const sheet = findSheetForSettingsFamily(selectedCustomizationSheetFamily, settings) ?? getCurrentSettingsFallbackSheet();
  const family = sheetFamily(sheet.id);
  const preference = ensureCustomPreference(sheet, sheetShortcutPreference(settings, sheet));

  selectedCustomizationSheetFamily = family;

  return `
    <section class="settings-group">
      <h2>${escapeHtml(labels.sections.customization)}</h2>
      <p class="settings-note">${escapeHtml(labels.settings.customizationIntro)}</p>
      ${renderSelectRow(
        labels.settings.sheet,
        "customizationSheetFamily",
        manualSheetOptions(settings.language, true).map((option) => option.key),
        family,
        (key) => manualSheetOptions(settings.language, true).find((option) => option.key === key)?.label ?? key
      )}
    </section>
    <section class="customization-editor" aria-label="${escapeAttribute(labels.sections.customization)}">
      ${renderCustomizationEditor(sheet, preference)}
    </section>
  `;
}

function renderCustomizationEditor(sheet: ShortcutSheet, preference: ShortcutSheetPreference): string {
  const labels = labelsFor(settings.language);
  const family = sheetFamily(sheet.id);

  return sheet.categories
    .map((category) => {
      const state = shortcutThemeState(category, preference);

      return `
        <section class="custom-theme">
          <label class="custom-theme-row">
            <input
              type="checkbox"
              data-custom-family="${escapeAttribute(family)}"
              data-custom-category="${escapeAttribute(category.id)}"
              data-theme-state="${escapeAttribute(state)}"
              ${state === "checked" ? "checked" : ""}
            />
            <span>
              <strong>${escapeHtml(category.title)}</strong>
              <small>${escapeHtml(labels.settings.allShortcutsInTheme)}</small>
            </span>
          </label>
          <div class="custom-shortcut-list">
            ${category.shortcuts
              .map(
                (shortcut) => `
                  <label class="custom-shortcut-row">
                    <input
                      type="checkbox"
                      data-custom-family="${escapeAttribute(family)}"
                      data-custom-category="${escapeAttribute(category.id)}"
                      data-custom-shortcut="${escapeAttribute(shortcut.id)}"
                      ${isShortcutIncluded(category, shortcut, preference) ? "checked" : ""}
                    />
                    <span class="keys">${shortcutKeysForLayout(shortcut, settings.keyboardLayout).map(renderKey).join("")}</span>
                    <span class="custom-shortcut-label">
                      <strong>${escapeHtml(shortcut.label)}</strong>
                      ${renderShortcutCommand(shortcut.command)}
                    </span>
                  </label>
                `
              )
              .join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function getCurrentSettingsFallbackSheet(): ShortcutSheet {
  return findSheetForSettingsFamily(selectedSettingsSheetFamily, settings) ?? selectSheet(settings, activeApp);
}

function renderSelectRow<T extends string>(
  label: string,
  name: string,
  values: T[],
  selected: T,
  labelForValue: (value: T) => string,
  help?: string
): string {
  const selectId = `setting-${name}`;

  return `
    <label class="settings-row">
      <span class="settings-row-label">
        <span>${escapeHtml(label)}</span>
        ${help ? renderSettingHelp(`${selectId}-help`, help) : ""}
      </span>
      <select name="${escapeAttribute(name)}" id="${escapeAttribute(selectId)}" ${help ? `aria-describedby="${escapeAttribute(`${selectId}-help`)}"` : ""}>
        ${values.map((value) => `<option value="${escapeAttribute(value)}" ${selected === value ? "selected" : ""}>${escapeHtml(labelForValue(value))}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderSettingHelp(id: string, text: string): string {
  return `
    <span class="settings-help">
      <span class="settings-help-trigger" tabindex="0" aria-describedby="${escapeAttribute(id)}">?</span>
      <span class="settings-help-tooltip" id="${escapeAttribute(id)}" role="tooltip">${escapeHtml(text)}</span>
    </span>
  `;
}

function renderToggleRow(label: string, name: string, checked: boolean, status?: string): string {
  return `
    <label class="settings-row toggle-row">
      <span>${escapeHtml(label)}${status ? `<small>${escapeHtml(status)}</small>` : ""}</span>
      <input type="checkbox" name="${escapeAttribute(name)}" ${checked ? "checked" : ""} />
      <i aria-hidden="true"></i>
    </label>
  `;
}

function renderInfoRow(label: string, value: string): string {
  return `
    <div class="settings-row info-row">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function renderLinkRow(label: string, value: string, id: string): string {
  return `
    <button type="button" class="link-button settings-row info-row" id="${escapeAttribute(id)}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </button>
  `;
}

function resetSettingsToDefaults(): void {
  settings = defaultSettings;
  updateStatus = "idle";
  resetConfirmationOpen = false;
  saveSettings(settings);
  void setTrayLanguage(settings.language);
  void syncTrayIconVisibility();
  render();
}

function isInteractiveElement(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest("button, select, input, a, label, textarea, [data-settings-tab]"));
}

function renderRangeRow(label: string, name: string, value: number): string {
  const normalizedValue = normalizePanelTransparency(value);

  return `
    <label class="settings-row range-row">
      <span>${escapeHtml(label)}</span>
      <span class="range-control" style="--range-progress: ${normalizedValue}%">
        <input
          type="range"
          name="${escapeAttribute(name)}"
          min="0"
          max="100"
          step="5"
          value="${normalizedValue}"
          aria-label="${escapeAttribute(label)}"
        />
        <output data-range-value="${escapeAttribute(name)}">${normalizedValue} %</output>
      </span>
    </label>
  `;
}

function isScrollbarPointerDown(event: PointerEvent): boolean {
  if (!(event.target instanceof Element)) {
    return false;
  }

  let element: Element | null = event.target;

  while (element) {
    if (element instanceof HTMLElement) {
      const style = getComputedStyle(element);
      const scrollableOverflow = ["auto", "scroll", "overlay"];
      const scrollable =
        scrollableOverflow.includes(style.overflowY) ||
        scrollableOverflow.includes(style.overflowX) ||
        scrollableOverflow.includes(style.overflow);

      if (
        scrollable &&
        isPointerOnScrollbar({
          clientHeight: element.clientHeight,
          clientWidth: element.clientWidth,
          clientX: event.clientX,
          clientY: event.clientY,
          rect: element.getBoundingClientRect(),
          scrollHeight: element.scrollHeight,
          scrollWidth: element.scrollWidth
        })
      ) {
        return true;
      }
    }

    element = element.parentElement;
  }

  return false;
}

function shouldStartWindowDrag(event: Event): event is PointerEvent {
  return (
    event instanceof PointerEvent &&
    canStartWindowDrag({
      button: event.button,
      isInteractiveTarget: isInteractiveElement(event.target),
      isScrollbarTarget: isScrollbarPointerDown(event)
    })
  );
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

function clearShortcutDragTimers(): void {
  if (shortcutDragSaveTimer !== null) {
    window.clearTimeout(shortcutDragSaveTimer);
    shortcutDragSaveTimer = null;
  }

  if (shortcutDragClearTimer !== null) {
    window.clearTimeout(shortcutDragClearTimer);
    shortcutDragClearTimer = null;
  }
}

async function startShortcutPanelDrag(): Promise<void> {
  activeShortcutDragMode = currentShortcutsOpenMode;
  shortcutDragMoved = false;
  clearShortcutDragTimers();
  if (activeShortcutDragMode === "shortcuts") {
    await setPanelKeepVisible(true);
  }

  shortcutDragClearTimer = window.setTimeout(() => {
    if (!shortcutDragMoved) {
      if (activeShortcutDragMode === "shortcuts") {
        void setPanelKeepVisible(false);
      }

      activeShortcutDragMode = null;
    }

    shortcutDragClearTimer = null;
  }, 3000);
  await startWindowDrag();
}

function bindShortcutMoveListener(): void {
  if (!isShortcutPanelWindow || shortcutMoveListenerBound) {
    return;
  }

  shortcutMoveListenerBound = true;
  void currentWindow.onMoved(() => {
    scheduleShortcutDragCompletion();
  }).catch((error) => {
    console.warn("Unable to observe shortcut window movement.", error);
  });
}

function clearShortcutAutoHideTimer(): void {
  if (shortcutAutoHideTimer !== null) {
    window.clearTimeout(shortcutAutoHideTimer);
    shortcutAutoHideTimer = null;
  }
}

function scheduleShortcutFocusAutoHide(): void {
  if (!isShortcutsWindow || currentShortcutsOpenMode !== "shortcuts" || activeShortcutDragMode) {
    return;
  }

  clearShortcutAutoHideTimer();
  shortcutAutoHideTimer = window.setTimeout(async () => {
    shortcutAutoHideTimer = null;
    if (!isShortcutsWindow || currentShortcutsOpenMode !== "shortcuts" || activeShortcutDragMode) {
      return;
    }

    try {
      if (await currentWindow.isFocused()) {
        return;
      }
    } catch {
      // The native focus check is only available in the Tauri window.
    }

    await setPanelKeepVisible(false);
    await hideShortcutsWindow();
  }, 160);
}

function bindShortcutFocusAutoHide(): void {
  if (!isShortcutsWindow || shortcutFocusAutoHideBound) {
    return;
  }

  shortcutFocusAutoHideBound = true;
  void currentWindow.onFocusChanged(({ payload: focused }) => {
    if (focused) {
      clearShortcutAutoHideTimer();
      return;
    }

    scheduleShortcutFocusAutoHide();
  }).catch((error) => {
    debugActiveAppLog("bind shortcut focus auto-hide failed", error);
  });
  window.addEventListener("blur", scheduleShortcutFocusAutoHide);
}

function scheduleShortcutDragCompletion(): void {
  if (!activeShortcutDragMode || activeShortcutDragMode === "placement") {
    return;
  }

  const completedMode = activeShortcutDragMode;
  shortcutDragMoved = true;

  if (shortcutDragClearTimer !== null) {
    window.clearTimeout(shortcutDragClearTimer);
    shortcutDragClearTimer = null;
  }

  if (shortcutDragSaveTimer !== null) {
    window.clearTimeout(shortcutDragSaveTimer);
  }

  shortcutDragSaveTimer = window.setTimeout(() => {
    shortcutDragSaveTimer = null;
    activeShortcutDragMode = null;

    if (completedMode === "preview") {
      shortcutPreviewMovedManually = true;
      localStorage.setItem(shortcutPreviewMovedStorageKey, String(Date.now()));
      return;
    }

    void saveCurrentShortcutPanelPosition().finally(() => {
      void setPanelKeepVisible(false);
    });
  }, 240);
}

async function saveCurrentShortcutPanelPosition(): Promise<void> {
  try {
    const position = await currentWindow.outerPosition();
    settings = {
      ...settings,
      shortcutPlacementMode: "custom",
      shortcutCustomPosition: { x: position.x, y: position.y }
    };
    saveSettings(settings);
  } catch (error) {
    debugActiveAppLog("save shortcut panel position failed", error);
  }
}

async function hideCurrentWindow(): Promise<void> {
  try {
    await invoke("hide_current_window");
  } catch {
    await currentWindow.hide();
  }
}

async function closeSettingsWindow(): Promise<void> {
  await hideShortcutPreview(true);
  await hideCurrentWindow();
}

async function showPreparedShortcutsWindow(focus = true): Promise<void> {
  try {
    await currentWindow.show();
    if (focus) {
      await currentWindow.setFocus();
    }
  } catch (error) {
    debugActiveAppLog("showPreparedShortcutsWindow failed", error);
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

async function enterPlacementMode(requestActiveApp?: ActiveApp): Promise<void> {
  settings = loadSettings();
  placementSnapshot = {
    shortcutPlacementMode: settings.shortcutPlacementMode,
    shortcutPlacementPreset: settings.shortcutPlacementPreset,
    shortcutCustomPosition: settings.shortcutCustomPosition
  };
  panelMode = "placement";
  await setPanelKeepVisible(true);
  if (requestActiveApp) {
    useActiveApp(requestActiveApp, "placement activeApp from open request");
  } else {
    await refreshActiveApp();
  }
  render();
  await resizeShortcutsWindowToPanel();
  await applyShortcutPlacement();
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
  await showSettingsWindow();
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

function bindResponsiveWindowResize(): void {
  if (responsiveWindowResizeBound) {
    return;
  }

  responsiveWindowResizeBound = true;
  bindDevicePixelRatioChange();
  window.addEventListener("resize", () => {
    void resizeCurrentWindowToLayout();
  });
  void currentWindow
    .onScaleChanged(() => {
      void resizeCurrentWindowToLayout();
    })
    .catch((error) => {
      debugActiveAppLog("bind scale resize failed", error);
    });
  void currentWindow
    .onFocusChanged(({ payload: focused }) => {
      if (focused) {
        void resizeCurrentWindowToLayout();
      }
    })
    .catch((error) => {
      debugActiveAppLog("bind focus resize failed", error);
    });
}

function bindDevicePixelRatioChange(): void {
  if (!window.matchMedia) {
    return;
  }

  const bindCurrentRatio = () => {
    devicePixelRatioMediaCleanup?.();

    const ratio = window.devicePixelRatio || 1;
    const media = window.matchMedia(`(resolution: ${ratio}dppx)`);
    const handleChange = () => {
      void resizeCurrentWindowToLayout();
      bindCurrentRatio();
    };

    media.addEventListener("change", handleChange);
    devicePixelRatioMediaCleanup = () => media.removeEventListener("change", handleChange);
  };

  bindCurrentRatio();
}

function bindEvents(): void {
  bindResponsiveWindowResize();
  bindShortcutMoveListener();
  bindShortcutFocusAutoHide();

  if (!closeCaptureBound) {
    closeCaptureBound = true;
    document.addEventListener(
      "pointerdown",
      (event) => {
        if (event.target instanceof Element && event.target.closest("#close-settings")) {
          event.preventDefault();
          event.stopPropagation();
          void closeSettingsWindow();
        }
      },
      { capture: true }
    );
  }

  document.querySelector(".panel-settings")?.addEventListener("pointerdown", (event) => {
    if (shouldStartWindowDrag(event)) {
      event.preventDefault();
      void startWindowDrag();
    }
  });

  document.querySelector(".panel-shortcuts")?.addEventListener("pointerdown", (event) => {
    if (shouldStartWindowDrag(event)) {
      event.preventDefault();
      void startShortcutPanelDrag();
    }
  });

  document.querySelector("#close-settings")?.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    void closeSettingsWindow();
  });

  document.querySelector("#close-settings")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    void closeSettingsWindow();
  });

  document.querySelectorAll<HTMLButtonElement>("[data-settings-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      settingsTab = button.dataset.settingsTab as SettingsTab;
      render();
    });
  });

  document.querySelectorAll<HTMLInputElement>("[data-theme-state='indeterminate']").forEach((input) => {
    input.indeterminate = true;
  });

  document.querySelectorAll<HTMLButtonElement>("[data-sheet-preview-family]").forEach((button) => {
    button.addEventListener("click", () => {
      const family = button.dataset.sheetPreviewFamily;

      if (!family) {
        return;
      }

      selectedSettingsSheetFamily = family;
      renderPreservingSettingsScroll();
    });
  });

  document.querySelectorAll<HTMLButtonElement>("[data-shortcut-family][data-shortcut-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const family = button.dataset.shortcutFamily;
      const choice = button.dataset.shortcutChoice as ShortcutDisplayChoice | undefined;

      if (!family || !choice || button.disabled) {
        return;
      }

      if (choice === "custom") {
        void openCustomizationForFamily(family);
        return;
      }

      updateShortcutSheetLevel(family, choice);
    });
  });

  document.querySelector("#reset-settings")?.addEventListener("click", () => {
    resetConfirmationOpen = true;
    render();
  });

  document.querySelector("#cancel-reset")?.addEventListener("click", () => {
    resetConfirmationOpen = false;
    render();
  });

  document.querySelector("#confirm-reset")?.addEventListener("click", () => {
    resetSettingsToDefaults();
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

  document.querySelector("#open-repository")?.addEventListener("click", () => {
    void openRepository();
  });

  document.querySelectorAll<HTMLButtonElement>("[data-copy-command]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const command = button.dataset.copyCommand;

      if (command) {
        void copyCommandToClipboard(command, button);
      }
    });
  });

  document.querySelector("#confirm-placement")?.addEventListener("click", () => {
    void confirmPlacement();
  });

  document.querySelector("#cancel-placement")?.addEventListener("click", () => {
    void cancelPlacement();
  });

  document.querySelector("#settings-form")?.addEventListener("input", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement) || target.name !== "panelTransparency") {
      return;
    }

    const panelTransparency = normalizePanelTransparency(Number(target.value));
    settings = { ...settings, panelTransparency };
    saveSettings(settings);
    applyPanelTransparency(panelTransparency);

    const rangeControl = target.closest<HTMLElement>(".range-control");
    rangeControl?.style.setProperty("--range-progress", `${panelTransparency}%`);
    const output = rangeControl?.querySelector<HTMLOutputElement>("[data-range-value='panelTransparency']");
    if (output) {
      output.value = `${panelTransparency} %`;
      output.textContent = `${panelTransparency} %`;
    }
  });

  document.querySelector("#settings-form")?.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;

    if (target.name === "customizationSheetFamily") {
      void openCustomizationForFamily(String(value));
      return;
    }

    if (target instanceof HTMLInputElement && target.dataset.customCategory && !target.dataset.customShortcut) {
      updateCustomCategory(target.dataset.customFamily ?? selectedCustomizationSheetFamily, target.dataset.customCategory, target.checked);
      return;
    }

    if (target instanceof HTMLInputElement && target.dataset.customCategory && target.dataset.customShortcut) {
      updateCustomShortcut(
        target.dataset.customFamily ?? selectedCustomizationSheetFamily,
        target.dataset.customCategory,
        target.dataset.customShortcut,
        target.checked
      );
      return;
    }

    if (target.name === "startWithWindows") {
      void setStartWithWindows(Boolean(value));
      return;
    }

    if (target.name === "trayIconVisible") {
      void setTrayIconVisible(Boolean(value));
      return;
    }

    if (target.name === "panelTransparency") {
      updateSettings({ panelTransparency: normalizePanelTransparency(Number(value)) });
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
    if (resetConfirmationOpen) {
      resetConfirmationOpen = false;
      render();
      return;
    }

    if (aboutModalOpen) {
      aboutModalOpen = false;
      render();
      return;
    }

    if (isSettingsWindow) {
      await closeSettingsWindow();
      return;
    }

    if (panelMode === "placement") {
      await cancelPlacement();
      return;
    }

    await hideCurrentWindow();
  }
});

async function handleShortcutsOpenRequest(request: ShortcutsOpenRequest): Promise<void> {
  if (!isShortcutPanelWindow) {
    return;
  }

  debugActiveAppLog("shortcuts open request", request);

  if (request.mode === "placement") {
    if (!isShortcutsWindow) {
      return;
    }

    currentShortcutsOpenMode = "placement";
    await enterPlacementMode(request.activeApp);
    await showPreparedShortcutsWindow();
    return;
  }

  settings = loadSettings();
  panelMode = "shortcuts";
  placementSnapshot = null;
  if (request.mode === "preview") {
    if (!isShortcutsPreviewWindow) {
      return;
    }

    currentShortcutsOpenMode = "preview";
    useActiveApp(request.activeApp, "shortcuts preview activeApp from open request");
    render();
    await resizeShortcutsWindowToPanel();
    if (!request.preservePosition) {
      await positionShortcutsPreviewWindow();
    }
    await showPreparedShortcutsWindow(false);
    return;
  }

  if (!isShortcutsWindow) {
    return;
  }

  currentShortcutsOpenMode = "shortcuts";
  await setPanelKeepVisible(false);
  useActiveApp(request.activeApp, "shortcuts activeApp from open request");
  render();
  await resizeShortcutsWindowToPanel();
  await applyShortcutPlacement();
  await showPreparedShortcutsWindow();
}

async function syncPendingShortcutsOpenRequest(): Promise<void> {
  if (!isShortcutPanelWindow) {
    return;
  }

  try {
    const request = await invoke<ShortcutsOpenRequest | null>("get_shortcuts_open_request");
    if (request) {
      await handleShortcutsOpenRequest(request);
    }
  } catch (error) {
    debugActiveAppLog("get_shortcuts_open_request failed", error);
  }
}

await listen<ShortcutsOpenRequest>("merken:shortcuts-open-request", async (event) => {
  await handleShortcutsOpenRequest(event.payload);
});

window.addEventListener("storage", (event) => {
  if (event.key === settingsStorageKey) {
    settings = loadSettings();
    render();
    void resizeCurrentWindowToLayout();
  }

  if (event.key === customizationTargetStorageKey && event.newValue) {
    applyCustomizationTarget(event.newValue);
    render();
  }

  if (event.key === shortcutPreviewMovedStorageKey && event.newValue) {
    shortcutPreviewMovedManually = true;
  }
});

applyCustomizationTarget(localStorage.getItem(customizationTargetStorageKey));
await Promise.all([refreshActiveApp(), refreshAppInfo()]);
void setTrayLanguage(settings.language);
render();
void resizeCurrentWindowToLayout();
void syncPendingShortcutsOpenRequest();
void syncAutostart();
void syncTrayIconVisibility();
