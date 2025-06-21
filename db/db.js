// db.js
require('dotenv').config();  // carica variabili da .env
const { Pool } = require('pg');

const pool = new Pool({
  user: 'hungergamesvdb_user',
  password: '18qJGKXbE4Jh4BYbYNloiNibPpAwERVV',
  host: 'dpg-d1bjk4gdl3ps73ep55rg-a.oregon-postgres.render.com',
  port: 5432,
  database: 'hungergamesvdb',
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};