"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("pms_cycles", "show_goals", {
      type: Sequelize.BOOLEAN,
      allowNull: true,// for now making true later will change it to false
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("pms_cycles", "show_goals");
  },
};
