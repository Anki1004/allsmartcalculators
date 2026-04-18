import { CalculatorConfig, CalculatorCategory } from './calculator-types';
import { financeCalculators } from './calculators/finance';
import { healthCalculators } from './calculators/health';
import { mathCalculators } from './calculators/math';
import { cryptoCalculators } from './calculators/crypto';
import { engineeringCalculators } from './calculators/engineering';
import { dailyLifeCalculators } from './calculators/daily-life';
import { educationCalculators } from './calculators/education';
import { businessCalculators } from './calculators/business';

export const allCalculators: CalculatorConfig[] = [
  ...financeCalculators,
  ...healthCalculators,
  ...mathCalculators,
  ...cryptoCalculators,
  ...engineeringCalculators,
  ...dailyLifeCalculators,
  ...educationCalculators,
  ...businessCalculators,
];

export function getCalculatorBySlug(slug: string): CalculatorConfig | undefined {
  return allCalculators.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: CalculatorCategory): CalculatorConfig[] {
  return allCalculators.filter((c) => c.category === category);
}

export function getTrendingCalculators(limit = 10): CalculatorConfig[] {
  return [...allCalculators]
    .filter((c) => c.trending)
    .sort((a, b) => (b.usageCount ?? 0) - (a.usageCount ?? 0))
    .slice(0, limit);
}

export function getPopularCalculators(limit = 10): CalculatorConfig[] {
  return [...allCalculators]
    .sort((a, b) => (b.usageCount ?? 0) - (a.usageCount ?? 0))
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
