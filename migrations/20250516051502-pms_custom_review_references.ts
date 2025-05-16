import { DataTypes, QueryInterface } from 'sequelize';

const tableName = 'pms_custom_review_references';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      reference_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      reference_field: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      assign_reviewers: {
        type: DataTypes.ENUM('BY_EMPLOYEE_REFERENCE', 'MANUALLY'),
        allowNull: false,
      },
      is_system_field: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(tableName);
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_pms_custom_review_references_assign_reviewers";'
    );
  },
};
