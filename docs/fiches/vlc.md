# VLC

Fiche documentaire pour les raccourcis VLC utiles sur Windows.

Documentation sheet for useful VLC shortcuts on Windows.

## Sources

- https://thresh.videolan.me/vlc-user/userguide/hotkeys.html

## Notes de recherche

- Version / plateforme: VLC desktop sur Windows.
- Couverture: la documentation officielle consultable expose surtout les raccourcis globaux les plus utilises; la fiche conserve aussi quelques raccourcis VLC courants deja presents dans le depot.
- Raccourcis Fn / touches F: pas de touche F1-F12 retenue dans la selection actuelle.
- Raccourcis exclus: les captures "Full List" de la documentation officielle ne sont pas reutilisees comme tableau complet, car elles ne sont pas exposees en texte exploitable et beaucoup d actions sont trop specifiques.
- Risques: pas de raccourci destructif retenu; `Ctrl` + `Q` ferme l application et reste Standard seulement parce qu il est explicite et courant.

## Langue logiciel / clavier

- Statut audit 2026-06-01: fiche conservee comme selection existante; aucune correction de touche localisee n'est promue sans source localisee ou validation explicite.
- Les sections Francais et English restent separees: ne pas deduire une touche FR depuis une source EN traduite.
- Les touches de ponctuation, les actions souris et les sequences `Alt` doivent etre reverifiees par langue de logiciel et disposition AZERTY/QWERTY avant ajout de `keysByLayout`.

## Inventaire complet

| Action source | Touches | Source | Selection Merken | Raison |
| --- | --- | --- | --- | --- |
| Fullscreen | `F` | VLC user documentation | Standard | Affichage tres courant en lecture video. |
| Exit fullscreen | `Esc` | VLC user documentation | Standard | Sortie de plein ecran attendue. |
| Play/Pause | `Space` | VLC user documentation | Standard | Action principale. |
| Stop | `S` | VLC user documentation | Standard | Action de lecture courante. |
| Faster | `+` | VLC user documentation | Avance | Utile mais modifie le rythme de lecture. |
| Slower | `-` | VLC user documentation | Avance | Utile mais modifie le rythme de lecture. |
| Normal rate | `=` | VLC user documentation | Avance | Restaure la vitesse apres ajustement. |
| Next | `N` | VLC user documentation | Standard | Navigation media courante. |
| Previous | `P` | VLC user documentation | Standard | Navigation media courante. |
| Volume up | `Ctrl` + `Up` | VLC user documentation | Standard | Reglage audio courant. |
| Volume down | `Ctrl` + `Down` | VLC user documentation | Standard | Reglage audio courant. |
| Mute | `M` | VLC user documentation | Standard | Reglage audio courant. |
| Jump backward | `Shift` + `Left` | VLC user documentation | Standard | Saut court tres utile. |
| Jump forward | `Shift` + `Right` | VLC user documentation | Standard | Saut court tres utile. |
| Medium jump backward | `Alt` + `Left` | VLC defaults / fiche existante | Avance | Navigation fine moins frequente. |
| Medium jump forward | `Alt` + `Right` | VLC defaults / fiche existante | Avance | Navigation fine moins frequente. |
| Long jump backward | `Ctrl` + `Left` | VLC defaults / fiche existante | Avance | Navigation longue moins frequente. |
| Long jump forward | `Ctrl` + `Right` | VLC defaults / fiche existante | Avance | Navigation longue moins frequente. |
| Next frame | `E` | VLC defaults / fiche existante | Avance | Analyse image par image, a regrouper avec les commandes avancees VLC. |
| Subtitle track | `V` | VLC defaults / fiche existante | Avance | Utile selon media. |
| Audio track | `B` | VLC defaults / fiche existante | Avance | Utile selon media. |
| Time display | `T` | VLC defaults / fiche existante | Avance | Information ponctuelle. |
| Open media | `Ctrl` + `O` | VLC defaults / fiche existante | Standard | Ouverture de fichier courante. |
| Quit | `Ctrl` + `Q` | VLC defaults / fiche existante | Standard | Fermeture explicite. |

## Francais

- ID: `vlc-fr`
- Titre: VLC - Essentiels
- Applications: `vlc.exe`

### Lecture

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `lecture-lecture-pause` | Lecture pause | `Space` | Lance ou met en pause. | Standard |
| `lecture-stop` | Stop | `S` | Arrete la lecture. | Standard |
| `lecture-suivant` | Suivant | `N` | Passe au media suivant. | Standard |
| `lecture-precedent` | Precedent | `P` | Revient au media precedent. | Standard |
| `lecture-plein-ecran` | Plein ecran | `F` | Bascule le plein ecran. | Standard |
| `lecture-quitter-plein-ecran` | Quitter plein ecran | `Esc` | Sort du plein ecran. | Standard |
| `lecture-muet` | Muet | `M` | Coupe ou retablit le son. | Standard |
| `lecture-temps` | Temps | `T` | Affiche le temps. | Avance |

### Navigation media

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `navigation-saut-court-arriere` | Saut court arriere | `Shift` + `Left` | Recule legerement. | Standard |
| `navigation-saut-court-avant` | Saut court avant | `Shift` + `Right` | Avance legerement. | Standard |
| `navigation-saut-moyen-arriere` | Saut moyen arriere | `Alt` + `Left` | Recule davantage. | Avance |
| `navigation-saut-moyen-avant` | Saut moyen avant | `Alt` + `Right` | Avance davantage. | Avance |
| `navigation-saut-long-arriere` | Saut long arriere | `Ctrl` + `Left` | Recule fortement. | Avance |
| `navigation-saut-long-avant` | Saut long avant | `Ctrl` + `Right` | Avance fortement. | Avance |
| `navigation-image-suivante` | Image suivante | `E` | Avance image par image. | Avance |

### Audio et video

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `audio-volume-plus` | Volume plus | `Ctrl` + `Up` | Augmente le volume. | Standard |
| `audio-volume-moins` | Volume moins | `Ctrl` + `Down` | Diminue le volume. | Standard |
| `audio-sous-titres` | Sous-titres | `V` | Change les sous-titres. | Avance |
| `audio-piste-audio` | Piste audio | `B` | Change la piste audio. | Avance |
| `audio-plus-rapide` | Plus rapide | `+` | Augmente la vitesse. | Avance |
| `audio-plus-lent` | Plus lent | `-` | Diminue la vitesse. | Avance |
| `audio-vitesse-normale` | Vitesse normale | `=` | Restaure la vitesse. | Avance |

### Fichiers

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `fichiers-ouvrir-fichier` | Ouvrir fichier | `Ctrl` + `O` | Ouvre un media. | Standard |
| `fichiers-quitter` | Quitter | `Ctrl` + `Q` | Ferme VLC. | Standard |

## English

- ID: `vlc-en`
- Titre: VLC - Essentials
- Applications: `vlc.exe`

### Playback

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `lecture-lecture-pause` | Play pause | `Space` | Play or pause. | Standard |
| `lecture-stop` | Stop | `S` | Stop playback. | Standard |
| `lecture-suivant` | Next media | `N` | Move to next media. | Standard |
| `lecture-precedent` | Previous media | `P` | Move to previous media. | Standard |
| `lecture-plein-ecran` | Full screen | `F` | Toggle full screen. | Standard |
| `lecture-quitter-plein-ecran` | Exit full screen | `Esc` | Leave full screen. | Standard |
| `lecture-muet` | Mute | `M` | Mute or restore sound. | Standard |
| `lecture-temps` | Time display | `T` | Show time. | Advanced |

### Media navigation

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `navigation-saut-court-arriere` | Short jump backward | `Shift` + `Left` | Seek back slightly. | Standard |
| `navigation-saut-court-avant` | Short jump forward | `Shift` + `Right` | Seek forward slightly. | Standard |
| `navigation-saut-moyen-arriere` | Medium jump backward | `Alt` + `Left` | Seek back further. | Advanced |
| `navigation-saut-moyen-avant` | Medium jump forward | `Alt` + `Right` | Seek forward further. | Advanced |
| `navigation-saut-long-arriere` | Long jump backward | `Ctrl` + `Left` | Seek back strongly. | Advanced |
| `navigation-saut-long-avant` | Long jump forward | `Ctrl` + `Right` | Seek forward strongly. | Advanced |
| `navigation-image-suivante` | Next frame | `E` | Advance frame by frame. | Advanced |

### Audio and video

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `audio-volume-plus` | Volume up | `Ctrl` + `Up` | Increase volume. | Standard |
| `audio-volume-moins` | Volume down | `Ctrl` + `Down` | Decrease volume. | Standard |
| `audio-sous-titres` | Subtitles | `V` | Change subtitles. | Advanced |
| `audio-piste-audio` | Audio track | `B` | Change audio track. | Advanced |
| `audio-plus-rapide` | Faster | `+` | Increase speed. | Advanced |
| `audio-plus-lent` | Slower | `-` | Decrease speed. | Advanced |
| `audio-vitesse-normale` | Normal speed | `=` | Restore normal speed. | Advanced |

### Files

| ID | Action | Touches | Description | Niveau |
| --- | --- | --- | --- | --- |
| `fichiers-ouvrir-fichier` | Open file | `Ctrl` + `O` | Open media. | Standard |
| `fichiers-quitter` | Quit | `Ctrl` + `Q` | Close VLC. | Standard |
