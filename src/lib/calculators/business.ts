import { CalculatorConfig } from '../calculator-types';

export const businessCalculators: CalculatorConfig[] = [
  {
    slug: 'roi-calculator',
    name: 'ROI Calculator',
    category: 'business',
    icon: 'TrendingUp',
    description: 'Compute Return on Investment as a percentage from initial cost and gain — for marketing campaigns, real estate, or any business project.',
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
    intro:
      'Return on Investment (ROI) is the simplest measure of how productive a spend was: gain divided by cost, expressed as a percentage. A 25% ROI means you got back 25 cents of profit for every dollar invested. ROI works for any decision where you put money in and want to compare what came out — marketing campaigns, real-estate deals, equipment purchases, training programs, even a personal MBA. The metric is simple to compute but has two important caveats: it ignores time (a 25% ROI over 6 months is twice as good as 25% over 12), and it doesn\'t adjust for risk. For investments, also look at annualised return (CAGR) and risk-adjusted measures like Sharpe ratio.',
    formula: 'ROI = (gain ÷ cost) × 100',
    howItWorks:
      "If you invested ₹1,00,000 in a marketing campaign and the attributable revenue (less cost of goods, less the campaign spend itself) was ₹25,000, your ROI is (25,000 ÷ 1,00,000) × 100 = 25%. The variant ROAS (Return on Ad Spend) measures revenue ÷ cost without subtracting cost — so a 4x ROAS is roughly equivalent to 300% ROI when margins are 100%, less when margins are lower. Always confirm whether your team uses ROI or ROAS — they\'re very different numbers.",
    ranges: {
      title: 'ROI benchmarks by domain (directional, varies widely)',
      rows: [
        { label: 'Indian equity (long-run)', range: '11–13% annual', note: 'Rolling 10-year basis' },
        { label: 'Real estate (Indian metro)', range: '5–8% annual + appreciation', note: 'Rental yield + capital growth' },
        { label: 'Marketing campaign (good)', range: '300–500% (3–5x)', note: 'On margin-adjusted basis' },
        { label: 'SaaS paid acquisition', range: 'LTV ÷ CAC > 3:1', note: 'Standard healthy ratio' },
        { label: 'B2B trade show', range: '50–150%', note: 'Within 6 months of event' },
        { label: 'Employee training', range: 'Hard to measure, often 200–700%', note: 'Productivity + retention gains' },
      ],
    },
    limitations: [
      'ROI ignores time. A 25% ROI over one year is meaningfully different from 25% over five. For multi-year comparisons, use CAGR (Compound Annual Growth Rate) instead.',
      "Doesn't adjust for risk. A 25% ROI on a low-risk investment is much better than 25% on a speculative one. ROI alone can't tell you whether a return was earned or lucky.",
      "Defining 'gain' is harder than it sounds. Marketing ROI requires attribution (what revenue is actually because of this campaign?). Real estate requires accounting for taxes, brokerage, holding costs. Be explicit about what's in and out of the gain figure.",
      "ROI can be gamed by lowering the denominator. If you reduce the recorded \"cost\" by excluding overhead, training time, or opportunity cost, ROI looks higher. Compare like-for-like accounting.",
    ],
    faqs: [
      {
        q: 'What is a good ROI?',
        a: 'Depends entirely on the domain and time horizon. For long-term equity investments, 11–13% annual ROI (Indian equity average) is solid. For marketing campaigns, 300%+ (3x+) is healthy. For business projects, 20–30% in the first year is good. Always benchmark against your alternatives (the next-best place that money could go).',
      },
      {
        q: 'How is ROI different from ROAS?',
        a: 'ROAS (Return on Ad Spend) is gross revenue ÷ ad cost. ROI subtracts costs first — typically (gross profit − ad cost) ÷ ad cost. A 4x ROAS at a 25% margin is actually a 0% ROI. Marketers often quote ROAS because it sounds bigger; finance teams use ROI.',
      },
      {
        q: 'How do I annualise ROI?',
        a: 'Use CAGR: ((1 + ROI)^(1 ÷ years) − 1) × 100. A 50% ROI over 3 years is CAGR = ((1.50)^(1/3) − 1) × 100 = 14.5% annual. Always compare investments on annualised return, not absolute ROI.',
      },
      {
        q: 'Can ROI be negative?',
        a: 'Yes. If your gain is less than zero (you lost money), ROI is negative. A −20% ROI means you lost 20 cents per dollar invested.',
      },
      {
        q: "What's the difference between ROI and profit margin?",
        a: 'Profit margin is profit ÷ revenue (how much of each sales rupee is profit). ROI is profit ÷ investment (how much profit per rupee invested). Both are useful but answer different questions.',
      },
    ],
    seo: {
      title: 'ROI Calculator: Return on Investment Percentage',
      description: 'Free ROI calculator. Compute return on investment as a percentage from initial cost and final value — works for marketing, real estate, or business projects.',
      applicationCategory: 'BusinessApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
  },
  {
    slug: 'break-even-calculator',
    name: 'Break-Even Calculator',
    category: 'business',
    icon: 'Target',
    description: 'Units to sell to cover costs.',
    seo: {
      title: 'Break-Even Calculator: Units to Cover Fixed Costs',
      description: 'Free break-even calculator. Find the number of units to sell to cover fixed costs from price, variable cost per unit, and total fixed expenses.',
    },
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
    seo: {
      title: 'Profit Margin Calculator: Gross & Net %',
      description: 'Free profit margin calculator. Compute gross margin, net margin, and absolute profit from revenue, COGS, and operating expenses — for any business model.',
    },
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
    seo: {
      title: 'Markup Calculator: Selling Price from Cost & Markup %',
      description: 'Free markup calculator. Compute the selling price required to hit a target markup percentage on any cost basis — and the resulting profit margin.',
    },
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
    description: 'Get the final price and amount saved after any percentage discount — also handles stacked discounts and reverse-calculates the original price.',
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
    intro:
      'A discount calculator does the basic sale math: original price minus the discount percentage equals the final price, with the saved amount shown side by side. Use it to verify what a sticker price actually costs after a "30% off" tag, or to compare discounts across stores. Two things to watch out for: the difference between % off and flat amount off (a 25% discount on a ₹4,000 item saves ₹1,000, not ₹250), and stacked discounts (which multiply, not add — see FAQs).',
    formula: 'final = original × (1 − discount ÷ 100) · saved = original − final',
    howItWorks:
      "₹2,500 item at 20% off: discount = 2,500 × 0.20 = ₹500; final = 2,500 − 500 = ₹2,000. To find the original price from a sale price (reverse): original = sale ÷ (1 − discount). So a ₹2,000 item at 20% off had original price 2,000 ÷ 0.80 = ₹2,500. To stack discounts (\"30% off, then extra 20% off\"), multiply: final = original × 0.70 × 0.80 = original × 0.56 — a 44% total discount, NOT 50%.",
    ranges: {
      title: 'Common discount benchmarks',
      rows: [
        { label: 'Standard retail sale', range: '20 – 30% off', note: 'End-of-season, festival sales' },
        { label: 'Clearance', range: '40 – 60% off', note: 'Stock liquidation' },
        { label: 'Flash / 24-hour sale', range: '15 – 25% off', note: 'Limited-time pressure' },
        { label: 'Coupon stack', range: '30% + 10% → 37% effective', note: 'Multiplicative, not additive' },
        { label: 'BOGO (buy 1 get 1 free)', range: '50% off effective', note: 'When items are equal price' },
        { label: 'BOGO 50%', range: '25% off effective', note: 'Buy one, second at half — 25% across both' },
      ],
    },
    limitations: [
      "Calculator handles a single discount. For stacked discounts (\"30% then 20%\"), apply each multiplicatively, not additively. The most common math error in retail.",
      "Doesn't include tax. If sales tax applies on the discounted price, multiply the final by (1 + tax%). Some discounts are coded to apply post-tax — check the fine print.",
      'Discounts off "MRP" can be misleading — if the MRP is inflated 50% above true market price, even a 30% discount leaves you paying more than wholesale. Compare across stores, not against the MRP.',
      'Doesn\'t handle minimum-purchase coupons, conditional discounts ("free shipping over ₹500"), or tiered discounts. Compute manually for those.',
    ],
    faqs: [
      {
        q: 'How do I calculate a discount?',
        a: 'Multiply the original price by the discount as a decimal: ₹3,000 × 0.30 = ₹900 saved. Subtract from original: ₹3,000 − ₹900 = ₹2,100 final price. Or use the shortcut: final = original × (1 − discount).',
      },
      {
        q: 'Why don\'t stacked discounts add together?',
        a: 'Because each discount applies to the already-reduced price. "30% off, then 20% off" gives 0.70 × 0.80 = 0.56, so you pay 56% of original — a 44% total discount, not 50%. Stacking always under-delivers compared to the additive expectation.',
      },
      {
        q: 'How do I find the original price from a discounted price?',
        a: 'Divide the sale price by (1 − discount as decimal). A ₹2,800 item at 30% off: original = 2,800 ÷ 0.70 = ₹4,000. Useful for verifying whether a "% off" claim is genuine.',
      },
      {
        q: 'What\'s the difference between MRP discount and dealer-price discount?',
        a: 'MRP is the maximum the manufacturer allows the seller to charge — but the seller may actually buy the product 30–50% below MRP. A "30% off MRP" sale can still leave you paying above what the seller paid wholesale. For commodity goods, compare prices across sellers, not against MRP.',
      },
      {
        q: 'Does discount apply before or after tax in India?',
        a: 'Almost always before. GST is calculated on the discounted price. So ₹1,000 item at 20% off + 18% GST = (1,000 × 0.80) × 1.18 = ₹944. Some online platforms apply discounts post-tax via cashback, which works out the same on net but appears differently on the bill.',
      },
    ],
    seo: {
      title: 'Discount Calculator: Final Price After % Off',
      description: 'Free discount calculator. Get the final price and savings amount after any percentage discount — useful for shopping, sales, and pricing decisions.',
      applicationCategory: 'BusinessApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
  },
  {
    slug: 'cagr-calculator',
    name: 'CAGR Calculator',
    category: 'business',
    icon: 'LineChart',
    description: 'Compound annual growth rate.',
    seo: {
      title: 'CAGR Calculator: Compound Annual Growth Rate',
      description: 'Free CAGR calculator. Compute the compound annual growth rate from beginning value, ending value, and number of years — the standard return metric for investments.',
    },
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
    seo: {
      title: 'Payroll Calculator: Net Pay After Tax & Deductions',
      description: 'Free payroll calculator. Compute employee net pay from gross salary after federal/state tax, social-security, and pre-tax deduction estimates.',
    },
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
    seo: {
      title: 'Inventory Turnover Calculator: Times per Year',
      description: 'Free inventory turnover ratio calculator. Compute how many times your inventory rotates annually — the core efficiency metric for retail and SaaS.',
    },
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
    seo: {
      title: 'Customer LTV Calculator: Lifetime Value & Payback',
      description: 'Free customer LTV calculator. Get the lifetime value of a customer from ARPU, gross margin, and churn rate — the core SaaS unit-economics metric.',
    },
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
    seo: {
      title: 'ROAS Calculator: Return on Ad Spend',
      description: 'Free ROAS calculator. Compute return on ad spend — the standard efficiency metric for paid marketing on Google, Meta, and any digital ad platform.',
    },
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
