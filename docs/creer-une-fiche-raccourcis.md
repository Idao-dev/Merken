# Creer une fiche de raccourcis

Ce guide explique comment proposer une nouvelle fiche de raccourcis pour Merken.

Les fichiers Markdown de `docs/fiches/` servent a relire et documenter les fiches. Les donnees utilisees par l'application restent dans les fichiers JSON de `src/data/shortcut-sheets/`.

## Structure attendue

Une fiche applicative est un objet `ShortcutSheet` :

```json
{
  "id": "excel-fr",
  "appNames": ["excel.exe"],
  "title": "Excel",
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
          "level": "standard"
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
- Les touches peuvent differer entre deux langues de logiciel; les IDs restent stables, pas les raccourcis.

## Champs obligatoires

- `appNames` liste les noms de processus associes, par exemple `winword.exe`. Pour une fiche OS, utiliser les processus deja identifies par l'application.
- `title` est le titre lisible de la fiche.
- `platform` vaut `windows`, `macos`, `linux` ou `cross-platform`.
- `categories` regroupe les raccourcis par theme court.
- Chaque raccourci contient `id`, `label`, `keys`, `description`, `priority` et `level`.
- `keysByLayout` est optionnel et sert uniquement aux variantes clavier verifiees, par exemple AZERTY/QWERTY. Le rendu utilise `keysByLayout[disposition]` puis revient a `keys`. Ne pas le renseigner quand les touches sont identiques ou non verifiees.

Exemple schematique pour une variante de disposition clavier verifiee :

```json
"keys": ["Ctrl", "`"],
"keysByLayout": {
  "azerty": ["Ctrl", "<touche AZERTY verifiee>"],
  "qwerty": ["Ctrl", "`"]
}
```

## Langue logiciel / clavier

Chaque fiche Markdown doit contenir une section `Langue logiciel / clavier`.

Cette section doit indiquer :

- la source officielle FR utilisee pour les raccourcis FR ;
- la source officielle EN utilisee pour les raccourcis EN ;
- si la source mentionne une disposition clavier, notamment `US keyboard layout` ;
- les divergences FR/EN, par exemple `Ctrl` + `G` en FR contre `Ctrl` + `B` en EN ;
- les divergences AZERTY/QWERTY retenues dans `keysByLayout` ;
- les conflits entre sources officielles, avec la page exacte retenue ou le statut `non promu JSON`.

Ne jamais deduire une touche francaise depuis une source anglaise traduite. Une traduction de libelle peut garder le meme ID, mais la touche doit venir d'une source localisee ou d'une validation explicite.

Quand plusieurs raccourcis officiels existent pour la meme action, retenir le plus simple a realiser pour la paire langue/disposition visee : par defaut francais/AZERTY pour les fiches FR et anglais/QWERTY pour les fiches EN. Ne jamais retirer `Shift`, `Alt`, `AltGr` ou modifier une touche de ponctuation sans source localisee ou validation explicite. Si le seul raccourci verifie utilise une touche morte, un crochet, un symbole AltGr ou une ponctuation difficile, le classer en `expert` ou le laisser documente sans promotion JSON.

## Priorite et niveaux

- `priority` controle l'ordre d'affichage dans une categorie. Utiliser `1` pour le raccourci le plus important.
- `level` est obligatoire dans les donnees JSON.
- Les valeurs autorisees sont `standard`, `advanced` et `expert`.
- `standard` correspond aux raccourcis les plus utiles au quotidien.
- `advanced` correspond aux raccourcis puissants mais moins frequents.
- `expert` correspond aux raccourcis rares, destructifs, techniques ou tres contextuels.
- L'affichage standard montre uniquement les raccourcis `standard`.
- L'affichage avance montre uniquement les raccourcis `advanced`.
- L'affichage expert montre uniquement les raccourcis `expert`.
- Les niveaux ne sont pas cumulatifs : un niveau remplace le precedent au lieu de s'y ajouter.
- Le niveau personnalise n'est pas une valeur de fiche : il est compose dans l'application par theme ou par raccourci.

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
| `general-enregistrer` | Enregistrer | Ctrl + S | Enregistre le fichier. | Standard |
```

## Validation

Avant de proposer une contribution, executer :

```powershell
npm run test
npm run typecheck
npm run build
```
