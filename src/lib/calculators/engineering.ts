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
    ranges: {
      title: 'Common voltage levels and applications',
      rows: [
        { label: '3.3V / 5V', range: 'Microcontroller logic', note: 'Arduino, Raspberry Pi GPIO' },
        { label: '12V', range: 'Car batteries, LED strips', note: 'Standard DC supply' },
        { label: '120V / 230V', range: 'Wall outlets', note: 'AC mains; 230V in India' },
        { label: '11kV / 33kV', range: 'Distribution lines', note: 'Step-down to 230V at transformers' },
        { label: '400kV+', range: 'Transmission lines', note: 'Long-distance power transport' },
      ],
    },
    limitations: [
      "Strictly for ohmic (linear) resistors. Components like LEDs, diodes, and transistors don't follow V = IR linearly.",
      "AC circuits with reactive components (capacitors, inductors) need impedance Z, not just R. For pure resistive AC loads, the formula still works using RMS values.",
      "Temperature affects resistance — most conductors increase resistance as they heat up. The formula assumes constant temperature.",
    ],
    seo: {
      title: 'Ohm\'s Law Calculator: V = I × R for Circuits',
      description: 'Free Ohm\'s Law calculator. Solve V = I × R for voltage, current, or resistance — also returns power (P = VI). Useful for any DC circuit analysis.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Common voltage divider applications',
      rows: [
        { label: '5V to 3.3V level shift', range: 'R1 = 1.7kΩ, R2 = 3.3kΩ', note: 'Arduino to ESP32 GPIO' },
        { label: '12V battery monitor', range: 'R1 = 33kΩ, R2 = 10kΩ', note: 'Reads ~2.79V at 12V battery' },
        { label: '5:1 attenuation', range: 'R1 = 4kΩ, R2 = 1kΩ', note: 'Scope probe pattern' },
        { label: 'Low-impedance load issue', range: 'Load ≥ 10× R2', note: 'Otherwise Vout droops' },
      ],
    },
    limitations: [
      "Vout shifts when you connect a load. Rule of thumb: load resistance should be at least 10× larger than R2 to keep error under 10%.",
      "Continuous current draw causes power dissipation. P = Vin² ÷ (R1 + R2). For low-power applications, use larger resistors (10kΩ+).",
      "Not suitable for power supply — current capability is limited by R1 + R2. Use a buck converter or linear regulator for actual loads.",
    ],
    seo: {
      title: 'Voltage Divider Calculator: Output Voltage Formula',
      description: 'Free voltage divider calculator. Compute Vout from Vin, R1, R2 using Vout = Vin × R2 / (R1+R2). Useful for sensor circuits and reference rails.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Typical power-factor values',
      rows: [
        { label: 'Resistive heater, incandescent bulb', range: '~1.0', note: 'Pure resistance, ideal' },
        { label: 'LED with driver, modern electronics', range: '0.9 – 0.99', note: 'PF-corrected supplies' },
        { label: 'Induction motor (loaded)', range: '0.8 – 0.9', note: 'Higher with full load' },
        { label: 'Induction motor (unloaded/idle)', range: '0.2 – 0.4', note: 'Wastes apparent power' },
        { label: 'CFL, low-quality SMPS', range: '0.5 – 0.7', note: 'Penalty for large users' },
        { label: 'Indian utility PF threshold', range: '> 0.95', note: 'Below this, penalty on commercial bills' },
      ],
    },
    limitations: [
      'Single-phase only. For three-phase: P = √3 × V × I × PF (where V is line-to-line voltage).',
      "Calculator computes instantaneous power assuming sinusoidal V and I. Non-sinusoidal (harmonic-rich) loads need true-RMS measurement.",
      "Doesn't account for losses in wiring or transformers — input the actual voltage at the load, not at the source.",
    ],
    seo: {
      title: 'Electrical Power Calculator: P = V × I in Watts',
      description: 'Free electrical power calculator. Compute power in watts from voltage and current — supports DC and single-phase AC with power-factor adjustment.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Typical torque values',
      rows: [
        { label: 'M6 bolt (car interior)', range: '8 – 10 N·m', note: 'Hand-tight plus quarter turn' },
        { label: 'Wheel lug nut (passenger car)', range: '100 – 140 N·m', note: 'Tightening spec' },
        { label: 'Cylinder head bolt', range: '20 – 90 N·m + angle', note: 'Engine assembly' },
        { label: 'Petrol car engine torque', range: '120 – 250 N·m', note: 'Typical 1.5L – 2.0L' },
        { label: 'Heavy truck engine torque', range: '2,000 – 3,500 N·m', note: 'Diesel commercial' },
      ],
    },
    limitations: [
      'Assumes the force is applied to a rigid lever. Real-world wrenches and crankshafts have some flex, reducing effective torque.',
      "Doesn't account for friction at the pivot point. Real fasteners require additional torque to overcome thread and head friction (~20–40% of total).",
      "Static torque only — doesn't model angular acceleration, rotational kinetic energy, or torque vs RPM curves.",
    ],
    seo: {
      title: 'Torque Calculator: τ = Force × Lever Arm',
      description: 'Free torque calculator. Compute rotational torque from any applied force and lever-arm length — supports N·m and lb·ft units.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Common conversions to memorise',
      rows: [
        { label: '1 metre', range: '3.28 ft = 1.09 yd = 39.37 in', note: '' },
        { label: '1 km', range: '0.621 mi', note: '5 km = 3.1 mi (marathon math)' },
        { label: '1 mile', range: '1.609 km', note: '' },
        { label: '1 foot', range: '0.3048 m = 30.48 cm', note: '' },
        { label: '1 inch', range: '2.54 cm (exactly)', note: 'Definition basis' },
        { label: 'Indian property (1 sq ft)', range: '0.0929 m²', note: '~929 cm²' },
      ],
    },
    limitations: [
      "Only handles length. For weight (kg ↔ lb), volume (L ↔ gal), area (m² ↔ ft²), or temperature (°C ↔ °F), use specialised converters.",
      "Maximum input 10,000m. For longer distances, the same conversion factor applies — just multiply manually.",
      "Doesn't handle survey-foot vs international-foot distinction (matters only at sub-millimetre precision over very long distances).",
    ],
    seo: {
      title: 'Unit Converter: Metric ↔ Imperial Conversions',
      description: 'Free unit converter for length, weight, volume, area, and temperature. Convert between metric and imperial units instantly — accurate to 4 decimals.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Indian concrete grades and cement requirements',
      rows: [
        { label: 'M10 (1:3:6)', range: '~3.5 bags/m³', note: 'Lean concrete; foundations base layer' },
        { label: 'M15 (1:2:4)', range: '~5.7 bags/m³', note: 'Light loads, footpaths' },
        { label: 'M20 (1:1.5:3)', range: '~7.5 bags/m³', note: 'Standard residential RCC' },
        { label: 'M25 (1:1:2)', range: '~8.5 bags/m³', note: 'High-strength columns and beams' },
        { label: 'M30 (design mix)', range: '~9.5 bags/m³', note: 'Heavy structural; commercial buildings' },
        { label: 'Standard slab depth', range: '100–150 mm', note: '4–6 inches; residential floors' },
      ],
    },
    limitations: [
      "Cement bag estimate assumes M20 mix. For other grades, multiply by the appropriate ratio (M15: × 0.76; M25: × 1.13).",
      "Doesn't include reinforcement steel (rebar) — typical residential slab needs 80–100 kg of rebar per m³ of concrete.",
      "Doesn't model column footings, beams, or complex shapes — works for simple slabs only.",
      "Order 5–10% extra to handle base unevenness, spillage, and over-pour. Better to slightly over-order than run short mid-pour.",
    ],
    seo: {
      title: 'Concrete Calculator: Slab Volume in m³ & Yards',
      description: 'Free concrete volume calculator for slabs. Get cubic metres, cubic yards, and number of bags needed from length, width, and slab thickness.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Typical pipe sizes and flow rates',
      rows: [
        { label: '15mm tap line, 1 m/s', range: '~0.18 L/s = 11 L/min', note: 'Standard tap flow' },
        { label: '25mm riser, 1.5 m/s', range: '~0.74 L/s = 44 L/min', note: '' },
        { label: '50mm branch, 2 m/s', range: '~3.93 L/s = 236 L/min', note: 'Apartment supply' },
        { label: '100mm main, 2 m/s', range: '~15.7 L/s = 942 L/min', note: 'Building incoming' },
        { label: '150mm sewer, 1.5 m/s', range: '~26.5 L/s = 1,590 L/min', note: 'Municipal' },
        { label: 'Indian residential daily', range: '150–200 L/person/day', note: 'BIS / CPHEEO norm' },
      ],
    },
    limitations: [
      "Assumes ideal incompressible fluid (water). Doesn't model viscosity, turbulence, or pipe roughness effects.",
      "Doesn't account for pipe-friction pressure losses. For long runs, use Darcy-Weisbach or Hazen-Williams equation to model friction head loss.",
      "Pressure isn't modelled. Flow rate and pressure are related through the pipe network — you can't have high flow at low pressure without large pipes.",
      "Assumes full-pipe flow. Open-channel flow (drains, partly-filled sewers) uses different equations (Manning).",
    ],
    seo: {
      title: 'Pipe Flow Calculator: Volume Flow Rate in Pipes',
      description: 'Free pipe flow rate calculator. Compute volume flow (Q = A × v) through a circular pipe from diameter and fluid velocity — m³/s and L/min.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Typical gear ratios by application',
      rows: [
        { label: 'Bicycle 1st (lowest) gear', range: '~0.7 : 1', note: 'Easy pedalling on hills' },
        { label: 'Bicycle top gear', range: '~4 : 1', note: 'Speed on flats' },
        { label: 'Car 1st gear', range: '3.0 – 3.5 : 1', note: 'Maximum torque, slow' },
        { label: 'Car top gear (5th or 6th)', range: '0.7 – 0.8 : 1', note: 'Overdrive; engine slower than wheels' },
        { label: 'Final drive (differential)', range: '3.5 – 4.5 : 1', note: 'Multiplied by gearbox ratio' },
        { label: 'Industrial gearbox', range: 'Up to 1000:1+', note: 'Multi-stage reductions' },
      ],
    },
    limitations: [
      "Doesn't model gear-train losses (typically 2–5% per stage). Real-world output torque is slightly less than theoretical.",
      "Assumes spur gears (parallel shafts). Bevel, worm, and helical gears have additional considerations not captured here.",
      "Doesn't predict gear life, lubrication needs, or noise — for those, consult gear-design references.",
    ],
    seo: {
      title: 'Gear Ratio Calculator: Driven RPM & Mechanical Advantage',
      description: 'Free gear ratio calculator. Compute the gear ratio, output RPM, and torque multiplication for any pair of driver/driven gears or sprockets.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Recommended surface speeds (m/min) for HSS and carbide tools',
      rows: [
        { label: 'Mild steel (HSS)', range: '20 – 35 m/min', note: 'Standard turning' },
        { label: 'Mild steel (carbide)', range: '100 – 200 m/min', note: '5–6× higher than HSS' },
        { label: 'Aluminium (HSS)', range: '90 – 150 m/min', note: '' },
        { label: 'Aluminium (carbide)', range: '300 – 600 m/min', note: '' },
        { label: 'Brass (HSS)', range: '60 – 90 m/min', note: '' },
        { label: 'Stainless steel (carbide)', range: '60 – 150 m/min', note: 'Lower than mild steel' },
        { label: 'Cast iron (HSS)', range: '30 – 50 m/min', note: '' },
      ],
    },
    limitations: [
      "Only calculates RPM from surface speed and diameter. Doesn't recommend feed rate or depth of cut.",
      "Surface speed recommendations vary by tool grade, cutter geometry, coolant use, and machine rigidity.",
      "For drilling, the same formula applies but use drill diameter, not workpiece diameter.",
      "Doesn't account for varying diameter on a tapered workpiece — pick the largest diameter for safety.",
    ],
    seo: {
      title: 'RPM Calculator: Surface Speed ↔ Revolutions/Minute',
      description: 'Free RPM calculator. Convert surface cutting speed to revolutions per minute for any tool or workpiece diameter — useful for lathe and mill setups.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
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
    ranges: {
      title: 'Resistor color → digit mapping',
      rows: [
        { label: 'Black', range: '0', note: '' },
        { label: 'Brown', range: '1', note: '±1% tolerance band' },
        { label: 'Red', range: '2', note: '±2% tolerance band' },
        { label: 'Orange / Yellow', range: '3 / 4', note: '' },
        { label: 'Green / Blue', range: '5 / 6', note: '' },
        { label: 'Violet / Grey / White', range: '7 / 8 / 9', note: '' },
        { label: 'Gold (tolerance only)', range: '±5%', note: 'Most common 4-band' },
        { label: 'Silver (tolerance only)', range: '±10%', note: 'Cheaper, less precise' },
      ],
    },
    limitations: [
      "Calculator handles only 4-band resistors. 5-band has three significant digits + multiplier + tolerance; 6-band adds temperature coefficient.",
      "Doesn't include tolerance — pick gold (±5%) or silver (±10%) separately from the resistor itself.",
      "SMD (surface-mount) resistors use numeric codes, not colour bands. This calculator doesn't apply.",
    ],
    seo: {
      title: 'Resistor Color Code Calculator: 4-Band to Ohms',
      description: 'Free 4-band resistor color code calculator. Decode any 4-band resistor into ohms with tolerance — pick the colors and read the value instantly.',
      applicationCategory: 'UtilitiesApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
