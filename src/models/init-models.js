var DataTypes = require("sequelize").DataTypes;
var _clientes = require("./Clientes");
var _estoque = require("./Estoque");
var _pedido_produto = require("./PedidoProduto");
var _pedidos = require("./Pedidos");
var _produtos = require("./Produtos");
var _vendas = require("./Vendas");

function initModels(sequelize) {
  var clientes = _clientes(sequelize, DataTypes);
  var estoque = _estoque(sequelize, DataTypes);
  var pedido_produto = _pedido_produto(sequelize, DataTypes);
  var pedidos = _pedidos(sequelize, DataTypes);
  var produtos = _produtos(sequelize, DataTypes);
  var vendas = _vendas(sequelize, DataTypes);

  pedidos.belongsToMany(produtos, { as: 'produtos', through: pedido_produto, foreignKey: "IdPedido", otherKey: "IdProduto" });
  produtos.belongsToMany(pedidos, { as: 'pedidos', through: pedido_produto, foreignKey: "IdProduto", otherKey: "IdPedido" });
  pedidos.belongsTo(clientes, { as: "cliente", foreignKey: "IdCliente"});
  clientes.hasMany(pedidos, { as: "pedidos", foreignKey: "IdCliente"});
  pedido_produto.belongsTo(pedidos, { as: "pedidos", foreignKey: "IdPedido"});
  pedidos.hasMany(pedido_produto, { as: "pedido_produtos", foreignKey: "IdPedido"});
  vendas.belongsTo(pedidos, { as: "pedidos", foreignKey: "IdPedido"});
  pedidos.hasMany(vendas, { as: "vendas", foreignKey: "IdPedido"});
  estoque.belongsTo(produtos, { as: "produto", foreignKey: "IdProduto"});
  produtos.hasOne(estoque, { as: "estoque", foreignKey: "IdProduto"});
  pedido_produto.belongsTo(produtos, { as: "produto", foreignKey: "IdProduto"});
  produtos.hasMany(pedido_produto, { as: "pedido_produtos", foreignKey: "IdProduto"});

  return {
    clientes,
    estoque,
    pedido_produto,
    pedidos,
    produtos,
    vendas,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;