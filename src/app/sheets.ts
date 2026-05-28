import type {
  ActiveApp,
  LanguageCode,
  SheetBadgeKey,
  ShortcutCategory,
  ShortcutDisplayLevel,
  ShortcutEntry,
  ShortcutSheet,
  ShortcutSheetPreference,
  UsageLevel,
  UserSettings
} from "../types";

export const shortcutDisplayLevels: ShortcutDisplayLevel[] = ["standard", "advanced", "expert"];

export type ShortcutThemeState = "checked" | "indeterminate" | "unchecked";

const sheetFamilyOrder = [
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
const sheetModules = import.meta.glob<ShortcutSheet[]>("../data/shortcut-sheets/*.json", {
  eager: true,
  import: "default"
});

export const sheets = Object.entries(sheetModules)
  .sort(([left], [right]) => sheetDataOrder(left) - sheetDataOrder(right))
  .flatMap(([, moduleSheets]) => moduleSheets);

export interface ManualSheetOption {
  key: string;
  label: string;
}

const windowsNativeSheetFamilies = new Set([
  "windows-core",
  "file-explorer",
  "photos",
  "media-player",
  "terminal-powershell"
]);

const systemShortcutWarningExemptFamilies = new Set(["windows-core", "file-explorer"]);

const sheetFamilyBadges = new Map<string, SheetBadgeKey[]>([
  ["browsers", ["browser-edge", "browser-chrome", "browser-firefox", "browser-brave"]]
]);

const manualSheetLabels = new Map<string, string>([
  ["windows-core", "Windows - Essentiels"],
  ["file-explorer", "Explorateur de fichiers"],
  ["photos", "Photos"],
  ["media-player", "Lecteur multimedia"],
  ["terminal-powershell", "Terminal et PowerShell"],
  ["browsers", "Navigateurs"],
  ["word", "Word"],
  ["excel", "Excel"],
  ["powerpoint", "PowerPoint"],
  ["outlook", "Outlook"],
  ["thunderbird", "Thunderbird"],
  ["obsidian", "Obsidian"],
  ["vlc", "VLC"]
]);

const manualSheetLabelsEn = new Map<string, string>([
  ["windows-core", "Windows - Essentials"],
  ["file-explorer", "File Explorer"],
  ["photos", "Photos"],
  ["media-player", "Media Player"],
  ["terminal-powershell", "Terminal and PowerShell"],
  ["browsers", "Browsers"],
  ["word", "Word"],
  ["excel", "Excel"],
  ["powerpoint", "PowerPoint"],
  ["outlook", "Outlook"],
  ["thunderbird", "Thunderbird"],
  ["obsidian", "Obsidian"],
  ["vlc", "VLC"]
]);

function sheetDataOrder(filePath: string): number {
  const fileName = filePath.split("/").pop()?.replace(/\.json$/, "") ?? "";
  const index = sheetFamilyOrder.indexOf(fileName);

  return index === -1 ? sheetFamilyOrder.length : index;
}

export function sheetFamily(sheetId: string): string {
  return sheetId.replace(/-(fr|en|es|de|pt|it)$/, "");
}

export function isWindowsNativeSheetFamily(family: string): boolean {
  return windowsNativeSheetFamilies.has(family);
}

export function sheetLabelWithWindowsNativeSuffix(family: string, label: string): string {
  if (!isWindowsNativeSheetFamily(family) || /\bWindows\b/i.test(label)) {
    return label;
  }

  return `${label} - Win`;
}

export function sheetBadgeKeys(family: string): SheetBadgeKey[] {
  return [
    ...(isWindowsNativeSheetFamily(family) ? ["windows-native" as SheetBadgeKey] : []),
    ...(sheetFamilyBadges.get(family) ?? [])
  ];
}

export function shouldShowShortcutBaselineWarning(family: string): boolean {
  return !systemShortcutWarningExemptFamilies.has(family);
}

export function sharedCommandKeys(category: ShortcutCategory): string[] | null {
  if (category.shortcuts.length === 0 || category.shortcuts.some((shortcut) => !shortcut.command)) {
    return null;
  }

  const [firstShortcut] = category.shortcuts;
  const signature = shortcutKeysSignature(firstShortcut.keys);

  return category.shortcuts.every((shortcut) => shortcutKeysSignature(shortcut.keys) === signature) ? [...firstShortcut.keys] : null;
}

export function findSheetForFamily(family: string, language: LanguageCode): ShortcutSheet | null {
  return (
    sheets.find((sheet) => sheetFamily(sheet.id) === family && sheet.language === language) ??
    sheets.find((sheet) => sheetFamily(sheet.id) === family && sheet.language === "fr") ??
    null
  );
}

export function manualSheetOptions(language: LanguageCode = "fr", includeWindowsNativeSuffix = false): ManualSheetOption[] {
  const seen = new Set<string>();
  const labels = language === "en" ? manualSheetLabelsEn : manualSheetLabels;

  return sheets
    .map((sheet) => sheetFamily(sheet.id))
    .filter((key) => {
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .map((key) => {
      const label = labels.get(key) ?? key;

      return {
        key,
        label: includeWindowsNativeSuffix ? sheetLabelWithWindowsNativeSuffix(key, label) : label
      };
    });
}

export function getFallbackSheet(language: LanguageCode): ShortcutSheet {
  return (
    sheets.find((sheet) => sheet.id === `windows-core-${language}`) ??
    sheets.find((sheet) => sheet.id === "windows-core-fr") ??
    sheets[0]
  );
}

export function findSheetForProcess(processName: string | null, language: LanguageCode): ShortcutSheet | null {
  if (!processName) {
    return null;
  }

  const normalizedProcess = processName.toLowerCase();
  const family =
    sheets
      .find((sheet) => sheet.appNames.some((appName) => appName.toLowerCase() === normalizedProcess))
      ?.id;
  const familyKey = family ? sheetFamily(family) : null;

  if (!familyKey) {
    return null;
  }

  return (
    sheets.find((sheet) => sheetFamily(sheet.id) === familyKey && sheet.language === language) ??
    sheets.find((sheet) => sheetFamily(sheet.id) === familyKey && sheet.language === "fr") ??
    null
  );
}

export function selectSheet(settings: UserSettings, activeApp: ActiveApp | null): ShortcutSheet {
  if (settings.sheetMode === "manual") {
    const manualFamily = sheetFamily(settings.manualSheetId);
    return (
      sheets.find((sheet) => sheetFamily(sheet.id) === manualFamily && sheet.language === settings.language) ??
      sheets.find((sheet) => sheet.id === settings.manualSheetId) ??
      getFallbackSheet(settings.language)
    );
  }

  if (settings.sheetMode === "auto") {
    const explicitFamily = activeApp?.sheetId ? sheetFamily(activeApp.sheetId) : null;
    const explicitSheet = explicitFamily
      ? sheets.find((sheet) => sheetFamily(sheet.id) === explicitFamily && sheet.language === settings.language) ??
        sheets.find((sheet) => sheet.id === activeApp?.sheetId)
      : null;
    const processSheet = findSheetForProcess(activeApp?.processName ?? null, settings.language);

    return explicitSheet ?? processSheet ?? getFallbackSheet(settings.language);
  }

  return getFallbackSheet(settings.language);
}

export function availableShortcutLevels(sheet: ShortcutSheet): Record<ShortcutDisplayLevel, boolean> {
  const available = {
    standard: false,
    advanced: false,
    expert: false
  };

  for (const category of sheet.categories) {
    for (const shortcut of category.shortcuts) {
      available[displayLevelForUsage(shortcut.usageLevel)] = true;
    }
  }

  return available;
}

export function sheetShortcutPreference(settings: UserSettings, sheet: ShortcutSheet): ShortcutSheetPreference {
  const family = sheetFamily(sheet.id);

  return resolveShortcutSheetPreference(sheet, settings.shortcutSheetPreferences[family]);
}

export function resolveShortcutSheetPreference(
  sheet: ShortcutSheet,
  preference: ShortcutSheetPreference | undefined
): ShortcutSheetPreference {
  const level = resolveShortcutDisplayLevel(sheet, preference?.level ?? "standard");

  if (preference?.mode === "custom") {
    return {
      mode: "custom",
      level,
      categoryIds: preference.categoryIds ?? [],
      includeShortcutIds: preference.includeShortcutIds ?? [],
      excludeShortcutIds: preference.excludeShortcutIds ?? []
    };
  }

  return { mode: "level", level };
}

export function resolveShortcutDisplayLevel(
  sheet: ShortcutSheet,
  requestedLevel: ShortcutDisplayLevel
): ShortcutDisplayLevel {
  const available = availableShortcutLevels(sheet);

  if (available[requestedLevel]) {
    return requestedLevel;
  }

  return shortcutDisplayLevels.find((level) => available[level]) ?? "standard";
}

export function customPreferenceFromLevel(sheet: ShortcutSheet, level: ShortcutDisplayLevel): ShortcutSheetPreference {
  const resolvedLevel = resolveShortcutDisplayLevel(sheet, level);

  return {
    mode: "custom",
    level: resolvedLevel,
    includeShortcutIds: sheet.categories.flatMap((category) =>
      category.shortcuts
        .filter((shortcut) => displayLevelForUsage(shortcut.usageLevel) === resolvedLevel)
        .map((shortcut) => shortcut.id)
    ),
    categoryIds: [],
    excludeShortcutIds: []
  };
}

export function ensureCustomPreference(sheet: ShortcutSheet, preference: ShortcutSheetPreference): ShortcutSheetPreference {
  const resolvedPreference = resolveShortcutSheetPreference(sheet, preference);

  if (resolvedPreference.mode === "custom") {
    return resolvedPreference;
  }

  return customPreferenceFromLevel(sheet, resolvedPreference.level);
}

export function isShortcutIncluded(
  category: ShortcutCategory,
  shortcut: ShortcutEntry,
  preference: ShortcutSheetPreference
): boolean {
  const categoryIds = new Set(preference.categoryIds ?? []);
  const includeShortcutIds = new Set(preference.includeShortcutIds ?? []);
  const excludeShortcutIds = new Set(preference.excludeShortcutIds ?? []);

  if (excludeShortcutIds.has(shortcut.id)) {
    return false;
  }

  return categoryIds.has(category.id) || includeShortcutIds.has(shortcut.id);
}

export function shortcutThemeState(category: ShortcutCategory, preference: ShortcutSheetPreference): ShortcutThemeState {
  const selectedCount = category.shortcuts.filter((shortcut) => isShortcutIncluded(category, shortcut, preference)).length;

  if (selectedCount === category.shortcuts.length) {
    return "checked";
  }

  return selectedCount > 0 ? "indeterminate" : "unchecked";
}

export function updateCustomCategoryPreference(
  preference: ShortcutSheetPreference,
  category: ShortcutCategory,
  checked: boolean
): ShortcutSheetPreference {
  const categoryIds = new Set(preference.categoryIds ?? []);
  const includeShortcutIds = new Set(preference.includeShortcutIds ?? []);
  const excludeShortcutIds = new Set(preference.excludeShortcutIds ?? []);

  if (checked) {
    categoryIds.add(category.id);
    for (const shortcut of category.shortcuts) {
      includeShortcutIds.delete(shortcut.id);
      excludeShortcutIds.delete(shortcut.id);
    }
  } else {
    categoryIds.delete(category.id);
    for (const shortcut of category.shortcuts) {
      includeShortcutIds.delete(shortcut.id);
      excludeShortcutIds.delete(shortcut.id);
    }
  }

  return compactCustomPreference(preference, categoryIds, includeShortcutIds, excludeShortcutIds);
}

export function updateCustomShortcutPreference(
  preference: ShortcutSheetPreference,
  category: ShortcutCategory,
  shortcut: ShortcutEntry,
  checked: boolean
): ShortcutSheetPreference {
  const categoryIds = new Set(preference.categoryIds ?? []);
  const includeShortcutIds = new Set(preference.includeShortcutIds ?? []);
  const excludeShortcutIds = new Set(preference.excludeShortcutIds ?? []);

  if (checked) {
    excludeShortcutIds.delete(shortcut.id);

    if (!categoryIds.has(category.id)) {
      includeShortcutIds.add(shortcut.id);
    }
  } else if (categoryIds.has(category.id)) {
    excludeShortcutIds.add(shortcut.id);
    includeShortcutIds.delete(shortcut.id);
  } else {
    includeShortcutIds.delete(shortcut.id);
    excludeShortcutIds.delete(shortcut.id);
  }

  return compactCustomPreference(preference, categoryIds, includeShortcutIds, excludeShortcutIds);
}

export function visibleShortcuts(sheet: ShortcutSheet, preference: ShortcutSheetPreference): ShortcutSheet {
  const resolvedPreference = resolveShortcutSheetPreference(sheet, preference);

  return {
    ...sheet,
    categories: sheet.categories
      .map((category) => ({
        ...category,
        shortcuts: category.shortcuts
          .filter((shortcut) => {
            if (resolvedPreference.mode === "custom") {
              return isShortcutIncluded(category, shortcut, resolvedPreference);
            }

            return displayLevelForUsage(shortcut.usageLevel) === resolvedPreference.level;
          })
          .sort((a, b) => a.priority - b.priority)
      }))
      .filter((category) => category.shortcuts.length > 0)
  };
}

export type ShortcutCategoryColumns = [ShortcutCategory[], ShortcutCategory[]];

export function layoutShortcutCategories(categories: ShortcutCategory[]): ShortcutCategoryColumns {
  const columns: ShortcutCategoryColumns = [[], []];
  const columnWeights = [0, 0];

  for (const category of categories) {
    const targetColumn = columnWeights[0] <= columnWeights[1] ? 0 : 1;

    columns[targetColumn].push(category);
    columnWeights[targetColumn] += shortcutCategoryLayoutWeight(category);
  }

  return columns;
}

function shortcutCategoryLayoutWeight(category: ShortcutCategory): number {
  return category.shortcuts.reduce((weight, shortcut) => weight + shortcutLayoutWeight(shortcut), 0) + 0.65;
}

function shortcutLayoutWeight(shortcut: ShortcutEntry): number {
  let weight = shortcut.command ? 1.75 : 1;

  if (shortcut.command && shortcut.command.length > 18) {
    weight += 0.25;
  }

  if (shortcut.label.length > 24) {
    weight += 0.2;
  }

  if (shortcut.keys.length >= 3) {
    weight += 0.1;
  }

  if (shortcut.warningLevel === "danger") {
    weight += 0.15;
  }

  return weight;
}

function displayLevelForUsage(usageLevel: UsageLevel): ShortcutDisplayLevel {
  return usageLevel === "essential" || usageLevel === "common" ? "standard" : usageLevel;
}

function shortcutKeysSignature(keys: string[]): string {
  return keys.join("\u0000");
}

function compactCustomPreference(
  preference: ShortcutSheetPreference,
  categoryIds: Set<string>,
  includeShortcutIds: Set<string>,
  excludeShortcutIds: Set<string>
): ShortcutSheetPreference {
  return {
    mode: "custom",
    level: preference.level,
    categoryIds: [...categoryIds],
    includeShortcutIds: [...includeShortcutIds],
    excludeShortcutIds: [...excludeShortcutIds]
  };
}
