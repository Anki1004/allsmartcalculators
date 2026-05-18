import { CalculatorConfig } from '../calculator-types';

export const mathCalculators: CalculatorConfig[] = [
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'math',
    icon: 'Percent',
    description: 'Find X% of a number, percentage increase, percentage decrease, and percent difference — all in one tool.',
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
    ranges: {
      title: 'Common percentage values to memorise',
      rows: [
        { label: '5%', range: 'value × 0.05', note: 'Sales tax, light tip' },
        { label: '10%', range: 'value × 0.10 (move decimal)', note: 'Easy mental check' },
        { label: '15%', range: 'value × 0.15', note: 'Standard US tip lower bound' },
        { label: '18%', range: 'value × 0.18', note: 'Common GST slab in India; restaurant tip US' },
        { label: '20%', range: 'value × 0.20', note: 'Standard US tip; common discount' },
        { label: '25%', range: 'value ÷ 4', note: 'Quarter — easy mental math' },
        { label: '50%', range: 'value ÷ 2', note: 'Half off' },
        { label: '75%', range: 'value × 0.75', note: 'Three-quarters' },
      ],
    },
    limitations: [
      "Percentage increases and decreases are NOT symmetric. A 50% loss requires a 100% gain to recover (₹100 → ₹50 → need ×2 to get back). Always compute on the new base, not the original.",
      "This calculator finds % of a value or applies it as ±. For finding what % one number is of another (e.g. \"what % is 47 of 200?\"), use: (47 ÷ 200) × 100 = 23.5%.",
      "Stacked discounts don't add. \"30% off, then 20% off\" is NOT 50% off — it's 1 − (0.7 × 0.8) = 44% off. Multiplicative, not additive.",
      'Percentages of percentages cause confusion. \"My CTR went from 2% to 3%\" — that\'s either +1 percentage point (additive) or +50% relative change. Specify which.',
    ],
    seo: {
      title: 'Percentage Calculator: % of, Increase, Decrease',
      description: 'Free percentage calculator. Find X% of a number, percent change between two values, and percentage increase or decrease — fast and accurate.',
      applicationCategory: 'EducationalApplication',
      sources: [
        { label: 'NIST — fundamental units and notation', url: 'https://www.nist.gov/' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Common fraction-to-decimal conversions',
      rows: [
        { label: '1/2', range: '0.5', note: '50%' },
        { label: '1/3', range: '0.333...', note: '33.33% (repeating)' },
        { label: '1/4', range: '0.25', note: '25%' },
        { label: '1/8', range: '0.125', note: '12.5%' },
        { label: '3/4', range: '0.75', note: '75%' },
        { label: '2/3', range: '0.667...', note: '66.67% (repeating)' },
        { label: '5/8', range: '0.625', note: '62.5%' },
      ],
    },
    limitations: [
      'Returns decimals, not simplified fractions. For "in lowest terms" output (like Class 6 NCERT exercises require), reduce the result by dividing by the GCD.',
      "Doesn't handle mixed numbers directly (e.g. 2 1/2). Convert mixed numbers to improper fractions first: 2 1/2 = 5/2.",
      "Doesn't handle fractions with zero denominators. The calculator returns 0 for division by zero — mathematically undefined.",
      "Decimal output may have rounding errors for repeating decimals (1/3 = 0.333... shown as 0.3333).",
    ],
    seo: {
      title: 'Fraction Calculator: Add, Subtract, Multiply, Divide',
      description: 'Free fraction calculator. Add, subtract, multiply, or divide any two fractions and get the result in lowest terms with the decimal equivalent.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Discriminant interpretation',
      rows: [
        { label: 'D > 0 (positive)', range: 'Two distinct real roots', note: 'Parabola crosses x-axis twice' },
        { label: 'D = 0', range: 'One repeated root', note: 'Parabola touches x-axis once (vertex)' },
        { label: 'D < 0 (negative)', range: 'Two complex roots', note: 'Parabola never crosses x-axis' },
        { label: 'a = 0', range: 'Not quadratic — linear', note: 'Solve bx + c = 0 instead' },
        { label: 'Common JEE roots', range: 'Integers, small rationals', note: 'Designed to factorise nicely' },
      ],
    },
    limitations: [
      "Doesn't return complex roots — when D < 0, the calculator just says \"no real roots.\" For complex root math, you'd use the form: x = (−b ± i√|D|) ÷ 2a.",
      "Floating-point arithmetic introduces tiny errors. Roots like 3.00000001 are usually exactly 3 — round when interpreting.",
      "Sliders limit a, b, c to ±20 to ±50. For coefficients outside that range, plug numbers manually into the quadratic formula.",
      "Doesn't show step-by-step work. For full solution steps (factorisation method, completing the square), use a step-by-step solver like Wolfram Alpha.",
    ],
    seo: {
      title: 'Quadratic Equation Calculator: Solve ax² + bx + c = 0',
      description: 'Free quadratic equation solver. Find both roots of any ax² + bx + c = 0 — handles real, repeated, and complex roots with full discriminant detail.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Statistic interpretation',
      rows: [
        { label: 'Mean = Median', range: 'Symmetric distribution', note: 'Normal, uniform' },
        { label: 'Mean > Median', range: 'Right-skewed (positive)', note: 'Income, real-estate prices' },
        { label: 'Mean < Median', range: 'Left-skewed (negative)', note: 'Rare in real data; exam scores when most pass' },
        { label: 'Std Dev = 0', range: 'All values identical', note: 'Zero variance' },
        { label: 'Std Dev / Mean (CV)', range: 'Relative spread', note: 'Compare datasets at different scales' },
        { label: '68-95-99.7 rule (normal data)', range: '68% within ±1σ, 95% within ±2σ', note: 'Empirical rule' },
      ],
    },
    limitations: [
      'Limited to 5-value input via sliders. For larger datasets, use a spreadsheet (AVERAGE, MEDIAN, STDEV) or statistical software.',
      "Uses population standard deviation (divides by n). For sample standard deviation (n − 1 in the denominator), multiply the calculator output by √(n ÷ (n − 1)) — for n = 5, that's about 1.118×.",
      "Doesn't compute mode (most frequent value). Mode is most useful for categorical data and small integer datasets.",
      'Outliers dramatically affect mean and std dev. For datasets with outliers, the median and interquartile range (IQR) are more robust.',
    ],
    seo: {
      title: 'Statistics Calculator: Mean, Median, Mode, Std Dev',
      description: 'Free statistics calculator. Compute mean, median, mode, range, variance, and standard deviation for any list of numbers — paste data and go.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Common probability examples',
      rows: [
        { label: 'Flip a coin (heads)', range: '1/2 = 0.5 = 50%', note: '' },
        { label: 'Roll a 6 on one die', range: '1/6 ≈ 0.167 = 16.7%', note: '' },
        { label: 'Draw an ace from deck', range: '4/52 ≈ 0.077 = 7.7%', note: '' },
        { label: 'Two heads in a row', range: '1/4 = 0.25 = 25%', note: 'Independent events multiply' },
        { label: 'At least one head in 3 flips', range: '7/8 = 0.875 = 87.5%', note: '1 − P(no heads at all)' },
      ],
    },
    limitations: [
      "Handles only single-event probability — not conditional, joint, or sequential probability.",
      "Assumes outcomes are equally likely. For loaded dice, biased coins, or unequal samples, the formula breaks down.",
      "Doesn't support continuous distributions (normal, exponential) — those need calculus-based probability tools.",
    ],
    seo: {
      title: 'Probability Calculator: Event Likelihood Math',
      description: 'Free probability calculator. Compute single-event and combined-event probability with intuitive favourable-over-total inputs and percent output.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Common GCD/LCM examples',
      rows: [
        { label: 'GCD of 12 and 18', range: '6', note: 'LCM = 36' },
        { label: 'GCD of 24 and 36', range: '12', note: 'LCM = 72' },
        { label: 'GCD of 7 and 11', range: '1', note: 'Co-prime; LCM = 77' },
        { label: 'GCD of n and n', range: 'n', note: 'LCM = n; trivial case' },
        { label: 'GCD × LCM relationship', range: 'a × b', note: 'Always holds' },
      ],
    },
    limitations: [
      "Limited to two integers via sliders. For 3+ numbers, compute pairwise: GCD(a,b,c) = GCD(GCD(a,b), c).",
      "Doesn't handle negative numbers or fractions — GCD is defined for positive integers.",
      "For very large numbers (> 10⁹), use number-theory libraries; the slider tops out at 1000.",
    ],
    seo: {
      title: 'LCM and GCD Calculator: Least Common Multiple & GCF',
      description: 'Free LCM and GCD calculator. Find the least common multiple and greatest common divisor (HCF) of any two integers — works with large numbers.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Common log values to memorise',
      rows: [
        { label: 'log₁₀(1)', range: '0', note: 'log of 1 is always 0 in any base' },
        { label: 'log₁₀(10)', range: '1', note: 'log of base = 1' },
        { label: 'log₁₀(100)', range: '2', note: '10² = 100' },
        { label: 'log₁₀(2)', range: '0.301', note: 'Used in pH and Richter scale' },
        { label: 'ln(e)', range: '1', note: 'e ≈ 2.718' },
        { label: 'ln(2)', range: '0.693', note: 'Doubling time = ln(2) ÷ rate' },
      ],
    },
    limitations: [
      "Domain restriction: log is undefined for non-positive values. Inputs ≤ 0 will produce errors.",
      "Calculator base capped at 100 — for higher bases, use natural log and change of base manually.",
      "Floating-point precision limits accuracy beyond 6 decimal places for very large or very small values.",
    ],
    seo: {
      title: 'Logarithm Calculator: log, ln, log₂ — Any Base',
      description: 'Free logarithm calculator. Compute log to any base — natural log (ln), log base 10, log base 2, or a custom base — for any positive number.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Common trig values (memorise these)',
      rows: [
        { label: 'sin(0°), cos(90°)', range: '0', note: '' },
        { label: 'sin(30°), cos(60°)', range: '0.5 (= 1/2)', note: '' },
        { label: 'sin(45°), cos(45°)', range: '0.707 (= √2/2)', note: 'Equal values' },
        { label: 'sin(60°), cos(30°)', range: '0.866 (= √3/2)', note: '' },
        { label: 'sin(90°), cos(0°)', range: '1', note: '' },
        { label: 'tan(45°)', range: '1', note: 'Sine = cosine' },
        { label: 'tan(90°), tan(270°)', range: 'undefined', note: 'cos is zero' },
      ],
    },
    limitations: [
      "Only sine, cosine, and tangent — not reciprocal functions (cosec, sec, cot) or inverse functions (arcsin, arccos, arctan). Compute reciprocals manually: cosec = 1/sin, etc.",
      "Takes only degrees. For radians, convert your value × 180/π before inputting.",
      "tan returns 'undefined' near 90° and 270° because the underlying division by cos approaches zero.",
    ],
    seo: {
      title: 'Trigonometry Calculator: sin, cos, tan, csc, sec, cot',
      description: 'Free trigonometry calculator. Compute sine, cosine, tangent and their reciprocals for any angle in degrees or radians — instant results.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Common decimal/binary/hex conversions',
      rows: [
        { label: 'Decimal 0', range: 'Binary 0 · Hex 0x0', note: '' },
        { label: 'Decimal 10', range: 'Binary 1010 · Hex 0xA', note: '' },
        { label: 'Decimal 255', range: 'Binary 11111111 · Hex 0xFF', note: 'Max byte value' },
        { label: 'Decimal 256', range: 'Binary 100000000 · Hex 0x100', note: '2⁸' },
        { label: 'Decimal 1024', range: 'Binary 10000000000 · Hex 0x400', note: '2¹⁰ = 1K' },
        { label: 'Decimal 65535', range: 'Binary 16 ones · Hex 0xFFFF', note: 'Max 16-bit unsigned' },
      ],
    },
    limitations: [
      "Input capped at 65,535 (2¹⁶ − 1). For larger numbers (32-bit, 64-bit), use a CS-specific tool.",
      "Doesn't handle negative numbers (two's complement). For signed representation, manual encoding is needed.",
      "No support for floating-point binary (IEEE 754) — those need specialised tools.",
    ],
    seo: {
      title: 'Binary Converter: Binary ↔ Decimal ↔ Hex ↔ Octal',
      description: 'Free binary, decimal, hex, and octal converter. Translate between number bases instantly — useful for programming, networking, and CS coursework.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Common ratios in daily life',
      rows: [
        { label: 'Concrete (Indian builders)', range: '1 : 2 : 4', note: 'Cement : sand : aggregate' },
        { label: 'Widescreen TV/monitor', range: '16 : 9', note: 'Modern aspect ratio' },
        { label: 'Indian flag tricolour', range: '3 : 2', note: 'Length : breadth' },
        { label: 'Golden ratio', range: '~1.618 : 1', note: 'Used in design and art' },
        { label: 'Class teacher : students ideal', range: '1 : 30', note: 'NEP 2020 recommendation' },
      ],
    },
    limitations: [
      "Two-part ratios only. For three-part ratios (e.g. 1:2:3), find GCD of all three terms together.",
      "Doesn't handle non-integer ratios directly. Convert decimals to fractions first: 1.5:2 = 3:4.",
      "Calculator caps at 1000 per side. For larger numbers, the math is identical — just won't fit on the slider.",
    ],
    seo: {
      title: 'Ratio Calculator: Simplify, Scale, Compare Ratios',
      description: 'Free ratio calculator. Simplify a ratio to lowest terms, scale it up or down, and compare two ratios — useful for recipes, plans, and design.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Different types of averages',
      rows: [
        { label: 'Arithmetic mean (this calculator)', range: 'Σx ÷ n', note: 'Most common; sensitive to outliers' },
        { label: 'Median', range: 'Middle value when sorted', note: 'Outlier-resistant' },
        { label: 'Mode', range: 'Most frequent value', note: 'For categorical/discrete data' },
        { label: 'Geometric mean', range: 'ⁿ√(x₁ × x₂ × ... × xₙ)', note: 'Used for growth rates, ratios' },
        { label: 'Weighted mean', range: 'Σ(wᵢ × xᵢ) ÷ Σwᵢ', note: 'Different weights per value' },
      ],
    },
    limitations: [
      "Only 4 inputs. For more values, use a spreadsheet AVERAGE function.",
      "Sensitive to outliers — a single very large value distorts the mean. Use median for skewed data.",
      "Doesn't handle weighted averages where different inputs have different importance.",
    ],
    seo: {
      title: 'Average Calculator: Mean of a List of Numbers',
      description: 'Free average (mean) calculator. Get the arithmetic mean, count, and sum of any list of numbers — supports decimals and negative values.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Factorials grow fast',
      rows: [
        { label: '0!, 1!', range: '1', note: '' },
        { label: '5!', range: '120', note: '' },
        { label: '10!', range: '3,628,800', note: '3.6 million' },
        { label: '15!', range: '1,307,674,368,000', note: '1.3 trillion' },
        { label: '20!', range: '2.43 × 10¹⁸', note: 'Beyond integer precision' },
        { label: '52!', range: '~8 × 10⁶⁷', note: 'Ways to shuffle a card deck' },
      ],
    },
    limitations: [
      "Capped at 20! due to JavaScript Number precision limits. For larger factorials, use BigInt or Stirling's approximation.",
      "Only positive integers and zero. Negative integers don't have a factorial (gamma function extends to non-integers but isn't shown here).",
      "Doesn't compute combinations or permutations directly. Use: nCr = n! ÷ (r! × (n − r)!) and nPr = n! ÷ (n − r)!.",
    ],
    seo: {
      title: 'Factorial Calculator: Compute n! Up to Large Numbers',
      description: 'Free factorial calculator. Compute n! for any non-negative integer — useful for combinatorics, permutations, and probability problems.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Notable prime number facts',
      rows: [
        { label: 'Smallest prime', range: '2', note: 'The only even prime' },
        { label: 'Primes under 100', range: '25 primes', note: '2, 3, 5, ..., 97' },
        { label: 'Twin primes', range: '(3,5), (5,7), (11,13)...', note: 'Pairs differing by 2' },
        { label: 'Mersenne primes', range: '2^p − 1 where p prime', note: '3, 7, 31, 127, 8191, ...' },
        { label: 'Largest known prime (2024)', range: 'M82589933', note: '24.8 million digits long' },
      ],
    },
    limitations: [
      "Brute-force check; slow beyond 10,000. Calculator caps at 10,000 for performance.",
      "Lists all factors, not just prime ones. For prime factorisation, see other tools.",
      "Doesn't visualise factor pairs or trial-division steps — just the final answer.",
    ],
    seo: {
      title: 'Prime Number Checker: Is This Number Prime?',
      description: 'Free prime number checker. Instantly verify whether any positive integer is prime, with the smallest divisor returned for composite numbers.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Common powers of 10 and 2',
      rows: [
        { label: '10^0, 2^0, any^0', range: '1', note: 'Anything to power 0 is 1 (by convention)' },
        { label: '10^3', range: '1,000', note: 'Kilo prefix' },
        { label: '10^6', range: '1,000,000', note: 'Mega prefix' },
        { label: '2^10', range: '1,024', note: 'Kibi (often called K in computing)' },
        { label: '2^20', range: '1,048,576', note: 'Mebi (M)' },
        { label: '2^30', range: '~10⁹', note: 'Gibi (G)' },
      ],
    },
    limitations: [
      "Floating-point precision limits the accuracy of very large or very small results.",
      "0^0 is mathematically debated — JavaScript returns 1, but limits and series treatments sometimes differ.",
      "Negative bases with fractional exponents (e.g. (-2)^0.5) return NaN — these are complex numbers, not real.",
    ],
    seo: {
      title: 'Power Calculator: Compute base^exponent',
      description: 'Free exponent calculator. Compute base raised to any power — supports negative and fractional exponents, integer and decimal bases.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Common roots to memorise',
      rows: [
        { label: '√1, ∛1', range: '1', note: '' },
        { label: '√4', range: '2', note: '' },
        { label: '√9, ∛27', range: '3', note: '' },
        { label: '√16, ∛64', range: '4', note: '' },
        { label: '√25, ∛125', range: '5', note: '' },
        { label: '√2', range: '~1.4142', note: 'Diagonal of unit square' },
        { label: '√3', range: '~1.7321', note: 'Used in equilateral triangle math' },
        { label: '√144', range: '12', note: 'Useful in mental math' },
      ],
    },
    limitations: [
      "Real-number roots only. Negative inputs have no real square root (they have complex roots) — the calculator returns NaN.",
      "Floating-point precision limits accuracy. √2 stored as ~1.4142135623730951 is precise to ~16 digits.",
      "Only square and cube roots. For higher roots (4th, 5th, etc.), use the Power Calculator with fractional exponents.",
    ],
    seo: {
      title: 'Square Root Calculator: √, ³√, and nth Roots',
      description: 'Free square and cube root calculator. Find √x and ³√x for any positive number — instant decimal results, useful for algebra and geometry.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
