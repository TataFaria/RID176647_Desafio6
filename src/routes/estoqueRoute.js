const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/EstoqueController.js');

router.get('/', estoqueController.getEstoque);

router.get('/:id',estoqueController.getEstoqueById);

router.put('/:id',estoqueController.updateEstoque);

router.delete('/:id',estoqueController.deleteEstoque);

module.exports = router;

