const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./src/dataBase/Connection');

const produtosRoutes = require('./src/routes/productRoute');
const vendasRoutes = require('./src/routes/salesRoute'); 

app.use(express.json()); 
app.use('/api/produtos', produtosRoutes); 
app.use('/api/vendas', vendasRoutes); 


const PORT = process.env.PORT || 3000;
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados bem-sucedida!');

        await sequelize.sync({ alter: true }); 
        console.log('Tabelas sincronizadas com sucesso!');

        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
}
startServer();
