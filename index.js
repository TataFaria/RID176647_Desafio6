require('dotenv').config(); 
const express = require('express');
const sequelize = require('./src/database/Connection.js');

// Importando todos os modelos
const Client = require('./src/models/Client');
const Product = require('./src/models/Product');
const Stock = require('./src/models/Stock');
const Order = require('./src/models/Order');
const Sales = require('./src/models/Sales');
const ItemSales = require('./src/models/ItemSales');

// Middlewares e Rotas
const clientRoute = require('./src/routes/clientRoute.js');
const productsRoute = require('./src/routes/productsRoute.js');
const stockRoute = require('./src/routes/stockRoute.js');
const salesRoute = require('./src/routes/salesRoute.js');
const orderRoute = require('./src/routes/orderRoute.js');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rotas
app.use('/api/clients', clientRoute);
app.use('/api/products', productsRoute);
app.use('/api/stocks', stockRoute);
app.use('/api/orders', orderRoute);
app.use('/api/sales', salesRoute);

// Middleware de Erros
app.use(errorHandler);

// Inicialização do Servidor
const startServer = async () => {
    try {
        await sequelize.authenticate(); 
        console.log('Conexão com o banco de dados bem-sucedida.');

        await sequelize.sync(); 
        console.log('Modelos sincronizados com o banco de dados.');

        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error.message);
    }
};

startServer();
