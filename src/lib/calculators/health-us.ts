import { CalculatorConfig } from '../calculator-types';

const KG_PER_LB = 0.45359237;

export const healthUsCalculators: CalculatorConfig[] = [
  {
    slug: 'tdee-calculator',
    name: 'TDEE Calculator',
    category: 'health',
    icon: 'Activity',
    description: 'Estimate your total daily energy expenditure (TDEE) from age, sex, height, weight, and activity level using the Mifflin-St Jeor equation.',
    trending: true,
    inputs: [
      {
        key: 'sex',
        label: 'Sex',
        type: 'select',
        default: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ],
        color: 'primary',
      },
      { key: 'age', label: 'Age', type: 'slider', min: 10, max: 100, step: 1, default: 30, suffix: 'yrs', color: 'secondary' },
      { key: 'weight', label: 'Weight', type: 'slider', min: 60, max: 450, step: 0.5, default: 170, suffix: 'lb', color: 'tertiary' },
      { key: 'heightFt', label: 'Height (feet)', type: 'slider', min: 3, max: 7, step: 1, default: 5, suffix: 'ft', color: 'primary' },
      { key: 'heightIn', label: 'Height (inches)', type: 'slider', min: 0, max: 11, step: 1, default: 9, suffix: 'in', color: 'secondary' },
      {
        key: 'activity',
        label: 'Activity Level',
        type: 'select',
        default: '1.55',
        options: [
          { label: 'Sedentary (little or no exercise)', value: '1.2' },
          { label: 'Lightly active (1-3 days/week)', value: '1.375' },
          { label: 'Moderately active (3-5 days/week)', value: '1.55' },
          { label: 'Very active (6-7 days/week)', value: '1.725' },
          { label: 'Extremely active (hard daily training)', value: '1.9' },
        ],
        color: 'tertiary',
      },
    ],
    outputs: [
      { key: 'tdee', label: 'TDEE (Maintenance)', suffix: 'cal/day', decimals: 0, primary: true },
      { key: 'bmr', label: 'BMR', suffix: 'cal/day', decimals: 0, color: 'secondary' },
      { key: 'cut', label: 'Cutting Calories (−500)', suffix: 'cal/day', decimals: 0, color: 'tertiary' },
      { key: 'bulk', label: 'Bulking Calories (+500)', suffix: 'cal/day', decimals: 0, color: 'primary' },
    ],
    calculate: (i) => {
      const kg = Number(i.weight) * KG_PER_LB;
      const cm = (Number(i.heightFt) * 12 + Number(i.heightIn)) * 2.54;
      const bmr = 10 * kg + 6.25 * cm - 5 * Number(i.age) + (i.sex === 'male' ? 5 : -161);
      const tdee = bmr * Number(i.activity);
      // Floor the cutting target so extreme slider combos can't show a
      // negative or dangerously low daily calorie goal.
      return { tdee, bmr, cut: Math.max(tdee - 500, 1200), bulk: tdee + 500 };
    },
    seo: {
      title: 'TDEE Calculator: Daily Calorie Needs (Mifflin-St Jeor)',
      description: 'Free TDEE calculator. Find your total daily energy expenditure in calories with the Mifflin-St Jeor formula — plus BMR, cutting, and bulking targets.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['bmr-calculator', 'calorie-calculator', 'macro-calculator', 'body-fat-calculator'],
  },
  {
    slug: 'calories-burned-calculator',
    name: 'Calories Burned Calculator',
    category: 'health',
    icon: 'Dumbbell',
    description: 'Estimate calories burned for 20 common activities from your weight and workout duration using research-based MET values.',
    inputs: [
      {
        key: 'met',
        label: 'Activity',
        type: 'select',
        default: '9.8',
        options: [
          { label: 'Walking 3.0 mph', value: '3.5' },
          { label: 'Brisk walking 4 mph', value: '4.3' },
          { label: 'Hiking', value: '6.0' },
          { label: 'Jogging', value: '7.0' },
          { label: 'Running 6 mph', value: '9.8' },
          { label: 'Running 8 mph', value: '11.8' },
          { label: 'Cycling (moderate)', value: '8.0' },
          { label: 'Swimming laps', value: '5.8' },
          { label: 'Elliptical', value: '5.0' },
          { label: 'Rowing machine', value: '7.00' },
          { label: 'Jump rope', value: '11.0' },
          { label: 'Weight lifting', value: '3.50' },
          { label: 'HIIT', value: '8.00' },
          { label: 'Yoga', value: '2.5' },
          { label: 'Dancing', value: '4.5' },
          { label: 'Basketball', value: '6.5' },
          { label: 'Tennis', value: '7.3' },
          { label: 'Soccer', value: '7.000' },
          { label: 'Cleaning house', value: '3.3' },
          { label: 'Gardening', value: '3.8' },
        ],
        color: 'primary',
      },
      { key: 'weight', label: 'Weight', type: 'slider', min: 60, max: 450, step: 0.5, default: 170, suffix: 'lb', color: 'secondary' },
      { key: 'duration', label: 'Duration', type: 'slider', min: 5, max: 300, step: 5, default: 30, suffix: 'min', color: 'tertiary' },
    ],
    outputs: [
      { key: 'calories', label: 'Calories Burned', suffix: 'cal', decimals: 0, primary: true },
      { key: 'perMinute', label: 'Per Minute', suffix: 'cal', decimals: 1, color: 'secondary' },
      { key: 'perHour', label: 'Per Hour at This Pace', suffix: 'cal', decimals: 0, color: 'tertiary' },
    ],
    calculate: (i) => {
      const kg = Number(i.weight) * KG_PER_LB;
      const perMinute = (Number(i.met) * 3.5 * kg) / 200;
      return {
        calories: perMinute * Number(i.duration),
        perMinute,
        perHour: perMinute * 60,
      };
    },
    seo: {
      title: 'Calories Burned Calculator: 20 Exercises by MET Value',
      description: 'Free calories burned calculator. Estimate calories burned walking, running, cycling, lifting, and 16 more activities from MET values, weight, and time.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['calorie-calculator', 'tdee-calculator', 'pace-calculator'],
  },
  {
    slug: 'protein-intake-calculator',
    name: 'Protein Intake Calculator',
    category: 'health',
    icon: 'Utensils',
    description: 'Find your daily protein target in grams from your body weight and training goal, with low/high ranges and a per-meal breakdown.',
    inputs: [
      { key: 'weight', label: 'Weight', type: 'slider', min: 60, max: 450, step: 0.5, default: 170, suffix: 'lb', color: 'primary' },
      {
        key: 'goal',
        label: 'Goal',
        type: 'select',
        default: 'active',
        options: [
          { label: 'Sedentary (0.8 g/kg)', value: 'sedentary' },
          { label: 'Active / endurance (1.2-1.6 g/kg)', value: 'active' },
          { label: 'Build muscle (1.6-2.2 g/kg)', value: 'muscle' },
        ],
        color: 'secondary',
      },
    ],
    outputs: [
      { key: 'target', label: 'Daily Protein Target', suffix: 'g/day', decimals: 0, primary: true },
      { key: 'low', label: 'Low End', suffix: 'g/day', decimals: 0, color: 'secondary' },
      { key: 'high', label: 'High End', suffix: 'g/day', decimals: 0, color: 'tertiary' },
      { key: 'perMeal', label: 'Per Meal (4 meals)', suffix: 'g', decimals: 0, color: 'primary' },
    ],
    calculate: (i) => {
      const kg = Number(i.weight) * KG_PER_LB;
      let low: number;
      let high: number;
      if (i.goal === 'sedentary') {
        low = 0.8 * kg;
        high = 0.8 * kg;
      } else if (i.goal === 'muscle') {
        low = 1.6 * kg;
        high = 2.2 * kg;
      } else {
        low = 1.2 * kg;
        high = 1.6 * kg;
      }
      const mid = (low + high) / 2;
      return { target: mid, low, high, perMeal: mid / 4 };
    },
    seo: {
      title: 'Protein Intake Calculator: Daily Grams by Goal',
      description: 'Free protein intake calculator. Get your daily protein target in grams from body weight and goal — RDA baseline, endurance, and muscle-building ranges.',
      applicationCategory: 'HealthApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['macro-calculator', 'calorie-calculator', 'tdee-calculator'],
  },
];
