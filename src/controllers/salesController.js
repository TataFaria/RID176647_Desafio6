const Venda = require('../models/Sales');
const ItemVenda = require('../models/SalesItem');
const Produto = require('../models/Product');

module.exports = {
    async registrar(req, res) {
        const { id_cliente, itens } = req.body;
        try {
            let total = 0;
            const novaVenda = await Venda.create({ id_cliente, total });

            for (const item of itens) {
                const produto = await Produto.findByPk(item.id_produto);
                if (!produto || produto.quantidade_estoque < item.quantidade) {
                    return res.status(400).json({ error: 'Produto indisponível ou quantidade insuficiente' });
                }

                const precoUnitario = produto.preco;
                total += item.quantidade * precoUnitario;

                await ItemVenda.create({
                    id_venda: novaVenda.id,
                    id_produto: item.id_produto,
                    quantidade: item.quantidade,
                    preco_unitario: precoUnitario
                });

               
                await produto.update({
                    quantidade_estoque: produto.quantidade_estoque - item.quantidade
                });
            }

            
            await novaVenda.update({ total });

            res.status(201).json(novaVenda);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao registrar venda' });
        }
    },

 
    async listar(req, res) {
        try {
            const vendas = await Venda.findAll();
            res.status(200).json(vendas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar vendas' });
        }
    },


    async detalhes(req, res) {
        try {
            const { id } = req.params;
            const venda = await Venda.findByPk(id, {
                include: [{ model: ItemVenda }]
            });

            if (!venda) {
                return res.status(404).json({ error: 'Venda não encontrada' });
            }

            res.status(200).json(venda);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar detalhes da venda' });
        }
    }
};
