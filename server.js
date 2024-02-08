const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

// Instanciation (ouverture):
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

// Creation de la base de donnée:
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

// Routes:
app.get("/api/articles", (req, res) => {
  db.all("SELECT * FROM articles", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// Lien avec Postman:
app.post("/api/articles", (req, res) => {
  // Regles metier (pas de stockage de données, juste des regles):
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send("Le titre et le contenu sont requis.");
  }
  // Composant d'acces au données(data) SQL:
  const stmt = db.prepare(
    "INSERT INTO articles (title, content) VALUES (?, ?)"
  );
  stmt.run(title, content, function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send({ id: this.lastID, title, content });
    }
  });
  stmt.finalize();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
