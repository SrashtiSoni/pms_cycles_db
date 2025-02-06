'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("layout_blocks", "restrict_visibility_to_managers", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue:false
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn("layout_blocks", "restrict_visibility_to_managers");
  }
};
