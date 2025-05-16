import { DataTypes, QueryInterface } from 'sequelize';

const tableName = 'pms_review_type_questions';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.UUID,
        defaultValue: queryInterface.sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      review_type_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'pms_review_types',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      question_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'fields',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('now()'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('now()'),
      },
    });

    await queryInterface.addConstraint(tableName, {
      fields: ['review_type_id', 'question_id'],
      type: 'unique',
      name: 'unique_review_type_question',
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeConstraint(tableName, 'unique_review_type_question');
    await queryInterface.dropTable(tableName);
  },
};
