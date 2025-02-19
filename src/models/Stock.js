const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');
const Product = require('./Product');

const Stock = sequelize.define('Stock', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'stocks', // Nome da tabela no banco de dados
    timestamps: true,
});

// Relacionamento
Stock.belongsTo(Product, { foreignKey: 'id_product', onDelete: 'CASCADE' });
Product.hasOne(Stock, { foreignKey: 'id_product', onDelete: 'CASCADE' });

module.exports = Stock;
