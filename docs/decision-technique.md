# Decision technique initiale

## Choix recommande

Merken demarre avec Tauri 2, Rust et une interface TypeScript/Vite sans framework lourd.

Ce choix vise le meilleur compromis pour le MVP Windows :

- application de bureau legere ;
- icone de zone de notification ;
- fenetre flottante sans chrome ;
- autostart via plugin officiel ;
- mises a jour via plugin officiel et GitHub Releases ;
- packaging Windows en installateur ;
- trajectoire possible vers macOS et Linux.

## Alternatives

- Avalonia/.NET : solide pour le rendu desktop et les effets de transparence, a conserver comme option de secours si le POC Tauri bloque sur le comportement du panneau.
- Electron : capable fonctionnellement, mais moins adapte au critere de faible consommation.

## Points de vigilance

- Le clic exact sur la fleche des icones cachees Windows n'est pas garanti. Le comportement cible garanti est le clic sur l'icone Merken.
- Le rendu glassmorphism dependra de Windows, WebView2 et des capacites graphiques.
- La detection d'application active doit rester locale et minimale : nom de processus et titre de fenetre, sans journalisation ni telemetrie.
- La verification de mise a jour introduira un acces reseau volontaire vers GitHub Releases. Elle doit etre declenchee par l'utilisateur tant qu'aucune option automatique explicite n'existe.
- L'ouverture exacte du panneau en meme temps que la fleche Windows des icones cachees n'est pas garantie par une API publique stable. Le comportement fiable retenu est le clic gauche sur l'icone Merken, avec fermeture sur perte de focus, `Echap` ou second clic.
- Le demarrage avec Windows est active par defaut pour le MVP et reste modifiable dans les options.
- L'installateur NSIS est en mode utilisateur courant. Le choix exact du repertoire d'installation doit etre valide manuellement dans l'assistant genere avant diffusion.

## Zone des icones cachees Windows

Windows expose des API publiques pour l'icone de notification et son rectangle, notamment `Shell_NotifyIcon` et `Shell_NotifyIconGetRect`.

En revanche, l'ouverture et la fermeture du panneau systeme des icones cachees ne semblent pas exposees comme evenement applicatif public. Une implementation future pourrait essayer UI Automation ou l'observation de fenetres Shell, mais ce serait fragile, dependant des versions Windows et a eviter pour le MVP.

## Mises a jour

Le mecanisme recommande est le plugin officiel `tauri-plugin-updater`.

Fonctionnement cible gratuit :

- GitHub heberge le depot.
- GitHub Actions construit les artefacts Windows a chaque tag de version.
- GitHub Releases expose l'installateur et le manifeste de mise a jour.
- Merken interroge le manifeste uniquement quand l'utilisateur clique sur "Verifier les mises a jour".
- La mise a jour doit etre signee selon les exigences Tauri avant diffusion publique.

Point important : GitHub Releases est gratuit pour un projet standard, mais les limites exactes dependent du type de compte, de la visibilite du depot et de l'usage. Il faudra verifier ces limites au moment de publier.
