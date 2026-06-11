import type { CalcInlineContent } from './types';

export const financeUsRetirementContent: Record<string, CalcInlineContent> = {
  '401k-calculator': {
    article: `A 401(k) is the workhorse of American retirement saving: you defer part of each paycheck pre-tax, your employer often matches a portion, and the whole pot compounds tax-deferred until you withdraw it. This calculator projects your balance year by year from today until your chosen retirement age, applying the 2026 IRS contribution limits at every age along the way.

## How it's calculated

The projection runs one loop per year of work remaining:

\`\`\`
employee = min(salary × contribution %, IRS deferral limit for that age)
match    = match % × min(employee, salary × match-cap %)
balance  = (balance + employee + match) × (1 + annual return %)
salary   = salary × (1 + salary growth %)
\`\`\`

The employer match is modeled the way most US plans describe it: your employer contributes a percentage of *your* contribution (for example, 50%), but only on contributions up to a cap expressed as a percentage of salary (commonly 6%). With a $75,000 salary, an 8% contribution, a 50% match, and a 6% cap, you contribute $6,000 and your employer adds 50% × min($6,000, $4,500) = $2,250.

For 2026, per IRS Notice 2025-67 and Rev. Proc. 2025-32, the employee deferral limit is $24,500. Savers aged 50 and older may add an $8,000 catch-up, and SECURE 2.0's enhanced catch-up lets workers aged 60–63 add $11,250 instead (the limit returns to the $8,000 catch-up at 64+). The combined employee-plus-employer limit is $72,000. The calculator caps your deferral at the age-appropriate limit each year as your salary grows.

## Assumptions and limitations

- Contributions are made once per year and returns are credited at year-end, which slightly understates intra-year compounding.
- The 2026 limits are held constant for all future years; in reality the IRS indexes them to inflation annually.
- The $72,000 combined limit and the high-earner mandatory Roth catch-up rule are not enforced.
- Taxes on withdrawal, plan fees, vesting schedules, and Roth 401(k) treatment are outside the model.

Use the year-by-year table to see exactly when catch-up eligibility kicks in and how much of your final balance comes from employer money versus market growth.`,
    faqs: [
      {
        question: 'What is the 401(k) contribution limit for 2026?',
        answer: 'For 2026 the employee deferral limit is **$24,500** (IRS Notice 2025-67). Workers 50+ can add an $8,000 catch-up, and ages 60–63 get an enhanced $11,250 catch-up under SECURE 2.0. The combined employee + employer limit is $72,000.',
      },
      {
        question: 'How does an employer match like "50% up to 6%" work?',
        answer: 'Your employer contributes 50 cents for every dollar you contribute, but only on contributions up to 6% of your salary. On a $75,000 salary the maximum match is 50% × $4,500 = $2,250 per year — free money you forfeit if you contribute less than 6%.',
      },
      {
        question: 'Does the employer match count against my $24,500 limit?',
        answer: 'No. The $24,500 deferral limit applies only to your own contributions. Employer money counts toward the separate combined limit of $72,000 for 2026.',
      },
      {
        question: 'What rate of return should I assume?',
        answer: 'A diversified stock-heavy portfolio has historically returned around 7–10% per year before inflation. Many planners model 6–7% to stay conservative; try several values to see the range of outcomes.',
      },
      {
        question: 'What is the enhanced catch-up for ages 60–63?',
        answer: 'SECURE 2.0 allows workers who are 60, 61, 62, or 63 at year-end to contribute a larger catch-up — $11,250 in 2026 — instead of the standard $8,000. At age 64 the standard $8,000 catch-up applies again.',
      },
    ],
  },
  'roth-ira-calculator': {
    article: `A Roth IRA flips the usual retirement-tax deal: you contribute money you've already paid income tax on, and in exchange, qualified withdrawals in retirement — both your contributions and decades of investment growth — are completely tax-free. This calculator compounds your current balance and annual contributions to your chosen retirement age under the 2026 IRS limits.

## How it's calculated

The model adds one contribution per year, then applies your expected return:

\`\`\`
for each year until retirement:
  contribution = min(your contribution, $7,500 + $1,100 catch-up if age ≥ 50)
  balance      = (balance + contribution) × (1 + annual return %)
\`\`\`

For 2026, per IRS Notice 2025-67 and Rev. Proc. 2025-32, the IRA contribution limit is $7,500, with an additional $1,100 catch-up for savers aged 50 and older ($8,600 total). The calculator automatically raises your cap in the years you are 50+, so you can set the contribution slider to the maximum and let the limit do the work.

## Why "tax-free" matters

Because qualified Roth withdrawals are excluded from gross income, the entire "Total Growth" figure shown above is money you never pay federal income tax on — unlike a traditional 401(k) or IRA, where withdrawals are taxed as ordinary income. Qualified means you're at least 59½ and your first Roth contribution was made at least five years earlier (the 5-year rule). Roth IRAs also have no required minimum distributions during the owner's lifetime.

## Assumptions and limitations

- Contributions are annual with year-end compounding; monthly contributions would grow slightly more.
- 2026 limits are held flat for all future years rather than indexed for inflation.
- **Income phase-outs are not modeled.** For 2026, the ability to contribute directly to a Roth IRA phases out at higher modified AGI levels (different ranges for single and married-filing-jointly filers). High earners often use a backdoor Roth conversion instead — talk to a tax professional.
- Contributions also require earned income at least equal to the amount contributed.

Pair this with the 401(k) calculator to see how a workplace plan plus a maxed Roth IRA stack up by retirement.`,
    faqs: [
      {
        question: 'What is the Roth IRA contribution limit for 2026?',
        answer: 'The 2026 IRA limit is **$7,500**, plus a **$1,100** catch-up for those 50 or older ($8,600 total), per IRS Notice 2025-67. The limit is shared across all of your traditional and Roth IRAs combined.',
      },
      {
        question: 'Are Roth IRA withdrawals really tax-free?',
        answer: 'Qualified withdrawals are 100% federal-tax-free: you must be 59½ or older and have held a Roth IRA for at least 5 years. Your original contributions (not earnings) can be withdrawn at any time without tax or penalty.',
      },
      {
        question: 'Can high earners contribute to a Roth IRA in 2026?',
        answer: 'Direct contributions phase out above certain modified AGI thresholds (this calculator does not model them). Earners above the phase-out commonly use a backdoor Roth — contributing to a non-deductible traditional IRA and converting it.',
      },
      {
        question: 'Roth IRA vs. traditional IRA — which is better?',
        answer: 'Roth tends to win if you expect a higher tax rate in retirement than today (common for young savers); traditional wins if you expect a lower rate. Roth also has no lifetime required minimum distributions, which helps estate planning.',
      },
      {
        question: 'Does this calculator account for the 5-year rule?',
        answer: 'No — it assumes your withdrawals at retirement are qualified. If you open your first Roth IRA within 5 years of retiring, earnings withdrawn before the 5-year mark could be taxable.',
      },
    ],
  },
  'social-security-calculator': {
    article: `**This is a simplified estimate**, not an official benefit statement. The Social Security Administration computes your real benefit from your top 35 years of inflation-indexed earnings; this calculator approximates that history with a single career-average number so you can explore claiming strategies in seconds. For your official projection, create a *my Social Security* account at SSA.gov.

## How it's calculated

Social Security converts career earnings into a monthly benefit in two steps — an earnings average (AIME) and a progressive benefit formula (PIA):

\`\`\`
AIME = min(average annual earnings, $184,500 wage base) / 12

PIA  = 90% × first $1,287 of AIME
     + 32% × AIME between $1,287 and $7,758
     + 15% × AIME above $7,758

benefit = PIA × claiming factor
          (62 → 0.70, 67 → 1.00, 70 → 1.24)
\`\`\`

The $1,287 and $7,758 figures are the 2026 "bend points," which track the national Average Wage Index, and $184,500 is the 2026 Social Security taxable wage base — earnings above it neither pay the 6.2% tax nor add to your benefit. The bend-point structure is deliberately progressive: lower earners get back a much larger share of their wages than higher earners.

Claiming age then scales the result. For workers born in 1960 or later, full retirement age (FRA) is 67. Claiming at 62 permanently cuts the check by about 30%; waiting until 70 earns delayed retirement credits of 8% per year, a permanent 24% raise.

## Assumptions and limitations

- A flat career-average stands in for the SSA's top-35 indexed earning years; uneven careers (gaps, late peak earnings) will diverge from this estimate.
- Bend points and the wage base are 2026 values; both rise most years with wage growth, and annual COLA increases after claiming are not modeled.
- Spousal, survivor, and disability benefits, the earnings test before FRA, WEP/GPO-style offsets, and taxation of benefits are out of scope.
- Eligibility requires 40 work credits (roughly 10 working years).

Treat the output as a planning ballpark — useful for comparing 62 vs. 67 vs. 70 — and confirm real numbers with SSA.gov before making a claiming decision.`,
    faqs: [
      {
        question: 'Is this my actual Social Security benefit?',
        answer: 'No — it is a simplified estimate. The SSA computes your real benefit from your top 35 years of inflation-indexed earnings. Check your official estimate at [SSA.gov](https://www.ssa.gov/myaccount/).',
      },
      {
        question: 'How much is my benefit reduced if I claim at 62?',
        answer: 'For anyone with a full retirement age of 67 (born 1960 or later), claiming at 62 reduces the monthly benefit by about **30%** — permanently. This calculator applies a 0.70 factor.',
      },
      {
        question: 'How much more do I get by waiting until 70?',
        answer: 'Delayed retirement credits add 8% per year between 67 and 70, for a permanent **24% increase** over your full-retirement-age benefit. There is no benefit to delaying past 70.',
      },
      {
        question: 'What are Social Security bend points?',
        answer: 'They are the dollar thresholds in the progressive benefit formula. In 2026 you earn 90% of your first $1,287 of average monthly earnings, 32% of the amount up to $7,758, and 15% above that — so lower earners get a higher replacement rate.',
      },
      {
        question: 'Why is my input capped at $184,500?',
        answer: 'That is the 2026 Social Security taxable wage base. Earnings above it are not subject to the 6.2% Social Security tax and do not increase your benefit.',
      },
      {
        question: 'Will my benefit grow with inflation after I claim?',
        answer: 'Yes — benefits receive an annual cost-of-living adjustment (COLA) based on CPI-W. This calculator shows today\'s dollars and does not project future COLAs.',
      },
    ],
  },
};
