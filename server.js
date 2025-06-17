const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connessione al DB
const db = new sqlite3.Database('./db/db/database.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Connesso al database SQLite');
});

// Crea tabella utenti se non esiste
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userid TEXT UNIQUE,
  password TEXT
)`);

// Importa le route di login
const authRoutes = require('./routes/auth')(db);
app.use('/auth', authRoutes);

// Avvio server
app.listen(PORT, () => {
  console.log(`Server attivo sulla porta ${PORT}`);
});