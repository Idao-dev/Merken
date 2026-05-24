# Changelog

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
