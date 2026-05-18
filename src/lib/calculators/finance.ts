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
    description: 'Convert between 30 major world currencies instantly with reference rates — see the converted amount, exchange rate, and inverse rate.',
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
    ranges: {
      title: 'Typical retail currency-conversion costs (April 2026)',
      rows: [
        { label: 'Reference / mid-market rate', range: '0% spread', note: 'What this calculator returns; what banks see' },
        { label: 'Multi-currency cards (Wise, Revolut)', range: '0.3 – 0.8%', note: 'Closest to mid-market for retail' },
        { label: 'Standard credit card abroad', range: '1.5 – 3.0%', note: 'Visa/Mastercard add ~1%, bank adds 1–2%' },
        { label: 'Indian bank wire (SWIFT)', range: '0.5 – 1.5% + flat fee', note: 'Plus correspondent bank fees' },
        { label: 'Airport currency exchange', range: '5 – 10%', note: 'Worst rates in retail; avoid' },
        { label: 'Hotel front-desk exchange', range: '8 – 15%', note: 'Even worse than airport — only as last resort' },
      ],
    },
    limitations: [
      'Rates are reference rates updated periodically — they are not live interbank rates. For a transaction worth investigating in detail, check the rate at the moment of execution with your provider.',
      "Rates do not include fees, spreads, or markups. Your bank will quote a worse rate; expect 1–3% above reference for cards, 0.5–1.5% for good remittance providers, 5%+ for airport exchanges.",
      "Doesn't handle cryptocurrency conversions. Use the dedicated crypto-to-USD calculator for those.",
      'For business invoicing and contract valuations, use the official RBI reference rate (for Indian rupees) or the ECB reference rate (for euros) on the relevant invoice date — not a retail converter.',
    ],
    seo: {
      title: 'Currency Converter: 30 World Currencies, Live Rates',
      description: 'Free currency converter for 30 major world currencies including USD, EUR, GBP, INR, JPY, AUD. See live conversion, exchange rate, and inverse rate.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'RBI — reference rates', url: 'https://www.rbi.org.in/Scripts/ReferenceRateArchive.aspx' },
        { label: 'ECB — euro reference rates', url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    category: 'finance',
    icon: 'TrendingUp',
    description: 'Project the future value of a Systematic Investment Plan — see how a fixed monthly contribution compounds over years.',
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
    ranges: {
      title: 'Realistic long-term return ranges (Indian equity SIPs)',
      rows: [
        { label: 'Pessimistic (large-cap)', range: '8 – 10% p.a.', note: 'Use for capital-preservation goals' },
        { label: 'Base case (diversified equity)', range: '11 – 13% p.a.', note: 'Long-run average for Nifty 50 / Nifty 500' },
        { label: 'Optimistic (mid- and small-cap)', range: '13 – 16% p.a.', note: 'Higher volatility; expect deep drawdowns' },
        { label: 'Debt / hybrid SIPs', range: '6 – 9% p.a.', note: 'Lower volatility; suitable for short horizons' },
        { label: 'Inflation drag', range: '5 – 6% p.a.', note: 'Subtract from nominal returns for real corpus' },
      ],
    },
    limitations: [
      "The calculator assumes a constant return rate. Real markets don't deliver 12% every year — you might get +30%, then −15%, then +8%. Sequence-of-returns risk matters most near retirement, less when you're early in the SIP.",
      "Doesn't model expense ratio (typically 0.5–2% for active funds, 0.1–0.3% for index funds), exit loads, or capital-gains tax. Net returns are 1–3% lower than gross.",
      'Step-up SIPs (raising the contribution 5–10% each year) compound dramatically faster than fixed SIPs, but this calculator assumes a flat monthly amount.',
      "Past returns don't predict the future. The 11–13% Indian-equity average is based on 25-year data and is not a guarantee for the next 10.",
    ],
    seo: {
      title: 'SIP Calculator — Mutual Fund SIP Returns Over Time',
      description:
        'Free SIP calculator. Project your mutual fund corpus from monthly contribution, expected return, and tenure. See total invested vs total gains side-by-side.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'AMFI India — historical fund returns', url: 'https://www.amfiindia.com/' },
        { label: 'SEBI — investor education on mutual funds', url: 'https://investor.sebi.gov.in/' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'finance',
    icon: 'Percent',
    description: 'See how a one-time principal grows under compound interest at any rate, tenure, and compounding frequency (daily, monthly, quarterly, yearly).',
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
    ranges: {
      title: 'Rule of 72 — years for money to double at common rates',
      rows: [
        { label: '4% (savings, FD)', range: '~18 years to 2x', note: '72 ÷ 4 = 18' },
        { label: '6% (debt funds, PPF approx)', range: '~12 years to 2x', note: '72 ÷ 6 = 12' },
        { label: '8% (balanced)', range: '~9 years to 2x', note: '72 ÷ 8 = 9' },
        { label: '10% (equity index)', range: '~7.2 years to 2x', note: '72 ÷ 10 = 7.2' },
        { label: '12% (Indian equity historic)', range: '~6 years to 2x', note: '72 ÷ 12 = 6' },
        { label: '15% (aggressive)', range: '~4.8 years to 2x', note: '72 ÷ 15 = 4.8' },
        { label: '24% (credit-card debt)', range: '~3 years to 2x', note: 'Same math; this is why CC debt destroys' },
      ],
    },
    limitations: [
      "Calculator assumes a constant interest rate. Real fixed deposits and savings accounts have rates that change; investment returns swing dramatically. The longer the tenure, the more this assumption diverges from reality.",
      "Doesn't model inflation. A real-return calculator subtracts inflation (typically 5–6% in India, 2–3% in developed markets) to give purchasing-power growth, not nominal growth.",
      "Doesn't model taxes. Interest from FDs and savings is taxed at slab rate; debt-MF gains are slab-rate; equity LTCG is 12.5% above ₹1.25L. Always compare investments on post-tax compound returns.",
      "For ongoing recurring contributions (SIP, RD), this formula understates final value because each new contribution also compounds. Use the dedicated SIP or RD calculator instead.",
    ],
    seo: {
      title: 'Compound Interest Calculator: Daily, Monthly, Yearly',
      description: 'Free compound interest calculator. See how a principal grows over years at any interest rate, with compounding frequency from yearly to daily.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'Investor.gov — compound interest explainer', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    category: 'finance',
    icon: 'Home',
    description: 'Calculate monthly mortgage payments — principal and interest split, total interest paid, and full payment schedule.',
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
    ranges: {
      title: 'Mortgage rates by term and credit profile (US, April 2026)',
      rows: [
        { label: '30-year fixed (excellent credit)', range: '6.25% – 6.75%', note: 'FICO 760+, 20% down' },
        { label: '30-year fixed (good credit)', range: '6.75% – 7.25%', note: 'FICO 700–759' },
        { label: '15-year fixed', range: '5.50% – 6.25%', note: '~0.75% below 30-year on average' },
        { label: '5/1 ARM', range: '6.00% – 6.75%', note: 'Fixed for 5 years, then adjusts annually' },
        { label: 'FHA loan', range: '6.50% – 7.00%', note: 'Lower down payment (3.5%) but with MIP' },
        { label: 'Jumbo (>$766,550)', range: '6.75% – 7.50%', note: 'Above conforming loan limit' },
      ],
    },
    limitations: [
      "This calculator returns principal and interest only — your real monthly housing cost includes property tax (typically 0.5–2% of home value annually), homeowners insurance, and PMI if your down payment is below 20%. Add 0.5–1% of home price per year as a rough total housing cost.",
      "It assumes a fixed rate for the full term. ARMs (adjustable-rate mortgages) reset on a schedule — model the worst-case rate cap if you're considering one.",
      'Closing costs (2–5% of the loan amount) and lender fees are not included. Get a Loan Estimate from at least three lenders before committing.',
      "Doesn't model prepayment savings. Even one extra principal-only payment a year on a 30-year loan can shave 4–5 years off the term and save 15–20% of total interest.",
    ],
    seo: {
      title: 'Mortgage Calculator — Monthly Payment, Interest & Term',
      description:
        'Free mortgage calculator. See your monthly payment, total interest, and principal split for any home price, down payment, rate, and loan term.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'CFPB — Loan Estimate explainer', url: 'https://www.consumerfinance.gov/owning-a-home/loan-estimate/' },
        { label: 'Freddie Mac — weekly Primary Mortgage Market Survey', url: 'https://www.freddiemac.com/pmms' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Typical eligibility caps used by Indian lenders (2026)',
      rows: [
        { label: 'Public-sector banks (SBI, BoB, PNB)', range: 'FOIR 40–50%', note: 'Stricter for self-employed and 50+ age' },
        { label: 'Private banks (HDFC, ICICI, Axis)', range: 'FOIR 50–55%', note: 'Premium-segment customers may get higher' },
        { label: 'NBFCs (Bajaj, Tata Capital, L&T)', range: 'FOIR 55–65%', note: 'Looser eligibility but costlier rate' },
        { label: 'Home-loan LTV cap', range: '90% up to ₹30L · 80% ₹30–75L · 75% above', note: 'You must fund the rest as down payment' },
        { label: 'Personal/unsecured loan', range: '10–24× monthly income', note: 'Tenure capped at 5–7 years' },
      ],
    },
    limitations: [
      'FOIR is one of several gates — banks also check CIBIL score (typically 700+ for home loans), employment stability, and existing pre-approvals. A passing FOIR can still be rejected on credit-history grounds.',
      'Property loans add LTV (loan-to-value) caps: 90% up to ₹30L, 80% for ₹30–75L, 75% above ₹75L. Your eligibility might be capped by LTV before income kicks in.',
      "Doesn't model variable income — most banks weight only fixed CTC, ignoring 50–100% of bonuses and commissions. The self-employed get assessed off ITR-averaged income across 2–3 years.",
      'This is a planning estimate. Sanctioned amounts vary ±15–20% based on your income profile, age, retirement runway, and the lender\'s internal risk model.',
    ],
    seo: {
      title: 'Loan Eligibility Calculator: How Much Loan You Qualify For',
      description: 'Free loan eligibility calculator. Find your maximum eligible loan amount and max EMI based on income, existing obligations, rate, and tenure.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'RBI — bank lending norms', url: 'https://www.rbi.org.in/' },
        { label: 'RBI Sachet — consumer awareness portal', url: 'https://sachet.rbi.org.in/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'income-tax-calculator',
    name: 'Income Tax Calculator',
    category: 'finance',
    icon: 'Receipt',
    description: 'Estimate your annual income tax using US federal brackets.',
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
    ranges: {
      title: '2024 US federal income tax brackets — single filer',
      rows: [
        { label: '10% bracket', range: '$0 – $11,600', note: 'Applies to first dollars of taxable income' },
        { label: '12% bracket', range: '$11,600 – $47,150', note: 'Most middle-income earners' },
        { label: '22% bracket', range: '$47,150 – $100,525', note: 'Standard professional bracket' },
        { label: '24% bracket', range: '$100,525 – $191,950', note: 'Upper-middle income' },
        { label: '32% bracket', range: '$191,950 – $243,725', note: 'High earners' },
        { label: '35% bracket', range: '$243,725 – $609,350', note: 'Top-quintile incomes' },
        { label: '37% bracket', range: 'Above $609,350', note: 'Marginal rate cap' },
      ],
    },
    limitations: [
      "Uses 2024 US federal single-filer brackets only — does not model married-filing-jointly, head-of-household, or other filing statuses, which have wider bracket boundaries.",
      'Does not include state income tax, FICA (Social Security + Medicare), alternative minimum tax, or capital gains tax. Total US tax burden is usually 5–10% higher than the federal number shown here.',
      'For Indian income tax, this calculator will give wrong results — Indian slabs differ entirely. Use it only for US-context estimates or to understand how marginal tax brackets work.',
      'Does not model tax credits (Child Tax Credit, EITC, foreign tax credit) which reduce final tax owed rather than reduce taxable income.',
    ],
    seo: {
      title: 'Income Tax Calculator: Estimate Your Annual Tax',
      description: 'Free income tax calculator using 2024 US federal brackets. Estimate annual tax, take-home, and effective rate from any salary and deduction amount.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'IRS — federal tax brackets and rates', url: 'https://www.irs.gov/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Common assumption ranges for Indian retirement planning',
      rows: [
        { label: 'India inflation (long-run CPI)', range: '5–6% p.a.', note: 'Higher for healthcare and education' },
        { label: 'Equity returns (Nifty 50 long-run)', range: '10–13% p.a.', note: 'Pre-tax; STCG/LTCG drag varies' },
        { label: 'Debt MF / PPF / EPF returns', range: '6–8% p.a.', note: 'Lower volatility, lower compounding' },
        { label: 'Hybrid portfolio (60/40 equity/debt)', range: '9–11% p.a.', note: 'Standard for late-stage corpus' },
        { label: 'Safe withdrawal rate (Bengen 4% rule)', range: '3.5–4.0%', note: 'India version closer to 3.0–3.5% given inflation' },
      ],
    },
    limitations: [
      'Uses the simple 25× corpus rule, which assumes constant inflation-adjusted withdrawals and ignores sequence-of-returns risk. A bad equity decade right after retirement can deplete a 25× corpus much faster than a 4% rule suggests.',
      "Doesn't model lumpy retirement spending — healthcare bills, child weddings, property purchases that often cluster around the early retirement years.",
      "Doesn't account for separate pension or annuity streams (NPS Tier-I, EPF, family pension), which can reduce the corpus needed.",
      'Returns and inflation are assumed constant. Real-world equity returns swing widely year-to-year — keep a 2–3 year debt buffer near retirement to avoid forced selling in a down market.',
    ],
    seo: {
      title: 'Retirement Calculator: How Much You Need to Retire',
      description: 'Free retirement corpus calculator. Project the savings you need to retire comfortably — adjusted for inflation and your expected return rate.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'PFRDA — National Pension System (NPS)', url: 'https://www.pfrda.org.in/' },
        { label: 'SEBI Investor — long-term investing primer', url: 'https://investor.sebi.gov.in/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Indicative FD rates (April 2026 — verify before booking)',
      rows: [
        { label: 'SBI / large public-sector banks', range: '6.50% – 7.10% p.a.', note: 'For 1–5 year cumulative FDs' },
        { label: 'HDFC / ICICI / Axis (private)', range: '6.75% – 7.40% p.a.', note: 'Slight premium over PSU' },
        { label: 'Small finance banks', range: '7.50% – 8.50% p.a.', note: 'Higher rate, lower DICGC comfort beyond ₹5L' },
        { label: 'Senior citizens (+0.50%)', range: '+0.25% – 0.75% additional', note: 'Most banks; auto-applied' },
        { label: 'Tax-saver FD (5-year lock-in)', range: '6.50% – 7.50% p.a.', note: 'Eligible for 80C deduction up to ₹1.5L' },
      ],
    },
    limitations: [
      "Calculator assumes a cumulative FD (interest reinvested, paid at maturity). If you choose a non-cumulative FD with monthly or quarterly payouts, the maturity value equals the principal — the interest comes to you periodically.",
      'Interest is fully taxable — added to your income and taxed at your slab rate. The effective post-tax return on a 7% FD at the 30% slab is just 4.9%. Compare against PPF (tax-free) or debt mutual funds for the right horizon.',
      "Doesn't model TDS. Banks deduct 10% TDS once cumulative interest crosses ₹40,000 per year (₹50,000 for senior citizens). Submit Form 15G/H if your total income is below the taxable threshold.",
      'Premature withdrawal penalties (typically 0.5–1% reduction) and the loss of compounding aren\'t modelled. Don\'t book an FD with money you might need before maturity.',
    ],
    seo: {
      title: 'FD Calculator — Fixed Deposit Maturity & Interest',
      description:
        'Free FD calculator with quarterly compounding. See your fixed deposit maturity value, total interest, and effective yield for any deposit, rate, and tenure.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'RBI — bank deposit rates and norms', url: 'https://www.rbi.org.in/' },
        { label: 'DICGC — deposit insurance up to ₹5L', url: 'https://www.dicgc.org.in/' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Indicative RD rates (April 2026 — confirm with your bank)',
      rows: [
        { label: 'SBI / public-sector banks', range: '6.00% – 6.75% p.a.', note: 'For 1–5 year RDs' },
        { label: 'HDFC / ICICI / Axis (private)', range: '6.50% – 7.25% p.a.', note: 'Slight premium over PSU' },
        { label: 'Small finance banks (AU, Equitas, Ujjivan)', range: '7.50% – 8.50% p.a.', note: 'Higher rates; DICGC insurance caps at ₹5L' },
        { label: 'Post Office RD (5-year fixed)', range: '6.70% p.a. (Q1 2026)', note: 'Government-set; updated quarterly' },
        { label: 'Senior citizens (+0.50%)', range: '+0.25% – 0.75% additional', note: 'Most banks; auto-applied' },
      ],
    },
    limitations: [
      'Interest is fully taxable as "Income from Other Sources" at your slab rate. The effective post-tax return on a 6.5% RD at the 30% slab is only 4.55%, often below CPI inflation.',
      'TDS at 10% kicks in once total annual interest crosses ₹40,000 (₹50,000 for senior citizens). Submit Form 15G/H if your total income is below the taxable threshold.',
      'Missing a monthly deposit usually triggers a small penalty (₹1–₹5 per ₹100 of installment, depending on the bank). After 3–4 consecutive missed deposits, the RD may auto-close.',
      "Doesn't model premature withdrawal penalties — banks typically charge 0.5–1% on the applicable rate, and most RDs disallow partial withdrawals.",
    ],
    seo: {
      title: 'RD Calculator: Recurring Deposit Maturity & Interest',
      description: 'Free RD calculator. See your recurring deposit maturity value, total deposited, and interest earned at any monthly amount, rate, and tenure.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'RBI — bank deposit framework', url: 'https://www.rbi.org.in/' },
        { label: 'India Post — Post Office RD rates', url: 'https://www.indiapost.gov.in/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Realistic long-run return ranges for Indian mutual funds',
      rows: [
        { label: 'Large-cap equity (Nifty 50 long-run)', range: '10–13% p.a.', note: 'Lower volatility than mid/small-cap' },
        { label: 'Mid-cap equity', range: '12–16% p.a.', note: 'Higher volatility, longer recovery cycles' },
        { label: 'Small-cap equity', range: '14–18% p.a.', note: 'Highest risk; can drop 40–60% in down years' },
        { label: 'Hybrid (balanced advantage)', range: '9–12% p.a.', note: 'Lower volatility for risk-averse investors' },
        { label: 'Debt MF (short/medium duration)', range: '6–8% p.a.', note: 'Better post-tax than FD for high-bracket investors' },
        { label: 'Index fund (Nifty/Sensex)', range: '11–13% p.a.', note: 'Lowest cost; matches benchmark minus 0.1–0.3% TER' },
      ],
    },
    limitations: [
      "Past returns don't guarantee future ones. Real-world equity returns swing widely year-to-year — assuming a constant 12% is a planning convenience, not a promise.",
      "Doesn't model exit load (typically 1% if redeemed within 1 year), expense ratio (0.1–2.5% depending on direct/regular and asset class), or STCG/LTCG tax on redemption.",
      "Doesn't model SIPs — for monthly recurring contributions, use the SIP Calculator, which uses a different growth formula (each instalment compounds over a different duration).",
      'Inflation isn\'t modelled — at 6% inflation, ₹3.1 lakh in 10 years has the purchasing power of about ₹1.73 lakh today. Always think in real (inflation-adjusted) terms for long horizons.',
    ],
    seo: {
      title: 'Mutual Fund Returns Calculator: Future Value of MF',
      description: 'Free mutual fund returns calculator. Project the future value and total gain on a one-time MF investment at any expected annual return rate.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'SEBI Investor — mutual fund basics', url: 'https://investor.sebi.gov.in/' },
        { label: 'AMFI — mutual fund industry data', url: 'https://www.amfiindia.com/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Indian equity trading costs (approximate; check your broker)',
      rows: [
        { label: 'Discount broker (Zerodha, Groww, Upstox)', range: '₹0–₹20 per executed order', note: 'Flat fee; intraday and delivery differ' },
        { label: 'Securities Transaction Tax (STT) — delivery', range: '0.10% on buy + 0.10% on sell', note: 'Paid by you, collected by exchange' },
        { label: 'STT — intraday/options', range: '0.025% sell-side only', note: 'Reduces effective spread' },
        { label: 'GST on brokerage', range: '18% of brokerage', note: 'Auto-applied' },
        { label: 'Short-term capital gains tax (STCG)', range: '20% on gains', note: 'Held under 1 year — listed equity' },
        { label: 'Long-term capital gains tax (LTCG)', range: '12.5% above ₹1.25L/yr', note: 'Held over 1 year — listed equity' },
      ],
    },
    limitations: [
      "Doesn't deduct brokerage, STT, GST, or DP charges — net P&L is typically 0.5–2% lower than the gross figure shown, more for high-frequency trades.",
      "Doesn't model capital gains tax — for accurate post-tax returns, deduct 20% (STCG) or 12.5% above ₹1.25L LTCG exemption.",
      "Doesn't model corporate actions — splits, bonuses, dividends, rights issues all change the effective cost basis. Adjust manually for these.",
      "Doesn't model currency conversion for ADR/GDR or US-stock trades. For those, factor INR/USD movement separately — it can flip a winning USD trade into a losing INR position.",
    ],
    seo: {
      title: 'Stock Profit/Loss Calculator: Trade Returns & %',
      description: 'Free stock profit/loss calculator. Compute gain or loss in absolute terms and percent return for any buy/sell trade across any quantity of shares.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'SEBI Investor — equity trading basics', url: 'https://investor.sebi.gov.in/' },
        { label: 'NSE — securities transaction tax (STT)', url: 'https://www.nseindia.com/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Typical dividend yield ranges by Indian sector',
      rows: [
        { label: 'PSU banks (SBI, BoB, Canara)', range: '3–6%', note: 'Highly cyclical; tied to credit cycle' },
        { label: 'Utilities (NTPC, Power Grid, Coal India)', range: '4–8%', note: 'High and stable; payout ratios 40–60%' },
        { label: 'FMCG large-caps (ITC, HUL, Nestle)', range: '1.5–4%', note: 'Lower yield but stable growth' },
        { label: 'IT services (TCS, Infosys, Wipro)', range: '1.5–3%', note: 'Plus buybacks; total payout often 80%+' },
        { label: 'REITs (Embassy, Mindspace, Brookfield)', range: '5–7%', note: 'Tax-efficient if held over 1 year' },
        { label: 'Nifty 50 (index average)', range: '~1.2–1.5%', note: 'Indian indices yield less than US/UK indices' },
      ],
    },
    limitations: [
      "Doesn't model dividend tax — since FY 2020–21, dividends are taxable at your slab rate (the company no longer pays DDT). 10% TDS applies once total annual dividend exceeds ₹5,000 per company.",
      "Doesn't predict future dividends. Past dividend per share isn't guaranteed — companies cut, suspend, or grow dividends based on cash flow and capital needs.",
      'High yield often signals price decline, not generosity. A stock yielding 12% may have crashed because earnings fell — check the payout ratio and free cash flow before assuming the yield is real.',
      'Doesn\'t factor in dividend growth. A 2% yield growing at 15% a year overtakes a 6% yield with zero growth within ~10 years — yield-on-cost compounds.',
    ],
    seo: {
      title: 'Dividend Yield Calculator: Annual Yield & Income',
      description: 'Free dividend yield calculator. Get the annual yield % on a stock and your total annual dividend income from any share count and price.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'SEBI Investor — dividend basics', url: 'https://investor.sebi.gov.in/' },
        { label: 'NSE — dividend announcements', url: 'https://www.nseindia.com/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Typical Indian credit card APRs (monthly rate × 12)',
      rows: [
        { label: 'Premium / co-branded cards', range: '36% – 42% p.a.', note: 'HDFC Diners, Axis Magnus, ICICI Sapphiro' },
        { label: 'Mass-market cards', range: '40% – 45% p.a.', note: 'HDFC Regalia, Axis ACE, SBI Elite' },
        { label: 'Entry-level/secured cards', range: '36% – 48% p.a.', note: 'Higher for first-time/poor-CIBIL applicants' },
        { label: 'Cash advance APR', range: '36% – 60% p.a. + flat fee', note: 'Plus 2.5–3.5% one-time withdrawal fee' },
        { label: 'EMI conversion rate', range: '13% – 18% p.a.', note: 'Much cheaper than rolling over the balance' },
        { label: 'Minimum payment (5% trap)', range: '5% of outstanding', note: 'Stretches a ₹50K debt over 7+ years' },
      ],
    },
    limitations: [
      "Doesn't model annual fees, late payment charges (₹500–₹1,500 typical), over-limit fees, or foreign transaction markups — all of which add to your effective cost.",
      "Doesn't handle interest-free grace period: if you pay the full bill by the due date, you pay 0% interest. Interest applies only when you carry a balance into the next cycle.",
      'Cash advances accrue interest from day one — no grace period and usually at a higher APR. Use them only as a last resort.',
      "Doesn't model balance transfers or EMI conversions, both of which can significantly reduce interest. A balance transfer at 13% saves tens of thousands compared to rolling over at 42%.",
    ],
    seo: {
      title: 'Credit Card Interest Calculator: Months to Payoff',
      description: 'Free credit card interest calculator. See how many months it takes to clear a balance and how much total interest you pay at any APR and monthly payment.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'RBI — credit card rate framework', url: 'https://www.rbi.org.in/' },
        { label: 'RBI Sachet — consumer protection portal', url: 'https://sachet.rbi.org.in/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Typical Indian consumer-debt interest rates (2026)',
      rows: [
        { label: 'Home loan', range: '8.30% – 9.50%', note: 'Lowest because secured by property' },
        { label: 'Loan against property (LAP)', range: '9.50% – 11.50%', note: 'Secured but lower LTV than home loan' },
        { label: 'Education loan (Indian institute)', range: '8.50% – 13.00%', note: 'Moratorium during course; varies by college' },
        { label: 'Vehicle loan (new car)', range: '8.50% – 11.00%', note: '9.50–14% for used cars' },
        { label: 'Personal loan', range: '10.50% – 24.00%', note: 'Unsecured; CIBIL-sensitive' },
        { label: 'Credit card revolving', range: '36% – 48%', note: 'Pay this off first — see our Credit Card Interest Calculator' },
      ],
    },
    limitations: [
      "Models a single debt with constant monthly payment. If you have multiple debts (a home loan + car loan + credit card), use the avalanche method (pay off highest-rate first) or snowball method (smallest balance first) by running this calculator separately for each.",
      "Doesn't include prepayment penalties — most floating-rate retail loans have zero prepayment penalty as per RBI, but fixed-rate loans may charge 2–4% on prepayment.",
      "Doesn't model rate resets on floating-rate loans — your EMI could change mid-tenure as RBI moves repo rates.",
      'Doesn\'t model tax benefits — home-loan interest is deductible up to ₹2 lakh/year under Section 24(b), and education-loan interest is deductible under Section 80E. Add these back to your effective post-tax rate.',
    ],
    seo: {
      title: 'Debt Payoff Calculator: When You Will Be Debt-Free',
      description: 'Free debt payoff calculator. See months to debt-free and total interest paid at any monthly payment, debt amount, and interest rate.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'RBI — retail lending guidelines', url: 'https://www.rbi.org.in/' },
        { label: 'RBI Sachet — consumer awareness', url: 'https://sachet.rbi.org.in/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Net worth benchmarks for Indian households (rough, by age)',
      rows: [
        { label: 'Age 25–30 (early career)', range: '₹1L – ₹15L', note: 'Often negative if EMIs running' },
        { label: 'Age 30–40 (mid career)', range: '₹15L – ₹1Cr', note: 'Home equity building, kids expense begins' },
        { label: 'Age 40–50 (peak earning)', range: '₹50L – ₹3Cr', note: 'Wealth acceleration phase' },
        { label: 'Age 50–60 (pre-retirement)', range: '₹1Cr – ₹5Cr', note: 'Retirement corpus consolidation' },
        { label: 'Age 60+ (retirement)', range: '25× annual expenses', note: 'Withdrawal phase begins' },
        { label: 'Healthy A/L ratio', range: '> 2.0', note: 'Below 1.0 = leverage exceeds assets' },
      ],
    },
    limitations: [
      'Property valuation is the biggest source of error. List your home at a realistic resale price (last comparable sale in your society/area), not the inflated builder rate or sentimental value.',
      'Doesn\'t differentiate between liquid and illiquid assets. ₹50 lakh in a flat you live in is not the same as ₹50 lakh in equity mutual funds — you can\'t sell half a flat in a hurry.',
      "Doesn't subtract future tax liability. ₹10 lakh of unrealised equity gains will incur LTCG tax when you sell — your post-tax net worth is lower than the gross figure.",
      "Doesn't include human capital (future earnings) or contingent liabilities (guarantees, EMI commitments under construction-linked plans). Both can swing real picture significantly.",
    ],
    seo: {
      title: 'Net Worth Calculator: Assets, Liabilities, Ratio',
      description: 'Free net worth calculator. Subtract liabilities from assets to see your true net worth and asset/liability ratio — the simplest financial-health metric.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'SEBI Investor — financial planning basics', url: 'https://investor.sebi.gov.in/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Typical Indian salary-to-hourly conversions',
      rows: [
        { label: '₹5L annual (₹40K/month)', range: '~₹250/hour', note: 'Entry-level metro' },
        { label: '₹10L annual (₹83K/month)', range: '~₹500/hour', note: 'Mid-career typical' },
        { label: '₹20L annual (₹1.67L/month)', range: '~₹1,000/hour', note: 'Senior IC' },
        { label: '₹30L annual (₹2.5L/month)', range: '~₹1,500/hour', note: 'Manager / Sr. specialist' },
        { label: '₹50L annual (₹4.17L/month)', range: '~₹2,500/hour', note: 'Senior leadership' },
        { label: 'Freelance rate multiplier', range: '2.5 – 3× salaried hourly', note: 'Accounts for benefits, gaps, taxes' },
      ],
    },
    limitations: [
      "Doesn't deduct taxes. Indian effective tax rates are 5–25% depending on income — your post-tax hourly rate is correspondingly lower.",
      "Assumes salaried full-time. Doesn't account for unpaid overtime (Indian IT often runs 45–55 actual hours despite 40 on contract).",
      "For freelance/contract rates, multiply by 2.5–3× to cover taxes, benefits, downtime, and admin overhead — direct salary÷hours math underprices contract work.",
      "Doesn't include ESOPs, bonuses, or variable pay. For full-comp comparison, use Total CTC including stock vest schedule.",
    ],
    seo: {
      title: 'Salary to Hourly Calculator: Annual to Hourly Rate',
      description: 'Free salary-to-hourly converter. Turn any annual salary into hourly, daily, weekly, and monthly rates — based on your real hours and weeks worked.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'tip-calculator',
    name: 'Tip Calculator',
    category: 'finance',
    icon: 'Utensils',
    description: 'Split a restaurant bill fairly with tip — get tip amount, total, and per-person share for any group size.',
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
    ranges: {
      title: 'Tipping conventions by country (April 2026)',
      rows: [
        { label: 'United States — sit-down', range: '18 – 22%', note: 'On pre-tax subtotal; 20% is the new default' },
        { label: 'United States — counter / takeaway', range: '0 – 10%', note: 'Tip jars optional; no expectation' },
        { label: 'Canada', range: '15 – 20%', note: 'Tipping culture similar to US' },
        { label: 'United Kingdom', range: '10 – 15%', note: 'Often included as "service charge"; check bill first' },
        { label: 'Continental Europe', range: '5 – 10%', note: 'Round up; service often included' },
        { label: 'India', range: '5 – 10%', note: '5–10% if no service charge; nothing if service charge already added' },
        { label: 'Japan', range: '0%', note: 'Tipping is generally not customary; can offend' },
        { label: 'Middle East / Gulf', range: '10 – 15%', note: 'Service charge often included; small extra appreciated' },
      ],
    },
    limitations: [
      'Calculator assumes equal split. For uneven splits (alcohol drinkers vs non-drinkers, dietary differences), use a per-item bill split — most apps like Splitwise handle this directly.',
      'Tip is calculated on the pre-tax bill in the US convention. If your bill includes tax already and you tip on the tax-inclusive total, you\'re slightly over-tipping (about 8% over).',
      'Doesn\'t check whether service charge is already included. Always inspect the bill — restaurants in India, UK, France, and several other countries auto-add 10–15% service charge.',
      'For groups of 8+ in the US, gratuity is often auto-added to the bill (typically 18%). Don\'t tip on top.',
    ],
    seo: {
      title: 'Tip Calculator: Split Bills & Tip Fairly',
      description: 'Free tip calculator. Calculate tip amount, total bill, and per-person split for any bill amount, tip percentage, and group size.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'GST slabs in India (April 2026)',
      rows: [
        { label: '0% (exempt)', range: 'Nil', note: 'Unbranded food grains, fresh produce, healthcare, education' },
        { label: '5%', range: 'Essentials', note: 'Branded packaged food, footwear under ₹1,000, cab rides' },
        { label: '12%', range: 'Standard goods', note: 'Frozen meat, processed food, business-class flights, smartphones' },
        { label: '18%', range: 'Most services', note: 'Software, telecom, restaurants (AC), professional services — most B2B' },
        { label: '28%', range: 'Luxury / sin', note: 'Cars, ACs, premium electronics, tobacco, aerated drinks' },
        { label: '28% + cess', range: 'Sin / luxury+', note: 'Tobacco, pan masala, large SUVs — additional compensation cess' },
      ],
    },
    limitations: [
      "Calculator assumes a single GST rate per transaction. Composite invoices (e.g. mixed-rate restaurant bills) need to be split line by line — apply the right rate to each item.",
      'Composition scheme rates (1% for traders, 5% for restaurants) are not standard slabs and aren\'t intended for end-consumer pricing comparisons.',
      'Reverse charge mechanism (RCM), where the buyer pays GST instead of the seller, isn\'t modelled. Applies mostly to specific notified goods/services and unregistered-supplier purchases.',
      "Doesn't compute input tax credit (ITC). For business GST returns, you offset GST collected against GST paid on inputs — that's a returns-filing exercise, not a per-transaction calc.",
    ],
    seo: {
      title: 'GST Calculator India — Inclusive & Exclusive GST Amount',
      description:
        'Free GST calculator for India. Add GST to a base amount or extract GST from an inclusive price. Supports all current slabs (5%, 12%, 18%, 28%).',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'GST portal — current rates and notifications', url: 'https://www.gst.gov.in/' },
        { label: 'CBIC — GST rate finder', url: 'https://cbic-gst.gov.in/' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'PPF — historical interest rates (set quarterly by Government of India)',
      rows: [
        { label: 'Current (Q1 FY26)', range: '7.10% p.a.', note: 'Revised quarterly; check before extrapolating' },
        { label: '5-year average', range: '7.10% – 7.90%', note: 'Has been at 7.1% for several quarters' },
        { label: '10-year average', range: '~7.5%', note: 'Trended down from 8%+ in early 2010s' },
        { label: 'Maximum annual contribution', range: '₹1.5 lakh', note: 'Across all PPF accounts in your name' },
        { label: 'Lock-in', range: '15 years', note: 'Extendable in 5-year blocks indefinitely' },
        { label: 'Partial withdrawal', range: 'From year 7', note: 'Up to 50% of balance at end of year 4' },
      ],
    },
    limitations: [
      "PPF rates are reset quarterly by the government. The calculator assumes a constant rate over the full tenure — your actual maturity value will differ as rates change.",
      "Maximum contribution is ₹1.5 lakh per financial year, summed across PPF accounts of one PAN. Excess contributions don't earn interest and aren't 80C-eligible.",
      "Doesn't model the loan facility (available years 3–6 against your PPF balance) or the partial-withdrawal option (from year 7), both of which interrupt the compound growth.",
      'Assumes you contribute at the start of each year (best for interest accrual). Contributions later in the year earn interest only from the month after deposit.',
    ],
    seo: {
      title: 'PPF Calculator — Public Provident Fund Maturity Value',
      description:
        'Free PPF calculator. Project your Public Provident Fund maturity for any yearly contribution and tenure. Tax-free returns at the current 7.1% PPF rate.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'India Post — PPF rules', url: 'https://www.indiapost.gov.in/Financial/Pages/Content/Public-Provident-Fund.aspx' },
        { label: 'NSI — small-savings interest rates', url: 'https://www.nsiindia.gov.in/' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'NPS — return ranges by Active Choice asset allocation',
      rows: [
        { label: 'Aggressive (75% equity, max allowed)', range: '11 – 13% p.a. expected', note: 'Cap on equity drops with age past 50' },
        { label: 'Balanced (50% equity)', range: '9 – 11% p.a. expected', note: 'Most common allocation' },
        { label: 'Conservative (25% equity)', range: '8 – 10% p.a. expected', note: 'Lower volatility, lower upside' },
        { label: 'Auto Choice (LC50)', range: '~9 – 11% p.a.', note: 'Lifecycle fund — equity tapers automatically with age' },
        { label: 'Government bonds only', range: '~7 – 8% p.a.', note: 'Tier II option only for risk-averse savers' },
      ],
    },
    limitations: [
      'Calculator assumes a constant return rate. NPS returns are market-linked — equity portion can fluctuate ±20% in a year, debt portion ±2–4%. Run sensitivity analysis at 8%, 10%, and 12%.',
      "Doesn't model the 60/40 split rule at maturity. 60% can be taken as tax-free lump sum; 40% mandatorily buys an annuity, the rate of which depends on the annuity provider you choose at age 60 (currently 5–6.5% range).",
      'Annuity income is fully taxable as income in the year received. NPS is tax-deferred, not tax-free like PPF — keep this in mind when comparing.',
      'Equity allocation is capped at 75% in Active Choice; this cap reduces every year after age 50 to 50% equity by age 60. Long-horizon return projections at 12%+ assume the 75% cap stays in place, which it won\'t for the last decade.',
    ],
    seo: {
      title: 'NPS Calculator — National Pension System Corpus & Pension',
      description:
        'Free NPS calculator. Project your retirement corpus, monthly pension, and lump-sum withdrawal under the National Pension System for any monthly contribution.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'PFRDA — official NPS portal', url: 'https://www.npscra.nsdl.co.in/' },
        { label: 'NPS Trust — scheme returns', url: 'https://www.npstrust.org.in/' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'lumpsum-calculator',
    name: 'Lumpsum Calculator',
    category: 'finance',
    icon: 'Coins',
    description: 'Project the future value of a one-time mutual fund or equity lumpsum investment.',
    usageCount: 21000,
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
    ranges: {
      title: 'Lumpsum return assumptions by asset class (long-run averages)',
      rows: [
        { label: 'Indian equity (Nifty 500)', range: '11 – 13% p.a.', note: 'Long-run average, but expect ±25% annual swings' },
        { label: 'Indian large-cap', range: '10 – 12% p.a.', note: 'Lower volatility, slight return drag vs broader market' },
        { label: 'Hybrid / balanced funds', range: '9 – 11% p.a.', note: '60–70% equity, lower drawdowns' },
        { label: 'Debt mutual funds', range: '6 – 8% p.a.', note: 'Taxed at slab rate post-2023' },
        { label: 'Gold (long-run INR)', range: '8 – 10% p.a.', note: 'Volatile; useful as portfolio diversifier' },
        { label: 'Bank FD / RD', range: '6.5 – 7.5% p.a.', note: 'Guaranteed, but post-tax return at top slab is just 4.5–5%' },
      ],
    },
    limitations: [
      'Assumes a constant compound rate. Real markets deliver returns in lumpy sequences — a single bad first year can halve your 10-year result vs the same average return spread evenly. This is sequence-of-returns risk.',
      "Doesn't model expense ratio (0.5–2% for active funds, 0.1–0.3% for index funds) or exit load. Net returns are 1–2% lower than gross.",
      "Doesn't model tax. Equity LTCG (held >1 year) is taxed at 12.5% above ₹1.25L per year; debt MFs are slab-rate taxed; gold is slab-rate. Compare on post-tax returns when picking between options.",
      'Lumpsum vs SIP comparison depends entirely on what markets do during the SIP period. The calculator can\'t tell you which will win — only the math of each.',
    ],
    seo: {
      title: 'Lumpsum Calculator — One-Time Investment Future Value',
      description:
        'Free lumpsum calculator. Project the future value of a one-time mutual fund, equity, or fixed-income investment at any expected return rate and tenure.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'AMFI India — historical fund returns', url: 'https://www.amfiindia.com/' },
        { label: 'SEBI — investor education', url: 'https://investor.sebi.gov.in/' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'hra-calculator',
    name: 'HRA Calculator',
    category: 'finance',
    icon: 'Building2',
    description: 'Calculate exempt and taxable HRA under Section 10(13A) — old regime tax saving on house rent.',
    usageCount: 67000,
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
    ranges: {
      title: 'HRA exemption legs — the lowest of three is exempt',
      rows: [
        { label: 'Leg 1', range: 'Actual HRA received', note: 'Whatever your CTC structure says' },
        { label: 'Leg 2 (metro)', range: '50% × (Basic + DA)', note: 'Mumbai, Delhi, Kolkata, Chennai' },
        { label: 'Leg 2 (non-metro)', range: '40% × (Basic + DA)', note: 'All other cities' },
        { label: 'Leg 3', range: 'Rent paid − 10% × (Basic + DA)', note: 'If negative, this leg = 0' },
        { label: 'Required regime', range: 'Old regime only', note: 'New regime: no HRA exemption' },
        { label: 'PAN of landlord', range: 'Required if rent > ₹1L/yr', note: 'Otherwise full HRA is taxable' },
      ],
    },
    limitations: [
      "Calculator assumes annual figures. If your basic, HRA, or rent changed mid-year (e.g. job switch, rent increase), compute monthly and sum — using annual averages over-estimates exemption.",
      "Doesn't validate against new tax regime. From FY 2023-24, the new regime is the default — and HRA, 80C, and most exemptions are not available there. Switching back to old regime requires explicit declaration.",
      "Doesn't model the case where you own the house. You can't claim HRA on rent paid to yourself or to a spouse (the IT department disallows this).",
      "Rent paid to your parents counts only if (a) they declare it as rental income in their return, (b) you have a rent agreement, and (c) you actually transfer the rent monthly. Cash payments without paper trail are routinely disallowed.",
    ],
    seo: {
      title: 'HRA Calculator — House Rent Allowance Exemption (India)',
      description:
        'Free HRA calculator under Section 10(13A). Calculate your HRA exemption, taxable portion, and tax saved at the 30% slab — old regime only.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'IT Department — Section 10(13A) rules', url: 'https://incometaxindia.gov.in/' },
        { label: 'CBDT — HRA exemption circular', url: 'https://www.incometax.gov.in/iec/foportal/' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'cibil-calculator',
    name: 'CIBIL Score Estimator',
    category: 'finance',
    icon: 'Gauge',
    description: 'Estimate where your CIBIL score sits based on credit habits — utilisation, payment history, account age, and inquiries.',
    usageCount: 38000,
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
      // Map 0–100 composite to CIBIL 300–900
      const score = 300 + composite * 6;

      const band =
        score >= 800 ? 'Excellent (800–900)' :
        score >= 750 ? 'Good (750–799)' :
        score >= 700 ? 'Fair (700–749)' :
        score >= 650 ? 'Poor (650–699)' :
        'Very Poor (300–649)';

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
    ranges: {
      title: 'CIBIL bands — what each means for borrowing',
      rows: [
        { label: '800–900 · Excellent', range: '~10% of borrowers', note: 'Best rates, instant approvals, premium card eligibility' },
        { label: '750–799 · Good', range: '~25% of borrowers', note: 'Standard rates, most loans approved smoothly' },
        { label: '700–749 · Fair', range: '~25% of borrowers', note: 'Approval likely but at higher rates; may need co-applicant' },
        { label: '650–699 · Poor', range: '~20% of borrowers', note: 'Mostly NBFCs; rates 2–4% above standard' },
        { label: '300–649 · Very poor', range: '~20% of borrowers', note: 'Most lenders decline; rebuild before applying' },
        { label: 'NTC (No Score)', range: 'No history', note: 'Build with a secured card or small consumer loan' },
      ],
    },
    limitations: [
      'This is an estimator, not your real CIBIL score. The actual score uses ~258 data points from your credit history; this calculator captures the five biggest. Real and estimated scores typically agree within ±50 points but can diverge by more.',
      'For your real score, get the free annual report at cibil.com or via Bank/UPI partner apps (most show CIBIL free of charge). Soft inquiries from these apps don\'t affect your score.',
      'Doesn\'t model settlements, write-offs, or DPD (days past due) on closed accounts — all of which depress real CIBIL scores significantly even after the account is closed.',
      'Score-band-to-percentage mapping is directional based on lender benchmarks; actual distribution varies by bureau, year, and population sampled.',
    ],
    seo: {
      title: 'CIBIL Score Estimator — Estimate Your Credit Score',
      description:
        'Free CIBIL score estimator. Get a directional credit score from your payment history, utilisation, account age, inquiries, and credit mix — plus the biggest lever to improve it.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'TransUnion CIBIL — official portal', url: 'https://www.cibil.com/' },
        { label: 'RBI — credit information bureau norms', url: 'https://www.rbi.org.in/' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
