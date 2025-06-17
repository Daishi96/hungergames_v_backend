const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const initDb = require('./db/initDb');

const db = new sqlite3.Database('/tmp/database.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Connesso al database SQLite');

  initDb(db); // usa la funzione e il DB aperto
});


// Importa le route di login
const authRoutes = require('./routes/auth')(db);
app.use('/auth', authRoutes);

// Avvio server
app.listen(PORT, () => {
  console.log(`Server attivo sulla porta ${PORT}`);
});