import { financeUsTaxCalculators } from './calculators/finance-us-tax';
import { financeUsLoanCalculators } from './calculators/finance-us-loans';
import { financeUsRetirementCalculators } from './calculators/finance-us-retirement';
import { dailyLifeUsCalculators } from './calculators/daily-life-us';

// ─────────────────────────────────────────────────────────────────────────────
// US-market content, removed from the index and from every listing — but still
// SERVED at its existing URL.
//
// This is deliberately not a deletion. The 2026-06-28 prune deleted 87
// calculators, which 404'd them, broke 30 internal links from Strapi posts and
// cost 77% of impressions. A delisted page here returns 200, still works for
// anyone who lands on it from an old link or bookmark, and still passes link
// equity onward via `noindex, follow` — it simply stops competing for Google's
// attention and stops appearing in nav, search, categories and the sitemap.
//
// Why this list and not "everything in a *-us.ts file": several calculators
// were added during the US wave but are not US-specific at all. A scientific
// calculator, a random number generator, a TDEE calculator and a date
// calculator work identically in every country. Removing those would cost
// traffic without removing any US-ness. The rule applied below is narrow and
// checkable: **delist only where the maths or the rules are bound to US
// jurisdiction.**
//
// Evidence for the decision: in the 2026-07-31 GSC export India produced 9
// clicks from 98 impressions at average position 13.6, while the United States
// produced 0 clicks from 32 impressions at position 24.1.
// ─────────────────────────────────────────────────────────────────────────────

/** Calculators whose formula encodes US law, US tax tables or US units. */
export const US_DELISTED_CALCULATORS = new Set<string>([
  // Federal tax and payroll — IRS brackets, FICA, standard deduction.
  'paycheck-calculator',
  'federal-income-tax-calculator',
  'sales-tax-calculator',
  // US long/short-term capital gains brackets. India's LTCG/STCG rules are
  // different enough to need their own tool, not a re-labelled one.
  'capital-gains-tax-calculator',

  // US retirement accounts — contribution limits and rules set by US statute.
  '401k-calculator',
  'roth-ira-calculator',
  'social-security-calculator',

  // US lending conventions — federal student loan rules, DTI/PMI norms.
  'student-loan-calculator',
  'house-affordability-calculator',
  'auto-loan-calculator',

  // "Mortgage" with home price + down payment in dollars. Indians search
  // "home loan", which /finance/emi-calculator already serves. Kept alive
  // rather than deleted so it can be re-pointed as a home-loan tool later.
  'mortgage-calculator',

  // US units and US labour rules.
  'gas-mileage-calculator',   // miles per gallon
  'time-card-calculator',     // FLSA overtime
]);

/**
 * Added during the US wave but market-neutral — explicitly KEPT.
 * Listed rather than merely omitted so that a future "delete the US stuff"
 * pass does not sweep them up by file name.
 */
export const US_WAVE_BUT_UNIVERSAL = [
  'scientific-calculator',
  'random-number-generator',
  'percentage-change-calculator',
  'tdee-calculator',
  'calories-burned-calculator',
  'protein-intake-calculator',
  'square-footage-calculator',
  'hours-calculator',
  'date-calculator',
  'love-calculator',
] as const;

/** Blog posts whose subject only exists under US law. */
export const US_DELISTED_POSTS = new Set<string>([
  'heloc-explained',
  'roth-ira-explained',
  'apr-vs-apy-explained',
  'capital-gains-tax-when-you-sell',
  'how-much-to-retire',
  'calculate-mortgage-payment',
  'time-card-calculator-overtime-pay',
]);

/**
 * Posts about an Indian or universal subject that were nonetheless WRITTEN with
 * US framing, dollar figures and US institutions. Rewriting beats delisting for
 * these — `compound-interest-formula-examples` alone accounts for 8 of the 25
 * queries the site has ever received impressions for, and
 * `emi-calculator-explained` is about an Indian product with 36 US signals in
 * its text against 5 Indian ones.
 */
export const POSTS_NEEDING_INDIA_REWRITE = [
  'emi-calculator-explained',
  'compound-interest-formula-examples',
  'debt-snowball-vs-avalanche',
] as const;

/** Sanity check: every slug above must exist in a US config file. */
export const US_CONFIG_SLUGS = new Set(
  [
    ...financeUsTaxCalculators,
    ...financeUsLoanCalculators,
    ...financeUsRetirementCalculators,
    ...dailyLifeUsCalculators,
  ].map((c) => c.slug),
);
