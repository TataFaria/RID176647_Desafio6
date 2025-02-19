const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clientesController");

router.post("/", clienteController.criarCliente);
router.get("/", clienteController.listarClientes);
router.put("/:id", clienteController.atualizarCliente);
router.delete("/:id", clienteController.excluirCliente);

module.exports = router;
