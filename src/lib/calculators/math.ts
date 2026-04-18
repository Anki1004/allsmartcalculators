import { CalculatorConfig } from '../calculator-types';

export const mathCalculators: CalculatorConfig[] = [
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'math',
    icon: 'Percent',
    description: 'Calculate percentages, increases, and decreases.',
    trending: true,
    usageCount: 245000,
    inputs: [
      { key: 'value', label: 'Value', type: 'slider', min: 0, max: 10000, step: 1, default: 250, color: 'primary' },
      { key: 'percent', label: 'Percentage', type: 'slider', min: 0, max: 200, step: 0.5, default: 20, suffix: '%', color: 'secondary' },
    ],
    outputs: [
      { key: 'result', label: 'Percent of Value', decimals: 2, primary: true },
      { key: 'increased', label: 'Value + %', decimals: 2, color: 'tertiary' },
      { key: 'decreased', label: 'Value − %', decimals: 2, color: 'secondary' },
    ],
    calculate: (i) => {
      const v = Number(i.value);
      const p = Number(i.percent);
      const result = (v * p) / 100;
      return { result, increased: v + result, decreased: v - result };
    },
  },
  {
    slug: 'fraction-calculator',
    name: 'Fraction Calculator',
    category: 'math',
    icon: 'Divide',
    description: 'Add, subtract, multiply & divide fractions.',
    usageCount: 68000,
    inputs: [
      { key: 'num1', label: 'Numerator 1', type: 'slider', min: -100, max: 100, step: 1, default: 1, color: 'primary' },
      { key: 'den1', label: 'Denominator 1', type: 'slider', min: 1, max: 100, step: 1, default: 2, color: 'secondary' },
      { key: 'num2', label: 'Numerator 2', type: 'slider', min: -100, max: 100, step: 1, default: 1, color: 'tertiary' },
      { key: 'den2', label: 'Denominator 2', type: 'slider', min: 1, max: 100, step: 1, default: 4 },
    ],
    outputs: [
      { key: 'sum', label: 'Sum (Decimal)', decimals: 4, primary: true },
      { key: 'product', label: 'Product (Decimal)', decimals: 4, color: 'secondary' },
      { key: 'quotient', label: 'Quotient (Decimal)', decimals: 4, color: 'tertiary' },
    ],
    calculate: (i) => {
      const f1 = Number(i.num1) / Number(i.den1);
      const f2 = Number(i.num2) / Number(i.den2);
      return { sum: f1 + f2, product: f1 * f2, quotient: f2 !== 0 ? f1 / f2 : 0 };
    },
  },
  {
    slug: 'quadratic-calculator',
    name: 'Quadratic Equation',
    category: 'math',
    icon: 'FunctionSquare',
    description: 'Solve ax² + bx + c = 0.',
    usageCount: 42000,
    inputs: [
      { key: 'a', label: 'Coefficient a', type: 'slider', min: -20, max: 20, step: 0.1, default: 1, color: 'primary' },
      { key: 'b', label: 'Coefficient b', type: 'slider', min: -50, max: 50, step: 0.1, default: -5, color: 'secondary' },
      { key: 'c', label: 'Coefficient c', type: 'slider', min: -50, max: 50, step: 0.1, default: 6, color: 'tertiary' },
    ],
    outputs: [
      { key: 'x1', label: 'Root 1 (x₁)', decimals: 4, primary: true },
      { key: 'x2', label: 'Root 2 (x₂)', decimals: 4, color: 'secondary' },
      { key: 'discriminant', label: 'Discriminant', decimals: 4, color: 'tertiary' },
    ],
    calculate: (i) => {
      const a = Number(i.a);
      const b = Number(i.b);
      const c = Number(i.c);
      const d = b * b - 4 * a * c;
      if (a === 0) return { x1: 'N/A', x2: 'N/A', discriminant: d };
      if (d < 0) return { x1: 'No real roots', x2: 'No real roots', discriminant: d };
      const sqrtD = Math.sqrt(d);
      return { x1: (-b + sqrtD) / (2 * a), x2: (-b - sqrtD) / (2 * a), discriminant: d };
    },
  },
  {
    slug: 'statistics-calculator',
    name: 'Statistics Calculator',
    category: 'math',
    icon: 'BarChart',
    description: 'Mean, median, mode, and std deviation.',
    usageCount: 32000,
    inputs: [
      { key: 'n1', label: 'Value 1', type: 'slider', min: -100, max: 100, step: 1, default: 10, color: 'primary' },
      { key: 'n2', label: 'Value 2', type: 'slider', min: -100, max: 100, step: 1, default: 20, color: 'secondary' },
      { key: 'n3', label: 'Value 3', type: 'slider', min: -100, max: 100, step: 1, default: 30, color: 'tertiary' },
      { key: 'n4', label: 'Value 4', type: 'slider', min: -100, max: 100, step: 1, default: 40 },
      { key: 'n5', label: 'Value 5', type: 'slider', min: -100, max: 100, step: 1, default: 50 },
    ],
    outputs: [
      { key: 'mean', label: 'Mean', decimals: 2, primary: true },
      { key: 'median', label: 'Median', decimals: 2, color: 'secondary' },
      { key: 'stdDev', label: 'Std Deviation', decimals: 4, color: 'tertiary' },
      { key: 'range', label: 'Range', decimals: 2 },
    ],
    calculate: (i) => {
      const nums = [i.n1, i.n2, i.n3, i.n4, i.n5].map(Number);
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
      const sorted = [...nums].sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      const variance = nums.reduce((s, v) => s + (v - mean) ** 2, 0) / nums.length;
      return {
        mean,
        median,
        stdDev: Math.sqrt(variance),
        range: Math.max(...nums) - Math.min(...nums),
      };
    },
  },
  {
    slug: 'probability-calculator',
    name: 'Probability Calculator',
    category: 'math',
    icon: 'Dices',
    description: 'Calculate event probability.',
    usageCount: 24000,
    inputs: [
      { key: 'favorable', label: 'Favorable Outcomes', type: 'slider', min: 0, max: 1000, step: 1, default: 5, color: 'primary' },
      { key: 'total', label: 'Total Outcomes', type: 'slider', min: 1, max: 1000, step: 1, default: 20, color: 'secondary' },
    ],
    outputs: [
      { key: 'probability', label: 'Probability', decimals: 4, primary: true },
      { key: 'percentage', label: 'Percentage', suffix: '%', decimals: 2, color: 'secondary' },
      { key: 'odds', label: 'Odds', color: 'tertiary' },
    ],
    calculate: (i) => {
      const f = Number(i.favorable);
      const t = Number(i.total);
      const p = t > 0 ? f / t : 0;
      return { probability: p, percentage: p * 100, odds: `${f}:${t - f}` };
    },
  },
  {
    slug: 'lcm-gcd-calculator',
    name: 'LCM & GCD Calculator',
    category: 'math',
    icon: 'GitMerge',
    description: 'Find LCM and GCD of two numbers.',
    usageCount: 28000,
    inputs: [
      { key: 'a', label: 'First Number', type: 'slider', min: 1, max: 1000, step: 1, default: 12, color: 'primary' },
      { key: 'b', label: 'Second Number', type: 'slider', min: 1, max: 1000, step: 1, default: 18, color: 'secondary' },
    ],
    outputs: [
      { key: 'gcd', label: 'GCD (HCF)', decimals: 0, primary: true },
      { key: 'lcm', label: 'LCM', decimals: 0, color: 'secondary' },
    ],
    calculate: (i) => {
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      const a = Math.floor(Number(i.a));
      const b = Math.floor(Number(i.b));
      const g = gcd(a, b);
      return { gcd: g, lcm: (a * b) / g };
    },
  },
  {
    slug: 'logarithm-calculator',
    name: 'Logarithm Calculator',
    category: 'math',
    icon: 'FunctionSquare',
    description: 'Calculate log base any.',
    usageCount: 19000,
    inputs: [
      { key: 'value', label: 'Value', type: 'slider', min: 0.01, max: 10000, step: 0.01, default: 100, color: 'primary' },
      { key: 'base', label: 'Base', type: 'slider', min: 2, max: 100, step: 1, default: 10, color: 'secondary' },
    ],
    outputs: [
      { key: 'log', label: 'log result', decimals: 6, primary: true },
      { key: 'ln', label: 'Natural log (ln)', decimals: 6, color: 'secondary' },
      { key: 'log10', label: 'log₁₀', decimals: 6, color: 'tertiary' },
    ],
    calculate: (i) => ({
      log: Math.log(Number(i.value)) / Math.log(Number(i.base)),
      ln: Math.log(Number(i.value)),
      log10: Math.log10(Number(i.value)),
    }),
  },
  {
    slug: 'trigonometry-calculator',
    name: 'Trigonometry',
    category: 'math',
    icon: 'Compass',
    description: 'sin, cos, tan for any angle.',
    usageCount: 35000,
    inputs: [
      { key: 'angle', label: 'Angle', type: 'slider', min: 0, max: 360, step: 0.5, default: 45, suffix: '°', color: 'primary' },
    ],
    outputs: [
      { key: 'sin', label: 'sin', decimals: 6, primary: true },
      { key: 'cos', label: 'cos', decimals: 6, color: 'secondary' },
      { key: 'tan', label: 'tan', decimals: 6, color: 'tertiary' },
    ],
    calculate: (i) => {
      const rad = (Number(i.angle) * Math.PI) / 180;
      const tan = Math.tan(rad);
      return {
        sin: Math.sin(rad),
        cos: Math.cos(rad),
        tan: Math.abs(tan) > 1e10 ? 'undefined' : tan,
      };
    },
  },
  {
    slug: 'binary-converter',
    name: 'Binary Converter',
    category: 'math',
    icon: 'Binary',
    description: 'Convert between binary, decimal, hex.',
    usageCount: 31000,
    inputs: [
      { key: 'decimal', label: 'Decimal Value', type: 'slider', min: 0, max: 65535, step: 1, default: 255, color: 'primary' },
    ],
    outputs: [
      { key: 'binary', label: 'Binary', primary: true, color: 'secondary' },
      { key: 'hex', label: 'Hexadecimal', color: 'tertiary' },
      { key: 'octal', label: 'Octal' },
    ],
    calculate: (i) => {
      const n = Math.floor(Number(i.decimal));
      return {
        binary: n.toString(2),
        hex: '0x' + n.toString(16).toUpperCase(),
        octal: '0o' + n.toString(8),
      };
    },
  },
  {
    slug: 'ratio-calculator',
    name: 'Ratio Calculator',
    category: 'math',
    icon: 'Ratio',
    description: 'Simplify and scale ratios.',
    usageCount: 26000,
    inputs: [
      { key: 'a', label: 'Part A', type: 'slider', min: 1, max: 1000, step: 1, default: 24, color: 'primary' },
      { key: 'b', label: 'Part B', type: 'slider', min: 1, max: 1000, step: 1, default: 36, color: 'secondary' },
    ],
    outputs: [
      { key: 'simplified', label: 'Simplified Ratio', primary: true, color: 'secondary' },
      { key: 'decimal', label: 'A/B (Decimal)', decimals: 4, color: 'tertiary' },
    ],
    calculate: (i) => {
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      const a = Math.floor(Number(i.a));
      const b = Math.floor(Number(i.b));
      const g = gcd(a, b);
      return { simplified: `${a / g} : ${b / g}`, decimal: a / b };
    },
  },
  {
    slug: 'average-calculator',
    name: 'Average Calculator',
    category: 'math',
    icon: 'Sigma',
    description: 'Mean of multiple numbers.',
    usageCount: 47000,
    inputs: [
      { key: 'a', label: 'Value 1', type: 'slider', min: 0, max: 1000, step: 1, default: 50, color: 'primary' },
      { key: 'b', label: 'Value 2', type: 'slider', min: 0, max: 1000, step: 1, default: 75, color: 'secondary' },
      { key: 'c', label: 'Value 3', type: 'slider', min: 0, max: 1000, step: 1, default: 100, color: 'tertiary' },
      { key: 'd', label: 'Value 4', type: 'slider', min: 0, max: 1000, step: 1, default: 125 },
    ],
    outputs: [
      { key: 'average', label: 'Average', decimals: 2, primary: true },
      { key: 'sum', label: 'Sum', decimals: 0, color: 'secondary' },
      { key: 'count', label: 'Count', decimals: 0, color: 'tertiary' },
    ],
    calculate: (i) => {
      const nums = [i.a, i.b, i.c, i.d].map(Number).filter((v) => !isNaN(v));
      const sum = nums.reduce((a, b) => a + b, 0);
      return { average: sum / nums.length, sum, count: nums.length };
    },
  },
  {
    slug: 'factorial-calculator',
    name: 'Factorial Calculator',
    category: 'math',
    icon: 'Hash',
    description: 'Calculate n! for any number.',
    usageCount: 18000,
    inputs: [
      { key: 'n', label: 'Number (n)', type: 'slider', min: 0, max: 20, step: 1, default: 6, color: 'primary' },
    ],
    outputs: [
      { key: 'factorial', label: 'n!', decimals: 0, primary: true },
    ],
    calculate: (i) => {
      let result = 1;
      const n = Math.floor(Number(i.n));
      for (let k = 2; k <= n; k++) result *= k;
      return { factorial: result };
    },
  },
  {
    slug: 'prime-checker',
    name: 'Prime Number Checker',
    category: 'math',
    icon: 'Hash',
    description: 'Check if a number is prime.',
    usageCount: 15000,
    inputs: [
      { key: 'n', label: 'Number', type: 'slider', min: 2, max: 10000, step: 1, default: 97, color: 'primary' },
    ],
    outputs: [
      { key: 'isPrime', label: 'Is Prime?', primary: true, color: 'secondary' },
      { key: 'factors', label: 'Factors', color: 'tertiary' },
    ],
    calculate: (i) => {
      const n = Math.floor(Number(i.n));
      if (n < 2) return { isPrime: 'No', factors: 'N/A' };
      const factors: number[] = [];
      for (let k = 1; k <= n; k++) if (n % k === 0) factors.push(k);
      return { isPrime: factors.length === 2 ? 'Yes ✓' : 'No', factors: factors.join(', ') };
    },
  },
  {
    slug: 'power-calculator',
    name: 'Power / Exponent',
    category: 'math',
    icon: 'Zap',
    description: 'Calculate base^exponent.',
    usageCount: 22000,
    inputs: [
      { key: 'base', label: 'Base', type: 'slider', min: -50, max: 50, step: 0.1, default: 2, color: 'primary' },
      { key: 'exponent', label: 'Exponent', type: 'slider', min: -10, max: 20, step: 0.5, default: 10, color: 'secondary' },
    ],
    outputs: [
      { key: 'result', label: 'Result', decimals: 4, primary: true },
    ],
    calculate: (i) => ({ result: Math.pow(Number(i.base), Number(i.exponent)) }),
  },
  {
    slug: 'square-root-calculator',
    name: 'Square Root',
    category: 'math',
    icon: 'Calculator',
    description: 'Find square & cube roots.',
    usageCount: 29000,
    inputs: [
      { key: 'value', label: 'Value', type: 'slider', min: 0, max: 10000, step: 1, default: 144, color: 'primary' },
    ],
    outputs: [
      { key: 'sqrt', label: 'Square Root', decimals: 4, primary: true },
      { key: 'cbrt', label: 'Cube Root', decimals: 4, color: 'secondary' },
    ],
    calculate: (i) => ({
      sqrt: Math.sqrt(Number(i.value)),
      cbrt: Math.cbrt(Number(i.value)),
    }),
  },
];
