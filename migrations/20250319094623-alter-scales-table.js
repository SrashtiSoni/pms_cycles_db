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
    await queryInterface.removeColumn("scales", "use_smile_rating");
    await queryInterface.removeColumn("scales", "use_rating_numbers");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("scales", "company_id", {
      type: Sequelize.UUID,
      allowNull: false,
    });

    await queryInterface.removeColumn("scales", "is_custom");
    await queryInterface.addColumn("scales", "use_smile_rating", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn("scales", "use_rating_numbers", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },
};