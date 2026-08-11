// ─────────────────────────────────────────────────────────────────────────────
// Indian income-tax constants, in one place and dated.
//
// ⚠ ASSESSMENT YEAR: these are the FY 2025-26 (AY 2026-27) figures.
// Indian slabs, the standard deduction and the 87A rebate all move in the
// Union Budget each February. Before the next filing season, check every
// constant below against the current Finance Act and bump FY_LABEL — the
// calculators render FY_LABEL on the page, so a stale year is visible to the
// user rather than silently wrong.
//
// Deliberately excluded because the rates differ by state and change often
// enough that a hardcoded table would be wrong somewhere within a year:
// stamp duty and registration charges. A calculator that quietly reports the
// wrong stamp duty on a ₹80 lakh flat is worse than no calculator.
// ─────────────────────────────────────────────────────────────────────────────

export const FY_LABEL = 'FY 2025-26 (AY 2026-27)';

export interface Slab {
  /** Upper bound of this slab. Infinity for the top slab. */
  upTo: number;
  rate: number;
}

/** New regime — the default regime unless the taxpayer opts out. */
export const NEW_REGIME_SLABS: Slab[] = [
  { upTo: 400000, rate: 0 },
  { upTo: 800000, rate: 0.05 },
  { upTo: 1200000, rate: 0.1 },
  { upTo: 1600000, rate: 0.15 },
  { upTo: 2000000, rate: 0.2 },
  { upTo: 2400000, rate: 0.25 },
  { upTo: Infinity, rate: 0.3 },
];

/** Old regime — available only if the taxpayer opts in. */
export const OLD_REGIME_SLABS: Slab[] = [
  { upTo: 250000, rate: 0 },
  { upTo: 500000, rate: 0.05 },
  { upTo: 1000000, rate: 0.2 },
  { upTo: Infinity, rate: 0.3 },
];

export const STANDARD_DEDUCTION_NEW = 75000;
export const STANDARD_DEDUCTION_OLD = 50000;

/** Section 87A rebate: full tax relief up to the income ceiling. */
export const REBATE_87A_NEW = { maxIncome: 1200000, maxRebate: 60000 };
export const REBATE_87A_OLD = { maxIncome: 500000, maxRebate: 12500 };

export const CESS_RATE = 0.04; // Health & Education cess on tax + surcharge

/** Surcharge on tax, by total income. New regime caps the top rate at 25%. */
const SURCHARGE_BANDS = [
  { above: 50000000, old: 0.37, next: 0.25 },
  { above: 20000000, old: 0.25, next: 0.25 },
  { above: 10000000, old: 0.15, next: 0.15 },
  { above: 5000000, old: 0.1, next: 0.1 },
];

export function surchargeRate(income: number, regime: 'old' | 'new'): number {
  for (const b of SURCHARGE_BANDS) {
    if (income > b.above) return regime === 'old' ? b.old : b.next;
  }
  return 0;
}

/** Tax from a slab table, before rebate, surcharge and cess. */
export function slabTax(taxableIncome: number, slabs: Slab[]): number {
  let tax = 0;
  let lower = 0;
  for (const s of slabs) {
    if (taxableIncome <= lower) break;
    const bandTop = Math.min(taxableIncome, s.upTo);
    tax += (bandTop - lower) * s.rate;
    lower = s.upTo;
  }
  return tax;
}

export interface TaxBreakdown {
  taxableIncome: number;
  slabTax: number;
  rebate: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
}

/**
 * Full income-tax computation for a salaried individual under 60.
 *
 * `deductions` is only applied under the old regime — 80C, 80D, HRA and the
 * rest are unavailable in the new regime, which is the single most common
 * mistake in DIY tax comparisons.
 */
export function computeTax(
  grossIncome: number,
  regime: 'old' | 'new',
  deductions = 0,
): TaxBreakdown {
  const standard = regime === 'new' ? STANDARD_DEDUCTION_NEW : STANDARD_DEDUCTION_OLD;
  const allowedDeductions = regime === 'new' ? 0 : deductions;
  const taxableIncome = Math.max(0, grossIncome - standard - allowedDeductions);

  const slabs = regime === 'new' ? NEW_REGIME_SLABS : OLD_REGIME_SLABS;
  const rebateRule = regime === 'new' ? REBATE_87A_NEW : REBATE_87A_OLD;

  const base = slabTax(taxableIncome, slabs);
  const rebate = taxableIncome <= rebateRule.maxIncome ? Math.min(base, rebateRule.maxRebate) : 0;
  const afterRebate = Math.max(0, base - rebate);

  const surcharge = afterRebate * surchargeRate(taxableIncome, regime);
  const cess = (afterRebate + surcharge) * CESS_RATE;
  const totalTax = afterRebate + surcharge + cess;

  return {
    taxableIncome,
    slabTax: base,
    rebate,
    surcharge,
    cess,
    totalTax,
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
  };
}

// ── Professional tax ────────────────────────────────────────────────────────
// Levied by the state, capped at ₹2,500 a year by Article 276 of the
// Constitution. Several states levy none at all — which is why a national
// "in-hand salary" calculator that ignores the state is wrong for everyone.
//
// ⚠ Slabs within each state vary by salary band; the figures below are the
// annual amount for a salary comfortably above the top band, which is the case
// for anyone this calculator is aimed at. Verify against the state's own
// notification for lower salaries.
export const PROFESSIONAL_TAX_BY_STATE: { label: string; value: string; annual: number }[] = [
  { label: 'Delhi — none', value: 'DL', annual: 0 },
  { label: 'Uttar Pradesh — none', value: 'UP', annual: 0 },
  { label: 'Haryana — none', value: 'HR', annual: 0 },
  { label: 'Rajasthan — none', value: 'RJ', annual: 0 },
  { label: 'Maharashtra', value: 'MH', annual: 2500 },
  { label: 'Karnataka', value: 'KA', annual: 2400 },
  { label: 'West Bengal', value: 'WB', annual: 2496 },
  { label: 'Tamil Nadu', value: 'TN', annual: 2500 },
  { label: 'Telangana', value: 'TG', annual: 2500 },
  { label: 'Andhra Pradesh', value: 'AP', annual: 2500 },
  { label: 'Gujarat', value: 'GJ', annual: 2400 },
  { label: 'Madhya Pradesh', value: 'MP', annual: 2500 },
  { label: 'Kerala', value: 'KL', annual: 2500 },
  { label: 'Odisha', value: 'OR', annual: 2500 },
  { label: 'Bihar', value: 'BR', annual: 2500 },
  { label: 'Assam', value: 'AS', annual: 2500 },
  { label: 'Punjab', value: 'PB', annual: 2400 },
];

/** EPF wage ceiling for the statutory minimum contribution. */
export const EPF_WAGE_CEILING = 15000;
export const EPF_RATE = 0.12;

/** Gratuity is capped at ₹20 lakh under the Payment of Gratuity Act. */
export const GRATUITY_EXEMPTION_CAP = 2000000;
