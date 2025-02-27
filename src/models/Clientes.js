const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');

const Cliente = sequelize.define('clientes', {
    id: { 
    type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: 'Clientes',
    timestamps: true,
});

module.exports = Cliente;

