const sequelize = require('../database/Connection');
const Estoque = require('../models/Estoque')(sequelize);
const Produto = require('../models/Produtos')(sequelize);

const estoqueController = {
    getEstoque: async (req, res) => {
        try {
            const estoque = await Estoque.findAll({
                attributes:
                    [
                        'nome_produto',
                        'QtDisponivel'
                    ]
            });
            res.json(estoque);
        } catch (error) {
            console.error('Erro ao obter estoque:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    getEstoqueById: async (req, res) => {
        const { id } = req.params;
        try {
            const estoque = await Estoque.findByPk(id);
            if (!estoque) {
                return res.status(404).json({ error: 'Estoque não localizado' });
            }
            res.json(estoque);
        } catch (error) {
            console.error('Erro ao obter estoque:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    updateEstoque: async (req, res) => {
        const { id } = req.params;
        const { QtDisponivel } = req.body;
        try {
            const estoque = await Estoque.findByPk(id);
            if (!estoque) {
                return res.status(404).json({ error: 'Estoque não encontrado' });
            }
            await estoque.update({ QtDisponivel });

            const produto = await Produto.findOne({ where: { IdProduto: id } });
            if (produto) {
                produto.QtDisponivelEstoque =  QtDisponivel;
                await produto.save();
            }


            res.json(estoque);
        } catch (error) {
            console.error('Erro ao atualizar estoque:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    deleteEstoque: async (req, res) => {
        const { id } = req.params;
        try {
            
            await Estoque.destroy({ where: { IdProduto: id } });

            const deletedCount = await Produto.destroy({ where: { IdProduto: id } });
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






module.exports = estoqueController;