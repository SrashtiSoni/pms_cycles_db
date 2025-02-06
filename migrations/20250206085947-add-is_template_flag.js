'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("forms", "is_template", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue:false
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn("forms", "is_template");
  }
};
