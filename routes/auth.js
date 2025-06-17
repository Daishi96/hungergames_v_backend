const express = require('express');
const bcrypt = require('bcryptjs'); // o 'bcrypt'

module.exports = function (db) {
  const router = express.Router();

  // Login
  router.post('/login', (req, res) => {
    const { userid, password } = req.body;
    if (!userid || !password) return res.status(400).json({ error: 'Credenziali mancanti' });

    db.get(`SELECT * FROM users WHERE userid = ?`, [userid], async (err, row) => {
      if (err) return res.status(500).json({ error: 'Errore DB' });
      if (!row) return res.status(401).json({ error: 'Utente non trovato' });

      const match = (password === row.password);
      if (!match) return res.status(401).json({ error: 'Password errata' });

      res.json({ success: true, userId: row.id });
    });
  });

  return router;
};
