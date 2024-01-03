const { Schema } = require('mongoose');

const expensesSchema = new Schema(
  {
    belongs: { type: String },
    baseValues: {
      expenseType: { type: String },
      mapped: { type: Number },
      correction: { type: Number },
      difCrisis: { type: Number },
      difPension: { type: Number },
      difActiveEnd: { type: Number },
      difDeath: [{ type: Number }],
      childMovesOut: { type: Number },
    },
    changeValues: {
      changeType: { type: String },
      when: { type: Number },
      ongoing: { type: Number },
      value: { type: Number },
      comment: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = expensesSchema;
