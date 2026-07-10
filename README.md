# Merken

Merken est une application Windows qui affiche un panneau flottant de raccourcis clavier depuis la zone de notification.

Son objectif est simple : garder sous la main les raccourcis utiles de Windows et des logiciels courants, sans compte utilisateur, sans telemetrie et sans connexion obligatoire.

Le projet est une application Tauri 2 : interface TypeScript/Vite, backend Rust et donnees de raccourcis locales.

Merken est independant. Il n'est pas affilie, sponsorise, approuve ni valide par Microsoft ou par les editeurs des logiciels mentionnes.

## Fonctionnalites

- Fiches locales pour Windows, Explorateur de fichiers, Photos, lecteur multimedia, Invite de commandes, PowerShell, navigateurs, Excel, Word, PowerPoint, Outlook, Thunderbird, Obsidian et VLC.
- Detection contextuelle locale a partir du nom du processus actif et du titre de fenetre.
- Niveaux par fiche : standard, avance ou expert.
- Personnalisation par theme ou par raccourci, avec apercu immediat.
- Placement du panneau par preset ou ajustement manuel.
- Themes sombre et clair, renforcement optionnel des contrastes et transparence du panneau reglable de 0 % a 100 %.
- Options pour la langue, la disposition clavier, l'apparence, les fiches, la personnalisation, le demarrage Windows et les informations de version.
- Verification manuelle des mises a jour depuis GitHub Releases.

## Installation

Merken est distribue sous deux formes :

- [installateur Windows](https://github.com/Idao-dev/Merken/releases/latest/download/Merken-setup.exe) : installation pour l'utilisateur courant et mises a jour integrees ;
- [version portable](https://github.com/Idao-dev/Merken/releases/latest/download/merken.exe) : executable autonome, sans installation.

Les versions publiees et leurs notes sont disponibles dans [GitHub Releases](https://github.com/Idao-dev/Merken/releases).

## Developpement

Prerequis : Node.js, npm, Rust et les outils Tauri pour Windows.

```powershell
npm install
npm run tauri:dev
```

Commandes utiles avant publication :

```powershell
npm run test
npm run typecheck
npm run build
cargo test --manifest-path src-tauri/Cargo.toml
npm run tauri:build
```

## Contribution

Les contributions sont bienvenues lorsqu'elles ameliorent le projet officiel.

Vous pouvez proposer :

- des corrections de bugs ;
- des ameliorations de l'interface ;
- de nouvelles fiches de raccourcis ;
- des corrections de raccourcis existants ;
- de la documentation ;
- des traductions.

Les contributions doivent rester claires, ciblees et coherentes avec l'interface existante. Avant une modification importante, ouvrez de preference une issue pour valider l'approche.

En soumettant une contribution au depot officiel, vous confirmez que vous avez le droit de la proposer et vous acceptez qu'elle puisse etre integree au projet officiel sous la licence du projet.

## Securite

Merci de ne pas publier de signalement de securite dans une issue publique. Utilisez une alerte de securite privee GitHub si elle est disponible sur le depot, ou contactez le proprietaire du depot via GitHub.

Indiquez si possible :

- la version de Merken concernee ;
- la version de Windows utilisee ;
- les etapes de reproduction ;
- l'impact attendu ;
- les logs ou captures utiles, sans secret ni donnee sensible.

Seule la derniere release stable publiee officiellement est supportee pour les correctifs de securite.

Le projet ne propose pas actuellement de programme de bug bounty.

## Licence

Merken est gratuit. Son code source est consultable pour la transparence, l'audit, l'apprentissage et les contributions au projet officiel.

Le projet n'est pas distribue sous une licence open source au sens strict. Merken est distribue sous licence proprietaire gratuite, avec code source consultable et tous droits reserves.

Toute reprise, redistribution, publication d'une version modifiee, reutilisation du code dans un autre projet ou exploitation commerciale necessite l'accord ecrit prealable de l'auteur.

Voir `LICENSE.md` pour les conditions completes.
