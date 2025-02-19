const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');

const Estoque = sequelize.define('Estoque', {
    produto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Produtos',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    quantidade_disponivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    data_atualizacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Estoque',
    timestamps: false,
});

module.exports = Estoque;

