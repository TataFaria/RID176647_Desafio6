'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.createTable("estoque", {
      estoque_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      produto_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: { model: "produtos", key: "id" },
        onDelete: "CASCADE"
      },
      quantidade_estoque: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('estoque');
  }
};