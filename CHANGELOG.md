# Changelog

## 0.5.2 - 2026-05-28

### Change

- Clarification des fiches natives Windows avec un libelle `Win` dans les selecteurs et un badge compact dans la bibliotheque.
- Ajout de badges texte pour les navigateurs compatibles Edge, Chrome, Firefox et Brave.
- Ajout d'un avertissement court sur les fiches logicielles indiquant que les raccourcis modifies dans le logiciel ne sont pas detectes.
- Ajout d'un mode de messages de prevention configurable dans les options.
- Suppression de la fiche Parametres Windows et rattachement de `systemsettings.exe` a la fiche Windows.
- Ajout d'outils systeme Windows en niveau expert avec commande `Win` + `R`.
- Simplification des onglets d'options et renforcement de la lisibilite des boutons d'action.
- Agrandissement de la fenetre Options pour ameliorer la lecture des titres longs.
- Amelioration de la gestion des fenetres de raccourcis et de leur apercu dans les options.
- Equilibrage automatique des categories dans le panneau de raccourcis pour limiter les colonnes desequilibrees.
- Remplacement du texte de verification de mise a jour par un libelle generique pour le logiciel.

## 0.5.1 - 2026-05-27

### Change

- Ajout d'une confirmation avant la reinitialisation des options.
- Deplacement direct du panneau de raccourcis, avec sauvegarde de la position pour l'affichage normal.
- Amelioration des contrastes des textes secondaires de l'interface.
- Renforcement de la lisibilite des titres de cadres et des textes d'aide dans les options.
- Redimensionnement du panneau de raccourcis pour eviter que les zones transparentes bloquent les clics.
- Suppression des separateurs inutiles sous les raccourcis.
- Affichage de symboles clavier cibles pour les touches fonctionnelles, tout en conservant `Esc` en texte.

## 0.5.0 - 2026-05-25

### Ajoute

- Nouvelles fiches locales pour Windows, Explorateur de fichiers, Parametres, Photos, lecteur multimedia, Terminal/PowerShell, navigateurs, Excel, Word, PowerPoint, Outlook, Thunderbird, Obsidian et VLC.
- Affichage automatique de la fiche adaptee a l'application active, a partir d'une detection locale du nom de processus et du titre de fenetre.
- Niveaux d'affichage par fiche : standard, avance et expert.
- Personnalisation fine par theme ou par raccourci, avec apercu dans le panneau de raccourcis.
- Placement du panneau avec presets et ajustement manuel.
- Options reorganisees par onglets, avec langue, apparence, fiches, personnalisation, demarrage Windows, informations et mises a jour.
- Verification manuelle des mises a jour via GitHub Releases pour l'installateur, et lien vers la derniere release pour la version portable.

### Change

- Les fiches de raccourcis sont stockees par famille applicative pour faciliter la relecture, les contributions et l'ajout de nouveaux logiciels.
- La publication Windows s'appuie sur une draft release GitHub generee par CI a chaque tag `v*.*.*`.

### Securite

- Ajout d'une Content Security Policy Tauri restrictive.
- Echappement des valeurs dynamiques rendues dans le HTML.
- Validation stricte des reglages charges depuis `localStorage`.
- Reduction des permissions Tauri exposees a la fenetre de raccourcis.
- Mise a jour patch des plugins Tauri process et updater.
