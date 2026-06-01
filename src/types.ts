export type LanguageCode = "fr" | "en" | "es" | "de" | "pt" | "it";

export type ThemeMode = "dark" | "colorblind";

export type SheetMode = "auto" | "os" | "manual";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";

export type BlurLevel = "none" | "light" | "medium" | "strong" | "max";

export type ShortcutPlacementMode = "preset" | "custom";

export type ShortcutPlacementPreset = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

export type ShortcutDisplayLevel = "standard" | "advanced" | "expert";

export type ShortcutDisplayMode = "level" | "custom";

export type ShortcutDisplayChoice = ShortcutDisplayLevel | "custom";

export type ShortcutWarningLevel = "info" | "danger";

export type ShortcutWarningMode = "all" | "danger-only" | "off";

export type ShortcutKeyboardLayout = "azerty" | "qwerty";

export type SheetBadgeKey =
  | "windows-native"
  | "office-365"
  | "office-2024"
  | "office-2021"
  | "browser-edge"
  | "browser-chrome"
  | "browser-firefox"
  | "browser-brave";

export interface ShortcutCustomPosition {
  x: number;
  y: number;
}

export interface ShortcutEntry {
  id: string;
  label: string;
  keys: string[];
  keysByLayout?: Partial<Record<ShortcutKeyboardLayout, string[]>>;
  command?: string;
  description: string;
  warning?: string;
  warningLevel?: ShortcutWarningLevel;
  priority: number;
  level: ShortcutDisplayLevel;
}

export interface ShortcutCategory {
  id: string;
  title: string;
  shortcuts: ShortcutEntry[];
}

export interface ShortcutSheet {
  id: string;
  appNames: string[];
  title: string;
  platform: "windows" | "macos" | "linux" | "cross-platform";
  language: LanguageCode;
  categories: ShortcutCategory[];
}

export interface ShortcutSheetPreference {
  mode: ShortcutDisplayMode;
  level: ShortcutDisplayLevel;
  categoryIds?: string[];
  includeShortcutIds?: string[];
  excludeShortcutIds?: string[];
}

export interface UserSettings {
  language: LanguageCode;
  shortcutLanguage: LanguageCode;
  keyboardLayout: ShortcutKeyboardLayout;
  theme: ThemeMode;
  textSize: TextSize;
  blur: BlurLevel;
  sheetMode: SheetMode;
  manualSheetId: string;
  shortcutSheetPreferences: Record<string, ShortcutSheetPreference>;
  startWithWindows: boolean;
  shortcutPlacementMode: ShortcutPlacementMode;
  shortcutPlacementPreset: ShortcutPlacementPreset;
  shortcutCustomPosition: ShortcutCustomPosition | null;
  shortcutWarningMode: ShortcutWarningMode;
  trayIconVisible: boolean;
}

export interface ActiveApp {
  processName: string | null;
  title: string | null;
  sheetId: string | null;
}
