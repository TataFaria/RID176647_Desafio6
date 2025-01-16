const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');

const Stock = sequelize.define('Stock', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'stocks', 
    timestamps: true,
});

module.exports = Stock;
