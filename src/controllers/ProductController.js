const Product = require('../models/Product');
const Stock = require('../models/Stock');
const Order = require('../models/Order');

const ProductController = {
    async create(req, res) {
        try {
            const { name, description, price } = req.body;
            const product = await Product.create({ name, description, price });
            return res.status(201).json(product);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async findAll(req, res) {
        try {
            const products = await Product.findAll({ include: [Stock, Order] }); // Inclui estoque e pedidos
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id, { include: [Stock, Order] });
            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, description, price } = req.body;
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
            await product.update({ name, description, price });
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
            await product.destroy();
            return res.status(200).json({ message: 'Produto deletado com sucesso.' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};

module.exports = ProductController;
