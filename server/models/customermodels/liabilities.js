const { Schema } = require('mongoose');

const liabilitySchema = new Schema(
  {
    baseValues: {
      loanType: { type: String },
      lender: { type: String },
      name: { type: String },
      borrower: {
        type: String,
        required: function () {
          return this.baseValues.loanType != null;
        },
      },
      debt: {
        type: [Number],
        required: function () {
          return this.baseValues.loanType != null;
        },
      },
      interest: {
        type: [Number],
        required: function () {
          return this.baseValues.loanType != null;
        },
      },
      monthlyAmortization: {
        type: [Number],
        required: function () {
          return this.baseValues.loanType != null;
        },
      },
      loanProtection: {
        death: { type: Boolean },
        sickness: { type: Boolean },
        unemployment: { type: Boolean },
        maximumAmount: { type: Number },
      },
    },
    planned: {
      loan: { type: String },
      event: { type: String },
      when: { type: String },
      amount: { type: Number },
      interest: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = liabilitySchema;
