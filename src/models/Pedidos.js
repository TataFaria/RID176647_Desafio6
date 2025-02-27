const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');
const Venda = require('./Vendas');
const Produto = require('./Produtos');


const Pedido = sequelize.define('pedidos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    },

    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    },
    
}, {
    tableName: 'Pedidos',
    timestamps: true,
});

Venda.hasMany(Pedido, { foreignKey: 'venda_id', onDelete: 'CASCADE' });
Pedido.belongsTo(Venda, { foreignKey: 'venda_id' });

Produto.hasMany(Pedido, { foreignKey: 'produto_id', onDelete: 'CASCADE' });
Pedido.belongsTo(Produto, { foreignKey: 'produto_id' });

module.exports = Pedido;