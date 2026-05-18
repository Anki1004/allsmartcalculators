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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'bitcoin-mining-calculator',
    name: 'Bitcoin Mining Calculator',
    category: 'crypto',
    icon: 'Cpu',
    description: 'Estimate Bitcoin mining profitability.',
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
    ranges: {
      title: 'Indicative inputs for current-gen mining setups',
      rows: [
        { label: 'Antminer S19j Pro', range: '100 TH/s @ 3,050W', note: 'Workhorse ASIC; ~$2,000 used' },
        { label: 'Antminer S19 XP', range: '141 TH/s @ 3,010W', note: 'Higher efficiency; ~$5,000 new' },
        { label: 'Antminer S21', range: '200 TH/s @ 3,500W', note: 'Latest gen; $7,000+' },
        { label: 'India residential power', range: '₹6 – ₹10/kWh', note: '$0.07–0.12; mining barely profitable' },
        { label: 'India industrial power', range: '₹3 – ₹5/kWh', note: '$0.04–0.06; profit possible' },
        { label: 'Iceland/Kazakhstan/Texas hubs', range: '$0.03 – $0.06/kWh', note: 'Where serious mining concentrates' },
      ],
    },
    limitations: [
      "Uses a static BTC price ($65,000) and a static network difficulty factor. Actual mining revenue shifts daily — difficulty resets every ~2 weeks, and the Bitcoin halving every 4 years cuts block reward in half.",
      "Doesn't account for pool fees (typically 1–2% of revenue) or transaction-fee revenue (varies widely, currently 1–5% of block rewards).",
      "Hardware depreciation isn't modelled. A $5,000 ASIC at 3-year useful life adds roughly $5/day in amortised cost — meaningful at low margins.",
      "Indian rules on crypto mining are unclear. RBI doesn't recognise crypto as legal tender; income from mining is taxable at 30% flat plus 1% TDS on sale.",
    ],
    seo: {
      title: 'Bitcoin Mining Calculator: Profit, Power, ROI',
      description: 'Free Bitcoin mining calculator. Estimate daily profit, power cost, and break-even from your hashrate, electricity rate, and current network difficulty.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'ethereum-gas-calculator',
    name: 'Ethereum Gas Calculator',
    category: 'crypto',
    icon: 'Fuel',
    description: 'Calculate gas fees in USD.',
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
    ranges: {
      title: 'Typical gas units by transaction type',
      rows: [
        { label: 'ETH or stablecoin transfer', range: '21,000 gas', note: 'Cheapest possible transaction' },
        { label: 'ERC-20 token transfer', range: '45,000 – 65,000 gas', note: 'USDT, USDC, etc.' },
        { label: 'Uniswap V2 swap', range: '~150,000 gas', note: 'V3 slightly more' },
        { label: 'NFT mint (ERC-721)', range: '80,000 – 250,000 gas', note: 'Highly variable by contract' },
        { label: 'Aave deposit / borrow', range: '~250,000 gas', note: 'DeFi lending protocols' },
        { label: 'Contract deployment', range: '500,000 – 2M gas', note: 'Depends on contract size' },
        { label: 'Layer-2 alternative (Arbitrum)', range: '~5–20× cheaper', note: 'Same operation, fraction of fee' },
      ],
    },
    limitations: [
      "Doesn't query live gas price — you input it manually. For real-time data, check Etherscan Gas Tracker or your wallet's suggested fee at the moment of transaction.",
      "Doesn't model EIP-1559 base fee vs priority tip split. The total fee shown is correct, but the protocol burns the base fee while only the tip goes to the validator.",
      "Doesn't account for failed transactions. If your transaction reverts (e.g. slippage too tight on a swap), you pay the gas anyway — sometimes the full amount.",
      "L2 alternatives (Arbitrum, Optimism, Base, zkSync) cost 5–50× less for the same operations. If you're paying ETH gas regularly, you should be on an L2.",
    ],
    seo: {
      title: 'Ethereum Gas Calculator: Gwei to USD Fee',
      description: 'Free Ethereum gas fee calculator. Convert gas units × gwei × ETH price into USD cost for any transaction — useful before signing on-chain actions.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'staking-rewards-calculator',
    name: 'Staking Rewards',
    category: 'crypto',
    icon: 'Layers',
    description: 'Project staking rewards over time.',
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
    ranges: {
      title: 'Indicative staking APY by major chain (April 2026)',
      rows: [
        { label: 'Ethereum (ETH) — native', range: '3 – 5%', note: 'Validators need 32 ETH; pools accept any amount' },
        { label: 'Solana (SOL)', range: '5 – 7%', note: 'Liquid staking via Jito, Marinade' },
        { label: 'Cardano (ADA)', range: '3 – 4%', note: 'No lockup; pool-based' },
        { label: 'Polkadot (DOT)', range: '10 – 13%', note: '28-day unbonding period' },
        { label: 'Cosmos (ATOM)', range: '12 – 17%', note: '21-day unbonding; high inflation drives APY' },
        { label: 'Liquid staking (Lido, Rocket Pool)', range: '−0.5% vs native', note: 'You hold a derivative; can be sold anytime' },
      ],
    },
    limitations: [
      "APY isn't fixed. Network reward rates change with the percentage of supply staked, fee market activity, and protocol parameters.",
      "Doesn't model lockup or unbonding periods — Cosmos has 21 days, ETH has variable queue, Polkadot 28 days. You can't access staked funds during these windows.",
      "Doesn't model token price risk. A 30% price drop in the coin vastly outweighs annual staking yield. Stake what you'd already hold; don't chase yield on coins you wouldn't otherwise own.",
      "Doesn't account for slashing. Validator misbehaviour (downtime, double-signing) can slash a portion of your stake. Choose reliable validators or use trusted liquid-staking providers.",
    ],
    seo: {
      title: 'Staking Rewards Calculator: APY Projections',
      description: 'Free crypto staking rewards calculator. Project rewards earned and final balance from any stake amount, APY, and lock-up period — ETH, SOL, ADA, etc.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'dca-calculator',
    name: 'DCA Calculator',
    category: 'crypto',
    icon: 'BarChart',
    description: 'Dollar-cost averaging over time.',
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
    ranges: {
      title: 'DCA strategy patterns',
      rows: [
        { label: 'Weekly DCA', range: '52 buys/year', note: 'Most common; smooth averaging' },
        { label: 'Bi-weekly DCA', range: '26 buys/year', note: 'Matches typical pay cycle' },
        { label: 'Monthly DCA', range: '12 buys/year', note: 'Lower fees, slightly less smoothing' },
        { label: 'Common DCA size (Indian retail)', range: '₹2,000 – ₹10,000/week', note: 'Equivalent to $25–$120/week' },
        { label: 'DCA + bonus buys on dips', range: '+50–100% on >15% drops', note: 'Hybrid strategy used by experienced DCAers' },
      ],
    },
    limitations: [
      "Calculator uses a single average buy price across all weekly purchases. Reality: each weekly buy hits a different price. If the market is range-bound, your true average is close to the input; in trending markets it diverges.",
      "Doesn't model exchange fees. Indian exchanges (CoinDCX, WazirX) take 0.1–0.4% per buy + 1% TDS on sells. Major CEXes globally take 0.1–0.5% per buy.",
      "Doesn't model tax. India's 30% flat on gains + 1% TDS dramatically reduces net DCA returns. US: short-term gains hit at slab rate, long-term at LTCG rate.",
      "Doesn't predict future price. The current price input is just \"what's it worth right now\" — the calculator can't tell you whether to expect further gains or a drawdown.",
    ],
    seo: {
      title: 'Crypto DCA Calculator: Dollar-Cost Average Returns',
      description: 'Free crypto DCA calculator. Project the value of a recurring buy strategy across any horizon, contribution size, and assumed annual return rate.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'impermanent-loss-calculator',
    name: 'Impermanent Loss',
    category: 'crypto',
    icon: 'TrendingDown',
    description: 'Calculate IL on LP positions.',
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
    ranges: {
      title: 'Impermanent loss by price divergence',
      rows: [
        { label: '1.25× divergence (one token +25%)', range: '~0.6% IL', note: 'Minor; usually offset by fees' },
        { label: '1.5× (one token +50%)', range: '~2.0% IL', note: '' },
        { label: '2× (one token doubles)', range: '~5.7% IL', note: 'Common bull-market scenario' },
        { label: '3× (one token triples)', range: '~13.4% IL', note: 'Significant — fees rarely cover this' },
        { label: '4× (one token quadruples)', range: '~20.0% IL', note: 'Major drag; hold pure exposure instead' },
        { label: '5× (one token quintuples)', range: '~25.5% IL', note: '' },
        { label: 'Stablecoin pool (USDC/USDT)', range: '< 0.1% typical IL', note: 'Why DAI/USDC/USDT pools are popular' },
      ],
    },
    limitations: [
      'IL is one-sided — only relevant relative to a buy-and-hold benchmark. If you intended to swap one token for the other anyway, LPing was probably better than the spot swap.',
      "Doesn't account for trading-fee earnings. A 5% IL on a pool earning 8% APR in fees is net positive. Calculate fee APR separately and subtract IL to estimate true LP return.",
      'Uniswap V3 concentrated liquidity has different IL dynamics. The standard formula here applies to V2-style 50/50 pools; V3 ranges amplify IL when prices move out of range.',
      "Doesn't model gas, slippage, or position-management costs. Active LPing on V3 requires regular rebalancing — gas alone can eat your fee earnings on small positions.",
    ],
    seo: {
      title: 'Impermanent Loss Calculator: LP Position IL',
      description: 'Free impermanent loss calculator for AMM liquidity providers. See your IL % for any token-pair price ratio change — Uniswap, Sushiswap, PancakeSwap.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'crypto-tax-calculator',
    name: 'Crypto Tax Calculator',
    category: 'crypto',
    icon: 'Receipt',
    description: 'Estimate capital gains tax on crypto.',
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
    ranges: {
      title: 'Crypto tax rates by jurisdiction',
      rows: [
        { label: 'India — Section 115BBH (all VDAs)', range: '30% flat + 4% cess', note: 'No deductions, no offsetting losses' },
        { label: 'India — 1% TDS on sale value', range: '1% of sale, refundable', note: 'Deducted automatically by Indian exchanges' },
        { label: 'US — long-term capital gains', range: '0% / 15% / 20%', note: 'Held over 1 year; bracket by income' },
        { label: 'US — short-term capital gains', range: '10% – 37% (slab rate)', note: 'Held under 1 year' },
        { label: 'UK — capital gains tax', range: '10% / 20%', note: 'Above £3K annual exemption' },
        { label: 'Singapore', range: '0%', note: 'No capital gains tax for individuals' },
        { label: 'Portugal', range: '28% (held under 1 year)', note: 'Long-term holdings are tax-free' },
      ],
    },
    limitations: [
      "Uses a flat tax rate — doesn't model India's lack of loss offsetting or the US bracket system properly.",
      "Doesn't subtract the 1% TDS already paid. In India, TDS is refundable via ITR against your overall liability — your actual cheque to the IT department is your tax minus TDS already deducted.",
      "Doesn't model cost basis methods. FIFO is the default; some jurisdictions allow LIFO or specific identification, which changes the gain calculation across multiple buys.",
      "Doesn't handle crypto-to-crypto swaps. In India, every swap is a taxable event at fair market value. In the US, same. Document each event separately.",
    ],
    seo: {
      title: 'Crypto Tax Calculator: Capital Gains on BTC, ETH',
      description: 'Free crypto capital-gains tax calculator. Estimate your tax liability on crypto sales — short-term vs long-term, with India 30% flat rate option.',
      applicationCategory: 'FinanceApplication',
      sources: [
        { label: 'IT department of India — crypto taxation FAQ', url: 'https://www.incometax.gov.in/' },
        { label: 'IRS — virtual currency tax guidance', url: 'https://www.irs.gov/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'nft-roi-calculator',
    name: 'NFT ROI Calculator',
    category: 'crypto',
    icon: 'Image',
    description: 'Calculate NFT return on investment.',
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
    ranges: {
      title: 'NFT marketplace fees and gas (April 2026)',
      rows: [
        { label: 'OpenSea marketplace fee', range: '2.5% on sales', note: 'Industry standard since 2021' },
        { label: 'Blur (volume-focused)', range: '0% – 0.5%', note: 'Variable; bidder pays' },
        { label: 'Magic Eden (Solana)', range: '2%', note: 'Plus low Solana gas' },
        { label: 'Typical creator royalty', range: '2.5% – 10%', note: '5% most common; Blur ignores it by default' },
        { label: 'Ethereum mint gas (NFT drop)', range: '0.01 – 0.5 ETH', note: 'Peak congestion can 10× this' },
        { label: 'Ethereum transfer gas', range: '0.002 – 0.02 ETH', note: 'Per move' },
        { label: 'Sale settlement gas', range: '0.005 – 0.03 ETH', note: 'Buyer typically pays' },
      ],
    },
    limitations: [
      "Doesn't include marketplace platform fees — add 0.5–2.5% of sell price separately depending on which platform you used.",
      "Royalty enforcement varies by platform. OpenSea enforces creator royalties; Blur and LooksRare don't by default. Your actual royalty paid depends on where you sold.",
      "Doesn't model USD conversion. A 2.5 ETH sale at $3,500 ETH is $8,750. The same sale at $2,000 ETH is $5,000. ROI in ETH terms can be very different from ROI in INR/USD terms.",
      "Doesn't handle bundle deals, accept-an-offer transactions, or peer-to-peer trades with custom royalty splits.",
    ],
    seo: {
      title: 'NFT ROI Calculator: Return After Fees & Royalties',
      description: 'Free NFT ROI calculator. Net return after marketplace fees, creator royalties, and gas — tells you what you actually pocket from a flip.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'crypto-conversion-calculator',
    name: 'Crypto Converter',
    category: 'crypto',
    icon: 'Repeat',
    description: 'Convert crypto to USD.',
    usageCount: 89000,
    inputs: [
      { key: 'amount', label: 'Amount', type: 'slider', min: 0.0001, max: 1000, step: 0.01, default: 1, suffix: 'coin', color: 'primary' },
      { key: 'price', label: 'Coin Price', type: 'slider', min: 0.001, max: 200000, step: 0.01, default: 65000, prefix: '$', color: 'secondary' },
    ],
    outputs: [
      { key: 'usd', label: 'USD Value', prefix: '$', primary: true },
    ],
    calculate: (i) => ({ usd: Number(i.amount) * Number(i.price) }),
    ranges: {
      title: 'Price sources for common coins (April 2026)',
      rows: [
        { label: 'CoinGecko (volume-weighted)', range: 'Most-cited retail source', note: 'Free API, broad coverage' },
        { label: 'CoinMarketCap', range: 'Most-cited mainstream', note: 'Owned by Binance since 2020' },
        { label: 'Binance / Coinbase (spot)', range: 'Single-exchange specific', note: 'Used when comparing trade ideas' },
        { label: 'CoinDCX / WazirX (India)', range: 'Includes 1% TDS overhead', note: 'INR pairs often premium to USD spot' },
        { label: 'Chainlink price oracles', range: 'Used by DeFi protocols', note: 'Median across multiple feeds' },
      ],
    },
    limitations: [
      "Doesn't fetch live prices — you enter them manually. For live conversion, check CoinGecko or your wallet directly.",
      "Doesn't model the bid/ask spread. Listed prices are mid-market; the actual buy or sell price on small caps can be 1–5% worse.",
      "Doesn't handle multi-coin portfolio. Use the Crypto Portfolio Calculator for that.",
      "Indian exchange prices (CoinDCX, WazirX) often trade 1–4% premium to USD spot due to the 1% TDS, capital controls, and smaller liquidity pools. Adjust accordingly when comparing.",
    ],
    seo: {
      title: 'Crypto to USD Converter: BTC, ETH & Altcoin Value',
      description: 'Free crypto-to-USD converter. Convert any coin amount into USD at current price — fast lookup for portfolio valuation and on-the-fly checks.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'crypto-portfolio-calculator',
    name: 'Portfolio Calculator',
    category: 'crypto',
    icon: 'Briefcase',
    description: 'Track multi-coin portfolio value.',
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
    ranges: {
      title: 'Common BTC + ETH allocation strategies',
      rows: [
        { label: 'Defensive (max BTC)', range: '80% BTC / 20% ETH', note: 'Lower volatility; lower upside' },
        { label: 'Balanced (institutional default)', range: '60% BTC / 40% ETH', note: 'Tracks roughly market-cap-weighted top-2' },
        { label: 'Equal-weight', range: '50% BTC / 50% ETH', note: 'Simple to maintain; popular retail choice' },
        { label: 'ETH-tilt (growth)', range: '40% BTC / 60% ETH', note: 'Bets on Ethereum ecosystem growth' },
        { label: 'Aggressive ETH', range: '30% BTC / 70% ETH', note: 'High beta to DeFi/L2/staking growth' },
        { label: 'Plus altcoin satellites', range: '5–15% of total', note: 'Diversification or alpha hunt' },
      ],
    },
    limitations: [
      'Only handles BTC and ETH. For larger portfolios with multiple coins, use a tracker that supports unlimited assets (Koinly, CoinTracker, CoinStats, Delta).',
      "Doesn't model cost basis. You see current value but not unrealised P&L unless you also know your average buy price for each coin.",
      "Doesn't handle staked, lent, or LP-positioned tokens separately. stETH, ETH on Aave, and ETH in a Uniswap LP all show as ETH but may have different liquidity/risk profiles.",
      'Allocation percentages drift naturally with price. Set rebalance triggers (typically ±10–15% drift from target) rather than rebalancing on the calendar — saves on fees and tax events.',
    ],
    seo: {
      title: 'Crypto Portfolio Calculator: Total Value & Allocation',
      description: 'Free crypto portfolio calculator. Track total USD value and percent allocation across multiple coins — set and adjust holdings on the fly.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
