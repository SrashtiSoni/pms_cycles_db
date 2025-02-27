module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pms_review_type_questions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
      review_type_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "pms_review_types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      question_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "fields",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("now()"),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("now()"),
        allowNull: false,
      },
    });

    // Add a unique constraint to prevent duplicate (review_type_id, question_id) pairs
    await queryInterface.addConstraint("pms_review_type_questions", {
      fields: ["review_type_id", "question_id"],
      type: "unique",
      name: "unique_review_type_question",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "pms_review_type_questions",
      "unique_review_type_question"
    );
    await queryInterface.dropTable("pms_review_type_questions");
  },
};
