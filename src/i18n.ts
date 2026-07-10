import type { SiteLanguage } from "./generated/site-data";

export interface SiteCopy {
  languageName: string;
  languageLabel: string;
  navigationLabel: string;
  softwareNav: string;
  demoNav: string;
  projectNav: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  statsSoftware: string;
  statsShortcuts: string;
  previewLabel: string;
  supportedSoftwareEyebrow: string;
  supportedSoftwareTitle: string;
  softwareRailLabel: string;
  demoEyebrow: string;
  demoInstruction: string;
  downloadEyebrow: string;
  downloadTitle: string;
  downloadLead: string;
  releaseSummary: string;
  available: string;
  comingSoon: string;
  windowsPlatform: string;
  installer: string;
  portable: string;
  releaseNotes: string;
  allReleases: string;
  unavailable: string;
  customization: string;
  emptyCustomization: string;
  shortcutAdded: string;
  shortcutRemoved: string;
  footerNotice: string;
  github: string;
  license: string;
}

export const siteCopy: Record<SiteLanguage, SiteCopy> = {
  en: {
    languageName: "English",
    languageLabel: "Language",
    navigationLabel: "Main navigation",
    softwareNav: "Software",
    demoNav: "Demo",
    projectNav: "GitHub project",
    heroEyebrow: "Contextual keyboard shortcuts",
    heroTitle: "Useful shortcuts, right when you need them.",
    heroLead: "Merken shows useful keyboard shortcuts for the software you are using. It stays out of the way, works locally, and lets you keep only the shortcuts you really need.",
    statsSoftware: "software sheets",
    statsShortcuts: "shortcuts",
    previewLabel: "Merken preview",
    supportedSoftwareEyebrow: "Supported software",
    supportedSoftwareTitle: "Choose a logo to view its shortcut sheet.",
    softwareRailLabel: "Supported software",
    demoEyebrow: "Interactive preview",
    demoInstruction: "Choose a logo to change the sheet. Check or uncheck shortcuts to update the panel.",
    downloadEyebrow: "Download",
    downloadTitle: "The latest version of Merken.",
    downloadLead: "Install Merken on Windows or read the release notes for",
    releaseSummary: "See the GitHub release for the full changelog and available files.",
    available: "Available",
    comingSoon: "Coming soon",
    windowsPlatform: "Windows x64",
    installer: "Installer",
    portable: "Portable",
    releaseNotes: "Release notes",
    allReleases: "All releases",
    unavailable: "Not available yet.",
    customization: "Customization",
    emptyCustomization: "Select shortcuts to build your panel.",
    shortcutAdded: "Shortcut added.",
    shortcutRemoved: "Shortcut removed.",
    footerNotice: "Merken is an independent project. Software names and logos are trademarks of their respective owners. Merken is not affiliated with, sponsored by, approved by, or endorsed by these publishers.",
    github: "GitHub",
    license: "License"
  },
  fr: {
    languageName: "Français",
    languageLabel: "Langue",
    navigationLabel: "Navigation principale",
    softwareNav: "Logiciels",
    demoNav: "Démo",
    projectNav: "Projet GitHub",
    heroEyebrow: "Raccourcis clavier contextuels",
    heroTitle: "Les raccourcis utiles au bon moment.",
    heroLead: "Merken affiche les raccourcis clavier utiles selon le logiciel que vous utilisez. Il reste discret, fonctionne localement et vous laisse choisir les raccourcis que vous voulez vraiment garder sous la main.",
    statsSoftware: "logiciels et fiches",
    statsShortcuts: "raccourcis",
    previewLabel: "Aperçu Merken",
    supportedSoftwareEyebrow: "Logiciels pris en charge",
    supportedSoftwareTitle: "Choisissez un logo pour voir la fiche correspondante.",
    softwareRailLabel: "Logiciels pris en charge",
    demoEyebrow: "Aperçu interactif",
    demoInstruction: "Choisissez un logo pour changer de fiche. Cochez ou décochez des raccourcis pour mettre le panneau à jour.",
    downloadEyebrow: "Téléchargement",
    downloadTitle: "La dernière version de Merken.",
    downloadLead: "Installez Merken sur Windows ou consultez les notes de la release",
    releaseSummary: "Consultez la release GitHub pour voir les changements et les fichiers disponibles.",
    available: "Disponible",
    comingSoon: "À venir",
    windowsPlatform: "Windows x64",
    installer: "Installateur",
    portable: "Portable",
    releaseNotes: "Notes de release",
    allReleases: "Toutes les releases",
    unavailable: "Publication non disponible pour le moment.",
    customization: "Personnalisation",
    emptyCustomization: "Sélectionnez des raccourcis pour construire votre panneau.",
    shortcutAdded: "Raccourci ajouté.",
    shortcutRemoved: "Raccourci retiré.",
    footerNotice: "Merken est un projet indépendant. Les noms et logos des logiciels cités sont des marques de leurs propriétaires respectifs. Merken n'est pas affilié, sponsorisé, approuvé ni validé par ces éditeurs.",
    github: "GitHub",
    license: "Licence"
  }
};
