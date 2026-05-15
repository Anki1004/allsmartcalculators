import { CalculatorConfig } from '../calculator-types';

export const dailyLifeCalculators: CalculatorConfig[] = [
  {
    slug: 'fuel-cost-calculator',
    name: 'Fuel Cost Calculator',
    category: 'daily-life',
    icon: 'Fuel',
    description: 'Trip fuel cost from distance and MPG.',
    trending: true,
    usageCount: 87000,
    inputs: [
      { key: 'distance', label: 'Distance', type: 'slider', min: 1, max: 10000, step: 1, default: 500, suffix: 'km', color: 'primary' },
      { key: 'efficiency', label: 'Fuel Efficiency', type: 'slider', min: 1, max: 30, step: 0.1, default: 12, suffix: 'km/L', color: 'secondary' },
      { key: 'price', label: 'Fuel Price', type: 'slider', min: 0.1, max: 10, step: 0.01, default: 1.4, prefix: '$/L', color: 'tertiary' },
    ],
    outputs: [
      { key: 'total', label: 'Total Cost', prefix: '$', primary: true },
      { key: 'fuelUsed', label: 'Fuel Used', suffix: 'L', decimals: 2, color: 'secondary' },
      { key: 'perKm', label: 'Cost per km', prefix: '$', decimals: 3, color: 'tertiary' },
    ],
    calculate: (i) => {
      const fuelUsed = Number(i.distance) / Number(i.efficiency);
      const total = fuelUsed * Number(i.price);
      return { total, fuelUsed, perKm: total / Number(i.distance) };
    },
    intro:
      "Planning a road trip from Delhi to Goa or just calculating monthly office-commute fuel cost? Distance ÷ mileage gives fuel used; times fuel price gives total cost. A 500 km trip in a car doing 12 km/L with petrol at ₹104/L (₹1.40 in the slider's $ default) uses 41.7L and costs about ₹4,340. Indian petrol prices vary by state from ₹95–₹110/L; diesel from ₹85–₹100/L. Use the calculator to compare car options or plan budget for a road trip.",
    formula: 'Fuel used (L) = Distance ÷ Mileage · Total cost = Fuel × Price · Cost per km = Total ÷ Distance',
    howItWorks:
      "Simple proportional math. 500 km ÷ 12 km/L = 41.67 L fuel. 41.67 × ₹104 = ₹4,333 cost. ₹4,333 ÷ 500 km = ₹8.67/km. Highway driving usually gives 10–20% better mileage than city; AC use cuts efficiency by 10–15%. Tubeless tyres at correct pressure save another 3–5%. For honest planning, use the city-mileage figure and add 10% buffer for traffic.",
    ranges: {
      title: 'Indian fuel prices and typical car mileage (April 2026)',
      rows: [
        { label: 'Petrol price (metro avg)', range: '₹95 – ₹110/L', note: 'State + city varies' },
        { label: 'Diesel price (metro avg)', range: '₹85 – ₹100/L', note: 'Cheaper but kms more polluting' },
        { label: 'CNG price', range: '₹70 – ₹85/kg', note: 'Roughly half of petrol per km' },
        { label: 'Hatchback (petrol, city)', range: '15 – 22 km/L', note: 'Swift, Baleno, i20' },
        { label: 'Sedan (petrol, highway)', range: '18 – 24 km/L', note: 'Honda City, Verna' },
        { label: 'SUV (petrol, mixed)', range: '10 – 15 km/L', note: 'Creta, Seltos, XUV300' },
        { label: 'Diesel (1.5L engines)', range: '18 – 25 km/L', note: 'Mileage advantage even with higher per-L price' },
        { label: 'Electric scooter / car (₹/km)', range: '₹0.50 – ₹1.50/km', note: '5–10× cheaper than petrol' },
      ],
    },
    limitations: [
      "Manufacturer-claimed mileage is always optimistic — real-world figures are typically 15–25% lower. Use your last 3 tankfuls' average for accuracy.",
      "Doesn't include tolls (₹500–₹2,000 on a 500 km Delhi-Jaipur trip), parking, or per-trip wear and tear.",
      "Doesn't model traffic, AC use, or driving style — aggressive driving easily cuts mileage by 20–30%.",
      "Calculator uses $/L; for INR amounts, mentally substitute (current Indian petrol price ~₹104/L matches roughly $1.25 at ₹83/USD).",
    ],
    faqs: [
      {
        q: 'How do I improve my car\'s fuel efficiency?',
        a: 'Top three: keep tyres at correct pressure (saves 3–5%), service the air filter on time (5–10%), drive at 60–80 km/h instead of 100+ km/h on highways (mileage improves 15–20% in this range).',
      },
      {
        q: 'Is diesel cheaper than petrol per km?',
        a: 'Usually yes for similar-class cars. A petrol Swift at 18 km/L × ₹104 = ₹5.78/km. A diesel Swift Dzire at 24 km/L × ₹92 = ₹3.83/km — 34% cheaper. But diesel cars cost ₹1.5–₹2L more upfront and need more expensive maintenance.',
      },
      {
        q: 'How much fuel does a long road trip use?',
        a: 'Delhi to Goa (1,900 km) in a 15 km/L petrol car = 127 L × ₹104 = ₹13,200 fuel cost. Add ₹3,000–₹5,000 in tolls + ₹4,000 in food/stay per night. Budget ₹25,000–₹35,000 for the full trip.',
      },
      {
        q: 'Is electric better for daily commuting?',
        a: 'For city use, almost always. EVs cost ₹0.50–₹1.50 per km vs ₹6–₹8/km for petrol. Over 50,000 km of usage, that\'s ₹3 lakh savings. Caveat: upfront cost is higher and home charging infrastructure required.',
      },
    ],
    seo: {
      title: 'Fuel Cost Calculator: Trip Cost from MPG & Distance',
      description: 'Free fuel cost calculator. Estimate the total fuel cost of any trip from distance, vehicle MPG (or km/L), and current fuel price.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'travel-time-calculator',
    name: 'Travel Time Calculator',
    category: 'daily-life',
    icon: 'Clock',
    description: 'Estimate travel time from distance & speed.',
    usageCount: 54000,
    inputs: [
      { key: 'distance', label: 'Distance', type: 'slider', min: 1, max: 10000, step: 1, default: 500, suffix: 'km', color: 'primary' },
      { key: 'speed', label: 'Avg Speed', type: 'slider', min: 10, max: 200, step: 1, default: 80, suffix: 'km/h', color: 'secondary' },
      { key: 'breaks', label: 'Break Time', type: 'slider', min: 0, max: 300, step: 5, default: 30, suffix: 'min', color: 'tertiary' },
    ],
    outputs: [
      { key: 'hours', label: 'Total Time', suffix: 'hours', decimals: 2, primary: true },
      { key: 'minutes', label: 'Total Minutes', suffix: 'min', decimals: 0, color: 'secondary' },
    ],
    calculate: (i) => {
      const driveHours = Number(i.distance) / Number(i.speed);
      const totalHours = driveHours + Number(i.breaks) / 60;
      return { hours: totalHours, minutes: totalHours * 60 };
    },
    intro:
      "How long will the drive take? Distance ÷ average speed gives the moving time; add breaks for total trip duration. 500 km at 80 km/h = 6.25 hours driving + 30-minute break = 6.75 hours total. For Indian road trips, plan for average speeds of 50–70 km/h on highways (factoring in towns, tolls, and traffic), 30–40 km/h in cities. Google Maps usually estimates correctly but doesn't account for your break stops.",
    formula: 'Drive Time = Distance ÷ Speed · Total Time = Drive Time + Breaks',
    howItWorks:
      "500 km ÷ 80 km/h = 6.25 hours moving. Add 30-minute (0.5 hour) break = 6.75 hours total. Indian highway realistic averages: National Expressways 80–90 km/h, NH (highway) 55–70 km/h, state highway 40–55 km/h, city driving 25–35 km/h. Always plan with conservative averages — the calculator's 80 km/h is a best-case highway average.",
    ranges: {
      title: 'Realistic Indian travel speeds',
      rows: [
        { label: 'Expressway (Yamuna, Mumbai-Pune)', range: '80 – 100 km/h', note: 'Speed limit 120; realistic average lower' },
        { label: 'National highway (NH-)', range: '55 – 75 km/h', note: 'Toll roads; mixed traffic' },
        { label: 'State highway (SH-)', range: '40 – 55 km/h', note: 'Single-lane stretches; towns' },
        { label: 'City driving (metro)', range: '20 – 35 km/h', note: 'Delhi, Mumbai, Bangalore peak' },
        { label: 'Recommended break frequency', range: 'Every 2–3 hours, 15–30 min', note: 'Driver fatigue threshold' },
        { label: 'Night driving (truck-heavy NH)', range: '50 – 65 km/h', note: 'Lower than day; safer to avoid' },
      ],
    },
    limitations: [
      "Uses a single average speed. Real trips have varying conditions — start fresh and fast, slower through cities or in monsoon.",
      "Doesn't model traffic. Google Maps' real-time traffic estimates are more accurate for time-of-day planning.",
      "Break time is a single block. For long trips, multiple shorter breaks (every 2 hours) are safer than one big stop.",
      "Doesn't include refueling stops (10–20 min each) or queue time at tolls (5–15 min per plaza).",
    ],
    faqs: [
      {
        q: 'How long does a Delhi-to-Mumbai drive take?',
        a: '1,400 km via NH. At realistic 60 km/h average including stops, it\'s about 23–24 hours of driving — typically done over 2 days with overnight halt. Without the new Delhi-Mumbai Expressway (when fully open), figure 30+ hours of travel time door to door.',
      },
      {
        q: 'How often should I take breaks on a long drive?',
        a: 'Every 2 hours for 15 minutes is the standard safety recommendation. Stop earlier if you feel drowsy. Coffee + 15 min walk is more effective than just sitting in the car at a dhaba.',
      },
      {
        q: 'Should I drive at night?',
        a: 'On Indian highways, generally no — heavy truck traffic, poor visibility, more accident risk, fewer safe stops. Highway driving is safest 7am–6pm. Reserve night driving for shorter, well-lit urban stretches.',
      },
      {
        q: 'Why is my actual time slower than Google Maps?',
        a: 'Maps assumes you don\'t stop. Add 15–25% to Maps\' estimate for breaks, fuel, food, and queue at tolls. For a 6-hour Maps prediction, expect 7–7.5 hours actual.',
      },
    ],
    seo: {
      title: 'Travel Time Calculator: Drive Time from Distance',
      description: 'Free travel time calculator. Estimate trip duration in hours and minutes from any distance and average speed — useful for road trip planning.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'date-difference',
    name: 'Date Difference',
    category: 'daily-life',
    icon: 'Calendar',
    description: 'Days between two dates.',
    usageCount: 73000,
    inputs: [
      { key: 'daysAgo1', label: 'Days Ago (Start)', type: 'slider', min: 0, max: 10000, step: 1, default: 365, suffix: 'days', color: 'primary' },
      { key: 'daysAgo2', label: 'Days Ago (End)', type: 'slider', min: 0, max: 10000, step: 1, default: 0, suffix: 'days', color: 'secondary' },
    ],
    outputs: [
      { key: 'days', label: 'Total Days', decimals: 0, primary: true },
      { key: 'weeks', label: 'Total Weeks', decimals: 1, color: 'secondary' },
      { key: 'months', label: 'Total Months', decimals: 1, color: 'tertiary' },
    ],
    calculate: (i) => {
      const days = Math.abs(Number(i.daysAgo1) - Number(i.daysAgo2));
      return { days, weeks: days / 7, months: days / 30.44 };
    },
    intro:
      "How many days between two events? This calculator returns days, weeks, and months elapsed. 365 days back to today = exactly 1 year (52 weeks, 12 months). Used for tracking project milestones, deadline countdowns, anniversary calculations, and visa/passport validity checks. The months number uses average 30.44 days (accounting for leap years and varying month lengths), so it's a precise mathematical conversion, not a calendar-month count.",
    formula: 'Days = |Days Ago (Start) − Days Ago (End)| · Weeks = Days ÷ 7 · Months = Days ÷ 30.44',
    howItWorks:
      "The slider input lets you set both dates relative to today (in days). 365 days ago to today = 365 days difference = 52.1 weeks = 12 months exactly. The 30.44 days/month uses the average across all calendar months (365.25 days ÷ 12). For exact calendar-month differences (e.g. \"how many full months between Jan 15 and Aug 22?\"), use a date-aware tool — this calculator gives the mathematical conversion.",
    ranges: {
      title: 'Common time-period conversions',
      rows: [
        { label: '1 week', range: '7 days', note: '' },
        { label: '1 month (avg)', range: '~30.44 days', note: 'Range: 28 (Feb non-leap) to 31' },
        { label: '1 year', range: '365 days (366 leap)', note: '' },
        { label: '5 years', range: '~1,826 days', note: 'Includes ~1 leap year' },
        { label: 'Workdays in a year (Indian)', range: '~250 days', note: '52 weekends + 18 holidays' },
        { label: 'School year (India)', range: '~220 days', note: 'June–April excluding vacations' },
      ],
    },
    limitations: [
      "Calculator handles relative day counts, not specific dates. For absolute calendar math, use a date-aware tool.",
      "Months use 30.44-day average. For exact calendar months (e.g. Feb has 28/29, July has 31), use specific date arithmetic.",
      "Doesn't account for time-of-day. \"365 days between Jan 1 and Jan 1 next year\" is correct but doesn't include the hours within those days.",
    ],
    faqs: [
      {
        q: 'How do I count days between two specific dates?',
        a: 'Use a date-aware calculator that takes calendar dates directly. This calculator works with relative day counts (how many days ago each event happened) — useful for relative comparisons.',
      },
      {
        q: 'Are leap years included?',
        a: 'Yes, automatically. A 365-day count crosses 1 year for non-leap and slightly less than a year for leap years (365 days ago in a leap year = today minus 365 days, but the calendar year would have been 366 days long).',
      },
      {
        q: 'Why are months 30.44 days?',
        a: 'It\'s the average across all 12 months — 365.25 days ÷ 12 = 30.44. Each month is actually 28, 30, or 31 days. Using the average is fine for rough estimates but won\'t give exact calendar-month differences.',
      },
      {
        q: 'How do I count working days?',
        a: 'Subtract weekends (count of complete weeks × 2) plus public holidays. For a 365-day year: 365 − 104 (weekends) − 18 (Indian gazetted holidays) = ~243 working days. Festivals reduce this for region-specific holidays.',
      },
    ],
    seo: {
      title: 'Date Difference Calculator: Days Between Two Dates',
      description: 'Free date difference calculator. Get the exact number of days, weeks, and months between any two dates — handles leap years correctly.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'split-bill-calculator',
    name: 'Split Bill Calculator',
    category: 'daily-life',
    icon: 'Users',
    description: 'Split expenses fairly between people.',
    usageCount: 98000,
    inputs: [
      { key: 'total', label: 'Total Amount', type: 'slider', min: 1, max: 10000, step: 1, default: 250, prefix: '$', color: 'primary' },
      { key: 'people', label: 'Number of People', type: 'slider', min: 1, max: 50, step: 1, default: 4, color: 'secondary' },
      { key: 'tip', label: 'Tip %', type: 'slider', min: 0, max: 30, step: 1, default: 15, suffix: '%', color: 'tertiary' },
    ],
    outputs: [
      { key: 'perPerson', label: 'Each Pays', prefix: '$', primary: true },
      { key: 'tipAmount', label: 'Tip Total', prefix: '$', color: 'secondary' },
      { key: 'grandTotal', label: 'Grand Total', prefix: '$', color: 'tertiary' },
    ],
    calculate: (i) => {
      const tipAmount = Number(i.total) * (Number(i.tip) / 100);
      const grandTotal = Number(i.total) + tipAmount;
      return { perPerson: grandTotal / Number(i.people), tipAmount, grandTotal };
    },
    intro:
      "End-of-dinner math, split correctly. Add tip to the bill, divide by number of people. ₹2,500 bill + 15% tip = ₹2,875 grand total ÷ 4 people = ₹718.75 each. Most Indian restaurants already add 10% service charge (which is the tip), so check before adding more. For uneven splits (some had alcohol, some didn't), use a per-item app like Splitwise instead — this calculator assumes equal sharing.",
    formula: 'Tip = Total × (Tip% ÷ 100) · Grand Total = Total + Tip · Per Person = Grand Total ÷ People',
    howItWorks:
      "₹2,500 × 0.15 = ₹375 tip. ₹2,500 + ₹375 = ₹2,875 grand total. ÷ 4 = ₹718.75 per person. In India, the convention is 5–10% tip if service charge isn't already added. If service charge is on the bill (most upscale restaurants), the tip is already included — round up to the nearest ₹100 if you want to add extra.",
    ranges: {
      title: 'Tipping conventions in India',
      rows: [
        { label: 'Casual restaurant (no service charge)', range: '5 – 10%', note: 'Discretionary; based on service' },
        { label: 'Fine dining (with service charge)', range: '0 (tip included)', note: 'Service charge IS the tip' },
        { label: 'Coffee shops / quick service', range: '₹10 – ₹50 flat', note: 'Or none; no expectation' },
        { label: 'Delivery (Swiggy, Zomato)', range: '₹20 – ₹50', note: 'Higher in monsoon or for long distances' },
        { label: 'Hotel housekeeping', range: '₹50 – ₹100/day', note: 'For multi-night stays' },
        { label: 'Cab/Uber/Ola', range: 'Round up + ₹10–₹20', note: 'Or app tip option' },
      ],
    },
    limitations: [
      "Assumes equal split. For per-item splitting (some ordered alcohol, some only food), use a dedicated app like Splitwise.",
      "Doesn't model GST. Indian restaurants charge 5% GST on takeaway, 18% on dine-in with AC. The bill total usually already includes GST.",
      "Service charge isn't separated from tip — if your bill has 10% service charge, your effective tip is already at 10%. Don\'t double-tip.",
    ],
    faqs: [
      {
        q: 'Is service charge mandatory in India?',
        a: 'No. As per Department of Consumer Affairs (2022 guidelines), service charge is voluntary — you can refuse to pay it. In practice most restaurants don\'t remove it without argument. If you disagree, ask politely to have it removed.',
      },
      {
        q: 'How much should I tip in India?',
        a: '5–10% if no service charge is on the bill. Nothing extra if service charge is already added. For delivery riders, ₹20–₹50 is appreciated.',
      },
      {
        q: 'Should the tip be calculated on pre-tax or post-tax amount?',
        a: 'Pre-tax in US convention; in India most people tip on the total bill amount (post-tax) since the GST is small relative to the bill. The difference is rarely more than ₹20–₹50.',
      },
      {
        q: 'How do I split unevenly?',
        a: 'Compute each person\'s share separately for items they consumed, then divide shared items (appetizers, dessert) equally. Apps like Splitwise automate this — useful for group trips with mixed spending.',
      },
    ],
    seo: {
      title: 'Bill Splitter: Fairly Split Group Expenses',
      description: 'Free bill splitter. Divide a total bill by any number of people, with optional tip and tax — perfect for restaurants, trips, and shared expenses.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'cooking-conversion',
    name: 'Cooking Conversion',
    category: 'daily-life',
    icon: 'ChefHat',
    description: 'Convert cups, tablespoons, grams.',
    usageCount: 45000,
    inputs: [
      { key: 'cups', label: 'Cups', type: 'slider', min: 0, max: 20, step: 0.25, default: 1, suffix: 'cups', color: 'primary' },
    ],
    outputs: [
      { key: 'ml', label: 'Milliliters', suffix: 'ml', decimals: 0, primary: true },
      { key: 'tbsp', label: 'Tablespoons', suffix: 'tbsp', decimals: 0, color: 'secondary' },
      { key: 'tsp', label: 'Teaspoons', suffix: 'tsp', decimals: 0, color: 'tertiary' },
      { key: 'floz', label: 'Fluid Ounces', suffix: 'fl oz', decimals: 2 },
    ],
    calculate: (i) => {
      const c = Number(i.cups);
      return { ml: c * 240, tbsp: c * 16, tsp: c * 48, floz: c * 8 };
    },
    intro:
      "US recipes use cups, tablespoons, teaspoons; Indian kitchens use ml and gm. This calculator converts cups (US standard, 240ml) to ml, tablespoons, teaspoons, and fluid ounces. 1 cup = 240 ml = 16 tbsp = 48 tsp = 8 fl oz. For dry ingredients, weight is more accurate than volume — 1 cup of flour weighs 120g, 1 cup of sugar weighs 200g. Use a kitchen scale for baking precision.",
    formula: '1 cup (US) = 240 ml = 16 tbsp = 48 tsp = 8 fl oz · 1 tbsp = 15 ml · 1 tsp = 5 ml',
    howItWorks:
      "Linear conversion based on US measuring-cup standard (240 ml). 2 cups = 480 ml = 32 tbsp = 96 tsp = 16 fl oz. Note: UK/Metric cup = 250 ml (slightly larger); Japanese cup = 200 ml (smaller). Most US recipes assume 240 ml; British recipes vary. For weight conversions (e.g. \"how many grams in a cup of flour\"), the answer depends on the ingredient density.",
    ranges: {
      title: 'Common cup-to-gram conversions for Indian cooking',
      rows: [
        { label: 'Atta (whole wheat flour)', range: '1 cup ≈ 125 g', note: 'Spooned in, not packed' },
        { label: 'Maida (refined flour)', range: '1 cup ≈ 120 g', note: '' },
        { label: 'Sugar (granulated)', range: '1 cup ≈ 200 g', note: '' },
        { label: 'Rice (uncooked basmati)', range: '1 cup ≈ 200 g', note: '' },
        { label: 'Milk', range: '1 cup ≈ 240 g', note: '~1 g/ml' },
        { label: 'Ghee / butter (melted)', range: '1 cup ≈ 220 g', note: '' },
        { label: 'Yogurt (dahi)', range: '1 cup ≈ 240 g', note: '~1 g/ml' },
      ],
    },
    limitations: [
      "Assumes US-standard cup (240ml). UK metric is 250 ml, Japanese 200 ml — adjust accordingly.",
      "Volume-to-weight conversion depends on ingredient density. 1 cup of feathers and 1 cup of lead are the same volume but very different weights.",
      "Tablespoons differ slightly internationally — Australian tbsp = 20 ml (1/3 more than US 15 ml). When in doubt, use ml.",
    ],
    faqs: [
      {
        q: 'How many ml is one cup?',
        a: '240 ml in US recipes. 250 ml in UK metric. 200 ml in Japanese cooking. Most English-language recipes (cookbooks and YouTube) assume US 240 ml unless specified otherwise.',
      },
      {
        q: 'Why does the recipe say "1 cup flour, 120g"?',
        a: 'Volume and weight are both common in recipes. Weight (grams) is more accurate because flour packs differently depending on how you spoon it into the cup. Bakers prefer grams; everyday cooks prefer cups.',
      },
      {
        q: 'How do I measure without measuring cups?',
        a: 'A standard chai/coffee cup is roughly 200ml. A tea/dessert spoon is roughly 5ml (teaspoon). A serving spoon is roughly 15ml (tablespoon). These aren\'t exact but get you to ±10% — good enough for cooking, not great for baking.',
      },
      {
        q: 'Are tablespoons the same everywhere?',
        a: 'No — US 15 ml, Australian 20 ml, UK metric 15 ml. For Indian cooking with international recipes, use ml when given a choice. Teaspoons are 5 ml almost everywhere.',
      },
    ],
    seo: {
      title: 'Cooking Conversion Calculator: Cups, Tbsp, Grams',
      description: 'Free cooking measurement converter. Translate between cups, tablespoons, teaspoons, ounces, and grams — for recipes, baking, and meal prep.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'paint-calculator',
    name: 'Paint Calculator',
    category: 'daily-life',
    icon: 'Palette',
    description: 'Gallons of paint needed for a room.',
    usageCount: 29000,
    inputs: [
      { key: 'length', label: 'Room Length', type: 'slider', min: 1, max: 50, step: 0.5, default: 5, suffix: 'm', color: 'primary' },
      { key: 'width', label: 'Room Width', type: 'slider', min: 1, max: 50, step: 0.5, default: 4, suffix: 'm', color: 'secondary' },
      { key: 'height', label: 'Wall Height', type: 'slider', min: 2, max: 6, step: 0.1, default: 2.7, suffix: 'm', color: 'tertiary' },
      { key: 'coats', label: 'Number of Coats', type: 'slider', min: 1, max: 4, step: 1, default: 2 },
    ],
    outputs: [
      { key: 'area', label: 'Total Wall Area', suffix: 'm²', decimals: 1, primary: true },
      { key: 'liters', label: 'Paint Needed', suffix: 'L', decimals: 1, color: 'secondary' },
      { key: 'gallons', label: 'In Gallons', suffix: 'gal', decimals: 1, color: 'tertiary' },
    ],
    calculate: (i) => {
      const perimeter = 2 * (Number(i.length) + Number(i.width));
      const area = perimeter * Number(i.height) * Number(i.coats);
      const liters = area / 10; // ~10 m² per liter
      return { area, liters, gallons: liters * 0.264 };
    },
    intro:
      "Painting a room? Wall area = perimeter × height. For a 5m × 4m × 2.7m room: perimeter = 18m, wall area = 48.6 m² per coat. With 2 coats, total covered area = 97.2 m². At ~10 m² per litre coverage (typical emulsion), you need about 10 litres of paint — that's roughly 2.5 buckets of 4L Asian Paints / Berger emulsion. Add 10–15% for waste and corners.",
    formula: 'Perimeter = 2 × (L + W) · Wall Area = Perimeter × Height × Coats · Paint (L) = Area ÷ 10',
    howItWorks:
      "5m × 4m room with 2.7m walls: perimeter = 2(5+4) = 18m. Total wall area = 18 × 2.7 = 48.6 m². Two coats = 97.2 m² of paint surface. At 10 m²/litre coverage (standard for Asian Paints Royale, Berger Silk), need 9.72L. Buy 10L (3 × 4L cans, or 1 × 10L bucket). Always add 5–10% buffer — corners, second coats over patches, touch-ups.",
    ranges: {
      title: 'Paint coverage rates (Indian brands)',
      rows: [
        { label: 'Emulsion (Asian Paints, Berger)', range: '10 – 14 m²/L per coat', note: 'Most common interior' },
        { label: 'Distemper', range: '6 – 8 m²/L per coat', note: 'Cheaper but thicker required' },
        { label: 'Primer / wall sealer', range: '8 – 10 m²/L per coat', note: 'Single coat usually' },
        { label: 'Exterior wall paint', range: '8 – 11 m²/L per coat', note: 'Lower coverage; thicker layer' },
        { label: 'Texture / putty', range: '4 – 6 m²/L', note: 'For uneven walls' },
        { label: 'Typical 4L can (rooms covered)', range: '~40 m² × 2 coats = 1 room', note: 'Standard 12×12 ft Indian bedroom' },
        { label: 'Buffer to add', range: '+10–15%', note: 'For waste, second coats, touch-ups' },
      ],
    },
    limitations: [
      "Subtracts doors and windows. Subtract ~2 m² per door and ~1.5 m² per window from the wall area for a more accurate estimate.",
      "Calculator assumes new-wall painting. Re-painting existing colours often needs only 1 coat (saves 50% paint); covering darker old colour to lighter new colour may need 3 coats.",
      "Coverage rate depends on wall texture (smooth POP vs rough cement plaster) and paint brand. Verify against the can label.",
      "Doesn't model ceiling painting. Add ceiling area (L × W) and 1–2 coats of ceiling-specific white paint.",
    ],
    faqs: [
      {
        q: 'How many litres of paint for a 12x12 bedroom?',
        a: 'Typical 12×12 ft (3.65m × 3.65m) room with 10ft (3m) walls = ~44 m² wall area. Two coats = 88 m². At 10 m²/L coverage, you need ~9L. One 10L bucket of Asian Paints / Berger emulsion.',
      },
      {
        q: 'Should I paint myself or hire someone?',
        a: 'DIY savings: ₹4,000–₹6,000 per room (just paint vs paint + labour). Time cost: 2–3 days per room including prep. Hire if: high ceilings, complex texture, painting external walls. DIY if: confident, basic interior, want to save money.',
      },
      {
        q: 'How many coats of paint should I apply?',
        a: 'Two coats minimum on fresh primer. Three if changing from dark to light. One coat is enough only for refresh of the same colour. Always apply primer first on bare/new walls; primer = 1 extra coat material requirement.',
      },
      {
        q: 'What\'s the difference between distemper and emulsion?',
        a: 'Distemper is cheaper (₹50–₹100 per L), water-soluble, single-use for cheap interior walls. Emulsion is washable, more durable, ₹150–₹350 per L for Indian premium ranges. Emulsion is the modern standard for residential walls.',
      },
    ],
    seo: {
      title: 'Paint Calculator: Gallons of Paint for a Room',
      description: 'Free paint calculator. Estimate gallons of paint required for a room from wall area, coats, and coverage rate. Includes prep allowance.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'carpet-tile-calculator',
    name: 'Carpet & Tile Calculator',
    category: 'daily-life',
    icon: 'Square',
    description: 'Flooring area and boxes needed.',
    usageCount: 18000,
    inputs: [
      { key: 'length', label: 'Room Length', type: 'slider', min: 0.1, max: 50, step: 0.1, default: 5, suffix: 'm', color: 'primary' },
      { key: 'width', label: 'Room Width', type: 'slider', min: 0.1, max: 50, step: 0.1, default: 4, suffix: 'm', color: 'secondary' },
      { key: 'perBox', label: 'Coverage per Box', type: 'slider', min: 0.5, max: 10, step: 0.1, default: 2, suffix: 'm²/box', color: 'tertiary' },
      { key: 'waste', label: 'Waste %', type: 'slider', min: 5, max: 25, step: 1, default: 10, suffix: '%' },
    ],
    outputs: [
      { key: 'totalArea', label: 'Total Area', suffix: 'm²', decimals: 2, primary: true },
      { key: 'boxes', label: 'Boxes Needed', decimals: 0, color: 'secondary' },
    ],
    calculate: (i) => {
      const area = Number(i.length) * Number(i.width);
      const withWaste = area * (1 + Number(i.waste) / 100);
      return { totalArea: withWaste, boxes: Math.ceil(withWaste / Number(i.perBox)) };
    },
    intro:
      "For tiling a floor or laying carpet, you need to know area + extra for waste. A 5m × 4m room = 20 m². Add 10% wastage (cutting, breakage, complex corners) = 22 m². At 2 m² per box (typical for 600×600mm vitrified tiles): you need 11 boxes. Indian tile shops typically sell in box quantities, so always round up. Premium tiles like marble or imported porcelain can run ₹100–₹500/m² in material cost alone.",
    formula: 'Area = Length × Width · With Waste = Area × (1 + Waste%) · Boxes = ⌈Area With Waste ÷ Box Coverage⌉',
    howItWorks:
      "5m × 4m = 20 m² floor area. Add 10% waste = 22 m². Each box of 600×600mm tiles covers about 1.44 m² (4 tiles × 0.36 m²) — varies by tile size. The calculator uses 2 m²/box as default. 22 ÷ 2 = 11 boxes. For diagonal or pattern-laid tiles, increase waste to 15–20% — diagonal layouts produce more cut pieces.",
    ranges: {
      title: 'Common tile sizes and box coverage',
      rows: [
        { label: '300 × 300 mm wall tile', range: '~1.0 m²/box', note: '11 tiles' },
        { label: '600 × 600 mm vitrified tile', range: '~1.44 m²/box', note: '4 tiles per box' },
        { label: '800 × 800 mm large-format', range: '~1.92 m²/box', note: '3 tiles per box' },
        { label: '600 × 1200 mm plank', range: '~1.44 m²/box', note: '2 tiles per box' },
        { label: 'Recommended waste', range: '10–15% straight lay', note: '15–20% diagonal or pattern lay' },
        { label: 'Recommended waste (irregular rooms)', range: '15–20%', note: 'More cuts means more waste' },
      ],
    },
    limitations: [
      "Calculator assumes a rectangular room. For L-shapes or rooms with bays, calculate sub-areas separately and sum.",
      "Box coverage varies by tile size and manufacturer. Always check the actual coverage on the box before ordering.",
      "Doesn't model adhesive or grout — separately budget about 5kg of tile adhesive per m² and 0.5kg of grout per m².",
      "Mosaic and decorative borders need separate calculations. Treat them as line items, not area.",
    ],
    faqs: [
      {
        q: 'How much waste should I plan for tiles?',
        a: '10% for straight-lay rectangular rooms. 15% for L-shaped or rooms with many cuts. 15–20% for diagonal or pattern lays. Less than 10% and you risk running out mid-job — and matching dye lots later is hard.',
      },
      {
        q: 'How do I match dye-lot if I run short?',
        a: 'Tiles from the same batch (dye lot) have consistent colour. Different batches can vary visibly. Always buy 10–15% extra in the same batch up front; matching later is risky and often impossible.',
      },
      {
        q: 'What\'s typical Indian tile pricing?',
        a: 'Basic ceramic ₹35–₹80/sq ft (₹375–₹860/m²). Mid-range vitrified ₹80–₹150/sq ft. Premium polished/glazed ₹150–₹350/sq ft. Imported Italian/Spanish ₹400–₹1,500/sq ft. Plus laying labour ₹50–₹150/sq ft.',
      },
      {
        q: 'Can I lay tiles myself?',
        a: 'Possible but not recommended for first-timers. Requires correct adhesive, levelling, spacing, and grout work. Bad DIY tile work shows for years. Hire skilled labour for 8 hours of laying time per 200 sq ft (~₹4,000–₹8,000 labour cost).',
      },
    ],
    seo: {
      title: 'Carpet & Tile Calculator: Boxes Needed for Flooring',
      description: 'Free carpet and tile calculator. Get total flooring area in sq ft, sq m, and number of boxes required from room dimensions and box coverage.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'countdown-calculator',
    name: 'Countdown Calculator',
    category: 'daily-life',
    icon: 'Hourglass',
    description: 'Time remaining until an event.',
    usageCount: 33000,
    inputs: [
      { key: 'daysAway', label: 'Days Until Event', type: 'slider', min: 0, max: 3650, step: 1, default: 100, suffix: 'days', color: 'primary' },
    ],
    outputs: [
      { key: 'hours', label: 'Total Hours', decimals: 0, primary: true },
      { key: 'minutes', label: 'Total Minutes', decimals: 0, color: 'secondary' },
      { key: 'seconds', label: 'Total Seconds', decimals: 0, color: 'tertiary' },
    ],
    calculate: (i) => {
      const days = Number(i.daysAway);
      return { hours: days * 24, minutes: days * 1440, seconds: days * 86400 };
    },
    intro:
      "Counting down to your wedding, board exam, or product launch? This calculator converts days to hours, minutes, and seconds. 100 days = 2,400 hours = 144,000 minutes = 8.64 million seconds. Useful for setting milestones in long-running projects ('we have 50,000 minutes to launch') or just feeding a tradition of \"how many sleeps till the trip.\"",
    formula: 'Hours = Days × 24 · Minutes = Days × 1,440 · Seconds = Days × 86,400',
    howItWorks:
      "Unit conversion. 100 days × 24 hours/day = 2,400 hours. × 60 minutes/hour = 144,000 minutes. × 60 seconds/minute = 8,640,000 seconds. The seconds number gets dramatic fast — a 100-day countdown sounds long, but stating it as 8.6 million seconds emphasises urgency.",
    ranges: {
      title: 'Time conversion shortcuts',
      rows: [
        { label: '1 day', range: '24 hr · 1,440 min · 86,400 sec', note: '' },
        { label: '1 week', range: '168 hr · 10,080 min · 604,800 sec', note: '' },
        { label: '1 month (30 days)', range: '720 hr · 43,200 min', note: '~2.6M seconds' },
        { label: '1 year (365 days)', range: '8,760 hr · 525,600 min', note: '~31.5M seconds' },
        { label: '1 working year (250 days)', range: '~2,000 hr (40/wk × 50 wk)', note: 'Annual full-time hours' },
      ],
    },
    limitations: [
      "Doesn't account for time of day. \"100 days from now\" is approximate by ±12 hours depending on what hour you start counting.",
      "Doesn't handle date-specific edge cases (DST changes, leap days within the window).",
      "Static — doesn't auto-update as time passes. For a live countdown, use a date-based widget.",
    ],
    faqs: [
      {
        q: 'How many hours in a week?',
        a: '168 hours (24 × 7). Working week is 40–48 hours depending on country; remaining 120+ hours are sleep, meals, leisure, commute.',
      },
      {
        q: 'How do I plan a long project in countdown terms?',
        a: 'Translate days to working hours. A 100-day project ÷ 5-day weeks = 20 weeks × 40 hours = 800 working hours. Subtract holidays and meetings — usable focus time is typically 60–70% = 500–560 hours.',
      },
      {
        q: 'How long is a typical wedding-prep timeline in India?',
        a: '6–12 months (180–365 days) for a full Indian wedding. Major milestones: venue 9 months out, invitations 4 months, outfits 3 months, vendors 2 months, final coordination last 30 days.',
      },
      {
        q: 'What\'s 10,000 hours of practice in days?',
        a: '10,000 hours ÷ 24 = 417 days of continuous work. At 4 hours of deliberate practice per day, that\'s 2,500 days = 6.8 years. The "10,000-hour rule" approximate to mastery in any complex skill.',
      },
    ],
    seo: {
      title: 'Countdown Calculator: Days, Hours, Minutes Until Event',
      description: 'Free countdown calculator. Get the precise time remaining until any future date — days, hours, minutes, and seconds. Useful for events and deadlines.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'gift-calculator',
    name: 'Gift Budget Calculator',
    category: 'daily-life',
    icon: 'Gift',
    description: 'Budget and split gift costs.',
    usageCount: 12000,
    inputs: [
      { key: 'budget', label: 'Total Budget', type: 'slider', min: 10, max: 10000, step: 10, default: 500, prefix: '$', color: 'primary' },
      { key: 'people', label: 'People to Gift', type: 'slider', min: 1, max: 50, step: 1, default: 8, color: 'secondary' },
    ],
    outputs: [
      { key: 'perPerson', label: 'Per Person', prefix: '$', primary: true },
    ],
    calculate: (i) => ({ perPerson: Number(i.budget) / Number(i.people) }),
    intro:
      "Festival gifting math — ₹5,000 budget ÷ 8 people = ₹625 per person. Or office Secret Santa with 12 people and ₹3,000 budget = ₹250 per person. Diwali, Rakshabandhan, weddings, office farewells — Indians spend disproportionate amounts on gifts across the year. This calculator helps you split a fixed budget equally across recipients. For tiered gifting (close family more, colleagues less), tier-list manually.",
    formula: 'Per Person = Total Budget ÷ Number of People',
    howItWorks:
      "₹5,000 ÷ 8 = ₹625 per gift. The slider input lets you tune both. Indian gift-giving tends to inflate during the September-November festival season (Onam, Navratri, Diwali, Bhai Dooj) and again in the wedding season (Nov–Feb). Plan a yearly gift budget (typically 3–5% of household income) and divide across major occasions.",
    ranges: {
      title: 'Typical Indian gift-budget ranges',
      rows: [
        { label: 'Office Secret Santa', range: '₹500 – ₹1,500/person', note: 'Set fixed limit; everyone matches' },
        { label: 'Diwali sweets to colleagues', range: '₹500 – ₹1,000 per box', note: 'For team of 5–10' },
        { label: 'Family Diwali gift', range: '₹1,000 – ₹5,000', note: 'Per immediate family member' },
        { label: 'Friend\'s wedding', range: '₹1,500 – ₹5,000', note: 'Cash gift typical' },
        { label: 'Close family wedding (chunni)', range: '₹5,000 – ₹50,000+', note: 'Varies hugely by relation' },
        { label: 'Annual gifting budget (urban household)', range: '3–5% of annual income', note: '₹30K–₹1L for ₹10L household' },
      ],
    },
    limitations: [
      "Assumes equal gifting. For tiered gifts (close family bigger, distant colleagues smaller), calculate tiers separately.",
      "Doesn't include shipping or wrapping costs — add 10–15% on top of the gift cost for these.",
      "Indian tax: gifts above ₹50,000 from non-relatives are taxable as 'income from other sources.' Gifts between blood relatives are tax-free regardless of value.",
    ],
    faqs: [
      {
        q: 'How much should I spend on a Diwali gift?',
        a: 'Office colleagues ₹500–₹1,000 (sweets box typical). Close family ₹2,000–₹10,000 (kitchenware, dryfruits, jewellery). Domestic help ₹1,000–₹3,000 cash (often called Diwali bonus). Adjust to income — 3–5% of annual income across all festival gifting is reasonable.',
      },
      {
        q: 'Are gifts taxable in India?',
        a: 'Gifts from blood relatives (parent, sibling, child) are always tax-free. Gifts from non-relatives are tax-free up to ₹50,000/year — above that, the entire amount becomes taxable as "income from other sources" at slab rate.',
      },
      {
        q: 'What\'s a good gift for an Indian wedding?',
        a: 'Cash is most appreciated and culturally standard. ₹501, ₹1,501, ₹2,501 etc (odd numbers, ending in 1). Close friends ₹2,500–₹5,000; close family ₹10,000+. Physical gifts (silver coin, cookware) are acceptable from family elders.',
      },
      {
        q: 'How to split office Secret Santa fairly?',
        a: 'Set a strict cap (₹500 or ₹1,000) so the gifts are roughly equal. Higher caps create class divisions — junior employees feel pressure to match senior gifts. Lower caps (₹300–₹500) work better for cross-team events.',
      },
    ],
    seo: {
      title: 'Gift Calculator: Per-Person Gift Budget',
      description: 'Free gift budget calculator. Set a total gift budget and split equally among recipients, with optional per-person variance — for office gifting and group buys.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'tip-calculator-daily',
    name: 'Quick Tip Calculator',
    category: 'daily-life',
    icon: 'Coffee',
    description: 'Fast tip calculation for any bill.',
    usageCount: 142000,
    inputs: [
      { key: 'bill', label: 'Bill Amount', type: 'slider', min: 1, max: 1000, step: 0.5, default: 50, prefix: '$', color: 'primary' },
      { key: 'service', label: 'Service Quality (1-5)', type: 'slider', min: 1, max: 5, step: 1, default: 4, color: 'secondary' },
    ],
    outputs: [
      { key: 'tip', label: 'Suggested Tip', prefix: '$', primary: true },
      { key: 'total', label: 'Total Bill', prefix: '$', color: 'secondary' },
      { key: 'tipPct', label: 'Tip Percentage', suffix: '%', color: 'tertiary' },
    ],
    calculate: (i) => {
      const pctMap = [10, 12, 15, 18, 22];
      const tipPct = pctMap[Number(i.service) - 1];
      const tip = Number(i.bill) * (tipPct / 100);
      return { tip, total: Number(i.bill) + tip, tipPct };
    },
    intro:
      "Quick tip math based on service quality. Pick service quality 1–5 and the calculator picks the appropriate tip percentage (10–22%). ₹2,500 bill with service quality 4 (good) → 18% tip = ₹450 → ₹2,950 total. India norms differ from US — 5–10% is generous in most casual restaurants here, especially if service charge is already on the bill. Use this for international restaurants or for situations where you want a percentage-based tip.",
    formula: 'Service 1: 10% · 2: 12% · 3: 15% · 4: 18% · 5: 22% · Tip = Bill × %',
    howItWorks:
      "The quality input picks a percentage. Service quality 1 (poor) → 10%, 2 (below average) → 12%, 3 (acceptable) → 15%, 4 (good) → 18%, 5 (excellent) → 22%. The calculator then multiplies the bill by that percentage. For Indian context, scale these down — 10–15% is the typical max even for great service if service charge isn't on the bill.",
    ranges: {
      title: 'Tipping norms by country',
      rows: [
        { label: 'United States', range: '18–22% (sit-down)', note: 'Mandatory in practice' },
        { label: 'United Kingdom / Europe', range: '10–15%', note: 'Often included as service charge' },
        { label: 'India', range: '5–10% (no service charge)', note: '0 if service charge already added' },
        { label: 'Japan', range: '0%', note: 'Tipping can offend' },
        { label: 'China', range: '0–5%', note: 'Not traditional; growing in tourist areas' },
        { label: 'Middle East', range: '10–15%', note: 'Often included' },
        { label: 'Australia / NZ', range: '0–10%', note: 'Living-wage system means tipping not expected' },
      ],
    },
    limitations: [
      "Calculator uses US-style tip ranges (10–22%). Adjust mentally if your local norm is different.",
      "Doesn't account for service charge already on the bill. If your restaurant adds 10% service charge, that\'s already the tip — don\'t double-tip.",
      "Service quality input is subjective. Most servers do their best regardless of menu/kitchen issues that aren\'t their fault.",
    ],
    faqs: [
      {
        q: 'Should I tip in India?',
        a: 'For casual restaurants without service charge: 5–10% is appreciated. For premium restaurants with 10% service charge already on bill: nothing extra. For delivery: ₹20–₹50 if you can. For taxis: round up + ₹10–₹20.',
      },
      {
        q: 'Is the service charge mandatory in India?',
        a: 'No. Per Department of Consumer Affairs guidelines (2022), service charge is voluntary — you can refuse to pay it. In practice many restaurants resist removing it. If you object, politely ask them to take it off the bill.',
      },
      {
        q: 'How much to tip in US restaurants?',
        a: '18% is the minimum for adequate service; 20% is the comfortable default; 22–25% for exceptional service. Below 15% sends a message; below 10% is considered rude unless service was genuinely bad.',
      },
      {
        q: 'Should I tip on the pre-tax or post-tax amount?',
        a: 'In US convention, pre-tax. In practice many people tip on the total. The difference is usually small (5–10% of tip amount). Indians typically tip on the bill total since GST is built in.',
      },
    ],
    seo: {
      title: 'Quick Tip Calculator: Tip & Total in Seconds',
      description: 'Free quick tip calculator. Drop in a bill and tip percentage to get the tip amount and final total instantly — no extras, just the math.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
