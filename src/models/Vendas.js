const {DataTypes} = require('sequelize');
const sequelize = require('../database/Connection');
const Cliente = require('./Clientes');

const Venda = sequelize.define('vendas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    data_venda: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    },

    total_venda: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
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
    tableName: 'Vendas',
    timestamps: true,
});

Cliente.hasMany(Venda, { foreignKey: 'cliente_id', onDelete: 'CASCADE' });
Venda.belongsTo(Cliente, { foreignKey: 'cliente_id' });

module.exports = Venda;

