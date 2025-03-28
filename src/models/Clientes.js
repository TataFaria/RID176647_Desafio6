const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');

const Cliente = sequelize.define('clientes', {
    cliente_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
    },
    nome_cliente: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email_cliente: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    telefone_cliente: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: 'Clientes',
    timestamps: true,
});

module.exports = Cliente;

