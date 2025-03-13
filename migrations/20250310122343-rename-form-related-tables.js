module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('forms', 'pms_forms');
    await queryInterface.renameTable('fields', 'pms_fields');
    await queryInterface.renameTable('layout_blocks', 'pms_layout_blocks');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('pms_forms', 'forms');
    await queryInterface.renameTable('pms_fields', 'fields');
    await queryInterface.renameTable('pms_layout_blocks', 'layout_blocks');
  }
};