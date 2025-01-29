const Estoque = require('../models/Estoque');
const Produto = require("../models/Produtos");

// Listar Estoque
exports.listarEstoque = async (req, res) => {
  try {
    const estoque = await Estoque.findAll({
      include: { model: Produto, attributes: ["nome", "descricao"] },
    });
    res.json(estoque);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar estoque." });
  }
};

// Atualizar Estoque
exports.atualizarEstoque = async (req, res) => {
  try {
    const { produto_id } = req.params;
    const { quantidade_disponivel } = req.body;

    if (isNaN(quantidade_disponivel) || quantidade_disponivel < 0) {
      return res.status(400).json({ error: "Quantidade inválida." });
    }

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

// Adicionar novo item ao estoque
exports.adicionarEstoque = async (req, res) => {
  try {
    const { produto_id, quantidade_disponivel } = req.body;

    if (!produto_id || isNaN(quantidade_disponivel) || quantidade_disponivel < 0) {
      return res.status(400).json({ error: "Dados inválidos." });
    }

    const produto = await Produto.findByPk(produto_id);
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    const estoque = await Estoque.create({ produto_id, quantidade_disponivel });
    res.status(201).json(estoque);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar estoque." });
  }
};

// Remover item do estoque
exports.removerEstoque = async (req, res) => {
  try {
    const { produto_id } = req.params;
    const deleted = await Estoque.destroy({ where: { produto_id } });

    if (!deleted) return res.status(404).json({ error: "Produto não encontrado no estoque." });

    res.json({ message: "Produto removido do estoque com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover estoque." });
  }
};
