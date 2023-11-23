const { Schema, model } = require('mongoose');

const defaultValueWorkConditions = (value) => {
  const nameLength = customerDetails.name.length;
  return Array.from({ length: nameLength }, () => value);
};

const requiredField = (fromField) => {
  return fromField.length > 0;
};

const customerSchema = new Schema({
  advisor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  customerDetails: {
    name: { type: [String], required: true },
    yearMonth: { type: [Number], required: true },
    status: { type: [String], required: true },
  },
  customerChildren: {
    name: [String],
    yearMonth: [Number],
    belongsTo: [String],
    childSupportCounts: [Boolean],
    livesAtHomeToAge: [Number],
  },
  workConditions: {
    pensionAge: {
      type: [Number],
      required: true,
      default: defaultValueWorkConditions(65),
    },
    activeTimeEnd: {
      type: [Number],
      required: true,
      default: defaultValueWorkConditions(85),
    },
    lifeSpan: {
      type: [Number],
      required: true,
      default: defaultValueWorkConditions(90),
    },
    sickPay: {
      type: [Boolean],
      required: true,
      default: defaultValueWorkConditions(false),
    },
    occupation: { type: [String], required: true },
    collectiveAgreement: [Boolean],
  },
  income: {
    baseValues: {
      serviceIncome: [Number],
      ofWhichOwnAB: [Number],
      companyCarBenefit: [Boolean],
      soleTraderIncome: [Number],
      deficitOffset: [Boolean],
      taxFree: [Number],
      k10: {
        amount: [Number],
        distributionMonth: [Number],
        savedDistribution: [Number],
        financialStatementsMonth: [Number],
        salaryBasis: [Number], // Vilka tillhör vilka? Fråga Tomas.
      },
      ownershipShare: [Number],
    },
    changeValues: {
      name: [String],
      changeType: [String],
      when: [Number],
      newAmount: [Number],
    },
  },
  expenses: {
    baseValues: {
      expenseType: [String],
      mapped: [Number],
      correction: [Number],
      difCrisis: [Number],
      difPension: [Number],
      difActiveEnd: [Number],
      difDeath: [Number],
      childMovesOut: [Number],
    },
    changeValues: {
      changeType: [String],
      when: [Number],
      ongoing: [Number],
      value: [Number],
      comment: [String],
    },
  },
  investments: {
    investmentType: [String],
    institution: [String],
    name: [String],
    owner: {
      type: [String],
      required: requiredField(customerDetails.investments.investmentType),
    },
    depositedAmount: {
      type: [Number],
      required: requiredField(customerDetails.investments.investmentType),
    },
    value: {
      type: [Number],
      required: requiredField(customerDetails.investments.investmentType),
    },
    riskClass: [Number],
    charge: [Number],
    timePerspective: [Number],
    monthlySavings: [Number],
    saveForHowLong: [Number],
    projectedGrowth: [Number],
  },
  liabilities: {
    baseValues: {
      loanType: [String],
      lender: [String],
      name: [String],
      borrower: {
        type: [String],
        required: requiredField(customerDetails.liabilites.baseValues.loanType),
      },
      debt: {
        type: [Number],
        required: requiredField(customerDetails.liabilites.baseValues.loanType),
      },
      interest: {
        type: [Number],
        required: requiredField(customerDetails.liabilites.baseValues.loanType),
      },
      monthlyAmortization: {
        type: [Number],
        required: requiredField(customerDetails.liabilites.baseValues.loanType),
      },
      loanProtection: {
        death: [Boolean],
        sickness: [Boolean],
        unemployment: [Boolean],
        maximumAmount: [Number],
      },
    },
    planned: {
      loan: [String],
      event: [String],
      when: [String],
      amount: [Number],
      interest: [Number],
    },
    assets: {
      assetType: [String],
      name: [String],
      value: {
        type: [Number],
        required: requiredField(customerDetails.assets.assetType),
      },
      stake: [Number],
      mortgageDeed: [Number],
      valueYear: [Number],
      owner: {
        type: [String],
        required: requiredField(customerDetails.assets.assetType),
      },
      tax: [Number],
      assessedValue: [Number], //Taxeringsvärde
      legalTitleCost: [Number],
      investments: [Number],
    },
    insurances: {
      property: {},
      person: {
        sickness: {},
        work: {},
        accident: {},
        death: {},
      },
    },
    pension: {},
  },
});
