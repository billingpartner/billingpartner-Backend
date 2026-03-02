const Bill = require('./billsModel');

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
        if (!companyName || !address || !gstin || !customerName || !customerNumber || !billItems || !grandTotal) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        const newBill = await Bill.create({
            userId: req.userId,
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

        res.status(201).send(newBill);
    } catch (err) {
        console.error("Error creating bill:", err);
        res.status(500).send({ message: "Error creating bill." });
    }
};

const getBills = async (req, res) => {
    try {
        const bills = await Bill.findAll({ where: { userId: req.userId } });
        res.status(200).send(bills);
    } catch (err) {
        console.error("Error fetching bills:", err);
        res.status(500).send({ message: "Error fetching bills." });
    }
};

const getBillById = async (req, res) => {
    try {
        const bill = await Bill.findOne({ where: { id: req.params.id, userId: req.userId } });
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

        const bill = await Bill.findOne({ where: { id: req.params.id, userId: req.userId } });
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
