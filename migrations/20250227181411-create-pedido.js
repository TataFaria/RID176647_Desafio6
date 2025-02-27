'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.createTable("pedidos", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  venda_id: { 
    type: Sequelize.INTEGER, 
    allowNull: false,
    references: { model: "vendas", key: "id" },
    onDelete: "CASCADE",
  },
  produto_id: { 
    type: Sequelize.INTEGER, 
    allowNull: false,
    references: { model: "produtos", key: "id" },
    onDelete: "CASCADE",
  },
  quantidade_pedido: { type: Sequelize.INTEGER, allowNull: false },
  subtotal_pedido: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
  createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
  updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pedidos');
  }
};