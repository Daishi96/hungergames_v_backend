module.exports = function initDb(db) {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userid TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        hp TEXT NOT NULL,
        stamina TEXT NOT NULL,
        hunger TEXT NOT NULL
      )
    `, (err) => {
      if (err) return console.error("Errore creazione tabella:", err.message);
      console.log("Tabella 'users' creata correttamentee (o già esistente).");
    });

    const user = {
      userid: 'admin',
      password: 'admin',
      hp: '15',
      stamina: '10',
      hunger: '20',
    };

    const stmt = db.prepare("INSERT OR REPLACE INTO users (userid, password, hp, stamina, hunger) VALUES (?, ?, ?, ?, ?)");
    stmt.run(user.userid, user.password, user.hp, user.stamina, user.hunger, function(err) {
      if (err) {
        console.error("Errore inserimento utente:", err.message);
      } else {
        console.log("Utente inserito correttamente");
      }
    });
    stmt.finalize();

    db.get("SELECT userid, hp, stamina, hunger FROM users WHERE userid = ?", ['admin'], (err, row) => {
      if (err) {
        console.error("Errore query SELECT:", err.message);
        return;
      }
      if (row) {
        console.log("Utente admin trovato:", row);
      }
    });
  }); // <-- questa era la parentesi mancante
};
