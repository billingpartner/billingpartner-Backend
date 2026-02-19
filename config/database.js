const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                ca: fs.readFileSync(path.resolve(__dirname, '../', process.env.DB_SSL_CA))
            }
        },
        logging: false // Toggle logging if needed
    }
);

module.exports = sequelize;
