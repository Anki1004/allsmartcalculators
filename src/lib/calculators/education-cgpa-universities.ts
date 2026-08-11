import { CalculatorConfig } from '../calculator-types';

// ─────────────────────────────────────────────────────────────────────────────
// University-specific CGPA → percentage calculators.
//
// Why these exist: /education/cgpa-calculator and /education/percentage-to-gpa
// are the two best-ranking pages the site has (avg position 2.29 and 5.17 in
// the 2026-07-31 GSC export) while every finance page sits far below. Each
// Indian university publishes its own conversion rule, students search for
// their own university by name, and no large site covers them individually.
//
// ── ACCURACY CONTRACT ────────────────────────────────────────────────────────
// A source check on 2026-08-11 found that the "obvious" formula was WRONG or
// INCOMPLETE for four of the twelve universities originally listed here, so the
// rules below are deliberately conservative:
//
//   'documented' — the rule is stated in a university document, is consistent
//                  across independent sources, and is NOT batch-dependent.
//                  Only these are indexed.
//   'verify'     — believed correct but the primary source could not be opened
//                  (most university PDFs are scanned images), or the rule
//                  varies by admission year in a way that needs confirming.
//                  Served noindex.
//
// What that check changed:
//   - Osmania REMOVED entirely. Osmania has not approved any official
//     conversion formula, and the three formulas in circulation (×10, ×10−7.5,
//     ×9.5) disagree by up to 25 percentage points. Publishing any of them
//     would be inventing a number students put on job applications.
//   - KTU was (CGPA−0.5)×10. KTU U.O. 1584/2023 dated 29.06.2023 replaced this
//     with a straight ×10 and applied it back to the 2015 scheme.
//   - GGSIPU and Delhi University are BATCH-DEPENDENT — see `schemes`. Both
//     were shipping a single formula that was wrong for one of their cohorts.
//
// `basis` and `sourceUrl` are code-level documentation for whoever verifies
// these next; the user-facing citation lives in the article prose. If a rule
// cannot be sourced at all, it does not belong here.
// ─────────────────────────────────────────────────────────────────────────────

interface Scheme {
  /** Shown in the dropdown — phrase it as the student would identify themselves. */
  label: string;
  value: string;
  convert: (cgpa: number) => number;
  /** Human-readable formula for this scheme. */
  formula: string;
}

interface UniversityRule {
  slug: string;
  short: string;
  full: string;
  /** Formula shown when there is a single rule. Ignored when `schemes` is set. */
  formula: string;
  /** Single conversion. For multi-scheme universities this is the default one. */
  convert: (cgpa: number) => number;
  /** Set where the rule depends on admission year or regulation. */
  schemes?: Scheme[];
  scaleMax: number;
  formulaConfidence: 'documented' | 'verify';
  classBands: { min: number; label: string }[];
  basis: string;
  /** Where the rule comes from, for whoever verifies it next. */
  sourceUrl?: string;
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
    basis:
      'Stated on VTU’s own site as the standard formula for the 2015, 2017 and 2018 schemes. Confirm your scheme on your marks card — VTU has not published the same page for later schemes.',
    sourceUrl: 'https://vtu.ac.in/en/cgpa-standard-formula/',
    description:
      'Convert your VTU CGPA to a percentage using the (CGPA − 0.75) × 10 rule VTU publishes for the 2015, 2017 and 2018 schemes — with the CBCS grade table and your class.',
    seoTitle: 'VTU CGPA to Percentage Calculator (Official Formula)',
    seoDescription:
      'Convert VTU CGPA to percentage with the (CGPA − 0.75) × 10 formula published by VTU for the 2015, 2017 and 2018 schemes. Includes grade table and division cut-offs.',
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
      'AKTU B.Tech ordinance, letter no. AKTU/RO/2019/1421, effective from the 2019-20 session. A perfect 10 CGPA caps at 92.5% on the consolidated marksheet.',
    description:
      'Convert your AKTU (UPTU) CGPA to a percentage using the (CGPA − 0.75) × 10 rule from the B.Tech ordinance, and see which division that puts you in.',
    seoTitle: 'AKTU CGPA to Percentage Calculator (UPTU Formula)',
    seoDescription:
      'Free AKTU CGPA to percentage calculator using the (CGPA − 0.75) × 10 formula from the AKTU ordinance. Works for AKTU/UPTU B.Tech, MBA and MCA results.',
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
      'All three JNTU campuses (JNTUH, JNTUK, JNTUA) apply the 0.75 deduction under the R18/R19/R20 regulations.',
    description:
      'Convert JNTUH, JNTUK or JNTUA CGPA to a percentage with the (CGPA − 0.75) × 10 rule used across all three JNTU campuses.',
    seoTitle: 'JNTU CGPA to Percentage Calculator (JNTUH/JNTUK/JNTUA)',
    seoDescription:
      'Convert JNTU CGPA to percentage using the (CGPA − 0.75) × 10 formula. Works for JNTUH, JNTUK and JNTUA under R18, R19 and R20 regulations.',
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
      'Anna University’s R2021 undergraduate regulations state "Percentage of Marks = CGPA × 10", with no deduction. The (CGPA − 0.5) × 10 rule frequently applied to Anna University belongs to Pondicherry/CENTAC and must not be used here.',
    description:
      'Convert Anna University CGPA to a percentage. Anna University uses a straight CGPA × 10 with no deduction — this shows exactly what that means for your marks.',
    seoTitle: 'Anna University CGPA to Percentage Calculator',
    seoDescription:
      'Convert Anna University CGPA to percentage with the CGPA × 10 formula from the R2021 regulations (no deduction). Free calculator with class cut-offs.',
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
      'CBSE derived the 9.5 multiplier from the average marks of students scoring each grade point across five years, and states it in the result circular.',
    description:
      'Convert your CBSE CGPA to a percentage with the official × 9.5 multiplier, including the A1–E grade table used on the Class 10 and 12 marksheet.',
    seoTitle: 'CBSE CGPA to Percentage Calculator (× 9.5 Formula)',
    seoDescription:
      'Convert CBSE CGPA to percentage using the official × 9.5 multiplier. Free calculator with the full A1–E grade point table for Class 10 and Class 12 results.',
  },

  // ── Batch-dependent. Both were shipping a single formula that was wrong for
  //    one of their two cohorts, so both are noindex until the notifications
  //    below are read directly. ─────────────────────────────────────────────
  {
    slug: 'du-cgpa-to-percentage',
    short: 'Delhi University',
    full: 'University of Delhi',
    formula: 'Depends on your admission year — CBCS × 9.5, NEP/UGCF × 10',
    convert: (c) => c * 9.5,
    schemes: [
      {
        label: 'CBCS — admitted before 2022-23',
        value: 'cbcs',
        convert: (c) => c * 9.5,
        formula: 'Percentage = CGPA × 9.5',
      },
      {
        label: 'NEP / UGCF — admitted 2022-23 onwards',
        value: 'nep',
        convert: (c) => c * 10,
        formula: 'Percentage = CGPA × 10',
      },
    ],
    scaleMax: 10,
    formulaConfidence: 'verify',
    classBands: STANDARD_CLASS_BANDS,
    basis:
      'CBCS: DU notification Dean (Exams)/2017/9126 dated 20.12.2017, "Final Percentage of marks = C.G.P.A. based on all six semesters × 9.5", effective from May/June 2018. Students under the NEP/UGCF framework from 2022-23 moved to × 10. Confirm the NEP figure with your college examination section before indexing.',
    description:
      'Convert Delhi University CGPA to a percentage. DU changed the rule with NEP — CBCS batches use × 9.5 and 2022-23 onwards use × 10, so pick your admission year.',
    seoTitle: 'DU CGPA to Percentage Calculator (CBCS and NEP)',
    seoDescription:
      'Convert Delhi University CGPA to percentage. CBCS batches use × 9.5 per DU notification; NEP/UGCF batches from 2022-23 use × 10. Choose your admission year.',
  },
  {
    slug: 'ipu-cgpa-to-percentage',
    short: 'GGSIPU',
    full: 'Guru Gobind Singh Indraprastha University, Delhi',
    formula: 'Depends on your admission year — before 2024 × 10, from 2024 (CGPA − 0.75) × 10',
    convert: (c) => c * 10,
    schemes: [
      {
        label: 'Admitted before 2024',
        value: 'pre2024',
        convert: (c) => c * 10,
        formula: 'Percentage = CGPA × 10',
      },
      {
        label: 'Admitted 2024 onwards',
        value: 'from2024',
        convert: (c) => (c - 0.75) * 10,
        formula: 'Percentage = (CGPA − 0.75) × 10',
      },
    ],
    scaleMax: 10,
    formulaConfidence: 'verify',
    classBands: STANDARD_CLASS_BANDS,
    basis:
      'Batches admitted before 2024 use CGPA × 10 under Ordinance 11. Notification GGSIPU/COE/2024/11150124 dated 15.01.2024 introduced (CGPA − 0.75) × 10 for students admitted in 2024 and later. Confirm against the notification before indexing.',
    description:
      'Convert GGSIPU (IP University) CGPA to a percentage. IPU changed the rule in 2024 — pick your admission year, because the two formulas differ by 7.5 points.',
    seoTitle: 'IPU CGPA to Percentage Calculator (2024 Formula Change)',
    seoDescription:
      'Convert GGSIPU CGPA to percentage. Batches before 2024 use CGPA × 10; students admitted from 2024 use (CGPA − 0.75) × 10 per the 2024 notification.',
  },

  // ── Single rule, but the primary source could not be opened. ──────────────
  {
    slug: 'ktu-cgpa-to-percentage',
    short: 'KTU',
    full: 'APJ Abdul Kalam Technological University, Kerala',
    formula: 'Percentage = CGPA × 10',
    convert: (c) => c * 10,
    scaleMax: 10,
    formulaConfidence: 'verify',
    classBands: STANDARD_CLASS_BANDS,
    basis:
      'KTU U.O. No. 1584/2023 dated 29.06.2023 replaced the earlier deduction-based rule with a straight × 10, and a later circular applied it back to the 2015 scheme for uniformity. The obsolete formula was (10 × CGPA) − 2.5. Confirm against the U.O. before indexing.',
    description:
      'Convert KTU (Kerala Technological University) CGPA to a percentage using the straight × 10 rule introduced by the 2023 University Order.',
    seoTitle: 'KTU CGPA to Percentage Calculator (2023 Formula)',
    seoDescription:
      'Convert KTU CGPA to percentage using the CGPA × 10 rule from the 2023 University Order, which replaced the older deduction-based formula for all batches.',
  },
  {
    slug: 'gtu-cgpa-to-percentage',
    short: 'GTU',
    full: 'Gujarat Technological University, Ahmedabad',
    formula: 'Percentage = (CPI − 0.5) × 10',
    convert: (c) => (c - 0.5) * 10,
    scaleMax: 10,
    formulaConfidence: 'verify',
    classBands: STANDARD_CLASS_BANDS,
    basis:
      'Attributed to GTU Notification 1/2012 and consistent across sources for CBCS-regulated BE, ME, MBA and MCA programmes. Confirm against the notification before indexing.',
    description:
      'Convert GTU CGPA or CPI to a percentage using the (CPI − 0.5) × 10 rule, with the division your percentage falls into.',
    seoTitle: 'GTU CGPA to Percentage Calculator (CPI Conversion)',
    seoDescription:
      'Convert GTU CGPA or CPI to percentage using the (CPI − 0.5) × 10 formula. Free calculator for GTU B.E., diploma and MBA results with division cut-offs.',
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
      'BPUT publishes a grade-to-percentage conversion notice; the (CGPA − 0.5) × 10 rule is consistent across sources. The notice is a scanned PDF that could not be read automatically — open it and confirm before indexing.',
    sourceUrl: 'https://www.bput.ac.in/images/documents/Grade-to-Percentage-conversion-rule-notice.pdf',
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
      'VIT publishes a CGPA-to-percentage conversion document; the straight × 10 rule is consistent across sources and applies across the Vellore, Chennai, AP and Bhopal campuses. The document is a scanned PDF that could not be read automatically — open it and confirm before indexing.',
    sourceUrl: 'https://vit.ac.in/files/CGPA-to-Percentage-Conversion.pdf',
    description:
      'Convert VIT CGPA to a percentage using the straight × 10 rule — no deduction, unlike VTU or JNTU.',
    seoTitle: 'VIT CGPA to Percentage Calculator (Vellore Institute)',
    seoDescription:
      'Convert VIT CGPA to percentage with the straight CGPA × 10 formula. Free calculator with class cut-offs and a full conversion chart.',
  },
];

/** Pick the conversion for the selected scheme, falling back to the default. */
function converterFor(rule: UniversityRule, schemeValue: unknown): (c: number) => number {
  if (!rule.schemes) return rule.convert;
  const found = rule.schemes.find((s) => s.value === String(schemeValue));
  return (found ?? rule.schemes[0]).convert;
}

function buildReferenceTable(rule: UniversityRule, convert: (c: number) => number) {
  const rows: (string | number)[][] = [];
  for (let cgpa = 5; cgpa <= rule.scaleMax + 1e-9; cgpa += 0.5) {
    const pct = Math.max(0, Math.min(100, convert(cgpa)));
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
  const inputs: CalculatorConfig['inputs'] = [
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
  ];

  // Where the rule changed, the admission year IS the question. Asking for it
  // is the difference between a correct answer and a confidently wrong one.
  if (rule.schemes) {
    inputs.push({
      key: 'scheme',
      label: 'Your batch / regulation',
      type: 'select',
      default: rule.schemes[0].value,
      options: rule.schemes.map((s) => ({ label: s.label, value: s.value })),
      color: 'secondary',
    });
  }

  return {
    slug: rule.slug,
    name: `${rule.short} CGPA to Percentage Calculator`,
    shortName: `${rule.short} CGPA`,
    category: 'education',
    icon: 'GraduationCap',
    description: rule.description,
    inputs,
    outputs: [
      { key: 'percentage', label: 'Percentage', suffix: '%', decimals: 2, primary: true },
      { key: 'division', label: 'Class / Division', color: 'secondary' },
      { key: 'formulaUsed', label: 'Formula Applied', color: 'tertiary' },
    ],
    calculate: (i) => {
      const cgpa = Number(i.cgpa);
      const convert = converterFor(rule, i.scheme);
      // Clamp: a negative percentage is meaningless on a deduction-based rule
      // (VTU at CGPA 0.5 would otherwise read −2.5%).
      const pct = Math.max(0, Math.min(100, convert(cgpa)));
      const band = rule.classBands.find((b) => pct >= b.min);
      const scheme = rule.schemes?.find((s) => s.value === String(i.scheme)) ?? rule.schemes?.[0];
      return {
        percentage: pct,
        division: band?.label ?? '—',
        formulaUsed: scheme?.formula ?? rule.formula,
      };
    },
    buildTable: (i) => buildReferenceTable(rule, converterFor(rule, i.scheme)),
    chartType: 'none',
    relatedSlugs: ['cgpa-calculator', 'sgpa-calculator', 'percentage-to-gpa', 'gpa-calculator'],
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

/** Slugs safe to index today. The rest are served noindex until their primary
    source has been read — see the accuracy contract at the top of this file. */
export const DOCUMENTED_UNIVERSITY_SLUGS = UNIVERSITY_CGPA_RULES.filter(
  (r) => r.formulaConfidence === 'documented',
).map((r) => r.slug);
