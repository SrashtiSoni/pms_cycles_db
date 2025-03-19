"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("pms_review_types", "custom_field_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "custom_fields",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("pms_review_types", "custom_field_id");
  },
};
