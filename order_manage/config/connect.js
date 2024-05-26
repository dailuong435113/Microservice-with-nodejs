const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'db', // typically 'localhost'
    user: 'user',
    password: 'secret',
    database: 'ecommerce_fullstack',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promisify the pool to use async/await
const promisePool = pool.promise();

module.exports = promisePool;
