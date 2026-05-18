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
    seo: {
      title: 'ROI Calculator: Return on Investment Percentage',
      description: 'Free ROI calculator. Compute return on investment as a percentage from initial cost and final value — works for marketing, real estate, or business projects.',
      applicationCategory: 'BusinessApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Typical contribution margins by industry',
      rows: [
        { label: 'Food service / restaurant', range: '25 – 40%', note: 'Higher for quick-serve, lower for fine dining' },
        { label: 'Retail / FMCG (Indian)', range: '15 – 30%', note: 'Higher for branded goods, low for groceries' },
        { label: 'Software / SaaS', range: '70 – 90%', note: 'Very low variable cost per user' },
        { label: 'E-commerce (D2C)', range: '40 – 65%', note: 'Before customer acquisition cost' },
        { label: 'Services / consulting', range: '50 – 80%', note: 'Time is the main variable cost' },
        { label: 'Manufacturing', range: '15 – 35%', note: 'Material + labour dominate variable cost' },
      ],
    },
    limitations: [
      'Assumes price and variable cost stay constant across all units. Reality: volume discounts on raw materials, capacity constraints, and tiered pricing all shift this curve.',
      "Doesn't model the time dimension — break-even in 6 months vs 24 months tells you very different things about the business.",
      "Doesn't include the cost of capital. A business that breaks even at 167 units may need to clear a much higher number to justify the founder\'s opportunity cost or investor return.",
      "Treats fixed costs as truly fixed. Real fixed costs scale in steps (one more salesperson at 500 units, more office space at 5000) — model these step changes separately.",
    ],
    seo: {
      title: 'Break-Even Calculator: Units to Cover Fixed Costs',
      description: 'Free break-even calculator. Find the number of units to sell to cover fixed costs from price, variable cost per unit, and total fixed expenses.',
      applicationCategory: 'BusinessApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Typical margin benchmarks by industry (gross / net)',
      rows: [
        { label: 'Indian FMCG (HUL, ITC)', range: '50 – 60% / 15 – 20%', note: 'Mature, scaled distribution' },
        { label: 'Indian retail (DMart, Reliance)', range: '15 – 25% / 3 – 8%', note: 'High volume, thin margin' },
        { label: 'Software / SaaS', range: '75 – 90% / −20% to +30%', note: 'Negative net in growth phase is normal' },
        { label: 'D2C e-commerce', range: '40 – 60% / 0 – 15%', note: 'CAC eats most of gross margin' },
        { label: 'Restaurants / cafes', range: '60 – 70% / 5 – 12%', note: 'Rent + labour dominate OPEX' },
        { label: 'Manufacturing (auto components)', range: '15 – 25% / 5 – 10%', note: 'Material-cost-driven' },
      ],
    },
    limitations: [
      "Doesn't separate revenue streams. A multi-product company with one high-margin product subsidising a low-margin one shows a blended margin that hides the mix. Calculate per-product margins separately for portfolio decisions.",
      "Doesn't model tax. Net margin shown here is pre-tax. Indian corporate tax (22–30% depending on structure) further reduces what reaches the owner.",
      "COGS classification varies. Some companies include only direct material; others include manufacturing labour, freight, and warehousing. Be consistent when comparing across periods.",
      "Doesn't include capital costs (interest, depreciation). For a fuller picture, look at EBITDA margin and net margin separately.",
    ],
    seo: {
      title: 'Profit Margin Calculator: Gross & Net %',
      description: 'Free profit margin calculator. Compute gross margin, net margin, and absolute profit from revenue, COGS, and operating expenses — for any business model.',
      applicationCategory: 'BusinessApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Typical markup levels by industry (Indian retail context)',
      rows: [
        { label: 'Grocery / FMCG retailer', range: '10 – 25% markup', note: '9–20% gross margin' },
        { label: 'Apparel retail', range: '50 – 150% markup', note: '33–60% gross margin' },
        { label: 'Restaurant food cost', range: '200 – 400% markup', note: '67–80% gross margin on ingredients' },
        { label: 'Jewellery (gold)', range: '8 – 25% making charges', note: 'On material cost' },
        { label: 'Electronics retail', range: '8 – 20% markup', note: 'Thin; OEM-controlled MRPs' },
        { label: 'Pharmacy (OTC)', range: '20 – 30% markup', note: 'Capped by NPPA for many drugs' },
        { label: 'B2B wholesale', range: '5 – 15% markup', note: 'Volume game; thin per-unit' },
      ],
    },
    limitations: [
      "Doesn't model GST. Sale price shown is pre-tax; the actual customer pays price × (1 + GST rate). Add 18% for most goods, 5% for food/essentials, 28% for luxury.",
      "Doesn't model competition. A 40% markup that worked at ₹70 may need to drop to 25% at ₹62.50 if a competitor opens nearby at that price.",
      "Doesn't include shrinkage (theft, damage, expiry) which typical Indian retail factors as 2–5% of cost. Real effective markup is lower than what's listed.",
      "Cost-plus pricing ignores willingness to pay. For premium goods, value-based pricing (charge what the customer will pay) usually beats cost-plus.",
    ],
    seo: {
      title: 'Markup Calculator: Selling Price from Cost & Markup %',
      description: 'Free markup calculator. Compute the selling price required to hit a target markup percentage on any cost basis — and the resulting profit margin.',
      applicationCategory: 'BusinessApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    seo: {
      title: 'Discount Calculator: Final Price After % Off',
      description: 'Free discount calculator. Get the final price and savings amount after any percentage discount — useful for shopping, sales, and pricing decisions.',
      applicationCategory: 'BusinessApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Long-run CAGR benchmarks (Indian context)',
      rows: [
        { label: 'Bank FD (long run)', range: '5 – 7%', note: 'Inflation-adjusted return ≈ 0–1%' },
        { label: 'PPF / EPF', range: '7 – 8%', note: 'Tax-free; locked-in compounding' },
        { label: 'Indian large-cap equity (long run)', range: '11 – 13%', note: 'Rolling 15-year basis' },
        { label: 'Indian small-cap equity', range: '14 – 17%', note: 'With major drawdowns along the way' },
        { label: 'Indian real estate (metro residential)', range: '5 – 8% + rental yield', note: '+ 3–4% rental' },
        { label: 'Gold (long run, INR terms)', range: '8 – 10%', note: 'Includes rupee depreciation tailwind' },
        { label: 'Nifty 50 (1990–2024, 35 years)', range: '~12.5% CAGR', note: 'Including dividends; index-only ~11%' },
      ],
    },
    limitations: [
      'CAGR hides volatility. A 12% CAGR could come from steady 12% years, or from a wild 40%/−20% sequence. Real-world investments need a CAGR plus a volatility metric (standard deviation) to evaluate properly.',
      "Doesn't model contributions during the period. For SIPs or other recurring investments, use XIRR (extended IRR) instead — it handles multiple cash flows.",
      "Doesn't account for tax. Pre-tax CAGR is what financial products advertise; post-tax CAGR for Indian equity (12.5% LTCG above ₹1.25L) is typically 1–1.5% lower.",
      'Past CAGR doesn\'t predict future. The Sensex CAGR from 1990–2010 was 16%; from 2010–2024 it was ~11%. Equity returns mean-revert across decades.',
    ],
    seo: {
      title: 'CAGR Calculator: Compound Annual Growth Rate',
      description: 'Free CAGR calculator. Compute the compound annual growth rate from beginning value, ending value, and number of years — the standard return metric for investments.',
      applicationCategory: 'BusinessApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Typical Indian salary deduction components',
      rows: [
        { label: 'Income tax (TDS)', range: '0 – 30% of taxable', note: 'Slab-based; deducted monthly' },
        { label: 'Employee PF', range: '12% of basic salary', note: 'Up to ₹15,000 basic in most cases' },
        { label: 'Employer PF (in CTC)', range: '12% match', note: 'Already in your CTC; not in-hand' },
        { label: 'Professional Tax', range: '₹150 – ₹250/month', note: 'State-specific; Maharashtra ₹200' },
        { label: 'ESI (income < ₹21K/month)', range: '0.75% of gross', note: 'Lower wage bracket' },
        { label: 'Health insurance premium', range: '₹500 – ₹2,000/month', note: 'Per family, employer-subsidised' },
        { label: 'Typical net-to-gross ratio', range: '70 – 82%', note: 'For salaried Indian professional' },
      ],
    },
    limitations: [
      "Doesn't model India's slab tax — it applies a flat rate. For accurate India tax math, use the Income Tax Calculator with new vs old regime comparison.",
      "Doesn't separate employee PF (deducted from your salary) from employer PF (added to CTC but not visible to you). Both are in your CTC; only employee PF affects in-hand.",
      "Doesn't include performance bonuses, ESOPs, or one-time variable pay which are taxed differently (TDS on bonus is often higher than month-on-month).",
      "Doesn't model Form 16, ITR adjustments, or refunds — actual annual tax may be lower than what TDS suggests if you have unclaimed deductions.",
    ],
    seo: {
      title: 'Payroll Calculator: Net Pay After Tax & Deductions',
      description: 'Free payroll calculator. Compute employee net pay from gross salary after federal/state tax, social-security, and pre-tax deduction estimates.',
      applicationCategory: 'BusinessApplication',
      sources: [
        { label: 'EPFO — Provident Fund framework', url: 'https://www.epfindia.gov.in/' },
        { label: 'IT department — TDS on salary', url: 'https://www.incometax.gov.in/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Typical inventory turnover by Indian industry',
      rows: [
        { label: 'Grocery / FMCG retail', range: '15 – 30 turns/year', note: 'High volume, perishable' },
        { label: 'Apparel retail', range: '4 – 8 turns/year', note: 'Seasonal cycles' },
        { label: 'Auto parts', range: '6 – 12 turns/year', note: 'SKU-heavy; long tail' },
        { label: 'Electronics retail', range: '8 – 15 turns/year', note: 'Fast obsolescence' },
        { label: 'Jewellery (gold)', range: '1 – 3 turns/year', note: 'Slow-moving inventory' },
        { label: 'Pharmacy / medical', range: '10 – 20 turns/year', note: 'Many SKUs; expiry-sensitive' },
        { label: 'E-commerce marketplace inventory', range: '12 – 25 turns/year', note: 'Algorithmically optimised' },
      ],
    },
    limitations: [
      "Uses a single average inventory number; seasonal businesses have wildly different inventory at different times of year. For better accuracy, compute monthly turnover and average those.",
      "Doesn't account for stock mix. A turnover of 5 hides whether some SKUs turn 20× a year and others 0.5× — the slow-movers tie up capital and may need clearance pricing.",
      "Doesn't include shrinkage (theft, damage, expiry) which can be 2–5% of inventory annually in retail. Higher turnover usually means lower shrinkage but not always.",
      "Calculator uses COGS, not revenue. Revenue-based turnover gives a higher number but distorts comparisons across businesses with different margins.",
    ],
    seo: {
      title: 'Inventory Turnover Calculator: Times per Year',
      description: 'Free inventory turnover ratio calculator. Compute how many times your inventory rotates annually — the core efficiency metric for retail and SaaS.',
      applicationCategory: 'BusinessApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'LTV benchmarks for Indian D2C and SaaS',
      rows: [
        { label: 'Subscription meal kit', range: '₹15,000 – ₹40,000', note: 'High frequency, 1–2 year lifespan' },
        { label: 'D2C beauty / apparel', range: '₹5,000 – ₹15,000', note: '3–6 orders/year, 2–4 year lifespan' },
        { label: 'SaaS (SMB, ₹2K/month plan)', range: '₹50,000 – ₹1L', note: '24-30 month average lifespan' },
        { label: 'SaaS (enterprise, ₹50K+/month)', range: '₹15L – ₹50L+', note: '4–7 year lifespan typical' },
        { label: 'Healthy LTV:CAC ratio', range: '3:1 or higher', note: 'Below 1:1 = losing money on each customer' },
        { label: 'CAC payback period (target)', range: '< 12 months', note: 'Time to recover CAC from gross profit' },
      ],
    },
    limitations: [
      "Doesn't apply discount rate. ₹17,000 in revenue across 5 years isn't worth ₹17,000 today — applying a 10% discount rate brings the present value closer to ₹13,000. For high-precision LTV, use the formula: LTV = (AOV × Frequency × Margin) ÷ (Churn Rate + Discount Rate).",
      "Treats lifespan as fixed. Customers actually churn at different rates over their relationship — the first 3 months are usually the highest-churn period.",
      "Doesn't model upsells, cross-sells, or referrals. Many businesses get 30–50% of LTV from customers expanding their spend over time — which a simple AOV × frequency formula misses.",
      "Assumes the customer behaves like the average forever. In reality, your best 20% of customers often deliver 80% of revenue — segment LTV by customer cohort for better decisions.",
    ],
    seo: {
      title: 'Customer LTV Calculator: Lifetime Value & Payback',
      description: 'Free customer LTV calculator. Get the lifetime value of a customer from ARPU, gross margin, and churn rate — the core SaaS unit-economics metric.',
      applicationCategory: 'BusinessApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'ROAS benchmarks by channel and business type',
      rows: [
        { label: 'Meta Ads (Facebook/Instagram)', range: '2 – 6x typical', note: 'D2C dominant; varies wildly by creative' },
        { label: 'Google Search Ads', range: '4 – 10x typical', note: 'Higher intent → higher ROAS' },
        { label: 'Google Shopping', range: '5 – 12x typical', note: 'Product-specific search intent' },
        { label: 'Amazon Sponsored Products', range: '4 – 8x typical', note: 'Bottom of the funnel' },
        { label: 'Display / programmatic', range: '0.5 – 3x', note: 'Lower direct ROAS, brand-building role' },
        { label: 'D2C break-even ROAS (60% margin)', range: '~1.67x', note: '= 1 / gross margin' },
        { label: 'D2C target ROAS (60% margin)', range: '3 – 5x', note: 'Healthy growth + overhead absorption' },
      ],
    },
    limitations: [
      "ROAS is revenue-based, not profit-based. A 5x ROAS at a 20% margin business is barely profitable; at 80% margin it's print-money territory. Always pair ROAS with your gross margin.",
      "Doesn't include LTV. A ROAS of 1.5x can be highly profitable if those customers buy 4 more times over the next 2 years. Use blended LTV:CAC for the right picture.",
      "Attribution windows distort numbers. A 7-day click ROAS shows higher than a 1-day click ROAS for the same campaign because more conversions are counted. Compare across same window definitions.",
      "iOS 14+ privacy changes meaningfully reduced attribution accuracy on Meta — your reported ROAS is often 20–40% lower than true ROAS for iOS-heavy audiences.",
    ],
    seo: {
      title: 'ROAS Calculator: Return on Ad Spend',
      description: 'Free ROAS calculator. Compute return on ad spend — the standard efficiency metric for paid marketing on Google, Meta, and any digital ad platform.',
      applicationCategory: 'BusinessApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
