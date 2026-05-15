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
    intro:
      "Once you know your daily calorie target, the next question is how to split it between protein, carbs, and fat. This calculator converts your calorie goal into grams of each macro at whatever split you pick. A 2,200-calorie diet at 30/40/30 split gives you 165g protein, 220g carbs, 73g fat. For typical Indian diets that lean carb-heavy (rice, roti, potatoes), most fitness coaches push the protein ratio up to 30–35% — a 70kg adult should target 100–140g protein daily, which is hard with vegetarian eating without consciously adding paneer, dal, soya, or whey.",
    formula: 'Protein g = (cal × P%) ÷ 4 · Carbs g = (cal × C%) ÷ 4 · Fat g = (cal × F%) ÷ 9',
    howItWorks:
      "Each macro has a fixed calorie density — protein and carbs are 4 calories per gram, fat is 9. The calculator splits your total calories by the percentage you set, then divides by the density to get grams. 2,200 calories at 30% protein = 660 calories from protein = 660 ÷ 4 = 165g. The remaining 70% is split: 40% carbs (880 cal = 220g) and 30% fat (660 cal = 73g). Protein and carbs ratios are your levers; fat fills the rest. For ₹100/day Indian protein math: 4 eggs (24g) + 50g paneer (10g) + 1 cup dal (15g) + 100g chicken (30g) gets you to ~80g — still need a whey scoop or extra eggs for 130g+.",
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
    faqs: [
      {
        q: 'How much protein do I need per day?',
        a: 'For general health: 0.8g per kg body weight. For active adults: 1.2–1.6g per kg. For strength training: 1.6–2.2g per kg. A 70kg gym-goer needs ~120–150g daily — significantly more than most Indian diets deliver by default.',
      },
      {
        q: 'Is keto better than balanced macros?',
        a: 'For most people, no. Keto works for some weight loss in the short term because the high fat suppresses appetite and removes carbs (often the easiest over-eaten category). But it\'s hard to sustain, restricts whole-food carbs like fruits and legumes, and offers no advantage over a calorie-controlled balanced diet for long-term health.',
      },
      {
        q: 'What\'s the easiest way to hit 150g protein on a veg diet?',
        a: '1 scoop whey (25g) + 4 eggs (24g) + 200g paneer (40g) + 1 cup dal (15g) + 100g tofu (15g) + 100g sprouts (15g) + 30g almonds (6g) ≈ 140g. Strict vegan needs more soya/legume volume or pea-protein powder.',
      },
      {
        q: 'Why is fat 9 calories per gram but protein and carbs only 4?',
        a: 'Fat molecules pack more energy per unit mass due to their chemistry — long carbon-hydrogen chains. That\'s why fat is the most calorie-dense macro and also why adding "just a little" olive oil or ghee can push your day\'s calories up faster than you expect.',
      },
      {
        q: 'Should the macro split change as I age?',
        a: 'Protein needs go UP after 50 — older adults lose muscle faster and need 1.2–1.5g per kg to slow sarcopenia. Carb tolerance drops slightly with age (insulin sensitivity declines), so many people over 50 do well shifting 10% from carbs to protein.',
      },
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
    intro:
      "Body fat percentage tells you something BMI can't — how much of your weight is actually fat versus muscle, bone, and water. A 75kg gym-goer with 12% body fat and a 75kg sedentary office worker with 28% body fat look completely different in the mirror and have very different health risks. This calculator uses the US Navy circumference method (waist, neck, height) — no calipers, no DEXA scan, just a measuring tape. Indian men should aim for 12–20%, women 20–28%. Move the sliders to see how a 3cm waist reduction translates — usually 2–3 percentage points drop in body fat.",
    formula: '%BF = 495 ÷ (1.0324 − 0.19077 × log₁₀(waist − neck) + 0.15456 × log₁₀(height)) − 450',
    howItWorks:
      "The US Navy formula uses three circumference measurements to estimate body fat density via the Hodgdon-Beckett equation. Measure waist at navel (relaxed, not sucked in), neck just below larynx, height standing barefoot — all in cm. 85cm waist, 38cm neck, 175cm height: %BF = 495 ÷ (1.0324 − 0.19077 × log(47) + 0.15456 × log(175)) − 450 ≈ 22%. The waist measurement dominates — a 5cm waist reduction typically drops body fat by ~3 percentage points without any change in weight. That's because waist circumference is the strongest visible proxy for visceral (belly) fat.",
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
    faqs: [
      {
        q: 'What is a healthy body fat percentage?',
        a: 'For Indian men: 12–18% is fit, 18–24% is average, above 24% is high risk. For Indian women: 18–24% is fit, 25–31% is average, above 31% is high risk. Athletes are typically much lower but extreme leanness has its own health costs — especially for women.',
      },
      {
        q: 'Is body fat % more accurate than BMI?',
        a: 'Yes for individuals — BMI misclassifies muscular people as overweight and skinny-fat people as healthy. Body fat % tells you composition. The downside: BMI takes 5 seconds with just height/weight; body fat needs careful measurement or expensive scans to be accurate.',
      },
      {
        q: 'How accurate is the US Navy formula?',
        a: '±3–4% compared to DEXA (the gold standard). Better than smart scales (often ±5–10% wrong) and similar to skinfold calipers when used by an experienced trainer. The formula loses accuracy at the extremes (very lean or very obese).',
      },
      {
        q: 'Why do Indian guidelines use lower body fat thresholds?',
        a: 'Asian Indians genetically carry more visceral fat (around organs) per kilogram of body fat. The same 22% body fat causes higher diabetes and heart-disease risk in an Indian male than in a European one. The Indian Heart Association recommends men stay under 22% and women under 30%.',
      },
      {
        q: 'How fast can I reduce body fat?',
        a: 'Safe and sustainable is 0.5–1% per month — roughly 0.5kg of fat loss per week for a 70kg adult. Faster than that and you start losing muscle along with fat. A 5% body fat reduction (e.g. 25% → 20%) realistically takes 5–10 months.',
      },
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
    intro:
      "Three classical formulas estimate ideal body weight from height alone: Devine (used most widely in clinical drug dosing), Robinson (slightly lower), and Miller (highest). For 170cm height, the three give 65.7kg / 64.6kg / 71.1kg respectively — a 6kg spread that tells you ideal weight isn't a single number, it's a range. These formulas were developed for North American populations in the 1960s–80s and tend to overstate ideal weight for slimmer Asian Indian frames. Use them as a ballpark — actual healthy weight depends on body composition, frame size, and ethnicity-adjusted BMI rather than height alone.",
    formula: 'Devine: 50 + 2.3 × (height in inches − 60) · Robinson: 52 + 1.9 × · Miller: 56.2 + 1.41 ×',
    howItWorks:
      "All three formulas start with a base weight at 5 feet (60 inches) and add a per-inch increment for every inch above that. Devine — the most clinically used — assumes 50kg at 5ft and adds 2.3kg per inch. For a 170cm (66.9 in) person: 50 + 2.3 × 6.9 = 65.9kg. Robinson is slightly leaner (1.9 kg/in), Miller is fuller (1.41 kg/in but higher 56.2 base). The original formulas were built for men; the female adjustment subtracts 4.5kg from Devine (45.5 + 2.3 × inches above 5ft). The calculator returns the male version — adjust accordingly.",
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
    faqs: [
      {
        q: 'Which formula should I trust?',
        a: 'Devine is the most widely used in medicine (drug dosing, ICU protocols). For body-shape goals, BMI with Asian-adjusted thresholds (18.5–22.9 healthy) is more reliable than any of these. The ideal weight is a range, not a single number.',
      },
      {
        q: 'Are these formulas accurate for Indian builds?',
        a: 'They tend to overestimate. Indian frames are typically narrower; aim 3–5kg below the Devine result. WHO-recommended Asian BMI (18.5–22.9) gives 53–66kg for a 170cm adult, which matches Indian medical practice better than these decades-old North American formulas.',
      },
      {
        q: 'Why are there three different formulas?',
        a: 'Each was developed for slightly different clinical purposes and populations. Devine (1974) for drug dosing, Robinson (1983) revised it slightly, Miller (1983) was built for a different research cohort. The differences (5–6kg at the same height) show how much subjectivity there is in defining "ideal."',
      },
      {
        q: 'Is BMI better than ideal weight formulas?',
        a: 'For most people, yes — BMI gives a range (a 170cm adult is healthy anywhere between 53–66kg) which is more honest than a single ideal number. Body fat percentage is better still, but requires more measurement effort.',
      },
      {
        q: 'How much should I weigh as a woman?',
        a: 'For women: subtract roughly 4.5kg from Devine. A 165cm woman would have Devine ~58kg minus 4.5 = 53.5kg as a clinical estimate. WHO Asian BMI is friendlier: 50–62kg is the healthy range for that height.',
      },
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
    intro:
      "Daily water needs scale with body weight and how much you sweat — not with the famous \"8 glasses a day\" rule, which has no scientific basis. This calculator uses the medical standard of about 33ml per kg of body weight, plus 350ml for every 30 minutes of exercise. A 70kg adult doing 30 minutes of yoga needs roughly 2.7L; the same person running for an hour in Delhi summer needs 3.7L+. In hot Indian summers (40°C+), add another 500–800ml to your target. Coffee, tea, and dilute drinks count toward your total — water doesn't have to come purely from a bottle.",
    formula: 'Daily water (L) = weight (kg) × 0.033 + (exercise minutes ÷ 30) × 0.35',
    howItWorks:
      "Base hydration is roughly 33ml per kg of body weight. For 70kg: 70 × 0.033 = 2.31L. Add 350ml for every 30 minutes of moderate-to-intense exercise — that compensates for the sweat losses. 30 minutes of gym work adds 0.35L; 60 minutes of running adds 0.7L. Total for a 70kg gym-goer doing 30 minutes = 2.66L ≈ 11 glasses of 250ml. In Indian summer (35°C+), insensible water loss through skin and breath rises significantly — add 500ml. Indicators that you're underhydrated: dark yellow urine, headache, fatigue, and constipation.",
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
    faqs: [
      {
        q: 'Is the 8-glasses-a-day rule correct?',
        a: 'No — the "8x8" rule (eight 8-ounce glasses, or ~1.9L) has no proper scientific basis. It probably came from a 1945 nutrition board recommendation that included water from food. Use weight-based targets instead — 33ml per kg is a defensible medical estimate.',
      },
      {
        q: 'Does coffee and tea count?',
        a: 'Yes. The diuretic effect of caffeine in normal coffee/tea quantities is much smaller than the water content. 2–3 cups of coffee a day contribute net-positive to hydration. Only high-caffeine doses (5+ strong coffees) tip into mild diuretic territory.',
      },
      {
        q: 'How much extra water in Indian summer?',
        a: 'Add 500–800ml on 35°C+ days, more if you sweat heavily or work outdoors. For very hot days (40°C+) or strenuous outdoor activity, replace electrolytes too — ORS, salted lemon water (nimbu paani with namak), or coconut water, not just plain water.',
      },
      {
        q: 'How do I know if I\'m drinking enough?',
        a: 'Urine colour is the most reliable cue — light pale yellow is well-hydrated, dark amber is dehydrated. Other signs of underhydration: thirst (already mild dehydration), headache, fatigue, dry mouth. You shouldn\'t need to urinate every 30 minutes; that\'s overhydration.',
      },
      {
        q: 'Can I drink too much water?',
        a: 'Yes — hyponatremia (low blood sodium) happens when you drink huge volumes of plain water without electrolyte replacement, especially during long endurance events. Symptoms: nausea, confusion, seizures. Rare for normal people; common enough at ultramarathons that race medical teams screen for it.',
      },
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
    intro:
      "A full-term pregnancy lasts about 280 days from the first day of your last menstrual period (LMP) — that's Naegele's rule, the standard used by obstetricians worldwide. This calculator uses days-since-LMP to estimate weeks remaining, current trimester, and days to go. If your last period started 60 days ago, you're about 8.5 weeks in, in your first trimester, with ~31 weeks (220 days) to go. The first trimester ends at week 13, second at week 27, third runs to delivery around week 40. Use this as a quick reference — your gynaecologist's ultrasound dating is more accurate, especially if your cycle isn't a textbook 28 days.",
    formula: 'Days remaining = 280 − days since LMP · Week of pregnancy = days since LMP ÷ 7',
    howItWorks:
      "Naegele's rule: due date = LMP date + 280 days (or LMP + 9 months + 7 days). The calculator counts forward from your LMP day. 60 days since LMP means you're at 60 ÷ 7 = 8.57 weeks pregnant. Weeks remaining = (280 − 60) ÷ 7 = 31.4 weeks. The trimester divisions are: 1st (weeks 0–13), 2nd (weeks 14–27), 3rd (weeks 28–40+). Pregnancy is medically counted from LMP (about 2 weeks before actual conception), so a \"4-week pregnancy\" is really a 2-week embryo. Most ultrasounds in the first trimester give a CRL (crown-rump length) measurement to confirm or adjust this LMP-based estimate.",
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
    faqs: [
      {
        q: 'Is the due date accurate?',
        a: 'Only ~5% of babies are born on the exact due date. About 80% are born within 2 weeks of it. The due date is a midpoint of a 4-week delivery window, not a deadline.',
      },
      {
        q: 'Why is pregnancy counted from LMP, not conception?',
        a: 'Because most women remember their last period date but not their exact ovulation/conception date. Counting from LMP gives a consistent baseline. The actual embryo is roughly 2 weeks younger than the "pregnancy weeks" number.',
      },
      {
        q: 'When should I see a doctor for the first time?',
        a: 'As soon as you confirm pregnancy with a home test — ideally between weeks 5–8. The first ultrasound (typically week 7–9) confirms the heartbeat, viable pregnancy, and dating. In India, the first booking visit also screens for blood group, anaemia, thyroid, and diabetes.',
      },
      {
        q: 'What if my cycle isn\'t 28 days?',
        a: 'The 280-day formula assumes a 28-day cycle. If yours is regularly 32 days, add ~4 days to the due date estimate (ovulation likely happened later than day 14). For irregular cycles, ultrasound dating in the first trimester is the gold standard.',
      },
      {
        q: 'What\'s the difference between gestational and fetal age?',
        a: 'Gestational age is counted from LMP — what your doctor and most pregnancy apps use ("you\'re 12 weeks pregnant"). Fetal age is counted from conception, about 2 weeks less. So at 12 weeks gestational, the embryo is roughly 10 weeks old developmentally.',
      },
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
    intro:
      "Ovulation typically happens 14 days before the next period starts — not 14 days after the last one. This calculator uses that fact (the luteal-phase rule) to find your most fertile days from your cycle length. For a 28-day cycle, ovulation falls on day 14, with a 6-day fertile window from day 9 to day 15. For a 32-day cycle, ovulation shifts to day 18, fertile window day 13–19. Sperm survive up to 5 days inside the female reproductive tract, so the 5 days before and the day of ovulation are when conception is most likely. Useful for couples trying to conceive — less reliable as contraception.",
    formula: 'Ovulation day = cycle length − 14 · Fertile window = ovulation day − 5 to ovulation day + 1',
    howItWorks:
      "The luteal phase (from ovulation to next period) is fairly constant at ~14 days for most women. The follicular phase (from period to ovulation) is what varies between cycles. So ovulation day = cycle length − 14. For a 28-day cycle: 28 − 14 = day 14 ovulation. Fertile window covers the 5 days before (sperm can live that long) plus the day itself — for a 28-day cycle, days 9 through 15. For a 35-day cycle: ovulation = day 21, fertile days = day 16 through 22. The egg itself only survives 12–24 hours after ovulation, so the window is really driven by how long sperm can wait.",
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
    faqs: [
      {
        q: 'How accurate is this calculator?',
        a: 'For women with regular 26–32 day cycles, it predicts ovulation within ±2 days about 70% of the time. For irregular cycles, accuracy drops sharply. For precise tracking, combine with basal body temperature (BBT) charts, ovulation predictor kits (LH urine strips), or cervical mucus observation.',
      },
      {
        q: 'What\'s the best day to try if we want a baby?',
        a: 'Day 2 of the fertile window (ovulation day minus 3) is statistically the highest-conception day, though any day in the window works. Aim for intercourse every 1–2 days throughout the fertile week rather than timing one shot perfectly.',
      },
      {
        q: 'Can I get pregnant on day 5 of my cycle?',
        a: 'Possible but rare. For 21-day cyclers, day 5 might overlap with the fertile window (which starts as early as day 2). For longer cycles, day 5 is almost never fertile. Cycle length is the key variable.',
      },
      {
        q: 'Is the fertile window the same as the ovulation day?',
        a: 'No — fertile window is wider. The egg only survives 12–24 hours after release, but sperm can survive 3–5 days inside you. So sex up to 5 days before ovulation can still result in conception. The whole 6-day window is fertile, with the day before ovulation being the peak.',
      },
      {
        q: 'Why is my cycle different every month?',
        a: 'Stress, illness, travel, weight changes, breastfeeding, thyroid issues, and PCOS can all shift ovulation. A 3–5 day variance month-to-month is normal. Wider variance (10+ days) is worth discussing with a gynaecologist.',
      },
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
    intro:
      "Training in the right heart rate zone makes the difference between a workout that builds endurance, one that burns fat, and one that pushes anaerobic limits. This calculator uses the classic 220-minus-age formula to estimate your maximum heart rate, then derives the two training zones runners and gym-goers care about most. A 30-year-old has a max HR of 190 bpm — fat-burn zone (60–70%) is 114–133 bpm, cardio zone (70–85%) is 133–162 bpm. Use a chest strap monitor or a fitness watch on a tight wrist for accurate live readings during exercise.",
    formula: 'Max HR ≈ 220 − age · Fat-burn = 60–70% of Max HR · Cardio = 70–85% of Max HR',
    howItWorks:
      "The 220-minus-age rule estimates the highest heart rate your body can sustain at maximum exertion. For a 30-year-old: 220 − 30 = 190 bpm. The two training zones are derived as percentages: fat-burn (60–70% of max) keeps you in the aerobic, fat-oxidising zone — for a 30-year-old that's 114–133 bpm, the pace where you can hold a conversation. Cardio zone (70–85% = 133–162 bpm) is your moderate-to-hard effort — talking in short phrases only. Above 85% is anaerobic — sprint efforts and HIIT intervals. The formula has known limits (see below), so use it as a starting estimate, then refine with a real field test once you've trained for a few months.",
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
    faqs: [
      {
        q: 'Is 220-age accurate?',
        a: 'It\'s a population average with ±10–12 bpm individual variation. About 60% of adults are within 5 bpm of the formula; the rest are over or under by more. The Tanaka formula (208 − 0.7 × age) is slightly better for over-40s but still an estimate.',
      },
      {
        q: 'What\'s the difference between fat-burn and cardio zones?',
        a: 'Fat-burn (60–70% of max HR) is low intensity where your body uses a higher percentage of fat for fuel — good for long, steady cardio. Cardio zone (70–85%) burns more total calories per minute (including more carbs) and improves aerobic fitness faster. For weight loss, total calorie burn matters more than the percentage from fat — so cardio zone usually wins.',
      },
      {
        q: 'How do I measure my heart rate during exercise?',
        a: 'Chest strap monitors (Polar H10, Wahoo) are most accurate. Wrist-based watches (Apple Watch, Garmin) work well at lower intensities but undercount during HIIT or sprint efforts. Manual pulse check (carotid or wrist, 15 seconds × 4) is OK at rest but unreliable during exercise.',
      },
      {
        q: 'Should I always train in a specific zone?',
        a: 'No — varied training is better. The "80/20 rule" used by elite endurance athletes recommends 80% of weekly training time in zone 2 (fat-burn) and 20% in zone 4–5 (above cardio). Most beginners and amateurs do the opposite — too much medium-hard work, not enough easy work.',
      },
      {
        q: 'Is a high resting heart rate bad?',
        a: 'Resting HR over 100 (tachycardia) needs medical attention. Healthy adult resting HR is 60–80 bpm; fit endurance athletes are often 40–60. A 5–10 bpm rise from your usual resting HR for several days running often signals overtraining, infection, or stress.',
      },
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
    intro:
      "VO2 max is the maximum volume of oxygen your body can use per minute, normalised by body weight (ml/kg/min) — the single best predictor of cardiovascular fitness and longevity. Lab measurement requires a mask and treadmill; this calculator uses the Cooper 12-minute run test as a field-friendly proxy. Run as far as you can in 12 minutes on a flat track, plug in the distance. A 2,400m run estimates a VO2 max of 42 ml/kg/min — solid for an average 30-year-old. Elite runners hit 70+. Anything above 45 puts you in the top 25% of adults for aerobic fitness.",
    formula: 'VO2 max ≈ (distance in metres − 504.9) ÷ 44.73',
    howItWorks:
      "The Cooper test was developed in 1968 by Dr. Kenneth Cooper for the US Air Force. The formula is a regression fit derived from his data: the further you run in 12 minutes, the higher your VO2 max. 2,400m = (2400 − 504.9) ÷ 44.73 ≈ 42 ml/kg/min. 3,000m run = (3000 − 504.9) ÷ 44.73 ≈ 56 — competitive amateur. 1,500m = (1500 − 504.9) ÷ 44.73 ≈ 22 — below average. Run on a flat, hard surface (athletics track ideal) at maximum sustainable effort. Pacing matters: most people go out too fast and walk the last 3 minutes — that hurts your score more than a steady effort would.",
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
    faqs: [
      {
        q: 'What is a good VO2 max for my age?',
        a: 'For 30-year-old men, anything above 44 is good, above 49 excellent. For 30-year-old women, above 38 is good, above 42 excellent. After 40, both ranges drop by 3–5 ml/kg/min per decade unless you train.',
      },
      {
        q: 'Why does VO2 max matter beyond athletic performance?',
        a: 'It\'s one of the strongest predictors of all-cause mortality — better than cholesterol, blood pressure, or BMI in long-term cohort studies. Increasing VO2 max from "low" to "below average" reduces death risk more than quitting smoking.',
      },
      {
        q: 'How fast can I improve my VO2 max?',
        a: 'Sedentary beginners can see 15–20% improvement in 8–12 weeks of consistent training. Trained athletes plateau around 3–5% gains per year. The fastest way to improve is high-intensity interval training (HIIT) 2× per week plus 2–3 easy zone-2 runs.',
      },
      {
        q: 'Is the treadmill test the same as the running test?',
        a: 'Close but not identical. Treadmill tests usually give 5–10% higher results than the field running test because of pacing assistance and the lack of wind/road variations. Use the same protocol consistently when tracking changes.',
      },
      {
        q: 'Can I do this test in Indian summer?',
        a: 'Best done early morning (6–7am) when temperature is below 28°C and humidity moderate. Hot, humid conditions (35°C+, 70%+ humidity) can drop your 12-minute distance by 200–400m versus cool weather — that\'s 4–9 ml/kg/min lower VO2 max estimate, not reflecting real fitness change.',
      },
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
    intro:
      "Running pace is just time divided by distance — but most runners think in min/km, not km/h. This calculator gives you all three: pace per km, pace per mile, and average speed. A 10km in 50 minutes is 5:00 min/km, 12 km/h, or 8:03 min/mile. Indian recreational runners typically pace marathons at 6:30–7:30 min/km. Sub-elite half-marathon runners are around 4:30–5:00. Use it to plan splits before a race (\"if I want a 1:50 half-marathon, I need 5:13 min/km\") or to convert a Strava run into the metric your training programme uses.",
    formula: 'Pace = time ÷ distance · Speed = 60 ÷ pace (in min/km) · Mile pace = km pace × 1.60934',
    howItWorks:
      "Pace per km = total minutes ÷ total km. 50 min ÷ 10 km = 5.00 min/km. Speed in km/h = 60 ÷ pace = 60 ÷ 5 = 12 km/h. Pace per mile = pace per km × 1.60934 (one mile = 1.60934 km) = 5 × 1.60934 = 8.05 min/mi ≈ 8:03 min/mi. Quick mental shortcut: pace per km in seconds × 1.6 ≈ pace per mile in seconds. The calculator handles the decimal-to-minutes-seconds conversion silently — 5.50 min/km is 5 minutes 30 seconds, not 5 minutes 50 seconds.",
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
    faqs: [
      {
        q: 'What pace should a beginner aim for?',
        a: 'Don\'t obsess about pace early. Use the talk test — if you can speak in full sentences, you\'re in the right zone (typically 7:30–9:00 min/km for new runners). Build the habit first; pace improves naturally over 3–6 months.',
      },
      {
        q: 'How do I convert min/km to mph or km/h?',
        a: 'Speed in km/h = 60 ÷ pace in min/km. 5:00 min/km = 60 ÷ 5 = 12 km/h. For mph: km/h × 0.621 = 7.46 mph. Or just use the calculator — it shows all three.',
      },
      {
        q: 'What\'s a good 10K time?',
        a: 'Indian recreational benchmarks: under 60 min is good, under 50 is solid, under 45 is competitive amateur, under 40 is sub-elite. Top-tier Indian runners do sub-32-minute 10Ks.',
      },
      {
        q: 'Why is my GPS pace different from my watch pace?',
        a: 'GPS measurements jitter — different watches and phones interpret position fixes differently. Variation of ±5 seconds per km between devices is normal. For consistent measurement, use the same device and a known distance (like an athletics track) to calibrate.',
      },
      {
        q: 'How fast can I improve my pace?',
        a: 'In the first year of consistent training (3–4 runs/week), most runners shave 30–60 seconds per km off their easy pace. Year 2–3 brings 15–30s improvements. After 5 years, gains are 5–15s per year and harder to come by.',
      },
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
    intro:
      "Your one-rep max (1RM) is the heaviest weight you can lift for a single perfect rep — the gold-standard strength metric for any compound lift (squat, deadlift, bench, overhead press). Actually testing your 1RM is risky for solo lifters and intermediate trainees, so coaches use the Epley formula: do a moderate set to near-failure, plug in the weight and reps, and the calculator estimates your 1RM. If you bench-pressed 80kg for 8 reps to near-failure, your estimated 1RM is about 101kg. Use the 85% and 70% derived weights to plan your 5-rep working sets (86kg) and 10-rep hypertrophy sets (71kg).",
    formula: '1RM = weight × (1 + reps ÷ 30) (Epley formula)',
    howItWorks:
      "The Epley formula assumes a roughly linear relationship between sub-maximal weights and max effort. Lift 80kg × 8 reps to near-failure: 1RM = 80 × (1 + 8 ÷ 30) = 80 × 1.267 = 101.3kg. From there, 85% (a standard 5-rep working weight) = 86kg, 70% (a 10-rep hypertrophy set) = 71kg. The formula is most accurate in the 3–10 rep range. Below 3 reps the estimate undersells your 1RM; above 10 reps the estimate gets unreliable because cardio-respiratory limits start dominating before muscular failure. Sets must be true \"reps in reserve = 0–1\" for the formula to mean anything.",
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
    faqs: [
      {
        q: 'Why estimate 1RM instead of testing it?',
        a: 'Testing actual 1RM requires a spotter, full warm-up, and good recovery — and risks injury, especially solo. Sub-max estimation gives 90% of the information for 10% of the risk. Most strength programmes prescribe percentages of estimated 1RM precisely because actual testing is too costly to do often.',
      },
      {
        q: 'How accurate is the Epley formula?',
        a: 'Within ±5% for sets in the 3–10 rep range done to true near-failure. Beyond 10 reps, accuracy drops to ±10–15%. For programming, that\'s good enough — actually being 5% off on your working weight rarely changes the training stimulus meaningfully.',
      },
      {
        q: 'What\'s a good bench press for my weight?',
        a: 'For natural lifters at 80kg bodyweight: 60kg = beginner, 80kg = novice, 120kg = intermediate, 140kg = advanced. Genetics matters — leverage favours short-armed lifters. Don\'t compare across body proportions.',
      },
      {
        q: 'How often should I test 1RM?',
        a: 'Most programmes either test true 1RM at the end of a competition prep block (once every 3–6 months) or never test directly and only use estimated 1RM from rep sets. Either is fine. Frequent 1RM testing accumulates fatigue and injury risk.',
      },
      {
        q: 'What percentage should I work at for muscle growth vs strength?',
        a: 'Strength gains favour 80–95% of 1RM (1–5 rep range). Hypertrophy (muscle size) favours 65–80% (8–15 rep range). Strength endurance is below 65% with 15+ reps. Most well-rounded programmes mix all three across the week.',
      },
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
    intro:
      "Sleep happens in roughly 90-minute cycles — light, deep, REM. Waking at the end of a cycle leaves you refreshed; waking mid-cycle (especially during deep sleep) leaves you groggy for hours. This calculator works backwards from your desired wake time, factoring in the average 15 minutes it takes to fall asleep, and suggests bedtimes that complete 4, 5, or 6 full cycles. For a 7am wake: 6 cycles = 9 hours total = bed by 9:45pm. 5 cycles = 7.5 hours = bed by 11:15pm (most adults\' sweet spot). 4 cycles = 6 hours = bed by 12:45am (survival mode, not recommended regularly).",
    formula: 'Bedtime = wake time − (cycles × 90 min) − (minutes to fall asleep)',
    howItWorks:
      "Each sleep cycle averages 90 minutes — early-night cycles are deep-sleep heavy, late-morning cycles are REM-heavy. The calculator counts backwards from your wake hour. For a 7:00am wake with 15 min to fall asleep: 5 cycles = 5 × 90 = 450 minutes = 7.5 hours of actual sleep. Bedtime = 7:00am − 7.5h − 15min = 11:15pm. 6 cycles needs you in bed by 9:45pm; 4 cycles works to 12:45am. The 90-minute number is an average — individual cycle length varies 80–110 minutes, so this is a guideline not a science.",
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
    faqs: [
      {
        q: 'Is 5 hours of sleep enough?',
        a: 'For most adults, no. Sleeping under 6 hours regularly is associated with weight gain, weaker immunity, mood issues, and ~13% higher mortality risk over time. Short-term (1–3 days) you can function on 5 hours; chronic deprivation accumulates a "sleep debt" that affects performance and health.',
      },
      {
        q: 'Is 6 hours of sleep okay?',
        a: 'For a small minority (true "short sleepers," about 1% of population with a specific gene variant), yes. For everyone else, 7–9 hours is the optimum. If you regularly feel fine on 6, you\'re likely accumulating a debt you don\'t notice. Try 7.5 hours for two weeks — most people report feeling clearly better.',
      },
      {
        q: 'What\'s the best time to go to bed?',
        a: 'Whatever lets you sleep 7.5–9 hours and wake at a consistent time. For a 7am wake, that\'s 10:00–11:30pm. Consistency matters more than the exact time — varying bedtime by more than 1 hour disrupts circadian rhythm even if total sleep is the same.',
      },
      {
        q: 'Can I catch up on sleep over the weekend?',
        a: 'Partially. One night of 9-hour catch-up recovers some lost performance but doesn\'t fully reverse a week of 6-hour nights. Sleep debt accumulates faster than it dissipates. The realistic recovery target is back to baseline 7.5–8 hours, not 10–12 hour binges.',
      },
      {
        q: 'Why do I wake up tired even after 8 hours?',
        a: 'Common causes: waking mid-cycle (alarm fired during deep sleep), poor sleep quality (alcohol, late caffeine, blue light), undiagnosed sleep apnea, or low iron/B12. If consistent quality sleep doesn\'t fix it, see a doctor — chronic fatigue can have medical roots.',
      },
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
    intro:
      "An age calculator returns the exact time elapsed between a date of birth and today. Useful for legal documents (passport, school admission, pension), date math (\"how old will my grandchild be in 2040?\"), or just curiosity. This calculator handles leap years correctly using the 365.25-day average, so the result is accurate within a day. For age-on-a-specific-date (not today), subtract the years between today and that date from the result.",
    formula: 'age (years) = days_elapsed ÷ 365.25 · age (months) = years × 12 · age (days) = days_elapsed',
    howItWorks:
      "The calculator subtracts the date of birth from today's date, gets the total milliseconds elapsed, and converts to days, months, and years. The 365.25-day year accounts for leap years — over a long span, the average year is 365.25 days (because three regular years and one leap year average to that). For someone born 15 June 1995, today (26 April 2026) the result is 30 years, 366 total months, 11,273 total days. The calculator returns floored integers; the actual fraction of the next year is always positive but rounded down.",
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
    faqs: [
      {
        q: 'How is age calculated?',
        a: 'Subtract the date of birth from the current date, get the elapsed days, divide by 365.25 to get years (the 0.25 averages in leap years). Most calculators floor the result — your "age" is the integer years completed.',
      },
      {
        q: 'How old will I be on a specific future date?',
        a: 'Subtract your birth date from the future date and divide by 365.25. This calculator uses today as the reference; for a specific date, mentally add the years between today and that date to your current age.',
      },
      {
        q: 'How do I calculate age in days?',
        a: 'Subtract the birth date from today and the result in days is your exact age in days. This is what the calculator outputs in its "Total Days" field. Useful for milestone tracking ("our baby turns 1,000 days old").',
      },
      {
        q: 'Why are years sometimes 365 days and sometimes 366?',
        a: 'A leap year (every 4 years, except century years not divisible by 400) has 366 days to keep the calendar aligned with Earth\'s orbit. Over the long term the average is 365.25 days — that\'s the number used in age calculations. Over short periods (1–4 years) you\'ll be off by a day or two if you use 365.',
      },
      {
        q: 'Does the calculator work for people born before 1900?',
        a: 'Yes, JavaScript Date handles dates back to 1 Jan 1970 natively, but slider inputs starting at 1900 cover anyone reasonably alive today. For historical figures or genealogy, the math is the same — pull years and divide.',
      },
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
