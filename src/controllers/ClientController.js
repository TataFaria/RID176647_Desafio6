const Client = require('../models/Client');
const Sales = require('../models/Sales');

const ClientController = {
    async create(req, res) {
        try {
            const { name, email } = req.body;
            const client = await Client.create({ name, email });
            return res.status(201).json(client);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async findAll(req, res) {
        try {
            const clients = await Client.findAll({ include: Sales }); // Inclui as vendas do cliente
            return res.status(200).json(clients);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const client = await Client.findByPk(id, { include: Sales });
            if (!client) {
                return res.status(404).json({ message: 'Cliente não encontrado.' });
            }
            return res.status(200).json(client);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            const client = await Client.findByPk(id);
            if (!client) {
                return res.status(404).json({ message: 'Cliente não encontrado.' });
            }
            await client.update({ name, email });
            return res.status(200).json(client);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const client = await Client.findByPk(id);
            if (!client) {
                return res.status(404).json({ message: 'Cliente não encontrado.' });
            }
            await client.destroy();
            return res.status(200).json({ message: 'Cliente deletado com sucesso.' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};

module.exports = ClientController;
