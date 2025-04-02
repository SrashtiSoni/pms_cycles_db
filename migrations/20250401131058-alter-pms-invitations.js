"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("pms_invitations", "email_subject", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("pms_invitations", "email_subject", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },
};
