# Windows

Fiche documentaire pour les raccourcis generaux de Windows.

Documentation sheet for general Windows shortcuts.

## Sources

- https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-apps-139014e7-177b-d1f3-eb2e-7298b2599a34
- https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec
- https://support.microsoft.com/topic/how-to-run-control-panel-tools-by-typing-a-command-bce95b4d-e8c2-1cd0-ee0d-027679d520a6
- https://learn.microsoft.com/en-us/windows/win32/shell/executing-control-panel-items
- https://learn.microsoft.com/en-us/windows/win32/shell/controlpanel-canonical-names
- https://www.dell.com/support/kbdoc/en-us/000123570/how-to-access-device-manager

## Notes de recherche

- Version / plateforme: Windows 11 et Windows 10, raccourcis systeme generaux.
- Couverture: inventaire centre sur les raccourcis Windows transverses et sur quelques commandes `Win` + `R` utiles aux utilisateurs avances. Les raccourcis applicatifs plus specifiques restent dans leurs fiches dediees.
- Raccourcis Fn / touches F: `Alt` + `F4`, `Ctrl` + `Win` + `F4` et `Win` + `Pause` peuvent demander `Fn` selon le clavier.
- Raccourcis clavier/souris: les raccourcis avec clic de barre des taches existent mais ne sont pas retenus ici; ils demanderaient un rendu clic et sont moins prioritaires que les raccourcis clavier purs.
- Raccourcis exclus: `Win` + `E` est documente dans la fiche Explorateur; les raccourcis de Game Bar, accessibilite, bureaux a distance et presse-papiers historique avance ne sont pas tous retenus pour eviter une fiche systeme trop bruyante.
- Risques: les commandes `Win` + `R` ouvrant des panneaux systeme restent en Expert, car elles touchent a la configuration, au reseau, aux programmes installes ou aux fonctionnalites Windows.

## Inventaire complet

| Action source | Touches / commande | Source | Selection Merken | Raison |
| --- | --- | --- | --- | --- |
| Copy | `Ctrl` + `C` | Microsoft Windows shortcuts | Standard | Edition transverse. |
| Paste | `Ctrl` + `V` | Microsoft Windows shortcuts | Standard | Edition transverse. |
| Cut | `Ctrl` + `X` | Microsoft Windows shortcuts | Standard | Edition transverse. |
| Undo | `Ctrl` + `Z` | Microsoft Windows shortcuts | Standard | Edition transverse. |
| Select all | `Ctrl` + `A` | Microsoft Windows shortcuts | Standard | Edition transverse. |
| Find | `Ctrl` + `F` | Microsoft Windows shortcuts | Standard | Edition transverse. |
| Paste as plain text | `Ctrl` + `Shift` + `V` | Microsoft Windows shortcuts | Avance | Disponible selon application. |
| Clipboard history | `Win` + `V` | Microsoft Windows shortcuts | Avance | Puissant mais depend du parametre historique. |
| Start | `Win` | Microsoft Windows shortcuts | Standard | Navigation principale. |
| Search | `Win` + `S` | Microsoft Windows shortcuts | Standard | Recherche systeme. |
| Run | `Win` + `R` | Microsoft Windows shortcuts | Standard | Lance commandes et chemins. |
| Settings | `Win` + `I` | Microsoft Windows shortcuts | Standard | Configuration generale. |
| Lock | `Win` + `L` | Microsoft Windows shortcuts | Standard | Securite quotidienne. |
| Quick settings / action center | `Win` + `A` | Microsoft Windows shortcuts | Standard | Acces rapide aux reglages. |
| Notifications | `Win` + `N` | Microsoft Windows shortcuts | Avance | Consultation ponctuelle. |
| Quick Link menu | `Win` + `X` | Microsoft Windows shortcuts | Avance | Outils systeme. |
| Task Manager | `Ctrl` + `Shift` + `Esc` | Microsoft Windows shortcuts | Avance | Diagnostic. |
| Snipping | `Win` + `Shift` + `S` | Microsoft Windows shortcuts | Standard | Capture courante. |
| Emoji panel | `Win` + `.` | Microsoft Windows shortcuts | Standard | Saisie de symboles. |
| File Explorer | `Win` + `E` | Microsoft Windows shortcuts | Non retenu | Couvert par la fiche Explorateur. |
| System About | `Win` + `Pause` | Microsoft Windows shortcuts | Expert | Information systeme avancee. |
| Switch windows | `Alt` + `Tab` | Microsoft Windows shortcuts | Standard | Navigation fenetres. |
| Task view | `Win` + `Tab` | Microsoft Windows shortcuts | Standard | Navigation fenetres/bureaux. |
| Show desktop | `Win` + `D` | Microsoft Windows shortcuts | Standard | Gestion de bureau. |
| Minimize all | `Win` + `M` | Microsoft Windows shortcuts | Avance | Gestion de fenetres moins frequente. |
| Restore minimized windows | `Win` + `Shift` + `M` | Microsoft Windows shortcuts | Avance | Complement de minimisation. |
| Close active window | `Alt` + `F4` | Microsoft Windows shortcuts | Standard | Fermeture courante mais explicite. |
| Snap left | `Win` + `Left` | Microsoft Windows shortcuts | Standard | Organisation d ecran. |
| Snap right | `Win` + `Right` | Microsoft Windows shortcuts | Standard | Organisation d ecran. |
| Maximize | `Win` + `Up` | Microsoft Windows shortcuts | Standard | Organisation d ecran. |
| Minimize / restore | `Win` + `Down` | Microsoft Windows shortcuts | Standard | Organisation d ecran. |
| Move window to monitor | `Win` + `Shift` + `Left/Right` | Microsoft Windows shortcuts | Avance | Multi-ecran. |
| New virtual desktop | `Ctrl` + `Win` + `D` | Microsoft Windows shortcuts | Avance | Bureaux virtuels. |
| Next desktop | `Ctrl` + `Win` + `Right` | Microsoft Windows shortcuts | Avance | Bureaux virtuels. |
| Previous desktop | `Ctrl` + `Win` + `Left` | Microsoft Windows shortcuts | Avance | Bureaux virtuels. |
| Close virtual desktop | `Ctrl` + `Win` + `F4` | Microsoft Windows shortcuts | Expert | Ferme un espace de travail. |
| Device Manager | `devmgmt.msc` via `Win` + `R` | Microsoft / Dell | Expert | Panneau systeme sensible. |
| Power Options | `powercfg.cpl` via `Win` + `R` | Microsoft control panel commands | Expert | Configuration systeme. |
| Advanced power settings | `control.exe powercfg.cpl,,3` via `Win` + `R` | Microsoft shell docs | Expert | Configuration avancee. |
| Advanced system properties | `SystemPropertiesAdvanced.exe` via `Win` + `R` | Microsoft shell docs | Expert | Configuration systeme avancee. |
| Network Connections | `control.exe netconnections` via `Win` + `R` | Microsoft shell docs | Expert | Configuration reseau. |
| Programs and Features | `appwiz.cpl` via `Win` + `R` | Microsoft control panel commands | Expert | Desinstallation/configuration. |
| Windows Features | `OptionalFeatures.exe` via `Win` + `R` | Microsoft shell docs | Expert | Activation de composants systeme. |

## Francais

- ID: `windows-core-fr`
- Titre: Windows - Essentiels
- Applications: `applicationframehost.exe`, `searchhost.exe`, `systemsettings.exe`

### Edition

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `edition-copier` | Copier | `Ctrl` + `C` | Copie la selection. | Standard |
| `edition-coller` | Coller | `Ctrl` + `V` | Colle le presse-papiers. | Standard |
| `edition-couper` | Couper | `Ctrl` + `X` | Coupe la selection. | Standard |
| `edition-annuler` | Annuler | `Ctrl` + `Z` | Annule l action recente. | Standard |
| `edition-tout-selectionner` | Tout selectionner | `Ctrl` + `A` | Selectionne le contenu disponible. | Standard |
| `edition-rechercher` | Rechercher | `Ctrl` + `F` | Ouvre la recherche locale. | Standard |
| `edition-coller-sans-mise-en-forme` | Coller sans mise en forme | `Ctrl` + `Shift` + `V` | Colle du texte brut si l app le permet. | Avance |
| `edition-historique-presse-papiers` | Historique presse-papiers | `Win` + `V` | Ouvre les elements recents du presse-papiers. | Avance |

### Systeme

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `systeme-menu-demarrer` | Menu Demarrer | `Win` | Ouvre ou ferme Demarrer. | Standard |
| `systeme-rechercher-windows` | Rechercher Windows | `Win` + `S` | Ouvre la recherche Windows. | Standard |
| `systeme-executer` | Executer | `Win` + `R` | Ouvre la boite Executer. | Standard |
| `systeme-parametres` | Parametres | `Win` + `I` | Ouvre les parametres. | Standard |
| `systeme-verrouiller` | Verrouiller | `Win` + `L` | Verrouille la session. | Standard |
| `systeme-reglages-rapides` | Reglages rapides | `Win` + `A` | Ouvre les reglages rapides. | Standard |
| `systeme-notifications` | Notifications | `Win` + `N` | Ouvre le centre de notifications. | Avance |
| `systeme-menu-rapide` | Menu rapide | `Win` + `X` | Ouvre le menu des outils systeme. | Avance |
| `systeme-gestionnaire-des-taches` | Gestionnaire des taches | `Ctrl` + `Shift` + `Esc` | Ouvre le gestionnaire des taches. | Avance |
| `systeme-capture-de-zone` | Capture de zone | `Win` + `Shift` + `S` | Lance la capture de zone. | Standard |
| `systeme-emoji-et-symboles` | Emoji et symboles | `Win` + `.` | Ouvre le panneau emoji. | Standard |
| `systeme-a-propos` | A propos du systeme | `Win` + `Pause` | Ouvre la page Systeme > Informations. | Expert |

### Outils systeme

| ID | Action | Touches | Commande | Description | Niveau |
| --- | --- | --- | --- | --- | --- |
| `outils-systeme-gestionnaire-peripheriques` | Gestionnaire de peripheriques | `Win` + `R` | `devmgmt.msc` | Ouvre le gestionnaire de peripheriques depuis Executer. | Expert |
| `outils-systeme-options-alimentation` | Options d'alimentation | `Win` + `R` | `powercfg.cpl` | Ouvre les options d'alimentation depuis Executer. | Expert |
| `outils-systeme-alimentation-avancee` | Alimentation avancee | `Win` + `R` | `control.exe powercfg.cpl,,3` | Ouvre les parametres avances du mode de gestion d'alimentation. | Expert |
| `outils-systeme-parametres-systeme-avances` | Parametres systeme avances | `Win` + `R` | `SystemPropertiesAdvanced.exe` | Ouvre les proprietes systeme avancees. | Expert |
| `outils-systeme-connexions-reseau` | Connexions reseau | `Win` + `R` | `control.exe netconnections` | Ouvre les connexions reseau. | Expert |
| `outils-systeme-programmes-fonctionnalites` | Programmes et fonctionnalites | `Win` + `R` | `appwiz.cpl` | Ouvre la liste des programmes installes. | Expert |
| `outils-systeme-fonctionnalites-windows` | Fonctionnalites Windows | `Win` + `R` | `OptionalFeatures.exe` | Ouvre l'activation des fonctionnalites Windows. | Expert |

### Fenetres

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `fenetres-changer-de-fenetre` | Changer de fenetre | `Alt` + `Tab` | Passe a une autre fenetre. | Standard |
| `fenetres-vue-des-taches` | Vue des taches | `Win` + `Tab` | Affiche fenetres et bureaux. | Standard |
| `fenetres-afficher-le-bureau` | Afficher le bureau | `Win` + `D` | Affiche ou masque le bureau. | Standard |
| `fenetres-reduire-tout` | Reduire tout | `Win` + `M` | Reduit toutes les fenetres. | Avance |
| `fenetres-restaurer-tout` | Restaurer tout | `Win` + `Shift` + `M` | Restaure les fenetres reduites. | Avance |
| `fenetres-fermer-fenetre` | Fermer fenetre | `Alt` + `F4` | Ferme la fenetre active. | Standard |
| `fenetres-ancrer-a-gauche` | Ancrer a gauche | `Win` + `Left` | Place la fenetre a gauche. | Standard |
| `fenetres-ancrer-a-droite` | Ancrer a droite | `Win` + `Right` | Place la fenetre a droite. | Standard |
| `fenetres-agrandir` | Agrandir | `Win` + `Up` | Agrandit la fenetre. | Standard |
| `fenetres-reduire-ou-restaurer` | Reduire ou restaurer | `Win` + `Down` | Reduit ou restaure la fenetre. | Standard |
| `fenetres-deplacer-ecran-gauche` | Ecran gauche | `Win` + `Shift` + `Left` | Deplace la fenetre vers l ecran gauche. | Avance |
| `fenetres-deplacer-ecran-droite` | Ecran droite | `Win` + `Shift` + `Right` | Deplace la fenetre vers l ecran droite. | Avance |
| `fenetres-nouveau-bureau` | Nouveau bureau | `Ctrl` + `Win` + `D` | Cree un bureau virtuel. | Avance |
| `fenetres-bureau-suivant` | Bureau suivant | `Ctrl` + `Win` + `Right` | Passe au bureau suivant. | Avance |
| `fenetres-bureau-precedent` | Bureau precedent | `Ctrl` + `Win` + `Left` | Passe au bureau precedent. | Avance |
| `fenetres-fermer-bureau` | Fermer bureau | `Ctrl` + `Win` + `F4` | Ferme le bureau virtuel actif. | Expert |

## English

- ID: `windows-core-en`
- Titre: Windows - Essentials
- Applications: `applicationframehost.exe`, `searchhost.exe`, `systemsettings.exe`

### Editing

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `edition-copier` | Copy | `Ctrl` + `C` | Copy the selection. | Standard |
| `edition-coller` | Paste | `Ctrl` + `V` | Paste clipboard content. | Standard |
| `edition-couper` | Cut | `Ctrl` + `X` | Cut the selection. | Standard |
| `edition-annuler` | Undo | `Ctrl` + `Z` | Undo the latest action. | Standard |
| `edition-tout-selectionner` | Select all | `Ctrl` + `A` | Select available content. | Standard |
| `edition-rechercher` | Find | `Ctrl` + `F` | Open local search. | Standard |
| `edition-coller-sans-mise-en-forme` | Paste without formatting | `Ctrl` + `Shift` + `V` | Paste plain text when supported. | Advanced |
| `edition-historique-presse-papiers` | Clipboard history | `Win` + `V` | Open recent clipboard items. | Advanced |

### System

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `systeme-menu-demarrer` | Start menu | `Win` | Open or close Start. | Standard |
| `systeme-rechercher-windows` | Windows search | `Win` + `S` | Open Windows search. | Standard |
| `systeme-executer` | Run | `Win` + `R` | Open the Run dialog. | Standard |
| `systeme-parametres` | Settings | `Win` + `I` | Open Settings. | Standard |
| `systeme-verrouiller` | Lock | `Win` + `L` | Lock the session. | Standard |
| `systeme-reglages-rapides` | Quick settings | `Win` + `A` | Open quick settings. | Standard |
| `systeme-notifications` | Notifications | `Win` + `N` | Open the notification center. | Advanced |
| `systeme-menu-rapide` | Quick Link menu | `Win` + `X` | Open the system tools menu. | Advanced |
| `systeme-gestionnaire-des-taches` | Task Manager | `Ctrl` + `Shift` + `Esc` | Open Task Manager. | Advanced |
| `systeme-capture-de-zone` | Area screenshot | `Win` + `Shift` + `S` | Start area capture. | Standard |
| `systeme-emoji-et-symboles` | Emoji and symbols | `Win` + `.` | Open the emoji panel. | Standard |
| `systeme-a-propos` | System About | `Win` + `Pause` | Open the System > About page. | Expert |

### System tools

| ID | Action | Keys | Command | Description | Level |
| --- | --- | --- | --- | --- | --- |
| `outils-systeme-gestionnaire-peripheriques` | Device Manager | `Win` + `R` | `devmgmt.msc` | Open Device Manager from Run. | Expert |
| `outils-systeme-options-alimentation` | Power Options | `Win` + `R` | `powercfg.cpl` | Open Power Options from Run. | Expert |
| `outils-systeme-alimentation-avancee` | Advanced power settings | `Win` + `R` | `control.exe powercfg.cpl,,3` | Open advanced power plan settings. | Expert |
| `outils-systeme-parametres-systeme-avances` | Advanced system settings | `Win` + `R` | `SystemPropertiesAdvanced.exe` | Open advanced system properties. | Expert |
| `outils-systeme-connexions-reseau` | Network Connections | `Win` + `R` | `control.exe netconnections` | Open Network Connections. | Expert |
| `outils-systeme-programmes-fonctionnalites` | Programs and Features | `Win` + `R` | `appwiz.cpl` | Open the installed programs list. | Expert |
| `outils-systeme-fonctionnalites-windows` | Windows Features | `Win` + `R` | `OptionalFeatures.exe` | Open Windows features. | Expert |

### Windows

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `fenetres-changer-de-fenetre` | Switch windows | `Alt` + `Tab` | Switch to another window. | Standard |
| `fenetres-vue-des-taches` | Task view | `Win` + `Tab` | Show windows and desktops. | Standard |
| `fenetres-afficher-le-bureau` | Show desktop | `Win` + `D` | Show or hide the desktop. | Standard |
| `fenetres-reduire-tout` | Minimize all | `Win` + `M` | Minimize all windows. | Advanced |
| `fenetres-restaurer-tout` | Restore all | `Win` + `Shift` + `M` | Restore minimized windows. | Advanced |
| `fenetres-fermer-fenetre` | Close window | `Alt` + `F4` | Close the active window. | Standard |
| `fenetres-ancrer-a-gauche` | Snap left | `Win` + `Left` | Snap the window left. | Standard |
| `fenetres-ancrer-a-droite` | Snap right | `Win` + `Right` | Snap the window right. | Standard |
| `fenetres-agrandir` | Maximize | `Win` + `Up` | Maximize the window. | Standard |
| `fenetres-reduire-ou-restaurer` | Minimize or restore | `Win` + `Down` | Minimize or restore the window. | Standard |
| `fenetres-deplacer-ecran-gauche` | Left monitor | `Win` + `Shift` + `Left` | Move the window to the left monitor. | Advanced |
| `fenetres-deplacer-ecran-droite` | Right monitor | `Win` + `Shift` + `Right` | Move the window to the right monitor. | Advanced |
| `fenetres-nouveau-bureau` | New desktop | `Ctrl` + `Win` + `D` | Create a virtual desktop. | Advanced |
| `fenetres-bureau-suivant` | Next desktop | `Ctrl` + `Win` + `Right` | Switch to the next desktop. | Advanced |
| `fenetres-bureau-precedent` | Previous desktop | `Ctrl` + `Win` + `Left` | Switch to the previous desktop. | Advanced |
| `fenetres-fermer-bureau` | Close desktop | `Ctrl` + `Win` + `F4` | Close the active virtual desktop. | Expert |
