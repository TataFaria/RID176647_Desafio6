const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/Connection.js');

const Venda = sequelize.define('Venda', {
    id_cliente: { type: DataTypes.INTEGER, allowNull: false },
    data_venda: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

module.exports = Venda;