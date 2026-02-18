const db = require('../../config/db');

const User = {
    initTable: async () => {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user VARCHAR(255) NOT NULL,
                companyname VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                gstin VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                phone VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `;
        await db.execute(query);
    },
    create: async (userData) => {
        const query = 'INSERT INTO users (user, companyname, address, gstin, email, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [userData.user, userData.companyname, userData.address, userData.gstin, userData.email, userData.phone, userData.password]);
        return result;
    },
    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(query, [email]);
        return rows[0];
    },
    updatePassword: async (email, newPassword) => {
        const query = 'UPDATE users SET password = ? WHERE email = ?';
        const [result] = await db.execute(query, [newPassword, email]);
        return result;
    }
};

module.exports = User;
