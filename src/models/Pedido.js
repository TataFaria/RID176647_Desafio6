const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Clientes', 
      key: 'id'
    }
  },
  data_pedido: {
    type: DataTypes.DATE,
    allowNull: false
  },
  valor_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'Pedidos',
  timestamps: false
});

module.exports = Pedido;