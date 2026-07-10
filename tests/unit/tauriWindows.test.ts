import { describe, expect, it } from "vitest";
import tauriConfig from "../../src-tauri/tauri.conf.json";
import defaultCapability from "../../src-tauri/capabilities/default.json";
import shortcutsCapability from "../../src-tauri/capabilities/shortcuts.json";

function permissionSet(capability: { permissions: string[] }): Set<string> {
  return new Set(capability.permissions);
}

describe("Tauri window smoke configuration", () => {
  it("declares every real Merken window with the expected shell flags", () => {
    const windows = Object.fromEntries(tauriConfig.app.windows.map((window) => [window.label, window]));

    expect(Object.keys(windows).sort()).toEqual(["settings", "shortcuts", "shortcuts-preview"]);

    expect(windows.shortcuts).toMatchObject({
      width: 540,
      height: 680,
      visible: false,
      decorations: false,
      transparent: true,
      resizable: false,
      skipTaskbar: true,
      alwaysOnTop: true,
      shadow: false
    });
    expect(windows["shortcuts-preview"]).toMatchObject({
      width: 540,
      height: 680,
      visible: false,
      decorations: false,
      transparent: true,
      resizable: false,
      skipTaskbar: true,
      alwaysOnTop: true,
      shadow: false
    });
    expect(windows.settings).toMatchObject({
      width: 980,
      height: 680,
      visible: false,
      decorations: false,
      transparent: true,
      resizable: false,
      skipTaskbar: true,
      alwaysOnTop: true,
      shadow: false
    });
  });

  it("keeps settings-only native permissions scoped to the settings window", () => {
    expect(defaultCapability.windows).toEqual(["settings"]);
    expect(shortcutsCapability.windows).toEqual(["shortcuts", "shortcuts-preview"]);

    const settingsPermissions = permissionSet(defaultCapability);
    const shortcutPermissions = permissionSet(shortcutsCapability);

    for (const permission of [
      "autostart:allow-enable",
      "autostart:allow-disable",
      "autostart:allow-is-enabled",
      "updater:allow-check",
      "updater:allow-download-and-install",
      "process:allow-restart"
    ]) {
      expect(settingsPermissions.has(permission), permission).toBe(true);
      expect(shortcutPermissions.has(permission), permission).toBe(false);
    }
  });

  it("grants each window family the window APIs used by the frontend", () => {
    const settingsPermissions = permissionSet(defaultCapability);
    const shortcutPermissions = permissionSet(shortcutsCapability);

    for (const permission of [
      "core:window:allow-start-dragging",
      "core:window:allow-set-position",
      "core:window:allow-set-size",
      "core:window:allow-outer-position",
      "core:window:allow-outer-size",
      "core:window:allow-current-monitor",
      "core:window:allow-primary-monitor"
    ]) {
      expect(settingsPermissions.has(permission), permission).toBe(true);
    }

    for (const permission of [
      "core:window:allow-start-dragging",
      "core:window:allow-set-position",
      "core:window:allow-set-size",
      "core:window:allow-outer-position",
      "core:window:allow-outer-size",
      "core:window:allow-current-monitor",
      "core:window:allow-is-focused",
      "core:window:allow-primary-monitor",
      "core:window:allow-set-focus"
    ]) {
      expect(shortcutPermissions.has(permission), permission).toBe(true);
    }
  });
});
