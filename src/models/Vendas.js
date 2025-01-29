const {DataTypes} = require('sequelize');
const sequelize = require('../database/Connection');
const Cliente = require('./Clientes');

const Venda = sequelize.define('Venda', {
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'Vendas',
    timestamps: true,
});

Cliente.hasMany(Venda, { foreignKey: 'cliente_id', onDelete: 'CASCADE' });
Venda.belongsTo(Cliente, { foreignKey: 'cliente_id' });

module.exports = Venda;

