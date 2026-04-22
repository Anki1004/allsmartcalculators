import { CalculatorConfig } from '../calculator-types';

export const cryptoCalculators: CalculatorConfig[] = [
  {
    slug: 'crypto-profit-calculator',
    name: 'Crypto Profit Calculator',
    category: 'crypto',
    icon: 'TrendingUp',
    description: 'Calculate profit/loss on crypto trades.',
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
  },
];
