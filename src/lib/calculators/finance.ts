import { CalculatorConfig } from '../calculator-types';

const EXCHANGE_RATES: Record<string, number> = {
  USD: 1, EUR: 0.921, GBP: 0.780, JPY: 153.8, CAD: 1.383, AUD: 1.582,
  CHF: 0.888, CNY: 7.291, INR: 84.47, SGD: 1.330, HKD: 7.780, NZD: 1.728,
  SEK: 10.36, NOK: 10.59, DKK: 6.88, MXN: 20.18, BRL: 5.75, ZAR: 18.47,
  AED: 3.672, SAR: 3.751, KRW: 1363, THB: 33.59, MYR: 4.368, IDR: 16393,
  PHP: 55.76, PKR: 278.5, BDT: 110.5, NGN: 1590, EGP: 50.42, TRY: 38.05,
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'CA$', AUD: 'A$',
  CHF: 'CHF', CNY: '¥', INR: '₹', SGD: 'S$', HKD: 'HK$', NZD: 'NZ$',
  SEK: 'kr', NOK: 'kr', DKK: 'kr', MXN: '$', BRL: 'R$', ZAR: 'R',
  AED: 'AED', SAR: 'SAR', KRW: '₩', THB: '฿', MYR: 'RM', IDR: 'Rp',
  PHP: '₱', PKR: '₨', BDT: '৳', NGN: '₦', EGP: 'E£', TRY: '₺',
};

const CURRENCY_OPTIONS = [
  { label: 'USD — US Dollar', value: 'USD' },
  { label: 'EUR — Euro', value: 'EUR' },
  { label: 'GBP — British Pound', value: 'GBP' },
  { label: 'JPY — Japanese Yen', value: 'JPY' },
  { label: 'INR — Indian Rupee', value: 'INR' },
  { label: 'CAD — Canadian Dollar', value: 'CAD' },
  { label: 'AUD — Australian Dollar', value: 'AUD' },
  { label: 'CHF — Swiss Franc', value: 'CHF' },
  { label: 'CNY — Chinese Yuan', value: 'CNY' },
  { label: 'SGD — Singapore Dollar', value: 'SGD' },
  { label: 'HKD — Hong Kong Dollar', value: 'HKD' },
  { label: 'NZD — New Zealand Dollar', value: 'NZD' },
  { label: 'SEK — Swedish Krona', value: 'SEK' },
  { label: 'NOK — Norwegian Krone', value: 'NOK' },
  { label: 'DKK — Danish Krone', value: 'DKK' },
  { label: 'MXN — Mexican Peso', value: 'MXN' },
  { label: 'BRL — Brazilian Real', value: 'BRL' },
  { label: 'ZAR — South African Rand', value: 'ZAR' },
  { label: 'AED — UAE Dirham', value: 'AED' },
  { label: 'SAR — Saudi Riyal', value: 'SAR' },
  { label: 'KRW — South Korean Won', value: 'KRW' },
  { label: 'THB — Thai Baht', value: 'THB' },
  { label: 'MYR — Malaysian Ringgit', value: 'MYR' },
  { label: 'IDR — Indonesian Rupiah', value: 'IDR' },
  { label: 'PHP — Philippine Peso', value: 'PHP' },
  { label: 'PKR — Pakistani Rupee', value: 'PKR' },
  { label: 'BDT — Bangladeshi Taka', value: 'BDT' },
  { label: 'NGN — Nigerian Naira', value: 'NGN' },
  { label: 'EGP — Egyptian Pound', value: 'EGP' },
  { label: 'TRY — Turkish Lira', value: 'TRY' },
];

export const financeCalculators: CalculatorConfig[] = [
  {
    slug: 'currency-converter',
    name: 'Currency Converter',
    shortName: 'Currency',
    category: 'finance',
    icon: 'ArrowLeftRight',
    description: 'Convert between 30 world currencies instantly. Rates are reference rates.',
    trending: true,
    usageCount: 198400,
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
  },
  {
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    category: 'finance',
    icon: 'Landmark',
    description: 'Calculate Equated Monthly Instalments for home, personal, car, and education loans — with interest split and total payable.',
    trending: true,
    usageCount: 124580,
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
    intro:
      'EMI (Equated Monthly Instalment) is the fixed monthly payment a borrower makes to repay a loan over a chosen tenure. Each EMI is split between interest and principal: in the early years most of it goes to interest, and the principal share grows as the balance falls. Use this calculator to compare loan amounts, tenures, and rates side-by-side before you sign — change any slider to see how the monthly outflow and the total interest paid both move.',
    formula: 'EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)',
    howItWorks:
      'P is the loan principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the tenure in months (years × 12). For a ₹50 lakh home loan at 8.5% over 20 years, r = 0.0070833 and n = 240, giving an EMI of about ₹43,391. Over the full tenure you pay roughly ₹1.04 crore — about ₹54 lakh of which is interest. Stretching the tenure lowers the EMI but raises total interest sharply; shortening it does the opposite.',
    ranges: {
      title: 'Typical EMI rate brackets in India (April 2026)',
      rows: [
        { label: 'Home loan (salaried)', range: '8.35% – 9.50% p.a.', note: 'Repo-linked; ranges by bank, CIBIL, and LTV' },
        { label: 'Home loan (self-employed)', range: '8.75% – 10.25% p.a.', note: 'Slightly higher risk loading' },
        { label: 'Loan against property', range: '9.00% – 12.50% p.a.', note: 'Secured but priced above home loans' },
        { label: 'Car loan (new)', range: '8.75% – 11.50% p.a.', note: 'Lower for select manufacturers' },
        { label: 'Personal loan', range: '10.50% – 22.00% p.a.', note: 'Unsecured; CIBIL-driven' },
        { label: 'Education loan (India)', range: '8.30% – 13.50% p.a.', note: 'Public-sector banks at the lower end' },
      ],
    },
    limitations: [
      "This calculator uses a simple reducing-balance EMI formula. It doesn't model processing fees, GST on those fees, prepayment penalties, late-payment charges, or insurance premiums that lenders sometimes bundle in.",
      'It assumes the interest rate stays fixed for the whole tenure. Floating-rate loans (most home loans in India) reset whenever the RBI repo rate or the bank\'s spread changes, so your real EMI can move.',
      'Loan eligibility is not the same as the EMI number. Banks typically cap your total EMIs at 40–50% of net monthly income, and they look at credit score, employer category, and existing obligations.',
      'Prepayment changes everything. A single lump-sum prepayment in year 3 of a 20-year loan can cut total interest by 15–25% — model it separately if you plan to.',
    ],
    faqs: [
      {
        q: 'How is EMI calculated in India?',
        a: 'Indian banks use the same standard EMI formula: EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where P is the principal, r is the monthly interest rate, and n is the number of months. The result is your fixed monthly outflow on a reducing-balance loan.',
      },
      {
        q: "What's the EMI for a ₹50 lakh home loan at 8.5% for 20 years?",
        a: 'About ₹43,391 per month. Total payable over 20 years is roughly ₹1.04 crore — of which ₹54 lakh is interest and ₹50 lakh is principal. Plug your own amount, rate, and tenure into the calculator above to see the exact split.',
      },
      {
        q: 'Does paying more EMIs reduce interest?',
        a: 'Paying more than the EMI in any month is treated as a partial prepayment and goes directly to the principal, which cuts the interest you pay over the rest of the loan. Even small extra payments early in the tenure compound into large interest savings.',
      },
      {
        q: 'Can I change my EMI mid-tenure?',
        a: 'Yes — most Indian banks let you raise the EMI (which shortens the tenure) or extend the tenure (which lowers the EMI) once a year on home loans. Personal loans are usually fixed for the full tenure.',
      },
      {
        q: 'Is the EMI from this calculator the same as what my bank will quote?',
        a: 'It will be very close on the math, but bank quotes often include processing fees (0.25–1% of the loan), GST on those fees, and sometimes insurance. Use this number as the headline EMI; ask the bank for the all-in monthly outflow before you sign.',
      },
      {
        q: 'Mortgage calculator vs EMI calculator — what\'s the difference?',
        a: "Functionally the same math. 'EMI calculator' is the term used in India and South Asia for any reducing-balance instalment loan. 'Mortgage calculator' is the US/UK term and usually focuses on home loans, often adding property tax and insurance lines. The core monthly principal-and-interest figure is identical.",
      },
    ],
    seo: {
      title: 'EMI Calculator — Home, Personal, Car & Education Loan EMIs',
      description:
        'Free EMI calculator for home, personal, car, and education loans. See your monthly EMI, total interest, and full payment split with the standard reducing-balance formula.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'RBI — current repo rate & policy', url: 'https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx' },
        { label: 'RBI — fair-practice code for retail loans', url: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
  },
  {
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    category: 'finance',
    icon: 'TrendingUp',
    description: 'Project returns on systematic investment plans.',
    trending: true,
    usageCount: 98420,
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
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'finance',
    icon: 'Percent',
    description: 'See how your money grows with compounding.',
    trending: true,
    usageCount: 87530,
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
  },
  {
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    category: 'finance',
    icon: 'Home',
    description: 'Calculate monthly mortgage payments with taxes.',
    trending: true,
    usageCount: 156200,
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
  },
  {
    slug: 'loan-eligibility-calculator',
    name: 'Loan Eligibility Calculator',
    category: 'finance',
    icon: 'BadgeCheck',
    description: 'Find out how much loan you can qualify for.',
    usageCount: 62100,
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
  },
  {
    slug: 'income-tax-calculator',
    name: 'Income Tax Calculator',
    category: 'finance',
    icon: 'Receipt',
    description: 'Estimate your annual income tax liability.',
    usageCount: 73400,
    inputs: [
      { key: 'income', label: 'Annual Income', type: 'slider', min: 10000, max: 10000000, step: 1000, default: 75000, prefix: '$', color: 'primary' },
      { key: 'deductions', label: 'Total Deductions', type: 'slider', min: 0, max: 500000, step: 500, default: 12000, prefix: '$', color: 'secondary' },
    ],
    outputs: [
      { key: 'tax', label: 'Estimated Tax', prefix: '$', primary: true },
      { key: 'takeHome', label: 'Take Home', prefix: '$', color: 'tertiary' },
      { key: 'effectiveRate', label: 'Effective Rate', suffix: '%', color: 'secondary' },
    ],
    calculate: (i) => {
      const taxable = Math.max(0, Number(i.income) - Number(i.deductions));
      let tax = 0;
      const brackets = [
        [11600, 0.10],
        [47150, 0.12],
        [100525, 0.22],
        [191950, 0.24],
        [243725, 0.32],
        [609350, 0.35],
        [Infinity, 0.37],
      ] as [number, number][];
      let prev = 0;
      for (const [limit, rate] of brackets) {
        if (taxable > limit) {
          tax += (limit - prev) * rate;
          prev = limit;
        } else {
          tax += (taxable - prev) * rate;
          break;
        }
      }
      return {
        tax,
        takeHome: Number(i.income) - tax,
        effectiveRate: Number(i.income) > 0 ? (tax / Number(i.income)) * 100 : 0,
      };
    },
  },
  {
    slug: 'retirement-calculator',
    name: 'Retirement Calculator',
    category: 'finance',
    icon: 'PiggyBank',
    description: 'Plan how much you need to retire comfortably.',
    usageCount: 54200,
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
  },
  {
    slug: 'fd-calculator',
    name: 'Fixed Deposit Calculator',
    category: 'finance',
    icon: 'Lock',
    description: 'Calculate maturity value of fixed deposits.',
    usageCount: 41200,
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
  },
  {
    slug: 'rd-calculator',
    name: 'Recurring Deposit Calculator',
    category: 'finance',
    icon: 'Calendar',
    description: 'Calculate returns on monthly recurring deposits.',
    usageCount: 28100,
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
  },
  {
    slug: 'mutual-fund-returns',
    name: 'Mutual Fund Returns',
    category: 'finance',
    icon: 'LineChart',
    description: 'Calculate returns on lump sum MF investments.',
    usageCount: 52300,
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
  },
  {
    slug: 'stock-profit-loss',
    name: 'Stock Profit/Loss',
    category: 'finance',
    icon: 'CandlestickChart',
    description: 'Calculate gains or losses on stock trades.',
    usageCount: 38900,
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
  },
  {
    slug: 'dividend-yield-calculator',
    name: 'Dividend Yield Calculator',
    category: 'finance',
    icon: 'Coins',
    description: 'Calculate annual dividend yield on a stock.',
    usageCount: 21400,
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
  },
  {
    slug: 'credit-card-interest',
    name: 'Credit Card Interest',
    category: 'finance',
    icon: 'CreditCard',
    description: 'How much credit card interest will cost you.',
    usageCount: 45000,
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
  },
  {
    slug: 'debt-payoff-calculator',
    name: 'Debt Payoff Calculator',
    category: 'finance',
    icon: 'TrendingDown',
    description: 'Plan when you will be debt-free.',
    usageCount: 32100,
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
  },
  {
    slug: 'net-worth-calculator',
    name: 'Net Worth Calculator',
    category: 'finance',
    icon: 'Wallet',
    description: 'Calculate your total net worth.',
    usageCount: 22500,
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
  },
  {
    slug: 'salary-to-hourly',
    name: 'Salary to Hourly',
    category: 'finance',
    icon: 'Clock',
    description: 'Convert annual salary to hourly rate.',
    usageCount: 67800,
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
  },
  {
    slug: 'tip-calculator',
    name: 'Tip Calculator',
    category: 'finance',
    icon: 'Utensils',
    description: 'Split bills and calculate tips fairly.',
    trending: true,
    usageCount: 203400,
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
  },
  {
    slug: 'gst-calculator',
    name: 'GST Calculator',
    category: 'finance',
    icon: 'FileText',
    description: 'Calculate GST inclusive & exclusive amounts.',
    usageCount: 49200,
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
  },
  {
    slug: 'ppf-calculator',
    name: 'PPF Calculator',
    category: 'finance',
    icon: 'Shield',
    description: 'Calculate Public Provident Fund maturity.',
    usageCount: 31000,
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
  },
  {
    slug: 'nps-calculator',
    name: 'NPS Calculator',
    category: 'finance',
    icon: 'Umbrella',
    description: 'Plan your National Pension Scheme returns.',
    usageCount: 18900,
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
  },
];
