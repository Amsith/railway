const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DBHOST ,  // Replace 'localhost' with your host
    user: process.env.DBUSER ,       // Replace 'root' with your MySQL username
    password: process.env.DBPASS ,       // Replace '' with your MySQL password
    database: process.env.DBNAME ,// Replace 'message' with your database name
    port: process.env.DBPORT ,         // Replace '3306' with your MySQL port if different
    queueLimit: 0,
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to the MySQL database');
        connection.release(); // Release the connection back to the pool
    }
});

module.exports = pool;
