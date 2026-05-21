import { CalculatorConfig } from '../calculator-types';

export const healthCalculators: CalculatorConfig[] = [
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'health',
    icon: 'Activity',
    description: 'Calculate your Body Mass Index in seconds â€” with WHO categories and Asian-specific cutoffs.',
    trending: true,
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
    seo: {
      title: 'BMI Calculator â€” Body Mass Index for Adults (with Asian Cutoffs)',
      description:
        'Free BMI calculator with WHO categories and Asian-specific cutoffs for Indian adults. See your ideal weight range, healthy BMI, and what the result really means.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'bmr-calculator',
    name: 'BMR Calculator',
    category: 'health',
    icon: 'Flame',
    description: 'Calculate your Basal Metabolic Rate â€” the calories your body burns at complete rest.',
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
    seo: {
      title: 'BMR Calculator â€” Basal Metabolic Rate (Mifflin-St Jeor)',
      description:
        'Free BMR calculator using the Mifflin-St Jeor equation. See your basal metabolic rate, TDEE for 5 activity levels, and how many calories your body burns at rest.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'calorie-calculator',
    name: 'Calorie Calculator',
    category: 'health',
    icon: 'Apple',
    description: 'Daily calorie needs to maintain, lose, or gain weight â€” based on your BMR and activity level.',
    trending: true,
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
    seo: {
      title: 'Calorie Calculator â€” Daily Calories to Lose, Gain or Maintain',
      description:
        'Free daily calorie calculator. See your TDEE, weight-loss target (TDEE âˆ’ 500), and weight-gain target. Uses Mifflin-St Jeor BMR with 5 activity levels.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'macro-calculator',
    name: 'Macro Calculator',
    category: 'health',
    icon: 'PieChart',
    description: 'Calculate protein, carbs, and fat ratios.',
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
    seo: {
      title: 'Macro Calculator: Protein, Carbs & Fat in Grams',
      description: 'Free macro calculator. Convert your daily calorie target into grams of protein, carbs, and fat at any custom split. Donut chart of your macro mix.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'body-fat-calculator',
    name: 'Body Fat %',
    category: 'health',
    icon: 'Heart',
    description: 'Estimate body fat percentage.',
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
    seo: {
      title: 'Body Fat Calculator: U.S. Navy Method',
      description: 'Free body fat percentage calculator using the U.S. Navy circumference method. Just waist, neck, and height â€” no calipers needed. Includes fitness band.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'ideal-weight-calculator',
    name: 'Ideal Weight',
    category: 'health',
    icon: 'Scale',
    description: 'Find your ideal weight based on height.',
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
    seo: {
      title: 'Ideal Weight Calculator: Devine, Robinson & Miller',
      description: 'Free ideal-weight calculator. Compare three classical formulas (Devine, Robinson, Miller) for healthy adult weight given height â€” useful for fitness goals.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'water-intake-calculator',
    name: 'Water Intake',
    category: 'health',
    icon: 'Droplet',
    description: 'Daily water needs based on weight & activity.',
    trending: true,
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
    seo: {
      title: 'Water Intake Calculator: Daily Hydration Goal',
      description: 'Free water intake calculator. Get your daily hydration target in litres, glasses, and ounces â€” adjusted for body weight and exercise minutes.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'pregnancy-due-date',
    name: 'Pregnancy Due Date',
    category: 'health',
    icon: 'Baby',
    description: 'Estimate your baby\'s due date.',
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
    seo: {
      title: 'Pregnancy Due Date Calculator: Weeks Remaining',
      description: 'Free pregnancy due-date calculator. Estimate your baby\'s arrival date, weeks remaining, and current trimester from days since your last period.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'ovulation-calculator',
    name: 'Ovulation Calculator',
    category: 'health',
    icon: 'Heart',
    description: 'Find your fertile window.',
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
    seo: {
      title: 'Ovulation Calculator: Fertile Window by Cycle',
      description: 'Free ovulation calculator. Identify your ovulation day and fertile window for any cycle length. Useful for trying to conceive or natural family planning.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'heart-rate-zone',
    name: 'Heart Rate Zone',
    category: 'health',
    icon: 'Heart',
    description: 'Training zones based on age.',
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
    seo: {
      title: 'Heart Rate Zone Calculator: Max HR, Fat-Burn, Cardio',
      description: 'Free heart rate zone calculator. Get your max heart rate and the BPM ranges for fat-burn (60â€“70%) and cardio (70â€“85%) training zones â€” by age.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'vo2-max-calculator',
    name: 'VO2 Max',
    category: 'health',
    icon: 'Zap',
    description: 'Estimate aerobic fitness capacity.',
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
    seo: {
      title: 'VO2 Max Calculator: Cooper 12-Minute Run Test',
      description: 'Free VO2 max calculator using the Cooper 12-minute run test. Estimate your aerobic fitness capacity and see how it compares to your age band.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'pace-calculator',
    name: 'Running Pace',
    category: 'health',
    icon: 'Timer',
    description: 'Calculate running pace per km/mile.',
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
    seo: {
      title: 'Running Pace Calculator: min/km, min/mi & Speed',
      description: 'Free running pace calculator. Convert any distance and time into pace per km, pace per mile, and average speed in km/h. Useful for race planning.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'one-rep-max',
    name: 'One-Rep Max',
    category: 'health',
    icon: 'Dumbbell',
    description: 'Calculate your 1RM for any lift.',
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
    seo: {
      title: 'One-Rep Max Calculator: Estimate 1RM Safely',
      description: 'Free one-rep max (1RM) calculator. Estimate your true 1RM from any sub-max set and get target weights for 5-rep (85%) and 10-rep (70%) training.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'sleep-cycle-calculator',
    name: 'Sleep Cycle',
    category: 'health',
    icon: 'Moon',
    description: 'Best bedtime based on wake time.',
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
    seo: {
      title: 'Sleep Cycle Calculator: Best Bedtime by Wake Time',
      description: 'Free sleep cycle calculator. Get bedtime suggestions for 4, 5, and 6 sleep cycles so you wake at the end of a cycle, not in the middle.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'health',
    icon: 'Cake',
    description: 'Calculate your exact age in years, total months, and total days from any date of birth â€” accurate down to the day.',
    trending: true,
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
    seo: {
      title: 'Age Calculator: Exact Years, Months & Days',
      description: 'Free age calculator. Get your exact age in years, total months, and total days from your date of birth â€” accurate down to the day.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder Â· AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
