import { DataTypes, QueryInterface } from "sequelize";

const matrixRowsTable = "matrix_rows";
const matrixColumnsTable = "matrix_columns";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    );
    await queryInterface.createTable(matrixRowsTable, {
      id: {
        type: DataTypes.UUID,
        defaultValue: queryInterface.sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        allowNull: false,
      },
      field_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "fields",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      label: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      show_label_column: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    });

    await queryInterface.createTable(matrixColumnsTable, {
      id: {
        type: DataTypes.UUID,
        defaultValue: queryInterface.sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        allowNull: false,
      },
      field_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "fields",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      label: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("open_answer", "mcq", "scale"),
        allowNull: false,
      },
      options: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      multi_select: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      scale_type_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "scales",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      is_required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(matrixRowsTable);
    await queryInterface.dropTable(matrixColumnsTable);
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_matrix_columns_type CASCADE;"
    );
  },
};
