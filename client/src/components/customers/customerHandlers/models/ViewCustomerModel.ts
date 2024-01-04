export type CustomerOverview = {
  _id: string;
  advisor: string;
  customerDetails: [];
  customerChildren: [];
  workConditions: [];
  income: [];
  expenses: [];
  insurances: [];
  investments: [];
  liabilities: [];
  assets: [];
  pension: [];
  createdAt: Date;
  updatedAt: Date;
};
