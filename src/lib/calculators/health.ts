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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Common macro splits and what they suit',
      rows: [
        { label: 'Balanced (general health)', range: '20P / 50C / 30F', note: 'Default if you have no specific goal' },
        { label: 'High protein (fat loss + muscle)', range: '35P / 35C / 30F', note: 'Standard cutting split — gym-goers' },
        { label: 'Lean bulk (muscle gain)', range: '25P / 55C / 20F', note: 'Carbs fuel training volume' },
        { label: 'Low-carb / keto', range: '20P / 10C / 70F', note: 'Tight discipline needed; not for everyone' },
        { label: 'Endurance athlete', range: '15P / 60C / 25F', note: 'Marathon, cycling training blocks' },
      ],
    },
    limitations: [
      "Macro percentages don't tell you food quality — 200g carbs from oats and basmati rice is very different from the same grams from sugar and maida. Aim for whole, minimally processed sources first.",
      "Doesn't model fibre, micronutrients, or hydration. Hitting macros while ignoring vegetables and water can still produce poor health outcomes — macros are one input, not the whole picture.",
      'Calorie densities of 4/4/9 are approximate. Alcohol is 7 cal/g and isn\'t in the formula at all — heavy drinkers underestimate intake.',
      'Indian vegetarian diets struggle to hit 30%+ protein without intentional addition of dal, paneer, eggs (if ovo-veg), soya, or whey supplementation.',
    ],
    seo: {
      title: 'Macro Calculator: Protein, Carbs & Fat in Grams',
      description: 'Free macro calculator. Convert your daily calorie target into grams of protein, carbs, and fat at any custom split. Donut chart of your macro mix.',
      applicationCategory: 'HealthApplication',
      sources: [
        { label: 'WHO — protein and amino acid requirements', url: 'https://www.who.int/' },
        { label: 'ICMR — Nutrient Requirements for Indians (RDA)', url: 'https://www.icmr.gov.in/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Body fat ranges by category (adults; Indian context)',
      rows: [
        { label: 'Essential fat (men / women)', range: '2–5% / 10–13%', note: 'Below this is dangerous for organ function' },
        { label: 'Athletes (men / women)', range: '6–13% / 14–20%', note: 'Visible abs, defined musculature' },
        { label: 'Fitness (men / women)', range: '14–17% / 21–24%', note: 'Lean, visible muscle tone' },
        { label: 'Average (men / women)', range: '18–24% / 25–31%', note: 'General population' },
        { label: 'Obese (men / women)', range: '25%+ / 32%+', note: 'Higher cardiovascular risk' },
        { label: 'Asian Indian thresholds', range: '−2% from above', note: 'Higher visceral fat at same %BF — be stricter' },
      ],
    },
    limitations: [
      'The Navy formula is an estimate — accuracy is ±3–4% versus DEXA gold standard. For precise tracking, use the same method consistently rather than comparing across methods.',
      "Doesn't distinguish subcutaneous from visceral fat. Two people can have the same body fat % with very different metabolic risk — the dangerous fat is the visceral kind around organs.",
      'Measurement consistency matters. 1cm error on waist = ~1% body fat error. Measure at the same spot, same time of day (morning is best, before food and water).',
      'Asian Indians carry more visceral fat at the same body fat % than Caucasians. The Indian health guidelines are stricter — aim 2–3% lower than the general thresholds.',
    ],
    seo: {
      title: 'Body Fat Calculator: U.S. Navy Method',
      description: 'Free body fat percentage calculator using the U.S. Navy circumference method. Just waist, neck, and height — no calipers needed. Includes fitness band.',
      applicationCategory: 'HealthApplication',
      sources: [
        { label: 'WHO — Asian population BMI cutoffs', url: 'https://www.who.int/' },
        { label: 'US Navy — body composition assessment', url: 'https://www.navy.mil/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Indicative healthy weight ranges by height (Indian BMI 18.5–22.9)',
      rows: [
        { label: '150 cm (4\'11")', range: '42 – 51 kg', note: 'Asian healthy BMI: 18.5–22.9' },
        { label: '160 cm (5\'3")', range: '47 – 58 kg', note: '' },
        { label: '165 cm (5\'5")', range: '50 – 62 kg', note: '' },
        { label: '170 cm (5\'7")', range: '53 – 66 kg', note: 'Devine returns ~66kg — top of healthy range' },
        { label: '175 cm (5\'9")', range: '56 – 70 kg', note: '' },
        { label: '180 cm (5\'11")', range: '60 – 74 kg', note: '' },
        { label: '185 cm (6\'1")', range: '63 – 78 kg', note: '' },
      ],
    },
    limitations: [
      "These formulas don't account for body composition. A bodybuilder at 175cm weighing 85kg has nothing wrong with him; an office worker at 175cm and 65kg with 30% body fat is unhealthier by any real metric.",
      "Built for North American populations in the 1960s–80s. For Indian frames (typically narrower bone structure), the formulas overestimate — aim 3–5kg below the Devine number.",
      "Doesn't distinguish men from women in the output (this calculator returns the male formula). Subtract roughly 4.5kg for a female-adjusted Devine estimate.",
      'WHO Asian BMI thresholds (18.5–22.9 healthy, 23–24.9 overweight) are stricter than the US range — use those for a more reliable target than these classical formulas.',
    ],
    seo: {
      title: 'Ideal Weight Calculator: Devine, Robinson & Miller',
      description: 'Free ideal-weight calculator. Compare three classical formulas (Devine, Robinson, Miller) for healthy adult weight given height — useful for fitness goals.',
      applicationCategory: 'HealthApplication',
      sources: [
        { label: 'WHO — Asian BMI classification', url: 'https://www.who.int/' },
        { label: 'ICMR — Indian nutrition guidelines', url: 'https://www.icmr.gov.in/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Daily water need by weight + activity (adjust +500ml for hot weather)',
      rows: [
        { label: '50 kg · sedentary', range: '1.7 L (7 glasses)', note: 'Minimum baseline' },
        { label: '70 kg · sedentary', range: '2.3 L (9 glasses)', note: '' },
        { label: '70 kg · 30 min exercise', range: '2.7 L (11 glasses)', note: '' },
        { label: '70 kg · 60 min exercise', range: '3.0 L (12 glasses)', note: '' },
        { label: '90 kg · 60 min exercise', range: '3.7 L (15 glasses)', note: 'Add 500ml for 40°C+ days' },
        { label: 'Pregnancy / breastfeeding', range: '+300–500 ml', note: 'Above baseline' },
        { label: 'Indian summer (40°C+)', range: '+500–800 ml', note: 'Replace via plain water + ORS for heavy sweaters' },
      ],
    },
    limitations: [
      'The 33ml/kg formula is a general guideline — actual needs vary with humidity, fever, illness, alcohol intake, and individual kidney function.',
      'Doesn\'t account for sodium loss in sweat. Heavy sweaters in heat (loose-fitting summer sports, manual labour) need electrolyte replacement (ORS, salted lemon water), not just plain water — drinking only water can lead to hyponatremia.',
      "Doesn't model fluid from food. About 20–30% of daily hydration comes from food — fruits like watermelon, cucumber, and tomato are 90%+ water. Cut roughly 0.5L if you eat a fruit-and-vegetable-rich diet.',",
      "Older adults and people with kidney/heart conditions need to be careful with high water intake — over-hydration is a real risk for them. Always check with a doctor if you have these conditions.",
    ],
    seo: {
      title: 'Water Intake Calculator: Daily Hydration Goal',
      description: 'Free water intake calculator. Get your daily hydration target in litres, glasses, and ounces — adjusted for body weight and exercise minutes.',
      applicationCategory: 'HealthApplication',
      sources: [
        { label: 'WHO — drinking-water quality and intake', url: 'https://www.who.int/' },
        { label: 'NIH — daily water intake recommendations', url: 'https://www.nih.gov/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Pregnancy milestones by week',
      rows: [
        { label: 'Weeks 1–13 (1st trimester)', range: 'Embryo to early fetus', note: 'Major organ development; nausea peaks ~weeks 6–10' },
        { label: 'Weeks 14–27 (2nd trimester)', range: 'Fetal growth, movement', note: 'Anomaly scan around week 20' },
        { label: 'Weeks 28–40 (3rd trimester)', range: 'Lung maturation, weight gain', note: 'Glucose tolerance test around week 24–28' },
        { label: 'Week 37–42 (term)', range: 'Full-term delivery', note: '~90% of babies arrive in this window' },
        { label: 'Before 37 (preterm)', range: '~12% of Indian deliveries', note: 'NICU support may be needed' },
        { label: 'After 42 (postterm)', range: '<5% — induction usually planned', note: 'Placenta function declines past 42 weeks' },
      ],
    },
    limitations: [
      'Assumes a textbook 28-day cycle with ovulation at day 14. If your cycles are 30+ or 25 days, the due date shifts by 2–4 days. Ultrasound dating in the first trimester is more reliable.',
      "Doesn't account for known conception date (IVF, ovulation tracking) — for those, count 266 days from conception, not 280 from LMP.",
      "Doesn't predict labour onset — only 5% of babies arrive on the exact due date. ±2 weeks around 40 is normal.",
      'Not medical advice. All pregnancy care should be guided by your obstetrician — this calculator is for planning and quick reference only.',
    ],
    seo: {
      title: 'Pregnancy Due Date Calculator: Weeks Remaining',
      description: 'Free pregnancy due-date calculator. Estimate your baby\'s arrival date, weeks remaining, and current trimester from days since your last period.',
      applicationCategory: 'HealthApplication',
      sources: [
        { label: 'WHO — antenatal care recommendations', url: 'https://www.who.int/' },
        { label: 'NHM India — maternal health programmes', url: 'https://nhm.gov.in/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Fertile window by cycle length',
      rows: [
        { label: '21-day cycle', range: 'Ovulation day 7 · Fertile day 2–8', note: 'Short cycle — fertile window starts during period' },
        { label: '24-day cycle', range: 'Ovulation day 10 · Fertile day 5–11', note: '' },
        { label: '28-day cycle (textbook)', range: 'Ovulation day 14 · Fertile day 9–15', note: 'Standard reference' },
        { label: '30-day cycle', range: 'Ovulation day 16 · Fertile day 11–17', note: '' },
        { label: '32-day cycle', range: 'Ovulation day 18 · Fertile day 13–19', note: '' },
        { label: '35-day cycle', range: 'Ovulation day 21 · Fertile day 16–22', note: 'Long cycle — common in PCOS' },
      ],
    },
    limitations: [
      "Assumes a regular cycle. PCOS, thyroid issues, breastfeeding, stress, or weight changes can shift or eliminate ovulation for cycles at a time — this calculator can't predict those.",
      "The 14-day luteal phase rule is an average. Individual luteal phases vary from 11–16 days; only basal body temperature charting or progesterone tests reveal yours.",
      'Not reliable as contraception. Even with perfect tracking, the calendar method has a ~25% failure rate over a year. For contraception use barrier methods, IUDs, or hormonal options.',
      "Doesn't account for ovulation-suppressing factors — hormonal birth control, perimenopause, postpartum recovery, eating disorders, or extreme athletic training.",
    ],
    seo: {
      title: 'Ovulation Calculator: Fertile Window by Cycle',
      description: 'Free ovulation calculator. Identify your ovulation day and fertile window for any cycle length. Useful for trying to conceive or natural family planning.',
      applicationCategory: 'HealthApplication',
      sources: [
        { label: 'WHO — reproductive health information', url: 'https://www.who.int/' },
        { label: 'ACOG — clinical guidance on fertility tracking', url: 'https://www.acog.org/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Heart-rate zones for common ages (220-age method)',
      rows: [
        { label: 'Age 20 (max 200)', range: 'Fat-burn 120–140 · Cardio 140–170', note: '' },
        { label: 'Age 30 (max 190)', range: 'Fat-burn 114–133 · Cardio 133–162', note: '' },
        { label: 'Age 40 (max 180)', range: 'Fat-burn 108–126 · Cardio 126–153', note: '' },
        { label: 'Age 50 (max 170)', range: 'Fat-burn 102–119 · Cardio 119–145', note: '' },
        { label: 'Age 60 (max 160)', range: 'Fat-burn 96–112 · Cardio 112–136', note: '' },
        { label: 'Age 70 (max 150)', range: 'Fat-burn 90–105 · Cardio 105–128', note: '' },
      ],
    },
    limitations: [
      'The 220-age formula has a standard error of ±10–12 bpm — about 10–15% of people will have a max HR meaningfully different from the formula. For a true value, do a supervised graded exercise test or use the Tanaka formula (208 − 0.7 × age) which is slightly more accurate for over-40s.',
      'Heart rate at any given pace depends on hydration, sleep, caffeine, stress, temperature, and altitude. Don\'t panic if your HR is 10 bpm higher than usual on a hot day or after a bad night.',
      'For people on beta-blockers or with chronic atrial fibrillation, heart rate is not a reliable training intensity guide — use perceived exertion (1–10 scale) instead.',
      "Doesn't replace medical advice for cardiovascular conditions. If you have heart disease, hypertension, or are over 50 starting exercise, get cleared by a doctor before training in the higher zones.",
    ],
    seo: {
      title: 'Heart Rate Zone Calculator: Max HR, Fat-Burn, Cardio',
      description: 'Free heart rate zone calculator. Get your max heart rate and the BPM ranges for fat-burn (60–70%) and cardio (70–85%) training zones — by age.',
      applicationCategory: 'HealthApplication',
      sources: [
        { label: 'American Heart Association — target HR zones', url: 'https://www.heart.org/' },
        { label: 'WHO — physical activity guidelines', url: 'https://www.who.int/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'VO2 max ranges by age and sex (ml/kg/min)',
      rows: [
        { label: 'Men 20–29', range: '< 32 poor · 38–47 avg · 52+ excellent', note: '' },
        { label: 'Men 30–39', range: '< 31 poor · 36–44 avg · 49+ excellent', note: '' },
        { label: 'Men 40–49', range: '< 28 poor · 34–41 avg · 46+ excellent', note: '' },
        { label: 'Women 20–29', range: '< 27 poor · 33–41 avg · 45+ excellent', note: '' },
        { label: 'Women 30–39', range: '< 25 poor · 31–38 avg · 42+ excellent', note: '' },
        { label: 'Women 40–49', range: '< 24 poor · 28–35 avg · 39+ excellent', note: '' },
        { label: 'Elite endurance athletes', range: '70–90 ml/kg/min', note: 'Tour de France cyclists, Olympic 10k runners' },
      ],
    },
    limitations: [
      'The Cooper test is an estimate — accuracy is ±10% versus lab measurement. Pacing skill, motivation, weather, and recent training all affect the result.',
      'Not safe for unconditioned beginners. The test requires running at near-max effort for 12 minutes. Get medical clearance if you have heart disease, hypertension, or are over 40 starting structured exercise.',
      "Doesn't account for environmental factors. Heat, altitude (above 1,500m), and humidity all reduce running performance — and therefore the Cooper estimate.",
      'Walk-run pacing reduces accuracy. The formula assumes steady running, not interval walking. If you can\'t run the full 12 minutes, use a different fitness test (e.g. 1-mile walk test).',
    ],
    seo: {
      title: 'VO2 Max Calculator: Cooper 12-Minute Run Test',
      description: 'Free VO2 max calculator using the Cooper 12-minute run test. Estimate your aerobic fitness capacity and see how it compares to your age band.',
      applicationCategory: 'HealthApplication',
      sources: [
        { label: 'American College of Sports Medicine — guidelines', url: 'https://www.acsm.org/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Recreational and competitive paces (min/km)',
      rows: [
        { label: 'Beginner / walking jog', range: '8:00 – 10:00 min/km', note: '6–8 km/h' },
        { label: 'Casual recreational runner', range: '6:00 – 8:00 min/km', note: '7.5–10 km/h' },
        { label: 'Trained amateur', range: '4:30 – 6:00 min/km', note: '10–13 km/h' },
        { label: 'Sub-elite (India top-tier)', range: '3:30 – 4:30 min/km', note: '13–17 km/h' },
        { label: 'Elite marathon (world class)', range: '2:55 – 3:15 min/km', note: '~20 km/h for 42 km' },
        { label: 'Sub-3-hour marathon target', range: '4:15 min/km steady', note: '~14 km/h average' },
        { label: 'Sub-2-hour half-marathon target', range: '5:40 min/km steady', note: '~10.6 km/h average' },
      ],
    },
    limitations: [
      "Doesn't model elevation. A flat 5:00 pace becomes a 6:30+ effort on a 5% hill, but you may run it in the same total time. Pace alone is a poor effort indicator on hilly terrain.",
      "Doesn't model heat or humidity. Indian summers (35°C+, 70%+ humidity) can slow you by 30–60 seconds per km even at the same heart rate effort.",
      'Average pace hides positive/negative splits. Running the first half too fast and crashing in the second half can produce the same average as a steady run but feels (and races) very differently.',
      "Doesn't help with track interval training paces — those need lap time × 4 or interval-specific tools.",
    ],
    seo: {
      title: 'Running Pace Calculator: min/km, min/mi & Speed',
      description: 'Free running pace calculator. Convert any distance and time into pace per km, pace per mile, and average speed in km/h. Useful for race planning.',
      applicationCategory: 'HealthApplication',
      sources: [
        { label: 'World Athletics — running data and standards', url: 'https://worldathletics.org/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Strength benchmarks for natural lifters by experience (bodyweight × multiplier)',
      rows: [
        { label: 'Beginner (< 1 year)', range: 'Squat 1.0× · Bench 0.75× · Deadlift 1.25× BW', note: '~80kg adult: 80/60/100' },
        { label: 'Novice (1–2 years)', range: 'Squat 1.5× · Bench 1.0× · Deadlift 1.75× BW', note: '120/80/140' },
        { label: 'Intermediate (3–5 years)', range: 'Squat 2.0× · Bench 1.5× · Deadlift 2.25× BW', note: '160/120/180' },
        { label: 'Advanced (5+ years natural)', range: 'Squat 2.5× · Bench 1.75× · Deadlift 2.75× BW', note: '200/140/220' },
        { label: 'Elite competitive', range: 'Squat 3.0×+ · Bench 2.0×+ · Deadlift 3.0×+ BW', note: 'Powerlifting meet level' },
      ],
    },
    limitations: [
      "Most accurate in the 3–10 rep range. Sets of 15+ reps don't reliably predict 1RM because muscular endurance differs from strength.",
      "Assumes the rep set was taken to near-failure (RIR 0–1). If you stopped with 3+ reps in the tank, the 1RM estimate is meaningfully underestimated.",
      "Doesn't account for lift type — Epley works well for compound barbell lifts, less well for isolation exercises like biceps curls (form fails faster than muscle).",
      'Form must be consistent. Cheat reps, partial reps, or breaking technique on the last reps inflate the input number and the 1RM estimate beyond what you can actually lift cleanly.',
    ],
    seo: {
      title: 'One-Rep Max Calculator: Estimate 1RM Safely',
      description: 'Free one-rep max (1RM) calculator. Estimate your true 1RM from any sub-max set and get target weights for 5-rep (85%) and 10-rep (70%) training.',
      applicationCategory: 'HealthApplication',
      sources: [
        { label: 'NSCA — strength training research and standards', url: 'https://www.nsca.com/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Sleep duration by age (National Sleep Foundation)',
      rows: [
        { label: 'Newborn (0–3 months)', range: '14–17 hours', note: 'Distributed across day' },
        { label: 'Toddler (1–2 years)', range: '11–14 hours', note: 'Including naps' },
        { label: 'School age (6–13 years)', range: '9–11 hours', note: 'Crucial for growth' },
        { label: 'Teen (14–17 years)', range: '8–10 hours', note: 'Often skipped, hurts academic performance' },
        { label: 'Adult (18–64 years)', range: '7–9 hours', note: '5 sleep cycles = 7.5 hours is the sweet spot' },
        { label: 'Older adult (65+)', range: '7–8 hours', note: 'Often broken into earlier sleep + nap' },
      ],
    },
    limitations: [
      'The 90-minute cycle is an average. Individual cycles range 80–110 minutes; only sleep-lab tracking shows your true cycle length.',
      'Sleep architecture changes through the night. Early cycles have more deep sleep, later cycles have more REM. Sleep length matters more than cycle alignment for most people.',
      "Doesn't model sleep latency variability — if you take 45 minutes to fall asleep some nights, the bedtime suggestion is too late. Adjust for your actual average.",
      'Stress, caffeine, alcohol, screen time, and irregular schedules all disrupt cycles. Hitting the right bedtime doesn\'t guarantee quality sleep.',
    ],
    seo: {
      title: 'Sleep Cycle Calculator: Best Bedtime by Wake Time',
      description: 'Free sleep cycle calculator. Get bedtime suggestions for 4, 5, and 6 sleep cycles so you wake at the end of a cycle, not in the middle.',
      applicationCategory: 'HealthApplication',
      sources: [
        { label: 'National Sleep Foundation — sleep duration guidelines', url: 'https://www.thensf.org/' },
        { label: 'CDC — sleep and chronic disease', url: 'https://www.cdc.gov/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'health',
    icon: 'Cake',
    description: 'Calculate your exact age in years, total months, and total days from any date of birth — accurate down to the day.',
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
    ranges: {
      title: 'Age milestones in India (legal & social)',
      rows: [
        { label: '14', range: 'End of compulsory education (Article 21A)', note: 'Free education to 14' },
        { label: '15', range: 'Minimum employment age', note: 'With restrictions; 18 for hazardous work' },
        { label: '18', range: 'Voting age', note: 'Also marriage age for females; criminal majority' },
        { label: '21', range: 'Marriage age (males)', note: 'Drinking age in most states' },
        { label: '25', range: 'Eligible for Lok Sabha contest', note: 'Plus state assembly' },
        { label: '30', range: 'Eligible for Rajya Sabha contest', note: 'Upper house of Parliament' },
        { label: '60', range: 'Senior citizen status', note: 'Tax benefits, FD rate premium, fare concessions' },
        { label: '80', range: 'Super senior citizen', note: 'Additional tax exemptions' },
      ],
    },
    limitations: [
      "Calculator uses today's system date. For age on a specific past or future date, you'd need to enter that as the reference (most age calculators don't expose this — use a date difference calculator instead).",
      "Years are calculated using 365.25 days/year — accurate for most purposes but off by a day or two for very specific date arithmetic. For exact day-count, use the day-count output rather than computing from years.",
      'For pets, plants, or non-human ages, this calculator works but the "age milestones" table is human-specific.',
      "Doesn't handle the leap-day birthday edge case (29 February). Such people are typically considered to age on 28 Feb in non-leap years for legal purposes.",
    ],
    seo: {
      title: 'Age Calculator: Exact Years, Months & Days',
      description: 'Free age calculator. Get your exact age in years, total months, and total days from your date of birth — accurate down to the day.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
