"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("scales", "company_id", {
      type: Sequelize.UUID,
      allowNull: true,
    });
    await queryInterface.addColumn("scales", "is_custom", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("scales", "is_custom");
  },
};
