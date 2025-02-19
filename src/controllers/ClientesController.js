const Cliente = require('../models/Clientes');

exports.criarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar cliente." });
  }
};

exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar clientes." });
  }
};

exports.atualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Cliente.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: "Cliente não encontrado." });
    res.json({ message: "Cliente atualizado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar cliente." });
  }
};

exports.excluirCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cliente.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Cliente não encontrado." });
    res.json({ message: "Cliente excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir cliente." });
  }
};

