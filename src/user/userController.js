const User = require('./userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { user, companyname, address, addressline2, gstin, email, phone, password } = req.body;
        // Basic validation
        if (!user || !phone || !password) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        await User.create({ user, companyname, address, addressline2, gstin, email, phone, password: hashedPassword });

        const token = jwt.sign({ phone: phone }, process.env.JWT_SECRET, { expiresIn: 86400 }); // 24 hours
        res.status(200).send({ auth: true, token });
    } catch (err) {
        console.error(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
            // Check which field caused the error
            if (err.errors[0].path === 'email') {
                return res.status(409).send({ message: "Email already exists." });
            }
            if (err.errors[0].path === 'phone') {
                return res.status(409).send({ message: "Phone number already exists." });
            }
            return res.status(409).send({ message: "User already exists." });
        }
        res.status(500).send({ message: "There was a problem registering the user." });
    }
};

const login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        if (!phone || !password) {
            return res.status(400).send({ message: "Phone and password required" });
        }

        const user = await User.findOne({ where: { phone: phone } });
        if (!user) return res.status(404).send('No user found.');

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ phone: user.phone }, process.env.JWT_SECRET, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error on the server.');
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { phone, newPassword } = req.body;
        if (!phone || !newPassword) {
            return res.status(400).send({ message: "Phone and new password required" });
        }

        const user = await User.findOne({ where: { phone } });
        if (!user) return res.status(404).send('No user found.');

        const hashedPassword = await bcrypt.hash(newPassword, 8);
        user.password = hashedPassword;
        await user.save();

        res.status(200).send({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error on the server.');
    }
}

const getUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ where: { phone: req.userPhone } });
        if (!user) return res.status(404).send('No user found.');

        // Remove password from response
        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;

        res.status(200).send(userWithoutPassword);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error on the server.');
    }
}

const updateUserDetails = async (req, res) => {
    try {
        const { companyname, address, addressline2, gstin } = req.body;

        // Validation 
        if (!companyname || !address || !gstin) {
            return res.status(400).send({ message: "Company name, address, and GSTIN are required." });
        }

        const [affectedRows] = await User.update(
            { companyname, address, addressline2, gstin },
            { where: { phone: req.userPhone } }
        );

        if (affectedRows === 0) {
            return res.status(404).send({ message: "User not found or no changes made." });
        }

        res.status(200).send({ message: "User details updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error updating user details." });
    }
}

module.exports = { signup, login, forgotPassword, getUserDetails, updateUserDetails };
