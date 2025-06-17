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
    await queryInterface.addColumn(
      "pms_cycles",
      "share_overall_rating_with_reviewee",
      {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn(
      "pms_cycles",
      "rating_single_question_id"
    );

    await queryInterface.removeColumn(
      "pms_cycles",
      "share_overall_rating_with_reviewee"
    );
  },
};
