import { CalculatorConfig } from '../calculator-types';

export const businessCalculators: CalculatorConfig[] = [
  {
    slug: 'roi-calculator',
    name: 'ROI Calculator',
    category: 'business',
    icon: 'TrendingUp',
    description: 'Return on investment percentage.',
    trending: true,
    usageCount: 98000,
    inputs: [
      { key: 'gain', label: 'Investment Gain', type: 'slider', min: 0, max: 1000000, step: 100, default: 25000, prefix: '$', color: 'primary' },
      { key: 'cost', label: 'Investment Cost', type: 'slider', min: 1, max: 1000000, step: 100, default: 100000, prefix: '$', color: 'secondary' },
    ],
    outputs: [
      { key: 'roi', label: 'ROI', suffix: '%', decimals: 2, primary: true },
      { key: 'netProfit', label: 'Net Profit', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => ({
      roi: Number(i.cost) > 0 ? (Number(i.gain) / Number(i.cost)) * 100 : 0,
      netProfit: Number(i.gain),
    }),
  },
  {
    slug: 'break-even-calculator',
    name: 'Break-Even Calculator',
    category: 'business',
    icon: 'Target',
    description: 'Units to sell to cover costs.',
    usageCount: 42000,
    inputs: [
      { key: 'fixedCosts', label: 'Fixed Costs', type: 'slider', min: 100, max: 1000000, step: 100, default: 50000, prefix: '$', color: 'primary' },
      { key: 'price', label: 'Price per Unit', type: 'slider', min: 1, max: 10000, step: 1, default: 50, prefix: '$', color: 'secondary' },
      { key: 'variableCost', label: 'Variable Cost/Unit', type: 'slider', min: 0, max: 5000, step: 1, default: 20, prefix: '$', color: 'tertiary' },
    ],
    outputs: [
      { key: 'units', label: 'Break-Even Units', decimals: 0, primary: true },
      { key: 'revenue', label: 'Break-Even Revenue', prefix: '$', color: 'secondary' },
    ],
    calculate: (i) => {
      const margin = Number(i.price) - Number(i.variableCost);
      if (margin <= 0) return { units: 9999999, revenue: 0 };
      const units = Number(i.fixedCosts) / margin;
      return { units: Math.ceil(units), revenue: units * Number(i.price) };
    },
  },
  {
    slug: 'profit-margin-calculator',
    name: 'Profit Margin',
    category: 'business',
    icon: 'Percent',
    description: 'Gross and net profit margins.',
    trending: true,
    usageCount: 76000,
    inputs: [
      { key: 'revenue', label: 'Revenue', type: 'slider', min: 100, max: 10000000, step: 100, default: 500000, prefix: '$', color: 'primary' },
      { key: 'cogs', label: 'Cost of Goods Sold', type: 'slider', min: 0, max: 10000000, step: 100, default: 200000, prefix: '$', color: 'secondary' },
      { key: 'opex', label: 'Operating Expenses', type: 'slider', min: 0, max: 10000000, step: 100, default: 150000, prefix: '$', color: 'tertiary' },
    ],
    outputs: [
      { key: 'grossMargin', label: 'Gross Margin', suffix: '%', decimals: 2, primary: true },
      { key: 'netMargin', label: 'Net Margin', suffix: '%', decimals: 2, color: 'secondary' },
      { key: 'netProfit', label: 'Net Profit', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const r = Number(i.revenue);
      const gross = r - Number(i.cogs);
      const net = gross - Number(i.opex);
      return {
        grossMargin: r > 0 ? (gross / r) * 100 : 0,
        netMargin: r > 0 ? (net / r) * 100 : 0,
        netProfit: net,
      };
    },
  },
  {
    slug: 'markup-calculator',
    name: 'Markup Calculator',
    category: 'business',
    icon: 'TrendingUp',
    description: 'Selling price from cost and markup.',
    usageCount: 38000,
    inputs: [
      { key: 'cost', label: 'Cost', type: 'slider', min: 0.01, max: 10000, step: 0.01, default: 50, prefix: '$', color: 'primary' },
      { key: 'markup', label: 'Markup %', type: 'slider', min: 0, max: 500, step: 1, default: 40, suffix: '%', color: 'secondary' },
    ],
    outputs: [
      { key: 'price', label: 'Selling Price', prefix: '$', decimals: 2, primary: true },
      { key: 'profit', label: 'Profit', prefix: '$', decimals: 2, color: 'tertiary' },
    ],
    calculate: (i) => {
      const profit = Number(i.cost) * (Number(i.markup) / 100);
      return { price: Number(i.cost) + profit, profit };
    },
  },
  {
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    category: 'business',
    icon: 'Tag',
    description: 'Final price after discount.',
    trending: true,
    usageCount: 156000,
    inputs: [
      { key: 'original', label: 'Original Price', type: 'slider', min: 0.01, max: 10000, step: 0.01, default: 100, prefix: '$', color: 'primary' },
      { key: 'discount', label: 'Discount %', type: 'slider', min: 0, max: 90, step: 1, default: 25, suffix: '%', color: 'secondary' },
    ],
    outputs: [
      { key: 'final', label: 'Final Price', prefix: '$', decimals: 2, primary: true },
      { key: 'saved', label: 'You Save', prefix: '$', decimals: 2, color: 'tertiary' },
    ],
    calculate: (i) => {
      const saved = Number(i.original) * (Number(i.discount) / 100);
      return { final: Number(i.original) - saved, saved };
    },
  },
  {
    slug: 'cagr-calculator',
    name: 'CAGR Calculator',
    category: 'business',
    icon: 'LineChart',
    description: 'Compound annual growth rate.',
    usageCount: 31000,
    inputs: [
      { key: 'initial', label: 'Initial Value', type: 'slider', min: 1, max: 10000000, step: 1, default: 10000, prefix: '$', color: 'primary' },
      { key: 'final', label: 'Final Value', type: 'slider', min: 1, max: 10000000, step: 1, default: 18000, prefix: '$', color: 'secondary' },
      { key: 'years', label: 'Years', type: 'slider', min: 1, max: 40, step: 1, default: 5, suffix: 'yrs', color: 'tertiary' },
    ],
    outputs: [
      { key: 'cagr', label: 'CAGR', suffix: '%', decimals: 2, primary: true },
    ],
    calculate: (i) => ({
      cagr:
        Number(i.years) > 0 && Number(i.initial) > 0
          ? (Math.pow(Number(i.final) / Number(i.initial), 1 / Number(i.years)) - 1) * 100
          : 0,
    }),
  },
  {
    slug: 'payroll-calculator',
    name: 'Payroll Calculator',
    category: 'business',
    icon: 'Users',
    description: 'Net pay after taxes & deductions.',
    usageCount: 52000,
    inputs: [
      { key: 'gross', label: 'Gross Pay', type: 'slider', min: 500, max: 200000, step: 100, default: 5000, prefix: '$', color: 'primary' },
      { key: 'taxRate', label: 'Tax Rate', type: 'slider', min: 0, max: 50, step: 0.5, default: 22, suffix: '%', color: 'secondary' },
      { key: 'deductions', label: 'Other Deductions', type: 'slider', min: 0, max: 50000, step: 50, default: 300, prefix: '$', color: 'tertiary' },
    ],
    outputs: [
      { key: 'net', label: 'Net Pay', prefix: '$', decimals: 2, primary: true },
      { key: 'tax', label: 'Tax Withheld', prefix: '$', decimals: 2, color: 'secondary' },
    ],
    calculate: (i) => {
      const tax = Number(i.gross) * (Number(i.taxRate) / 100);
      return { net: Number(i.gross) - tax - Number(i.deductions), tax };
    },
  },
  {
    slug: 'inventory-turnover',
    name: 'Inventory Turnover',
    category: 'business',
    icon: 'Package',
    description: 'Efficiency of inventory management.',
    usageCount: 14000,
    inputs: [
      { key: 'cogs', label: 'Cost of Goods Sold', type: 'slider', min: 1000, max: 10000000, step: 1000, default: 500000, prefix: '$', color: 'primary' },
      { key: 'avgInventory', label: 'Average Inventory', type: 'slider', min: 1000, max: 10000000, step: 1000, default: 100000, prefix: '$', color: 'secondary' },
    ],
    outputs: [
      { key: 'turnover', label: 'Turnover Ratio', decimals: 2, primary: true },
      { key: 'days', label: 'Days of Inventory', decimals: 0, color: 'secondary' },
    ],
    calculate: (i) => {
      const ratio = Number(i.cogs) / Number(i.avgInventory);
      return { turnover: ratio, days: ratio > 0 ? 365 / ratio : 0 };
    },
  },
  {
    slug: 'customer-ltv-calculator',
    name: 'Customer LTV',
    category: 'business',
    icon: 'UserPlus',
    description: 'Lifetime value of a customer.',
    trending: true,
    usageCount: 44000,
    inputs: [
      { key: 'avgPurchase', label: 'Avg Purchase Value', type: 'slider', min: 1, max: 10000, step: 1, default: 85, prefix: '$', color: 'primary' },
      { key: 'frequency', label: 'Purchases per Year', type: 'slider', min: 0.1, max: 100, step: 0.1, default: 4, color: 'secondary' },
      { key: 'lifespan', label: 'Customer Lifespan', type: 'slider', min: 0.5, max: 30, step: 0.5, default: 5, suffix: 'yrs', color: 'tertiary' },
    ],
    outputs: [
      { key: 'ltv', label: 'Customer LTV', prefix: '$', decimals: 2, primary: true },
      { key: 'annual', label: 'Annual Value', prefix: '$', decimals: 2, color: 'secondary' },
    ],
    calculate: (i) => {
      const annual = Number(i.avgPurchase) * Number(i.frequency);
      return { ltv: annual * Number(i.lifespan), annual };
    },
  },
  {
    slug: 'ad-roas-calculator',
    name: 'Ad ROAS Calculator',
    category: 'business',
    icon: 'Megaphone',
    description: 'Return on ad spend.',
    usageCount: 37000,
    inputs: [
      { key: 'revenue', label: 'Revenue from Ads', type: 'slider', min: 0, max: 1000000, step: 100, default: 50000, prefix: '$', color: 'primary' },
      { key: 'adSpend', label: 'Ad Spend', type: 'slider', min: 1, max: 1000000, step: 100, default: 10000, prefix: '$', color: 'secondary' },
    ],
    outputs: [
      { key: 'roas', label: 'ROAS', decimals: 2, primary: true },
      { key: 'roasX', label: 'ROAS Multiplier', color: 'secondary' },
      { key: 'profit', label: 'Gross Profit', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const roas = Number(i.revenue) / Number(i.adSpend);
      return {
        roas,
        roasX: `${roas.toFixed(2)}x`,
        profit: Number(i.revenue) - Number(i.adSpend),
      };
    },
  },
];
