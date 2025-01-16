const express = require('express');
const StockController = require('../controllers/StockController');

const router = express.Router();

// Rotas de Estoques
router.post('/', StockController.create); // Criar estoque
router.get('/', StockController.findAll); // Listar todos os estoques
router.get('/:id', StockController.findById); // Buscar estoque por ID
router.put('/:id', StockController.update); // Atualizar estoque por ID
router.delete('/:id', StockController.delete); // Deletar estoque por ID

module.exports = router;

