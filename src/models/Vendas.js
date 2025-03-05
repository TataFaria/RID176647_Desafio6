const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');
const Cliente = require('./Clientes');

const Venda = sequelize.define('Venda', {
    venda_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    data_venda: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },

    total_venda: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
}, {
    tableName: 'vendas',
    timestamps: true,
});

Cliente.hasMany(Venda, { foreignKey: 'cliente_id', onDelete: 'CASCADE' });
Venda.belongsTo(Cliente, { foreignKey: 'cliente_id' });

module.exports = Venda;

