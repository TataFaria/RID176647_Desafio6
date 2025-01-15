const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

// Rotas CRUD para estoques
router.post('/', estoqueController.createEstoque);  // Criar estoque
router.get('/', estoqueController.getEstoques);     // Listar todos os estoques
router.get('/:id', estoqueController.getEstoqueById);  // Obter estoque por ID
router.put('/:id', estoqueController.updateEstoque);   // Atualizar estoque
router.delete('/:id', estoqueController.deleteEstoque); // Excluir estoque

module.exports = router;
