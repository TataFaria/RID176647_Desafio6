require('dotenv').config(); // Carrega as variáveis de ambiente
const express = require('express');
const sequelize = require('./src/database/Connection.js');
<<<<<<< HEAD

// Importando todos os modelos
const Client = require('./src/models/Client');
const Product = require('./src/models/Product');
const Stock = require('./src/models/Stock');
const Order = require('./src/models/Order');
const Sales = require('./src/models/Sales');
const ItemSales = require('./src/models/ItemSales');

// Middlewares e Rotas
const clientRoute = require('./src/routes/clientRoute');
const productsRoute = require('./src/routes/productsRoute');
const estoqueRoutes = require('./src/routes/estoqueRoutes');
const salesRoute = require('./src/routes/salesRoute');
const orderRoute = require('./src/routes/orderRoute');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rotas
app.use('/api/clients', clientRoute);
app.use('/api/products', productsRoute);
app.use('/api/stocks', estoqueRoutes);
app.use('/api/orders', orderRoute);
app.use('/api/sales', salesRoute);

// Middleware de Erros
app.use(errorHandler);

// Inicialização do Servidor
const startServer = async () => {
    try {
        await sequelize.authenticate(); // Testa a conexão com o banco
        console.log('Conexão com o banco de dados bem-sucedida.');

        await sequelize.sync(); // Sincroniza os modelos e os relacionamentos
        console.log('Modelos sincronizados com o banco de dados.');

        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error.message);
    }
};

startServer();
=======
const cors = require('cors');
const bodyParser= require('body-parser');

// Middlewares e Rotas
const clienteRoutes = require('./src/routes/clientesRoute.js');
const produtoRoutes = require('./src/routes/produtosRoute.js');
const vendaRoutes = require('./src/routes/vendasRoute.js');
const pedidoRoutes = require('./src/routes/pedidosRoute.js');
const estoqueRoutes = require('./src/routes/estoqueRoute.js');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

// Rotas
app.use("/clientes", clienteRoutes);
app.use("/produtos", produtoRoutes);
app.use("/vendas", vendaRoutes);
app.use("/estoque", estoqueRoutes);
app.use("/pedidos", pedidoRoutes);

const PORT = process.env.PORT || 3000;

// Conexão com o Banco de Dados e Início do Servidor
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Conectado ao banco de dados com sucesso');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor iniciado na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Falha ao conectar ao banco de dados:', error);
    process.exit(1); 
  });
>>>>>>> 16479332b7d75ced0ad75cefa6da5bb7b4a1955a
