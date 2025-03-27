"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("pms_reviews", "sent_back_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("pms_reviews", "sent_back_by", {
      type: Sequelize.UUID,
      allowNull: true,
    });
    await queryInterface.removeColumn("pms_reviews", "is_editable");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("pms_reviews", "sent_back_at");
    await queryInterface.removeColumn("pms_reviews", "sent_back_by");
    await queryInterface.addColumn("pms_reviews", "is_editable", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },
};
