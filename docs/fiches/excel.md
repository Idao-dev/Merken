# Excel

Fiche documentaire pour les raccourcis Excel utiles sur Windows.

Documentation sheet for useful Excel shortcuts on Windows.

## Sources

- https://support.microsoft.com/en-us/office/keyboard-shortcuts-in-excel-1798d9d5-842a-42b8-9c99-9b7213f0040f
- https://support.microsoft.com/en-us/office/about-power-query-in-excel-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a
- https://support.microsoft.com/en-us/office/manage-queries-power-query-76f93a6d-37d9-46b5-bc40-d5f2162401f5
- https://support.microsoft.com/en-us/office/get-started-with-power-pivot-in-microsoft-excel-fdfcf944-7876-424a-8437-1a6c1043a80b
- https://learn.microsoft.com/en-us/office/vba/language/reference/user-interface-help/code-window-general-use-keys
- https://learn.microsoft.com/en-us/office/vba/language/reference/user-interface-help/menu-shortcut-keys-available-in-the-code-window
- https://learn.microsoft.com/en-us/office/vba/language/reference/user-interface-help/global-keys

## Notes de recherche

- Version / plateforme: Excel desktop Windows pour Microsoft 365, Office 2024, Office 2021, Office 2019 et Office 2016 quand le raccourci est couvert par la documentation Microsoft.
- Badges proposes: 365, 2024, 2021.
- Couverture: selection issue de la documentation officielle Microsoft Excel pour Windows, completee avec les pages Microsoft Power Query, Power Pivot et Visual Basic Editor.
- Raccourcis Fn / touches F: `F2`, `F4`, `F5`, `F8`, `F9`, `F12`, `Shift` + `F3`, `Shift` + `F8`, `Alt` + `F8` et `Alt` + `F11` peuvent demander `Fn` selon le clavier. Sur portable sans touches `Home`/`End` dediees, `Ctrl` + `Home` et `Ctrl` + `End` correspondent souvent a `Ctrl` + `Fn` + `Left` et `Ctrl` + `Fn` + `Right`.
- VBA / detection: le Visual Basic Editor est heberge par `excel.exe`; Merken ne peut donc pas distinguer Excel et VBA par nom de processus seul. Les raccourcis VBA sont integres a la fiche Excel et doivent rester en Expert.
- Donnees avancees: la "gestion base de donnees" Excel correspond surtout aux tables, filtres, donnees externes, Power Query et Power Pivot. Les raccourcis directs utiles sont retenus; les longues sequences Ruban restent documentees mais non retenues.
- Raccourcis exclus: sequences Ruban longues (`Alt`, puis plusieurs lettres), commandes Power Query sans raccourci clavier stable, commandes Power Pivot destructives peu utiles en overlay.
- Risques: insertion/suppression de cellules, refresh de donnees externes, macros, VBA et Power Pivot peuvent modifier le classeur ou executer du code; a conserver en Avance/Expert avec libelles clairs.

## Inventaire complet

| Action source | Touches | Source | Selection Merken | Raison |
| --- | --- | --- | --- | --- |
| Nouveau classeur | `Ctrl` + `N` | Microsoft Excel shortcuts | Standard | Fichier courant. |
| Ouvrir | `Ctrl` + `O` | Microsoft Excel shortcuts | Standard | Fichier courant. |
| Enregistrer | `Ctrl` + `S` | Microsoft Excel shortcuts | Standard | Fichier courant. |
| Enregistrer sous | `F12` | Microsoft Excel shortcuts | Avance | Utile mais moins frequent. |
| Fermer classeur | `Ctrl` + `W` | Microsoft Excel shortcuts | Standard | Fichier courant. |
| Imprimer | `Ctrl` + `P` | Microsoft Excel shortcuts | Avance | Fichier courant mais moins frequent. |
| Recherche commande | `Alt` + `Q` | Microsoft Excel shortcuts | Avance | Acces aux commandes. |
| Copier / coller / couper | `Ctrl` + `C` / `V` / `X` | Microsoft Excel shortcuts | Standard | Edition courante. |
| Annuler / retablir | `Ctrl` + `Z` / `Y` | Microsoft Excel shortcuts | Standard | Edition courante. |
| Rechercher | `Ctrl` + `F` | Microsoft Excel shortcuts | Standard | Recherche courante. |
| Remplacer | `Ctrl` + `H` | Microsoft Excel shortcuts | Avance | Edition globale. |
| Gras / italique / souligne | `Ctrl` + `B` / `I` / `U` | Microsoft Excel shortcuts | Avance | Mise en forme utile mais secondaire dans Excel. |
| Format de cellule | `Ctrl` + `1` | Microsoft Excel shortcuts | Avance | Panneau central mais dense. |
| Modifier cellule | `F2` | Microsoft Excel shortcuts | Standard | Edition de cellule. |
| Nouvelle ligne cellule | `Alt` + `Enter` | Microsoft Excel shortcuts | Avance | Edition de cellule. |
| Atteindre | `Ctrl` + `G` | Microsoft Excel shortcuts | Standard | Navigation precise. |
| Debut feuille | `Ctrl` + `Home` | Microsoft Excel shortcuts | Avance | Navigation longue; variante portable souvent `Ctrl` + `Fn` + `Left`. |
| Derniere cellule utilisee | `Ctrl` + `End` | Microsoft Excel shortcuts | Avance | Navigation donnees; variante portable souvent `Ctrl` + `Fn` + `Right`. |
| Bord de region | `Ctrl` + `Arrow` | Microsoft Excel shortcuts | Standard | Navigation donnees. |
| Etendre selection | `Ctrl` + `Shift` + `Arrow` | Microsoft Excel shortcuts | Avance | Selection donnees. |
| Selectionner ligne | `Shift` + `Space` | Microsoft Excel shortcuts | Avance | Selection structurelle. |
| Selectionner colonne | `Ctrl` + `Space` | Microsoft Excel shortcuts | Avance | Selection structurelle. |
| Inserer cellules | `Ctrl` + `Shift` + `+` | Microsoft Excel shortcuts | Avance | Modifie la structure. |
| Supprimer cellules | `Ctrl` + `-` | Microsoft Excel shortcuts | Avance | Modifie la structure. |
| Feuille suivante | `Ctrl` + `PageDown` | Microsoft Excel shortcuts | Avance | Navigation classeur. |
| Feuille precedente | `Ctrl` + `PageUp` | Microsoft Excel shortcuts | Avance | Navigation classeur. |
| Somme automatique | `Alt` + `=` | Microsoft Excel shortcuts | Standard | Formule courante. |
| Inserer fonction | `Shift` + `F3` | Microsoft Excel shortcuts | Standard | Assistant formule. |
| Reference absolue | `F4` | Microsoft Excel shortcuts | Standard | Edition de formule. |
| Afficher formules | `Ctrl` + `` ` `` | Microsoft Excel shortcuts | Avance | Audit. |
| Recalculer | `F9` | Microsoft Excel shortcuts | Avance | Calcul. |
| Filtrer | `Ctrl` + `Shift` + `L` | Microsoft Excel shortcuts | Avance | Donnees. |
| Creer tableau | `Ctrl` + `T` | Microsoft Excel shortcuts | Standard | Donnees structurees. |
| Inserer date | `Ctrl` + `;` | Microsoft Excel shortcuts | Avance | Saisie de donnees. |
| Inserer heure | `Ctrl` + `Shift` + `;` | Microsoft Excel shortcuts | Avance | Saisie de donnees. |
| Copier formule du dessus | `Ctrl` + `'` | Microsoft Excel shortcuts | Avance | Formule rapide. |
| Collage special | `Ctrl` + `Alt` + `V` | Microsoft Excel shortcuts | Avance | Collage technique. |
| Calculer feuille active | `Shift` + `F9` | Microsoft Excel shortcuts | Expert | Calcul cible pour classeurs lourds. |
| Editeur VBA | `Alt` + `F11` | Microsoft Excel shortcuts | Expert | Developpement VBA. |
| Macros | `Alt` + `F8` | Microsoft Excel shortcuts | Expert | Execution/gestion de macros. |
| Ouvrir Power Query | `Alt` + `F12` | Microsoft Excel shortcuts / Power Query | Expert | Ouvre l editeur Power Query. |
| Arreter actualisation | `Esc` | Microsoft Excel shortcuts | Avance | Stoppe une actualisation de donnees externes. |
| Actualiser feuille | `Ctrl` + `F5` | Microsoft Excel shortcuts | Avance | Actualise les donnees externes de la feuille courante. |
| Actualiser tout | `Ctrl` + `Alt` + `F5` | Microsoft Excel shortcuts | Expert | Actualise toutes les connexions du classeur. |
| Power Pivot menu contextuel | `Shift` + `F10` | Microsoft Excel shortcuts / Power Pivot | Expert | Ouvre le menu de l element Power Pivot selectionne. |
| Power Pivot table entiere | `Ctrl` + `A` | Microsoft Excel shortcuts / Power Pivot | Expert | Selectionne la table Power Pivot. |
| Power Pivot colonne | `Ctrl` + `Space` | Microsoft Excel shortcuts / Power Pivot | Expert | Selectionne la colonne courante. |
| Power Pivot ligne | `Shift` + `Space` | Microsoft Excel shortcuts / Power Pivot | Expert | Selectionne la ligne courante. |
| VBA Object Browser | `F2` | Microsoft Learn VBA | Expert | Ouvre l explorateur d objets. |
| VBA proprietes | `F4` | Microsoft Learn VBA | Expert | Ouvre la fenetre Proprietes. |
| VBA executer | `F5` | Microsoft Learn VBA | Expert | Lance la procedure ou le UserForm. |
| VBA pas a pas | `F8` | Microsoft Learn VBA | Expert | Execute le code instruction par instruction. |
| VBA pas par-dessus | `Shift` + `F8` | Microsoft Learn VBA | Expert | Execute l appel courant sans entrer dedans. |
| VBA sortir procedure | `Ctrl` + `Shift` + `F8` | Microsoft Learn VBA | Expert | Termine la procedure courante et revient a l appelant. |
| VBA jusqu au curseur | `Ctrl` + `F8` | Microsoft Learn VBA | Expert | Execute jusqu a la ligne du curseur. |
| VBA point d arret | `F9` | Microsoft Learn VBA | Expert | Active ou retire un point d arret. |
| VBA effacer points d arret | `Ctrl` + `Shift` + `F9` | Microsoft Learn VBA | Expert | Supprime tous les points d arret. |
| VBA interrompre execution | `Ctrl` + `Break` | Microsoft Learn VBA | Expert | Stoppe l execution du code. |
| VBA fenetre Immediate | `Ctrl` + `G` | Microsoft Learn VBA | Expert | Ouvre la fenetre Immediate. |
| VBA explorateur projet | `Ctrl` + `R` | Microsoft Learn VBA | Expert | Ouvre l explorateur de projet. |
| VBA definition | `Shift` + `F2` | Microsoft Learn VBA | Expert | Va a la definition. |
| VBA derniere position | `Ctrl` + `Shift` + `F2` | Microsoft Learn VBA | Expert | Revient a la position precedente. |
| VBA liste proprietes | `Ctrl` + `J` | Microsoft Learn VBA | Expert | Affiche la liste proprietes/methodes. |
| VBA complete word | `Ctrl` + `Space` | Microsoft Learn VBA | Expert | Complete l identifiant courant. |
| VBA info rapide | `Ctrl` + `I` | Microsoft Learn VBA | Expert | Affiche l information rapide. |
| VBA info parametres | `Ctrl` + `Shift` + `I` | Microsoft Learn VBA | Expert | Affiche l aide des parametres. |
| VBA importer fichier | `Ctrl` + `M` | Microsoft Learn VBA | Expert | Importe un fichier dans le projet. |
| VBA exporter fichier | `Ctrl` + `E` | Microsoft Learn VBA | Expert | Exporte le module actif. |

## Francais

- ID: `excel-fr`
- Titre: Excel - Essentiels
- Applications: `excel.exe`

### General

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `general-nouveau-classeur` | Nouveau classeur | `Ctrl` + `N` | Cree un classeur. | Standard |
| `general-ouvrir` | Ouvrir | `Ctrl` + `O` | Ouvre un classeur. | Standard |
| `general-enregistrer` | Enregistrer | `Ctrl` + `S` | Enregistre le classeur. | Standard |
| `general-fermer` | Fermer | `Ctrl` + `W` | Ferme le classeur. | Standard |
| `general-imprimer` | Imprimer | `Ctrl` + `P` | Ouvre l impression. | Avance |
| `general-enregistrer-sous` | Enregistrer sous | `F12` | Ouvre Enregistrer sous. | Avance |
| `general-recherche-commande` | Recherche commande | `Alt` + `Q` | Recherche une commande. | Avance |

### Edition

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `edition-copier` | Copier | `Ctrl` + `C` | Copie la selection. | Standard |
| `edition-coller` | Coller | `Ctrl` + `V` | Colle la selection. | Standard |
| `edition-couper` | Couper | `Ctrl` + `X` | Coupe la selection. | Standard |
| `edition-annuler` | Annuler | `Ctrl` + `Z` | Annule l action recente. | Standard |
| `edition-retablir` | Retablir | `Ctrl` + `Y` | Retablit l action. | Standard |
| `edition-rechercher` | Rechercher | `Ctrl` + `F` | Recherche dans le classeur. | Standard |
| `edition-remplacer` | Remplacer | `Ctrl` + `H` | Ouvre le remplacement. | Avance |
| `edition-gras` | Gras | `Ctrl` + `B` | Active le gras. | Avance |
| `edition-italique` | Italique | `Ctrl` + `I` | Active l italique. | Avance |
| `edition-souligne` | Souligne | `Ctrl` + `U` | Active le souligne. | Avance |
| `edition-format-cellule` | Format cellule | `Ctrl` + `1` | Ouvre le format de cellule. | Avance |

### Cellules et navigation

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `cellules-modifier-cellule` | Modifier cellule | `F2` | Modifie la cellule active. | Standard |
| `cellules-nouvelle-ligne` | Nouvelle ligne | `Alt` + `Enter` | Insere un retour dans la cellule. | Avance |
| `cellules-atteindre` | Atteindre | `Ctrl` + `G` | Ouvre Atteindre. | Standard |
| `cellules-debut-feuille` | Debut feuille | `Ctrl` + `Home` | Va au debut de la feuille. Variante portable: `Ctrl` + `Fn` + `Left`. | Avance |
| `cellules-derniere-cellule` | Derniere cellule | `Ctrl` + `End` | Va a la derniere cellule utilisee. Variante portable: `Ctrl` + `Fn` + `Right`. | Avance |
| `cellules-bord-region` | Bord region | `Ctrl` + `Arrow` | Saute au bord des donnees. | Standard |
| `cellules-etendre-selection` | Etendre selection | `Ctrl` + `Shift` + `Arrow` | Etend la selection. | Avance |
| `cellules-selectionner-ligne` | Selectionner ligne | `Shift` + `Space` | Selectionne la ligne active. | Avance |
| `cellules-selectionner-colonne` | Selectionner colonne | `Ctrl` + `Space` | Selectionne la colonne active. | Avance |
| `cellules-inserer` | Inserer | `Ctrl` + `Shift` + `+` | Insere cellules, lignes ou colonnes. | Avance |
| `cellules-supprimer` | Supprimer | `Ctrl` + `-` | Supprime cellules, lignes ou colonnes. | Avance |
| `cellules-feuille-suivante` | Feuille suivante | `Ctrl` + `PageDown` | Passe a la feuille suivante. | Avance |
| `cellules-feuille-precedente` | Feuille precedente | `Ctrl` + `PageUp` | Revient a la feuille precedente. | Avance |

### Formules et donnees

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `formules-somme-automatique` | Somme automatique | `Alt` + `=` | Insere une somme. | Standard |
| `formules-inserer-fonction` | Inserer fonction | `Shift` + `F3` | Ouvre l assistant fonction. | Standard |
| `formules-reference-absolue` | Reference absolue | `F4` | Bascule les references. | Standard |
| `formules-afficher-formules` | Afficher formules | `Ctrl` + `` ` `` | Affiche ou masque les formules. | Avance |
| `formules-recalculer` | Recalculer | `F9` | Recalcule le classeur. | Avance |
| `formules-filtre` | Filtre | `Ctrl` + `Shift` + `L` | Active ou retire les filtres. | Avance |
| `formules-creer-tableau` | Creer tableau | `Ctrl` + `T` | Cree un tableau. | Standard |
| `formules-date` | Date | `Ctrl` + `;` | Insere la date courante. | Avance |
| `formules-heure` | Heure | `Ctrl` + `Shift` + `;` | Insere l heure courante. | Avance |
| `formules-copier-dessus` | Formule du dessus | `Ctrl` + `'` | Copie la formule de la cellule au-dessus. | Avance |
| `formules-collage-special` | Collage special | `Ctrl` + `Alt` + `V` | Ouvre le collage special. | Avance |
| `formules-calculer-feuille` | Calculer feuille | `Shift` + `F9` | Recalcule la feuille active. | Expert |
| `donnees-power-query` | Power Query | `Alt` + `F12` | Ouvre l editeur Power Query. | Expert |
| `donnees-arreter-actualisation` | Arreter actualisation | `Esc` | Stoppe une actualisation en cours. | Avance |
| `donnees-actualiser-feuille` | Actualiser feuille | `Ctrl` + `F5` | Actualise les donnees externes de la feuille. | Avance |
| `donnees-actualiser-tout` | Actualiser tout | `Ctrl` + `Alt` + `F5` | Actualise toutes les connexions du classeur. | Expert |
| `donnees-power-pivot-menu` | Power Pivot menu | `Shift` + `F10` | Ouvre le menu contextuel Power Pivot. | Expert |
| `donnees-power-pivot-table` | Power Pivot table | `Ctrl` + `A` | Selectionne la table Power Pivot. | Expert |
| `donnees-power-pivot-colonne` | Power Pivot colonne | `Ctrl` + `Space` | Selectionne la colonne Power Pivot. | Expert |
| `donnees-power-pivot-ligne` | Power Pivot ligne | `Shift` + `Space` | Selectionne la ligne Power Pivot. | Expert |

### VBA

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `vba-editeur` | Editeur VBA | `Alt` + `F11` | Ouvre ou revient a l editeur VBA. | Expert |
| `vba-macros` | Macros | `Alt` + `F8` | Ouvre la liste des macros. | Expert |
| `vba-explorateur-objets` | Explorateur objets | `F2` | Ouvre l explorateur d objets. | Expert |
| `vba-proprietes` | Proprietes | `F4` | Ouvre la fenetre Proprietes. | Expert |
| `vba-executer` | Executer | `F5` | Lance la procedure active. | Expert |
| `vba-pas-a-pas` | Pas a pas | `F8` | Execute l instruction suivante. | Expert |
| `vba-pas-par-dessus` | Pas par-dessus | `Shift` + `F8` | Execute l appel sans entrer dedans. | Expert |
| `vba-sortir-procedure` | Sortir procedure | `Ctrl` + `Shift` + `F8` | Termine la procedure courante. | Expert |
| `vba-jusqu-au-curseur` | Jusqu au curseur | `Ctrl` + `F8` | Execute jusqu a la ligne du curseur. | Expert |
| `vba-point-arret` | Point d arret | `F9` | Active ou retire un point d arret. | Expert |
| `vba-effacer-points-arret` | Effacer points d arret | `Ctrl` + `Shift` + `F9` | Supprime tous les points d arret. | Expert |
| `vba-interrompre` | Interrompre | `Ctrl` + `Break` | Stoppe l execution du code. | Expert |
| `vba-immediate` | Immediate | `Ctrl` + `G` | Ouvre la fenetre Immediate. | Expert |
| `vba-projet` | Projet | `Ctrl` + `R` | Ouvre l explorateur de projet. | Expert |
| `vba-definition` | Definition | `Shift` + `F2` | Va a la definition du symbole. | Expert |
| `vba-derniere-position` | Derniere position | `Ctrl` + `Shift` + `F2` | Revient a la position precedente. | Expert |
| `vba-liste-proprietes` | Liste proprietes | `Ctrl` + `J` | Affiche proprietes et methodes. | Expert |
| `vba-completion` | Completion | `Ctrl` + `Space` | Complete l identifiant courant. | Expert |
| `vba-info-rapide` | Info rapide | `Ctrl` + `I` | Affiche l information rapide. | Expert |
| `vba-info-parametres` | Info parametres | `Ctrl` + `Shift` + `I` | Affiche l aide des parametres. | Expert |
| `vba-importer` | Importer fichier | `Ctrl` + `M` | Importe un fichier dans le projet. | Expert |
| `vba-exporter` | Exporter fichier | `Ctrl` + `E` | Exporte le module actif. | Expert |

## English

- ID: `excel-en`
- Titre: Excel - Essentials
- Applications: `excel.exe`

### General

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `general-nouveau-classeur` | New workbook | `Ctrl` + `N` | Create a workbook. | Standard |
| `general-ouvrir` | Open | `Ctrl` + `O` | Open a workbook. | Standard |
| `general-enregistrer` | Save | `Ctrl` + `S` | Save the workbook. | Standard |
| `general-fermer` | Close workbook | `Ctrl` + `W` | Close the workbook. | Standard |
| `general-imprimer` | Print | `Ctrl` + `P` | Open print options. | Advanced |
| `general-enregistrer-sous` | Save as | `F12` | Open Save As. | Advanced |
| `general-recherche-commande` | Command search | `Alt` + `Q` | Search for a command. | Advanced |

### Editing

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `edition-copier` | Copy | `Ctrl` + `C` | Copy the selection. | Standard |
| `edition-coller` | Paste | `Ctrl` + `V` | Paste the selection. | Standard |
| `edition-couper` | Cut | `Ctrl` + `X` | Cut the selection. | Standard |
| `edition-annuler` | Undo | `Ctrl` + `Z` | Undo the latest action. | Standard |
| `edition-retablir` | Redo | `Ctrl` + `Y` | Redo the action. | Standard |
| `edition-rechercher` | Find | `Ctrl` + `F` | Search the workbook. | Standard |
| `edition-remplacer` | Replace | `Ctrl` + `H` | Open replace. | Advanced |
| `edition-gras` | Bold | `Ctrl` + `B` | Toggle bold. | Advanced |
| `edition-italique` | Italic | `Ctrl` + `I` | Toggle italic. | Advanced |
| `edition-souligne` | Underline | `Ctrl` + `U` | Toggle underline. | Advanced |
| `edition-format-cellule` | Format cell | `Ctrl` + `1` | Open cell formatting. | Advanced |

### Cells and navigation

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `cellules-modifier-cellule` | Edit cell | `F2` | Edit the active cell. | Standard |
| `cellules-nouvelle-ligne` | New line | `Alt` + `Enter` | Insert a line break in the cell. | Advanced |
| `cellules-atteindre` | Go to | `Ctrl` + `G` | Open Go To. | Standard |
| `cellules-debut-feuille` | Sheet start | `Ctrl` + `Home` | Go to the sheet start. Laptop variant: `Ctrl` + `Fn` + `Left`. | Advanced |
| `cellules-derniere-cellule` | Last cell | `Ctrl` + `End` | Go to the last used cell. Laptop variant: `Ctrl` + `Fn` + `Right`. | Advanced |
| `cellules-bord-region` | Region edge | `Ctrl` + `Arrow` | Jump to the data edge. | Standard |
| `cellules-etendre-selection` | Extend selection | `Ctrl` + `Shift` + `Arrow` | Extend selection. | Advanced |
| `cellules-selectionner-ligne` | Select row | `Shift` + `Space` | Select the active row. | Advanced |
| `cellules-selectionner-colonne` | Select column | `Ctrl` + `Space` | Select the active column. | Advanced |
| `cellules-inserer` | Insert | `Ctrl` + `Shift` + `+` | Insert cells, rows, or columns. | Advanced |
| `cellules-supprimer` | Delete | `Ctrl` + `-` | Delete cells, rows, or columns. | Advanced |
| `cellules-feuille-suivante` | Next sheet | `Ctrl` + `PageDown` | Move to the next sheet. | Advanced |
| `cellules-feuille-precedente` | Previous sheet | `Ctrl` + `PageUp` | Move to the previous sheet. | Advanced |

### Formulas and data

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `formules-somme-automatique` | AutoSum | `Alt` + `=` | Insert a sum. | Standard |
| `formules-inserer-fonction` | Insert function | `Shift` + `F3` | Open the function wizard. | Standard |
| `formules-reference-absolue` | Absolute reference | `F4` | Toggle references. | Standard |
| `formules-afficher-formules` | Show formulas | `Ctrl` + `` ` `` | Show or hide formulas. | Advanced |
| `formules-recalculer` | Calculate | `F9` | Recalculate the workbook. | Advanced |
| `formules-filtre` | Filter | `Ctrl` + `Shift` + `L` | Toggle filters. | Advanced |
| `formules-creer-tableau` | Create table | `Ctrl` + `T` | Create a table. | Standard |
| `formules-date` | Date | `Ctrl` + `;` | Insert the current date. | Advanced |
| `formules-heure` | Time | `Ctrl` + `Shift` + `;` | Insert the current time. | Advanced |
| `formules-copier-dessus` | Formula above | `Ctrl` + `'` | Copy the formula from the cell above. | Advanced |
| `formules-collage-special` | Paste special | `Ctrl` + `Alt` + `V` | Open Paste Special. | Advanced |
| `formules-calculer-feuille` | Calculate sheet | `Shift` + `F9` | Recalculate the active sheet. | Expert |
| `donnees-power-query` | Power Query | `Alt` + `F12` | Open the Power Query Editor. | Expert |
| `donnees-arreter-actualisation` | Stop refresh | `Esc` | Stop a running refresh. | Advanced |
| `donnees-actualiser-feuille` | Refresh sheet | `Ctrl` + `F5` | Refresh external data in the sheet. | Advanced |
| `donnees-actualiser-tout` | Refresh all | `Ctrl` + `Alt` + `F5` | Refresh all workbook connections. | Expert |
| `donnees-power-pivot-menu` | Power Pivot menu | `Shift` + `F10` | Open the Power Pivot context menu. | Expert |
| `donnees-power-pivot-table` | Power Pivot table | `Ctrl` + `A` | Select the Power Pivot table. | Expert |
| `donnees-power-pivot-colonne` | Power Pivot column | `Ctrl` + `Space` | Select the Power Pivot column. | Expert |
| `donnees-power-pivot-ligne` | Power Pivot row | `Shift` + `Space` | Select the Power Pivot row. | Expert |

### VBA

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `vba-editeur` | VBA editor | `Alt` + `F11` | Open or return to the VBA editor. | Expert |
| `vba-macros` | Macros | `Alt` + `F8` | Open the macro list. | Expert |
| `vba-explorateur-objets` | Object Browser | `F2` | Open the Object Browser. | Expert |
| `vba-proprietes` | Properties | `F4` | Open the Properties window. | Expert |
| `vba-executer` | Run | `F5` | Run the active procedure. | Expert |
| `vba-pas-a-pas` | Step into | `F8` | Execute the next statement. | Expert |
| `vba-pas-par-dessus` | Step over | `Shift` + `F8` | Execute the call without stepping into it. | Expert |
| `vba-sortir-procedure` | Step out | `Ctrl` + `Shift` + `F8` | Finish the current procedure. | Expert |
| `vba-jusqu-au-curseur` | Run to cursor | `Ctrl` + `F8` | Run to the cursor line. | Expert |
| `vba-point-arret` | Breakpoint | `F9` | Toggle a breakpoint. | Expert |
| `vba-effacer-points-arret` | Clear breakpoints | `Ctrl` + `Shift` + `F9` | Clear all breakpoints. | Expert |
| `vba-interrompre` | Break | `Ctrl` + `Break` | Stop code execution. | Expert |
| `vba-immediate` | Immediate | `Ctrl` + `G` | Open the Immediate window. | Expert |
| `vba-projet` | Project | `Ctrl` + `R` | Open Project Explorer. | Expert |
| `vba-definition` | Definition | `Shift` + `F2` | Go to the symbol definition. | Expert |
| `vba-derniere-position` | Last position | `Ctrl` + `Shift` + `F2` | Return to the previous position. | Expert |
| `vba-liste-proprietes` | Member list | `Ctrl` + `J` | Show properties and methods. | Expert |
| `vba-completion` | Complete word | `Ctrl` + `Space` | Complete the current identifier. | Expert |
| `vba-info-rapide` | Quick info | `Ctrl` + `I` | Show quick information. | Expert |
| `vba-info-parametres` | Parameter info | `Ctrl` + `Shift` + `I` | Show parameter help. | Expert |
| `vba-importer` | Import file | `Ctrl` + `M` | Import a file into the project. | Expert |
| `vba-exporter` | Export file | `Ctrl` + `E` | Export the active module. | Expert |
