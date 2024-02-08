How to develop ?
----------------
In terminal run command `node server.js`

Leçon : Difference entre  le fichier serveur, la base de données et les api 
===========================================================================
Dans cette leçon, nous allons utiliser une analogie d'un restaurant pour comprendre comment fonctionne un serveur web avec une base de données, en utilisant du code JavaScript avec Express.js et SQLite3 (Comme mySql).
A regarder avec le code 

1 Responsable du Restaurant (Fichier Serveur)
---------------------------------------------
Notre responsable du restaurant ouvre le restaurant en utilisant Express.js.
Il indique au serveur où trouver les menus, les images et autres fichiers statiques.
Il assure que le restaurant peut comprendre et traiter les commandes en format JSON.

La Cuisine du Restaurant (Base de Données)
------------------------------------------
Dans notre analogie, la cuisine représente notre base de données SQLite3.
Ici, nous définissons la structure de notre cuisine en créant des tables pour les articles et les commentaires.
Ces tables correspondent aux menus que nous proposerons aux clients.

Les serveurs du Restaurant (Routes API)
---------------------------------------
Nos serveurs représentent les routes de notre API.
Nous avons des routes pour récupérer les articles, ajouter de nouveaux articles et supprimer des articles existants.
Chaque route correspond à une action spécifique que les clients peuvent effectuer dans notre restaurant en ligne.

Le Menu (Plats Disponibles)
---------------------------
Le menu est équivalent à nos tables d'articles et de commentaires.
Chaque plat représente un article ou un commentaire dans notre base de données.

Ouverture du Restaurant (Écoute des Requêtes)
---------------------------------------------
Notre responsable ouvre les portes du restaurant en écoutant les requêtes sur un port spécifique.
Il confirme que le restaurant est en ligne et prêt à servir les clients.

En utilisant cette analogie, nous pouvons comprendre comment chaque partie de notre code contribue à la création et au fonctionnement d'un restaurant en ligne, où les clients peuvent accéder aux menus, passer des commandes et interagir avec le restaurant de différentes manières.
