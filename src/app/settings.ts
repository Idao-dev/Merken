import type { UserSettings } from "../types";

export const defaultSettings: UserSettings = {
  language: "fr",
  theme: "dark",
  textSize: "md",
  blur: "medium",
  sheetMode: "auto",
  manualSheetId: "windows-core",
  expertMode: false,
  startWithWindows: true,
  shortcutPlacementMode: "preset",
  shortcutPlacementPreset: "top-right",
  shortcutCustomPosition: null,
  trayVisibilityPromptDismissed: false
};

export const settingsStorageKey = "merken.settings.v1";

type SettingsStorage = Pick<Storage, "getItem" | "setItem">;

export function loadSettings(storage: SettingsStorage = localStorage): UserSettings {
  const raw = storage.getItem(settingsStorageKey);

  if (!raw) {
    return defaultSettings;
  }

  try {
    const parsed = { ...defaultSettings, ...JSON.parse(raw) } as UserSettings;

    if (!["dark", "colorblind"].includes(parsed.theme)) {
      parsed.theme = "dark";
    }

    return parsed;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: UserSettings, storage: SettingsStorage = localStorage): void {
  storage.setItem(settingsStorageKey, JSON.stringify(settings));
}
