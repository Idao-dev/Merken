import { describe, expect, it } from "vitest";
import { defaultSettings } from "../../src/app/settings";
import {
  availableShortcutLevels,
  customPreferenceFromLevel,
  findSheetForFamily,
  findSheetForProcess,
  getFallbackSheet,
  isShortcutIncluded,
  isWindowsNativeSheetFamily,
  layoutShortcutCategories,
  manualSheetOptions,
  resolveShortcutDisplayLevel,
  selectSheet,
  sheetBadgeKeys,
  sheetLabelWithWindowsNativeSuffix,
  sheets,
  shouldShowShortcutBaselineWarning,
  sharedCommandKeys,
  shortcutKeysForLayout,
  shortcutRowLayout,
  shortcutThemeState,
  updateCustomCategoryPreference,
  updateCustomShortcutPreference,
  visibleShortcuts
} from "../../src/app/sheets";
import type { ShortcutCategory, ShortcutEntry, ShortcutSheet } from "../../src/types";

function syntheticCategory(id: string, count: number, command = false): ShortcutCategory {
  return {
    id,
    title: id,
    shortcuts: Array.from({ length: count }, (_, index) => ({
      id: `${id}-${index + 1}`,
      label: `${id} ${index + 1}`,
      keys: command ? ["Win", "R"] : ["Ctrl", String(index + 1)],
      command: command ? "SystemPropertiesAdvanced.exe" : undefined,
      description: "Synthetic shortcut.",
      priority: index + 1,
      level: "standard"
    }))
  };
}

function findShortcut(sheet: ShortcutSheet, shortcutId: string): ShortcutEntry | undefined {
  return sheet.categories.flatMap((category) => category.shortcuts).find((shortcut) => shortcut.id === shortcutId);
}

describe("shortcut sheet selection", () => {
  const expectedSheetIds = [
    "windows-core-fr",
    "windows-core-en",
    "file-explorer-fr",
    "file-explorer-en",
    "photos-fr",
    "photos-en",
    "media-player-fr",
    "media-player-en",
    "terminal-powershell-fr",
    "terminal-powershell-en",
    "browsers-fr",
    "browsers-en",
    "excel-fr",
    "excel-en",
    "word-fr",
    "word-en",
    "powerpoint-fr",
    "powerpoint-en",
    "outlook-fr",
    "outlook-en",
    "thunderbird-fr",
    "thunderbird-en",
    "obsidian-fr",
    "obsidian-en",
    "vlc-fr",
    "vlc-en"
  ];

  it("keeps Phase 1 settings defaults explicit", () => {
    expect(defaultSettings.language).toBe("fr");
    expect(defaultSettings.shortcutLanguage).toBe("fr");
    expect(defaultSettings.keyboardLayout).toBe("azerty");
    expect(defaultSettings.theme).toBe("dark");
    expect(defaultSettings.startWithWindows).toBe(true);
    expect(defaultSettings.sheetMode).toBe("auto");
    expect(defaultSettings.manualSheetId).toBe("windows-core");
    expect(defaultSettings.shortcutSheetPreferences).toEqual({});
    expect(defaultSettings.shortcutPlacementMode).toBe("preset");
    expect(defaultSettings.shortcutPlacementPreset).toBe("top-right");
    expect(defaultSettings.shortcutCustomPosition).toBeNull();
    expect(defaultSettings.shortcutWarningMode).toBe("all");
  });

  it("uses the Windows fallback for unknown apps", () => {
    const sheet = selectSheet(defaultSettings, { processName: "unknown.exe", title: null, sheetId: null });

    expect(sheet.id).toBe("windows-core-fr");
  });

  it("matches known Office process names", () => {
    const sheet = findSheetForProcess("EXCEL.EXE", "fr");

    expect(sheet?.id).toBe("excel-fr");
  });

  it("loads every existing shortcut sheet id from split data files", () => {
    expect(sheets.map((sheet) => sheet.id)).toEqual(expectedSheetIds);
  });

  it("does not expose duplicate shortcut sheet ids", () => {
    const ids = sheets.map((sheet) => sheet.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("classifies every shortcut with a display level and no legacy level metadata", () => {
    const shortcutLevels = new Set(["standard", "advanced", "expert"]);
    const legacyLevelField = "usage" + "Level";
    const legacyLevelValues = new Set(["ess" + "ential", "com" + "mon"]);

    for (const sheet of sheets) {
      for (const category of sheet.categories) {
        for (const shortcut of category.shortcuts) {
          const context = `${sheet.id}:${category.id}:${shortcut.label}`;

          expect(shortcutLevels.has(shortcut.level), context).toBe(true);
          expect(legacyLevelValues.has(shortcut.level), context).toBe(false);
          expect(Object.prototype.hasOwnProperty.call(shortcut, legacyLevelField), context).toBe(false);
        }
      }
    }
  });

  it("does not use text entry as a keyboard key", () => {
    for (const sheet of sheets) {
      for (const category of sheet.categories) {
        for (const shortcut of category.shortcuts) {
          expect(shortcut.keys, `${sheet.id}:${category.id}:${shortcut.label}`).not.toContain("Text");
        }
      }
    }
  });

  it("keeps command and warning metadata explicit", () => {
    const warningLevels = new Set(["info", "danger"]);

    for (const sheet of sheets) {
      for (const category of sheet.categories) {
        for (const shortcut of category.shortcuts) {
          if (shortcut.command) {
            expect(shortcut.command.trim(), `${sheet.id}:${shortcut.id}`).toBe(shortcut.command);
            expect(shortcut.keys, `${sheet.id}:${shortcut.id}`).not.toContain(shortcut.command);
          }

          if (shortcut.warningLevel || shortcut.warning) {
            expect(shortcut.warning, `${sheet.id}:${shortcut.id}`).toBeTruthy();
            expect(warningLevels.has(shortcut.warningLevel ?? ""), `${sheet.id}:${shortcut.id}`).toBe(true);
          }
        }
      }
    }
  });

  it("detects command categories with shared keys", () => {
    const windows = getFallbackSheet("fr");
    const toolsCategory = windows.categories.find((category) => category.id === "outils-systeme");
    const systemCategory = windows.categories.find((category) => category.id === "systeme");

    expect(sharedCommandKeys(toolsCategory!, "azerty")).toEqual(["Win", "R"]);
    expect(sharedCommandKeys(systemCategory!, "azerty")).toBeNull();
  });

  it("requires stable shortcut ids", () => {
    for (const sheet of sheets) {
      const ids = new Set<string>();

      for (const category of sheet.categories) {
        for (const shortcut of category.shortcuts) {
          expect(shortcut.id, `${sheet.id}:${category.id}:${shortcut.label}`).toMatch(/^[a-z0-9-]+$/);
          expect(ids.has(shortcut.id), `${sheet.id}:${shortcut.id}`).toBe(false);
          ids.add(shortcut.id);
        }
      }
    }
  });

  it("keeps category and shortcut ids aligned between French and English sheets", () => {
    const families = new Set(sheets.map((sheet) => sheet.id.replace(/-(fr|en)$/, "")));

    for (const family of families) {
      const fr = sheets.find((sheet) => sheet.id === `${family}-fr`);
      const en = sheets.find((sheet) => sheet.id === `${family}-en`);

      if (!fr || !en) {
        continue;
      }

      expect(en.categories.map((category) => category.id), family).toEqual(fr.categories.map((category) => category.id));

      for (const frCategory of fr.categories) {
        const enCategory = en.categories.find((category) => category.id === frCategory.id);

        expect(enCategory?.shortcuts.map((shortcut) => shortcut.id), `${family}:${frCategory.id}`).toEqual(
          frCategory.shortcuts.map((shortcut) => shortcut.id)
        );
      }
    }
  });

  it("keeps interface language separate from shortcut language", () => {
    const sheet = selectSheet(
      { ...defaultSettings, language: "en", shortcutLanguage: "fr" },
      { processName: "excel.exe", title: null, sheetId: null }
    );

    expect(sheet.id).toBe("excel-fr");
  });

  it("uses the shortcut language for detected Office apps", () => {
    expect(selectSheet({ ...defaultSettings, shortcutLanguage: "en" }, { processName: "excel.exe", title: null, sheetId: null }).id).toBe(
      "excel-en"
    );
    expect(selectSheet({ ...defaultSettings, shortcutLanguage: "en" }, { processName: "winword.exe", title: null, sheetId: null }).id).toBe(
      "word-en"
    );
    expect(selectSheet({ ...defaultSettings, shortcutLanguage: "en" }, { processName: "powerpnt.exe", title: null, sheetId: null }).id).toBe(
      "powerpoint-en"
    );
    expect(selectSheet({ ...defaultSettings, shortcutLanguage: "en" }, { processName: "outlook.exe", title: null, sheetId: null }).id).toBe(
      "outlook-en"
    );
  });

  it("uses the shortcut language for new detected app families", () => {
    expect(selectSheet({ ...defaultSettings, shortcutLanguage: "en" }, { processName: "explorer.exe", title: null, sheetId: null }).id).toBe(
      "file-explorer-en"
    );
    expect(selectSheet({ ...defaultSettings, shortcutLanguage: "en" }, { processName: "systemsettings.exe", title: null, sheetId: null }).id).toBe(
      "windows-core-en"
    );
    expect(selectSheet({ ...defaultSettings, shortcutLanguage: "en" }, { processName: "microsoft.photos.exe", title: null, sheetId: null }).id).toBe(
      "photos-en"
    );
    expect(selectSheet({ ...defaultSettings, shortcutLanguage: "en" }, { processName: "microsoft.media.player.exe", title: null, sheetId: null }).id).toBe(
      "media-player-en"
    );
    expect(selectSheet({ ...defaultSettings, shortcutLanguage: "en" }, { processName: "windowsterminal.exe", title: null, sheetId: null }).id).toBe(
      "terminal-powershell-en"
    );
    expect(selectSheet({ ...defaultSettings, shortcutLanguage: "en" }, { processName: "firefox.exe", title: null, sheetId: null }).id).toBe(
      "browsers-en"
    );
    expect(selectSheet({ ...defaultSettings, shortcutLanguage: "en" }, { processName: "thunderbird.exe", title: null, sheetId: null }).id).toBe(
      "thunderbird-en"
    );
    expect(selectSheet({ ...defaultSettings, shortcutLanguage: "en" }, { processName: "obsidian.exe", title: null, sheetId: null }).id).toBe(
      "obsidian-en"
    );
    expect(selectSheet({ ...defaultSettings, shortcutLanguage: "en" }, { processName: "vlc.exe", title: null, sheetId: null }).id).toBe(
      "vlc-en"
    );
  });

  it("does not auto-detect cmd as the PowerShell sheet", () => {
    expect(findSheetForProcess("cmd.exe", "fr")).toBeNull();
  });

  it("keeps Terminal settings shortcuts distinct", () => {
    const terminal = sheets.find((sheet) => sheet.id === "terminal-powershell-fr");
    const tabsCategory = terminal?.categories.find((category) => category.id === "onglets");

    expect(tabsCategory?.shortcuts.find((shortcut) => shortcut.id === "onglets-parametres")?.keys).toEqual(["Ctrl", ","]);
    expect(tabsCategory?.shortcuts.find((shortcut) => shortcut.id === "onglets-fichier-parametres")?.keys).toEqual([
      "Ctrl",
      "Shift",
      ","
    ]);
  });

  it("keeps PowerShell commands copyable without fake keyboard keys", () => {
    const terminal = sheets.find((sheet) => sheet.id === "terminal-powershell-fr");
    const commandsCategory = terminal?.categories.find((category) => category.id === "commandes");
    const stopProcess = commandsCategory?.shortcuts.find((shortcut) => shortcut.id === "commandes-arreter-processus");

    expect(commandsCategory?.shortcuts).toHaveLength(7);
    expect(commandsCategory?.shortcuts.every((shortcut) => shortcut.keys.length === 0)).toBe(true);
    expect(commandsCategory?.shortcuts.every((shortcut) => Boolean(shortcut.command))).toBe(true);
    expect(stopProcess?.command).toBe("Stop-Process -Name <nom>");
    expect(stopProcess?.warningLevel).toBe("danger");
  });

  it("does not keep a browser sheet when the current process changes", () => {
    expect(selectSheet(defaultSettings, { processName: "firefox.exe", title: null, sheetId: null }).id).toBe("browsers-fr");
    expect(selectSheet(defaultSettings, { processName: "excel.exe", title: null, sheetId: null }).id).toBe("excel-fr");
    expect(selectSheet(defaultSettings, { processName: "explorer.exe", title: "Documents", sheetId: null }).id).toBe(
      "file-explorer-fr"
    );
  });

  it("selects sheets from the active app carried by an open request", () => {
    const vlcOpenRequest = {
      mode: "shortcuts",
      activeApp: { processName: "vlc.exe", title: "Lecteur multimedia VLC", sheetId: "vlc-fr" }
    };
    const excelOpenRequest = {
      mode: "shortcuts",
      activeApp: { processName: "EXCEL.EXE", title: "Classeur1 - Excel", sheetId: "excel-fr" }
    };

    expect(selectSheet(defaultSettings, vlcOpenRequest.activeApp).id).toBe("vlc-fr");
    expect(selectSheet(defaultSettings, excelOpenRequest.activeApp).id).toBe("excel-fr");
  });

  it("translates explicit active sheet ids to the shortcut language", () => {
    const sheet = selectSheet(
      { ...defaultSettings, shortcutLanguage: "en" },
      { processName: "excel.exe", title: null, sheetId: "excel-fr" }
    );

    expect(sheet.id).toBe("excel-en");
  });

  it("falls back to French when a requested sheet language is absent", () => {
    expect(findSheetForFamily("excel", "es")?.id).toBe("excel-fr");
  });

  it("resolves keyboard layout overrides before base keys", () => {
    const shortcut: ShortcutEntry = {
      id: "synthetic-layout",
      label: "Synthetic layout",
      keys: ["Ctrl", "`"],
      keysByLayout: {
        azerty: ["Ctrl", "Alt", "7"],
        qwerty: ["Ctrl", "`"]
      },
      description: "Synthetic shortcut.",
      priority: 1,
      level: "advanced"
    };

    expect(shortcutKeysForLayout(shortcut, "azerty")).toEqual(["Ctrl", "Alt", "7"]);
    expect(shortcutKeysForLayout(shortcut, "qwerty")).toEqual(["Ctrl", "`"]);
  });

  it("keeps localized Office bold shortcuts distinct between French and English", () => {
    expect(findShortcut(findSheetForFamily("excel", "fr")!, "edition-gras")?.keys).toEqual(["Ctrl", "G"]);
    expect(findShortcut(findSheetForFamily("excel", "en")!, "edition-gras")?.keys).toEqual(["Ctrl", "B"]);
    expect(findShortcut(findSheetForFamily("powerpoint", "fr")!, "texte-gras")?.keys).toEqual(["Ctrl", "G"]);
    expect(findShortcut(findSheetForFamily("powerpoint", "en")!, "texte-gras")?.keys).toEqual(["Ctrl", "B"]);
    expect(findShortcut(findSheetForFamily("word", "fr")!, "format-gras")?.keys).toEqual(["Ctrl", "G"]);
    expect(findShortcut(findSheetForFamily("word", "en")!, "format-gras")?.keys).toEqual(["Ctrl", "B"]);
  });

  it("keeps difficult Office punctuation shortcuts explicit", () => {
    const excelFr = findSheetForFamily("excel", "fr")!;
    const excelEn = findSheetForFamily("excel", "en")!;
    const wordFr = findSheetForFamily("word", "fr")!;
    const wordEn = findSheetForFamily("word", "en")!;
    const powerpointFr = findSheetForFamily("powerpoint", "fr")!;
    const powerpointEn = findSheetForFamily("powerpoint", "en")!;

    expect(findShortcut(excelFr, "formules-afficher-formules")?.keys).toEqual(["Ctrl", "`"]);
    expect(findShortcut(excelFr, "formules-afficher-formules")?.level).toBe("expert");
    expect(findShortcut(excelEn, "formules-afficher-formules")?.level).toBe("expert");
    expect(shortcutKeysForLayout(findShortcut(excelFr, "formules-heure")!, "azerty")).toEqual(["Ctrl", ":"]);
    expect(shortcutKeysForLayout(findShortcut(excelFr, "formules-heure")!, "qwerty")).toEqual(["Ctrl", "Shift", ";"]);
    expect(shortcutKeysForLayout(findShortcut(excelEn, "formules-heure")!, "azerty")).toEqual(["Ctrl", ":"]);
    expect(shortcutKeysForLayout(findShortcut(excelEn, "formules-heure")!, "qwerty")).toEqual(["Ctrl", "Shift", ";"]);

    expect(findShortcut(wordFr, "format-police-plus")?.keys).toEqual(["Ctrl", "Shift", ">"]);
    expect(findShortcut(wordFr, "format-police-moins")?.keys).toEqual(["Ctrl", "Shift", "<"]);
    expect(findShortcut(wordEn, "format-police-plus")?.keys).toEqual(["Ctrl", "Shift", ">"]);
    expect(findShortcut(wordEn, "format-police-moins")?.keys).toEqual(["Ctrl", "Shift", "<"]);

    expect(findShortcut(powerpointFr, "diapos-avancer-plan")?.keys).toEqual(["Ctrl", "Shift", "]"]);
    expect(findShortcut(powerpointFr, "diapos-avancer-plan")?.level).toBe("expert");
    expect(findShortcut(powerpointFr, "diapos-reculer-plan")?.keys).toEqual(["Ctrl", "Shift", "["]);
    expect(findShortcut(powerpointFr, "diapos-reculer-plan")?.level).toBe("expert");
    expect(findShortcut(powerpointEn, "diapos-avancer-plan")?.level).toBe("expert");
    expect(findShortcut(powerpointEn, "diapos-reculer-plan")?.level).toBe("expert");
  });

  it("honors manual sheet mode", () => {
    const sheet = selectSheet({ ...defaultSettings, sheetMode: "manual", manualSheetId: "word" }, null);

    expect(sheet.id).toBe("word-fr");
  });

  it("deduplicates manual sheet options by family", () => {
    const options = manualSheetOptions();

    expect(options).toContainEqual({ key: "windows-core", label: "Windows - Essentiels" });
    expect(options.filter((option) => option.key === "windows-core")).toHaveLength(1);
    expect(options).toContainEqual({ key: "excel", label: "Excel" });
    expect(options).toContainEqual({ key: "word", label: "Word" });
    expect(options).toContainEqual({ key: "powerpoint", label: "PowerPoint" });
    expect(options).toContainEqual({ key: "outlook", label: "Outlook" });
    expect(options).toContainEqual({ key: "file-explorer", label: "Explorateur de fichiers" });
    expect(options).toContainEqual({ key: "photos", label: "Photos" });
    expect(options).toContainEqual({ key: "media-player", label: "Lecteur multimedia" });
    expect(options).toContainEqual({ key: "terminal-powershell", label: "Terminal et PowerShell" });
    expect(options).toContainEqual({ key: "browsers", label: "Navigateurs" });
    expect(options).toContainEqual({ key: "thunderbird", label: "Thunderbird" });
    expect(options).toContainEqual({ key: "obsidian", label: "Obsidian" });
    expect(options).toContainEqual({ key: "vlc", label: "VLC" });
  });

  it("localizes manual sheet labels", () => {
    const options = manualSheetOptions("en");

    expect(options).toContainEqual({ key: "windows-core", label: "Windows - Essentials" });
    expect(options).toContainEqual({ key: "file-explorer", label: "File Explorer" });
    expect(options).toContainEqual({ key: "media-player", label: "Media Player" });
    expect(options).toContainEqual({ key: "terminal-powershell", label: "Terminal and PowerShell" });
    expect(options).toContainEqual({ key: "browsers", label: "Browsers" });
  });

  it("adds a compact Win suffix only to native Windows selector labels", () => {
    const options = manualSheetOptions("fr", true);

    expect(options).toContainEqual({ key: "windows-core", label: "Windows - Essentiels" });
    expect(options).toContainEqual({ key: "file-explorer", label: "Explorateur de fichiers - Win" });
    expect(options).toContainEqual({ key: "photos", label: "Photos - Win" });
    expect(options).toContainEqual({ key: "media-player", label: "Lecteur multimedia - Win" });
    expect(options).toContainEqual({ key: "terminal-powershell", label: "Terminal et PowerShell - Win" });
    expect(options).toContainEqual({ key: "excel", label: "Excel" });
  });

  it("identifies native Windows sheets and software shortcut warnings", () => {
    expect(isWindowsNativeSheetFamily("photos")).toBe(true);
    expect(sheetLabelWithWindowsNativeSuffix("photos", "Photos")).toBe("Photos - Win");
    expect(isWindowsNativeSheetFamily("excel")).toBe(false);

    expect(shouldShowShortcutBaselineWarning("windows-core")).toBe(false);
    expect(shouldShowShortcutBaselineWarning("file-explorer")).toBe(false);
    expect(shouldShowShortcutBaselineWarning("photos")).toBe(true);
    expect(shouldShowShortcutBaselineWarning("excel")).toBe(true);
  });

  it("identifies sheet badges", () => {
    expect(sheetBadgeKeys("windows-core")).toEqual(["windows-native"]);
    expect(sheetBadgeKeys("browsers")).toEqual(["browser-edge", "browser-chrome", "browser-firefox", "browser-brave"]);
    expect(sheetBadgeKeys("excel")).toEqual(["office-365", "office-2024", "office-2021"]);
    expect(sheetBadgeKeys("word")).toEqual(["office-365", "office-2024", "office-2021"]);
    expect(sheetBadgeKeys("powerpoint")).toEqual(["office-365", "office-2024", "office-2021"]);
    expect(sheetBadgeKeys("outlook")).toEqual(["office-365", "office-2024", "office-2021"]);
  });

  it("uses the shortcut language when a manual family has variants", () => {
    const sheet = selectSheet({ ...defaultSettings, shortcutLanguage: "en", sheetMode: "manual", manualSheetId: "windows-core" }, null);

    expect(sheet.id).toBe("windows-core-en");
  });

  it("uses the shortcut language for manual Office families", () => {
    const sheet = selectSheet({ ...defaultSettings, shortcutLanguage: "en", sheetMode: "manual", manualSheetId: "word" }, null);

    expect(sheet.id).toBe("word-en");
  });

  it("filters shortcut levels without accumulating previous levels", () => {
    const sheet = getFallbackSheet("fr");
    const standard = visibleShortcuts(sheet, { mode: "level", level: "standard" });
    const advanced = visibleShortcuts(sheet, { mode: "level", level: "advanced" });
    const expert = visibleShortcuts(sheet, { mode: "level", level: "expert" });

    expect(JSON.stringify(standard)).not.toContain("Bureau suivant");
    expect(JSON.stringify(standard)).not.toContain("Gestionnaire de peripheriques");
    expect(JSON.stringify(advanced)).toContain("Bureau suivant");
    expect(JSON.stringify(advanced)).not.toContain("Gestionnaire de peripheriques");
    expect(JSON.stringify(advanced)).not.toContain("Copier");
    expect(JSON.stringify(expert)).toContain("Fermer bureau");
    expect(JSON.stringify(expert)).toContain("Gestionnaire de peripheriques");
    expect(JSON.stringify(expert)).not.toContain("Bureau suivant");
  });

  it("marks empty levels unavailable and resolves them to a non-empty level", () => {
    const sheet: ShortcutSheet = {
      id: "synthetic-fr",
      appNames: [],
      title: "Synthetic",
      platform: "windows",
      language: "fr",
      categories: [
        {
          id: "navigation",
          title: "Navigation",
          shortcuts: [
            {
              label: "Synthetic",
              keys: ["Ctrl", "S"],
              description: "Synthetic shortcut.",
              priority: 1,
              level: "standard",
              id: "navigation-synthetic"
            }
          ]
        }
      ]
    };

    expect(availableShortcutLevels(sheet).advanced).toBe(false);
    expect(availableShortcutLevels(sheet).expert).toBe(false);
    expect(resolveShortcutDisplayLevel(sheet, "expert")).toBe("standard");
  });

  it("prepares custom filtering with categories, included shortcuts, and excluded shortcuts", () => {
    const sheet = getFallbackSheet("fr");
    const systemCategory = sheet.categories.find((category) => category.id === "systeme");
    const windowCategory = sheet.categories.find((category) => category.id === "fenetres");
    const quickMenu = systemCategory?.shortcuts.find((shortcut) => shortcut.label === "Menu rapide");
    const closeDesktop = windowCategory?.shortcuts.find((shortcut) => shortcut.label === "Fermer bureau");

    expect(quickMenu).toBeDefined();
    expect(closeDesktop).toBeDefined();

    const custom = visibleShortcuts(sheet, {
      mode: "custom",
      level: "standard",
      categoryIds: ["systeme"],
      includeShortcutIds: [closeDesktop!.id],
      excludeShortcutIds: [quickMenu!.id]
    });

    const serialized = JSON.stringify(custom);

    expect(serialized).toContain("Parametres");
    expect(serialized).toContain("Fermer bureau");
    expect(serialized).not.toContain("Menu rapide");
    expect(serialized).not.toContain("Copier");
  });

  it("initializes custom preferences from the selected display level", () => {
    const sheet = getFallbackSheet("fr");
    const custom = customPreferenceFromLevel(sheet, "advanced");
    const visible = visibleShortcuts(sheet, custom);

    expect(custom.mode).toBe("custom");
    expect(custom.level).toBe("advanced");
    expect(custom.includeShortcutIds).toContain("fenetres-bureau-suivant");
    expect(JSON.stringify(visible)).toContain("Bureau suivant");
    expect(JSON.stringify(visible)).not.toContain("Copier");
  });

  it("checks a theme by including every shortcut in that category", () => {
    const sheet = getFallbackSheet("fr");
    const systemCategory = sheet.categories.find((category) => category.id === "systeme");

    expect(systemCategory).toBeDefined();

    const custom = updateCustomCategoryPreference({ mode: "custom", level: "standard" }, systemCategory!, true);
    const visible = visibleShortcuts(sheet, custom);
    const serialized = JSON.stringify(visible);

    expect(shortcutThemeState(systemCategory!, custom)).toBe("checked");
    expect(serialized).toContain("Menu Demarrer");
    expect(serialized).toContain("Menu rapide");
    expect(serialized).not.toContain("Copier");
  });

  it("excludes a single shortcut from a checked theme", () => {
    const sheet = getFallbackSheet("fr");
    const systemCategory = sheet.categories.find((category) => category.id === "systeme");
    const quickMenu = systemCategory?.shortcuts.find((shortcut) => shortcut.id === "systeme-menu-rapide");

    expect(systemCategory).toBeDefined();
    expect(quickMenu).toBeDefined();

    const themeChecked = updateCustomCategoryPreference({ mode: "custom", level: "standard" }, systemCategory!, true);
    const custom = updateCustomShortcutPreference(themeChecked, systemCategory!, quickMenu!, false);
    const visible = visibleShortcuts(sheet, custom);

    expect(shortcutThemeState(systemCategory!, custom)).toBe("indeterminate");
    expect(isShortcutIncluded(systemCategory!, quickMenu!, custom)).toBe(false);
    expect(JSON.stringify(visible)).not.toContain("Menu rapide");
    expect(JSON.stringify(visible)).toContain("Parametres");
  });

  it("includes a single shortcut without checking the whole theme", () => {
    const sheet = getFallbackSheet("fr");
    const windowCategory = sheet.categories.find((category) => category.id === "fenetres");
    const closeDesktop = windowCategory?.shortcuts.find((shortcut) => shortcut.id === "fenetres-fermer-bureau");

    expect(windowCategory).toBeDefined();
    expect(closeDesktop).toBeDefined();

    const custom = updateCustomShortcutPreference({ mode: "custom", level: "standard" }, windowCategory!, closeDesktop!, true);
    const visible = visibleShortcuts(sheet, custom);

    expect(shortcutThemeState(windowCategory!, custom)).toBe("indeterminate");
    expect(isShortcutIncluded(windowCategory!, closeDesktop!, custom)).toBe(true);
    expect(JSON.stringify(visible)).toContain("Fermer bureau");
    expect(JSON.stringify(visible)).not.toContain("Changer de fenetre");
  });

  it("allows expert Windows tools through customization", () => {
    const sheet = getFallbackSheet("fr");
    const toolsCategory = sheet.categories.find((category) => category.id === "outils-systeme");
    const deviceManager = toolsCategory?.shortcuts.find((shortcut) => shortcut.id === "outils-systeme-gestionnaire-peripheriques");

    expect(toolsCategory).toBeDefined();
    expect(deviceManager).toBeDefined();

    const custom = updateCustomShortcutPreference({ mode: "custom", level: "standard" }, toolsCategory!, deviceManager!, true);
    const visible = visibleShortcuts(sheet, custom);
    const serialized = JSON.stringify(visible);

    expect(serialized).toContain("Gestionnaire de peripheriques");
    expect(serialized).toContain("devmgmt.msc");
    expect(serialized).not.toContain("Menu Demarrer");
  });

  it("keeps custom layouts free of empty categories", () => {
    const sheet = getFallbackSheet("fr");
    const toolsCategory = sheet.categories.find((category) => category.id === "outils-systeme");
    const windowCategory = sheet.categories.find((category) => category.id === "fenetres");
    const deviceManager = toolsCategory?.shortcuts.find((shortcut) => shortcut.id === "outils-systeme-gestionnaire-peripheriques");
    const closeDesktop = windowCategory?.shortcuts.find((shortcut) => shortcut.id === "fenetres-fermer-bureau");

    expect(deviceManager).toBeDefined();
    expect(closeDesktop).toBeDefined();

    const visible = visibleShortcuts(sheet, {
      mode: "custom",
      level: "standard",
      includeShortcutIds: [deviceManager!.id, closeDesktop!.id]
    });
    const categories = layoutShortcutCategories(visible.categories);

    expect(visible.categories.map((category) => category.id)).toEqual(["outils-systeme", "fenetres"]);
    expect(categories.map((category) => category.id)).toEqual(["outils-systeme", "fenetres"]);
    expect(categories.some((category) => category.shortcuts.length === 0)).toBe(false);
  });

  it("keeps category blocks intact in the production layout", () => {
    const categories = layoutShortcutCategories([syntheticCategory("bulk", 14), syntheticCategory("tail", 2)]);

    expect(categories.map((category) => category.title)).toEqual(["bulk", "tail"]);
    expect(categories.map((category) => category.shortcuts.length)).toEqual([14, 2]);
  });

  it("keeps one-category custom layouts intact", () => {
    const sheet = getFallbackSheet("fr");
    const toolsCategory = sheet.categories.find((category) => category.id === "outils-systeme");
    const deviceManager = toolsCategory?.shortcuts.find((shortcut) => shortcut.id === "outils-systeme-gestionnaire-peripheriques");

    expect(deviceManager).toBeDefined();

    const visible = visibleShortcuts(sheet, {
      mode: "custom",
      level: "standard",
      includeShortcutIds: [deviceManager!.id]
    });
    const categories = layoutShortcutCategories(visible.categories);

    expect(visible.categories).toHaveLength(1);
    expect(categories.some((category) => category.shortcuts.length === 0)).toBe(false);
  });

  it("classifies long shortcut rows as stacked for the production layout", () => {
    const sheet = getFallbackSheet("fr");
    const editCategory = sheet.categories.find((category) => category.id === "edition");
    const copy = editCategory?.shortcuts.find((shortcut) => shortcut.id === "edition-copier");
    const pastePlainText = editCategory?.shortcuts.find((shortcut) => shortcut.id === "edition-coller-sans-mise-en-forme");
    const mediaPlayer = findSheetForFamily("media-player", "fr");
    const browsers = findSheetForFamily("browsers", "fr");

    expect(copy).toBeDefined();
    expect(pastePlainText).toBeDefined();
    expect(mediaPlayer).toBeDefined();
    expect(browsers).toBeDefined();
    expect(shortcutRowLayout(copy!, "azerty")).toBe("compact");
    expect(shortcutRowLayout(pastePlainText!, "azerty")).toBe("stacked");
    expect(shortcutRowLayout(findShortcut(mediaPlayer!, "lecture-lecture-pause-alternative")!, "azerty")).toBe("compact");
    expect(shortcutRowLayout(findShortcut(mediaPlayer!, "lecture-plein-ecran-alt")!, "azerty")).toBe("compact");
    expect(shortcutRowLayout(findShortcut(browsers!, "navigation-actualiser-sans-cache")!, "azerty")).toBe("compact");
    expect(shortcutRowLayout(findShortcut(browsers!, "outils-gestionnaire-favoris")!, "azerty")).toBe("compact");
    expect(shortcutRowLayout(findShortcut(browsers!, "outils-gestionnaire-favoris")!, "azerty", 320)).toBe("compact");
    expect(shortcutRowLayout(findShortcut(browsers!, "outils-gestionnaire-favoris")!, "azerty", 160)).toBe("stacked");
    expect(
      shortcutRowLayout(
        {
          id: "synthetic-reply-all",
          label: "Repondre a tous",
          keys: ["Ctrl", "Shift", "R"],
          description: "Synthetic shortcut.",
          priority: 1,
          level: "standard"
        },
        "azerty"
      )
    ).toBe("compact");
  });

  it("reserves at least two key slots before stacking shortcut rows", () => {
    expect(
      shortcutRowLayout(
        {
          id: "synthetic-single-key-width",
          label: "A".repeat(29),
          keys: ["F7"],
          description: "Synthetic shortcut.",
          priority: 1,
          level: "standard"
        },
        "azerty"
      )
    ).toBe("stacked");
  });
});
