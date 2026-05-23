import type { BlurLevel, LanguageCode, SheetMode, ShortcutPlacementPreset, TextSize, ThemeMode } from "../types";

export type AutostartStatus = "syncing" | "enabled" | "disabled" | "unavailable";
export type UpdateStatus = "idle" | "checking" | "upToDate" | "available" | "installing" | "installed" | "error" | "unconfigured";
export type SettingsTab = "general" | "appearance" | "sheets" | "expert" | "about";

interface Labels {
  languageName: string;
  tabs: Record<SettingsTab, string>;
  sections: {
    basics: string;
    behavior: string;
    display: string;
    availableSheets: string;
    expertDisplay: string;
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
    expertMode: string;
    startWithWindows: string;
    reset: string;
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
    sheetLibraryPending: string;
    expertIntro: string;
    expertPending: string;
    repository: string;
    placementPreset: string;
    adjustPlacement: string;
    placementHelp: string;
    confirmPlacement: string;
    cancelPlacement: string;
    trayVisibility: string;
    trayVisibilityHelp: string;
  };
  modal: {
    aboutTitle: string;
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
  shortcutPlacementPreset: Record<ShortcutPlacementPreset, string>;
}

export const supportedLanguages: LanguageCode[] = ["fr", "en"];

export const labelsByLanguage: Record<"fr" | "en", Labels> = {
  fr: {
    languageName: "Francais",
    tabs: {
      general: "General",
      appearance: "Apparence",
      sheets: "Fiches",
      expert: "Expert",
      about: "A propos"
    },
    sections: {
      basics: "Essentiel",
      behavior: "Comportement",
      display: "Affichage",
      availableSheets: "Bibliotheque",
      expertDisplay: "Raccourcis experts",
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
      expertMode: "Mode expert",
      startWithWindows: "Demarrer avec Windows",
      reset: "Reinitialiser",
      about: "A propos",
      update: "Mise a jour",
      updateCheck: "Version {version} - Verifier les mises a jour",
      updateIdle: "Verifier si Merken est a jour",
      updateChecking: "Verification en cours",
      updateUpToDate: "Merken est a jour",
      updateAvailable: "Version {version} disponible - Installer",
      updatePortableAvailable: "Version {version} disponible - Telecharger",
      updateInstalling: "Installation de la mise a jour",
      updateInstalled: "Mise a jour installee - Redemarrage",
      updateError: "Verification impossible",
      updateUnconfigured: "Verification disponible quand GitHub Releases sera configure",
      sheetLibraryIntro: "Les fiches disponibles sont preparees pour une selection fine par logiciel.",
      sheetLibraryPending: "Configuration individuelle a venir",
      expertIntro: "Active les raccourcis moins courants dans les fiches affichees.",
      expertPending: "Le choix expert par logiciel sera ajoute dans une prochaine etape.",
      repository: "Depot GitHub",
      placementPreset: "Position predefinie",
      adjustPlacement: "Ajuster manuellement",
      placementHelp: "Deplacez le panneau puis validez son emplacement.",
      confirmPlacement: "Valider l'emplacement",
      cancelPlacement: "Annuler",
      trayVisibility: "Afficher l'icone Merken dans la barre des taches",
      trayVisibilityHelp: "Ouvre les parametres Windows. Activez ensuite Merken dans les icones visibles de la barre des taches."
    },
    modal: {
      aboutTitle: "A propos de Merken",
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
    shortcutPlacementPreset: {
      "top-left": "Haut gauche",
      "top-right": "Haut droit",
      "bottom-left": "Bas gauche",
      "bottom-right": "Bas droit",
      center: "Centre"
    }
  },
  en: {
    languageName: "English",
    tabs: {
      general: "General",
      appearance: "Appearance",
      sheets: "Sheets",
      expert: "Expert",
      about: "About"
    },
    sections: {
      basics: "Basics",
      behavior: "Behavior",
      display: "Display",
      availableSheets: "Library",
      expertDisplay: "Expert shortcuts",
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
      expertMode: "Expert mode",
      startWithWindows: "Start with Windows",
      reset: "Reset",
      about: "About",
      update: "Update",
      updateCheck: "Version {version} - Check for updates",
      updateIdle: "Check whether Merken is up to date",
      updateChecking: "Checking for updates",
      updateUpToDate: "Merken is up to date",
      updateAvailable: "Version {version} available - Install",
      updatePortableAvailable: "Version {version} available - Download",
      updateInstalling: "Installing update",
      updateInstalled: "Update installed - Restarting",
      updateError: "Unable to check for updates",
      updateUnconfigured: "Checking will be available when GitHub Releases is configured",
      sheetLibraryIntro: "Available sheets are prepared for per-app selection later.",
      sheetLibraryPending: "Individual configuration coming later",
      expertIntro: "Shows less common shortcuts in displayed sheets.",
      expertPending: "Per-app expert choices will be added in a later step.",
      repository: "GitHub repository",
      placementPreset: "Preset position",
      adjustPlacement: "Adjust manually",
      placementHelp: "Move the panel, then confirm its placement.",
      confirmPlacement: "Confirm placement",
      cancelPlacement: "Cancel",
      trayVisibility: "Show the Merken icon on the taskbar",
      trayVisibilityHelp: "Opens Windows settings. Then enable Merken in the visible taskbar icons."
    },
    modal: {
      aboutTitle: "About Merken",
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
    shortcutPlacementPreset: {
      "top-left": "Top left",
      "top-right": "Top right",
      "bottom-left": "Bottom left",
      "bottom-right": "Bottom right",
      center: "Center"
    }
  }
};

export function labelsFor(language: LanguageCode): Labels {
  return language === "en" ? labelsByLanguage.en : labelsByLanguage.fr;
}
