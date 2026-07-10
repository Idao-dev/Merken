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

    expect(loadSettings(memoryStorage).theme).toBe("light");
    expect(loadSettings(memoryStorage).enhancedContrast).toBe(false);
  });

  it("migrates the old colorblind theme to dark with enhanced contrast", () => {
    memoryStorage.setItem("merken.settings.v1", JSON.stringify({ ...defaultSettings, theme: "colorblind" }));

    const settings = loadSettings(memoryStorage);

    expect(settings.theme).toBe("dark");
    expect(settings.enhancedContrast).toBe(true);
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
        panelTransparency: "<strong>",
        shortcutLanguage: "javascript:alert(1)",
        keyboardLayout: "colemak",
        shortcutLanguageOverrides: {
          excel: "en",
          word: "de",
          "bad\"family": "fr",
          settings: "en"
        },
        sheetMode: "manual",
        manualSheetId: "windows-core\" autofocus",
        shortcutPlacementPreset: "bottom-right<script>",
        shortcutWarningMode: "dangerous<script>",
        shortcutCustomPosition: { x: Number.NaN, y: 12 },
        trayIconVisible: "yes"
      })
    );

    const settings = loadSettings(memoryStorage);

    expect(settings.language).toBe("fr");
    expect(settings.shortcutLanguage).toBe("fr");
    expect(settings.keyboardLayout).toBe("azerty");
    expect("shortcutLanguageOverrides" in settings).toBe(false);
    expect(settings.textSize).toBe("md");
    expect(settings.panelTransparency).toBe(50);
    expect(settings.sheetMode).toBe("manual");
    expect(settings.manualSheetId).toBe("windows-core");
    expect(settings.shortcutPlacementPreset).toBe("top-right");
    expect(settings.shortcutWarningMode).toBe("all");
    expect(settings.shortcutCustomPosition).toBeNull();
    expect(settings.trayIconVisible).toBe(true);
    expect(settings.enhancedContrast).toBe(false);
    expect(settings.panelTransparency).toBe(50);
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
    expect(settings.trayIconVisible).toBe(true);
    expect(settings.shortcutLanguage).toBe("fr");
    expect(settings.keyboardLayout).toBe("azerty");
    expect(settings.enhancedContrast).toBe(false);
    expect(settings.shortcutSheetPreferences).toEqual({});
  });

  it("normalizes a non-boolean enhanced contrast value", () => {
    memoryStorage.setItem(
      "merken.settings.v1",
      JSON.stringify({ ...defaultSettings, enhancedContrast: "yes" })
    );

    expect(loadSettings(memoryStorage).enhancedContrast).toBe(false);
  });

  it("migrates old transparency levels", () => {
    const expectedValues = {
      none: 0,
      light: 25,
      medium: 50,
      strong: 75,
      max: 100
    };

    for (const [blur, panelTransparency] of Object.entries(expectedValues)) {
      memoryStorage.setItem(
        "merken.settings.v1",
        JSON.stringify({
          language: "fr",
          theme: "dark",
          textSize: "md",
          blur,
          sheetMode: "auto",
          manualSheetId: "windows-core",
          startWithWindows: true
        })
      );

      expect(loadSettings(memoryStorage).panelTransparency).toBe(panelTransparency);
    }
  });

  it("adds shortcut language and keyboard defaults to old English settings", () => {
    const oldSettings = {
      language: "en",
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

    expect(settings.language).toBe("en");
    expect(settings.shortcutLanguage).toBe("en");
    expect(settings.keyboardLayout).toBe("qwerty");
    expect("shortcutLanguageOverrides" in settings).toBe(false);
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

  it("migrates the old Terminal and PowerShell sheet to PowerShell", () => {
    memoryStorage.setItem(
      "merken.settings.v1",
      JSON.stringify({
        ...defaultSettings,
        manualSheetId: "terminal-powershell",
        shortcutSheetPreferences: {
          "terminal-powershell": {
            mode: "level",
            level: "expert"
          }
        }
      })
    );

    const settings = loadSettings(memoryStorage);

    expect(settings.manualSheetId).toBe("powershell");
    expect(settings.shortcutSheetPreferences.powershell).toEqual({ mode: "level", level: "expert" });
    expect(settings.shortcutSheetPreferences["terminal-powershell"]).toBeUndefined();
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
    expect(settings.shortcutSheetPreferences.cmd).toEqual({ mode: "level", level: "advanced" });
    expect(settings.shortcutSheetPreferences.powershell).toEqual({ mode: "level", level: "advanced" });
    expect(settings.shortcutSheetPreferences.excel).toEqual({ mode: "level", level: "advanced" });
    expect(settings.shortcutSheetPreferences.settings).toBeUndefined();
  });
});
