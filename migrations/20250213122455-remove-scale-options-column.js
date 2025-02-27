"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("scales", "options");
  },

  down: async (queryInterface, Sequelize) => {},
};
