export interface SiteRelease {
  version: string;
  tag: string;
  releaseUrl: string;
  installerUrl: string;
  portableUrl: string;
  notes: string;
}

export const siteRelease = {
  "installerUrl": "https://github.com/Idao-dev/Merken/releases/latest/download/Merken-setup.exe",
  "notes": "## Français\r\n\r\n### Nouveautés\r\n\r\n- Ajout d'un véritable thème clair.\r\n- Ajout de l'option indépendante « Renforcer les contrastes » pour les thèmes sombre et clair.\r\n- Remplacement des paliers de transparence par un curseur continu de 0 % à 100 %, sans rendre les textes ni les contrôles transparents.\r\n- Séparation de l'ancienne fiche Terminal/PowerShell en deux fiches dédiées : Invite de commandes et PowerShell.\r\n- Ajout de commandes copiables, de raccourcis d'historique et d'avertissements pour les commandes risquées dans les fiches CMD et PowerShell.\r\n\r\n### Améliorations et corrections\r\n\r\n- Meilleure détection de `cmd.exe`, `powershell.exe`, `pwsh.exe` et des profils explicites ouverts dans Windows Terminal.\r\n- Ajout des commandes `Win` + `R` pour ouvrir CMD, Windows PowerShell et PowerShell 7 depuis la fiche Windows.\r\n- Migration automatique de l'ancien thème daltonien vers le thème sombre avec contraste renforcé.\r\n- Migration automatique des anciens paliers de transparence et des préférences Terminal/PowerShell.\r\n- Fiabilisation du redimensionnement des fenêtres Tauri et des contrôles de mise à jour.\r\n- Désactivation des actions de mise à jour pendant une vérification ou une installation déjà en cours.\r\n- Documentation du dépôt simplifiée et contrat de licence de l'installateur déplacé dans son dossier dédié.\r\n- Page de présentation bilingue synchronisée automatiquement après publication de la release.\r\n\r\n## English\r\n\r\n### What's new\r\n\r\n- Added a complete light theme.\r\n- Added an independent “Enhance contrast” option for both dark and light themes.\r\n- Replaced transparency presets with a continuous 0% to 100% slider while keeping text and controls fully opaque.\r\n- Split the former Terminal/PowerShell sheet into dedicated Command Prompt and PowerShell sheets.\r\n- Added copyable commands, history shortcuts, and warnings for risky commands to the CMD and PowerShell sheets.\r\n\r\n### Improvements and fixes\r\n\r\n- Improved detection of `cmd.exe`, `powershell.exe`, `pwsh.exe`, and explicit profiles opened in Windows Terminal.\r\n- Added `Win` + `R` commands for opening CMD, Windows PowerShell, and PowerShell 7 from the Windows sheet.\r\n- Automatically migrates the former colorblind theme to the enhanced-contrast dark theme.\r\n- Automatically migrates former transparency presets and Terminal/PowerShell preferences.\r\n- Improved reliability of Tauri window resizing and update controls.\r\n- Disabled update actions while a check or installation is already running.\r\n- Simplified repository documentation and moved the installer license into its dedicated folder.\r\n- The bilingual presentation site is synchronized automatically after the release is published.\r\n",
  "releaseUrl": "https://github.com/Idao-dev/Merken/releases/tag/v0.6.0",
  "tag": "v0.6.0",
  "version": "0.6.0",
  "portableUrl": "https://github.com/Idao-dev/Merken/releases/latest/download/merken.exe"
} satisfies SiteRelease;
