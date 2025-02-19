const express = require('express');
const SalesController = require('../controllers/SalesController');

const router = express.Router();

// Rotas de Vendas
router.post('/', SalesController.create); // Criar venda
router.get('/', SalesController.findAll); // Listar todas as vendas

module.exports = router;

