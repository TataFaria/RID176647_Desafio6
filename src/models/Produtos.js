const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');

const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: 'Produtos',
    timestamps: true,
});

module.exports = Produto;