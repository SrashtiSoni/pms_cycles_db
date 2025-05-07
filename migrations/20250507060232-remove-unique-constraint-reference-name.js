"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "pms_custom_review_references",
      "unique_reference_name_constraint"
    );

    await queryInterface.addConstraint("pms_custom_review_references", {
      fields: ["review_type_id", "reference_name"],
      type: "unique",
      name: "unique_review_type_reference_name_constraint",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "pms_custom_review_references",
      "unique_review_type_reference_name_constraint"
    );

    await queryInterface.addConstraint("pms_custom_review_references", {
      fields: ["reference_name"],
      type: "unique",
      name: "unique_reference_name_constraint",
    });
  },
};
