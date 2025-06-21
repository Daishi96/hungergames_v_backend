// db.js
const { Pool } = require('pg');
DATABASE_URL=postgresql://hungergamesvdb_user:18qJGKXbE4Jh4BYbYNloiNibPpAwERVV@dpg-d1bjk4gdl3ps73ep55rg-a.oregon-postgres.render.com/hungergamesvdb

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
