const Pedido = require('../models/Pedidos');
const Estoque = require('../models/Estoque');
const Produto = require('../models/Produtos');

exports.criarPedido = async (req, res) => {
  try {
    const { venda_id, produto_id, quantidade_pedido } = req.body;

    // Verificar se o produto existe e tem estoque disponível
    const produtoEstoque = await Estoque.findOne({ where: { produto_id } });
    if (!produtoEstoque || produtoEstoque.quantidade_disponivel < quantidade_pedido) {
      return res.status(400).json({
        error: `Estoque insuficiente para o produto ${produto_id}.`,
      });
    }

    // Calcular subtotal
    const produto = await Produto.findByPk(produto_id);
    const subtotal_pedido = quantidade_pedido * produto.preco_produto;

    // Criar o pedido
    const pedido = await Pedido.create({
      venda_id,
      produto_id,
      quantidade_pedido,
      subtotal_pedido,
    });

    // Atualizar o estoque
    produtoEstoque.quantidade_disponivel -= quantidade_pedido;
    await produtoEstoque.save();

    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar pedido." });
  }
};

exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [
        { model: Produto, attributes: ["nome_produto", "preco_produto"] },
      ],
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar pedidos." });
  }
};

exports.atualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantidade_pedido, produto_id } = req.body;

    // Verificar se o pedido existe
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    // Verificar o estoque
    const produtoEstoque = await Estoque.findOne({ where: { produto_id } });
    const diferenca = quantidade_pedido - pedido.quantidade_pedido;

    if (produtoEstoque.quantidade_disponivel < diferenca) {
      return res.status(400).json({
        error: "Estoque insuficiente para atender à atualização.",
      });
    }

    // Atualizar o pedido
    pedido.quantidade_pedido = quantidade_pedido;
    pedido.subtotal_pedido = quantidade_pedido * (await Produto.findByPk(produto_id)).preco_produto;
    await pedido.save();

    // Atualizar o estoque
    produtoEstoque.quantidade_disponivel -= diferenca;
    await produtoEstoque.save();

    res.json({ message: "Pedido atualizado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar pedido." });
  }
};

exports.excluirPedido = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se o pedido existe
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    // Devolver o estoque ao excluir
    const produtoEstoque = await Estoque.findOne({ where: { produto_id: pedido.produto_id } });
    produtoEstoque.quantidade_disponivel += pedido.quantidade_pedido;
    await produtoEstoque.save();

    // Excluir o pedido
    await pedido.destroy();

    res.json({ message: "Pedido excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir pedido." });
  }
};
