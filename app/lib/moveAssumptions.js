// Should I Move? tool assumptions
// This is the only file you need to touch to keep the tool current.
// Update the rate every Thursday afternoon (Freddie Mac posts at noon Eastern): freddiemac.com/pmms

export const MORTGAGE_RATE = 6.95;
export const RATE_AS_OF = 'September 17, 2026';
export const RATE_SOURCE = 'Freddie Mac weekly average, 30-year fixed';
export const LOAN_TERM_YEARS = 30;

// Selling side
export const DEFAULT_COMMISSION_PCT = 6; // conservative default, the visitor can edit it
export const SELLER_CLOSING_PCT = 1.25; // title, deed prep, tax proration, misc
export const CONDITIONS = [
  { id: 'ready', label: 'Move-in ready', pct: 0.5 },
  { id: 'some', label: 'Needs a little work', pct: 1.5 },
  { id: 'lots', label: 'Needs a lot of work', pct: 4 },
];

// Buying side
export const BUYER_CLOSING_PCT = 2.5; // lender fees, title, prepaids, escrows
export const INSURANCE_PCT = 0.65; // yearly homeowners insurance as % of price
export const PMI_PCT = 0.5; // yearly mortgage insurance as % of loan, under 20% down
export const MIN_DOWN_PCT = 3; // lowest conventional down payment

// Verdict thresholds (debt to income, % of gross monthly income)
export const COMFORT_DTI = 36;
export const MAX_DTI = 45;

// Homesteaded property tax, dollars per year per $100,000 of market value.
// Confirm with the county revenue commissioner once a year.
export const AREAS = [
  { id: 'athens', label: 'Athens (city limits)', taxPer100k: 400 },
  { id: 'limestone', label: 'Limestone County, outside city limits', taxPer100k: 330 },
  { id: 'huntsville', label: 'Huntsville (city limits)', taxPer100k: 580 },
  { id: 'madison', label: 'Madison (city limits)', taxPer100k: 695 },
  { id: 'madison-county', label: 'Madison County, outside city limits', taxPer100k: 365 },
  { id: 'decatur', label: 'Decatur (city limits)', taxPer100k: 453 },
  { id: 'other', label: 'Somewhere else in North Alabama', taxPer100k: 450 },
];
