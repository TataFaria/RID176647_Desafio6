'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) { }
  }
  Produto.init({
    produto_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      },
    nome_produto: DataTypes.STRING,
    descricao_produto: DataTypes.TEXT,
    preco_produto: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Produtos',
  });
  return Produto;
};