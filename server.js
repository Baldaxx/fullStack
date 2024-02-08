// (Analogie du restaurant RESPONSABLE DU RESTAURANT) Charge le module Express pour créer des serveurs web et gérer les requêtes HTTP dans une application Node.j :
const express = require("express");
const app = express();
const port = 3001;


// Indique à l'application Express d'utiliser le dossier "public" pour servir des fichiers statiques tels que des images, des fichiers CSS ou des fichiers JavaScript:
app.use(express.static("public"));
// Permet de traiter les données JSON des requêtes HTTP entrantes dans l'application Express, simplifiant ainsi leur manipulation et leur utilisation:
app.use(express.json());

// BASE-DE-DONNE (Analogie du restaurant LE CUISINE DU RESTAURANT) Instanciation de la base de données :
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
  "./mydb.sqlite3",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error("Erreur lors de l'ouverture de la base de données", err);
    } else {
      console.log("Connecté à la base de données SQLite.");
    }
  }
);
// BASE-DE-DONNE Creation de la base de donnée:
db.serialize(function () {
    db.run(`DROP TABLE IF EXISTS commentaires`);
    db.run(`DROP TABLE IF EXISTS articles`);
  db.run(
    "CREATE TABLE articles (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)"
  );
  db.run(`
      CREATE TABLE commentaires (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        author TEXT, 
        content TEXT, 
        articleId INTEGER, 
        FOREIGN KEY(articleId) REFERENCES articles(id)
      )`);
});



// API (Analogie du restaurant UN SERVEUR DU RESTAURANT) Routes pour recuperer GET : 
app.get("/api/articles", (req, res) => {
    // Récupérer tous les articles de la base de données:
  db.all("SELECT * FROM articles", [], (err, rows) => {
    // Gère les résultats de la requête SQL. Si une erreur survient, elle est renvoyée avec un code d'erreur 500. Sinon, les données récupérées sont envoyées au client au format JSON:
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});



// API (Analogie du restaurant UN SERVEUR DU RESTAURANT) Route pour poster POST : 
app.post("/api/articles", (req, res) => {
  // Regles metier (Gère les résultats de la requête SQL comme au dessus):
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send("Le titre et le contenu sont requis.");
  }
  // Prépare une instruction SQL pour insérer un nouvel article dans la base de données (toujours laisser les "?" SECURITE):
  const stmt = db.prepare(
    "INSERT INTO articles (title, content) VALUES (?, ?)"
  );
  // Exécute l'instruction SQL préparée avec les valeurs du titre et du contenu fournis. En cas d'erreur, une réponse avec un code d'erreur 500 est envoyée. Sinon, une réponse avec un code 201 (créé avec succès) est envoyée, contenant l'ID du nouvel article créé, ainsi que son titre et son contenu:
  stmt.run(title, content, function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send({ id: this.lastID, title, content });
    }
  });
  stmt.finalize();
});



// API (Analogie du restaurant UN SERVEUR DU RESTAURANT) Route pour effacer DELETE : 
app.delete("/api/articles/:articleId", (req, res) => {
    const articleId = req.params.articleId;
    // Utiliser articleId pour identifier et supprimer l'article de la base de données.
    db.run("DELETE FROM articles WHERE id = ?", [articleId], function(err) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(`Article avec l'ID ${articleId} supprimé avec succès.`);
      }
    });
  });



// (Analogie du restaurant LE RESPONSABLE OUVRE LES PORTES DU RESTAURANT) Ecoute les requêtes et affiche un message indiquant que le serveur est en cours d'exécution: 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
