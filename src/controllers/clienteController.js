const Cliente = require('../models/Cliente'); 

// Função para listar todos os clientes
exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      attributes: ['id', 'nome', 'email', 'telefone', 'endereco', 'cidade', 'estado', 'cep', 'data_cadastro'], 
    });
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

// Função para listar um cliente pelo ID
exports.listarClientePorId = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id, {
      attributes: ['id', 'nome', 'email', 'telefone', 'endereco', 'cidade', 'estado', 'cep', 'data_cadastro'],
    });

    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
};

// Função para criar um novo cliente
exports.criarCliente = async (req, res) => {
  const { nome, email, senha, telefone, endereco, cidade, estado, cep } = req.body;
  try {
    const cliente = await Cliente.create({
      nome,
      email,
      senha,
      telefone,
      endereco,
      cidade,
      estado,
      cep,
    });
    res.status(201).json(cliente);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
};

// Função para atualizar um cliente existente
exports.atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, telefone, endereco, cidade, estado, cep } = req.body;
  try {
    const [updated] = await Cliente.update(
      { nome, email, senha, telefone, endereco, cidade, estado, cep },
      { where: { id } }
    );

    if (updated) {
      const clienteAtualizado = await Cliente.findByPk(id);
      res.json(clienteAtualizado);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
};

// Função para deletar um cliente pelo ID
exports.deletarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Cliente.destroy({
      where: { id },
    });

    if (deleted) {
      res.status(204).send(); 
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
};