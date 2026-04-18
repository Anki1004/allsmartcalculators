import { CalculatorConfig } from '../calculator-types';

export const educationCalculators: CalculatorConfig[] = [
  {
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    category: 'education',
    icon: 'GraduationCap',
    description: 'Calculate GPA on 4.0 scale.',
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
  },
];
