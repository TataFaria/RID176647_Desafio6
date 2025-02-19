const express = require("express");
const router = express.Router();
const vendaController = require('../controllers/vendaController');

router.post("/", vendaController.criarVenda);
router.get("/", vendaController.listarVendas);
router.put("/:id", vendaController.atualizarVenda); 
router.delete("/:id", vendaController.excluirVenda); 

module.exports = router;
