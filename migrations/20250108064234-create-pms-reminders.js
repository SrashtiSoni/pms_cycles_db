"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const columns = {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      cycle_id: {
        type: Sequelize.UUID,
        references: {
          model: "pms_cycles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      review_type_id: {
        type: Sequelize.UUID,
        references: {
          model: "pms_review_types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      reviewer_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      number_of_reminders: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      reminder_message: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      subject_template: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      message_template: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      placeholders: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      days_left: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    };

    await queryInterface.createTable("pms_reminders", columns);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("pms_reminders");
  },
};
