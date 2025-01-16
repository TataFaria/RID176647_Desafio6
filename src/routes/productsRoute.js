const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

// Rotas de Produtos
router.post('/', ProductController.create); // Criar produto
router.get('/', ProductController.findAll); // Listar todos os produtos
router.get('/:id', ProductController.findById); // Buscar produto por ID
router.put('/:id', ProductController.update); // Atualizar produto por ID
router.delete('/:id', ProductController.delete); // Deletar produto por ID

module.exports = router;

