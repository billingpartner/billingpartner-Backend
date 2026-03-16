const express = require('express');
const router = express.Router();
const expenditureController = require('./expenditureController');
const verifyToken = require('../../middleware/authMiddleware');

router.post('/', verifyToken, expenditureController.createExpenditure);
router.get('/', verifyToken, expenditureController.getExpenditures);
router.get('/:id', verifyToken, expenditureController.getExpenditureById);
router.put('/:id', verifyToken, expenditureController.updateExpenditure);
router.delete('/:id', verifyToken, expenditureController.deleteExpenditure);

module.exports = router;
