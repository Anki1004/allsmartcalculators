import { CalculatorConfig } from '../calculator-types';

export const cryptoCalculators: CalculatorConfig[] = [
  {
    slug: 'crypto-profit-calculator',
    name: 'Crypto Profit Calculator',
    category: 'crypto',
    icon: 'TrendingUp',
    description: 'Calculate profit, loss, and percent return on any crypto trade — Bitcoin, Ethereum, or altcoins — from buy price, sell price, and quantity.',
    trending: true,
    usageCount: 128000,
    inputs: [
      { key: 'buyPrice', label: 'Buy Price', type: 'slider', min: 0.001, max: 100000, step: 0.01, default: 30000, prefix: '$', color: 'primary' },
      { key: 'sellPrice', label: 'Sell Price', type: 'slider', min: 0.001, max: 200000, step: 0.01, default: 45000, prefix: '$', color: 'secondary' },
      { key: 'quantity', label: 'Quantity', type: 'slider', min: 0.0001, max: 100, step: 0.01, default: 0.5, suffix: 'units', color: 'tertiary' },
    ],
    outputs: [
      { key: 'profit', label: 'Profit / Loss', prefix: '$', primary: true },
      { key: 'returnPct', label: 'Return %', suffix: '%', color: 'secondary' },
      { key: 'invested', label: 'Invested', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const bp = Number(i.buyPrice);
      const sp = Number(i.sellPrice);
      const q = Number(i.quantity);
      return {
        profit: (sp - bp) * q,
        returnPct: bp > 0 ? ((sp - bp) / bp) * 100 : 0,
        invested: bp * q,
      };
    },
    intro:
      'A crypto profit calculator computes the gain or loss on a buy/sell trade in any cryptocurrency — Bitcoin, Ethereum, Solana, altcoins. The math is simple ((sell − buy) × quantity), but it\'s easy to get wrong when juggling fractional quantities, USD-pair pricing, and conversion to your local currency. This calculator returns three numbers: the absolute profit in dollars, the percent return on your invested capital, and the total invested. For tax-aware calculations (capital gains, holding period, fees), use the dedicated crypto tax calculator.',
    formula: 'profit = (sell − buy) × quantity · return% = ((sell − buy) ÷ buy) × 100 · invested = buy × quantity',
    howItWorks:
      "Bought 0.5 BTC at $30,000 each, sold at $45,000: profit = (45,000 − 30,000) × 0.5 = $7,500. Return = ((45,000 − 30,000) ÷ 30,000) × 100 = 50%. Invested = 30,000 × 0.5 = $15,000. The percent return is independent of quantity (50% gain is 50% whether you held 0.01 or 100 BTC). Trading fees (typically 0.1–0.5% per side on major exchanges) are not modelled — subtract roughly 1% from the return for a round-trip on a CEX, more on DEXs.",
    ranges: {
      title: 'Crypto trading-fee ranges (April 2026)',
      rows: [
        { label: 'Major CEX maker', range: '0.05 – 0.20%', note: 'Binance, Coinbase Pro, Kraken — depends on volume' },
        { label: 'Major CEX taker', range: '0.10 – 0.50%', note: 'Higher than maker; both apply per side' },
        { label: 'Coinbase retail (instant)', range: '~1.5%', note: 'Plus spread; expensive for active trading' },
        { label: 'Indian exchange (CoinDCX, WazirX)', range: '0.10 – 0.40%', note: 'Plus 1% TDS on sale (mandatory)' },
        { label: 'Uniswap / DEX', range: '0.30%', note: 'Plus gas fee (variable, can be $5–$50+)' },
        { label: 'India 1% TDS on crypto sales', range: '1% mandatory', note: 'Deducted at source on every sale, refundable via ITR' },
      ],
    },
    limitations: [
      "Calculator doesn't subtract trading fees. For a true round-trip P&L, subtract 0.2–1% from the return depending on exchange.",
      'Doesn\'t model India\'s 1% TDS on crypto sales (deducted automatically by Indian exchanges) or the 30% flat tax on crypto gains. Use the crypto tax calculator for tax-aware figures.',
      "Assumes a single buy and single sell at fixed prices. For DCA (dollar-cost averaging) or laddered exits, your effective average buy/sell price differs — use a weighted-average calculation per lot.",
      "USD-denominated. If you bought with INR or another currency, the FX rate at buy and sell time matters for your true rupee P&L. A crypto gain in USD can be a loss in INR if the rupee strengthens.",
    ],
    faqs: [
      {
        q: 'How do I calculate crypto profit?',
        a: 'Profit = (sell price − buy price) × quantity. For 0.5 BTC bought at $30K and sold at $45K, profit = (45,000 − 30,000) × 0.5 = $7,500. Return % = ((sell − buy) ÷ buy) × 100 = 50% in this case.',
      },
      {
        q: 'Are trading fees included in this calculator?',
        a: 'No. Major CEX fees are 0.1–0.5% per side, so a round-trip costs roughly 0.2–1% of the trade value. For active trading or small profits, fees can dominate. Subtract them from your gross profit for the real P&L.',
      },
      {
        q: 'How is crypto taxed in India?',
        a: 'Flat 30% tax on gains from crypto (no slab rate, no offsetting losses). Plus 1% TDS deducted automatically by exchanges on every sale (refundable via ITR if your overall liability is lower). No long-term vs short-term distinction. This calculator does not model the tax — use the crypto tax calculator.',
      },
      {
        q: 'How is crypto taxed in the US?',
        a: 'Crypto is property. Held over 1 year: long-term capital gains rate (0–20% based on income). Held under 1 year: short-term, taxed at ordinary income rate. Each sale is a taxable event; even crypto-to-crypto swaps trigger tax. Track cost basis carefully.',
      },
      {
        q: "What's the difference between this calculator and the crypto tax calculator?",
        a: 'This one returns gross profit/loss without modelling tax or fees. The crypto tax calculator applies the relevant capital-gains treatment, holding period, and (for India) the 30% flat rate plus 1% TDS. Use this for trade analysis; that one for tax planning.',
      },
    ],
    seo: {
      title: 'Crypto Profit Calculator: P&L on Any Coin Trade',
      description: 'Free crypto profit/loss calculator. See gain or loss in dollars, percent return, and total invested for any buy/sell trade across BTC, ETH, or altcoins.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'IT department of India — crypto taxation FAQ', url: 'https://www.incometax.gov.in/' },
        { label: 'IRS — virtual currency tax guidance', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/virtual-currencies' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
  },
  {
    slug: 'bitcoin-mining-calculator',
    name: 'Bitcoin Mining Calculator',
    category: 'crypto',
    icon: 'Cpu',
    description: 'Estimate Bitcoin mining profitability.',
    seo: {
      title: 'Bitcoin Mining Calculator: Profit, Power, ROI',
      description: 'Free Bitcoin mining calculator. Estimate daily profit, power cost, and break-even from your hashrate, electricity rate, and current network difficulty.',
    },
    usageCount: 42000,
    inputs: [
      { key: 'hashRate', label: 'Hash Rate', type: 'slider', min: 1, max: 500, step: 1, default: 100, suffix: 'TH/s', color: 'primary' },
      { key: 'power', label: 'Power Consumption', type: 'slider', min: 100, max: 5000, step: 50, default: 3000, suffix: 'W', color: 'secondary' },
      { key: 'cost', label: 'Electricity Cost', type: 'slider', min: 0.01, max: 1, step: 0.01, default: 0.12, prefix: '$/kWh', color: 'tertiary' },
    ],
    outputs: [
      { key: 'dailyProfit', label: 'Est. Daily Profit', prefix: '$', primary: true },
      { key: 'dailyCost', label: 'Electricity Cost/Day', prefix: '$', color: 'secondary' },
      { key: 'monthlyProfit', label: 'Monthly Profit', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const btcPerDay = Number(i.hashRate) * 0.00004;
      const btcPrice = 65000;
      const dailyRevenue = btcPerDay * btcPrice;
      const dailyCost = (Number(i.power) / 1000) * 24 * Number(i.cost);
      return {
        dailyProfit: dailyRevenue - dailyCost,
        dailyCost,
        monthlyProfit: (dailyRevenue - dailyCost) * 30,
      };
    },
  },
  {
    slug: 'ethereum-gas-calculator',
    name: 'Ethereum Gas Calculator',
    category: 'crypto',
    icon: 'Fuel',
    description: 'Calculate gas fees in USD.',
    seo: {
      title: 'Ethereum Gas Calculator: Gwei to USD Fee',
      description: 'Free Ethereum gas fee calculator. Convert gas units × gwei × ETH price into USD cost for any transaction — useful before signing on-chain actions.',
    },
    usageCount: 38000,
    inputs: [
      { key: 'gasPrice', label: 'Gas Price', type: 'slider', min: 1, max: 500, step: 1, default: 30, suffix: 'gwei', color: 'primary' },
      { key: 'gasUnits', label: 'Gas Units', type: 'slider', min: 21000, max: 1000000, step: 1000, default: 21000, suffix: 'units', color: 'secondary' },
      { key: 'ethPrice', label: 'ETH Price', type: 'slider', min: 100, max: 10000, step: 10, default: 3000, prefix: '$', color: 'tertiary' },
    ],
    outputs: [
      { key: 'feeEth', label: 'Fee in ETH', decimals: 6, primary: true, color: 'secondary' },
      { key: 'feeUsd', label: 'Fee in USD', prefix: '$', decimals: 2, color: 'tertiary' },
    ],
    calculate: (i) => {
      const feeEth = (Number(i.gasPrice) * Number(i.gasUnits)) / 1e9;
      return { feeEth, feeUsd: feeEth * Number(i.ethPrice) };
    },
  },
  {
    slug: 'staking-rewards-calculator',
    name: 'Staking Rewards',
    category: 'crypto',
    icon: 'Layers',
    description: 'Project staking rewards over time.',
    seo: {
      title: 'Staking Rewards Calculator: APY Projections',
      description: 'Free crypto staking rewards calculator. Project rewards earned and final balance from any stake amount, APY, and lock-up period — ETH, SOL, ADA, etc.',
    },
    trending: true,
    usageCount: 67000,
    inputs: [
      { key: 'amount', label: 'Staked Amount', type: 'slider', min: 10, max: 1000000, step: 10, default: 10000, prefix: '$', color: 'primary' },
      { key: 'apy', label: 'APY', type: 'slider', min: 0.1, max: 100, step: 0.1, default: 8, suffix: '%', color: 'secondary' },
      { key: 'years', label: 'Duration', type: 'slider', min: 0.25, max: 10, step: 0.25, default: 2, suffix: 'yrs', color: 'tertiary' },
    ],
    outputs: [
      { key: 'final', label: 'Final Value', prefix: '$', primary: true },
      { key: 'rewards', label: 'Rewards Earned', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const final = Number(i.amount) * Math.pow(1 + Number(i.apy) / 100, Number(i.years));
      return { final, rewards: final - Number(i.amount) };
    },
  },
  {
    slug: 'dca-calculator',
    name: 'DCA Calculator',
    category: 'crypto',
    icon: 'BarChart',
    description: 'Dollar-cost averaging over time.',
    seo: {
      title: 'Crypto DCA Calculator: Dollar-Cost Average Returns',
      description: 'Free crypto DCA calculator. Project the value of a recurring buy strategy across any horizon, contribution size, and assumed annual return rate.',
    },
    usageCount: 31000,
    inputs: [
      { key: 'amount', label: 'Amount per Buy', type: 'slider', min: 10, max: 10000, step: 10, default: 100, prefix: '$', color: 'primary' },
      { key: 'buys', label: 'Number of Buys', type: 'slider', min: 1, max: 365, step: 1, default: 52, color: 'secondary' },
      { key: 'avgPrice', label: 'Avg Buy Price', type: 'slider', min: 10, max: 100000, step: 10, default: 35000, prefix: '$', color: 'tertiary' },
      { key: 'currentPrice', label: 'Current Price', type: 'slider', min: 10, max: 200000, step: 10, default: 55000, prefix: '$' },
    ],
    outputs: [
      { key: 'invested', label: 'Total Invested', prefix: '$', primary: true },
      { key: 'holdings', label: 'Holdings Value', prefix: '$', color: 'secondary' },
      { key: 'profit', label: 'Profit / Loss', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const invested = Number(i.amount) * Number(i.buys);
      const units = invested / Number(i.avgPrice);
      const holdings = units * Number(i.currentPrice);
      return { invested, holdings, profit: holdings - invested };
    },
  },
  {
    slug: 'impermanent-loss-calculator',
    name: 'Impermanent Loss',
    category: 'crypto',
    icon: 'TrendingDown',
    description: 'Calculate IL on LP positions.',
    seo: {
      title: 'Impermanent Loss Calculator: LP Position IL',
      description: 'Free impermanent loss calculator for AMM liquidity providers. See your IL % for any token-pair price ratio change — Uniswap, Sushiswap, PancakeSwap.',
    },
    usageCount: 24000,
    inputs: [
      { key: 'priceChangeA', label: 'Token A Change', type: 'slider', min: -90, max: 500, step: 1, default: 50, suffix: '%', color: 'primary' },
      { key: 'priceChangeB', label: 'Token B Change', type: 'slider', min: -90, max: 500, step: 1, default: 0, suffix: '%', color: 'secondary' },
    ],
    outputs: [
      { key: 'il', label: 'Impermanent Loss', suffix: '%', primary: true, color: 'secondary' },
    ],
    calculate: (i) => {
      const ratio = (1 + Number(i.priceChangeA) / 100) / (1 + Number(i.priceChangeB) / 100);
      const il = (2 * Math.sqrt(ratio)) / (1 + ratio) - 1;
      return { il: il * 100 };
    },
  },
  {
    slug: 'crypto-tax-calculator',
    name: 'Crypto Tax Calculator',
    category: 'crypto',
    icon: 'Receipt',
    description: 'Estimate capital gains tax on crypto.',
    seo: {
      title: 'Crypto Tax Calculator: Capital Gains on BTC, ETH',
      description: 'Free crypto capital-gains tax calculator. Estimate your tax liability on crypto sales — short-term vs long-term, with India 30% flat rate option.',
    },
    trending: true,
    usageCount: 58000,
    inputs: [
      { key: 'gains', label: 'Capital Gains', type: 'slider', min: 0, max: 1000000, step: 100, default: 15000, prefix: '$', color: 'primary' },
      { key: 'taxRate', label: 'Tax Rate', type: 'slider', min: 0, max: 50, step: 0.5, default: 22, suffix: '%', color: 'secondary' },
    ],
    outputs: [
      { key: 'tax', label: 'Estimated Tax', prefix: '$', primary: true },
      { key: 'netGains', label: 'Net After Tax', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const tax = Number(i.gains) * (Number(i.taxRate) / 100);
      return { tax, netGains: Number(i.gains) - tax };
    },
  },
  {
    slug: 'nft-roi-calculator',
    name: 'NFT ROI Calculator',
    category: 'crypto',
    icon: 'Image',
    description: 'Calculate NFT return on investment.',
    seo: {
      title: 'NFT ROI Calculator: Return After Fees & Royalties',
      description: 'Free NFT ROI calculator. Net return after marketplace fees, creator royalties, and gas — tells you what you actually pocket from a flip.',
    },
    usageCount: 19000,
    inputs: [
      { key: 'buyPrice', label: 'Purchase Price', type: 'slider', min: 0.001, max: 100, step: 0.001, default: 0.5, suffix: 'ETH', color: 'primary' },
      { key: 'sellPrice', label: 'Sale Price', type: 'slider', min: 0.001, max: 1000, step: 0.001, default: 2.5, suffix: 'ETH', color: 'secondary' },
      { key: 'gasFees', label: 'Total Gas Fees', type: 'slider', min: 0, max: 10, step: 0.01, default: 0.05, suffix: 'ETH', color: 'tertiary' },
      { key: 'royalty', label: 'Royalty %', type: 'slider', min: 0, max: 15, step: 0.5, default: 5, suffix: '%' },
    ],
    outputs: [
      { key: 'netProfit', label: 'Net Profit (ETH)', suffix: 'ETH', decimals: 3, primary: true },
      { key: 'roi', label: 'ROI', suffix: '%', color: 'secondary' },
    ],
    calculate: (i) => {
      const royalty = Number(i.sellPrice) * (Number(i.royalty) / 100);
      const netProfit = Number(i.sellPrice) - Number(i.buyPrice) - Number(i.gasFees) - royalty;
      return {
        netProfit,
        roi: Number(i.buyPrice) > 0 ? (netProfit / Number(i.buyPrice)) * 100 : 0,
      };
    },
  },
  {
    slug: 'crypto-conversion-calculator',
    name: 'Crypto Converter',
    category: 'crypto',
    icon: 'Repeat',
    description: 'Convert crypto to USD.',
    seo: {
      title: 'Crypto to USD Converter: BTC, ETH & Altcoin Value',
      description: 'Free crypto-to-USD converter. Convert any coin amount into USD at current price — fast lookup for portfolio valuation and on-the-fly checks.',
    },
    usageCount: 89000,
    inputs: [
      { key: 'amount', label: 'Amount', type: 'slider', min: 0.0001, max: 1000, step: 0.01, default: 1, suffix: 'coin', color: 'primary' },
      { key: 'price', label: 'Coin Price', type: 'slider', min: 0.001, max: 200000, step: 0.01, default: 65000, prefix: '$', color: 'secondary' },
    ],
    outputs: [
      { key: 'usd', label: 'USD Value', prefix: '$', primary: true },
    ],
    calculate: (i) => ({ usd: Number(i.amount) * Number(i.price) }),
  },
  {
    slug: 'crypto-portfolio-calculator',
    name: 'Portfolio Calculator',
    category: 'crypto',
    icon: 'Briefcase',
    description: 'Track multi-coin portfolio value.',
    seo: {
      title: 'Crypto Portfolio Calculator: Total Value & Allocation',
      description: 'Free crypto portfolio calculator. Track total USD value and percent allocation across multiple coins — set and adjust holdings on the fly.',
    },
    usageCount: 33000,
    inputs: [
      { key: 'btcQty', label: 'BTC Holdings', type: 'slider', min: 0, max: 10, step: 0.001, default: 0.5, suffix: 'BTC', color: 'primary' },
      { key: 'ethQty', label: 'ETH Holdings', type: 'slider', min: 0, max: 100, step: 0.01, default: 5, suffix: 'ETH', color: 'secondary' },
      { key: 'btcPrice', label: 'BTC Price', type: 'slider', min: 1000, max: 200000, step: 100, default: 65000, prefix: '$', color: 'tertiary' },
      { key: 'ethPrice', label: 'ETH Price', type: 'slider', min: 100, max: 20000, step: 10, default: 3200, prefix: '$' },
    ],
    outputs: [
      { key: 'total', label: 'Total Portfolio Value', prefix: '$', primary: true },
      { key: 'btcValue', label: 'BTC Value', prefix: '$', color: 'secondary' },
      { key: 'ethValue', label: 'ETH Value', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const btcValue = Number(i.btcQty) * Number(i.btcPrice);
      const ethValue = Number(i.ethQty) * Number(i.ethPrice);
      return { total: btcValue + ethValue, btcValue, ethValue };
    },
  },
];
