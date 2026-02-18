const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./src/user/userRoutes');
const User = require('./src/user/userModel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the application." });
});

// Initialize DB Table
User.initTable()
    .then(() => {
        console.log("User table initialized.");
    })
    .catch(err => {
        console.error("Failed to initialize user table:", err);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
