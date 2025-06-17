import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("pms_review_types", "form_id", {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "pms_forms",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("pms_review_types", "form_id");
  },
};
