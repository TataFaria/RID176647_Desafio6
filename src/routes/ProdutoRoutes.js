const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rotas CRUD para produtos
router.post('/', produtoController.createProduto);  // Criar produto
router.get('/', produtoController.getProdutos);      // Listar todos os produtos
router.get('/:id', produtoController.getProdutoById);  // Obter produto por ID
router.put('/:id', produtoController.updateProduto);   // Atualizar produto
router.delete('/:id', produtoController.deleteProduto); // Excluir produto

module.exports = router;
