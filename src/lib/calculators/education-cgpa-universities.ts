import { CalculatorConfig } from '../calculator-types';

// ─────────────────────────────────────────────────────────────────────────────
// University-specific CGPA → percentage calculators.
//
// Why these exist: /education/cgpa-calculator and /education/percentage-to-gpa
// are the two best-ranking pages the site has (avg position 2.29 and 5.17 in the
// 2026-07-31 GSC export) while every finance page sits far below. Each Indian
// university publishes its OWN conversion rule in its ordinance, students search
// for their own university by name, and no large site covers them individually
// because each one is too small on its own. That is exactly the shape of query
// this domain can win.
//
// These are NOT permutation pages. Each university differs in the multiplier,
// the deduction, the grade letters, and the class/division cut-offs, so each
// page answers a materially different question.
//
// ── ACCURACY CONTRACT ────────────────────────────────────────────────────────
// `formulaConfidence` is deliberately part of the data, not a comment:
//   'documented' — the conversion rule is stated in the university's own
//                  ordinance/FAQ and is stable across schemes.
//   'verify'     — believed correct but NOT yet checked against the primary
//                  source. Do not add these slugs to INDEXABLE_CALCULATORS until
//                  someone reads the ordinance PDF and flips this field.
// Letter-grade tables live in the article prose (calculator-content), not here,
// and are only stated for universities whose bands could be confirmed.
// ─────────────────────────────────────────────────────────────────────────────

interface UniversityRule {
  slug: string;
  /** Short name used in the H1 and title — how students actually search. */
  short: string;
  /** Full legal name, used once in the article for disambiguation. */
  full: string;
  /** Human-readable formula, rendered on the page. */
  formula: string;
  /** The conversion itself. Input is CGPA on the university's own scale. */
  convert: (cgpa: number) => number;
  /** Max CGPA on this university's scale (10 for most, 10 for CBSE too). */
  scaleMax: number;
  formulaConfidence: 'documented' | 'verify';
  /** Percentage cut-offs for the class/division this university awards. */
  classBands: { min: number; label: string }[];
  /** One-line note explaining where the rule comes from. */
  basis: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

/** The conventional Indian division cut-offs, used where a university does not
    publish its own. Kept in one place so the fallback is obvious. */
const STANDARD_CLASS_BANDS = [
  { min: 75, label: 'First Class with Distinction' },
  { min: 60, label: 'First Class' },
  { min: 50, label: 'Second Class' },
  { min: 40, label: 'Pass Class' },
  { min: 0, label: 'Fail' },
];

export const UNIVERSITY_CGPA_RULES: UniversityRule[] = [
  {
    slug: 'vtu-cgpa-to-percentage',
    short: 'VTU',
    full: 'Visvesvaraya Technological University, Belagavi',
    formula: 'Percentage = (CGPA − 0.75) × 10',
    convert: (c) => (c - 0.75) * 10,
    scaleMax: 10,
    formulaConfidence: 'documented',
    classBands: STANDARD_CLASS_BANDS,
    basis: 'VTU CBCS scheme — the 0.75 deduction appears on the university transcript itself.',
    description:
      'Convert your VTU CGPA to a percentage using the official (CGPA − 0.75) × 10 rule printed on the VTU transcript — with the CBCS grade table and your class/division.',
    seoTitle: 'VTU CGPA to Percentage Calculator (CBCS Formula)',
    seoDescription:
      'Convert VTU CGPA to percentage with the official (CGPA − 0.75) × 10 formula. Free calculator with the VTU CBCS grade table, division cut-offs and a full CGPA reference chart.',
  },
  {
    slug: 'aktu-cgpa-to-percentage',
    short: 'AKTU',
    full: 'Dr. A.P.J. Abdul Kalam Technical University, Lucknow',
    formula: 'Percentage = (CGPA − 0.75) × 10',
    convert: (c) => (c - 0.75) * 10,
    scaleMax: 10,
    formulaConfidence: 'documented',
    classBands: STANDARD_CLASS_BANDS,
    basis:
      'AKTU (formerly UPTU) applies the same 0.75 deduction as VTU; it is quoted on AKTU result portals and in the evaluation scheme.',
    description:
      'Convert your AKTU (UPTU) CGPA to a percentage using the (CGPA − 0.75) × 10 rule, and see which division that percentage puts you in.',
    seoTitle: 'AKTU CGPA to Percentage Calculator (UPTU Formula)',
    seoDescription:
      'Free AKTU CGPA to percentage calculator using the official (CGPA − 0.75) × 10 formula. Works for all AKTU/UPTU B.Tech, MBA and MCA results, with division cut-offs.',
  },
  {
    slug: 'jntu-cgpa-to-percentage',
    short: 'JNTU',
    full: 'Jawaharlal Nehru Technological University (Hyderabad, Kakinada and Anantapur)',
    formula: 'Percentage = (CGPA − 0.75) × 10',
    convert: (c) => (c - 0.75) * 10,
    scaleMax: 10,
    formulaConfidence: 'documented',
    classBands: STANDARD_CLASS_BANDS,
    basis:
      'All three JNTU campuses (JNTUH, JNTUK, JNTUA) use the 0.75 deduction under the R18/R19/R20 regulations.',
    description:
      'Convert JNTUH, JNTUK or JNTUA CGPA to a percentage with the (CGPA − 0.75) × 10 rule used across all three JNTU campuses.',
    seoTitle: 'JNTU CGPA to Percentage Calculator (JNTUH/JNTUK/JNTUA)',
    seoDescription:
      'Convert JNTU CGPA to percentage using the official (CGPA − 0.75) × 10 formula. Works for JNTUH, JNTUK and JNTUA under R18, R19 and R20 regulations.',
  },
  {
    slug: 'anna-university-cgpa-to-percentage',
    short: 'Anna University',
    full: 'Anna University, Chennai',
    formula: 'Percentage = CGPA × 10',
    convert: (c) => c * 10,
    scaleMax: 10,
    formulaConfidence: 'documented',
    classBands: STANDARD_CLASS_BANDS,
    basis:
      'Anna University applies a straight ×10 conversion with no deduction — the single most common point of confusion for students moving between Tamil Nadu and other states.',
    description:
      'Convert Anna University CGPA to a percentage. Anna University uses a straight CGPA × 10 with no 0.75 deduction — this calculator shows exactly what that means for your marks.',
    seoTitle: 'Anna University CGPA to Percentage Calculator',
    seoDescription:
      'Convert Anna University CGPA to percentage with the official CGPA × 10 formula (no deduction). Free calculator with class cut-offs and a full conversion chart.',
  },
  {
    slug: 'osmania-cgpa-to-percentage',
    short: 'Osmania University',
    full: 'Osmania University, Hyderabad',
    formula: 'Percentage = (CGPA − 0.5) × 10',
    convert: (c) => (c - 0.5) * 10,
    scaleMax: 10,
    formulaConfidence: 'verify',
    classBands: STANDARD_CLASS_BANDS,
    basis:
      'Osmania uses a 0.5 deduction rather than the 0.75 used by VTU/AKTU/JNTU. Confirm against the current OU examination branch circular before indexing.',
    description:
      'Convert Osmania University CGPA to a percentage using the (CGPA − 0.5) × 10 rule — note the deduction is 0.5, not the 0.75 used by JNTU.',
    seoTitle: 'Osmania University CGPA to Percentage Calculator',
    seoDescription:
      'Convert Osmania University (OU) CGPA to percentage with the (CGPA − 0.5) × 10 formula. Free calculator with division cut-offs and a CGPA reference chart.',
  },
  {
    slug: 'gtu-cgpa-to-percentage',
    short: 'GTU',
    full: 'Gujarat Technological University, Ahmedabad',
    formula: 'Percentage = (CGPA − 0.5) × 10',
    convert: (c) => (c - 0.5) * 10,
    scaleMax: 10,
    formulaConfidence: 'verify',
    classBands: STANDARD_CLASS_BANDS,
    basis:
      'GTU publishes a CPI/CGPA-to-percentage rule with a 0.5 deduction. Confirm against the current GTU academic circular before indexing.',
    description:
      'Convert GTU CGPA (CPI) to a percentage using the (CGPA − 0.5) × 10 rule, with the division your percentage falls into.',
    seoTitle: 'GTU CGPA to Percentage Calculator (CPI Conversion)',
    seoDescription:
      'Convert GTU CGPA or CPI to percentage using the (CGPA − 0.5) × 10 formula. Free calculator for GTU B.E., diploma and MBA results with division cut-offs.',
  },
  {
    slug: 'ipu-cgpa-to-percentage',
    short: 'GGSIPU',
    full: 'Guru Gobind Singh Indraprastha University, Delhi',
    formula: 'Percentage = (CGPA − 0.75) × 10',
    convert: (c) => (c - 0.75) * 10,
    scaleMax: 10,
    formulaConfidence: 'verify',
    classBands: STANDARD_CLASS_BANDS,
    basis:
      'GGSIPU is widely quoted as using the 0.75 deduction. Confirm against the current IPU examination division notification before indexing.',
    description:
      'Convert GGSIPU (IP University) CGPA to a percentage using the (CGPA − 0.75) × 10 rule, with your resulting division.',
    seoTitle: 'IPU CGPA to Percentage Calculator (GGSIPU Formula)',
    seoDescription:
      'Convert GGSIPU / IP University CGPA to percentage with the (CGPA − 0.75) × 10 formula. Free calculator with division cut-offs and a full conversion chart.',
  },
  {
    slug: 'du-cgpa-to-percentage',
    short: 'Delhi University',
    full: 'University of Delhi',
    formula: 'Percentage = CGPA × 9.5',
    convert: (c) => c * 9.5,
    scaleMax: 10,
    formulaConfidence: 'documented',
    classBands: STANDARD_CLASS_BANDS,
    basis:
      'DU applies the same 9.5 multiplier CBSE uses, under its CBCS scheme — notably different from GGSIPU in the same city, which deducts 0.75 first.',
    description:
      'Convert Delhi University CGPA to a percentage with the × 9.5 multiplier used under the DU CBCS scheme — and see why an IPU student with the same CGPA reports a lower figure.',
    seoTitle: 'DU CGPA to Percentage Calculator (Delhi University)',
    seoDescription:
      'Convert Delhi University CGPA to percentage using the × 9.5 CBCS multiplier. Free calculator with division cut-offs and a full CGPA-to-percentage chart.',
  },
  {
    slug: 'ktu-cgpa-to-percentage',
    short: 'KTU',
    full: 'APJ Abdul Kalam Technological University, Kerala',
    formula: 'Percentage = (CGPA − 0.5) × 10',
    convert: (c) => (c - 0.5) * 10,
    scaleMax: 10,
    formulaConfidence: 'verify',
    classBands: STANDARD_CLASS_BANDS,
    basis:
      'KTU is generally quoted as using a 0.5 deduction. Confirm against the current KTU academic regulation before indexing.',
    description:
      'Convert KTU (Kerala Technological University) CGPA to a percentage using the (CGPA − 0.5) × 10 rule, with the division your percentage falls into.',
    seoTitle: 'KTU CGPA to Percentage Calculator (Kerala Tech University)',
    seoDescription:
      'Convert KTU CGPA to percentage with the (CGPA − 0.5) × 10 formula. Free calculator for KTU B.Tech results with division cut-offs and a conversion chart.',
  },
  {
    slug: 'bput-cgpa-to-percentage',
    short: 'BPUT',
    full: 'Biju Patnaik University of Technology, Odisha',
    formula: 'Percentage = (CGPA − 0.5) × 10',
    convert: (c) => (c - 0.5) * 10,
    scaleMax: 10,
    formulaConfidence: 'verify',
    classBands: STANDARD_CLASS_BANDS,
    basis:
      'BPUT is generally quoted as using a 0.5 deduction. Confirm against the current BPUT examination regulation before indexing.',
    description:
      'Convert BPUT (Odisha) CGPA to a percentage using the (CGPA − 0.5) × 10 rule, with your resulting class or division.',
    seoTitle: 'BPUT CGPA to Percentage Calculator (Odisha)',
    seoDescription:
      'Convert BPUT CGPA to percentage using the (CGPA − 0.5) × 10 formula. Free calculator for BPUT B.Tech and diploma results with division cut-offs.',
  },
  {
    slug: 'vit-cgpa-to-percentage',
    short: 'VIT',
    full: 'Vellore Institute of Technology',
    formula: 'Percentage = CGPA × 10',
    convert: (c) => c * 10,
    scaleMax: 10,
    formulaConfidence: 'verify',
    classBands: STANDARD_CLASS_BANDS,
    basis:
      'VIT is generally quoted as using a straight ×10 with no deduction, like Anna University. Confirm against the VIT academic regulations before indexing.',
    description:
      'Convert VIT CGPA to a percentage using the straight × 10 rule — no deduction, unlike VTU or JNTU.',
    seoTitle: 'VIT CGPA to Percentage Calculator (Vellore Institute)',
    seoDescription:
      'Convert VIT CGPA to percentage with the straight CGPA × 10 formula. Free calculator with class cut-offs and a full conversion chart.',
  },
  {
    slug: 'cbse-cgpa-to-percentage',
    short: 'CBSE',
    full: 'Central Board of Secondary Education (Class 10 and 12)',
    formula: 'Percentage = CGPA × 9.5',
    convert: (c) => c * 9.5,
    scaleMax: 10,
    formulaConfidence: 'documented',
    classBands: [
      { min: 90, label: 'A1 band — top grade' },
      { min: 80, label: 'A2 band — distinction range' },
      { min: 60, label: 'First division' },
      { min: 45, label: 'Second division' },
      { min: 33, label: 'Pass' },
      { min: 0, label: 'Needs improvement' },
    ],
    basis:
      'CBSE derived the 9.5 multiplier from the average marks of students scoring each grade point across five years — it is stated in the CBSE result circular itself.',
    description:
      'Convert your CBSE CGPA to a percentage with the official × 9.5 multiplier, including the A1–E grade table used on the Class 10 and 12 marksheet.',
    seoTitle: 'CBSE CGPA to Percentage Calculator (× 9.5 Formula)',
    seoDescription:
      'Convert CBSE CGPA to percentage using the official × 9.5 multiplier. Free calculator with the full A1–E grade point table for Class 10 and Class 12 results.',
  },
];

/** Reference chart rows — same shape for every university, values differ. */
function buildReferenceTable(rule: UniversityRule) {
  const rows: (string | number)[][] = [];
  for (let cgpa = 5; cgpa <= rule.scaleMax + 1e-9; cgpa += 0.5) {
    const pct = rule.convert(cgpa);
    const band = rule.classBands.find((b) => pct >= b.min);
    rows.push([cgpa.toFixed(2), `${pct.toFixed(2)}%`, band?.label ?? '—']);
  }
  return {
    title: `${rule.short} CGPA to percentage — full conversion chart`,
    headers: ['CGPA', 'Percentage', 'Class / division'],
    rows,
  };
}

function toConfig(rule: UniversityRule): CalculatorConfig {
  return {
    slug: rule.slug,
    name: `${rule.short} CGPA to Percentage Calculator`,
    shortName: `${rule.short} CGPA`,
    category: 'education',
    icon: 'GraduationCap',
    description: rule.description,
    inputs: [
      {
        key: 'cgpa',
        label: `Your ${rule.short} CGPA`,
        type: 'slider',
        min: 0,
        max: rule.scaleMax,
        step: 0.01,
        default: 8,
        color: 'primary',
      },
    ],
    outputs: [
      { key: 'percentage', label: 'Percentage', suffix: '%', decimals: 2, primary: true },
      { key: 'division', label: 'Class / Division', color: 'secondary' },
    ],
    calculate: (i) => {
      const cgpa = Number(i.cgpa);
      // Clamp: a negative percentage is meaningless on a deduction-based rule
      // (VTU at CGPA 0.5 would otherwise read −2.5%).
      const pct = Math.max(0, Math.min(100, rule.convert(cgpa)));
      const band = rule.classBands.find((b) => pct >= b.min);
      return {
        percentage: pct,
        division: band?.label ?? '—',
      };
    },
    buildTable: () => buildReferenceTable(rule),
    chartType: 'none',
    relatedSlugs: ['cgpa-calculator', 'percentage-to-gpa', 'gpa-calculator', 'percentage-calculator'],
    seo: {
      title: rule.seoTitle,
      description: rule.seoDescription,
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: {
      name: 'Ankit Gupta',
      credential: 'Builder · AllSmartCalculators',
      href: '/author/ankit-gupta',
    },
  };
}

export const universityCgpaCalculators: CalculatorConfig[] =
  UNIVERSITY_CGPA_RULES.map(toConfig);

/** Slugs safe to index today — the rest need their ordinance checked first.
    Imported by indexable-calculators.ts so the two never drift apart. */
export const DOCUMENTED_UNIVERSITY_SLUGS = UNIVERSITY_CGPA_RULES.filter(
  (r) => r.formulaConfidence === 'documented',
).map((r) => r.slug);
