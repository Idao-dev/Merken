# Phases de developpement

## Lot 0 - Socle et POC technique

- Creer le socle Tauri/Vite.
- Valider l'icone tray Windows.
- Afficher et masquer un panneau flottant sans bordure.
- Tester l'autostart.
- Lire l'application active avec une couche Rust native.

## Lot 1 - MVP Windows

- Afficher la fiche Windows FR/EN hors-ligne.
- Ajouter les options de base par onglets : langue immediate, taille, transparence du panneau, theme, mode de fiche.
- Ajouter les options de fin de MVP : demarrage avec Windows, onglet A propos et ligne de mise a jour non connectee.
- Agrandir la fenetre Options, permettre son deplacement et ajouter le placement du panneau de raccourcis par presets ou ajustement manuel.
- Produire un installateur Windows unique.
- Verifier le comportement au demarrage et la desinstallation.

## Lot 1.5 - Mises a jour applicatives

- Preparer le depot GitHub public ou prive selon le choix de diffusion.
- Ajouter une publication de versions avec tags Git, GitHub Actions et GitHub Releases.
- Integrer le plugin de mise a jour Tauri pour verifier manuellement l'existence d'une nouvelle version.
- Ajouter dans les options une ligne "Mise a jour" avec etat clair : a jour, verification impossible, nouvelle version disponible.
- Si une version est disponible, permettre a l'utilisateur de lancer le telechargement et l'installation en un clic.
- Garder la verification volontaire et transparente : pas de compte, pas de telemetrie, pas de telechargement automatique silencieux.

## Lot 2 - Contextualisation

- Mapper les processus Office vers leurs fiches.
- Ajouter Word, Excel, PowerPoint et Outlook en priorite.
- Fournir les fiches FR/EN pour les familles Windows, Excel, Word, PowerPoint et Outlook.
- Preparer l'interface de selection des fiches par logiciel sans activer encore la persistance fine.
- Ajouter le fallback manuel si la detection echoue.

## Lot 3 - Personnalisation avancee

- Ajouter le mode expert.
- Completer les langues prevues.
- Adapter les variantes clavier/OS.

## Lot 4 - macOS et Linux

- Porter la logique tray vers la barre de menus macOS.
- Adapter le rendu visuel macOS.
- Tester KDE Plasma puis GNOME avec AppIndicator cote Linux.
