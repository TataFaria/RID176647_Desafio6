const express = require('express');
const OrderController = require('../controllers/OrderController');

const router = express.Router();

// Rotas de Pedidos
router.post('/', OrderController.create); // Criar pedido
router.get('/', OrderController.findAll); // Listar todos os pedidos
router.get('/:id', OrderController.findById); // Buscar pedido por ID
router.put('/:id', OrderController.update); // Atualizar pedido por ID
router.delete('/:id', OrderController.delete); // Deletar pedido por ID

module.exports = router;
