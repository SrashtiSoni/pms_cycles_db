module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        "pms_reviews",
        "shared_by",
        {
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          allowNull: true,
        },
        { transaction }
      );

      await queryInterface.addColumn(
        "pms_reviews",
        "shared_at",
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
        { transaction }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn("pms_reviews", "shared_by", {
        transaction,
      });
      await queryInterface.removeColumn("pms_reviews", "shared_at", {
        transaction,
      });
    });
  },
};
