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
            model: 'produtos',
            key: 'produto_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    quantidade_disponivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'estoque',
    timestamps: false,
});

module.exports = Estoque;


