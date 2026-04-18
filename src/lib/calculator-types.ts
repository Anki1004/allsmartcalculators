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
  type: 'slider' | 'number' | 'select' | 'date';
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

export interface CalculatorConfig {
  slug: string;
  name: string;
  shortName?: string;
  category: CalculatorCategory;
  icon: string; // lucide icon name or material symbol
  description: string;
  longDescription?: string;
  trending?: boolean;
  usageCount?: number;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  calculate: (inputs: Record<string, number | string>) => Record<string, number | string>;
  chartType?: 'donut' | 'bar' | 'line' | 'none';
  formula?: string;
  faqs?: { q: string; a: string }[];
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
