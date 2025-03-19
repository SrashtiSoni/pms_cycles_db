"use strict";

const { v4 } = require("uuid");

const DEFAULT_SCALES = [
  {
    id: v4(),
    name: "Satisfied",
    options: [
      {
        id: v4(),
        value: "1",
        emoji: "crossEyeEmoji",
        label: "Not satisfied at all",
      },
      {
        id: v4(),
        value: "2",
        emoji: "disagreeEmoji",
        label: "Somewhat dissatisfied",
      },
      {
        id: v4(),
        value: "3",
        emoji: "neutralEmoji",
        label: "Neither satisfied not dissatisfied",
      },
    ],
  },
  {
    id: v4(),
    name: "Agree",
    options: [
      {
        id: v4(),
        value: "1",
        emoji: "crossEyeEmoji",
        label: "Strongly disagree",
      },
      { id: v4(), value: "2", emoji: "disagreeEmoji", label: "Disagree" },
      {
        id: v4(),
        value: "3",
        emoji: "neutralEmoji",
        label: "Neither agree not disagree",
      },
      { id: v4(), value: "4", emoji: "agreeEmoji", label: "Agree" },
      {
        id: v4(),
        value: "5",
        emoji: "stronglyAgreeEmoji",
        label: "Strongly agree",
      },
    ],
  },
  {
    id: v4(),
    name: "Important",
    options: [
      {
        id: v4(),
        value: "1",
        emoji: "crossEyeEmoji",
        label: "Not important at all",
      },
      {
        id: v4(),
        value: "2",
        emoji: "neutralEmoji",
        label: "Not as important",
      },
      {
        id: v4(),
        value: "3",
        emoji: "agreeEmoji",
        label: "Somewhat important",
      },
      {
        id: v4(),
        value: "4",
        emoji: "grinningLaughEmoji",
        label: "Very important",
      },
      {
        id: v4(),
        value: "5",
        emoji: "stronglyAgreeEmoji",
        label: "The most important",
      },
    ],
  },
  {
    id: v4(),
    name: "Enthusiastic",
    options: [
      {
        id: v4(),
        value: "1",
        emoji: "crossEyeEmoji",
        label: "Not enthusiastic at all",
      },
      {
        id: v4(),
        value: "2",
        emoji: "neutralEmoji",
        label: "Not so enthusiastic",
      },
      {
        id: v4(),
        value: "3",
        emoji: "agreeEmoji",
        label: "Somewhat enthusiastic",
      },
      {
        id: v4(),
        value: "4",
        emoji: "grinningLaughEmoji",
        label: "Very enthusiastic",
      },
      {
        id: v4(),
        value: "5",
        emoji: "stronglyAgreeEmoji",
        label: "Extremely enthusiastic",
      },
    ],
  },
  {
    id: v4(),
    name: "Expectations",
    options: [
      {
        id: v4(),
        value: "1",
        emoji: "crossEyeEmoji",
        label: "Doesn't Meet expectations",
      },
      {
        id: v4(),
        value: "2",
        emoji: "agreeEmoji",
        label: "Meets expectations",
      },
      {
        id: v4(),
        value: "3",
        emoji: "grinningLaughEmoji",
        label: "Exceeds expectations",
      },
      {
        id: v4(),
        value: "4",
        emoji: "stronglyAgreeEmoji",
        label: "Redefines expectations",
      },
    ],
  },
  {
    id: v4(),
    name: "Outstanding",
    options: [
      { id: v4(), value: "1", emoji: "crossEyeEmoji", label: "Needs work" },
      { id: v4(), value: "2", emoji: "neutralEmoji", label: "Almost there" },
      {
        id: v4(),
        value: "3",
        emoji: "agreeEmoji",
        label: "Within expectations",
      },
      { id: v4(), value: "4", emoji: "grinningLaughEmoji", label: "Very good" },
      {
        id: v4(),
        value: "5",
        emoji: "stronglyAgreeEmoji",
        label: "Outstanding",
      },
    ],
  },
  {
    id: v4(),
    name: "Likely",
    options: [
      {
        id: v4(),
        value: "1",
        emoji: "crossEyeEmoji",
        label: "Not at all likely",
      },
      { id: v4(), value: "2", emoji: "neutralEmoji", label: "Slightly likely" },
      { id: v4(), value: "3", emoji: "agreeEmoji", label: "Moderately likely" },
      {
        id: v4(),
        value: "4",
        emoji: "grinningLaughEmoji",
        label: "Very likely",
      },
      {
        id: v4(),
        value: "5",
        emoji: "stronglyAgreeEmoji",
        label: "Completely likely",
      },
    ],
  },
  {
    id: v4(),
    name: "Accomplished",
    options: [
      {
        id: v4(),
        value: "1",
        emoji: "disagreeEmoji",
        label: "Not accomplished",
      },
      {
        id: v4(),
        value: "2",
        emoji: "neutralEmoji",
        label: "Partially accomplished",
      },
      {
        id: v4(),
        value: "3",
        emoji: "agreeEmoji",
        label: "Fully accomplished",
      },
      {
        id: v4(),
        value: "4",
        emoji: "stronglyAgreeEmoji",
        label: "Exceeds expectations",
      },
    ],
  },
  {
    id: v4(),
    name: "Excited",
    options: [
      {
        id: v4(),
        value: "1",
        emoji: "crossEyeEmoji",
        label: "Not existed at all",
      },
      {
        id: v4(),
        value: "2",
        emoji: "disagreeEmoji",
        label: "Not so enthusiastic",
      },
      {
        id: v4(),
        value: "3",
        emoji: "neutralEmoji",
        label: "Somewhat excited",
      },
      { id: v4(), value: "4", emoji: "agreeEmoji", label: "Very excited" },
      {
        id: v4(),
        value: "5",
        emoji: "stronglyAgreeEmoji",
        label: "Extremely excited",
      },
    ],
  },
  {
    id: v4(),
    name: "Excellent",
    options: [
      {
        id: v4(),
        value: "1",
        emoji: "crossEyeEmoji",
        label: "Requires significant improvement",
      },
      { id: v4(), value: "2", emoji: "disagreeEmoji", label: "Below average" },
      { id: v4(), value: "3", emoji: "neutralEmoji", label: "Average" },
      { id: v4(), value: "4", emoji: "agreeEmoji", label: "Above average" },
      { id: v4(), value: "5", emoji: "stronglyAgreeEmoji", label: "Excellent" },
    ],
  },
  {
    id: v4(),
    name: "Excels",
    options: [
      {
        id: v4(),
        value: "1",
        emoji: "crossEyeEmoji",
        label: "Doesn't meet expectations",
      },
      {
        id: v4(),
        value: "2",
        emoji: "neutralEmoji",
        label: "Meets some expectations",
      },
      {
        id: v4(),
        value: "3",
        emoji: "agreeEmoji",
        label: "Consistently meets expectations",
      },
      {
        id: v4(),
        value: "4",
        emoji: "grinningLaughEmoji",
        label: "Exceeds expectations",
      },
      { id: v4(), value: "5", emoji: "stronglyAgreeEmoji", label: "Excels" },
    ],
  },
  {
    id: v4(),
    name: "Stress",
    options: [
      {
        id: v4(),
        value: "1",
        emoji: "neutralEmoji",
        label: "Not too stressed",
      },
      {
        id: v4(),
        value: "2",
        emoji: "disagreeEmoji",
        label: "Stressed but OK",
      },
      { id: v4(), value: "3", emoji: "notSureEmoji", label: "Not sure" },
      { id: v4(), value: "4", emoji: "stressedEmoji", label: "Stressed" },
      {
        id: v4(),
        value: "5",
        emoji: "crossEyeEmoji",
        label: "Highly stressed",
      },
    ],
  },
];
module.exports = {
  up: async (queryInterface) => {
    for (const scale of DEFAULT_SCALES) {
      // Insert into scales table
      await queryInterface.bulkInsert("scales", [
        {
          id: scale.id,
          name: scale.name,
          is_custom: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      // Insert into scale_options table
      const options = scale.options.map((option) => ({
        id: option.id,
        scale_id: scale.id,
        value: option.value,
        emoji: option.emoji,
        label: option.label,
        created_at: new Date(),
        updated_at: new Date(),
      }));

      await queryInterface.bulkInsert("scale_options", options);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM scales WHERE is_custom = false
    `);
  },
};
