const Venda = require('../models/Venda');

// Criar uma nova venda
exports.createVenda = async (req, res) => {
  try {
    const { pedido_id, produto_id, quantidade, preco_venda } = req.body;
    if (!pedido_id || !produto_id || !quantidade || !preco_venda) {
      return res.status(400).json({ error: 'Todos os campos são necessários' });
    }
    const novaVenda = await Venda.create({ pedido_id, produto_id, quantidade, preco_venda });
    res.status(201).json(novaVenda);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar venda' });
  }
};

// Listar todas as vendas
exports.getVendas = async (req, res) => {
  try {
    const vendas = await Venda.findAll();
    res.status(200).json(vendas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar vendas' });
  }
};

// Obter venda por ID
exports.getVendaById = async (req, res) => {
  try {
    const { id } = req.params;
    const venda = await Venda.findByPk(id);
    if (venda) {
      res.status(200).json(venda);
    } else {
      res.status(404).json({ error: 'Venda não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter venda' });
  }
};

// Atualizar venda
exports.updateVenda = async (req, res) => {
  try {
    const { id } = req.params;
    const { pedido_id, produto_id, quantidade, preco_venda } = req.body;
    const [updated] = await Venda.update({ pedido_id, produto_id, quantidade, preco_venda }, { where: { id } });
    if (updated) {
      const updatedVenda = await Venda.findByPk(id);
      res.status(200).json(updatedVenda);
    } else {
      res.status(404).json({ error: 'Venda não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar venda' });
  }
};

// Excluir venda
exports.deleteVenda = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Venda.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send(); 
    } else {
      res.status(404).json({ error: 'Venda não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir venda' });
  }
};