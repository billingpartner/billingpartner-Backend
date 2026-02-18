const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: fs.readFileSync(path.resolve(__dirname, '../', process.env.DB_SSL_CA))
    }
};

const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise();

promisePool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL database');
        connection.release();
    })
    .catch(error => {
        console.error('Error connecting to MySQL database:', error);
    });

module.exports = promisePool;
