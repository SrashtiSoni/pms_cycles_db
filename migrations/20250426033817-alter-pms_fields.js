"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("pms_fields", "high_score_text");
    await queryInterface.removeColumn("pms_fields", "include_zero_in_scale");
    await queryInterface.removeColumn("pms_fields", "low_score_text");
    await queryInterface.removeColumn("pms_fields", "multi_select");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("pms_fields", "high_score_text", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "Best",
    });
    await queryInterface.addColumn("pms_fields", "include_zero_in_scale", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
    await queryInterface.addColumn("pms_fields", "low_score_text", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "Worst",
    });
    await queryInterface.addColumn("pms_fields", "multi_select", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },
};
