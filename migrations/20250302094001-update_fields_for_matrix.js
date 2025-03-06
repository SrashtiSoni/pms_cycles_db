"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("fields", "type", {
      type: Sequelize.ENUM("enps", "matrix", "mcq", "open_answer", "scale"),
      allowNull: true, // Only changing this property
    });
    await queryInterface.addColumn("fields", "matrix_resource_type", {
      type: Sequelize.ENUM("row", "column"),
      allowNull: true, // NULL means it's not part of a matrix
    });

    await queryInterface.addColumn("fields", "parent_field_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "fields",
        key: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("fields", "show_label_column", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable("fields");

    if (tableInfo.parent_field_id) {
      await queryInterface.removeColumn("fields", "parent_field_id");
    }

    if (tableInfo.show_label_column) {
      await queryInterface.removeColumn("fields", "show_label_column");
    }

    if (tableInfo.matrix_resource_type) {
      await queryInterface.removeColumn("fields", "matrix_resource_type");
      await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_fields_matrix_resource_type";'
      );
    }
  },
};
