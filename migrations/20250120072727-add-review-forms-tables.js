'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('forms', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      company_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()'),
      },
    });

    // 2. Create `categories` table
    await queryInterface.createTable('layout_blocks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      form_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'forms',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      type: {
        type: Sequelize.ENUM("categories",'divider',),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      position:{
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      company_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
       created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()'),
      },
    });

    // 3. Create `fields` table
    await queryInterface.createTable('fields', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      form_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'forms',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'layout_blocks',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      is_required:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      position:{
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      allow_comment:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      multi_select:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('scale', 'mcq', 'open', 'matrix', 'enps'),
        allowNull: false,
      },
      low_score_text: {
      type: Sequelize.STRING,
      allowNull: true, // e.g., "Worst"
      defaultValue:"Worst"
      },
      scale_type_id:{
        type:Sequelize.UUID,
        allowNull:true,
        references: {
          model: 'layout_blocks',
          key: 'id',
        },
        onDelete:"CASCADE"
      },
      high_score_text: {
        type: Sequelize.STRING,
        allowNull: true, // e.g., "Best"
        defaultValue:"Best"
      },
      include_zero_in_scale: {
        type: Sequelize.BOOLEAN,
        defaultValue: true, // Important for eNPS (0-10 scale)
      },
      options: {
        type: Sequelize.JSONB,
        allowNull: true, // Optional, only used for MCQ or matrix questions
      },
      logic: {
        type: Sequelize.JSONB,
        allowNull: true, // Stores conditional logic for the field
      },
      company_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop tables in reverse order
    await queryInterface.dropTable('fields');
    await queryInterface.dropTable('layout_blocks');
    await queryInterface.dropTable('forms');
  },
};
