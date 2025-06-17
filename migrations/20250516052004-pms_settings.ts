import { DataTypes, QueryInterface } from "sequelize";

const tableName = "pms_settings";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    );
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      cycle_id: {
        type: DataTypes.UUID,
        allowNull: true,
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
        onDelete: "SET NULL",
      },
      is_draft: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      access_settings: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      invite_settings: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      notification_settings: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      sharing_settings: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      anonymity_settings: {
        type: DataTypes.JSONB,
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
    });

    await queryInterface.addConstraint(tableName, {
      fields: ["review_type_id"],
      type: "unique",
      name: "unique_review_type_id",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeConstraint(tableName, "unique_review_type_id");
    await queryInterface.dropTable(tableName);
  },
};
