"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const columns = {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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
      is_draft: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      reminder_type: {
        type: Sequelize.ENUM(
          'DEFAULT', 'CUSTOM'
        ),
        defaultValue:"DEFAULT",
        allowNull: false,
      },
      number_of_reminders: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      subject: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING(255),
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
