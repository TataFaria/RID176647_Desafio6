const express = require('express');
const ClientController = require('../controllers/ClientController');

const router = express.Router();

// Rotas de Clientes
router.post('/', ClientController.create); // Criar cliente
router.get('/', ClientController.findAll); // Listar todos os clientes
router.get('/:id', ClientController.findById); // Buscar cliente por ID
router.put('/:id', ClientController.update); // Atualizar cliente por ID
router.delete('/:id', ClientController.delete); // Deletar cliente por ID

module.exports = router;
