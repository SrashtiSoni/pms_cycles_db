import { DataTypes, QueryInterface } from 'sequelize';

const tableName = 'pms_cycles';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      cycle_applicable_to: {
        type: DataTypes.ENUM('all', 'custom'),
        allowNull: false,
        defaultValue: 'all',
      },
      status: {
        type: DataTypes.ENUM('running', 'pending', 'stopped', 'ended', 'archived'),
        allowNull: false,
        defaultValue: 'pending',
      },
      progress: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      is_draft: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      is_duplicate: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      use_cycle_dates_for_review_types: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      planned_cycle_start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      planned_cycle_end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      reviewers_can_submit_review_any_time_in_cycle: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      average_method: {
        type: DataTypes.ENUM('SINGLE_QUESTION', 'QUESTIONS_AVERAGE'),
        allowNull: true,
      },
      share_overall_rating_with_reviewee: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      rating_single_question_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'fields',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      show_goals: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('NOW()'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('NOW()'),
      },
      owner_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_by: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      cycle_custom_policy_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'cycle_custom_policy',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(tableName);

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_pms_cycles_cycle_applicable_to";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_pms_cycles_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_pms_cycles_average_method";');
  },
};
