# Mises a jour de Merken

## Objectif

Ajouter entre le MVP Windows et la contextualisation un lot dedie aux mises a jour applicatives.

L'utilisateur doit pouvoir ouvrir les options, verifier si une nouvelle version existe, puis installer cette version en un clic si elle est disponible.

## Solution gratuite recommandee

Le projet peut s'appuyer sur GitHub :

- depot GitHub pour le code source ;
- tags Git pour identifier les versions, par exemple `v0.1.0` ;
- GitHub Actions pour construire l'application automatiquement ;
- GitHub Releases pour publier l'installateur Windows et le manifeste de mise a jour ;
- plugin Tauri Updater pour verifier et installer les nouvelles versions depuis Merken.

Cette approche est gratuite pour un usage raisonnable, sans serveur personnel a maintenir. Les limites de GitHub Actions et Releases devront etre revues avant une diffusion large.

## Fonctionnement utilisateur cible

Dans les options :

- une ligne indique la version actuelle ;
- une ligne "Mise a jour" est visible et cliquable ;
- tant que GitHub Releases et le plugin updater ne sont pas configures, le clic indique que la verification sera disponible apres configuration ;
- apres integration updater, un bouton "Verifier les mises a jour" lance la verification ;
- si aucune version recente n'existe, l'etat indique "Merken est a jour" ;
- si une version existe, l'etat indique la nouvelle version et affiche un bouton d'installation ;
- apres installation, Merken demande un redemarrage si necessaire.

## Contraintes produit

- Pas de compte utilisateur.
- Pas de telemetrie.
- Verification uniquement manuelle tant qu'aucune option automatique explicite n'existe.
- Pas de verification reseau cachee.
- Message clair si l'utilisateur est hors-ligne.
- Signature des mises a jour avant diffusion publique.

## Travail technique prevu

- Ajouter `tauri-plugin-updater`.
- Ajouter la configuration Tauri du endpoint de mise a jour.
- Creer un workflow GitHub Actions de build Windows.
- Publier les artefacts dans GitHub Releases.
- Ajouter l'interface de verification dans les options Merken.
- Tester les cas : a jour, mise a jour disponible, hors-ligne, echec de signature, installation annulee.
