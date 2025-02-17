'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cycle_employees', 'employee_status', {
      type: Sequelize.ENUM('added', 'removed'),
      allowNull: false,
      defaultValue: 'added',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cycle_employees', 'employee_status');
  }
};

