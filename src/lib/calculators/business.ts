import { CalculatorConfig } from '../calculator-types';

export const businessCalculators: CalculatorConfig[] = [
  {
    slug: 'roi-calculator',
    name: 'ROI Calculator',
    category: 'business',
    icon: 'TrendingUp',
    description: 'Return on investment percentage.',
    longDescription: 'ROI is the universal language of business decisions. Whether you\'re evaluating a marketing campaign, a new hire, a piece of equipment, or a real estate investment, ROI tells you the same thing: for every dollar you put in, how much did you get back as profit? This calculator gives you both percentage ROI and net profit in a single calculation.',
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
    formula: 'ROI = (Net Gain ÷ Investment Cost) × 100',
    faqs: [
      { q: 'What is a good ROI?', a: 'It depends entirely on the investment type and risk. The S&P 500 averages roughly 10% annually — a long-term ROI benchmark for passive equity investing. Real estate typically delivers 8-12% total return. Digital marketing campaigns with 3-5× ROAS (300-500% ROI on ad spend) are considered healthy. Compare against the risk-free rate and alternative uses of capital.' },
      { q: 'What\'s the difference between ROI and ROAS?', a: 'ROAS (Return on Ad Spend) measures revenue generated per dollar of ad spend — it\'s a gross revenue metric. ROI uses net profit (after all costs including COGS) as the numerator. A 4× ROAS campaign isn\'t necessarily profitable if your gross margin is below 25%. Always compare against margin when evaluating ROAS.' },
      { q: 'How do I annualize ROI?', a: 'To compare investments of different durations: Annualized ROI = [(1 + ROI)^(1/Years)] − 1. A 50% return over 3 years annualizes to (1.5)^(1/3) − 1 = 14.5% per year — which is strong. Raw ROI figures without time context are harder to compare meaningfully.' },
    ],
  },
  {
    slug: 'break-even-calculator',
    name: 'Break-Even Calculator',
    category: 'business',
    icon: 'Target',
    description: 'Units to sell to cover costs.',
    longDescription: 'Break-even analysis answers the most important question before launching anything: how much do you need to sell just to cover your costs? It takes fixed costs, selling price, and variable cost per unit to give you the break-even unit count and break-even revenue. Every sale beyond that number contributes directly to profit.',
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
    formula: 'Break-Even Units = Fixed Costs ÷ (Price − Variable Cost)',
    faqs: [
      { q: 'What counts as a fixed vs variable cost?', a: 'Fixed costs don\'t change with output: rent, salaries, software subscriptions, insurance, loan repayments. Variable costs scale with production: raw materials, packaging, per-unit labor, payment processing fees, shipping. Semi-variable costs exist too (utilities, delivery staff overtime) — assign them to whichever category they more closely resemble.' },
      { q: 'What is contribution margin?', a: 'Contribution margin = Selling Price − Variable Cost. It\'s how much each unit contributes toward covering fixed costs and then generating profit. High contribution margin means fewer units needed to break even. Low contribution margin requires high volume — and therefore more vulnerability to demand fluctuations.' },
      { q: 'How do I use break-even for pricing decisions?', a: 'Work backwards: if you know you can realistically sell X units, set the price so that X × contribution margin exceeds fixed costs with profit left over. If the break-even requires more units than your market can absorb, you either need to cut fixed costs, raise price, or reduce variable costs.' },
    ],
  },
  {
    slug: 'profit-margin-calculator',
    name: 'Profit Margin',
    category: 'business',
    icon: 'Percent',
    description: 'Gross and net profit margins.',
    longDescription: 'Gross margin tells you how efficiently you produce your product. Net margin tells you how efficiently you run your business. Both numbers are essential for comparing against industry benchmarks, assessing pricing strategy, and tracking whether operational improvements are actually flowing to the bottom line.',
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
    formula: 'Gross Margin = (Revenue − COGS) ÷ Revenue × 100',
    faqs: [
      { q: 'What are typical profit margins by industry?', a: 'Software/SaaS: gross margins 70-90%, net margins 10-30%. Retail: gross 25-40%, net 2-5%. Restaurants: gross 60-70%, net 3-9%. Manufacturing: gross 25-35%, net 5-10%. Professional services: gross 50-70%, net 15-25%. Comparing your margins to industry benchmarks reveals whether you\'re competitive on cost structure.' },
      { q: 'Is gross margin or net margin more important?', a: 'Both matter for different reasons. Gross margin indicates product economics — how scalable your core business is. Net margin shows overall operational efficiency. High gross margin with low net margin suggests overhead costs are the problem. Both are needed for the full picture.' },
      { q: 'How do I improve profit margins?', a: 'Gross margin improvement: negotiate better supplier pricing, improve production efficiency, or raise prices. Net margin improvement: gross margin improvement plus reducing fixed operating costs (rent, staff, software), improving sales efficiency, and eliminating unprofitable product lines.' },
    ],
  },
  {
    slug: 'markup-calculator',
    name: 'Markup Calculator',
    category: 'business',
    icon: 'TrendingUp',
    description: 'Selling price from cost and markup.',
    longDescription: 'Markup and margin are related but different concepts that often get confused, leading to significant pricing mistakes. This calculator takes your cost and desired markup percentage to give you the selling price and gross profit per unit. Knowing your required markup to achieve a target margin helps you price products correctly from the start.',
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
    formula: 'Selling Price = Cost × (1 + Markup%)',
    faqs: [
      { q: 'What is the difference between markup and margin?', a: 'Markup is calculated on cost: a 40% markup on a $50 item = $20 profit, $70 selling price. Margin is calculated on revenue: $20 profit ÷ $70 revenue = 28.6% margin. The same profit is 40% markup but only 28.6% margin. Confusing the two leads to systematic underpricing — a very common business mistake.' },
      { q: 'What markup is needed to achieve a 30% margin?', a: 'To convert target margin to markup: Markup = Margin ÷ (1 − Margin). For 30% margin: 0.30 ÷ 0.70 = 42.9% markup. For 40% margin: 0.40 ÷ 0.60 = 66.7% markup. For 50% margin: 0.50 ÷ 0.50 = 100% markup.' },
      { q: 'How do I set markup for my industry?', a: 'Common retail markup targets: specialty retail 100-200%, grocery 15-25%, electronics 20-40%, clothing 50-100%. Service businesses typically don\'t use cost-plus markup — they price based on value delivered or market rates. Check competitor pricing and work backwards to understand what markup is achievable in your market.' },
    ],
  },
  {
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    category: 'business',
    icon: 'Tag',
    description: 'Final price after discount.',
    longDescription: 'Whether you\'re shopping for the best deal or deciding how much to discount a product for a sale, this calculator instantly shows the final price and how much is saved. For businesses considering discounts: also check the margin impact — a 20% discount on a 30% margin product wipes out two-thirds of the profit on that sale.',
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
    formula: 'Final Price = Original Price × (1 − Discount%)',
    faqs: [
      { q: 'How do I calculate the original price from a discounted price?', a: 'Original Price = Discounted Price ÷ (1 − Discount%). If something is $75 after a 25% discount: $75 ÷ 0.75 = $100 original price.' },
      { q: 'How does discounting affect profit margin?', a: 'The margin impact is disproportionate to the discount size. At 40% gross margin, a 10% price discount requires 33% more volume to maintain the same profit. At 25% margin, a 10% discount requires 67% more volume. Run these numbers before approving discounts — the volume required to compensate is often unrealistic.' },
      { q: 'When is discounting a good business strategy?', a: 'Discounting makes sense to: clear slow-moving inventory, acquire new customers at an acceptable LTV-based acquisition cost, reward loyal customers, or match competitor pricing on commoditized items. It\'s less smart when it trains customers to wait for sales, erodes brand perception, or cuts deeply into margins without volume compensation.' },
    ],
  },
  {
    slug: 'cagr-calculator',
    name: 'CAGR Calculator',
    category: 'business',
    icon: 'LineChart',
    description: 'Compound annual growth rate.',
    longDescription: 'CAGR (Compound Annual Growth Rate) smooths out year-to-year volatility to give you the single annualized growth rate that would take you from your starting value to your ending value over a given period. It\'s the standard way to compare growth across companies, funds, or metrics that have different time spans — far more useful than looking at absolute change alone.',
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
    formula: 'CAGR = (Final Value / Initial Value)^(1/Years) − 1',
    faqs: [
      { q: 'What CAGR is considered good for a business?', a: 'Benchmarks depend on stage and industry. Early-stage startups in venture-backed tech: 100-300%+ CAGR expected. Growth-stage companies: 30-100%. Mature public companies: 10-20% CAGR is considered strong. The S&P 500 averages ~10% CAGR over long periods — a useful baseline for any investment comparison.' },
      { q: 'What is the limitation of CAGR?', a: 'CAGR shows the smoothed average growth rate but hides volatility. A business with -50% growth one year and +150% the next has positive CAGR but a very different risk profile than one that grew 30% each year. Always combine CAGR with year-by-year data for a complete picture.' },
      { q: 'How do I use CAGR to forecast future value?', a: 'Future Value = Initial Value × (1 + CAGR)^Years. If a metric is growing at 15% CAGR from a starting point of $1M, after 5 years: $1M × 1.15^5 = $2.01M. This is more reliable for near-term forecasting (2-3 years) and increasingly uncertain for longer periods.' },
    ],
  },
  {
    slug: 'payroll-calculator',
    name: 'Payroll Calculator',
    category: 'business',
    icon: 'Users',
    description: 'Net pay after taxes & deductions.',
    longDescription: 'Understanding net pay helps both employers budget accurately and employees know what to expect in their account. This calculator shows take-home pay after income tax withholding and other deductions, giving you a quick estimate for any compensation level. For precise payroll, always consult current tax tables and consider state/local taxes in addition to federal.',
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
    formula: 'Net Pay = Gross Pay − Tax − Other Deductions',
    faqs: [
      { q: 'What deductions should I include?', a: 'Common pre-tax deductions: 401(k) contributions, health insurance premiums, HSA/FSA contributions, dental/vision insurance. Post-tax deductions: Roth 401(k) contributions, life insurance above $50k, garnishments. Pre-tax deductions reduce taxable income; enter them as part of your gross pay reduction before calculating tax.' },
      { q: 'What is the employer\'s additional cost beyond gross salary?', a: 'Employers pay payroll taxes on top of gross salary: 6.2% Social Security (OASDI), 1.45% Medicare, plus state unemployment taxes (0.5-5% on first ~$7,000-10,000 of wages). For a $60,000/year employee, total employer cost is roughly $67,000-70,000 including these taxes.' },
      { q: 'How does this differ from annual take-home calculation?', a: 'Multiply the per-pay-period net by the number of pay periods per year (26 for biweekly, 24 for semimonthly, 12 for monthly). Note that biweekly pay produces two "extra" paychecks per year (26 vs. 24), which impacts monthly budgeting — those 2 extra checks per year are effectively a bonus for monthly budgeters.' },
    ],
  },
  {
    slug: 'inventory-turnover',
    name: 'Inventory Turnover',
    category: 'business',
    icon: 'Package',
    description: 'Efficiency of inventory management.',
    longDescription: 'Inventory turnover tells you how many times your entire inventory is sold and replaced over a period — a key efficiency metric for any business that holds physical stock. High turnover means capital isn\'t tied up in sitting inventory; low turnover signals slow-moving stock, overstocking, or potential obsolescence. Days of inventory translates the ratio into an intuitive "we have X days of inventory on hand" number.',
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
    formula: 'Turnover = COGS ÷ Average Inventory | Days = 365 ÷ Turnover',
    faqs: [
      { q: 'What is a good inventory turnover ratio?', a: 'It varies widely by industry. Grocery: 15-30× (products sell in days). Automotive: 4-8×. Electronics retail: 6-12×. Jewelry: 1-3×. Compare against your industry benchmark rather than a universal number. Too high can mean stockouts; too low means capital tied up in slow-moving inventory.' },
      { q: 'Why use average inventory instead of ending inventory?', a: 'Average inventory (beginning + ending ÷ 2) smooths out seasonal fluctuations. Using ending inventory alone can distort the ratio if the period ends when inventory is unusually high or low — such as right after a large restocking or before a holiday rush.' },
      { q: 'How can I improve my inventory turnover?', a: 'Improve demand forecasting to reduce overstocking. Negotiate just-in-time delivery from suppliers. Identify and discount slow-moving SKUs before they become dead stock. Review pricing on high-velocity items — you may be leaving money on the table if they sell instantly.' },
    ],
  },
  {
    slug: 'customer-ltv-calculator',
    name: 'Customer LTV',
    category: 'business',
    icon: 'UserPlus',
    description: 'Lifetime value of a customer.',
    longDescription: 'Customer Lifetime Value (LTV or CLV) is arguably the most important metric in any subscription or repeat-purchase business. It tells you the total revenue a customer generates over their entire relationship with your business — which in turn tells you the maximum you can profitably spend to acquire that customer. LTV:CAC ratio (Lifetime Value to Customer Acquisition Cost) above 3:1 is typically considered healthy.',
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
    formula: 'LTV = Avg Purchase × Purchase Frequency × Customer Lifespan',
    faqs: [
      { q: 'What is a good LTV:CAC ratio?', a: 'A LTV:CAC ratio of 3:1 is generally considered the minimum healthy threshold — meaning you earn $3 in lifetime value for every $1 spent acquiring a customer. Below 1:1 means you\'re losing money on each acquisition. Above 5:1 often means you\'re underinvesting in acquisition and leaving growth on the table.' },
      { q: 'How do I increase customer LTV?', a: 'Increase purchase frequency (loyalty programs, email marketing, reminders). Increase average order value (upselling, cross-selling, bundles). Extend customer lifespan (improve retention through product quality, service, and proactive churn prevention). Even small improvements in any one dimension compound significantly over the full customer base.' },
      { q: 'Should LTV be gross or net?', a: 'For the LTV:CAC ratio to be meaningful, use gross margin LTV (revenue × gross margin percentage), not raw revenue LTV. If your gross margin is 50% and raw LTV is $1,700, your margin-adjusted LTV is $850. This is what you should compare against CAC to determine profitability.' },
    ],
  },
  {
    slug: 'ad-roas-calculator',
    name: 'Ad ROAS Calculator',
    category: 'business',
    icon: 'Megaphone',
    description: 'Return on ad spend.',
    longDescription: 'ROAS (Return on Ad Spend) is the foundational metric of digital advertising — how many dollars of revenue you generate for each dollar you spend on ads. But ROAS alone doesn\'t tell you if you\'re profitable. You also need to know your gross margin: if your ROAS is 3× but your gross margin is 30%, you\'re just breaking even. This calculator shows your ROAS, the multiplier, and gross profit from advertising.',
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
    formula: 'ROAS = Revenue ÷ Ad Spend',
    faqs: [
      { q: 'What is break-even ROAS?', a: 'Break-even ROAS = 1 ÷ Gross Margin. At 40% gross margin, break-even ROAS is 2.5× — meaning you need $2.50 in revenue for every $1 of ad spend just to cover product costs. Below this ROAS, ads are generating revenue but losing money on each sale.' },
      { q: 'What is a good ROAS for e-commerce?', a: 'A common e-commerce benchmark is 4× ROAS, but the "good" number entirely depends on your gross margin. High-margin products (software, supplements) can be profitable at 2-3× ROAS. Low-margin retail might need 6-8× to be profitable. Calculate your own break-even ROAS first, then target 1.5-2× above it.' },
      { q: 'Should I optimize for ROAS or profit?', a: 'Always optimize for profit, not ROAS. A campaign with 8× ROAS on $1,000 spend generating $1,000 profit is better than a campaign with 3× ROAS on $100,000 spend generating $800 profit — even though ROAS differs by 2.7×. ROAS is a useful efficiency signal; profit is the actual goal.' },
    ],
  },
];
