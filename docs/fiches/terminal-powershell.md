# Terminal et PowerShell / Terminal and PowerShell

Fiche documentaire pour Windows Terminal et les commandes PowerShell de base.

Documentation sheet for Windows Terminal and basic PowerShell commands.

## Sources

- https://learn.microsoft.com/en-us/windows/terminal/customize-settings/actions
- https://learn.microsoft.com/en-us/windows/terminal/install
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/get-command
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-childitem
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/get-help
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/set-location
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-content
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-process
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/stop-process

## Notes de recherche

- Version / plateforme: Windows Terminal 1.x et PowerShell 7.x / Windows PowerShell.
- Couverture: fiche hybride. Les sections Onglets, Edition et Affichage suivent Windows Terminal; la section Commandes PowerShell documente des commandes a taper, pas des raccourcis clavier purs.
- Separation a prevoir: avec `powershell.exe` ou `pwsh.exe`, les commandes PowerShell sont pertinentes. Avec `windowsterminal.exe`, le processus ne suffit pas a savoir si l onglet actif est PowerShell, CMD, WSL ou un autre shell; une fiche Terminal seule et une fiche PowerShell separee seraient plus fiables pour l integration automatique.
- Raccourcis Fn / touches F: `F11` peut demander `Fn` selon le clavier.
- Raccourcis exclus: actions Terminal personnalisables sans raccourci par defaut, commandes PowerShell destructives ou administratives non necessaires a une fiche rapide.
- Risques: `Stop-Process` peut fermer brutalement une application; a garder en Expert avec avertissement si integre au JSON.

## Inventaire complet

| Action source | Touches / commande | Source | Selection Merken | Raison |
| --- | --- | --- | --- | --- |
| Nouvel onglet | `Ctrl` + `Shift` + `T` | Windows Terminal actions | Standard | Gestion courante. |
| Fermer onglet | `Ctrl` + `Shift` + `W` | Windows Terminal actions | Standard | Gestion courante. |
| Onglet suivant | `Ctrl` + `Tab` | Windows Terminal actions | Standard | Navigation courante. |
| Onglet precedent | `Ctrl` + `Shift` + `Tab` | Windows Terminal actions | Standard | Navigation courante. |
| Liste nouveaux onglets | `Ctrl` + `Shift` + `Space` | Windows Terminal actions | Avance | Choisir un profil. |
| Palette de commandes | `Ctrl` + `Shift` + `P` | Windows Terminal actions | Avance | Acces aux actions. |
| Parametres UI | `Ctrl` + `,` | Windows Terminal actions | Avance | Configuration. |
| Fichier parametres | `Ctrl` + `Shift` + `,` | Windows Terminal actions | Expert | Edition directe de configuration. |
| Copier | `Ctrl` + `Shift` + `C` | Windows Terminal actions | Standard | Edition terminal. |
| Coller | `Ctrl` + `Shift` + `V` | Windows Terminal actions | Standard | Edition terminal. |
| Rechercher | `Ctrl` + `Shift` + `F` | Windows Terminal actions | Standard | Recherche tampon. |
| Interrompre commande | `Ctrl` + `C` | PowerShell / terminal convention | Standard | Stopper une commande en cours. |
| Effacer affichage | `Ctrl` + `L` ou `Clear-Host` | PowerShell / terminal convention | Avance | Nettoyage visuel. |
| Dupliquer panneau | `Alt` + `Shift` + `D` | Windows Terminal actions | Avance | Multi-pane. |
| Decouper panneau horizontal/vertical | `Alt` + `Shift` + `-` / `+` | Windows Terminal actions | Expert | Layout avance. |
| Fermer panneau | `Ctrl` + `Shift` + `W` | Windows Terminal actions | Avance | Ferme le panneau actif ou l onglet. |
| Zoom avant / arriere / defaut | `Ctrl` + `+` / `-` / `0` | Windows Terminal actions | Standard | Lisibilite. |
| Plein ecran | `Alt` + `Enter` ou `F11` | Windows Terminal actions | Avance | Affichage. |
| Aide PowerShell | `Get-Help <commande>` | PowerShell Get-Help | Standard | Comprendre une commande. |
| Trouver une commande | `Get-Command <nom>` | PowerShell Get-Command | Standard | Decouverte. |
| Lister fichiers | `Get-ChildItem` / `ls` | PowerShell Get-ChildItem | Standard | Navigation fichier. |
| Changer de dossier | `Set-Location <chemin>` / `cd` | PowerShell Set-Location | Standard | Navigation fichier. |
| Lire un fichier | `Get-Content <fichier>` | PowerShell Get-Content | Avance | Inspection. |
| Lister processus | `Get-Process` | PowerShell Get-Process | Avance | Diagnostic. |
| Arreter processus | `Stop-Process -Name <nom>` | PowerShell Stop-Process | Expert | Peut fermer brutalement une application. |

## Francais

- ID: `terminal-powershell-fr`
- Titre: Terminal et PowerShell - Essentiels
- Applications: `windowsterminal.exe`, `wt.exe`, `powershell.exe`, `pwsh.exe`

### Onglets

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `onglets-nouvel-onglet` | Nouvel onglet | `Ctrl` + `Shift` + `T` | Ouvre un onglet. | Standard |
| `onglets-fermer-onglet` | Fermer onglet | `Ctrl` + `Shift` + `W` | Ferme l onglet actif. | Standard |
| `onglets-onglet-suivant` | Onglet suivant | `Ctrl` + `Tab` | Passe a l onglet suivant. | Standard |
| `onglets-onglet-precedent` | Onglet precedent | `Ctrl` + `Shift` + `Tab` | Revient a l onglet precedent. | Standard |
| `onglets-liste-profils` | Liste profils | `Ctrl` + `Shift` + `Space` | Ouvre la liste des profils. | Avance |
| `onglets-palette-de-commandes` | Palette de commandes | `Ctrl` + `Shift` + `P` | Ouvre la palette. | Avance |
| `onglets-parametres` | Parametres | `Ctrl` + `,` | Ouvre les parametres. | Avance |
| `onglets-fichier-parametres` | Fichier parametres | `Ctrl` + `Shift` + `,` | Ouvre le fichier de parametres. | Expert |

### Edition

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `edition-copier` | Copier | `Ctrl` + `Shift` + `C` | Copie la selection. | Standard |
| `edition-coller` | Coller | `Ctrl` + `Shift` + `V` | Colle dans le terminal. | Standard |
| `edition-rechercher` | Rechercher | `Ctrl` + `Shift` + `F` | Recherche dans le tampon. | Standard |
| `edition-interrompre-commande` | Interrompre commande | `Ctrl` + `C` | Interrompt une commande. | Standard |
| `edition-effacer-affichage` | Effacer affichage | `Ctrl` + `L` | Nettoie l affichage du shell. | Avance |

### Panneaux et affichage

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `affichage-dupliquer-panneau` | Dupliquer panneau | `Alt` + `Shift` + `D` | Cree un panneau du profil courant. | Avance |
| `affichage-scinder-horizontal` | Scinder horizontal | `Alt` + `Shift` + `-` | Cree un panneau horizontal. | Expert |
| `affichage-scinder-vertical` | Scinder vertical | `Alt` + `Shift` + `+` | Cree un panneau vertical. | Expert |
| `affichage-zoom-avant` | Zoom avant | `Ctrl` + `+` | Agrandit le texte. | Standard |
| `affichage-zoom-arriere` | Zoom arriere | `Ctrl` + `-` | Reduit le texte. | Standard |
| `affichage-zoom-par-defaut` | Zoom par defaut | `Ctrl` + `0` | Restaure la taille initiale. | Standard |
| `affichage-plein-ecran` | Plein ecran | `Alt` + `Enter` | Bascule le plein ecran. | Avance |

### Commandes PowerShell

| ID | Action | Commande | Description | Niveau |
| --- | --- | --- | --- | --- |
| `commandes-aide` | Aide commande | `Get-Help <commande>` | Affiche l aide d une commande. | Standard |
| `commandes-trouver` | Trouver commande | `Get-Command <nom>` | Recherche une commande disponible. | Standard |
| `commandes-lister-fichiers` | Lister fichiers | `Get-ChildItem` | Liste les fichiers du dossier courant. | Standard |
| `commandes-changer-dossier` | Changer dossier | `Set-Location <chemin>` | Change de dossier courant. | Standard |
| `commandes-lire-fichier` | Lire fichier | `Get-Content <fichier>` | Affiche le contenu d un fichier texte. | Avance |
| `commandes-lister-processus` | Lister processus | `Get-Process` | Liste les processus en cours. | Avance |
| `commandes-arreter-processus` | Arreter processus | `Stop-Process -Name <nom>` | Arrete un processus par nom. | Expert |

## English

- ID: `terminal-powershell-en`
- Titre: Terminal and PowerShell - Essentials
- Applications: `windowsterminal.exe`, `wt.exe`, `powershell.exe`, `pwsh.exe`

### Tabs

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `onglets-nouvel-onglet` | New tab | `Ctrl` + `Shift` + `T` | Open a tab. | Standard |
| `onglets-fermer-onglet` | Close tab | `Ctrl` + `Shift` + `W` | Close the active tab. | Standard |
| `onglets-onglet-suivant` | Next tab | `Ctrl` + `Tab` | Move to the next tab. | Standard |
| `onglets-onglet-precedent` | Previous tab | `Ctrl` + `Shift` + `Tab` | Move to the previous tab. | Standard |
| `onglets-liste-profils` | Profile list | `Ctrl` + `Shift` + `Space` | Open the profile list. | Advanced |
| `onglets-palette-de-commandes` | Command palette | `Ctrl` + `Shift` + `P` | Open the command palette. | Advanced |
| `onglets-parametres` | Settings | `Ctrl` + `,` | Open settings. | Advanced |
| `onglets-fichier-parametres` | Settings file | `Ctrl` + `Shift` + `,` | Open the settings file. | Expert |

### Editing

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `edition-copier` | Copy | `Ctrl` + `Shift` + `C` | Copy selection. | Standard |
| `edition-coller` | Paste | `Ctrl` + `Shift` + `V` | Paste into the terminal. | Standard |
| `edition-rechercher` | Find | `Ctrl` + `Shift` + `F` | Search the buffer. | Standard |
| `edition-interrompre-commande` | Interrupt command | `Ctrl` + `C` | Interrupt a command. | Standard |
| `edition-effacer-affichage` | Clear display | `Ctrl` + `L` | Clear shell display. | Advanced |

### Panes and display

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `affichage-dupliquer-panneau` | Duplicate pane | `Alt` + `Shift` + `D` | Create a pane from the current profile. | Advanced |
| `affichage-scinder-horizontal` | Split horizontal | `Alt` + `Shift` + `-` | Create a horizontal pane. | Expert |
| `affichage-scinder-vertical` | Split vertical | `Alt` + `Shift` + `+` | Create a vertical pane. | Expert |
| `affichage-zoom-avant` | Zoom in | `Ctrl` + `+` | Increase text size. | Standard |
| `affichage-zoom-arriere` | Zoom out | `Ctrl` + `-` | Decrease text size. | Standard |
| `affichage-zoom-par-defaut` | Default zoom | `Ctrl` + `0` | Restore default size. | Standard |
| `affichage-plein-ecran` | Full screen | `Alt` + `Enter` | Toggle full screen. | Advanced |

### PowerShell commands

| ID | Action | Command | Description | Niveau |
| --- | --- | --- | --- | --- |
| `commandes-aide` | Command help | `Get-Help <command>` | Show help for a command. | Standard |
| `commandes-trouver` | Find command | `Get-Command <name>` | Find an available command. | Standard |
| `commandes-lister-fichiers` | List files | `Get-ChildItem` | List files in the current folder. | Standard |
| `commandes-changer-dossier` | Change folder | `Set-Location <path>` | Change the current folder. | Standard |
| `commandes-lire-fichier` | Read file | `Get-Content <file>` | Show a text file's content. | Advanced |
| `commandes-lister-processus` | List processes | `Get-Process` | List running processes. | Advanced |
| `commandes-arreter-processus` | Stop process | `Stop-Process -Name <name>` | Stop a process by name. | Expert |
