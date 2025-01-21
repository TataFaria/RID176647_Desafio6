const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');

const Sales = sequelize.define('Sales', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    valorVenda: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'sales',
    timestamps: true,
});

module.exports = Sales;

