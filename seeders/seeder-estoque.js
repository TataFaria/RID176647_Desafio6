'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("estoque", [
      {
        produto_id: 1, // ID do Shampoo
        quantidade_disponivel: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        produto_id: 2, // ID do Condicionador
        quantidade_disponivel: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("estoque", null, {});
  },
};

