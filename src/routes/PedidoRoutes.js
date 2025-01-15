const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Rotas CRUD para pedidos
router.post('/', pedidoController.createPedido);  // Criar pedido
router.get('/', pedidoController.getPedidos);     // Listar todos os pedidos
router.get('/:id', pedidoController.getPedidoById);  // Obter pedido por ID
router.put('/:id', pedidoController.updatePedido);   // Atualizar pedido
router.delete('/:id', pedidoController.deletePedido); // Excluir pedido

module.exports = router;