# Politique de sécurité

[Français](#francais) | [English](#english)

## Français

### Versions supportées

Seule la dernière release stable publiée officiellement est supportée pour les correctifs de sécurité.

### Signaler une vulnérabilité

Merci de ne pas publier de signalement de sécurité dans une issue publique.

Tant qu'une adresse de contact dédiée n'est pas publiée, signalez les vulnérabilités en ouvrant une alerte de sécurité privée GitHub si elle est disponible sur le dépôt, ou en contactant le propriétaire du dépôt via GitHub.

Indiquez si possible :

- la version de Merken concernée ;
- la version de Windows utilisée ;
- les étapes de reproduction ;
- l'impact attendu ;
- les logs ou captures utiles, sans secret ni donnée sensible.

Le projet ne propose pas actuellement de programme de bug bounty.

### Périmètre sécurité

Merken est conçu pour fonctionner localement.

Il ne doit pas collecter de télémétrie, imposer de compte utilisateur ou envoyer les données de raccourcis à un service distant.

Quand l'utilisateur déclenche une vérification de mise à jour, Merken contacte GitHub Releases pour rechercher les versions officielles. Les mises à jour de l'installateur doivent être signées avant diffusion publique.

## English

# Security Policy

### Supported versions

Only the latest officially published stable release is supported for security fixes.

### Reporting a vulnerability

Please do not publish security reports in public issues.

Until a dedicated contact address is published, report vulnerabilities by opening a private GitHub security advisory if available on the repository, or by contacting the repository owner through GitHub.

Include when possible:

- the affected Merken version;
- the Windows version used;
- reproduction steps;
- the expected impact;
- useful logs or screenshots, without secrets or sensitive data.

This project does not currently run a bug bounty program.

### Security scope

Merken is designed to run locally.

It should not collect telemetry, require a user account, or send shortcut data to a remote service.

When the user triggers an update check, Merken contacts GitHub Releases to check for official releases. Installer updates must be signed before public distribution.
