const Bill = require('./billsModel');
const User = require('../user/userModel');

const createBill = async (req, res) => {
    try {
        const { companyName, address, gstin, customerName, customerNumber, billDate, billItems, subtotal, tax, taxAmount, grandTotal } = req.body;

        // Basic validation
        if (!companyName || !address || !gstin || !customerName || !customerNumber || !billItems || !grandTotal) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        // Find user by phone (from token)
        const user = await User.findOne({ where: { phone: req.userPhone } });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const newBill = await Bill.create({
            userId: user.id,
            companyName,
            address,
            gstin,
            customerName,
            customerNumber,
            billDate,
            billItems,
            subtotal,
            tax,
            taxAmount,
            grandTotal
        });

        res.status(201).send(newBill);
    } catch (err) {
        console.error("Error creating bill:", err);
        res.status(500).send({ message: "Error creating bill." });
    }
};

const getBills = async (req, res) => {
    try {
        // Find user by phone (from token)
        const user = await User.findOne({ where: { phone: req.userPhone } });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const bills = await Bill.findAll({ where: { userId: user.id } });
        res.status(200).send(bills);
    } catch (err) {
        console.error("Error fetching bills:", err);
        res.status(500).send({ message: "Error fetching bills." });
    }
}

module.exports = { createBill, getBills };
