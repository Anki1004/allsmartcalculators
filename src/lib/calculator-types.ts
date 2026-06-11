export type CalculatorCategory =
  | 'finance'
  | 'health'
  | 'math'
  | 'crypto'
  | 'engineering'
  | 'daily-life'
  | 'education'
  | 'business';

export interface CalculatorInput {
  key: string;
  label: string;
  type: 'slider' | 'number' | 'select' | 'date' | 'text';
  /** Placeholder for type: 'text' inputs. */
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  default: number | string;
  prefix?: string;
  suffix?: string;
  options?: { label: string; value: string | number }[];
  color?: 'primary' | 'secondary' | 'tertiary';
  formatValue?: (v: number) => string;
}

export interface CalculatorOutput {
  key: string;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  primary?: boolean;
  color?: 'primary' | 'secondary' | 'tertiary' | 'white';
}

export interface CalculatorSeo {
  /** Page title fallback when Strapi pageTitle is empty. */
  title?: string;
  /** Meta description fallback when Strapi metaDescription is empty. */
  description?: string;
  /** WebApplication.applicationCategory — e.g. "FinanceApplication", "HealthApplication" */
  applicationCategory?: string;
  /** Aggregate rating exposed in JSON-LD */
  rating?: { value: number; count: number };
}

export interface CalculatorRuntimeContext {
  currencyRates?: Record<string, number>;
}

export interface CalculatorConfig {
  slug: string;
  name: string;
  shortName?: string;
  category: CalculatorCategory;
  icon: string; // lucide icon name or material symbol
  description: string;
  longDescription?: string;
  trending?: boolean;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  calculate: (
    inputs: Record<string, number | string>,
    context?: CalculatorRuntimeContext,
  ) => Record<string, number | string>;
  chartType?: 'donut' | 'bar' | 'line' | 'none';

  // Page content (intro, tips, how-it-works, formula, FAQs, ranges,
  // limitations, sources) is authored in Strapi — see CalculatorCMS.
  /** Per-calc SEO fallbacks for the <head> when Strapi values are empty. */
  seo?: CalculatorSeo;
  /** ISO date string ("2026-04-26"). Visible date + dateModified in schema. */
  lastUpdated?: string;
  /** "Reviewed by" attribution for YMYL pages. */
  reviewedBy?: { name: string; credential: string; href?: string };

  // NOTE: fallback article/FAQ content lives in src/lib/calculator-content/*
  // (server-only) so the long markdown strings stay out of the client bundle —
  // the 'use client' engine imports the whole registry.
  /** Hand-picked related calculator slugs (cross-category allowed).
      Falls back to first 4 of the same category when omitted. */
  relatedSlugs?: string[];
  /** Render a bespoke component instead of the config-driven engine
      (for UIs that don't fit sliders/selects). */
  custom?: 'scientific' | 'time-card' | 'random-number';
  /** Optional detail table (e.g. amortization schedule) rendered below the
      results once the user has interacted. Return null to hide. */
  buildTable?: (inputs: Record<string, number | string>) => {
    title: string;
    headers: string[];
    rows: (string | number)[][];
  } | null;
}

export const CATEGORIES: {
  id: CalculatorCategory;
  name: string;
  icon: string;
  color: string;
  description: string;
}[] = [
  {
    id: 'finance',
    name: 'Finance',
    icon: '💰',
    color: 'from-primary-dim to-primary',
    description: 'Loans, investments, taxes, and money',
  },
  {
    id: 'health',
    name: 'Health',
    icon: '🏃',
    color: 'from-tertiary-dim to-tertiary',
    description: 'BMI, calories, fitness and wellness',
  },
  {
    id: 'math',
    name: 'Math',
    icon: '🔢',
    color: 'from-secondary-dim to-secondary',
    description: 'Scientific, statistical, and calculus',
  },
  {
    id: 'crypto',
    name: 'Crypto',
    icon: '₿',
    color: 'from-primary to-secondary',
    description: 'Bitcoin, staking, DeFi and trading',
  },
  {
    id: 'engineering',
    name: 'Engineering',
    icon: '⚙️',
    color: 'from-secondary to-tertiary',
    description: 'Electrical, mechanical, and civil',
  },
  {
    id: 'daily-life',
    name: 'Daily Life',
    icon: '☕',
    color: 'from-primary to-tertiary',
    description: 'Tips, travel, cooking and more',
  },
  {
    id: 'education',
    name: 'Education',
    icon: '🎓',
    color: 'from-secondary to-primary',
    description: 'GPA, grades, and study tools',
  },
  {
    id: 'business',
    name: 'Business',
    icon: '📊',
    color: 'from-tertiary to-primary',
    description: 'ROI, margins, and SaaS metrics',
  },
];
