const Order = require('../models/Order');
const Product = require('../models/Product');

const OrderController = {
    async create(req, res) {
        try {
            const { id_product, quantidade, valorCompra } = req.body;

            // Cria o pedido
            const order = await Order.create({ id_product, quantidade, valorCompra });

            return res.status(201).json({ message: 'Pedido criado com sucesso.', order });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async findAll(req, res) {
        try {
            const orders = await Order.findAll({ include: Product }); // Inclui informações do produto associado
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const order = await Order.findByPk(id, { include: Product });
            if (!order) {
                return res.status(404).json({ message: 'Pedido não encontrado.' });
            }
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { quantidade, valorCompra } = req.body;

            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(404).json({ message: 'Pedido não encontrado.' });
            }

            await order.update({ quantidade, valorCompra });
            return res.status(200).json({ message: 'Pedido atualizado com sucesso.', order });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(404).json({ message: 'Pedido não encontrado.' });
            }

            await order.destroy();
            return res.status(200).json({ message: 'Pedido deletado com sucesso.' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};

module.exports = OrderController;


