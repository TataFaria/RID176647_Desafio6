const sequelize = require('../database/Connection'); 
const Clientes = require('../../src/models/Clientes')(sequelize);

const clientesController = {
    getClientes: async (req, res) => {
        try {
            const clientes = await Clientes.findAll({
                attributes:
                    [
                        'nome',
                        'endereco',
                        'contato'
                    ]
            });
            res.json(clientes);
        } catch (error) {
            console.error('Erro ao obter clientes:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },


    getClienteById: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Clientes.findByPk(id); 
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            res.json(cliente);
        } catch (error) {
            console.error('Erro ao obter cliente:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },


    createCliente: async (req, res) => {
        const { nome, endereco, contato } = req.body;
        try {
            const novoCliente = await Clientes.create({ nome, endereco, contato });
            res.status(201).json(novoCliente); 
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },


    updateCliente: async (req, res) => {
        const { id } = req.params;
        const { nome, endereco, contato } = req.body;
        try {
            const cliente = await Clientes.findByPk(id); 
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            await cliente.update({ nome, endereco, contato }); 
            res.json(cliente); 
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },


    deleteCliente: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Clientes.findByPk(id); 
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            await cliente.destroy(); 
            res.json({ message: 'Cliente excluído com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }


};

module.exports = clientesController;