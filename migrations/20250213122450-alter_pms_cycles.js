"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("pms_cycles", "average_method", {
      type: Sequelize.ENUM("SINGLE_QUESTION", "QUESTIONS_AVERAGE"),
      allowNull: true, // NULL means rating is disabled
    });

    await queryInterface.addColumn(
      "pms_cycles",
      "share_overall_rating_with_reviewee",
      {
        type: Sequelize.BOOLEAN,
        allowNull: false, // Shouldn't be NULL, default behavior is needed
        defaultValue: false,
      }
    );

    await queryInterface.addColumn("pms_cycles", "rating_single_question_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "fields",
        key: "id",
      },
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("pms_cycles", "average_method");
    await queryInterface.removeColumn(
      "pms_cycles",
      "rating_single_question_id"
    );

    await queryInterface.removeColumn(
      "pms_cycles",
      "share_overall_rating_with_reviewee"
    );

    // Drop ENUM type manually to clean up DB
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_pms_cycles_average_method";'
    );
  },
};
