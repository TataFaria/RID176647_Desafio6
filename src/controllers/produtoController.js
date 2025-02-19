const Produto = require('../models/Produtos.js');
const Estoque = require('../models/Estoque.js');

exports.criarProduto = async (req, res) => {
  try {
    const { nome_produto, descricao_produto, preco_produto, quantidade_disponivel } = req.body;
    const produto = await Produto.create({ nome_produto, descricao_produto, preco_produto });

    await Estoque.create({ produto_id: produto.id, quantidade_disponivel });

    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto." });
  }
};

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll({ include: Estoque });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar produtos." });
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Produto.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: "Produto não encontrado." });
    res.json({ message: "Produto atualizado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar produto." });
  }
};

exports.excluirProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Produto.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Produto não encontrado." });
    res.json({ message: "Produto excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir produto." });
  }
};
