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
  },
];
