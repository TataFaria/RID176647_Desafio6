const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController')

router.get('/', salesController.getSales)
router.post('/newsale', salesController.newSale)

module.exports = router;