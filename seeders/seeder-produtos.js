'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("produtos", [
      {
        nome_produto: "Shampoo",
        descricao_produto: "Shampoo hidratante",
        preco_produto: 29.90,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome_produto: "Condicionador",
        descricao_produto: "Condicionador nutritivo",
        preco_produto: 34.90,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("produtos", null, {});
  },
};
