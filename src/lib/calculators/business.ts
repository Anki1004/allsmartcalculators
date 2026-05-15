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
    intro:
      "Break-even is the number of units you must sell before your business actually starts making money — the sales volume where total revenue equals total cost. Below it, you bleed cash; above it, every unit is profit. A small bakery with ₹50,000 monthly fixed costs (rent, salaries, electricity) selling cakes at ₹500 each with ₹200 in ingredients per cake has a contribution margin of ₹300 — break-even is 50,000 ÷ 300 = 167 cakes per month. Selling cake #168 onward is pure profit (per unit) until volume hits the next fixed-cost step.",
    formula: 'Break-even units = Fixed Costs ÷ (Price − Variable Cost) · Break-even revenue = Units × Price',
    howItWorks:
      "Contribution margin (price minus variable cost per unit) is what each unit contributes toward covering fixed costs. ₹500 price − ₹200 variable cost = ₹300 contribution per unit. With ₹50,000 monthly fixed costs, you need 50,000 ÷ 300 = 167 units to break even. Break-even revenue = 167 × ₹500 = ₹83,500. Increase your price by ₹50 (to ₹550) and break-even drops to 143 units. Reduce variable cost by ₹20 (to ₹180) and break-even drops to 156 units. Price increases move the needle faster than cost cuts at most retail businesses.",
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
    faqs: [
      {
        q: 'What is contribution margin?',
        a: 'The amount each unit contributes to fixed costs and profit after covering its own variable cost. ₹500 sale − ₹200 variable cost = ₹300 contribution. Express as a percentage: 300 ÷ 500 = 60% contribution margin.',
      },
      {
        q: 'Is break-even the same as profit?',
        a: 'No. Break-even means total revenue = total cost (profit = 0). Profitability begins at unit #N+1 above break-even. A common founder mistake is to celebrate hitting break-even — you\'ve recovered costs but not earned anything yet.',
      },
      {
        q: 'How do I lower my break-even point?',
        a: 'Three levers: raise price (fastest impact), cut variable cost per unit (sourcing, bulk discounts), or reduce fixed costs (smaller office, lower-cost team). Most businesses underuse pricing — a 10% price hike with a steady customer base often beats a 10% cost cut.',
      },
      {
        q: 'Why is break-even higher for low-margin businesses?',
        a: 'Each unit contributes less to fixed costs. A grocery store with 15% margin needs 5–6× the volume of a software business with 80% margin to cover the same fixed cost. That\'s why low-margin businesses obsess over volume and high-margin businesses obsess over differentiation.',
      },
      {
        q: 'Should I include my own salary in fixed costs?',
        a: 'Yes — at the rate you\'d need to be paid by someone else for similar work. Otherwise the calculator hides the true cost of the business and a "break-even" company that actually requires founder\'s 80-hour weeks for ₹0 isn\'t breaking even at all.',
      },
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
    intro:
      "Two margin numbers tell most of the story about a business: gross margin (revenue minus cost of goods sold, as % of revenue) shows how efficiently the core product creates value; net margin (after deducting operating expenses too) shows what's actually left over after running the whole company. ₹5 lakh revenue with ₹2 lakh COGS and ₹1.5 lakh OPEX gives a 60% gross margin and 30% net margin. Indian D2C brands typically run 40–60% gross, 5–15% net. SaaS companies look very different — 75–85% gross is normal but most lose money for years before net turns positive.",
    formula: 'Gross margin = (Revenue − COGS) ÷ Revenue × 100 · Net margin = (Revenue − COGS − OPEX) ÷ Revenue × 100',
    howItWorks:
      "₹5,00,000 revenue, ₹2,00,000 COGS (materials, payment-gateway fees, shipping, return costs — anything that scales with each sale), ₹1,50,000 OPEX (salaries, rent, software, ads — fixed-ish overhead). Gross profit = 5L − 2L = ₹3L. Gross margin = 3L ÷ 5L × 100 = 60%. Net profit = 3L − 1.5L = ₹1.5L. Net margin = 1.5L ÷ 5L × 100 = 30%. Gross margin tells you whether the product economics work; net margin tells you whether the whole business does.",
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
    faqs: [
      {
        q: 'What\'s the difference between gross and net margin?',
        a: 'Gross margin subtracts only direct costs of producing the goods (COGS). Net margin subtracts everything — COGS plus rent, salaries, marketing, interest, depreciation. A company with 60% gross and 10% net is paying half its gross profit on overhead and overhead growth.',
      },
      {
        q: 'What\'s a good profit margin?',
        a: 'Wildly industry-dependent. SaaS: 75%+ gross, 20%+ net is great. Retail: 25% gross, 5% net is solid. Restaurants: 65% gross, 8–10% net. Compare against direct competitors and your own historical trend rather than absolute benchmarks across industries.',
      },
      {
        q: 'Why is SaaS net margin often negative?',
        a: 'Growth-stage SaaS spends heavily on sales and marketing to acquire customers whose lifetime value far exceeds the acquisition cost — but only over years. Reported net is negative because expensing CAC upfront against revenue earned over future years pulls margin down. Cash flow can look fine even when net is deeply negative.',
      },
      {
        q: 'How can I improve my net margin?',
        a: 'Three levers: raise prices, cut COGS (better sourcing, scale economies, automation), or cut OPEX (renegotiate rent, automate, reduce overhead headcount). For mature businesses, pricing power and OPEX discipline matter more than COGS reduction — manufacturing efficiency improvements eventually plateau.',
      },
      {
        q: 'Is high gross margin always better?',
        a: 'Usually yes, but not always — a 90% gross margin business with 5% net margin is more fragile than a 30% gross, 10% net business because the 90% case has huge fixed overhead to support. High-margin doesn\'t mean high-quality unless backed by sticky customers.',
      },
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
    intro:
      "Markup is the percentage added to your cost to set the selling price. It's the standard pricing approach in Indian retail and wholesale — buy a product for ₹100, apply a 40% markup, sell at ₹140 for a ₹40 profit. Don't confuse markup with margin: 40% markup gives only 28.6% gross margin (40 ÷ 140), not 40% margin. This is the most common pricing mistake — a 100% markup yields 50% margin, not 100% margin. Use this calculator to set prices for retail, freelance services, restaurant menus, or any cost-plus pricing decision.",
    formula: 'Selling Price = Cost × (1 + Markup ÷ 100) · Profit = Cost × (Markup ÷ 100)',
    howItWorks:
      "₹50 cost with 40% markup: profit = 50 × 0.40 = ₹20. Price = 50 + 20 = ₹70. Verify: profit / price = 20/70 = 28.6% gross margin. To convert markup → margin: margin = markup ÷ (100 + markup). 40% markup → 40 ÷ 140 = 28.6% margin. 100% markup → 100 ÷ 200 = 50% margin. 200% markup → 200 ÷ 300 = 66.7% margin. The bigger the markup, the closer it gets to (but never reaches) 100% margin.",
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
    faqs: [
      {
        q: 'What\'s the difference between markup and margin?',
        a: 'Markup is profit divided by cost; margin is profit divided by selling price. ₹20 profit on ₹50 cost is 40% markup. The same ₹20 profit on the ₹70 selling price is 28.6% margin. Markup is always bigger than margin for the same numbers — confusing them is a classic pricing error.',
      },
      {
        q: 'What is a good markup for retail?',
        a: 'Industry-dependent. Indian grocery: 10–20%. Apparel: 80–150%. Restaurant food: 200–400% on ingredient cost. Jewellery: 15–25% making charges. Electronics: 8–15%. Set your markup against industry norms and your own overhead — not arbitrarily.',
      },
      {
        q: 'How do I convert markup to margin?',
        a: 'Margin = Markup ÷ (100 + Markup). 25% markup → 25/125 = 20% margin. 50% markup → 50/150 = 33.3% margin. 100% markup → 100/200 = 50% margin. The formula works in reverse too: Markup = Margin ÷ (100 − Margin).',
      },
      {
        q: 'Should I include GST in my markup?',
        a: 'Calculate markup on the pre-GST cost. Apply GST to the final selling price separately. Mixing the two creates accounting headaches at tax filing. Your shown price to retail customers is post-GST inclusive (mandated by law); your markup math stays clean.',
      },
      {
        q: 'Why do restaurants have such high markups?',
        a: 'Because their fixed costs (rent, salaries, electricity, licences) are huge relative to the variable cost of food. A 300% ingredient markup gives ~75% gross margin, but after deducting rent and labour, net margin is typically only 5–15%. Volume × seat turnover matters more than per-item markup.',
      },
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
    intro:
      "CAGR (Compound Annual Growth Rate) is the smoothed annual return that takes an investment from its starting value to its ending value over a fixed period. It's the right way to compare investments with different durations and different absolute returns. ₹10,000 growing to ₹18,000 over 5 years is a CAGR of 12.5% — what a simple SIP at 12.5% would have produced if returns had been perfectly steady. CAGR strips out year-to-year volatility, so it answers \"what's the equivalent steady annual return?\" rather than \"what happened each year.\"",
    formula: 'CAGR = ((Final ÷ Initial)^(1 ÷ years) − 1) × 100',
    howItWorks:
      "₹10,000 → ₹18,000 over 5 years: (18,000 ÷ 10,000)^(1/5) − 1 = 1.8^0.2 − 1 = 0.1247 = 12.47% CAGR. Same investment over 3 years: 1.8^0.333 − 1 = 21.6% CAGR — much higher, because you achieved the same growth in less time. Same over 10 years: 6.05% CAGR — much lower. CAGR penalises duration and rewards velocity. For ₹1 lakh → ₹1 crore over 30 years: (10)^(1/30) − 1 = 8.0% CAGR. That's the kind of slow, compounded growth equity SIPs deliver.",
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
    faqs: [
      {
        q: 'What is a good CAGR?',
        a: 'Depends on the asset class. For Indian large-cap equity over 15+ years: 12–13% CAGR is the long-run average. For PPF: 7–8% is the locked-in rate. For real estate: 5–8% capital appreciation + 3% rental yield. Always compare CAGR against inflation (5–6% in India) — anything below CPI is wealth destruction in real terms.',
      },
      {
        q: 'CAGR vs absolute return — which matters?',
        a: 'CAGR for comparing investments of different durations; absolute return for understanding the actual outcome. A 50% return over 3 years (14% CAGR) beats a 70% return over 10 years (5.4% CAGR), even though the absolute number was higher.',
      },
      {
        q: 'How is CAGR different from XIRR?',
        a: 'CAGR works for single buy → single sell at fixed dates. XIRR (Extended Internal Rate of Return) handles multiple cash flows in and out — what you actually have with SIPs, lumpsums, dividends, and partial withdrawals. Always use XIRR for SIP returns, not CAGR.',
      },
      {
        q: 'What\'s the CAGR rule for doubling money?',
        a: 'Rule of 72: years to double ≈ 72 ÷ CAGR. At 12% CAGR, money doubles in 6 years. At 8%, in 9 years. At 6%, in 12 years. Useful mental shortcut for comparing growth rates.',
      },
      {
        q: 'Can CAGR be negative?',
        a: 'Yes — if the ending value is lower than the starting value. A ₹10,000 investment ending at ₹6,000 over 5 years has CAGR = (0.6)^0.2 − 1 = −9.7%. Negative CAGR is common for sector funds and individual stocks during prolonged drawdowns.',
      },
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
    intro:
      "Payroll math is straightforward in principle — gross pay minus tax minus other deductions equals net (in-hand) pay — but the deductions can stack up quickly. For an Indian salaried employee earning ₹1 lakh gross monthly, typical deductions include income tax (TDS, ~10–20% depending on slab and regime), Provident Fund (12% of basic salary, matched by employer), and Professional Tax (₹200/month in most states). Net in-hand can be 70–82% of gross. This calculator simplifies to a single tax rate and a single other-deductions line — use it for ballpark planning, not for filing.",
    formula: 'Tax = Gross × Tax Rate · Net = Gross − Tax − Other Deductions',
    howItWorks:
      "₹1,00,000 gross monthly at 22% effective tax rate (assuming basic + HRA structure under new regime): tax = 22,000. Other deductions ₹300 (PT + small line items). Net = 1,00,000 − 22,000 − 300 = ₹77,700. For Indian filers, the 22% tax input should reflect your effective rate AFTER all deductions (80C, 80D, HRA, etc.) — which is typically 8–15% for ₹10–₹20L salary, not the marginal slab rate (30%). Or use the new tax regime which is simpler but gives up most deductions.",
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
    faqs: [
      {
        q: 'How is in-hand salary calculated in India?',
        a: 'Gross monthly salary minus: (1) Income tax (TDS, based on slab), (2) Employee PF contribution (12% of basic), (3) Professional Tax (state-specific, typically ₹150–₹250/month), (4) ESI if applicable, (5) any other voluntary deductions (NPS, health premium). Net is typically 70–82% of gross.',
      },
      {
        q: 'What\'s the difference between gross and CTC?',
        a: 'CTC (Cost to Company) includes the employer\'s PF match, gratuity provision, group health insurance, and other employer-side benefits. Gross (sometimes called "fixed gross") is what appears as your taxable monthly salary. Gross is roughly 85–90% of CTC for most Indian companies.',
      },
      {
        q: 'Should I choose old or new tax regime?',
        a: 'Old regime wins if you can claim major deductions (80C ₹1.5L, 80D, HRA, home-loan interest, NPS). New regime wins if you don\'t — lower slab rates but no deductions allowed. For salaries above ₹12L with home loan + HRA, old regime usually wins. Below ₹7L, new regime is mostly better. Run both through the IT department calculator before declaring.',
      },
      {
        q: 'When is TDS deducted on salary?',
        a: 'Every month from your salary by your employer, deposited to the IT department by the 7th of the following month. By year-end (March), the total TDS should equal your annual tax liability. Excess is refunded after you file ITR; shortfall must be paid as self-assessment tax.',
      },
      {
        q: 'Does PF count as part of my salary?',
        a: 'Employee PF is yours — it sits in your EPF account, earning 7–8% tax-free interest. Employer PF (12% match) is also yours but technically a CTC line item, not in-hand cash. Both can be withdrawn after 60 days of unemployment or rolled into a new employer\'s PF.',
      },
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
    intro:
      "Inventory turnover measures how many times in a year you sell through and replace your stock — a critical efficiency metric for any inventory-holding business. ₹5 lakh annual COGS against an average ₹1 lakh inventory means a turnover ratio of 5 — you sell through your inventory 5 times a year, or roughly every 73 days. Higher is generally better (faster cash recycling, less storage cost, less obsolescence risk) but too high can mean stockouts and lost sales. Indian groceries target 15–30 turns per year; jewellery shops 1–3; auto parts dealers 6–10.",
    formula: 'Turnover ratio = COGS ÷ Average Inventory · Days of inventory = 365 ÷ Turnover',
    howItWorks:
      "Average inventory is (opening + closing) ÷ 2 for the year, valued at cost. ₹5,00,000 annual COGS ÷ ₹1,00,000 average inventory = 5 turns/year. Days of inventory = 365 ÷ 5 = 73 days. That means at any given moment, you're holding roughly 73 days of sales sitting on shelves. Cut average inventory to ₹50,000 (more frequent, smaller orders) and turnover jumps to 10/year, days drop to 36.5 — frees up working capital but increases stockout risk. The right balance depends on your supplier lead time, demand variability, and storage cost.",
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
    faqs: [
      {
        q: 'Is high inventory turnover always good?',
        a: 'Mostly yes — higher turnover means faster cash recycling, lower storage costs, less obsolescence. But extremely high turnover (e.g. 50+ in apparel) often signals understocking and lost sales when customers can\'t find what they want. The "right" number balances stockouts against carrying cost.',
      },
      {
        q: 'How is inventory turnover different from inventory days?',
        a: 'They\'re inverse expressions of the same number. Turnover = 5/year means inventory days = 365 ÷ 5 = 73 days. Days is more intuitive ("we have 73 days of stock"); turnover is more standard in financial reporting.',
      },
      {
        q: 'What is just-in-time (JIT) inventory?',
        a: 'JIT minimises inventory by ordering only as needed for production or sale — pushes turnover ratios into the 50–100+/year range. Pioneered by Toyota. Trade-off: any supply disruption (port strike, factory shutdown) immediately becomes a customer-facing stockout because there\'s no buffer.',
      },
      {
        q: 'How do I improve inventory turnover?',
        a: 'Three levers: (1) Identify and clear slow-movers via discounts or returns to supplier, (2) Order more frequently in smaller batches (works if supplier minimums allow), (3) Better demand forecasting using POS data. Most Indian SMEs over-order on supplier MOQs and under-clear dead stock — both kill turnover.',
      },
      {
        q: 'How is inventory valued for this calculation?',
        a: 'At cost (the price you paid the supplier), not retail. Most accounting systems use weighted average cost or FIFO for inventory valuation. Be consistent across periods — switching methods makes year-over-year comparisons meaningless.',
      },
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
    intro:
      "Customer Lifetime Value (LTV) is the total revenue you'll earn from a typical customer across their entire relationship with your business. It's the most important unit-economics metric — without knowing it, you can't tell if you're acquiring customers profitably. ₹850 average order × 4 orders/year × 5-year customer lifespan = ₹17,000 LTV. Pair this with CAC (Customer Acquisition Cost) — most healthy businesses want LTV:CAC ratio of 3:1 or higher. If you spend ₹5,000 to acquire a ₹17,000-LTV customer, you're at 3.4:1 — solid. At ₹8,000 acquisition cost, it's 2.1:1 — borderline.",
    formula: 'LTV = Avg Purchase Value × Purchase Frequency per Year × Customer Lifespan (years)',
    howItWorks:
      "Three inputs drive LTV. (1) Average order value (AOV) — what a customer typically spends per transaction. (2) Frequency — how many times they buy per year (varies wildly: meal-delivery 24+, fashion 4–8, electronics 1–2). (3) Lifespan — how long they stay an active customer before churning (= 1 ÷ annual churn rate). ₹850 × 4 × 5 = ₹17,000. Note this is REVENUE LTV, not profit LTV. To get profit LTV, multiply by gross margin: at 60% margin, profit LTV = ₹10,200. CAC should be compared against profit LTV, not revenue LTV.",
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
    faqs: [
      {
        q: 'What is a good LTV:CAC ratio?',
        a: '3:1 is the standard benchmark for healthy unit economics. Below 1:1, you\'re losing money on each customer. 1–2:1 is risky and dependent on future expansion. 5:1 or higher might mean you\'re under-investing in growth — could acquire faster.',
      },
      {
        q: 'Why does LTV use revenue, not profit?',
        a: 'Both versions exist. Revenue LTV is simpler and more widely cited. Profit LTV (revenue × gross margin) is more honest about what the customer is "worth" to you. Always pair LTV with CAC and gross margin to make sense of unit economics.',
      },
      {
        q: 'How do I estimate customer lifespan?',
        a: 'Lifespan = 1 ÷ annual churn rate. If 20% of customers churn each year, average lifespan = 1 ÷ 0.20 = 5 years. For new businesses without enough data, use industry benchmarks (D2C beauty: 24–36 months; SaaS SMB: 24–30 months; enterprise SaaS: 48–84 months).',
      },
      {
        q: 'When does LTV calculation get tricky?',
        a: 'When a business has hugely different customer segments. A SaaS company\'s LTV looks very different for SMB vs enterprise — averaging them produces meaningless numbers. Always segment by plan size, geography, or acquisition channel for actionable LTV insights.',
      },
      {
        q: 'How can I increase LTV?',
        a: 'Three direct levers: increase AOV (upsells, bundles, higher-tier plans), increase frequency (subscriptions, replenishment reminders, loyalty programs), or extend lifespan (reduce churn through better onboarding and support). Lifespan extension usually has the highest leverage but slowest payback.',
      },
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
    intro:
      "ROAS (Return on Ad Spend) is the simplest paid-marketing metric — revenue attributed to ads divided by ad spend. ₹50,000 in revenue from ₹10,000 in Meta Ads spend = 5x ROAS. The benchmark varies by margin: D2C brands at 60% margin need a minimum 1.67x ROAS to break even on contribution (not counting fixed costs), and want 3x+ to actually grow. Low-margin businesses (10–20% gross) need 5–10x ROAS to make ads work at all. This calculator gives you the gross multiplier — the margin-adjusted true profitability question requires multiplying ROAS by gross margin to compare against 1.0.",
    formula: 'ROAS = Revenue from Ads ÷ Ad Spend · Gross profit = Revenue − Ad Spend',
    howItWorks:
      "₹50,000 attributed revenue ÷ ₹10,000 ad spend = 5x ROAS. Gross profit = 50,000 − 10,000 = ₹40,000. But ROAS hides margin. If your gross margin is 40%, only ₹20,000 of the ₹50,000 revenue is actually profit before ad cost — minus ₹10,000 spend = ₹10,000 contribution. So a 5x ROAS at 40% margin gives 2x margin-adjusted return on ad spend. The true break-even ROAS = 1 ÷ gross margin. At 40% margin, you need 2.5x ROAS to break even before fixed costs.",
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
    faqs: [
      {
        q: 'What\'s a good ROAS?',
        a: 'Depends entirely on your margin and customer LTV. For typical D2C at 60% margin: 3x+ ROAS is healthy. Low-margin (15–25%) needs 5–8x to make ads work. SaaS with high LTV can run at 1–2x ROAS and still be profitable because subscription revenue compounds over years.',
      },
      {
        q: 'What\'s the difference between ROAS and ROI?',
        a: 'ROAS = revenue ÷ ad spend (gross multiplier). ROI = (profit − ad spend) ÷ ad spend × 100 (percentage net return). A 4x ROAS at a 25% margin business = 0% ROI. Marketers tend to quote ROAS because it sounds bigger; finance teams prefer ROI.',
      },
      {
        q: 'How is ROAS attributed across channels?',
        a: 'Each platform attributes the conversion to itself if its ad was clicked or viewed within the attribution window. Result — totals across Meta, Google, TikTok often exceed 100% of actual revenue (double-counting). For true cross-channel ROAS, use a unified analytics tool (GA4, Triple Whale, Northbeam) and compare against blended ROAS = total revenue ÷ total ad spend.',
      },
      {
        q: 'Should I optimise for ROAS or for volume?',
        a: 'Depends on growth stage. Pre-product-market-fit: focus on ROAS to validate unit economics. Post-PMF in growth mode: accept lower ROAS to capture more demand (you can rebuild margins later). At maturity: hold ROAS at the level that sustains net profit.',
      },
      {
        q: 'Why does my Meta ROAS drop when I scale?',
        a: 'Diminishing returns. The first ₹10K of spend reaches your best-intent audience; ₹100K reaches lukewarm audiences too. ROAS typically drops 30–60% as you 5–10× spend. Plan for this — never project your current ROAS straight onto a larger budget.',
      },
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
