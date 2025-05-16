import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.renameTable('forms', 'pms_forms');
    await queryInterface.renameTable('fields', 'pms_fields');
    await queryInterface.renameTable('layout_blocks', 'pms_layout_blocks');
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.renameTable('pms_forms', 'forms');
    await queryInterface.renameTable('pms_fields', 'fields');
    await queryInterface.renameTable('pms_layout_blocks', 'layout_blocks');
  },
};
