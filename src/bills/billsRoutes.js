const express = require('express');
const router = express.Router();
const billsController = require('./billsController');
const verifyToken = require('../../middleware/authMiddleware');

router.post('/', verifyToken, billsController.createBill);
router.get('/', verifyToken, billsController.getBills);

module.exports = router;