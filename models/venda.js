'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cliente.hasMany(Venda, { foreignKey: 'cliente_id', onDelete: 'CASCADE' });
      Venda.belongsTo(Cliente, { foreignKey: 'cliente_id' });
    }
  }
  Venda.init({
    venda_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    cliente_id: DataTypes.INTEGER,
    total_venda: DataTypes.DECIMAL,
    data_venda: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Venda',
  });
  return Venda;
};