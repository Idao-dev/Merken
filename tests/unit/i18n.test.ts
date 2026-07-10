import { describe, expect, it } from "vitest";
import { labelsFor } from "../../src/app/i18n";

describe("interface labels", () => {
  it("localizes the panel transparency setting in French", () => {
    const labels = labelsFor("fr");

    expect(labels.settings.transparency).toBe("Transparence du panneau");
    expect("transparency" in labels).toBe(false);
  });

  it("localizes options in English", () => {
    const labels = labelsFor("en");

    expect(labels.settings.language).toBe("Interface language");
    expect(labels.settings.shortcutLanguage).toBe("Software language");
    expect(labels.settings.keyboardLayout).toBe("Keyboard layout");
    expect(labels.settings.transparency).toBe("Panel transparency");
    expect(labels.settings.languageHelp).toContain("Merken menus");
    expect(labels.settings.shortcutLanguageHelp).toContain("active software");
    expect(labels.settings.keyboardLayoutHelp).toContain("Physical keyboard layout");
    expect(labels.settings.about).toBe("About");
    expect(labels.tabs.appearance).toBe("Appearance");
    expect(labels.sections.functioning).toBe("Operation");
    expect(labels.sections.reset).toBe("Reset");
    expect(labels.sections.availableSheets).toBe("Library");
    expect(labels.settings.updateUnconfigured).toContain("GitHub Releases");
    expect(labels.settings.updateCheck).toContain("Check for updates");
    expect(labels.settings.repository).toBe("GitHub repository");
    expect(labels.shortcutDisplayChoice.advanced).toBe("Advanced");
    expect(labels.shortcutDisplayChoice.custom).toBe("Customize");
    expect(labels.shortcutWarningMode["danger-only"]).toBe("Important risks");
    expect(labels.tabs.customization).toBe("Customization");
    expect(labels.theme.dark).toBe("Dark");
    expect(labels.theme.light).toBe("Light");
    expect("colorblind" in labels.theme).toBe(false);
    expect(labels.settings.enhancedContrast).toBe("Enhance contrast");
    expect(Object.values(labels.theme)).not.toContain("System");
  });

  it("limits French appearance labels to dark and light modes", () => {
    const labels = labelsFor("fr");

    expect(labels.theme.dark).toBe("Sombre");
    expect(labels.theme.light).toBe("Clair");
    expect("colorblind" in labels.theme).toBe(false);
    expect(labels.settings.enhancedContrast).toBe("Renforcer les contrastes");
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

  it("localizes tray icon visibility setting", () => {
    const fr = labelsFor("fr");
    const en = labelsFor("en");

    expect(fr.settings.language).toBe("Langue de l'interface");
    expect(fr.settings.shortcutLanguage).toBe("Langue du logiciel");
    expect(fr.settings.keyboardLayout).toBe("Disposition clavier");
    expect(fr.settings.languageHelp).toContain("Merken uniquement");
    expect(fr.settings.shortcutLanguageHelp).toContain("logiciel actif");
    expect(fr.settings.keyboardLayoutHelp).toContain("Disposition physique");
    expect(fr.keyboardLayout.azerty).toBe("AZERTY");
    expect(fr.keyboardLayout.qwerty).toBe("QWERTY");
    expect(en.keyboardLayout.azerty).toBe("AZERTY");
    expect(fr.settings.trayIconVisible).toBe("Icone Merken toujours visible");
    expect(en.settings.trayIconVisible).toBe("Merken icon always visible");
  });

  it("localizes sheet badges and shortcut prevention labels", () => {
    const fr = labelsFor("fr");
    const en = labelsFor("en");

    expect(fr.settings.windowsNativeBadge).toBe("Win");
    expect(fr.settings.windowsNativeBadgeHelp).toBe("Natif Windows");
    expect(fr.sheetBadge["windows-native"].label).toBe("Win");
    expect(fr.sheetBadge["office-365"].label).toBe("365");
    expect(fr.sheetBadge["office-2024"].label).toBe("2024");
    expect(fr.sheetBadge["office-2021"].label).toBe("2021");
    expect(fr.sheetBadge["browser-brave"].label).toBe("Brave");
    expect(fr.settings.shortcutWarningMode).toBe("Messages de prevention");
    expect(fr.shortcutWarningMode.all).toBe("Tous les messages");
    expect(fr.shortcutWarningMode.off).toBe("Aucun message");
    expect(fr.settings.shortcutCopy).toBe("Copier");
    expect(fr.settings.shortcutCopied).toBe("Copie");
    expect(fr.settings.shortcutCopyHelp).toBe("Copier la commande");
    expect(fr.settings.shortcutBaselineWarning).toContain("Raccourcis de base");
    expect(en.settings.windowsNativeBadgeHelp).toBe("Native Windows");
    expect(en.sheetBadge["office-365"].help).toContain("Microsoft 365");
    expect(en.sheetBadge["office-2024"].help).toContain("Office 2024");
    expect(en.sheetBadge["office-2021"].help).toContain("Office 2021");
    expect(en.sheetBadge["browser-edge"].help).toContain("Microsoft Edge");
    expect(en.settings.shortcutCopy).toBe("Copy");
    expect(en.settings.shortcutCopied).toBe("Copied");
    expect(en.settings.shortcutBaselineWarning).toContain("Default shortcuts");
  });

  it("localizes update states", () => {
    const fr = labelsFor("fr");
    const en = labelsFor("en");

    expect(fr.settings.updateIdle).toBe("Verifier si le logiciel est a jour");
    expect(fr.settings.updateChecking).toBe("Verification en cours");
    expect(fr.settings.updatePortableAvailable).toContain("Telecharger");
    expect(fr.sections.functioning).toBe("Fonctionnement");
    expect(fr.sections.reset).toBe("Reinitialisation");
    expect(fr.settings.resetHelp).toContain("ensemble des options");
    expect(fr.modal.resetConfirm).toContain("reinitialiser");
    expect(en.settings.updateIdle).toBe("Check whether the software is up to date");
    expect(en.settings.updateUpToDate).toBe("Merken is up to date");
    expect(en.settings.updateAvailable).toContain("Install");
    expect(en.settings.resetHelp).toContain("all application options");
    expect(en.modal.resetTitle).toBe("Confirm reset");
  });
});
