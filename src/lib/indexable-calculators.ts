// Calculator pages we currently let Google index. These are the rewritten,
// high-quality, de-templatized pages. Every other calculator is set to
// `noindex, follow` (see [category]/[slug]/page.tsx) and excluded from the
// sitemap, so Google judges the site on its strong subset while the rest are
// improved over time. Add a slug here once its page has genuine, original
// long-form content — and keep it in sync with scripts/set-noindex.ts.
export const INDEXABLE_CALCULATORS = new Set<string>([
  'emi-calculator', 'sip-calculator', 'gst-calculator', 'income-tax-calculator', 'ppf-calculator',
  'fd-calculator', 'rd-calculator', 'mortgage-calculator', 'nps-calculator', 'hra-calculator',
  'cibil-calculator', 'compound-interest-calculator', 'lumpsum-calculator', 'mutual-fund-returns',
  'inflation-calculator', 'loan-eligibility-calculator', 'capital-gains-tax-calculator',
  'currency-converter', 'bmi-calculator', 'calorie-calculator', 'age-calculator',
  'pregnancy-due-date', 'percentage-calculator', 'gpa-calculator', 'tip-calculator',

  // Already had finished, fact-checked inline content (src/lib/calculator-content) that
  // was never seeded into Strapi — un-pruned 2026-07-14, no new writing needed.
  'paycheck-calculator', 'federal-income-tax-calculator', 'sales-tax-calculator',
  'auto-loan-calculator', 'student-loan-calculator', 'house-affordability-calculator',
  '401k-calculator', 'roth-ira-calculator', 'social-security-calculator',
  'scientific-calculator', 'random-number-generator', 'percentage-change-calculator',
  'tdee-calculator', 'calories-burned-calculator', 'protein-intake-calculator',
]);
