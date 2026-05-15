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
    intro:
      "Bitcoin mining profitability depends on three numbers: your hash rate (mining speed in TH/s), your electricity cost per kWh, and the current BTC price. This calculator uses a simplified network-difficulty estimate (0.00004 BTC per TH/s per day at current difficulty) and a BTC price of $65,000. A 100 TH/s ASIC (Antminer S19j Pro class) drawing 3,000W at ₹8/kWh ($0.10) earns roughly $260/day in BTC and costs $7.20 in electricity — gross profit ~$253/day. At Indian retail rates (₹8–₹10/kWh, $0.10–$0.12), home mining barely beats breakeven; only industrial-rate access (₹3–₹4/kWh in Gujarat, Telangana) makes it sustainable.",
    formula: 'Daily profit = (TH/s × 0.00004 × BTC price) − ((Watts ÷ 1000) × 24 × ₹/kWh)',
    howItWorks:
      "The 0.00004 BTC/TH/s/day factor is an approximation of current network difficulty — actual reward per TH/s drops every time difficulty resets (~every 2 weeks) and halves every 4 years at the Bitcoin halving. 100 TH/s × 0.00004 = 0.004 BTC/day = $260 at $65K BTC. Electricity: 3 kW × 24 hours × $0.12 = $8.64/day. Net = $251.36. Indian state-by-state rates vary wildly — Gujarat industrial ($0.07–0.08/kWh) profits beat home Maharashtra rates ($0.12–0.15) by 2–3× on identical hardware.",
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
    faqs: [
      {
        q: 'Is Bitcoin mining profitable in India?',
        a: 'At residential rates (₹8–₹10/kWh), barely. A modern ASIC nets $5–$15/day at typical home Indian electricity costs — and that ignores hardware depreciation and cooling. Industrial power (₹3–₹4/kWh, available in some Gujarat/Telangana zones) makes it viable; home mining mostly doesn\'t.',
      },
      {
        q: 'How much electricity does Bitcoin mining use?',
        a: 'A 100 TH/s ASIC draws ~3 kW continuously — 72 kWh/day, ~2,160 kWh/month. At Indian residential rates that\'s ₹17,000–₹21,600/month per machine. Plus cooling (10–20% extra) and the 24×7 hum is a real apartment-living concern.',
      },
      {
        q: 'How is mining income taxed in India?',
        a: 'Crypto mining income is taxable as "income from other sources" at 30% flat (Section 115BBH). When you sell the mined BTC, you also pay 1% TDS on the sale value, deducted at source by Indian exchanges. Losses cannot be offset against other income.',
      },
      {
        q: 'What happens at the Bitcoin halving?',
        a: 'Every 210,000 blocks (~4 years), the block reward halves. Miners earn 50% less BTC per block from that point. Difficulty often drops afterwards as less-efficient miners shut down, partially offsetting. Net effect on profitability typically takes 6–12 months to settle.',
      },
      {
        q: 'Can I mine Bitcoin with a regular GPU or CPU?',
        a: 'No. Bitcoin mining requires SHA-256 ASICs; GPUs were obsoleted in 2013 and CPUs in 2010. For GPU mining, look at altcoins (Ravencoin, Ergo) — even those are marginal post-Ethereum merge.',
      },
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
    intro:
      "Every Ethereum transaction costs gas — a fee paid in ETH to compensate the validator who includes your transaction in a block. This calculator converts gas price (in gwei, where 1 gwei = 10⁻⁹ ETH) and gas units (the complexity of the operation) into the actual fee in ETH and USD. A simple ETH transfer (21,000 gas) at 30 gwei when ETH is $3,000 costs about $1.89. A Uniswap swap (~150,000 gas) at the same price costs $13.50. Always check gas before signing — fees spike 5–10× during NFT mints and big market moves.",
    formula: 'Fee in ETH = (gas price in gwei × gas units) ÷ 10⁹ · Fee in USD = fee × ETH price',
    howItWorks:
      "Gwei is the standard unit for gas pricing. 1 ETH = 1 billion gwei (10⁹), so a gas price of 30 gwei = 30 × 10⁻⁹ ETH per gas unit. Multiply by gas units (transaction complexity) for total fee. A standard ETH transfer uses 21,000 gas units. 21,000 × 30 = 630,000 gwei = 0.00063 ETH. At $3,000/ETH, that's $1.89. Complex operations cost more — Uniswap swap ≈ 150K gas, NFT mint ≈ 100–300K, contract deployment ≈ 500K–2M. The protocol burns most of the base fee (since EIP-1559); the priority tip goes to the validator.",
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
    faqs: [
      {
        q: 'What is a good gas price?',
        a: 'During quiet periods (UTC late evening / Asian morning): 5–15 gwei. Normal hours: 20–50 gwei. During NFT mints or market crashes: 100–500+ gwei. Use Etherscan Gas Tracker for live values. Most wallets show "low / market / fast" presets with current numbers.',
      },
      {
        q: 'Why do gas fees fluctuate so much?',
        a: 'Ethereum has a fixed throughput (~15 transactions per second). When demand spikes (NFT drops, liquidations, big market moves), gas prices rise sharply to compete for block space. Off-peak hours can be 5–10× cheaper than peak.',
      },
      {
        q: 'How can I reduce gas costs?',
        a: 'Use Layer-2s (Arbitrum, Optimism, Base) for 90%+ savings on most operations. Batch your transactions if possible. Avoid gas wars on NFT mints. Time non-urgent transactions for off-peak hours (UTC late evening typically cheapest).',
      },
      {
        q: 'What happens if I set gas too low?',
        a: 'Transaction sits unconfirmed in the mempool until gas market drops or it expires (~1 hour to a few days). Most wallets let you "speed up" by submitting a replacement transaction with higher gas (same nonce, original gets dropped).',
      },
      {
        q: 'Do I pay gas if my transaction fails?',
        a: 'Yes. Failed transactions consume gas for the work the network did before reverting — sometimes a small amount (caught early by a require) or most of the limit (failed mid-execution). Always test on testnet for complex operations.',
      },
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
    intro:
      "Staking lets you earn yield on proof-of-stake coins by locking them up to help secure the network. The APY varies by chain — Ethereum native staking is 3–5%, Cosmos and Polkadot 10–15%, Solana 5–7%, smaller PoS chains can offer 15%+ but with much higher risk. This calculator compounds your stake annually at the rate you set. $10,000 staked at 8% for 2 years grows to about $11,664 — earning $1,664 in rewards. The math doesn't account for token price volatility — a 20% drop in the underlying coin wipes out 2.5 years of 8% staking rewards.",
    formula: 'Final value = stake × (1 + APY)^years · Rewards = final − stake',
    howItWorks:
      "Compound interest, same as a bank FD but with a coin instead of a currency. $10,000 staked at 8% APY for 2 years: 10,000 × (1.08)² = $11,664. Rewards = $1,664. Most chains pay rewards every epoch (every 6 hours to a few days), so compounding is effectively continuous in real platforms — the calculator simplifies to annual compounding. Reward distribution mechanisms vary: ETH uses validator slots, Cosmos uses delegated proof-of-stake (DPoS), Solana uses leader rotation. APY also varies with the percent of total supply staked.",
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
    faqs: [
      {
        q: 'Is staking the same as crypto lending?',
        a: 'No. Staking secures a proof-of-stake blockchain — your tokens are at network risk (slashing, technical failure). Lending puts tokens into a protocol that loans them to borrowers — your tokens are at credit risk (borrower default, protocol hack). Both earn yield; the risks are different.',
      },
      {
        q: 'How is staking income taxed in India?',
        a: 'Currently uncertain. Most tax practitioners treat staking rewards as "income from other sources" at slab rate when received, then capital gains apply when you sell. Some argue 30% flat applies at receipt. Document everything (dates, amounts at receipt) and consult a CA familiar with crypto.',
      },
      {
        q: 'What is liquid staking?',
        a: 'You deposit ETH into a protocol like Lido and receive a tradeable token (stETH) that represents your stake plus accruing rewards. You can sell or use stETH in DeFi while it still earns. Trade-off: small APY reduction (~0.5%) and protocol smart-contract risk.',
      },
      {
        q: 'Is 100% APY safe?',
        a: 'Almost always no. Triple-digit APYs come from either (a) brand-new tokens with high inflation that dilute as supply grows, or (b) DeFi protocols paying yield in their own (often crashing) governance token. Sustainable, low-risk staking yields are 3–15%.',
      },
      {
        q: 'Can I lose money staking?',
        a: 'Yes — three ways: token price drops (the big risk), slashing penalties (small for good validators), or smart-contract hacks on liquid-staking platforms. The yield is almost always less than the worst-month price drawdown.',
      },
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
    intro:
      "Dollar-Cost Averaging (DCA) is the simplest crypto investment strategy — buy a fixed amount on a fixed schedule (weekly or monthly) regardless of price. It removes the timing question and naturally averages your cost basis. This calculator tells you what your weekly DCA position is worth at any given current price. $100/week for a year ($5,200 total) with an average buy price of $35,000 buys 0.1486 BTC; if BTC is now $55,000, your stack is worth $8,171 — a $2,971 profit. DCA is the proven approach for long-horizon crypto holders who don't want to guess tops and bottoms.",
    formula: 'Invested = amount × buys · Units = invested ÷ avg price · Value = units × current price',
    howItWorks:
      "Each recurring buy purchases a small fraction of a coin at whatever price the market offers that day. Over many buys, your blended cost basis emerges. $100 weekly × 52 weeks = $5,200 invested. If your average buy price across all weekly buys was $35,000 (the calculator simplifies what would normally be 52 separate prices into one average), your units = 5,200 ÷ 35,000 = 0.1486 BTC. At a $55,000 current price, holdings = 0.1486 × 55,000 = $8,171. Profit = $8,171 − $5,200 = $2,971. The arithmetic is identical to lumpsum math; the realism is in the average buy price you input.",
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
    faqs: [
      {
        q: 'Is DCA better than lumpsum for crypto?',
        a: 'In trending bull markets, lumpsum wins because you get full exposure earlier. In choppy or bear markets, DCA wins because you average down. Studies of 5–10 year crypto periods show roughly 60% lumpsum wins, 40% DCA wins — but DCA wins on emotional ease (you don\'t agonise over timing).',
      },
      {
        q: 'How much should I DCA into crypto?',
        a: 'A reasonable starting rule — invest only what you can afford to lose entirely. For most Indian retail investors, that\'s 5–10% of total portfolio at most. DCA size: weekly or monthly amount you can sustain for 2+ years without disrupting the rest of your finances.',
      },
      {
        q: 'Should I DCA into altcoins or just Bitcoin?',
        a: 'Stick to BTC and ETH for DCA. Altcoins lose 90%+ in bear markets and rarely recover their previous highs (most don\'t). DCA assumes the asset will eventually exceed its average buy price; only BTC and ETH have that track record over multiple cycles.',
      },
      {
        q: 'When should I stop DCAing and start selling?',
        a: 'Reverse-DCA when you actually need the money or when allocation rebalances are needed. Don\'t try to sell tops — most DCAers who try this miss the actual peak and end up underperforming a steady hold + rebalance approach.',
      },
      {
        q: 'How is DCA taxed in India?',
        a: 'Each sell is a 30% flat tax event with 1% TDS deducted. FIFO costing typically applies — your earliest buys are sold first. Track cost basis carefully across all 52 weekly buys, or use a portfolio tracker that exports to ITR-friendly formats.',
      },
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
    intro:
      "Impermanent loss is the implicit cost of being a liquidity provider (LP) in an automated market maker (AMM) like Uniswap. When the price ratio of the two pooled tokens diverges, your share of the pool ends up worth less than if you had simply held both tokens unchanged. This calculator returns the IL % for any combined price move. If Token A doubles (+100%) while Token B stays flat, you suffer ~5.7% impermanent loss — that 5.7% has to be earned back from trading fees before LPing becomes net-profitable. Stable-stable pools (USDC/USDT) have near-zero IL; volatile-volatile pools (ETH/SHIB) can rack up massive IL.",
    formula: 'IL % = ((2 × √r) ÷ (1 + r) − 1) × 100, where r = (1 + ΔA%) ÷ (1 + ΔB%)',
    howItWorks:
      "The formula derives from the constant-product invariant x·y = k that all Uniswap-V2-style AMMs maintain. When prices diverge, the pool automatically rebalances by selling the appreciating token and buying the depreciating one — locking in the equivalent of \"selling low and buying high\" relative to your initial deposit. Token A +100%, Token B 0%: ratio r = 2/1 = 2. IL = (2√2)/(1+2) − 1 = 2.828/3 − 1 = −0.0572 = −5.72%. Larger divergences hurt exponentially: +500% / 0% = −25.5% IL. The loss is \"impermanent\" because prices reverting back eliminate it — but most trends don't fully revert.",
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
    faqs: [
      {
        q: 'When is impermanent loss permanent?',
        a: 'Loss becomes realised the moment you withdraw your liquidity. If prices haven\'t reverted by then, you exit with fewer tokens than you deposited (or the same number worth less in USD). "Impermanent" only means it can shrink — but most divergences don\'t fully revert.',
      },
      {
        q: 'How do LPs make money despite IL?',
        a: 'Trading fees. Every swap in the pool pays 0.3% (V2) or 0.05–1% (V3) to LPs. High-volume pools earn 10–50% APR in fees, which often exceeds IL. The math: net LP return = fee APR − IL drag. Pools fail when IL > fee APR.',
      },
      {
        q: 'Which pools have lowest IL?',
        a: 'Stablecoin pairs (USDC/USDT, DAI/USDC) — both tokens stay at ~$1, no divergence. Stablecoin/correlated pairs (stETH/ETH) — they track each other. Major-pair/major-pair (ETH/WBTC) — meaningful IL during decoupling, but trading fees usually compensate.',
      },
      {
        q: 'Is concentrated liquidity (V3) worse than V2?',
        a: 'V3 concentrated positions earn much higher fees inside their price range but exit the range entirely if prices move beyond — converting to 100% of the depreciating token. Higher fees, higher IL when out-of-range. Active management is needed.',
      },
      {
        q: 'How is LPing taxed in India?',
        a: 'Murky. Most CAs treat the LP token receipt as a non-event, and the eventual withdrawal as a swap of both underlying tokens — triggering 30% flat tax on any gain. Trading-fee accrual is treated as either capital gains (when realised) or other income. Document carefully; the rules will evolve.',
      },
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
    intro:
      "Indian crypto tax is simple to apply but harsh: 30% flat tax on gains from any virtual digital asset (VDA), plus 1% TDS deducted automatically by Indian exchanges on every sale, plus 4% cess on the tax — effective rate ≈ 31.2%. Losses cannot be offset against any other income or even against gains from other coins. This calculator multiplies your gains by whatever rate you set. ₹1 lakh profit at 30% = ₹30,000 tax, ₹70,000 net. For US filers, set 15% (long-term LTCG mid-bracket) or 22–32% (short-term, slab rate). Always consult a CA for actual filing — the calculator is for planning only.",
    formula: 'Tax = Gains × Tax Rate · Net = Gains − Tax',
    howItWorks:
      "India: ₹1,00,000 gain × 30% = ₹30,000 tax. Add 4% cess (₹1,200) for effective ₹31,200. Plus 1% TDS already deducted on sale value (refundable in ITR against your overall tax). US (long-term, mid-bracket): $15,000 gain × 15% = $2,250 tax. US (short-term, 24% slab): $15,000 × 24% = $3,600. The flat percentage hides what's actually a complex picture — in India, losses are dead weight (can't offset); in the US, capital losses can offset gains up to $3K of ordinary income per year, with carryforward.",
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
    faqs: [
      {
        q: 'What is the tax on crypto in India?',
        a: 'A flat 30% on all gains from virtual digital assets (Section 115BBH), plus 4% cess on the tax, plus 1% TDS deducted at source on every sale by Indian exchanges. Losses cannot be set off against any other income or carried forward — every coin is taxed independently.',
      },
      {
        q: 'Can I set off crypto losses against gains?',
        a: 'In India, no. Section 115BBH explicitly disallows offsetting losses from one coin against gains from another, or against any other income. A loss on SHIB cannot reduce your tax on a Bitcoin gain. The US allows offsetting and carryforward; most other jurisdictions are somewhere in between.',
      },
      {
        q: 'What is the 1% TDS on crypto?',
        a: 'Indian exchanges deduct 1% of the sale value (not gain) on every sell transaction and remit it to the IT department. It\'s effectively a withholding tax — when you file your ITR, you claim credit for the TDS already paid. Foreign exchanges typically don\'t deduct it, but the obligation still applies.',
      },
      {
        q: 'Are crypto-to-crypto swaps taxable?',
        a: 'In India: yes, treated as if you sold the first coin for INR and immediately bought the second. The gain on the first coin is taxable at 30%. In the US: yes, same treatment. Many users underestimate this; a year of active trading can generate dozens of taxable events even without converting to fiat.',
      },
      {
        q: 'What records should I keep for crypto tax?',
        a: 'For every transaction: date, type (buy/sell/swap/transfer/airdrop/staking reward), counter-asset, quantity, INR/USD value at the time, exchange/wallet involved, and TDS deducted. Most major exchanges export this as CSV. For DeFi, use tracking tools (Koinly, CoinTracker, KoinX for India).',
      },
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
    intro:
      "NFT flips look profitable on paper until you subtract all the costs — marketplace fees, creator royalties, and Ethereum gas can easily eat 8–15% of your gross sale price. This calculator does the honest math. Bought an NFT at 0.5 ETH, sold at 2.5 ETH, with 0.05 ETH total gas across mint, transfer, and sale, plus 5% creator royalty: net profit = 2.5 − 0.5 − 0.05 − 0.125 = 1.825 ETH, ROI 365%. Looks great. The same trade with 10% royalty and 0.2 ETH gas (mainnet peak) drops net to 1.55 ETH, ROI 310% — still solid, but 15% lower than the gross number suggested.",
    formula: 'Net = Sell − Buy − Gas − (Sell × Royalty%) · ROI = (Net ÷ Buy) × 100',
    howItWorks:
      "Each cost gets subtracted from the sale proceeds. Buy at 0.5 ETH, sell at 2.5 ETH. Royalty (5% of sell) = 0.125 ETH. Gas across mint + transfer + sell ≈ 0.05 ETH at moderate price levels. Net = 2.5 − 0.5 − 0.05 − 0.125 = 1.825 ETH. ROI = (1.825 ÷ 0.5) × 100 = 365%. Most marketplace fees (OpenSea 2.5%, Blur 0.5%, LooksRare 2%) aren't in the calculator — subtract them separately if relevant. Gas estimates vary wildly: NFT mints during a hot drop can cost 0.05–0.5 ETH alone, dwarfing the actual NFT price.",
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
    faqs: [
      {
        q: 'What\'s a typical NFT royalty?',
        a: 'Most projects set 5–7.5% creator royalty. Some PFPs go up to 10%. Generative art projects often go lower (2.5%). Blur normalised 0% royalty as a default for short-term traders; OpenSea reverted to enforcing creator royalties in 2024.',
      },
      {
        q: 'How is NFT income taxed in India?',
        a: 'NFTs fall under the same 30% VDA tax regime as crypto, plus 1% TDS on sales through Indian exchanges. Each sale is a 30% flat tax event. NFT creators with royalty income face a thornier classification — some treat it as business income, others as VDA gains. Consult a CA.',
      },
      {
        q: 'Should I include gas in my buying cost basis?',
        a: 'Yes, for accurate ROI. The mint or purchase gas is part of what you paid to acquire the NFT. Future sale gas comes out of proceeds. In tax accounting (India and US), most CAs allow adding gas to cost basis at acquisition.',
      },
      {
        q: 'Is flipping NFTs still profitable in 2026?',
        a: 'For most retail flippers — no. The 2021–2022 NFT mania ended; floor prices on most "blue chip" collections are down 70–95% from peaks. Profitable flipping today requires skilled trait analysis, alpha networks, and rapid execution. Treat as speculative entertainment, not investment.',
      },
      {
        q: 'Why does my actual profit differ from this calculator?',
        a: 'Three usual reasons: marketplace fees not included (add 0.5–2.5%), gas cost estimates were too low, or sale didn\'t go through at the listed price (you accepted a lower offer or it was a Dutch auction with declining price).',
      },
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
    intro:
      "The simplest crypto math — multiply coin quantity by current price to get USD value. Use this for quick portfolio checks, calculating what 0.347 BTC is worth at today's price, or working out how much SOL you'd need to buy for a $1,000 position. 1 BTC at $65,000 = $65,000. 0.5 BTC at $65,000 = $32,500. For INR equivalents, multiply by the USD-to-INR rate (typically 83–86 in 2026). Use the Currency Converter Calculator for fiat conversion alongside this for live INR pricing.",
    formula: 'USD value = quantity × current price',
    howItWorks:
      "Plain multiplication. 2.5 ETH at $3,200/ETH = $8,000. To convert to INR at ₹84/USD: 8,000 × 84 = ₹6,72,000. For fractional coins, the math is identical — 0.0124 BTC at $65,000 = $806. The price input is your responsibility — get it from CoinGecko, your exchange, or CoinMarketCap. Prices vary slightly between sources due to which exchanges they aggregate from.",
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
    faqs: [
      {
        q: 'Why do prices differ between exchanges?',
        a: 'Each exchange has its own order book — buyers and sellers, depths, and liquidity differ. Major coins (BTC, ETH) usually have ≤0.1% spread between top exchanges; small caps can vary 1–5%. Indian INR-pair prices are typically 1–4% above USD spot due to TDS and limited liquidity.',
      },
      {
        q: 'What is the most accurate crypto price source?',
        a: 'For a single accurate number: CoinGecko volume-weighted average price (VWAP). For trading: the exchange you actually intend to use, since slippage and fees apply there specifically. For DeFi positions: Chainlink price oracles, which median across multiple feeds.',
      },
      {
        q: 'How fast do crypto prices change?',
        a: 'Major coins like BTC and ETH can swing 2–5% within minutes during volatile periods. Small caps can swing 10–30% within hours on news. The price you see now and the price 60 seconds from now may differ by 1%+ — factor that into any transaction.',
      },
      {
        q: 'Should I convert at the Binance price or my Indian exchange price?',
        a: 'For tax purposes (India), the IT department accepts the price at the Indian exchange where you actually transacted. For portfolio tracking, use a global reference price (CoinGecko) so you compare apples to apples.',
      },
      {
        q: 'What\'s INR-to-USD for crypto math right now?',
        a: 'In April 2026 the USD-INR rate is roughly 83–86. Use the live rate from xe.com or your bank. For crypto bought through Indian exchanges, the INR quote already includes the rate, so direct multiplication works.',
      },
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
    intro:
      "Most retail crypto holders run a BTC + ETH-heavy portfolio with maybe a few altcoin satellites. This calculator handles the two-coin core — 0.5 BTC + 5 ETH at $65K and $3,200 respectively values your stack at $48,500 ($32,500 BTC, $16,000 ETH — a 67/33 split). Use it as a quick valuation tool, to track rebalancing thresholds (e.g. trim BTC if it crosses 70% of portfolio), or to plan how much new capital to deploy into each. For larger portfolios with 10+ coins, a dedicated tracker (CoinTracker, Koinly, Delta) handles tax cost basis and historical NAV better than any single calculator.",
    formula: 'Total = (BTC qty × BTC price) + (ETH qty × ETH price)',
    howItWorks:
      "Per-coin value = quantity × price. 0.5 BTC × $65,000 = $32,500 (BTC value). 5 ETH × $3,200 = $16,000 (ETH value). Total = $48,500. Allocation: BTC = 32,500 / 48,500 = 67%; ETH = 16,000 / 48,500 = 33%. Common BTC/ETH ratios — 50/50 (balanced), 70/30 (BTC-heavy, defensive), 30/70 (ETH-heavy, growth tilt). Most institutions stay 60/40 BTC/ETH; retail tends 50/50 or ETH-heavy. Rebalance quarterly or when allocation drifts more than ±10% from target.",
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
    faqs: [
      {
        q: 'What\'s a good BTC/ETH split?',
        a: 'For most retail holders, 50/50 or 60/40 BTC/ETH is a reasonable starting point. BTC offers lower volatility and the longest track record; ETH offers higher upside via the DeFi/staking ecosystem. Match the split to your conviction and risk tolerance.',
      },
      {
        q: 'Should I add altcoins to my portfolio?',
        a: 'Maybe 5–15% of total crypto, in carefully chosen names. Most altcoins underperform BTC over 5+ year horizons even when they outperform short term. Treat altcoins as concentrated speculative bets — not core allocation.',
      },
      {
        q: 'How often should I rebalance?',
        a: 'Either quarterly (set-and-forget) or threshold-based (rebalance when an allocation drifts ±10–15% from target). Threshold-based is more tax-efficient — you rebalance only when it matters. Each rebalance is a taxable event in India (30% flat on the gain).',
      },
      {
        q: 'What\'s an aggressive vs conservative crypto portfolio?',
        a: 'Conservative: 100% BTC, or 80% BTC + 20% ETH, with zero altcoins. Aggressive: 30% BTC + 50% ETH + 20% altcoins across SOL, AVAX, and mid-caps. Long-run, conservative portfolios have smaller drawdowns; aggressive can outperform during bull cycles but get destroyed in bears.',
      },
      {
        q: 'Should crypto be a percentage of my total investment portfolio?',
        a: 'For most Indian retail investors, 5–10% of total portfolio (across all assets — equity, debt, gold, real estate) is a reasonable upper cap. Anything above 20% is concentrated speculation. The most volatile asset class deserves the smallest sliver.',
      },
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
