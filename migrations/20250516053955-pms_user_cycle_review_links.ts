import { DataTypes, QueryInterface } from "sequelize";

const tableName = "pms_user_cycle_review_links";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    );
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.UUID,
        defaultValue: queryInterface.sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      cycle_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "pms_cycles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      review_type_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "pms_review_types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      is_editable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      email_message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal("NOW()"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal("NOW()"),
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(tableName);
  },
};
