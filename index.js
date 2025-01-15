require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/conn');

const app = express();
app.use(bodyParser.json());

// Importar e usar as rotas
const clientesRouter = require('./src/routes/ClienteRoutes');
const produtosRouter = require('./src/routes/ProdutoRoutes');
const estoquesRouter = require('./src/routes/EstoqueRoutes');
const pedidosRouter = require('./src/routes/PedidoRoutes');
const vendasRouter = require('./src/routes/VendaRoutes');

app.use('/api/clientes', clientesRouter);
app.use('/api/produtos', produtosRouter);
app.use('/api/estoques', estoquesRouter);
app.use('/api/pedidos', pedidosRouter);
app.use('/api/vendas', vendasRouter);

// Sincronizar modelos e iniciar o servidor
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(error => {
  console.error('Erro ao sincronizar os modelos com o banco de dados:', error);
});

