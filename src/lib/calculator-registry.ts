import { CalculatorConfig, CalculatorCategory, CATEGORIES } from './calculator-types';
import { INDEXABLE_CALCULATORS } from './indexable-calculators';
import { US_DELISTED_CALCULATORS } from './market-delist';
import { financeCalculators } from './calculators/finance';
import { financeUsTaxCalculators } from './calculators/finance-us-tax';
import { financeUsLoanCalculators } from './calculators/finance-us-loans';
import { financeUsRetirementCalculators } from './calculators/finance-us-retirement';
import { healthCalculators } from './calculators/health';
import { healthUsCalculators } from './calculators/health-us';
import { mathCalculators } from './calculators/math';
import { mathUsCalculators } from './calculators/math-us';
import { cryptoCalculators } from './calculators/crypto';
import { engineeringCalculators } from './calculators/engineering';
import { dailyLifeCalculators } from './calculators/daily-life';
import { dailyLifeUsCalculators } from './calculators/daily-life-us';
import { educationCalculators } from './calculators/education';
import { universityCgpaCalculators } from './calculators/education-cgpa-universities';
import { businessCalculators } from './calculators/business';
import { financeLongtailCalculators } from './calculators/finance-longtail';
import { indiaSalaryCalculators } from './calculators/india-salary';
import { indiaPropertyCalculators } from './calculators/india-property';
import { indiaEducationCalculators } from './calculators/india-education';

// Every calculator we have a config for. Most still carry the original
// templated AI content that AdSense flagged as "Low value content", so they
// are NOT served yet — see the allowlist filter below.
const ALL_DEFINED_CALCULATORS: CalculatorConfig[] = [
  ...financeCalculators,
  ...financeUsTaxCalculators,
  ...financeUsLoanCalculators,
  ...financeUsRetirementCalculators,
  ...healthCalculators,
  ...healthUsCalculators,
  ...mathCalculators,
  ...mathUsCalculators,
  ...cryptoCalculators,
  ...engineeringCalculators,
  ...dailyLifeCalculators,
  ...dailyLifeUsCalculators,
  ...educationCalculators,
  ...universityCgpaCalculators,
  ...businessCalculators,
  ...financeLongtailCalculators,
  ...indiaSalaryCalculators,
  ...indiaPropertyCalculators,
  ...indiaEducationCalculators,
];

// Two independent questions, deliberately kept apart:
//   1. Is this page SERVED to visitors?  -> `allCalculators` (everything)
//   2. May Google INDEX it?              -> `indexableCalculators`
//
// The 2026-06-28 AdSense prune answered both with one flag: non-allowlisted
// slugs were filtered out of `allCalculators`, so their pages 404'd. That broke
// 30 internal links from the Strapi blog posts (which still point at the older,
// larger calculator set) and fed Googlebot a steady diet of 404s from our own
// internal links. A `noindex, follow` page still returns 200, still serves
// humans arriving from a blog post, and still passes link equity — which is
// what the not-yet-rewritten calculators actually need.
export const allCalculators: CalculatorConfig[] = ALL_DEFINED_CALCULATORS;

// Three questions now, still kept apart:
//   1. Is this page SERVED?          -> `allCalculators`      (everything)
//   2. Is it LISTED to visitors?     -> `listedCalculators`   (minus US)
//   3. May Google INDEX it?          -> `indexableCalculators`(the allowlist)
//
// US-market calculators drop out of (2) and (3) but stay in (1). Their URLs
// keep returning 200 for anyone arriving from an old link; they just stop
// appearing in nav, category pages, search, trending and the sitemap.
export const listedCalculators: CalculatorConfig[] = ALL_DEFINED_CALCULATORS.filter(
  (c) => !US_DELISTED_CALCULATORS.has(c.slug),
);

// The rewritten, de-templatized subset Google is allowed to index. Drives the
// sitemap and the robots meta in [category]/[slug]/page.tsx. Everything not in
// here is served as `noindex, follow` until its content is brought up to
// standard — add the slug to INDEXABLE_CALCULATORS and it starts ranking.
export const indexableCalculators: CalculatorConfig[] = ALL_DEFINED_CALCULATORS.filter(
  (c) => INDEXABLE_CALCULATORS.has(c.slug),
);

// Categories with at least one served calculator — drives nav, listings and
// which category routes exist.
export const ACTIVE_CATEGORIES = CATEGORIES.filter((cat) =>
  listedCalculators.some((c) => c.category === cat.id),
);

// Categories with at least one *indexable* calculator — drives the sitemap and
// the category page's robots meta, so reviving a category for humans doesn't
// silently push a thin hub page into the index.
export const INDEXED_CATEGORIES = CATEGORIES.filter((cat) =>
  indexableCalculators.some((c) => c.category === cat.id),
);

export function getCalculatorBySlug(slug: string): CalculatorConfig | undefined {
  return allCalculators.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: CalculatorCategory): CalculatorConfig[] {
  return listedCalculators.filter((c) => c.category === category);
}

export function getTrendingCalculators(limit = 10): CalculatorConfig[] {
  return [...listedCalculators]
    .filter((c) => c.trending)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, limit);
}

export function getPopularCalculators(limit = 10): CalculatorConfig[] {
  return [...listedCalculators]
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, limit);
}

export function searchCalculators(query: string): CalculatorConfig[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return listedCalculators.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
  );
}

// Counted from what a visitor can actually browse — the homepage headline and
// the meta description both use this, and advertising 138 while listing 126
// is the kind of mismatch that reads as padding.
export const TOTAL_CALCULATORS = listedCalculators.length;
