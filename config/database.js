const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

console.log(`Connecting to host: "${process.env.DB_HOST}"`);
console.log(`Using port: "${process.env.DB_PORT}"`);

const sequelize = new Sequelize(
    process.env.DB_NAME.trim(),
    process.env.DB_USER.trim(),
    process.env.DB_PASSWORD.trim(),
    {
        host: process.env.DB_HOST.trim(),
        port: parseInt(process.env.DB_PORT),
        dialect: 'mysql',
        // Add this to debug
        hooks: {
            beforeConnect: (config) => {
                console.log(`Final connection config host: ${config.host}`);
            }
        },
        dialectOptions: {
            ssl: {
                ca: fs.readFileSync(path.resolve(__dirname, '../', process.env.DB_SSL_CA.trim()))
            }
        },
        logging: false // Toggle logging if needed
    }
);

module.exports = sequelize;
