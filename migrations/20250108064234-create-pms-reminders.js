"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const columns = {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
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
        allowNull: true,
      },
      reminder_type: {
        type: Sequelize.ENUM("DEFAULT", "CUSTOM"),
        defaultValue: "DEFAULT",
        allowNull: false,
      },
      number_of_reminders: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      subject: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      message: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    };

    await queryInterface.createTable("pms_reminders", columns);
    await queryInterface.addConstraint("pms_reminders", {
      fields: ["review_type_id"],
      type: "unique",
      name: "unique_pms_reminders_review_type_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "pms_reminders",
      "unique_pms_reminders_review_type_id"
    );
    await queryInterface.dropTable("pms_reminders");
  },
};
