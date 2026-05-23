import { describe, expect, it } from "vitest";
import { defaultSettings } from "../../src/app/settings";
import {
  findSheetForProcess,
  getFallbackSheet,
  manualSheetOptions,
  selectSheet,
  visibleShortcuts
} from "../../src/app/sheets";

describe("shortcut sheet selection", () => {
  it("keeps Phase 1 settings defaults explicit", () => {
    expect(defaultSettings.language).toBe("fr");
    expect(defaultSettings.theme).toBe("dark");
    expect(defaultSettings.startWithWindows).toBe(true);
    expect(defaultSettings.sheetMode).toBe("auto");
    expect(defaultSettings.manualSheetId).toBe("windows-core");
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
  });

  it("localizes manual sheet labels", () => {
    const options = manualSheetOptions("en");

    expect(options).toContainEqual({ key: "windows-core", label: "Windows - Essentials" });
  });

  it("uses the current language when a manual family has variants", () => {
    const sheet = selectSheet({ ...defaultSettings, language: "en", sheetMode: "manual", manualSheetId: "windows-core" }, null);

    expect(sheet.id).toBe("windows-core-en");
  });

  it("uses the current language for manual Office families", () => {
    const sheet = selectSheet({ ...defaultSettings, language: "en", sheetMode: "manual", manualSheetId: "word" }, null);

    expect(sheet.id).toBe("word-en");
  });

  it("filters expert shortcuts until expert mode is enabled", () => {
    const sheet = getFallbackSheet("fr");
    const standard = visibleShortcuts(sheet, false);
    const expert = visibleShortcuts(sheet, true);

    expect(JSON.stringify(standard)).not.toContain("Bureau suivant");
    expect(JSON.stringify(expert)).toContain("Bureau suivant");
  });
});
