'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("pedidos", [
      {
        venda_id: 1, 
        produto_id: 1, 
        quantidade_pedido: 2,
        subtotal_pedido: 59.80,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pedidos", null, {});
  },
};
