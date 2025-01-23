const sequelize = require('../database/Connection.js');
const Vendas = require('../models/Vendas.js')(sequelize);
const Pedidos = require('../models/Pedidos.js')(sequelize);
const Produtos = require('../models/Produtos.js')(sequelize);
const Pedido_Produto = require('../models/PedidoProduto.js')(sequelize, Produtos);

const vendasController = {

    getVendas: async (req, res) => {
        try {
            const vendas = await Vendas.findAll({
                attributes: [
                    'IdVenda',
                    'IdPedido',
                    'DtVenda',
                    'VlVenda'
                ]
            });
            if (!res.headersSent) {
                res.json(vendas);
            }
        } catch (error) {
            console.error('Erro ao carregar as vendas:', error);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    },

    getVendaById: async (req, res) => {
        const { id } = req.params;
        try {
            const venda = await Vendas.findByPk(id);
            if (!venda) {
                return res.status(404).json({ error: 'Venda não encontrada' });
            }

            const pedidoProdutos = await Pedido_Produto.findAll({
                where: { IdPedido: venda.IdPedido },
                attributes:
                    [
                        'IdProduto',
                        'QtPedida'
                    ]
            });

            res.json({ venda, pedidoProdutos });
        } catch (error) {
            console.error('Erro ao consultar venda:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    createVenda: async (req, res) => {
        const { IdPedido, DtVenda, VlVenda } = req.body;
    
        try {
            const pedido = await Pedidos.findByPk(IdPedido);
            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }
    
            const { IdCliente } = pedido;

            const novaVenda = await Vendas.create({ IdPedido, DtVenda, VlVenda, IdCliente });

            await pedido.update({ StPedido: 'V' });
    
            res.status(201).json(novaVenda);
        } catch (error) {
            console.error('Erro ao realizar venda:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },
    
    deleteVenda: async (req, res) => {
        const { id } = req.params;
        try {
            const venda = await Vendas.findByPk(id);
            if (!venda) {
                return res.status(404).json({ error: 'Venda não encontrada' });
            }

            const pedido = await Pedidos.findByPk(venda.IdPedido);
            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }

            await venda.destroy();

            await pedido.update({ StPedido: 'A' });

            res.json({ message: 'Venda excluída com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir Venda:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
};

module.exports = vendasController;

