import { DataTypes, QueryInterface } from 'sequelize';

const tableName = 'scales';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.UUID,
        defaultValue: queryInterface.sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'companies',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      use_smile_rating: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      use_rating_numbers: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_custom: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.fn('now'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.fn('now'),
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(tableName);
  },
};
