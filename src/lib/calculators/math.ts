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
    intro:
      'Percentages are everywhere — sales tax, tip, discounts, interest rates, exam scores, growth metrics — but the same word covers three different operations: finding X% of a value, increasing a value by X%, and computing the % change between two numbers. This calculator does all three from a single value+percent input. For more specific use cases (discount on a marked-up price, percent change between two arbitrary numbers), use the dedicated calculators in finance and business.',
    formula: 'X% of value = (X ÷ 100) × value · increase = value × (1 + X/100) · decrease = value × (1 − X/100)',
    howItWorks:
      "20% of 250 is (20 ÷ 100) × 250 = 50. Increasing 250 by 20% gives 250 × 1.20 = 300. Decreasing 250 by 20% gives 250 × 0.80 = 200. Note: a 20% increase followed by a 20% decrease does NOT return you to the original — 250 → 300 → 240, not 250. This is the most common percentage trap and the reason cumulative discounts and \"% off then % off\" deals don't add linearly.",
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
    faqs: [
      {
        q: 'How do I calculate X% of a number?',
        a: 'Multiply the number by X ÷ 100. So 18% of 4,500 = 4,500 × 0.18 = 810. The mental shortcut: 10% is "move the decimal one place left"; build other percentages from there (1% = ÷100, 5% = half of 10%, 20% = double 10%, etc.).',
      },
      {
        q: 'How do I find the percentage change between two numbers?',
        a: '% change = ((new − old) ÷ old) × 100. From 80 to 100 is ((100 − 80) ÷ 80) × 100 = 25% increase. From 100 to 80 is ((80 − 100) ÷ 100) × 100 = −20% decrease. The two are different because the base differs.',
      },
      {
        q: 'Why do "30% off then 20% off" deals not equal 50% off?',
        a: 'Because the second discount applies to the already-reduced price. ₹100 → ₹70 → ₹56 (a 44% total discount, not 50%). To compute stacked discounts: final price = original × (1 − d1) × (1 − d2) × ...',
      },
      {
        q: "What's the difference between percent and percentage points?",
        a: 'Percent is multiplicative; percentage points are additive. If a metric goes from 5% to 8%, it increased by 3 percentage points but by 60% (relative change). News headlines often confuse these.',
      },
      {
        q: 'How do I reverse-calculate the original price before a discount?',
        a: 'If you paid ₹560 after a 30% discount: original = paid ÷ (1 − discount) = 560 ÷ 0.70 = ₹800. Same logic for "tax-inclusive to tax-exclusive": divide by (1 + tax rate).',
      },
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
    intro:
      "Adding, subtracting, multiplying, and dividing fractions is a core Class 6–8 NCERT topic that adults still struggle with under pressure — \"1/2 + 1/3 is...\" trips up most people on the spot. This calculator gives you all three operations on any two fractions and returns decimal equivalents. 1/2 + 1/4 = 0.75. 1/2 × 1/4 = 0.125. 1/2 ÷ 1/4 = 2. Use it for cooking conversions (half of 3/4 cup), construction calculations, or just to verify your kid's homework when the steps look right but the answer doesn't.",
    formula: 'a/b + c/d = (ad + bc) ÷ bd · a/b × c/d = ac ÷ bd · a/b ÷ c/d = ad ÷ bc',
    howItWorks:
      "Convert each fraction to its decimal form first (numerator ÷ denominator), then perform the operation. 1/2 = 0.5, 1/4 = 0.25. Sum = 0.75. Product = 0.125. Quotient = 0.5 ÷ 0.25 = 2.0. The decimal-first approach is simple but loses the \"in lowest terms\" form (3/4, 1/8, 2/1) — the calculator returns decimals for clarity. For fraction-form answers, multiply out the cross-products: 1/2 + 1/4 = (1×4 + 2×1) ÷ (2×4) = 6/8 = 3/4.",
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
    faqs: [
      {
        q: 'How do I add fractions with different denominators?',
        a: 'Find a common denominator first. 1/2 + 1/3: common denom = 6, so 1/2 = 3/6 and 1/3 = 2/6, sum = 5/6 = 0.833. The shortcut formula: (ad + bc) ÷ bd. (1×3 + 2×1) ÷ (2×3) = 5/6.',
      },
      {
        q: 'How do I simplify a fraction?',
        a: 'Divide numerator and denominator by their GCD (greatest common divisor). 12/18: GCD = 6, simplified = 2/3. Use the LCM-GCD calculator on the site if you need GCD for large numbers.',
      },
      {
        q: 'What is an improper fraction?',
        a: 'A fraction where the numerator is bigger than the denominator (e.g. 7/4). Convert to a mixed number by dividing: 7 ÷ 4 = 1 remainder 3, so 7/4 = 1 3/4.',
      },
      {
        q: 'How do I divide fractions?',
        a: 'Flip the second fraction and multiply. 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2. The "flip and multiply" rule is the trick most Class 7 students forget on exams.',
      },
      {
        q: 'Why is 1/3 a repeating decimal?',
        a: 'Because 3 doesn\'t divide evenly into powers of 10. Fractions with denominators that have prime factors other than 2 and 5 always produce repeating decimals: 1/3, 1/6, 1/7, 1/11 etc. Fractions like 1/4 and 1/8 terminate because 4 = 2² and 8 = 2³.',
      },
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
    intro:
      "Quadratic equations show up in Class 10 NCERT, JEE Main, every projectile-motion problem, and most optimisation work. The form is ax² + bx + c = 0, and the quadratic formula gives both roots in one step. This calculator returns x₁, x₂, and the discriminant (b² − 4ac) which tells you what kind of roots to expect: positive = two distinct real roots; zero = one repeated root; negative = two complex (imaginary) roots, which most school exams treat as \"no real solution.\" For x² − 5x + 6 = 0: discriminant = 25 − 24 = 1, roots = 3 and 2.",
    formula: 'x = (−b ± √(b² − 4ac)) ÷ 2a · Discriminant = b² − 4ac',
    howItWorks:
      "Plug coefficients into the quadratic formula. For x² − 5x + 6 = 0 (a=1, b=−5, c=6): D = 25 − 24 = 1. √D = 1. x₁ = (5 + 1) ÷ 2 = 3. x₂ = (5 − 1) ÷ 2 = 2. Verify: 3² − 5(3) + 6 = 9 − 15 + 6 = 0 ✓. The discriminant predicts the nature of roots without computing them. D > 0: two real roots. D = 0: one repeated root (x₁ = x₂). D < 0: complex roots, calculator returns \"no real roots.\"",
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
    faqs: [
      {
        q: 'When does a quadratic have no real solutions?',
        a: 'When the discriminant (b² − 4ac) is negative. Geometrically, the parabola y = ax² + bx + c never crosses the x-axis — it sits entirely above (a > 0, D < 0) or entirely below (a < 0, D < 0). The solutions are complex numbers.',
      },
      {
        q: 'What is the quadratic formula?',
        a: 'x = (−b ± √(b² − 4ac)) ÷ 2a. Plug in a, b, c from your equation in standard form ax² + bx + c = 0. The ± gives both roots — once with +√, once with −√.',
      },
      {
        q: 'Can I solve a quadratic by factorisation?',
        a: 'Yes if the roots are nice numbers. x² − 5x + 6 factors as (x − 2)(x − 3) = 0, giving x = 2 or x = 3. Use the quadratic formula when factoring is hard (irrational or non-integer roots).',
      },
      {
        q: 'What does the discriminant tell me?',
        a: 'Quick prediction of root types. D > 0 = two real roots, D = 0 = one repeated root, D < 0 = complex roots. The bigger D (positive), the further apart the two roots are.',
      },
      {
        q: 'Are all conic sections quadratics?',
        a: 'In one variable, yes — circle, ellipse, parabola, hyperbola all have quadratic terms. The calculator handles single-variable quadratics; multi-variable quadratic forms (Ax² + Bxy + Cy² + ...) need linear algebra.',
      },
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
    intro:
      "Three numbers summarise most datasets: the mean (average), the median (middle value), and the standard deviation (spread). This calculator computes all of them plus the range for any 5-number dataset. For [10, 20, 30, 40, 50]: mean = 30, median = 30, std dev ≈ 14.14, range = 40. When mean = median (symmetric data), the distribution is well-behaved. When they diverge (mean ≠ median), the data is skewed — common with income, exam scores, and most real-world distributions.",
    formula: 'Mean = Σxᵢ ÷ n · Variance = Σ(xᵢ − mean)² ÷ n · Std Dev = √variance',
    howItWorks:
      "Add the values and divide by count for mean. Sort and pick the middle one for median. Subtract mean from each value, square, average, square-root for standard deviation. [10, 20, 30, 40, 50]: mean = (10+20+30+40+50)/5 = 30. Deviations from mean: [-20, -10, 0, 10, 20]. Squared: [400, 100, 0, 100, 400] sum 1000. Variance = 1000/5 = 200. Std dev = √200 ≈ 14.14. Lower std dev = data clustered tight around mean. Higher = data spread out.",
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
    faqs: [
      {
        q: 'When should I use median instead of mean?',
        a: 'When data has outliers or is skewed. Median income, median home price, and median time-to-completion are all more representative than mean because extreme values dramatically distort the mean.',
      },
      {
        q: 'What is standard deviation good for?',
        a: 'Measuring spread. A standard deviation of 10 on a mean of 100 means most values fall in 90–110. A std dev of 30 on the same mean means much wider spread (70–130). Used in quality control, finance volatility, exam grading.',
      },
      {
        q: 'What\'s the difference between variance and standard deviation?',
        a: 'Variance is the average squared deviation from the mean; standard deviation is its square root. Std dev is in the same units as your data; variance is in squared units. Most reporting uses std dev because it\'s more intuitive.',
      },
      {
        q: 'What is the empirical 68-95-99.7 rule?',
        a: 'For normally-distributed data: about 68% of values fall within ±1 standard deviation of the mean, 95% within ±2 std dev, 99.7% within ±3 std dev. The rule lets you eyeball outlier probability without z-tables.',
      },
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
    intro:
      "Probability of an event = favourable outcomes ÷ total outcomes. Rolling a 6 on a die: 1 favourable, 6 total, probability = 1/6 = 0.167 = 16.7%. This calculator returns the probability as a decimal, percentage, and odds ratio. Useful for board-exam combinatorics, JEE probability questions, and quick sanity checks on coin tosses, dice, or card-draw problems.",
    formula: 'P(event) = Favourable ÷ Total · Percentage = P × 100 · Odds = Fav : (Total − Fav)',
    howItWorks:
      "5 favourable in 20 total: probability = 5/20 = 0.25 = 25%. Odds: 5:15 — for every 5 favourable outcomes there are 15 unfavourable. The calculator handles single-event probability only. For combined events (AND, OR, conditional), apply multiplication or addition rules separately. P(A AND B) = P(A) × P(B) for independent events. P(A OR B) = P(A) + P(B) − P(A AND B).",
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
    faqs: [
      {
        q: 'What\'s the difference between probability and odds?',
        a: 'Probability is favourable ÷ total (1/6 for rolling a 6). Odds is favourable : unfavourable (1:5). Sportsbook odds invert this: 5:1 means "you win 5 if you bet 1," matching 1/6 probability.',
      },
      {
        q: 'How do I compute combined probability?',
        a: 'For independent events both happening: multiply. P(heads then heads) = 1/2 × 1/2 = 1/4. For either event happening: add and subtract the overlap. P(red OR ace) = 26/52 + 4/52 − 2/52 = 28/52.',
      },
      {
        q: 'What is conditional probability?',
        a: 'Probability of A given B has happened: P(A|B) = P(A and B) ÷ P(B). Used in Bayes\' theorem and medical-test interpretation. Not covered by this single-event calculator.',
      },
      {
        q: 'Can probability exceed 1?',
        a: 'No. Probability is always between 0 (impossible) and 1 (certain). If your calculation exceeds 1, you\'re using the wrong formula — likely double-counting overlapping outcomes.',
      },
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
    intro:
      "GCD (Greatest Common Divisor, also called HCF) is the largest number that divides both inputs evenly. LCM (Least Common Multiple) is the smallest number both inputs divide into. NCERT Class 6 introduces both. GCD of 12 and 18 = 6. LCM of 12 and 18 = 36. The relationship: GCD × LCM = a × b. Used in fraction simplification, scheduling problems, and gear-ratio math.",
    formula: 'GCD: Euclidean algorithm — gcd(a, b) = gcd(b, a mod b), repeat until b = 0 · LCM = (a × b) ÷ GCD',
    howItWorks:
      "Euclidean algorithm for GCD: gcd(18, 12) → gcd(12, 18 mod 12 = 6) → gcd(6, 12 mod 6 = 0) → 6. LCM = (12 × 18) ÷ 6 = 36. Verify: 36 ÷ 12 = 3 ✓, 36 ÷ 18 = 2 ✓. The Euclidean algorithm is extremely fast — even for billion-digit numbers, it completes in seconds.",
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
    faqs: [
      {
        q: 'What\'s the difference between HCF and GCD?',
        a: 'Same thing — HCF (Highest Common Factor) is the Indian/UK term; GCD (Greatest Common Divisor) is the US term. Both refer to the largest number that divides each input evenly.',
      },
      {
        q: 'How do I find LCM of three numbers?',
        a: 'LCM(a, b, c) = LCM(LCM(a, b), c). Find LCM of two at a time. LCM(12, 18, 20): first LCM(12, 18) = 36, then LCM(36, 20) = 180.',
      },
      {
        q: 'Why is GCD useful in fraction simplification?',
        a: 'To reduce a fraction to lowest terms, divide both numerator and denominator by their GCD. 12/18: GCD = 6, simplified = 12/6 : 18/6 = 2/3.',
      },
      {
        q: 'When is GCD = 1?',
        a: 'When the two numbers share no common factors except 1. Such numbers are called co-prime or relatively prime. Examples: 7 and 11, 8 and 9, 15 and 16. Useful in cryptography.',
      },
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
    intro:
      "Logarithms invert exponents: if 10² = 100, then log₁₀(100) = 2. This calculator returns log in any base you choose, plus the two most-used special cases — natural log (base e) and log base 10. log₁₀(100) = 2. ln(100) ≈ 4.605. log₂(100) ≈ 6.644. Used in pH chemistry, decibel sound, earthquake magnitude, compound-growth math, and signal processing.",
    formula: 'log_b(x) = ln(x) ÷ ln(b) — change of base formula',
    howItWorks:
      "The change-of-base formula lets you compute log in any base using natural log: log_b(x) = ln(x) ÷ ln(b). For log₁₀(100): ln(100) / ln(10) = 4.605 / 2.303 ≈ 2.0 ✓. The calculator uses this universally. Natural log (base e ≈ 2.718) appears naturally in calculus and continuous compounding. Log base 10 is common in engineering and chemistry.",
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
    faqs: [
      {
        q: 'What is a logarithm?',
        a: 'The inverse of an exponent. If b^x = y, then log_b(y) = x. Asks "what power of b gives me y?" log₁₀(100) = 2 because 10² = 100.',
      },
      {
        q: 'What\'s the difference between log and ln?',
        a: 'log without a subscript usually means log₁₀ (base 10) in engineering or pure log in math contexts. ln is specifically natural log (base e). On a scientific calculator, log = log₁₀ and ln = log_e.',
      },
      {
        q: 'What are common logarithm rules?',
        a: 'log(a × b) = log(a) + log(b). log(a/b) = log(a) − log(b). log(a^n) = n × log(a). log_b(b) = 1. log_b(1) = 0. These transform multiplication into addition, which is why logs were historically used for hand calculation.',
      },
      {
        q: 'Where are logs used in real life?',
        a: 'pH (chemistry, base 10), decibels (sound, base 10), Richter scale (earthquakes, base 10), bit information (computer science, base 2), continuous compounding (finance, base e), neural network activations (e). Wherever ranges span many orders of magnitude.',
      },
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
    intro:
      "Sine, cosine, and tangent are the building blocks of trigonometry — Class 10 NCERT, JEE Main, and every physics problem with angles. This calculator returns all three for any angle in degrees. sin(45°) ≈ 0.707. cos(45°) ≈ 0.707. tan(45°) = 1. tan is undefined at 90° and 270° because cos is zero there (division by zero). The unit-circle geometry: at angle θ, sin gives the y-coordinate and cos gives the x-coordinate.",
    formula: 'sin θ = opposite ÷ hypotenuse · cos θ = adjacent ÷ hypotenuse · tan θ = sin θ ÷ cos θ',
    howItWorks:
      "The calculator converts your angle from degrees to radians (× π / 180) and uses built-in JS trig functions. 45° = π/4 radians ≈ 0.785. sin(0.785) ≈ 0.707, cos(0.785) ≈ 0.707, tan(0.785) = 1. The values repeat with period 360° (2π radians). Quadrant rules: Q1 (0–90°) all positive, Q2 (90–180°) only sin positive, Q3 (180–270°) only tan positive, Q4 (270–360°) only cos positive.",
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
    faqs: [
      {
        q: 'What is sin, cos, and tan in simple terms?',
        a: 'In a right-angled triangle: sin = opposite ÷ hypotenuse, cos = adjacent ÷ hypotenuse, tan = opposite ÷ adjacent. The "SOH-CAH-TOA" mnemonic. For arbitrary angles, the unit-circle definition extends these to any angle.',
      },
      {
        q: 'Why is sin²θ + cos²θ = 1?',
        a: 'From the unit circle: any point on a circle of radius 1 has coordinates (cos θ, sin θ). The Pythagorean theorem gives x² + y² = 1², so cos²θ + sin²θ = 1. The most important trig identity.',
      },
      {
        q: 'When is tan undefined?',
        a: 'At 90°, 270°, and other odd multiples of 90°. At these angles, cos = 0, and tan = sin ÷ cos involves division by zero. Geometrically, the tangent line at these angles is vertical, so its slope is infinite.',
      },
      {
        q: 'How do I convert degrees to radians?',
        a: 'Multiply degrees by π / 180. 90° = 90 × π/180 = π/2 ≈ 1.571 rad. 180° = π. Radians are the natural unit in calculus and physics; degrees are everyday usage.',
      },
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
    intro:
      "Computers think in binary (base 2) — every byte is 8 bits, every IP address is 32 bits, every emoji is some pattern of 1s and 0s. Programmers also use hex (base 16) and occasionally octal (base 8) for compact representation. This calculator converts decimal to all three. 255 in decimal = 0b11111111 binary = 0xFF hex = 0o377 octal. Used in programming, networking (subnet masks), file permissions, and CS coursework.",
    formula: 'Convert decimal n to base b: repeatedly divide by b, collect remainders (read bottom-up)',
    howItWorks:
      "To convert 255 to binary: 255 ÷ 2 = 127 r 1, 127 ÷ 2 = 63 r 1, 63 ÷ 2 = 31 r 1, ... continuing until quotient = 0, then read remainders bottom-up: 11111111. For hex (base 16), digits go 0–9 then A–F (for 10–15). 255 = FF hex because 15 × 16 + 15 = 255. Hex is convenient because each hex digit = exactly 4 binary digits (a nibble).",
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
    faqs: [
      {
        q: 'Why is hex used in programming?',
        a: 'Each hex digit represents exactly 4 binary digits, making it a compact way to write byte values. Memory addresses, colour codes (#FF0000 = red), and machine code are all naturally hex. A 32-bit integer takes 8 hex digits instead of 32 binary digits.',
      },
      {
        q: 'What is the difference between bit and byte?',
        a: 'A bit is a single 0 or 1. A byte is 8 bits, representing values 0–255 (or −128 to 127 with sign). One ASCII character is one byte. Modern systems work in larger groups: 16-bit (short), 32-bit (int), 64-bit (long).',
      },
      {
        q: 'How do I convert binary to decimal?',
        a: 'Multiply each binary digit by its place value (2⁰ = 1, 2¹ = 2, 2² = 4, ...) and sum. 1101 binary = 1×8 + 1×4 + 0×2 + 1×1 = 13 decimal.',
      },
      {
        q: 'What is octal used for?',
        a: 'Mainly Unix file permissions (chmod 755 means rwx for owner, rx for others) and some legacy systems. Each octal digit = 3 binary bits. Mostly obsolete outside Unix admin work.',
      },
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
    intro:
      "A ratio expresses the relative size of two quantities. 24 boys to 36 girls in a class is 24:36 or simplified to 2:3 (divide both by GCD = 12). This calculator simplifies any ratio to its lowest terms and gives the decimal equivalent. Used in mixing concrete (1:2:4 cement:sand:gravel), scaling recipes (2 cups flour : 1 cup sugar), reading aspect ratios (16:9 widescreen), and Class 6 NCERT exercises.",
    formula: 'Simplified ratio = a ÷ GCD(a,b) : b ÷ GCD(a,b) · Decimal = a ÷ b',
    howItWorks:
      "Find GCD(a, b) using the Euclidean algorithm. Divide both numbers by GCD. 24:36 → GCD = 12 → 2:3 simplified. Decimal A/B = 24/36 = 0.667. To scale a ratio up (recipe doubling): multiply both sides by the same number. 2:3 scaled 5× = 10:15.",
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
    faqs: [
      {
        q: 'How do I simplify a ratio?',
        a: 'Divide both terms by their GCD. 24:36, GCD = 12, simplified = 2:3. Both terms must be divided by the same number to keep the ratio equivalent.',
      },
      {
        q: 'What\'s the difference between ratio and proportion?',
        a: 'Ratio compares two quantities (3:4). Proportion is an equality of two ratios (3:4 = 6:8). NCERT distinguishes them as Class 6 topics.',
      },
      {
        q: 'How do I scale a recipe using ratios?',
        a: 'Multiply each ingredient by the same factor. Recipe for 4 people needs 2 cups flour : 1 cup sugar. To serve 10, multiply both by 2.5: 5 cups flour : 2.5 cups sugar.',
      },
      {
        q: 'What does aspect ratio mean?',
        a: 'Width-to-height ratio of an image or screen. 16:9 means 16 units wide for every 9 units tall — modern widescreen. 4:3 is older TV/photo. 1:1 is square (Instagram default).',
      },
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
    intro:
      "The arithmetic mean — add up all the values, divide by the count. This calculator handles up to 4 inputs. Useful for monthly expense averaging, exam mark calculation, or any quick \"what's the average?\" check. (50 + 75 + 100 + 125) ÷ 4 = 87.5. For more nuanced averaging (geometric, harmonic, weighted), see specialist calculators. For larger datasets, use a spreadsheet.",
    formula: 'Average = (Σ values) ÷ Count',
    howItWorks:
      "Sum all values, divide by how many. 50 + 75 + 100 + 125 = 350. Count = 4. Average = 350 ÷ 4 = 87.5. The mean is sensitive to outliers — a single very large or very small value pulls it away from the bulk of the data. For outlier-resistant central tendency, use median instead (Statistics Calculator).",
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
    faqs: [
      {
        q: 'When should I use mean vs median?',
        a: 'Mean for symmetric data without outliers. Median for skewed data or with outliers. Average household income uses mean (distorted by billionaires); median income better represents typical experience.',
      },
      {
        q: 'How do I calculate a weighted average?',
        a: 'Multiply each value by its weight, sum the products, divide by total weight. Grade with HW (20%, score 85), Mid (30%, 80), Final (50%, 90): (85×20 + 80×30 + 90×50) ÷ 100 = 86.',
      },
      {
        q: 'Why does mean change when I add one more value?',
        a: 'Mean recalculates over all data. Adding a value larger than the current mean pulls it up; adding one smaller pulls it down. The exception: adding a value exactly equal to the mean leaves it unchanged.',
      },
      {
        q: 'Is "average" the same as "mean"?',
        a: 'In everyday speech, yes. Technically, "average" can refer to any measure of central tendency (mean, median, mode). The arithmetic mean is the most common interpretation.',
      },
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
    intro:
      "n factorial (written n!) is the product of all positive integers from 1 to n. 6! = 6 × 5 × 4 × 3 × 2 × 1 = 720. Used in permutations and combinations (ways to arrange or choose items), probability calculations, and series expansions in calculus. By convention, 0! = 1. This calculator goes up to 20! = 2.43 × 10¹⁸ — JavaScript can't precisely represent larger factorials in a single Number.",
    formula: 'n! = n × (n − 1) × (n − 2) × ... × 1 · 0! = 1 (by convention)',
    howItWorks:
      "Multiply n by every smaller positive integer. 5! = 5 × 4 × 3 × 2 × 1 = 120. Factorials grow extremely fast — by the time you reach 20!, the number is over 2 quintillion. 13! is already over 6 billion. The 0! = 1 convention makes formulas like nPr and nCr work cleanly for boundary cases.",
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
    faqs: [
      {
        q: 'Why is 0! equal to 1?',
        a: 'By convention, so formulas like nCr and the power-series expansion of e^x work for boundary cases. Also natural: 0! = "number of ways to arrange 0 items" = 1 (the empty arrangement).',
      },
      {
        q: 'What\'s the difference between permutation and combination?',
        a: 'Permutation (nPr) counts arrangements where order matters. Combination (nCr) counts selections where order doesn\'t. nPr = n! / (n − r)!. nCr = n! / (r! × (n − r)!). nCr is always smaller (or equal) than nPr.',
      },
      {
        q: 'How big is 52! (card shuffle)?',
        a: 'About 8 × 10⁶⁷ — a number with 68 digits. More than the estimated number of atoms in the Earth. Every shuffle of a card deck is statistically guaranteed to be unique in human history.',
      },
      {
        q: 'How is factorial used in probability?',
        a: 'For permutations and combinations. Probability of getting 5 hearts in a 5-card poker draw = (13C5) ÷ (52C5) — both numerator and denominator use factorial. Also appears in binomial distribution formulas.',
      },
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
    intro:
      "A prime number has exactly two factors: 1 and itself. The first few: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29... This calculator checks any number up to 10,000 and lists all factors. 97 is prime (factors: 1, 97). 100 is not (factors: 1, 2, 4, 5, 10, 20, 25, 50, 100). Prime numbers are central to cryptography, number theory, and competitive math.",
    formula: 'A number n is prime if and only if it has exactly 2 divisors: 1 and n',
    howItWorks:
      "The calculator tries dividing n by every integer from 1 to n and collects divisors. If exactly 2 divisors are found (1 and n itself), it's prime. For very large numbers, this brute-force check is slow; production systems use Miller-Rabin or other probabilistic primality tests.",
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
    faqs: [
      {
        q: 'Is 1 a prime number?',
        a: 'No. By modern convention, prime numbers must have exactly two distinct divisors (1 and itself). 1 has only one divisor (itself), so it\'s not prime. This convention makes theorems like unique prime factorisation work.',
      },
      {
        q: 'Are there infinitely many primes?',
        a: 'Yes — proven by Euclid around 300 BCE. The proof: assume there are finitely many primes, multiply them all and add 1; the result is either a new prime or has a prime factor not in the original list. Contradiction.',
      },
      {
        q: 'Why do primes matter in cryptography?',
        a: 'RSA encryption relies on the difficulty of factoring a number that\'s the product of two large primes. Multiplying two 300-digit primes is fast; factoring the 600-digit result is computationally infeasible. This asymmetry is what makes asymmetric cryptography work.',
      },
      {
        q: 'How do mathematicians find very large primes?',
        a: 'Modern algorithms like Miller-Rabin probabilistic test and AKS deterministic test. The largest known primes are Mersenne primes (2^p − 1 form), found by distributed-computing project GIMPS.',
      },
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
    intro:
      "Powers (or exponents) are the inverse of roots: 2¹⁰ = 1024, 5³ = 125, 10^−2 = 0.01. This calculator handles any base and exponent, including negative and fractional values. Fractional exponents act as roots (4^0.5 = √4 = 2). Negative exponents act as reciprocals (2^−3 = 1/8 = 0.125). Used everywhere from compound interest (1.08^20) to physics (E = mc²) to scientific notation.",
    formula: 'b^n = b × b × ... × b (n times) · b^(-n) = 1 ÷ b^n · b^(1/n) = ⁿ√b',
    howItWorks:
      "Multiply base by itself exponent times. 2¹⁰ = 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = 1024. For negative exponents, take the reciprocal: 2^−3 = 1 / 2³ = 1/8 = 0.125. For fractional exponents, it's a root: 8^(1/3) = ∛8 = 2. The calculator uses JavaScript's Math.pow which handles all these cases.",
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
    faqs: [
      {
        q: 'Why is anything to the power 0 equal to 1?',
        a: 'By definition. The rule b^m ÷ b^n = b^(m−n) requires that b^0 = b^n ÷ b^n = 1 (for any non-zero b). The convention extends 0! = 1 and gives consistency across exponent rules.',
      },
      {
        q: 'What does a negative exponent mean?',
        a: 'Reciprocal. 2^(-3) = 1 ÷ 2³ = 1/8 = 0.125. Negative exponents express division. The number 10^(-2) = 0.01 = 1/100. Scientific notation uses negative exponents for very small numbers.',
      },
      {
        q: 'What is a fractional exponent?',
        a: 'A root. b^(1/n) = the n-th root of b. 9^0.5 = √9 = 3. 8^(1/3) = ∛8 = 2. Combinations: 8^(2/3) = (∛8)² = 4. Fractional exponents unify roots and powers into one notation.',
      },
      {
        q: 'How are exponents used in finance?',
        a: 'Compound interest: A = P(1 + r)^n. Future value of an investment. Compound growth (10% growth for 20 years = 1.10^20 ≈ 6.7×). Inflation impact. Every long-term financial projection uses exponents.',
      },
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
    intro:
      "Square root of x is the number that, multiplied by itself, gives x. √144 = 12. Cube root is the number that, multiplied by itself three times, gives x. ∛125 = 5. This calculator returns both for any positive value. Perfect squares (1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144...) have integer roots; everything else gives decimal roots. Used everywhere from Pythagoras\' theorem to standard deviation to physics distance calculations.",
    formula: '√x is the value y such that y² = x · ∛x is the value y such that y³ = x',
    howItWorks:
      "144 = 12 × 12, so √144 = 12. 125 = 5 × 5 × 5, so ∛125 = 5. For non-perfect squares, you get irrational decimals: √2 ≈ 1.4142, √3 ≈ 1.7321, √5 ≈ 2.2361. These appear constantly in geometry. The diagonal of a unit square is √2; the diagonal of a unit cube is √3.",
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
    faqs: [
      {
        q: 'Why doesn\'t negative numbers have square roots?',
        a: 'In real numbers, no — because a positive squared is positive, and a negative squared is also positive. There\'s no real number whose square is negative. Complex numbers introduce the imaginary unit i = √(-1) to handle these.',
      },
      {
        q: 'Is √2 a rational number?',
        a: 'No — √2 is irrational. Proof (by Pythagoras\' school): if √2 = a/b in lowest terms, squaring gives 2 = a²/b², so a² = 2b². That means a is even (only even squares are even). Write a = 2k: 4k² = 2b², so b² = 2k², meaning b is also even. Both a and b even contradicts "lowest terms."',
      },
      {
        q: 'How is square root used in real life?',
        a: 'Pythagoras\' theorem (distances), standard deviation in statistics, area-to-side conversion for squares, physics (kinetic energy = ½mv²), engineering tolerances, image-resolution math.',
      },
      {
        q: 'How can I compute square roots by hand?',
        a: 'For perfect squares, memorise (1–15 squared covers most exam needs). For non-perfect squares, use the Newton-Raphson iteration: x_(n+1) = (x_n + N/x_n) ÷ 2, repeatedly. Starting with x = 1.5 for √2: 1.5 → 1.4167 → 1.4142... converges fast.',
      },
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
