const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = require('./db/db'); // connessione PostgreSQL

const userRoutes = require('./routes/user')(db);
app.use('/users', userRoutes);

const authRoutes = require('./routes/auth')(db);
app.use('/auth', authRoutes);

const locationsRoutes = require('./routes/locations')(db);
app.use('/locations', authRoutes);

app.get('/status', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString() });
});


app.listen(PORT, () => {
  console.log(`Server attivo sulla porta ${PORT}`);
});
