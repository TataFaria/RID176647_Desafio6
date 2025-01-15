const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');  

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  data_cadastro: {
    type: DataTypes.DATE,  
    defaultValue: DataTypes.NOW,
    allowNull: true
  }
}, {
  timestamps: false,  
  tableName: 'Produtos'  
});

module.exports = Produto;