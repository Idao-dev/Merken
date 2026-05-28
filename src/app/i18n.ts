import type {
  BlurLevel,
  LanguageCode,
  SheetMode,
  SheetBadgeKey,
  ShortcutDisplayChoice,
  ShortcutPlacementPreset,
  ShortcutWarningMode,
  TextSize,
  ThemeMode
} from "../types";

export type AutostartStatus = "syncing" | "enabled" | "disabled" | "unavailable";
export type UpdateStatus = "idle" | "checking" | "upToDate" | "available" | "installing" | "installed" | "error" | "unconfigured";
export type SettingsTab = "general" | "appearance" | "sheets" | "customization" | "about";

interface Labels {
  languageName: string;
  tabs: Record<SettingsTab, string>;
  sections: {
    basics: string;
    behavior: string;
    functioning: string;
    reset: string;
    display: string;
    availableSheets: string;
    preview: string;
    customization: string;
    application: string;
    shortcutPlacement: string;
  };
  settings: {
    language: string;
    textSize: string;
    transparency: string;
    theme: string;
    sheet: string;
    manualSheet: string;
    sheetLevel: string;
    allShortcutsInTheme: string;
    customizationIntro: string;
    startWithWindows: string;
    reset: string;
    resetHelp: string;
    about: string;
    update: string;
    updateCheck: string;
    updateIdle: string;
    updateChecking: string;
    updateUpToDate: string;
    updateAvailable: string;
    updatePortableAvailable: string;
    updateInstalling: string;
    updateInstalled: string;
    updateError: string;
    updateUnconfigured: string;
    sheetLibraryIntro: string;
    repository: string;
    placementPreset: string;
    placementHelp: string;
    confirmPlacement: string;
    cancelPlacement: string;
    shortcutWarningMode: string;
    shortcutCopy: string;
    shortcutCopied: string;
    shortcutCopyHelp: string;
    windowsNativeBadge: string;
    windowsNativeBadgeHelp: string;
    shortcutBaselineWarning: string;
    trayVisibility: string;
    trayVisibilityHelp: string;
  };
  modal: {
    aboutTitle: string;
    resetTitle: string;
    resetMessage: string;
    resetConfirm: string;
    resetCancel: string;
    close: string;
    name: string;
    version: string;
    publisher: string;
    license: string;
    licenseValue: string;
  };
  autostart: Record<AutostartStatus, string>;
  transparency: Record<BlurLevel, string>;
  theme: Record<ThemeMode, string>;
  textSize: Record<TextSize, string>;
  sheetMode: Record<SheetMode, string>;
  shortcutDisplayChoice: Record<ShortcutDisplayChoice, string>;
  shortcutWarningMode: Record<ShortcutWarningMode, string>;
  shortcutPlacementPreset: Record<ShortcutPlacementPreset, string>;
  sheetBadge: Record<SheetBadgeKey, { label: string; help: string }>;
}

export const supportedLanguages: LanguageCode[] = ["fr", "en"];

export const labelsByLanguage: Record<"fr" | "en", Labels> = {
  fr: {
    languageName: "Francais",
    tabs: {
      general: "General",
      appearance: "Apparence",
      sheets: "Fiches",
      customization: "Personnalisation",
      about: "A propos"
    },
    sections: {
      basics: "Essentiel",
      behavior: "Comportement",
      functioning: "Fonctionnement",
      reset: "Reinitialisation",
      display: "Affichage",
      availableSheets: "Bibliotheque",
      preview: "Apercu",
      customization: "Personnalisation",
      application: "Application",
      shortcutPlacement: "Emplacement des raccourcis"
    },
    settings: {
      language: "Langue",
      textSize: "Taille",
      transparency: "Transparence du panneau",
      theme: "Theme",
      sheet: "Fiche",
      manualSheet: "Choix manuel",
      sheetLevel: "Niveau",
      allShortcutsInTheme: "Tous les raccourcis du theme",
      customizationIntro: "Cochez des themes ou des raccourcis pour composer la fiche personnalisee.",
      startWithWindows: "Demarrer avec Windows",
      reset: "Reinitialiser",
      resetHelp: "Reinitialise l'ensemble des options du logiciel.",
      about: "A propos",
      update: "Mise a jour",
      updateCheck: "Version {version} - Verifier les mises a jour",
      updateIdle: "Verifier si le logiciel est a jour",
      updateChecking: "Verification en cours",
      updateUpToDate: "Merken est a jour",
      updateAvailable: "Version {version} disponible - Installer",
      updatePortableAvailable: "Version {version} disponible - Telecharger",
      updateInstalling: "Installation de la mise a jour",
      updateInstalled: "Mise a jour installee - Redemarrage",
      updateError: "Verification impossible",
      updateUnconfigured: "Verification disponible quand GitHub Releases sera configure",
      sheetLibraryIntro: "Choisissez le niveau affiche pour chaque fiche. Les niveaux vides sont desactives.",
      repository: "Depot GitHub",
      placementPreset: "Position predefinie",
      placementHelp: "Deplacez le panneau puis validez son emplacement.",
      confirmPlacement: "Valider l'emplacement",
      cancelPlacement: "Annuler",
      shortcutWarningMode: "Messages de prevention",
      shortcutCopy: "Copier",
      shortcutCopied: "Copie",
      shortcutCopyHelp: "Copier la commande",
      windowsNativeBadge: "Win",
      windowsNativeBadgeHelp: "Natif Windows",
      shortcutBaselineWarning: "* Raccourcis de base : les modifications dans le logiciel ne sont pas detectees.",
      trayVisibility: "Icone Merken visible",
      trayVisibilityHelp: "Ouvre le reglage Windows des icones de barre des taches."
    },
    modal: {
      aboutTitle: "A propos de Merken",
      resetTitle: "Confirmer la reinitialisation",
      resetMessage: "Toutes les options seront remises aux valeurs par defaut.",
      resetConfirm: "Oui, reinitialiser",
      resetCancel: "Non",
      close: "Fermer",
      name: "Nom",
      version: "Version",
      publisher: "Editeur",
      license: "Licence",
      licenseValue: "Licence proprietaire gratuite"
    },
    autostart: {
      syncing: "Verification",
      enabled: "Actif",
      disabled: "Inactif",
      unavailable: "Indisponible"
    },
    transparency: {
      none: "Opaque",
      light: "Legere",
      medium: "Moyenne",
      strong: "Forte",
      max: "Maximale"
    },
    theme: {
      dark: "Sombre",
      colorblind: "Mode daltonien"
    },
    textSize: {
      xs: "Tres petite",
      sm: "Petite",
      md: "Moyenne",
      lg: "Grande",
      xl: "Tres grande"
    },
    sheetMode: {
      auto: "Automatique",
      os: "Toujours OS",
      manual: "Manuelle"
    },
    shortcutDisplayChoice: {
      standard: "Standard",
      advanced: "Avance",
      expert: "Expert",
      custom: "Personnaliser"
    },
    shortcutWarningMode: {
      all: "Tous les messages",
      "danger-only": "Risques importants",
      off: "Aucun message"
    },
    shortcutPlacementPreset: {
      "top-left": "Haut gauche",
      "top-right": "Haut droit",
      "bottom-left": "Bas gauche",
      "bottom-right": "Bas droit",
      center: "Centre"
    },
    sheetBadge: {
      "windows-native": { label: "Win", help: "Natif Windows" },
      "browser-edge": { label: "Edge", help: "Compatible Microsoft Edge" },
      "browser-chrome": { label: "Chrome", help: "Compatible Google Chrome" },
      "browser-firefox": { label: "Firefox", help: "Compatible Mozilla Firefox" },
      "browser-brave": { label: "Brave", help: "Compatible Brave" }
    }
  },
  en: {
    languageName: "English",
    tabs: {
      general: "General",
      appearance: "Appearance",
      sheets: "Sheets",
      customization: "Customization",
      about: "About"
    },
    sections: {
      basics: "Basics",
      behavior: "Behavior",
      functioning: "Operation",
      reset: "Reset",
      display: "Display",
      availableSheets: "Library",
      preview: "Preview",
      customization: "Customization",
      application: "Application",
      shortcutPlacement: "Shortcut placement"
    },
    settings: {
      language: "Language",
      textSize: "Size",
      transparency: "Panel transparency",
      theme: "Theme",
      sheet: "Sheet",
      manualSheet: "Manual choice",
      sheetLevel: "Level",
      allShortcutsInTheme: "All shortcuts in this theme",
      customizationIntro: "Select themes or shortcuts to build the customized sheet.",
      startWithWindows: "Start with Windows",
      reset: "Reset",
      resetHelp: "Resets all application options.",
      about: "About",
      update: "Update",
      updateCheck: "Version {version} - Check for updates",
      updateIdle: "Check whether the software is up to date",
      updateChecking: "Checking for updates",
      updateUpToDate: "Merken is up to date",
      updateAvailable: "Version {version} available - Install",
      updatePortableAvailable: "Version {version} available - Download",
      updateInstalling: "Installing update",
      updateInstalled: "Update installed - Restarting",
      updateError: "Unable to check for updates",
      updateUnconfigured: "Checking will be available when GitHub Releases is configured",
      sheetLibraryIntro: "Choose the displayed level for each sheet. Empty levels are disabled.",
      repository: "GitHub repository",
      placementPreset: "Preset position",
      placementHelp: "Move the panel, then confirm its placement.",
      confirmPlacement: "Confirm placement",
      cancelPlacement: "Cancel",
      shortcutWarningMode: "Prevention messages",
      shortcutCopy: "Copy",
      shortcutCopied: "Copied",
      shortcutCopyHelp: "Copy command",
      windowsNativeBadge: "Win",
      windowsNativeBadgeHelp: "Native Windows",
      shortcutBaselineWarning: "* Default shortcuts: changes inside the software are not detected.",
      trayVisibility: "Visible Merken icon",
      trayVisibilityHelp: "Opens the Windows taskbar icon settings."
    },
    modal: {
      aboutTitle: "About Merken",
      resetTitle: "Confirm reset",
      resetMessage: "All application options will be restored to their defaults.",
      resetConfirm: "Yes, reset",
      resetCancel: "No",
      close: "Close",
      name: "Name",
      version: "Version",
      publisher: "Publisher",
      license: "License",
      licenseValue: "Free proprietary license"
    },
    autostart: {
      syncing: "Checking",
      enabled: "Enabled",
      disabled: "Disabled",
      unavailable: "Unavailable"
    },
    transparency: {
      none: "Opaque",
      light: "Light",
      medium: "Medium",
      strong: "High",
      max: "Maximum"
    },
    theme: {
      dark: "Dark",
      colorblind: "Colorblind mode"
    },
    textSize: {
      xs: "Extra small",
      sm: "Small",
      md: "Medium",
      lg: "Large",
      xl: "Extra large"
    },
    sheetMode: {
      auto: "Automatic",
      os: "Always OS",
      manual: "Manual"
    },
    shortcutDisplayChoice: {
      standard: "Standard",
      advanced: "Advanced",
      expert: "Expert",
      custom: "Customize"
    },
    shortcutWarningMode: {
      all: "All messages",
      "danger-only": "Important risks",
      off: "No messages"
    },
    shortcutPlacementPreset: {
      "top-left": "Top left",
      "top-right": "Top right",
      "bottom-left": "Bottom left",
      "bottom-right": "Bottom right",
      center: "Center"
    },
    sheetBadge: {
      "windows-native": { label: "Win", help: "Native Windows" },
      "browser-edge": { label: "Edge", help: "Compatible with Microsoft Edge" },
      "browser-chrome": { label: "Chrome", help: "Compatible with Google Chrome" },
      "browser-firefox": { label: "Firefox", help: "Compatible with Mozilla Firefox" },
      "browser-brave": { label: "Brave", help: "Compatible with Brave" }
    }
  }
};

export function labelsFor(language: LanguageCode): Labels {
  return language === "en" ? labelsByLanguage.en : labelsByLanguage.fr;
}
