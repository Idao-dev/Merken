export type LanguageCode = "fr" | "en" | "es" | "de" | "pt" | "it";

export type ThemeMode = "dark" | "colorblind";

export type SheetMode = "auto" | "os" | "manual";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";

export type BlurLevel = "none" | "light" | "medium" | "strong" | "max";

export type ShortcutPlacementMode = "preset" | "custom";

export type ShortcutPlacementPreset = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

export interface ShortcutCustomPosition {
  x: number;
  y: number;
}

export interface ShortcutEntry {
  label: string;
  keys: string[];
  description: string;
  priority: number;
  expert?: boolean;
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

export interface UserSettings {
  language: LanguageCode;
  theme: ThemeMode;
  textSize: TextSize;
  blur: BlurLevel;
  sheetMode: SheetMode;
  manualSheetId: string;
  expertMode: boolean;
  startWithWindows: boolean;
  shortcutPlacementMode: ShortcutPlacementMode;
  shortcutPlacementPreset: ShortcutPlacementPreset;
  shortcutCustomPosition: ShortcutCustomPosition | null;
  trayVisibilityPromptDismissed: boolean;
}

export interface ActiveApp {
  processName: string | null;
  title: string | null;
  sheetId: string | null;
}
