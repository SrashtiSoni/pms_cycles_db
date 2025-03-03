"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("scales", "options");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("scales", "options", {
      type: Sequelize.JSONB,
      allowNull: true,
    });
  },
};
