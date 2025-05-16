import { DataTypes, QueryInterface } from 'sequelize';

const reviewsTable = 'pms_reviews';
const reviewResponsesTable = 'pms_review_responses';
const reviewMatrixResponsesTable = 'pms_review_matrix_responses';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(reviewsTable, {
      id: {
        type: DataTypes.UUID,
        defaultValue: queryInterface.sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      reviewer_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      review_type_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'pms_review_types', key: 'id' },
        onDelete: 'CASCADE',
      },
      form_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'forms', key: 'id' },
        onDelete: 'CASCADE',
      },
      cycle_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'pms_cycles', key: 'id' },
        onDelete: 'CASCADE',
      },
      reviewee_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      status: {
        type: DataTypes.ENUM('draft', 'submitted'),
        allowNull: false,
        defaultValue: 'draft',
      },
      sent_back_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      sent_back_by: { type: DataTypes.UUID, allowNull: true },
      is_shared: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
      submitted_at: { type: DataTypes.DATE, allowNull: true },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('now()'),
      },
    });

    await queryInterface.addConstraint(reviewsTable, {
      fields: ['reviewer_id', 'review_type_id', 'reviewee_id'],
      type: 'unique',
      name: 'unique_reviewer_reviewtype_reviewee',
    });

    await queryInterface.createTable(reviewResponsesTable, {
      id: {
        type: DataTypes.UUID,
        defaultValue: queryInterface.sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      review_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: reviewsTable, key: 'id' },
        onDelete: 'CASCADE',
      },
      field_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'fields', key: 'id' },
        onDelete: 'CASCADE',
      },
      value: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint(reviewResponsesTable, {
      fields: ['review_id', 'field_id'],
      type: 'unique',
      name: 'unique_review_field',
    });

    await queryInterface.createTable(reviewMatrixResponsesTable, {
      id: {
        type: DataTypes.UUID,
        defaultValue: queryInterface.sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      review_response_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: reviewResponsesTable, key: 'id' },
        onDelete: 'CASCADE',
      },
      row_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'fields', key: 'id' },
        onDelete: 'CASCADE',
      },
      column_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'fields', key: 'id' },
        onDelete: 'CASCADE',
      },
      value: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
    });

    await queryInterface.addConstraint(reviewMatrixResponsesTable, {
      fields: ['review_response_id', 'row_id', 'column_id'],
      type: 'unique',
      name: 'unique_matrix_response',
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeConstraint(reviewMatrixResponsesTable, 'unique_matrix_response');
    await queryInterface.removeConstraint(reviewResponsesTable, 'unique_review_field');
    await queryInterface.removeConstraint(reviewsTable, 'unique_reviewer_reviewtype_reviewee');
    await queryInterface.dropTable(reviewMatrixResponsesTable);
    await queryInterface.dropTable(reviewResponsesTable);
    await queryInterface.dropTable(reviewsTable);
  },
};
