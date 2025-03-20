"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("pms_fields", "matrix_question_type", {
      type: Sequelize.ENUM("open_answer", "enps", "matrix_scale", "mcq"),
      allowNull: true,
      defaultValue: "open_answer",
    });
    await queryInterface.addColumn("pms_fields", "properties", {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {},
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("pms_fields", "matrix_question_type");
    await queryInterface.removeColumn("pms_fields", "properties");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_pms_fields_matrix_question_type";'
    );
  },
};
