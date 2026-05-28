import { afterEach, describe, expect, it } from "vitest";
import { defaultSettings, loadSettings } from "../../src/app/settings";

const storage = new Map<string, string>();
const memoryStorage = {
  getItem(key: string): string | null {
    return storage.get(key) ?? null;
  },
  setItem(key: string, value: string): void {
    storage.set(key, value);
  }
};

describe("settings persistence", () => {
  afterEach(() => {
    storage.clear();
  });

  it("migrates old light theme settings to dark", () => {
    memoryStorage.setItem("merken.settings.v1", JSON.stringify({ ...defaultSettings, theme: "light" }));

    expect(loadSettings(memoryStorage).theme).toBe("dark");
  });

  it("migrates old system theme settings to dark", () => {
    memoryStorage.setItem("merken.settings.v1", JSON.stringify({ ...defaultSettings, theme: "system" }));

    expect(loadSettings(memoryStorage).theme).toBe("dark");
  });

  it("ignores invalid enum and identifier values from storage", () => {
    memoryStorage.setItem(
      "merken.settings.v1",
      JSON.stringify({
        ...defaultSettings,
        language: "javascript:alert(1)",
        textSize: "xl onmouseover=alert(1)",
        blur: "<strong>",
        sheetMode: "manual",
        manualSheetId: "windows-core\" autofocus",
        shortcutPlacementPreset: "bottom-right<script>",
        shortcutWarningMode: "dangerous<script>",
        shortcutCustomPosition: { x: Number.NaN, y: 12 }
      })
    );

    const settings = loadSettings(memoryStorage);

    expect(settings.language).toBe("fr");
    expect(settings.textSize).toBe("md");
    expect(settings.blur).toBe("medium");
    expect(settings.sheetMode).toBe("manual");
    expect(settings.manualSheetId).toBe("windows-core");
    expect(settings.shortcutPlacementPreset).toBe("top-right");
    expect(settings.shortcutWarningMode).toBe("all");
    expect(settings.shortcutCustomPosition).toBeNull();
  });

  it("filters unsafe custom shortcut preference identifiers", () => {
    memoryStorage.setItem(
      "merken.settings.v1",
      JSON.stringify({
        ...defaultSettings,
        shortcutSheetPreferences: {
          "windows-core": {
            mode: "custom",
            level: "advanced",
            categoryIds: ["fenetres", "x\" autofocus"],
            includeShortcutIds: ["fenetres-bureau-suivant", "<script>"],
            excludeShortcutIds: ["fenetres-fermer-bureau", "javascript:alert(1)"]
          },
          "bad\"family": {
            mode: "level",
            level: "expert"
          },
          settings: {
            mode: "level",
            level: "expert"
          }
        }
      })
    );

    const settings = loadSettings(memoryStorage);

    expect(settings.shortcutSheetPreferences["bad\"family"]).toBeUndefined();
    expect(settings.shortcutSheetPreferences.settings).toBeUndefined();
    expect(settings.shortcutSheetPreferences["windows-core"]).toEqual({
      mode: "custom",
      level: "advanced",
      categoryIds: ["fenetres"],
      includeShortcutIds: ["fenetres-bureau-suivant"],
      excludeShortcutIds: ["fenetres-fermer-bureau"]
    });
  });

  it("adds shortcut placement defaults to old settings", () => {
    const oldSettings = {
      language: "fr",
      theme: "dark",
      textSize: "md",
      blur: "medium",
      sheetMode: "auto",
      manualSheetId: "windows-core",
      expertMode: false,
      startWithWindows: true
    };
    memoryStorage.setItem("merken.settings.v1", JSON.stringify(oldSettings));
    const settings = loadSettings(memoryStorage);

    expect(settings.shortcutPlacementMode).toBe("preset");
    expect(settings.shortcutPlacementPreset).toBe("top-right");
    expect(settings.shortcutCustomPosition).toBeNull();
    expect(settings.shortcutWarningMode).toBe("all");
    expect(settings.trayVisibilityPromptDismissed).toBe(false);
    expect(settings.shortcutSheetPreferences).toEqual({});
  });

  it("migrates the removed Settings sheet to Windows core", () => {
    memoryStorage.setItem(
      "merken.settings.v1",
      JSON.stringify({
        ...defaultSettings,
        manualSheetId: "settings",
        shortcutWarningMode: "danger-only"
      })
    );

    const settings = loadSettings(memoryStorage);

    expect(settings.manualSheetId).toBe("windows-core");
    expect(settings.shortcutWarningMode).toBe("danger-only");
  });

  it("migrates old expert mode settings to advanced sheet levels", () => {
    memoryStorage.setItem(
      "merken.settings.v1",
      JSON.stringify({
        language: "fr",
        theme: "dark",
        textSize: "md",
        blur: "medium",
        sheetMode: "auto",
        manualSheetId: "windows-core",
        expertMode: true,
        startWithWindows: true
      })
    );
    const settings = loadSettings(memoryStorage);

    expect(settings.shortcutSheetPreferences["windows-core"]).toEqual({ mode: "level", level: "advanced" });
    expect(settings.shortcutSheetPreferences.excel).toEqual({ mode: "level", level: "advanced" });
    expect(settings.shortcutSheetPreferences.settings).toBeUndefined();
  });
});
