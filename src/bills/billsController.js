const { Op } = require('sequelize');
const Bill = require('./billsModel');
const User = require('../user/userModel');
const Product = require('../product/productModel');

// Helper: get userId from token, fall back to phone lookup for old tokens
const getUserId = async (req) => {
    if (req.userId) return req.userId;
    const user = await User.findOne({ where: { phone: req.userPhone } });
    if (!user) throw new Error('User not found');
    return user.id;
};

const createBill = async (req, res) => {
    try {
        const {
            companyName, companyNumber, address, addressLine2, gstin,
            customerName, customerNumber, customerGstin,
            customerAddressLine1, customerAddressLine2,
            billDate, billItems, subtotal, tax, taxAmount, grandTotal,
            paymentStatus, paymentMode, referenceNumber, termsAndConditions
        } = req.body;

        // Basic validation
        // if (!companyName || !address || !gstin || !customerName || !customerNumber || !billItems || !grandTotal) {
        //     return res.status(400).send({ message: "Missing required fields" });
        // }

        const userId = await getUserId(req);

        const newBill = await Bill.create({
            userId,
            companyName,
            companyNumber: companyNumber || null,
            address,
            addressLine2: addressLine2 || null,
            gstin,
            customerName,
            customerNumber,
            customerGstin: customerGstin || null,
            customerAddressLine1: customerAddressLine1 || null,
            customerAddressLine2: customerAddressLine2 || null,
            billDate,
            billItems,
            subtotal,
            tax,
            taxAmount,
            grandTotal,
            paymentStatus: paymentStatus || 'Pending',
            paymentMode: paymentMode || null,
            referenceNumber: referenceNumber || null,
            termsAndConditions: termsAndConditions || null
        });

        // Inventory management: Subtract quantities from products
        if (billItems && Array.isArray(billItems)) {
            for (const item of billItems) {
                if (item.productId) {
                    const product = await Product.findByPk(item.productId);
                    if (product && product.isproduct) {
                        const currentQuantity = product.quantity || 0;
                        const billedQuantity = parseInt(item.quantity) || 0;
                        const newQuantity = Math.max(0, currentQuantity - billedQuantity);

                        await product.update({ quantity: newQuantity });
                    }
                }
            }
        }

        res.status(201).send(newBill);
    } catch (err) {
        console.error("Error creating bill:", err);
        res.status(500).send({ message: "Error creating bill." });
    }
};

const getBills = async (req, res) => {
    try {
        const userId = await getUserId(req);
        const { fromDate, toDate, paymentStatus, paymentMode } = req.query;

        const where = { userId };

        if (paymentStatus) {
            where.paymentStatus = paymentStatus;
        }

        if (paymentMode) {
            where.paymentMode = paymentMode;
        }

        if (fromDate || toDate) {
            where.billDate = {};
            if (fromDate) where.billDate[Op.gte] = fromDate;
            if (toDate) where.billDate[Op.lte] = toDate;
        }

        const bills = await Bill.findAll({ where });
        res.status(200).send(bills);
    } catch (err) {
        console.error("Error fetching bills:", err);
        res.status(500).send({ message: "Error fetching bills." });
    }
};

const getBillById = async (req, res) => {
    try {
        const userId = await getUserId(req);
        const bill = await Bill.findOne({ where: { id: req.params.id, userId } });
        if (!bill) {
            return res.status(404).send({ message: "Bill not found" });
        }
        res.status(200).send(bill);
    } catch (err) {
        console.error("Error fetching bill:", err);
        res.status(500).send({ message: "Error fetching bill." });
    }
};

// Update only payment-related fields (editable at any time)
const updateBillPayment = async (req, res) => {
    try {
        const { paymentStatus, paymentMode, referenceNumber } = req.body;

        const userId = await getUserId(req);
        const bill = await Bill.findOne({ where: { id: req.params.id, userId } });
        if (!bill) {
            return res.status(404).send({ message: "Bill not found" });
        }

        // Only update provided payment fields
        if (paymentStatus !== undefined) bill.paymentStatus = paymentStatus;
        if (paymentMode !== undefined) bill.paymentMode = paymentMode;
        if (referenceNumber !== undefined) bill.referenceNumber = referenceNumber;

        await bill.save();
        res.status(200).send(bill);
    } catch (err) {
        console.error("Error updating bill payment:", err);
        res.status(500).send({ message: "Error updating bill payment." });
    }
};

module.exports = { createBill, getBills, getBillById, updateBillPayment };
