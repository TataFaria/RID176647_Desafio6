const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/VendasController.js');

router.get('/', vendasController.getVendas);

router.get('/:id', vendasController.getVendaById);

router.post('/', vendasController.createVenda);

router.delete('/:id', vendasController.deleteVenda);


module.exports = router;

