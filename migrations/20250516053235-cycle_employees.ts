import { DataTypes, QueryInterface } from 'sequelize';

const tableName = 'cycle_employees';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.UUID,
        defaultValue: queryInterface.sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      cycle_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'pms_cycles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      employee_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      employee_status: {
        type: DataTypes.ENUM('added', 'removed'),
        allowNull: false,
        defaultValue: 'added',
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint(tableName, {
      fields: ['cycle_id', 'employee_id'],
      type: 'unique',
      name: 'unique_cycle_employee_pair',
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeConstraint(tableName, 'unique_cycle_employee_pair');
    await queryInterface.removeColumn(tableName, 'employee_status');
    await queryInterface.dropTable(tableName);
  },
};
