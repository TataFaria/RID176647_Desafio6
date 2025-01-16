const Stock = require('../models/Stock');
const Product = require('../models/Product');

const StockController = {
    async create(req, res) {
        try {
            const { id_product, quantidade } = req.body;

            // Cria o estoque
            const stock = await Stock.create({ id_product, quantidade });

            return res.status(201).json({ message: 'Estoque criado com sucesso.', stock });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async findAll(req, res) {
        try {
            const stocks = await Stock.findAll({ include: Product }); // Inclui informações do produto associado
            return res.status(200).json(stocks);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const stock = await Stock.findByPk(id, { include: Product });
            if (!stock) {
                return res.status(404).json({ message: 'Estoque não encontrado.' });
            }
            return res.status(200).json(stock);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { quantidade } = req.body;

            const stock = await Stock.findByPk(id);
            if (!stock) {
                return res.status(404).json({ message: 'Estoque não encontrado.' });
            }

            await stock.update({ quantidade });
            return res.status(200).json({ message: 'Estoque atualizado com sucesso.', stock });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const stock = await Stock.findByPk(id);
            if (!stock) {
                return res.status(404).json({ message: 'Estoque não encontrado.' });
            }

            await stock.destroy();
            return res.status(200).json({ message: 'Estoque deletado com sucesso.' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};

module.exports = StockController;
