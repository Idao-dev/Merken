import "./styles.css";
import { siteSoftwareByLanguage, siteStatsByLanguage, type SiteLanguage, type SiteSoftware } from "./generated/site-data";
import { siteRelease } from "./generated/site-release";
import { siteCopy } from "./i18n";

const repositoryUrl = "https://github.com/Idao-dev/Merken";
const assetBaseUrl = import.meta.env.BASE_URL;
const iconUrl = `${assetBaseUrl}merken-icon.png`;

const appRoot = document.querySelector<HTMLDivElement>("#app");

if (!appRoot) {
  throw new Error("App root was not found.");
}

const app = appRoot;
const languageStorageKey = "merken.siteLanguage";

let activeIndex = 0;
const selectedShortcutIds = new Map<string, Set<string>>();
let pauseTimer: number | null = null;
let changedShortcutId: string | null = null;
let interactionAnnouncement = "";
let currentLanguage = loadSiteLanguage();

function loadSiteLanguage(): SiteLanguage {
  try {
    return window.localStorage.getItem(languageStorageKey) === "fr" ? "fr" : "en";
  } catch {
    return "en";
  }
}

function saveSiteLanguage(language: SiteLanguage): void {
  try {
    window.localStorage.setItem(languageStorageKey, language);
  } catch {
    // The page remains usable when storage is unavailable.
  }
}

function activeSoftwareList(): SiteSoftware[] {
  return siteSoftwareByLanguage[currentLanguage];
}

function selectionKey(software: SiteSoftware): string {
  return `${currentLanguage}:${software.family}`;
}

function softwareLogoUrl(software: SiteSoftware): string {
  return `${assetBaseUrl}${software.logoPath}`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function defaultSelectedShortcuts(software: SiteSoftware): Set<string> {
  return new Set(software.categories.flatMap((category) => category.shortcuts.slice(0, 4).map((shortcut) => shortcut.id)));
}

function selectedShortcuts(software: SiteSoftware): Set<string> {
  const key = selectionKey(software);
  const existing = selectedShortcutIds.get(key);

  if (existing) {
    return existing;
  }

  const selected = defaultSelectedShortcuts(software);
  selectedShortcutIds.set(key, selected);

  return selected;
}

function renderLogoRailItem(software: SiteSoftware, index: number): string {
  return `
    <button class="logo-pill ${index === activeIndex ? "is-active" : ""}" type="button" data-software-index="${index}" style="--accent: ${software.accent}">
      <span class="logo-frame">
        <img src="${softwareLogoUrl(software)}" alt="" loading="lazy" onerror="this.dataset.failed='true'" />
      </span>
      <span>${software.label}</span>
    </button>
  `;
}

function renderLogoRail(softwareList: SiteSoftware[], copy: typeof siteCopy.en): string {
  const items = softwareList.map((software, index) => renderLogoRailItem(software, index)).join("");

  return `
    <div class="logo-rail" aria-label="${copy.softwareRailLabel}">
      <div class="logo-track">
        <div class="logo-track-set">${items}</div>
        <div class="logo-track-set" aria-hidden="true">${items}</div>
      </div>
    </div>
  `;
}

function renderKeys(keys: string[]): string {
  return keys.map((key) => `<span class="key">${key}</span>`).join("");
}

function renderShortcutPanel(software: SiteSoftware, copy: typeof siteCopy.en): string {
  const selected = selectedShortcuts(software);
  const categories = software.categories
    .map((category) => {
      const shortcuts = category.shortcuts.filter((shortcut) => selected.has(shortcut.id)).slice(0, 6);

      if (shortcuts.length === 0) {
        return "";
      }

      return `
        <section class="shortcut-category">
          <h3>${category.title}</h3>
          ${shortcuts
            .map(
              (shortcut) => `
                <div class="shortcut-row">
                  <span class="shortcut-keys">${renderKeys(shortcut.keys)}</span>
                  <span class="shortcut-label">${shortcut.label}</span>
                </div>
              `
            )
            .join("")}
        </section>
      `;
    })
    .join("");

  return `
    <div class="floating-panel" style="--accent: ${software.accent}">
        <div class="panel-title">
          <span class="logo-frame small"><img src="${softwareLogoUrl(software)}" alt="" onerror="this.dataset.failed='true'" /><span class="logo-fallback">${software.label.slice(0, 2)}</span></span>
          <span>${software.label}</span>
        </div>
      ${categories || `<p class="empty-state">${copy.emptyCustomization}</p>`}
    </div>
  `;
}

function renderHeroPreview(softwareList: SiteSoftware[], copy: typeof siteCopy.en): string {
  const previewSoftware = softwareList[0] ?? softwareList[activeIndex];
  const previewShortcuts = previewSoftware.categories.flatMap((category) => category.shortcuts.slice(0, 3)).slice(0, 6);

  return `
    <aside class="hero-preview" aria-label="${copy.previewLabel}">
      <div class="hero-preview-panel" style="--accent: ${previewSoftware.accent}">
        <div class="panel-title">
          <span class="logo-frame small"><img src="${softwareLogoUrl(previewSoftware)}" alt="" onerror="this.dataset.failed='true'" /><span class="logo-fallback">${previewSoftware.label.slice(0, 2)}</span></span>
          <span>${previewSoftware.label}</span>
        </div>
        ${previewShortcuts
          .map(
            (shortcut) => `
              <div class="shortcut-row compact">
                <span class="shortcut-keys">${renderKeys(shortcut.keys)}</span>
                <span class="shortcut-label">${shortcut.label}</span>
              </div>
            `
          )
          .join("")}
      </div>
    </aside>
  `;
}

function renderDownloadCards(copy: typeof siteCopy.en): string {
  return `
    <div class="download-cards" id="download" aria-label="${copy.downloadEyebrow}">
      <article class="os-card is-available">
        <div>
          <p class="os-status">${copy.available}</p>
          <h2>Windows</h2>
          <p class="os-meta">Version ${escapeHtml(siteRelease.version)} · Windows x64</p>
        </div>
        <div class="os-actions">
          <a class="button primary" href="${siteRelease.installerUrl}">${copy.installer}</a>
          <a class="button secondary" href="${siteRelease.portableUrl}">${copy.portable}</a>
          <a class="button text-link" href="${siteRelease.releaseUrl}">${copy.releaseNotes}</a>
          <a class="button text-link" href="https://github.com/Idao-dev/Merken/releases">${copy.allReleases}</a>
        </div>
      </article>
      <article class="os-card is-coming">
        <p class="os-status">${copy.comingSoon}</p>
        <h2>macOS</h2>
        <span>${copy.unavailable}</span>
      </article>
      <article class="os-card is-coming">
        <p class="os-status">${copy.comingSoon}</p>
        <h2>Linux</h2>
        <span>${copy.unavailable}</span>
      </article>
    </div>
  `;
}

function renderCustomizer(software: SiteSoftware, copy: typeof siteCopy.en): string {
  const selected = selectedShortcuts(software);

  return `
    <div class="customizer" style="--accent: ${software.accent}">
      <div class="customizer-head">
        <span>${copy.customization}</span>
        <strong>${software.label}</strong>
      </div>
      <div class="customizer-list">
        ${software.categories
          .map(
            (category) => `
              <section class="customizer-category">
                <h3>${category.title}</h3>
                ${category.shortcuts
                  .map(
                    (shortcut) => `
                      <label class="customizer-row ${shortcut.id === changedShortcutId ? "is-updated" : ""}">
                        <input type="checkbox" data-shortcut-id="${shortcut.id}" ${selected.has(shortcut.id) ? "checked" : ""} />
                        <span class="checkbox-visual" aria-hidden="true"></span>
                        <span class="shortcut-keys">${renderKeys(shortcut.keys)}</span>
                        <span>${shortcut.label}</span>
                      </label>
                    `
                  )
                  .join("")}
              </section>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderApp(): void {
  const copy = siteCopy[currentLanguage];
  const softwareList = activeSoftwareList();
  const activeSoftware = softwareList[activeIndex] ?? softwareList[0];
  const stats = siteStatsByLanguage[currentLanguage];
  document.documentElement.lang = currentLanguage;

  app.innerHTML = `
    <header class="topbar">
      <a class="brand" href="#top" aria-label="Merken">
        <span class="brand-mark" aria-hidden="true">
          <img src="${iconUrl}" alt="" />
        </span>
        <span>Merken</span>
      </a>
      <nav class="nav" aria-label="${copy.navigationLabel}">
        <a href="#software">${copy.softwareNav}</a>
        <a href="#demo">${copy.demoNav}</a>
        <a href="${repositoryUrl}" target="_blank" rel="noreferrer">${copy.projectNav}</a>
        <label class="language-switcher">
          <span class="sr-only">${copy.languageLabel}</span>
          <select data-language-select aria-label="${copy.languageLabel}">
            <option value="en" ${currentLanguage === "en" ? "selected" : ""}>English</option>
            <option value="fr" ${currentLanguage === "fr" ? "selected" : ""}>Français</option>
          </select>
        </label>
      </nav>
    </header>

    <main id="top" class="page-layout">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">${copy.heroEyebrow}</p>
          <h1>${copy.heroTitle}</h1>
          <p class="hero-lead">${copy.heroLead}</p>
          <div class="stats" aria-label="${copy.statsSoftware}, ${copy.statsShortcuts}">
            <strong>${stats.softwareCount}</strong><span>${copy.statsSoftware}</span>
            <strong>${stats.shortcutCount}</strong><span>${copy.statsShortcuts}</span>
          </div>
        </div>
        ${renderHeroPreview(softwareList, copy)}
      </section>

      <section class="software-band" id="software">
        <div class="section-heading">
          <p class="eyebrow">${copy.supportedSoftwareEyebrow}</p>
          <h2>${copy.supportedSoftwareTitle}</h2>
        </div>
        ${renderLogoRail(softwareList, copy)}
      </section>

      <section class="demo" id="demo">
        <div class="demo-heading">
          <p class="eyebrow">${copy.demoEyebrow}</p>
          <h2>${activeSoftware.label}</h2>
          <p>${copy.demoInstruction}</p>
        </div>
        <div class="demo-grid">
          ${renderShortcutPanel(activeSoftware, copy)}
          ${renderCustomizer(activeSoftware, copy)}
        </div>
        <p class="interaction-status" aria-live="polite">${interactionAnnouncement}</p>
      </section>

      <section class="download-section" aria-labelledby="download-title">
        <div class="download-heading">
          <p class="eyebrow">${copy.downloadEyebrow}</p>
          <h2 id="download-title">${copy.downloadTitle}</h2>
          <p>${copy.downloadLead} <strong>${escapeHtml(siteRelease.tag)}</strong>.</p>
          <p class="release-notes">${copy.releaseSummary}</p>
        </div>
        ${renderDownloadCards(copy)}
      </section>

    </main>

    <footer class="footer">
      <span>${copy.footerNotice}</span>
      <a href="${repositoryUrl}">${copy.github}</a>
      <a href="${repositoryUrl}/blob/main/LICENSE.md">${copy.license}</a>
    </footer>
  `;

  bindInteractions();
}

function pauseLogoRail(): void {
  app.classList.add("is-rail-paused");

  if (pauseTimer) {
    window.clearTimeout(pauseTimer);
  }

  pauseTimer = window.setTimeout(() => {
    app.classList.remove("is-rail-paused");
    pauseTimer = null;
  }, 10_000);
}

function bindInteractions(): void {
  const languageSelect = app.querySelector<HTMLSelectElement>("[data-language-select]");
  languageSelect?.addEventListener("change", () => {
    currentLanguage = languageSelect.value === "fr" ? "fr" : "en";
    saveSiteLanguage(currentLanguage);
    changedShortcutId = null;
    interactionAnnouncement = "";
    renderApp();
  });

  for (const button of app.querySelectorAll<HTMLButtonElement>("[data-software-index]")) {
    button.addEventListener("click", () => {
      activeIndex = Number(button.dataset.softwareIndex ?? 0);
      changedShortcutId = null;
      interactionAnnouncement = "";
      pauseLogoRail();
      renderApp();
      app.classList.add("is-rail-paused");
    });
  }

  for (const checkbox of app.querySelectorAll<HTMLInputElement>("[data-shortcut-id]")) {
    checkbox.addEventListener("change", () => {
      const softwareList = activeSoftwareList();
      const activeSoftware = softwareList[activeIndex] ?? softwareList[0];
      const selected = selectedShortcuts(activeSoftware);
      const shortcutId = checkbox.dataset.shortcutId;

      if (!shortcutId) {
        return;
      }

      if (checkbox.checked) {
        selected.add(shortcutId);
        interactionAnnouncement = siteCopy[currentLanguage].shortcutAdded;
      } else {
        selected.delete(shortcutId);
        interactionAnnouncement = siteCopy[currentLanguage].shortcutRemoved;
      }

      changedShortcutId = shortcutId;
      renderApp();
      window.setTimeout(() => {
        changedShortcutId = null;
        renderApp();
      }, 700);
    });
  }
}

renderApp();
