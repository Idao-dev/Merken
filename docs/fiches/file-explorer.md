# Explorateur de fichiers / File Explorer

Fiche documentaire pour l Explorateur de fichiers Windows.

Documentation sheet for Windows File Explorer.

## Sources

- https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec
- https://support.microsoft.com/en-us/windows/file-explorer-in-windows-ef370130-1cca-9dc5-e0df-2f7416fe1cb1

## Notes de recherche

- Version / plateforme: Windows 11 et Windows 10, Explorateur de fichiers natif.
- Couverture: inventaire construit depuis la section officielle "File Explorer keyboard shortcuts" de Microsoft, complete par la page officielle d ouverture de l Explorateur (`Win` + `E`).
- Raccourcis Fn / touches F: `F2`, `F3`, `F4`, `F5`, `F6` et `F11` peuvent demander `Fn` selon le clavier ou le mode touches de fonction.
- Raccourcis clavier/souris: `Ctrl` + glisser, `Shift` + glisser et `Ctrl` + molette sont utiles mais demandent un rendu Merken pour les actions souris/molette avant integration JSON.
- Raccourcis exclus: les doublons clavier moins connus et `Shift` + clic droit sont documentes dans l inventaire mais exclus de la fiche Merken.
- Risques: `Shift` + `Delete` supprime sans passer par la corbeille et doit rester en Expert avec avertissement si integre au JSON.

## Inventaire complet

| Action source | Touches | Source | Selection Merken | Raison |
| --- | --- | --- | --- | --- |
| Select the address bar | `Alt` + `D` | Microsoft Windows shortcuts | Non retenu | Doublon fonctionnel de `Ctrl` + `L`, moins portable dans les habitudes Merken. |
| Display properties for the selected item | `Alt` + `Enter` | Microsoft Windows shortcuts | Avance | Utile mais moins frequent que ouvrir, renommer ou supprimer. |
| Navigate to the previous folder | `Alt` + `Left` | Microsoft Windows shortcuts | Standard | Navigation quotidienne. |
| Navigate to the previous folder | `Backspace` | Microsoft Windows shortcuts | Non retenu | Doublon de `Alt` + `Left`; peut entrer en conflit avec l edition de texte. |
| Create a shortcut by dragging a file | `Alt` + glisser fichier | Microsoft Windows shortcuts | Non retenu | Depend d une action souris. |
| Show or hide the preview pane | `Alt` + `P` | Microsoft Windows shortcuts | Avance | Utile pour inspecter sans ouvrir. |
| View the next folder | `Alt` + `Right` | Microsoft Windows shortcuts | Standard | Navigation quotidienne. |
| Show or hide the details pane | `Alt` + `Shift` + `P` | Microsoft Windows shortcuts | Avance | Utile mais contextuel. |
| Move up a level in the folder path | `Alt` + `Up` | Microsoft Windows shortcuts | Standard | Navigation de dossier courante. |
| Select multiple individual items | `Ctrl` + `Arrow` puis `Space` | Microsoft Windows shortcuts | Avance | Puissant mais plus technique a executer. |
| Delete to Recycle Bin | `Ctrl` + `D` | Microsoft Windows shortcuts | Non retenu | Doublon de `Delete`, moins explicite. |
| Delete to Recycle Bin | `Delete` | Microsoft Windows shortcuts | Standard | Action fichier courante. |
| Select the search box | `Ctrl` + `E` | Microsoft Windows shortcuts | Non retenu | Doublon de `Ctrl` + `F`. |
| Select the search box | `Ctrl` + `F` | Microsoft Windows shortcuts | Standard | Raccourci recherche le plus reconnaissable. |
| Focus on the address bar | `Ctrl` + `L` | Microsoft Windows shortcuts | Standard | Raccourci courant pour saisir un chemin. |
| Copy by dragging a file | `Ctrl` + glisser fichier | Microsoft Windows shortcuts | Expert | Combine clavier et souris; utile pour forcer la copie pendant un glisser-deposer. |
| Change icon size and appearance | `Ctrl` + molette souris | Microsoft Windows shortcuts | Expert | Combine clavier et molette; utile mais demande un token visuel souris/molette. |
| Open a new window | `Ctrl` + `N` | Microsoft Windows shortcuts | Standard | Gestion de fenetre courante. |
| Move to numbered tab | `Ctrl` + `1-9` | Microsoft Windows shortcuts | Avance | Utile avec les onglets mais moins visible. |
| Resize all columns to fit text | `Ctrl` + `+` pave numerique | Microsoft Windows shortcuts | Avance | Utile en mode Details, avec caveat pave numerique. |
| Expand all folders in navigation pane | `Ctrl` + `Shift` + `E` | Microsoft Windows shortcuts | Avance | Puissant mais lie au volet de navigation. |
| Create a new folder | `Ctrl` + `Shift` + `N` | Microsoft Windows shortcuts | Standard | Action fichier tres courante. |
| Change view style | `Ctrl` + `Shift` + `1-9` | Microsoft Windows shortcuts | Avance | Utile mais a memorisation moins immediate. |
| Move to previous tab | `Ctrl` + `Shift` + `Tab` | Microsoft Windows shortcuts | Standard | Navigation d onglets courante. |
| Open a new tab and switch to it | `Ctrl` + `T` | Microsoft Windows shortcuts | Standard | Gestion d onglets courante. |
| Close active tab or window | `Ctrl` + `W` | Microsoft Windows shortcuts | Standard | Gestion d onglets courante. |
| Move to next tab | `Ctrl` + `Tab` | Microsoft Windows shortcuts | Standard | Navigation d onglets courante. |
| Scroll to bottom | `End` | Microsoft Windows shortcuts | Avance | Utile dans les grands dossiers mais contextuel. |
| Rename selected item | `F2` | Microsoft Windows shortcuts | Standard | Action fichier courante. |
| Search for a file or folder | `F3` | Microsoft Windows shortcuts | Non retenu | Doublon de `Ctrl` + `F`, moins memorise. |
| Select address bar to change path | `F4` | Microsoft Windows shortcuts | Non retenu | Doublon de `Ctrl` + `L`, touche F moins fiable sur portable. |
| Refresh window | `F5` | Microsoft Windows shortcuts | Standard | Action courante. |
| Cycle through window elements | `F6` | Microsoft Windows shortcuts | Avance | Navigation clavier utile mais contextuelle. |
| Maximize or minimize active window | `F11` | Microsoft Windows shortcuts | Avance | Utile ponctuellement. |
| Scroll to top | `Home` | Microsoft Windows shortcuts | Avance | Utile dans les grands dossiers mais contextuel. |
| Collapse current selection or select parent folder | `Left` | Microsoft Windows shortcuts | Avance | Principalement utile dans l arborescence. |
| Expand current selection or select first subfolder | `Right` | Microsoft Windows shortcuts | Avance | Principalement utile dans l arborescence. |
| Select multiple items | `Shift` + `Arrows` | Microsoft Windows shortcuts | Standard | Selection clavier courante. |
| Permanently delete selected item | `Shift` + `Delete` | Microsoft Windows shortcuts | Expert | Destructif, supprime sans corbeille. |
| Display context menu for selected item | `Shift` + `F10` | Microsoft Windows shortcuts | Avance | Utile sans souris, mais moins frequent. |
| Move by dragging a file | `Shift` + glisser fichier | Microsoft Windows shortcuts | Expert | Combine clavier et souris; utile pour forcer le deplacement pendant un glisser-deposer. |
| Show more options context menu | `Shift` + clic droit souris | Microsoft Windows shortcuts | Non retenu | Equivaut au menu "Afficher plus d options", peu utile dans l overlay. |
| Open File Explorer | `Win` + `E` | Microsoft Windows shortcuts / File Explorer page | Standard | Raccourci d ouverture principal. |

## Francais

- ID: `file-explorer-fr`
- Titre: Explorateur de fichiers - Essentiels
- Applications: `explorer.exe`

### Navigation

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `navigation-ouvrir-l-explorateur` | Ouvrir l explorateur | `Win` + `E` | Ouvre une fenetre de fichiers. | Standard |
| `navigation-nouvelle-fenetre` | Nouvelle fenetre | `Ctrl` + `N` | Ouvre une nouvelle fenetre. | Standard |
| `navigation-nouvel-onglet` | Nouvel onglet | `Ctrl` + `T` | Ouvre un onglet si disponible. | Standard |
| `navigation-fermer-onglet` | Fermer onglet | `Ctrl` + `W` | Ferme l onglet ou la fenetre. | Standard |
| `navigation-onglet-suivant` | Onglet suivant | `Ctrl` + `Tab` | Passe a l onglet suivant. | Standard |
| `navigation-onglet-precedent` | Onglet precedent | `Ctrl` + `Shift` + `Tab` | Revient a l onglet precedent. | Standard |
| `navigation-onglet-numero` | Onglet numero | `Ctrl` + `1-9` | Active l onglet numerote. | Avance |
| `navigation-dossier-parent` | Dossier parent | `Alt` + `Up` | Remonte d un dossier. | Standard |
| `navigation-retour` | Retour | `Alt` + `Left` | Revient a l emplacement precedent. | Standard |
| `navigation-avancer` | Avancer | `Alt` + `Right` | Passe a l emplacement suivant. | Standard |
| `navigation-barre-d-adresse` | Barre d adresse | `Ctrl` + `L` | Active la barre d adresse. | Standard |
| `navigation-actualiser` | Actualiser | `F5` | Recharge le dossier. | Standard |
| `navigation-parcourir-volets` | Parcourir volets | `F6` | Deplace le focus entre les zones. | Avance |
| `navigation-plein-ecran` | Plein ecran | `F11` | Maximise ou restaure la fenetre. | Avance |

### Fichiers et dossiers

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `fichiers-nouveau-dossier` | Nouveau dossier | `Ctrl` + `Shift` + `N` | Cree un dossier. | Standard |
| `fichiers-renommer` | Renommer | `F2` | Renomme l element selectionne. | Standard |
| `fichiers-supprimer` | Supprimer | `Delete` | Supprime vers la corbeille. | Standard |
| `fichiers-supprimer-definitivement` | Supprimer definitivement | `Shift` + `Delete` | Supprime sans corbeille. | Expert |
| `fichiers-proprietes` | Proprietes | `Alt` + `Enter` | Ouvre les proprietes. | Avance |
| `fichiers-menu-contextuel` | Menu contextuel | `Shift` + `F10` | Ouvre le menu contextuel. | Avance |
| `fichiers-ajuster-colonnes` | Ajuster colonnes | `Ctrl` + `+` | Ajuste les colonnes au texte. | Avance |
| `fichiers-style-affichage` | Style affichage | `Ctrl` + `Shift` + `1-9` | Change le mode d affichage. | Avance |
| `fichiers-copier-glisser` | Copier en glissant | `Ctrl` + glisser | Force la copie pendant un glisser-deposer. | Expert |
| `fichiers-deplacer-glisser` | Deplacer en glissant | `Shift` + glisser | Force le deplacement pendant un glisser-deposer. | Expert |
| `fichiers-taille-icones` | Taille des icones | `Ctrl` + molette | Change la taille ou l affichage des icones. | Expert |

### Selection et recherche

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `selection-tout-selectionner` | Tout selectionner | `Ctrl` + `A` | Selectionne tous les elements. | Standard |
| `selection-recherche` | Recherche | `Ctrl` + `F` | Active la recherche du dossier. | Standard |
| `selection-multiple` | Selection multiple | `Shift` + `Arrows` | Etend la selection au clavier. | Standard |
| `selection-individuelle` | Selection individuelle | `Ctrl` + `Arrow` + `Space` | Ajoute des elements non contigus. | Avance |
| `selection-volet-de-visualisation` | Volet de visualisation | `Alt` + `P` | Affiche ou masque l apercu. | Avance |
| `selection-volet-de-details` | Volet de details | `Alt` + `Shift` + `P` | Affiche ou masque les details. | Avance |
| `selection-debut-liste` | Debut de liste | `Home` | Va en haut de la liste. | Avance |
| `selection-fin-liste` | Fin de liste | `End` | Va en bas de la liste. | Avance |
| `selection-replier-dossier` | Replier dossier | `Left` | Replie le dossier ou selectionne le parent. | Avance |
| `selection-deplier-dossier` | Deplier dossier | `Right` | Deplie le dossier ou selectionne le premier sous-dossier. | Avance |
| `selection-deplier-arborescence` | Deplier arborescence | `Ctrl` + `Shift` + `E` | Deplie l arborescence du volet de navigation. | Avance |

## English

- ID: `file-explorer-en`
- Titre: File Explorer - Essentials
- Applications: `explorer.exe`

### Navigation

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `navigation-ouvrir-l-explorateur` | Open File Explorer | `Win` + `E` | Open a file window. | Standard |
| `navigation-nouvelle-fenetre` | New window | `Ctrl` + `N` | Open a new window. | Standard |
| `navigation-nouvel-onglet` | New tab | `Ctrl` + `T` | Open a tab when supported. | Standard |
| `navigation-fermer-onglet` | Close tab | `Ctrl` + `W` | Close the tab or window. | Standard |
| `navigation-onglet-suivant` | Next tab | `Ctrl` + `Tab` | Move to the next tab. | Standard |
| `navigation-onglet-precedent` | Previous tab | `Ctrl` + `Shift` + `Tab` | Move to the previous tab. | Standard |
| `navigation-onglet-numero` | Numbered tab | `Ctrl` + `1-9` | Move to a numbered tab. | Advanced |
| `navigation-dossier-parent` | Parent folder | `Alt` + `Up` | Go up one folder. | Standard |
| `navigation-retour` | Back | `Alt` + `Left` | Return to the previous location. | Standard |
| `navigation-avancer` | Forward | `Alt` + `Right` | Move to the next location. | Standard |
| `navigation-barre-d-adresse` | Address bar | `Ctrl` + `L` | Focus the address bar. | Standard |
| `navigation-actualiser` | Refresh | `F5` | Reload the folder. | Standard |
| `navigation-parcourir-volets` | Cycle panes | `F6` | Move focus between window areas. | Advanced |
| `navigation-plein-ecran` | Full screen | `F11` | Maximize or restore the window. | Advanced |

### Files and folders

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `fichiers-nouveau-dossier` | New folder | `Ctrl` + `Shift` + `N` | Create a folder. | Standard |
| `fichiers-renommer` | Rename | `F2` | Rename the selected item. | Standard |
| `fichiers-supprimer` | Delete | `Delete` | Delete to the recycle bin. | Standard |
| `fichiers-supprimer-definitivement` | Delete permanently | `Shift` + `Delete` | Delete without the recycle bin. | Expert |
| `fichiers-proprietes` | Properties | `Alt` + `Enter` | Open properties. | Advanced |
| `fichiers-menu-contextuel` | Context menu | `Shift` + `F10` | Open the context menu. | Advanced |
| `fichiers-ajuster-colonnes` | Fit columns | `Ctrl` + `+` | Resize columns to fit text. | Advanced |
| `fichiers-style-affichage` | View style | `Ctrl` + `Shift` + `1-9` | Change the view style. | Advanced |
| `fichiers-copier-glisser` | Copy by dragging | `Ctrl` + drag | Force copy during drag and drop. | Expert |
| `fichiers-deplacer-glisser` | Move by dragging | `Shift` + drag | Force move during drag and drop. | Expert |
| `fichiers-taille-icones` | Icon size | `Ctrl` + wheel | Change icon size or appearance. | Expert |

### Selection and search

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `selection-tout-selectionner` | Select all | `Ctrl` + `A` | Select all items. | Standard |
| `selection-recherche` | Search | `Ctrl` + `F` | Focus folder search. | Standard |
| `selection-multiple` | Multiple selection | `Shift` + `Arrows` | Extend selection from the keyboard. | Standard |
| `selection-individuelle` | Individual selection | `Ctrl` + `Arrow` + `Space` | Add non-contiguous items. | Advanced |
| `selection-volet-de-visualisation` | Preview pane | `Alt` + `P` | Show or hide preview. | Advanced |
| `selection-volet-de-details` | Details pane | `Alt` + `Shift` + `P` | Show or hide details. | Advanced |
| `selection-debut-liste` | Start of list | `Home` | Go to the top of the list. | Advanced |
| `selection-fin-liste` | End of list | `End` | Go to the bottom of the list. | Advanced |
| `selection-replier-dossier` | Collapse folder | `Left` | Collapse the folder or select its parent. | Advanced |
| `selection-deplier-dossier` | Expand folder | `Right` | Expand the folder or select its first subfolder. | Advanced |
| `selection-deplier-arborescence` | Expand tree | `Ctrl` + `Shift` + `E` | Expand the navigation pane tree. | Advanced |
