"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("pms_layout_blocks", "details", {
      type: Sequelize.JSON,
      allowNull: true,
    });

    await queryInterface.addColumn("pms_fields", "details", {
      type: Sequelize.JSON,
      allowNull: true,
    });
    await queryInterface.changeColumn("pms_fields", "category_id", {
      type: Sequelize.UUID,
      allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("pms_layout_blocks", "details");
    await queryInterface.removeColumn("pms_fields", "details");
  },
};
