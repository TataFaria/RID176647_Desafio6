const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendaController');

// Rotas CRUD para vendas
router.post('/', vendasController.createVenda);  // Criar venda
router.get('/', vendasController.getVendas);     // Listar todas as vendas
router.get('/:id', vendasController.getVendaById);  // Obter venda por ID
router.put('/:id', vendasController.updateVenda);   // Atualizar venda
router.delete('/:id', vendasController.deleteVenda); // Excluir venda

module.exports = router;
