const express = require('express');
const router = express.Router();
const companyDetailsController = require('./companyDetailsController');
const verifyToken = require('../../middleware/authMiddleware');

router.post('/', verifyToken, companyDetailsController.createCompanyDetails);
router.get('/', verifyToken, companyDetailsController.getCompanyDetails);
router.get('/:id', verifyToken, companyDetailsController.getCompanyDetailsById);
router.put('/:id', verifyToken, companyDetailsController.updateCompanyDetails);
router.delete('/:id', verifyToken, companyDetailsController.deleteCompanyDetails);

module.exports = router;
