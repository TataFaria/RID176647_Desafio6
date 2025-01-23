const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('clientes', {
    IdCliente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contato: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'clientes',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IdCliente" },
        ]
      },
    ]
  });
};

