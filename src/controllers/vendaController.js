const Venda = require('../models/Vendas');
const Pedido = require("../models/Pedidos");
const Estoque = require("../models/Estoque");

exports.criarVenda = async (req, res) => {
  const { cliente_id, pedidos } = req.body;
  let total = 0;

  try {
    const venda = await Venda.create({ cliente_id, total_venda: 0 });

    for (const pedido of pedidos) {
      const estoque = await Estoque.findOne({ where: { produto_id: pedido.produto_id } });

      if (!estoque || estoque.quantidade_disponivel < pedido.quantidade_pedido) {
        return res.status(400).json({
          error: `Estoque insuficiente para o produto ${pedido.produto_id}.`,
        });
      }

      estoque.quantidade_disponivel -= pedido.quantidade_pedido;
      await estoque.save();

      const subtotal = pedido.quantidade_pedido * pedido.preco_produto;
      total += subtotal;

      await Pedido.create({
        venda_id: venda.id,
        produto_id: pedido.produto_id,
        quantidade_pedido: pedido.quantidade_pedido,
        subtotal_pedido: subtotal,
      });
    }

    venda.total_venda = total;
    await venda.save();

    res.status(201).json(venda);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar venda." });
  }
};

exports.listarVendas = async (req, res) => {
  try {
    const vendas = await Venda.findAll({ include: [Pedido] });
    res.json(vendas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar vendas." });
  }
};

exports.atualizarVenda = async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente_id } = req.body;

    const venda = await Venda.findByPk(id);
    if (!venda) return res.status(404).json({ error: "Venda não encontrada." });

    venda.cliente_id = cliente_id || venda.cliente_id;
    await venda.save();

    res.json({ message: "Venda atualizada com sucesso.", venda });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar venda." });
  }
};

exports.excluirVenda = async (req, res) => {
  try {
    const { id } = req.params;

    const venda = await Venda.findByPk(id, { include: Pedido });
    if (!venda) return res.status(404).json({ error: "Venda não encontrada." });

  
    for (const pedido of venda.Pedidos) {
      const estoque = await Estoque.findOne({ where: { produto_id: pedido.produto_id } });
      if (estoque) {
        estoque.quantidade_disponivel += pedido.quantidade_pedido;
        await estoque.save();
      }
    }

    await Pedido.destroy({ where: { venda_id: id } }); 
    await venda.destroy(); 

    res.json({ message: "Venda excluída com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir venda." });
  }
};



