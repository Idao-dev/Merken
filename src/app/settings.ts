import type {
  BlurLevel,
  LanguageCode,
  SheetMode,
  ShortcutDisplayLevel,
  ShortcutPlacementPreset,
  ShortcutWarningMode,
  ShortcutSheetPreference,
  TextSize,
  ThemeMode,
  UserSettings
} from "../types";

const shortcutDisplayLevels: ShortcutDisplayLevel[] = ["standard", "advanced", "expert"];
const languageCodes: LanguageCode[] = ["fr", "en"];
const themeModes: ThemeMode[] = ["dark", "colorblind"];
const textSizes: TextSize[] = ["xs", "sm", "md", "lg", "xl"];
const blurLevels: BlurLevel[] = ["none", "light", "medium", "strong", "max"];
const sheetModes: SheetMode[] = ["auto", "os", "manual"];
const shortcutPlacementPresets: ShortcutPlacementPreset[] = ["top-left", "top-right", "bottom-left", "bottom-right", "center"];
const shortcutWarningModes: ShortcutWarningMode[] = ["all", "danger-only", "off"];
const identifierPattern = /^[a-z0-9-]+$/;
const deprecatedSheetFamilies = new Set(["settings"]);

const legacyExpertSheetFamilies = [
  "windows-core",
  "file-explorer",
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
  shortcutWarningMode: "all",
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

    return normalizeSettings(parsed);
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
        .filter(([family]) => isSafeIdentifier(family) && !deprecatedSheetFamilies.has(family))
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
    categoryIds: identifierArray(preference.categoryIds),
    includeShortcutIds: identifierArray(preference.includeShortcutIds),
    excludeShortcutIds: identifierArray(preference.excludeShortcutIds)
  };
}

function normalizeSettings(settings: UserSettings): UserSettings {
  return {
    language: oneOf(settings.language, languageCodes, defaultSettings.language),
    theme: oneOf(settings.theme, themeModes, defaultSettings.theme),
    textSize: oneOf(settings.textSize, textSizes, defaultSettings.textSize),
    blur: oneOf(settings.blur, blurLevels, defaultSettings.blur),
    sheetMode: oneOf(settings.sheetMode, sheetModes, defaultSettings.sheetMode),
    manualSheetId: typeof settings.manualSheetId === "string" && isSafeIdentifier(settings.manualSheetId) && !deprecatedSheetFamilies.has(settings.manualSheetId)
      ? settings.manualSheetId
      : defaultSettings.manualSheetId,
    shortcutSheetPreferences: settings.shortcutSheetPreferences,
    startWithWindows: typeof settings.startWithWindows === "boolean" ? settings.startWithWindows : defaultSettings.startWithWindows,
    shortcutPlacementMode: settings.shortcutPlacementMode === "custom" ? "custom" : "preset",
    shortcutPlacementPreset: oneOf(
      settings.shortcutPlacementPreset,
      shortcutPlacementPresets,
      defaultSettings.shortcutPlacementPreset
    ),
    shortcutCustomPosition: normalizeShortcutCustomPosition(settings.shortcutCustomPosition),
    shortcutWarningMode: oneOf(settings.shortcutWarningMode, shortcutWarningModes, defaultSettings.shortcutWarningMode),
    trayVisibilityPromptDismissed:
      typeof settings.trayVisibilityPromptDismissed === "boolean"
        ? settings.trayVisibilityPromptDismissed
        : defaultSettings.trayVisibilityPromptDismissed
  };
}

function normalizeShortcutCustomPosition(value: unknown): UserSettings["shortcutCustomPosition"] {
  if (!isRecord(value) || typeof value.x !== "number" || typeof value.y !== "number") {
    return null;
  }

  if (!Number.isFinite(value.x) || !Number.isFinite(value.y)) {
    return null;
  }

  return {
    x: Math.round(value.x),
    y: Math.round(value.y)
  };
}

function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && allowed.includes(value as T) ? (value as T) : fallback;
}

function identifierArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && isSafeIdentifier(item)) : [];
}

function isSafeIdentifier(value: string): boolean {
  return identifierPattern.test(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
