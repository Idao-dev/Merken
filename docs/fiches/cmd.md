# Invite de commandes / Command Prompt

Fiche documentaire pour les commandes CMD utiles sur Windows.

Documentation sheet for useful Command Prompt commands on Windows.

## Sources

- https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands
- https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/dir
- https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cd
- https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/copy
- https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/move
- https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/del
- https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/type
- https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/findstr
- https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig
- https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tasklist
- https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill

## Notes de recherche

- Version / plateforme: Command Prompt Windows 10/11 et Windows Commands documentes par Microsoft Learn.
- Couverture: commandes de base pour navigation, fichiers, recherche, reseau leger et processus. La fiche evite les commandes administratives, scripts batch avances et outils de bas niveau.
- Raccourcis Fn / touches F: aucune touche Fn retenue.
- Langue logiciel / clavier: les commandes CMD sont en anglais quel que soit l affichage Windows; les libelles Merken sont localises.
- Raccourcis exclus: raccourcis de taille de fenetre, selection souris, QuickEdit et raccourcis Windows Terminal.
- Risques: `del` et `taskkill` peuvent entrainer une perte de donnees ou fermer brutalement des applications; ils restent en Expert avec avertissement.

## Langue logiciel / clavier

- Source officielle FR: Microsoft Learn ne fournit pas une syntaxe CMD localisee; les commandes restent en anglais.
- Source officielle EN: Microsoft Learn Windows Commands.
- Disposition clavier mentionnee par la source: non specifiee pour les commandes retenues.
- Divergences FR/EN: aucune divergence de commande; seuls les libelles et descriptions changent.
- Divergences AZERTY/QWERTY: aucune divergence retenue en JSON.
- Conflits officiels: aucun conflit retenu.
- Statut: commandes promues JSON a partir des sources Microsoft, avec avertissement pour les commandes destructives.

## Inventaire complet

| Action source | Touches / commande | Source | Selection Merken | Raison |
| --- | --- | --- | --- | --- |
| Commande precedente | `Up` | Convention console Windows | Standard | Navigation historique. |
| Commande suivante | `Down` | Convention console Windows | Standard | Navigation historique. |
| Completion chemin | `Tab` | Windows Commands completion | Standard | Saisie courante. |
| Interrompre commande | `Ctrl` + `C` | Convention console Windows | Standard | Stopper une commande. |
| Aide commande | `help <commande>` | Windows Commands | Standard | Decouverte. |
| Lister fichiers | `dir` | Windows Commands | Standard | Navigation fichier. |
| Changer dossier | `cd <chemin>` | Windows Commands | Standard | Navigation fichier. |
| Effacer ecran | `cls` | Windows Commands | Standard | Nettoyage visuel. |
| Lire fichier | `type <fichier>` | Windows Commands | Standard | Inspection rapide. |
| Copier fichier | `copy <source> <destination>` | Windows Commands | Avance | Gestion fichier. |
| Deplacer fichier | `move <source> <destination>` | Windows Commands | Avance | Gestion fichier. |
| Rechercher texte | `findstr "texte" <fichier>` | Windows Commands | Avance | Recherche dans fichiers. |
| Configuration reseau | `ipconfig` | Windows Commands | Avance | Diagnostic leger. |
| Lister processus | `tasklist` | Windows Commands | Avance | Diagnostic. |
| Supprimer fichier | `del <fichier>` | Windows Commands | Expert | Commande destructive. |
| Arreter processus | `taskkill /IM <nom.exe>` | Windows Commands | Expert | Peut fermer brutalement une application. |

## Francais

- ID: `cmd-fr`
- Titre: Invite de commandes - Essentiels
- Applications: `cmd.exe`

### Historique et saisie

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `saisie-commande-precedente` | Commande precedente | `Up` | Rappelle la commande precedente. | Standard |
| `saisie-commande-suivante` | Commande suivante | `Down` | Avance dans l historique. | Standard |
| `saisie-autocompletion` | Completer chemin | `Tab` | Complete un nom de fichier ou de dossier. | Standard |
| `saisie-interrompre` | Interrompre commande | `Ctrl` + `C` | Interrompt la commande en cours. | Standard |

### Commandes

| ID | Action | Commande | Description | Niveau |
| --- | --- | --- | --- | --- |
| `commandes-aide` | Aide commande | `help <commande>` | Affiche l aide d une commande. | Standard |
| `commandes-lister-fichiers` | Lister fichiers | `dir` | Liste les fichiers du dossier courant. | Standard |
| `commandes-changer-dossier` | Changer dossier | `cd <chemin>` | Change de dossier courant. | Standard |
| `commandes-effacer-ecran` | Effacer ecran | `cls` | Nettoie l affichage de la console. | Standard |
| `commandes-lire-fichier` | Lire fichier | `type <fichier>` | Affiche le contenu d un fichier texte. | Standard |
| `commandes-copier-fichier` | Copier fichier | `copy <source> <destination>` | Copie un fichier vers une destination. | Avance |
| `commandes-deplacer-fichier` | Deplacer fichier | `move <source> <destination>` | Deplace ou renomme un fichier. | Avance |
| `commandes-rechercher-texte` | Rechercher texte | `findstr "texte" <fichier>` | Recherche du texte dans des fichiers. | Avance |
| `commandes-configuration-reseau` | Configuration reseau | `ipconfig` | Affiche la configuration IP. | Avance |
| `commandes-lister-processus` | Lister processus | `tasklist` | Liste les processus en cours. | Avance |
| `commandes-supprimer-fichier` | Supprimer fichier | `del <fichier>` | Supprime un fichier. | Expert |
| `commandes-arreter-processus` | Arreter processus | `taskkill /IM <nom.exe>` | Arrete un processus par nom. | Expert |

## English

- ID: `cmd-en`
- Title: Command Prompt - Essentials
- Applications: `cmd.exe`

### History and input

| ID | Action | Keys | Description | Level |
| --- | --- | --- | --- | --- |
| `saisie-commande-precedente` | Previous command | `Up` | Recall the previous command. | Standard |
| `saisie-commande-suivante` | Next command | `Down` | Move forward in history. | Standard |
| `saisie-autocompletion` | Complete path | `Tab` | Complete a file or folder name. | Standard |
| `saisie-interrompre` | Interrupt command | `Ctrl` + `C` | Interrupt the running command. | Standard |

### Commands

| ID | Action | Command | Description | Level |
| --- | --- | --- | --- | --- |
| `commandes-aide` | Command help | `help <command>` | Show help for a command. | Standard |
| `commandes-lister-fichiers` | List files | `dir` | List files in the current folder. | Standard |
| `commandes-changer-dossier` | Change folder | `cd <path>` | Change the current folder. | Standard |
| `commandes-effacer-ecran` | Clear screen | `cls` | Clear the console display. | Standard |
| `commandes-lire-fichier` | Read file | `type <file>` | Show a text file's content. | Standard |
| `commandes-copier-fichier` | Copy file | `copy <source> <destination>` | Copy a file to a destination. | Advanced |
| `commandes-deplacer-fichier` | Move file | `move <source> <destination>` | Move or rename a file. | Advanced |
| `commandes-rechercher-texte` | Search text | `findstr "text" <file>` | Search text in files. | Advanced |
| `commandes-configuration-reseau` | Network configuration | `ipconfig` | Show IP configuration. | Advanced |
| `commandes-lister-processus` | List processes | `tasklist` | List running processes. | Advanced |
| `commandes-supprimer-fichier` | Delete file | `del <file>` | Delete a file. | Expert |
| `commandes-arreter-processus` | Stop process | `taskkill /IM <name.exe>` | Stop a process by image name. | Expert |
