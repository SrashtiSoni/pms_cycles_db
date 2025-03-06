"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "pms_custom_review_references",
      "reference_field_id",
      {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "custom_fields",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE pms_custom_review_references 
      DROP CONSTRAINT IF EXISTS check_reference_field_id;
    `);

    await queryInterface.removeColumn(
      "pms_custom_review_references",
      "reference_field_id"
    );
  },
};
