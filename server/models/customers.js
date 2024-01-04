const { Schema, model } = require('mongoose');
const customerDetailsSchema = require('./customermodels/details');
const childSchema = require('./customermodels/children');
const workConditionSchema = require('./customermodels/workConditions');
const expensesSchema = require('./customermodels/expenses');
const incomeSchema = require('./customermodels/income');
const investmentSchema = require('./customermodels/investments');
const liabilitySchema = require('./customermodels/liabilities');
const pensionSchema = require('./customermodels/pension');
const assetSchema = require('./customermodels/assets');
const {
  propertyInsuranceSchema,
  sickInsuranceSchema,
  accidentInsuranceSchema,
  deathInsuranceSchema,
} = require('./customermodels/insurances');

const customerSchema = new Schema(
  {
    advisor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customerDetails: [customerDetailsSchema],
    customerChildren: [childSchema],
    workConditions: [workConditionSchema],
    income: [incomeSchema],
    expenses: [expensesSchema],
    investments: [investmentSchema],
    liabilities: [liabilitySchema],
    assets: [assetSchema],
    insurances: {
      property: [propertyInsuranceSchema],
      person: [
        {
          insured: { type: String },
          sickness: [sickInsuranceSchema],
          work: [
            {
              insuranceType: { type: String },
            },
          ],
          accident: [accidentInsuranceSchema],
          death: [deathInsuranceSchema],
        },
      ],
    },
    pension: [pensionSchema],
  },
  { timestamps: true }
);

const Customer = model('Customer', customerSchema);
module.exports = { Customer };
