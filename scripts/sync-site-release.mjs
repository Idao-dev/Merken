import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const metadataPath = process.argv[2];
const defaultTag = "v0.5.4";
const defaultMetadata = {
  version: defaultTag.replace(/^v/, ""),
  tag: defaultTag,
  releaseUrl: `https://github.com/Idao-dev/Merken/releases/tag/${defaultTag}`,
  installerUrl: "https://github.com/Idao-dev/Merken/releases/latest/download/Merken-setup.exe",
  portableUrl: "https://github.com/Idao-dev/Merken/releases/latest/download/merken.exe",
  notes: "Consultez la release GitHub pour les changements et les fichiers disponibles."
};

const metadata = metadataPath
  ? JSON.parse(readFileSync(metadataPath, "utf8").replace(/^\uFEFF/, ""))
  : defaultMetadata;
const generatedDir = join(process.cwd(), "src", "generated");

mkdirSync(generatedDir, { recursive: true });
writeFileSync(
  join(generatedDir, "site-release.ts"),
  `export interface SiteRelease {\n  version: string;\n  tag: string;\n  releaseUrl: string;\n  installerUrl: string;\n  portableUrl: string;\n  notes: string;\n}\n\nexport const siteRelease = ${JSON.stringify(metadata, null, 2)} satisfies SiteRelease;\n`
);
