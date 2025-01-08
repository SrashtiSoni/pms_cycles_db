'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pms_custom_review_assignments', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, 
      },
      review_type_id: {
        type: Sequelize.UUID,
        references: {
          model: 'pms_review_types', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      employee_id: {
        type: Sequelize.UUID,
        references: {
          model: 'employees', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      reference_field: {
        type: Sequelize.ENUM,
        values: ['reporting_manager', 'HRBP'],
        allowNull: true, 
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pms_custom_review_assignments');
  },
};
