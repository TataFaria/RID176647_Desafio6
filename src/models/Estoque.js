const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  const Estoque = sequelize.define('estoque', {
    IdProduto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome_produto: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    QtDisponivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'estoque',
    timestamps: false
  });

  return Estoque;
};

