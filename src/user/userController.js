const User = require('./userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { user, companyname, address, gstin, email, phone, password } = req.body;
        // Basic validation
        if (!user || !email || !password) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        await User.create({ user, companyname, address, gstin, email, phone, password: hashedPassword });

        const token = jwt.sign({ id: email }, process.env.JWT_SECRET, { expiresIn: 86400 }); // 24 hours
        res.status(200).send({ auth: true, token });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).send({ message: "Email already exists." });
        }
        res.status(500).send({ message: "There was a problem registering the user." });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findByEmail(req.body.email);
        if (!user) return res.status(404).send('No user found.');

        const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error on the server.');
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(400).send({ message: "Email and new password required" });
        }

        const user = await User.findByEmail(email);
        if (!user) return res.status(404).send('No user found.');

        const hashedPassword = await bcrypt.hash(newPassword, 8);
        await User.updatePassword(email, hashedPassword);
        res.status(200).send({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error on the server.');
    }
}

const getUserDetails = async (req, res) => {
    try {
        const user = await User.findByEmail(req.userId);
        if (!user) return res.status(404).send('No user found.');

        // Remove password from response
        const { password, ...userWithoutPassword } = user;

        res.status(200).send(userWithoutPassword);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error on the server.');
    }
}

const updateUserDetails = async (req, res) => {
    try {
        const { companyname, address, gstin } = req.body;

        // Validation 
        if (!companyname || !address || !gstin) {
            return res.status(400).send({ message: "Company name, address, and GSTIN are required." });
        }

        const result = await User.updateDetails(req.userId, { companyname, address, gstin });

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "User not found or no changes made." });
        }

        res.status(200).send({ message: "User details updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error updating user details." });
    }
}

module.exports = { signup, login, forgotPassword, getUserDetails, updateUserDetails };
