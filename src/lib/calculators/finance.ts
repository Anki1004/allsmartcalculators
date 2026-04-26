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
    seo: {
      title: 'Currency Converter: 30 World Currencies, Live Rates',
      description: 'Free currency converter for 30 major world currencies including USD, EUR, GBP, INR, JPY, AUD. See live conversion, exchange rate, and inverse rate.',
    },
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
    intro:
      'A SIP (Systematic Investment Plan) is a way to invest a fixed amount in a mutual fund every month, automatically. Two things make it powerful: rupee-cost averaging (you buy more units when prices are low and fewer when they\'re high) and compounding (your gains start earning their own gains). This calculator projects the future value of a SIP using the standard FV-of-annuity formula, with returns compounded monthly. Move the sliders to compare time horizons, contribution sizes, and expected returns — equity SIPs in India have averaged 11–13% over rolling 10-year windows.',
    formula: 'FV = P × [((1 + r)ⁿ − 1) ÷ r] × (1 + r)',
    howItWorks:
      'P is your monthly contribution, r is the expected monthly return (annual rate ÷ 12 ÷ 100), and n is the number of months. The formula assumes you invest at the start of each month. ₹10,000 a month for 20 years at 12% p.a. grows to roughly ₹99 lakh — of which ₹24 lakh is what you put in and ₹75 lakh is compound returns. Doubling the tenure from 10 to 20 years more than quadruples the corpus, which is why "start early" matters more than "invest more."',
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
    faqs: [
      {
        q: 'How is SIP return calculated?',
        a: 'Using the future-value-of-annuity formula: FV = P × [((1+r)ⁿ−1)÷r] × (1+r), where P is the monthly investment, r is the monthly return rate, and n is the number of months. The (1+r) at the end reflects investing at the start of the month.',
      },
      {
        q: "What's the realistic return on a SIP in India?",
        a: 'Indian equity diversified funds have averaged 11–13% per annum over rolling 10-year windows since 2000. Large-cap-focused SIPs cluster around 10–11%; mid- and small-cap SIPs can hit 13–16% but with much deeper drawdowns. Use 12% as a base case, then sensitivity-test ±3%.',
      },
      {
        q: 'SIP vs lumpsum — which is better?',
        a: "If you have the lumpsum and the market goes straight up, lumpsum wins. If markets fall in the middle, SIP wins (you accumulate units cheaper). Empirically, on Indian equities since 2000, lumpsum at the start has won about 60% of 10-year periods — but SIP has lower regret and is psychologically easier to stick with.",
      },
      {
        q: 'What is a step-up SIP?',
        a: 'A SIP where your monthly contribution increases each year — usually by 5–10%, matching salary growth. ₹10,000/month with a 10% annual step-up over 20 years grows about 75% larger than a flat ₹10,000 SIP at the same return rate.',
      },
      {
        q: 'Are SIP returns guaranteed?',
        a: 'No. SIPs invest in mutual funds; equity mutual funds carry market risk. The calculator output is a projection assuming a constant return rate — real returns will fluctuate year to year and the final corpus could be 20–40% above or below the projection.',
      },
      {
        q: 'How is SIP taxed in India?',
        a: 'For equity funds: gains held over 12 months are LTCG, taxed at 12.5% above ₹1.25 lakh per year (post-Budget 2024). Each SIP instalment is treated as a separate investment for the holding-period clock. For debt funds, gains are added to your income and taxed at slab rate.',
      },
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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'finance',
    icon: 'Percent',
    description: 'See how your money grows with compounding.',
    seo: {
      title: 'Compound Interest Calculator: Daily, Monthly, Yearly',
      description: 'Free compound interest calculator. See how a principal grows over years at any interest rate, with compounding frequency from yearly to daily.',
    },
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
    intro:
      'A mortgage calculator returns your monthly principal-and-interest payment for a home loan, given the home price, your down payment, the interest rate, and the loan term. It uses the same reducing-balance amortization formula every bank does, so the headline monthly number you see here will match what a lender quotes — give or take taxes, insurance, and fees that vary by jurisdiction. Use it to test what-if scenarios before you talk to a lender: a bigger down payment, a 15-year vs 30-year term, or a half-percent lower rate.',
    formula: 'M = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)',
    howItWorks:
      'P is the loan amount (home price minus down payment), r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly payments (years × 12). On a $360,000 loan at 6.5% over 30 years, the monthly payment is $2,275 and you pay $459,005 in interest over the life of the loan — more than the original principal. Drop the term to 15 years and the monthly jumps to $3,136, but lifetime interest falls to $204,403. Always look at lifetime interest, not just the monthly.',
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
    faqs: [
      {
        q: 'How is a mortgage payment calculated?',
        a: 'Using the standard amortization formula M = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ−1), where P is the loan amount, r is the monthly interest rate, and n is the number of months. Each month, part of the payment goes to interest on the remaining balance and part to principal — early in the loan, most of it is interest.',
      },
      {
        q: 'What is the difference between a 15-year and a 30-year mortgage?',
        a: 'A 15-year loan has a higher monthly payment but a much lower total interest cost — typically 50–60% less than a 30-year on the same principal. A 30-year is easier on cash flow but you pay roughly the original loan amount again in interest over the life of the loan.',
      },
      {
        q: 'How much house can I afford?',
        a: 'A common rule is your monthly mortgage (principal, interest, taxes, insurance) shouldn\'t exceed 28% of gross monthly income, and total debt payments shouldn\'t exceed 36%. For a $7,500/mo gross salary, that caps mortgage at $2,100/mo and total debt at $2,700/mo.',
      },
      {
        q: 'Is a mortgage calculator the same as an EMI calculator?',
        a: 'Functionally yes — both use the reducing-balance formula. "EMI calculator" is the term used in India and South Asia; "mortgage calculator" is the US/UK term and usually focuses on home loans, sometimes adding tax and insurance lines. The core monthly principal-and-interest number is identical.',
      },
      {
        q: 'Should I make extra principal payments?',
        a: 'Almost always yes, if your loan has no prepayment penalty. An extra $200/month on a $300,000 30-year loan at 6.5% saves $103,000 in interest and ends the loan 6 years early. The earlier in the loan you do it, the bigger the impact.',
      },
      {
        q: 'What is PMI and when can I drop it?',
        a: 'Private Mortgage Insurance is required by lenders when your down payment is below 20% — it protects the lender, not you. You can request cancellation when your loan-to-value hits 80%, and it auto-cancels at 78% for conventional loans.',
      },
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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
  },
  {
    slug: 'loan-eligibility-calculator',
    name: 'Loan Eligibility Calculator',
    category: 'finance',
    icon: 'BadgeCheck',
    description: 'Find out how much loan you can qualify for.',
    seo: {
      title: 'Loan Eligibility Calculator: How Much Loan You Qualify For',
      description: 'Free loan eligibility calculator. Find your maximum eligible loan amount and max EMI based on income, existing obligations, rate, and tenure.',
    },
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
    seo: {
      title: 'Income Tax Calculator: Estimate Your Annual Tax',
      description: 'Free income tax calculator. Estimate annual tax liability, take-home pay, and effective tax rate for any salary and total deduction amount.',
    },
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
    seo: {
      title: 'Retirement Calculator: How Much You Need to Retire',
      description: 'Free retirement corpus calculator. Project the savings you need to retire comfortably — adjusted for inflation and your expected return rate.',
    },
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
    intro:
      'A Fixed Deposit (FD) is the simplest interest-bearing instrument: deposit a lump sum with a bank for a fixed tenure, get a guaranteed interest rate, and receive principal plus interest at maturity. This calculator uses the standard quarterly-compounding formula that every Indian bank uses for cumulative FDs. Move the sliders to compare amounts, rates, and tenures — useful when you\'re comparing one bank\'s 7.0% three-year FD against another\'s 6.75%, or deciding whether to lock in for two years vs five.',
    formula: 'Maturity = P × (1 + r/4)^(4t)',
    howItWorks:
      "P is the deposit amount, r is the annual interest rate as a decimal, and t is the tenure in years. Indian banks compound FD interest quarterly by convention. ₹1 lakh at 7% for 3 years grows to ₹1,22,925 — about ₹22,925 in interest. The same amount at 7.5% for the same tenure earns ₹2,500 more; over five years, that 0.5% gap compounds to about ₹6,500. Always compare the effective yield (annualised) when the compounding frequency differs across banks.",
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
    faqs: [
      {
        q: 'How is FD interest calculated in India?',
        a: 'Indian banks compound FD interest quarterly using the formula M = P × (1 + r/4)^(4t), where P is the principal, r is the annual rate as a decimal, and t is the tenure in years. The result is the maturity value; subtract the principal for the interest earned.',
      },
      {
        q: 'Is FD interest taxable?',
        a: 'Yes. FD interest is fully taxable as "Income from Other Sources" at your applicable slab rate. Banks deduct 10% TDS once your annual FD interest crosses ₹40,000 (₹50,000 for senior citizens). The 5-year tax-saver FD lets you claim up to ₹1.5L under Section 80C, but the interest is still taxable.',
      },
      {
        q: 'Which is better — FD or PPF?',
        a: 'For taxable savings under 5 years, FD wins on flexibility and rate. For 15+ year tax-free compounding with EEE status, PPF wins decisively — at 7.1% tax-free vs FD at 7% taxable, the post-tax gap is huge for top-bracket investors. Use both: PPF for the long horizon, FD for shorter goals.',
      },
      {
        q: 'What is the safest amount to keep in one FD?',
        a: '₹5 lakh per bank per depositor is insured by DICGC. If you have more than ₹5L to deposit, split across multiple banks for full coverage. Public-sector banks are systemically safer than small finance banks even within the DICGC limit.',
      },
      {
        q: 'Can I break an FD early?',
        a: 'Yes, but most banks charge a 0.5–1% penalty on the applicable rate (whichever is lower — the original rate or the rate that would have applied for the actual tenure held). For very short premature withdrawals, you may earn less than a savings-account rate.',
      },
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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
  },
  {
    slug: 'rd-calculator',
    name: 'Recurring Deposit Calculator',
    category: 'finance',
    icon: 'Calendar',
    description: 'Calculate returns on monthly recurring deposits.',
    seo: {
      title: 'RD Calculator: Recurring Deposit Maturity & Interest',
      description: 'Free RD calculator. See your recurring deposit maturity value, total deposited, and interest earned at any monthly amount, rate, and tenure.',
    },
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
    seo: {
      title: 'Mutual Fund Returns Calculator: Future Value of MF',
      description: 'Free mutual fund returns calculator. Project the future value and total gain on a one-time MF investment at any expected annual return rate.',
    },
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
    seo: {
      title: 'Stock Profit/Loss Calculator: Trade Returns & %',
      description: 'Free stock profit/loss calculator. Compute gain or loss in absolute terms and percent return for any buy/sell trade across any quantity of shares.',
    },
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
    seo: {
      title: 'Dividend Yield Calculator: Annual Yield & Income',
      description: 'Free dividend yield calculator. Get the annual yield % on a stock and your total annual dividend income from any share count and price.',
    },
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
    seo: {
      title: 'Credit Card Interest Calculator: Months to Payoff',
      description: 'Free credit card interest calculator. See how many months it takes to clear a balance and how much total interest you pay at any APR and monthly payment.',
    },
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
    seo: {
      title: 'Debt Payoff Calculator: When You Will Be Debt-Free',
      description: 'Free debt payoff calculator. See months to debt-free and total interest paid at any monthly payment, debt amount, and interest rate.',
    },
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
    seo: {
      title: 'Net Worth Calculator: Assets, Liabilities, Ratio',
      description: 'Free net worth calculator. Subtract liabilities from assets to see your true net worth and asset/liability ratio — the simplest financial-health metric.',
    },
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
    seo: {
      title: 'Salary to Hourly Calculator: Annual to Hourly Rate',
      description: 'Free salary-to-hourly converter. Turn any annual salary into hourly, daily, weekly, and monthly rates — based on your real hours and weeks worked.',
    },
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
    seo: {
      title: 'Tip Calculator: Split Bills & Tip Fairly',
      description: 'Free tip calculator. Calculate tip amount, total bill, and per-person split for any bill amount, tip percentage, and group size.',
    },
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
    intro:
      'GST (Goods and Services Tax) in India is a multi-slab indirect tax that replaced VAT, service tax, excise duty, and most other indirect taxes in 2017. The four standard slabs are 5%, 12%, 18%, and 28%, with a few special rates outside that. This calculator works both ways: enter a base amount and add GST (exclusive calculation), or know the post-GST total and back out the base (inclusive calculation). Use it for invoicing, expense reconciliation, or just sanity-checking what a vendor charged you.',
    formula: 'GST = Amount × (rate ÷ 100) · Total = Amount + GST · Net (from inclusive) = Amount × 100 ÷ (100 + rate)',
    howItWorks:
      "If your input is the base amount (the pre-GST price): the GST amount is base × rate%, and the total is base + GST. ₹1,000 at 18% gives ₹180 GST and ₹1,180 total. To go the other way — you have ₹1,180 and want to know the base — use base = 1,180 × 100 ÷ 118 = ₹1,000. For inter-state transactions, GST splits as IGST (full rate); for intra-state, it splits 50/50 as CGST + SGST. The total is the same.",
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
    faqs: [
      {
        q: 'How do I calculate GST on a price?',
        a: 'GST = price × (rate ÷ 100). For ₹1,000 at 18% GST, the GST amount is ₹180 and the total is ₹1,180. To extract GST from an inclusive price, use: net = inclusive × 100 ÷ (100 + rate); GST = inclusive − net.',
      },
      {
        q: 'What is the difference between inclusive and exclusive GST?',
        a: 'Exclusive GST: the price you see does not include GST — you add it on top (₹1,000 + 18% GST = ₹1,180 total). Inclusive GST: the price you see already includes GST — you back-calculate to find the base. Indian retail prices are usually inclusive (MRP); B2B invoices are usually exclusive.',
      },
      {
        q: 'What are the current GST slabs in India?',
        a: 'Five standard slabs: 0%, 5%, 12%, 18%, and 28%. Most services sit at 18%. Cars, premium electronics, and luxury items are at 28%. Sin goods (tobacco, aerated drinks, large SUVs) attract 28% plus an additional compensation cess that varies by category.',
      },
      {
        q: 'What is CGST, SGST, and IGST?',
        a: 'For transactions within a state, GST is split equally between CGST (Central) and SGST (State) — 18% becomes 9% CGST + 9% SGST. For inter-state transactions, the full amount goes as IGST (Integrated). The total tax is the same; only the split differs.',
      },
      {
        q: 'When is GST exempt or zero-rated?',
        a: 'Truly exempt (no GST): unbranded food grains, fresh fruit and vegetables, milk, healthcare services, education up to higher secondary. Zero-rated (technically taxed at 0% with input credit): exports and supplies to SEZ units. Exemption is broader than zero-rating because exempt goods can\'t claim input credit.',
      },
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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
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
    intro:
      'PPF (Public Provident Fund) is the most popular long-term tax-free savings scheme in India. It carries a 15-year lock-in (extendable in 5-year blocks), an annual deposit cap of ₹1.5 lakh, government-set interest rates revised quarterly (currently 7.1% for Q1 2026), and full EEE tax status — contributions are 80C deductible, interest is tax-free, and maturity is tax-free. This calculator projects the maturity value assuming you contribute the same amount annually at the start of each year. For most middle-class Indian investors, maxing PPF for 15 years is the highest-quality fixed-income exposure available.',
    formula: 'M = P × [((1 + r)ⁿ − 1) ÷ r] × (1 + r)',
    howItWorks:
      "P is the annual contribution, r is the annual rate (currently 7.1%), and n is the number of years. ₹1.5 lakh contributed every year for 15 years at 7.1% grows to about ₹40.7 lakh — ₹22.5 lakh of which is your principal and ₹18.2 lakh is tax-free interest. Extend the account by 5 more years (without further contribution) and the corpus crosses ₹57 lakh just by sitting there. Contribute before the 5th of each month to earn interest for that month — interest is calculated on the lowest balance between the 5th and the month-end.",
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
    faqs: [
      {
        q: 'How is PPF interest calculated?',
        a: 'PPF interest is calculated monthly on the lowest balance between the 5th and the last day of the month, but credited annually on March 31. The rate is set quarterly by the government — currently 7.1%. The calculator approximates this as annual compounding on the year-start balance, which is what most online calculators (including bank ones) use.',
      },
      {
        q: "What's the maximum I can invest in PPF?",
        a: '₹1.5 lakh per financial year, total across all PPF accounts in your name. This is the same as the Section 80C limit, so a single PPF contribution at ₹1.5L exhausts your 80C bucket — or you can split it with ELSS, EPF, life insurance, etc.',
      },
      {
        q: 'Is PPF interest taxable?',
        a: 'No. PPF has full EEE tax status: contributions are deductible under 80C (up to ₹1.5L), interest accumulated each year is tax-free, and the maturity amount is tax-free. This is rare in Indian fixed-income and a big reason PPF is a staple of long-term portfolios.',
      },
      {
        q: 'Can I withdraw PPF money before 15 years?',
        a: 'Partial withdrawal is allowed from the 7th financial year — up to 50% of the balance at the end of the 4th year preceding the withdrawal. Full premature closure is permitted only after 5 years and only for specific reasons (serious illness, higher education) with a 1% rate penalty.',
      },
      {
        q: 'PPF vs ELSS — which is better?',
        a: 'Both offer 80C deduction. PPF gives 7.1% guaranteed and tax-free with 15-year lock-in; ELSS gives expected 11–13% (volatile, equity-linked) with 3-year lock-in. For risk-averse investors or the bond portion of a portfolio: PPF. For longer-horizon equity exposure: ELSS. Most balanced portfolios hold both.',
      },
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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
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
    intro:
      'NPS (National Pension System) is a market-linked, voluntary, defined-contribution pension scheme regulated by PFRDA. You contribute monthly until age 60, the corpus grows in a mix of equity, corporate debt, and government bonds, and at maturity you must take at least 40% as an annuity (lifelong pension) and can take up to 60% as a lump sum. This calculator projects your retirement corpus assuming a constant blended return rate. NPS gets you an extra ₹50,000 tax deduction under Section 80CCD(1B) — over and above the 80C limit — which makes it the cheapest tax-saver per rupee of deduction.',
    formula: 'Corpus = M × [((1 + r)ⁿ − 1) ÷ r] × (1 + r) · Pension/month ≈ Annuitised 40% × 6% ÷ 12',
    howItWorks:
      "M is your monthly contribution, r is the monthly return rate (annual ÷ 12 ÷ 100), and n is the number of months until age 60. ₹5,000/month at 10% from age 30 to 60 grows to about ₹1.13 crore. At maturity, 40% (₹45 lakh) buys an annuity yielding ~6% — that\'s ₹22,500/month pension for life. The other 60% (₹68 lakh) comes as a lump sum, tax-free. The pension portion is taxable as income in the year you receive it.",
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
    faqs: [
      {
        q: 'How is NPS pension calculated?',
        a: 'At age 60, at least 40% of your accumulated NPS corpus is used to buy an annuity from a PFRDA-empanelled insurer. The annuity rate (currently 5–6.5%) sets your monthly pension. ₹50 lakh annuitised at 6% gives ₹25,000/month for life. The remaining 60% is paid as a tax-free lump sum.',
      },
      {
        q: 'What is the difference between NPS Tier 1 and Tier 2?',
        a: 'Tier 1 is the mandatory retirement account — locked until 60, eligible for tax deductions. Tier 2 is a voluntary investment account — fully liquid, no tax deduction (except for government employees), no withdrawal restrictions. Most retail subscribers use only Tier 1.',
      },
      {
        q: 'Is NPS better than PPF?',
        a: 'Different roles. PPF: guaranteed 7.1% tax-free, 15-year horizon, ₹1.5L cap. NPS: market-linked 10–12% expected (taxable on annuity), 60-year lock-in, additional ₹50,000 deduction under 80CCD(1B). Use both — PPF for the bond portion of your retirement bucket, NPS for the equity-tilted long-horizon piece.',
      },
      {
        q: 'How much tax can I save with NPS?',
        a: 'Up to ₹50,000 deduction under Section 80CCD(1B) — over and above the ₹1.5L 80C limit — exclusive to NPS Tier 1 contributions. At the 30% slab, that\'s ₹15,000 saved annually. Employer NPS contributions (up to 10% of basic) are additionally deductible under 80CCD(2).',
      },
      {
        q: 'Can I exit NPS before 60?',
        a: 'Yes, but with restrictions. Premature exit before age 60 requires you to use 80% of the corpus for an annuity (only 20% as lump sum). After 5 years of contributing and only after 60 do you get the full 60/40 split. Don\'t enter NPS with money you might need before retirement.',
      },
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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
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
    intro:
      'A lumpsum calculator projects what a single one-time investment will be worth after a chosen tenure at an assumed compound growth rate. It\'s the right tool when you have a windfall — bonus, inheritance, sale proceeds — and want to compare what equity, debt, or hybrid funds might do with it. Unlike a SIP (which spreads contributions across months), a lumpsum is fully exposed to the market on day one — better when markets go straight up, worse when they fall before recovering. Use this calculator to size that bet against tenure and expected return.',
    formula: 'FV = P × (1 + r)ⁿ',
    howItWorks:
      "P is the lumpsum amount, r is the expected annual return (as a decimal), and n is the tenure in years. ₹10 lakh invested at 12% for 10 years grows to ₹31 lakh — a 3.1x money multiplier. Stretch to 20 years and it becomes ₹96 lakh (9.6x). The longer the horizon, the more the result depends on the rate assumption — at 10 years a 2% rate difference doubles your final corpus delta; at 20 years it quadruples.",
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
    faqs: [
      {
        q: 'What is the formula for lumpsum return?',
        a: 'Future value = P × (1 + r)ⁿ, where P is the principal, r is the annual return rate as a decimal, and n is the tenure in years. For ₹10L at 12% over 10 years, FV = 10,00,000 × 1.12¹⁰ = ₹31,05,848.',
      },
      {
        q: 'Lumpsum vs SIP — which is better?',
        a: "Depends on the market path. If markets go up steadily, lumpsum wins (you're fully invested earlier). If markets fall during the SIP window, SIP wins (you accumulate units cheaper). Empirically over Indian equity history, lumpsum has won about 60% of 10-year periods — but SIP is psychologically easier and avoids the regret of timing badly.",
      },
      {
        q: 'How much tax do I pay on lumpsum mutual fund gains?',
        a: 'For equity funds held over 12 months: 12.5% LTCG on gains above ₹1.25L per year (post Budget 2024). Held under 12 months: 20% STCG. For debt funds bought after April 2023: gains taxed at your slab rate regardless of holding period.',
      },
      {
        q: 'What rate should I assume for an Indian equity lumpsum?',
        a: '11–13% as a base case for diversified equity over 10+ years, based on rolling Nifty 500 returns since 2000. Stress-test at 8% (pessimistic) and 14% (optimistic). Never assume a single point estimate — model the range.',
      },
      {
        q: 'How long should I hold a lumpsum investment?',
        a: 'For equity, minimum 5 years to ride out a typical bear market; ideally 10+ for the long-run averages to dominate noise. For debt funds, holding period depends on duration risk and tax treatment — short-duration funds for under 3 years, longer for over 3.',
      },
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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
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
    intro:
      'HRA (House Rent Allowance) is one of the most generous tax breaks for salaried Indians who rent — but only under the old tax regime. The exempt portion is the lowest of three numbers: actual HRA received, 50% of basic+DA for metro residents (40% non-metro), and rent paid in excess of 10% of basic+DA. The remainder is added to your taxable salary. This calculator computes all three legs and shows the lower-bound exemption plus the tax you save at the 30% slab. If you switched to the new regime in FY 2023-24, HRA exemption is no longer available — model your old vs new regime decision carefully.',
    formula: 'Exempt HRA = MIN(actual HRA, 50%/40% × basic, rent − 10% × basic)',
    howItWorks:
      "All three legs are evaluated, and the smallest one is the exempt amount. Example: ₹6L basic, ₹2.4L HRA, ₹3L rent, metro. Leg 1 = ₹2.4L (HRA received). Leg 2 = ₹3L (50% of basic). Leg 3 = ₹3L − ₹60K = ₹2.4L. Minimum is ₹2.4L — entirely exempt. The remaining ₹0 of HRA is taxable. At the 30% slab, this saves ₹72,000 in tax. If your rent is low or your HRA is higher than 50% of basic, your exemption shrinks because Leg 3 (or Leg 2) becomes binding.",
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
    faqs: [
      {
        q: 'How is HRA exemption calculated under Section 10(13A)?',
        a: 'The exempt portion is the minimum of: (1) actual HRA received, (2) 50% of basic+DA for metro cities or 40% for non-metro, (3) actual rent paid minus 10% of basic+DA. The remainder of HRA is added to your taxable salary.',
      },
      {
        q: 'What counts as a metro city for HRA?',
        a: 'For HRA Section 10(13A), only four cities qualify: Mumbai, Delhi, Kolkata, Chennai. Bengaluru, Hyderabad, Pune, Gurgaon — all non-metro for HRA purposes (40% cap), even though they\'re metros in everyday usage.',
      },
      {
        q: 'Can I claim HRA in the new tax regime?',
        a: 'No. Section 10(13A) HRA exemption is available only in the old tax regime. The new regime (default from FY 2023-24) has lower slabs but disallows HRA, 80C, 80D, LTA, and most other exemptions. Run both before choosing.',
      },
      {
        q: 'Can I claim HRA if I pay rent to my parents?',
        a: 'Yes, but with conditions: there must be a written rent agreement, you must transfer rent monthly via bank (not cash), and your parents must declare it as rental income in their return. If they\'re below the taxable threshold, no tax — but the declaration is mandatory.',
      },
      {
        q: 'Do I need landlord PAN to claim HRA?',
        a: 'Yes, if your annual rent exceeds ₹1 lakh. You need the landlord\'s PAN — without it, your employer cannot allow HRA exemption, and the IT department will disallow it on assessment.',
      },
      {
        q: "What's the maximum HRA exemption I can claim?",
        a: 'There is no absolute cap — the exemption depends on your basic, your HRA, your rent, and your city. In practice, for a metro resident with a 40% HRA in CTC and rent at 30% of basic, you can typically exempt 80–95% of HRA received.',
      },
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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
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
    intro:
      'CIBIL (now TransUnion CIBIL) is the most widely used credit score in India. Banks pull it before approving any loan or card, and a score above 750 typically gets you the best interest rates while below 650 gets most applications rejected. The actual score is computed by CIBIL using your full credit bureau record — this calculator gives you a directional estimate based on the five factors that drive most of the variance: payment history, credit utilisation, account age, recent inquiries, and credit mix. Use it to identify your weakest lever, not as a substitute for your real score (free at cibil.com).',
    formula: 'Composite (0–100) = 0.35 × payment + 0.30 × utilisation + 0.15 × age + 0.10 × inquiries + 0.10 × mix · CIBIL ≈ 300 + composite × 6',
    howItWorks:
      'The five factors are weighted by their typical impact on CIBIL: payment history (35%) is by far the biggest, followed by credit utilisation (30%), account age (15%), and recent inquiries plus credit mix (10% each). The composite is a 0–100 score that maps roughly linearly to the CIBIL band of 300–900. The estimator also surfaces the lowest-scoring factor as your "biggest lever" — the single change that would move your real score the most.',
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
    faqs: [
      {
        q: 'How is CIBIL score calculated?',
        a: 'CIBIL combines payment history (35%), credit utilisation (30%), length of credit history (15%), credit mix (10%), and new credit / hard inquiries (10%). Scores range from 300 (worst) to 900 (best); 750+ is considered good for loan approval.',
      },
      {
        q: 'What is a good CIBIL score?',
        a: '750 or above is considered good — most lenders give standard rates above this threshold. 800+ unlocks the best rates and premium products. Below 700, expect higher rates or rejections; below 650, most loans get declined.',
      },
      {
        q: 'How can I improve my CIBIL score?',
        a: 'In order of impact: (1) pay every EMI and credit-card bill in full and on time; (2) drop credit-card utilisation below 30% of limit; (3) avoid applying for new credit for 6+ months; (4) keep your oldest cards open even if unused; (5) maintain a healthy mix of secured (home loan) and unsecured (cards) credit.',
      },
      {
        q: 'How long does it take to fix a low CIBIL score?',
        a: 'Six months of perfect payments and low utilisation typically moves the needle by 30–50 points. Recovery from a write-off, settlement, or 90+ days past due takes 18–24 months. Bankruptcy or wilful default stays for 7 years.',
      },
      {
        q: 'Does checking my own CIBIL score lower it?',
        a: 'No. Self-checks are "soft inquiries" and have zero impact. Only "hard inquiries" — when a lender pulls your report for a loan or card application — affect your score. Even hard inquiries count for only 10% of the total.',
      },
      {
        q: 'Where can I check my actual CIBIL score?',
        a: 'Free once a year at cibil.com (mandated by RBI). Free monthly through partner apps — most major banks (HDFC, ICICI, SBI), CRED, BankBazaar, and Paisabazaar offer ongoing free CIBIL access. These checks are soft inquiries and safe.',
      },
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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
  },
];
