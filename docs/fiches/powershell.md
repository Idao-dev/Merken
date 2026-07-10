# PowerShell

Fiche documentaire pour les commandes PowerShell utiles sur Windows.

Documentation sheet for useful PowerShell commands on Windows.

## Sources

- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/get-help
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/get-command
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-childitem
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/set-location
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/copy-item
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/move-item
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/remove-item
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-content
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/select-string
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-process
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/stop-process

## Notes de recherche

- Version / plateforme: PowerShell 7.x et Windows PowerShell sur Windows.
- Couverture: commandes essentielles pour aide, navigation, fichiers, recherche et processus. La fiche evite les commandes administratives avancees et les scripts.
- Raccourcis Fn / touches F: aucune touche Fn retenue.
- Langue logiciel / clavier: les cmdlets PowerShell sont en anglais; les libelles Merken sont localises.
- Raccourcis exclus: raccourcis Windows Terminal, raccourcis de fenetre, edition avancee PSReadLine et commandes administratives.
- Risques: `Remove-Item` et `Stop-Process` peuvent supprimer des donnees ou fermer brutalement des applications; ils restent en Expert avec avertissement.

## Langue logiciel / clavier

- Source officielle FR: Microsoft Learn PowerShell ne localise pas les noms de cmdlets; les commandes restent en anglais.
- Source officielle EN: Microsoft Learn PowerShell modules.
- Disposition clavier mentionnee par la source: non specifiee pour les commandes retenues.
- Divergences FR/EN: aucune divergence de commande; seuls les libelles et descriptions changent.
- Divergences AZERTY/QWERTY: aucune divergence retenue en JSON.
- Conflits officiels: aucun conflit retenu.
- Statut: commandes promues JSON a partir des sources Microsoft, avec avertissement pour les commandes destructives.

## Inventaire complet

| Action source | Touches / commande | Source | Selection Merken | Raison |
| --- | --- | --- | --- | --- |
| Commande precedente | `Up` | Convention shell PowerShell | Standard | Navigation historique. |
| Commande suivante | `Down` | Convention shell PowerShell | Standard | Navigation historique. |
| Autocompletion | `Tab` | Convention shell PowerShell | Standard | Saisie courante. |
| Interrompre commande | `Ctrl` + `C` | Convention shell PowerShell | Standard | Stopper une commande. |
| Effacer affichage | `Ctrl` + `L` ou `Clear-Host` | Convention shell PowerShell | Avance / Standard | Nettoyage visuel. |
| Aide commande | `Get-Help <commande>` | PowerShell Get-Help | Standard | Decouverte. |
| Trouver commande | `Get-Command <nom>` | PowerShell Get-Command | Standard | Decouverte. |
| Lister fichiers | `Get-ChildItem` | PowerShell Get-ChildItem | Standard | Navigation fichier. |
| Changer dossier | `Set-Location <chemin>` | PowerShell Set-Location | Standard | Navigation fichier. |
| Lire fichier | `Get-Content <fichier>` | PowerShell Get-Content | Avance | Inspection. |
| Rechercher texte | `Select-String` | PowerShell Select-String | Avance | Recherche dans fichiers. |
| Copier element | `Copy-Item` | PowerShell Copy-Item | Avance | Gestion fichier. |
| Deplacer element | `Move-Item` | PowerShell Move-Item | Avance | Gestion fichier. |
| Lister processus | `Get-Process` | PowerShell Get-Process | Avance | Diagnostic. |
| Supprimer element | `Remove-Item <chemin>` | PowerShell Remove-Item | Expert | Commande destructive. |
| Arreter processus | `Stop-Process -Name <nom>` | PowerShell Stop-Process | Expert | Peut fermer brutalement une application. |

## Francais

- ID: `powershell-fr`
- Titre: PowerShell - Essentiels
- Applications: `powershell.exe`, `pwsh.exe`

### Historique et saisie

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `saisie-commande-precedente` | Commande precedente | `Up` | Rappelle la commande precedente. | Standard |
| `saisie-commande-suivante` | Commande suivante | `Down` | Avance dans l historique. | Standard |
| `saisie-autocompletion` | Completer commande | `Tab` | Complete une commande, un parametre ou un chemin. | Standard |
| `saisie-interrompre` | Interrompre commande | `Ctrl` + `C` | Interrompt la commande en cours. | Standard |
| `saisie-effacer-affichage` | Effacer affichage | `Ctrl` + `L` | Nettoie l affichage du shell. | Avance |

### Commandes

| ID | Action | Commande | Description | Niveau |
| --- | --- | --- | --- | --- |
| `commandes-aide` | Aide commande | `Get-Help <commande>` | Affiche l aide d une commande. | Standard |
| `commandes-trouver` | Trouver commande | `Get-Command <nom>` | Recherche une commande disponible. | Standard |
| `commandes-lister-fichiers` | Lister fichiers | `Get-ChildItem` | Liste les fichiers du dossier courant. | Standard |
| `commandes-changer-dossier` | Changer dossier | `Set-Location <chemin>` | Change de dossier courant. | Standard |
| `commandes-effacer-affichage` | Effacer affichage | `Clear-Host` | Nettoie l affichage du shell. | Standard |
| `commandes-lire-fichier` | Lire fichier | `Get-Content <fichier>` | Affiche le contenu d un fichier texte. | Avance |
| `commandes-rechercher-texte` | Rechercher texte | `Select-String -Path <fichier> -Pattern <texte>` | Recherche du texte dans des fichiers. | Avance |
| `commandes-copier-element` | Copier element | `Copy-Item <source> <destination>` | Copie un fichier ou un dossier. | Avance |
| `commandes-deplacer-element` | Deplacer element | `Move-Item <source> <destination>` | Deplace ou renomme un fichier ou un dossier. | Avance |
| `commandes-lister-processus` | Lister processus | `Get-Process` | Liste les processus en cours. | Avance |
| `commandes-supprimer-element` | Supprimer element | `Remove-Item <chemin>` | Supprime un fichier ou un dossier. | Expert |
| `commandes-arreter-processus` | Arreter processus | `Stop-Process -Name <nom>` | Arrete un processus par nom. | Expert |

## English

- ID: `powershell-en`
- Title: PowerShell - Essentials
- Applications: `powershell.exe`, `pwsh.exe`

### History and input

| ID | Action | Keys | Description | Level |
| --- | --- | --- | --- | --- |
| `saisie-commande-precedente` | Previous command | `Up` | Recall the previous command. | Standard |
| `saisie-commande-suivante` | Next command | `Down` | Move forward in history. | Standard |
| `saisie-autocompletion` | Complete command | `Tab` | Complete a command, parameter, or path. | Standard |
| `saisie-interrompre` | Interrupt command | `Ctrl` + `C` | Interrupt the running command. | Standard |
| `saisie-effacer-affichage` | Clear display | `Ctrl` + `L` | Clear shell display. | Advanced |

### Commands

| ID | Action | Command | Description | Level |
| --- | --- | --- | --- | --- |
| `commandes-aide` | Command help | `Get-Help <command>` | Show help for a command. | Standard |
| `commandes-trouver` | Find command | `Get-Command <name>` | Find an available command. | Standard |
| `commandes-lister-fichiers` | List files | `Get-ChildItem` | List files in the current folder. | Standard |
| `commandes-changer-dossier` | Change folder | `Set-Location <path>` | Change the current folder. | Standard |
| `commandes-effacer-affichage` | Clear display | `Clear-Host` | Clear shell display. | Standard |
| `commandes-lire-fichier` | Read file | `Get-Content <file>` | Show a text file's content. | Advanced |
| `commandes-rechercher-texte` | Search text | `Select-String -Path <file> -Pattern <text>` | Search text in files. | Advanced |
| `commandes-copier-element` | Copy item | `Copy-Item <source> <destination>` | Copy a file or folder. | Advanced |
| `commandes-deplacer-element` | Move item | `Move-Item <source> <destination>` | Move or rename a file or folder. | Advanced |
| `commandes-lister-processus` | List processes | `Get-Process` | List running processes. | Advanced |
| `commandes-supprimer-element` | Remove item | `Remove-Item <path>` | Delete a file or folder. | Expert |
| `commandes-arreter-processus` | Stop process | `Stop-Process -Name <name>` | Stop a process by name. | Expert |
