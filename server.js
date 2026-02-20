const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./src/user/userRoutes');
const billsRoutes = require('./src/bills/billsRoutes');
const productRoutes = require('./src/product/productRoutes');
const clientRoutes = require('./src/client/clientRoutes');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/bills', billsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/clients', clientRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the application." });
});

// Initialize DB Table
sequelize.sync()
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch(err => {
        console.error("Failed to sync database:", err);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
