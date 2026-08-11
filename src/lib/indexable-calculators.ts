// Calculator pages we currently let Google index. These are the rewritten,
// high-quality, de-templatized pages. Every other calculator is set to
// `noindex, follow` (see [category]/[slug]/page.tsx) and excluded from the
// sitemap, so Google judges the site on its strong subset while the rest are
// improved over time. Add a slug here once its page has genuine, original
// long-form content — and keep it in sync with scripts/set-noindex.ts.
import { DOCUMENTED_UNIVERSITY_SLUGS } from './calculators/education-cgpa-universities';
import { US_DELISTED_CALCULATORS } from './market-delist';

const ALLOWLIST = new Set<string>([
  // ── Added 2026-08-11 ──────────────────────────────────────────────────────
  // Long-tail finance tools built around a feature the base calculator lacks.
  // Each ships ~4k chars of inline article + 6 FAQs, so none is thin.
  'emi-prepayment-calculator', 'sip-step-up-calculator', 'xirr-calculator',

  // India salary/CTC + regime set. Replaces the ground the delisted US payroll
  // and federal-income-tax calculators used to occupy.
  'in-hand-salary-calculator', 'gratuity-calculator', 'hra-exemption-calculator',
  'leave-encashment-calculator', 'notice-period-buyout-calculator',
  'old-vs-new-tax-regime-calculator',

  // India loan/property set. Replaces the delisted US mortgage, auto-loan and
  // house-affordability ground.
  'loan-against-property-calculator', 'home-loan-balance-transfer-calculator',
  'home-loan-tax-benefit-calculator', 'rent-vs-buy-calculator',

  // Exam/semester set — the category where the domain already ranks top-5.
  'percentile-to-rank-calculator', 'sgpa-calculator',

  // University CGPA conversions. Only the slugs whose formula is confirmed
  // against the university's own documentation are listed — the rest carry
  // formulaConfidence: 'verify' in education-cgpa-universities.ts and are
  // served noindex until someone checks the ordinance. Keeping this derived
  // from the data means flipping one field there flips indexability here.
  ...DOCUMENTED_UNIVERSITY_SLUGS,

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

  // Restored 2026-07-31 on the evidence of the GSC export (last 6 months).
  // These six were the site's best-ranking pages when the 2026-06-28 prune
  // 404'd them. Impressions / avg position at the time they were pulled:
  //   study-hours-calculator   65 impressions, pos 8.8  <- 43% of ALL site impressions
  //   cgpa-calculator           7 impressions, pos 2.3
  //   percentage-to-gpa         6 impressions, pos 5.2
  //   gear-ratio-calculator     5 impressions, pos 2.2
  //   payroll-calculator        5 impressions, pos 57.8 <- matches 3 payroll queries
  //   cagr-calculator           4 impressions, pos 17.8
  // Every one carries 3.4k-6.2k chars of Strapi content — more than several
  // slugs already on this list. No head-term page has ever earned a single
  // impression, so these are the only proven demand the site has.
  'study-hours-calculator', 'cgpa-calculator', 'percentage-to-gpa',
  'gear-ratio-calculator', 'payroll-calculator', 'cagr-calculator',

  // Staged restore wave 1, 2026-07-31. The 2026-06-16 "index only the 25"
  // commit cost 56% of impressions on its own, and the pages it hid are not
  // thin — every slug below carries 4.5k-6.4k chars of Strapi content and its
  // own CMS pageTitle. Selection rules, applied in order:
  //   - >= 4500 chars of Strapi content
  //   - has a Strapi pageTitle (config seo.title values are head-term-y and
  //     unwinnable for this domain)
  //   - not from a *-us.ts config: the US market shows 32 impressions / 0 clicks
  //   - tip-calculator-daily excluded: would cannibalise finance/tip-calculator
  // profit-margin, crypto-portfolio and fuel-cost additionally have direct GSC
  // query evidence ("profit margin calculator", "crypto trading calculator",
  // "1km petrol price"). Hold here and read GSC for 3-4 weeks before wave 2 —
  // the remaining ~57 noindex slugs are the control group.
  'unit-converter', 'pipe-flow-calculator', 'voltage-divider-calculator',
  'torque-calculator', 'rpm-calculator', 'resistor-color-code', 'ohms-law-calculator',
  'vo2-max-calculator', 'water-intake-calculator', 'ovulation-calculator',
  'pace-calculator', 'one-rep-max',
  'trigonometry-calculator', 'ratio-calculator', 'quadratic-calculator',
  'travel-time-calculator', 'paint-calculator', 'fuel-cost-calculator',
  'retirement-calculator', 'net-worth-calculator',
  'roi-calculator', 'profit-margin-calculator',
  'crypto-portfolio-calculator', 'reading-speed-calculator',
]);

// The allowlist above is the historical record of what was judged good enough
// to index. The US delisting is applied on top of it rather than by deleting
// lines, so the reason a slug stopped being indexed stays visible in one place
// (market-delist.ts) instead of vanishing into a diff. Ten US slugs the
// 2026-07-14 wave added — paycheck, federal income tax, sales tax, capital
// gains, 401k, Roth IRA, social security, student loan, house affordability,
// auto loan — plus mortgage drop out here.
export const INDEXABLE_CALCULATORS = new Set<string>(
  [...ALLOWLIST].filter((slug) => !US_DELISTED_CALCULATORS.has(slug)),
);
