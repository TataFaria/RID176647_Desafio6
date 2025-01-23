const { Op } = require('sequelize')
const sequelize = require('../database/Connection');
const Produtos = require('../models/Produtos')(sequelize);
const Estoque = require('../models/Estoque')(sequelize);

const produtosController = {
    getProdutos: async (req, res) => {
        try {
            const produtos = await Produtos.findAll({
                attributes:
                    [
                        'nome',
                        'descricao',
                        'preco'
                    ]
            });
            res.json(produtos);
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },


    getProdutoById: async (req, res) => {
        const { id } = req.params;
        try {
            const produto = await Produtos.findByPk(id);
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.json(produto);
        } catch (error) {
            console.error('Erro ao obter produto:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },


    createProduto: async (req, res) => {
        const { nome, descricao, preco, QtDisponivelEstoque } = req.body;
        try {
            const novoCliente = await Produtos.create({ nome, descricao, preco, QtDisponivelEstoque }); 
            res.status(201).json(novoCliente);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    updateProduto: async (req, res) => {
        const { id } = req.params;
        const { nome, descricao, preco, QtDisponivelEstoque } = req.body;
        try {
            const produto = await Produtos.findByPk(id); 
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            await produto.update({ nome, descricao, preco, QtDisponivelEstoque }); 

            const estoque = await Estoque.findOne({ where: { IdProduto: id } });
            if (estoque) {
                estoque.nome_produto = nome;
                estoque.QtDisponivel = QtDisponivelEstoque;
                await estoque.save();
            }

            res.json(produto); 
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    deleteProduto: async (req, res) => {
        const { id } = req.params;
        try {
            await Estoque.destroy({ where: { IdProduto: id } });


            const deletedCount = await Produtos.destroy({ where: { IdProduto: id } });
            if (deletedCount === 0) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            res.json({ message: 'Produto excluído com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
};



module.exports = produtosController;
