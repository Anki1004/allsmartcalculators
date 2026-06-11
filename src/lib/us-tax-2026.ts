// US federal tax data for TAX YEAR 2026.
// Source: IRS Rev. Proc. 2025-32 and Notice 2025-67 (released Nov 13, 2025).
// Update annually when the IRS publishes the next year's inflation adjustments.

export type FilingStatus = 'single' | 'mfj' | 'hoh' | 'mfs';

export const FILING_STATUS_OPTIONS = [
  { label: 'Single', value: 'single' },
  { label: 'Married Filing Jointly', value: 'mfj' },
  { label: 'Head of Household', value: 'hoh' },
  { label: 'Married Filing Separately', value: 'mfs' },
];

/** 2026 standard deduction by filing status. */
export const STANDARD_DEDUCTION_2026: Record<FilingStatus, number> = {
  single: 16100,
  mfj: 32200,
  hoh: 24150,
  mfs: 16100,
};

/** 2026 federal marginal brackets: [upper bound of bracket, rate]. */
export const FEDERAL_BRACKETS_2026: Record<FilingStatus, [number, number][]> = {
  single: [
    [12400, 0.10],
    [50400, 0.12],
    [105700, 0.22],
    [201775, 0.24],
    [256225, 0.32],
    [640600, 0.35],
    [Infinity, 0.37],
  ],
  mfj: [
    [24800, 0.10],
    [100800, 0.12],
    [211400, 0.22],
    [403550, 0.24],
    [512450, 0.32],
    [768700, 0.35],
    [Infinity, 0.37],
  ],
  hoh: [
    [17700, 0.10],
    [67450, 0.12],
    [105700, 0.22],
    [201775, 0.24],
    [256200, 0.32],
    [640600, 0.35],
    [Infinity, 0.37],
  ],
  mfs: [
    [12400, 0.10],
    [50400, 0.12],
    [105700, 0.22],
    [201775, 0.24],
    [256225, 0.32],
    [384350, 0.35],
    [Infinity, 0.37],
  ],
};

/** Sum of marginal tax across the 2026 brackets for a given taxable income. */
export function federalTax2026(taxable: number, status: FilingStatus): number {
  let tax = 0;
  let prev = 0;
  for (const [cap, rate] of FEDERAL_BRACKETS_2026[status]) {
    if (taxable > cap) {
      tax += (cap - prev) * rate;
      prev = cap;
    } else {
      tax += Math.max(0, taxable - prev) * rate;
      break;
    }
  }
  return tax;
}

/** Top marginal rate reached at a given taxable income (as a fraction, e.g. 0.22). */
export function marginalRate2026(taxable: number, status: FilingStatus): number {
  let rate = 0;
  let prev = 0;
  for (const [cap, r] of FEDERAL_BRACKETS_2026[status]) {
    if (taxable > prev) rate = r;
    if (taxable <= cap) break;
    prev = cap;
  }
  return rate;
}

/** Per-bracket breakdown rows for a given taxable income. */
export function bracketBreakdown2026(
  taxable: number,
  status: FilingStatus,
): { range: string; rate: number; taxedAmount: number; tax: number }[] {
  const rows: { range: string; rate: number; taxedAmount: number; tax: number }[] = [];
  let prev = 0;
  for (const [cap, rate] of FEDERAL_BRACKETS_2026[status]) {
    if (taxable <= prev) break;
    const amount = Math.min(taxable, cap) - prev;
    rows.push({
      range:
        cap === Infinity
          ? `Over $${prev.toLocaleString('en-US')}`
          : `$${prev.toLocaleString('en-US')} – $${cap.toLocaleString('en-US')}`,
      rate,
      taxedAmount: amount,
      tax: amount * rate,
    });
    prev = cap;
  }
  return rows;
}

/** FICA payroll taxes for 2026. */
export const FICA_2026 = {
  ssRate: 0.062,
  ssWageBase: 184500, // max SS tax $11,439
  medicareRate: 0.0145,
  addlMedicareRate: 0.009,
  addlMedicareThreshold: {
    single: 200000,
    mfj: 250000,
    hoh: 200000,
    mfs: 125000,
  } as Record<FilingStatus, number>,
  /** Self-employment tax applies to 92.35% of net profit. */
  seNetEarningsFactor: 0.9235,
  seSsRate: 0.124,
  seMedicareRate: 0.029,
};

/** 2026 retirement contribution limits. */
export const RETIREMENT_LIMITS_2026 = {
  k401Deferral: 24500, // 401(k)/403(b)/457/TSP employee deferral
  k401CatchUp50: 8000, // ages 50+
  k401CatchUp60to63: 11250, // enhanced catch-up, ages 60–63
  combinedLimit: 72000, // employee + employer
  ira: 7500,
  iraCatchUp50: 1100,
  simple: 17000,
  sep: 72000,
};

/** 2026 long-term capital gains breakpoints by taxable income:
    [top of 0% band, top of 15% band] — 20% above. */
export const LTCG_BRACKETS_2026: Record<FilingStatus, [number, number]> = {
  single: [49450, 545500],
  mfj: [98900, 613700],
  hoh: [66200, 579600],
  mfs: [49450, 306850],
};

/** FLSA federal floor. */
export const FLSA = {
  federalMinimumWage: 7.25,
  overtimeMultiplier: 1.5,
  overtimeThresholdHours: 40,
};
