"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pms_settings", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      cycle_id: {
        type: Sequelize.UUID,
        references: {
          model: 'pms_cycles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull:true
      },
      review_type_cycle_id: {
        type: Sequelize.UUID,
        references: {
          model: 'pms_review_types', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      is_draft: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      access_settings: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      invite_settings:{
        type:Sequelize.JSONB,
        allowNull:true
      },
      notification_settings: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      sharing_settings: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      anonymity_settings: {
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("pms_settings");
  },
};
