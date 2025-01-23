const sequelize = require('../database/Connection');
const PedidosProduto = require('../models/PedidoProduto')(sequelize);

const pedidoProdutoController = {

    getPedidosProduto: async (req, res) => {
        const { id } = req.params;
        try {

            const itensPedido = await PedidosProduto.findAll({
                where: { IdPedido: id },
                attributes:
                    [
                        'IdProduto',
                        'IdPedido',
                        'QtPedida'
                    ]
            });

            res.json(itensPedido);
        } catch (error) {
            console.error('Erro ao obter itens do pedido:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
};

module.exports = pedidoProdutoController;