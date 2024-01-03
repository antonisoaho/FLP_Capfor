const { Schema, model } = require('mongoose');

const customerSchema = new Schema(
  {
    advisor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customerDetails: [
      {
        name: { type: String, required: true },
        yearMonth: { type: Number, required: true },
        status: { type: String, required: true },
      },
    ],
    customerChildren: [
      {
        name: { type: String },
        yearMonth: { type: Number },
        belongsTo: { type: String },
        childSupportCounts: { type: Boolean },
        livesAtHomeToAge: { type: Number },
      },
    ],
    workConditions: [
      {
        belongs: { type: String },
        pensionAge: {
          type: Number,
          required: true,
          default: 65,
        },
        activeTimeEnd: {
          type: Number,
          required: true,
          default: 85,
        },
        lifeSpan: {
          type: Number,
          required: true,
          default: 90,
        },
        sickPay: {
          type: Boolean,
          required: true,
          default: false,
        },
        occupation: { type: String, required: true },
        collectiveAgreement: { type: Boolean, required: true, default: false },
      },
    ],
    income: [
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
    ],
    expenses: [
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
    ],
    investments: [
      {
        investmentType: { type: String },
        institution: { type: String },
        name: { type: String },
        owner: {
          type: String,
          required: function () {
            return this.investments.investmentType != null;
          },
        },
        depositedAmount: {
          type: Number,
          required: function () {
            return this.investments.investmentType != null;
          },
        },
        value: {
          type: Number,
          required: function () {
            return this.investments.investmentType != null;
          },
        },
        riskClass: { type: Number },
        charge: { type: Number },
        timePerspective: { type: Number },
        monthlySavings: { type: Number },
        saveForHowLong: { type: Number },
        projectedGrowth: { type: Number },
      },
    ],
    liabilities: [
      {
        baseValues: {
          loanType: { type: String },
          lender: { type: String },
          name: { type: String },
          borrower: {
            type: String,
            required: function () {
              return this.liabilities.baseValues.loanType != null;
            },
          },
          debt: {
            type: [Number],
            required: function () {
              return this.liabilities.baseValues.loanType != null;
            },
          },
          interest: {
            type: [Number],
            required: function () {
              return this.liabilities.baseValues.loanType != null;
            },
          },
          monthlyAmortization: {
            type: [Number],
            required: function () {
              return this.liabilities.baseValues.loanType != null;
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
    ],
    assets: [
      {
        assetType: { type: String },
        name: { type: String },
        value: {
          type: Number,
          required: function () {
            return this.liabilities.assets.assetType != null;
          },
        },
        stake: { type: Number },
        mortgageDeed: { type: Number },
        valueYear: { type: Number },
        owner: {
          type: String,
          required: function () {
            return this.liabilities.assets.assetType != null;
          },
        },
        tax: { type: Number },
        assessedValue: { type: Number }, //Taxeringsvärde
        legalTitleCost: { type: Number },
        investments: { type: Number },
      },
    ],
    insurances: {
      property: [
        {
          propertyType: { type: String },
          company: { type: String },
          expiryDate: { type: Date },
          premiumCost: { type: Number },
          paymentPeriod: { type: String },
          lastControl: { type: Date },
        },
      ],
      person: [
        {
          insured: { type: String },
          sickness: [
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
          ],
          work: [
            {
              insuranceType: { type: String },
            },
          ],
          accident: [
            {
              company: { type: String },
              insuranceType: { type: String },
              compensationAmount: { type: Number },
              premiumCost: { type: Number },
              expiryDate: { type: Date },
              lastControl: { type: Date },
            },
          ],
          death: [
            {
              company: { type: String },
              insuranceType: { type: String },
              compensationAmount: { type: Number },
              premiumCost: { type: Number },
              expiryDate: { type: Date },
              beneficiary: { type: String },
              lastControl: { type: Date },
            },
          ],
        },
      ],
    },
    pension: [
      {
        insured: { type: String },
        company: { type: String },
        pensionType: { type: String },
        pensionName: { type: String },
        pensionValue: { type: Number },
        pensionAge: { type: Number },
        monthlyPension: { type: Number },
        compensationPeriod: { type: String },
        altPaymentAge: { type: Number },
        impactPercent: { type: Number },
        shellFee: { type: Number },
        riskClass: { type: Number },
        fundFee: { type: Number },
        estIncreasedValue: { type: Number },
        annualSavings: { type: Number },
        commitmentPowers: { type: Boolean },
        beneficiary: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Customer = model('Customer', customerSchema);
module.exports = { Customer };
