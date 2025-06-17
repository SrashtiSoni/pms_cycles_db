import { DataTypes, QueryInterface } from "sequelize";

const tableName = "fields";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    );
    await queryInterface.changeColumn(tableName, "type", {
      type: Sequelize.ENUM("enps", "matrix", "mcq", "open_answer", "scale"),
      allowNull: true,
    });

    await queryInterface.addColumn(tableName, "matrix_resource_type", {
      type: Sequelize.ENUM("row", "column"),
      allowNull: true,
    });

    await queryInterface.addColumn(tableName, "parent_field_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: tableName,
        key: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn(tableName, "show_label_column", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
  },

  async down(queryInterface: QueryInterface) {
    const tableInfo = await queryInterface.describeTable(tableName);

    if (tableInfo.parent_field_id) {
      await queryInterface.removeColumn(tableName, "parent_field_id");
    }

    if (tableInfo.show_label_column) {
      await queryInterface.removeColumn(tableName, "show_label_column");
    }

    if (tableInfo.matrix_resource_type) {
      await queryInterface.removeColumn(tableName, "matrix_resource_type");
      await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_fields_matrix_resource_type";'
      );
    }
  },
};
