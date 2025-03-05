const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');

const Estoque = sequelize.define('estoque', {
    estoque_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    
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
}, {
    tableName: 'Estoques',
    timestamps: false,
});

module.exports = Estoque;


