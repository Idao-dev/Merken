export interface SiteRelease {
  version: string;
  tag: string;
  releaseUrl: string;
  installerUrl: string;
  portableUrl: string;
  notes: string;
}

export const siteRelease = {
  "version": "0.5.4",
  "tag": "v0.5.4",
  "releaseUrl": "https://github.com/Idao-dev/Merken/releases/tag/v0.5.4",
  "installerUrl": "https://github.com/Idao-dev/Merken/releases/latest/download/Merken-setup.exe",
  "portableUrl": "https://github.com/Idao-dev/Merken/releases/latest/download/merken.exe",
  "notes": "Consultez la release GitHub pour les changements et les fichiers disponibles."
} satisfies SiteRelease;
