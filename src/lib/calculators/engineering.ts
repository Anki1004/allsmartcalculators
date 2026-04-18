import { CalculatorConfig } from '../calculator-types';

export const engineeringCalculators: CalculatorConfig[] = [
  {
    slug: 'ohms-law-calculator',
    name: "Ohm's Law Calculator",
    category: 'engineering',
    icon: 'Zap',
    description: 'V = IR, find voltage, current, or resistance.',
    usageCount: 52000,
    inputs: [
      { key: 'voltage', label: 'Voltage', type: 'slider', min: 0, max: 240, step: 0.1, default: 12, suffix: 'V', color: 'primary' },
      { key: 'current', label: 'Current', type: 'slider', min: 0.001, max: 100, step: 0.01, default: 2, suffix: 'A', color: 'secondary' },
    ],
    outputs: [
      { key: 'resistance', label: 'Resistance', suffix: 'Ω', decimals: 3, primary: true },
      { key: 'power', label: 'Power', suffix: 'W', decimals: 3, color: 'secondary' },
    ],
    calculate: (i) => {
      const v = Number(i.voltage);
      const a = Number(i.current);
      return { resistance: a > 0 ? v / a : 0, power: v * a };
    },
  },
  {
    slug: 'voltage-divider-calculator',
    name: 'Voltage Divider',
    category: 'engineering',
    icon: 'GitBranch',
    description: 'Calculate output voltage for a divider.',
    usageCount: 28000,
    inputs: [
      { key: 'vin', label: 'Input Voltage', type: 'slider', min: 0, max: 50, step: 0.1, default: 12, suffix: 'V', color: 'primary' },
      { key: 'r1', label: 'R1', type: 'slider', min: 1, max: 100000, step: 10, default: 1000, suffix: 'Ω', color: 'secondary' },
      { key: 'r2', label: 'R2', type: 'slider', min: 1, max: 100000, step: 10, default: 2000, suffix: 'Ω', color: 'tertiary' },
    ],
    outputs: [
      { key: 'vout', label: 'Output Voltage', suffix: 'V', decimals: 4, primary: true },
      { key: 'current', label: 'Current', suffix: 'mA', decimals: 3, color: 'secondary' },
    ],
    calculate: (i) => {
      const vin = Number(i.vin);
      const r1 = Number(i.r1);
      const r2 = Number(i.r2);
      const vout = vin * (r2 / (r1 + r2));
      return { vout, current: r1 + r2 > 0 ? (vin / (r1 + r2)) * 1000 : 0 };
    },
  },
  {
    slug: 'power-calculator-electrical',
    name: 'Electrical Power',
    category: 'engineering',
    icon: 'Plug',
    description: 'Calculate electrical power (P = VI).',
    usageCount: 34000,
    inputs: [
      { key: 'voltage', label: 'Voltage', type: 'slider', min: 0, max: 500, step: 1, default: 120, suffix: 'V', color: 'primary' },
      { key: 'current', label: 'Current', type: 'slider', min: 0, max: 100, step: 0.1, default: 5, suffix: 'A', color: 'secondary' },
      { key: 'pf', label: 'Power Factor', type: 'slider', min: 0, max: 1, step: 0.01, default: 0.9, color: 'tertiary' },
    ],
    outputs: [
      { key: 'realPower', label: 'Real Power', suffix: 'W', decimals: 1, primary: true },
      { key: 'apparentPower', label: 'Apparent Power', suffix: 'VA', decimals: 1, color: 'secondary' },
    ],
    calculate: (i) => {
      const va = Number(i.voltage) * Number(i.current);
      return { realPower: va * Number(i.pf), apparentPower: va };
    },
  },
  {
    slug: 'torque-calculator',
    name: 'Torque Calculator',
    category: 'engineering',
    icon: 'RotateCw',
    description: 'Torque from force and lever arm.',
    usageCount: 19000,
    inputs: [
      { key: 'force', label: 'Force', type: 'slider', min: 0, max: 10000, step: 1, default: 100, suffix: 'N', color: 'primary' },
      { key: 'distance', label: 'Lever Arm', type: 'slider', min: 0.01, max: 5, step: 0.01, default: 0.5, suffix: 'm', color: 'secondary' },
      { key: 'angle', label: 'Angle', type: 'slider', min: 0, max: 180, step: 1, default: 90, suffix: '°', color: 'tertiary' },
    ],
    outputs: [
      { key: 'torque', label: 'Torque', suffix: 'N·m', decimals: 3, primary: true },
    ],
    calculate: (i) => ({
      torque: Number(i.force) * Number(i.distance) * Math.sin((Number(i.angle) * Math.PI) / 180),
    }),
  },
  {
    slug: 'unit-converter',
    name: 'Unit Converter',
    category: 'engineering',
    icon: 'Ruler',
    description: 'Convert between metric and imperial.',
    trending: true,
    usageCount: 112000,
    inputs: [
      { key: 'meters', label: 'Meters', type: 'slider', min: 0, max: 10000, step: 0.1, default: 100, suffix: 'm', color: 'primary' },
    ],
    outputs: [
      { key: 'feet', label: 'Feet', suffix: 'ft', decimals: 3, primary: true },
      { key: 'yards', label: 'Yards', suffix: 'yd', decimals: 3, color: 'secondary' },
      { key: 'miles', label: 'Miles', suffix: 'mi', decimals: 6, color: 'tertiary' },
      { key: 'inches', label: 'Inches', suffix: 'in', decimals: 2 },
    ],
    calculate: (i) => {
      const m = Number(i.meters);
      return {
        feet: m * 3.28084,
        yards: m * 1.09361,
        miles: m * 0.000621371,
        inches: m * 39.3701,
      };
    },
  },
  {
    slug: 'concrete-calculator',
    name: 'Concrete Calculator',
    category: 'engineering',
    icon: 'Package',
    description: 'Calculate concrete volume for slabs.',
    usageCount: 37000,
    inputs: [
      { key: 'length', label: 'Length', type: 'slider', min: 0.1, max: 100, step: 0.1, default: 10, suffix: 'm', color: 'primary' },
      { key: 'width', label: 'Width', type: 'slider', min: 0.1, max: 100, step: 0.1, default: 5, suffix: 'm', color: 'secondary' },
      { key: 'depth', label: 'Depth', type: 'slider', min: 0.01, max: 2, step: 0.01, default: 0.15, suffix: 'm', color: 'tertiary' },
    ],
    outputs: [
      { key: 'volume', label: 'Volume', suffix: 'm³', decimals: 3, primary: true },
      { key: 'bags', label: 'Bags of Cement', suffix: 'bags', decimals: 0, color: 'secondary' },
    ],
    calculate: (i) => {
      const volume = Number(i.length) * Number(i.width) * Number(i.depth);
      return { volume, bags: Math.ceil(volume * 7.5) };
    },
  },
  {
    slug: 'pipe-flow-calculator',
    name: 'Pipe Flow Calculator',
    category: 'engineering',
    icon: 'Cylinder',
    description: 'Flow rate through circular pipe.',
    usageCount: 14000,
    inputs: [
      { key: 'diameter', label: 'Pipe Diameter', type: 'slider', min: 1, max: 1000, step: 1, default: 100, suffix: 'mm', color: 'primary' },
      { key: 'velocity', label: 'Flow Velocity', type: 'slider', min: 0.1, max: 10, step: 0.1, default: 2, suffix: 'm/s', color: 'secondary' },
    ],
    outputs: [
      { key: 'flowRate', label: 'Flow Rate', suffix: 'L/s', decimals: 3, primary: true },
      { key: 'area', label: 'Cross-Section Area', suffix: 'mm²', decimals: 1, color: 'secondary' },
    ],
    calculate: (i) => {
      const r = Number(i.diameter) / 2 / 1000;
      const area = Math.PI * r * r;
      const flowRate = area * Number(i.velocity) * 1000;
      return { flowRate, area: area * 1e6 };
    },
  },
  {
    slug: 'gear-ratio-calculator',
    name: 'Gear Ratio Calculator',
    category: 'engineering',
    icon: 'Settings',
    description: 'Calculate gear ratios and output RPM.',
    usageCount: 16000,
    inputs: [
      { key: 'drivenTeeth', label: 'Driven Gear Teeth', type: 'slider', min: 5, max: 200, step: 1, default: 40, color: 'primary' },
      { key: 'driverTeeth', label: 'Driver Gear Teeth', type: 'slider', min: 5, max: 200, step: 1, default: 10, color: 'secondary' },
      { key: 'inputRpm', label: 'Input RPM', type: 'slider', min: 10, max: 10000, step: 10, default: 1500, suffix: 'RPM', color: 'tertiary' },
    ],
    outputs: [
      { key: 'ratio', label: 'Gear Ratio', decimals: 3, primary: true },
      { key: 'outputRpm', label: 'Output RPM', suffix: 'RPM', decimals: 0, color: 'secondary' },
    ],
    calculate: (i) => {
      const ratio = Number(i.drivenTeeth) / Number(i.driverTeeth);
      return { ratio, outputRpm: Number(i.inputRpm) / ratio };
    },
  },
  {
    slug: 'rpm-calculator',
    name: 'RPM Calculator',
    category: 'engineering',
    icon: 'RotateCw',
    description: 'Surface speed to RPM conversion.',
    usageCount: 11000,
    inputs: [
      { key: 'surfaceSpeed', label: 'Surface Speed', type: 'slider', min: 1, max: 1000, step: 1, default: 100, suffix: 'm/min', color: 'primary' },
      { key: 'diameter', label: 'Diameter', type: 'slider', min: 1, max: 500, step: 1, default: 50, suffix: 'mm', color: 'secondary' },
    ],
    outputs: [
      { key: 'rpm', label: 'RPM', decimals: 0, primary: true },
    ],
    calculate: (i) => ({
      rpm: (Number(i.surfaceSpeed) * 1000) / (Math.PI * Number(i.diameter)),
    }),
  },
  {
    slug: 'resistor-color-code',
    name: 'Resistor Color Code',
    category: 'engineering',
    icon: 'Palette',
    description: 'Resistance from 4-band color code.',
    usageCount: 23000,
    inputs: [
      { key: 'band1', label: 'Band 1 (0-9)', type: 'slider', min: 0, max: 9, step: 1, default: 2, color: 'primary' },
      { key: 'band2', label: 'Band 2 (0-9)', type: 'slider', min: 0, max: 9, step: 1, default: 2, color: 'secondary' },
      { key: 'multiplier', label: 'Multiplier (10^n)', type: 'slider', min: 0, max: 9, step: 1, default: 2, color: 'tertiary' },
    ],
    outputs: [
      { key: 'resistance', label: 'Resistance', suffix: 'Ω', decimals: 0, primary: true },
    ],
    calculate: (i) => ({
      resistance:
        (Number(i.band1) * 10 + Number(i.band2)) * Math.pow(10, Number(i.multiplier)),
    }),
  },
];
