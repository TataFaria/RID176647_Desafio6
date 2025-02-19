const { DataTypes } = require('sequelize');
const sequelize = require('../database/Connection');
const Sales = require('./Sales'); // Importando o modelo relacionado

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
}, {
    tableName: 'clients', // Nome da tabela no banco de dados
    timestamps: true,
});

// Relacionamento: Um cliente pode ter várias vendas
Client.hasMany(Sales, { foreignKey: 'id_client', onDelete: 'CASCADE' });
Sales.belongsTo(Client, { foreignKey: 'id_client' });

module.exports = Client;
