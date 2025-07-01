require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'neondb_owner',
  password: 'npg_TsQjn5uAGP0t',
  host: 'ep-divine-field-a9j8wwbv-pooler.gwc.azure.neon.tech',
  port: 5432,
  database: 'myneondb',
  ssl: {
    rejectUnauthorized: false,  // richiesto per Neon
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
