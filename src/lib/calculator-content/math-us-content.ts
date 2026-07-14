import type { CalcInlineContent } from './types';

export const mathUsContent: Record<string, CalcInlineContent> = {
  'scientific-calculator': {
    article: `This free online scientific calculator works like a TI or Casio handheld, right in your browser. It handles everything a basic calculator can't: trigonometry, logarithms, exponents, roots, factorials, and constants like π and e — with a memory bank and a clear running display of your expression.

## Order of operations, applied

The calculator evaluates your expression using the standard order of operations (PEMDAS): parentheses first, then exponents, then multiplication and division left to right, then addition and subtraction.

\`\`\`
2 + 3 × 4^2  =  2 + 3 × 16  =  2 + 48  =  50
sin(30°)     =  0.5          (degree mode)
log(1000)    =  3            ln(e) = 1
5!           =  5 × 4 × 3 × 2 × 1  =  120
\`\`\`

**The keypad, briefly:**

- **Trig keys (sin, cos, tan)** respect the DEG/RAD toggle. In degree mode, sin(30) = 0.5; in radian mode, sin(30) ≈ −0.988 because 30 radians is about 4.77 full turns around the circle. Inverse functions (sin⁻¹, cos⁻¹, tan⁻¹) return angles in the current mode.
- **Logarithms:** log is base 10, ln is base e (natural log). For any other base, use the change-of-base identity: log₂(x) = ln(x) ÷ ln(2).
- **Powers and roots:** x² squares, x^y raises to any power, √ takes the square root. Negative inputs to √ return an error rather than a complex number.
- **Factorial (n!)** multiplies all whole numbers from n down to 1. It is defined here for non-negative integers; 170! is the largest value double-precision math can hold (~7.26 × 10³⁰⁶), so this calculator rejects anything above 170 with an error.
- **Memory keys:** M+ adds the displayed value to memory, M− subtracts it, MR recalls it, and MC clears it — handy for multi-step problems.

**Where precision runs out:** all arithmetic uses IEEE-754 double-precision floating point, which is accurate to roughly 15–17 significant digits. Tiny rounding artifacts (like 0.1 + 0.2 showing 0.30000000000000004 on naive calculators) are cleaned up in the display, but extremely large or small intermediate values can still lose precision. For symbolic math (exact fractions, algebra), use a CAS instead.`,
    faqs: [
      {
        question: 'Why does sin(30) show 0.5 in degree mode but something else in radian mode?',
        answer: 'In degree mode, 30 means 30°, and sin(30°) = 0.5 exactly. In radian mode, 30 means 30 radians — about 1718° — so sin(30 rad) ≈ −0.988. Check the DEG/RAD toggle before any trig calculation; it is the single most common source of "wrong" answers.',
      },
      {
        question: 'What is the difference between log and ln?',
        answer: '**log** is the base-10 logarithm (log 1000 = 3), used in pH, decibels, and earthquake magnitudes. **ln** is the natural logarithm with base e ≈ 2.71828 (ln e = 1), used in compound growth and calculus. For any other base, divide: log₂(x) = ln(x) ÷ ln(2).',
      },
      {
        question: 'How large a factorial can this calculator compute?',
        answer: '170! ≈ 7.26 × 10³⁰⁶ is the largest factorial that fits in double-precision floating point. 171! and above exceed that range, so the calculator shows an error instead of a number. Factorials are only defined here for whole numbers 0 and up (0! = 1 by definition).',
      },
      {
        question: 'Does it follow the correct order of operations?',
        answer: 'Yes. Expressions are evaluated using PEMDAS: parentheses, exponents, then multiplication/division left to right, then addition/subtraction. So 2 + 3 × 4 = 14, not 20. Use parentheses to force a different order: (2 + 3) × 4 = 20.',
      },
      {
        question: 'Can I type with my keyboard instead of clicking?',
        answer: 'Yes. Digits, the operators + − * / ^, the decimal point, parentheses, the % and ! keys, Enter (equals), Backspace (delete), and Escape (clear) all work from a physical keyboard, which is much faster for long expressions.',
      },
      {
        question: 'What do the memory keys MC, MR, M+, and M− do?',
        answer: 'M+ adds the current display value to a stored memory total, M− subtracts it, MR recalls the stored value onto the display, and MC empties the memory (the M badge disappears). They let you accumulate intermediate results across separate calculations without writing anything down.',
      },
    ],
  },
  'random-number-generator': {
    article: `Need to pick a raffle winner, roll a virtual die, sample a list, or just settle a debate? This random number generator produces fair, uniformly distributed numbers in any range you set — and every number in the range, including both the minimum and the maximum, has exactly the same chance of being picked.

## How the random draw works

A random integer between min and max (inclusive on both ends) is produced like this:

\`\`\`
result = min + floor(random() × (max − min + 1))
\`\`\`

The "+ 1" is what makes the top of the range reachable — a detail many homemade generators get wrong, silently excluding the maximum value.

**True random vs. pseudo-random.** Computers are deterministic machines, so most "random" numbers are actually *pseudo-random*: generated by an algorithm that, given the same starting seed, would produce the same sequence every time. Good pseudo-random generators pass rigorous statistical tests and are indistinguishable from true randomness for everyday purposes. True random numbers, by contrast, come from physical processes — atmospheric noise, radioactive decay, or hardware entropy. Modern browsers expose a cryptographically secure generator (CSPRNG) seeded from operating-system entropy, which is what serious applications use when unpredictability matters.

**What counts as a fair pick?** Fairness means uniformity: in a 1–100 draw, every integer has exactly a 1-in-100 chance. This generator does not weight, repeat-avoid, or bias results unless you ask it to. Over a small number of draws, streaks and repeats are normal and expected — true randomness is lumpier than most people intuit. The "law of averages" only smooths things out over thousands of draws.

**Before you rely on it for anything high-stakes:** results are independent, so previous draws never influence the next one (no "due" numbers). Duplicates can occur across multiple draws unless you specifically generate a non-repeating set. And while the output is more than random enough for raffles, classroom picks, and games, you should not use any general-purpose generator to create passwords or cryptographic keys — use a dedicated password manager for that.`,
    faqs: [
      {
        question: 'Are the numbers truly random?',
        answer: 'They are generated by your browser\'s random source, which for practical purposes is indistinguishable from true randomness. Pseudo-random generators are algorithmic, while "true" randomness comes from physical entropy — but for raffles, games, sampling, and decisions, a quality browser generator is statistically fair and unbiased.',
      },
      {
        question: 'Are the minimum and maximum values included in the results?',
        answer: 'Yes — the range is inclusive on both ends. If you set 1 to 10, both 1 and 10 can appear, each with exactly a 1-in-10 chance. The formula adds 1 to the range width specifically so the maximum is reachable.',
      },
      {
        question: 'Can the same number come up twice in a row?',
        answer: 'Yes, and that is expected. Each draw is independent, so a repeat is exactly as likely as any other specific outcome. Real randomness produces streaks and duplicates more often than intuition suggests. If you need unique results (like drawing several raffle winners), generate a non-repeating set instead of separate single draws.',
      },
      {
        question: 'Is this fair enough to pick a giveaway or raffle winner?',
        answer: 'Yes. Every entry number in your range has an identical probability of being selected, with no weighting or bias. For transparency, decide the range and number of winners before you draw, and consider screen-recording the draw so participants can verify it.',
      },
      {
        question: 'Can I use it to generate passwords or predict lottery numbers?',
        answer: 'Neither, for different reasons. Passwords need a cryptographically secure source and proper character handling — use a password manager. Lotteries cannot be predicted at all: each official draw is independent, so no generator, pattern, or "hot number" system improves your odds.',
      },
    ],
  },
  'percentage-change-calculator': {
    article: `Percentage change measures how much a value has grown or shrunk relative to where it started. It is the standard way to express a price increase, a stock's move, a salary raise, a weight loss, or a traffic jump — anything where "how big is the change compared to the original?" is the real question.

## The formula, and why it uses absolute value

\`\`\`
% change  = (new − old) ÷ |old| × 100
difference = new − old
\`\`\`

A positive result is an increase, a negative result is a decrease, and zero means no change. For example, going from 200 to 250 gives (250 − 200) ÷ 200 × 100 = **+25%**, while going from 250 to 200 gives (200 − 250) ÷ 250 × 100 = **−20%**. Note the asymmetry: the same $50 move is a different percentage depending on the starting point, which is why a 25% gain followed by a 25% loss leaves you below where you began.

**Why the absolute value in the denominator?** When the old value is negative — say a company's earnings move from −$50 to +$25 — dividing by the raw negative number flips the sign and makes a clear improvement look like a decline. Dividing by |old| keeps the direction intuitive: −50 → 25 reads as a +150% increase, which matches what actually happened. Some finance textbooks simply call percentage change "not meaningful" across sign flips, so treat those cases with care.

**One thing to watch for:** percentage change is undefined when the old value is 0, because you cannot divide by zero — there is no baseline to compare against (this calculator says so explicitly instead of returning an error). Also keep two cousins straight: *percentage points* measure the simple arithmetic gap between two percentages (4% → 6% is +2 points but a +50% change), and *percentage difference* compares two values symmetrically using their average as the base, with no "before" and "after."`,
    faqs: [
      {
        question: 'What is the formula for percentage change?',
        answer: 'Percentage change = (new value − old value) ÷ |old value| × 100. Going from 200 to 250 is (250 − 200) ÷ 200 × 100 = +25%. A positive result means an increase; a negative result means a decrease.',
      },
      {
        question: 'Why is percentage change undefined when the old value is 0?',
        answer: 'Because the formula divides by the old value, and division by zero has no defined result. Conceptually, there is no baseline: going from 0 to 50 is not "infinity percent" — it is simply an increase of 50 with no meaningful percentage. This calculator reports the difference and direction instead.',
      },
      {
        question: 'What is the difference between percentage change and percentage points?',
        answer: 'Percentage points measure the raw gap between two percentages, while percentage change is relative to the starting value. If an interest rate moves from 4% to 6%, that is an increase of 2 percentage points — but a percentage change of +50%, because 2 is half of 4.',
      },
      {
        question: 'How does the calculator handle negative starting values?',
        answer: 'It divides by the absolute value of the old number, so the sign of the result always matches the real direction of change. Moving from −50 to 25 shows as a +150% increase, which is intuitive — dividing by the raw −50 would wrongly flag it as a decrease.',
      },
      {
        question: 'Is percentage change the same as percentage difference?',
        answer: 'No. Percentage change is directional — it compares a new value against an original baseline. Percentage difference is symmetric: it divides the gap by the average of the two values and has no notion of before and after. Use change for trends over time, difference for comparing two peers.',
      },
    ],
  },
};
