import { CalculatorConfig } from '../calculator-types';

export const educationCalculators: CalculatorConfig[] = [
  {
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    category: 'education',
    icon: 'GraduationCap',
    description: 'Calculate your semester GPA on the 4.0 scale — weighted by credit hours, with the standard letter-to-GPA conversion table.',
    trending: true,
    usageCount: 127000,
    inputs: [
      { key: 'g1', label: 'Course 1 Grade (0-4)', type: 'slider', min: 0, max: 4, step: 0.1, default: 3.5, color: 'primary' },
      { key: 'c1', label: 'Course 1 Credits', type: 'slider', min: 1, max: 6, step: 1, default: 3, color: 'secondary' },
      { key: 'g2', label: 'Course 2 Grade', type: 'slider', min: 0, max: 4, step: 0.1, default: 3.8, color: 'tertiary' },
      { key: 'c2', label: 'Course 2 Credits', type: 'slider', min: 1, max: 6, step: 1, default: 4 },
      { key: 'g3', label: 'Course 3 Grade', type: 'slider', min: 0, max: 4, step: 0.1, default: 3.2 },
      { key: 'c3', label: 'Course 3 Credits', type: 'slider', min: 1, max: 6, step: 1, default: 3 },
    ],
    outputs: [
      { key: 'gpa', label: 'Your GPA', decimals: 2, primary: true },
      { key: 'credits', label: 'Total Credits', decimals: 0, color: 'secondary' },
    ],
    calculate: (i) => {
      const grades = [
        [i.g1, i.c1],
        [i.g2, i.c2],
        [i.g3, i.c3],
      ].map(([g, c]) => [Number(g), Number(c)]);
      const totalPoints = grades.reduce((s, [g, c]) => s + g * c, 0);
      const totalCredits = grades.reduce((s, [, c]) => s + c, 0);
      return { gpa: totalCredits > 0 ? totalPoints / totalCredits : 0, credits: totalCredits };
    },
    ranges: {
      title: 'Standard 4.0 GPA scale (US convention)',
      rows: [
        { label: 'A / A+', range: '4.0', note: '93–100% (most schools)' },
        { label: 'A−', range: '3.7', note: '90–92%' },
        { label: 'B+', range: '3.3', note: '87–89%' },
        { label: 'B', range: '3.0', note: '83–86%' },
        { label: 'B−', range: '2.7', note: '80–82%' },
        { label: 'C+', range: '2.3', note: '77–79%' },
        { label: 'C', range: '2.0', note: '73–76% (often the minimum to pass core courses)' },
        { label: 'D', range: '1.0', note: '60–66%' },
        { label: 'F', range: '0.0', note: 'Below 60%' },
      ],
    },
    limitations: [
      "This calculator uses the unweighted 4.0 scale — the most common at US colleges. High schools often use a weighted scale (5.0 for AP, 4.5 for honors) — use a weighted GPA calculator if you need that.",
      'Indian universities typically use a 10-point CGPA scale, not 4.0. To convert: divide your CGPA by 10 and multiply by 4.0 — but each grad school applies its own conversion, so use the school\'s formula when applying.',
      'Doesn\'t handle pass/fail courses, audited courses, or repeated courses (where the new grade replaces the old). Drop those from the calc and add them manually.',
      'The 4.0 scale is conventional, not universal. Some schools use 4.3 (with A+ = 4.3), some use 4.33 (Quebec), some use 5.0 (high-school AP). Confirm your school\'s scale before extrapolating.',
    ],
    seo: {
      title: 'GPA Calculator: Semester GPA on 4.0 Scale',
      description: 'Free GPA calculator on the 4.0 scale. Add courses with grades and credit hours, get your semester GPA — handles A, A-, B+, B and standard variations.',
      applicationCategory: 'EducationalApplication',
      sources: [
        { label: 'AACRAO — grade conversion practices', url: 'https://www.aacrao.org/' },
        { label: 'College Board — GPA explainer', url: 'https://blog.collegeboard.org/' },
      ],
    },
    lastUpdated: '2026-04-26',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'cgpa-calculator',
    name: 'CGPA Calculator',
    category: 'education',
    icon: 'Award',
    description: 'Calculate cumulative GPA across semesters.',
    usageCount: 68000,
    inputs: [
      { key: 's1', label: 'Semester 1 GPA', type: 'slider', min: 0, max: 10, step: 0.01, default: 8.5, color: 'primary' },
      { key: 's2', label: 'Semester 2 GPA', type: 'slider', min: 0, max: 10, step: 0.01, default: 8.8, color: 'secondary' },
      { key: 's3', label: 'Semester 3 GPA', type: 'slider', min: 0, max: 10, step: 0.01, default: 9.1, color: 'tertiary' },
      { key: 's4', label: 'Semester 4 GPA', type: 'slider', min: 0, max: 10, step: 0.01, default: 8.6 },
    ],
    outputs: [
      { key: 'cgpa', label: 'CGPA', decimals: 2, primary: true },
      { key: 'percentage', label: 'Percentage (CGPA × 9.5)', suffix: '%', decimals: 2, color: 'secondary' },
    ],
    calculate: (i) => {
      const gpas = [i.s1, i.s2, i.s3, i.s4].map(Number);
      const cgpa = gpas.reduce((a, b) => a + b, 0) / gpas.length;
      return { cgpa, percentage: cgpa * 9.5 };
    },
    ranges: {
      title: 'Indian CGPA-to-percentage conversion (CBSE/AICTE)',
      rows: [
        { label: 'CGPA 9.5+', range: '90%+ (Outstanding)', note: 'Top 5% of cohort' },
        { label: 'CGPA 8.5–9.4', range: '81–90% (Excellent)', note: 'Eligible for most scholarships' },
        { label: 'CGPA 7.5–8.4', range: '71–80% (Very Good)', note: 'Distinction at most universities' },
        { label: 'CGPA 6.5–7.4', range: '62–70% (First Class)', note: 'Decent grad-school cutoff' },
        { label: 'CGPA 5.5–6.4', range: '52–61% (Second Class)', note: 'Pass with average performance' },
        { label: 'CGPA 5.0–5.4', range: '47–51% (Pass)', note: 'Below this is failure' },
      ],
    },
    limitations: [
      "Uses unweighted average — doesn't account for different credit loads across semesters. Most Indian universities use credit-weighted CGPA, which differs slightly.",
      'The × 9.5 conversion is a convention, not an exact mapping. Some universities use × 10 directly; others use grade-specific lookup tables. Always use your institution\'s official formula.',
      "Can't convert international 4.0 GPAs to Indian 10-point — those require school-specific equivalency tables, not arithmetic conversion.",
      "For 8-semester engineering programs or longer, this 4-semester calculator gives an approximation. Add semesters manually to your average for accuracy.",
    ],
    seo: {
      title: 'CGPA Calculator: Cumulative GPA Across Semesters',
      description: 'Free CGPA calculator. Combine multiple semester GPAs into your cumulative GPA, weighted by credits — supports 4.0, 10.0 (Indian), and percentage scales.',
      applicationCategory: 'EducationalApplication',
      sources: [
        { label: 'CBSE — grading system circular', url: 'https://www.cbse.gov.in/' },
        { label: 'AICTE — academic regulations', url: 'https://www.aicte-india.org/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'percentage-to-gpa',
    name: 'Percentage to GPA',
    category: 'education',
    icon: 'Percent',
    description: 'Convert percentage to 4.0 GPA.',
    usageCount: 42000,
    inputs: [
      { key: 'percentage', label: 'Percentage', type: 'slider', min: 0, max: 100, step: 0.1, default: 85, suffix: '%', color: 'primary' },
    ],
    outputs: [
      { key: 'gpa4', label: '4.0 Scale GPA', decimals: 2, primary: true },
      { key: 'gpa10', label: '10 Scale CGPA', decimals: 2, color: 'secondary' },
      { key: 'letter', label: 'Letter Grade', color: 'tertiary' },
    ],
    calculate: (i) => {
      const p = Number(i.percentage);
      let letter = 'F';
      if (p >= 90) letter = 'A';
      else if (p >= 80) letter = 'B';
      else if (p >= 70) letter = 'C';
      else if (p >= 60) letter = 'D';
      return { gpa4: (p / 100) * 4, gpa10: p / 9.5, letter };
    },
    ranges: {
      title: 'Common conversion approaches',
      rows: [
        { label: 'Linear (this calculator)', range: '% × 0.04 → GPA', note: 'Most-cited rough estimate' },
        { label: 'WES (US standard)', range: 'Treats 75%+ as 4.0 equivalent', note: 'Indian grading is stricter than US' },
        { label: 'Indian CGPA (× 9.5)', range: '% ÷ 9.5 → CGPA', note: 'CBSE/AICTE backward conversion' },
        { label: 'School-specific table', range: 'Per-university formula', note: 'Most accurate; use when applying' },
        { label: 'Letter grade A', range: '90%+', note: '4.0 equivalent (most US schools)' },
        { label: 'Letter grade B', range: '80–89%', note: '3.0–3.7 range' },
        { label: 'Letter grade C', range: '70–79%', note: '2.0–2.7 range' },
      ],
    },
    limitations: [
      'Linear conversion (× 0.04) significantly underestimates Indian students at US grad schools. WES treats 75% Indian as 4.0 equivalent because Indian grading is genuinely harder.',
      "Doesn't handle weighted/credit-based conversions. For accurate US-application GPA, compute per-course GPA from your transcript using US letter-grade mapping for each course.",
      "Doesn't account for grade inflation differences between Indian universities. An 80% from IIT Bombay differs from 80% at a tier-3 private engineering college — US admissions officers know this and adjust mentally.",
      "Doesn't replace official credential evaluation. For US grad school applications, get a WES evaluation if your target schools require one.",
    ],
    seo: {
      title: 'Percentage to GPA Converter: % to 4.0 Scale',
      description: 'Free percentage-to-GPA converter. Translate any percentage score (or Indian 10-point CGPA) into the standard US 4.0 GPA scale — for grad-school apps.',
      applicationCategory: 'EducationalApplication',
      sources: [
        { label: 'WES — Indian credential evaluation', url: 'https://www.wes.org/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'grade-calculator',
    name: 'Grade Calculator',
    category: 'education',
    icon: 'FileCheck',
    description: 'Weighted grade for assignments & exams.',
    trending: true,
    usageCount: 89000,
    inputs: [
      { key: 'hwGrade', label: 'Homework Grade', type: 'slider', min: 0, max: 100, step: 1, default: 90, suffix: '%', color: 'primary' },
      { key: 'hwWeight', label: 'Homework Weight', type: 'slider', min: 0, max: 100, step: 5, default: 20, suffix: '%', color: 'secondary' },
      { key: 'midGrade', label: 'Midterm Grade', type: 'slider', min: 0, max: 100, step: 1, default: 85, suffix: '%', color: 'tertiary' },
      { key: 'midWeight', label: 'Midterm Weight', type: 'slider', min: 0, max: 100, step: 5, default: 30, suffix: '%' },
      { key: 'finalGrade', label: 'Final Exam Grade', type: 'slider', min: 0, max: 100, step: 1, default: 88, suffix: '%' },
      { key: 'finalWeight', label: 'Final Weight', type: 'slider', min: 0, max: 100, step: 5, default: 50, suffix: '%' },
    ],
    outputs: [
      { key: 'finalGrade', label: 'Final Grade', suffix: '%', decimals: 2, primary: true },
      { key: 'letter', label: 'Letter Grade', color: 'secondary' },
    ],
    calculate: (i) => {
      const totalWeight = Number(i.hwWeight) + Number(i.midWeight) + Number(i.finalWeight);
      if (totalWeight === 0) return { finalGrade: 0, letter: 'N/A' };
      const final =
        (Number(i.hwGrade) * Number(i.hwWeight) +
          Number(i.midGrade) * Number(i.midWeight) +
          Number(i.finalGrade) * Number(i.finalWeight)) /
        totalWeight;
      let letter = 'F';
      if (final >= 90) letter = 'A';
      else if (final >= 80) letter = 'B';
      else if (final >= 70) letter = 'C';
      else if (final >= 60) letter = 'D';
      return { finalGrade: final, letter };
    },
    ranges: {
      title: 'Typical course-grade weight distributions',
      rows: [
        { label: 'Indian engineering (typical)', range: 'Internal 30% / End-sem 70%', note: 'AICTE-recommended split' },
        { label: 'US undergrad (lecture course)', range: 'HW 20% / Mid 30% / Final 50%', note: 'This calculator default' },
        { label: 'US lab-based course', range: 'Labs 30% / HW 20% / Mid 20% / Final 30%', note: '' },
        { label: 'Continuous-assessment course', range: 'Multiple quizzes 60% / Final 40%', note: 'Used in liberal-arts and humanities' },
        { label: 'Letter grade A', range: '90%+', note: '4.0 GPA equivalent' },
        { label: 'Letter grade B', range: '80–89%', note: '3.0–3.7 range' },
        { label: 'Letter grade C', range: '70–79%', note: 'Often the pass threshold for major courses' },
      ],
    },
    limitations: [
      'Only handles 3 components. Real courses often have 4–6 (labs, quizzes, attendance, project). For those, weight-average the additional components into one of the three buckets, or use a spreadsheet.',
      "Doesn't model curving. Many professors curve grades upward at the end of term — your calculated 87% might land an A in a course that gets curved.",
      'Letter-grade thresholds vary. The 90/80/70/60 cutoffs are US convention; some courses use 85/75/65/55 or stricter scales. Use your course\'s actual rubric.',
      "Doesn't model bonus assignments or extra credit. Add bonus points to the appropriate component's grade input.",
    ],
    seo: {
      title: 'Grade Calculator: Weighted Course Grade',
      description: 'Free weighted grade calculator. Combine assignment, midterm, and final-exam grades with their respective weights to get your overall course grade.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'exam-score-predictor',
    name: 'Exam Score Predictor',
    category: 'education',
    icon: 'Target',
    description: 'Score needed on final for target grade.',
    usageCount: 57000,
    inputs: [
      { key: 'currentGrade', label: 'Current Grade', type: 'slider', min: 0, max: 100, step: 1, default: 78, suffix: '%', color: 'primary' },
      { key: 'finalWeight', label: 'Final Exam Weight', type: 'slider', min: 10, max: 80, step: 5, default: 30, suffix: '%', color: 'secondary' },
      { key: 'targetGrade', label: 'Target Grade', type: 'slider', min: 0, max: 100, step: 1, default: 85, suffix: '%', color: 'tertiary' },
    ],
    outputs: [
      { key: 'needed', label: 'Required Score on Final', suffix: '%', decimals: 1, primary: true },
      { key: 'possible', label: 'Is it Possible?', color: 'secondary' },
    ],
    calculate: (i) => {
      const current = Number(i.currentGrade);
      const weight = Number(i.finalWeight) / 100;
      const target = Number(i.targetGrade);
      const needed = (target - current * (1 - weight)) / weight;
      return {
        needed,
        possible: needed <= 100 ? (needed <= 0 ? 'Already achieved' : 'Yes ✓') : 'Not possible',
      };
    },
    ranges: {
      title: 'Required final score for common scenarios (target 85%, current weights)',
      rows: [
        { label: 'Current 78%, final 20% weight', range: 'Need 113% on final', note: 'Not possible' },
        { label: 'Current 78%, final 30% weight', range: 'Need 101% on final', note: 'Need bonus credit' },
        { label: 'Current 78%, final 40% weight', range: 'Need 95.5% on final', note: 'Very hard but possible' },
        { label: 'Current 80%, final 30% weight', range: 'Need 96.7% on final', note: 'Hard but achievable' },
        { label: 'Current 82%, final 30% weight', range: 'Need 92% on final', note: 'Realistic with effort' },
        { label: 'Current 85%, final 30% weight', range: 'Need 85% on final', note: 'Matches current — maintain' },
      ],
    },
    limitations: [
      "Assumes the final exam has the weight you input — verify against your course syllabus, not assumption.",
      "Doesn't model bonus credit, attendance bonuses, or curving. If your professor commonly curves grades upward by 5–10%, your required score is correspondingly lower.",
      "Doesn't model what happens if you over-perform — a perfect 100% on the final caps your maximum grade based on weights. If your current is 70% and final is 30%, your max possible final grade is 70 × 0.70 + 100 × 0.30 = 79%.",
      "Doesn't replace actual exam prep. Knowing you need 90% doesn't get you to 90% — that's still hours of study.",
    ],
    seo: {
      title: 'Final Exam Calculator: Score Needed for Target Grade',
      description: 'Free final exam grade calculator. Find the exact score you need on your final to lock in any target overall grade — given your current grade and final weight.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'study-hours-calculator',
    name: 'Study Hours Calculator',
    category: 'education',
    icon: 'BookOpen',
    description: 'Weekly study hours for your courses.',
    usageCount: 28000,
    inputs: [
      { key: 'credits', label: 'Credit Hours', type: 'slider', min: 1, max: 30, step: 1, default: 15, color: 'primary' },
      { key: 'difficulty', label: 'Difficulty (1-3)', type: 'slider', min: 1, max: 3, step: 1, default: 2, color: 'secondary' },
    ],
    outputs: [
      { key: 'weekly', label: 'Study Hours/Week', decimals: 1, primary: true },
      { key: 'daily', label: 'Hours/Day', decimals: 1, color: 'secondary' },
    ],
    calculate: (i) => {
      const weekly = Number(i.credits) * (1 + Number(i.difficulty));
      return { weekly, daily: weekly / 7 };
    },
    ranges: {
      title: 'Study-hour benchmarks by course load',
      rows: [
        { label: '12 credits (light load)', range: '24 – 48 hrs/week', note: '3.4–6.9 hrs/day' },
        { label: '15 credits (standard)', range: '30 – 60 hrs/week', note: '4.3–8.6 hrs/day' },
        { label: '18 credits (heavy)', range: '36 – 72 hrs/week', note: '5.1–10.3 hrs/day' },
        { label: '21+ credits (overload)', range: '42+ hrs/week', note: 'Sustainable for high performers' },
        { label: 'Active sleep + meals time', range: '~70 hrs/week', note: '10 hrs/day for living' },
        { label: 'Realistic max sustainable', range: '~60 hrs/week study', note: 'Adds to class + lab time' },
      ],
    },
    limitations: [
      'The 2–3 hours per credit rule is an average — easy courses can take 1 hour, hard ones 4+ hours per credit. Difficulty input is your judgment, not objective.',
      "Doesn't model how study efficiency varies — 4 hours of focused deep work can outproduce 8 hours of distracted study.",
      "Doesn't account for non-study time costs — commute, meals, exercise, social, sleep. Realistic max study time even for committed students is 50–60 hours/week.",
      'Indian engineering semesters with project deadlines, internships, or competitive-exam prep (GATE, CAT) need significantly more time than the formula suggests.',
    ],
    seo: {
      title: 'Study Hours Calculator: Weekly Hours per Course',
      description: 'Free study hours calculator. Estimate weekly study time required across your course load using the standard 2–3 hours per credit-hour rule.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'assignment-weight-calculator',
    name: 'Assignment Weight',
    category: 'education',
    icon: 'Weight',
    description: 'Effect of assignment on final grade.',
    usageCount: 21000,
    inputs: [
      { key: 'assignGrade', label: 'Assignment Grade', type: 'slider', min: 0, max: 100, step: 1, default: 85, suffix: '%', color: 'primary' },
      { key: 'weight', label: 'Weight in Course', type: 'slider', min: 1, max: 100, step: 1, default: 15, suffix: '%', color: 'secondary' },
    ],
    outputs: [
      { key: 'contribution', label: 'Contribution to Final', suffix: '%', decimals: 2, primary: true },
    ],
    calculate: (i) => ({
      contribution: (Number(i.assignGrade) * Number(i.weight)) / 100,
    }),
    ranges: {
      title: 'Typical assignment weights in Indian + US courses',
      rows: [
        { label: 'Daily homework', range: '5 – 15%', note: 'Low individual weight, accumulates over term' },
        { label: 'Quizzes', range: '10 – 20%', note: 'Best 5 of 6 commonly counted' },
        { label: 'Lab work / experiments', range: '15 – 30%', note: 'Engineering-heavy courses' },
        { label: 'Midterm exam', range: '20 – 35%', note: 'Single high-leverage component' },
        { label: 'Final project', range: '20 – 40%', note: 'Course-defining for many subjects' },
        { label: 'Final exam', range: '30 – 50%', note: 'Highest single weight in most courses' },
      ],
    },
    limitations: [
      "Calculator assumes you know the assignment's exact weight — verify against your syllabus, not your professor's verbal claims.",
      'Doesn\'t handle "drop the lowest" policies. If your course drops 1 of 6 quizzes, the lowest quiz effectively contributes 0% even at its listed weight.',
      "Doesn't model bonus credit. Some assignments offer extra credit (e.g. up to 110% of the grade) — the calculator caps at 100%.",
      'Single-assignment view; doesn\'t capture compounding effects. Three borderline B+ assignments at 10% each might collectively cost you the A you wanted.',
    ],
    seo: {
      title: 'Assignment Weight Calculator: Effect on Final Grade',
      description: 'Free assignment weight calculator. See how much a single assignment moves your overall course grade — useful for prioritising effort across the term.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'class-rank-calculator',
    name: 'Class Rank Calculator',
    category: 'education',
    icon: 'Trophy',
    description: 'Your percentile in class.',
    usageCount: 19000,
    inputs: [
      { key: 'rank', label: 'Your Rank', type: 'slider', min: 1, max: 1000, step: 1, default: 15, color: 'primary' },
      { key: 'classSize', label: 'Class Size', type: 'slider', min: 2, max: 1000, step: 1, default: 100, color: 'secondary' },
    ],
    outputs: [
      { key: 'percentile', label: 'Percentile', suffix: '%', decimals: 2, primary: true },
      { key: 'topPct', label: 'You are in top', suffix: '%', decimals: 2, color: 'secondary' },
    ],
    calculate: (i) => {
      const percentile = ((Number(i.classSize) - Number(i.rank)) / Number(i.classSize)) * 100;
      return { percentile, topPct: (Number(i.rank) / Number(i.classSize)) * 100 };
    },
    ranges: {
      title: 'Percentile cutoffs and what they qualify for',
      rows: [
        { label: 'Top 1%', range: '99th percentile+', note: 'JEE Advanced cutoff, top scholarships' },
        { label: 'Top 5%', range: '95th percentile+', note: 'IIT JEE Mains cutoff for top institutes' },
        { label: 'Top 10%', range: '90th percentile+', note: 'Most merit-list cutoffs' },
        { label: 'Top 25%', range: '75th percentile+', note: 'Honors societies, decent scholarships' },
        { label: 'Top 50% (median+)', range: '50th percentile+', note: 'Acceptable for most placements' },
        { label: 'Below median', range: 'Bottom 50%', note: 'Limits scholarship and placement options' },
      ],
    },
    limitations: [
      "Class rank is comparative — a #1 rank in a weak class is less impressive than a #5 in a strong one. Most college applications consider rank alongside absolute GPA and standardised test scores.",
      "Doesn't model ties. Real classes often have multiple students at the same GPA — your rank might be 5 or 12 depending on tie-breaking rules.",
      "Doesn't account for class composition. Rank 1 of 100 first-year medical students is much more competitive than rank 1 of 100 first-year general students.",
      'Some Indian schools and universities don\'t officially announce rank — percentile is the metric available in those cases.',
    ],
    seo: {
      title: 'Class Rank Calculator: Percentile in Your Cohort',
      description: 'Free class rank percentile calculator. From your rank and class size, get your percentile — useful for college applications and merit scholarships.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'attendance-calculator',
    name: 'Attendance Calculator',
    category: 'education',
    icon: 'UserCheck',
    description: 'Classes you can skip safely.',
    trending: true,
    usageCount: 94000,
    inputs: [
      { key: 'attended', label: 'Classes Attended', type: 'slider', min: 0, max: 500, step: 1, default: 45, color: 'primary' },
      { key: 'total', label: 'Total Classes Held', type: 'slider', min: 1, max: 500, step: 1, default: 50, color: 'secondary' },
      { key: 'remaining', label: 'Remaining Classes', type: 'slider', min: 0, max: 200, step: 1, default: 30, color: 'tertiary' },
      { key: 'required', label: 'Required Attendance %', type: 'slider', min: 50, max: 100, step: 1, default: 75, suffix: '%' },
    ],
    outputs: [
      { key: 'current', label: 'Current Attendance', suffix: '%', decimals: 2, primary: true },
      { key: 'canSkip', label: 'Classes You Can Skip', decimals: 0, color: 'tertiary' },
    ],
    calculate: (i) => {
      const current = (Number(i.attended) / Number(i.total)) * 100;
      const totalFuture = Number(i.total) + Number(i.remaining);
      const req = Number(i.required) / 100;
      const minAttend = Math.ceil(req * totalFuture);
      const canSkip = Math.max(0, Number(i.attended) + Number(i.remaining) - minAttend);
      return { current, canSkip };
    },
    ranges: {
      title: 'Indian university attendance rules (typical)',
      rows: [
        { label: 'AICTE recommendation', range: '75% mandatory', note: 'For engineering and technology programs' },
        { label: 'IITs / NITs (semester exam eligibility)', range: '75 – 85%', note: 'Some courses stricter at 85%' },
        { label: 'Delhi University (FYUP)', range: '66.67% for theory, 75% for practicals', note: '' },
        { label: 'Medical colleges (MBBS)', range: '75% theory, 80% clinicals', note: 'NMC mandate' },
        { label: 'Medical leave / fever exemption', range: 'Submit cert in 1 week', note: 'Most colleges allow recovery via certificate' },
        { label: 'Safe target (buffer for illness)', range: 'Stay above 80%', note: '5% buffer for unexpected absences' },
      ],
    },
    limitations: [
      "Assumes every class going forward will be held — strikes, holidays, or course-end cancellations may reduce the total remaining classes, changing the math.",
      'Doesn\'t model "weighted" attendance — some courses weight labs higher than lectures, so a 50% lab + 90% lecture average might not hit 75% in either component separately.',
      'Medical/condonation allowances vary by institution. Many colleges allow recovery from a single illness with a doctor\'s certificate but not from repeated absences.',
      "Doesn't predict make-up classes or extra lectures, which can shift the total class count and your effective percentage.",
    ],
    seo: {
      title: 'Attendance Calculator: How Many Classes You Can Skip',
      description: 'Free 75% attendance calculator. From total classes held and attended, see your current attendance and how many you can skip while staying above 75%.',
      applicationCategory: 'EducationalApplication',
      sources: [
        { label: 'AICTE — academic regulations', url: 'https://www.aicte-india.org/' },
      ],
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
  {
    slug: 'reading-speed-calculator',
    name: 'Reading Speed',
    category: 'education',
    icon: 'Book',
    description: 'Words per minute reading speed.',
    usageCount: 16000,
    inputs: [
      { key: 'words', label: 'Words Read', type: 'slider', min: 10, max: 10000, step: 10, default: 1500, color: 'primary' },
      { key: 'minutes', label: 'Minutes', type: 'slider', min: 0.5, max: 120, step: 0.5, default: 5, color: 'secondary' },
    ],
    outputs: [
      { key: 'wpm', label: 'Words Per Minute', decimals: 0, primary: true },
      { key: 'level', label: 'Reading Level', color: 'secondary' },
    ],
    calculate: (i) => {
      const wpm = Number(i.words) / Number(i.minutes);
      let level = 'Average';
      if (wpm > 400) level = 'Excellent';
      else if (wpm > 300) level = 'Good';
      else if (wpm < 200) level = 'Below Average';
      return { wpm, level };
    },
    ranges: {
      title: 'Reading speed benchmarks',
      rows: [
        { label: 'Elementary school (age 8–10)', range: '100 – 200 WPM', note: 'Still building fluency' },
        { label: 'High school students', range: '200 – 250 WPM', note: 'Standard reading pace' },
        { label: 'Adult — average', range: '200 – 300 WPM', note: 'Casual reading' },
        { label: 'Adult — good (educated)', range: '300 – 400 WPM', note: 'Professional reading pace' },
        { label: 'Adult — excellent', range: '400 – 600 WPM', note: 'With practice, maintaining comprehension' },
        { label: 'Speed-reading claims', range: '600 – 1500 WPM', note: 'Comprehension drops 30–50% at these speeds' },
        { label: 'Audiobooks (1.25x speed)', range: '~190 WPM', note: 'Normal speech is ~150 WPM' },
      ],
    },
    limitations: [
      "WPM without comprehension is meaningless. Always check whether you can summarise what you read — speed at the cost of understanding is a vanity metric.",
      "Different content has different reading speeds. Light fiction reads at 350+ WPM for most adults; dense technical material drops to 150–200 WPM. Benchmark against similar material.",
      "Doesn't account for sub-vocalisation (mentally pronouncing words). Most slow readers sub-vocalise, which caps speed at ~300 WPM regardless of practice.",
      "Speed-reading techniques like skimming and scanning use different processes than full reading — those produce higher WPM but lower comprehension.",
    ],
    seo: {
      title: 'Reading Speed Calculator: Words per Minute (WPM)',
      description: 'Free reading speed (WPM) calculator. Time yourself reading a passage to find your words-per-minute rate and benchmark against typical adult readers.',
      applicationCategory: 'EducationalApplication',
    },
    lastUpdated: '2026-05-15',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
