'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("pms_review_types", "form_id", {
      type: Sequelize.UUID,
      allowNull: true, // Form is optional initially
      references: {
        model: "forms",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // If the form is deleted, reset to NULL instead of deleting the review type
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn("pms_review_types", "form_id");
  }
};
