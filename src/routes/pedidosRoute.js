const express = require("express");
const router = express.Router();
const pedidoController = require('../controllers/pedidosController');

router.post("/", pedidoController.criarPedido); // Criar pedido
router.get("/", pedidoController.listarPedidos); // Listar pedidos
router.put("/:id", pedidoController.atualizarPedido); // Atualizar pedido
router.delete("/:id", pedidoController.excluirPedido); // Excluir pedido

module.exports = router;
