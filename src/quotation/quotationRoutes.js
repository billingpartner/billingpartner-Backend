const express = require('express');
const router = express.Router();
const quotationController = require('./quotationController');
const verifyToken = require('../../middleware/authMiddleware');

router.post('/', verifyToken, quotationController.createQuotation);
router.get('/', verifyToken, quotationController.getQuotations);
router.get('/:id', verifyToken, quotationController.getQuotationById);
router.delete('/:id', verifyToken, quotationController.deleteQuotation);

module.exports = router;
