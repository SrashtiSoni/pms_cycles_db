"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("scale_options", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      scale_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "scales", key: "id" },
        onDelete: "CASCADE",
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.INTEGER, // will be used for order as well
        allowNull: false,
        defaultValue: 0,
      },
      emoji: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });

    await queryInterface.addConstraint("scale_options", {
      fields: ["scale_id", "value"],
      type: "unique",
      name: "unique_scale_option_value",
    });

    await queryInterface.addIndex("scale_options", ["scale_id"], {
      name: "idx_scale_id",
    });

    await queryInterface.addConstraint("scale_options", {
      fields: ["scale_id", "label"],
      type: "unique",
      name: "unique_scale_option_label",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex("scale_options", "idx_scale_id");
    await queryInterface.dropTable("scale_options");
  },
};
