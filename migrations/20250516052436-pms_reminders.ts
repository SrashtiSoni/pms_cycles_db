import { DataTypes, QueryInterface } from 'sequelize';

const tableName = 'pms_reminders';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    const columns = {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      review_type_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'pms_review_types',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_draft: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      reminder_type: {
        type: DataTypes.ENUM('DEFAULT', 'CUSTOM'),
        allowNull: false,
        defaultValue: 'DEFAULT',
      },
      number_of_reminders: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      subject: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      message: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    };

    await queryInterface.createTable(tableName, columns);
    await queryInterface.addConstraint(tableName, {
      fields: ['review_type_id'],
      type: 'unique',
      name: 'unique_pms_reminders_review_type_id',
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeConstraint(tableName, 'unique_pms_reminders_review_type_id');
    await queryInterface.dropTable(tableName);
  },
};
