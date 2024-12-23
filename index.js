require('dotenv').config(); 
const express = require('express');
const sequelize = require('./src/dataBase/Connection'); 

const app = express();
app.use(express.json()); 

const produtosRoutes = require('./src/routes/product');
const vendasRoutes = require('./src/routes/sale');

app.use('/api/produtos', produtosRoutes);
app.use('/api/vendas', vendasRoutes);

autoSyncDatabase();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

async function autoSyncDatabase() {
    try {
        await sequelize.authenticate(); 
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        await sequelize.sync(); 
        console.log('Modelos sincronizados com o banco de dados!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
}
