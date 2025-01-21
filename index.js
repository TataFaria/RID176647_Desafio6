require('dotenv').config(); 
const express = require('express');
const sequelize = require('./src/database/Connection.js');

// Importando todos os modelos
const Client = require('./src/models/Client.js');
const Product = require('./src/models/Product.js');
const Stock = require('./src/models/Stock.js');
const Sales = require('./src/models/Sales.js');
const ItemSales = require('./src/models/ItemSales.js');

// Relacionamentos

// Relacionamento com Produto
Stock.belongsTo(Product, { foreignKey: 'id_product', onDelete: 'CASCADE' });
Product.hasOne(Stock, { foreignKey: 'id_product', onDelete: 'CASCADE' });

// Relacionamento com Cliente
Sales.belongsTo(Client, { foreignKey: 'id_client', onDelete: 'CASCADE' });
Client.hasMany(Sales, { foreignKey: 'id_client', onDelete: 'CASCADE' });

// Relacionamentos com Venda e Produto
ItemSales.belongsTo(Sales, { foreignKey: 'id_sales', onDelete: 'CASCADE' });
Sales.hasMany(ItemSales, { foreignKey: 'id_sales', onDelete: 'CASCADE' });

ItemSales.belongsTo(Product, { foreignKey: 'id_product', onDelete: 'CASCADE' });
Product.hasMany(ItemSales, { foreignKey: 'id_product', onDelete: 'CASCADE' });


// Middlewares e Rotas
const clientRoute = require('./src/routes/clientRoute.js');
const productsRoute = require('./src/routes/productsRoute.js');
const stockRoute = require('./src/routes/stockRoute.js');
const salesRoute = require('./src/routes/salesRoute.js');
const errorHandler = require('./src/middleware/errorHadler.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rotas
app.use('/api/clients', clientRoute);
app.use('/api/products', productsRoute);
app.use('/api/stocks', stockRoute);
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
