const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');

const ItemSales = sequelize.define('ItemSales', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precoUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'item_sales', 
    timestamps: true,
});


module.exports = ItemSales;
