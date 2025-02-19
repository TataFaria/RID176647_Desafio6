const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');
const Stock = require('./Stock'); // Importando o modelo relacionado
const Order = require('./Order'); // Importando o modelo relacionado
const Sales = require('./Sales'); // Importando o modelo relacionado
const ItemSales = require('./ItemSales'); // Tabela associativa

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'products', // Nome da tabela no banco de dados
    timestamps: true,
});

// Relacionamentos

// 1. Relacionamento com Stock (1:1)
Product.hasOne(Stock, { foreignKey: 'id_product', onDelete: 'CASCADE' });
Stock.belongsTo(Product, { foreignKey: 'id_product' });

// 2. Relacionamento com Order (1:N)
Product.hasMany(Order, { foreignKey: 'id_product', onDelete: 'CASCADE' });
Order.belongsTo(Product, { foreignKey: 'id_product' });

// 3. Relacionamento com Sales (N:M)
Product.belongsToMany(Sales, { through: ItemSales, foreignKey: 'id_product' });
Sales.belongsToMany(Product, { through: ItemSales, foreignKey: 'id_sales' });

module.exports = Product;
