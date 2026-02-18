const express = require('express');
const router = express.Router();
const userController = require('./userController');



const verifyToken = require('../../middleware/authMiddleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.get('/me', verifyToken, userController.getUserDetails);

module.exports = router;
