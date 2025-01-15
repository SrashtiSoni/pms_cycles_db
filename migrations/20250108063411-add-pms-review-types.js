"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pms_review_types", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
      cycle_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "pms_cycles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type: {
        type: Sequelize.ENUM(
          "MANAGER",
          "SELF",
          "PEER",
          "DIRECT_REPORTS",
          "CUSTOM"
        ),
        allowNull: false,
      },
      custom_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      is_custom: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      start_date: {
        type: Sequelize.DATEONLY, 
        allowNull: false,
      },
      due_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      is_draft: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    await queryInterface.dropTable("pms_review_types");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_pms_review_types_type"'
    );
  },
};
