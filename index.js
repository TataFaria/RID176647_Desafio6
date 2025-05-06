require('dotenv').config(); 
const express = require('express');
const sequelize = require('./src/database/Connection.js');
const cors = require('cors');


// Middlewares e Rotas
const clienteRoutes = require('./src/routes/clientesRoute.js');
const produtoRoutes = require('./src/routes/produtosRoute.js');
const vendaRoutes = require('./src/routes/vendasRoute.js');
const pedidoRoutes = require('./src/routes/pedidosRoute.js');
const estoqueRoutes = require('./src/routes/estoqueRoute.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Rotas
app.use("/clientes", clienteRoutes);
app.use("/produtos", produtoRoutes);
app.use("/vendas", vendaRoutes);
app.use("/estoque", estoqueRoutes);
app.use("/pedidos", pedidoRoutes);

const PORT = process.env.PORT || 3000;

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
