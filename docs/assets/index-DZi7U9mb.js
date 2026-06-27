(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const n="https://github.com/Idao-dev/Merken/releases/latest",t="https://github.com/Idao-dev/Merken";document.querySelector("#app").innerHTML=`
  <header class="topbar">
    <a class="brand" href="#top" aria-label="Merken">
      <span class="brand-mark" aria-hidden="true">⌘</span>
      <span>Merken</span>
    </a>
    <nav class="nav" aria-label="Navigation principale">
      <a href="#features">Fonctions</a>
      <a href="#screens">Apercu</a>
      <a href="#download">Telecharger</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Application Windows locale</p>
        <h1>Les raccourcis utiles, toujours sous la main.</h1>
        <p class="hero-lead">
          Merken affiche un panneau flottant de raccourcis clavier adapte a Windows et aux logiciels courants.
          Sans compte, sans telemetrie, sans connexion obligatoire.
        </p>
        <div class="actions" aria-label="Actions principales">
          <a class="button primary" href="${n}">Telecharger</a>
          <a class="button secondary" href="${t}">Voir le code</a>
        </div>
      </div>
      <figure class="hero-visual">
        <img
          src="/screenshots/shortcuts-panel.png"
          alt="Panneau flottant Merken listant des raccourcis clavier Windows"
        />
      </figure>
    </section>

    <section class="feature-band" id="features">
      <div class="section-heading">
        <p class="eyebrow">Concu pour rester discret</p>
        <h2>Un aide-memoire local, lisible et contextuel.</h2>
      </div>
      <div class="feature-grid">
        <article>
          <h3>Fiches integrees</h3>
          <p>Windows, Explorateur, navigateurs, Office, Thunderbird, Obsidian, VLC et d'autres fiches courantes.</p>
        </article>
        <article>
          <h3>Detection contextuelle</h3>
          <p>Merken peut choisir la fiche selon le processus actif et le titre de la fenetre.</p>
        </article>
        <article>
          <h3>Personnalisation</h3>
          <p>Choisissez les niveaux, themes et raccourcis qui restent vraiment utiles au quotidien.</p>
        </article>
        <article>
          <h3>Respectueux par defaut</h3>
          <p>Les donnees sont locales. L'application ne demande ni compte utilisateur ni telemetrie.</p>
        </article>
      </div>
    </section>

    <section class="showcase" id="screens">
      <div class="showcase-copy">
        <p class="eyebrow">Apercu</p>
        <h2>Un panneau flottant et des reglages clairs.</h2>
        <p>
          Le panneau peut afficher les raccourcis essentiels ou avances. Les reglages permettent d'adapter la langue,
          l'apparence, les fiches et les raccourcis personnalises.
        </p>
      </div>
      <div class="screen-grid">
        <figure>
          <img src="/screenshots/sheets-settings.png" alt="Reglages des fiches Merken avec panneau de raccourcis" />
        </figure>
        <figure>
          <img src="/screenshots/customization.png" alt="Ecran de personnalisation des raccourcis Merken" />
        </figure>
      </div>
    </section>

    <section class="download" id="download">
      <div>
        <p class="eyebrow">Distribution</p>
        <h2>Installeur Windows ou version portable.</h2>
        <p>
          La derniere version stable est publiee dans les releases GitHub du projet. Merken reste independant
          des editeurs des logiciels mentionnes.
        </p>
      </div>
      <a class="button primary" href="${n}">Ouvrir les releases</a>
    </section>
  </main>

  <footer class="footer">
    <span>Merken est un projet independant.</span>
    <a href="${t}">GitHub</a>
    <a href="${t}/blob/main/LICENSE.md">Licence</a>
  </footer>
`;
