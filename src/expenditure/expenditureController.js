const { Op } = require('sequelize');
const Expenditure = require('./expenditureModel');
const User = require('../user/userModel');

// Helper: get userId from token, fall back to phone lookup for old tokens
const getUserId = async (req) => {
    if (req.userId) return req.userId;
    const user = await User.findOne({ where: { phone: req.userPhone } });
    if (!user) throw new Error('User not found');
    return user.id;
};

const createExpenditure = async (req, res) => {
    try {
        const {
            category, amount, date, description, paymentMethod, referenceNumber
        } = req.body;

        // Basic validation
        if (!category || !amount || !paymentMethod) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        const userId = await getUserId(req);

        const newExpenditure = await Expenditure.create({
            userId,
            category,
            amount,
            date: date || new Date(),
            description: description || null,
            paymentMethod,
            referenceNumber: referenceNumber || null
        });

        res.status(201).send(newExpenditure);
    } catch (err) {
        console.error("Error creating expenditure:", err);
        res.status(500).send({ message: "Error creating expenditure." });
    }
};

const getExpenditures = async (req, res) => {
    try {
        const userId = await getUserId(req);
        const { fromDate, toDate, category, paymentMethod } = req.query;

        const where = { userId };

        if (category) {
            where.category = category;
        }

        if (paymentMethod) {
            where.paymentMethod = paymentMethod;
        }

        if (fromDate || toDate) {
            where.date = {};
            if (fromDate) where.date[Op.gte] = fromDate;
            if (toDate) where.date[Op.lte] = toDate;
        }

        const expenditures = await Expenditure.findAll({ 
            where,
            order: [['date', 'DESC']]
        });
        res.status(200).send(expenditures);
    } catch (err) {
        console.error("Error fetching expenditures:", err);
        res.status(500).send({ message: "Error fetching expenditures." });
    }
};

const getExpenditureById = async (req, res) => {
    try {
        const userId = await getUserId(req);
        const expenditure = await Expenditure.findOne({ where: { id: req.params.id, userId } });
        if (!expenditure) {
            return res.status(404).send({ message: "Expenditure not found" });
        }
        res.status(200).send(expenditure);
    } catch (err) {
        console.error("Error fetching expenditure:", err);
        res.status(500).send({ message: "Error fetching expenditure." });
    }
};

const updateExpenditure = async (req, res) => {
    try {
        const { category, amount, date, description, paymentMethod, referenceNumber } = req.body;

        const userId = await getUserId(req);
        const expenditure = await Expenditure.findOne({ where: { id: req.params.id, userId } });
        if (!expenditure) {
            return res.status(404).send({ message: "Expenditure not found" });
        }

        if (category !== undefined) expenditure.category = category;
        if (amount !== undefined) expenditure.amount = amount;
        if (date !== undefined) expenditure.date = date;
        if (description !== undefined) expenditure.description = description;
        if (paymentMethod !== undefined) expenditure.paymentMethod = paymentMethod;
        if (referenceNumber !== undefined) expenditure.referenceNumber = referenceNumber;

        await expenditure.save();
        res.status(200).send(expenditure);
    } catch (err) {
        console.error("Error updating expenditure:", err);
        res.status(500).send({ message: "Error updating expenditure." });
    }
};

const deleteExpenditure = async (req, res) => {
    try {
        const userId = await getUserId(req);
        const deleted = await Expenditure.destroy({
            where: { id: req.params.id, userId }
        });

        if (deleted) {
            res.status(200).send({ message: "Expenditure deleted successfully." });
        } else {
            res.status(404).send({ message: "Expenditure not found" });
        }
    } catch (err) {
        console.error("Error deleting expenditure:", err);
        res.status(500).send({ message: "Error deleting expenditure." });
    }
};

module.exports = { 
    createExpenditure, 
    getExpenditures, 
    getExpenditureById, 
    updateExpenditure, 
    deleteExpenditure 
};
