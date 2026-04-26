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
    description: 'Calculate your Basal Metabolic Rate — the calories your body burns at complete rest.',
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
    intro:
      'BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest — to keep your heart beating, your lungs breathing, your brain firing, and your cells turning over. It accounts for roughly 60–75% of your daily calorie burn even if you do nothing. This calculator uses the Mifflin-St Jeor equation, the formula most clinicians and nutrition apps treat as the modern default for healthy adults. Layer activity on top to estimate your TDEE (total daily energy expenditure).',
    formula: 'BMR (men) = 10 × kg + 6.25 × cm − 5 × age + 5 · BMR (women) = 10 × kg + 6.25 × cm − 5 × age − 161',
    howItWorks:
      'The Mifflin-St Jeor equation predicts BMR from weight, height, age, and sex. A 30-year-old man at 70 kg and 170 cm has a BMR of 1,649 cal/day; a woman of the same dimensions sits closer to 1,483 cal/day (the −166 offset between formulas reflects average body composition). Multiply BMR by an activity factor — 1.2 sedentary, 1.375 light, 1.55 moderate, 1.725 very active, 1.9 athlete — to get TDEE, the total calories you burn in a day.',
    ranges: {
      title: 'Activity multipliers (BMR × factor = TDEE)',
      rows: [
        { label: 'Sedentary', range: 'BMR × 1.2', note: 'Desk job, little or no exercise' },
        { label: 'Lightly active', range: 'BMR × 1.375', note: '1–3 days a week of light exercise' },
        { label: 'Moderately active', range: 'BMR × 1.55', note: '3–5 days a week of moderate exercise' },
        { label: 'Very active', range: 'BMR × 1.725', note: '6–7 days a week of hard exercise' },
        { label: 'Athlete / physical job', range: 'BMR × 1.9', note: 'Daily training plus active occupation' },
      ],
    },
    limitations: [
      'Mifflin-St Jeor predicts BMR within ±10% for most healthy adults. Outliers — very lean athletes, people with thyroid disorders, post-menopausal women on hormone therapy — can sit further off the predicted value.',
      "It assumes a standard adult body composition. Two 70 kg people with very different muscle-to-fat ratios will have different real BMRs even though the formula returns the same number.",
      "Activity multipliers are rough population averages. Real daily burn varies by NEAT (non-exercise activity thermogenesis) — fidgeting, posture, walking around — which is huge between individuals.",
      "BMR drops about 1–2% per decade after age 20, mostly due to muscle loss. The age term in the formula approximates this; resistance training partially offsets it.",
    ],
    faqs: [
      {
        q: 'What is BMR vs TDEE?',
        a: 'BMR is the calories you burn at total rest. TDEE (total daily energy expenditure) is BMR multiplied by an activity factor — it includes everything you do during the day. To lose weight, eat below TDEE; to gain, eat above it.',
      },
      {
        q: 'Why does this calculator use Mifflin-St Jeor and not Harris-Benedict?',
        a: 'Mifflin-St Jeor was published in 1990 and validated in 2005 against modern body-composition data; it predicts BMR more accurately than the older Harris-Benedict equation (1919) for today\'s population. Most clinical nutritionists default to it.',
      },
      {
        q: 'Should I eat my BMR or my TDEE?',
        a: 'Eat at least your BMR — going below it consistently slows your metabolism and is hard to sustain. Aim for TDEE for maintenance, TDEE − 300 to 500 cal for steady fat loss, TDEE + 200 to 500 for lean muscle gain.',
      },
      {
        q: 'Does muscle increase BMR?',
        a: 'Yes, but less dramatically than fitness magazines claim. Each kg of muscle burns about 13 calories per day at rest, vs. 4.5 for fat. The bigger benefit of muscle is metabolic — better insulin sensitivity and post-workout calorie burn.',
      },
      {
        q: 'Why is my actual weight loss slower than calculated?',
        a: 'Predicted TDEE has ±10% error, you may be tracking food intake low by 20–30% (very common), and your body adapts to a deficit by lowering NEAT. If progress stalls for 3+ weeks, recompute with current weight and tighten tracking before cutting calories further.',
      },
    ],
    seo: {
      title: 'BMR Calculator — Basal Metabolic Rate (Mifflin-St Jeor)',
      description:
        'Free BMR calculator using the Mifflin-St Jeor equation. See your basal metabolic rate, TDEE for 5 activity levels, and how many calories your body burns at rest.',
      applicationCategory: 'HealthApplication',
      sources: [
        { label: 'Mifflin-St Jeor equation (1990 publication)', url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/' },
        { label: 'ADA review confirming Mifflin as modern default (2005)', url: 'https://pubmed.ncbi.nlm.nih.gov/15883556/' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
  },
  {
    slug: 'calorie-calculator',
    name: 'Calorie Calculator',
    category: 'health',
    icon: 'Apple',
    description: 'Daily calorie needs to maintain, lose, or gain weight — based on your BMR and activity level.',
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
    intro:
      'Daily calorie needs depend on four things: your basal metabolic rate (the calories you burn at rest), how active you are, and whether you want to maintain, lose, or gain weight. This calculator combines the Mifflin-St Jeor BMR formula with a standard activity multiplier and a 500 cal/day deficit or surplus to give the three target numbers most people care about. The 500 cal figure isn\'t arbitrary — a deficit of that size produces roughly 0.45 kg (1 lb) of fat loss per week.',
    formula: 'TDEE = BMR × activity factor · loss target = TDEE − 500 · gain target = TDEE + 500',
    howItWorks:
      "First we compute BMR using the Mifflin-St Jeor equation. Then we multiply by an activity factor (1.2 sedentary up to 1.9 athlete) to get TDEE — your true daily burn. To lose ~0.5 kg/week, eat 500 cal below TDEE; to gain lean muscle slowly, eat 500 cal above. Faster rates work short-term but are harder to sustain and risk muscle loss (when cutting) or fat gain (when bulking).",
    ranges: {
      title: 'Calorie targets — what each level usually looks like',
      rows: [
        { label: 'Aggressive cut', range: 'TDEE − 750 to 1000', note: '~1 kg/week loss; only sustainable for short blocks' },
        { label: 'Steady cut', range: 'TDEE − 500', note: '~0.5 kg/week loss; the standard recommendation' },
        { label: 'Mild cut', range: 'TDEE − 250', note: '~0.25 kg/week; minimises muscle loss' },
        { label: 'Maintenance', range: 'TDEE', note: 'Hold current weight; recompute monthly' },
        { label: 'Lean bulk', range: 'TDEE + 250 to 500', note: '~0.25–0.5 kg/week gain; minimises fat gain' },
      ],
    },
    limitations: [
      "TDEE estimates are accurate to about ±10–15%. If you don't lose weight at your calculated 'lose' target after 2–3 weeks, your real TDEE is probably lower than predicted.",
      'Most people under-report food intake by 20–30%. A "1,800 calorie diet" tracked casually is often actually 2,200+. Tighten tracking before cutting calories further.',
      "Doesn't model the metabolic adaptation of long deficits. After 8–12 weeks of dieting, BMR drops 5–15% beyond what weight loss alone would predict — periodic diet breaks help.",
      'For special populations — pregnancy, lactation, eating-disorder recovery, athletes in season — work with a dietitian rather than relying on a generic calculator.',
    ],
    faqs: [
      {
        q: 'How many calories should I eat to lose weight?',
        a: 'A 500 cal/day deficit from your TDEE produces about 0.5 kg (1 lb) of fat loss per week, which is the rate most evidence-based guidelines recommend. Faster rates work but are harder to sustain and risk muscle loss.',
      },
      {
        q: 'Why am I not losing weight at my calculated calorie target?',
        a: 'Three usual reasons: (1) you\'re under-reporting food intake — very common, especially with restaurant meals and oils; (2) your TDEE is at the low end of the ±15% range; (3) you\'ve adapted to the deficit and need a 1–2 week diet break before resuming.',
      },
      {
        q: 'Is 1,200 calories enough for women?',
        a: '1,200 cal/day is the floor most professional bodies recommend for adult women — going below it is hard to sustain and risks micronutrient deficiencies. If your "lose weight" target is below 1,200, eat 1,200 and add steps instead of cutting further.',
      },
      {
        q: 'Should I count calories every day forever?',
        a: 'No. Use tracking to learn what your portions look like — most people only need to track for 4–8 weeks before they can eyeball it. Long-term, a weekly weigh-in and adjustments to portion size beats forever-tracking.',
      },
      {
        q: 'How is this different from the BMR calculator?',
        a: 'The BMR calculator returns just your basal metabolic rate — the calories you burn at rest. This calorie calculator multiplies BMR by your activity level (TDEE) and then offsets it by ±500 cal to give weight-loss and weight-gain targets directly.',
      },
    ],
    seo: {
      title: 'Calorie Calculator — Daily Calories to Lose, Gain or Maintain',
      description:
        'Free daily calorie calculator. See your TDEE, weight-loss target (TDEE − 500), and weight-gain target. Uses Mifflin-St Jeor BMR with 5 activity levels.',
      applicationCategory: 'HealthApplication',
      sources: [
        { label: 'NIH — Body weight planner methodology', url: 'https://www.niddk.nih.gov/bwp' },
        { label: 'Mifflin-St Jeor equation (BMR base)', url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
  },
  {
    slug: 'macro-calculator',
    name: 'Macro Calculator',
    category: 'health',
    icon: 'PieChart',
    description: 'Calculate protein, carbs, and fat ratios.',
    seo: {
      title: 'Macro Calculator: Protein, Carbs & Fat in Grams',
      description: 'Free macro calculator. Convert your daily calorie target into grams of protein, carbs, and fat at any custom split. Donut chart of your macro mix.',
    },
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
    seo: {
      title: 'Body Fat Calculator: U.S. Navy Method',
      description: 'Free body fat percentage calculator using the U.S. Navy circumference method. Just waist, neck, and height — no calipers needed. Includes fitness band.',
    },
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
    seo: {
      title: 'Ideal Weight Calculator: Devine, Robinson & Miller',
      description: 'Free ideal-weight calculator. Compare three classical formulas (Devine, Robinson, Miller) for healthy adult weight given height — useful for fitness goals.',
    },
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
    seo: {
      title: 'Water Intake Calculator: Daily Hydration Goal',
      description: 'Free water intake calculator. Get your daily hydration target in litres, glasses, and ounces — adjusted for body weight and exercise minutes.',
    },
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
    seo: {
      title: 'Pregnancy Due Date Calculator: Weeks Remaining',
      description: 'Free pregnancy due-date calculator. Estimate your baby\'s arrival date, weeks remaining, and current trimester from days since your last period.',
    },
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
    seo: {
      title: 'Ovulation Calculator: Fertile Window by Cycle',
      description: 'Free ovulation calculator. Identify your ovulation day and fertile window for any cycle length. Useful for trying to conceive or natural family planning.',
    },
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
    seo: {
      title: 'Heart Rate Zone Calculator: Max HR, Fat-Burn, Cardio',
      description: 'Free heart rate zone calculator. Get your max heart rate and the BPM ranges for fat-burn (60–70%) and cardio (70–85%) training zones — by age.',
    },
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
    seo: {
      title: 'VO2 Max Calculator: Cooper 12-Minute Run Test',
      description: 'Free VO2 max calculator using the Cooper 12-minute run test. Estimate your aerobic fitness capacity and see how it compares to your age band.',
    },
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
    seo: {
      title: 'Running Pace Calculator: min/km, min/mi & Speed',
      description: 'Free running pace calculator. Convert any distance and time into pace per km, pace per mile, and average speed in km/h. Useful for race planning.',
    },
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
    seo: {
      title: 'One-Rep Max Calculator: Estimate 1RM Safely',
      description: 'Free one-rep max (1RM) calculator. Estimate your true 1RM from any sub-max set and get target weights for 5-rep (85%) and 10-rep (70%) training.',
    },
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
    seo: {
      title: 'Sleep Cycle Calculator: Best Bedtime by Wake Time',
      description: 'Free sleep cycle calculator. Get bedtime suggestions for 4, 5, and 6 sleep cycles so you wake at the end of a cycle, not in the middle.',
    },
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
    seo: {
      title: 'Age Calculator: Exact Years, Months & Days',
      description: 'Free age calculator. Get your exact age in years, total months, and total days from your date of birth — accurate down to the day.',
    },
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
