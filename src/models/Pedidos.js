const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  
  return sequelize.define('pedidos', {
    IdPedido: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    QtPedida: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DtPedido: {
      type: DataTypes.DATE,
      allowNull: false
    },
    StPedido: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    VlPedido: {
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
    tableName: 'pedidos',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IdPedido" },
        ]
      },
      {
        name: "IdCliente",
        using: "BTREE",
        fields: [
          { name: "IdCliente" },
        ]
      }
      ,
    ] 
  });
};