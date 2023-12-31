const { Schema, model } = require('mongoose');
const customerDetailsSchema = require('./customerModels/details');
const childSchema = require('./customerModels/children');
const workConditionSchema = require('./customerModels/workConditions');
const { expensesBaseSchema, expensesChangeSchema } = require('./customerModels/expenses');
const { incomeBaseSchema, incomeChangeSchema } = require('./customerModels/income');
const investmentSchema = require('./customerModels/investments');
const liabilitySchema = require('./customerModels/liabilities');
const pensionSchema = require('./customerModels/pension');
const assetSchema = require('./customerModels/assets');
const {
  propertyInsuranceSchema,
  sickInsuranceSchema,
  accidentInsuranceSchema,
  deathInsuranceSchema,
  workInsuranceSchema,
} = require('./customerModels/insurances');

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
    income: {
      base: [incomeBaseSchema],
      change: [incomeChangeSchema],
    },
    expenses: {
      base: [expensesBaseSchema],
      change: [expensesChangeSchema],
    },
    investments: [investmentSchema],
    liabilities: [liabilitySchema],
    assets: [assetSchema],
    insurances: {
      property: [propertyInsuranceSchema],
      sickness: [sickInsuranceSchema],
      accident: [accidentInsuranceSchema],
      death: [deathInsuranceSchema],
      work: [workInsuranceSchema],
    },
    pension: [pensionSchema],
  },
  { timestamps: true }
);

const Customer = model('Customer', customerSchema);
module.exports = { Customer };
