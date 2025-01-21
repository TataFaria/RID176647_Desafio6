const Sales = require('../models/Sales');
const ItemSales = require('../models/ItemSales');
const Product = require('../models/Product');
const Client = require('../models/Client');

const SalesController = {
    async create(req, res) {
        try {
            const { id_client, items } = req.body; 

            // Calcula o valor total da venda
            const valorVenda = items.reduce((total, item) => total + (item.quantidade * item.precoUnitario), 0);

            // Cria a venda
            const sale = await Sales.create({ id_client, valorVenda });

            // Cria os itens da venda
            for (const item of items) {
                await ItemSales.create({
                    id_sales: sale.id,
                    id_product: item.id_product,
                    quantidade: item.quantidade,
                    precoUnitario: item.precoUnitario,
                });
            }

            res.status(201).json({ message: 'Venda criada com sucesso!', sale });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async findAll(req, res) {
        try {
            const sales = await Sales.findAll({
                include: [
                    Client,
                    { model: ItemSales, include: [Product] },
                ],
            });
            res.status(200).json(sales);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = SalesController;

