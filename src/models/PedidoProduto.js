const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  const Pedido_Produto = sequelize.define('pedido_produto', {
    IdPedido_Produto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IdProduto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'produtos',
        key: 'IdProduto'
      }
    },
    IdPedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pedidos',
        key: 'IdPedido'
      }
    },
    QtPedida: {
      type: DataTypes.INTEGER, 
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pedido_produto',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IdPedido_Produto" }
        ]
      },
      {
        name: "IdProduto",
        using: "BTREE",
        fields: [
          { name: "IdProduto" },
        ]
      },
      {
        name: "IdPedido",
        using: "BTREE",
        fields: [
          { name: "IdPedido" },
        ]
      },
    ]
  });


  return Pedido_Produto;
};