const Estoque = require('../models/Estoque');
const Produto = require("../models/Produtos");

exports.listarEstoque = async (req, res) => {
  try {
    const estoque = await Estoque.findAll({
      include: { model: Produto, attributes: ["nome_produto", "descricao_produto"] },
    });
    res.json(estoque);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar estoque." });
  }
};

exports.atualizarEstoque = async (req, res) => {
  try {
    const { produto_id } = req.params;
    const { quantidade_disponivel } = req.body;

    const estoque = await Estoque.findOne({ where: { produto_id } });

    if (!estoque) {
      return res.status(404).json({ error: "Produto não encontrado no estoque." });
    }

    estoque.quantidade_disponivel = quantidade_disponivel;
    await estoque.save();

    res.json({ message: "Estoque atualizado com sucesso.", estoque });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar estoque." });
  }
};
