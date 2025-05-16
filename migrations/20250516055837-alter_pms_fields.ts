import { DataTypes, QueryInterface } from 'sequelize';

const tableName = 'pms_fields';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn(tableName, 'matrix_question_type', {
      type: DataTypes.ENUM('open_answer', 'enps', 'matrix_scale', 'mcq'),
      allowNull: true,
      defaultValue: 'open_answer',
    });

    await queryInterface.addColumn(tableName, 'properties', {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn(tableName, 'matrix_question_type');
    await queryInterface.removeColumn(tableName, 'properties');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_pms_fields_matrix_question_type";'
    );
  },
};
