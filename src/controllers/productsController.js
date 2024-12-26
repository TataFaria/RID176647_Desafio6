const Produto = require('../models/Product');

module.exports = {
    async listar(req, res) {
        try {
            const produtos = await Produto.findAll();
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produtos' });
        }
    },

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const produto = await Produto.findByPk(id);
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.status(200).json(produto);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    },

    async criar(req, res) {
        try {
            const { nome, descricao, marca, preco, quantidade_estoque } = req.body;
            const novoProduto = await Produto.create({
                nome,
                descricao,
                marca,
                preco,
                quantidade_estoque
            });
            res.status(201).json(novoProduto);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar produto' });
        }
    },

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao, marca, preco, quantidade_estoque } = req.body;

            const produto = await Produto.findByPk(id);
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            await produto.update({
                nome,
                descricao,
                marca,
                preco,
                quantidade_estoque
            });

            res.status(200).json(produto);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    },

    async excluir(req, res) {
        try {
            const { id } = req.params;

            const produto = await Produto.findByPk(id);
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            await produto.destroy();
            res.status(200).json({ message: 'Produto excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir produto' });
        }
    }
};
