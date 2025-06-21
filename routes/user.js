const express = require('express');

module.exports = function (db) {
  const router = express.Router();

  // Endpoint per ottenere le statistiche di un utente
  router.get('/:userid/stats', async (req, res) => {
    const userid = req.params.userid;

    try {
      const result = await db.query(
        'SELECT hp, stamina, hunger FROM users WHERE userid = $1',
        [userid]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Utente non trovato' });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Errore DB' });
    }
  });

  return router;
};
