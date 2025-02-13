'use strict';


'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('matrix_rows', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
      primaryKey: true,
    },
    field_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'fields', key: 'id' }, // Linked to the field (matrix type)
      onDelete: 'CASCADE',
    },
    label: {
      type: Sequelize.TEXT, // Row label (e.g., "Work Environment")
      allowNull: false,
    },
    position: {
      type: Sequelize.INTEGER, // Order of rows
      allowNull: false,
    },
    show_label_column:{
      type: Sequelize.BOOLEAN, // Order of rows
      defaultValue:true
    }
  });


  await queryInterface.createTable('matrix_columns', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
      primaryKey: true,
    },
    field_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'fields', key: 'id' }, // Linked to the field (matrix type)
      onDelete: 'CASCADE',
    },
    label: {
      type: Sequelize.TEXT, // Column label (e.g., "Satisfaction")
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM('open_answer', 'mcq', 'scale'), // Response type per column
      allowNull: false,
    },
    options: {
      type: Sequelize.JSONB, // Stores MCQ or scale values if applicable
      allowNull: true,
    },
    multi_select:{
      type: Sequelize.BOOLEAN,
      defaultValue:false
    },
    scale_type_id:{
      type:Sequelize.UUID,
      allowNull:true,
      references: {
        model: 'scales',
        key: 'id',
      },
      onDelete:"CASCADE"
    },
    is_required: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    position: {
      type: Sequelize.INTEGER, // Order of columns
      allowNull: false,
    },
  });

    },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('matrix_rows');
    await queryInterface.dropTable('matrix_columns');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_matrix_columns_type CASCADE;');

  },
};



