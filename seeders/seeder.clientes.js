"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("clientes", [
      {
        nome_cliente: "João Silva",
        email_cliente: "joao@email.com",
        telefone_cliente: "11987654321",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome_cliente: "Maria Souza",
        email_cliente: "maria@email.com",
        telefone_cliente: "11987654322",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, _sequelize) {
    await queryInterface.bulkDelete("clientes", null, {});
  },
};
