"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("pms_invitations", "from", "inviter");
    await queryInterface.addColumn("pms_invitations", "invitee", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("pms_invitations", "invitee");
    await queryInterface.renameColumn("pms_invitations", "inviter", "from");
  },
};