const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader) return res.status(403).send({ auth: false, message: 'No token provided.' });

    const token = tokenHeader.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(403).send({ auth: false, message: 'Malformed token.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
