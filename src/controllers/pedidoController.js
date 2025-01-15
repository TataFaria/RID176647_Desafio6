const Pedido = require('../models/Pedido');

// Criar um novo pedido
exports.createPedido = async (req, res) => {
  try {
    const { cliente_id, data_pedido, valor_total } = req.body;  
    if (cliente_id === undefined || data_pedido === undefined || valor_total === undefined) {
      return res.status(400).json({ error: 'Todos os campos são necessários' });
    }
    const novoPedido = await Pedido.create({ cliente_id, data_pedido, valor_total });
    res.status(201).json(novoPedido);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
};

// Listar todos os pedidos
exports.getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar pedidos' });
  }
};

// Obter pedido por ID
exports.getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByPk(id);
    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ error: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter pedido' });
  }
};

// Atualizar pedido
exports.updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente_id, data_pedido, valor_total, status } = req.body;
    const [updated] = await Pedido.update({ cliente_id, data_pedido, valor_total, status }, { where: { id } });
    if (updated) {
      const updatedPedido = await Pedido.findByPk(id);
      res.status(200).json(updatedPedido);
    } else {
      res.status(404).json({ error: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pedido' });
  }
};

// Excluir pedido
exports.deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Pedido.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();  // Sem conteúdo
    } else {
      res.status(404).json({ error: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir pedido' });
  }
};

