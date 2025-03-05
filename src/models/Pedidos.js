const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');
const Venda = require('./Vendas');
const Produto = require('./Produtos');


const Pedido = sequelize.define('Pedido', {
    pedido_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    quantidade_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    subtotal_pedido: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    
}, {
    tableName: 'pedidos',
    timestamps: true,
});

Venda.hasMany(Pedido, { foreignKey: 'venda_id', onDelete: 'CASCADE' });
Pedido.belongsTo(Venda, { foreignKey: 'venda_id' });

Produto.hasMany(Pedido, { foreignKey: 'produto_id', onDelete: 'CASCADE' });
Pedido.belongsTo(Produto, { foreignKey: 'produto_id' });

module.exports = Pedido;