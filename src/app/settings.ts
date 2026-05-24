import type { ShortcutDisplayLevel, ShortcutSheetPreference, UserSettings } from "../types";

const shortcutDisplayLevels: ShortcutDisplayLevel[] = ["standard", "advanced", "expert"];

const legacyExpertSheetFamilies = [
  "windows-core",
  "file-explorer",
  "settings",
  "photos",
  "media-player",
  "terminal-powershell",
  "browsers",
  "excel",
  "word",
  "powerpoint",
  "outlook",
  "thunderbird",
  "obsidian",
  "vlc"
];

export const defaultSettings: UserSettings = {
  language: "fr",
  theme: "dark",
  textSize: "md",
  blur: "medium",
  sheetMode: "auto",
  manualSheetId: "windows-core",
  shortcutSheetPreferences: {},
  startWithWindows: true,
  shortcutPlacementMode: "preset",
  shortcutPlacementPreset: "top-right",
  shortcutCustomPosition: null,
  trayVisibilityPromptDismissed: false
};

export const settingsStorageKey = "merken.settings.v1";

type SettingsStorage = Pick<Storage, "getItem" | "setItem">;

type StoredSettings = Partial<UserSettings> & {
  expertMode?: boolean;
  shortcutSheetPreferences?: unknown;
  theme?: unknown;
};

export function loadSettings(storage: SettingsStorage = localStorage): UserSettings {
  const raw = storage.getItem(settingsStorageKey);

  if (!raw) {
    return defaultSettings;
  }

  try {
    const stored = JSON.parse(raw) as StoredSettings;
    const { expertMode: _expertMode, shortcutSheetPreferences: _shortcutSheetPreferences, ...storedSettings } = stored;
    const parsed: UserSettings = {
      ...defaultSettings,
      ...storedSettings,
      shortcutSheetPreferences: normalizeShortcutSheetPreferences(stored)
    };

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

function normalizeShortcutSheetPreferences(stored: StoredSettings): Record<string, ShortcutSheetPreference> {
  if (isRecord(stored.shortcutSheetPreferences) && Object.keys(stored.shortcutSheetPreferences).length > 0) {
    return Object.fromEntries(
      Object.entries(stored.shortcutSheetPreferences)
        .map(([family, preference]) => [family, normalizeShortcutSheetPreference(preference)])
        .filter((entry): entry is [string, ShortcutSheetPreference] => Boolean(entry[1]))
    );
  }

  if (stored.expertMode === true) {
    return Object.fromEntries(
      legacyExpertSheetFamilies.map((family) => [
        family,
        {
          mode: "level",
          level: "advanced"
        } satisfies ShortcutSheetPreference
      ])
    );
  }

  return {};
}

function normalizeShortcutSheetPreference(preference: unknown): ShortcutSheetPreference | null {
  if (!isRecord(preference)) {
    return null;
  }

  const level = shortcutDisplayLevels.includes(preference.level as ShortcutDisplayLevel)
    ? (preference.level as ShortcutDisplayLevel)
    : "standard";
  const mode = preference.mode === "custom" ? "custom" : "level";

  if (mode === "level") {
    return { mode, level };
  }

  return {
    mode,
    level,
    categoryIds: stringArray(preference.categoryIds),
    includeShortcutIds: stringArray(preference.includeShortcutIds),
    excludeShortcutIds: stringArray(preference.excludeShortcutIds)
  };
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
