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
    intro:
      'GPA (Grade Point Average) on the 4.0 scale is the standard way US colleges and most international grad schools compare academic performance. Each course\'s letter grade is converted to a number (A = 4.0, A- = 3.7, B+ = 3.3 …), multiplied by its credit hours, then summed and divided by total credits. This calculator does exactly that — enter each course\'s grade-point value and credit hours and it returns your semester or term GPA. For cumulative across multiple semesters, use the CGPA calculator instead.',
    formula: 'GPA = Σ (grade × credits) ÷ Σ credits',
    howItWorks:
      'Convert each letter grade to its 4.0 equivalent (A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, …, F = 0.0). Multiply each by the course\'s credit hours, sum the products, and divide by total credits. A student taking three 3-credit courses with grades A (4.0), A- (3.7), and B+ (3.3) gets: ((4.0×3) + (3.7×3) + (3.3×3)) ÷ 9 = 33.0 ÷ 9 = 3.67 GPA. Higher-credit courses pull the average more — strategic course selection matters.',
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
    faqs: [
      {
        q: 'How is GPA calculated?',
        a: 'GPA = Σ (grade × credits) ÷ Σ credits. Convert each course\'s letter grade to its 4.0 equivalent, weight by credit hours, sum, and divide by total credits taken. Higher-credit courses count more toward your overall GPA.',
      },
      {
        q: 'What is a good GPA?',
        a: '3.5+ is considered very good and qualifies for most honors programs and competitive grad-school admissions. 3.0–3.5 is solid; 2.5–3.0 is acceptable but limits some opportunities. Below 2.0 typically triggers academic probation.',
      },
      {
        q: 'How do I convert percentage to GPA?',
        a: 'Rough US conversion: 90–100% → 4.0, 80–89% → 3.0–3.7, 70–79% → 2.0–2.7, 60–69% → 1.0–1.7. For Indian percentage to 4.0 GPA, the most common formula is GPA = (% ÷ 25) but each grad school has its own — always use the destination school\'s conversion.',
      },
      {
        q: "What's the difference between GPA and CGPA?",
        a: 'GPA is for one term/semester. CGPA (Cumulative GPA) is the weighted average across all semesters you\'ve completed. Use this calculator for a single term; use the CGPA calculator to roll multiple semesters together.',
      },
      {
        q: 'Do I include withdraw or pass/fail courses in GPA?',
        a: 'No. Withdrawals (W) and audits don\'t count toward GPA at most schools. Pass/fail courses also don\'t affect GPA — only the credits count if you pass. Repeated courses usually have the higher grade replace the lower one in GPA but check your school\'s policy.',
      },
      {
        q: 'How much does one bad grade hurt my GPA?',
        a: 'Depends on your total credits. With 30 credits already at 3.5 GPA, a single B− (2.7) in a 3-credit course drops you to about 3.43 — barely visible. With only 9 prior credits, the same B− takes you to 3.30. Damage shrinks fast as cumulative credits grow.',
      },
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
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculator', href: '/author/ankit-gupta' },
  },
  {
    slug: 'cgpa-calculator',
    name: 'CGPA Calculator',
    category: 'education',
    icon: 'Award',
    description: 'Calculate cumulative GPA across semesters.',
    seo: {
      title: 'CGPA Calculator: Cumulative GPA Across Semesters',
      description: 'Free CGPA calculator. Combine multiple semester GPAs into your cumulative GPA, weighted by credits — supports 4.0, 10.0 (Indian), and percentage scales.',
    },
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
  },
  {
    slug: 'percentage-to-gpa',
    name: 'Percentage to GPA',
    category: 'education',
    icon: 'Percent',
    description: 'Convert percentage to 4.0 GPA.',
    seo: {
      title: 'Percentage to GPA Converter: % to 4.0 Scale',
      description: 'Free percentage-to-GPA converter. Translate any percentage score (or Indian 10-point CGPA) into the standard US 4.0 GPA scale — for grad-school apps.',
    },
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
  },
  {
    slug: 'grade-calculator',
    name: 'Grade Calculator',
    category: 'education',
    icon: 'FileCheck',
    description: 'Weighted grade for assignments & exams.',
    seo: {
      title: 'Grade Calculator: Weighted Course Grade',
      description: 'Free weighted grade calculator. Combine assignment, midterm, and final-exam grades with their respective weights to get your overall course grade.',
    },
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
  },
  {
    slug: 'exam-score-predictor',
    name: 'Exam Score Predictor',
    category: 'education',
    icon: 'Target',
    description: 'Score needed on final for target grade.',
    seo: {
      title: 'Final Exam Calculator: Score Needed for Target Grade',
      description: 'Free final exam grade calculator. Find the exact score you need on your final to lock in any target overall grade — given your current grade and final weight.',
    },
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
  },
  {
    slug: 'study-hours-calculator',
    name: 'Study Hours Calculator',
    category: 'education',
    icon: 'BookOpen',
    description: 'Weekly study hours for your courses.',
    seo: {
      title: 'Study Hours Calculator: Weekly Hours per Course',
      description: 'Free study hours calculator. Estimate weekly study time required across your course load using the standard 2–3 hours per credit-hour rule.',
    },
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
  },
  {
    slug: 'assignment-weight-calculator',
    name: 'Assignment Weight',
    category: 'education',
    icon: 'Weight',
    description: 'Effect of assignment on final grade.',
    seo: {
      title: 'Assignment Weight Calculator: Effect on Final Grade',
      description: 'Free assignment weight calculator. See how much a single assignment moves your overall course grade — useful for prioritising effort across the term.',
    },
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
  },
  {
    slug: 'class-rank-calculator',
    name: 'Class Rank Calculator',
    category: 'education',
    icon: 'Trophy',
    description: 'Your percentile in class.',
    seo: {
      title: 'Class Rank Calculator: Percentile in Your Cohort',
      description: 'Free class rank percentile calculator. From your rank and class size, get your percentile — useful for college applications and merit scholarships.',
    },
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
  },
  {
    slug: 'attendance-calculator',
    name: 'Attendance Calculator',
    category: 'education',
    icon: 'UserCheck',
    description: 'Classes you can skip safely.',
    seo: {
      title: 'Attendance Calculator: How Many Classes You Can Skip',
      description: 'Free 75% attendance calculator. From total classes held and attended, see your current attendance and how many you can skip while staying above 75%.',
    },
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
  },
  {
    slug: 'reading-speed-calculator',
    name: 'Reading Speed',
    category: 'education',
    icon: 'Book',
    description: 'Words per minute reading speed.',
    seo: {
      title: 'Reading Speed Calculator: Words per Minute (WPM)',
      description: 'Free reading speed (WPM) calculator. Time yourself reading a passage to find your words-per-minute rate and benchmark against typical adult readers.',
    },
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
  },
];
