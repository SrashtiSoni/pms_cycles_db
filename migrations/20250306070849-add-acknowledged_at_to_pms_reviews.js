module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("pms_reviews", "acknowledged_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("pms_reviews", "acknowledged_at");
  },
};
