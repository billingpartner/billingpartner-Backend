const express = require('express');
const router = express.Router();
const termsAndConditionsController = require('./termsAndConditionsController');
const verifyToken = require('../../middleware/authMiddleware');

router.post('/', verifyToken, termsAndConditionsController.createTerms);
router.get('/', verifyToken, termsAndConditionsController.getTerms);
router.get('/:id', verifyToken, termsAndConditionsController.getTermsById);
router.put('/:id', verifyToken, termsAndConditionsController.updateTerms);
router.delete('/:id', verifyToken, termsAndConditionsController.deleteTerms);

module.exports = router;
