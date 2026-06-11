import { CalculatorConfig } from '../calculator-types';

export const mathUsCalculators: CalculatorConfig[] = [
  {
    slug: 'scientific-calculator',
    name: 'Scientific Calculator',
    category: 'math',
    icon: 'Calculator',
    description: 'A full scientific calculator in your browser — trig in degrees or radians, logarithms, powers, roots, factorials, and memory keys with proper order of operations.',
    trending: true,
    custom: 'scientific',
    inputs: [],
    outputs: [],
    calculate: () => ({}),
    seo: {
      title: 'Scientific Calculator — Free Online with Trig & Logs',
      description: 'Free scientific calculator online. Trig in degrees or radians, logs, powers, roots, factorials, and memory keys — with full order of operations.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['percentage-calculator', 'quadratic-calculator', 'logarithm-calculator', 'trigonometry-calculator'],
  },
  {
    slug: 'random-number-generator',
    name: 'Random Number Generator',
    category: 'math',
    icon: 'Dices',
    description: 'Generate fair, unbiased random numbers in any range you choose — both endpoints included. Perfect for raffles, giveaways, games, sampling, and quick decisions.',
    custom: 'random-number',
    inputs: [],
    outputs: [],
    calculate: () => ({}),
    seo: {
      title: 'Random Number Generator — Free, Fair & Instant Picks',
      description: 'Free random number generator. Pick fair, unbiased numbers in any range — both endpoints included. Great for raffles, games, sampling, and decisions.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['probability-calculator', 'statistics-calculator'],
  },
  {
    slug: 'percentage-change-calculator',
    name: 'Percentage Change Calculator',
    category: 'math',
    icon: 'Percent',
    description: 'Find the percentage increase or decrease between two numbers, with the direction of change and the exact difference shown instantly.',
    inputs: [
      { key: 'oldValue', label: 'Old Value', type: 'slider', min: -100000, max: 100000, step: 1, default: 200, color: 'primary' },
      { key: 'newValue', label: 'New Value', type: 'slider', min: -100000, max: 100000, step: 1, default: 250, color: 'secondary' },
    ],
    outputs: [
      { key: 'pctChange', label: 'Percentage Change', suffix: '%', decimals: 2, primary: true },
      { key: 'direction', label: 'Direction', color: 'secondary' },
      { key: 'difference', label: 'Difference', decimals: 2, color: 'tertiary' },
    ],
    calculate: (i) => {
      const oldV = Number(i.oldValue);
      const newV = Number(i.newValue);
      const difference = newV - oldV;
      if (oldV === 0) {
        return {
          pctChange: 'Undefined (old value is 0)',
          direction: difference > 0 ? 'Increase (from zero)' : difference < 0 ? 'Decrease (from zero)' : 'No change',
          difference,
        };
      }
      const pct = (difference / Math.abs(oldV)) * 100;
      return {
        pctChange: pct,
        direction: pct > 0 ? 'Increase' : pct < 0 ? 'Decrease' : 'No change',
        difference,
      };
    },
    seo: {
      title: 'Percentage Change Calculator: Increase or Decrease %',
      description: 'Free percentage change calculator. Find the percent increase or decrease between two values, plus the direction and exact difference — instantly.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['percentage-calculator', 'discount-calculator', 'markup-calculator'],
  },
];
