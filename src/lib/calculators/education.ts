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
    intro:
      "CGPA (Cumulative Grade Point Average) is the rolling average of all your semester GPAs — the single number every Indian university student tracks as they progress through their degree. This calculator averages four semesters on the 10-point Indian scale (CBSE/AICTE convention) and also converts to percentage using the standard CGPA × 9.5 formula. Semester GPAs of 8.5, 8.8, 9.1, 8.6 give a CGPA of 8.75 — equivalent to 83.13%. CGPA stays steady once you have a few semesters in the bank; a single bad semester moves you only 0.1–0.2 of a point with 4+ semesters already averaged.",
    formula: 'CGPA = (Σ Semester GPAs) ÷ Number of Semesters · Percentage = CGPA × 9.5 (CBSE/AICTE convention)',
    howItWorks:
      "Simple arithmetic mean of your semester GPAs. (8.5 + 8.8 + 9.1 + 8.6) ÷ 4 = 35.0 ÷ 4 = 8.75 CGPA. For percentage conversion, CBSE introduced the 9.5 multiplier in 2010 — 8.75 × 9.5 = 83.13%. AICTE and most Indian universities use the same formula. This is an unweighted average that assumes equal credit load each semester; some universities weight by credits per semester (typical for engineering with heavy lab semesters). For credit-weighted CGPA, multiply each semester's GPA by its credit hours, sum, then divide by total credits.",
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
    faqs: [
      {
        q: 'How do I convert CGPA to percentage?',
        a: 'For CBSE and most Indian universities, multiply CGPA by 9.5. A CGPA of 8.5 = 80.75%. Check your university circular — Anna University uses × 10, some VTU formulas vary, and some institutions provide grade-specific tables that don\'t use any multiplier.',
      },
      {
        q: 'Is CGPA 8.5 good in India?',
        a: 'Yes — equivalent to ~80% (CBSE multiplier). Above 8.5 typically qualifies for major scholarships and IIT/NIT placement programs. Above 9.0 is considered excellent and is competitive for top global grad schools.',
      },
      {
        q: 'Does each semester count equally toward CGPA?',
        a: 'Strictly speaking, no — universities credit-weight by the number of credits in each semester. But credit loads in Indian engineering programs are roughly similar across semesters (22–28 credits typical), so unweighted averages are very close to credit-weighted ones in practice.',
      },
      {
        q: 'Can I improve a low CGPA in later semesters?',
        a: 'Yes, but slowly. With 4 prior semesters averaging 7.0 CGPA, a perfect 10 in semester 5 only brings you to 7.6. Each subsequent excellent semester adds about 0.3–0.5 to your CGPA. Damage from a 5.0 semester takes 2–3 strong semesters to recover.',
      },
      {
        q: 'Is the 10-point Indian CGPA same as 4.0 GPA?',
        a: 'No. They are different scales. Indian 10-point: A+ = 10, A = 9, B+ = 8, etc. US 4.0: A = 4.0, A− = 3.7, B+ = 3.3. Most grad schools use their own conversion table when admitting Indian students — typically CGPA ÷ 10 × 4.0 as a rough estimate, but they apply their own formula.',
      },
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
    intro:
      "Indian students applying to US grad schools (MS, MBA, MFA) face the conversion question — \"My 85% in BTech, what GPA is that on the 4.0 scale?\" There's no universal answer because every US university applies its own conversion when reviewing Indian transcripts. This calculator gives you the most-cited estimate: (percentage ÷ 100) × 4.0. 85% → 3.4 GPA. Also returns the equivalent Indian 10-point CGPA (percentage ÷ 9.5) and a US letter-grade equivalent. For actual applications, always check the destination school's published conversion or use a credential evaluator like WES.",
    formula: '4.0 GPA = (Percentage ÷ 100) × 4 · 10-point CGPA = Percentage ÷ 9.5',
    howItWorks:
      "Linear scaling. 85% / 100% × 4.0 = 3.4 GPA on the US scale. 85% / 9.5 = 8.95 CGPA on the Indian 10-point scale. Letter grade: 80%+ = B (B+ at 87+ at most schools), 90%+ = A, 70–79% = C, 60–69% = D. This is the SIMPLEST conversion — most US universities apply something more nuanced. WES (World Education Services) typically converts 75%+ Indian to 4.0 GPA equivalent because Indian grading runs harsher than US grading. For ambiguous cases, request a WES evaluation (₹17,000–₹25,000) before applying.",
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
    faqs: [
      {
        q: 'Is 85% a good GPA?',
        a: 'Yes. 85% in India typically translates to 3.4 GPA (linear) or 3.8+ GPA (WES standard). This is competitive for top US grad schools, especially with good GRE/GMAT and meaningful work/research experience.',
      },
      {
        q: 'Which conversion should I use on my US application?',
        a: 'The university\'s official formula, if published. If not, US universities reviewing Indian transcripts typically apply WES-style conversion or use their own credential-evaluator services. Don\'t pre-convert on your CV — let them apply their own formula.',
      },
      {
        q: 'How do US universities view Indian percentages?',
        a: 'Most major US universities have institutional experience with Indian transcripts and know that Indian grading is stricter than US grading. 75% from a top Indian university is often considered equivalent to a 3.8+ GPA. 60% may be considered 3.0+. Tier of university matters as much as the raw number.',
      },
      {
        q: 'Do I need a WES evaluation?',
        a: 'Required by some US universities (mostly state universities and some private). Optional but recommended for competitive private programs. Costs ₹15,000–₹25,000 and takes 2–3 weeks. Provides a credible US-context conversion you can share across applications.',
      },
      {
        q: 'How is GPA different from CGPA?',
        a: 'GPA is the US 4.0 scale; CGPA in India is typically the 10-point scale. Both are weighted averages of course grades. Convert between them with the formulas in the calculator — but always verify against the destination school\'s expectations.',
      },
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
    intro:
      "Most college courses split your final grade across multiple components — homework, midterm, final exam, lab work — each with its own weight. This calculator computes the weighted average so you can see where you stand or plan how hard to push the final. Default weights: homework 20%, midterm 30%, final 50% (a typical Indian engineering course distribution). At 90% homework, 85% midterm, 88% final: final grade = 87.4% = A. Adjust the weights to match your course syllabus and the grades to test scenarios.",
    formula: 'Final = Σ (grade × weight) ÷ Σ weights',
    howItWorks:
      "Multiply each component's grade by its weight, sum the products, divide by total weight. (90×20 + 85×30 + 88×50) ÷ 100 = (1800 + 2550 + 4400) ÷ 100 = 87.5% final grade — letter grade A. If your weights don't sum to 100% (e.g. you've forgotten a lab component), the calculator divides by whatever the actual total is — so re-check your weights add up correctly. The final exam is usually the heaviest single component (40–50%), which is why one strong final can rescue a mediocre semester.",
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
    faqs: [
      {
        q: 'Why is the final exam usually weighted so heavily?',
        a: 'Final exams test cumulative mastery of the whole course, not just one chapter. Weighting them 40–50% incentivises students to consolidate their learning before the end and gives instructors a single comprehensive measurement of what was learned.',
      },
      {
        q: 'My weights don\'t add to 100. What happens?',
        a: 'The calculator divides by whatever your actual total is — so a 90% homework grade weighted at 25% out of a total of 75% counts as if it were weighted at 33.3%. The math works mechanically; make sure your weights are correct relative to your syllabus.',
      },
      {
        q: 'Should I focus on homework or the final?',
        a: 'Focus where your time has the highest grade-per-hour return. If homework is 20% of grade and represents 80 hours of work, each hour moves your final grade 0.25%. If the final is 50% and you can prep for it in 20 hours, each hour moves you 2.5% — 10× higher return. Generally, weighted-heavy components deserve disproportionately more prep time.',
      },
      {
        q: 'Can a perfect final save a failing semester?',
        a: 'Sometimes. If your current grade is 60% with a 30% remaining final, a 100% final gets you 60 × 0.70 + 100 × 0.30 = 72%. Lifts you from F to C-range. But if the final is only 20%, the same effort gets you only 68% — still a low C. The weight of the remaining component is what determines feasibility.',
      },
      {
        q: 'What\'s the difference between weighted average and simple average?',
        a: 'Simple average treats each component equally (90+85+88 ÷ 3 = 87.67%). Weighted average reflects each component\'s relative importance ((90×20 + 85×30 + 88×50) ÷ 100 = 87.5%). They\'re close in this case but can diverge significantly when components have very different weights.',
      },
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
    intro:
      "Going into a final exam, every student asks the same question: what do I need to score to get the grade I want? This calculator answers it directly. With a 78% current grade and a 30%-weighted final, hitting an 85% target requires scoring 101.3% on the final — not possible without bonus marks. Drop the target to 82% and you need 91.3% — challenging but doable. Aim for 80% and you need 84.7% — very achievable. The calculator tells you not just what you need, but whether it's mathematically possible given the final's weight.",
    formula: 'Required Score = (Target − Current × (1 − Weight)) ÷ Weight',
    howItWorks:
      "Solve the weighted average equation backwards. If your current grade has weight (1 − w) and your final has weight w, then: target = current × (1 − w) + final × w. Solving for final: final = (target − current × (1 − w)) ÷ w. For a 78% current grade, 30% final weight, 85% target: (85 − 78 × 0.70) ÷ 0.30 = (85 − 54.6) ÷ 0.30 = 30.4 ÷ 0.30 = 101.3%. Above 100% means not mathematically possible (without curving or bonus credit). The bigger the final's weight, the bigger the swing it can produce in your final grade.",
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
    faqs: [
      {
        q: 'Why does the calculator show I need more than 100%?',
        a: 'Because your current grade is too low for the target given the final exam\'s weight. Mathematically impossible without curving or bonus credit. Either lower your target, hope for a curve, or accept that the grade you wanted is now out of reach.',
      },
      {
        q: 'How important is the final exam weight?',
        a: 'Hugely. With a 50%-weight final, a single great score can pull your grade up by 15+ percentage points. With a 15%-weight final, even a 100% only nudges you 5 points up. Look at your syllabus carefully — the weight tells you how much the final matters.',
      },
      {
        q: 'What if I have multiple exams left, not just the final?',
        a: 'Combine their weights into a single \"remaining-work\" component and average them. If you have a midterm (15%) and a final (30%) remaining, treat them as 45% remaining with a blended grade you need to achieve. Solve for the required average across both.',
      },
      {
        q: 'My professor said there\'d be a curve. Should I aim lower?',
        a: 'Yes, but conservatively. Plan for the official rubric; treat curving as upside, not your plan. Many "curves" only add 2–5 points, not the 10–15 students hope for. Aim for the score you need without a curve.',
      },
      {
        q: 'What\'s the minimum I need to pass?',
        a: 'Set your target to the pass threshold (usually 50% or 60% depending on the course). The calculator returns the score needed. Often you only need 20–30% on the final to pass if your current grade is decent — gives you breathing room to focus on courses where you\'re closer to the edge.',
      },
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
    intro:
      "The classic study-time rule from US universities: for every credit hour of class, expect 2–3 hours of study outside class. A 15-credit semester (5 courses × 3 credits) needs 30–45 hours of weekly study — basically a full-time job on top of attending lectures. This calculator scales those numbers by your difficulty rating: easy course load (1) needs 2× credits, moderate (2) needs 3× credits, hard (3) needs 4× credits. 15 credits at moderate difficulty = 45 study hours/week = ~6.4 hours/day. Indian engineering students chasing high CGPA typically hit 35–50 hours of weekly study outside attended classes.",
    formula: 'Weekly hours = Credit Hours × (1 + Difficulty) · Daily hours = Weekly ÷ 7',
    howItWorks:
      "At difficulty 2 (moderate), the formula gives 3× credit hours. 15 × 3 = 45 hours/week, divided by 7 days = 6.4 hours/day average. Difficulty 1 (easy): 2× credits → 30 hours. Difficulty 3 (hard): 4× credits → 60 hours. The 2× minimum rule is built into the formula by adding 1 to the difficulty. These are AICTE and Carnegie Hour benchmarks, both of which estimate ~2–3 hours of out-of-class work per credit hour. Indian engineering students with internships or coding side projects might shave 10–20% off these numbers but rarely below 2× credits and still keep grades intact.",
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
    faqs: [
      {
        q: 'How many hours should I study per credit hour?',
        a: 'US Carnegie Hour standard: 2–3 hours of study outside class per credit hour. AICTE recommendation for Indian engineering is similar. For a 3-credit course, expect 6–9 hours of self-study per week beyond attending lectures.',
      },
      {
        q: 'Is 8 hours of study a day too much?',
        a: 'Sustainable for short bursts (exam prep, project deadlines), unsustainable as a routine. Most cognitive research suggests 4–5 hours of focused deep work daily plus 2–3 hours of routine work (problem-solving, reading) is the upper bound for steady productivity.',
      },
      {
        q: 'Can I do well without studying that much?',
        a: 'Yes, if you have strong fundamentals and efficient study habits. The credit-hour rule is for average students. Top performers often spend less time but with much higher quality (spaced practice, active recall, problem-solving rather than re-reading). Quality compounds over quantity.',
      },
      {
        q: 'How should I distribute study time across courses?',
        a: 'Roughly proportional to credit weight × difficulty. A 4-credit hard course deserves 2–3× the time of a 2-credit easy elective. Don\'t spend equal time on each course — match your effort to grade-leverage.',
      },
      {
        q: 'What if I work part-time alongside studies?',
        a: 'You\'ll need to cap study time at maybe 30–35 hours/week given 15–20 hours of work plus classes. That works for a moderate course load (12 credits) but is risky at 18+ credits. Either reduce courses or accept that grades may drop.',
      },
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
    intro:
      "Before you stay up all night perfecting an assignment, check what it's actually worth. This calculator shows the percentage points a single assignment contributes to your final course grade — useful for deciding how hard to push. An 85% on a 15%-weighted assignment contributes 12.75 percentage points to your course grade. A 100% on the same assignment contributes 15 points. The difference between a B and an A on that single piece is only 2.25 points — sometimes worth the extra effort, sometimes not. Use this to prioritise effort across the term.",
    formula: 'Contribution to Final = (Assignment Grade × Weight) ÷ 100',
    howItWorks:
      "An assignment's contribution to your final grade equals its grade times its weight. 85% × 15% = 12.75 percentage points. Maximum possible contribution at 100% on a 15%-weighted assignment is 15 points. A 5%-weighted quiz, even with a perfect 100%, contributes only 5 points — barely meaningful. Conversely, a 50%-weighted final exam at 75% contributes 37.5 points — almost half your final grade. The bigger the weight, the more leverage each point of effort produces.",
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
    faqs: [
      {
        q: 'How do I know which assignments to prioritise?',
        a: 'Rank assignments by (weight × your skill level)–(weight × current performance). Assignments where you\'re weak and that are heavily weighted deserve disproportionate prep time. Assignments where you\'re strong and weight is low (extra-credit, easy quizzes) deserve minimal time.',
      },
      {
        q: 'Is it worth perfecting a low-weight assignment?',
        a: 'Usually no. A 5%-weighted assignment going from 85% to 100% adds only 0.75 percentage points to your final grade. Spending 8 hours to get the extra 15% is rarely worth it unless you\'re right on a grade boundary.',
      },
      {
        q: 'What if my professor doesn\'t announce weights?',
        a: 'Most professors include weights in the syllabus or course outline. If unclear, ask early in the term — students often discover at the end that "participation" or "attendance" was secretly 10% of their grade. Better to know upfront.',
      },
      {
        q: 'Can low-weight assignments still hurt my GPA?',
        a: 'Yes — through accumulation. Eight 2%-weighted homeworks at 60% each cost you 6.4 percentage points off potential. Individual low-weight assignments don\'t hurt, but consistent under-performance on them does.',
      },
      {
        q: 'How does weighted grade differ from average grade?',
        a: 'Average treats every assignment equally (sum of grades ÷ number). Weighted reflects each assignment\'s importance (grade × weight summed). A perfect quiz score and a failing exam don\'t cancel out in a weighted scheme — the exam dominates because of its higher weight.',
      },
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
    intro:
      "Class rank gets translated into percentile for college applications, merit scholarships, and grad school admissions. This calculator converts rank to two views: your percentile (how many people you beat) and \"top X%\" (where you stand among the leaders). Ranked 15 in a class of 100? You're in the 85th percentile and in the top 15%. Both numbers matter — colleges want to see top-decile and top-quartile performance, with the most competitive scholarships requiring top-5% or top-1% standing.",
    formula: 'Percentile = ((Class Size − Rank) ÷ Class Size) × 100 · Top % = (Rank ÷ Class Size) × 100',
    howItWorks:
      "Rank 15 of 100: ((100 − 15) ÷ 100) × 100 = 85th percentile — you're at or above 85% of the class. Equivalent: top 15%. Rank 1 of 200 = 99.5th percentile = top 0.5%. Rank 50 of 100 = 50th percentile = top 50% (median). Most colleges (and Indian competitive exams) care about top-decile cutoffs — top 10% qualifies for many merit lists, top 1% gets you into really selective programs. The bigger the class, the more impressive any given rank becomes — rank 5 in a class of 1,000 means more than rank 5 in a class of 30.",
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
    faqs: [
      {
        q: 'Is class rank or GPA more important?',
        a: 'GPA gives an absolute measure; rank gives a comparative one. For admissions, both matter — a 3.8 GPA in a strong cohort (top 25%) is more impressive than a 3.95 GPA in a weak cohort (top 5%). Most admissions officers consider both.',
      },
      {
        q: 'What\'s a good class rank for college admissions?',
        a: 'For Indian top colleges (IIT, NIT, IIIT): top 1–5% in your class + strong board scores typically qualifies. For US Ivy League: top 5–10% is the norm, plus strong SAT/ACT. For state universities: top 20–30% is usually sufficient.',
      },
      {
        q: 'Is class rank still used in college admissions?',
        a: 'Decreasingly. Many US high schools have stopped reporting rank to colleges (around 50% don\'t report). Replaced by GPA + course rigour + standardised tests. Indian institutions still use rank heavily, especially for entrance exam admissions.',
      },
      {
        q: 'How can I improve my class rank?',
        a: 'Three direct levers: (1) Take harder courses and ace them (most schools weight harder courses higher), (2) Focus on weak subjects to bring up overall GPA, (3) Be strategic about course load — overloading hurts more than helps if your GPA drops.',
      },
      {
        q: 'What\'s the difference between rank and percentile?',
        a: 'Rank is your absolute position (15th); percentile is your relative standing (85th percentile means you beat 85% of the class). For a class of 100, rank 1 = 99th percentile (you beat 99% — you can\'t beat yourself). For a class of 1,000, rank 10 = 99th percentile.',
      },
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
    intro:
      "The 75% attendance rule is famous in Indian engineering colleges — fall below it and you forfeit your right to sit the semester exam, regardless of how well you know the material. This calculator works out exactly how many classes you can still skip while staying eligible. 45 attended out of 50 so far = 90% current. With 30 more classes remaining, you can skip 15 of them and still finish at exactly 75% — but the safer move is to stay above 80% buffer so an unexpected illness doesn't wipe out your exam eligibility.",
    formula: 'Current % = (Attended ÷ Total) × 100 · Can Skip = Attended + Remaining − ⌈(Required% × Future Total)⌉',
    howItWorks:
      "Current attendance is straightforward — attended ÷ total × 100. For \"can skip,\" the calculator computes how many total classes you must attend across past + remaining to meet the requirement, then subtracts what you've already attended plus what's remaining. 45 attended out of 50, 30 remaining: future total = 80. 75% of 80 = 60 minimum attended. You'll have 45 + 30 = 75 chances to attend, so can-skip = 75 − 60 = 15 classes. If you skip 15, your final = 60/80 = exactly 75%. Push skips to 16 and you're at 73.75% — ineligible.",
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
    faqs: [
      {
        q: 'What\'s the minimum attendance in Indian colleges?',
        a: '75% is the AICTE-mandated minimum for engineering and most technical programs. Some IITs and NITs require 75% per course (you can\'t average across courses). Medical colleges (MBBS) require 75% for theory and 80% for clinical postings.',
      },
      {
        q: 'What happens if I fall below 75%?',
        a: 'You\'re typically detained (called \"D-grade\" or \"shortage\") and cannot sit the semester end exam. You either repeat the semester or take the exam in the next available cycle. Some colleges allow a one-time condonation if you\'re at 70–75% with documented reasons.',
      },
      {
        q: 'How can I recover from a medical absence?',
        a: 'Submit a medical certificate within 1 week of returning (specific timing varies by college). Most colleges count medical-certified absences toward attendance for compliance purposes, even if they don\'t literally count as \"attended.\" Check your specific college\'s rules.',
      },
      {
        q: 'Does internship/training count toward attendance?',
        a: 'Usually yes, if it\'s pre-approved by the college (industry internship as part of curriculum, NCC training, sports for representing the college). Unapproved internships count as absences. Get formal approval before any extended absence.',
      },
      {
        q: 'How can I improve attendance late in the semester?',
        a: 'Mathematically — every class attended adds about (1 ÷ total future classes) percentage points. If 20 classes remain and you\'re at 60%, attending all 20 brings you to about 67% by the end — still below 75%. The earlier in the semester you fix attendance, the more it can recover.',
      },
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
    intro:
      "Reading speed varies enormously between individuals — adult averages range from 200 to 400 words per minute (WPM) for casual reading, with comprehension varying just as widely. This calculator gives you your raw WPM from a timed reading session. 1,500 words in 5 minutes = 300 WPM — solid above-average territory. Speed alone doesn't tell the story; reading at 600 WPM with 40% comprehension is worse than reading at 250 WPM with 90% comprehension. Use the calculator to benchmark, then test comprehension separately by summarising what you read.",
    formula: 'WPM = Words ÷ Minutes',
    howItWorks:
      "Pick a passage of known word count (count via a word-count tool or use a textbook page where you can multiply line count × average words per line). Read at your normal pace, time yourself, divide words by minutes. 1,500 words in 5 minutes = 300 WPM. Adult speed bands: < 200 below average, 200–300 average, 300–400 good, 400+ excellent. Speed readers claim 600–1,000 WPM but most legitimate research shows comprehension drops sharply above 400 WPM for unfamiliar material.",
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
    faqs: [
      {
        q: 'What\'s an average adult reading speed?',
        a: '200–300 WPM is the average for adult readers of moderate-complexity text. Educated adults read closer to 300–400 WPM. The big variable is content complexity — easy fiction at 400 WPM, dense academic text at 150–200 WPM.',
      },
      {
        q: 'How can I read faster?',
        a: 'Three techniques with evidence: (1) Reduce sub-vocalisation by reading with rhythmic background sound, (2) Practise chunking — reading 2–4 word groups instead of one word at a time, (3) Use a pacer (finger or pen moving below the line) to maintain rhythm. Expect 10–30% improvement with 4–6 weeks of practice.',
      },
      {
        q: 'Is speed-reading real?',
        a: 'Selective skimming and scanning are real techniques and produce high "WPM" claims, but research consistently shows comprehension drops sharply when actual reading exceeds 400–500 WPM. The "1,000 WPM" claims usually represent skimming, not full reading.',
      },
      {
        q: 'How does reading speed compare to listening?',
        a: 'Normal English speech is about 150 WPM, audiobooks at 1.25–1.5x speed reach 190–225 WPM. Most adults read 1.5–2× faster than they listen — but listening has higher retention for many people because the rhythm forces processing.',
      },
      {
        q: 'Does reading speed matter for competitive exams?',
        a: 'For CAT/GMAT verbal sections, yes — passage-based questions reward both speed (you need to finish in time) and accuracy. Most successful test-takers read at 300+ WPM with strong comprehension. Slow readers struggle with timing more than with question difficulty.',
      },
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
