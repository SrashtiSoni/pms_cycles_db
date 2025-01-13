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
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      is_custom: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
  },
};
