const CompanyDetails = require('./companyDetailsModel');

// Create a new company detail
exports.createCompanyDetails = async (req, res) => {
    try {
        const { companyname, address, addressline2, gstin, phone, emailid } = req.body;
        const userid = req.userId;

        if (!companyname || !address || !phone) {
            return res.status(400).json({ message: 'companyname, address, and phone are required.' });
        }

        const company = await CompanyDetails.create({
            companyname,
            address,
            addressline2,
            gstin,
            phone,
            emailid,
            userid
        });

        res.status(201).json({ message: 'Company details created successfully.', company });
    } catch (error) {
        res.status(500).json({ message: 'Error creating company details.', error: error.message });
    }
};

// Get all company details for the logged-in user
exports.getCompanyDetails = async (req, res) => {
    try {
        const userid = req.userId;

        const companies = await CompanyDetails.findAll({ where: { userid } });
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching company details.', error: error.message });
    }
};

// Get a single company detail by id
exports.getCompanyDetailsById = async (req, res) => {
    try {
        const { id } = req.params;
        const userid = req.userId;

        const company = await CompanyDetails.findOne({ where: { id, userid } });
        if (!company) {
            return res.status(404).json({ message: 'Company details not found.' });
        }

        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching company details.', error: error.message });
    }
};

// Update a company detail
exports.updateCompanyDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { companyname, address, addressline2, gstin, phone, emailid } = req.body;
        const userid = req.userId;

        const company = await CompanyDetails.findOne({ where: { id, userid } });
        if (!company) {
            return res.status(404).json({ message: 'Company details not found.' });
        }

        company.companyname = companyname || company.companyname;
        company.address = address || company.address;
        company.addressline2 = addressline2 !== undefined ? addressline2 : company.addressline2;
        company.gstin = gstin !== undefined ? gstin : company.gstin;
        company.phone = phone || company.phone;
        company.emailid = emailid !== undefined ? emailid : company.emailid;

        await company.save();

        res.status(200).json({ message: 'Company details updated successfully.', company });
    } catch (error) {
        res.status(500).json({ message: 'Error updating company details.', error: error.message });
    }
};

// Delete a company detail
exports.deleteCompanyDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const userid = req.userId;

        const company = await CompanyDetails.findOne({ where: { id, userid } });
        if (!company) {
            return res.status(404).json({ message: 'Company details not found.' });
        }

        await company.destroy();

        res.status(200).json({ message: 'Company details deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting company details.', error: error.message });
    }
};
