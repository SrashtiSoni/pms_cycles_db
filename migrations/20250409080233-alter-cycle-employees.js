"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("cycle_employees", {
      fields: ["cycle_id", "employee_id"],
      type: "unique",
      name: "unique_cycle_employee_pair",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "cycle_employees",
      "unique_cycle_employee_pair"
    );
  },
};
