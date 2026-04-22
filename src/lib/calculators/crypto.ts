import { CalculatorConfig } from '../calculator-types';

export const cryptoCalculators: CalculatorConfig[] = [
  {
    slug: 'crypto-profit-calculator',
    name: 'Crypto Profit Calculator',
    category: 'crypto',
    icon: 'TrendingUp',
    description: 'Calculate profit/loss on crypto trades.',
    longDescription: 'Every crypto trade comes down to the same three numbers: what you paid, what you sold for, and how many units you held. This calculator gives you total profit or loss in dollars and your percentage return — instantly. Whether you\'re reviewing a completed position or stress-testing a planned exit price, knowing these numbers before you act is the minimum due diligence.',
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
    formula: 'Profit = (Sell Price − Buy Price) × Quantity',
    faqs: [
      { q: 'Does this include trading fees?', a: 'No — this shows gross profit before exchange fees, gas costs, or taxes. Most centralized exchanges charge 0.1-0.5% per trade; DEX trades also incur gas fees. For small positions, fees can meaningfully reduce net profit and should be factored in.' },
      { q: 'How does this relate to my tax liability?', a: 'Your profit figure here is your capital gain before tax. Short-term gains (held under 1 year) are taxed as ordinary income; long-term gains (held over 1 year) qualify for lower rates (typically 15%). Use the crypto tax calculator alongside this to estimate what you\'ll owe.' },
      { q: 'What if the sell price is lower than buy price?', a: 'You\'ll see a negative profit — a capital loss. Losses can be used to offset gains in the same tax year (tax-loss harvesting). If losses exceed gains, up to $3,000/year can offset ordinary income in the US, with the remainder carried forward to future years.' },
    ],
  },
  {
    slug: 'bitcoin-mining-calculator',
    name: 'Bitcoin Mining Calculator',
    category: 'crypto',
    icon: 'Cpu',
    description: 'Estimate Bitcoin mining profitability.',
    longDescription: 'Bitcoin mining profitability hinges on three variables: your hash rate, your electricity cost, and the BTC price. This calculator models daily revenue based on approximate network share at your hash rate, subtracts electricity costs, and projects monthly profit. The margins are typically thin — electricity cost is almost always the make-or-break variable for home miners.',
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
    formula: 'Daily Profit = (Hash Rate × BTC/TH/day × BTC Price) − (Power × 24h × $/kWh)',
    faqs: [
      { q: 'Is home Bitcoin mining profitable in 2025?', a: 'At residential electricity rates ($0.10-0.15/kWh), most home miners break even at best. Industrial miners with rates below $0.06/kWh have a structural cost advantage that\'s very difficult to compete with. Home mining makes sense mainly if you have cheap electricity or want BTC exposure tied to direct network participation.' },
      { q: 'What hardware do I need to mine Bitcoin?', a: 'Bitcoin requires ASIC (Application-Specific Integrated Circuit) miners — purpose-built machines. GPU mining Bitcoin hasn\'t been viable for years. Current top-tier ASICs include the Antminer S21 Pro (~234 TH/s) and Whatsminer M66S (~298 TH/s), costing $5,000-8,000 each.' },
      { q: 'How does Bitcoin\'s halving affect mining profitability?', a: 'Every ~4 years, the Bitcoin block reward halves. The 2024 halving reduced the reward from 6.25 to 3.125 BTC per block. If BTC price doesn\'t rise to compensate, miner revenue per unit of hash rate falls by ~50%. Miners with the lowest electricity costs survive each halving; less efficient miners typically shut down.' },
    ],
  },
  {
    slug: 'ethereum-gas-calculator',
    name: 'Ethereum Gas Calculator',
    category: 'crypto',
    icon: 'Fuel',
    description: 'Calculate gas fees in USD.',
    longDescription: 'Every transaction on the Ethereum network requires gas — a fee paid to validators for including your transaction in a block. Gas costs vary with network congestion and spike dramatically during high-demand periods (NFT launches, DeFi events). This calculator converts your gas price and estimated gas units directly into ETH and USD costs, so you know what a transaction will cost before you send it.',
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
    formula: 'Fee (ETH) = Gas Price (gwei) × Gas Units ÷ 1,000,000,000',
    faqs: [
      { q: 'What is a gwei?', a: 'Gwei is a denomination of ETH — 1 gwei = 0.000000001 ETH (10^-9 ETH). Gas prices are quoted in gwei for readability. A "30 gwei" gas price means you\'re paying 30 × 10^-9 ETH per unit of gas.' },
      { q: 'How many gas units does a typical transaction use?', a: 'A simple ETH transfer uses 21,000 gas units (the minimum). ERC-20 token transfers use 40,000-65,000. Uniswap swaps typically use 100,000-200,000. Complex DeFi interactions can use 400,000+ gas units.' },
      { q: 'How can I reduce gas fees?', a: 'Gas fees are lower during off-peak hours (weekends, late night US time). You can also set a lower gas price and wait longer for inclusion. Layer 2 networks (Arbitrum, Optimism, Base) offer the same transactions at 10-100x lower cost by batching them and settling on Ethereum.' },
    ],
  },
  {
    slug: 'staking-rewards-calculator',
    name: 'Staking Rewards',
    category: 'crypto',
    icon: 'Layers',
    description: 'Project staking rewards over time.',
    longDescription: 'Crypto staking lets you earn yield on assets you hold — validators earn rewards for securing proof-of-stake networks, and delegators share in those rewards. This calculator projects your final portfolio value and total rewards earned over your chosen staking duration, using compound interest since most staking protocols compound rewards automatically or allow regular reinvestment.',
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
    formula: 'Final Value = Principal × (1 + APY)^Years',
    faqs: [
      { q: 'What is APY vs APR in staking?', a: 'APR is the annual interest rate without compounding. APY accounts for compounding (earning rewards on your rewards). Most staking calculators and protocols quote APY. If you reinvest rewards frequently, you\'ll earn APY; if you withdraw rewards, you earn closer to APR.' },
      { q: 'Is staking income taxable?', a: 'Yes, in most jurisdictions. Staking rewards are generally treated as ordinary income at the time you receive them, valued at the market price when received. When you later sell those tokens, you have an additional capital gain (or loss) based on the change in price since receipt.' },
      { q: 'What are the risks of staking?', a: 'Price risk: the token\'s value can fall more than your staking rewards earn. Slashing risk: some networks penalize validators (and their delegators) for misbehavior. Lock-up risk: many staking protocols have unbonding periods (7-28 days) during which you can\'t sell. Smart contract risk in DeFi staking. Research each protocol carefully.' },
    ],
  },
  {
    slug: 'dca-calculator',
    name: 'DCA Calculator',
    category: 'crypto',
    icon: 'BarChart',
    description: 'Dollar-cost averaging over time.',
    longDescription: 'Dollar-cost averaging (DCA) is the practice of investing a fixed dollar amount at regular intervals regardless of price. In volatile crypto markets, this strategy naturally buys more coins when prices are low and fewer when they\'re high — reducing average cost basis compared to lump-sum purchases at unfavorable timing. This calculator shows your total invested, current holdings value, and profit/loss for any DCA scenario.',
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
    formula: 'Holdings = (Total Invested ÷ Avg Buy Price) × Current Price',
    faqs: [
      { q: 'How often should I DCA — weekly or monthly?', a: 'For most retail investors, monthly aligns naturally with paycheck cadence and keeps transaction fees manageable. Weekly DCA can feel more psychologically satisfying but the mathematical difference over years is minimal. What matters most is consistency, not frequency.' },
      { q: 'Should I DCA into Bitcoin specifically, or altcoins too?', a: 'Bitcoin and Ethereum have the longest track records and deepest liquidity, making them the most defensible DCA targets. Altcoins carry substantially more risk of permanent loss — a coin can go to zero or never recover from a bear market. If you DCA altcoins, size positions accordingly.' },
      { q: 'Is DCA better than lump-sum investing?', a: 'Historical data shows lump-sum beats DCA about two-thirds of the time in trending-up markets, because more time in the market = more compounding. But DCA wins behaviorally — removing the temptation to time the market prevents the panic-selling and euphoric-buying that kills most self-directed investor returns.' },
    ],
  },
  {
    slug: 'impermanent-loss-calculator',
    name: 'Impermanent Loss',
    category: 'crypto',
    icon: 'TrendingDown',
    description: 'Calculate IL on LP positions.',
    longDescription: 'Impermanent loss (IL) is the hidden cost of providing liquidity in automated market makers (AMMs) like Uniswap. When token prices diverge from when you deposited, the AMM rebalances your position — and you end up holding a different ratio of tokens than you started with. IL represents how much less you have vs. simply holding both tokens. This calculator quantifies it based on the price change of each token.',
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
    formula: 'IL = 2√(price ratio) / (1 + price ratio) − 1',
    faqs: [
      { q: 'Why is it called "impermanent" loss?', a: 'If the token prices return to their original ratio at the time of your deposit, the impermanent loss disappears — hence "impermanent." The loss only becomes permanent when you withdraw your liquidity while prices are diverged from the original ratio.' },
      { q: 'When does impermanent loss become a serious concern?', a: 'IL grows as price divergence increases. A 2x price change in one token creates ~5.7% IL. A 5x change creates ~25.5% IL. Very large price divergences (one token moons while the other stays flat) produce severe IL. For stable-stable pairs (e.g., USDC-USDT), IL is minimal.' },
      { q: 'Do LP fees compensate for impermanent loss?', a: 'Sometimes. High-volume pools (like ETH-USDC on Uniswap) generate significant fee income that can exceed IL. Low-volume pools with volatile token pairs are more likely to result in a net loss vs. holding. Always compare your fee earnings to your IL before assessing LP profitability.' },
    ],
  },
  {
    slug: 'crypto-tax-calculator',
    name: 'Crypto Tax Calculator',
    category: 'crypto',
    icon: 'Receipt',
    description: 'Estimate capital gains tax on crypto.',
    longDescription: 'Crypto capital gains are real taxes that many traders underestimate until tax season arrives. Whether you\'re a casual investor who sold some Bitcoin or an active DeFi user with hundreds of transactions, knowing your approximate liability before filing is essential. This calculator estimates your tax based on your total gains and the applicable tax rate — short-term (ordinary income) or long-term (preferential) rates.',
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
    formula: 'Tax = Capital Gains × Tax Rate',
    faqs: [
      { q: 'What tax rate should I use — short or long-term?', a: 'If you held the asset for under 1 year, use your ordinary income tax rate (10-37% in the US, depending on total income). If held over 1 year, use the long-term capital gains rate: 0% (under ~$44k income), 15% (most middle-income earners), or 20% (high earners).' },
      { q: 'Are crypto-to-crypto trades taxable?', a: 'Yes, in the US and most countries. Trading BTC for ETH is treated as disposing of BTC at its current market value, triggering a capital gain or loss. Taxes don\'t only apply when you convert to fiat.' },
      { q: 'What records do I need to keep?', a: 'Keep records of every taxable event: purchase date, purchase price (cost basis), sale date, and sale price. Most exchanges provide annual transaction reports. Dedicated crypto tax software (Koinly, TaxBit, CoinTracker) can import exchange data and calculate gains automatically.' },
    ],
  },
  {
    slug: 'nft-roi-calculator',
    name: 'NFT ROI Calculator',
    category: 'crypto',
    icon: 'Image',
    description: 'Calculate NFT return on investment.',
    longDescription: 'NFT trades involve more costs than just the purchase and sale price. Ethereum gas fees for minting, buying, and selling can add $20-500+ per transaction, and creator royalties (typically 5-10%) come out of the sale price. This calculator accounts for gas fees and royalties to give you true net profit and ROI — not the gross headline number.',
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
    formula: 'Net Profit = Sell Price − Buy Price − Gas Fees − (Sell Price × Royalty%)',
    faqs: [
      { q: 'What are creator royalties and are they always enforced?', a: 'Creator royalties are a percentage of each secondary sale that goes to the original creator, typically 5-10%. Enforcement varies by marketplace. OpenSea and some others made royalties optional in 2023, meaning buyers/sellers on certain platforms can bypass them. Always check the specific marketplace policy.' },
      { q: 'How much should I budget for gas fees on NFT trades?', a: 'Gas fees vary enormously with network congestion. During calm periods, a simple NFT transfer might cost $5-20 in gas. During high-demand events (popular collection launches), the same transaction can cost $100-500+. Layer 2 marketplaces (Immutable X, Polygon) offer near-zero gas fees.' },
      { q: 'Are NFT profits taxable?', a: 'Yes. NFT sales are taxable events treated as capital gains in most jurisdictions. Holding period (under vs. over 1 year) determines whether short or long-term rates apply, just like other crypto assets. Minting and selling creator NFTs may also generate ordinary income.' },
    ],
  },
  {
    slug: 'crypto-conversion-calculator',
    name: 'Crypto Converter',
    category: 'crypto',
    icon: 'Repeat',
    description: 'Convert crypto to USD.',
    longDescription: 'The simplest crypto calculation — but one you need constantly. Enter the amount of any cryptocurrency and its current price to instantly see the USD value of your holding. Useful for quickly checking portfolio value, calculating position sizes, or figuring out exactly how much a fraction of a coin is worth in dollars.',
    usageCount: 89000,
    inputs: [
      { key: 'amount', label: 'Amount', type: 'slider', min: 0.0001, max: 1000, step: 0.01, default: 1, suffix: 'coin', color: 'primary' },
      { key: 'price', label: 'Coin Price', type: 'slider', min: 0.001, max: 200000, step: 0.01, default: 65000, prefix: '$', color: 'secondary' },
    ],
    outputs: [
      { key: 'usd', label: 'USD Value', prefix: '$', primary: true },
    ],
    calculate: (i) => ({ usd: Number(i.amount) * Number(i.price) }),
    formula: 'USD Value = Amount × Coin Price',
    faqs: [
      { q: 'How do I find the current price of a cryptocurrency?', a: 'CoinGecko and CoinMarketCap provide real-time prices for thousands of cryptocurrencies, free without an account. For a quick check, searching the coin name in Google also shows a current price widget. Always use prices from reputable aggregators, not exchange-specific quotes.' },
      { q: 'Can I use this for altcoins and tokens, not just BTC?', a: 'Yes — the formula is universal. Enter any coin\'s price and your holding amount. For tokens worth fractions of a cent, make sure to enter the full decimal (e.g., 0.000045 for a token priced at $0.000045).' },
      { q: 'Why does my portfolio show a different value than expected?', a: 'Crypto prices update every few seconds and vary slightly across exchanges. If you\'re comparing against an exchange balance, the discrepancy is likely due to the spread (difference between buy and sell price) or a slightly stale price. The difference is usually under 0.5% on liquid coins.' },
    ],
  },
  {
    slug: 'crypto-portfolio-calculator',
    name: 'Portfolio Calculator',
    category: 'crypto',
    icon: 'Briefcase',
    description: 'Track multi-coin portfolio value.',
    longDescription: 'Tracking a multi-coin crypto portfolio manually is tedious and error-prone. This calculator gives you a quick snapshot of total portfolio value across BTC and ETH positions — enter your holdings and current prices to see where each coin stands and your total value in one view. For more coins, dedicated portfolio trackers offer broader coverage.',
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
    formula: 'Total = (BTC × BTC Price) + (ETH × ETH Price)',
    faqs: [
      { q: 'What is a good BTC/ETH portfolio split?', a: 'There\'s no universally "correct" split. Bitcoin is often seen as a store of value and inflation hedge with lower risk relative to other crypto. Ethereum is the primary smart contract platform with more growth potential and more volatility. Common allocations range from 60/40 to 80/20 BTC/ETH.' },
      { q: 'Should I rebalance my crypto portfolio?', a: 'Rebalancing (selling winners to buy underperformers to maintain target allocation) is a disciplined approach that forces you to sell high and buy low relative to your targets. However, it triggers taxable events. Many crypto investors prefer to rebalance only using new contributions to avoid this.' },
      { q: 'How do I track my crypto portfolio tax basis accurately?', a: 'Manual tracking in a spreadsheet works for simple portfolios. For more than a handful of transactions, dedicated crypto tax software (Koinly, TaxBit, CoinTracker, Accointing) connects to exchanges and wallets to track cost basis automatically, generating tax reports for filing.' },
    ],
  },
];
