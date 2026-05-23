# PRD — Assistant flottant de raccourcis clavier - Merken

## 1. Vision produit

Créer un petit logiciel de bureau qui remplace l’idée des autocollants de raccourcis clavier par une **fenêtre contextuelle élégante, légère et adaptable**.

Au lieu de coller une étiquette physique sur le PC, l’utilisateur affiche à la demande une fiche de raccourcis clavier, adaptée à son système ou au logiciel actuellement utilisé.

Les autocollants vendus sur Amazon couvrent déjà des usages comme **Windows, macOS, Word, Excel, Office, Photoshop ou Premiere Pro** ; le logiciel reprend cette logique, mais sous forme dynamique et personnalisable. (https://www.amazon.fr/raccourcis-clavier-standard-antid%C3%A9rapant-raccourci/dp/B08X1LRVF9/ref=pd_ci_mcx_mh_mcx_views_0_image?pd_rd_w=iG1ZV&content-id=amzn1.sym.0caea22c-ec39-4432-a45b-6c2e7daf8305%3Aamzn1.symc.30e3dbb4-8dd8-4bad-b7a1-a45bcdbc49b8&pf_rd_p=0caea22c-ec39-4432-a45b-6c2e7daf8305&pf_rd_r=WJP7VSWYWS8CJTB81VJM&pd_rd_wg=KALfQ&pd_rd_r=91b2d6ed-5464-44c5-b0bd-4edac71eb63a&pd_rd_i=B08X1LRVF9&th=1&tag=amzfinder-20)

---

## 2. Objectif principal

Permettre à l’utilisateur de consulter rapidement les raccourcis clavier les plus utiles sans ouvrir une application complète, sans chercher sur Internet et sans encombrer son écran.

Le logiciel doit être :

* discret ;
* très léger ;
* lancé automatiquement au démarrage ;
* utilisable hors-ligne ;
* visuellement proche d’un panneau système natif ;
* extensible à plusieurs OS et logiciels.

---

## 3. Public cible

Utilisateurs de PC ou Mac qui veulent apprendre ou retrouver rapidement les raccourcis clavier courants :

* débutants ;
* utilisateurs bureautiques ;
* étudiants ;
* formateurs ;
* utilisateurs intensifs de Word, Excel, Photoshop, etc. ;
* personnes qui changent souvent d’environnement logiciel.

---

## 4. Comportement attendu

### 4.1 Lancement

Après installation, le logiciel démarre automatiquement avec le système.

Il reste en arrière-plan et apparaît dans la zone prévue par l’OS :

* **Windows 10/11** : zone de notification / icônes cachées de la barre des tâches. Microsoft documente l’accès à cette zone via “Afficher les icônes cachées”. ([Support Microsoft][2])
* **macOS** : icône dans la barre de menus, via le modèle des éléments de barre de menu. Apple documente ce type d’élément avec `MenuBarExtra` et `NSStatusBar`. ([Apple Developer][3])
* **Linux** : icône dans la zone de notification quand l’environnement le permet ; sur GNOME, cela peut dépendre du support AppIndicator/KStatusNotifierItem, alors que KDE/Plasma est généralement plus cohérent sur ce point. ([extensions.gnome.org][4])

### 4.2 Affichage

Quand l’utilisateur clique sur l’icône du logiciel — ou idéalement sur la zone des icônes cachées quand c’est possible — un panneau flottant apparaît juste au-dessus.

Comportement souhaité :

* le panneau apparaît rapidement ;
* il ne vole pas le focus de manière lourde ;
* il disparaît dès que l’utilisateur clique ailleurs ;
* il ne se comporte pas comme une fenêtre d’application classique ;
* il n’a ni bouton réduire, ni bouton agrandir, ni bouton fermer ;
* il n’apparaît pas dans la barre des tâches comme une fenêtre normale.

Point à cadrer : sur Windows, déclencher exactement l’affichage au clic sur la petite flèche système peut être limité par l’OS. Le comportement produit à garantir doit donc être : **clic sur l’icône de l’application dans la zone système**. Le déclenchement par ouverture des icônes cachées peut être traité comme objectif secondaire.

---

## 5. Apparence et ergonomie

Le panneau doit ressembler à une surface système moderne, pas à une application.

Direction visuelle :

* rectangle flottant ;
* coins arrondis ;
* fond semi-transparent ;
* flou de l’arrière-plan ;
* ombre légère ;
* texte très lisible ;
* les raccourcis sont sous forme de touche avec le bon design des symboles;
* mise en page compacte ;
* thème clair/sombre selon le système ;
* animation courte d’apparition/disparition.

L’inspiration visuelle est le **glassmorphism** / effet verre. Sur Windows, cela correspond assez bien aux matériaux Fluent comme Acrylic ou Mica ; Microsoft décrit Acrylic comme un matériau semi-transparent de type verre dépoli, adapté aux surfaces transitoires comme les menus et panneaux contextuels. ([Microsoft Learn][5]) Sur l’écosystème Apple, le terme actuel le plus proche est **Liquid Glass**, présenté par Apple comme un matériau translucide qui reflète et réfracte son environnement. ([Apple][6])

---

## 6. Contenu affiché

### 6.1 MVP

Le MVP affiche les raccourcis clavier essentiels de l’OS.

Priorité :

1. Windows 10/11
2. macOS
3. Linux, avec adaptation selon les environnements les plus courants

Exemples de catégories :

* copier / coller / couper ;
* annuler / rétablir ;
* capture d’écran ;
* recherche ;
* changer d’application ;
* verrouiller la session ;
* gestion des fenêtres ;
* bureaux virtuels ;
* explorateur / Finder / fichiers ;
* paramètres rapides utiles.

### 6.2 Évolution contextuelle

À terme, le panneau doit pouvoir changer selon le logiciel actif.

Exemples :

* Word → raccourcis de mise en forme, navigation, styles ;
* Excel → formules, cellules, lignes, colonnes, feuilles ;
* PowerPoint → présentation, objets, duplication, alignement ;
* Photoshop → calques, sélection, pinceaux, zoom ;
* Premiere Pro → lecture, montage, coupe, timeline ;
* Navigateur → onglets, recherche, navigation ;
* Terminal → déplacer, copier, créer, modifier.

Le contenu doit rester synthétique : l’objectif n’est pas de remplacer une documentation complète, mais d’afficher **les raccourcis les plus utiles**.

---

## 7. Réglages utilisateur

Le logiciel doit proposer un petit panneau d’options simple.

Réglages minimum :

1. **Langue de l’interface**
   Langues initiales proposées : français, anglais, espagnol, allemand, portugais, italien.

2. **Taille du texte**
   Cinq tailles :

   * très petit ;
   * petit ;
   * normal ;
   * grand ;
   * très grand.

   La taille du panneau s’adapte automatiquement.

3. **Intensité du flou**

   * aucun ;
   * léger ;
   * moyen ;
   * fort ;
   * très fort.

4. **Thème**

   * suivre le système ;
   * clair ;
   * sombre.

5. **Type de fiche affichée**

   * automatique selon l’application active ;
   * toujours OS ;
   * choix manuel d’un logiciel.

6. **À propos**

   * nom du logiciel ;
   * version ;
   * auteur / éditeur ;
   * licence ;
   * lien éventuel vers crédits locaux, sans dépendance Internet obligatoire.

---

## 8. Contraintes produit

Le logiciel doit être :

* utilisable entièrement hors-ligne ;
* sans compte utilisateur ;
* sans télémétrie par défaut ;
* sans publicité ;
* sans synchronisation cloud ;
* très rapide à l’ouverture ;
* peu consommateur de RAM et CPU ;
* discret au démarrage ;
* choix du lieu de l'installation par l'utilisateur
* désinstallable proprement.

Principe important : le logiciel doit être **neutre**. Il fournit une aide locale, sans capter ni transmettre l’activité de l’utilisateur.

---

## 9. Plateformes

### Phase 1 — MVP Windows

Objectif : version Windows 10/11 stable.

Fonctions incluses :

* lancement au démarrage ;
* icône en zone de notification ;
* panneau flottant ;
* fiche Windows ;
* options de base ;
* français + anglais au minimum ;
* architecture extensible pour ajouter d’autres fiches.
* détection du logiciel au premier plan

### Phase 2 — Généralisation

Objectif : rendre personnalisable au niveau de l'utilisateur.

Fonctions : 

* détection du logiciel au premier plan ;
* panneau flottant adapté au logiciel de premier plan ;
* fiche sur les logiciel de la suit office ;
* mode expert dans les options qui permet de choisir d'enlever le raccourci standardiser pour des plus spécifique ou moins utiliser par logiciel ;
* rejoue de l'espagnole, portugais, italien, allemand ;
* adaptation des touches selon la langue de l'os et du clavier avec détection automatique et manuel via option

### Phase 3 — macOS

Objectif : version macOS avec icône dans la barre de menus.

Fonctions :

* panneau équivalent ;
* fiche macOS ;
* comportement proche des menus système ;
* visuel cohérent avec macOS.

### Phase 4 — Linux

Objectif : version Linux compatible avec les environnements courants.

Priorité :

* KDE Plasma ;
* GNOME avec AppIndicator/KStatusNotifierItem si disponible ;
* autres environnements ensuite selon faisabilité.

À noter : Linux est plus fragmenté. Il faudra accepter que le placement et le comportement exacts varient selon l’environnement de bureau.

---

## 10. Structure des fiches de raccourcis

Chaque fiche doit être définie comme un contenu indépendant, pour faciliter l’ajout de nouveaux logiciels.

Une fiche contient :

* nom du système ou logiciel ;
* OS concerné ;
* langue ;
* catégories ;
* raccourcis ;
* description courte ;
* priorité d’affichage ;
* éventuelles variantes Windows/macOS/Linux.

Exemple logique :

**Excel — Général**

* Nouveau classeur
* Enregistrer
* Rechercher
* Insérer une ligne
* Supprimer une ligne
* Aller à la cellule
* Formater cellule

**Excel — Formules**

* Insérer fonction
* Recalculer
* Afficher les formules
* Référence absolue / relative

---

## 11. Expérience utilisateur cible

Scénario principal :

1. L’utilisateur installe le logiciel.
2. Le logiciel démarre automatiquement.
3. Une petite icône apparaît près des icônes système.
4. L’utilisateur clique dessus.
5. Un panneau “verre dépoli” apparaît au-dessus.
6. Il lit rapidement le raccourci voulu.
7. Il clique ailleurs.
8. Le panneau disparaît.

Scénario avancé :

1. L’utilisateur travaille dans Excel.
2. Il clique sur l’icône du logiciel.
3. Le panneau affiche les raccourcis Excel.
4. Il passe ensuite dans Word.
5. Le panneau affiche les raccourcis Word au prochain affichage.

---

## 12. Hors périmètre du MVP

À ne pas faire au début :

* synchronisation cloud ;
* création de compte ;
* marketplace de fiches ;
* IA embarquée ;
* téléchargement automatique de fiches ;
* personnalisation avancée des raccourcis ;
* éditeur visuel complet ;
* statistiques d’usage ;
* intégration profonde dans chaque logiciel.

Ces éléments peuvent venir plus tard, mais ils alourdiraient inutilement le premier produit.

---

## 13. Critères de réussite du MVP

Le MVP est réussi si :

* le logiciel s’installe simplement ;
* il démarre avec Windows ;
* il reste discret ;
* le panneau s’ouvre en moins d’une seconde ;
* le panneau disparaît naturellement au clic extérieur ;
* les raccourcis sont lisibles ;
* le rendu semble natif et moderne ;
* aucune connexion Internet n’est requise ;
* la consommation système est négligeable ;
* les fiches peuvent être enrichies sans refondre le produit.

---

## 14. Formulation courte du produit

**Un pense-bête intelligent de raccourcis clavier, flottant, hors-ligne et contextuel, qui apparaît depuis la zone système comme un panneau translucide natif.**

C’est une alternative logicielle aux autocollants de raccourcis clavier : plus propre, adaptable à chaque logiciel, multilingue et extensible.
