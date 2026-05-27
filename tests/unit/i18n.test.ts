import { describe, expect, it } from "vitest";
import { labelsFor } from "../../src/app/i18n";

describe("interface labels", () => {
  it("localizes transparency levels in French", () => {
    const labels = labelsFor("fr");

    expect(labels.settings.transparency).toBe("Transparence du panneau");
    expect(labels.transparency.none).toBe("Opaque");
    expect(labels.transparency.light).toBe("Legere");
    expect(labels.transparency.medium).toBe("Moyenne");
    expect(labels.transparency.strong).toBe("Forte");
    expect(labels.transparency.max).toBe("Maximale");
  });

  it("localizes options in English", () => {
    const labels = labelsFor("en");

    expect(labels.settings.language).toBe("Language");
    expect(labels.settings.about).toBe("About");
    expect(labels.tabs.appearance).toBe("Appearance");
    expect(labels.sections.availableSheets).toBe("Library");
    expect(labels.settings.updateUnconfigured).toContain("GitHub Releases");
    expect(labels.settings.updateCheck).toContain("Check for updates");
    expect(labels.settings.repository).toBe("GitHub repository");
    expect(labels.shortcutDisplayChoice.advanced).toBe("Advanced");
    expect(labels.shortcutDisplayChoice.custom).toBe("Customize");
    expect(labels.tabs.customization).toBe("Customization");
    expect(labels.theme.dark).toBe("Dark");
    expect(labels.theme.colorblind).toBe("Colorblind mode");
    expect(Object.values(labels.theme)).not.toContain("Light");
    expect(Object.values(labels.theme)).not.toContain("System");
  });

  it("limits French appearance labels to dark and colorblind modes", () => {
    const labels = labelsFor("fr");

    expect(labels.theme.dark).toBe("Sombre");
    expect(labels.theme.colorblind).toBe("Mode daltonien");
    expect(Object.values(labels.theme)).not.toContain("Clair");
    expect(Object.values(labels.theme)).not.toContain("Systeme");
  });

  it("localizes shortcut placement labels", () => {
    const fr = labelsFor("fr");
    const en = labelsFor("en");

    expect(fr.sections.shortcutPlacement).toBe("Emplacement des raccourcis");
    expect(fr.settings.confirmPlacement).toBe("Valider l'emplacement");
    expect(fr.shortcutPlacementPreset["top-right"]).toBe("Haut droit");
    expect(en.sections.shortcutPlacement).toBe("Shortcut placement");
    expect(en.settings.cancelPlacement).toBe("Cancel");
    expect(en.shortcutPlacementPreset.center).toBe("Center");
  });

  it("localizes taskbar icon visibility guidance", () => {
    const fr = labelsFor("fr");
    const en = labelsFor("en");

    expect(fr.settings.trayVisibility).toContain("icone Merken");
    expect(fr.settings.trayVisibilityHelp).toContain("parametres Windows");
    expect(en.settings.trayVisibility).toContain("Merken icon");
    expect(en.settings.trayVisibilityHelp).toContain("Windows settings");
  });

  it("localizes update states", () => {
    const fr = labelsFor("fr");
    const en = labelsFor("en");

    expect(fr.settings.updateChecking).toBe("Verification en cours");
    expect(fr.settings.updatePortableAvailable).toContain("Telecharger");
    expect(fr.settings.resetHelp).toContain("ensemble des options");
    expect(fr.modal.resetConfirm).toContain("reinitialiser");
    expect(en.settings.updateUpToDate).toBe("Merken is up to date");
    expect(en.settings.updateAvailable).toContain("Install");
    expect(en.settings.resetHelp).toContain("all application options");
    expect(en.modal.resetTitle).toBe("Confirm reset");
  });
});
