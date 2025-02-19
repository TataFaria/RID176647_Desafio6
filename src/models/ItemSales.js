const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');
const Product = require('./Product');
const Sales = require('./Sales');

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
    tableName: 'item_sales', // Nome da tabela no banco de dados
    timestamps: true,
});

// Relacionamentos
ItemSales.belongsTo(Sales, { foreignKey: 'id_sales', onDelete: 'CASCADE' });
ItemSales.belongsTo(Product, { foreignKey: 'id_product', onDelete: 'CASCADE' });

module.exports = ItemSales;
