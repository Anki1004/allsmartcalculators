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
    longDescription: 'Whether you\'re sending money abroad, comparing international prices, or planning a trip, knowing the exact exchange rate matters. This converter uses real-world reference rates for 30 currencies — from major pairs like USD/EUR to emerging markets like NGN, BDT, and PKR. Enter your amount, pick your currencies, and get the converted value plus the inverse rate instantly.',
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
    formula: 'Converted = Amount ÷ FromRate × ToRate',
    faqs: [
      { q: 'Are these live exchange rates?', a: 'These are reference rates updated periodically — not live market quotes. For time-sensitive transfers, cross-check with your bank or a live forex feed. Banks apply a spread on top of the mid-market rate shown here, so the rate you actually get will typically be slightly worse.' },
      { q: 'Why is my bank\'s rate different?', a: 'Banks and exchange services apply a markup (their profit margin) over the mid-market rate shown here. The difference can be 1-5% depending on the currency and institution. For large transfers, comparing rates across services is worth the effort.' },
      { q: 'Which currencies are supported?', a: '30 major world currencies covering the Americas, Europe, Asia, the Middle East, and Africa — including USD, EUR, GBP, JPY, INR, CNY, and 24 others.' },
    ],
  },
  {
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    category: 'finance',
    icon: 'Landmark',
    description: 'High-precision amortization for loans & mortgages.',
    longDescription: 'Understanding exactly how much you\'ll pay each month — and over the life of a loan — is the first step in making a smart borrowing decision. This EMI calculator breaks down your monthly installment, total interest paid, and total repayment amount. Adjusting the tenure slider reveals the key trade-off: shorter loans mean higher monthly payments but dramatically less total interest paid over time.',
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
    formula: 'EMI = P × r × (1+r)^n / ((1+r)^n - 1)',
    faqs: [
      { q: 'What is EMI?', a: 'EMI stands for Equated Monthly Installment — a fixed amount paid to your lender every month until the loan is repaid. In the early months most of the payment covers interest; as the principal reduces, the interest portion shrinks and the principal portion grows.' },
      { q: 'How does tenure affect the total cost?', a: 'Longer tenure reduces your monthly EMI but increases total interest paid significantly. For example, a 20-year loan can cost nearly double the interest of a 10-year loan at the same rate. Use the slider to see the exact trade-off for your numbers.' },
      { q: 'Does EMI change if I make prepayments?', a: 'Prepayments reduce your outstanding principal, which can either shorten your tenure or lower future EMIs depending on your lender\'s policy. This calculator shows the original schedule — ask your lender about prepayment options and any applicable fees.' },
      { q: 'What\'s the difference between flat rate and reducing balance interest?', a: 'This calculator uses the standard reducing balance method used by most banks. Flat rate loans charge interest on the full original principal throughout — their effective interest rate is nearly double the quoted rate. Always ask which method a lender uses.' },
    ],
  },
  {
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    category: 'finance',
    icon: 'TrendingUp',
    description: 'Project returns on systematic investment plans.',
    longDescription: 'A SIP (Systematic Investment Plan) turns market volatility from a threat into an advantage. By investing a fixed amount every month regardless of market levels, you naturally buy more units when prices are low and fewer when they\'re high — called rupee-cost averaging. Over 10-15 years, this discipline consistently outperforms lump-sum timing strategies for most everyday investors. See exactly how your monthly contributions grow with this calculator.',
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
    formula: 'FV = P × [((1 + r)^n - 1) / r] × (1 + r)',
    faqs: [
      { q: 'Is 12% p.a. a realistic return for equity SIPs?', a: 'Equity mutual funds in India have historically delivered 12-15% CAGR over 15+ year periods, though returns vary and past performance doesn\'t guarantee future results. Use 10-12% for conservative projections and 14-15% for optimistic ones.' },
      { q: 'Should I stop my SIP during a market crash?', a: 'This is actually the worst time to stop. During a crash, your fixed monthly amount buys more units at lower prices. Investors who paused SIPs during downturns and restarted later consistently saw worse outcomes than those who stayed in throughout.' },
      { q: 'SIP vs lump sum — which is better?', a: 'Statistically, lump sum beats SIP about two-thirds of the time in rising markets because money invested earlier has more time to compound. But SIP wins behaviorally — it removes the temptation to time the market and works automatically with your monthly income.' },
      { q: 'What is the minimum SIP amount?', a: 'Most mutual funds allow SIPs from ₹500/month. The amount matters less than the habit — a small SIP started today beats a larger one planned for someday.' },
    ],
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'finance',
    icon: 'Percent',
    description: 'See how your money grows with compounding.',
    longDescription: 'The real power of compound interest only becomes obvious over long time horizons. $10,000 at 8% for 30 years doesn\'t give you $34,000 — it gives you $100,627. That\'s not a typo: the last 10 years of growth alone produce more than the first 20 combined. This calculator also lets you adjust compounding frequency — daily vs. monthly vs. annually — so you can see exactly how that affects your final number.',
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
    formula: 'A = P × (1 + r/n)^(n×t)',
    faqs: [
      { q: 'What is the difference between simple and compound interest?', a: 'Simple interest pays returns only on your original principal — 8% on $10,000 is always $800/year. Compound interest earns returns on both principal and accumulated interest, so returns grow exponentially. Over 30 years, $10,000 at 8% simple interest becomes $34,000; at 8% compound interest it becomes over $100,000.' },
      { q: 'Does compounding frequency really make a difference?', a: 'For typical savings rates, the difference between monthly and daily compounding is small (less than 0.1%). The frequency matters more at high interest rates or over very long periods. The biggest lever is always the rate and the time horizon, not the frequency.' },
      { q: 'What is the Rule of 72?', a: 'Divide 72 by your interest rate to find roughly how many years it takes to double your money. At 8%, your money doubles every 9 years. At 12%, every 6 years. This mental shortcut works for any compounding scenario and is useful for quick estimates.' },
      { q: 'How do I account for inflation?', a: 'Subtract the inflation rate from the nominal rate to get your real return. At 8% nominal with 3% inflation, your real return is approximately 5%. For long-term planning, always think in real terms — the calculator shows nominal amounts, but purchasing power grows at the real rate.' },
    ],
  },
  {
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    category: 'finance',
    icon: 'Home',
    description: 'Calculate monthly mortgage payments with taxes.',
    longDescription: 'Buying a home is probably the largest financial commitment most people ever make, yet surprisingly few buyers understand what they\'re actually agreeing to. This calculator shows your monthly principal and interest payment, the total interest you\'ll pay over the life of the loan (often more than the original purchase price), and how changing the down payment or tenure shifts those numbers dramatically.',
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
    formula: 'PMT = L × [r × (1+r)^n] / [(1+r)^n - 1]',
    faqs: [
      { q: 'Is the monthly payment shown my total housing cost?', a: 'No — this shows principal and interest only. Your actual total housing cost also includes property taxes (typically 1-1.5% of home value annually), homeowner\'s insurance (~$1,500-2,500/year), PMI if your down payment is under 20%, HOA fees if applicable, and maintenance costs. Budget for total costs 30-40% higher than the P&I figure.' },
      { q: 'What\'s the real difference between a 15 and 30-year mortgage?', a: 'On a $360,000 loan at 6.5%, a 30-year mortgage costs about $459,000 in interest vs. $204,000 for a 15-year. The 15-year monthly payment is around $860 higher, but you save $255,000 in interest and own the home outright 15 years sooner.' },
      { q: 'How much down payment do I really need?', a: '20% is the threshold that avoids Private Mortgage Insurance (PMI), which adds 0.5-1.5% of the loan value per year to your costs. But many buyers start with 5-10% down, especially first-time buyers. Run the numbers — sometimes the math favors investing surplus cash rather than a larger down payment.' },
      { q: 'Should I pay points to lower my interest rate?', a: 'One point = 1% of the loan value, typically buys a 0.25% rate reduction. On a $360,000 loan, one point costs $3,600 and saves roughly $60/month. Break-even: 5 years. If you plan to stay longer, buying points makes financial sense.' },
    ],
  },
  {
    slug: 'loan-eligibility-calculator',
    name: 'Loan Eligibility Calculator',
    category: 'finance',
    icon: 'BadgeCheck',
    description: 'Find out how much loan you can qualify for.',
    longDescription: 'Before walking into a bank, knowing your own approximate eligibility number changes the conversation. This calculator applies the standard 50% FOIR (Fixed Obligation to Income Ratio) rule used by most lenders — your total EMIs shouldn\'t exceed half your monthly take-home pay. Understanding this in advance means you negotiate from knowledge, not guesswork.',
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
    faqs: [
      { q: 'What is FOIR and why does it matter?', a: 'FOIR (Fixed Obligation to Income Ratio) measures your existing loan obligations as a percentage of monthly income. Most banks cap this at 40-50%. If you already carry car loan or personal loan EMIs, those reduce how much room remains for a new loan.' },
      { q: 'How can I increase my loan eligibility?', a: 'Three proven approaches: (1) extend the tenure — a longer loan period lowers the required EMI per rupee of principal; (2) close existing small loans before applying to reduce FOIR; (3) add a co-applicant with independent income — both incomes are combined for eligibility.' },
      { q: 'Is this calculator\'s number what the bank will actually offer?', a: 'It\'s a realistic estimate, but banks also factor in your credit score, age, employer profile, job stability, and existing assets. A CIBIL score above 750 unlocks better rates and higher eligible amounts. Below 650, some banks may decline entirely.' },
    ],
  },
  {
    slug: 'income-tax-calculator',
    name: 'Income Tax Calculator',
    category: 'finance',
    icon: 'Receipt',
    description: 'Estimate your annual income tax liability.',
    longDescription: 'Tax planning isn\'t just for the wealthy — maximizing 401(k) contributions, timing capital gains, and understanding your effective rate can save thousands annually. This calculator uses simplified 2024 US federal brackets (single filer) to estimate your tax liability and effective rate. Use it as a starting point for planning; consult a CPA for your specific situation.',
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
    faqs: [
      { q: 'What\'s the difference between marginal and effective tax rate?', a: 'Your marginal rate is what you pay on the last dollar earned — often 22-24% for middle earners. Your effective rate is what you actually pay as a percentage of total income — always lower, because lower income brackets are taxed at lower rates. The effective rate is what matters for budgeting.' },
      { q: 'What is the 2024 standard deduction?', a: 'For 2024, the standard deduction is $14,600 for single filers and $29,200 for married filing jointly. If your itemized deductions (mortgage interest, state taxes, charitable donations) exceed this, itemize. Otherwise, the standard deduction is easier and equally valid.' },
      { q: 'Does this calculator include state income tax?', a: 'No — this covers federal taxes only. State income tax ranges from 0% in states like Texas and Florida to 13.3% in California. Add your state\'s rate to get your total tax burden.' },
      { q: 'How do 401(k) contributions affect my taxes?', a: 'Traditional 401(k) contributions reduce your taxable income dollar for dollar. Contributing $10,000 reduces taxable income by $10,000 — at the 22% bracket, that\'s $2,200 in immediate tax savings, plus decades of tax-deferred growth.' },
    ],
  },
  {
    slug: 'retirement-calculator',
    name: 'Retirement Calculator',
    category: 'finance',
    icon: 'PiggyBank',
    description: 'Plan how much you need to retire comfortably.',
    longDescription: 'The 4% withdrawal rule — the foundation of this calculator — says you can withdraw 4% of your retirement portfolio each year without running out of money over a 30-year retirement. So if you need $60,000/year in today\'s dollars, you need roughly $1.5 million saved. The earlier you start, the more compound growth does the heavy lifting for you. This calculator works backwards from your retirement goal to tell you exactly how much to save each month.',
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
    faqs: [
      { q: 'What is the 4% rule?', a: 'The 4% rule (from the Trinity Study) says you can withdraw 4% of your portfolio in year one of retirement, then adjust for inflation each year, with a high probability of the portfolio lasting 30+ years. So your target corpus = Annual Retirement Spending × 25.' },
      { q: 'What if I\'m starting retirement savings late?', a: 'The math gets harder but it\'s not impossible. Options include: working a few extra years (each additional year lets the corpus compound longer while you\'re not withdrawing), increasing savings rate, retiring in a lower-cost area, or accepting some part-time income in early retirement. Don\'t let perfect be the enemy of good — start now.' },
      { q: 'Should I factor in Social Security?', a: 'Yes. The average US Social Security benefit in 2025 is about $1,900/month. Subtract your expected SS income from your monthly retirement expenses before calculating the corpus. This can meaningfully reduce your target — the gap might be $3,500/month instead of $5,000, changing your corpus need from $1.5M to $1.05M.' },
      { q: 'Why does this calculator show such different numbers when I change the return rate slightly?', a: 'Compound growth over 20-30 years is extremely sensitive to small rate differences. A 1% higher return over 30 years on a $1,000/month investment produces about $400,000 more in final corpus. This is why low-cost index funds (avoiding 1-2% management fees) are so powerful for retirement investing.' },
    ],
  },
  {
    slug: 'fd-calculator',
    name: 'Fixed Deposit Calculator',
    category: 'finance',
    icon: 'Lock',
    description: 'Calculate maturity value of fixed deposits.',
    longDescription: 'Fixed deposits offer guaranteed, predictable returns with virtually zero risk — making them one of the most popular savings instruments worldwide. This calculator shows exactly how much your deposit will grow to at maturity, including both the accumulated interest and the final amount, using quarterly compounding (standard for most FD products).',
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
    formula: 'Maturity = P × (1 + r/4)^(4×t)',
    faqs: [
      { q: 'Are FD returns taxable?', a: 'Yes. Interest earned on fixed deposits is taxed as ordinary income in most countries. In India, banks deduct TDS (Tax Deducted at Source) at 10% when interest exceeds ₹40,000/year. In the US, FD interest is reported as income and taxed at your marginal rate.' },
      { q: 'Can I withdraw an FD before maturity?', a: 'Most FDs allow premature withdrawal with a penalty — typically a 0.5-1% reduction in the applicable interest rate. Some banks also have a lock-in period. Check the specific terms before opening, especially for longer-tenure FDs.' },
      { q: 'FD vs debt mutual funds — which is better?', a: 'FDs offer guaranteed returns with no risk. Debt mutual funds can offer higher post-tax returns (through indexation benefits in some jurisdictions) but come with interest rate risk and credit risk. For amounts you can\'t afford to lose, FDs are appropriate. For longer horizons with moderate risk tolerance, debt funds often make more sense.' },
    ],
  },
  {
    slug: 'rd-calculator',
    name: 'Recurring Deposit Calculator',
    category: 'finance',
    icon: 'Calendar',
    description: 'Calculate returns on monthly recurring deposits.',
    longDescription: 'A Recurring Deposit (RD) is the savings habit in financial form — commit to depositing a fixed amount every month and watch it grow with compound interest. Unlike FDs, you don\'t need a lump sum to start. RDs are ideal for people building an emergency fund or saving toward a specific goal, combining the discipline of a forced savings plan with guaranteed bank-backed returns.',
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
    faqs: [
      { q: 'What happens if I miss an RD installment?', a: 'Missing an RD installment typically incurs a small penalty per missed payment (usually ₹1-2 per ₹100 per month). Most banks allow a grace period. Chronic missed payments may result in premature closure of the RD at a penalized rate.' },
      { q: 'Is RD interest compounded quarterly?', a: 'Yes — most bank RDs compound interest quarterly. Each monthly deposit earns compound interest from the month of deposit until maturity. This calculator applies quarterly compounding on the aggregate deposits.' },
      { q: 'RD vs SIP for short-term goals?', a: 'For goals under 3 years, RD is generally preferable to equity SIP because the outcome is guaranteed. Equity markets can be down significantly in any given 1-3 year window. Use RD for predictable goals (vacation, down payment) and SIP for long-term wealth building.' },
    ],
  },
  {
    slug: 'mutual-fund-returns',
    name: 'Mutual Fund Returns',
    category: 'finance',
    icon: 'LineChart',
    description: 'Calculate returns on lump sum MF investments.',
    longDescription: 'Lump sum mutual fund investing is straightforward in principle: invest once, let the market compound over years. This calculator shows what a one-time investment grows to over your chosen time horizon at a given annual return rate. Try different scenarios — the result reinforces why staying invested for the long term consistently beats trying to time the market.',
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
    formula: 'FV = P × (1 + r)^t',
    faqs: [
      { q: 'What return rate should I assume for equity mutual funds?', a: 'Indian large-cap equity funds have historically averaged 12-14% CAGR over 15+ year periods. Diversified/multi-cap funds can be in the 14-16% range. For conservative projections, use 10-11%. Global equity funds tracking developed markets typically average 8-10%.' },
      { q: 'Is lump sum better than SIP?', a: 'Lump sum beats SIP roughly two-thirds of the time because money invested earlier has more time to compound. However, timing risk is real — investing at a market peak and facing a crash is painful. Most financial advisors recommend lump sum for long horizons (10+ years) and SIP for medium-term or when psychology is a concern.' },
      { q: 'What is the exit load on mutual funds?', a: 'Exit loads are charges applied when you redeem within a certain period, typically 1% if redeemed within one year. After that, most equity funds have zero exit load. Direct plans of mutual funds have lower expense ratios than regular plans and are worth considering for long-term investors.' },
    ],
  },
  {
    slug: 'stock-profit-loss',
    name: 'Stock Profit/Loss',
    category: 'finance',
    icon: 'CandlestickChart',
    description: 'Calculate gains or losses on stock trades.',
    longDescription: 'Every stock trade boils down to two numbers: what you paid and what you sold for. This calculator adds the third dimension — quantity — to give you total profit or loss in dollars and the percentage return on your investment. Whether you\'re reviewing a completed trade or evaluating a potential exit, knowing these numbers precisely is the starting point for every good trading decision.',
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
    formula: 'Profit = (Sell Price - Buy Price) × Quantity',
    faqs: [
      { q: 'Does this calculator include brokerage fees and taxes?', a: 'No — it shows gross profit before transaction costs. Add your broker\'s commission and any applicable taxes (capital gains tax, STT, etc.) to get net profit. For frequent traders, even small per-trade fees compound into significant costs.' },
      { q: 'How do I calculate return including dividends?', a: 'This calculator focuses on capital gains only. For total return, add any dividends received to your net profit. Total return = (Capital Gain + Dividends Received) ÷ Total Invested × 100.' },
      { q: 'Short-term vs long-term capital gains tax on stocks?', a: 'In the US, stocks held under one year are taxed as ordinary income (10-37%). Stocks held over one year qualify for long-term capital gains rates (0%, 15%, or 20%). The tax savings from holding one year can be substantial — often 10-20% of the gain.' },
    ],
  },
  {
    slug: 'dividend-yield-calculator',
    name: 'Dividend Yield Calculator',
    category: 'finance',
    icon: 'Coins',
    description: 'Calculate annual dividend yield on a stock.',
    longDescription: 'Dividend yield tells you how much cash a stock returns relative to its price — essentially the interest rate of an equity investment. High-yield stocks can be attractive for income investors, but yield alone doesn\'t tell the full story. This calculator also computes your annual income from dividends on a specific share position, making it easy to compare dividend income across holdings.',
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
    formula: 'Yield = (Annual Dividend ÷ Share Price) × 100',
    faqs: [
      { q: 'What is a good dividend yield?', a: 'A "good" yield depends on context. For stable blue-chip stocks, 2-4% is typical. Yields above 6-7% may signal financial stress (a high yield can result from a falling share price — called a "value trap"). Compare the yield against the sector average and check whether dividends are growing or shrinking over time.' },
      { q: 'Is dividend yield the same as total return?', a: 'No. Total return = dividend yield + capital appreciation (price change). A stock yielding 5% that falls 10% in price gave you a -5% total return. Always consider both components when evaluating dividend stocks.' },
      { q: 'Are dividends taxable?', a: 'Yes. Qualified dividends (most US stock dividends) are taxed at the long-term capital gains rate (0-20%). Non-qualified dividends are taxed as ordinary income. In India, dividends are taxed as income at the investor\'s applicable slab rate.' },
    ],
  },
  {
    slug: 'credit-card-interest',
    name: 'Credit Card Interest',
    category: 'finance',
    icon: 'CreditCard',
    description: 'How much credit card interest will cost you.',
    longDescription: 'Credit card debt at 24%+ APR is one of the most expensive forms of borrowing that exists. Making minimum payments feels responsible, but the numbers are brutal — a $5,000 balance at 24% APR with $100/month minimum payments takes nearly 8 years to clear and costs $4,300 in interest alone. This calculator shows exactly how long your current payment plan will take and what it costs you in total.',
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
    faqs: [
      { q: 'Why does making minimum payments take so long?', a: 'Minimum payments are designed by the card issuer to keep you in debt as long as profitably possible. They\'re typically 1-2% of the balance — just enough to avoid default. At 24% APR, nearly all of each minimum payment goes toward interest, barely touching the principal.' },
      { q: 'Should I consider a balance transfer?', a: 'If you have good credit, balance transfer cards offering 0% APR for 12-21 months are worth considering. A 3% transfer fee on $5,000 costs $150 — often worth it if you can pay down the balance significantly during the 0% period. Calculate your payoff timeline both ways before deciding.' },
      { q: 'Debt avalanche vs. debt snowball — which is better?', a: 'Mathematically, the avalanche (pay highest-APR first) saves the most money. Behaviorally, the snowball (smallest balance first) gives early wins that keep people motivated. Research shows snowball users are more likely to complete payoff. Use whichever you\'ll actually stick to.' },
    ],
  },
  {
    slug: 'debt-payoff-calculator',
    name: 'Debt Payoff Calculator',
    category: 'finance',
    icon: 'TrendingDown',
    description: 'Plan when you will be debt-free.',
    longDescription: 'There\'s something powerful about knowing the exact date you\'ll be debt-free. This calculator takes your total debt, interest rate, and monthly payment to show you precisely when that day arrives — and how much interest you\'ll pay along the way. Try increasing the monthly payment by just $100 and watch how dramatically the payoff date changes.',
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
    faqs: [
      { q: 'What is the minimum payment I can make and still pay off the debt?', a: 'Your monthly payment must exceed the monthly interest charge (Balance × APR ÷ 12). If you pay exactly this amount, the principal never decreases. Any payment below this means the balance grows. This calculator shows "9999 months" in that scenario.' },
      { q: 'How much extra should I pay each month?', a: 'Even small extra payments have outsized effects. On a $20,000 debt at 12%, adding $100/month to a $500 payment reduces payoff from 51 months to 40 months and saves about $1,800 in interest. Run the numbers with different payment amounts using the slider.' },
      { q: 'Should I pay off debt or invest?', a: 'The math is clear: if your debt interest rate exceeds your expected investment return, pay off debt first. Credit card debt at 20-24% APR almost always beats investing. Personal loans at 10-15% usually do too. Student loans at 5-7% are in a grey zone — depends on your risk tolerance and investment timeline.' },
    ],
  },
  {
    slug: 'net-worth-calculator',
    name: 'Net Worth Calculator',
    category: 'finance',
    icon: 'Wallet',
    description: 'Calculate your total net worth.',
    longDescription: 'Net worth is the most honest snapshot of your financial health: everything you own minus everything you owe. Most people are surprised when they first calculate it — both by what they\'ve accumulated and by how much they still owe. Tracking it annually (or quarterly) is the single best way to measure whether your financial decisions are actually moving you forward.',
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
    formula: 'Net Worth = Total Assets − Total Liabilities',
    faqs: [
      { q: 'What counts as an asset vs liability?', a: 'Assets: cash, investments (stocks, mutual funds, crypto), retirement accounts, real estate value, car value, business equity, valuable property. Liabilities: mortgage balance, car loans, student loans, credit card balances, personal loans. Your home is both — include its market value as an asset and the remaining mortgage as a liability.' },
      { q: 'What is a healthy net worth at different ages?', a: 'A commonly cited benchmark from The Millionaire Next Door: your net worth should be roughly (Age × Annual Income) ÷ 10. So a 40-year-old earning $80,000 should target $320,000 net worth. This is a rough guideline — what matters more is consistent growth year over year.' },
      { q: 'My net worth is negative — is that normal?', a: 'Yes, especially in early adulthood with student loans, car loans, or a new mortgage. Negative net worth is concerning mainly if it\'s increasing rather than improving. Track it quarterly and focus on the trend, not the absolute number.' },
    ],
  },
  {
    slug: 'salary-to-hourly',
    name: 'Salary to Hourly',
    category: 'finance',
    icon: 'Clock',
    description: 'Convert annual salary to hourly rate.',
    longDescription: 'Knowing your true hourly rate changes how you think about your time and compensation. Whether you\'re comparing a salaried offer to freelance rates, evaluating whether overtime is worthwhile, or simply curious what your time costs per hour — this converter handles the math. Adjust the hours-per-week and weeks-per-year sliders to match your actual working pattern, not the theoretical 40-hour, 52-week assumption.',
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
    formula: 'Hourly = Annual Salary ÷ (Hours/Week × Weeks/Year)',
    faqs: [
      { q: 'Why is my effective hourly rate lower than the posted rate?', a: 'Salaried employees often work more than 40 hours, especially in corporate or professional roles. Reducing the "weeks/year" to 48 (accounting for vacation) and increasing "hours/week" to your real average paints a more accurate picture of your actual compensation per hour worked.' },
      { q: 'How do I compare this to a freelance hourly rate?', a: 'Freelance rates need to be significantly higher than equivalent salaried rates because you pay self-employment taxes (15.3%), provide your own benefits, and have no income during gaps. A general rule: your freelance rate should be 1.5-2× your equivalent salaried hourly rate to achieve similar take-home pay.' },
      { q: 'What is a fair hourly equivalent for a $75,000 salary?', a: 'At 40 hours/week and 50 working weeks: $75,000 ÷ 2,000 hours = $37.50/hour. Factor in 2 weeks vacation, it\'s $75,000 ÷ 2,000 = same number. If you regularly work 50-hour weeks, your real hourly rate drops to $30/hour.' },
    ],
  },
  {
    slug: 'tip-calculator',
    name: 'Tip Calculator',
    category: 'finance',
    icon: 'Utensils',
    description: 'Split bills and calculate tips fairly.',
    longDescription: 'Splitting a restaurant bill fairly shouldn\'t require a mental math session at the end of a good meal. Enter the total bill, your preferred tip percentage, and the number of people — and you\'ll have everyone\'s share in a second. For U.S. restaurants, 18% is a solid baseline for decent service, 20-22% for genuinely good service, and 15% if things were subpar.',
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
    formula: 'Tip = Bill × (Tip% ÷ 100)',
    faqs: [
      { q: 'What\'s the standard tip percentage in the US?', a: '15% used to be the baseline, but norms have shifted. Today 18-20% is considered appropriate for good sit-down restaurant service. 20-22% is excellent service. 15% signals you noticed something lacking. Counter-service and delivery tipping is more personal — there\'s no firm social norm.' },
      { q: 'Should I tip on the pre-tax or post-tax amount?', a: 'Technically pre-tax is correct. In practice, on a $100 bill with 8% tax, the difference is less than $2. Most people tip on the pre-tax subtotal, but on the total is fine too — the difference is minimal and the server won\'t notice.' },
      { q: 'How do I split fairly when people ordered different amounts?', a: 'The fairest approach for very different orders is to total your individual items and tip on your own subtotal. For groups where amounts are similar, even splitting saves the awkwardness. Pick your battles — the friendship usually matters more than the $5 discrepancy.' },
    ],
  },
  {
    slug: 'gst-calculator',
    name: 'GST Calculator',
    category: 'finance',
    icon: 'FileText',
    description: 'Calculate GST inclusive & exclusive amounts.',
    longDescription: 'GST (Goods and Services Tax) calculations come up constantly in business — invoicing, pricing decisions, tax filings, and compliance checks. This calculator handles both directions: calculate GST on a base amount (exclusive), or back-calculate the GST component from an amount that already includes tax (inclusive). Enter your amount and tax rate to get all three figures instantly.',
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
    formula: 'GST = Amount × (Rate ÷ 100)',
    faqs: [
      { q: 'What are the GST slabs in India?', a: 'India\'s GST has four main rates: 5% (essential goods, food items), 12% (standard goods), 18% (most services, electronics, processed food), and 28% (luxury goods, vehicles, tobacco). Many basic necessities are exempt (0%).' },
      { q: 'How do I find the pre-GST amount from a GST-inclusive price?', a: 'To reverse-calculate: Pre-GST Amount = GST-Inclusive Price ÷ (1 + GST Rate/100). For a ₹1,180 invoice at 18% GST: ₹1,180 ÷ 1.18 = ₹1,000 base price, ₹180 GST.' },
      { q: 'What is CGST, SGST, and IGST?', a: 'In India, GST splits between central and state governments. Intra-state supplies split the GST equally between CGST (central) and SGST (state). Inter-state supplies use IGST (integrated), which is collected by the centre and shared. The total rate is the same either way.' },
    ],
  },
  {
    slug: 'ppf-calculator',
    name: 'PPF Calculator',
    category: 'finance',
    icon: 'Shield',
    description: 'Calculate Public Provident Fund maturity.',
    longDescription: 'The Public Provident Fund (PPF) is one of India\'s most powerful tax-saving investment instruments — exempt on contribution, interest, and maturity (EEE status). With a government-backed guarantee and competitive interest rates, it\'s a cornerstone of long-term retirement planning for conservative investors. This calculator shows exactly how a 15-year PPF account grows with your annual deposit and the current interest rate.',
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
    formula: 'Maturity = P × [((1+r)^n - 1) / r] × (1+r)',
    faqs: [
      { q: 'What is the PPF interest rate right now?', a: 'The PPF interest rate is set by the Indian government each quarter. It has been 7.1% per annum since April 2020 as of this writing. Rates are reviewed quarterly but have been historically stable at 7-8% range.' },
      { q: 'Can I extend my PPF account after 15 years?', a: 'Yes. After the initial 15-year term, you can extend the account in 5-year blocks. During the extension, you can continue making deposits and earning interest — all tax-exempt. This makes PPF excellent for long-term wealth building beyond the basic 15-year horizon.' },
      { q: 'What is the maximum I can deposit in a PPF account?', a: 'The maximum annual deposit in a PPF account is ₹1.5 lakh per year (as of the current rules). This qualifies for Section 80C tax deduction. The minimum annual deposit required to keep the account active is ₹500.' },
    ],
  },
  {
    slug: 'nps-calculator',
    name: 'NPS Calculator',
    category: 'finance',
    icon: 'Umbrella',
    description: 'Plan your National Pension Scheme returns.',
    longDescription: 'The National Pension System (NPS) is India\'s market-linked retirement savings scheme — combining equity exposure for higher long-term growth with guaranteed annuity income at retirement. Unlike PPF\'s fixed rates, NPS returns depend on your chosen asset allocation and market performance. This calculator projects your potential retirement corpus and estimated monthly pension based on your monthly contributions and expected return.',
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
    faqs: [
      { q: 'How is the pension calculated from the NPS corpus?', a: 'At retirement (age 60), you can withdraw 60% of the NPS corpus as a lump sum (tax-free). The remaining 40% must be used to purchase an annuity from an insurance company. This calculator estimates monthly pension at an annuity rate of 6% per annum on the full corpus — actual rates vary by insurer and product.' },
      { q: 'What are the NPS tax benefits?', a: 'NPS contributions qualify for tax deduction under Section 80CCD(1) up to ₹1.5 lakh (within the 80C limit) and an additional ₹50,000 under Section 80CCD(1B). This extra ₹50,000 deduction is exclusive to NPS, making it attractive for tax optimization beyond the regular 80C instruments.' },
      { q: 'Which NPS asset allocation is recommended?', a: 'For investors in their 20s-30s, a 75% equity (E) allocation maximizes growth potential. The NPS auto-choice option gradually shifts from equity to bonds as you approach retirement, reducing risk. Active choice allows customizing the mix of Equity, Corporate Bonds, and Government Securities at any time.' },
    ],
  },
];
