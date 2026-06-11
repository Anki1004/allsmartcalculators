import { CalculatorConfig } from '../calculator-types';

/** Render a 0–23.75 decimal hour as a 12-hour clock label, e.g. 9.25 -> "9:15 AM". */
const formatClock = (v: number): string => {
  const h = Math.floor(v);
  const m = Math.round((v % 1) * 60);
  const period = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const dailyLifeUsCalculators: CalculatorConfig[] = [
  {
    slug: 'time-card-calculator',
    name: 'Time Card Calculator',
    category: 'daily-life',
    icon: 'Clock',
    description: 'Add up your weekly work hours from daily clock-in/out times and breaks, with overtime at 1.5x after 40 hours — totals in both hh:mm and decimal hours.',
    custom: 'time-card',
    inputs: [],
    outputs: [],
    calculate: () => ({}),
    seo: {
      title: 'Time Card Calculator: Weekly Hours & Overtime Pay',
      description: 'Free time card calculator. Add daily clock-in/out times and breaks to total weekly work hours, with FLSA overtime at 1.5x over 40 hours, in hh:mm and decimal.',
      applicationCategory: 'BusinessApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['hours-calculator', 'paycheck-calculator', 'salary-to-hourly'],
  },
  {
    slug: 'square-footage-calculator',
    name: 'Square Footage Calculator',
    category: 'daily-life',
    icon: 'Ruler',
    description: 'Find the square footage of rectangles, circles, triangles, and border/frame areas — with square-meter conversion and an optional material cost estimate.',
    inputs: [
      {
        key: 'shape',
        label: 'Shape',
        type: 'select',
        default: 'rectangle',
        options: [
          { label: 'Rectangle', value: 'rectangle' },
          { label: 'Circle', value: 'circle' },
          { label: 'Triangle', value: 'triangle' },
          { label: 'Border / frame', value: 'border' },
        ],
        color: 'primary',
      },
      { key: 'length', label: 'Length / Diameter / Base', type: 'slider', min: 0.5, max: 200, step: 0.5, default: 12, suffix: 'ft', color: 'secondary' },
      { key: 'width', label: 'Width / Height', type: 'slider', min: 0.5, max: 200, step: 0.5, default: 10, suffix: 'ft', color: 'tertiary' },
      { key: 'borderWidth', label: 'Border width (border shape only)', type: 'slider', min: 0.5, max: 20, step: 0.5, default: 3, suffix: 'ft', color: 'primary' },
      { key: 'quantity', label: 'Quantity', type: 'slider', min: 1, max: 50, step: 1, default: 1, color: 'secondary' },
      { key: 'price', label: 'Price per sq ft (0 = skip cost)', type: 'slider', min: 0, max: 100, step: 0.25, default: 0, prefix: '$', color: 'tertiary' },
    ],
    outputs: [
      { key: 'sqft', label: 'Square Footage', suffix: 'sq ft', decimals: 2, primary: true },
      { key: 'sqm', label: 'Square Meters', suffix: 'm²', decimals: 2, color: 'secondary' },
      { key: 'cost', label: 'Estimated Cost', prefix: '$', decimals: 2, color: 'tertiary' },
      { key: 'perUnit', label: 'Per Unit', suffix: 'sq ft', decimals: 2, color: 'secondary' },
    ],
    calculate: (i) => {
      const shape = String(i.shape);
      const L = Number(i.length);
      const W = Number(i.width);
      const b = Number(i.borderWidth);
      const qty = Number(i.quantity);
      const price = Number(i.price);
      let unitArea: number;
      if (shape === 'circle') {
        unitArea = Math.PI * Math.pow(L / 2, 2);
      } else if (shape === 'triangle') {
        unitArea = 0.5 * L * W;
      } else if (shape === 'border') {
        unitArea = (L + 2 * b) * (W + 2 * b) - L * W;
      } else {
        unitArea = L * W;
      }
      const area = unitArea * qty;
      return {
        sqft: area,
        sqm: area * 0.09290304,
        cost: area * price,
        perUnit: unitArea,
      };
    },
    seo: {
      title: 'Square Footage Calculator: Area & Cost per Sq Ft',
      description: 'Free square footage calculator. Get the area of rectangles, circles, triangles, and borders in sq ft and m², plus total material cost at your price per sq ft.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['paint-calculator', 'carpet-tile-calculator', 'concrete-calculator'],
  },
  {
    slug: 'love-calculator',
    name: 'Love Calculator',
    category: 'daily-life',
    icon: 'Heart',
    description: 'Type two names to get a playful 0–100 compatibility score and a verdict — just for fun, with zero science involved.',
    inputs: [
      { key: 'name1', label: 'Your Name', type: 'text', default: '', placeholder: 'e.g. Alex', color: 'primary' },
      { key: 'name2', label: 'Their Name', type: 'text', default: '', placeholder: 'e.g. Jordan', color: 'secondary' },
    ],
    outputs: [
      { key: 'score', label: 'Compatibility', suffix: '%', decimals: 0, primary: true },
      { key: 'verdict', label: 'Verdict', color: 'secondary' },
    ],
    calculate: (i) => {
      const a = String(i.name1).toLowerCase().replace(/[^a-z]/g, '');
      const b = String(i.name2).toLowerCase().replace(/[^a-z]/g, '');
      if (!a || !b) {
        return { score: 0, verdict: 'Enter both names to see your score' };
      }
      const combined = a + b;
      let sum = 0;
      for (let k = 0; k < combined.length; k++) {
        sum += combined.charCodeAt(k);
      }
      const score = sum % 101;
      let verdict: string;
      if (score >= 90) verdict = 'Written in the stars ✨';
      else if (score >= 75) verdict = 'A power couple in the making';
      else if (score >= 60) verdict = 'Sparks are definitely flying';
      else if (score >= 40) verdict = 'Worth a coffee date';
      else if (score >= 20) verdict = 'Friendship looks strong';
      else verdict = 'Opposites... very opposite';
      return { score, verdict };
    },
    seo: {
      title: 'Love Calculator: Name Compatibility Test (For Fun)',
      description: 'Free love calculator. Type two names to get a 0–100 compatibility score and a playful verdict. Deterministic, instant, and purely for entertainment.',
      applicationCategory: 'EntertainmentApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['age-calculator', 'date-difference', 'countdown-calculator'],
  },
  {
    slug: 'hours-calculator',
    name: 'Hours Calculator',
    category: 'daily-life',
    icon: 'Hourglass',
    description: 'Find the hours between a start and end time, subtract unpaid breaks, and handle overnight shifts — results in hh:mm and decimal hours.',
    inputs: [
      { key: 'start', label: 'Start Time', type: 'slider', min: 0, max: 23.75, step: 0.25, default: 9, color: 'primary', formatValue: formatClock },
      { key: 'end', label: 'End Time', type: 'slider', min: 0, max: 23.75, step: 0.25, default: 17, color: 'secondary', formatValue: formatClock },
      { key: 'breakMin', label: 'Unpaid Break', type: 'slider', min: 0, max: 180, step: 5, default: 30, suffix: 'min', color: 'tertiary' },
    ],
    outputs: [
      { key: 'duration', label: 'Duration', primary: true },
      { key: 'decimal', label: 'Decimal Hours', suffix: 'hrs', decimals: 2, color: 'secondary' },
      { key: 'minutes', label: 'Minutes Total', decimals: 0, color: 'tertiary' },
    ],
    calculate: (i) => {
      const start = Number(i.start);
      const end = Number(i.end);
      const brk = Number(i.breakMin);
      let minutes = (end - start) * 60;
      if (end <= start) minutes += 24 * 60; // overnight shift
      minutes = Math.max(0, Math.round(minutes - brk));
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      return {
        duration: `${h}:${String(m).padStart(2, '0')}`,
        decimal: minutes / 60,
        minutes,
      };
    },
    seo: {
      title: 'Hours Calculator: Hours Between Two Times',
      description: 'Free hours calculator. Find hours between a start and end time, subtract unpaid breaks, and handle overnight shifts — results in hh:mm and decimal hours.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['time-card-calculator', 'date-difference', 'paycheck-calculator'],
  },
  {
    slug: 'date-calculator',
    name: 'Date Calculator',
    category: 'daily-life',
    icon: 'Calendar',
    description: 'Add or subtract days, weeks, months, or years from any date — with an optional business-days mode that skips weekends.',
    inputs: [
      { key: 'year', label: 'Base Year', type: 'slider', min: 1900, max: 2100, step: 1, default: 2026, color: 'primary' },
      {
        key: 'month',
        label: 'Base Month',
        type: 'slider',
        min: 1,
        max: 12,
        step: 1,
        default: 6,
        color: 'secondary',
        formatValue: (v: number) => MONTH_NAMES[Math.min(11, Math.max(0, Math.round(v) - 1))],
      },
      { key: 'day', label: 'Base Day', type: 'slider', min: 1, max: 31, step: 1, default: 15, color: 'tertiary' },
      {
        key: 'operation',
        label: 'Operation',
        type: 'select',
        default: 'add',
        options: [
          { label: 'Add', value: 'add' },
          { label: 'Subtract', value: 'subtract' },
        ],
        color: 'primary',
      },
      { key: 'amount', label: 'Amount', type: 'slider', min: 0, max: 1000, step: 1, default: 30, color: 'secondary' },
      {
        key: 'unit',
        label: 'Unit',
        type: 'select',
        default: 'days',
        options: [
          { label: 'Days', value: 'days' },
          { label: 'Weeks', value: 'weeks' },
          { label: 'Months', value: 'months' },
          { label: 'Years', value: 'years' },
        ],
        color: 'tertiary',
      },
      {
        key: 'businessDays',
        label: 'Business days only (days/weeks)',
        type: 'select',
        default: 'no',
        options: [
          { label: 'No', value: 'no' },
          { label: 'Yes — skip weekends', value: 'yes' },
        ],
        color: 'primary',
      },
    ],
    outputs: [
      { key: 'date', label: 'Resulting Date', primary: true },
      { key: 'weekday', label: 'Day of Week', color: 'secondary' },
      { key: 'diff', label: 'Days From Base', decimals: 0, color: 'tertiary' },
    ],
    calculate: (i) => {
      const y = Number(i.year);
      const mo = Number(i.month);
      const dRaw = Number(i.day);
      const sign = String(i.operation) === 'subtract' ? -1 : 1;
      const amount = Number(i.amount);
      const unit = String(i.unit);
      const business = String(i.businessDays) === 'yes';
      const daysInMonth = (yy: number, mm: number) => new Date(yy, mm, 0).getDate();

      const d = Math.min(dRaw, daysInMonth(y, mo));
      const base = new Date(y, mo - 1, d);
      let result: Date;

      if (unit === 'months' || unit === 'years') {
        // Calendar shift; business-day option is ignored for months/years.
        const monthIndex = unit === 'months' ? mo - 1 + sign * amount : mo - 1;
        const targetY = unit === 'years' ? y + sign * amount : y + Math.floor(monthIndex / 12);
        const targetM = unit === 'years' ? mo : ((monthIndex % 12) + 12) % 12 + 1;
        result = new Date(targetY, targetM - 1, Math.min(d, daysInMonth(targetY, targetM)));
      } else {
        const totalDays = unit === 'weeks' ? amount * 7 : amount;
        result = new Date(base.getTime());
        if (business) {
          let remaining = Math.min(totalDays, 7000);
          while (remaining > 0) {
            result.setDate(result.getDate() + sign);
            const dow = result.getDay();
            if (dow !== 0 && dow !== 6) remaining--;
          }
        } else {
          result.setDate(result.getDate() + sign * totalDays);
        }
      }

      const diff = Math.round(Math.abs(result.getTime() - base.getTime()) / 86400000);
      return {
        date: result.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        weekday: result.toLocaleDateString('en-US', { weekday: 'long' }),
        diff,
      };
    },
    seo: {
      title: 'Date Calculator: Add or Subtract Days, Weeks, Months',
      description: 'Free date calculator. Add or subtract days, weeks, months, or years from any date, with a business-day mode that skips weekends, plus the day of week.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['date-difference', 'countdown-calculator', 'age-calculator'],
  },
  {
    slug: 'gas-mileage-calculator',
    name: 'Gas Mileage Calculator',
    category: 'daily-life',
    icon: 'Fuel',
    description: 'Compute your real-world MPG from miles driven and gallons used — plus cost per mile, total trip fuel cost, and the metric L/100km equivalent.',
    inputs: [
      { key: 'miles', label: 'Miles Driven', type: 'slider', min: 1, max: 2000, step: 1, default: 300, suffix: 'mi', color: 'primary' },
      { key: 'gallons', label: 'Gallons Used', type: 'slider', min: 0.5, max: 100, step: 0.1, default: 12, suffix: 'gal', color: 'secondary' },
      { key: 'price', label: 'Fuel price per gallon (0 = skip cost)', type: 'slider', min: 0, max: 8, step: 0.01, default: 3.5, prefix: '$', color: 'tertiary' },
    ],
    outputs: [
      { key: 'mpg', label: 'Fuel Economy', suffix: 'MPG', decimals: 1, primary: true },
      { key: 'costPerMile', label: 'Cost per Mile', prefix: '$', decimals: 3, color: 'secondary' },
      { key: 'tripCost', label: 'Trip Fuel Cost', prefix: '$', decimals: 2, color: 'tertiary' },
      { key: 'l100km', label: 'L/100km', decimals: 1, color: 'secondary' },
    ],
    calculate: (i) => {
      const miles = Number(i.miles);
      const gallons = Number(i.gallons);
      const price = Number(i.price);
      if (gallons <= 0 || miles <= 0) {
        return { mpg: 0, costPerMile: 0, tripCost: 0, l100km: 0 };
      }
      const mpg = miles / gallons;
      return {
        mpg,
        costPerMile: price > 0 ? price / mpg : 0,
        tripCost: gallons * price,
        l100km: 235.215 / mpg,
      };
    },
    seo: {
      title: 'Gas Mileage Calculator: MPG & Cost per Mile',
      description: 'Free gas mileage calculator. Get MPG from miles driven and gallons used, plus cost per mile, trip fuel cost, and the L/100km conversion for any vehicle.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-06-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
    relatedSlugs: ['fuel-cost-calculator', 'travel-time-calculator'],
  },
];
