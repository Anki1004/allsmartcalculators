import { CalculatorConfig } from '../calculator-types';

/** Format a number as a US currency string for table cells. */
const usd = (v: number) =>
  '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** 2026 statewide BASE sales-tax rates (local/county taxes stack on top). */
const STATE_SALES_TAX_OPTIONS: { label: string; value: string }[] = [
  { label: 'Custom rate', value: '-1' },
  { label: 'Alabama (4%)', value: '4' },
  { label: 'Alaska (no sales tax)', value: '0' },
  { label: 'Arizona (5.6%)', value: '5.6' },
  { label: 'Arkansas (6.5%)', value: '6.5' },
  { label: 'California (7.25%)', value: '7.25' },
  { label: 'Colorado (2.9%)', value: '2.9' },
  { label: 'Connecticut (6.35%)', value: '6.35' },
  { label: 'Delaware (no sales tax)', value: '0' },
  { label: 'District of Columbia (6%)', value: '6' },
  { label: 'Florida (6%)', value: '6' },
  { label: 'Georgia (4%)', value: '4' },
  { label: 'Hawaii (4%)', value: '4' },
  { label: 'Idaho (6%)', value: '6' },
  { label: 'Illinois (6.25%)', value: '6.25' },
  { label: 'Indiana (7%)', value: '7' },
  { label: 'Iowa (6%)', value: '6' },
  { label: 'Kansas (6.5%)', value: '6.5' },
  { label: 'Kentucky (6%)', value: '6' },
  { label: 'Louisiana (5%)', value: '5' },
  { label: 'Maine (5.5%)', value: '5.5' },
  { label: 'Maryland (6%)', value: '6' },
  { label: 'Massachusetts (6.25%)', value: '6.25' },
  { label: 'Michigan (6%)', value: '6' },
  { label: 'Minnesota (6.875%)', value: '6.875' },
  { label: 'Mississippi (7%)', value: '7' },
  { label: 'Missouri (4.225%)', value: '4.225' },
  { label: 'Montana (no sales tax)', value: '0' },
  { label: 'Nebraska (5.5%)', value: '5.5' },
  { label: 'Nevada (6.85%)', value: '6.85' },
  { label: 'New Hampshire (no sales tax)', value: '0' },
  { label: 'New Jersey (6.625%)', value: '6.625' },
  { label: 'New Mexico (4.875%)', value: '4.875' },
  { label: 'New York (4%)', value: '4' },
  { label: 'North Carolina (4.75%)', value: '4.75' },
  { label: 'North Dakota (5%)', value: '5' },
  { label: 'Ohio (5.75%)', value: '5.75' },
  { label: 'Oklahoma (4.5%)', value: '4.5' },
  { label: 'Oregon (no sales tax)', value: '0' },
  { label: 'Pennsylvania (6%)', value: '6' },
  { label: 'Rhode Island (7%)', value: '7' },
  { label: 'South Carolina (6%)', value: '6' },
  { label: 'South Dakota (4.2%)', value: '4.2' },
  { label: 'Tennessee (7%)', value: '7' },
  { label: 'Texas (6.25%)', value: '6.25' },
  { label: 'Utah (6.1%)', value: '6.1' },
  { label: 'Vermont (6%)', value: '6' },
  { label: 'Virginia (5.3%)', value: '5.3' },
  { label: 'Washington (6.5%)', value: '6.5' },
  { label: 'West Virginia (6%)', value: '6' },
  { label: 'Wisconsin (5%)', value: '5' },
  { label: 'Wyoming (4%)', value: '4' },
];

export const financeUsLoanCalculators: CalculatorConfig[] = [
  {
    slug: 'sales-tax-calculator',
    name: 'Sales Tax Calculator',
    category: 'finance',
    icon: 'Receipt',
    description: 'Add sales tax to a pre-tax price or extract the tax from a receipt total using 2026 state base rates for all 50 states plus DC — or any custom rate.',
    inputs: [
      {
        key: 'mode',
        label: 'Calculation Mode',
        type: 'select',
        default: 'add',
        options: [
          { label: 'Add tax to pre-tax price', value: 'add' },
          { label: 'Extract tax from total (reverse)', value: 'reverse' },
        ],
        color: 'primary',
      },
      { key: 'amount', label: 'Amount (pre-tax price or total)', type: 'slider', min: 0, max: 100000, step: 1, default: 100, prefix: '$', color: 'secondary' },
      {
        key: 'state',
        label: 'State (2026 base rate)',
        type: 'select',
        default: '-1',
        options: STATE_SALES_TAX_OPTIONS,
        color: 'tertiary',
      },
      { key: 'customRate', label: 'Custom rate (when Custom selected)', type: 'slider', min: 0, max: 15, step: 0.05, default: 7, suffix: '%', color: 'primary' },
    ],
    outputs: [
      { key: 'tax', label: 'Sales Tax', prefix: '$', decimals: 2, primary: true },
      { key: 'total', label: 'Total with Tax', prefix: '$', decimals: 2, color: 'secondary' },
      { key: 'preTax', label: 'Pre-Tax Price', prefix: '$', decimals: 2, color: 'tertiary' },
      { key: 'rateUsed', label: 'Rate Used', color: 'white' },
    ],
    calculate: (i) => {
      const amount = Number(i.amount);
      const stateRate = Number(i.state);
      const rate = stateRate >= 0 ? stateRate : Number(i.customRate);
      const rateLabel = `${Number(rate.toFixed(3))}%`;
      if (String(i.mode) === 'reverse') {
        const preTax = amount / (1 + rate / 100);
        return { tax: amount - preTax, total: amount, preTax, rateUsed: rateLabel };
      }
      const tax = (amount * rate) / 100;
      return { tax, total: amount + tax, preTax: amount, rateUsed: rateLabel };
    },
    seo: {
      title: 'Sales Tax Calculator 2026: All 50 States + DC',
      description: 'Free sales tax calculator. Add tax to a price or reverse-calculate tax from a total with 2026 state base rates for all 50 states and DC, or any custom rate.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['discount-calculator', 'percentage-calculator', 'tip-calculator'],
  },
  {
    slug: 'auto-loan-calculator',
    name: 'Auto Loan Calculator',
    category: 'finance',
    icon: 'CreditCard',
    description: 'Estimate your monthly car payment, total interest, and full amortization schedule from vehicle price, down payment, trade-in, sales tax, APR, and term.',
    inputs: [
      { key: 'price', label: 'Vehicle Price', type: 'slider', min: 1000, max: 200000, step: 500, default: 30000, prefix: '$', color: 'primary' },
      { key: 'down', label: 'Down Payment', type: 'slider', min: 0, max: 100000, step: 500, default: 0, prefix: '$', color: 'secondary' },
      { key: 'tradeIn', label: 'Trade-In Value', type: 'slider', min: 0, max: 100000, step: 500, default: 0, prefix: '$', color: 'tertiary' },
      { key: 'taxPct', label: 'Sales Tax', type: 'slider', min: 0, max: 12, step: 0.05, default: 0, suffix: '%', color: 'primary' },
      { key: 'apr', label: 'APR', type: 'slider', min: 0, max: 25, step: 0.05, default: 6, suffix: '%', color: 'secondary' },
      {
        key: 'term',
        label: 'Loan Term',
        type: 'select',
        default: '60',
        options: [
          { label: '24 months (2 yrs)', value: '24' },
          { label: '36 months (3 yrs)', value: '36' },
          { label: '48 months (4 yrs)', value: '48' },
          { label: '60 months (5 yrs)', value: '60' },
          { label: '72 months (6 yrs)', value: '72' },
          { label: '84 months (7 yrs)', value: '84' },
        ],
        color: 'tertiary',
      },
    ],
    outputs: [
      { key: 'monthly', label: 'Monthly Payment', prefix: '$', decimals: 2, primary: true },
      { key: 'totalInterest', label: 'Total Interest', prefix: '$', decimals: 2, color: 'secondary' },
      { key: 'totalCost', label: 'Total Cost (price + tax + interest)', prefix: '$', decimals: 2, color: 'tertiary' },
      { key: 'loanAmount', label: 'Loan Amount', prefix: '$', decimals: 2, color: 'white' },
    ],
    calculate: (i) => {
      const price = Number(i.price);
      const taxPct = Number(i.taxPct);
      const tax = (price * taxPct) / 100;
      const P = Math.max(0, price + tax - Number(i.down) - Number(i.tradeIn));
      const n = Number(i.term);
      const r = Number(i.apr) / 1200;
      if (P <= 0 || n <= 0) {
        return { monthly: 0, totalInterest: 0, totalCost: price + tax, loanAmount: 0 };
      }
      const M = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalInterest = M * n - P;
      return {
        monthly: M,
        totalInterest,
        totalCost: price + tax + totalInterest,
        loanAmount: P,
      };
    },
    buildTable: (i) => {
      const price = Number(i.price);
      const P = Math.max(0, price + (price * Number(i.taxPct)) / 100 - Number(i.down) - Number(i.tradeIn));
      const n = Number(i.term);
      const r = Number(i.apr) / 1200;
      if (P <= 0 || n <= 0) return null;
      const M = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const rows: (string | number)[][] = [];
      let bal = P;
      for (let m = 1; m <= n && bal > 0.005; m++) {
        const interest = bal * r;
        let principal = M - interest;
        let payment = M;
        if (principal >= bal) {
          principal = bal;
          payment = bal + interest;
        }
        bal -= principal;
        rows.push([m, usd(payment), usd(principal), usd(interest), usd(Math.max(0, bal))]);
      }
      return {
        title: 'Amortization schedule',
        headers: ['Month', 'Payment', 'Principal', 'Interest', 'Balance'],
        rows,
      };
    },
    seo: {
      title: 'Auto Loan Calculator: Monthly Car Payment & Interest',
      description: 'Free auto loan calculator. Get your monthly car payment, total interest, and full amortization schedule from price, down payment, trade-in, tax, and APR.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['mortgage-calculator', 'emi-calculator', 'compound-interest-calculator'],
  },
  {
    slug: 'student-loan-calculator',
    name: 'Student Loan Calculator',
    category: 'finance',
    icon: 'GraduationCap',
    description: 'Find your monthly student loan payment, total interest, and how much faster you pay off the loan — and how much interest you save — with extra monthly payments.',
    inputs: [
      { key: 'balance', label: 'Loan Balance', type: 'slider', min: 1000, max: 500000, step: 500, default: 30000, prefix: '$', color: 'primary' },
      { key: 'apr', label: 'Interest Rate (APR)', type: 'slider', min: 0, max: 15, step: 0.05, default: 6.5, suffix: '%', color: 'secondary' },
      {
        key: 'term',
        label: 'Repayment Term',
        type: 'select',
        default: '120',
        options: [
          { label: '5 years (60 months)', value: '60' },
          { label: '10 years (120 months)', value: '120' },
          { label: '15 years (180 months)', value: '180' },
          { label: '20 years (240 months)', value: '240' },
          { label: '25 years (300 months)', value: '300' },
        ],
        color: 'tertiary',
      },
      { key: 'extra', label: 'Extra Monthly Payment', type: 'slider', min: 0, max: 2000, step: 10, default: 0, prefix: '$', color: 'primary' },
    ],
    outputs: [
      { key: 'monthly', label: 'Monthly Payment', prefix: '$', decimals: 2, primary: true },
      { key: 'totalInterest', label: 'Total Interest (no extra)', prefix: '$', decimals: 2, color: 'secondary' },
      { key: 'payoffMonths', label: 'Months to Payoff (with extra)', decimals: 0, suffix: ' mo', color: 'tertiary' },
      { key: 'interestSaved', label: 'Interest Saved with Extra', prefix: '$', decimals: 2, color: 'white' },
    ],
    calculate: (i) => {
      const P = Number(i.balance);
      const n = Number(i.term);
      const r = Number(i.apr) / 1200;
      const extra = Number(i.extra);
      if (P <= 0 || n <= 0) {
        return { monthly: 0, totalInterest: 0, payoffMonths: 0, interestSaved: 0 };
      }
      const M = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const baseInterest = M * n - P;
      // Simulate month-by-month with the extra payment applied to principal.
      const pay = M + extra;
      let bal = P;
      let months = 0;
      let extraInterest = 0;
      while (bal > 0.005 && months < 600) {
        months++;
        const interest = bal * r;
        extraInterest += interest;
        let principal = pay - interest;
        if (principal >= bal) principal = bal;
        bal -= principal;
      }
      return {
        monthly: M,
        totalInterest: baseInterest,
        payoffMonths: months,
        interestSaved: Math.max(0, baseInterest - extraInterest),
      };
    },
    buildTable: (i) => {
      const P = Number(i.balance);
      const n = Number(i.term);
      const r = Number(i.apr) / 1200;
      const extra = Number(i.extra);
      if (P <= 0 || n <= 0) return null;
      const M = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const pay = M + extra;
      const rows: (string | number)[][] = [];
      let bal = P;
      let month = 0;
      let yPaid = 0;
      let yPrincipal = 0;
      let yInterest = 0;
      while (bal > 0.005 && month < 600) {
        month++;
        const interest = bal * r;
        let principal = pay - interest;
        let payment = pay;
        if (principal >= bal) {
          principal = bal;
          payment = bal + interest;
        }
        bal -= principal;
        yPaid += payment;
        yPrincipal += principal;
        yInterest += interest;
        if (month % 12 === 0 || bal <= 0.005) {
          rows.push([Math.ceil(month / 12), usd(yPaid), usd(yPrincipal), usd(yInterest), usd(Math.max(0, bal))]);
          yPaid = 0;
          yPrincipal = 0;
          yInterest = 0;
        }
      }
      return {
        title: 'Amortization (with extra payment)',
        headers: ['Year', 'Paid', 'Principal', 'Interest', 'Balance'],
        rows,
      };
    },
    seo: {
      title: 'Student Loan Calculator: Payment & Extra-Pay Savings',
      description: 'Free student loan calculator. Get your monthly payment and total interest, then see how extra monthly payments cut your payoff time and interest cost.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['emi-calculator', 'auto-loan-calculator', 'debt-payoff-calculator'],
  },
  {
    slug: 'house-affordability-calculator',
    name: 'House Affordability Calculator',
    category: 'finance',
    icon: 'Home',
    description: 'See how much house you can afford using the 28/36 rule — factoring in income, debts, down payment, mortgage rate, property tax, insurance, and HOA dues.',
    inputs: [
      { key: 'income', label: 'Annual Gross Income', type: 'slider', min: 20000, max: 1000000, step: 1000, default: 90000, prefix: '$', color: 'primary' },
      { key: 'debts', label: 'Total Monthly Debt Payments', type: 'slider', min: 0, max: 10000, step: 50, default: 400, prefix: '$', color: 'secondary' },
      { key: 'down', label: 'Down Payment', type: 'slider', min: 0, max: 500000, step: 1000, default: 40000, prefix: '$', color: 'tertiary' },
      { key: 'rate', label: 'Mortgage Interest Rate', type: 'slider', min: 1, max: 12, step: 0.05, default: 6.5, suffix: '%', color: 'primary' },
      {
        key: 'term',
        label: 'Loan Term',
        type: 'select',
        default: '30',
        options: [
          { label: '15 years', value: '15' },
          { label: '20 years', value: '20' },
          { label: '30 years', value: '30' },
        ],
        color: 'secondary',
      },
      { key: 'taxPct', label: 'Property Tax (% of home value/yr)', type: 'slider', min: 0, max: 4, step: 0.05, default: 1.1, suffix: '%', color: 'tertiary' },
      { key: 'insurance', label: 'Annual Home Insurance', type: 'slider', min: 0, max: 10000, step: 100, default: 1800, prefix: '$', color: 'primary' },
      { key: 'hoa', label: 'Monthly HOA Dues', type: 'slider', min: 0, max: 1500, step: 25, default: 0, prefix: '$', color: 'secondary' },
    ],
    outputs: [
      { key: 'price', label: 'Affordable Home Price', prefix: '$', decimals: 0, primary: true },
      { key: 'budget', label: 'Max Monthly Payment (PITI)', prefix: '$', decimals: 0, color: 'secondary' },
      { key: 'loan', label: 'Loan Amount', prefix: '$', decimals: 0, color: 'tertiary' },
      { key: 'pi', label: 'Monthly Principal & Interest', prefix: '$', decimals: 0, color: 'white' },
    ],
    calculate: (i) => {
      const income = Number(i.income);
      const debts = Number(i.debts);
      const down = Number(i.down);
      const r = Number(i.rate) / 1200;
      const n = Number(i.term) * 12;
      const taxPct = Number(i.taxPct);
      const insurance = Number(i.insurance);
      const hoa = Number(i.hoa);
      const frontEnd = (income / 12) * 0.28;
      const backEnd = (income / 12) * 0.36 - debts;
      const budget = Math.max(0, Math.min(frontEnd, backEnd));
      const pow = Math.pow(1 + r, n);
      const f = r === 0 ? 1 / n : (r * pow) / (pow - 1);
      // Solve: budget = L×f + (L + down)×taxPct/1200 + insurance/12 + hoa
      const loan = Math.max(
        0,
        (budget - (down * taxPct) / 1200 - insurance / 12 - hoa) / (f + taxPct / 1200),
      );
      return { price: loan + down, budget, loan, pi: loan * f };
    },
    seo: {
      title: 'House Affordability Calculator: 28/36 Rule Budget',
      description: 'Free house affordability calculator. See the home price you can afford with the 28/36 rule from income, debts, down payment, rate, taxes, and insurance.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['mortgage-calculator', 'auto-loan-calculator', 'federal-income-tax-calculator'],
  },
  {
    slug: 'inflation-calculator',
    name: 'Inflation Calculator',
    category: 'finance',
    icon: 'TrendingUp',
    description: 'See what an amount of money is worth across time at a chosen average annual inflation rate — project forward to 2076 or look back to 1950.',
    inputs: [
      { key: 'amount', label: 'Amount', type: 'slider', min: 1, max: 1000000, step: 1, default: 100, prefix: '$', color: 'primary' },
      {
        key: 'startYear',
        label: 'Start Year',
        type: 'slider',
        min: 1950,
        max: 2026,
        step: 1,
        default: 2000,
        color: 'secondary',
        formatValue: (v: number) => String(Math.round(v)),
      },
      {
        key: 'endYear',
        label: 'End Year',
        type: 'slider',
        min: 1950,
        max: 2076,
        step: 1,
        default: 2026,
        color: 'tertiary',
        formatValue: (v: number) => String(Math.round(v)),
      },
      { key: 'rate', label: 'Average Annual Inflation', type: 'slider', min: 0, max: 15, step: 0.1, default: 3.0, suffix: '%', color: 'primary' },
    ],
    outputs: [
      { key: 'fv', label: 'Equivalent Value', prefix: '$', decimals: 2, primary: true },
      { key: 'changePct', label: 'Total Change', suffix: '%', decimals: 1, color: 'secondary' },
      { key: 'years', label: 'Years Spanned', decimals: 0, suffix: ' yrs', color: 'tertiary' },
      { key: 'rateUsed', label: 'Annual Rate Used', suffix: '%', decimals: 1, color: 'white' },
    ],
    calculate: (i) => {
      // TODO: wire BLS CPI-U tables for exact historical conversions.
      const amount = Number(i.amount);
      const years = Number(i.endYear) - Number(i.startYear);
      const rate = Number(i.rate);
      const fv = amount * Math.pow(1 + rate / 100, years);
      return {
        fv,
        changePct: amount > 0 ? (fv / amount - 1) * 100 : 0,
        years,
        rateUsed: rate,
      };
    },
    seo: {
      title: 'Inflation Calculator: Dollar Value Over Time',
      description: 'Free inflation calculator. See what money from any year is worth today, or project future purchasing power, using a custom average annual inflation rate.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['compound-interest-calculator', 'retirement-calculator', 'federal-income-tax-calculator'],
  },
];
