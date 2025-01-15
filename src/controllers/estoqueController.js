const Estoque = require('../models/Estoque');

// Criar um novo estoque
exports.createEstoque = async (req, res) => {
  try {
    const { produto_id, quantidade } = req.body;
    const novoEstoque = await Estoque.create({ produto_id, quantidade });
    res.status(201).json(novoEstoque);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar estoque' });
  }
};

// Listar todos os estoques
exports.getEstoques = async (req, res) => {
  try {
    const estoques = await Estoque.findAll();  
    res.status(200).json(estoques);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar estoques' });
  }
};

// Obter estoque por ID
exports.getEstoqueById = async (req, res) => {
  try {
    const { id } = req.params;
    const estoque = await Estoque.findByPk(id);  
    if (estoque) {
      res.status(200).json(estoque);
    } else {
      res.status(404).json({ error: 'Estoque não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter estoque' });
  }
};

// Atualizar estoque
exports.updateEstoque = async (req, res) => {
  try {
    const { id } = req.params;
    const { produto_id, quantidade } = req.body;
    const [updated] = await Estoque.update({ produto_id, quantidade }, { where: { id } });
    if (updated) {
      const updatedEstoque = await Estoque.findByPk(id);
      res.status(200).json(updatedEstoque);
    } else {
      res.status(404).json({ error: 'Estoque não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar estoque' });
  }
};

// Excluir estoque
exports.deleteEstoque = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Estoque.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();  
    } else {
      res.status(404).json({ error: 'Estoque não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir estoque' });
  }
};