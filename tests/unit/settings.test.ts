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
    expect(settings.trayVisibilityPromptDismissed).toBe(false);
  });
});
