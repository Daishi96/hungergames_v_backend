const express = require('express');

module.exports = function (db) {
  const router = express.Router();

  router.post('/login', async (req, res) => {
    const { userid, password } = req.body;
    if (!userid || !password) return res.status(400).json({ error: 'Credenziali mancanti' });

    try {
      const result = await db.query('SELECT * FROM users WHERE userid = $1', [userid]);

      console.log('userid ricevuto:', userid);
      if (result.rows.length === 0) return res.status(401).json({ error: 'Utente non trovato' });
console.log('result.rows:', result.rows);

      const user = result.rows[0];

      // Confronto semplice (NON SICURO) password in chiaro
      if (password !== user.password) return res.status(401).json({ error: 'Password errata' });

      res.json({ success: true, userId: user.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Errore DB' });
    }
  });

  return router;
};
