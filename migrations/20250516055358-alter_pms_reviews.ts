import { DataTypes, QueryInterface } from "sequelize";

const tableName = "pms_reviews";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    );
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        tableName,
        "acknowledged_at",
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
        { transaction }
      );

      await queryInterface.addColumn(
        tableName,
        "shared_by",
        {
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          allowNull: true,
        },
        { transaction }
      );

      await queryInterface.addColumn(
        tableName,
        "shared_at",
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
        { transaction }
      );
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn(tableName, "shared_at", {
        transaction,
      });
      await queryInterface.removeColumn(tableName, "shared_by", {
        transaction,
      });
      await queryInterface.removeColumn(tableName, "acknowledged_at", {
        transaction,
      });
    });
  },
};
