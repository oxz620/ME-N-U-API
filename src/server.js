const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require('dotenv').config();

const app =express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    port: process.env.PORT || 5436,
    ssl: {
        rejectUnauthorized: false,
    }
  });

  app.get('/', async (req,res) => {
    res.json({ message: "This is my server!!"});
})

app.get('/users', async (req,res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
})

const PORT= process.env.PORT || 5436;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports=app;