module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pms_reviews", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
      },
      company_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      reviewer_id: {
        // User giving the review
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      review_type_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "pms_review_types", key: "id" },
        onDelete: "CASCADE",
      },
      form_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "forms", key: "id" },
        onDelete: "CASCADE",
      },
      cycle_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "pms_cycles", key: "id" },
        onDelete: "CASCADE",
      },
      reviewee_id: {
        // User being reviewed
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM("draft", "submitted"),
        defaultValue: "draft",
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("now()"),
      },
    });

    await queryInterface.addConstraint("pms_reviews", {
      fields: ["reviewer_id", "review_type_id", "reviewee_id"],
      type: "unique",
      name: "unique_reviewer_reviewtype_reviewee",
    });

    await queryInterface.createTable("pms_review_responses", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
      },
      review_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "pms_reviews", key: "id" },
        onDelete: "CASCADE",
      },
      field_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "fields", key: "id" },
        onDelete: "CASCADE",
      },
      value: {
        type: Sequelize.JSONB,
        allowNull: true, // Stores text, selected options, or scale values
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true, // If `allow_comment = true`, store user comments
      },
      company_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint("pms_review_responses", {
      fields: ["review_id", "field_id"],
      type: "unique",
      name: "unique_review_field",
    });

    await queryInterface.createTable("matrix_responses", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
      },
      review_response_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "pms_reviews", key: "id" },
        onDelete: "CASCADE",
      },
      row_id: {
        type: Sequelize.UUID, // Maps to matrix_rows
        allowNull: false,
        references: { model: "matrix_rows", key: "id" },
        onDelete: "CASCADE",
      },
      column_id: {
        type: Sequelize.UUID, // Maps to matrix_columns
        allowNull: false,
        references: { model: "matrix_columns", key: "id" },
        onDelete: "CASCADE",
      },
      value: {
        type: Sequelize.STRING, // Store numeric, text, or MCQ values
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        allowNull: false,
      },
      company_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint("matrix_responses", {
      fields: ["review_response_id", "row_id", "column_id"],
      type: "unique",
      name: "unique_matrix_response",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "matrix_responses",
      "unique_matrix_response"
    );
    await queryInterface.removeConstraint(
      "pms_review_responses",
      "unique_review_field"
    );
    await queryInterface.removeConstraint(
      "pms_reviews",
      "unique_reviewer_reviewtype_reviewee"
    );
    await queryInterface.dropTable("pms_review_responses");
    await queryInterface.dropTable("matrix_responses");
    await queryInterface.dropTable("pms_reviews");
  },
};
