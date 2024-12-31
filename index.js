require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./databse/config');
const cors = require('cors')
const app = express();

// Middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());

// Routes

// Create a new user with only the `name` field
app.post('/api/users', (req, res) => {
    const { name } = req.body; // Only accept the `name` field
    if (!name) {
        return res.status(400).json({ error: 'Name is required' }); // Validate input
    }

    const sql = 'INSERT INTO users (name) VALUES (?)';
    pool.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'User created', userId: result.insertId });
    });
});

// Get all users
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    });
});


const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
