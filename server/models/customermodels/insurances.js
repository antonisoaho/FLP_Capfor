const { Schema } = require('mongoose');

const propertyInsuranceSchema = new Schema(
  {
    propertyType: { type: String },
    company: { type: String },
    expiryDate: { type: Date },
    premiumCost: { type: Number },
    paymentPeriod: { type: String },
    lastControl: { type: Date },
  },
  { timestamps: true }
);

const sickInsuranceSchema = new Schema(
  {
    company: { type: String },
    insuranceType: { type: String },
    taxCategory: { type: String },
    qualifyingPeriod: { type: String },
    compensationAmount: { type: Number },
    compensationPeriod: { type: String },
    premiumCost: { type: Number },
    expiryDate: { type: Date },
    lastUpdated: { type: Date },
  },
  { timestamps: true }
);

const accidentInsuranceSchema = new Schema(
  {
    company: { type: String },
    insuranceType: { type: String },
    compensationAmount: { type: Number },
    premiumCost: { type: Number },
    expiryDate: { type: Date },
    lastControl: { type: Date },
  },
  { timestamps: true }
);

const deathInsuranceSchema = new Schema(
  {
    company: { type: String },
    insuranceType: { type: String },
    compensationAmount: { type: Number },
    premiumCost: { type: Number },
    expiryDate: { type: Date },
    beneficiary: { type: String },
    lastControl: { type: Date },
  },
  { timestamps: true }
);

module.exports = {
  propertyInsuranceSchema,
  sickInsuranceSchema,
  deathInsuranceSchema,
  accidentInsuranceSchema,
};
