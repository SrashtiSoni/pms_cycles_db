import { DataTypes, QueryInterface } from "sequelize";

const tableName = "pms_review_types";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    );

    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
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
      type: {
        type: DataTypes.ENUM(
          "MANAGER",
          "SELF",
          "PEER",
          "DIRECT_REPORTS",
          "CUSTOM"
        ),
        allowNull: false,
      },
      custom_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      is_custom: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_draft: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      include_in_overall_rating: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      custom_field_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "custom_fields",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(tableName);
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_pms_review_types_type";'
    );
  },
};
