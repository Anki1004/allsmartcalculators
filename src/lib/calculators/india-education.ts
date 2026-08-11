import { CalculatorConfig } from '../calculator-types';

// ─────────────────────────────────────────────────────────────────────────────
// Exam and semester calculators for Indian students.
//
// The site's two best-ranking pages are /education/cgpa-calculator (avg
// position 2.29) and /education/percentage-to-gpa (5.17) — this category is
// where the domain actually competes, so it gets built out rather than finance.
// ─────────────────────────────────────────────────────────────────────────────

export const indiaEducationCalculators: CalculatorConfig[] = [
  {
    slug: 'percentile-to-rank-calculator',
    name: 'Percentile to Rank Calculator',
    shortName: 'Percentile to Rank',
    category: 'education',
    icon: 'TrendingUp',
    description:
      'Turn a JEE Main, CAT or CUET percentile into an approximate All India Rank — and understand why percentile and percentage are not the same thing.',
    inputs: [
      { key: 'percentile', label: 'Your Percentile', type: 'slider', min: 0, max: 100, step: 0.0001, default: 98.5, suffix: '%ile', color: 'primary' },
      { key: 'candidates', label: 'Total Candidates Appeared', type: 'slider', min: 1000, max: 3000000, step: 1000, default: 1200000, color: 'secondary' },
    ],
    outputs: [
      { key: 'rank', label: 'Approximate All India Rank', decimals: 0, primary: true, color: 'white' },
      { key: 'behind', label: 'Candidates Below You', decimals: 0, color: 'secondary' },
      { key: 'topPct', label: 'You Are in the Top', suffix: '%', decimals: 2, color: 'tertiary' },
    ],
    calculate: (i) => {
      const percentile = Math.min(100, Math.max(0, Number(i.percentile)));
      const total = Number(i.candidates);

      // Percentile is the share of candidates at or below your score, so the
      // number above you — your rank — is (100 − percentile)% of the field.
      // Rank 1 at the top, hence the floor of 1.
      const rank = Math.max(1, Math.round(((100 - percentile) / 100) * total));

      return {
        rank,
        behind: Math.round((percentile / 100) * total),
        topPct: 100 - percentile,
      };
    },
    buildTable: (i) => {
      const total = Number(i.candidates);
      const rows: (string | number)[][] = [];
      for (const p of [99.9, 99.5, 99, 98, 95, 90, 80, 50]) {
        rows.push([
          `${p} percentile`,
          Math.max(1, Math.round(((100 - p) / 100) * total)).toLocaleString('en-IN'),
          `${(100 - p).toFixed(2)}%`,
        ]);
      }
      return {
        title: `Percentile to rank across ${total.toLocaleString('en-IN')} candidates`,
        headers: ['Percentile', 'Approximate rank', 'Top'],
        rows,
      };
    },
    relatedSlugs: ['percentage-calculator', 'cgpa-calculator', 'percentage-to-gpa', 'class-rank-calculator'],
    seo: {
      title: 'Percentile to Rank Calculator: JEE Main, CAT and CUET',
      description:
        'Convert an exam percentile to an approximate All India Rank. Enter your percentile and the number of candidates who appeared to see your rank and where you sit in the field.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },

  {
    slug: 'sgpa-calculator',
    name: 'SGPA Calculator',
    shortName: 'SGPA',
    category: 'education',
    icon: 'BookOpen',
    description:
      'Calculate your semester GPA properly — weighted by the credits each subject carries, which is how every Indian university actually computes it.',
    inputs: [
      { key: 'g1', label: 'Subject 1 Grade Points', type: 'slider', min: 0, max: 10, step: 1, default: 9, color: 'primary' },
      { key: 'c1', label: 'Subject 1 Credits', type: 'slider', min: 0, max: 8, step: 1, default: 4, color: 'secondary' },
      { key: 'g2', label: 'Subject 2 Grade Points', type: 'slider', min: 0, max: 10, step: 1, default: 8, color: 'tertiary' },
      { key: 'c2', label: 'Subject 2 Credits', type: 'slider', min: 0, max: 8, step: 1, default: 4 },
      { key: 'g3', label: 'Subject 3 Grade Points', type: 'slider', min: 0, max: 10, step: 1, default: 7 },
      { key: 'c3', label: 'Subject 3 Credits', type: 'slider', min: 0, max: 8, step: 1, default: 3 },
      { key: 'g4', label: 'Subject 4 Grade Points', type: 'slider', min: 0, max: 10, step: 1, default: 9 },
      { key: 'c4', label: 'Subject 4 Credits', type: 'slider', min: 0, max: 8, step: 1, default: 3 },
      { key: 'g5', label: 'Subject 5 Grade Points', type: 'slider', min: 0, max: 10, step: 1, default: 8 },
      { key: 'c5', label: 'Subject 5 Credits (0 to skip)', type: 'slider', min: 0, max: 8, step: 1, default: 2 },
      { key: 'g6', label: 'Subject 6 Grade Points', type: 'slider', min: 0, max: 10, step: 1, default: 8 },
      { key: 'c6', label: 'Subject 6 Credits (0 to skip)', type: 'slider', min: 0, max: 8, step: 1, default: 0 },
    ],
    outputs: [
      { key: 'sgpa', label: 'Your SGPA', decimals: 2, primary: true, color: 'white' },
      { key: 'credits', label: 'Total Credits', decimals: 0, color: 'secondary' },
      { key: 'unweighted', label: 'Simple Average (for comparison)', decimals: 2, color: 'tertiary' },
    ],
    calculate: (i) => {
      const pairs = ([
        [Number(i.g1), Number(i.c1)],
        [Number(i.g2), Number(i.c2)],
        [Number(i.g3), Number(i.c3)],
        [Number(i.g4), Number(i.c4)],
        [Number(i.g5), Number(i.c5)],
        [Number(i.g6), Number(i.c6)],
      ] as [number, number][]).filter(([, c]) => c > 0);

      const credits = pairs.reduce((s, [, c]) => s + c, 0);
      const points = pairs.reduce((s, [g, c]) => s + g * c, 0);

      // Shown alongside so the difference between the weighted and unweighted
      // figure is visible — students who average their grade points without
      // credits routinely report an SGPA their university never issued.
      const unweighted = pairs.length ? pairs.reduce((s, [g]) => s + g, 0) / pairs.length : 0;

      return {
        sgpa: credits > 0 ? points / credits : 0,
        credits,
        unweighted,
      };
    },
    relatedSlugs: ['cgpa-calculator', 'vtu-cgpa-to-percentage', 'percentage-to-gpa', 'gpa-calculator'],
    seo: {
      title: 'SGPA Calculator: Credit-Weighted Semester GPA',
      description:
        'Free SGPA calculator that weights each subject by its credits, the way Indian universities actually compute it. Handles up to six subjects and shows the unweighted average too.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
