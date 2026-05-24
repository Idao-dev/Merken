# Notes produit

## Intentions stables

- Merken est un pense-bete local, pas une application de suivi d'activite.
- Aucune connexion, aucun compte, aucune publicite, aucune telemetrie par defaut.
- Les fiches doivent rester courtes et utiles.
- Le produit final vise un installateur unique pour l'utilisateur.
- Les mises a jour doivent etre disponibles sans compte utilisateur et rester comprehensibles.
- Le changement de langue dans les options doit s'appliquer immediatement a l'interface visible et aux fiches affichees.
- Les options sont organisees par onglets pour rester lisibles quand les reglages par logiciel seront ajoutes.
- Le reglage "Transparence du panneau" pilote l'opacite visuelle, les bordures et le flou arriere-plan, mais son rendu depend de Windows, WebView2 et du support `backdrop-filter`.
- Chaque fiche peut memoriser son niveau d'affichage : standard, avance ou expert. Les niveaux ne sont pas cumulatifs.
- La personnalisation fine par theme ou raccourci se gere dans l'onglet Personnalisation, avec apercu immediat dans la fenetre reelle des raccourcis placee a cote d'Options.
- L'identite visuelle courante utilise un accent cyan (`#38BDF8`) et reserve l'ambre (`#FBBF24`) aux focus clavier.
- Les apparences disponibles sont Sombre et Daltonien. Le mode daltonien conserve l'interface sombre, augmente le contraste et doit accompagner les etats par des libelles ou icones, pas uniquement par la couleur.
- La fenetre Options doit pouvoir etre deplacee depuis ses zones vides, sans bloquer les controles interactifs.
- Le panneau de raccourcis peut etre place avec des presets ou un ajustement manuel : afficher, deplacer, valider ou annuler, puis masquer.
- La position personnalisee est stockee localement en coordonnees ecran et pourra demander des ajustements futurs pour le multi-ecran avance.
- La verification de mise a jour peut etre visible avant l'integration GitHub Releases, a condition d'indiquer clairement qu'elle n'est pas encore connectee.
- La verification de mise a jour est uniquement manuelle tant qu'aucune option automatique explicite n'existe.

## Decisions a valider humainement

- Nom final et icone.
- Direction d'icone : base "roulette de raccourcis" avec deux colonnes de touches et une combinaison centrale lisible.
- Prevoir des variantes d'icone adaptees par plateforme : Windows, macOS et Linux.
- A plus long terme, envisager des variantes visuelles par logiciel si Merken affiche des fiches specialisees.
- Licence.
- Exactitude des raccourcis par langue et logiciel.
- Niveau visuel attendu pour l'effet verre.
- Politique de mise a jour automatique configurable, si elle est ajoutee plus tard.
