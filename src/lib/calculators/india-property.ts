import { CalculatorConfig } from '../calculator-types';
import { FY_LABEL } from '../india-tax';

// ─────────────────────────────────────────────────────────────────────────────
// Loan and property calculators for the Indian market.
//
// Deliberately NOT built: a stamp duty calculator. Stamp duty and registration
// charges are set per state, differ by gender of the buyer, by urban/rural
// location and by property type, and are revised in state budgets. A hardcoded
// national table would be wrong somewhere within a year, and quoting the wrong
// duty on an ₹80 lakh flat is worse than offering no tool at all.
// ─────────────────────────────────────────────────────────────────────────────

function emiFor(principal: number, monthlyRate: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  if (monthlyRate === 0) return principal / months;
  const growth = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * growth) / (growth - 1);
}

/** Outstanding balance after `elapsed` months of a standard reducing loan. */
function balanceAfter(principal: number, monthlyRate: number, months: number, elapsed: number): number {
  const emi = emiFor(principal, monthlyRate, months);
  let bal = principal;
  for (let m = 0; m < Math.min(elapsed, months); m++) {
    bal = bal + bal * monthlyRate - emi;
    if (bal < 0) return 0;
  }
  return bal;
}

export const indiaPropertyCalculators: CalculatorConfig[] = [
  {
    slug: 'loan-against-property-calculator',
    name: 'Loan Against Property Calculator',
    shortName: 'LAP Calculator',
    category: 'finance',
    icon: 'Building2',
    description:
      'How much you can borrow against a property you already own, what the EMI works out to, and what the whole thing costs in interest over the tenure.',
    chartType: 'donut',
    inputs: [
      { key: 'propertyValue', label: 'Property Market Value', type: 'slider', min: 500000, max: 100000000, step: 100000, default: 10000000, prefix: '$', color: 'primary' },
      { key: 'ltv', label: 'Loan to Value Offered', type: 'slider', min: 30, max: 75, step: 5, default: 60, suffix: '%', color: 'secondary' },
      { key: 'rate', label: 'Interest Rate', type: 'slider', min: 7, max: 18, step: 0.05, default: 9.5, suffix: '%', color: 'tertiary' },
      { key: 'tenure', label: 'Tenure', type: 'slider', min: 1, max: 20, step: 1, default: 15, suffix: 'Years' },
      { key: 'processingFeePct', label: 'Processing Fee', type: 'slider', min: 0, max: 3, step: 0.05, default: 1, suffix: '%' },
    ],
    outputs: [
      { key: 'eligibleLoan', label: 'Loan You Can Raise', prefix: '$', primary: true, color: 'white' },
      { key: 'emi', label: 'Monthly EMI', prefix: '$', color: 'secondary' },
      { key: 'totalInterest', label: 'Total Interest', prefix: '$', color: 'tertiary' },
      { key: 'processingFee', label: 'Processing Fee', prefix: '$' },
      { key: 'totalCost', label: 'Total Cost of Borrowing', prefix: '$' },
    ],
    calculate: (i) => {
      const eligibleLoan = Number(i.propertyValue) * (Number(i.ltv) / 100);
      const monthlyRate = Number(i.rate) / 12 / 100;
      const months = Number(i.tenure) * 12;
      const emi = emiFor(eligibleLoan, monthlyRate, months);
      const totalInterest = emi * months - eligibleLoan;
      const processingFee = eligibleLoan * (Number(i.processingFeePct) / 100);
      return {
        eligibleLoan,
        emi,
        totalInterest,
        processingFee,
        totalCost: totalInterest + processingFee,
      };
    },
    buildTable: (i) => {
      const loan = Number(i.propertyValue) * (Number(i.ltv) / 100);
      const monthlyRate = Number(i.rate) / 12 / 100;
      const rows: (string | number)[][] = [];
      for (const yrs of [5, 10, 12, 15, 20]) {
        const emi = emiFor(loan, monthlyRate, yrs * 12);
        rows.push([
          `${yrs} years`,
          Math.round(emi).toLocaleString('en-IN'),
          Math.round(emi * yrs * 12 - loan).toLocaleString('en-IN'),
          Math.round(emi * yrs * 12).toLocaleString('en-IN'),
        ]);
      }
      return {
        title: 'A longer tenure lowers the EMI and raises the total cost',
        headers: ['Tenure', 'EMI', 'Total interest', 'Total repaid'],
        rows,
      };
    },
    relatedSlugs: ['emi-calculator', 'emi-prepayment-calculator', 'home-loan-balance-transfer-calculator', 'loan-eligibility-calculator'],
    seo: {
      title: 'Loan Against Property Calculator: LAP EMI and Eligibility',
      description:
        'Free loan against property calculator. Enter your property value and the LTV offered to see how much you can borrow, the LAP EMI, total interest and processing fee.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },

  {
    slug: 'home-loan-balance-transfer-calculator',
    name: 'Home Loan Balance Transfer Calculator',
    shortName: 'Balance Transfer',
    category: 'finance',
    icon: 'ArrowLeftRight',
    description:
      'Whether switching your home loan to a cheaper lender is actually worth it once the processing fee, legal charges and valuation are counted.',
    inputs: [
      { key: 'outstanding', label: 'Outstanding Loan Amount', type: 'slider', min: 100000, max: 20000000, step: 50000, default: 3000000, prefix: '$', color: 'primary' },
      { key: 'currentRate', label: 'Current Interest Rate', type: 'slider', min: 6, max: 16, step: 0.05, default: 9.5, suffix: '%', color: 'secondary' },
      { key: 'newRate', label: 'New Lender Rate', type: 'slider', min: 6, max: 16, step: 0.05, default: 8.5, suffix: '%', color: 'tertiary' },
      { key: 'remainingYears', label: 'Remaining Tenure', type: 'slider', min: 1, max: 30, step: 1, default: 15, suffix: 'Years' },
      { key: 'switchCostPct', label: 'Switching Cost (fee + legal + valuation)', type: 'slider', min: 0, max: 3, step: 0.05, default: 0.5, suffix: '%' },
    ],
    outputs: [
      { key: 'netSaving', label: 'Net Saving After Costs', prefix: '$', primary: true, color: 'white' },
      { key: 'verdict', label: 'Worth Switching?', color: 'secondary' },
      { key: 'emiReduction', label: 'Monthly EMI Falls By', prefix: '$', color: 'tertiary' },
      { key: 'paybackMonths', label: 'Months to Recover the Fee', decimals: 0 },
      { key: 'currentEmi', label: 'Current EMI', prefix: '$' },
      { key: 'newEmi', label: 'New EMI', prefix: '$' },
      { key: 'switchCost', label: 'Cost of Switching', prefix: '$' },
    ],
    calculate: (i) => {
      const outstanding = Number(i.outstanding);
      const months = Number(i.remainingYears) * 12;
      const currentEmi = emiFor(outstanding, Number(i.currentRate) / 1200, months);
      const newEmi = emiFor(outstanding, Number(i.newRate) / 1200, months);

      const interestNow = currentEmi * months - outstanding;
      const interestAfter = newEmi * months - outstanding;
      const switchCost = outstanding * (Number(i.switchCostPct) / 100);
      const netSaving = interestNow - interestAfter - switchCost;

      // Judged on payback rather than an arbitrary rupee threshold: how many
      // months of the lower EMI it takes to recover the switching cost. Under
      // two years is why people actually switch; past five, asking your
      // existing lender to match the rate costs nothing and usually beats the
      // paperwork.
      const emiReduction = currentEmi - newEmi;
      const paybackMonths = emiReduction > 0 ? switchCost / emiReduction : Infinity;

      return {
        netSaving,
        verdict:
          netSaving <= 0
            ? 'No — the costs outweigh the saving'
            : paybackMonths <= 24
            ? 'Yes — pays for itself quickly'
            : paybackMonths <= 60
            ? 'Probably — but ask your current lender to match first'
            : 'Marginal — the fee takes years to recover',
        paybackMonths: Number.isFinite(paybackMonths) ? paybackMonths : 0,
        emiReduction,
        currentEmi,
        newEmi,
        switchCost,
      };
    },
    buildTable: (i) => {
      const outstanding = Number(i.outstanding);
      const months = Number(i.remainingYears) * 12;
      const currentRate = Number(i.currentRate);
      const switchCost = outstanding * (Number(i.switchCostPct) / 100);
      const currentEmi = emiFor(outstanding, currentRate / 1200, months);
      const interestNow = currentEmi * months - outstanding;
      const rows: (string | number)[][] = [];
      for (const cut of [0.25, 0.5, 0.75, 1, 1.5]) {
        const newRate = currentRate - cut;
        if (newRate <= 0) continue;
        const newEmi = emiFor(outstanding, newRate / 1200, months);
        const net = interestNow - (newEmi * months - outstanding) - switchCost;
        const payback = currentEmi - newEmi > 0 ? switchCost / (currentEmi - newEmi) : 0;
        rows.push([
          `${cut}% lower (${newRate.toFixed(2)}%)`,
          Math.round(currentEmi - newEmi).toLocaleString('en-IN'),
          Math.round(payback) + ' months',
          Math.round(net).toLocaleString('en-IN'),
        ]);
      }
      return {
        title: 'How big a rate cut do you actually need?',
        headers: ['Rate reduction', 'EMI falls by', 'Fee recovered in', 'Net saving'],
        rows,
      };
    },
    relatedSlugs: ['emi-calculator', 'emi-prepayment-calculator', 'loan-against-property-calculator', 'home-loan-tax-benefit-calculator'],
    seo: {
      title: 'Home Loan Balance Transfer Calculator: Is Switching Worth It?',
      description:
        'Calculate the real saving from a home loan balance transfer after processing fees, legal and valuation charges — with the number of months it takes to recover the cost.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },

  {
    slug: 'home-loan-tax-benefit-calculator',
    name: 'Home Loan Tax Benefit Calculator',
    shortName: 'Home Loan Tax',
    category: 'finance',
    icon: 'Receipt',
    description: `What your home loan actually saves you in tax under Section 24(b) and 80C — and why the answer is zero on the new regime (${FY_LABEL}).`,
    inputs: [
      { key: 'loanAmount', label: 'Loan Amount', type: 'slider', min: 100000, max: 20000000, step: 50000, default: 4000000, prefix: '$', color: 'primary' },
      { key: 'rate', label: 'Interest Rate', type: 'slider', min: 6, max: 16, step: 0.05, default: 8.75, suffix: '%', color: 'secondary' },
      { key: 'tenure', label: 'Tenure', type: 'slider', min: 1, max: 30, step: 1, default: 20, suffix: 'Years', color: 'tertiary' },
      { key: 'yearOfLoan', label: 'Which Year of the Loan', type: 'slider', min: 1, max: 30, step: 1, default: 1, suffix: 'Year' },
      { key: 'slab', label: 'Your Tax Slab', type: 'select', default: '30', options: [{ label: '5%', value: '5' }, { label: '10%', value: '10' }, { label: '20%', value: '20' }, { label: '30%', value: '30' }] },
      { key: 'regime', label: 'Tax Regime', type: 'select', default: 'old', options: [{ label: 'Old regime', value: 'old' }, { label: 'New regime', value: 'new' }] },
    ],
    outputs: [
      { key: 'taxSaved', label: 'Tax Saved This Year', prefix: '$', primary: true, color: 'white' },
      { key: 'interestPaid', label: 'Interest Paid This Year', prefix: '$', color: 'secondary' },
      { key: 'principalPaid', label: 'Principal Repaid This Year', prefix: '$', color: 'tertiary' },
      { key: 'interestClaimable', label: 'Claimable under 24(b)', prefix: '$' },
      { key: 'principalClaimable', label: 'Claimable under 80C', prefix: '$' },
      { key: 'effectiveRate', label: 'Effective Rate After Tax', suffix: '%', decimals: 2 },
    ],
    calculate: (i) => {
      const principal = Number(i.loanAmount);
      const monthlyRate = Number(i.rate) / 1200;
      const months = Number(i.tenure) * 12;
      const year = Math.min(Number(i.yearOfLoan), Number(i.tenure));
      const emi = emiFor(principal, monthlyRate, months);

      // Walk the year in question so the interest/principal split is the real
      // one. Early years are almost all interest — which is exactly why the
      // deduction is worth most at the start and tails off later.
      let bal = balanceAfter(principal, monthlyRate, months, (year - 1) * 12);
      let interestPaid = 0;
      let principalPaid = 0;
      for (let m = 0; m < 12 && bal > 0; m++) {
        const interest = bal * monthlyRate;
        const principalPart = Math.min(emi - interest, bal);
        interestPaid += interest;
        principalPaid += principalPart;
        bal -= principalPart;
      }

      const isNew = String(i.regime) === 'new';
      // Section 24(b) caps interest at ₹2,00,000 for a self-occupied property;
      // 80C caps principal at ₹1,50,000 and is shared with EPF, ELSS, tuition
      // fees and insurance premiums. Neither survives the new regime.
      const interestClaimable = isNew ? 0 : Math.min(interestPaid, 200000);
      const principalClaimable = isNew ? 0 : Math.min(principalPaid, 150000);
      const slab = Number(i.slab) / 100;
      const taxSaved = (interestClaimable + principalClaimable) * slab;

      return {
        taxSaved,
        interestPaid,
        principalPaid,
        interestClaimable,
        principalClaimable,
        effectiveRate:
          interestPaid > 0
            ? Number(i.rate) * (1 - (interestClaimable * slab) / interestPaid)
            : Number(i.rate),
      };
    },
    relatedSlugs: ['emi-calculator', 'emi-prepayment-calculator', 'old-vs-new-tax-regime-calculator', 'home-loan-balance-transfer-calculator'],
    seo: {
      title: 'Home Loan Tax Benefit Calculator: Section 24(b) and 80C',
      description:
        'Calculate the tax your home loan actually saves under Section 24(b) and 80C, year by year, and see your effective post-tax interest rate. Handles both tax regimes.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },

  {
    slug: 'rent-vs-buy-calculator',
    name: 'Rent vs Buy Calculator',
    shortName: 'Rent vs Buy',
    category: 'finance',
    icon: 'Home',
    description:
      'Compares your net worth after N years if you buy against if you rent and invest the difference — the only comparison that actually answers the question.',
    inputs: [
      { key: 'price', label: 'Property Price', type: 'slider', min: 1000000, max: 100000000, step: 100000, default: 8000000, prefix: '$', color: 'primary' },
      { key: 'downPct', label: 'Down Payment', type: 'slider', min: 10, max: 100, step: 5, default: 20, suffix: '%', color: 'secondary' },
      { key: 'rate', label: 'Home Loan Rate', type: 'slider', min: 6, max: 16, step: 0.05, default: 8.75, suffix: '%', color: 'tertiary' },
      { key: 'tenure', label: 'Loan Tenure', type: 'slider', min: 5, max: 30, step: 1, default: 20, suffix: 'Years' },
      { key: 'monthlyRent', label: 'Monthly Rent for a Similar Home', type: 'slider', min: 5000, max: 500000, step: 1000, default: 25000, prefix: '$' },
      { key: 'rentHike', label: 'Annual Rent Increase', type: 'slider', min: 0, max: 15, step: 1, default: 7, suffix: '%' },
      { key: 'appreciation', label: 'Property Appreciation', type: 'slider', min: 0, max: 15, step: 0.5, default: 5, suffix: '%' },
      { key: 'investReturn', label: 'Return If You Invest Instead', type: 'slider', min: 0, max: 20, step: 0.5, default: 12, suffix: '%' },
      { key: 'years', label: 'Compare Over', type: 'slider', min: 1, max: 30, step: 1, default: 10, suffix: 'Years' },
    ],
    outputs: [
      { key: 'verdict', label: 'Better Option', primary: true, color: 'white' },
      { key: 'difference', label: 'Ahead By', prefix: '$', color: 'secondary' },
      { key: 'buyNetWorth', label: 'Net Worth if You Buy', prefix: '$', color: 'tertiary' },
      { key: 'rentNetWorth', label: 'Net Worth if You Rent + Invest', prefix: '$' },
      { key: 'emi', label: 'Your EMI', prefix: '$' },
      { key: 'homeValue', label: 'Property Value at the End', prefix: '$' },
    ],
    calculate: (i) => {
      const price = Number(i.price);
      const down = price * (Number(i.downPct) / 100);
      const loan = price - down;
      const monthlyRate = Number(i.rate) / 1200;
      const loanMonths = Number(i.tenure) * 12;
      const horizon = Number(i.years) * 12;
      const emi = emiFor(loan, monthlyRate, loanMonths);

      // Buyer: net worth is home equity at the horizon.
      const homeValue = price * Math.pow(1 + Number(i.appreciation) / 100, Number(i.years));
      const outstanding = balanceAfter(loan, monthlyRate, loanMonths, horizon);
      const buyNetWorth = homeValue - outstanding;

      // Renter: invests the down payment on day one, then invests whatever the
      // buyer is paying that the renter is not. When rent exceeds the EMI the
      // monthly figure goes negative, which is the honest result — the renter
      // is spending more than the buyer that month, not saving.
      const investMonthly = Number(i.investReturn) / 1200;
      let portfolio = down;
      let rent = Number(i.monthlyRent);
      for (let m = 0; m < horizon; m++) {
        if (m > 0 && m % 12 === 0) rent *= 1 + Number(i.rentHike) / 100;
        const buyerOutflow = m < loanMonths ? emi : 0;
        portfolio = (portfolio + (buyerOutflow - rent)) * (1 + investMonthly);
      }

      const difference = buyNetWorth - portfolio;
      return {
        verdict: difference > 0 ? 'Buying' : difference < 0 ? 'Renting + investing' : 'Line ball',
        difference: Math.abs(difference),
        buyNetWorth,
        rentNetWorth: portfolio,
        emi,
        homeValue,
      };
    },
    buildTable: (i) => {
      const price = Number(i.price);
      const down = price * (Number(i.downPct) / 100);
      const loan = price - down;
      const monthlyRate = Number(i.rate) / 1200;
      const loanMonths = Number(i.tenure) * 12;
      const emi = emiFor(loan, monthlyRate, loanMonths);
      const investMonthly = Number(i.investReturn) / 1200;
      const rows: (string | number)[][] = [];
      for (const yrs of [5, 10, 15, 20, 25]) {
        const horizon = yrs * 12;
        const homeValue = price * Math.pow(1 + Number(i.appreciation) / 100, yrs);
        const buy = homeValue - balanceAfter(loan, monthlyRate, loanMonths, horizon);
        let portfolio = down;
        let rent = Number(i.monthlyRent);
        for (let m = 0; m < horizon; m++) {
          if (m > 0 && m % 12 === 0) rent *= 1 + Number(i.rentHike) / 100;
          portfolio = (portfolio + ((m < loanMonths ? emi : 0) - rent)) * (1 + investMonthly);
        }
        rows.push([
          `${yrs} years`,
          Math.round(buy).toLocaleString('en-IN'),
          Math.round(portfolio).toLocaleString('en-IN'),
          buy > portfolio ? 'Buying' : 'Renting',
        ]);
      }
      return {
        title: 'The answer changes with how long you stay',
        headers: ['Horizon', 'Net worth — buy', 'Net worth — rent + invest', 'Ahead'],
        rows,
      };
    },
    relatedSlugs: ['emi-calculator', 'home-loan-tax-benefit-calculator', 'sip-calculator', 'emi-prepayment-calculator'],
    seo: {
      title: 'Rent vs Buy Calculator India: Which Leaves You Richer?',
      description:
        'Compare renting against buying a home in India by net worth after N years — EMI, property appreciation, rent increases and the return on investing the difference.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
