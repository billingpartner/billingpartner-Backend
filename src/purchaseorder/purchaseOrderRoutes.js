const express = require('express');
const router = express.Router();
const purchaseOrderController = require('./purchaseOrderController');
const verifyToken = require('../../middleware/authMiddleware');

router.post('/', verifyToken, purchaseOrderController.createPurchaseOrder);
router.get('/', verifyToken, purchaseOrderController.getPurchaseOrders);
router.get('/:id', verifyToken, purchaseOrderController.getPurchaseOrderById);
router.put('/:id', verifyToken, purchaseOrderController.updatePurchaseOrder);
router.delete('/:id', verifyToken, purchaseOrderController.deletePurchaseOrder);

module.exports = router;
