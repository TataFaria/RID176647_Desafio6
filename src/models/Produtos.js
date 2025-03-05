const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');

const Produto = sequelize.define(
    "Produto",
    {
        produto_id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        nome_produto: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        descricao_produto: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        preco_produto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, 
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "produtos", 
        timestamps: true,
    }
);

module.exports = Produto;