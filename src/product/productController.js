const Product = require('./productModel');
const User = require('../user/userModel');

exports.createProduct = async (req, res) => {
    try {
        const { name, category, price } = req.body;
        const userPhone = req.userPhone;

        const user = await User.findOne({ where: { phone: userPhone } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.create({
            name,
            category,
            price,
            userid: user.id
        });

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const userPhone = req.userPhone;

        const user = await User.findOne({ where: { phone: userPhone } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const products = await Product.findAll({ where: { userid: user.id } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price } = req.body;
        const userPhone = req.userPhone;

        const user = await User.findOne({ where: { phone: userPhone } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.findOne({ where: { id, userid: user.id } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = name || product.name;
        product.category = category || product.category;
        product.price = price || product.price;

        await product.save();

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const userPhone = req.userPhone;

        const user = await User.findOne({ where: { phone: userPhone } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.findOne({ where: { id, userid: user.id } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
