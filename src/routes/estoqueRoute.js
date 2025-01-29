const express = require("express");
const router = express.Router();
const estoqueController = require('../controllers/EstoqueController');

router.get("/", estoqueController.listarEstoque); 
router.put("/:produto_id", estoqueController.atualizarEstoque); 
router.post("/", estoqueController.adicionarEstoque); 
router.delete("/:produto_id", estoqueController.removerEstoque); 

module.exports = router;



