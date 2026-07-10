export interface SiteShortcut {
  id: string;
  label: string;
  keys: string[];
}

export interface SiteShortcutCategory {
  id: string;
  title: string;
  shortcuts: SiteShortcut[];
}

export interface SiteSoftware {
  family: string;
  label: string;
  logoPath: string;
  accent: string;
  categories: SiteShortcutCategory[];
}

export type SiteLanguage = "en" | "fr";

export const siteStatsByLanguage = {
  "en": {
    "softwareCount": 14,
    "shortcutCount": 183
  },
  "fr": {
    "softwareCount": 14,
    "shortcutCount": 183
  }
} satisfies Record<SiteLanguage, { softwareCount: number; shortcutCount: number }>;

export const siteSoftwareByLanguage = {
  "en": [
    {
      "family": "windows-core",
      "label": "Windows",
      "logoPath": "logos/windows-core.svg",
      "accent": "#39b6e8",
      "categories": [
        {
          "id": "edition",
          "title": "Editing",
          "shortcuts": [
            {
              "id": "edition-copier",
              "label": "Copy",
              "keys": [
                "Ctrl",
                "C"
              ]
            },
            {
              "id": "edition-coller",
              "label": "Paste",
              "keys": [
                "Ctrl",
                "V"
              ]
            },
            {
              "id": "edition-couper",
              "label": "Cut",
              "keys": [
                "Ctrl",
                "X"
              ]
            },
            {
              "id": "edition-annuler",
              "label": "Undo",
              "keys": [
                "Ctrl",
                "Z"
              ]
            },
            {
              "id": "edition-tout-selectionner",
              "label": "Select all",
              "keys": [
                "Ctrl",
                "A"
              ]
            },
            {
              "id": "edition-rechercher",
              "label": "Find",
              "keys": [
                "Ctrl",
                "F"
              ]
            }
          ]
        },
        {
          "id": "systeme",
          "title": "System",
          "shortcuts": [
            {
              "id": "systeme-menu-demarrer",
              "label": "Start menu",
              "keys": [
                "Win"
              ]
            },
            {
              "id": "systeme-rechercher-windows",
              "label": "Windows search",
              "keys": [
                "Win",
                "S"
              ]
            },
            {
              "id": "systeme-executer",
              "label": "Run",
              "keys": [
                "Win",
                "R"
              ]
            },
            {
              "id": "systeme-parametres",
              "label": "Settings",
              "keys": [
                "Win",
                "I"
              ]
            },
            {
              "id": "systeme-verrouiller",
              "label": "Lock",
              "keys": [
                "Win",
                "L"
              ]
            },
            {
              "id": "systeme-reglages-rapides",
              "label": "Quick settings",
              "keys": [
                "Win",
                "A"
              ]
            }
          ]
        },
        {
          "id": "fenetres",
          "title": "Windows",
          "shortcuts": [
            {
              "id": "fenetres-changer-de-fenetre",
              "label": "Switch windows",
              "keys": [
                "Alt",
                "Tab"
              ]
            },
            {
              "id": "fenetres-vue-des-taches",
              "label": "Task view",
              "keys": [
                "Win",
                "Tab"
              ]
            },
            {
              "id": "fenetres-afficher-le-bureau",
              "label": "Show desktop",
              "keys": [
                "Win",
                "D"
              ]
            },
            {
              "id": "fenetres-fermer-fenetre",
              "label": "Close window",
              "keys": [
                "Alt",
                "F4"
              ]
            },
            {
              "id": "fenetres-ancrer-a-gauche",
              "label": "Snap left",
              "keys": [
                "Win",
                "Left"
              ]
            },
            {
              "id": "fenetres-ancrer-a-droite",
              "label": "Snap right",
              "keys": [
                "Win",
                "Right"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "file-explorer",
      "label": "File Explorer",
      "logoPath": "logos/file-explorer.svg",
      "accent": "#f6c84c",
      "categories": [
        {
          "id": "navigation",
          "title": "Navigation",
          "shortcuts": [
            {
              "id": "navigation-ouvrir-l-explorateur",
              "label": "Open File Explorer",
              "keys": [
                "Win",
                "E"
              ]
            },
            {
              "id": "navigation-nouvelle-fenetre",
              "label": "New window",
              "keys": [
                "Ctrl",
                "N"
              ]
            },
            {
              "id": "navigation-nouvel-onglet",
              "label": "New tab",
              "keys": [
                "Ctrl",
                "T"
              ]
            },
            {
              "id": "navigation-fermer-onglet",
              "label": "Close tab",
              "keys": [
                "Ctrl",
                "W"
              ]
            },
            {
              "id": "navigation-onglet-suivant",
              "label": "Next tab",
              "keys": [
                "Ctrl",
                "Tab"
              ]
            },
            {
              "id": "navigation-onglet-precedent",
              "label": "Previous tab",
              "keys": [
                "Ctrl",
                "Shift",
                "Tab"
              ]
            }
          ]
        },
        {
          "id": "fichiers",
          "title": "Files and folders",
          "shortcuts": [
            {
              "id": "fichiers-nouveau-dossier",
              "label": "New folder",
              "keys": [
                "Ctrl",
                "Shift",
                "N"
              ]
            },
            {
              "id": "fichiers-renommer",
              "label": "Rename",
              "keys": [
                "F2"
              ]
            },
            {
              "id": "fichiers-supprimer",
              "label": "Delete",
              "keys": [
                "Delete"
              ]
            }
          ]
        },
        {
          "id": "selection",
          "title": "Selection and search",
          "shortcuts": [
            {
              "id": "selection-tout-selectionner",
              "label": "Select all",
              "keys": [
                "Ctrl",
                "A"
              ]
            },
            {
              "id": "selection-recherche",
              "label": "Search",
              "keys": [
                "Ctrl",
                "F"
              ]
            },
            {
              "id": "selection-multiple",
              "label": "Multiple selection",
              "keys": [
                "Shift",
                "Arrows"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "photos",
      "label": "Photos",
      "logoPath": "logos/photos.svg",
      "accent": "#5cc8ff",
      "categories": [
        {
          "id": "navigation",
          "title": "Navigation",
          "shortcuts": [
            {
              "id": "navigation-element-suivant",
              "label": "Next item",
              "keys": [
                "Right"
              ]
            },
            {
              "id": "navigation-element-precedent",
              "label": "Previous item",
              "keys": [
                "Left"
              ]
            },
            {
              "id": "navigation-retour",
              "label": "Back",
              "keys": [
                "Esc"
              ]
            },
            {
              "id": "navigation-commandes",
              "label": "Commands",
              "keys": [
                "Space"
              ]
            }
          ]
        },
        {
          "id": "photo",
          "title": "Photo",
          "shortcuts": [
            {
              "id": "photo-zoom-avant",
              "label": "Zoom in",
              "keys": [
                "Ctrl",
                "+"
              ]
            },
            {
              "id": "photo-zoom-arriere",
              "label": "Zoom out",
              "keys": [
                "Ctrl",
                "-"
              ]
            },
            {
              "id": "photo-zoom-initial",
              "label": "Reset zoom",
              "keys": [
                "Ctrl",
                "0"
              ]
            },
            {
              "id": "photo-rotation",
              "label": "Rotate",
              "keys": [
                "Ctrl",
                "R"
              ]
            },
            {
              "id": "photo-copier",
              "label": "Copy",
              "keys": [
                "Ctrl",
                "C"
              ]
            },
            {
              "id": "photo-enregistrer",
              "label": "Save",
              "keys": [
                "Ctrl",
                "S"
              ]
            }
          ]
        },
        {
          "id": "edition",
          "title": "Editing",
          "shortcuts": [
            {
              "id": "edition-annuler",
              "label": "Undo edit",
              "keys": [
                "Ctrl",
                "Z"
              ]
            },
            {
              "id": "edition-retablir",
              "label": "Redo edit",
              "keys": [
                "Ctrl",
                "Y"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "media-player",
      "label": "Media Player",
      "logoPath": "logos/media-player.svg",
      "accent": "#ff6f61",
      "categories": [
        {
          "id": "lecture",
          "title": "Playback",
          "shortcuts": [
            {
              "id": "lecture-lecture-pause",
              "label": "Play pause",
              "keys": [
                "Space"
              ]
            },
            {
              "id": "lecture-plein-ecran",
              "label": "Full screen",
              "keys": [
                "F11"
              ]
            },
            {
              "id": "lecture-quitter-plein-ecran",
              "label": "Exit full screen",
              "keys": [
                "Esc"
              ]
            }
          ]
        },
        {
          "id": "navigation",
          "title": "Media navigation",
          "shortcuts": [
            {
              "id": "navigation-avancer",
              "label": "Seek forward",
              "keys": [
                "Right"
              ]
            },
            {
              "id": "navigation-reculer",
              "label": "Seek backward",
              "keys": [
                "Left"
              ]
            }
          ]
        },
        {
          "id": "audio",
          "title": "Audio",
          "shortcuts": [
            {
              "id": "audio-volume-plus",
              "label": "Volume up",
              "keys": [
                "Up"
              ]
            },
            {
              "id": "audio-volume-moins",
              "label": "Volume down",
              "keys": [
                "Down"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "cmd",
      "label": "Command Prompt",
      "logoPath": "logos/cmd.svg",
      "accent": "#7ddc8a",
      "categories": [
        {
          "id": "saisie",
          "title": "History and input",
          "shortcuts": [
            {
              "id": "saisie-commande-precedente",
              "label": "Previous command",
              "keys": [
                "Up"
              ]
            },
            {
              "id": "saisie-commande-suivante",
              "label": "Next command",
              "keys": [
                "Down"
              ]
            },
            {
              "id": "saisie-autocompletion",
              "label": "Complete path",
              "keys": [
                "Tab"
              ]
            },
            {
              "id": "saisie-interrompre",
              "label": "Interrupt command",
              "keys": [
                "Ctrl",
                "C"
              ]
            }
          ]
        },
        {
          "id": "commandes",
          "title": "Commands",
          "shortcuts": [
            {
              "id": "commandes-aide",
              "label": "Command help",
              "keys": []
            },
            {
              "id": "commandes-lister-fichiers",
              "label": "List files",
              "keys": []
            },
            {
              "id": "commandes-changer-dossier",
              "label": "Change folder",
              "keys": []
            },
            {
              "id": "commandes-effacer-ecran",
              "label": "Clear screen",
              "keys": []
            },
            {
              "id": "commandes-lire-fichier",
              "label": "Read file",
              "keys": []
            }
          ]
        }
      ]
    },
    {
      "family": "powershell",
      "label": "PowerShell",
      "logoPath": "logos/powershell.svg",
      "accent": "#61b0ff",
      "categories": [
        {
          "id": "saisie",
          "title": "History and input",
          "shortcuts": [
            {
              "id": "saisie-commande-precedente",
              "label": "Previous command",
              "keys": [
                "Up"
              ]
            },
            {
              "id": "saisie-commande-suivante",
              "label": "Next command",
              "keys": [
                "Down"
              ]
            },
            {
              "id": "saisie-autocompletion",
              "label": "Complete command",
              "keys": [
                "Tab"
              ]
            },
            {
              "id": "saisie-interrompre",
              "label": "Interrupt command",
              "keys": [
                "Ctrl",
                "C"
              ]
            }
          ]
        },
        {
          "id": "commandes",
          "title": "Commands",
          "shortcuts": [
            {
              "id": "commandes-aide",
              "label": "Command help",
              "keys": []
            },
            {
              "id": "commandes-trouver",
              "label": "Find command",
              "keys": []
            },
            {
              "id": "commandes-lister-fichiers",
              "label": "List files",
              "keys": []
            },
            {
              "id": "commandes-changer-dossier",
              "label": "Change folder",
              "keys": []
            },
            {
              "id": "commandes-effacer-affichage",
              "label": "Clear display",
              "keys": []
            }
          ]
        }
      ]
    },
    {
      "family": "browsers",
      "label": "Browsers",
      "logoPath": "logos/browsers.svg",
      "accent": "#f5b44f",
      "categories": [
        {
          "id": "onglets",
          "title": "Tabs and windows",
          "shortcuts": [
            {
              "id": "onglets-nouvel-onglet",
              "label": "New tab",
              "keys": [
                "Ctrl",
                "T"
              ]
            },
            {
              "id": "onglets-fermer-onglet",
              "label": "Close tab",
              "keys": [
                "Ctrl",
                "W"
              ]
            },
            {
              "id": "onglets-rouvrir-onglet",
              "label": "Reopen tab",
              "keys": [
                "Ctrl",
                "Shift",
                "T"
              ]
            },
            {
              "id": "onglets-nouvelle-fenetre",
              "label": "New window",
              "keys": [
                "Ctrl",
                "N"
              ]
            },
            {
              "id": "onglets-prive-chromium",
              "label": "Private Chromium",
              "keys": [
                "Ctrl",
                "Shift",
                "N"
              ]
            },
            {
              "id": "onglets-prive-firefox",
              "label": "Private Firefox",
              "keys": [
                "Ctrl",
                "Shift",
                "P"
              ]
            }
          ]
        },
        {
          "id": "navigation",
          "title": "Navigation",
          "shortcuts": [
            {
              "id": "navigation-barre-d-adresse",
              "label": "Address bar",
              "keys": [
                "Ctrl",
                "L"
              ]
            },
            {
              "id": "navigation-actualiser",
              "label": "Reload",
              "keys": [
                "Ctrl",
                "R"
              ]
            },
            {
              "id": "navigation-retour",
              "label": "Back",
              "keys": [
                "Alt",
                "Left"
              ]
            },
            {
              "id": "navigation-avancer",
              "label": "Forward",
              "keys": [
                "Alt",
                "Right"
              ]
            },
            {
              "id": "navigation-rechercher-page",
              "label": "Find in page",
              "keys": [
                "Ctrl",
                "F"
              ]
            },
            {
              "id": "navigation-historique",
              "label": "History",
              "keys": [
                "Ctrl",
                "H"
              ]
            }
          ]
        },
        {
          "id": "outils-favori",
          "title": "Page and tools",
          "shortcuts": [
            {
              "id": "outils-favori",
              "label": "Bookmark",
              "keys": [
                "Ctrl",
                "D"
              ]
            },
            {
              "id": "outils-imprimer",
              "label": "Print",
              "keys": [
                "Ctrl",
                "P"
              ]
            },
            {
              "id": "outils-zoom-avant",
              "label": "Zoom in",
              "keys": [
                "Ctrl",
                "+"
              ]
            },
            {
              "id": "outils-zoom-arriere",
              "label": "Zoom out",
              "keys": [
                "Ctrl",
                "-"
              ]
            },
            {
              "id": "outils-zoom-par-defaut",
              "label": "Default zoom",
              "keys": [
                "Ctrl",
                "0"
              ]
            },
            {
              "id": "outils-plein-ecran",
              "label": "Full screen",
              "keys": [
                "F11"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "excel",
      "label": "Excel",
      "logoPath": "logos/excel.svg",
      "accent": "#33c481",
      "categories": [
        {
          "id": "general",
          "title": "General",
          "shortcuts": [
            {
              "id": "general-nouveau-classeur",
              "label": "New workbook",
              "keys": [
                "Ctrl",
                "N"
              ]
            },
            {
              "id": "general-ouvrir",
              "label": "Open",
              "keys": [
                "Ctrl",
                "O"
              ]
            },
            {
              "id": "general-enregistrer",
              "label": "Save",
              "keys": [
                "Ctrl",
                "S"
              ]
            },
            {
              "id": "general-fermer",
              "label": "Close workbook",
              "keys": [
                "Ctrl",
                "W"
              ]
            }
          ]
        },
        {
          "id": "edition",
          "title": "Editing",
          "shortcuts": [
            {
              "id": "edition-copier",
              "label": "Copy",
              "keys": [
                "Ctrl",
                "C"
              ]
            },
            {
              "id": "edition-coller",
              "label": "Paste",
              "keys": [
                "Ctrl",
                "V"
              ]
            },
            {
              "id": "edition-couper",
              "label": "Cut",
              "keys": [
                "Ctrl",
                "X"
              ]
            },
            {
              "id": "edition-annuler",
              "label": "Undo",
              "keys": [
                "Ctrl",
                "Z"
              ]
            },
            {
              "id": "edition-retablir",
              "label": "Redo",
              "keys": [
                "Ctrl",
                "Y"
              ]
            },
            {
              "id": "edition-rechercher",
              "label": "Find",
              "keys": [
                "Ctrl",
                "F"
              ]
            }
          ]
        },
        {
          "id": "cellules",
          "title": "Cells and navigation",
          "shortcuts": [
            {
              "id": "cellules-modifier-cellule",
              "label": "Edit cell",
              "keys": [
                "F2"
              ]
            },
            {
              "id": "cellules-atteindre",
              "label": "Go to",
              "keys": [
                "Ctrl",
                "G"
              ]
            },
            {
              "id": "cellules-bord-region",
              "label": "Region edge",
              "keys": [
                "Ctrl",
                "Arrow"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "word",
      "label": "Word",
      "logoPath": "logos/word.svg",
      "accent": "#5b8dff",
      "categories": [
        {
          "id": "general",
          "title": "General",
          "shortcuts": [
            {
              "id": "general-nouveau-document",
              "label": "New document",
              "keys": [
                "Ctrl",
                "N"
              ]
            },
            {
              "id": "general-ouvrir",
              "label": "Open",
              "keys": [
                "Ctrl",
                "O"
              ]
            },
            {
              "id": "general-enregistrer",
              "label": "Save",
              "keys": [
                "Ctrl",
                "S"
              ]
            },
            {
              "id": "general-imprimer",
              "label": "Print",
              "keys": [
                "Ctrl",
                "P"
              ]
            },
            {
              "id": "general-fermer",
              "label": "Close document",
              "keys": [
                "Ctrl",
                "W"
              ]
            }
          ]
        },
        {
          "id": "edition",
          "title": "Editing",
          "shortcuts": [
            {
              "id": "edition-copier",
              "label": "Copy",
              "keys": [
                "Ctrl",
                "C"
              ]
            },
            {
              "id": "edition-coller",
              "label": "Paste",
              "keys": [
                "Ctrl",
                "V"
              ]
            },
            {
              "id": "edition-couper",
              "label": "Cut",
              "keys": [
                "Ctrl",
                "X"
              ]
            },
            {
              "id": "edition-coller-texte",
              "label": "Paste text only",
              "keys": [
                "Ctrl",
                "Shift",
                "V"
              ]
            },
            {
              "id": "edition-annuler",
              "label": "Undo",
              "keys": [
                "Ctrl",
                "Z"
              ]
            },
            {
              "id": "edition-retablir",
              "label": "Redo",
              "keys": [
                "Ctrl",
                "Y"
              ]
            }
          ]
        },
        {
          "id": "format",
          "title": "Formatting",
          "shortcuts": [
            {
              "id": "format-gras",
              "label": "Bold",
              "keys": [
                "Ctrl",
                "B"
              ]
            },
            {
              "id": "format-italique",
              "label": "Italic",
              "keys": [
                "Ctrl",
                "I"
              ]
            },
            {
              "id": "format-souligne",
              "label": "Underline",
              "keys": [
                "Ctrl",
                "U"
              ]
            },
            {
              "id": "format-gauche",
              "label": "Align left",
              "keys": [
                "Ctrl",
                "L"
              ]
            },
            {
              "id": "format-centrer",
              "label": "Center",
              "keys": [
                "Ctrl",
                "E"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "powerpoint",
      "label": "PowerPoint",
      "logoPath": "logos/powerpoint.svg",
      "accent": "#ff7a45",
      "categories": [
        {
          "id": "general",
          "title": "General",
          "shortcuts": [
            {
              "id": "general-enregistrer",
              "label": "Save",
              "keys": [
                "Ctrl",
                "S"
              ]
            }
          ]
        },
        {
          "id": "diapos",
          "title": "Slides",
          "shortcuts": [
            {
              "id": "diapos-nouvelle-diapositive",
              "label": "New slide",
              "keys": [
                "Ctrl",
                "M"
              ]
            },
            {
              "id": "diapos-copier",
              "label": "Copy",
              "keys": [
                "Ctrl",
                "C"
              ]
            },
            {
              "id": "diapos-coller",
              "label": "Paste",
              "keys": [
                "Ctrl",
                "V"
              ]
            },
            {
              "id": "diapos-couper",
              "label": "Cut",
              "keys": [
                "Ctrl",
                "X"
              ]
            },
            {
              "id": "diapos-annuler",
              "label": "Undo",
              "keys": [
                "Ctrl",
                "Z"
              ]
            },
            {
              "id": "diapos-retablir",
              "label": "Redo",
              "keys": [
                "Ctrl",
                "Y"
              ]
            }
          ]
        },
        {
          "id": "texte",
          "title": "Text and objects",
          "shortcuts": [
            {
              "id": "texte-gras",
              "label": "Bold",
              "keys": [
                "Ctrl",
                "B"
              ]
            },
            {
              "id": "texte-italique",
              "label": "Italic",
              "keys": [
                "Ctrl",
                "I"
              ]
            },
            {
              "id": "texte-souligne",
              "label": "Underline",
              "keys": [
                "Ctrl",
                "U"
              ]
            },
            {
              "id": "texte-lien",
              "label": "Link",
              "keys": [
                "Ctrl",
                "K"
              ]
            },
            {
              "id": "texte-rechercher",
              "label": "Find",
              "keys": [
                "Ctrl",
                "F"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "outlook",
      "label": "Outlook",
      "logoPath": "logos/outlook.svg",
      "accent": "#4db4ff",
      "categories": [
        {
          "id": "mail",
          "title": "Mail",
          "shortcuts": [
            {
              "id": "mail-nouveau-message",
              "label": "New message",
              "keys": [
                "Ctrl",
                "Shift",
                "M"
              ]
            },
            {
              "id": "mail-envoyer",
              "label": "Send",
              "keys": [
                "Alt",
                "S"
              ]
            },
            {
              "id": "mail-enregistrer-brouillon",
              "label": "Save draft",
              "keys": [
                "Ctrl",
                "S"
              ]
            },
            {
              "id": "mail-repondre",
              "label": "Reply",
              "keys": [
                "Ctrl",
                "R"
              ]
            },
            {
              "id": "mail-repondre-a-tous",
              "label": "Reply all",
              "keys": [
                "Ctrl",
                "Shift",
                "R"
              ]
            },
            {
              "id": "mail-transferer",
              "label": "Forward",
              "keys": [
                "Ctrl",
                "F"
              ]
            }
          ]
        },
        {
          "id": "navigation",
          "title": "Navigation",
          "shortcuts": [
            {
              "id": "navigation-courrier",
              "label": "Mail",
              "keys": [
                "Ctrl",
                "1"
              ]
            },
            {
              "id": "navigation-calendrier",
              "label": "Calendar",
              "keys": [
                "Ctrl",
                "2"
              ]
            },
            {
              "id": "navigation-recherche",
              "label": "Search",
              "keys": [
                "Ctrl",
                "E"
              ]
            },
            {
              "id": "navigation-envoyer-recevoir",
              "label": "Send receive",
              "keys": [
                "F9"
              ]
            }
          ]
        },
        {
          "id": "calendrier",
          "title": "Calendar",
          "shortcuts": [
            {
              "id": "calendrier-nouveau-rendez-vous",
              "label": "New appointment",
              "keys": [
                "Ctrl",
                "Shift",
                "A"
              ]
            },
            {
              "id": "calendrier-nouvelle-reunion",
              "label": "New meeting",
              "keys": [
                "Ctrl",
                "Shift",
                "Q"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "thunderbird",
      "label": "Thunderbird",
      "logoPath": "logos/thunderbird.svg",
      "accent": "#5f9cff",
      "categories": [
        {
          "id": "messages",
          "title": "Messages",
          "shortcuts": [
            {
              "id": "messages-nouveau-message",
              "label": "New message",
              "keys": [
                "Ctrl",
                "N"
              ]
            },
            {
              "id": "messages-repondre",
              "label": "Reply",
              "keys": [
                "Ctrl",
                "R"
              ]
            },
            {
              "id": "messages-repondre-a-tous",
              "label": "Reply all",
              "keys": [
                "Ctrl",
                "Shift",
                "R"
              ]
            },
            {
              "id": "messages-transferer",
              "label": "Forward",
              "keys": [
                "Ctrl",
                "L"
              ]
            },
            {
              "id": "messages-archiver",
              "label": "Archive",
              "keys": [
                "A"
              ]
            },
            {
              "id": "messages-supprimer",
              "label": "Delete",
              "keys": [
                "Delete"
              ]
            }
          ]
        },
        {
          "id": "navigation",
          "title": "Navigation and search",
          "shortcuts": [
            {
              "id": "navigation-recevoir-messages",
              "label": "Get messages",
              "keys": [
                "F5"
              ]
            },
            {
              "id": "navigation-ouvrir-message",
              "label": "Open message",
              "keys": [
                "Enter"
              ]
            },
            {
              "id": "navigation-recherche-globale",
              "label": "Global search",
              "keys": [
                "Ctrl",
                "K"
              ]
            },
            {
              "id": "navigation-rechercher-message",
              "label": "Find message",
              "keys": [
                "Ctrl",
                "F"
              ]
            },
            {
              "id": "navigation-message-suivant",
              "label": "Next message",
              "keys": [
                "F"
              ]
            },
            {
              "id": "navigation-message-precedent",
              "label": "Previous message",
              "keys": [
                "B"
              ]
            }
          ]
        },
        {
          "id": "redaction",
          "title": "Compose",
          "shortcuts": [
            {
              "id": "redaction-envoyer",
              "label": "Send",
              "keys": [
                "Ctrl",
                "Enter"
              ]
            },
            {
              "id": "redaction-brouillon",
              "label": "Save draft",
              "keys": [
                "Ctrl",
                "S"
              ]
            },
            {
              "id": "redaction-piece-jointe",
              "label": "Attach file",
              "keys": [
                "Ctrl",
                "Shift",
                "A"
              ]
            },
            {
              "id": "redaction-gras",
              "label": "Bold",
              "keys": [
                "Ctrl",
                "B"
              ]
            },
            {
              "id": "redaction-italique",
              "label": "Italic",
              "keys": [
                "Ctrl",
                "I"
              ]
            },
            {
              "id": "redaction-souligne",
              "label": "Underline",
              "keys": [
                "Ctrl",
                "U"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "obsidian",
      "label": "Obsidian",
      "logoPath": "logos/obsidian.svg",
      "accent": "#9d7cff",
      "categories": [
        {
          "id": "navigation",
          "title": "Navigation",
          "shortcuts": [
            {
              "id": "navigation-palette-commandes",
              "label": "Command palette",
              "keys": [
                "Ctrl",
                "P"
              ]
            },
            {
              "id": "navigation-ouverture-rapide",
              "label": "Quick switcher",
              "keys": [
                "Ctrl",
                "O"
              ]
            },
            {
              "id": "navigation-nouvelle-note",
              "label": "New note",
              "keys": [
                "Ctrl",
                "N"
              ]
            },
            {
              "id": "navigation-fermer-onglet",
              "label": "Close tab",
              "keys": [
                "Ctrl",
                "W"
              ]
            },
            {
              "id": "navigation-onglet-suivant",
              "label": "Next tab",
              "keys": [
                "Ctrl",
                "Tab"
              ]
            },
            {
              "id": "navigation-onglet-precedent",
              "label": "Previous tab",
              "keys": [
                "Ctrl",
                "Shift",
                "Tab"
              ]
            }
          ]
        },
        {
          "id": "edition",
          "title": "Markdown editing",
          "shortcuts": [
            {
              "id": "edition-copier",
              "label": "Copy",
              "keys": [
                "Ctrl",
                "C"
              ]
            },
            {
              "id": "edition-couper",
              "label": "Cut",
              "keys": [
                "Ctrl",
                "X"
              ]
            },
            {
              "id": "edition-coller",
              "label": "Paste",
              "keys": [
                "Ctrl",
                "V"
              ]
            },
            {
              "id": "edition-coller-brut",
              "label": "Paste plain",
              "keys": [
                "Ctrl",
                "Shift",
                "V"
              ]
            },
            {
              "id": "edition-annuler",
              "label": "Undo",
              "keys": [
                "Ctrl",
                "Z"
              ]
            },
            {
              "id": "edition-retablir",
              "label": "Redo",
              "keys": [
                "Ctrl",
                "Shift",
                "Z"
              ]
            }
          ]
        },
        {
          "id": "format",
          "title": "Formatting",
          "shortcuts": [
            {
              "id": "format-gras",
              "label": "Bold",
              "keys": [
                "Ctrl",
                "B"
              ]
            },
            {
              "id": "format-italique",
              "label": "Italic",
              "keys": [
                "Ctrl",
                "I"
              ]
            },
            {
              "id": "format-lien",
              "label": "Link",
              "keys": [
                "Ctrl",
                "K"
              ]
            },
            {
              "id": "format-recherche-note",
              "label": "Find note",
              "keys": [
                "Ctrl",
                "F"
              ]
            },
            {
              "id": "format-recherche-coffre",
              "label": "Search vault",
              "keys": [
                "Ctrl",
                "Shift",
                "F"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "vlc",
      "label": "VLC",
      "logoPath": "logos/vlc.svg",
      "accent": "#ff9f2f",
      "categories": [
        {
          "id": "lecture",
          "title": "Playback",
          "shortcuts": [
            {
              "id": "lecture-lecture-pause",
              "label": "Play pause",
              "keys": [
                "Space"
              ]
            },
            {
              "id": "lecture-stop",
              "label": "Stop",
              "keys": [
                "S"
              ]
            },
            {
              "id": "lecture-suivant",
              "label": "Next media",
              "keys": [
                "N"
              ]
            },
            {
              "id": "lecture-precedent",
              "label": "Previous media",
              "keys": [
                "P"
              ]
            },
            {
              "id": "lecture-plein-ecran",
              "label": "Full screen",
              "keys": [
                "F"
              ]
            },
            {
              "id": "lecture-quitter-plein-ecran",
              "label": "Exit full screen",
              "keys": [
                "Esc"
              ]
            }
          ]
        },
        {
          "id": "navigation",
          "title": "Media navigation",
          "shortcuts": [
            {
              "id": "navigation-saut-court-arriere",
              "label": "Short jump backward",
              "keys": [
                "Shift",
                "Left"
              ]
            },
            {
              "id": "navigation-saut-court-avant",
              "label": "Short jump forward",
              "keys": [
                "Shift",
                "Right"
              ]
            }
          ]
        },
        {
          "id": "audio",
          "title": "Audio and video",
          "shortcuts": [
            {
              "id": "audio-volume-plus",
              "label": "Volume up",
              "keys": [
                "Ctrl",
                "Up"
              ]
            },
            {
              "id": "audio-volume-moins",
              "label": "Volume down",
              "keys": [
                "Ctrl",
                "Down"
              ]
            }
          ]
        }
      ]
    }
  ],
  "fr": [
    {
      "family": "windows-core",
      "label": "Windows",
      "logoPath": "logos/windows-core.svg",
      "accent": "#39b6e8",
      "categories": [
        {
          "id": "edition",
          "title": "Edition",
          "shortcuts": [
            {
              "id": "edition-copier",
              "label": "Copier",
              "keys": [
                "Ctrl",
                "C"
              ]
            },
            {
              "id": "edition-coller",
              "label": "Coller",
              "keys": [
                "Ctrl",
                "V"
              ]
            },
            {
              "id": "edition-couper",
              "label": "Couper",
              "keys": [
                "Ctrl",
                "X"
              ]
            },
            {
              "id": "edition-annuler",
              "label": "Annuler",
              "keys": [
                "Ctrl",
                "Z"
              ]
            },
            {
              "id": "edition-tout-selectionner",
              "label": "Tout selectionner",
              "keys": [
                "Ctrl",
                "A"
              ]
            },
            {
              "id": "edition-rechercher",
              "label": "Rechercher",
              "keys": [
                "Ctrl",
                "F"
              ]
            }
          ]
        },
        {
          "id": "systeme",
          "title": "Systeme",
          "shortcuts": [
            {
              "id": "systeme-menu-demarrer",
              "label": "Menu Demarrer",
              "keys": [
                "Win"
              ]
            },
            {
              "id": "systeme-rechercher-windows",
              "label": "Rechercher Windows",
              "keys": [
                "Win",
                "S"
              ]
            },
            {
              "id": "systeme-executer",
              "label": "Executer",
              "keys": [
                "Win",
                "R"
              ]
            },
            {
              "id": "systeme-parametres",
              "label": "Parametres",
              "keys": [
                "Win",
                "I"
              ]
            },
            {
              "id": "systeme-verrouiller",
              "label": "Verrouiller",
              "keys": [
                "Win",
                "L"
              ]
            },
            {
              "id": "systeme-reglages-rapides",
              "label": "Reglages rapides",
              "keys": [
                "Win",
                "A"
              ]
            }
          ]
        },
        {
          "id": "fenetres",
          "title": "Fenetres",
          "shortcuts": [
            {
              "id": "fenetres-changer-de-fenetre",
              "label": "Changer de fenetre",
              "keys": [
                "Alt",
                "Tab"
              ]
            },
            {
              "id": "fenetres-vue-des-taches",
              "label": "Vue des taches",
              "keys": [
                "Win",
                "Tab"
              ]
            },
            {
              "id": "fenetres-afficher-le-bureau",
              "label": "Afficher le bureau",
              "keys": [
                "Win",
                "D"
              ]
            },
            {
              "id": "fenetres-fermer-fenetre",
              "label": "Fermer fenetre",
              "keys": [
                "Alt",
                "F4"
              ]
            },
            {
              "id": "fenetres-ancrer-a-gauche",
              "label": "Ancrer a gauche",
              "keys": [
                "Win",
                "Left"
              ]
            },
            {
              "id": "fenetres-ancrer-a-droite",
              "label": "Ancrer a droite",
              "keys": [
                "Win",
                "Right"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "file-explorer",
      "label": "Explorateur",
      "logoPath": "logos/file-explorer.svg",
      "accent": "#f6c84c",
      "categories": [
        {
          "id": "navigation",
          "title": "Navigation",
          "shortcuts": [
            {
              "id": "navigation-ouvrir-l-explorateur",
              "label": "Ouvrir l explorateur",
              "keys": [
                "Win",
                "E"
              ]
            },
            {
              "id": "navigation-nouvelle-fenetre",
              "label": "Nouvelle fenetre",
              "keys": [
                "Ctrl",
                "N"
              ]
            },
            {
              "id": "navigation-nouvel-onglet",
              "label": "Nouvel onglet",
              "keys": [
                "Ctrl",
                "T"
              ]
            },
            {
              "id": "navigation-fermer-onglet",
              "label": "Fermer onglet",
              "keys": [
                "Ctrl",
                "W"
              ]
            },
            {
              "id": "navigation-onglet-suivant",
              "label": "Onglet suivant",
              "keys": [
                "Ctrl",
                "Tab"
              ]
            },
            {
              "id": "navigation-onglet-precedent",
              "label": "Onglet precedent",
              "keys": [
                "Ctrl",
                "Shift",
                "Tab"
              ]
            }
          ]
        },
        {
          "id": "fichiers",
          "title": "Fichiers et dossiers",
          "shortcuts": [
            {
              "id": "fichiers-nouveau-dossier",
              "label": "Nouveau dossier",
              "keys": [
                "Ctrl",
                "Shift",
                "N"
              ]
            },
            {
              "id": "fichiers-renommer",
              "label": "Renommer",
              "keys": [
                "F2"
              ]
            },
            {
              "id": "fichiers-supprimer",
              "label": "Supprimer",
              "keys": [
                "Delete"
              ]
            }
          ]
        },
        {
          "id": "selection",
          "title": "Selection et recherche",
          "shortcuts": [
            {
              "id": "selection-tout-selectionner",
              "label": "Tout selectionner",
              "keys": [
                "Ctrl",
                "A"
              ]
            },
            {
              "id": "selection-recherche",
              "label": "Recherche",
              "keys": [
                "Ctrl",
                "F"
              ]
            },
            {
              "id": "selection-multiple",
              "label": "Selection multiple",
              "keys": [
                "Shift",
                "Arrows"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "photos",
      "label": "Photos",
      "logoPath": "logos/photos.svg",
      "accent": "#5cc8ff",
      "categories": [
        {
          "id": "navigation",
          "title": "Navigation",
          "shortcuts": [
            {
              "id": "navigation-element-suivant",
              "label": "Element suivant",
              "keys": [
                "Right"
              ]
            },
            {
              "id": "navigation-element-precedent",
              "label": "Element precedent",
              "keys": [
                "Left"
              ]
            },
            {
              "id": "navigation-retour",
              "label": "Retour",
              "keys": [
                "Esc"
              ]
            },
            {
              "id": "navigation-commandes",
              "label": "Commandes",
              "keys": [
                "Space"
              ]
            }
          ]
        },
        {
          "id": "photo",
          "title": "Photo",
          "shortcuts": [
            {
              "id": "photo-zoom-avant",
              "label": "Zoom avant",
              "keys": [
                "Ctrl",
                "+"
              ]
            },
            {
              "id": "photo-zoom-arriere",
              "label": "Zoom arriere",
              "keys": [
                "Ctrl",
                "-"
              ]
            },
            {
              "id": "photo-zoom-initial",
              "label": "Zoom initial",
              "keys": [
                "Ctrl",
                "0"
              ]
            },
            {
              "id": "photo-rotation",
              "label": "Rotation",
              "keys": [
                "Ctrl",
                "R"
              ]
            },
            {
              "id": "photo-copier",
              "label": "Copier",
              "keys": [
                "Ctrl",
                "C"
              ]
            },
            {
              "id": "photo-enregistrer",
              "label": "Enregistrer",
              "keys": [
                "Ctrl",
                "S"
              ]
            }
          ]
        },
        {
          "id": "edition",
          "title": "Edition",
          "shortcuts": [
            {
              "id": "edition-annuler",
              "label": "Annuler",
              "keys": [
                "Ctrl",
                "Z"
              ]
            },
            {
              "id": "edition-retablir",
              "label": "Retablir",
              "keys": [
                "Ctrl",
                "Y"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "media-player",
      "label": "Lecteur multimedia",
      "logoPath": "logos/media-player.svg",
      "accent": "#ff6f61",
      "categories": [
        {
          "id": "lecture",
          "title": "Lecture",
          "shortcuts": [
            {
              "id": "lecture-lecture-pause",
              "label": "Lecture pause",
              "keys": [
                "Space"
              ]
            },
            {
              "id": "lecture-plein-ecran",
              "label": "Plein ecran",
              "keys": [
                "F11"
              ]
            },
            {
              "id": "lecture-quitter-plein-ecran",
              "label": "Quitter plein ecran",
              "keys": [
                "Esc"
              ]
            }
          ]
        },
        {
          "id": "navigation",
          "title": "Navigation media",
          "shortcuts": [
            {
              "id": "navigation-avancer",
              "label": "Avancer",
              "keys": [
                "Right"
              ]
            },
            {
              "id": "navigation-reculer",
              "label": "Reculer",
              "keys": [
                "Left"
              ]
            }
          ]
        },
        {
          "id": "audio",
          "title": "Audio",
          "shortcuts": [
            {
              "id": "audio-volume-plus",
              "label": "Volume plus",
              "keys": [
                "Up"
              ]
            },
            {
              "id": "audio-volume-moins",
              "label": "Volume moins",
              "keys": [
                "Down"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "cmd",
      "label": "Invite de commandes",
      "logoPath": "logos/cmd.svg",
      "accent": "#7ddc8a",
      "categories": [
        {
          "id": "saisie",
          "title": "Historique et saisie",
          "shortcuts": [
            {
              "id": "saisie-commande-precedente",
              "label": "Commande precedente",
              "keys": [
                "Up"
              ]
            },
            {
              "id": "saisie-commande-suivante",
              "label": "Commande suivante",
              "keys": [
                "Down"
              ]
            },
            {
              "id": "saisie-autocompletion",
              "label": "Completer chemin",
              "keys": [
                "Tab"
              ]
            },
            {
              "id": "saisie-interrompre",
              "label": "Interrompre commande",
              "keys": [
                "Ctrl",
                "C"
              ]
            }
          ]
        },
        {
          "id": "commandes",
          "title": "Commandes",
          "shortcuts": [
            {
              "id": "commandes-aide",
              "label": "Aide commande",
              "keys": []
            },
            {
              "id": "commandes-lister-fichiers",
              "label": "Lister fichiers",
              "keys": []
            },
            {
              "id": "commandes-changer-dossier",
              "label": "Changer dossier",
              "keys": []
            },
            {
              "id": "commandes-effacer-ecran",
              "label": "Effacer ecran",
              "keys": []
            },
            {
              "id": "commandes-lire-fichier",
              "label": "Lire fichier",
              "keys": []
            }
          ]
        }
      ]
    },
    {
      "family": "powershell",
      "label": "PowerShell",
      "logoPath": "logos/powershell.svg",
      "accent": "#61b0ff",
      "categories": [
        {
          "id": "saisie",
          "title": "Historique et saisie",
          "shortcuts": [
            {
              "id": "saisie-commande-precedente",
              "label": "Commande precedente",
              "keys": [
                "Up"
              ]
            },
            {
              "id": "saisie-commande-suivante",
              "label": "Commande suivante",
              "keys": [
                "Down"
              ]
            },
            {
              "id": "saisie-autocompletion",
              "label": "Completer commande",
              "keys": [
                "Tab"
              ]
            },
            {
              "id": "saisie-interrompre",
              "label": "Interrompre commande",
              "keys": [
                "Ctrl",
                "C"
              ]
            }
          ]
        },
        {
          "id": "commandes",
          "title": "Commandes",
          "shortcuts": [
            {
              "id": "commandes-aide",
              "label": "Aide commande",
              "keys": []
            },
            {
              "id": "commandes-trouver",
              "label": "Trouver commande",
              "keys": []
            },
            {
              "id": "commandes-lister-fichiers",
              "label": "Lister fichiers",
              "keys": []
            },
            {
              "id": "commandes-changer-dossier",
              "label": "Changer dossier",
              "keys": []
            },
            {
              "id": "commandes-effacer-affichage",
              "label": "Effacer affichage",
              "keys": []
            }
          ]
        }
      ]
    },
    {
      "family": "browsers",
      "label": "Navigateurs",
      "logoPath": "logos/browsers.svg",
      "accent": "#f5b44f",
      "categories": [
        {
          "id": "onglets",
          "title": "Onglets et fenetres",
          "shortcuts": [
            {
              "id": "onglets-nouvel-onglet",
              "label": "Nouvel onglet",
              "keys": [
                "Ctrl",
                "T"
              ]
            },
            {
              "id": "onglets-fermer-onglet",
              "label": "Fermer onglet",
              "keys": [
                "Ctrl",
                "W"
              ]
            },
            {
              "id": "onglets-rouvrir-onglet",
              "label": "Rouvrir onglet",
              "keys": [
                "Ctrl",
                "Shift",
                "T"
              ]
            },
            {
              "id": "onglets-nouvelle-fenetre",
              "label": "Nouvelle fenetre",
              "keys": [
                "Ctrl",
                "N"
              ]
            },
            {
              "id": "onglets-prive-chromium",
              "label": "Prive Chromium",
              "keys": [
                "Ctrl",
                "Shift",
                "N"
              ]
            },
            {
              "id": "onglets-prive-firefox",
              "label": "Prive Firefox",
              "keys": [
                "Ctrl",
                "Shift",
                "P"
              ]
            }
          ]
        },
        {
          "id": "navigation",
          "title": "Navigation",
          "shortcuts": [
            {
              "id": "navigation-barre-d-adresse",
              "label": "Barre d adresse",
              "keys": [
                "Ctrl",
                "L"
              ]
            },
            {
              "id": "navigation-actualiser",
              "label": "Actualiser",
              "keys": [
                "Ctrl",
                "R"
              ]
            },
            {
              "id": "navigation-retour",
              "label": "Retour",
              "keys": [
                "Alt",
                "Left"
              ]
            },
            {
              "id": "navigation-avancer",
              "label": "Avancer",
              "keys": [
                "Alt",
                "Right"
              ]
            },
            {
              "id": "navigation-rechercher-page",
              "label": "Rechercher page",
              "keys": [
                "Ctrl",
                "F"
              ]
            },
            {
              "id": "navigation-historique",
              "label": "Historique",
              "keys": [
                "Ctrl",
                "H"
              ]
            }
          ]
        },
        {
          "id": "outils-favori",
          "title": "Page et outils",
          "shortcuts": [
            {
              "id": "outils-favori",
              "label": "Favori",
              "keys": [
                "Ctrl",
                "D"
              ]
            },
            {
              "id": "outils-imprimer",
              "label": "Imprimer",
              "keys": [
                "Ctrl",
                "P"
              ]
            },
            {
              "id": "outils-zoom-avant",
              "label": "Zoom avant",
              "keys": [
                "Ctrl",
                "+"
              ]
            },
            {
              "id": "outils-zoom-arriere",
              "label": "Zoom arriere",
              "keys": [
                "Ctrl",
                "-"
              ]
            },
            {
              "id": "outils-zoom-par-defaut",
              "label": "Zoom par defaut",
              "keys": [
                "Ctrl",
                "0"
              ]
            },
            {
              "id": "outils-plein-ecran",
              "label": "Plein ecran",
              "keys": [
                "F11"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "excel",
      "label": "Excel",
      "logoPath": "logos/excel.svg",
      "accent": "#33c481",
      "categories": [
        {
          "id": "general",
          "title": "General",
          "shortcuts": [
            {
              "id": "general-nouveau-classeur",
              "label": "Nouveau classeur",
              "keys": [
                "Ctrl",
                "N"
              ]
            },
            {
              "id": "general-ouvrir",
              "label": "Ouvrir",
              "keys": [
                "Ctrl",
                "O"
              ]
            },
            {
              "id": "general-enregistrer",
              "label": "Enregistrer",
              "keys": [
                "Ctrl",
                "S"
              ]
            },
            {
              "id": "general-fermer",
              "label": "Fermer",
              "keys": [
                "Ctrl",
                "W"
              ]
            }
          ]
        },
        {
          "id": "edition",
          "title": "Edition",
          "shortcuts": [
            {
              "id": "edition-copier",
              "label": "Copier",
              "keys": [
                "Ctrl",
                "C"
              ]
            },
            {
              "id": "edition-coller",
              "label": "Coller",
              "keys": [
                "Ctrl",
                "V"
              ]
            },
            {
              "id": "edition-couper",
              "label": "Couper",
              "keys": [
                "Ctrl",
                "X"
              ]
            },
            {
              "id": "edition-annuler",
              "label": "Annuler",
              "keys": [
                "Ctrl",
                "Z"
              ]
            },
            {
              "id": "edition-retablir",
              "label": "Retablir",
              "keys": [
                "Ctrl",
                "Y"
              ]
            },
            {
              "id": "edition-rechercher",
              "label": "Rechercher",
              "keys": [
                "Ctrl",
                "F"
              ]
            }
          ]
        },
        {
          "id": "cellules",
          "title": "Cellules et navigation",
          "shortcuts": [
            {
              "id": "cellules-modifier-cellule",
              "label": "Modifier cellule",
              "keys": [
                "F2"
              ]
            },
            {
              "id": "cellules-atteindre",
              "label": "Atteindre",
              "keys": [
                "Ctrl",
                "G"
              ]
            },
            {
              "id": "cellules-bord-region",
              "label": "Bord region",
              "keys": [
                "Ctrl",
                "Arrow"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "word",
      "label": "Word",
      "logoPath": "logos/word.svg",
      "accent": "#5b8dff",
      "categories": [
        {
          "id": "general",
          "title": "General",
          "shortcuts": [
            {
              "id": "general-nouveau-document",
              "label": "Nouveau document",
              "keys": [
                "Ctrl",
                "N"
              ]
            },
            {
              "id": "general-ouvrir",
              "label": "Ouvrir",
              "keys": [
                "Ctrl",
                "O"
              ]
            },
            {
              "id": "general-enregistrer",
              "label": "Enregistrer",
              "keys": [
                "Ctrl",
                "S"
              ]
            },
            {
              "id": "general-imprimer",
              "label": "Imprimer",
              "keys": [
                "Ctrl",
                "P"
              ]
            },
            {
              "id": "general-fermer",
              "label": "Fermer",
              "keys": [
                "Ctrl",
                "W"
              ]
            }
          ]
        },
        {
          "id": "edition",
          "title": "Edition",
          "shortcuts": [
            {
              "id": "edition-copier",
              "label": "Copier",
              "keys": [
                "Ctrl",
                "C"
              ]
            },
            {
              "id": "edition-coller",
              "label": "Coller",
              "keys": [
                "Ctrl",
                "V"
              ]
            },
            {
              "id": "edition-couper",
              "label": "Couper",
              "keys": [
                "Ctrl",
                "X"
              ]
            },
            {
              "id": "edition-coller-texte",
              "label": "Coller texte seul",
              "keys": [
                "Ctrl",
                "Shift",
                "V"
              ]
            },
            {
              "id": "edition-annuler",
              "label": "Annuler",
              "keys": [
                "Ctrl",
                "Z"
              ]
            },
            {
              "id": "edition-retablir",
              "label": "Retablir",
              "keys": [
                "Ctrl",
                "Y"
              ]
            }
          ]
        },
        {
          "id": "format",
          "title": "Mise en forme",
          "shortcuts": [
            {
              "id": "format-gras",
              "label": "Gras",
              "keys": [
                "Ctrl",
                "G"
              ]
            },
            {
              "id": "format-italique",
              "label": "Italique",
              "keys": [
                "Ctrl",
                "I"
              ]
            },
            {
              "id": "format-souligne",
              "label": "Souligne",
              "keys": [
                "Ctrl",
                "U"
              ]
            },
            {
              "id": "format-gauche",
              "label": "Gauche",
              "keys": [
                "Ctrl",
                "L"
              ]
            },
            {
              "id": "format-centrer",
              "label": "Centrer",
              "keys": [
                "Ctrl",
                "E"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "powerpoint",
      "label": "PowerPoint",
      "logoPath": "logos/powerpoint.svg",
      "accent": "#ff7a45",
      "categories": [
        {
          "id": "general",
          "title": "General",
          "shortcuts": [
            {
              "id": "general-enregistrer",
              "label": "Enregistrer",
              "keys": [
                "Ctrl",
                "S"
              ]
            }
          ]
        },
        {
          "id": "diapos",
          "title": "Diapositives",
          "shortcuts": [
            {
              "id": "diapos-nouvelle-diapositive",
              "label": "Nouvelle diapositive",
              "keys": [
                "Ctrl",
                "M"
              ]
            },
            {
              "id": "diapos-copier",
              "label": "Copier",
              "keys": [
                "Ctrl",
                "C"
              ]
            },
            {
              "id": "diapos-coller",
              "label": "Coller",
              "keys": [
                "Ctrl",
                "V"
              ]
            },
            {
              "id": "diapos-couper",
              "label": "Couper",
              "keys": [
                "Ctrl",
                "X"
              ]
            },
            {
              "id": "diapos-annuler",
              "label": "Annuler",
              "keys": [
                "Ctrl",
                "Z"
              ]
            },
            {
              "id": "diapos-retablir",
              "label": "Retablir",
              "keys": [
                "Ctrl",
                "Y"
              ]
            }
          ]
        },
        {
          "id": "texte",
          "title": "Texte et objets",
          "shortcuts": [
            {
              "id": "texte-gras",
              "label": "Gras",
              "keys": [
                "Ctrl",
                "G"
              ]
            },
            {
              "id": "texte-italique",
              "label": "Italique",
              "keys": [
                "Ctrl",
                "I"
              ]
            },
            {
              "id": "texte-souligne",
              "label": "Souligne",
              "keys": [
                "Ctrl",
                "U"
              ]
            },
            {
              "id": "texte-lien",
              "label": "Lien",
              "keys": [
                "Ctrl",
                "K"
              ]
            },
            {
              "id": "texte-rechercher",
              "label": "Rechercher",
              "keys": [
                "Ctrl",
                "F"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "outlook",
      "label": "Outlook",
      "logoPath": "logos/outlook.svg",
      "accent": "#4db4ff",
      "categories": [
        {
          "id": "mail",
          "title": "Messagerie",
          "shortcuts": [
            {
              "id": "mail-nouveau-message",
              "label": "Nouveau message",
              "keys": [
                "Ctrl",
                "Shift",
                "M"
              ]
            },
            {
              "id": "mail-envoyer",
              "label": "Envoyer",
              "keys": [
                "Alt",
                "S"
              ]
            },
            {
              "id": "mail-enregistrer-brouillon",
              "label": "Enregistrer brouillon",
              "keys": [
                "Ctrl",
                "S"
              ]
            },
            {
              "id": "mail-repondre",
              "label": "Repondre",
              "keys": [
                "Ctrl",
                "R"
              ]
            },
            {
              "id": "mail-repondre-a-tous",
              "label": "Repondre a tous",
              "keys": [
                "Ctrl",
                "Shift",
                "R"
              ]
            },
            {
              "id": "mail-transferer",
              "label": "Transferer",
              "keys": [
                "Ctrl",
                "F"
              ]
            }
          ]
        },
        {
          "id": "navigation",
          "title": "Navigation",
          "shortcuts": [
            {
              "id": "navigation-courrier",
              "label": "Courrier",
              "keys": [
                "Ctrl",
                "1"
              ]
            },
            {
              "id": "navigation-calendrier",
              "label": "Calendrier",
              "keys": [
                "Ctrl",
                "2"
              ]
            },
            {
              "id": "navigation-recherche",
              "label": "Recherche",
              "keys": [
                "Ctrl",
                "E"
              ]
            },
            {
              "id": "navigation-envoyer-recevoir",
              "label": "Envoyer recevoir",
              "keys": [
                "F9"
              ]
            }
          ]
        },
        {
          "id": "calendrier",
          "title": "Calendrier",
          "shortcuts": [
            {
              "id": "calendrier-nouveau-rendez-vous",
              "label": "Nouveau rendez-vous",
              "keys": [
                "Ctrl",
                "Shift",
                "A"
              ]
            },
            {
              "id": "calendrier-nouvelle-reunion",
              "label": "Nouvelle reunion",
              "keys": [
                "Ctrl",
                "Shift",
                "Q"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "thunderbird",
      "label": "Thunderbird",
      "logoPath": "logos/thunderbird.svg",
      "accent": "#5f9cff",
      "categories": [
        {
          "id": "messages",
          "title": "Messages",
          "shortcuts": [
            {
              "id": "messages-nouveau-message",
              "label": "Nouveau message",
              "keys": [
                "Ctrl",
                "N"
              ]
            },
            {
              "id": "messages-repondre",
              "label": "Repondre",
              "keys": [
                "Ctrl",
                "R"
              ]
            },
            {
              "id": "messages-repondre-a-tous",
              "label": "Repondre a tous",
              "keys": [
                "Ctrl",
                "Shift",
                "R"
              ]
            },
            {
              "id": "messages-transferer",
              "label": "Transferer",
              "keys": [
                "Ctrl",
                "L"
              ]
            },
            {
              "id": "messages-archiver",
              "label": "Archiver",
              "keys": [
                "A"
              ]
            },
            {
              "id": "messages-supprimer",
              "label": "Supprimer",
              "keys": [
                "Delete"
              ]
            }
          ]
        },
        {
          "id": "navigation",
          "title": "Navigation et recherche",
          "shortcuts": [
            {
              "id": "navigation-recevoir-messages",
              "label": "Recevoir messages",
              "keys": [
                "F5"
              ]
            },
            {
              "id": "navigation-ouvrir-message",
              "label": "Ouvrir message",
              "keys": [
                "Enter"
              ]
            },
            {
              "id": "navigation-recherche-globale",
              "label": "Recherche globale",
              "keys": [
                "Ctrl",
                "K"
              ]
            },
            {
              "id": "navigation-rechercher-message",
              "label": "Rechercher message",
              "keys": [
                "Ctrl",
                "F"
              ]
            },
            {
              "id": "navigation-message-suivant",
              "label": "Message suivant",
              "keys": [
                "F"
              ]
            },
            {
              "id": "navigation-message-precedent",
              "label": "Message precedent",
              "keys": [
                "B"
              ]
            }
          ]
        },
        {
          "id": "redaction",
          "title": "Redaction",
          "shortcuts": [
            {
              "id": "redaction-envoyer",
              "label": "Envoyer",
              "keys": [
                "Ctrl",
                "Enter"
              ]
            },
            {
              "id": "redaction-brouillon",
              "label": "Brouillon",
              "keys": [
                "Ctrl",
                "S"
              ]
            },
            {
              "id": "redaction-piece-jointe",
              "label": "Piece jointe",
              "keys": [
                "Ctrl",
                "Shift",
                "A"
              ]
            },
            {
              "id": "redaction-gras",
              "label": "Gras",
              "keys": [
                "Ctrl",
                "B"
              ]
            },
            {
              "id": "redaction-italique",
              "label": "Italique",
              "keys": [
                "Ctrl",
                "I"
              ]
            },
            {
              "id": "redaction-souligne",
              "label": "Souligne",
              "keys": [
                "Ctrl",
                "U"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "obsidian",
      "label": "Obsidian",
      "logoPath": "logos/obsidian.svg",
      "accent": "#9d7cff",
      "categories": [
        {
          "id": "navigation",
          "title": "Navigation",
          "shortcuts": [
            {
              "id": "navigation-palette-commandes",
              "label": "Palette commandes",
              "keys": [
                "Ctrl",
                "P"
              ]
            },
            {
              "id": "navigation-ouverture-rapide",
              "label": "Ouverture rapide",
              "keys": [
                "Ctrl",
                "O"
              ]
            },
            {
              "id": "navigation-nouvelle-note",
              "label": "Nouvelle note",
              "keys": [
                "Ctrl",
                "N"
              ]
            },
            {
              "id": "navigation-fermer-onglet",
              "label": "Fermer onglet",
              "keys": [
                "Ctrl",
                "W"
              ]
            },
            {
              "id": "navigation-onglet-suivant",
              "label": "Onglet suivant",
              "keys": [
                "Ctrl",
                "Tab"
              ]
            },
            {
              "id": "navigation-onglet-precedent",
              "label": "Onglet precedent",
              "keys": [
                "Ctrl",
                "Shift",
                "Tab"
              ]
            }
          ]
        },
        {
          "id": "edition",
          "title": "Edition Markdown",
          "shortcuts": [
            {
              "id": "edition-copier",
              "label": "Copier",
              "keys": [
                "Ctrl",
                "C"
              ]
            },
            {
              "id": "edition-couper",
              "label": "Couper",
              "keys": [
                "Ctrl",
                "X"
              ]
            },
            {
              "id": "edition-coller",
              "label": "Coller",
              "keys": [
                "Ctrl",
                "V"
              ]
            },
            {
              "id": "edition-coller-brut",
              "label": "Coller brut",
              "keys": [
                "Ctrl",
                "Shift",
                "V"
              ]
            },
            {
              "id": "edition-annuler",
              "label": "Annuler",
              "keys": [
                "Ctrl",
                "Z"
              ]
            },
            {
              "id": "edition-retablir",
              "label": "Retablir",
              "keys": [
                "Ctrl",
                "Shift",
                "Z"
              ]
            }
          ]
        },
        {
          "id": "format",
          "title": "Mise en forme",
          "shortcuts": [
            {
              "id": "format-gras",
              "label": "Gras",
              "keys": [
                "Ctrl",
                "B"
              ]
            },
            {
              "id": "format-italique",
              "label": "Italique",
              "keys": [
                "Ctrl",
                "I"
              ]
            },
            {
              "id": "format-lien",
              "label": "Lien",
              "keys": [
                "Ctrl",
                "K"
              ]
            },
            {
              "id": "format-recherche-note",
              "label": "Recherche note",
              "keys": [
                "Ctrl",
                "F"
              ]
            },
            {
              "id": "format-recherche-coffre",
              "label": "Recherche coffre",
              "keys": [
                "Ctrl",
                "Shift",
                "F"
              ]
            }
          ]
        }
      ]
    },
    {
      "family": "vlc",
      "label": "VLC",
      "logoPath": "logos/vlc.svg",
      "accent": "#ff9f2f",
      "categories": [
        {
          "id": "lecture",
          "title": "Lecture",
          "shortcuts": [
            {
              "id": "lecture-lecture-pause",
              "label": "Lecture pause",
              "keys": [
                "Space"
              ]
            },
            {
              "id": "lecture-stop",
              "label": "Stop",
              "keys": [
                "S"
              ]
            },
            {
              "id": "lecture-suivant",
              "label": "Suivant",
              "keys": [
                "N"
              ]
            },
            {
              "id": "lecture-precedent",
              "label": "Precedent",
              "keys": [
                "P"
              ]
            },
            {
              "id": "lecture-plein-ecran",
              "label": "Plein ecran",
              "keys": [
                "F"
              ]
            },
            {
              "id": "lecture-quitter-plein-ecran",
              "label": "Quitter plein ecran",
              "keys": [
                "Esc"
              ]
            }
          ]
        },
        {
          "id": "navigation",
          "title": "Navigation media",
          "shortcuts": [
            {
              "id": "navigation-saut-court-arriere",
              "label": "Saut court arriere",
              "keys": [
                "Shift",
                "Left"
              ]
            },
            {
              "id": "navigation-saut-court-avant",
              "label": "Saut court avant",
              "keys": [
                "Shift",
                "Right"
              ]
            }
          ]
        },
        {
          "id": "audio",
          "title": "Audio et video",
          "shortcuts": [
            {
              "id": "audio-volume-plus",
              "label": "Volume plus",
              "keys": [
                "Ctrl",
                "Up"
              ]
            },
            {
              "id": "audio-volume-moins",
              "label": "Volume moins",
              "keys": [
                "Ctrl",
                "Down"
              ]
            }
          ]
        }
      ]
    }
  ]
} satisfies Record<SiteLanguage, SiteSoftware[]>;
