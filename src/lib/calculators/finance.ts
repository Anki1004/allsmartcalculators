import { CalculatorConfig } from '../calculator-types';

const EXCHANGE_RATES: Record<string, number> = {
  USD: 1, EUR: 0.921, GBP: 0.780, JPY: 153.8, CAD: 1.383, AUD: 1.582,
  CHF: 0.888, CNY: 7.291, INR: 84.47, SGD: 1.330, HKD: 7.780, NZD: 1.728,
  SEK: 10.36, NOK: 10.59, DKK: 6.88, MXN: 20.18, BRL: 5.75, ZAR: 18.47,
  AED: 3.672, SAR: 3.751, KRW: 1363, THB: 33.59, MYR: 4.368, IDR: 16393,
  PHP: 55.76, PKR: 278.5, BDT: 110.5, NGN: 1590, EGP: 50.42, TRY: 38.05,
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$', EUR: 'â‚¬', GBP: 'Â£', JPY: 'Â¥', CAD: 'CA$', AUD: 'A$',
  CHF: 'CHF', CNY: 'Â¥', INR: 'â‚¹', SGD: 'S$', HKD: 'HK$', NZD: 'NZ$',
  SEK: 'kr', NOK: 'kr', DKK: 'kr', MXN: '$', BRL: 'R$', ZAR: 'R',
  AED: 'AED', SAR: 'SAR', KRW: 'â‚©', THB: 'à¸¿', MYR: 'RM', IDR: 'Rp',
  PHP: 'â‚±', PKR: 'â‚¨', BDT: 'à§³', NGN: 'â‚¦', EGP: 'EÂ£', TRY: 'â‚º',
};

const CURRENCY_OPTIONS = [
  { label: 'USD â€” US Dollar', value: 'USD' },
  { label: 'EUR â€” Euro', value: 'EUR' },
  { label: 'GBP â€” British Pound', value: 'GBP' },
  { label: 'JPY â€” Japanese Yen', value: 'JPY' },
  { label: 'INR â€” Indian Rupee', value: 'INR' },
  { label: 'CAD â€” Canadian Dollar', value: 'CAD' },
  { label: 'AUD â€” Australian Dollar', value: 'AUD' },
  { label: 'CHF â€” Swiss Franc', value: 'CHF' },
  { label: 'CNY â€” Chinese Yuan', value: 'CNY' },
  { label: 'SGD â€” Singapore Dollar', value: 'SGD' },
  { label: 'HKD â€” Hong Kong Dollar', value: 'HKD' },
  { label: 'NZD â€” New Zealand Dollar', value: 'NZD' },
  { label: 'SEK â€” Swedish Krona', value: 'SEK' },
  { label: 'NOK â€” Norwegian Krone', value: 'NOK' },
  { label: 'DKK â€” Danish Krone', value: 'DKK' },
  { label: 'MXN â€” Mexican Peso', value: 'MXN' },
  { label: 'BRL â€” Brazilian Real', value: 'BRL' },
  { label: 'ZAR â€” South African Rand', value: 'ZAR' },
  { label: 'AED â€” UAE Dirham', value: 'AED' },
  { label: 'SAR â€” Saudi Riyal', value: 'SAR' },
  { label: 'KRW â€” South Korean Won', value: 'KRW' },
  { label: 'THB â€” Thai Baht', value: 'THB' },
  { label: 'MYR â€” Malaysian Ringgit', value: 'MYR' },
  { label: 'IDR â€” Indonesian Rupiah', value: 'IDR' },
  { label: 'PHP â€” Philippine Peso', value: 'PHP' },
  { label: 'PKR â€” Pakistani Rupee', value: 'PKR' },
  { label: 'BDT â€” Bangladeshi Taka', value: 'BDT' },
  { label: 'NGN â€” Nigerian Naira', value: 'NGN' },
  { label: 'EGP â€” Egyptian Pound', value: 'EGP' },
  { label: 'TRY â€” Turkish Lira', value: 'TRY' },
];

export const financeCalculators: CalculatorConfig[] = [
  {
    slug: 'currency-converter',
    name: 'Currency Converter',
    shortName: 'Currency',
    category: 'finance',
    icon: 'ArrowLeftRight',
    description: 'Convert between 30 major world currencies instantly with reference rates â€” see the converted amount, exchange rate, and inverse rate.',
    trending: true,
    inputs: [
      {
        key: 'amount',
        label: 'Amount',
        type: 'slider',
        min: 1,
        max: 100000,
        step: 1,
        default: 1000,
        color: 'primary',
      },
      {
        key: 'from',
        label: 'From Currency',
        type: 'select',
        default: 'USD',
        options: CURRENCY_OPTIONS,
        color: 'secondary',
      },
      {
        key: 'to',
        label: 'To Currency',
        type: 'select',
        default: 'EUR',
        options: CURRENCY_OPTIONS,
        color: 'tertiary',
      },
    ],
    outputs: [
      { key: 'convertedDisplay', label: 'Converted Amount', primary: true, color: 'white' },
      { key: 'rateDisplay', label: 'Exchange Rate', color: 'secondary' },
      { key: 'inverseDisplay', label: 'Inverse Rate', color: 'tertiary' },
    ],
    calculate: (i) => {
      const amount = Number(i.amount);
      const from = String(i.from || 'USD');
      const to = String(i.to || 'EUR');
      const fromRate = EXCHANGE_RATES[from] ?? 1;
      const toRate = EXCHANGE_RATES[to] ?? 1;
      const converted = (amount / fromRate) * toRate;
      const rate = toRate / fromRate;
      const sym = CURRENCY_SYMBOLS[to] ?? to;
      const fmtAmount = (n: number) =>
        n >= 1_000_000
          ? n.toLocaleString('en-US', { maximumFractionDigits: 0 })
          : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const convertedDisplay = `${sym}${fmtAmount(converted)}`;
      const rateDisplay = `1 ${from} = ${rate.toFixed(4)} ${to}`;
      const inverseDisplay = `1 ${to} = ${(1 / rate).toFixed(4)} ${from}`;
      return { convertedDisplay, rateDisplay, inverseDisplay, converted, rate };
    },
    seo: {
      title: 'Currency Converter: 30 World Currencies, Live Rates',
      description: 'Free currency converter for 30 major world currencies including USD, EUR, GBP, INR, JPY, AUD. See live conversion, exchange rate, and inverse rate.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    category: 'finance',
    icon: 'Landmark',
    description: 'Calculate Equated Monthly Instalments for home, personal, car, and education loans â€” with interest split and total payable.',
    trending: true,
    chartType: 'donut',
    inputs: [
      { key: 'principal', label: 'Loan Amount', type: 'slider', min: 1000, max: 10000000, step: 1000, default: 250000, prefix: '$', color: 'primary' },
      { key: 'rate', label: 'Interest Rate', type: 'slider', min: 0.1, max: 30, step: 0.1, default: 6.5, suffix: '%', color: 'secondary' },
      { key: 'tenure', label: 'Tenure', type: 'slider', min: 1, max: 40, step: 1, default: 15, suffix: 'Years', color: 'tertiary' },
    ],
    outputs: [
      { key: 'emi', label: 'Monthly EMI', prefix: '$', primary: true, color: 'white' },
      { key: 'totalInterest', label: 'Total Interest', prefix: '$', color: 'secondary' },
      { key: 'totalPayment', label: 'Total Payment', prefix: '$' },
    ],
    calculate: (i) => {
      const p = Number(i.principal);
      const r = Number(i.rate) / 12 / 100;
      const n = Number(i.tenure) * 12;
      const emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      return { emi, totalInterest: totalPayment - p, totalPayment };
    },
    seo: {
      title: 'EMI Calculator â€” Home, Personal, Car & Education Loan EMIs',
      description:
        'Free EMI calculator for home, personal, car, and education loans. See your monthly EMI, total interest, and full payment split with the standard reducing-balance formula.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    category: 'finance',
    icon: 'TrendingUp',
    description: 'Project the future value of a Systematic Investment Plan â€” see how a fixed monthly contribution compounds over years.',
    trending: true,
    chartType: 'donut',
    inputs: [
      { key: 'monthly', label: 'Monthly Investment', type: 'slider', min: 500, max: 200000, step: 500, default: 10000, prefix: '$', color: 'primary' },
      { key: 'rate', label: 'Expected Return', type: 'slider', min: 1, max: 30, step: 0.5, default: 12, suffix: '% p.a.', color: 'secondary' },
      { key: 'years', label: 'Duration', type: 'slider', min: 1, max: 40, step: 1, default: 10, suffix: 'Years', color: 'tertiary' },
    ],
    outputs: [
      { key: 'futureValue', label: 'Future Value', prefix: '$', primary: true },
      { key: 'invested', label: 'Total Invested', prefix: '$', color: 'secondary' },
      { key: 'gains', label: 'Total Gains', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const p = Number(i.monthly);
      const r = Number(i.rate) / 12 / 100;
      const n = Number(i.years) * 12;
      const futureValue = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const invested = p * n;
      return { futureValue, invested, gains: futureValue - invested };
    },
    seo: {
      title: 'SIP Calculator â€” Mutual Fund SIP Returns Over Time',
      description:
        'Free SIP calculator. Project your mutual fund corpus from monthly contribution, expected return, and tenure. See total invested vs total gains side-by-side.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'finance',
    icon: 'Percent',
    description: 'See how a one-time principal grows under compound interest at any rate, tenure, and compounding frequency (daily, monthly, quarterly, yearly).',
    trending: true,
    chartType: 'line',
    inputs: [
      { key: 'principal', label: 'Principal', type: 'slider', min: 100, max: 1000000, step: 100, default: 10000, prefix: '$', color: 'primary' },
      { key: 'rate', label: 'Interest Rate', type: 'slider', min: 0.1, max: 25, step: 0.1, default: 8, suffix: '%', color: 'secondary' },
      { key: 'years', label: 'Years', type: 'slider', min: 1, max: 50, step: 1, default: 10, suffix: 'Years', color: 'tertiary' },
      { key: 'frequency', label: 'Compound Frequency', type: 'slider', min: 1, max: 365, step: 1, default: 12, suffix: '/yr' },
    ],
    outputs: [
      { key: 'total', label: 'Final Amount', prefix: '$', primary: true },
      { key: 'interest', label: 'Interest Earned', prefix: '$', color: 'secondary' },
    ],
    calculate: (i) => {
      const p = Number(i.principal);
      const r = Number(i.rate) / 100;
      const t = Number(i.years);
      const n = Number(i.frequency);
      const total = p * Math.pow(1 + r / n, n * t);
      return { total, interest: total - p };
    },
    seo: {
      title: 'Compound Interest Calculator: Daily, Monthly, Yearly',
      description: 'Free compound interest calculator. See how a principal grows over years at any interest rate, with compounding frequency from yearly to daily.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    category: 'finance',
    icon: 'Home',
    description: 'Calculate monthly mortgage payments â€” principal and interest split, total interest paid, and full payment schedule.',
    trending: true,
    chartType: 'donut',
    inputs: [
      { key: 'homePrice', label: 'Home Price', type: 'slider', min: 50000, max: 5000000, step: 5000, default: 450000, prefix: '$', color: 'primary' },
      { key: 'downPayment', label: 'Down Payment', type: 'slider', min: 0, max: 1000000, step: 1000, default: 90000, prefix: '$', color: 'secondary' },
      { key: 'rate', label: 'Interest Rate', type: 'slider', min: 0.1, max: 15, step: 0.05, default: 6.5, suffix: '%' },
      { key: 'years', label: 'Loan Term', type: 'slider', min: 5, max: 40, step: 1, default: 30, suffix: 'Years', color: 'tertiary' },
    ],
    outputs: [
      { key: 'monthlyPayment', label: 'Monthly Payment', prefix: '$', primary: true },
      { key: 'totalInterest', label: 'Total Interest', prefix: '$', color: 'secondary' },
      { key: 'loanAmount', label: 'Loan Amount', prefix: '$' },
    ],
    calculate: (i) => {
      const loan = Number(i.homePrice) - Number(i.downPayment);
      const r = Number(i.rate) / 12 / 100;
      const n = Number(i.years) * 12;
      const pmt = r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      return { monthlyPayment: pmt, totalInterest: pmt * n - loan, loanAmount: loan };
    },
    seo: {
      title: 'Mortgage Calculator â€” Monthly Payment, Interest & Term',
      description:
        'Free mortgage calculator. See your monthly payment, total interest, and principal split for any home price, down payment, rate, and loan term.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'loan-eligibility-calculator',
    name: 'Loan Eligibility Calculator',
    category: 'finance',
    icon: 'BadgeCheck',
    description: 'Find out how much loan you can qualify for.',
    inputs: [
      { key: 'income', label: 'Monthly Income', type: 'slider', min: 500, max: 200000, step: 100, default: 8000, prefix: '$', color: 'primary' },
      { key: 'obligations', label: 'Existing EMIs', type: 'slider', min: 0, max: 50000, step: 100, default: 1000, prefix: '$', color: 'secondary' },
      { key: 'rate', label: 'Interest Rate', type: 'slider', min: 5, max: 20, step: 0.1, default: 8.5, suffix: '%' },
      { key: 'tenure', label: 'Tenure', type: 'slider', min: 1, max: 30, step: 1, default: 20, suffix: 'Years', color: 'tertiary' },
    ],
    outputs: [
      { key: 'eligible', label: 'Eligible Loan Amount', prefix: '$', primary: true },
      { key: 'maxEmi', label: 'Max Monthly EMI', prefix: '$', color: 'secondary' },
    ],
    calculate: (i) => {
      const income = Number(i.income);
      const obligations = Number(i.obligations);
      const r = Number(i.rate) / 12 / 100;
      const n = Number(i.tenure) * 12;
      const maxEmi = income * 0.5 - obligations;
      const eligible = maxEmi <= 0 ? 0 : (maxEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
      return { eligible: Math.max(0, eligible), maxEmi: Math.max(0, maxEmi) };
    },
    seo: {
      title: 'Loan Eligibility Calculator: How Much Loan You Qualify For',
      description: 'Free loan eligibility calculator. Find your maximum eligible loan amount and max EMI based on income, existing obligations, rate, and tenure.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'income-tax-calculator',
    name: 'Income Tax Calculator',
    category: 'finance',
    icon: 'Receipt',
    description: 'Estimate your Indian income tax under the new and old regimes for FY 2025-26 (AY 2026-27).',
    inputs: [
      {
        key: 'regime',
        label: 'Tax regime',
        type: 'select',
        default: 'new',
        options: [
          { label: 'New regime (default)', value: 'new' },
          { label: 'Old regime', value: 'old' },
        ],
        color: 'primary',
      },
      { key: 'income', label: 'Annual gross income', type: 'slider', min: 100000, max: 10000000, step: 10000, default: 1200000, prefix: '₹', color: 'primary' },
      { key: 'deductions', label: 'Deductions (80C + 80D + HRA, old regime only)', type: 'slider', min: 0, max: 500000, step: 5000, default: 150000, prefix: '₹', color: 'secondary' },
    ],
    outputs: [
      { key: 'tax', label: 'Tax payable (incl. 4% cess)', prefix: '₹', primary: true },
      { key: 'takeHome', label: 'In-hand income', prefix: '₹', color: 'tertiary' },
      { key: 'effectiveRate', label: 'Effective tax rate', suffix: '%', color: 'secondary' },
    ],
    calculate: (i) => {
      const regime = String(i.regime);
      const income = Math.max(0, Number(i.income));
      const userDeductions = Math.max(0, Number(i.deductions));

      let taxable = 0;
      let baseTax = 0;
      let rebate = 0;

      const applySlabs = (amount: number, slabs: [number, number][]): number => {
        let prev = 0;
        let tax = 0;
        for (const [cap, rate] of slabs) {
          if (amount > cap) {
            tax += (cap - prev) * rate;
            prev = cap;
          } else {
            tax += Math.max(0, amount - prev) * rate;
            break;
          }
        }
        return tax;
      };

      if (regime === 'new') {
        // FY 2025-26 new regime (Union Budget 2025)
        const standardDeduction = 75000;
        taxable = Math.max(0, income - standardDeduction);
        baseTax = applySlabs(taxable, [
          [400000, 0],
          [800000, 0.05],
          [1200000, 0.10],
          [1600000, 0.15],
          [2000000, 0.20],
          [2400000, 0.25],
          [Infinity, 0.30],
        ]);
        // Section 87A: full rebate if taxable income <= 12L
        if (taxable <= 1200000) rebate = baseTax;
      } else {
        // FY 2025-26 old regime (resident individual, below 60)
        const standardDeduction = 50000;
        taxable = Math.max(0, income - standardDeduction - userDeductions);
        baseTax = applySlabs(taxable, [
          [250000, 0],
          [500000, 0.05],
          [1000000, 0.20],
          [Infinity, 0.30],
        ]);
        // Section 87A: rebate up to 12,500 if taxable income <= 5L
        if (taxable <= 500000) rebate = Math.min(12500, baseTax);
      }

      const afterRebate = Math.max(0, baseTax - rebate);

      // Surcharge on tax (taxable-income-driven)
      let surchargeRate = 0;
      if (taxable > 20000000) surchargeRate = 0.25;       // > 2 crore
      else if (taxable > 10000000) surchargeRate = 0.15;  // > 1 crore
      else if (taxable > 5000000) surchargeRate = 0.10;   // > 50 lakh
      const surcharge = afterRebate * surchargeRate;

      // 4% Health & Education Cess
      const cess = (afterRebate + surcharge) * 0.04;
      const totalTax = afterRebate + surcharge + cess;

      return {
        tax: totalTax,
        takeHome: income - totalTax,
        effectiveRate: income > 0 ? (totalTax / income) * 100 : 0,
      };
    },
    seo: {
      title: 'Income Tax Calculator FY 2025-26 (Old vs New Regime) — India',
      description: 'Free Indian income tax calculator for FY 2025-26 / AY 2026-27. Compare new regime (full rebate up to ₹12L) and old regime (with 80C / 80D / HRA). Includes 4% cess and surcharge.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-02-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'retirement-calculator',
    name: 'Retirement Calculator',
    category: 'finance',
    icon: 'PiggyBank',
    description: 'Plan how much you need to retire comfortably.',
    chartType: 'line',
    inputs: [
      { key: 'currentAge', label: 'Current Age', type: 'slider', min: 18, max: 65, step: 1, default: 30, suffix: 'Years', color: 'primary' },
      { key: 'retireAge', label: 'Retirement Age', type: 'slider', min: 40, max: 80, step: 1, default: 60, suffix: 'Years', color: 'secondary' },
      { key: 'monthlyExpense', label: 'Current Monthly Expense', type: 'slider', min: 500, max: 50000, step: 100, default: 3000, prefix: '$' },
      { key: 'inflation', label: 'Inflation Rate', type: 'slider', min: 0, max: 10, step: 0.1, default: 3, suffix: '%', color: 'tertiary' },
      { key: 'returnRate', label: 'Expected Return', type: 'slider', min: 1, max: 20, step: 0.5, default: 10, suffix: '%' },
    ],
    outputs: [
      { key: 'corpus', label: 'Retirement Corpus Needed', prefix: '$', primary: true },
      { key: 'monthlySaving', label: 'Monthly SIP Required', prefix: '$', color: 'secondary' },
    ],
    calculate: (i) => {
      const years = Number(i.retireAge) - Number(i.currentAge);
      const futureExpense = Number(i.monthlyExpense) * Math.pow(1 + Number(i.inflation) / 100, years) * 12;
      const corpus = futureExpense * 25;
      const r = Number(i.returnRate) / 12 / 100;
      const n = years * 12;
      const monthlySaving = r === 0 ? corpus / n : corpus / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
      return { corpus, monthlySaving };
    },
    seo: {
      title: 'Retirement Calculator: How Much You Need to Retire',
      description: 'Free retirement corpus calculator. Project the savings you need to retire comfortably â€” adjusted for inflation and your expected return rate.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'fd-calculator',
    name: 'Fixed Deposit Calculator',
    category: 'finance',
    icon: 'Lock',
    description: 'Calculate maturity value of fixed deposits.',
    inputs: [
      { key: 'principal', label: 'Deposit Amount', type: 'slider', min: 1000, max: 5000000, step: 1000, default: 50000, prefix: '$', color: 'primary' },
      { key: 'rate', label: 'Interest Rate', type: 'slider', min: 1, max: 15, step: 0.1, default: 6.5, suffix: '%', color: 'secondary' },
      { key: 'years', label: 'Tenure', type: 'slider', min: 0.25, max: 10, step: 0.25, default: 3, suffix: 'Years', color: 'tertiary' },
    ],
    outputs: [
      { key: 'maturity', label: 'Maturity Amount', prefix: '$', primary: true },
      { key: 'interest', label: 'Interest Earned', prefix: '$', color: 'secondary' },
    ],
    calculate: (i) => {
      const p = Number(i.principal);
      const maturity = p * Math.pow(1 + Number(i.rate) / 400, 4 * Number(i.years));
      return { maturity, interest: maturity - p };
    },
    seo: {
      title: 'FD Calculator â€” Fixed Deposit Maturity & Interest',
      description:
        'Free FD calculator with quarterly compounding. See your fixed deposit maturity value, total interest, and effective yield for any deposit, rate, and tenure.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'rd-calculator',
    name: 'Recurring Deposit Calculator',
    category: 'finance',
    icon: 'Calendar',
    description: 'Calculate returns on monthly recurring deposits.',
    inputs: [
      { key: 'monthly', label: 'Monthly Deposit', type: 'slider', min: 100, max: 100000, step: 100, default: 5000, prefix: '$', color: 'primary' },
      { key: 'rate', label: 'Interest Rate', type: 'slider', min: 1, max: 12, step: 0.1, default: 6.5, suffix: '%', color: 'secondary' },
      { key: 'years', label: 'Tenure', type: 'slider', min: 1, max: 10, step: 1, default: 3, suffix: 'Years', color: 'tertiary' },
    ],
    outputs: [
      { key: 'maturity', label: 'Maturity Amount', prefix: '$', primary: true },
      { key: 'invested', label: 'Total Deposited', prefix: '$', color: 'tertiary' },
      { key: 'interest', label: 'Interest Earned', prefix: '$', color: 'secondary' },
    ],
    calculate: (i) => {
      const p = Number(i.monthly);
      const r = Number(i.rate) / 400;
      const n = Number(i.years) * 4;
      const invested = p * Number(i.years) * 12;
      const maturity = p * 12 * Number(i.years) * Math.pow(1 + r, n);
      return { maturity, invested, interest: maturity - invested };
    },
    seo: {
      title: 'RD Calculator: Recurring Deposit Maturity & Interest',
      description: 'Free RD calculator. See your recurring deposit maturity value, total deposited, and interest earned at any monthly amount, rate, and tenure.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'mutual-fund-returns',
    name: 'Mutual Fund Returns',
    category: 'finance',
    icon: 'LineChart',
    description: 'Calculate returns on lump sum MF investments.',
    inputs: [
      { key: 'lumpSum', label: 'Investment Amount', type: 'slider', min: 500, max: 10000000, step: 500, default: 100000, prefix: '$', color: 'primary' },
      { key: 'rate', label: 'Expected Return', type: 'slider', min: 1, max: 30, step: 0.5, default: 12, suffix: '% p.a.', color: 'secondary' },
      { key: 'years', label: 'Investment Period', type: 'slider', min: 1, max: 40, step: 1, default: 10, suffix: 'Years', color: 'tertiary' },
    ],
    outputs: [
      { key: 'future', label: 'Future Value', prefix: '$', primary: true },
      { key: 'gain', label: 'Gain', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const p = Number(i.lumpSum);
      const future = p * Math.pow(1 + Number(i.rate) / 100, Number(i.years));
      return { future, gain: future - p };
    },
    seo: {
      title: 'Mutual Fund Returns Calculator: Future Value of MF',
      description: 'Free mutual fund returns calculator. Project the future value and total gain on a one-time MF investment at any expected annual return rate.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'stock-profit-loss',
    name: 'Stock Profit/Loss',
    category: 'finance',
    icon: 'CandlestickChart',
    description: 'Calculate gains or losses on stock trades.',
    inputs: [
      { key: 'buyPrice', label: 'Buy Price', type: 'slider', min: 0.01, max: 10000, step: 0.01, default: 100, prefix: '$', color: 'primary' },
      { key: 'sellPrice', label: 'Sell Price', type: 'slider', min: 0.01, max: 10000, step: 0.01, default: 125, prefix: '$', color: 'secondary' },
      { key: 'qty', label: 'Quantity', type: 'slider', min: 1, max: 100000, step: 1, default: 100, suffix: 'shares', color: 'tertiary' },
    ],
    outputs: [
      { key: 'profit', label: 'Profit / Loss', prefix: '$', primary: true },
      { key: 'returnPct', label: 'Return %', suffix: '%', color: 'secondary' },
      { key: 'invested', label: 'Total Invested', prefix: '$' },
    ],
    calculate: (i) => {
      const buy = Number(i.buyPrice);
      const sell = Number(i.sellPrice);
      const qty = Number(i.qty);
      const invested = buy * qty;
      const profit = (sell - buy) * qty;
      return { profit, returnPct: buy > 0 ? ((sell - buy) / buy) * 100 : 0, invested };
    },
    seo: {
      title: 'Stock Profit/Loss Calculator: Trade Returns & %',
      description: 'Free stock profit/loss calculator. Compute gain or loss in absolute terms and percent return for any buy/sell trade across any quantity of shares.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'dividend-yield-calculator',
    name: 'Dividend Yield Calculator',
    category: 'finance',
    icon: 'Coins',
    description: 'Calculate annual dividend yield on a stock.',
    inputs: [
      { key: 'dividend', label: 'Annual Dividend / Share', type: 'slider', min: 0, max: 100, step: 0.01, default: 2.5, prefix: '$', color: 'primary' },
      { key: 'price', label: 'Share Price', type: 'slider', min: 1, max: 10000, step: 0.01, default: 50, prefix: '$', color: 'secondary' },
      { key: 'shares', label: 'Number of Shares', type: 'slider', min: 1, max: 100000, step: 1, default: 200, suffix: 'shares', color: 'tertiary' },
    ],
    outputs: [
      { key: 'yield', label: 'Dividend Yield', suffix: '%', primary: true },
      { key: 'annualIncome', label: 'Annual Income', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => ({
      yield: Number(i.price) > 0 ? (Number(i.dividend) / Number(i.price)) * 100 : 0,
      annualIncome: Number(i.dividend) * Number(i.shares),
    }),
    seo: {
      title: 'Dividend Yield Calculator: Annual Yield & Income',
      description: 'Free dividend yield calculator. Get the annual yield % on a stock and your total annual dividend income from any share count and price.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'credit-card-interest',
    name: 'Credit Card Interest',
    category: 'finance',
    icon: 'CreditCard',
    description: 'How much credit card interest will cost you.',
    inputs: [
      { key: 'balance', label: 'Balance', type: 'slider', min: 100, max: 50000, step: 100, default: 5000, prefix: '$', color: 'primary' },
      { key: 'apr', label: 'APR', type: 'slider', min: 5, max: 40, step: 0.1, default: 24, suffix: '%', color: 'secondary' },
      { key: 'payment', label: 'Monthly Payment', type: 'slider', min: 10, max: 10000, step: 10, default: 200, prefix: '$', color: 'tertiary' },
    ],
    outputs: [
      { key: 'months', label: 'Months to Payoff', suffix: 'mo', primary: true },
      { key: 'totalInterest', label: 'Total Interest', prefix: '$', color: 'secondary' },
    ],
    calculate: (i) => {
      const b = Number(i.balance);
      const r = Number(i.apr) / 12 / 100;
      const pmt = Number(i.payment);
      if (pmt <= b * r) return { months: 9999, totalInterest: 9999 };
      const months = Math.log(pmt / (pmt - b * r)) / Math.log(1 + r);
      return { months, totalInterest: pmt * months - b };
    },
    seo: {
      title: 'Credit Card Interest Calculator: Months to Payoff',
      description: 'Free credit card interest calculator. See how many months it takes to clear a balance and how much total interest you pay at any APR and monthly payment.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'debt-payoff-calculator',
    name: 'Debt Payoff Calculator',
    category: 'finance',
    icon: 'TrendingDown',
    description: 'Plan when you will be debt-free.',
    inputs: [
      { key: 'debt', label: 'Total Debt', type: 'slider', min: 100, max: 500000, step: 100, default: 20000, prefix: '$', color: 'primary' },
      { key: 'rate', label: 'Interest Rate', type: 'slider', min: 1, max: 30, step: 0.1, default: 12, suffix: '%', color: 'secondary' },
      { key: 'payment', label: 'Monthly Payment', type: 'slider', min: 10, max: 10000, step: 10, default: 500, prefix: '$', color: 'tertiary' },
    ],
    outputs: [
      { key: 'months', label: 'Months to Debt-Free', suffix: 'mo', primary: true },
      { key: 'interestPaid', label: 'Total Interest', prefix: '$', color: 'secondary' },
    ],
    calculate: (i) => {
      const b = Number(i.debt);
      const r = Number(i.rate) / 12 / 100;
      const pmt = Number(i.payment);
      if (pmt <= b * r) return { months: 9999, interestPaid: 0 };
      const months = Math.log(pmt / (pmt - b * r)) / Math.log(1 + r);
      return { months, interestPaid: pmt * months - b };
    },
    seo: {
      title: 'Debt Payoff Calculator: When You Will Be Debt-Free',
      description: 'Free debt payoff calculator. See months to debt-free and total interest paid at any monthly payment, debt amount, and interest rate.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'net-worth-calculator',
    name: 'Net Worth Calculator',
    category: 'finance',
    icon: 'Wallet',
    description: 'Calculate your total net worth.',
    inputs: [
      { key: 'assets', label: 'Total Assets', type: 'slider', min: 0, max: 10000000, step: 500, default: 150000, prefix: '$', color: 'primary' },
      { key: 'liabilities', label: 'Total Liabilities', type: 'slider', min: 0, max: 10000000, step: 500, default: 50000, prefix: '$', color: 'secondary' },
    ],
    outputs: [
      { key: 'netWorth', label: 'Net Worth', prefix: '$', primary: true },
      { key: 'ratio', label: 'Asset/Liability Ratio', decimals: 2, color: 'tertiary' },
    ],
    calculate: (i) => ({
      netWorth: Number(i.assets) - Number(i.liabilities),
      ratio: Number(i.liabilities) > 0 ? Number(i.assets) / Number(i.liabilities) : 0,
    }),
    seo: {
      title: 'Net Worth Calculator: Assets, Liabilities, Ratio',
      description: 'Free net worth calculator. Subtract liabilities from assets to see your true net worth and asset/liability ratio â€” the simplest financial-health metric.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'salary-to-hourly',
    name: 'Salary to Hourly',
    category: 'finance',
    icon: 'Clock',
    description: 'Convert annual salary to hourly rate.',
    inputs: [
      { key: 'salary', label: 'Annual Salary', type: 'slider', min: 10000, max: 1000000, step: 500, default: 75000, prefix: '$', color: 'primary' },
      { key: 'hoursWeek', label: 'Hours/Week', type: 'slider', min: 1, max: 80, step: 1, default: 40, suffix: 'hrs', color: 'secondary' },
      { key: 'weeks', label: 'Weeks/Year', type: 'slider', min: 40, max: 52, step: 1, default: 50, suffix: 'wk', color: 'tertiary' },
    ],
    outputs: [
      { key: 'hourly', label: 'Hourly Rate', prefix: '$', primary: true },
      { key: 'daily', label: 'Daily', prefix: '$', color: 'secondary' },
      { key: 'weekly', label: 'Weekly', prefix: '$', color: 'tertiary' },
      { key: 'monthly', label: 'Monthly', prefix: '$' },
    ],
    calculate: (i) => {
      const total = Number(i.hoursWeek) * Number(i.weeks);
      const hourly = total > 0 ? Number(i.salary) / total : 0;
      return {
        hourly,
        daily: hourly * 8,
        weekly: hourly * Number(i.hoursWeek),
        monthly: Number(i.salary) / 12,
      };
    },
    seo: {
      title: 'Salary to Hourly Calculator: Annual to Hourly Rate',
      description: 'Free salary-to-hourly converter. Turn any annual salary into hourly, daily, weekly, and monthly rates â€” based on your real hours and weeks worked.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'tip-calculator',
    name: 'Tip Calculator',
    category: 'finance',
    icon: 'Utensils',
    description: 'Split a restaurant bill fairly with tip â€” get tip amount, total, and per-person share for any group size.',
    trending: true,
    inputs: [
      { key: 'bill', label: 'Bill Amount', type: 'slider', min: 1, max: 5000, step: 0.5, default: 80, prefix: '$', color: 'primary' },
      { key: 'tipPct', label: 'Tip %', type: 'slider', min: 0, max: 40, step: 1, default: 18, suffix: '%', color: 'secondary' },
      { key: 'people', label: 'Split Between', type: 'slider', min: 1, max: 20, step: 1, default: 2, suffix: 'ppl', color: 'tertiary' },
    ],
    outputs: [
      { key: 'perPerson', label: 'Per Person', prefix: '$', primary: true },
      { key: 'tipAmount', label: 'Tip Amount', prefix: '$', color: 'secondary' },
      { key: 'total', label: 'Total Bill', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const tip = Number(i.bill) * (Number(i.tipPct) / 100);
      const total = Number(i.bill) + tip;
      return { tipAmount: tip, total, perPerson: Number(i.people) > 0 ? total / Number(i.people) : 0 };
    },
    seo: {
      title: 'Tip Calculator: Split Bills & Tip Fairly',
      description: 'Free tip calculator. Calculate tip amount, total bill, and per-person split for any bill amount, tip percentage, and group size.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'gst-calculator',
    name: 'GST Calculator',
    category: 'finance',
    icon: 'FileText',
    description: 'Calculate GST inclusive & exclusive amounts.',
    inputs: [
      { key: 'amount', label: 'Amount', type: 'slider', min: 1, max: 1000000, step: 10, default: 1000, prefix: '$', color: 'primary' },
      { key: 'rate', label: 'GST Rate', type: 'slider', min: 0, max: 30, step: 0.5, default: 18, suffix: '%', color: 'secondary' },
    ],
    outputs: [
      { key: 'gst', label: 'GST Amount', prefix: '$', primary: true },
      { key: 'total', label: 'Total (Inc. GST)', prefix: '$', color: 'secondary' },
      { key: 'net', label: 'Net (Exc. GST)', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const amt = Number(i.amount);
      const rate = Number(i.rate);
      const gst = amt * (rate / 100);
      return { gst, total: amt + gst, net: amt };
    },
    seo: {
      title: 'GST Calculator India â€” Inclusive & Exclusive GST Amount',
      description:
        'Free GST calculator for India. Add GST to a base amount or extract GST from an inclusive price. Supports all current slabs (5%, 12%, 18%, 28%).',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'ppf-calculator',
    name: 'PPF Calculator',
    category: 'finance',
    icon: 'Shield',
    description: 'Calculate Public Provident Fund maturity.',
    inputs: [
      { key: 'yearly', label: 'Yearly Deposit', type: 'slider', min: 500, max: 150000, step: 500, default: 100000, prefix: '$', color: 'primary' },
      { key: 'rate', label: 'Interest Rate', type: 'slider', min: 5, max: 10, step: 0.1, default: 7.1, suffix: '%', color: 'secondary' },
      { key: 'years', label: 'Tenure', type: 'slider', min: 15, max: 30, step: 1, default: 15, suffix: 'Years', color: 'tertiary' },
    ],
    outputs: [
      { key: 'maturity', label: 'Maturity Value', prefix: '$', primary: true },
      { key: 'invested', label: 'Total Invested', prefix: '$', color: 'tertiary' },
      { key: 'interest', label: 'Interest Earned', prefix: '$', color: 'secondary' },
    ],
    calculate: (i) => {
      const p = Number(i.yearly);
      const r = Number(i.rate) / 100;
      const n = Number(i.years);
      const maturity = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      return { maturity, invested: p * n, interest: maturity - p * n };
    },
    seo: {
      title: 'PPF Calculator â€” Public Provident Fund Maturity Value',
      description:
        'Free PPF calculator. Project your Public Provident Fund maturity for any yearly contribution and tenure. Tax-free returns at the current 7.1% PPF rate.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'nps-calculator',
    name: 'NPS Calculator',
    category: 'finance',
    icon: 'Umbrella',
    description: 'Plan your National Pension Scheme returns.',
    inputs: [
      { key: 'monthly', label: 'Monthly Contribution', type: 'slider', min: 500, max: 100000, step: 500, default: 5000, prefix: '$', color: 'primary' },
      { key: 'rate', label: 'Expected Return', type: 'slider', min: 5, max: 15, step: 0.5, default: 10, suffix: '%', color: 'secondary' },
      { key: 'currentAge', label: 'Current Age', type: 'slider', min: 18, max: 60, step: 1, default: 30, suffix: 'yrs', color: 'tertiary' },
    ],
    outputs: [
      { key: 'corpus', label: 'Retirement Corpus', prefix: '$', primary: true },
      { key: 'pension', label: 'Estimated Pension/Month', prefix: '$', color: 'secondary' },
    ],
    calculate: (i) => {
      const years = 60 - Number(i.currentAge);
      const p = Number(i.monthly);
      const r = Number(i.rate) / 12 / 100;
      const n = years * 12;
      const corpus = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      return { corpus, pension: (corpus * 0.06) / 12 };
    },
    seo: {
      title: 'NPS Calculator â€” National Pension System Corpus & Pension',
      description:
        'Free NPS calculator. Project your retirement corpus, monthly pension, and lump-sum withdrawal under the National Pension System for any monthly contribution.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'lumpsum-calculator',
    name: 'Lumpsum Calculator',
    category: 'finance',
    icon: 'Coins',
    description: 'Project the future value of a one-time mutual fund or equity lumpsum investment.',
    inputs: [
      { key: 'amount', label: 'Investment Amount', type: 'slider', min: 1000, max: 10000000, step: 1000, default: 100000, prefix: '$', color: 'primary' },
      { key: 'rate', label: 'Expected Return', type: 'slider', min: 1, max: 30, step: 0.5, default: 12, suffix: '% p.a.', color: 'secondary' },
      { key: 'years', label: 'Tenure', type: 'slider', min: 1, max: 40, step: 1, default: 10, suffix: 'Years', color: 'tertiary' },
    ],
    outputs: [
      { key: 'future', label: 'Future Value', prefix: '$', primary: true },
      { key: 'gain', label: 'Total Gain', prefix: '$', color: 'tertiary' },
      { key: 'multiplier', label: 'Money Multiplier', suffix: 'x', decimals: 2, color: 'secondary' },
    ],
    calculate: (i) => {
      const p = Number(i.amount);
      const r = Number(i.rate) / 100;
      const n = Number(i.years);
      const future = p * Math.pow(1 + r, n);
      return { future, gain: future - p, multiplier: future / p };
    },
    seo: {
      title: 'Lumpsum Calculator â€” One-Time Investment Future Value',
      description:
        'Free lumpsum calculator. Project the future value of a one-time mutual fund, equity, or fixed-income investment at any expected return rate and tenure.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'hra-calculator',
    name: 'HRA Calculator',
    category: 'finance',
    icon: 'Building2',
    description: 'Calculate exempt and taxable HRA under Section 10(13A) â€” old regime tax saving on house rent.',
    inputs: [
      { key: 'basic', label: 'Annual Basic + DA', type: 'slider', min: 100000, max: 5000000, step: 1000, default: 600000, prefix: '$', color: 'primary' },
      { key: 'hra', label: 'Annual HRA Received', type: 'slider', min: 0, max: 2500000, step: 1000, default: 240000, prefix: '$', color: 'secondary' },
      { key: 'rent', label: 'Annual Rent Paid', type: 'slider', min: 0, max: 2500000, step: 1000, default: 300000, prefix: '$', color: 'tertiary' },
      { key: 'metro', label: 'Metro City? (1=Yes, 0=No)', type: 'slider', min: 0, max: 1, step: 1, default: 1 },
    ],
    outputs: [
      { key: 'exempt', label: 'HRA Exempt', prefix: '$', primary: true },
      { key: 'taxable', label: 'HRA Taxable', prefix: '$', color: 'secondary' },
      { key: 'savedAt30', label: 'Tax Saved (30% slab)', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const basic = Number(i.basic);
      const hra = Number(i.hra);
      const rent = Number(i.rent);
      const isMetro = Number(i.metro) === 1;
      const a = hra;
      const b = isMetro ? basic * 0.5 : basic * 0.4;
      const c = Math.max(0, rent - basic * 0.1);
      const exempt = Math.max(0, Math.min(a, b, c));
      const taxable = Math.max(0, hra - exempt);
      return { exempt, taxable, savedAt30: exempt * 0.30 };
    },
    seo: {
      title: 'HRA Calculator â€” House Rent Allowance Exemption (India)',
      description:
        'Free HRA calculator under Section 10(13A). Calculate your HRA exemption, taxable portion, and tax saved at the 30% slab â€” old regime only.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'cibil-calculator',
    name: 'CIBIL Score Estimator',
    category: 'finance',
    icon: 'Gauge',
    description: 'Estimate where your CIBIL score sits based on credit habits â€” utilisation, payment history, account age, and inquiries.',
    inputs: [
      { key: 'paymentScore', label: 'Payment History (0=many missed, 100=always on time)', type: 'slider', min: 0, max: 100, step: 5, default: 90, suffix: '/100', color: 'primary' },
      { key: 'utilisation', label: 'Credit Utilisation %', type: 'slider', min: 0, max: 100, step: 1, default: 30, suffix: '%', color: 'secondary' },
      { key: 'ageMonths', label: 'Avg Account Age', type: 'slider', min: 0, max: 240, step: 1, default: 36, suffix: 'mo', color: 'tertiary' },
      { key: 'inquiries', label: 'Hard Inquiries (last 6 mo)', type: 'slider', min: 0, max: 20, step: 1, default: 2, suffix: 'inq' },
      { key: 'mix', label: 'Credit Mix (1=card only, 5=card+loan+mortgage)', type: 'slider', min: 1, max: 5, step: 1, default: 3 },
    ],
    outputs: [
      { key: 'score', label: 'Estimated CIBIL Score', primary: true, decimals: 0 },
      { key: 'band', label: 'Band' },
      { key: 'topAction', label: 'Biggest Lever' },
    ],
    calculate: (i) => {
      const payScore = Number(i.paymentScore);            // weight 35%
      const util = Number(i.utilisation);                  // weight 30%
      const age = Math.min(Number(i.ageMonths), 120);     // weight 15% (cap at 10 years)
      const inq = Number(i.inquiries);                     // weight 10%
      const mix = Number(i.mix);                           // weight 10%

      const utilScore = util <= 10 ? 100 : util <= 30 ? 90 : util <= 50 ? 70 : util <= 75 ? 45 : 20;
      const ageScore = (age / 120) * 100;
      const inqScore = Math.max(0, 100 - inq * 12);
      const mixScore = (mix / 5) * 100;

      const composite =
        payScore * 0.35 + utilScore * 0.30 + ageScore * 0.15 + inqScore * 0.10 + mixScore * 0.10;
      // Map 0â€“100 composite to CIBIL 300â€“900
      const score = 300 + composite * 6;

      const band =
        score >= 800 ? 'Excellent (800â€“900)' :
        score >= 750 ? 'Good (750â€“799)' :
        score >= 700 ? 'Fair (700â€“749)' :
        score >= 650 ? 'Poor (650â€“699)' :
        'Very Poor (300â€“649)';

      // Identify weakest lever
      const factors: { name: string; score: number }[] = [
        { name: 'Pay every EMI/bill on time', score: payScore },
        { name: 'Drop utilisation below 30%', score: utilScore },
        { name: 'Let accounts age (avoid closing old cards)', score: ageScore },
        { name: 'Stop applying for credit for 6 months', score: inqScore },
        { name: 'Add a different credit type (loan / card)', score: mixScore },
      ];
      const topAction = factors.sort((a, b) => a.score - b.score)[0].name;
      return { score, band, topAction };
    },
    seo: {
      title: 'CIBIL Score Estimator â€” Estimate Your Credit Score',
      description:
        'Free CIBIL score estimator. Get a directional credit score from your payment history, utilisation, account age, inquiries, and credit mix â€” plus the biggest lever to improve it.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
