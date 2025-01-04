const express = require("express");
const cors=require("cors");
const { Pool } = require("pg");

require("dotenv").config();

const app =express();

app.use((cors()));
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

app.get('/users', async (req,res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
})

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports=app;