# Merken

[Francais](#francais) | [English](#english)

## Francais

Merken est une application Windows qui affiche un panneau flottant de raccourcis clavier depuis la zone de notification. L'objectif est simple : garder sous la main les raccourcis utiles de Windows et des logiciels courants, sans compte utilisateur, sans telemetrie et sans connexion obligatoire.

Le projet est une application Tauri 2 : interface TypeScript/Vite, backend Rust, donnees de raccourcis locales.

Merken affiche notamment des raccourcis clavier pour Windows et certaines applications compatibles, dont Microsoft Office, Word, Excel et PowerPoint. Le projet est independant et n'est pas affilie, sponsorise, approuve ni valide par Microsoft.

### Fonctionnalites

- Fiches locales pour Windows, Explorateur de fichiers, Parametres, Photos, lecteur multimedia, Terminal/PowerShell, navigateurs, Excel, Word, PowerPoint, Outlook, Thunderbird, Obsidian et VLC.
- Detection contextuelle locale : Merken choisit la fiche adaptee a partir du nom du processus actif et du titre de fenetre, sans compte, sans telemetrie et sans journalisation d'usage.
- Niveaux par fiche : standard, avance ou expert. Chaque niveau remplace le contenu affiche pour garder le panneau court et lisible.
- Personnalisation par theme ou par raccourci, avec apercu immediat dans le panneau de raccourcis.
- Placement du panneau par preset ou ajustement manuel.
- Options organisees par onglets : langue, apparence, fiches, personnalisation, demarrage Windows, informations et mises a jour.
- Verification manuelle des mises a jour depuis GitHub Releases. L'installateur peut installer la mise a jour signee ; la version portable renvoie vers la derniere release.

### Lancer en local

Prerequis : Node.js, npm, Rust et les outils Tauri pour Windows.

```powershell
npm install
npm run tauri:dev
```

Commandes utiles avant une publication :

```powershell
npm run test
npm run typecheck
npm run build
cargo check --manifest-path src-tauri/Cargo.toml
npm run tauri:build
```

### Portable ou installateur

La version portable est un executable Windows autonome. Elle peut etre lancee sans installation, pratique pour tester ou utiliser Merken ponctuellement. Pour les mises a jour, elle indique qu'une nouvelle version existe et renvoie vers la derniere release GitHub a telecharger.

L'installateur installe Merken pour l'utilisateur courant, configure l'application comme une application Windows classique et prend en charge les mises a jour integrees.

### Licence

Merken est gratuit. Son code source est consultable sur GitHub pour la transparence, l'audit, l'apprentissage et les contributions au projet officiel.

Le projet accepte les contributions via le depot officiel, mais sa licence n'est pas une licence open source au sens strict. Merken est distribue sous licence proprietaire gratuite, avec code source consultable et tous droits reserves.

Toute reprise, redistribution, publication d'une version modifiee ou reutilisation du code dans un autre projet necessite l'accord ecrit prealable de l'auteur.

## English

Merken is a Windows application that shows a floating keyboard-shortcut panel from the system tray. The goal is straightforward: keep useful shortcuts for Windows and common applications close at hand, without user accounts, telemetry, or a required network connection.

The project is a Tauri 2 application: TypeScript/Vite frontend, Rust backend, local shortcut data.

Merken displays keyboard shortcuts for Windows and compatible applications, including Microsoft Office, Word, Excel and PowerPoint. The project is independent and is not affiliated with, sponsored by, approved by, or validated by Microsoft.

### Features

- Local shortcut sheets for Windows, File Explorer, Settings, Photos, media player, Terminal/PowerShell, browsers, Excel, Word, PowerPoint, Outlook, Thunderbird, Obsidian, and VLC.
- Local contextual detection: Merken chooses the relevant sheet from the active process name and window title, without accounts, telemetry, or usage logging.
- Per-sheet levels: standard, advanced, or expert. Each level replaces the visible content so the panel stays short and readable.
- Theme-level and shortcut-level customization, with an immediate preview in the shortcut panel.
- Panel placement through presets or manual adjustment.
- Tabbed options for language, appearance, sheets, customization, Windows startup, app information, and updates.
- Manual update checks through GitHub Releases. The installer can install signed updates; the portable build links to the latest release.

### Run Locally

Requirements: Node.js, npm, Rust, and the Tauri tooling for Windows.

```powershell
npm install
npm run tauri:dev
```

Useful checks before publishing:

```powershell
npm run test
npm run typecheck
npm run build
cargo check --manifest-path src-tauri/Cargo.toml
npm run tauri:build
```

### Portable or Installer

The portable version is a standalone Windows executable. It can be started without installation, which is useful for testing or occasional use. For updates, it reports that a new version is available and links to the latest GitHub release to download.

The installer installs Merken for the current user, registers it as a regular Windows application, and supports integrated updates.

### License

Merken is free to use. Its source code is available on GitHub for transparency, audit, learning, and contributions to the official project.

The project accepts contributions through the official repository, but the license is not an open source license in the strict sense. Merken is distributed under a free proprietary license, with viewable source code and all rights reserved.

Any reuse, redistribution, publication of a modified version, or reuse of the code in another project requires the author's prior written permission.
