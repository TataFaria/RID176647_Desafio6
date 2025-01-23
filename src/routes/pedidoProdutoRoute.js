const express = require('express');
const router = express.Router();
const pedidoProdutoController = require('../controllers/PedidoProdutoController');

router.get('/:id', pedidoProdutoController.getPedidosProduto);

module.exports = router;