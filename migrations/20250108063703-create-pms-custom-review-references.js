"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pms_custom_review_references", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
      review_type_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "pms_review_types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      reference_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      reference_field: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      assign_reviewers: {
        type: Sequelize.ENUM("BY_EMPLOYEE_REFERENCE", "MANUALLY"),
        allowNull: false,
      },
      is_system_field: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pms_custom_review_references");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_pms_custom_review_references_assign_reviewers"'
    );
  },
};
