import { DataTypes, QueryInterface } from 'sequelize';

const layoutBlocksTable = 'pms_layout_blocks';
const fieldsTable = 'pms_fields';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn(layoutBlocksTable, 'details', {
      type: DataTypes.JSON,
      allowNull: true,
    });

    await queryInterface.addColumn(fieldsTable, 'details', {
      type: DataTypes.JSON,
      allowNull: true,
    });

    await queryInterface.changeColumn(fieldsTable, 'category_id', {
      type: DataTypes.UUID,
      allowNull: true,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn(layoutBlocksTable, 'details');
    await queryInterface.removeColumn(fieldsTable, 'details');
  },
};
