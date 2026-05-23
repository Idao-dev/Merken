import sheetsData from "../data/shortcut-sheets.json";
import type { ActiveApp, LanguageCode, ShortcutSheet, UserSettings } from "../types";

export const sheets = sheetsData as ShortcutSheet[];

export interface ManualSheetOption {
  key: string;
  label: string;
}

const manualSheetLabels = new Map<string, string>([
  ["windows-core", "Windows - Essentiels"],
  ["word", "Word"],
  ["excel", "Excel"],
  ["powerpoint", "PowerPoint"],
  ["outlook", "Outlook"]
]);

const manualSheetLabelsEn = new Map<string, string>([
  ["windows-core", "Windows - Essentials"],
  ["word", "Word"],
  ["excel", "Excel"],
  ["powerpoint", "PowerPoint"],
  ["outlook", "Outlook"]
]);

export function sheetFamily(sheetId: string): string {
  return sheetId.replace(/-(fr|en|es|de|pt|it)$/, "");
}

export function manualSheetOptions(language: LanguageCode = "fr"): ManualSheetOption[] {
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
    .map((key) => ({ key, label: labels.get(key) ?? key }));
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

export function visibleShortcuts(sheet: ShortcutSheet, expertMode: boolean): ShortcutSheet {
  return {
    ...sheet,
    categories: sheet.categories
      .map((category) => ({
        ...category,
        shortcuts: category.shortcuts
          .filter((shortcut) => expertMode || !shortcut.expert)
          .sort((a, b) => a.priority - b.priority)
      }))
      .filter((category) => category.shortcuts.length > 0)
  };
}
