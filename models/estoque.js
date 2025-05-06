'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Estoque extends Model {
    static associate(models) {
      Estoque.belongsTo(models.Produtos, {
        foreignKey: 'produto_id',
        as: 'produto'
      });
    }
  }

  Estoque.init({
    estoque_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    produto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidade_disponivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'Estoque',
    tableName: 'estoque', 
    timestamps: true,
  });

  return Estoque;
};
