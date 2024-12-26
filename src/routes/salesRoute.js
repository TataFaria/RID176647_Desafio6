const express = require('express');
const router = express.Router();
const Venda = require('../models/Sales');
const ItemVenda = require('../models/SalesItem');
const Produto = require('../models/Product');


router.post('/', async (req, res) => {
    const { id_cliente, itens } = req.body; 
    try {
        let total = 0;
        for (const item of itens) {
            const produto = await Produto.findByPk(item.id_produto);
            if (!produto) return res.status(400).json({ message: `Produto ID ${item.id_produto} não encontrado` });
            if (produto.quantidade_estoque < item.quantidade) {
                return res.status(400).json({ message: `Estoque insuficiente para o produto ID ${item.id_produto}` });
            }
            total += produto.preco * item.quantidade;
        }

       
        const venda = await Venda.create({ id_cliente, total });

      
        for (const item of itens) {
            const produto = await Produto.findByPk(item.id_produto);
            await ItemVenda.create({
                id_venda: venda.id,
                id_produto: item.id_produto,
                quantidade: item.quantidade,
                preco_unitario: produto.preco
            });
            await produto.update({ quantidade_estoque: produto.quantidade_estoque - item.quantidade });
        }

        res.status(201).json(venda);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const vendas = await Venda.findAll();
        res.json(vendas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const venda = await Venda.findByPk(req.params.id);
        if (!venda) return res.status(404).json({ message: 'Venda não encontrada' });

        const itens = await ItemVenda.findAll({ where: { id_venda: venda.id } });
        res.json({ venda, itens });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;