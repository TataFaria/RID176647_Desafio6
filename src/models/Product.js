const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/Connection.js');

const Produto = sequelize.define('Produto', {
    nome: { type: DataTypes.STRING, allowNull: false, unique: true },
    descricao: { type: DataTypes.STRING },
    marca: { type: DataTypes.STRING },
    preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    quantidade_estoque: { type: DataTypes.INTEGER, defaultValue: 0 }
});

module.exports = Produto;