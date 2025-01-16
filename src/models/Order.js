const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');
const Product = require('./Product');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valorCompra: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'orders', // Nome da tabela no banco de dados
    timestamps: true,
});

// Relacionamento
Order.belongsTo(Product, { foreignKey: 'id_product', onDelete: 'CASCADE' });
Product.hasMany(Order, { foreignKey: 'id_product', onDelete: 'CASCADE' });

module.exports = Order;
