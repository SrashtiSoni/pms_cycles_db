"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("pms_reminders", "message", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("pms_reminders", "message", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },
};
