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
    await queryInterface.addColumn("pms_invitations", "deleted_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("pms_invitations", "deleted_by", {
      type: Sequelize.UUID,
      allowNull: true,
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
    await queryInterface.removeColumn("pms_invitations", "deleted_at");
    await queryInterface.removeColumn("pms_invitations", "deleted_by");
    await queryInterface.renameColumn("pms_invitations", "inviter", "from");
  },
};
