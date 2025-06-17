module.exports = function initDb(db) {
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

    const user = {
      userid: 'admin',
      password: 'admin',
    };

    const stmt = db.prepare("INSERT OR REPLACE INTO users (userid, password) VALUES (?, ?)");
    stmt.run(user.userid, user.password, function(err) {
      if (err) {
        console.error("Errore inserimento utente:", err.message);
      } else {
        console.log("Utente inserito correttamente");
      }
    });
    stmt.finalize();
  });
};