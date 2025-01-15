const Produto = require('../models/Produto');

// Criar um novo produto
exports.createProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, categoria } = req.body;
    if (!nome || preco === undefined) {
      return res.status(400).json({ error: 'Nome e preço são necessários' });
    }
    const novoProduto = await Produto.create({ nome, descricao, preco, categoria });
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error('Erro ao criar produto:', error);  // Adicionando log de erro
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

// Listar todos os produtos
exports.getProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
};

// Obter produto por ID
exports.getProdutoById = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter produto:', error);
    res.status(500).json({ error: 'Erro ao obter produto' });
  }
};

// Atualizar produto
exports.updateProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, categoria } = req.body;
    const [updated] = await Produto.update({ nome, descricao, preco, categoria }, { where: { id } });
    if (updated) {
      const updatedProduto = await Produto.findByPk(id);
      res.status(200).json(updatedProduto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

// Excluir produto
exports.deleteProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Produto.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();  // Sem conteúdo
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
};