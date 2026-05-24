# Mises a jour de Merken

## Etat actuel

Depuis la branche de publication `0.5.0`, Merken utilise GitHub Releases et le plugin Tauri Updater pour les mises a jour de l'installateur Windows.

Le depot publie les versions avec :

- un tag Git de forme `vX.Y.Z` ;
- un workflow GitHub Actions declenche par ce tag ;
- un installateur NSIS Windows ;
- un manifeste `latest.json` ;
- une signature Tauri pour les artefacts de mise a jour ;
- une version portable publiee dans la meme release.

La release GitHub est creee en brouillon par la CI. Elle doit etre relue humainement avant publication.

## Fonctionnement utilisateur

Dans les options :

- la version actuelle est affichee ;
- l'utilisateur peut lancer une verification manuelle ;
- si Merken est a jour, l'etat l'indique clairement ;
- si une version plus recente existe, l'installateur peut telecharger et installer la mise a jour signee ;
- si la version courante est portable, Merken renvoie vers la derniere release GitHub a telecharger ;
- en cas d'echec reseau ou de configuration, l'interface affiche un etat d'erreur simple.

## Contraintes produit

- Pas de compte utilisateur.
- Pas de telemetrie.
- Verification uniquement manuelle tant qu'aucune option automatique explicite n'existe.
- Pas de verification reseau cachee.
- Endpoint limite a GitHub Releases.
- Signature des mises a jour obligatoire avant publication.

## Validation avant publication

Avant de pousser un tag de release :

```powershell
npm run test
npm run typecheck
npm run build
cargo check --manifest-path src-tauri/Cargo.toml
npm run tauri:build
```

Apres creation de la draft GitHub, verifier :

- presence de `latest.json` ;
- presence de l'installateur `Merken_X.Y.Z_x64-setup.exe` ;
- presence de la signature `.sig` ;
- presence de `merken.exe` pour la version portable ;
- coherence du texte de release avec `CHANGELOG.md`.
