const Client = require('./clientModel');
const User = require('../user/userModel');

// Create a new client
exports.createClient = async (req, res) => {
    try {
        const { customerName, contactNumber } = req.body;
        const userPhone = req.userPhone;

        const user = await User.findOne({ where: { phone: userPhone } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const client = await Client.create({
            customerName,
            contactNumber,
            userid: user.id
        });

        res.status(201).json({ message: 'Client created successfully', client });
    } catch (error) {
        res.status(500).json({ message: 'Error creating client', error: error.message });
    }
};

// Get all clients for the logged-in user
exports.getClients = async (req, res) => {
    try {
        const userPhone = req.userPhone;

        const user = await User.findOne({ where: { phone: userPhone } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const clients = await Client.findAll({ where: { userid: user.id } });
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching clients', error: error.message });
    }
};

// Get a single client by id
exports.getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const userPhone = req.userPhone;

        const user = await User.findOne({ where: { phone: userPhone } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const client = await Client.findOne({ where: { id, userid: user.id } });
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching client', error: error.message });
    }
};

// Update a client
exports.updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { customerName, contactNumber } = req.body;
        const userPhone = req.userPhone;

        const user = await User.findOne({ where: { phone: userPhone } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const client = await Client.findOne({ where: { id, userid: user.id } });
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        client.customerName = customerName || client.customerName;
        client.contactNumber = contactNumber || client.contactNumber;

        await client.save();

        res.status(200).json({ message: 'Client updated successfully', client });
    } catch (error) {
        res.status(500).json({ message: 'Error updating client', error: error.message });
    }
};

// Delete a client
exports.deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const userPhone = req.userPhone;

        const user = await User.findOne({ where: { phone: userPhone } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const client = await Client.findOne({ where: { id, userid: user.id } });
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        await client.destroy();

        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting client', error: error.message });
    }
};
