# Creer une fiche de raccourcis

Ce guide explique comment proposer une nouvelle fiche de raccourcis pour Merken.

Les fichiers Markdown de `docs/fiches/` servent a relire et documenter les fiches. Les donnees utilisees par l'application restent dans les fichiers JSON de `src/data/shortcut-sheets/`.

## Structure attendue

Une fiche applicative est un objet `ShortcutSheet` :

```json
{
  "id": "excel-fr",
  "appNames": ["excel.exe"],
  "title": "Excel - Essentiels",
  "platform": "windows",
  "language": "fr",
  "categories": [
    {
      "id": "general",
      "title": "General",
      "shortcuts": [
        {
          "id": "general-enregistrer",
          "label": "Enregistrer",
          "keys": ["Ctrl", "S"],
          "description": "Enregistre le classeur.",
          "priority": 1,
          "usageLevel": "essential"
        }
      ]
    }
  ]
}
```

## Regles de nommage

- Le champ `id` suit le format `famille-langue`, par exemple `excel-fr` ou `windows-core-en`.
- L'`id` d'un raccourci est stable entre les langues d'une meme fiche, par exemple `general-enregistrer`.
- Le fichier JSON porte le nom de la famille, par exemple `excel.json`.
- Un fichier JSON contient toutes les variantes de langue disponibles pour une meme famille.
- Les langues actuellement supportees par les types sont `fr`, `en`, `es`, `de`, `pt` et `it`.

## Champs obligatoires

- `appNames` liste les noms de processus associes, par exemple `winword.exe`. Pour une fiche OS, utiliser les processus deja identifies par l'application.
- `title` est le titre lisible de la fiche.
- `platform` vaut `windows`, `macos`, `linux` ou `cross-platform`.
- `categories` regroupe les raccourcis par theme court.
- Chaque raccourci contient `id`, `label`, `keys`, `description`, `priority` et `usageLevel`.

## Priorite et niveaux

- `priority` controle l'ordre d'affichage dans une categorie. Utiliser `1` pour le raccourci le plus important.
- `usageLevel` est obligatoire et vaut `essential`, `common`, `advanced` ou `expert`.
- `essential` correspond aux raccourcis a connaitre en premier.
- `common` correspond aux raccourcis utiles dans un usage regulier.
- `advanced` correspond aux raccourcis puissants mais moins frequents.
- `expert` correspond aux raccourcis rares, destructifs, techniques ou tres contextuels.
- L'affichage standard regroupe `essential` et `common`.
- L'affichage avance montre uniquement les raccourcis `advanced`.
- L'affichage expert montre uniquement les raccourcis `expert`.
- Les niveaux ne sont pas cumulatifs : un niveau remplace le precedent au lieu de s'y ajouter.

## Personnalisation

- Les `categories[].id` sont les themes utilisables par la personnalisation.
- Les `shortcuts[].id` permettent d'inclure ou d'exclure un raccourci precis.
- Garder les memes IDs de categories et de raccourcis dans toutes les variantes de langue d'une meme famille.

## Regles de contribution

- Garder des intitules courts, clairs et verifiables.
- Verifier les raccourcis dans le logiciel ou l'OS vise avant de proposer la fiche.
- Citer les sources utilisees dans la fiche Markdown correspondante.
- Ne pas ajouter de secrets, donnees personnelles, captures de donnees internes ou informations sensibles.
- Ne pas copier massivement une documentation proprietaire ou une source externe protegee.
- Preferer une fiche synthetique : Merken affiche les raccourcis utiles, pas une documentation complete.

## Documentation Markdown

Pour chaque nouvelle famille, ajouter ou mettre a jour une fiche dans `docs/fiches/`.

Ajouter une section `Sources`, puis utiliser la table recommandee :

```markdown
| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `general-enregistrer` | Enregistrer | Ctrl + S | Enregistre le fichier. | Essentiel |
```

## Validation

Avant de proposer une contribution, executer :

```powershell
npm run test
npm run typecheck
npm run build
```
