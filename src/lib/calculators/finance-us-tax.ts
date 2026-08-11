import { CalculatorConfig } from '../calculator-types';
import {
  FilingStatus,
  FILING_STATUS_OPTIONS,
  STANDARD_DEDUCTION_2026,
  federalTax2026,
  marginalRate2026,
  bracketBreakdown2026,
  FICA_2026,
  LTCG_BRACKETS_2026,
} from '../us-tax-2026';

const usd = (n: number): string =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Shared annual paycheck math (returns null on impossible combos). */
function paycheckBreakdown(i: Record<string, number | string>): {
  periods: number;
  annualGross: number;
  annualPreTax: number;
  federal: number;
  ss: number;
  medicare: number;
  state: number;
  annualNet: number;
} | null {
  const status = String(i.filingStatus) as FilingStatus;
  const periods = Number(i.frequency);
  const annualGross =
    String(i.payType) === 'hourly'
      ? Number(i.hourlyRate) * Number(i.hoursPerWeek) * 52
      : Number(i.salary);
  const annualPreTax = Number(i.preTax) * periods;
  if (periods <= 0 || annualGross <= 0 || annualPreTax >= annualGross) return null;
  const taxable = Math.max(0, annualGross - annualPreTax - STANDARD_DEDUCTION_2026[status]);
  const federal = federalTax2026(taxable, status);
  const ss = FICA_2026.ssRate * Math.min(annualGross, FICA_2026.ssWageBase);
  const medicare =
    FICA_2026.medicareRate * annualGross +
    FICA_2026.addlMedicareRate *
      Math.max(0, annualGross - FICA_2026.addlMedicareThreshold[status]);
  const state = (Number(i.statePct) / 100) * (annualGross - annualPreTax);
  const annualNet = annualGross - federal - ss - medicare - state - annualPreTax;
  return { periods, annualGross, annualPreTax, federal, ss, medicare, state, annualNet };
}

/** Taxable income for the federal income tax calculator. */
function federalTaxableIncome(i: Record<string, number | string>): {
  status: FilingStatus;
  gross: number;
  taxable: number;
} {
  const status = String(i.filingStatus) as FilingStatus;
  const gross = Number(i.gross);
  const deduction =
    String(i.dedMode) === 'itemized' ? Number(i.itemized) : STANDARD_DEDUCTION_2026[status];
  return { status, gross, taxable: Math.max(0, gross - deduction) };
}

export const financeUsTaxCalculators: CalculatorConfig[] = [
  {
    slug: 'paycheck-calculator',
    name: 'Paycheck Calculator',
    category: 'finance',
    icon: 'Wallet',
    description: 'Estimate your take-home pay per paycheck after 2026 federal income tax, Social Security, Medicare, state tax, and pre-tax deductions.',
    trending: true,
    inputs: [
      {
        key: 'payType',
        label: 'Pay Type',
        type: 'select',
        options: [
          { label: 'Salary', value: 'salary' },
          { label: 'Hourly', value: 'hourly' },
        ],
        default: 'salary',
        color: 'primary',
      },
      { key: 'salary', label: 'Annual Salary (salary mode)', type: 'slider', min: 10000, max: 500000, step: 1000, default: 65000, prefix: '$', color: 'secondary' },
      { key: 'hourlyRate', label: 'Hourly Rate (hourly mode)', type: 'slider', min: 7.25, max: 150, step: 0.25, default: 20, prefix: '$', color: 'tertiary' },
      { key: 'hoursPerWeek', label: 'Hours per Week (hourly mode)', type: 'slider', min: 1, max: 80, step: 1, default: 40, suffix: 'hrs', color: 'primary' },
      {
        key: 'frequency',
        label: 'Pay Frequency',
        type: 'select',
        options: [
          { label: 'Weekly', value: '52' },
          { label: 'Biweekly', value: '26' },
          { label: 'Semimonthly', value: '24' },
          { label: 'Monthly', value: '12' },
        ],
        default: '26',
        color: 'secondary',
      },
      {
        key: 'filingStatus',
        label: 'Filing Status',
        type: 'select',
        options: FILING_STATUS_OPTIONS,
        default: 'single',
        color: 'tertiary',
      },
      { key: 'statePct', label: 'State income tax (flat %, 0 = none)', type: 'slider', min: 0, max: 13.3, step: 0.1, default: 0, suffix: '%', color: 'primary' },
      { key: 'preTax', label: 'Pre-Tax Deductions per Paycheck (401k + health)', type: 'slider', min: 0, max: 3000, step: 25, default: 0, prefix: '$', color: 'secondary' },
    ],
    outputs: [
      { key: 'takeHome', label: 'Take-Home per Paycheck', prefix: '$', decimals: 2, primary: true },
      { key: 'annualNet', label: 'Annual Take-Home', prefix: '$', decimals: 0, color: 'secondary' },
      { key: 'fedPer', label: 'Federal Tax per Paycheck', prefix: '$', decimals: 2, color: 'tertiary' },
      { key: 'ficaPer', label: 'FICA per Paycheck', prefix: '$', decimals: 2, color: 'secondary' },
      { key: 'statePer', label: 'State Tax per Paycheck', prefix: '$', decimals: 2, color: 'tertiary' },
    ],
    calculate: (i) => {
      const b = paycheckBreakdown(i);
      if (!b) {
        return {
          takeHome: 'Deductions exceed gross pay',
          annualNet: 0,
          fedPer: 0,
          ficaPer: 0,
          statePer: 0,
        };
      }
      return {
        takeHome: b.annualNet / b.periods,
        annualNet: b.annualNet,
        fedPer: b.federal / b.periods,
        ficaPer: (b.ss + b.medicare) / b.periods,
        statePer: b.state / b.periods,
      };
    },
    buildTable: (i) => {
      const b = paycheckBreakdown(i);
      if (!b) return null;
      const p = b.periods;
      return {
        title: 'Where each paycheck goes',
        headers: ['Item', 'Per paycheck', 'Annual'],
        rows: [
          ['Gross pay', usd(b.annualGross / p), usd(b.annualGross)],
          ['Pre-tax deductions', usd(b.annualPreTax / p), usd(b.annualPreTax)],
          ['Federal income tax', usd(b.federal / p), usd(b.federal)],
          ['Social Security', usd(b.ss / p), usd(b.ss)],
          ['Medicare', usd(b.medicare / p), usd(b.medicare)],
          ['State tax', usd(b.state / p), usd(b.state)],
          ['Take-home', usd(b.annualNet / p), usd(b.annualNet)],
        ],
      };
    },
    seo: {
      title: 'Paycheck Calculator 2026: Take-Home Pay After Taxes',
      description: 'Free paycheck calculator. Estimate take-home pay after 2026 federal tax, Social Security, Medicare, and state tax — salary or hourly, any pay schedule.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['salary-to-hourly', 'federal-income-tax-calculator', '401k-calculator', 'sales-tax-calculator'],
  },
  {
    slug: 'federal-income-tax-calculator',
    name: 'Federal Income Tax Calculator',
    category: 'finance',
    icon: 'Landmark',
    description: 'Estimate your 2026 federal income tax, marginal and effective rates, and see exactly how much of your income falls in each bracket.',
    trending: true,
    inputs: [
      {
        key: 'filingStatus',
        label: 'Filing Status',
        type: 'select',
        options: FILING_STATUS_OPTIONS,
        default: 'single',
        color: 'primary',
      },
      { key: 'gross', label: 'Gross Annual Income', type: 'slider', min: 0, max: 1000000, step: 1000, default: 85000, prefix: '$', color: 'secondary' },
      {
        key: 'dedMode',
        label: 'Deduction Mode',
        type: 'select',
        options: [
          { label: 'Standard deduction', value: 'standard' },
          { label: 'Itemized', value: 'itemized' },
        ],
        default: 'standard',
        color: 'tertiary',
      },
      { key: 'itemized', label: 'Itemized deduction (if selected)', type: 'slider', min: 0, max: 200000, step: 100, default: 16100, prefix: '$', color: 'primary' },
    ],
    outputs: [
      { key: 'tax', label: 'Federal Tax Owed', prefix: '$', decimals: 2, primary: true },
      { key: 'taxable', label: 'Taxable Income', prefix: '$', decimals: 0, color: 'secondary' },
      { key: 'marginal', label: 'Marginal Rate', suffix: '%', decimals: 0, color: 'tertiary' },
      { key: 'effective', label: 'Effective Rate', suffix: '%', decimals: 2, color: 'secondary' },
      { key: 'afterTax', label: 'After-Tax Income', prefix: '$', decimals: 2, color: 'tertiary' },
    ],
    calculate: (i) => {
      const { status, gross, taxable } = federalTaxableIncome(i);
      const tax = federalTax2026(taxable, status);
      return {
        tax,
        taxable,
        marginal: marginalRate2026(taxable, status) * 100,
        effective: gross > 0 ? (tax / gross) * 100 : 0,
        afterTax: gross - tax,
      };
    },
    buildTable: (i) => {
      const { status, taxable } = federalTaxableIncome(i);
      if (taxable <= 0) return null;
      return {
        title: 'Tax by bracket (2026)',
        headers: ['Bracket', 'Rate', 'Amount taxed', 'Tax'],
        rows: bracketBreakdown2026(taxable, status).map((r) => [
          r.range,
          `${Math.round(r.rate * 100)}%`,
          usd(r.taxedAmount),
          usd(r.tax),
        ]),
      };
    },
    seo: {
      title: 'Federal Income Tax Calculator 2026: Brackets & Rates',
      description: 'Free 2026 federal income tax calculator. See tax owed, marginal and effective rates, and a bracket-by-bracket breakdown using official IRS figures.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['paycheck-calculator', 'capital-gains-tax-calculator', '401k-calculator', 'roth-ira-calculator'],
  },
  {
    slug: 'capital-gains-tax-calculator',
    name: 'Capital Gains Tax Calculator',
    category: 'finance',
    icon: 'TrendingUp',
    description: 'Estimate 2026 federal tax on a stock, crypto, or property sale — short-term gains at ordinary rates vs long-term gains at 0%, 15%, or 20%.',
    inputs: [
      { key: 'purchase', label: 'Purchase Price (cost basis)', type: 'slider', min: 0, max: 2000000, step: 500, default: 10000, prefix: '$', color: 'primary' },
      { key: 'sale', label: 'Sale Price', type: 'slider', min: 0, max: 2000000, step: 500, default: 15000, prefix: '$', color: 'secondary' },
      {
        key: 'holding',
        label: 'Holding Period',
        type: 'select',
        options: [
          { label: 'Short-term (1 year or less)', value: 'short' },
          { label: 'Long-term (more than 1 year)', value: 'long' },
        ],
        default: 'long',
        color: 'tertiary',
      },
      {
        key: 'filingStatus',
        label: 'Filing Status',
        type: 'select',
        options: FILING_STATUS_OPTIONS,
        default: 'single',
        color: 'primary',
      },
      { key: 'income', label: 'Taxable income (excluding this gain)', type: 'slider', min: 0, max: 1000000, step: 1000, default: 60000, prefix: '$', color: 'secondary' },
    ],
    outputs: [
      { key: 'tax', label: 'Capital Gains Tax', prefix: '$', decimals: 2, primary: true },
      { key: 'gain', label: 'Gain', prefix: '$', decimals: 2, color: 'secondary' },
      { key: 'effRate', label: 'Effective Rate on Gain', suffix: '%', decimals: 2, color: 'tertiary' },
      { key: 'net', label: 'Net Proceeds After Tax', prefix: '$', decimals: 2, color: 'secondary' },
      { key: 'note', label: 'Treatment', color: 'tertiary' },
    ],
    calculate: (i) => {
      const purchase = Number(i.purchase);
      const sale = Number(i.sale);
      const income = Number(i.income);
      const status = String(i.filingStatus) as FilingStatus;
      const rawGain = sale - purchase;
      if (rawGain <= 0) {
        return {
          tax: 0,
          gain: 0,
          effRate: 0,
          net: sale,
          note:
            rawGain < 0
              ? `Capital loss of ${usd(-rawGain)} — no tax owed`
              : 'No gain — no tax owed',
        };
      }
      let tax = 0;
      let note = '';
      if (String(i.holding) === 'short') {
        tax = federalTax2026(income + rawGain, status) - federalTax2026(income, status);
        note = 'Short-term: taxed as ordinary income';
      } else {
        const [zeroTop, fifteenTop] = LTCG_BRACKETS_2026[status];
        const end = income + rawGain;
        const at15 = Math.max(0, Math.min(end, fifteenTop) - Math.max(income, zeroTop));
        const at20 = Math.max(0, end - Math.max(income, fifteenTop));
        tax = at15 * 0.15 + at20 * 0.2;
        note = 'Long-term: 0% / 15% / 20% rates';
      }
      return {
        tax,
        gain: rawGain,
        effRate: (tax / rawGain) * 100,
        net: sale - tax,
        note,
      };
    },
    seo: {
      title: 'Capital Gains Tax Calculator 2026: Short & Long Term',
      description: 'Free capital gains tax calculator. Estimate 2026 federal tax on stock, crypto, or property sales — short-term ordinary rates vs 0%, 15%, 20% long-term.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['federal-income-tax-calculator', 'stock-profit-loss', 'paycheck-calculator'],
  },
];
