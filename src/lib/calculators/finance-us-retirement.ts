import { CalculatorConfig } from '../calculator-types';
import { RETIREMENT_LIMITS_2026, FICA_2026 } from '../us-tax-2026';

const usd = (n: number): string =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

/** 2026 employee deferral limit for a given age (IRS Notice 2025-67 / SECURE 2.0). */
function deferralLimit401k(age: number): number {
  const { k401Deferral, k401CatchUp50, k401CatchUp60to63 } = RETIREMENT_LIMITS_2026;
  if (age >= 60 && age <= 63) return k401Deferral + k401CatchUp60to63; // enhanced catch-up
  if (age >= 50) return k401Deferral + k401CatchUp50; // ages 50–59 and 64+
  return k401Deferral;
}

interface K401Year {
  age: number;
  salary: number;
  employee: number;
  match: number;
  balance: number;
}

function project401k(i: Record<string, number | string>): {
  balance: number;
  totalEmployee: number;
  totalMatch: number;
  rows: K401Year[];
} {
  const startAge = Number(i.age);
  const retireAge = Number(i.retireAge);
  let balance = Number(i.balance);
  let salary = Number(i.salary);
  const contribPct = Number(i.contribPct) / 100;
  const matchPct = Number(i.matchPct) / 100;
  const capPct = Number(i.matchCap) / 100;
  const growth = Number(i.salaryGrowth) / 100;
  const ret = Number(i.annualReturn) / 100;

  let totalEmployee = 0;
  let totalMatch = 0;
  const rows: K401Year[] = [];

  for (let age = startAge; age < retireAge; age++) {
    const employee = Math.min(salary * contribPct, deferralLimit401k(age));
    const match = matchPct * Math.min(employee, salary * capPct);
    balance = (balance + employee + match) * (1 + ret);
    totalEmployee += employee;
    totalMatch += match;
    rows.push({ age, salary, employee, match, balance });
    salary *= 1 + growth;
  }

  return { balance, totalEmployee, totalMatch, rows };
}

// TODO: verify 2026 bend points against SSA.gov; these track the published AWI adjustment.
const SS_BEND_POINT_1_2026 = 1287;
const SS_BEND_POINT_2_2026 = 7758;
const SS_CLAIM_FACTORS: Record<string, number> = { '62': 0.7, '67': 1, '70': 1.24 };

export const financeUsRetirementCalculators: CalculatorConfig[] = [
  {
    slug: '401k-calculator',
    name: '401(k) Calculator',
    category: 'finance',
    icon: 'PiggyBank',
    description: 'Project your 401(k) balance at retirement with employer matching, salary growth, and 2026 IRS contribution limits applied year by year.',
    inputs: [
      { key: 'age', label: 'Current Age', type: 'slider', min: 18, max: 70, step: 1, default: 30, suffix: 'yrs', color: 'primary' },
      { key: 'retireAge', label: 'Retirement Age', type: 'slider', min: 50, max: 75, step: 1, default: 65, suffix: 'yrs', color: 'secondary' },
      { key: 'balance', label: 'Current 401(k) Balance', type: 'slider', min: 0, max: 2000000, step: 1000, default: 25000, prefix: '$', color: 'tertiary' },
      { key: 'salary', label: 'Annual Salary', type: 'slider', min: 20000, max: 500000, step: 1000, default: 75000, prefix: '$', color: 'primary' },
      { key: 'contribPct', label: 'Your Contribution (% of salary)', type: 'slider', min: 0, max: 50, step: 0.5, default: 8, suffix: '%', color: 'secondary' },
      { key: 'matchPct', label: 'Employer match (% of your contribution)', type: 'slider', min: 0, max: 200, step: 5, default: 50, suffix: '%', color: 'tertiary' },
      { key: 'matchCap', label: 'Match Cap (% of salary)', type: 'slider', min: 0, max: 15, step: 0.5, default: 6, suffix: '%', color: 'primary' },
      { key: 'salaryGrowth', label: 'Annual Salary Growth', type: 'slider', min: 0, max: 10, step: 0.1, default: 3, suffix: '%', color: 'secondary' },
      { key: 'annualReturn', label: 'Expected Annual Return', type: 'slider', min: 0, max: 15, step: 0.1, default: 7, suffix: '%', color: 'tertiary' },
    ],
    outputs: [
      { key: 'projected', label: 'Projected Balance at Retirement', prefix: '$', decimals: 0, primary: true },
      { key: 'totalEmployee', label: 'Total Employee Contributions', prefix: '$', decimals: 0, color: 'secondary' },
      { key: 'totalMatch', label: 'Total Employer Match', prefix: '$', decimals: 0, color: 'tertiary' },
      { key: 'totalGrowth', label: 'Total Investment Growth', prefix: '$', decimals: 0, color: 'primary' },
    ],
    calculate: (i) => {
      if (Number(i.retireAge) <= Number(i.age)) {
        return { projected: Number(i.balance), totalEmployee: 0, totalMatch: 0, totalGrowth: 0 };
      }
      const p = project401k(i);
      return {
        projected: p.balance,
        totalEmployee: p.totalEmployee,
        totalMatch: p.totalMatch,
        totalGrowth: p.balance - Number(i.balance) - p.totalEmployee - p.totalMatch,
      };
    },
    buildTable: (i) => {
      if (Number(i.retireAge) <= Number(i.age)) return null;
      const p = project401k(i);
      return {
        title: 'Year-by-year projection',
        headers: ['Age', 'Salary', 'Your contribution', 'Employer match', 'Balance'],
        rows: p.rows.map((r) => [r.age, usd(r.salary), usd(r.employee), usd(r.match), usd(r.balance)]),
      };
    },
    seo: {
      title: '401(k) Calculator: Balance at Retirement (2026)',
      description: 'Free 401(k) calculator. Project your retirement balance with employer match, salary growth, and 2026 IRS limits — $24,500 deferral plus age-based catch-ups.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['roth-ira-calculator', 'retirement-calculator', 'federal-income-tax-calculator'],
  },
  {
    slug: 'roth-ira-calculator',
    name: 'Roth IRA Calculator',
    category: 'finance',
    icon: 'Landmark',
    description: 'Estimate your tax-free Roth IRA balance at retirement using 2026 contribution limits, your timeline, and expected investment returns.',
    inputs: [
      { key: 'age', label: 'Current Age', type: 'slider', min: 18, max: 70, step: 1, default: 30, suffix: 'yrs', color: 'primary' },
      { key: 'retireAge', label: 'Retirement Age', type: 'slider', min: 50, max: 75, step: 1, default: 65, suffix: 'yrs', color: 'secondary' },
      { key: 'balance', label: 'Current Roth IRA Balance', type: 'slider', min: 0, max: 1000000, step: 500, default: 10000, prefix: '$', color: 'tertiary' },
      { key: 'contribution', label: 'Annual Contribution', type: 'slider', min: 0, max: 8600, step: 100, default: 7500, prefix: '$', color: 'primary' },
      { key: 'annualReturn', label: 'Expected Annual Return', type: 'slider', min: 0, max: 15, step: 0.1, default: 7, suffix: '%', color: 'secondary' },
    ],
    outputs: [
      { key: 'projected', label: 'Tax-Free Balance at Retirement', prefix: '$', decimals: 0, primary: true },
      { key: 'totalContrib', label: 'Total Contributions', prefix: '$', decimals: 0, color: 'secondary' },
      { key: 'totalGrowth', label: 'Total Growth', prefix: '$', decimals: 0, color: 'tertiary' },
    ],
    calculate: (i) => {
      const startAge = Number(i.age);
      const retireAge = Number(i.retireAge);
      let balance = Number(i.balance);
      const ret = Number(i.annualReturn) / 100;
      if (retireAge <= startAge) {
        return { projected: balance, totalContrib: 0, totalGrowth: 0 };
      }
      let totalContrib = 0;
      for (let age = startAge; age < retireAge; age++) {
        const cap = RETIREMENT_LIMITS_2026.ira + (age >= 50 ? RETIREMENT_LIMITS_2026.iraCatchUp50 : 0);
        const contrib = Math.min(Number(i.contribution), cap);
        balance = (balance + contrib) * (1 + ret);
        totalContrib += contrib;
      }
      return {
        projected: balance,
        totalContrib,
        totalGrowth: balance - Number(i.balance) - totalContrib,
      };
    },
    seo: {
      title: 'Roth IRA Calculator: Tax-Free Growth to Retirement',
      description: 'Free Roth IRA calculator. Project tax-free retirement savings with 2026 limits — $7,500 plus a $1,100 catch-up at 50+ — compounded to your retirement age.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['401k-calculator', 'retirement-calculator', 'compound-interest-calculator'],
  },
  {
    slug: 'social-security-calculator',
    name: 'Social Security Calculator',
    category: 'finance',
    icon: 'Shield',
    description: 'A simplified estimate of your monthly Social Security retirement benefit from career-average earnings and claiming age — not an official SSA projection.',
    inputs: [
      { key: 'earnings', label: 'Average annual earnings (career)', type: 'slider', min: 10000, max: 184500, step: 500, default: 60000, prefix: '$', color: 'primary' },
      {
        key: 'claimAge',
        label: 'Claiming Age',
        type: 'select',
        default: '67',
        options: [
          { label: 'Age 62 (early)', value: '62' },
          { label: 'Age 67 (full retirement age)', value: '67' },
          { label: 'Age 70 (max delayed)', value: '70' },
        ],
        color: 'secondary',
      },
    ],
    outputs: [
      { key: 'monthly', label: 'Estimated Monthly Benefit', prefix: '$', decimals: 0, primary: true },
      { key: 'annual', label: 'Annual Benefit', prefix: '$', decimals: 0, color: 'secondary' },
      { key: 'fraBenefit', label: 'Full-Retirement-Age Benefit', prefix: '$', decimals: 0, color: 'tertiary' },
      { key: 'adjustment', label: 'Adjustment vs FRA', color: 'primary' },
    ],
    calculate: (i) => {
      const earnings = Math.min(Number(i.earnings), FICA_2026.ssWageBase);
      const aime = earnings / 12; // Average Indexed Monthly Earnings (simplified)
      const pia =
        0.9 * Math.min(aime, SS_BEND_POINT_1_2026) +
        0.32 * Math.max(0, Math.min(aime, SS_BEND_POINT_2_2026) - SS_BEND_POINT_1_2026) +
        0.15 * Math.max(0, aime - SS_BEND_POINT_2_2026);
      const factor = SS_CLAIM_FACTORS[String(i.claimAge)] ?? 1;
      const monthly = pia * factor;
      const pct = Math.round((factor - 1) * 100);
      return {
        monthly,
        annual: monthly * 12,
        fraBenefit: pia,
        adjustment: pct === 0 ? '0%' : `${pct > 0 ? '+' : ''}${pct}%`,
      };
    },
    seo: {
      title: 'Social Security Calculator: Estimate Monthly Benefit',
      description: 'Free Social Security calculator. Estimate your monthly benefit at 62, 67, or 70 from career-average earnings using 2026 bend points. Simplified estimate only.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['retirement-calculator', '401k-calculator', 'roth-ira-calculator'],
  },
];
