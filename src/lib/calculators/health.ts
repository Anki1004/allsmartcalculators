import { CalculatorConfig } from '../calculator-types';

export const healthCalculators: CalculatorConfig[] = [
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'health',
    icon: 'Activity',
    description: 'Calculate your Body Mass Index in seconds — with WHO categories and Asian-specific cutoffs.',
    trending: true,
    usageCount: 298000,
    inputs: [
      { key: 'weight', label: 'Weight', type: 'slider', min: 20, max: 300, step: 0.5, default: 70, suffix: 'kg', color: 'primary' },
      { key: 'height', label: 'Height', type: 'slider', min: 100, max: 250, step: 1, default: 170, suffix: 'cm', color: 'secondary' },
    ],
    outputs: [
      { key: 'bmi', label: 'Your BMI', primary: true, decimals: 1 },
      { key: 'category', label: 'Category', color: 'secondary' },
      { key: 'idealWeight', label: 'Ideal Weight Range', suffix: 'kg', color: 'tertiary' },
    ],
    calculate: (i) => {
      const h = Number(i.height) / 100;
      const bmi = Number(i.weight) / (h * h);
      let category = 'Normal';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi >= 25 && bmi < 30) category = 'Overweight';
      else if (bmi >= 30) category = 'Obese';
      const idealMin = 18.5 * h * h;
      const idealMax = 24.9 * h * h;
      return { bmi, category, idealWeight: `${idealMin.toFixed(1)} - ${idealMax.toFixed(1)}` };
    },
    intro:
      'BMI (Body Mass Index) is a weight-for-height ratio used to screen adults for underweight, normal weight, overweight, and obesity. The number itself does not measure body fat directly, but population studies link BMI bands to broad health risks, which is why doctors and public-health agencies still use it. This calculator returns your BMI alongside both the global WHO categories and the lower Asian-specific cutoffs that the WHO recommends for South and East Asian populations.',
    formula: 'BMI = weight (kg) ÷ height (m)²',
    howItWorks:
      'Convert your height to metres (170 cm → 1.70 m), square it, then divide your weight in kilograms by the result. A 70 kg person at 1.70 m has a BMI of 70 ÷ (1.70 × 1.70) = 24.2, which sits at the top of the global "Normal" range but is already in the "Overweight" range under the Asian cutoff (≥ 23). For pounds and inches, multiply (weight in lb ÷ height in in²) by 703.',
    ranges: {
      title: 'BMI categories — WHO global vs. Asian cutoffs',
      rows: [
        { label: 'Underweight', range: 'BMI < 18.5', note: 'Same under both standards' },
        { label: 'Normal', range: '18.5 – 24.9 (global) · 18.5 – 22.9 (Asian)', note: 'Asian range is narrower' },
        { label: 'Overweight', range: '25 – 29.9 (global) · 23 – 24.9 (Asian)', note: 'Indian guidance follows the Asian cutoff' },
        { label: 'Obese — Class I', range: '30 – 34.9 (global) · ≥ 25 (Asian)', note: 'Asian threshold for action is much lower' },
        { label: 'Obese — Class II', range: '35 – 39.9', note: 'High health risk' },
        { label: 'Obese — Class III', range: '≥ 40', note: 'Very high risk; clinical follow-up advised' },
      ],
    },
    limitations: [
      "BMI doesn't distinguish muscle from fat — athletes and very muscular people often score 'overweight' or 'obese' despite low body-fat percentage.",
      "It doesn't account for fat distribution. Two people with the same BMI can have very different visceral fat (the kind that drives metabolic risk).",
      "Standard global cutoffs underestimate risk for South Asians, East Asians, and several other ethnic groups, which is why Indian and Asian guidance uses the lower cutoffs above.",
      "BMI is less accurate for older adults (muscle loss inflates 'normal' readings) and for children, who need age- and sex-specific BMI percentile charts instead.",
      "It says nothing about diet quality, fitness, blood pressure, blood sugar, or any other clinical marker. Treat it as one screening number, not a diagnosis.",
    ],
    faqs: [
      {
        q: 'What is a healthy BMI?',
        a: 'For most adults, a BMI between 18.5 and 24.9 falls in the WHO "normal" range. For people of South Asian, East Asian, and several other ancestries, the WHO recommends a lower upper bound of 22.9, with 23–24.9 already counted as overweight.',
      },
      {
        q: "What's the BMI range for Indian adults?",
        a: 'Indian guidance follows the WHO Asian cutoffs: underweight < 18.5, normal 18.5–22.9, overweight 23–24.9, obese ≥ 25. These are tighter than the global ranges because South Asians develop diabetes, hypertension, and cardiovascular disease at lower BMIs than European populations.',
      },
      {
        q: 'Does BMI work for athletes or very muscular people?',
        a: "Not well. BMI uses total weight, so heavy muscle reads as 'overweight' or 'obese' even when body-fat percentage is low. Athletes, weightlifters, and bodybuilders should use body-fat percentage, waist-to-height ratio, or DEXA scans instead.",
      },
      {
        q: 'Should men and women use the same BMI calculator?',
        a: 'Yes — the formula and adult cutoffs are identical for men and women. Body composition does differ on average between sexes, but BMI itself is sex-neutral. For children and teens (under 20), use age- and sex-specific BMI percentile charts.',
      },
      {
        q: 'What happens if my BMI is high — should I worry?',
        a: 'A high BMI is a screening signal, not a diagnosis. It tells your doctor to look more carefully at metabolic markers (fasting glucose, lipid profile, blood pressure, waist circumference). Action depends on those tests, not on the BMI number alone.',
      },
      {
        q: "Why doesn't BMI use waist size?",
        a: "Because it pre-dates the research on visceral fat. Waist circumference and waist-to-height ratio are now considered better single indicators of metabolic risk, and many clinicians use them alongside BMI rather than instead of it.",
      },
    ],
    seo: {
      title: 'BMI Calculator — Body Mass Index for Adults (with Asian Cutoffs)',
      description:
        'Free BMI calculator with WHO categories and Asian-specific cutoffs for Indian adults. See your ideal weight range, healthy BMI, and what the result really means.',
      applicationCategory: 'HealthApplication',
      sources: [
        { label: 'WHO — BMI classification (global)', url: 'https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/body-mass-index' },
        { label: 'WHO — Asian-specific BMI cutoffs (Lancet 2004)', url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(03)15268-3/fulltext' },
        { label: 'CDC — About Adult BMI', url: 'https://www.cdc.gov/bmi/adult-calculator/index.html' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
  },
  {
    slug: 'bmr-calculator',
    name: 'BMR Calculator',
    category: 'health',
    icon: 'Flame',
    description: 'Basal Metabolic Rate — calories at rest.',
    usageCount: 87000,
    inputs: [
      { key: 'weight', label: 'Weight', type: 'slider', min: 30, max: 200, step: 0.5, default: 70, suffix: 'kg', color: 'primary' },
      { key: 'height', label: 'Height', type: 'slider', min: 120, max: 220, step: 1, default: 170, suffix: 'cm', color: 'secondary' },
      { key: 'age', label: 'Age', type: 'slider', min: 10, max: 100, step: 1, default: 30, suffix: 'yrs', color: 'tertiary' },
    ],
    outputs: [
      { key: 'bmr', label: 'BMR', suffix: 'cal/day', primary: true, decimals: 0 },
      { key: 'sedentary', label: 'Sedentary TDEE', suffix: 'cal', decimals: 0, color: 'secondary' },
      { key: 'active', label: 'Active TDEE', suffix: 'cal', decimals: 0, color: 'tertiary' },
    ],
    calculate: (i) => {
      const bmr = 10 * Number(i.weight) + 6.25 * Number(i.height) - 5 * Number(i.age) + 5;
      return { bmr, sedentary: bmr * 1.2, active: bmr * 1.55 };
    },
  },
  {
    slug: 'calorie-calculator',
    name: 'Calorie Calculator',
    category: 'health',
    icon: 'Apple',
    description: 'Daily calorie needs for your goals.',
    trending: true,
    usageCount: 145000,
    inputs: [
      { key: 'weight', label: 'Weight', type: 'slider', min: 30, max: 200, step: 0.5, default: 70, suffix: 'kg', color: 'primary' },
      { key: 'height', label: 'Height', type: 'slider', min: 120, max: 220, step: 1, default: 170, suffix: 'cm', color: 'secondary' },
      { key: 'age', label: 'Age', type: 'slider', min: 10, max: 100, step: 1, default: 30, suffix: 'yrs' },
      { key: 'activity', label: 'Activity Level (1-5)', type: 'slider', min: 1, max: 5, step: 1, default: 3, color: 'tertiary' },
    ],
    outputs: [
      { key: 'maintain', label: 'Maintain Weight', suffix: 'cal', decimals: 0, primary: true },
      { key: 'lose', label: 'Lose Weight', suffix: 'cal', decimals: 0, color: 'secondary' },
      { key: 'gain', label: 'Gain Weight', suffix: 'cal', decimals: 0, color: 'tertiary' },
    ],
    calculate: (i) => {
      const bmr = 10 * Number(i.weight) + 6.25 * Number(i.height) - 5 * Number(i.age) + 5;
      const multipliers = [1.2, 1.375, 1.55, 1.725, 1.9];
      const maintain = bmr * multipliers[Number(i.activity) - 1];
      return { maintain, lose: maintain - 500, gain: maintain + 500 };
    },
  },
  {
    slug: 'macro-calculator',
    name: 'Macro Calculator',
    category: 'health',
    icon: 'PieChart',
    description: 'Calculate protein, carbs, and fat ratios.',
    usageCount: 54000,
    chartType: 'donut',
    inputs: [
      { key: 'calories', label: 'Daily Calories', type: 'slider', min: 1000, max: 5000, step: 50, default: 2200, suffix: 'cal', color: 'primary' },
      { key: 'proteinPct', label: 'Protein %', type: 'slider', min: 10, max: 50, step: 5, default: 30, suffix: '%', color: 'secondary' },
      { key: 'carbsPct', label: 'Carbs %', type: 'slider', min: 10, max: 70, step: 5, default: 40, suffix: '%', color: 'tertiary' },
    ],
    outputs: [
      { key: 'protein', label: 'Protein', suffix: 'g', decimals: 0, primary: true, color: 'secondary' },
      { key: 'carbs', label: 'Carbs', suffix: 'g', decimals: 0, color: 'tertiary' },
      { key: 'fat', label: 'Fat', suffix: 'g', decimals: 0, color: 'primary' },
    ],
    calculate: (i) => {
      const cal = Number(i.calories);
      const protein = (cal * (Number(i.proteinPct) / 100)) / 4;
      const carbs = (cal * (Number(i.carbsPct) / 100)) / 4;
      const fatPct = 100 - Number(i.proteinPct) - Number(i.carbsPct);
      const fat = (cal * (Math.max(0, fatPct) / 100)) / 9;
      return { protein, carbs, fat };
    },
  },
  {
    slug: 'body-fat-calculator',
    name: 'Body Fat %',
    category: 'health',
    icon: 'Heart',
    description: 'Estimate body fat percentage.',
    usageCount: 42000,
    inputs: [
      { key: 'waist', label: 'Waist', type: 'slider', min: 50, max: 200, step: 0.5, default: 85, suffix: 'cm', color: 'primary' },
      { key: 'neck', label: 'Neck', type: 'slider', min: 25, max: 60, step: 0.5, default: 38, suffix: 'cm', color: 'secondary' },
      { key: 'height', label: 'Height', type: 'slider', min: 130, max: 220, step: 1, default: 175, suffix: 'cm', color: 'tertiary' },
    ],
    outputs: [
      { key: 'bodyFat', label: 'Body Fat %', suffix: '%', decimals: 1, primary: true },
      { key: 'category', label: 'Category', color: 'secondary' },
    ],
    calculate: (i) => {
      const w = Number(i.waist);
      const n = Number(i.neck);
      const h = Number(i.height);
      const bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
      let category = 'Average';
      if (bodyFat < 14) category = 'Athletes';
      else if (bodyFat < 18) category = 'Fitness';
      else if (bodyFat < 25) category = 'Average';
      else category = 'Above Average';
      return { bodyFat: Math.max(0, bodyFat), category };
    },
  },
  {
    slug: 'ideal-weight-calculator',
    name: 'Ideal Weight',
    category: 'health',
    icon: 'Scale',
    description: 'Find your ideal weight based on height.',
    usageCount: 38000,
    inputs: [
      { key: 'height', label: 'Height', type: 'slider', min: 120, max: 220, step: 1, default: 170, suffix: 'cm', color: 'primary' },
    ],
    outputs: [
      { key: 'devine', label: 'Devine Formula', suffix: 'kg', decimals: 1, primary: true },
      { key: 'robinson', label: 'Robinson Formula', suffix: 'kg', decimals: 1, color: 'secondary' },
      { key: 'miller', label: 'Miller Formula', suffix: 'kg', decimals: 1, color: 'tertiary' },
    ],
    calculate: (i) => {
      const inches = Number(i.height) / 2.54;
      const over5ft = Math.max(0, inches - 60);
      return {
        devine: 50 + 2.3 * over5ft,
        robinson: 52 + 1.9 * over5ft,
        miller: 56.2 + 1.41 * over5ft,
      };
    },
  },
  {
    slug: 'water-intake-calculator',
    name: 'Water Intake',
    category: 'health',
    icon: 'Droplet',
    description: 'Daily water needs based on weight & activity.',
    trending: true,
    usageCount: 112000,
    inputs: [
      { key: 'weight', label: 'Weight', type: 'slider', min: 30, max: 200, step: 0.5, default: 70, suffix: 'kg', color: 'primary' },
      { key: 'activity', label: 'Exercise Minutes', type: 'slider', min: 0, max: 300, step: 15, default: 30, suffix: 'min', color: 'secondary' },
    ],
    outputs: [
      { key: 'liters', label: 'Daily Water', suffix: 'L', decimals: 2, primary: true },
      { key: 'glasses', label: 'Glasses (250ml)', decimals: 0, color: 'secondary' },
      { key: 'oz', label: 'Ounces', suffix: 'oz', decimals: 0, color: 'tertiary' },
    ],
    calculate: (i) => {
      const liters = Number(i.weight) * 0.033 + (Number(i.activity) / 30) * 0.35;
      return { liters, glasses: (liters * 1000) / 250, oz: liters * 33.814 };
    },
  },
  {
    slug: 'pregnancy-due-date',
    name: 'Pregnancy Due Date',
    category: 'health',
    icon: 'Baby',
    description: 'Estimate your baby\'s due date.',
    usageCount: 76000,
    inputs: [
      { key: 'cycleDay', label: 'Days Since Last Period', type: 'slider', min: 0, max: 280, step: 1, default: 60, suffix: 'days', color: 'primary' },
    ],
    outputs: [
      { key: 'weeksRemaining', label: 'Weeks Remaining', suffix: 'wk', decimals: 0, primary: true },
      { key: 'trimester', label: 'Trimester', color: 'secondary' },
      { key: 'daysRemaining', label: 'Days to Go', suffix: 'days', decimals: 0, color: 'tertiary' },
    ],
    calculate: (i) => {
      const totalDays = 280;
      const daysRemaining = Math.max(0, totalDays - Number(i.cycleDay));
      const weeksRemaining = daysRemaining / 7;
      const currentWeek = Number(i.cycleDay) / 7;
      let trimester = 'First';
      if (currentWeek > 13 && currentWeek <= 27) trimester = 'Second';
      else if (currentWeek > 27) trimester = 'Third';
      return { weeksRemaining, trimester, daysRemaining };
    },
  },
  {
    slug: 'ovulation-calculator',
    name: 'Ovulation Calculator',
    category: 'health',
    icon: 'Heart',
    description: 'Find your fertile window.',
    usageCount: 65000,
    inputs: [
      { key: 'cycleLength', label: 'Cycle Length', type: 'slider', min: 21, max: 45, step: 1, default: 28, suffix: 'days', color: 'primary' },
      { key: 'lastPeriodDay', label: 'Days Since Period', type: 'slider', min: 0, max: 45, step: 1, default: 5, suffix: 'days', color: 'secondary' },
    ],
    outputs: [
      { key: 'ovulationDay', label: 'Ovulation Day', suffix: 'day of cycle', decimals: 0, primary: true },
      { key: 'fertileStart', label: 'Fertile Window Start', suffix: 'day', decimals: 0, color: 'secondary' },
      { key: 'fertileEnd', label: 'Fertile Window End', suffix: 'day', decimals: 0, color: 'tertiary' },
    ],
    calculate: (i) => {
      const ovulationDay = Number(i.cycleLength) - 14;
      return {
        ovulationDay,
        fertileStart: Math.max(1, ovulationDay - 5),
        fertileEnd: ovulationDay + 1,
      };
    },
  },
  {
    slug: 'heart-rate-zone',
    name: 'Heart Rate Zone',
    category: 'health',
    icon: 'Heart',
    description: 'Training zones based on age.',
    usageCount: 34000,
    inputs: [
      { key: 'age', label: 'Age', type: 'slider', min: 10, max: 100, step: 1, default: 30, suffix: 'yrs', color: 'primary' },
    ],
    outputs: [
      { key: 'maxHr', label: 'Max Heart Rate', suffix: 'bpm', decimals: 0, primary: true },
      { key: 'fatBurn', label: 'Fat Burn Zone (60-70%)', color: 'secondary' },
      { key: 'cardio', label: 'Cardio Zone (70-85%)', color: 'tertiary' },
    ],
    calculate: (i) => {
      const max = 220 - Number(i.age);
      return {
        maxHr: max,
        fatBurn: `${Math.round(max * 0.6)} - ${Math.round(max * 0.7)} bpm`,
        cardio: `${Math.round(max * 0.7)} - ${Math.round(max * 0.85)} bpm`,
      };
    },
  },
  {
    slug: 'vo2-max-calculator',
    name: 'VO2 Max',
    category: 'health',
    icon: 'Zap',
    description: 'Estimate aerobic fitness capacity.',
    usageCount: 21000,
    inputs: [
      { key: 'distance', label: '12-Min Run Distance', type: 'slider', min: 500, max: 5000, step: 50, default: 2400, suffix: 'm', color: 'primary' },
    ],
    outputs: [
      { key: 'vo2', label: 'VO2 Max', suffix: 'ml/kg/min', decimals: 1, primary: true },
      { key: 'fitness', label: 'Fitness Level', color: 'secondary' },
    ],
    calculate: (i) => {
      const d = Number(i.distance);
      const vo2 = (d - 504.9) / 44.73;
      let fitness = 'Average';
      if (vo2 > 55) fitness = 'Excellent';
      else if (vo2 > 45) fitness = 'Good';
      else if (vo2 < 35) fitness = 'Below Average';
      return { vo2: Math.max(0, vo2), fitness };
    },
  },
  {
    slug: 'pace-calculator',
    name: 'Running Pace',
    category: 'health',
    icon: 'Timer',
    description: 'Calculate running pace per km/mile.',
    usageCount: 48000,
    inputs: [
      { key: 'distance', label: 'Distance', type: 'slider', min: 0.5, max: 100, step: 0.5, default: 10, suffix: 'km', color: 'primary' },
      { key: 'minutes', label: 'Minutes', type: 'slider', min: 1, max: 600, step: 1, default: 50, suffix: 'min', color: 'secondary' },
    ],
    outputs: [
      { key: 'pace', label: 'Pace per km', suffix: 'min/km', decimals: 2, primary: true },
      { key: 'speed', label: 'Speed', suffix: 'km/h', decimals: 2, color: 'secondary' },
      { key: 'milePace', label: 'Pace per mile', suffix: 'min/mi', decimals: 2, color: 'tertiary' },
    ],
    calculate: (i) => {
      const pace = Number(i.minutes) / Number(i.distance);
      return {
        pace,
        speed: 60 / pace,
        milePace: pace * 1.60934,
      };
    },
  },
  {
    slug: 'one-rep-max',
    name: 'One-Rep Max',
    category: 'health',
    icon: 'Dumbbell',
    description: 'Calculate your 1RM for any lift.',
    usageCount: 39000,
    inputs: [
      { key: 'weight', label: 'Weight Lifted', type: 'slider', min: 10, max: 500, step: 1, default: 80, suffix: 'kg', color: 'primary' },
      { key: 'reps', label: 'Reps Performed', type: 'slider', min: 1, max: 20, step: 1, default: 8, suffix: 'reps', color: 'secondary' },
    ],
    outputs: [
      { key: 'oneRm', label: '1 Rep Max', suffix: 'kg', decimals: 1, primary: true },
      { key: 'fivePct', label: '85% (5 reps)', suffix: 'kg', decimals: 1, color: 'secondary' },
      { key: 'tenPct', label: '70% (10 reps)', suffix: 'kg', decimals: 1, color: 'tertiary' },
    ],
    calculate: (i) => {
      const oneRm = Number(i.weight) * (1 + Number(i.reps) / 30);
      return { oneRm, fivePct: oneRm * 0.85, tenPct: oneRm * 0.7 };
    },
  },
  {
    slug: 'sleep-cycle-calculator',
    name: 'Sleep Cycle',
    category: 'health',
    icon: 'Moon',
    description: 'Best bedtime based on wake time.',
    usageCount: 58000,
    inputs: [
      { key: 'wakeHour', label: 'Wake Hour', type: 'slider', min: 0, max: 23, step: 1, default: 7, suffix: ':00', color: 'primary' },
      { key: 'fallAsleepMin', label: 'Minutes to Fall Asleep', type: 'slider', min: 5, max: 60, step: 5, default: 15, suffix: 'min', color: 'secondary' },
    ],
    outputs: [
      { key: 'bedtime6', label: 'Bedtime (6 cycles)', color: 'secondary', primary: true },
      { key: 'bedtime5', label: 'Bedtime (5 cycles)', color: 'tertiary' },
      { key: 'bedtime4', label: 'Bedtime (4 cycles)' },
    ],
    calculate: (i) => {
      const wake = Number(i.wakeHour);
      const asleep = Number(i.fallAsleepMin);
      const fmt = (cycles: number) => {
        const totalMin = cycles * 90 + asleep;
        const bedHour = (wake * 60 - totalMin + 24 * 60) % (24 * 60);
        const h = Math.floor(bedHour / 60);
        const m = Math.floor(bedHour % 60);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      };
      return { bedtime6: fmt(6), bedtime5: fmt(5), bedtime4: fmt(4) };
    },
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'health',
    icon: 'Cake',
    description: 'Calculate exact age in years, months, days.',
    trending: true,
    usageCount: 189000,
    inputs: [
      { key: 'birthYear', label: 'Birth Year', type: 'slider', min: 1900, max: 2025, step: 1, default: 1995, color: 'primary' },
      { key: 'birthMonth', label: 'Birth Month', type: 'slider', min: 1, max: 12, step: 1, default: 6, color: 'secondary' },
      { key: 'birthDay', label: 'Birth Day', type: 'slider', min: 1, max: 31, step: 1, default: 15, color: 'tertiary' },
    ],
    outputs: [
      { key: 'years', label: 'Years', decimals: 0, primary: true },
      { key: 'months', label: 'Total Months', decimals: 0, color: 'secondary' },
      { key: 'days', label: 'Total Days', decimals: 0, color: 'tertiary' },
    ],
    calculate: (i) => {
      const birth = new Date(Number(i.birthYear), Number(i.birthMonth) - 1, Number(i.birthDay));
      const now = new Date();
      const ms = now.getTime() - birth.getTime();
      const days = ms / (1000 * 60 * 60 * 24);
      const years = days / 365.25;
      return { years: Math.floor(years), months: Math.floor(years * 12), days: Math.floor(days) };
    },
  },
];
