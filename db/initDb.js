const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Crea la cartella 'db' se non esiste
if (!fs.existsSync('./db')) {
  fs.mkdirSync('./db');
}

const db = new sqlite3.Database('./db/database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userid TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `, (err) => {
    if (err) return console.error("Errore creazione tabella:", err.message);
    console.log("Tabella 'users' creata correttamente (o già esistente).");
  });
});

db.close();