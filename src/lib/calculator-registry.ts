import { CalculatorConfig, CalculatorCategory, CATEGORIES } from './calculator-types';
import { INDEXABLE_CALCULATORS } from './indexable-calculators';
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
import { businessCalculators } from './calculators/business';

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
  ...businessCalculators,
];

// AdSense hard-prune (2026-06-28): only the de-templatized, genuinely original
// calculators are live. A pruned slug's page 404s (getCalculatorBySlug returns
// undefined), and it drops out of nav, listings, the sitemap and every count
// (all derived from `allCalculators`). Fully reversible: once a page's content
// is rewritten to standard, add its slug to INDEXABLE_CALCULATORS and it
// returns automatically — no other change needed.
export const allCalculators: CalculatorConfig[] = ALL_DEFINED_CALCULATORS.filter(
  (c) => INDEXABLE_CALCULATORS.has(c.slug),
);

// Categories that still have at least one live calculator. Empty categories are
// hidden from nav/listings and their routes 404, so the pruned site never shows
// a bare "0 tools" section.
export const ACTIVE_CATEGORIES = CATEGORIES.filter((cat) =>
  allCalculators.some((c) => c.category === cat.id),
);

export function getCalculatorBySlug(slug: string): CalculatorConfig | undefined {
  return allCalculators.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: CalculatorCategory): CalculatorConfig[] {
  return allCalculators.filter((c) => c.category === category);
}

export function getTrendingCalculators(limit = 10): CalculatorConfig[] {
  return [...allCalculators]
    .filter((c) => c.trending)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, limit);
}

export function getPopularCalculators(limit = 10): CalculatorConfig[] {
  return [...allCalculators]
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, limit);
}

export function searchCalculators(query: string): CalculatorConfig[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allCalculators.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
  );
}

export const TOTAL_CALCULATORS = allCalculators.length;
