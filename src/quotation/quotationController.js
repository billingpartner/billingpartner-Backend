const Quotation = require('./quotationModel');

const createQuotation = async (req, res) => {
    try {
        const {
            companyName, companyNumber, address, addressLine2, gstin,
            customerName, customerNumber, customerGstin,
            customerAddressLine1, customerAddressLine2,
            billDate, billItems, subtotal, tax, taxAmount, grandTotal,
            termsAndConditions
        } = req.body;

        // Basic validation
        if (!companyName || !address || !gstin || !customerName || !customerNumber || !billItems || !grandTotal) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        const newQuotation = await Quotation.create({
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
            termsAndConditions: termsAndConditions || null
        });

        res.status(201).send(newQuotation);
    } catch (err) {
        console.error("Error creating quotation:", err);
        res.status(500).send({ message: "Error creating quotation." });
    }
};

const getQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.findAll({ where: { userId: req.userId } });
        res.status(200).send(quotations);
    } catch (err) {
        console.error("Error fetching quotations:", err);
        res.status(500).send({ message: "Error fetching quotations." });
    }
};

const getQuotationById = async (req, res) => {
    try {
        const quotation = await Quotation.findOne({ where: { id: req.params.id, userId: req.userId } });
        if (!quotation) {
            return res.status(404).send({ message: "Quotation not found" });
        }

        res.status(200).send(quotation);
    } catch (err) {
        console.error("Error fetching quotation:", err);
        res.status(500).send({ message: "Error fetching quotation." });
    }
};

const deleteQuotation = async (req, res) => {
    try {
        const deleted = await Quotation.destroy({ where: { id: req.params.id, userId: req.userId } });
        if (!deleted) {
            return res.status(404).send({ message: "Quotation not found" });
        }

        res.status(200).send({ message: "Quotation deleted successfully." });
    } catch (err) {
        console.error("Error deleting quotation:", err);
        res.status(500).send({ message: "Error deleting quotation." });
    }
};

module.exports = { createQuotation, getQuotations, getQuotationById, deleteQuotation };
