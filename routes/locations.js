const express = require('express');

module.exports = function (db) {
  const router = express.Router();

  router.get('/locations', async (req, res) => {
    try {
      const result = await db.query(
        `SELECT id, coordinate, nome, descrizione FROM locations`
      );

      res.json(result.rows);
    } catch (err) {
      console.error('Errore DB in /locations:', err);
      res.status(500).json({ error: 'Errore nel recupero delle locations' });
    }
  });

  return router;
};
