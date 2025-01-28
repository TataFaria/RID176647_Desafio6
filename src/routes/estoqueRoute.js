const express = require("express");
const router = express.Router();
const estoqueController = require('../controllers/EstoqueController');

router.get("/", estoqueController.listarEstoque); // Listar todos os produtos no estoque
router.put("/:produto_id", estoqueController.atualizarEstoque); // Atualizar quantidade de um produto específico no estoque

module.exports = router;



