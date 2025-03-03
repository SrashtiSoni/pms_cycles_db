"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add 'matrix_row' and 'matrix_column' to the 'type' ENUM
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_fields_type" ADD VALUE IF NOT EXISTS 'matrix_row';
    `);
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_fields_type" ADD VALUE IF NOT EXISTS 'matrix_column';
    `);

    // Add `parent_field_id` to link matrix rows/columns to a matrix field
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

  down: async (queryInterface, Sequelize) => {
    // Remove added columns
    await queryInterface.removeColumn("fields", "parent_field_id");
    await queryInterface.removeColumn("fields", "show_label_column");

    // Note: ENUM values can't be removed in PostgreSQL easily, so we usually don't roll back ENUM changes.
  },
};
