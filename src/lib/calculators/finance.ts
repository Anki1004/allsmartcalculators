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
    intro:
      'A currency converter takes an amount in one currency and translates it to another using the current exchange rate. This calculator covers 30 major world currencies with reference rates updated periodically. Reference rates are accurate for budgeting, comparison, and travel planning — but they are not the rate you will get from your bank, credit card, or airport kiosk. Banks add a spread of 0.5–3%, cards add 1–3% conversion fees plus the network mid-rate, and airport exchanges are routinely 5–10% worse than reference. Use this tool to know the real value; use your bank or a service like Wise to actually transfer.',
    formula: 'converted = amount × (rate_to ÷ rate_from)',
    howItWorks:
      "All rates are quoted against USD as the base. To convert from currency A to currency B, the calculator divides by A's USD rate and multiplies by B's USD rate. ₹1 lakh ÷ 83.4 (USD/INR) × 0.91 (USD/EUR) = ~€1,090. The inverse rate is just 1 divided by the forward rate, so 1 EUR = roughly 1.10 USD = ₹91. For real transactions, expect a 1–3% premium over the reference rate.",
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
    faqs: [
      {
        q: 'Where do these exchange rates come from?',
        a: 'They are reference (mid-market) rates updated periodically. Mid-market rate is the midpoint between the buy and sell rates banks use among themselves — it is the "true" rate before any retail markup.',
      },
      {
        q: 'Why is the bank rate different from this calculator?',
        a: 'Banks add a margin (typically 1–3% for retail) on top of the mid-market rate. Credit-card networks like Visa/Mastercard add ~1%, and your bank usually adds another 1–2%. The total spread between the rate you see here and what your bank charges is the bank\'s revenue.',
      },
      {
        q: 'What is the cheapest way to convert currency?',
        a: 'For travel: a multi-currency card from Wise, Revolut, or Niyo (in India) — usually 0.3–0.8% above mid-market. For one-time large transfers: Wise or OFX for retail; SWIFT wire for institutional. Avoid airport kiosks and hotel exchanges — they\'re the worst rates retail customers see.',
      },
      {
        q: 'How often are these rates updated?',
        a: 'Reference rates here are updated periodically and reflect recent market levels. For minute-by-minute trading rates, use a currency-trading platform. For most planning purposes (travel budgets, invoice estimates) the rates here are accurate within ±1%.',
      },
      {
        q: 'Can I use this for invoices and tax filing?',
        a: 'For directional reference, yes. For official filings, no — use the RBI reference rate (India), ECB reference rate (Eurozone), or your tax authority\'s prescribed rate on the transaction date. Tax authorities will not accept retail-converter rates.',
      },
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
    intro:
      'Compound interest is interest that earns interest. A principal grows by the rate each period, and in the next period the new (larger) balance grows by the rate again — so growth accelerates. Albert Einstein supposedly called it the eighth wonder of the world; whether or not he did, the math is the single most important concept in personal finance. This calculator returns the future value of a one-time principal at any rate, tenure, and compounding frequency. For recurring contributions, use the SIP or RD calculators.',
    formula: 'A = P × (1 + r/n)^(n×t)',
    howItWorks:
      "P is the principal, r is the annual rate as a decimal, n is the number of compounding periods per year, and t is the tenure in years. ₹1 lakh at 8% compounded annually for 10 years = 1,00,000 × 1.08^10 = ₹2,15,892. Same money compounded monthly grows to ₹2,21,964 — about ₹6K more, just from frequency. Compounding daily adds another ₹500. The compounding frequency matters less than people think; the rate and the tenure matter much more. Doubling either roughly doubles the gain.",
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
    faqs: [
      {
        q: 'What is the formula for compound interest?',
        a: 'A = P × (1 + r/n)^(n×t), where A is the final amount, P is the principal, r is the annual rate as a decimal, n is the number of compounding periods per year, and t is the tenure in years. The interest earned is A − P.',
      },
      {
        q: 'How is compound interest different from simple interest?',
        a: 'Simple interest is principal × rate × time — the principal earns the same amount each year. Compound interest reinvests the interest each period, so the base grows. Over 10 years at 10% on ₹1L: simple gives ₹2L; compound gives ₹2.59L. Over 30 years the gap is massive — ₹4L vs ₹17.4L.',
      },
      {
        q: "What's the Rule of 72?",
        a: 'A shortcut: years to double ≈ 72 ÷ annual return%. So at 12% your money doubles in ~6 years; at 8% in ~9 years. It\'s accurate within ~3% for rates between 6% and 20%.',
      },
      {
        q: 'Does compounding more frequently meaningfully increase returns?',
        a: 'Less than people expect. Going from yearly to monthly compounding at 10% adds about 0.4 percentage points to the effective annual rate. Going from monthly to daily adds another 0.05. Continuous compounding is the theoretical limit (e^rt) and only marginally better than daily.',
      },
      {
        q: 'Should I assume my returns will compound at 12% forever?',
        a: 'No. Long-run averages are useful starting points (Indian equity ~12%, US equity ~10%, debt 6–8%) but actual outcomes have wide variance. Always run sensitivity analysis at ±3% from your assumed rate before making a financial decision.',
      },
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
    intro:
      "Banks decide how much you can borrow by capping your total EMI (existing plus new) at roughly 40–50% of your take-home pay — what they call FOIR, the fixed obligations to income ratio. This calculator runs that math: enter your monthly income, current EMIs, the rate you've been quoted, and the tenure, and it returns the maximum loan amount your repayment capacity supports. A ₹80,000 take-home with ₹10,000 in existing EMIs typically supports a max EMI of about ₹30,000, which at 8.5% over 20 years funds roughly a ₹34.6 lakh home loan. Move the sliders to see how a longer tenure or a slightly lower rate stretches your eligibility.",
    formula: 'Loan = EMI × ((1 + r)ⁿ − 1) ÷ (r × (1 + r)ⁿ), where Max EMI = 50% × Income − Existing EMIs',
    howItWorks:
      "The calculator caps your maximum new EMI at 50% of monthly income minus any existing EMIs. That cap is converted to a loan amount using the standard EMI formula in reverse, with r as the monthly rate and n as the number of months. For ₹80,000 income, ₹10,000 existing EMIs, 8.5% rate over 20 years: max EMI = ₹40,000 − ₹10,000 = ₹30,000, which supports about ₹34.6 lakh. Drop the rate to 7.5% and eligibility jumps to ₹37.2 lakh — a small rate cut buys you roughly 8% more borrowing room. Banks may apply stricter FOIR caps for self-employed or low-CIBIL applicants.",
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
    faqs: [
      {
        q: 'What FOIR ratio do I need for a home loan in India?',
        a: 'Most banks want total EMI burden (existing plus new) under 50% of monthly take-home. Stay under 40% and approval becomes almost automatic when your CIBIL is above 750. Above 60% and you will be rejected by most mainstream banks — only NBFCs may still consider you, at a premium rate.',
      },
      {
        q: 'How much home loan can I get on a ₹1 lakh monthly salary?',
        a: 'At a 50% FOIR cap and zero existing EMIs, ₹1 lakh take-home supports a max EMI of ₹50,000. At 8.5% over 20 years, that\'s roughly ₹57.7 lakh in eligibility. Your CIBIL score, age, and employer category will decide whether banks offer the maximum or trim it.',
      },
      {
        q: 'Is home-loan eligibility different from personal-loan eligibility?',
        a: 'Yes. Home loans are secured by the property, so banks allow higher FOIR (55–60%) and tenures up to 30 years. Personal loans are unsecured — tenures cap at 5–7 years, FOIR stricter at 40–50%, and rates run 11–24% versus 8–9% for home loans.',
      },
      {
        q: 'How does the bank verify my income?',
        a: 'Salary slips (last 3 months), Form 16 (last 2 years), bank statements (last 6 months), and ITR for the self-employed. Banks compute average net-of-tax monthly income from these — they do not simply use the CTC printed on your offer letter.',
      },
      {
        q: 'How can I increase my loan eligibility?',
        a: 'Three reliable levers — extend the tenure (₹1 lakh income at 20-year tenure = ₹58L eligibility, 30-year = ₹66L), add a co-borrower (their income adds to yours), or improve your CIBIL score above 750 to unlock the bank\'s lowest rate slab and a higher FOIR ceiling.',
      },
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
    intro:
      "This calculator estimates federal income tax using the 2024 US single-filer brackets — useful for ballpark planning if you earn in dollars or want to understand how progressive bracket-based tax systems work. Enter your gross income, subtract eligible deductions (standard deduction is $14,600 for single filers in 2024), and the calculator returns the tax owed, take-home pay, and effective rate. A $75,000 income with $12,000 in deductions yields roughly $8,253 in federal tax — an effective rate of 11%. For Indian salary tax, use our HRA Calculator, PPF Calculator and NPS Calculator alongside this — Indian slabs work differently and require separate inputs.",
    formula: 'Tax = Σ (income in each bracket × bracket rate), Effective Rate = Tax ÷ Income',
    howItWorks:
      "Tax is calculated bracket-by-bracket: each slice of income is taxed at its own marginal rate, not all of it at the top rate. For $75,000 taxable: the first $11,600 is taxed at 10% ($1,160), the next $35,550 at 12% ($4,266), and the remaining $27,850 at 22% ($6,127) — total $11,553 before deductions. With the standard $14,600 deduction, taxable falls to $60,400 and tax drops to about $8,253. Effective rate (tax ÷ gross income) is always lower than your marginal rate, which is the rate on your last dollar.",
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
    faqs: [
      {
        q: 'Is this calculator for US or Indian taxes?',
        a: 'This calculator uses 2024 US federal single-filer brackets. For Indian salary tax, use our HRA Calculator, PPF Calculator and NPS Calculator — together they cover the deductions and slabs Indian filers actually need under the old and new tax regimes.',
      },
      {
        q: 'What\'s the difference between marginal and effective tax rate?',
        a: 'Marginal rate is the rate on your next dollar of income — what bracket your last earned dollar falls into. Effective rate is total tax owed divided by gross income. At $75,000 income, your marginal rate is 22% but your effective rate is only about 11% — because earlier brackets at 10% and 12% drag the average down.',
      },
      {
        q: 'Why is my actual tax bill different?',
        a: 'This shows federal income tax only. Add state income tax (varies 0–13%), FICA (7.65% up to the Social Security cap), and subtract any credits you qualify for. Your effective total tax burden is usually 5–10 percentage points higher than the federal number alone.',
      },
      {
        q: 'Should I take the standard deduction or itemize?',
        a: 'Take the higher of the two. The 2024 standard deduction is $14,600 for single filers, $29,200 for married-filing-jointly. Itemize only if your eligible deductions (mortgage interest, SALT cap $10,000, charity, large medical bills) exceed the standard.',
      },
      {
        q: 'Are tax brackets the same every year?',
        a: 'Bracket boundaries are inflation-indexed each year by the IRS, but the bracket rates themselves change only by legislation. The current 7-bracket structure with 10–37% rates was set by the TCJA in 2017 and remains in force unless Congress changes it.',
      },
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
    intro:
      "Most retirement planners use a simple 25× rule — the corpus you need is roughly 25 times your annual expenses at the year you retire (a 4% safe withdrawal rate, inverted). This calculator inflates your current expenses to the future, computes the corpus, then back-solves the monthly SIP you need to build it. A 30-year-old spending ₹50,000 a month who wants to retire at 60 with the same lifestyle (6% inflation) needs roughly ₹4.6 crore at retirement and would have to invest about ₹15,000/month in equity averaging 12% returns. Move the inflation and return sliders — they dominate the result far more than your retirement age.",
    formula: 'Corpus = Monthly Expense × (1 + i)ⁿ × 12 × 25, then SIP = Corpus ÷ (((1+r)ᵐ − 1)/r) × (1+r)',
    howItWorks:
      "Step one: inflate today's monthly expense forward by your inflation rate (n years of compounding), then multiply by 12 for annual expense, then by 25 for the corpus (4% withdrawal rule). Step two: back-solve the monthly SIP that compounds at your expected return rate to that corpus. ₹50,000/month × (1.06)³⁰ × 12 × 25 = ₹4.6 crore. At 12% equity returns over 360 months, monthly SIP ≈ ₹15,300. Cut the return to 10% and the required SIP jumps to ₹22,500 — return assumption is the biggest sensitivity lever after time horizon.",
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
    faqs: [
      {
        q: 'How much corpus do I need to retire in India?',
        a: 'A rough benchmark — 25× your annual expenses at retirement. For ₹50,000/month today, inflated at 6% over 30 years, the future monthly need is ₹2.87 lakh, annual ₹34.5 lakh, corpus ₹8.6 crore. The 25× rule embeds the classic 4% safe withdrawal rate.',
      },
      {
        q: 'Is the 4% withdrawal rule safe for Indian retirees?',
        a: 'It originated in US 30-year retirement studies. For Indian retirees with 5–6% structural inflation versus US 2–3%, a more conservative 3.0–3.5% withdrawal rate is safer — equivalent to a 28–33× corpus rule.',
      },
      {
        q: 'How does inflation hurt my retirement plan?',
        a: 'At 6% inflation, ₹50,000 of today\'s purchasing power becomes ₹2.87 lakh in 30 years — roughly 5.7× more rupees needed just to maintain lifestyle. Inflation is the silent multiplier — ignoring it leaves most retirement plans 40–60% short of what they actually need.',
      },
      {
        q: 'When should I start investing for retirement?',
        a: 'As early as possible — time matters more than the amount. ₹10,000/month for 35 years at 12% compounds to ~₹6.5 crore. The same ₹10,000/month for 20 years compounds to only ~₹1 crore — a 5-year delay can cost more than tripling your monthly amount.',
      },
      {
        q: 'Should I invest only in equity for retirement?',
        a: 'Mostly equity (70–80%) when you\'re 25 or more years away, gradually shifting to 50/50 or 40/60 equity/debt within 5–10 years of retirement. Pure equity at retirement age is risky — sequence-of-returns risk can force you to sell in a downturn.',
      },
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
    intro:
      "A Recurring Deposit (RD) lets you build a corpus through fixed monthly deposits at a guaranteed interest rate — ideal for goals like a down payment, child's education, or year-end purchase. Indian banks compound RD interest quarterly. Depositing ₹5,000/month for 3 years at 6.5% gives you a maturity value of about ₹1.99 lakh — you put in ₹1.8 lakh, earned ₹19,000 in interest. RDs are not a wealth-building vehicle (returns lag inflation post-tax for most filers), but they're a useful forced-savings habit-builder for short, defined goals. Move the sliders to see how monthly amount and tenure drive maturity.",
    formula: 'Maturity = M × 12 × t × (1 + r/4)^(4t), where M = monthly deposit, r = annual rate, t = years',
    howItWorks:
      "Each monthly deposit earns quarterly-compounded interest from its deposit date to maturity. The calculator uses the simplified standard formula banks publish — maturity is total deposits multiplied by a compounding factor. ₹5,000/month at 6.5% for 3 years: total deposited = ₹5,000 × 36 = ₹1.8 lakh; maturity ≈ ₹1.99 lakh; interest earned ≈ ₹19,000. Push the rate to 7.5% and interest rises to ₹22,200. Push the tenure to 5 years at 6.5% and total deposits rise to ₹3 lakh with maturity around ₹3.55 lakh — interest of ₹55,000.",
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
    faqs: [
      {
        q: 'How is RD interest calculated in India?',
        a: 'Banks use quarterly compounding. The standardised formula is M = P × 12 × t × (1 + r/4)^(4t), where P is monthly deposit, r is annual rate, t is tenure in years. Each deposit earns interest from its deposit date to maturity — the calculator aggregates this into the closed-form formula.',
      },
      {
        q: 'Which is better — RD or SIP?',
        a: 'For 1–3 year goals where you cannot afford a loss, RD wins on certainty. For 5+ year goals where returns matter more than capital protection, equity SIP wins decisively — a 12% equity return crushes a 6.5% RD over a decade, even after STCG/LTCG drag.',
      },
      {
        q: 'Is RD interest taxable?',
        a: 'Yes. Fully taxable at your slab rate as "Income from Other Sources." 10% TDS once total annual RD interest crosses ₹40,000 (₹50,000 senior citizens). Submit Form 15G/15H to avoid TDS if your total income is below the taxable threshold.',
      },
      {
        q: 'What happens if I miss a monthly RD installment?',
        a: 'Banks levy a small penalty (₹1–₹5 per ₹100 of the missed installment). Three to four consecutive misses usually trigger auto-closure with reduced interest. Set up a standing instruction to avoid both.',
      },
      {
        q: 'Can I break my RD before maturity?',
        a: 'Yes, but most banks charge a 0.5–1% rate penalty and pay you the rate that would have applied for the actual tenure held — not the contracted rate. Premature withdrawal in the first 90 days often forfeits all interest.',
      },
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
    intro:
      "This calculator projects the future value of a one-time (lumpsum) mutual fund investment using annual compounding at your expected return rate. Useful for goal planning when you're sitting on a corpus from a bonus, FD maturity, or property sale and want to see how it could grow. ₹1 lakh invested today at 12% expected return compounds to about ₹3.1 lakh in 10 years and ₹9.65 lakh in 20 years — a 2× difference from one extra decade. Move the sliders to compare scenarios. For monthly recurring investments, use the SIP Calculator instead — that uses a different formula.",
    formula: 'Future Value = P × (1 + r)ⁿ, where P = principal, r = annual return rate, n = years',
    howItWorks:
      "The calculator compounds your principal annually at the expected return rate. ₹1,00,000 at 12% for 10 years: 1,00,000 × (1.12)¹⁰ = ₹3,10,585; gain = ₹2,10,585. Same amount at 15% for the same period: ₹4,04,556. Same amount at 12% but for 15 years: ₹5,47,357. Returns matter linearly to gain; time matters exponentially — that's why staying invested through bad years (rather than chasing the perfect entry) is the single biggest decision a long-term investor makes.",
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
    faqs: [
      {
        q: 'What return should I assume for Indian mutual funds?',
        a: 'For planning: 10–12% for large-cap equity, 12–15% for diversified equity, 6–8% for debt, 9–11% for hybrid funds. These are long-run averages — short-term returns can swing wildly. Always plan for the conservative end of the range.',
      },
      {
        q: 'How is mutual fund tax calculated in India?',
        a: 'Equity funds — STCG (held under 1 year) is taxed at 20%; LTCG (held over 1 year) is taxed at 12.5% above ₹1.25L exemption per year. Debt funds — all gains taxed at slab rate regardless of holding period (rule changed in April 2023).',
      },
      {
        q: 'Is lumpsum or SIP better for mutual funds?',
        a: 'SIP wins for emotional discipline and rupee-cost averaging — you avoid the timing-the-market trap. Lumpsum wins mathematically over long horizons if markets are net-up over the period — most studies show 60–70% of long-running 10-year lumpsum vs SIP comparisons favour lumpsum. Best practice — invest lumpsum in tranches over 3–6 months (STP) if the amount is large.',
      },
      {
        q: 'How long should I hold a mutual fund?',
        a: 'For equity, at least 5–7 years to ride out one full market cycle. Equity returns in 1-year windows can swing from −30% to +60%; over 7+ years, the dispersion narrows to roughly 8–18%. Debt funds work over any horizon.',
      },
      {
        q: 'What is direct vs regular mutual fund?',
        a: 'Direct funds skip the distributor commission — expense ratio is typically 0.5–1% lower than the regular variant. Over 20 years, that 1% compounds to a 22% larger corpus. Always buy direct if you don\'t need an advisor; use a SEBI-registered RIA if you do.',
      },
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
    intro:
      "Quick math for any equity trade — enter buy price, sell price, and quantity and you get the absolute gain or loss, percentage return, and total capital that was invested. Buy 100 shares of an Indian stock at ₹120 each, sell at ₹148: gain is ₹2,800, return is 23.3%, invested capital was ₹12,000. This is the gross number before brokerage, STT, GST, and capital gains tax — for net realised returns, take a 1.5–2% haircut for short trades and apply the right STCG/LTCG rate for the holding period. Move the sliders to test trade ideas before pulling the trigger.",
    formula: 'P&L = (Sell − Buy) × Quantity, Return % = ((Sell − Buy) ÷ Buy) × 100',
    howItWorks:
      "Profit equals (sell price minus buy price) times quantity — pure arithmetic with no time component. Return percentage equals price difference divided by buy price, times 100. ₹120 buy, ₹148 sell, 100 shares: P&L = (148 − 120) × 100 = ₹2,800; return = (28 ÷ 120) × 100 = 23.3%. Same trade with a price drop to ₹105 instead: P&L = (105 − 120) × 100 = −₹1,500, return = −12.5%. The numbers are gross — your broker statement will show a lower net after brokerage, STT (0.025% on sell), exchange charges, GST, and capital gains tax.",
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
    faqs: [
      {
        q: 'How is stock profit/loss calculated?',
        a: 'P&L = (Sell price − Buy price) × Quantity. A buy at ₹120, sell at ₹148 on 100 shares yields ₹2,800 profit. Return percentage is price change divided by buy price — 23.3% in this example. Both numbers are gross of trading costs and tax.',
      },
      {
        q: 'What capital gains tax do I pay on Indian shares?',
        a: 'Short-term (held under 1 year) — 20% on the gain. Long-term (over 1 year) — 12.5% on gains above ₹1.25 lakh per financial year, exempt below. This is for listed equity; unlisted/foreign shares attract different rates and surcharges.',
      },
      {
        q: 'Why is my net P&L lower than the calculator shows?',
        a: 'Brokerage, STT, GST, exchange fees, and capital gains tax all reduce the gross number. For a small intraday trade, those drag the net result down by 0.3–0.5%. For larger delivery trades, the tax piece dominates — STCG 20% versus LTCG 12.5% can mean meaningful net differences on the same gross gain.',
      },
      {
        q: 'How do bonuses and splits affect my cost basis?',
        a: 'A 1:1 bonus doubles your share count and halves the effective buy price (₹200 cost basis on 100 shares becomes ₹100 cost basis on 200 shares). A 1:5 split divides price by 5 and multiplies quantity by 5. Adjust the buy price input accordingly.',
      },
      {
        q: 'What is the breakeven point for a stock trade?',
        a: 'Breakeven occurs when sell price equals buy price plus all-in trading costs (roughly 1.5–2% for delivery trades). For ₹100 buy, breakeven is around ₹102. Below that, you\'re booking a net loss even if the gross calculator shows tiny profit.',
      },
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
    intro:
      "Dividend yield is the annual cash return a stock pays you, expressed as a percentage of its current price. It's the metric income investors use to compare cash-flow-generating stocks against bonds, FDs, and REITs. A stock priced at ₹500 paying ₹25 per share in annual dividends has a 5% yield — at 200 shares, that's ₹5,000 a year in passive income. Indian PSU banks, utilities, and certain FMCG names typically yield 3–6%. Move the sliders to model your portfolio's annual cash flow, but remember — high yield can signal trouble as much as it signals income, so always check whether dividends are sustainable.",
    formula: 'Yield = (Annual Dividend per Share ÷ Share Price) × 100, Income = Dividend × Shares',
    howItWorks:
      "Yield equals annual dividend per share divided by current share price, multiplied by 100. ₹25 dividend on a ₹500 stock: 25 ÷ 500 × 100 = 5% yield. Annual income equals dividend per share times the number of shares you hold — at 200 shares, that's ₹5,000 a year. Yield moves inversely with price — if the stock drops to ₹400, the yield jumps to 6.25% (assuming dividends stay constant). That's why investors track yield-on-cost (yield based on your buy price, not current) for held positions.",
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
    faqs: [
      {
        q: 'What is a good dividend yield in India?',
        a: 'For Indian large-caps, 2–5% is a respectable range. Anything above 7–8% deserves caution — check whether the company is in trouble or just out of favour. PSU utilities, REITs, and select PSU banks consistently yield in the 5–7% band.',
      },
      {
        q: 'How is dividend taxed in India?',
        a: 'Since FY 2020–21, dividends are taxable at your slab rate as "Income from Other Sources" (DDT was abolished). 10% TDS applies once annual dividend from a single company exceeds ₹5,000. Submit Form 15G/H if your total income is below the taxable threshold.',
      },
      {
        q: 'Is dividend yield better than capital gains?',
        a: 'For income-focused investors over 60 — yes, dividends provide regular cash flow without selling. For wealth builders under 50 — capital gains usually dominate, since Indian large-cap equity has averaged 10–13% total returns versus 1.5–3% yields. Best — combine both with high-growth and high-yield names.',
      },
      {
        q: 'What is dividend payout ratio?',
        a: 'Payout ratio = dividends ÷ net profit. A 50% ratio means the company pays out half its profit and retains half. Below 30% is conservative (lots of reinvestment runway). Above 80% is a yellow flag — limited room for dividend hikes and vulnerable in a profit downturn.',
      },
      {
        q: 'What is yield-on-cost?',
        a: 'Yield based on your buy price, not current price. If you bought a stock at ₹200 that\'s now ₹500 and pays ₹25/share, your current yield is 5% but yield-on-cost is 12.5%. It\'s a useful metric for tracking dividend growth on long-held positions.',
      },
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
    intro:
      "Credit card debt is the most expensive consumer borrowing in India — most cards charge 36–48% annualised interest once you roll over a balance. This calculator shows exactly how badly that compounds. A ₹50,000 balance at 42% APR with ₹2,000 monthly payments takes 41 months to clear and costs ₹32,500 in interest — nearly the original balance again. Drop the monthly payment to the bare minimum 5% (₹2,500 declining), and the payoff stretches past 7 years. Move the payment slider to see the dramatic non-linear effect — small increases save you years and lakhs.",
    formula: 'Months = log(P ÷ (P − B × r)) ÷ log(1 + r), where r = APR ÷ 12, B = balance, P = payment',
    howItWorks:
      "The calculator models credit card debt like a loan with fixed monthly payments. Each month, interest accrues at APR ÷ 12 on the remaining balance, your payment first covers that interest, and only the leftover reduces principal. ₹50,000 balance at 42% APR, ₹2,000/month: first month interest = 50,000 × (42÷12÷100) = ₹1,750; principal reduction = ₹2,000 − ₹1,750 = just ₹250. As the balance falls, more of each payment hits principal. Total: 41 months, ₹32,500 paid in interest. Double the payment to ₹4,000 and you clear it in 16 months with only ₹11,000 in interest.",
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
    faqs: [
      {
        q: 'Why is credit card interest so high in India?',
        a: 'RBI deregulated credit card rates and banks price them as unsecured short-term debt. Monthly rates of 3.0–3.5% translate to 36–48% APR. The high rate compensates the issuer for default risk, plus the convenience of revolving credit. Cards are not designed to be borrowed against — they\'re designed to be paid off every month.',
      },
      {
        q: 'How do I avoid paying interest on a credit card?',
        a: 'Pay the full statement balance by the due date every month — use the interest-free grace period (typically 18–55 days from purchase). If you carry a balance into the next cycle, interest is retroactively charged from the original transaction date, not from the due date.',
      },
      {
        q: 'Is paying just the minimum due bad?',
        a: 'Yes — extremely. The 5% minimum is engineered so you pay barely more than the monthly interest, stretching the balance for years and paying back the original amount 2–3× over in interest. Pay at least 25–30% of the bill, or convert big-ticket purchases to EMI at 13–18% instead.',
      },
      {
        q: 'What is the difference between APR and effective rate?',
        a: 'APR is the annual rate quoted by the bank (e.g. 36%). Because interest compounds monthly, the effective annual rate is slightly higher — 42.6% for a 36% APR. Most Indian banks quote the simple APR; the effective rate is what actually hits your wallet.',
      },
      {
        q: 'Should I convert credit card debt to EMI or personal loan?',
        a: 'A personal loan at 11–14% is meaningfully cheaper than the 36–48% you pay rolling a card balance. Most issuers also offer in-card EMI conversion at 13–18% with a one-time processing fee. Either option saves significant interest if you can\'t clear the balance in 2–3 months.',
      },
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
    intro:
      "If you're juggling a personal loan, education loan, or any single debt, this calculator answers two questions: how many months until you're debt-free at your current payment, and how much interest you'll pay in total. ₹5 lakh personal loan at 14% with ₹10,000 monthly payments takes 73 months (just over 6 years) to clear and costs ₹2.32 lakh in interest. Push the monthly payment to ₹15,000 and you finish in 42 months with ₹1.31 lakh interest — a ₹1 lakh saving for 31 months less in debt. Use this to negotiate with yourself before deciding to take on new EMIs.",
    formula: 'Months = log(P ÷ (P − B × r)) ÷ log(1 + r), where r = annual rate ÷ 12',
    howItWorks:
      "The calculator treats the debt like an amortising loan. Each month, interest at (annual rate ÷ 12) accrues on the outstanding principal, your payment covers that interest first, and the remainder reduces principal. ₹5,00,000 at 14% with ₹10,000 payment: monthly interest in month 1 = 500000 × (14÷12÷100) = ₹5,833; principal reduction = 10,000 − 5,833 = ₹4,167. As principal falls, more of each payment hits principal. The closed-form formula in the calculator skips the month-by-month and computes total months directly. Total interest = monthly payment × months − original debt.",
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
    faqs: [
      {
        q: 'Should I prepay my loan or invest the extra money?',
        a: 'Compare the loan\'s effective post-tax rate against your expected investment return. A home loan at 8.5% gives you a ~5.9% post-tax cost (after Sec 24(b) deduction at 30% slab). If your equity returns 12% pre-tax (~10.5% post-LTCG), invest. For personal/credit card debt at 14–48%, always prepay — no investment beats that hurdle.',
      },
      {
        q: 'Is there a prepayment penalty on loans in India?',
        a: 'RBI prohibits prepayment penalties on floating-rate retail loans. Fixed-rate loans (some personal loans, car loans) may charge 2–4% of the prepaid amount. Always check the loan agreement before prepaying.',
      },
      {
        q: 'What is the avalanche vs snowball method?',
        a: 'Avalanche — pay minimums on all debts, then put extra cash against the highest-rate debt. Saves the most money. Snowball — pay minimums on all, then put extra against the smallest balance. Wins on motivation (you clear debts faster psychologically). Avalanche is mathematically optimal; snowball is behaviourally easier.',
      },
      {
        q: 'How much should my total EMI burden be?',
        a: 'Keep total EMI under 40% of monthly take-home pay. Above 50% is danger zone — single income shock (job loss, medical bill) can push you into default. Banks cap home-loan eligibility at ~50% FOIR for the same reason.',
      },
      {
        q: 'Can I get a tax deduction on loan interest?',
        a: 'Yes for specific loan types: home loan interest up to ₹2 lakh/year (Section 24(b)), education loan interest with no limit (Section 80E), housing loan principal up to ₹1.5 lakh under 80C. Personal loan and car loan interest are not deductible unless used for business purposes.',
      },
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
    intro:
      "Net worth is the simplest possible financial-health check — add up everything you own (assets), subtract everything you owe (liabilities), and you get a single number that tracks your wealth-building progress year over year. ₹50 lakh in assets (₹30L flat + ₹15L investments + ₹5L cash) minus ₹25 lakh in liabilities (₹20L home loan + ₹3L car loan + ₹2L credit-card debt) = ₹25 lakh net worth and a 2.0 asset/liability ratio. Track it once a year on a fixed date (April 1 is convenient) — the trajectory matters far more than the absolute number on any single day.",
    formula: 'Net Worth = Total Assets − Total Liabilities, Ratio = Assets ÷ Liabilities',
    howItWorks:
      "Add up the current market value of everything you own — bank accounts, mutual funds and stocks at today's NAV, EPF/PPF/NPS balance, gold at current price, property at realistic resale value (not purchase price), vehicle at depreciated resale. Then sum up everything you owe — outstanding home loan, car loan, personal loan, education loan, credit card balance, unpaid bills. Net worth is the difference. The asset/liability ratio tells you leverage — a ratio above 2.0 means assets twice your debt, generally healthy. Below 1.0 means you're net-negative — debts exceed assets, an early-career or post-home-purchase reality for many.",
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
    faqs: [
      {
        q: 'What counts as an asset for net worth?',
        a: 'Cash and bank balances, mutual funds and stocks (at current NAV/market price), EPF/PPF/NPS balance, gold and jewellery (at current price), real estate (at realistic resale value), vehicles (at depreciated resale value), and any business equity. Don\'t include depreciating personal items like furniture or electronics unless they\'re large enough to materially affect the total.',
      },
      {
        q: 'What counts as a liability?',
        a: 'All outstanding loans — home, car, personal, education, credit card balance not paid in full — plus unpaid taxes, bills, and any guarantees you\'ve given. Don\'t include future EMIs you\'ll pay — only the current outstanding principal counts as today\'s liability.',
      },
      {
        q: 'Should I include my home in net worth?',
        a: 'Yes — at realistic resale value, with the outstanding home loan as the liability. The "equity in home" (asset value − loan outstanding) is your net contribution. Don\'t list both the home and the EMIs you\'ve paid — that double-counts.',
      },
      {
        q: 'What is a good net worth for my age in India?',
        a: 'Rough benchmark — your net worth should roughly equal your annual gross income at 30, 3× at 40, 6× at 50, and 10–12× at 60 if you want to retire comfortably. These are aggressive targets; most Indian middle-class families hit half these multiples and still retire fine with a paid-off home and EPF/NPS.',
      },
      {
        q: 'How often should I track net worth?',
        a: 'Annually is enough — quarterly if you\'re actively chasing a goal (debt-free, FIRE, retirement). Pick a fixed date (April 1 aligns with the financial year) and use the same valuation method each time. Daily tracking creates anxiety without changing anything.',
      },
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
    intro:
      "Convert your annual salary into hourly, daily, weekly, and monthly rates. ₹12 lakh annual at 40 hours/week × 50 weeks = ₹600/hour, ₹4,800/day, ₹24,000/week, ₹1 lakh/month. Useful for negotiating freelance/contract work, comparing job offers between full-time and contract roles, or just understanding what your time is actually worth. Indian salaried employees often discover they earn less per hour than expected once unpaid overtime is included.",
    formula: 'Hourly = Annual ÷ (Hours/Week × Weeks/Year) · Daily = Hourly × 8 · Monthly = Annual ÷ 12',
    howItWorks:
      "₹12,00,000 salary / (40 hrs × 50 weeks) = ₹12,00,000 / 2,000 hours = ₹600/hour. Daily (8 hours) = ₹4,800. Weekly (40 hrs) = ₹24,000. Monthly = annual ÷ 12 = ₹1 lakh. For freelance pricing, multiply your salaried hourly rate by 2.5–3× to cover benefits, taxes, downtime, and self-employment costs — so a ₹600/hr equivalent should bill ₹1,500–₹1,800/hr as a freelancer.",
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
    faqs: [
      {
        q: 'How do I convert my Indian salary to hourly rate?',
        a: 'Annual ÷ (hours per week × weeks per year). ₹12 lakh ÷ (40 × 50 = 2000) = ₹600/hour. Most Indian full-time jobs are nominally 40-hour weeks for 50 working weeks (2 weeks vacation/holidays).',
      },
      {
        q: 'What should I charge as a freelancer?',
        a: '2.5–3× your equivalent salaried hourly rate. If you\'d earn ₹600/hour as an employee, charge ₹1,500–₹1,800/hour as a freelancer. The multiplier covers self-paid taxes (PT, GST), no paid leave, no PF/insurance, and admin overhead.',
      },
      {
        q: 'Why is freelance rate higher than salaried equivalent?',
        a: 'Salaried benefits hidden value: paid leave (8–10% of salary), employer PF (12%), health insurance (₹15K–₹30K/year), bonuses, ESOPs, and zero billing/admin overhead. Freelancers pay all of these from their billing rate. The 2.5–3× multiplier roughly covers this.',
      },
      {
        q: 'Does this calculator include taxes?',
        a: 'No — it computes gross rates. For post-tax hourly, multiply by (1 − effective tax rate). For a ₹20L earner at ~20% effective rate, ₹1,000/hour gross becomes ₹800/hour post-tax.',
      },
      {
        q: 'How does part-time compare to full-time?',
        a: 'Part-time at the same hourly rate earns proportionally less but often has better hourly value (no commute, no unpaid OT, freedom). Full-time has benefits (PF, insurance, ESOPs) part-time usually lacks. Compare total annual comp not just hourly.',
      },
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
    intro:
      'A tip calculator handles the dinner-out math: take the pre-tax bill, multiply by the tip percentage, add it back to the total, and split among the diners. This calculator does all three. The defaults assume tipping is on the pre-tax amount (the standard convention) and that the split is equal. Tipping norms vary widely by country — 18–22% in the US, 10% in much of Europe, often built into service charge in India and Japan. The formula is the same; just dial the % to match where you are.',
    formula: 'tip = bill × (tip% ÷ 100) · total = bill + tip · per-person = total ÷ people',
    howItWorks:
      "An $80 bill at 18% tip is $80 × 0.18 = $14.40 tip, $94.40 total, and split between two people gives $47.20 each. For service charges already added (common in India, UK), tip on the pre-service-charge subtotal — don't double-pay. For very large groups (8+), restaurants often auto-add gratuity — check the bill before tipping again.",
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
    faqs: [
      {
        q: 'How much should I tip in the US?',
        a: 'For sit-down restaurants, 18–22% on the pre-tax subtotal is the current norm. 20% is the safe default. For exceptional service tip 25%; for poor service the etiquette is to leave 15% and speak to the manager — not to leave nothing.',
      },
      {
        q: 'Should I tip on tax?',
        a: 'No, by convention you tip on the pre-tax subtotal. In practice the difference is small (~8% of the tip amount) and many people just tip on the total. Both are accepted; tipping on subtotal is technically correct.',
      },
      {
        q: 'How do I tip when paying with a credit card?',
        a: 'Either write the tip on the slip or hand cash separately to the server. Cash tips usually reach the server faster and avoid card-processing deductions some restaurants take. Either is fine.',
      },
      {
        q: 'Do I tip on a service charge?',
        a: 'Generally no — the service charge is the tip. If the service was exceptional and you want to add more, that\'s optional. Always check the bill before tipping; "service charge included" lines are easy to miss.',
      },
      {
        q: 'How do I split a bill unevenly when one person ordered more?',
        a: 'Use a per-item bill splitter — list each item, assign to the person who ordered it, add proportional tax and tip. Apps like Splitwise, Tab, or even a quick spreadsheet handle this. This calculator only does equal splits.',
      },
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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
