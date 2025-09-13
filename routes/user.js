const express = require('express');

module.exports = function (db) {
  const router = express.Router();

  // Endpoint per ottenere le statistiche di un utente
  router.get('/:userid/stats', async (req, res) => {
    const userid = req.params.userid;

    try {
      /*const result = await db.query(
        'SELECT u.id, u.userid, u."password", u.hp, u.nome, u.posizione, u.fame, u.stanchezza, u.arma, ' +
        'u.slotarma, u.armaturatesta, u.armaturatorso, u.armaturabraccia, u.slotbraccia, u.armaturagambe, ' +
        'gs.clima, gs.turno, gs.fascia_oraria ' +
        'FROM public.users u CROSS JOIN public.game_status gs ' +
        'WHERE u.userid = $1',
        [userid]
      );*/

      const result = await db.query(
        'SELECT u.id, u.userid, u."password", u.hp, u.nome, ' +
        'uh.coordinate, ' +
        'u.fame, u.stanchezza, u.arma, u.slotarma, ' +
        'u.armaturatesta, u.armaturatorso, u.armaturabraccia, ' +
        'u.slotbraccia, u.armaturagambe, ' +
        'gs.clima, gs.turno, gs.fascia_oraria ' +
        'FROM public.users u ' +
        'CROSS JOIN public.game_status gs ' +
        'LEFT JOIN LATERAL ( ' +
        '   SELECT DISTINCT ON (user_id) user_id, turno, step, coordinate ' +
        '   FROM public.user_history ' +
        '   WHERE user_id = u.id ' +
        '   ORDER BY user_id, turno DESC, step DESC ' +
        ') uh ON true ' +
        'WHERE u.userid = $1',
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

  // Nuovo endpoint per la cronologia (history) dell’utente
router.get('/:userid/history', async (req, res) => {
  const userid = req.params.userid;

  try {
    const result = await db.query(
      `SELECT uh.turno, uh.step, uh.coordinate, u.userid as username
        FROM user_history uh
        JOIN users u ON uh.user_id = u.id
        WHERE u.userid = $1
        ORDER BY uh.turno ASC, uh.step ASC;`,
      [userid]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore recupero cronologia' });
  }
});

// Endpoint PUT per aggiornare un utente esistente
router.put('/:userid/updateuser', async (req, res) => {
  const { userid } = req.params;

  const {
    password,
    hp,
    nome,
    posizione,
    fame,
    stanchezza,
    arma,
    slotarma,
    armaturatesta,
    armaturatorso,
    armaturabraccia,
    slotbraccia,
    armaturagambe,
    inventario,
    boxvirtuale,
    clima,
    turno
  } = req.body;

  try {
    const result = await db.query(
      `UPDATE public.users SET
        "password" = $1,
        hp = $2,
        nome = $3,
        posizione = $4,
        fame = $5,
        stanchezza = $6,
        arma = $7,
        slotarma = $8,
        armaturatesta = $9,
        armaturatorso = $10,
        armaturabraccia = $11,
        slotbraccia = $12,
        armaturagambe = $13,
        inventario = $14,
        boxvirtuale = $15,
        clima = $16,
        turno = $17
      WHERE userid = $18
      RETURNING *`,
      [
        password,
        hp,
        nome,
        posizione,
        fame,
        stanchezza,
        arma,
        slotarma,
        armaturatesta,
        armaturatorso,
        armaturabraccia,
        slotbraccia,
        armaturagambe,
        inventario,
        boxvirtuale,
        clima,
        turno,
        userid
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore durante l\'aggiornamento dell\'utente' });
  }
});

router.post('/sethistory', async (req, res) => {
  const { user_id, turno, step, x, y } = req.body;

  if (!user_id || turno === undefined || step === undefined || x === undefined || y === undefined) {
    return res.status(400).json({ error: 'Dati mancanti nel corpo della richiesta' });
  }

  try {
    const result = await db.query(
      `INSERT INTO user_history (user_id, turno, step, x, y)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, turno, step, x, y]
    );

    res.status(201).json({ message: 'Inserimento riuscito', record: result.rows[0] });
  } catch (err) {
    console.error('Errore durante l\'inserimento nella cronologia:', err);
    res.status(500).json({ error: 'Errore database durante l\'inserimento' });
  }
});

  return router;
};
