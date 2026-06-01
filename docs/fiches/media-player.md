# Lecteur multimedia / Media Player

Fiche documentaire pour le lecteur multimedia Windows.

Documentation sheet for Windows media playback apps.

## Sources

- https://support.microsoft.com/en-us/help/13805
- https://support.microsoft.com/en-us/windows/use-the-movies-tv-app-with-narrator-a1bfca58-adab-969e-2693-f772e91187ae

## Notes

- Les raccourcis du lecteur multimedia moderne sont moins documentes publiquement que ceux de Photos. La fiche reste limitee aux commandes clavier les plus stables.
- Version / plateforme: Media Player Windows moderne, Movies & TV et compatibilite partielle Windows Media Player.
- Couverture: Microsoft documente surtout Movies & TV et des raccourcis communs d apps; les raccourcis `microsoft.media.player.exe` peuvent varier selon version et focus.
- Raccourcis Fn / touches F: `F7`, `F8`, `F9` et `F11` peuvent demander `Fn` selon le clavier.
- Raccourcis exclus: commandes anciennes Windows Media Player non confirmees dans Media Player moderne.
- Risques: aucun raccourci destructif retenu.

## Inventaire complet

| Action source | Touches | Source | Selection Merken | Raison |
| --- | --- | --- | --- | --- |
| Play or pause | `Space` | Microsoft Movies & TV / fiche existante | Standard | Action principale. |
| Play or pause alternative | `Ctrl` + `P` | Microsoft Movies & TV / fiche existante | Avance | Alternative compatible selon app. |
| Stop | `Ctrl` + `S` | Fiche existante | Avance | Compatible selon app, moins universel. |
| Full screen | `F11` ou `Alt` + `Enter` | Microsoft app shortcuts / Movies & TV | Standard | Affichage video courant. |
| Exit full screen | `Esc` | Microsoft Movies & TV | Standard | Sortie attendue. |
| Seek forward | `Right` | Fiche existante | Standard | Navigation media courante mais variable selon app. |
| Seek backward | `Left` | Fiche existante | Standard | Navigation media courante mais variable selon app. |
| Go back | `Alt` + `Left` ou `Backspace` | Microsoft Movies & TV | Avance | Navigation dans l app, pas dans le media. |
| Repeat | `Ctrl` + `T` | Microsoft Movies & TV | Avance | Mode lecture moins frequent. |
| Next media | `Ctrl` + `F` | Fiche existante | Avance | Compatibilite variable. |
| Previous media | `Ctrl` + `B` | Fiche existante | Avance | Compatibilite variable. |
| Volume up | `Up` ou `F9` | Microsoft Movies & TV / fiche existante | Standard | Reglage audio. |
| Volume down | `Down` ou `F8` | Microsoft Movies & TV / fiche existante | Standard | Reglage audio. |
| Mute | `F7` | Microsoft Movies & TV / fiche existante | Avance | Touche F moins fiable sur portable. |

## Francais

- ID: `media-player-fr`
- Titre: Lecteur multimedia - Essentiels
- Applications: `microsoft.media.player.exe`, `wmplayer.exe`, `zunemusic.exe`, `zunevideo.exe`

### Lecture

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `lecture-lecture-pause` | Lecture pause | `Space` | Lance ou met en pause. | Standard |
| `lecture-lecture-pause-alternative` | Lecture pause alternative | `Ctrl` + `P` | Bascule la lecture si compatible. | Avance |
| `lecture-stop` | Stop | `Ctrl` + `S` | Arrete la lecture si compatible. | Avance |
| `lecture-plein-ecran` | Plein ecran | `F11` | Bascule le plein ecran. | Standard |
| `lecture-plein-ecran-alt` | Plein ecran alternatif | `Alt` + `Enter` | Bascule le plein ecran si compatible. | Avance |
| `lecture-quitter-plein-ecran` | Quitter plein ecran | `Esc` | Revient a la fenetre. | Standard |

### Navigation media

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `navigation-avancer` | Avancer | `Right` | Avance dans le media. | Standard |
| `navigation-reculer` | Reculer | `Left` | Recule dans le media. | Standard |
| `navigation-retour-app` | Retour app | `Alt` + `Left` | Revient a l ecran precedent. | Avance |
| `navigation-repetition` | Repetition | `Ctrl` + `T` | Active ou desactive la repetition. | Avance |
| `navigation-media-suivant` | Media suivant | `Ctrl` + `F` | Passe au media suivant si compatible. | Avance |
| `navigation-media-precedent` | Media precedent | `Ctrl` + `B` | Revient au media precedent si compatible. | Avance |

### Audio

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `audio-volume-plus` | Volume plus | `Up` | Augmente le volume. | Standard |
| `audio-volume-moins` | Volume moins | `Down` | Diminue le volume. | Standard |
| `audio-muet` | Muet | `F7` | Coupe le son si compatible. | Avance |

## English

- ID: `media-player-en`
- Titre: Media Player - Essentials
- Applications: `microsoft.media.player.exe`, `wmplayer.exe`, `zunemusic.exe`, `zunevideo.exe`

### Playback

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `lecture-lecture-pause` | Play pause | `Space` | Play or pause. | Standard |
| `lecture-lecture-pause-alternative` | Alternative play pause | `Ctrl` + `P` | Toggle playback when compatible. | Advanced |
| `lecture-stop` | Stop | `Ctrl` + `S` | Stop playback when compatible. | Advanced |
| `lecture-plein-ecran` | Full screen | `F11` | Toggle full screen. | Standard |
| `lecture-plein-ecran-alt` | Alternative full screen | `Alt` + `Enter` | Toggle full screen when compatible. | Advanced |
| `lecture-quitter-plein-ecran` | Exit full screen | `Esc` | Return to window mode. | Standard |

### Media navigation

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `navigation-avancer` | Seek forward | `Right` | Seek forward. | Standard |
| `navigation-reculer` | Seek backward | `Left` | Seek backward. | Standard |
| `navigation-retour-app` | App back | `Alt` + `Left` | Return to the previous screen. | Advanced |
| `navigation-repetition` | Repeat | `Ctrl` + `T` | Toggle repeat. | Advanced |
| `navigation-media-suivant` | Next media | `Ctrl` + `F` | Move to next media when compatible. | Advanced |
| `navigation-media-precedent` | Previous media | `Ctrl` + `B` | Move to previous media when compatible. | Advanced |

### Audio

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `audio-volume-plus` | Volume up | `Up` | Increase volume. | Standard |
| `audio-volume-moins` | Volume down | `Down` | Decrease volume. | Standard |
| `audio-muet` | Mute | `F7` | Mute when compatible. | Advanced |
