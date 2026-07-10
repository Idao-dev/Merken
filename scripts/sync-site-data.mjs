import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const repoRoot = resolve(process.argv[2] ?? "../Merken");
const sheetsDir = join(repoRoot, "src", "data", "shortcut-sheets");

const familyOrder = [
  "windows-core",
  "file-explorer",
  "photos",
  "media-player",
  "cmd",
  "powershell",
  "browsers",
  "excel",
  "word",
  "powerpoint",
  "outlook",
  "thunderbird",
  "obsidian",
  "vlc"
];

const labels = {
  en: new Map([
    ["windows-core", "Windows"],
    ["file-explorer", "File Explorer"],
    ["photos", "Photos"],
    ["media-player", "Media Player"],
    ["cmd", "Command Prompt"],
    ["powershell", "PowerShell"],
    ["browsers", "Browsers"],
    ["excel", "Excel"],
    ["word", "Word"],
    ["powerpoint", "PowerPoint"],
    ["outlook", "Outlook"],
    ["thunderbird", "Thunderbird"],
    ["obsidian", "Obsidian"],
    ["vlc", "VLC"]
  ]),
  fr: new Map([
    ["windows-core", "Windows"],
    ["file-explorer", "Explorateur"],
    ["photos", "Photos"],
    ["media-player", "Lecteur multimedia"],
    ["cmd", "Invite de commandes"],
    ["powershell", "PowerShell"],
    ["browsers", "Navigateurs"],
    ["excel", "Excel"],
    ["word", "Word"],
    ["powerpoint", "PowerPoint"],
    ["outlook", "Outlook"],
    ["thunderbird", "Thunderbird"],
    ["obsidian", "Obsidian"],
    ["vlc", "VLC"]
  ])
};

const logoPaths = new Map([
  ["windows-core", "logos/windows-core.svg"],
  ["file-explorer", "logos/file-explorer.svg"],
  ["photos", "logos/photos.svg"],
  ["media-player", "logos/media-player.svg"],
  ["cmd", "logos/cmd.svg"],
  ["powershell", "logos/powershell.svg"],
  ["browsers", "logos/browsers.svg"],
  ["excel", "logos/excel.svg"],
  ["word", "logos/word.svg"],
  ["powerpoint", "logos/powerpoint.svg"],
  ["outlook", "logos/outlook.svg"],
  ["thunderbird", "logos/thunderbird.svg"],
  ["obsidian", "logos/obsidian.svg"],
  ["vlc", "logos/vlc.svg"]
]);

const accents = new Map([
  ["windows-core", "#39b6e8"],
  ["file-explorer", "#f6c84c"],
  ["photos", "#5cc8ff"],
  ["media-player", "#ff6f61"],
  ["cmd", "#7ddc8a"],
  ["powershell", "#61b0ff"],
  ["browsers", "#f5b44f"],
  ["excel", "#33c481"],
  ["word", "#5b8dff"],
  ["powerpoint", "#ff7a45"],
  ["outlook", "#4db4ff"],
  ["thunderbird", "#5f9cff"],
  ["obsidian", "#9d7cff"],
  ["vlc", "#ff9f2f"]
]);

function familyFromId(id) {
  return id.replace(/-(fr|en|es|de|pt|it)$/, "");
}

function normalizeSheet(sheet) {
  const family = familyFromId(sheet.id);
  const categories = sheet.categories
    .map((category) => ({
      id: category.id,
      title: category.title,
      shortcuts: category.shortcuts
        .filter((shortcut) => shortcut.level === "standard")
        .sort((left, right) => left.priority - right.priority)
        .slice(0, 6)
        .map((shortcut) => ({
          id: shortcut.id,
          label: shortcut.label,
          keys: shortcut.keysByLayout?.AZERTY ?? shortcut.keys
        }))
    }))
    .filter((category) => category.shortcuts.length > 0)
    .slice(0, 3);

  return {
    family,
    label: labels[sheet.language].get(family) ?? sheet.title,
    logoPath: logoPaths.get(family) ?? "",
    accent: accents.get(family) ?? "#67d2ff",
    categories
  };
}

const sheets = readdirSync(sheetsDir)
  .filter((fileName) => fileName.endsWith(".json"))
  .flatMap((fileName) => JSON.parse(readFileSync(join(sheetsDir, fileName), "utf8")))
  .filter((sheet) => sheet.language === "en" || sheet.language === "fr");

const siteSoftwareByLanguage = {};
const siteStatsByLanguage = {};

for (const language of ["en", "fr"]) {
  const byFamily = new Map(
    sheets.filter((sheet) => sheet.language === language).map((sheet) => [familyFromId(sheet.id), sheet])
  );
  const software = familyOrder.filter((family) => byFamily.has(family)).map((family) => normalizeSheet(byFamily.get(family)));
  const shortcutCount = software.reduce(
    (count, sheet) => count + sheet.categories.reduce((categoryCount, category) => categoryCount + category.shortcuts.length, 0),
    0
  );

  siteSoftwareByLanguage[language] = software;
  siteStatsByLanguage[language] = { softwareCount: software.length, shortcutCount };
}

const generatedDir = join(process.cwd(), "src", "generated");
mkdirSync(generatedDir, { recursive: true });
writeFileSync(
  join(generatedDir, "site-data.ts"),
  `export interface SiteShortcut {
  id: string;
  label: string;
  keys: string[];
}

export interface SiteShortcutCategory {
  id: string;
  title: string;
  shortcuts: SiteShortcut[];
}

export interface SiteSoftware {
  family: string;
  label: string;
  logoPath: string;
  accent: string;
  categories: SiteShortcutCategory[];
}

export type SiteLanguage = "en" | "fr";

export const siteStatsByLanguage = ${JSON.stringify(siteStatsByLanguage, null, 2)} satisfies Record<SiteLanguage, { softwareCount: number; shortcutCount: number }>;

export const siteSoftwareByLanguage = ${JSON.stringify(siteSoftwareByLanguage, null, 2)} satisfies Record<SiteLanguage, SiteSoftware[]>;
`
);
