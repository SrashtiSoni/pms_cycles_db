import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("pms_cycles", "rating_single_question_id", {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "pms_fields",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn(
      "pms_cycles",
      "rating_single_question_id"
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_pms_cycles_average_method";'
    );
  },
};
