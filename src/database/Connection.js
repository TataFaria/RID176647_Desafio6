const Sequelize = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
{
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        logging: false, // Desativa logs do Sequelize
    }
);

// Testa a conexão
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados bem-sucedida.');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error.message);
    }
})();

module.exports = sequelize;
