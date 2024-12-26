const express = require('express');
const router = express.Router();
const Produto = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json(produto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nome, descricao, marca, preco, quantidade_estoque } = req.body;
        const novoProduto = await Produto.create({ nome, descricao, marca, preco, quantidade_estoque });
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
        const { nome, descricao, marca, preco, quantidade_estoque } = req.body;
        await produto.update({ nome, descricao, marca, preco, quantidade_estoque });
        res.json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
        await produto.destroy();
        res.json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;