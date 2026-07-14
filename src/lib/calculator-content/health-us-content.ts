import type { CalcInlineContent } from './types';

export const healthUsContent: Record<string, CalcInlineContent> = {
  'tdee-calculator': {
    article: `Your Total Daily Energy Expenditure (TDEE) is the number of calories you burn in a full day — not just at rest, but including work, walking, workouts, and even digestion. It is the single most useful number for planning weight loss, maintenance, or muscle gain, because eating below your TDEE produces a deficit and eating above it produces a surplus.

## Where the TDEE number comes from

This calculator starts with your Basal Metabolic Rate (BMR) — the calories your body burns at complete rest — using the Mifflin-St Jeor equation, the formula the Academy of Nutrition and Dietetics found most accurate for the general population:

\`\`\`
BMR (male)   = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5
BMR (female) = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161
TDEE = BMR × activity multiplier
\`\`\`

Pounds and feet/inches are converted internally (1 lb = 0.45359237 kg; 1 in = 2.54 cm). BMR is then scaled by one of five standard activity multipliers:

- **1.2 — Sedentary:** desk job, little or no exercise
- **1.375 — Lightly active:** light exercise 1-3 days/week
- **1.55 — Moderately active:** moderate exercise 3-5 days/week
- **1.725 — Very active:** hard exercise 6-7 days/week
- **1.9 — Extremely active:** hard daily training or a physical job plus training

The cutting and bulking targets subtract or add 500 calories per day. Because one pound of body fat stores roughly 3,500 calories, a 500-calorie daily deficit works out to about 1 lb of weight loss per week — a pace most US dietary guidance considers sustainable. The cutting target never drops below 1,200 calories per day, a common floor for safe self-directed dieting; if your TDEE is low enough that TDEE − 500 would fall under it, talk to a professional before cutting further.

**Where this can be off:** Mifflin-St Jeor is a population-average formula and is typically accurate within about ±10%. It does not account for body composition, so very muscular or very lean people may burn more than predicted, and metabolic adaptation can lower real-world expenditure during a long diet. Most people also overestimate their activity level — when in doubt, pick the lower multiplier and adjust based on 2-3 weeks of real scale data. Metric users can enter kg and cm directly in our BMR calculator.`,
    faqs: [
      {
        question: 'What is the difference between BMR and TDEE?',
        answer: 'BMR (Basal Metabolic Rate) is the calories your body burns at complete rest just to stay alive — breathing, circulation, cell repair. TDEE (Total Daily Energy Expenditure) is BMR multiplied by an activity factor, so it includes everything you do in a day. Use TDEE, not BMR, to set your calorie target.',
      },
      {
        question: 'Which activity level should I choose?',
        answer: 'Count only structured exercise and genuinely physical work. Most office workers who train 3-4 times a week fall under "Moderately active" (1.55). If your results stall, you likely overestimated — drop one level. Studies consistently show people overrate their activity.',
      },
      {
        question: 'How many calories should I eat to lose 1 lb per week?',
        answer: 'Eat about 500 calories below your TDEE each day. Since 1 lb of body fat stores roughly 3,500 calories, a 500 cal/day deficit equals about 1 lb/week. The "Cutting Calories" output gives you this number directly.',
      },
      {
        question: 'How accurate is the Mifflin-St Jeor equation?',
        answer: 'It is the most accurate general-population BMR formula, typically within ±10% of measured values. If you know your body fat percentage, a lean-mass formula like Katch-McArdle can be more precise for very muscular or very lean physiques.',
      },
      {
        question: 'Can I use this calculator with kilograms and centimeters?',
        answer: 'This version takes US units (lb, ft + in) and converts internally. If you prefer metric inputs, use our BMR calculator, which accepts kg and cm directly.',
      },
    ],
  },
  'calories-burned-calculator': {
    article: `How many calories does a 30-minute run actually burn? Exercise scientists answer that question with METs — Metabolic Equivalents of Task. One MET is the energy you burn sitting quietly, defined as 3.5 mL of oxygen per kilogram of body weight per minute. An activity rated at 7 METs burns seven times that resting rate. This calculator uses MET values consistent with the Compendium of Physical Activities, the standard reference used in US exercise research.

## The MET formula behind this number

\`\`\`
Calories = MET × 3.5 × weight(kg) ÷ 200 × minutes
\`\`\`

Your weight in pounds is converted to kilograms (1 lb = 0.45359237 kg). The 3.5 ÷ 200 portion converts oxygen consumption into calories per minute, which is then multiplied by your duration. Worked example: a 170 lb (77.1 kg) person running at 6 mph (9.8 METs) for 30 minutes burns 9.8 × 3.5 × 77.1 ÷ 200 × 30 ≈ 397 calories — about 13.2 calories per minute.

Two things follow directly from the formula. First, heavier people burn more calories doing the same workout, because moving more mass costs more energy. Second, intensity matters more than activity type: running at 8 mph (11.8 METs) burns roughly 20% more per minute than running at 6 mph (9.8 METs), and jump rope (11.0 METs) rivals both.

**What can throw this off:** MET values are population averages measured at a standard pace. Your true burn depends on fitness level, body composition, terrain, and technique — a hilly hike or an aggressive HIIT session can exceed the listed value, while a leisurely version falls short. The estimate is also a gross figure: it includes the calories you would have burned at rest during that time. Finally, MET research assumes steady-state effort, so it understates the small afterburn (EPOC) that follows very intense intervals. Treat results as a solid planning estimate, not a lab measurement, and pair them with the TDEE calculator to set daily targets.`,
    faqs: [
      {
        question: 'What is a MET?',
        answer: 'A MET (Metabolic Equivalent of Task) is a multiple of your resting energy burn. 1 MET = sitting quietly = 3.5 mL of oxygen per kg of body weight per minute. Running at 6 mph is 9.8 METs, meaning it burns about 9.8 times your resting rate.',
      },
      {
        question: 'How accurate are MET-based calorie estimates?',
        answer: 'They are good planning estimates — usually within 10-20% for steady-state cardio. Accuracy drops for skill-based or interval activities where individual effort varies a lot. Fitness trackers use similar math plus heart-rate data and are not dramatically more accurate.',
      },
      {
        question: 'Which exercise burns the most calories?',
        answer: 'Per minute, the highest values on this list are running at 8 mph (11.8 METs) and jump rope (11.0 METs). For a 170 lb person, both burn roughly 890-955 calories per hour. Sustainable duration matters too — a 60-minute moderate ride can beat a 15-minute sprint session.',
      },
      {
        question: 'Do heavier people burn more calories?',
        answer: 'Yes. The formula scales linearly with body weight in kilograms, so a 250 lb person burns about 47% more calories than a 170 lb person doing the same activity for the same time.',
      },
      {
        question: 'Does this number include calories I would have burned anyway?',
        answer: 'Yes — MET estimates are gross calories, including your resting burn during the activity. The extra cost of the exercise itself is roughly (MET − 1) ÷ MET of the total, so a 397-calorie run at 9.8 METs adds about 356 calories beyond rest.',
      },
    ],
  },
  'protein-intake-calculator': {
    article: `How much protein you need each day depends far more on what you ask your body to do than on any single magic number. The US Recommended Dietary Allowance (RDA) is 0.8 grams per kilogram of body weight per day — about 0.36 g per pound — but that figure is the minimum to prevent deficiency in sedentary adults, not an optimal target for people who train. Sports-nutrition research, including the International Society of Sports Nutrition position stand, supports substantially higher intakes for active people.

## Turning body weight into a gram target

\`\`\`
weight(kg) = weight(lb) × 0.45359237

Sedentary:          0.8 g/kg          (≈ 0.36 g/lb)
Active / endurance: 1.2 – 1.6 g/kg    (≈ 0.54 – 0.73 g/lb)
Build muscle:       1.6 – 2.2 g/kg    (≈ 0.73 – 1.0 g/lb)
\`\`\`

Your weight in pounds is converted to kilograms, then multiplied by the range for your goal. The headline number is the midpoint of that range; the low and high ends are shown separately so you can adjust for training volume and calorie phase. The per-meal figure simply divides the midpoint across four meals, since research suggests spreading protein through the day supports muscle protein synthesis better than loading one giant dinner.

Worked example: a 170 lb (77.1 kg) lifter on the muscle-building setting gets a range of 123-170 g/day with a 147 g midpoint — about 37 g per meal across four meals. A handy rule of thumb at the top of that range is roughly 1 g per pound of body weight.

**Worth knowing:** the calculation uses total body weight, which overshoots for people carrying significant excess fat — in that case, many dietitians base the target on goal weight or lean mass instead. Higher intakes within these ranges are most useful during a calorie deficit, when extra protein helps preserve muscle. These are general fitness guidelines, not medical advice; people with kidney disease or other conditions should confirm targets with a physician or registered dietitian.`,
    faqs: [
      {
        question: 'How much protein does the average person need per day?',
        answer: 'The US RDA is 0.8 g per kg of body weight (about 0.36 g per lb) — roughly 62 g/day for a 170 lb adult. That is a minimum to prevent deficiency, not an optimum for active people.',
      },
      {
        question: 'How much protein do I need to build muscle?',
        answer: 'Research supports 1.6-2.2 g/kg (about 0.73-1.0 g per lb) for people doing resistance training. For a 170 lb lifter that is roughly 123-170 g/day. Intakes above 2.2 g/kg show little additional muscle-building benefit in most studies.',
      },
      {
        question: 'Is eating a lot of protein bad for your kidneys?',
        answer: 'In healthy adults, intakes within the ranges here have not been shown to harm kidney function. People with existing kidney disease are routinely advised to limit protein and should follow their physician\'s guidance.',
      },
      {
        question: 'Should I base protein on total weight or lean body mass?',
        answer: 'These ranges assume total body weight, which works well for most people. If you carry significant excess body fat, calculating from goal weight or lean mass avoids an inflated target — our body fat calculator can estimate lean mass.',
      },
      {
        question: 'How much protein can the body use in one meal?',
        answer: 'Older claims of a hard 30 g limit are outdated — the body digests it all — but muscle protein synthesis responds best to roughly 20-40 g of quality protein per meal. Spreading your daily target across 3-5 meals, as the per-meal output does, is a practical approach.',
      },
    ],
  },
};
