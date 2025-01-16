"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pms_cycles", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      cycle_applicable_to: {
        type: Sequelize.ENUM("all", "custom"),
        allowNull: false,
        defaultValue: "all",
      },
      status: {
        type: Sequelize.ENUM("running", "pending", "stopped", "ended"),
        allowNull: false,
        defaultValue: "pending",
      },
      is_draft: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      use_cycle_dates_for_review_types:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
       reviewers_can_submit_review_any_time_in_cycle:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("pms_cycles");
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS "enum_pms_cycles_cycle_applicable_to";`
    );
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS "enum_pms_cycles_status";`
    );
  },
};
