const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/Connection');
const Produto = require('./Product');
const Venda = require('./Sales');

const ItemVenda = sequelize.define('ItemVenda', {
    id_venda: { type: DataTypes.INTEGER, allowNull: false, references: { model: Venda, key: 'id' } },
    id_produto: { type: DataTypes.INTEGER, allowNull: false, references: { model: Produto, key: 'id' } },
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    preco_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

module.exports = ItemVenda;