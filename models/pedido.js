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
      Venda.hasMany(Pedido, { foreignKey: 'venda_id', onDelete: 'CASCADE' });
      Pedido.belongsTo(Venda, { foreignKey: 'venda_id' });

      Produto.hasMany(Pedido, { foreignKey: 'produto_id', onDelete: 'CASCADE' });
      Pedido.belongsTo(Produto, { foreignKey: 'produto_id' });
    }
  }
  Pedido.init({
    pedido_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
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