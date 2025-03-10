'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
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