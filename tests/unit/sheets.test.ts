import { describe, expect, it } from "vitest";
import { defaultSettings } from "../../src/app/settings";
import {
  availableShortcutLevels,
  customPreferenceFromLevel,
  findSheetForProcess,
  getFallbackSheet,
  isShortcutIncluded,
  manualSheetOptions,
  resolveShortcutDisplayLevel,
  selectSheet,
  sheets,
  shortcutThemeState,
  updateCustomCategoryPreference,
  updateCustomShortcutPreference,
  visibleShortcuts
} from "../../src/app/sheets";

describe("shortcut sheet selection", () => {
  const expectedSheetIds = [
    "windows-core-fr",
    "windows-core-en",
    "file-explorer-fr",
    "file-explorer-en",
    "settings-fr",
    "settings-en",
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
    expect(defaultSettings.theme).toBe("dark");
    expect(defaultSettings.startWithWindows).toBe(true);
    expect(defaultSettings.sheetMode).toBe("auto");
    expect(defaultSettings.manualSheetId).toBe("windows-core");
    expect(defaultSettings.shortcutSheetPreferences).toEqual({});
    expect(defaultSettings.shortcutPlacementMode).toBe("preset");
    expect(defaultSettings.shortcutPlacementPreset).toBe("top-right");
    expect(defaultSettings.shortcutCustomPosition).toBeNull();
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

  it("classifies every shortcut with a usage level", () => {
    const usageLevels = new Set(["essential", "common", "advanced", "expert"]);

    for (const sheet of sheets) {
      for (const category of sheet.categories) {
        for (const shortcut of category.shortcuts) {
          expect(usageLevels.has(shortcut.usageLevel), `${sheet.id}:${category.id}:${shortcut.label}`).toBe(true);
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

  it("uses the current language for detected Office apps", () => {
    expect(selectSheet({ ...defaultSettings, language: "en" }, { processName: "excel.exe", title: null, sheetId: null }).id).toBe(
      "excel-en"
    );
    expect(selectSheet({ ...defaultSettings, language: "en" }, { processName: "winword.exe", title: null, sheetId: null }).id).toBe(
      "word-en"
    );
    expect(selectSheet({ ...defaultSettings, language: "en" }, { processName: "powerpnt.exe", title: null, sheetId: null }).id).toBe(
      "powerpoint-en"
    );
    expect(selectSheet({ ...defaultSettings, language: "en" }, { processName: "outlook.exe", title: null, sheetId: null }).id).toBe(
      "outlook-en"
    );
  });

  it("uses the current language for new detected app families", () => {
    expect(selectSheet({ ...defaultSettings, language: "en" }, { processName: "explorer.exe", title: null, sheetId: null }).id).toBe(
      "file-explorer-en"
    );
    expect(selectSheet({ ...defaultSettings, language: "en" }, { processName: "systemsettings.exe", title: null, sheetId: null }).id).toBe(
      "settings-en"
    );
    expect(selectSheet({ ...defaultSettings, language: "en" }, { processName: "microsoft.photos.exe", title: null, sheetId: null }).id).toBe(
      "photos-en"
    );
    expect(selectSheet({ ...defaultSettings, language: "en" }, { processName: "microsoft.media.player.exe", title: null, sheetId: null }).id).toBe(
      "media-player-en"
    );
    expect(selectSheet({ ...defaultSettings, language: "en" }, { processName: "windowsterminal.exe", title: null, sheetId: null }).id).toBe(
      "terminal-powershell-en"
    );
    expect(selectSheet({ ...defaultSettings, language: "en" }, { processName: "firefox.exe", title: null, sheetId: null }).id).toBe(
      "browsers-en"
    );
    expect(selectSheet({ ...defaultSettings, language: "en" }, { processName: "thunderbird.exe", title: null, sheetId: null }).id).toBe(
      "thunderbird-en"
    );
    expect(selectSheet({ ...defaultSettings, language: "en" }, { processName: "obsidian.exe", title: null, sheetId: null }).id).toBe(
      "obsidian-en"
    );
    expect(selectSheet({ ...defaultSettings, language: "en" }, { processName: "vlc.exe", title: null, sheetId: null }).id).toBe(
      "vlc-en"
    );
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

  it("translates explicit active sheet ids to the current language", () => {
    const sheet = selectSheet(
      { ...defaultSettings, language: "en" },
      { processName: "excel.exe", title: null, sheetId: "excel-fr" }
    );

    expect(sheet.id).toBe("excel-en");
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
    expect(options).toContainEqual({ key: "settings", label: "Parametres Windows" });
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
    expect(options).toContainEqual({ key: "settings", label: "Windows Settings" });
    expect(options).toContainEqual({ key: "media-player", label: "Media Player" });
    expect(options).toContainEqual({ key: "terminal-powershell", label: "Terminal and PowerShell" });
    expect(options).toContainEqual({ key: "browsers", label: "Browsers" });
  });

  it("uses the current language when a manual family has variants", () => {
    const sheet = selectSheet({ ...defaultSettings, language: "en", sheetMode: "manual", manualSheetId: "windows-core" }, null);

    expect(sheet.id).toBe("windows-core-en");
  });

  it("uses the current language for manual Office families", () => {
    const sheet = selectSheet({ ...defaultSettings, language: "en", sheetMode: "manual", manualSheetId: "word" }, null);

    expect(sheet.id).toBe("word-en");
  });

  it("filters shortcut levels without accumulating previous levels", () => {
    const sheet = getFallbackSheet("fr");
    const standard = visibleShortcuts(sheet, { mode: "level", level: "standard" });
    const advanced = visibleShortcuts(sheet, { mode: "level", level: "advanced" });
    const expert = visibleShortcuts(sheet, { mode: "level", level: "expert" });

    expect(JSON.stringify(standard)).not.toContain("Bureau suivant");
    expect(JSON.stringify(advanced)).toContain("Bureau suivant");
    expect(JSON.stringify(advanced)).not.toContain("Copier");
    expect(JSON.stringify(expert)).toContain("Fermer bureau");
    expect(JSON.stringify(expert)).not.toContain("Bureau suivant");
  });

  it("marks empty levels unavailable and resolves them to a non-empty level", () => {
    const sheet = sheets.find((candidate) => candidate.id === "settings-fr");

    expect(sheet).toBeDefined();
    expect(availableShortcutLevels(sheet!).advanced).toBe(false);
    expect(availableShortcutLevels(sheet!).expert).toBe(false);
    expect(resolveShortcutDisplayLevel(sheet!, "expert")).toBe("standard");
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
});
