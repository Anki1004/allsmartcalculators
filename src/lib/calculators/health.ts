import { CalculatorConfig } from '../calculator-types';

export const healthCalculators: CalculatorConfig[] = [
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'health',
    icon: 'Activity',
    description: 'Calculate your Body Mass Index.',
    longDescription: 'BMI (Body Mass Index) gives you a quick reference point for where your weight falls relative to your height. It\'s useful as a rough population-level screening tool, but it can\'t distinguish muscle from fat or account for where fat is distributed — two people with identical BMIs can have very different health profiles. Use it alongside waist circumference and body fat percentage for a more complete picture.',
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
    formula: 'BMI = Weight (kg) ÷ Height² (m²)',
    faqs: [
      { q: 'What are the BMI categories?', a: 'Below 18.5 = Underweight. 18.5-24.9 = Normal/Healthy weight. 25-29.9 = Overweight. 30+ = Obese (Class I: 30-34.9, Class II: 35-39.9, Class III: 40+). These are WHO classifications used globally.' },
      { q: 'Why can BMI be misleading for athletes?', a: 'BMI doesn\'t differentiate between muscle and fat. Athletes with significant muscle mass often have BMIs in the "overweight" range despite having low body fat and excellent metabolic health. Conversely, a "normal" BMI with low muscle mass and high fat (skinny fat) can be riskier than it appears.' },
      { q: 'Is BMI accurate for all ethnicities?', a: 'Research shows that people of South Asian, East Asian, and Hispanic descent develop metabolic disease at lower BMI values than white Europeans. Many health organizations use different thresholds for Asian populations — e.g., 23 (not 25) as the overweight threshold.' },
      { q: 'What should I do if my BMI indicates I\'m overweight?', a: 'Don\'t panic — BMI is a screening tool, not a diagnosis. Check your waist circumference (target: below 35 in for women, 40 in for men) and consider measuring body fat percentage. These give more actionable information. If both BMI and waist circumference are elevated, speaking with a doctor is worthwhile.' },
    ],
  },
  {
    slug: 'bmr-calculator',
    name: 'BMR Calculator',
    category: 'health',
    icon: 'Flame',
    description: 'Basal Metabolic Rate — calories at rest.',
    longDescription: 'Your Basal Metabolic Rate is the number of calories your body burns doing absolutely nothing — just keeping your heart beating, lungs breathing, and cells functioning. It\'s typically 60-70% of your total daily calorie burn, making it the foundation of any nutrition or weight management strategy. This calculator uses the Mifflin-St Jeor equation, considered the most accurate standard formula for most adults.',
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
    formula: 'BMR = 10×W + 6.25×H - 5×A + 5 (Mifflin-St Jeor)',
    faqs: [
      { q: 'What is the difference between BMR and TDEE?', a: 'BMR is the calories you burn at complete rest. TDEE (Total Daily Energy Expenditure) is BMR multiplied by an activity factor — accounting for exercise and daily movement. Your TDEE is what you should match your calorie intake to for weight maintenance.' },
      { q: 'Why does BMR decrease with age?', a: 'Lean muscle mass naturally declines with age (a process called sarcopenia) and muscle tissue burns more calories at rest than fat. This is why BMR decreases roughly 1-2% per decade after age 30. Resistance training is the most effective way to slow this decline by preserving muscle mass.' },
      { q: 'How accurate are BMR formulas?', a: 'The Mifflin-St Jeor equation is accurate within ±10% for most people. Individual variation is real — genetics, body composition, thyroid function, and medications all affect actual metabolic rate. Treat the calculator output as a calibration starting point, not an exact measurement.' },
      { q: 'Can I increase my BMR?', a: 'Yes, primarily through building muscle mass via resistance training. Muscle tissue has a higher resting metabolic rate than fat. Even a modest 5-10 lb increase in lean muscle can raise BMR by 50-100 calories/day — adding up to 18,000-36,000 calories over a year.' },
    ],
  },
  {
    slug: 'calorie-calculator',
    name: 'Calorie Calculator',
    category: 'health',
    icon: 'Apple',
    description: 'Daily calorie needs for your goals.',
    longDescription: 'Calories in vs. calories out is the fundamental equation of body weight. But how many calories do you actually need? It depends on your body size, age, and how active you genuinely are — not how active you\'d like to be. This calculator gives you three targets: maintenance (your break-even), a 500-calorie deficit for gradual fat loss, and a 500-calorie surplus for muscle gain.',
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
    faqs: [
      { q: 'What do the 5 activity levels mean?', a: '1 = Sedentary (desk job, little exercise), 2 = Lightly active (light exercise 1-3 days/week), 3 = Moderately active (moderate exercise 3-5 days/week), 4 = Very active (hard exercise 6-7 days/week), 5 = Extremely active (twice-daily training or physical labor job).' },
      { q: 'Is a 500-calorie deficit safe for weight loss?', a: 'Yes — a 500 cal/day deficit theoretically produces about 1 lb of fat loss per week (since 3,500 cal ≈ 1 lb). Larger deficits cause faster initial weight loss but lead to muscle loss, hunger, and metabolic adaptation. 300-500 cal deficit is the sustainable sweet spot for most people.' },
      { q: 'Why isn\'t the calorie count working for me?', a: 'Food tracking errors are the most common cause — studies show people underestimate calorie intake by 20-40% on average. Liquid calories (juice, alcohol, coffee drinks), cooking oils, and condiments are frequently missed. Try accurately tracking for 2 weeks before adjusting your target.' },
      { q: 'Do I need to count calories forever?', a: 'No. Calorie counting is a learning tool. Most people use it for a few months to understand portion sizes and food composition, then transition to intuitive eating informed by that knowledge. Some people find ongoing tracking helpful for maintenance — both approaches work.' },
    ],
  },
  {
    slug: 'macro-calculator',
    name: 'Macro Calculator',
    category: 'health',
    icon: 'PieChart',
    description: 'Calculate protein, carbs, and fat ratios.',
    longDescription: 'Once you know your calorie target, the next question is how to distribute those calories across protein, carbohydrates, and fat. This macro calculator translates your calorie goal and preferred macro split into daily gram targets for each macronutrient — making meal planning concrete and actionable rather than abstract.',
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
    formula: 'Protein & Carbs = cal × % ÷ 4 | Fat = cal × % ÷ 9',
    faqs: [
      { q: 'How many grams of protein do I need per day?', a: 'For muscle maintenance and general health, 0.7-1g per pound (1.6-2.2g per kg) of body weight is widely recommended for active adults. Sedentary individuals need less (0.36g/lb). Higher protein intakes support better body composition by preserving muscle during fat loss.' },
      { q: 'What is a good starting macro split?', a: 'A balanced starting point for most people: 30% protein, 40% carbs, 30% fat. For fat loss, shift toward higher protein (35-40%). For endurance athletes, increase carbs to 50-60%. For ketogenic diets, fat goes to 65-75% with very low carbs (5-10%).' },
      { q: 'Are all calories equal regardless of macro source?', a: 'A calorie is a unit of energy, so technically yes. But protein and carbs both provide 4 cal/g, while fat provides 9 cal/g, and fiber-rich carbs affect satiety differently. Protein is the most satiating macronutrient, which is why higher-protein diets tend to result in fewer total calories consumed.' },
    ],
  },
  {
    slug: 'body-fat-calculator',
    name: 'Body Fat %',
    category: 'health',
    icon: 'Heart',
    description: 'Estimate body fat percentage.',
    longDescription: 'Body fat percentage is a far more meaningful health metric than weight alone. Two people with identical weight and height can have 10-15% different body fat — one in athlete range, one in the obese range. This calculator uses the US Navy tape-measure method (waist, neck, and height), which studies show is accurate to within ±3-4% when measured carefully.',
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
    formula: 'US Navy Method: % = 495 / (1.0324 - 0.19077×log(waist−neck) + 0.15456×log(height)) − 450',
    faqs: [
      { q: 'What are healthy body fat ranges?', a: 'For men: Essential (2-5%), Athletes (6-13%), Fitness (14-17%), Average (18-24%), Above average (25%+). For women: Essential (10-13%), Athletes (14-20%), Fitness (21-24%), Average (25-31%), Above average (32%+). These ranges come from the American Council on Exercise.' },
      { q: 'How accurate is the tape measure method?', a: 'The US Navy formula has an accuracy of ±3-4% compared to more expensive methods like DEXA scans. Measurement technique matters significantly — measure waist at the narrowest point (above navel for some, at navel for others) and neck just below the larynx, consistently.' },
      { q: 'What is a better method than tape measurement?', a: 'DEXA (X-ray) scan is the gold standard at ±1-2% accuracy. Hydrostatic weighing is also very accurate. Bod Pod (air displacement) is accessible at universities. Consumer bioelectrical impedance scales are convenient but can be off by 4-8% depending on hydration.' },
      { q: 'How often should I measure body fat?', a: 'Monthly or every 6-8 weeks is sufficient for tracking progress. Day-to-day fluctuations (from hydration, food volume, etc.) don\'t reflect actual fat change. Use the trend over 2-3 months as your meaningful signal, not any single measurement.' },
    ],
  },
  {
    slug: 'ideal-weight-calculator',
    name: 'Ideal Weight',
    category: 'health',
    icon: 'Scale',
    description: 'Find your ideal weight based on height.',
    longDescription: 'There\'s no single universally agreed "ideal weight" — different medical formulas give different answers, and individual body composition matters enormously. This calculator shows three common medical formula results side by side so you can see the range of estimates, not just one arbitrary number. Think of these as broad reference points, not prescriptions.',
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
    faqs: [
      { q: 'Which formula should I use?', a: 'These formulas were developed for clinical use (drug dosing, ventilator settings) in the 1970s-80s, not as personal fitness targets. The Devine formula is most widely used medically. The range across formulas represents the genuine uncertainty in the concept of a single "ideal" weight.' },
      { q: 'Is ideal weight the same as healthy weight?', a: 'No. Healthy weight is a range (the BMI 18.5-24.9 range), not a single number. Ideal weight formulas give single-number estimates that sit roughly in the middle of the healthy BMI range. Your actual healthy weight depends on body composition, frame size, and athletic build.' },
      { q: 'What if my actual weight is higher than the ideal weight?', a: 'Context matters. If your body fat percentage and waist circumference are both healthy, the number on the scale matters less than those indicators. Focus on metabolic health markers — blood glucose, blood pressure, lipids — not just weight.' },
    ],
  },
  {
    slug: 'water-intake-calculator',
    name: 'Water Intake',
    category: 'health',
    icon: 'Droplet',
    description: 'Daily water needs based on weight & activity.',
    longDescription: 'The "8 glasses a day" rule is a myth — water needs vary substantially based on body weight, climate, exercise, and individual metabolism. This calculator gives you a personalized daily target using the 33ml/kg baseline adjusted for exercise time. Proper hydration affects everything from energy levels and cognitive function to joint health and temperature regulation.',
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
    formula: 'Daily Water = Weight × 0.033L + (Exercise min ÷ 30) × 0.35L',
    faqs: [
      { q: 'Does coffee and tea count toward daily water intake?', a: 'Yes, despite the common belief that caffeine dehydrates you. Research shows that the mild diuretic effect of caffeine is outweighed by the fluid content of coffee and tea. Both count toward your daily hydration, though plain water is still ideal and has no downsides.' },
      { q: 'How do I know if I\'m drinking enough water?', a: 'The most practical indicator is urine color. Pale yellow to clear = well hydrated. Dark yellow = drink more. Completely clear all day = you\'re possibly overhydrating (rare but real). Checking urine color once or twice a day gives you real-time feedback that no calculator can match.' },
      { q: 'Should I drink more water in hot weather?', a: 'Yes — sweating significantly increases fluid loss. In hot climates or during vigorous outdoor activity, you can lose 1-2 liters per hour through sweat. Increase your intake accordingly and watch for early dehydration signs: headache, fatigue, reduced urine output.' },
    ],
  },
  {
    slug: 'pregnancy-due-date',
    name: 'Pregnancy Due Date',
    category: 'health',
    icon: 'Baby',
    description: 'Estimate your baby\'s due date.',
    longDescription: 'Estimated due dates are calculated from the first day of the last menstrual period (LMP), assuming a standard 280-day (40-week) pregnancy. This calculator takes the number of days since your last period and shows your current trimester, weeks remaining, and days to go. Remember that only about 5% of babies arrive exactly on their due date — the window of ±2 weeks is completely normal.',
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
    faqs: [
      { q: 'How accurate is this due date calculation?', a: 'The LMP-based method is the standard clinical approach but assumes a 28-day cycle with ovulation on day 14. Women with irregular cycles may have different actual conception dates. Your OB/GYN will typically confirm or adjust the date after an early ultrasound, which is the most accurate method.' },
      { q: 'What are the trimester week ranges?', a: 'First trimester: Weeks 1-13 (months 1-3). Second trimester: Weeks 14-27 (months 4-6). Third trimester: Weeks 28-40 (months 7-9). Most major organ development occurs in the first trimester, making it the most sensitive period.' },
      { q: 'Is it normal to deliver 2 weeks before or after the due date?', a: 'Yes, completely. Only about 5% of babies are born on their exact due date. The "full-term" window is 39-40 weeks, but 37-42 weeks is considered normal range. Deliveries before 37 weeks are preterm; after 42 weeks are post-term.' },
    ],
  },
  {
    slug: 'ovulation-calculator',
    name: 'Ovulation Calculator',
    category: 'health',
    icon: 'Heart',
    description: 'Find your fertile window.',
    longDescription: 'Ovulation typically occurs about 14 days before the end of a menstrual cycle — not necessarily on day 14 of the cycle. For cycles longer or shorter than 28 days, ovulation day shifts accordingly. This calculator estimates your ovulation day and fertile window (the 5 days before plus 1 day after ovulation), which represents your highest probability window for conception.',
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
    faqs: [
      { q: 'How many days can I get pregnant per cycle?', a: 'Typically 6 days — the 5 days leading up to ovulation plus ovulation day itself. Sperm can survive in the reproductive tract for up to 5 days, but eggs only survive 12-24 hours after ovulation. The days immediately before ovulation carry the highest pregnancy probability.' },
      { q: 'What if my cycle is irregular?', a: 'Irregular cycles make ovulation prediction much harder from a calendar method alone. BBT (basal body temperature) charting and OPKs (ovulation predictor kits) that detect LH surge are more reliable for irregular cycles. Apps that track multiple signs (temperature + cervical mucus + LH) are most accurate.' },
      { q: 'Can stress delay ovulation?', a: 'Yes. Significant physical or psychological stress can disrupt hormonal signaling and delay or suppress ovulation. This is one reason why tracking actual signs (temperature, OPK) is more reliable than calendar-based estimation — it reflects what\'s actually happening in your body.' },
    ],
  },
  {
    slug: 'heart-rate-zone',
    name: 'Heart Rate Zone',
    category: 'health',
    icon: 'Heart',
    description: 'Training zones based on age.',
    longDescription: 'Training in the right heart rate zone is the difference between efficient exercise and inefficient — or overtraining. Fat-burning zone (60-70% of max HR) uses fat as primary fuel and is sustainable for hours. Cardio zone (70-85%) builds cardiovascular fitness faster. This calculator uses the simple but widely-adopted 220 − Age formula to estimate your maximum heart rate and then calculates your zones.',
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
    formula: 'Max HR = 220 − Age',
    faqs: [
      { q: 'Is 220 minus age accurate for everyone?', a: 'It\'s a reasonable average but individual variation is significant — actual max HR can be 10-20 bpm higher or lower. For a more accurate max HR, use a chest strap during a maximal effort test (e.g., sprint up a steep hill until you physically can\'t go harder). Wrist-based HR monitors are less accurate during high-intensity exercise.' },
      { q: 'Does the fat-burning zone actually burn more fat?', a: 'You burn a higher percentage of calories from fat at lower intensities, but total fat grams burned can be higher at higher intensities because more total calories are burned. The "fat burning zone" concept is somewhat misleading — for overall fat loss, total calorie deficit matters more than training zone.' },
      { q: 'What heart rate zone is best for improving fitness?', a: 'Most evidence-based training programs emphasize Zone 2 (about 65-75% of max HR) for aerobic base building — it\'s sustainable and drives mitochondrial development. Interval training in Zone 4-5 (85-95%) is done sparingly but produces bigger VO2 max improvements. A 80/20 split (80% Zone 2, 20% high intensity) works well for most people.' },
    ],
  },
  {
    slug: 'vo2-max-calculator',
    name: 'VO2 Max',
    category: 'health',
    icon: 'Zap',
    description: 'Estimate aerobic fitness capacity.',
    longDescription: 'VO2 max — the maximum volume of oxygen your body can use during intense exercise — is one of the strongest predictors of cardiovascular health and longevity. This calculator uses the Cooper 12-Minute Run Test, which correlates well with lab-measured VO2 max. Run as far as you can in exactly 12 minutes on flat ground and enter the distance to get your estimated score.',
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
    formula: 'VO2 Max = (Distance in metres − 504.9) ÷ 44.73',
    faqs: [
      { q: 'What is a good VO2 max for my age?', a: 'For men aged 30-39: Below average <38, Average 38-43, Good 44-51, Excellent 52+. For women 30-39: Below average <33, Average 33-38, Good 39-45, Excellent 46+. These scores decline with age, but training can significantly slow or reverse that decline.' },
      { q: 'Can I improve my VO2 max?', a: 'Yes — VO2 max is highly trainable, especially in untrained individuals. Both high-intensity interval training (HIIT) and consistent moderate-intensity aerobic training improve it. Beginners can expect 15-25% improvement in the first 6-12 months of training. Highly trained athletes see smaller but still meaningful gains.' },
      { q: 'Why is VO2 max considered important for longevity?', a: 'Multiple large studies show that low cardiorespiratory fitness is one of the strongest predictors of early death — comparable in risk to smoking, obesity, and hypertension. Moving from the lowest to the second-lowest fitness quartile has a larger mortality benefit than most clinical interventions.' },
    ],
  },
  {
    slug: 'pace-calculator',
    name: 'Running Pace',
    category: 'health',
    icon: 'Timer',
    description: 'Calculate running pace per km/mile.',
    longDescription: 'Whether you\'re training for a 5K or a marathon, knowing your pace is essential for structured training. This calculator takes your total distance and time to give you pace per kilometer, pace per mile, and speed in km/h — so you can compare across units and use whichever your training plan requires.',
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
    formula: 'Pace (min/km) = Total Minutes ÷ Distance (km)',
    faqs: [
      { q: 'What is a good running pace for beginners?', a: 'For absolute beginners, any pace you can maintain while holding a conversation (roughly 6-7 min/km or 10-11 min/mile) is appropriate. The goal in the first 8-12 weeks is building the habit and base fitness, not speed. Time on your feet matters more than pace at this stage.' },
      { q: 'What pace should I target for a sub-30 minute 5K?', a: 'A 30-minute 5K requires an average pace of 6:00 min/km (or 9:39 min/mile). Training tip: your easy runs should be done at 6:30-7:00 min/km (about 1 minute slower than race pace) to build aerobic base without overtraining.' },
      { q: 'How do I convert pace to speed?', a: 'Speed (km/h) = 60 ÷ Pace (min/km). For example, a 6:00 min/km pace = 60 ÷ 6 = 10 km/h. Conversely, Pace = 60 ÷ Speed. This calculator handles both automatically — just enter your distance and time.' },
    ],
  },
  {
    slug: 'one-rep-max',
    name: 'One-Rep Max',
    category: 'health',
    icon: 'Dumbbell',
    description: 'Calculate your 1RM for any lift.',
    longDescription: 'Your one-rep max (1RM) is the maximum weight you can lift for a single rep of any given exercise. It\'s the foundation of percentage-based strength programming — most training plans prescribe weights as a percentage of your 1RM. Rather than testing your true 1RM (which carries injury risk), this calculator uses the Epley formula to estimate it from a submaximal set.',
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
    formula: '1RM = Weight × (1 + Reps ÷ 30) [Epley Formula]',
    faqs: [
      { q: 'How accurate is the estimated 1RM?', a: 'The formula is most accurate for sets of 3-10 reps. For sets above 12-15 reps, accuracy decreases as the rep count is more influenced by muscular endurance than pure strength. For best results, use a set of 3-6 reps at close to maximal effort.' },
      { q: 'Should I actually test my true 1RM?', a: 'True 1RM testing is appropriate for powerlifters and competitive athletes, but carries injury risk for recreational lifters. Estimated 1RM from a submaximal set gives you 90-95% of the information you need for programming purposes, with zero injury risk.' },
      { q: 'How do I use 1RM for training programming?', a: 'Common programming percentages: 85% = 5 reps (strength), 75-80% = 8-10 reps (hypertrophy/muscle building), 65-70% = 12-15 reps (muscular endurance), 90-95% = 1-3 reps (max strength training). Programs like 5/3/1 and Texas Method are built around these percentages.' },
    ],
  },
  {
    slug: 'sleep-cycle-calculator',
    name: 'Sleep Cycle',
    category: 'health',
    icon: 'Moon',
    description: 'Best bedtime based on wake time.',
    longDescription: 'Sleep cycles through stages approximately every 90 minutes. Waking mid-cycle — especially during deep sleep — causes sleep inertia: that groggy, disoriented state where you can barely function. Waking at the end of a complete cycle is dramatically smoother. This calculator gives you optimal bedtimes for 4, 5, and 6 complete sleep cycles based on when you need to wake up.',
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
    formula: 'Bedtime = Wake Time − (Cycles × 90 min) − Fall-Asleep Time',
    faqs: [
      { q: 'Why does 7.5 hours sometimes feel better than 8 hours?', a: '7.5 hours = 5 complete 90-minute cycles. 8 hours puts you 30 minutes into cycle 6, which is likely in deep sleep (N3) — the hardest stage to wake from. Waking mid-cycle causes sleep inertia. If 7.5 hours aligns with your natural cycle length, it genuinely can feel more refreshing than 8.' },
      { q: 'Are sleep cycles exactly 90 minutes for everyone?', a: 'No — cycles vary from about 80-110 minutes, with 90 minutes as an average. Earlier cycles in the night are dominated by deep sleep (N3); later cycles have more REM sleep. Individual variation is real, which is why some people find 90-minute intervals work better, and others may find 80 or 100 minutes aligns better.' },
      { q: 'Does alcohol affect sleep cycles?', a: 'Yes significantly. Alcohol suppresses REM sleep in the first half of the night and causes fragmented, lighter sleep in the second half. Even 1-2 drinks close to bedtime reduces sleep quality meaningfully. You may spend 8 hours in bed but miss out on the REM sleep that\'s essential for memory consolidation and emotional processing.' },
    ],
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'health',
    icon: 'Cake',
    description: 'Calculate exact age in years, months, days.',
    longDescription: 'Your precise age in years is straightforward, but knowing your exact total days and months has practical uses — from calculating someone\'s age for legal or medical purposes to satisfying plain curiosity. This calculator gives you your exact age in three units simultaneously from your date of birth to today.',
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
    faqs: [
      { q: 'Why does the calculator use 365.25 for days in a year?', a: 'A regular year is 365 days; a leap year is 366 days. Using 365.25 accounts for the average across four-year leap year cycles, giving a more accurate age calculation than assuming exactly 365 days every year.' },
      { q: 'What does total months mean?', a: 'Total months is your age expressed as months rather than years and months. For a 30-year-old: approximately 360 total months. This is sometimes used in medical contexts (pediatric growth charts use months for children under 5) or financial calculations.' },
      { q: 'How many days old am I really?', a: 'The number surprises most people. A 30-year-old is approximately 10,950 days old. A 40-year-old around 14,600 days. The day count puts the passage of time in a different perspective than years — and reminds you that time is genuinely finite.' },
    ],
  },
];
