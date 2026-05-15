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
    intro:
      "Ohm's Law (V = I × R) is the most fundamental relationship in DC circuit analysis. Given any two of the three (voltage, current, resistance), you can find the third. This calculator takes V and I and returns R and power (P = V × I). For a 12V battery driving 2A through a load: R = 12/2 = 6Ω, P = 12 × 2 = 24W. Used in every electronics class, hobby project, and electrical-system design.",
    formula: 'V = I × R · R = V ÷ I · I = V ÷ R · P = V × I = I²R = V² ÷ R',
    howItWorks:
      "Voltage is electrical pressure (volts). Current is the flow rate of electrons (amps). Resistance opposes flow (ohms). V = IR means doubling voltage doubles current at fixed resistance; doubling resistance halves current at fixed voltage. Power = V × I gives watts dissipated. A 12V, 2A circuit dissipates 24W — equivalent to ₹0.30/hour at ₹12/kWh electricity.",
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
    faqs: [
      {
        q: 'What is Ohm\'s Law in simple terms?',
        a: 'The voltage across a resistor equals the current through it times its resistance. V = I × R. Doubling voltage doubles current; doubling resistance halves current.',
      },
      {
        q: 'How do I calculate power dissipation?',
        a: 'P = V × I (watts). Or equivalently: P = I² × R, or P = V² ÷ R. Same answer all three ways.',
      },
      {
        q: 'Does Ohm\'s Law apply to AC circuits?',
        a: 'Only for pure resistive AC loads using RMS values. For circuits with capacitors or inductors, use impedance Z (complex resistance) instead of R.',
      },
      {
        q: 'Why are house wires rated by amperage?',
        a: 'Because heat dissipation (and fire risk) depends on I²R. Wire size limits the maximum current it can carry without overheating. 15A wiring at 230V can deliver up to 3,450W; 32A wiring delivers 7,360W.',
      },
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
    intro:
      "A voltage divider produces a smaller voltage from a larger one using two resistors in series. Vout = Vin × R2 ÷ (R1 + R2). For Vin = 12V, R1 = 1kΩ, R2 = 2kΩ: Vout = 12 × 2/(1+2) = 8V. Used for sensor signal conditioning, ADC input scaling, and creating reference voltages. The divider current is small (4mA in this example), so the voltage holds steady only when nothing significant draws current from the output.",
    formula: 'Vout = Vin × R2 ÷ (R1 + R2) · I = Vin ÷ (R1 + R2)',
    howItWorks:
      "Two resistors in series share the input voltage in proportion to their resistance values. Vin = 12V, R1 = 1kΩ, R2 = 2kΩ. Current through both: I = 12 / (1000 + 2000) = 4mA. Voltage across R2: 4mA × 2kΩ = 8V — that's Vout. Voltage across R1: 4mA × 1kΩ = 4V. Together they sum to 12V (Kirchhoff's law). If you load the output with a low-impedance device, Vout drops because the load is in parallel with R2.",
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
    faqs: [
      {
        q: 'How does a voltage divider work?',
        a: 'Two resistors in series across a voltage source share the voltage in proportion to their resistance. Tapping the junction between them gives a reduced voltage. Larger R2 → larger Vout; larger R1 → smaller Vout.',
      },
      {
        q: 'Why does my voltage divider not give the expected output?',
        a: 'Almost always because something is loading the output. Connecting a 1kΩ load to a divider with R2 = 1kΩ effectively halves R2 (parallel resistance), dropping Vout significantly. Use buffer op-amp for high-impedance output.',
      },
      {
        q: 'What\'s a typical use for a voltage divider?',
        a: 'Sensor signal conditioning (scaling a 12V sensor to a 5V Arduino input), reference voltage generation for ADCs, biasing transistor circuits, scope probes (10× attenuation), battery monitors.',
      },
      {
        q: 'How do I choose R1 and R2 values?',
        a: 'Pick the ratio for the output voltage you want. Pick absolute values for current draw — too small and you waste power; too large and load effects dominate. 1k-100k range is typical for sensor applications.',
      },
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
    intro:
      "Electrical power = voltage × current × power factor. For DC and resistive AC loads, power factor = 1 and P = V × I. For AC loads with motors or capacitors, power factor (PF) is less than 1, and real power (watts you pay for) is less than apparent power (VA you draw from supply). 230V × 5A × PF 0.9 = 1,035W real, 1,150VA apparent. Indian electricity meters bill on real power (kWh), but utilities sometimes penalise large customers for low PF.",
    formula: 'Apparent Power (VA) = V × I · Real Power (W) = V × I × PF · Reactive Power = √(VA² − W²)',
    howItWorks:
      "Apparent power = V × I (volts × amps), measured in VA. Real power (watts) accounts for the phase shift between V and I in reactive loads — multiply by power factor. A motor at 230V drawing 5A with PF 0.9: VA = 1,150, real W = 1,035. The 115VA difference is reactive — it goes back and forth between source and motor magnetic fields, not consumed but loading the wires.",
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
    faqs: [
      {
        q: 'What is power factor?',
        a: 'The ratio of real power (watts you use) to apparent power (VA you draw from supply). PF = 1 means all current is in phase with voltage; PF less than 1 means some current is wasted on charging/discharging magnetic fields or capacitors.',
      },
      {
        q: 'Why does Indian utility care about power factor?',
        a: 'Low PF means more current for the same useful power. Utilities have to size cables and transformers for the higher current. Most commercial tariffs penalise PF below 0.95.',
      },
      {
        q: 'What\'s the difference between kW and kVA?',
        a: 'kW is real power — what the load actually consumes. kVA is apparent power — what the supply must provide. UPS and gensets are rated in kVA because they care about the current they need to provide; bills are in kWh (kW × hours).',
      },
      {
        q: 'How do I improve power factor?',
        a: 'Add capacitors (for inductive loads like motors). Most commercial buildings with PF below 0.85 install capacitor banks tuned to the load. Modern electronics typically have built-in PF correction.',
      },
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
    intro:
      "Torque is rotational force — what makes a wrench turn a bolt or an engine drive a crankshaft. τ = F × r × sin(θ), where F is applied force, r is lever arm length, and θ is the angle between them. Maximum torque comes at 90° (perpendicular). 100N applied at 0.5m perpendicular gives 50 N·m torque. Bolt-tightening torque specs are typically 10–200 N·m for cars; engine output is in the 100–500 N·m range.",
    formula: 'τ = F × r × sin θ · Maximum at θ = 90° (perpendicular force)',
    howItWorks:
      "For perpendicular force (θ = 90°, sin = 1), torque = force × lever arm. 100N at 0.5m = 50 N·m. If you apply force at an angle, only the perpendicular component contributes — multiply by sin θ. At 45°, you get sin 45° ≈ 0.707, so effective torque = 35.4 N·m for the same force and lever arm. A long wrench gives more torque per applied force — that's why mechanics use breaker bars.",
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
    faqs: [
      {
        q: 'What\'s the difference between torque and power?',
        a: 'Torque is rotational force (N·m). Power = torque × angular velocity (W). A high-torque, low-RPM engine and a low-torque, high-RPM engine can produce the same power. Trucks need high torque for hauling; sports cars need high power for top speed.',
      },
      {
        q: 'How do I increase torque with a wrench?',
        a: 'Use a longer lever arm. Doubling the wrench length doubles the torque for the same applied force. That\'s why "breaker bars" (long wrenches) help loosen seized bolts.',
      },
      {
        q: 'Why is the angle important?',
        a: 'Only the perpendicular component of force creates torque. Pulling at 45° gives sin(45°) ≈ 71% of the maximum torque you\'d get with a perpendicular pull. Always pull at 90° to the wrench handle.',
      },
      {
        q: 'How do I convert N·m to lb·ft?',
        a: '1 N·m = 0.737 lb·ft. So 100 N·m = 73.7 lb·ft. Car spec sheets often give both; multiply by 0.737 to convert metric → imperial.',
      },
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
    intro:
      "India uses metric (metres, kilograms, litres) but old measurements (feet, inches, pounds) keep showing up in real estate, fitness, and shipping from the US. This calculator converts metres to feet, yards, miles, and inches. 100 metres = 328.08 feet = 109.36 yards = 0.062 miles = 3937 inches. Useful for property measurements (1 sq ft in Indian builder language is still mostly imperial despite metric land records), athletic distances, and tool sizing.",
    formula: '1 m = 3.28084 ft = 1.09361 yd = 0.000621371 mi = 39.3701 in',
    howItWorks:
      "Linear scaling using the metric-to-imperial conversion factors. 100 metres × 3.28084 = 328.08 ft. 1 km = 1000 m = 3,280 ft ≈ 0.62 miles. 1 metre is roughly 39.37 inches — slightly more than a US yard. Memorisation tricks: 1m ≈ 3.3 ft, 1km ≈ 0.6 mi, 1 inch = exactly 2.54 cm.",
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
    faqs: [
      {
        q: 'How do I convert metres to feet?',
        a: 'Multiply by 3.28084. 100m × 3.28084 = 328.08 ft. Quick mental approximation: multiply by 3.3.',
      },
      {
        q: 'What\'s an easy way to remember km-to-miles?',
        a: '1 km ≈ 0.62 miles. Quick math: km × 0.6 + small adjustment, or km × 5 ÷ 8. A 10 km run is 6.2 miles. A marathon (42.2 km) is 26.2 miles.',
      },
      {
        q: 'Are Indian property sizes in feet or metres?',
        a: 'Both. Land records are officially in square metres (or local units like bigha, kanal). Builders advertise in square feet (1 BHK = 600–900 sq ft). 1 sq m = 10.764 sq ft.',
      },
      {
        q: 'Why is 1 inch exactly 2.54 cm?',
        a: 'Defined by international agreement in 1959. The "international yard and pound" agreement set 1 yard = 0.9144 m exactly, making 1 ft = 0.3048 m and 1 inch = 2.54 cm exactly.',
      },
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
    intro:
      "For pouring a concrete slab or foundation, you need to know how much concrete to order or mix. Volume = length × width × depth (in metres). A 10m × 5m × 150mm slab needs 7.5 m³ of concrete. At a typical 1:2:4 mix (cement:sand:aggregate), that's about 56 bags of 50kg cement. Indian builders typically use M20 grade (1:1.5:3) for residential slabs; M25 or M30 for heavier loads. Always order 5–10% extra for spillage and over-pour.",
    formula: 'Volume (m³) = Length × Width × Depth · Cement bags ≈ Volume × 7.5 (for M20 1:1.5:3 mix)',
    howItWorks:
      "10m × 5m × 0.15m = 7.5 m³ of concrete needed. The bag estimate uses M20 grade (1:1.5:3 cement:sand:aggregate) which needs about 7.5 bags of 50kg cement per m³. So 7.5 × 7.5 = 56 bags. Higher grades (M25 = 1:1:2) need more cement: about 8.5 bags/m³. Always order 5–10% extra to account for spillage, uneven base, and over-pour at edges.",
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
    faqs: [
      {
        q: 'How much cement is needed per m³ of concrete?',
        a: 'For M20 grade (most common residential): ~7.5 bags of 50kg cement per m³. M15: ~5.7 bags. M25: ~8.5 bags. M30: ~9.5 bags. Plus sand, aggregate, and water in proportions matching the grade.',
      },
      {
        q: 'What grade of concrete should I use?',
        a: 'M20 for slabs and ordinary RCC work in residential buildings. M25 or M30 for columns and beams in 4+ story buildings. M15 only for footpaths and non-structural fills. M10 only for the lean-concrete base under foundations.',
      },
      {
        q: 'Should I use ready-mix concrete (RMC) or site mix?',
        a: 'RMC for slabs above 5 m³ (consistent quality, faster pour, less waste). Site mix for small jobs (under 2 m³) where RMC mobilisation cost makes it uneconomical. RMC trucks need road access — check before ordering.',
      },
      {
        q: 'How long should concrete cure?',
        a: '28 days for full design strength. Critical loads (formwork removal, walking on slab) shouldn\'t happen for at least 7 days. Keep concrete moist for 14 days minimum — dry curing reduces final strength significantly.',
      },
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
    intro:
      "Volume flow rate through a circular pipe = cross-sectional area × velocity. Q = πr²v. A 100mm pipe with water moving at 2 m/s carries about 15.7 L/s (~942 L/min). Used in plumbing design, irrigation, HVAC sizing, and fluid mechanics. Indian residential plumbing typically uses 15–25mm pipes for taps, 25–40mm for risers; commercial systems use 50–150mm mains.",
    formula: 'Q = A × v = π(D/2)² × v · Where Q is m³/s, A is m², D is diameter in m, v is m/s',
    howItWorks:
      "Cross-sectional area of a 100mm pipe: π × (50/1000)² = π × 0.0025 = 0.00785 m² = 7,854 mm². At 2 m/s velocity: Q = 0.00785 × 2 = 0.0157 m³/s = 15.7 L/s = 942 L/min. The flow rate is highly sensitive to diameter — doubling diameter (100mm → 200mm) quadruples flow at the same velocity, because area scales with diameter².",
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
    faqs: [
      {
        q: 'How do I size a pipe for a given flow?',
        a: 'Pick a target velocity (1–2 m/s for typical water supply, 1.5–3 m/s for steam, 0.5–1 m/s for drain), then size the diameter to give that flow at the target velocity. Smaller pipes mean higher friction losses but lower cost.',
      },
      {
        q: 'Why does velocity matter?',
        a: 'Too low velocity (< 0.5 m/s) lets sediment settle; too high (> 3 m/s in water) causes noise, erosion, and water hammer. Standard plumbing aims for 1–2 m/s in supply lines.',
      },
      {
        q: 'How does diameter affect flow rate?',
        a: 'Quadratically. Doubling diameter (at constant velocity) quadruples flow because area scales with D². At constant pressure (which doesn\'t hold for real pipes), flow scales with D^2.5 to D^5 depending on the regime.',
      },
      {
        q: 'What\'s the difference between flow rate and pressure?',
        a: 'Flow rate is volume per time (L/s, m³/h). Pressure is force per area (bar, psi, kPa). For a given pipe, increasing pressure increases flow — but friction means doubling pressure doesn\'t exactly double flow.',
      },
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
    intro:
      "Gear ratio = driven teeth ÷ driver teeth. A 40-tooth driven gear paired with a 10-tooth driver gives a 4:1 ratio — output RPM is reduced by 4× while torque is multiplied by 4× (ignoring friction). At 1500 input RPM, output is 375 RPM. Used in everything from bicycles to car gearboxes to industrial machinery. The trade-off is fundamental: gearing down for torque costs speed; gearing up for speed costs torque.",
    formula: 'Ratio = Driven Teeth ÷ Driver Teeth · Output RPM = Input RPM ÷ Ratio · Torque scales by Ratio',
    howItWorks:
      "Driver gear (the one being turned) meshes with the driven gear (the one it turns). If the driven gear has more teeth, it rotates slower but with more torque. 10-tooth driver × 40-tooth driven = 4:1 ratio. 1500 RPM input → 375 RPM output. The driven gear has 4× the torque the driver had. For multi-stage gearboxes, multiply individual ratios — three 2:1 stages give an 8:1 overall ratio.",
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
    faqs: [
      {
        q: 'What is gear ratio?',
        a: 'The ratio of driven-gear teeth to driver-gear teeth. A 4:1 ratio means 4 turns of input give 1 turn of output. Lower ratios (closer to 1:1) preserve speed; higher ratios reduce speed but multiply torque.',
      },
      {
        q: 'Why do cars need multiple gears?',
        a: 'Internal combustion engines produce peak torque in a narrow RPM band (~2,000–4,000 RPM). Multiple gear ratios let the engine stay in its peak band while wheel speed varies from 0 to 200+ km/h. Electric motors have wide torque bands and often need just one gear.',
      },
      {
        q: 'What does "geared down" vs "geared up" mean?',
        a: 'Geared down (ratio > 1:1) — output is slower and has more torque. Geared up (ratio less than 1:1, overdrive) — output is faster but has less torque. Cars use down-gearing for acceleration and hill climbing, up-gearing for cruising.',
      },
      {
        q: 'How do I calculate output torque?',
        a: 'Output torque = input torque × ratio (ignoring losses). A 100 N·m engine through a 4:1 gear delivers 400 N·m to the next stage. Account for ~2–5% loss per stage in practice.',
      },
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
    intro:
      "For machining, the right RPM depends on the cutting tool's surface speed (the linear speed of the cutting edge) and the workpiece diameter. Higher surface speed = better cut quality and tool life, but only up to material limits. RPM = (surface speed × 1000) ÷ (π × diameter). For mild steel at 100 m/min surface speed on a 50mm workpiece: RPM = 100,000 ÷ 157 ≈ 637 RPM.",
    formula: 'RPM = (Surface Speed in m/min × 1000) ÷ (π × Diameter in mm)',
    howItWorks:
      "Cutting tools have recommended surface speeds based on material — too slow and the tool drags, too fast and it overheats. HSS tools on mild steel like ~30 m/min; carbide can run 100–200 m/min on the same material. For a 50mm diameter workpiece at 100 m/min: RPM = (100 × 1000) ÷ (3.14159 × 50) ≈ 637 RPM. Smaller diameters need higher RPM for the same surface speed.",
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
    faqs: [
      {
        q: 'What is surface speed?',
        a: 'The linear speed of the cutting edge of a tool relative to the workpiece, measured in m/min or sfm (surface feet per minute). It\'s the rotational speed at the cutting radius — what the tool actually "feels."',
      },
      {
        q: 'Why does surface speed matter more than RPM?',
        a: 'Because cutting performance depends on the chip-formation conditions at the tool tip — temperature, force, friction. Those are determined by surface speed, not by RPM directly. A 10mm endmill at 1000 RPM and a 100mm workpiece at 100 RPM have the same surface speed.',
      },
      {
        q: 'How do I find the right surface speed?',
        a: 'Check machinist handbooks or tool manufacturer datasheets for your material + tool grade combination. Sandvik, Iscar, and Kennametal publish recommended cutting parameters online for their inserts.',
      },
      {
        q: 'How does RPM change as I cut deeper?',
        a: 'For turning operations, RPM stays constant once set. But effective surface speed drops as the workpiece diameter decreases mid-cut. Modern CNC lathes have constant-surface-speed (CSS) mode that auto-adjusts RPM to maintain target surface speed.',
      },
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
    intro:
      "Through-hole resistors use color bands to encode their value — the first two bands are significant digits, the third is the multiplier (power of 10), and the fourth is tolerance. This calculator decodes the digits and multiplier. Band 1 = 2 (Red), Band 2 = 2 (Red), Multiplier = 2 (10²): value = 22 × 100 = 2,200 Ω = 2.2kΩ. Essential for hobby electronics, repair work, and circuit prototyping.",
    formula: 'Resistance = (Band1 × 10 + Band2) × 10^Multiplier',
    howItWorks:
      "Each colour maps to a digit: Black 0, Brown 1, Red 2, Orange 3, Yellow 4, Green 5, Blue 6, Violet 7, Grey 8, White 9. The first two bands form the significant digits; the third is a multiplier (10ⁿ). For Red-Red-Red: 2, 2, ×10² = 22 × 100 = 2,200 Ω = 2.2kΩ. Read from the side closer to the bands — the tolerance band (gold/silver) is on the opposite end.",
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
    faqs: [
      {
        q: 'How do I read a 4-band resistor?',
        a: 'First two bands are significant digits, third band is multiplier (10ⁿ), fourth band is tolerance. Read from the side opposite to the tolerance band (gold or silver). Example Red-Red-Red-Gold: 22 × 100 ± 5% = 2,200 Ω ± 5%.',
      },
      {
        q: 'What\'s the difference between 4-band and 5-band resistors?',
        a: '4-band: 2 significant digits + multiplier + tolerance (typically ±5% or ±10%). 5-band: 3 significant digits + multiplier + tolerance (typically ±1% or better). 5-band is for precision applications.',
      },
      {
        q: 'Which side has the tolerance band?',
        a: 'The tolerance band (gold or silver) is usually slightly separated from the other three. Hold the resistor with the gold/silver band on your right; read left to right.',
      },
      {
        q: 'What if I read the resistor backward?',
        a: 'You\'ll get a wildly wrong value. For 2.2kΩ (Red-Red-Red-Gold), reading backward gives Gold-Red-Red-Red — which isn\'t a valid code starting with gold. Most reversals are detected this way. When in doubt, measure with a multimeter.',
      },
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
