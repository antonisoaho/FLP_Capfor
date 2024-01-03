const { Schema } = require('mongoose');

const incomeSchema = new Schema(
  {
    belongs: { type: String },
    baseValues: {
      serviceIncome: { type: Number },
      ofWhichOwnAB: { type: Number },
      companyCarBenefit: { type: Boolean },
      soleTraderIncome: { type: Number },
      deficitOffset: { type: Boolean },
      taxFree: { type: Number },
      k10: {
        amount: { type: Number },
        distributionMonth: { type: Number },
        savedDistribution: { type: Number },
        financialStatementsMonth: { type: Number },
        salaryBasis: { type: Number },
        ownershipShare: { type: Number },
      },
    },
    changeValues: [
      {
        changeType: { type: String },
        when: { type: Number },
        newAmount: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = incomeSchema;
