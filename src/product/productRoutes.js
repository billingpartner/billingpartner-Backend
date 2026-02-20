const express = require('express');
const router = express.Router();
const productController = require('./productController');
const verifyToken = require('../../middleware/authMiddleware');

router.post('/', verifyToken, productController.createProduct);
router.get('/', verifyToken, productController.getProducts);
router.put('/:id', verifyToken, productController.updateProduct);
router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;
