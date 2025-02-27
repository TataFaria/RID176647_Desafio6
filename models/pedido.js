'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pedido.init({
    venda_id: DataTypes.INTEGER,
    produto_id: DataTypes.INTEGER,
    quantidade_pedido: DataTypes.INTEGER,
    subtotal_pedido: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};