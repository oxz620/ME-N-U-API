const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require('dotenv').config({ path: './src/.env' });

const app =express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.get('/', async (req,res) => {
    res.json({ message: "This is my server!!"});
})

app.get('/users', async (req,res) => {
    try {
        const query = 'SELECT * FROM users';
        console.log('Executing query:', query);
        let result = await pool.query(query);
        console.log('Users fetched:', result.rows); 
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

const PORT= process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports=app;