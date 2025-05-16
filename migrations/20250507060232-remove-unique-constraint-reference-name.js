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
    // Check duplicates before adding constraint
    const [results] = await queryInterface.sequelize.query(`
    SELECT reference_name, COUNT(*)
    FROM pms_custom_review_references
    GROUP BY reference_name
    HAVING COUNT(*) > 1;
  `);

    if (results.length === 0) {
      await queryInterface.addConstraint("pms_custom_review_references", {
        fields: ["reference_name"],
        type: "unique",
        name: "unique_reference_name_constraint",
      });
    } else {
      console.warn(
        "Duplicates exist, skipping adding unique constraint on reference_name"
      );
    }
  },
};
