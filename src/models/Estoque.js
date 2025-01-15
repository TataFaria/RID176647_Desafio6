const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
const Produto = require('./Produto');

const Estoque = sequelize.define('Estoque', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Produto,
      key: 'id',
    },
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Estoques',
  timestamps: false,  
});

module.exports = Estoque;