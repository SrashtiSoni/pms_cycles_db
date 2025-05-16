import { DataTypes, QueryInterface } from 'sequelize';

const formsTable = 'forms';
const layoutBlocksTable = 'layout_blocks';
const fieldsTable = 'fields';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(formsTable, {
      id: {
        type: DataTypes.UUID,
        defaultValue: queryInterface.sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('now()'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('now()'),
      },
      is_template: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    });

    await queryInterface.createTable(layoutBlocksTable, {
      id: {
        type: DataTypes.UUID,
        defaultValue: queryInterface.sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      form_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: formsTable, key: 'id' },
        onDelete: 'CASCADE',
      },
      type: {
        type: DataTypes.ENUM('category', 'divider', 'page_break', 'text_box'),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      position: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('now()'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('now()'),
      },
      restrict_visibility_to_managers: {  
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    });

    await queryInterface.createTable(fieldsTable, {
      id: {
        type: DataTypes.UUID,
        defaultValue: queryInterface.sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      form_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: formsTable, key: 'id' },
        onDelete: 'CASCADE',
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: layoutBlocksTable, key: 'id' },
        onDelete: 'CASCADE',
      },
      is_required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      position: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      allow_comment: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      multi_select: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('scale', 'mcq', 'open_answer', 'matrix', 'enps'),
        allowNull: false,
      },
      low_score_text: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Worst',
      },
      scale_type_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'scales', key: 'id' },
        onDelete: 'CASCADE',
      },
      high_score_text: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Best',
      },
      include_zero_in_scale: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      options: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      logic: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('now()'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('now()'),
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(fieldsTable);
    await queryInterface.dropTable(layoutBlocksTable);
    await queryInterface.dropTable(formsTable);
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_layout_blocks_type CASCADE;');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_fields_type CASCADE;');
  },
};
