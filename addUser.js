const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/db/database.db');

const userid = 'admin';      // cambia con l’ID utente che vuoi
const password = 'admin'; // cambia con la password desiderata

db.run(`INSERT INTO users (userid, password) VALUES (?, ?)`, [userid, password], function (err) {
  if (err) {
    console.error('Errore inserimento utente:', err.message);
  } else {
    console.log('Utente inserito con ID:', this.lastID);
  }
  db.close();
});
