const sequelize = require('../database/Connection');
const Pedidos = require('../models/Pedidos')(sequelize);
const Cliente = require('../models/Clientes')(sequelize);
const PedidoProduto = require('../models/PedidoProduto')(sequelize);
const Produto = require('../models/Produtos')(sequelize);
const Estoque = require('../models/Estoque')(sequelize); 

const pedidosController = {
    getPedidos: async (req, res) => {
        try {
            const pedidos = await Pedidos.findAll({
                attributes:
                    [
                        'QtPedida',
                        'DtPedido',
                        'StPedido',
                        'VlPedido',
                        'IdCliente'
                    ]
            });
            res.json(pedidos);
        } catch (error) {
            console.error('Erro ao obter pedidos:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },


    getPedidoById: async (req, res) => {
        const { id } = req.params;
        try {
            const pedido = await Pedidos.findByPk(id);
            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }

            const pedidoProdutos = await PedidoProduto.findAll({
                where: { IdPedido: pedido.IdPedido },
                attributes:
                    [
                        'IdProduto',
                        'QtPedida'
                    ]
            });
            res.json({ pedido, pedidoProdutos });

        } catch (error) {
            console.error('Erro ao obter pedido:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    createPedido: async (req, res) => {
        const { DtPedido, StPedido, VlPedido, IdCliente, produtos } = req.body;

        try {
            let QtPedida = 0;

            for (const produto of produtos) {
                QtPedida += produto.QtPedida;
            }

            const novoPedido = await Pedidos.create({ DtPedido, StPedido, VlPedido, IdCliente, QtPedida });

            await Promise.all(produtos.map(async (produto) => {
                await PedidoProduto.create({
                    IdPedido: novoPedido.IdPedido,
                    IdProduto: produto.IdProduto,
                    QtPedida: produto.QtPedida
                });

                const produtoAtual = await Produto.findByPk(produto.IdProduto);
                if (produtoAtual) {
                    produtoAtual.QtDisponivelEstoque -= produto.QtPedida;
                    await produtoAtual.save();

                    const estoque = await Estoque.findOne({ where: { IdProduto: produto.IdProduto } });
                    if (!estoque) {
                        await Estoque.create({
                            IdProduto: produto.IdProduto,
                            nome_produto: produtoAtual.nome,
                            QtDisponivel: produtoAtual.QtDisponivelEstoque
                        });
                    } else {
                        estoque.QtDisponivel = produtoAtual.QtDisponivelEstoque;
                        await estoque.save();
                    }
                }
            }));

            res.status(201).json(novoPedido);
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },



    updatePedido: async (req, res) => {
        const { id } = req.params;
        const { DtPedido, StPedido, VlPedido, IdCliente, produtos } = req.body;
        try {

            const pedido = await Pedidos.findByPk(id);
            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }

            const QtPedida = produtos.reduce((total, produto) => total + produto.QtPedida, 0);

            const produtosAntigos = await PedidoProduto.findAll({ where: { IdPedido: id } });

            await pedido.update({ DtPedido, StPedido, VlPedido, IdCliente, QtPedida });

            await PedidoProduto.destroy({ where: { IdPedido: id } });

            await Promise.all(produtos.map(async (produto) => {
                await PedidoProduto.create({
                    IdPedido: id,
                    IdProduto: produto.IdProduto,
                    QtPedida: produto.QtPedida
                });
            }));

            await Promise.all(produtosAntigos.map(async (produtoAntigo) => {
                const produtoAtual = await Produto.findByPk(produtoAntigo.IdProduto);
                const novaQtEstoque = produtoAtual.QtDisponivelEstoque + produtoAntigo.QtPedida;
                await produtoAtual.update({ QtDisponivelEstoque: novaQtEstoque });

                const estoque = await Estoque.findOne({ where: { IdProduto: produtoAtual.IdProduto } });
                if (estoque) {
                    estoque.QtDisponivel = produtoAtual.QtDisponivelEstoque;
                    await estoque.save();
                }
            }));

            await Promise.all(produtos.map(async (produto) => {
                const produtoAtual = await Produto.findByPk(produto.IdProduto);
                produtoAtual.QtDisponivelEstoque -= produto.QtPedida;
                await produtoAtual.save();


                const estoque = await Estoque.findOne({ where: { IdProduto: produtoAtual.IdProduto } });
                if (estoque) {
                    estoque.QtDisponivel = produtoAtual.QtDisponivelEstoque;
                    await estoque.save();
                }
            }));

            res.json(pedido);
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },



    deletePedido: async (req, res) => {
        const { id } = req.params;
        try {
            const pedido = await Pedidos.findByPk(id);
            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }


            const produtosPedido = await PedidoProduto.findAll({ where: { IdPedido: id } });


            await PedidoProduto.destroy({ where: { IdPedido: id } });


            await Promise.all(produtosPedido.map(async (produtoPedido) => {
                const produtoAtual = await Produto.findByPk(produtoPedido.IdProduto);
                const novaQtEstoque = produtoAtual.QtDisponivelEstoque + produtoPedido.QtPedida;
                await produtoAtual.update({ QtDisponivelEstoque: novaQtEstoque });

                const estoque = await Estoque.findOne({ where: { IdProduto: produtoAtual.IdProduto } });
                if (estoque) {
                    estoque.QtDisponivel = produtoAtual.QtDisponivelEstoque;
                    await estoque.save();
                }
            }));

            
            await pedido.destroy();

            res.json({ message: 'Pedido excluído com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir pedido:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

};

module.exports = pedidosController;