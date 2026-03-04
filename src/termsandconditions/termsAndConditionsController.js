const TermsAndConditions = require('./termsAndConditionsModel');

// Create terms and conditions
exports.createTerms = async (req, res) => {
    try {
        const { termsandconditions } = req.body;
        const userid = req.userId;

        if (!termsandconditions) {
            return res.status(400).json({ message: 'termsandconditions is required.' });
        }

        const existing = await TermsAndConditions.findOne({ where: { userid } });
        if (existing) {
            return res.status(409).json({ message: 'Terms and conditions already exist for this user. Use PUT to update.' });
        }

        const terms = await TermsAndConditions.create({ userid, termsandconditions });

        res.status(201).json({ message: 'Terms and conditions created successfully.', terms });
    } catch (error) {
        res.status(500).json({ message: 'Error creating terms and conditions.', error: error.message });
    }
};

// Get all terms and conditions for the logged-in user
exports.getTerms = async (req, res) => {
    try {
        const userid = req.userId;

        const terms = await TermsAndConditions.findAll({ where: { userid } });
        res.status(200).json(terms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching terms and conditions.', error: error.message });
    }
};

// Get a single terms and conditions by id
exports.getTermsById = async (req, res) => {
    try {
        const { id } = req.params;
        const userid = req.userId;

        const terms = await TermsAndConditions.findOne({ where: { id, userid } });
        if (!terms) {
            return res.status(404).json({ message: 'Terms and conditions not found.' });
        }

        res.status(200).json(terms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching terms and conditions.', error: error.message });
    }
};

// Update terms and conditions
exports.updateTerms = async (req, res) => {
    try {
        const { id } = req.params;
        const { termsandconditions } = req.body;
        const userid = req.userId;

        const terms = await TermsAndConditions.findOne({ where: { id, userid } });
        if (!terms) {
            return res.status(404).json({ message: 'Terms and conditions not found.' });
        }

        terms.termsandconditions = termsandconditions || terms.termsandconditions;
        await terms.save();

        res.status(200).json({ message: 'Terms and conditions updated successfully.', terms });
    } catch (error) {
        res.status(500).json({ message: 'Error updating terms and conditions.', error: error.message });
    }
};

// Delete terms and conditions
exports.deleteTerms = async (req, res) => {
    try {
        const { id } = req.params;
        const userid = req.userId;

        const terms = await TermsAndConditions.findOne({ where: { id, userid } });
        if (!terms) {
            return res.status(404).json({ message: 'Terms and conditions not found.' });
        }

        await terms.destroy();

        res.status(200).json({ message: 'Terms and conditions deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting terms and conditions.', error: error.message });
    }
};
