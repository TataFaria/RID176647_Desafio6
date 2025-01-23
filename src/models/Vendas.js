const {DataTypes} = require('sequelize');

module.exports = function(sequelize, ) {
  return sequelize.define('vendas', {
    IdVenda: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IdPedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pedidos',
        key: 'IdPedido'
      }
    },
    DtVenda: {
      type: DataTypes.DATE,
      allowNull: false
    },
    VlVenda: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IdCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'IdCliente'
      }
    }
  }, {
    sequelize,
    tableName: 'vendas',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IdVenda" },
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
};

