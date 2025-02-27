const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');

const Produto = sequelize.define('produtos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

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
    tableName: 'Produtos',
    timestamps: true,
});

module.exports = Produto;