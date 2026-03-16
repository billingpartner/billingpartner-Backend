const { Op } = require('sequelize');
const PurchaseOrder = require('./purchaseOrderModel');
const User = require('../user/userModel');

// Helper: get userId from token, fall back to phone lookup for old tokens
const getUserId = async (req) => {
    if (req.userId) return req.userId;
    const user = await User.findOne({ where: { phone: req.userPhone } });
    if (!user) throw new Error('User not found');
    return user.id;
};

const createPurchaseOrder = async (req, res) => {
    try {
        const {
            companyName, name, addressLine1, addressLine2, mailId, phoneNo, gstin,
            vendorCompanyName, vendorName, vendorAddressLine1, vendorAddressLine2, vendorMailId, vendorPhoneNo, vendorGstin,
            items, subtotal, tax, grandTotal, paymentStatus, paymentMethod, paymentReferenceNo, termsAndConditions, poDate
        } = req.body;

        // Basic validation
        if (!companyName || !vendorCompanyName || !items || !grandTotal) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        const userId = await getUserId(req);

        const newPO = await PurchaseOrder.create({
            userId,
            companyName,
            name,
            addressLine1,
            addressLine2: addressLine2 || null,
            mailId: mailId || null,
            phoneNo: phoneNo || null,
            gstin: gstin || null,
            vendorCompanyName,
            vendorName,
            vendorAddressLine1,
            vendorAddressLine2: vendorAddressLine2 || null,
            vendorMailId: vendorMailId || null,
            vendorPhoneNo: vendorPhoneNo || null,
            vendorGstin: vendorGstin || null,
            items,
            subtotal,
            tax,
            grandTotal,
            paymentStatus: paymentStatus || 'Pending',
            paymentMethod: paymentMethod || null,
            paymentReferenceNo: paymentReferenceNo || null,
            termsAndConditions: termsAndConditions || null,
            poDate: poDate || new Date()
        });

        res.status(201).send(newPO);
    } catch (err) {
        console.error("Error creating purchase order:", err);
        res.status(500).send({ message: "Error creating purchase order." });
    }
};

const getPurchaseOrders = async (req, res) => {
    try {
        const userId = await getUserId(req);
        const { fromDate, toDate, vendorCompanyName, paymentStatus, paymentMethod } = req.query;

        const where = { userId };

        if (vendorCompanyName) {
            where.vendorCompanyName = { [Op.like]: `%${vendorCompanyName}%` };
        }

        if (paymentStatus) {
            where.paymentStatus = paymentStatus;
        }

        if (paymentMethod) {
            where.paymentMethod = paymentMethod;
        }

        if (fromDate || toDate) {
            where.poDate = {};
            if (fromDate) where.poDate[Op.gte] = fromDate;
            if (toDate) where.poDate[Op.lte] = toDate;
        }

        const pos = await PurchaseOrder.findAll({ 
            where,
            order: [['poDate', 'DESC']]
        });
        res.status(200).send(pos);
    } catch (err) {
        console.error("Error fetching purchase orders:", err);
        res.status(500).send({ message: "Error fetching purchase orders." });
    }
};

const getPurchaseOrderById = async (req, res) => {
    try {
        const userId = await getUserId(req);
        const po = await PurchaseOrder.findOne({ where: { id: req.params.id, userId } });
        if (!po) {
            return res.status(404).send({ message: "Purchase Order not found" });
        }
        res.status(200).send(po);
    } catch (err) {
        console.error("Error fetching purchase order:", err);
        res.status(500).send({ message: "Error fetching purchase order." });
    }
};

const updatePurchaseOrder = async (req, res) => {
    try {
        const userId = await getUserId(req);
        const po = await PurchaseOrder.findOne({ where: { id: req.params.id, userId } });
        if (!po) {
            return res.status(404).send({ message: "Purchase Order not found" });
        }

        const fieldsToUpdate = [
            'companyName', 'name', 'addressLine1', 'addressLine2', 'mailId', 'phoneNo', 'gstin',
            'vendorCompanyName', 'vendorName', 'vendorAddressLine1', 'vendorAddressLine2', 'vendorMailId', 'vendorPhoneNo', 'vendorGstin',
            'items', 'subtotal', 'tax', 'grandTotal', 'paymentStatus', 'paymentMethod', 'paymentReferenceNo', 'termsAndConditions', 'poDate'
        ];

        fieldsToUpdate.forEach(field => {
            if (req.body[field] !== undefined) {
                po[field] = req.body[field];
            }
        });

        await po.save();
        res.status(200).send(po);
    } catch (err) {
        console.error("Error updating purchase order:", err);
        res.status(500).send({ message: "Error updating purchase order." });
    }
};

const deletePurchaseOrder = async (req, res) => {
    try {
        const userId = await getUserId(req);
        const deleted = await PurchaseOrder.destroy({
            where: { id: req.params.id, userId }
        });

        if (deleted) {
            res.status(200).send({ message: "Purchase Order deleted successfully." });
        } else {
            res.status(404).send({ message: "Purchase Order not found" });
        }
    } catch (err) {
        console.error("Error deleting purchase order:", err);
        res.status(500).send({ message: "Error deleting purchase order." });
    }
};

module.exports = { 
    createPurchaseOrder, 
    getPurchaseOrders, 
    getPurchaseOrderById, 
    updatePurchaseOrder, 
    deletePurchaseOrder 
};
