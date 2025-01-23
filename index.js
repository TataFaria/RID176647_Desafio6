require('dotenv').config(); 
const express = require('express');
const sequelize = require('./src/database/Connection.js');
const cors = require('cors');
const bodyParser= require('body-parser');

// Middlewares e Rotas
const clientesRoute = require('./src/routes/clientesRoute.js')
const produtosRoute = require('./src/routes/produtosRoute.js') 
const estoqueRoute = require('./src/routes/estoqueRoute.js')
const pedidosRoute = require('./src/routes/pedidoProdutoRoute.js')
const pedidoProdutoRoute = require('./src/routes/pedidoProdutoRoute.js')
const vendasRoute = require('./src/routes/vendasRoute.js')

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

// Rotas
app.use('/clientes', clientesRoute)
app.use('/produtos', produtosRoute) 
app.use('/estoque', estoqueRoute)
app.use('/pedidos', pedidosRoute)
app.use('/pp', pedidoProdutoRoute)
app.use('/vendas', vendasRoute)

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