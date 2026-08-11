import { CalculatorConfig } from '../calculator-types';
import {
  FY_LABEL,
  PROFESSIONAL_TAX_BY_STATE,
  EPF_RATE,
  GRATUITY_EXEMPTION_CAP,
  computeTax,
} from '../india-tax';

// ─────────────────────────────────────────────────────────────────────────────
// Salary and CTC calculators for the Indian market.
//
// These target the queries a salaried Indian actually types — "in hand salary
// calculator", "gratuity calculator", "hra exemption calculator", "notice
// period buyout" — none of which the site covered. The US payroll calculator
// that occupied this ground has been delisted (see market-delist.ts).
//
// Tax constants live in ../india-tax.ts and are dated. FY_LABEL is rendered on
// every page that uses them so a stale year is visible rather than silent.
// ─────────────────────────────────────────────────────────────────────────────

const STATE_OPTIONS = PROFESSIONAL_TAX_BY_STATE.map((s) => ({ label: s.label, value: s.value }));
const professionalTaxFor = (state: string) =>
  PROFESSIONAL_TAX_BY_STATE.find((s) => s.value === state)?.annual ?? 0;

export const indiaSalaryCalculators: CalculatorConfig[] = [
  {
    slug: 'in-hand-salary-calculator',
    name: 'In-Hand Salary Calculator',
    shortName: 'In-Hand Salary',
    category: 'finance',
    icon: 'Wallet',
    description: `Turn a CTC offer into the amount that actually reaches your bank account — PF, professional tax by state, and income tax under both regimes, for ${FY_LABEL}.`,
    trending: true,
    chartType: 'donut',
    inputs: [
      { key: 'ctc', label: 'Annual CTC', type: 'slider', min: 200000, max: 10000000, step: 10000, default: 1200000, prefix: '$', color: 'primary' },
      { key: 'basicPct', label: 'Basic as % of CTC', type: 'slider', min: 25, max: 60, step: 1, default: 40, suffix: '%', color: 'secondary' },
      { key: 'state', label: 'State (professional tax)', type: 'select', default: 'KA', options: STATE_OPTIONS, color: 'tertiary' },
      { key: 'regime', label: 'Tax Regime', type: 'select', default: 'new', options: [{ label: 'New regime (default)', value: 'new' }, { label: 'Old regime', value: 'old' }] },
      { key: 'deductions', label: 'Old-regime deductions (80C, 80D, HRA…)', type: 'slider', min: 0, max: 500000, step: 5000, default: 150000, prefix: '$' },
    ],
    outputs: [
      { key: 'monthlyInHand', label: 'Monthly In-Hand', prefix: '$', primary: true, color: 'white' },
      { key: 'annualInHand', label: 'Annual In-Hand', prefix: '$', color: 'secondary' },
      { key: 'incomeTax', label: 'Income Tax (incl. cess)', prefix: '$', color: 'tertiary' },
      { key: 'employeePf', label: 'Your PF Contribution', prefix: '$' },
      { key: 'employerPf', label: 'Employer PF (part of CTC)', prefix: '$' },
      { key: 'professionalTax', label: 'Professional Tax', prefix: '$' },
    ],
    calculate: (i) => {
      const ctc = Number(i.ctc);
      const basic = ctc * (Number(i.basicPct) / 100);
      const regime = String(i.regime) === 'old' ? 'old' : 'new';

      // Employer PF is part of CTC but never reaches you; employee PF is
      // deducted from gross. Both are computed on actual basic here, which is
      // what most private employers do above the ₹15,000 statutory wage.
      const employerPf = basic * EPF_RATE;
      const employeePf = basic * EPF_RATE;

      // Gross salary is CTC minus the employer's own contributions.
      const gross = ctc - employerPf;
      const professionalTax = professionalTaxFor(String(i.state));

      const { totalTax } = computeTax(gross, regime, Number(i.deductions));
      const annualInHand = gross - employeePf - professionalTax - totalTax;

      return {
        monthlyInHand: annualInHand / 12,
        annualInHand,
        incomeTax: totalTax,
        employeePf,
        employerPf,
        professionalTax,
      };
    },
    buildTable: (i) => {
      const ctc = Number(i.ctc);
      const basic = ctc * (Number(i.basicPct) / 100);
      const employerPf = basic * EPF_RATE;
      const employeePf = basic * EPF_RATE;
      const gross = ctc - employerPf;
      const professionalTax = professionalTaxFor(String(i.state));
      const rows: (string | number)[][] = [];
      for (const regime of ['new', 'old'] as const) {
        const { totalTax, taxableIncome } = computeTax(gross, regime, Number(i.deductions));
        const inHand = gross - employeePf - professionalTax - totalTax;
        rows.push([
          regime === 'new' ? 'New regime' : 'Old regime',
          Math.round(taxableIncome).toLocaleString('en-IN'),
          Math.round(totalTax).toLocaleString('en-IN'),
          Math.round(inHand / 12).toLocaleString('en-IN'),
        ]);
      }
      return {
        title: `Both regimes side by side — ${FY_LABEL}`,
        headers: ['Regime', 'Taxable income', 'Annual tax', 'Monthly in-hand'],
        rows,
      };
    },
    relatedSlugs: ['old-vs-new-tax-regime-calculator', 'hra-exemption-calculator', 'gratuity-calculator', 'income-tax-calculator'],
    seo: {
      title: 'In-Hand Salary Calculator: CTC to Take-Home Pay',
      description: `Convert CTC to in-hand salary for ${FY_LABEL}. Accounts for PF, state professional tax and income tax under both the old and new regimes, with a monthly take-home figure.`,
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },

  {
    slug: 'gratuity-calculator',
    name: 'Gratuity Calculator',
    category: 'finance',
    icon: 'Award',
    description: 'Work out your gratuity under the Payment of Gratuity Act — the 15/26 formula, the five-year rule, and how much of it is tax-free.',
    inputs: [
      { key: 'basic', label: 'Last Drawn Basic + DA (monthly)', type: 'slider', min: 5000, max: 500000, step: 1000, default: 50000, prefix: '$', color: 'primary' },
      { key: 'years', label: 'Years of Service', type: 'slider', min: 0, max: 40, step: 1, default: 7, suffix: 'Years', color: 'secondary' },
      { key: 'months', label: 'Additional Months', type: 'slider', min: 0, max: 11, step: 1, default: 7, suffix: 'Months', color: 'tertiary' },
    ],
    outputs: [
      { key: 'gratuity', label: 'Gratuity Payable', prefix: '$', primary: true, color: 'white' },
      { key: 'eligibility', label: 'Eligible?', color: 'secondary' },
      { key: 'countedYears', label: 'Years Counted', decimals: 0, color: 'tertiary' },
      { key: 'taxable', label: 'Taxable Portion', prefix: '$' },
    ],
    calculate: (i) => {
      const salary = Number(i.basic);
      const years = Number(i.years);
      const months = Number(i.months);

      // Service beyond six months in the final year rounds up to a full year;
      // six months or less is dropped. This is the rule people most often get
      // wrong, and it is worth a full year of gratuity.
      const countedYears = years + (months > 6 ? 1 : 0);
      const eligible = years >= 5;

      // 15 days of wages for every completed year, on a 26-day month.
      const raw = eligible ? (15 * salary * countedYears) / 26 : 0;
      const gratuity = Math.min(raw, GRATUITY_EXEMPTION_CAP);

      return {
        gratuity,
        eligibility: eligible
          ? 'Yes — 5 years completed'
          : `Not yet — ${(5 - years).toFixed(0)} more year(s) needed`,
        countedYears: eligible ? countedYears : 0,
        // The ₹20 lakh cap is an exemption ceiling, not a payment ceiling: an
        // employer may pay more, and the excess is taxable.
        taxable: Math.max(0, raw - GRATUITY_EXEMPTION_CAP),
      };
    },
    relatedSlugs: ['in-hand-salary-calculator', 'leave-encashment-calculator', 'retirement-calculator', 'nps-calculator'],
    seo: {
      title: 'Gratuity Calculator: Payment of Gratuity Act Formula',
      description: 'Free gratuity calculator using the official 15/26 formula. Includes the five-year eligibility rule, the six-month rounding rule, and the ₹20 lakh tax exemption cap.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },

  {
    slug: 'hra-exemption-calculator',
    name: 'HRA Exemption Calculator',
    shortName: 'HRA Exemption',
    category: 'finance',
    icon: 'Home',
    description: 'How much of your House Rent Allowance is actually tax-free under Section 10(13A) — the three-way minimum, and why metro status changes the answer.',
    chartType: 'donut',
    inputs: [
      { key: 'basic', label: 'Basic + DA (annual)', type: 'slider', min: 100000, max: 5000000, step: 10000, default: 600000, prefix: '$', color: 'primary' },
      { key: 'hra', label: 'HRA Received (annual)', type: 'slider', min: 0, max: 2500000, step: 10000, default: 300000, prefix: '$', color: 'secondary' },
      { key: 'rent', label: 'Rent Paid (annual)', type: 'slider', min: 0, max: 2500000, step: 10000, default: 360000, prefix: '$', color: 'tertiary' },
      { key: 'metro', label: 'City', type: 'select', default: 'metro', options: [{ label: 'Metro (Delhi, Mumbai, Kolkata, Chennai)', value: 'metro' }, { label: 'Non-metro', value: 'nonmetro' }] },
    ],
    outputs: [
      { key: 'exempt', label: 'HRA Exempt from Tax', prefix: '$', primary: true, color: 'white' },
      { key: 'taxableHra', label: 'HRA That Stays Taxable', prefix: '$', color: 'secondary' },
      { key: 'binding', label: 'Which Limit Binds', color: 'tertiary' },
    ],
    calculate: (i) => {
      const basic = Number(i.basic);
      const hra = Number(i.hra);
      const rent = Number(i.rent);
      const isMetro = String(i.metro) === 'metro';

      // Section 10(13A): exemption is the LEAST of three figures.
      const limitA = hra;
      const limitB = Math.max(0, rent - 0.1 * basic);
      const limitC = basic * (isMetro ? 0.5 : 0.4);

      const exempt = Math.max(0, Math.min(limitA, limitB, limitC));
      const binding =
        exempt === limitA ? 'HRA actually received'
        : exempt === limitB ? 'Rent minus 10% of basic'
        : isMetro ? '50% of basic (metro)' : '40% of basic (non-metro)';

      return { exempt, taxableHra: Math.max(0, hra - exempt), binding };
    },
    buildTable: (i) => {
      const basic = Number(i.basic);
      const hra = Number(i.hra);
      const rent = Number(i.rent);
      const isMetro = String(i.metro) === 'metro';
      return {
        title: 'The three limits — your exemption is the smallest',
        headers: ['Limit', 'Amount'],
        rows: [
          ['HRA actually received', Math.round(hra).toLocaleString('en-IN')],
          ['Rent paid minus 10% of basic', Math.round(Math.max(0, rent - 0.1 * basic)).toLocaleString('en-IN')],
          [isMetro ? '50% of basic (metro)' : '40% of basic (non-metro)', Math.round(basic * (isMetro ? 0.5 : 0.4)).toLocaleString('en-IN')],
        ],
      };
    },
    relatedSlugs: ['in-hand-salary-calculator', 'old-vs-new-tax-regime-calculator', 'hra-calculator', 'income-tax-calculator'],
    seo: {
      title: 'HRA Exemption Calculator: Section 10(13A) Three-Way Rule',
      description: 'Calculate your tax-free HRA under Section 10(13A). Shows all three limits — HRA received, rent minus 10% of basic, and 50%/40% of basic — and which one binds.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },

  {
    slug: 'leave-encashment-calculator',
    name: 'Leave Encashment Calculator',
    shortName: 'Leave Encashment',
    category: 'finance',
    icon: 'CalendarCheck',
    description: 'What your unused earned leave is worth when you resign or retire, and how much of that payout escapes tax.',
    inputs: [
      { key: 'basic', label: 'Basic + DA (monthly)', type: 'slider', min: 5000, max: 500000, step: 1000, default: 60000, prefix: '$', color: 'primary' },
      { key: 'leaveDays', label: 'Unused Leave Days', type: 'slider', min: 0, max: 300, step: 1, default: 45, suffix: 'days', color: 'secondary' },
      { key: 'exemptCap', label: 'Exemption Cap (non-govt)', type: 'slider', min: 0, max: 2500000, step: 25000, default: 2500000, prefix: '$', color: 'tertiary' },
    ],
    outputs: [
      { key: 'payout', label: 'Leave Encashment Payout', prefix: '$', primary: true, color: 'white' },
      { key: 'perDay', label: 'Value Per Leave Day', prefix: '$', color: 'secondary' },
      { key: 'exempt', label: 'Tax-Exempt Portion', prefix: '$', color: 'tertiary' },
      { key: 'taxable', label: 'Taxable Portion', prefix: '$' },
    ],
    calculate: (i) => {
      const monthly = Number(i.basic);
      const days = Number(i.leaveDays);
      // Encashment is conventionally computed on a 30-day month, unlike
      // gratuity's 26 — a distinction that costs people money when they
      // assume the two use the same divisor.
      const perDay = monthly / 30;
      const payout = perDay * days;
      const exempt = Math.min(payout, Number(i.exemptCap));
      return { payout, perDay, exempt, taxable: Math.max(0, payout - exempt) };
    },
    relatedSlugs: ['gratuity-calculator', 'in-hand-salary-calculator', 'notice-period-buyout-calculator', 'income-tax-calculator'],
    seo: {
      title: 'Leave Encashment Calculator: Payout and Tax Exemption',
      description: 'Calculate leave encashment on resignation or retirement. Shows the per-day value on the 30-day basis, the total payout, and the exempt and taxable split.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },

  {
    slug: 'notice-period-buyout-calculator',
    name: 'Notice Period Buyout Calculator',
    shortName: 'Notice Buyout',
    category: 'finance',
    icon: 'Clock',
    description: 'What it costs to leave early — the buyout amount for unserved notice days, and what your new employer would need to reimburse.',
    inputs: [
      { key: 'monthlySalary', label: 'Monthly Salary (as per contract)', type: 'slider', min: 10000, max: 1000000, step: 1000, default: 80000, prefix: '$', color: 'primary' },
      { key: 'noticeDays', label: 'Contractual Notice Period', type: 'slider', min: 0, max: 180, step: 1, default: 90, suffix: 'days', color: 'secondary' },
      { key: 'servedDays', label: 'Days You Will Actually Serve', type: 'slider', min: 0, max: 180, step: 1, default: 30, suffix: 'days', color: 'tertiary' },
      { key: 'basis', label: 'Buyout Computed On', type: 'select', default: 'gross', options: [{ label: 'Gross monthly salary', value: 'gross' }, { label: 'Basic only', value: 'basic' }] },
      { key: 'basicPct', label: 'Basic as % of Salary (if basic-only)', type: 'slider', min: 25, max: 60, step: 1, default: 40, suffix: '%' },
    ],
    outputs: [
      { key: 'buyout', label: 'Buyout Amount', prefix: '$', primary: true, color: 'white' },
      { key: 'unservedDays', label: 'Unserved Days', decimals: 0, color: 'secondary' },
      { key: 'perDay', label: 'Cost Per Unserved Day', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const salary = Number(i.monthlySalary);
      const base = String(i.basis) === 'basic' ? salary * (Number(i.basicPct) / 100) : salary;
      const unservedDays = Math.max(0, Number(i.noticeDays) - Number(i.servedDays));
      const perDay = base / 30;
      return { buyout: perDay * unservedDays, unservedDays, perDay };
    },
    relatedSlugs: ['leave-encashment-calculator', 'in-hand-salary-calculator', 'gratuity-calculator'],
    seo: {
      title: 'Notice Period Buyout Calculator: Cost to Leave Early',
      description: 'Calculate the notice period buyout for unserved days, on gross or basic salary. See the per-day cost and the total your new employer may need to reimburse.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },

  {
    slug: 'old-vs-new-tax-regime-calculator',
    name: 'Old vs New Tax Regime Calculator',
    shortName: 'Old vs New Regime',
    category: 'finance',
    icon: 'Scale',
    description: `Which regime leaves you with more money, for ${FY_LABEL} — with the break-even deduction figure that decides it.`,
    trending: true,
    inputs: [
      { key: 'income', label: 'Gross Annual Salary', type: 'slider', min: 300000, max: 10000000, step: 10000, default: 1500000, prefix: '$', color: 'primary' },
      { key: 'deductions', label: 'Old-Regime Deductions (80C + 80D + HRA + 24b…)', type: 'slider', min: 0, max: 800000, step: 5000, default: 200000, prefix: '$', color: 'secondary' },
    ],
    outputs: [
      { key: 'better', label: 'Better Regime', primary: true, color: 'white' },
      { key: 'saving', label: 'You Save', prefix: '$', color: 'secondary' },
      { key: 'newTax', label: 'Tax — New Regime', prefix: '$', color: 'tertiary' },
      { key: 'oldTax', label: 'Tax — Old Regime', prefix: '$' },
      { key: 'breakEven', label: 'Deductions Needed to Break Even', prefix: '$' },
    ],
    calculate: (i) => {
      const income = Number(i.income);
      const deductions = Number(i.deductions);

      const newTax = computeTax(income, 'new').totalTax;
      const oldTax = computeTax(income, 'old', deductions).totalTax;

      // The number that actually settles the argument: how much you would need
      // to be claiming for the old regime to match the new one. Below this,
      // the new regime wins no matter what your adviser says.
      let breakEven = 0;
      let lo = 0;
      let hi = income;
      for (let k = 0; k < 60; k++) {
        const mid = (lo + hi) / 2;
        if (computeTax(income, 'old', mid).totalTax > newTax) lo = mid;
        else hi = mid;
      }
      breakEven = computeTax(income, 'old', hi).totalTax <= newTax ? hi : 0;

      return {
        better: oldTax < newTax ? 'Old regime' : oldTax > newTax ? 'New regime' : 'Identical',
        saving: Math.abs(newTax - oldTax),
        newTax,
        oldTax,
        breakEven,
      };
    },
    buildTable: (i) => {
      const income = Number(i.income);
      const newTax = computeTax(income, 'new').totalTax;
      const rows: (string | number)[][] = [];
      for (const d of [0, 100000, 150000, 200000, 300000, 400000, 500000]) {
        const oldTax = computeTax(income, 'old', d).totalTax;
        rows.push([
          d.toLocaleString('en-IN'),
          Math.round(oldTax).toLocaleString('en-IN'),
          Math.round(newTax).toLocaleString('en-IN'),
          oldTax < newTax ? 'Old' : oldTax > newTax ? 'New' : 'Tie',
        ]);
      }
      return {
        title: `How the answer changes with your deductions — ${FY_LABEL}`,
        headers: ['Deductions claimed', 'Old-regime tax', 'New-regime tax', 'Winner'],
        rows,
      };
    },
    relatedSlugs: ['in-hand-salary-calculator', 'hra-exemption-calculator', 'income-tax-calculator', 'ppf-calculator'],
    seo: {
      title: 'Old vs New Tax Regime Calculator: Which Saves You More?',
      description: `Compare the old and new tax regimes for ${FY_LABEL}. Enter your salary and deductions to see the tax under each, the saving, and the break-even deduction figure.`,
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
