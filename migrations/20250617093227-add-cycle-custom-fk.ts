import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("pms_cycles", "cycle_custom_policy_id", {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "cycle_custom_policy",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("pms_cycles", "cycle_custom_policy_id");
  },
};
