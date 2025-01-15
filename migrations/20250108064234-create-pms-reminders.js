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
      review_type: {
        type: Sequelize.ENUM("SELF", "MANAGER"),
        allowNull: false,
      },
      reminder_message_type: {
        type: Sequelize.ENUM("default", "custom"),
        allowNull: false,
      },
      is_draft: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      number_of_reminders: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
