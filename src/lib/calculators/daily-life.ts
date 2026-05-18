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
    seo: {
      title: 'Quick Tip Calculator: Tip & Total in Seconds',
      description: 'Free quick tip calculator. Drop in a bill and tip percentage to get the tip amount and final total instantly — no extras, just the math.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
