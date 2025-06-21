// routes/user.js
const express = require('express');

module.exports = function (db) {
  const router = express.Router();

  // Endpoint per ottenere le statistiche di un utente
  router.get('/:userid/stats', (req, res) => {
    const userid = req.params.userid;

    db.get(`SELECT hp, stamina, hunger FROM users WHERE userid = ?`, [userid], (err, row) => {
      if (err) return res.status(500).json({ error: 'Errore DB' });
      if (!row) return res.status(404).json({ error: 'Utente non trovato' });

      res.json(row);
    });
  });

  return router;
};
