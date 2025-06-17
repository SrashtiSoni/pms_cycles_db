import { DataTypes, QueryInterface } from "sequelize";

const tableName = "scale_options";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    );
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: queryInterface.sequelize.literal("gen_random_uuid()"),
      },
      scale_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "scales", key: "id" },
        onDelete: "CASCADE",
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      emoji: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: queryInterface.sequelize.literal("NOW()"),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: queryInterface.sequelize.literal("NOW()"),
      },
    });

    await queryInterface.addConstraint(tableName, {
      fields: ["scale_id", "value"],
      type: "unique",
      name: "unique_scale_option_value",
    });

    await queryInterface.addIndex(tableName, ["scale_id"], {
      name: "idx_scale_id",
    });

    await queryInterface.addConstraint(tableName, {
      fields: ["scale_id", "label"],
      type: "unique",
      name: "unique_scale_option_label",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex(tableName, "idx_scale_id");
    await queryInterface.dropTable(tableName);
  },
};
