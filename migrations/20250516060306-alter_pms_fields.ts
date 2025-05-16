import { DataTypes, QueryInterface } from 'sequelize';

const tableName = 'pms_fields';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.removeColumn(tableName, 'high_score_text');
    await queryInterface.removeColumn(tableName, 'include_zero_in_scale');
    await queryInterface.removeColumn(tableName, 'low_score_text');
    await queryInterface.removeColumn(tableName, 'multi_select');
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.addColumn(tableName, 'high_score_text', {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Best',
    });
    await queryInterface.addColumn(tableName, 'include_zero_in_scale', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    });
    await queryInterface.addColumn(tableName, 'low_score_text', {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Worst',
    });
    await queryInterface.addColumn(tableName, 'multi_select', {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });
  },
};
