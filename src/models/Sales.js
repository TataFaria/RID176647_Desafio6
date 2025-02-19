const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');
const Client = require('./Client');
const Product = require('./Product');

const Sales = sequelize.define('Sales', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valorVenda: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'sales', // Nome da tabela no banco de dados
    timestamps: true,
});

// Relacionamentos
Sales.belongsTo(Client, { foreignKey: 'id_client', onDelete: 'CASCADE' });
Client.hasMany(Sales, { foreignKey: 'id_client', onDelete: 'CASCADE' });

Sales.belongsTo(Product, { foreignKey: 'id_product', onDelete: 'CASCADE' });
Product.hasMany(Sales, { foreignKey: 'id_product', onDelete: 'CASCADE' });

module.exports = Sales;
