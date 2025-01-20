"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("pms_cycles", "cycle_custom_policy_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "cycle_custom_policy",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("pms_cycles", "cycle_custom_policy_id");
  },
};
