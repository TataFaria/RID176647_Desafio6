const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/ProdutosController.js');

router.get('/', produtosController.getProdutos);

router.get('/:id', produtosController.getProdutoById);

router.post('/', produtosController.createProduto);

router.put('/:id', produtosController.updateProduto);

router.delete('/:id', produtosController.deleteProduto);


module.exports = router;

