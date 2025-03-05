"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Rename columns
      await queryInterface.renameColumn("matrix_rows", "label", "name", {
        transaction,
      });
      await queryInterface.renameColumn("matrix_columns", "label", "name", {
        transaction,
      });

      // Remove parent_field_id column
      await queryInterface.removeColumn("fields", "parent_field_id", {
        transaction,
      });

      // Step 1: Create a new enum type without 'matrix_row' and 'matrix_column'
      await queryInterface.sequelize.query(
        `
        CREATE TYPE "enum_fields_type_new" AS ENUM ('scale', 'mcq', 'open_answer', 'matrix', 'enps');
      `,
        { transaction }
      );

      // Step 2: Update all columns using the old enum type
      await queryInterface.sequelize.query(
        `
        ALTER TABLE fields ALTER COLUMN type SET DATA TYPE "enum_fields_type_new" 
        USING type::text::"enum_fields_type_new";
      `,
        { transaction }
      );

      // Step 3: Drop the old enum type
      await queryInterface.sequelize.query(`DROP TYPE "enum_fields_type";`, {
        transaction,
      });

      // Step 4: Rename the new enum type to match the old one
      await queryInterface.sequelize.query(
        `
        ALTER TYPE "enum_fields_type_new" RENAME TO "enum_fields_type";
      `,
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Step 1: Create a new enum type with 'matrix_row' and 'matrix_column' added back
      await queryInterface.sequelize.query(
        `
        CREATE TYPE "enum_fields_type_new" AS ENUM ('scale', 'mcq', 'open_answer', 'matrix', 'enps', 'matrix_row', 'matrix_column');
      `,
        { transaction }
      );

      // Step 2: Update all columns using the old enum type
      await queryInterface.sequelize.query(
        `
        ALTER TABLE fields ALTER COLUMN type SET DATA TYPE "enum_fields_type_new" 
        USING type::text::"enum_fields_type_new";
      `,
        { transaction }
      );

      // Step 3: Drop the old enum type
      await queryInterface.sequelize.query(`DROP TYPE "enum_fields_type";`, {
        transaction,
      });

      // Step 4: Rename the new enum type to match the old one
      await queryInterface.sequelize.query(
        `
        ALTER TYPE "enum_fields_type_new" RENAME TO "enum_fields_type";
      `,
        { transaction }
      );

      // Rename columns back
      await queryInterface.renameColumn("matrix_rows", "name", "label", {
        transaction,
      });
      await queryInterface.renameColumn("matrix_columns", "name", "label", {
        transaction,
      });

      // Re-add parent_field_id column
      await queryInterface.addColumn(
        "fields",
        "parent_field_id",
        {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: "fields",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
