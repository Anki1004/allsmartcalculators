import type { CalcInlineContent } from './types';

export const financeUsTaxContent: Record<string, CalcInlineContent> = {
  'paycheck-calculator': {
    article: `Your salary and the number that actually lands in your bank account are two different things. Between federal income tax, Social Security, Medicare, state tax, and pre-tax benefits like a 401(k) or health insurance, a $65,000 salary in the US typically becomes roughly $2,090 per biweekly paycheck. This calculator estimates that take-home number for 2026 using the official IRS inflation-adjusted figures.

## How it's calculated

\`\`\`
annual gross   = salary  (or hourly rate × hours/week × 52)
federal taxable = gross − pre-tax deductions − standard deduction
federal tax     = 2026 bracket tax (10% to 37%)
Social Security = 6.2% × min(gross, $184,500)
Medicare        = 1.45% × gross (+0.9% above $200k single / $250k MFJ)
state tax       = flat % × (gross − pre-tax deductions)
take-home       = gross − federal − FICA − state − pre-tax deductions
\`\`\`

The 2026 standard deduction is $16,100 (single), $32,200 (married filing jointly), and $24,150 (head of household), per IRS Rev. Proc. 2025-32. The Social Security wage base of $184,500 comes from the SSA's 2026 announcement.

## Assumptions and limitations

This is an estimate of annual tax liability spread evenly across paychecks — not a simulation of your employer's W-4 withholding tables, so your actual stub may differ. We apply the standard deduction only (no credits like the Child Tax Credit), and FICA is computed on full gross pay as a simplification. In reality, Section 125 health premiums reduce FICA wages while 401(k) deferrals do not — so if your pre-tax deductions are mostly health insurance, your real FICA bill is slightly lower than shown.

State tax is modeled as a single flat percentage. Nine states — Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming — levy no wage income tax, so leave the slider at 0 there. States with progressive brackets (like California, topping out at 13.3%) are best approximated with your effective state rate, not your top marginal rate. Local and city taxes (e.g., NYC) are not included.`,
    faqs: [
      {
        question: 'Why is my actual paycheck different from this estimate?',
        answer: 'Employers withhold using your W-4 elections and IRS withholding tables, which spread an estimate of your annual tax across paychecks. Tax credits, extra withholding, local taxes, and benefits like FSA or commuter deductions all shift the real number. This calculator shows your true annual liability divided evenly per period.',
      },
      {
        question: 'What is FICA?',
        answer: 'FICA covers Social Security and Medicare. In 2026 that is 6.2% Social Security tax on wages up to $184,500, plus 1.45% Medicare tax on all wages, plus an extra 0.9% Medicare surtax on wages above $200,000 (single) or $250,000 (married filing jointly). Your employer pays a matching share.',
      },
      {
        question: 'Do 401(k) contributions reduce my taxes?',
        answer: 'Traditional 401(k) contributions reduce **federal and state income tax** but not FICA — Social Security and Medicare are still taken on that money. The 2026 employee deferral limit is $24,500 ($32,500 if age 50+).',
      },
      {
        question: 'What is the 2026 standard deduction?',
        answer: 'Per IRS Rev. Proc. 2025-32: $16,100 for single filers and married filing separately, $32,200 for married filing jointly, and $24,150 for head of household.',
      },
      {
        question: 'Which states have no income tax?',
        answer: 'Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming have no tax on wage income. Set the state slider to 0 if you live in one of them.',
      },
    ],
  },
  'federal-income-tax-calculator': {
    article: `The US federal income tax is progressive: income is sliced into brackets, and each slice is taxed at its own rate — 10%, 12%, 22%, 24%, 32%, 35%, and 37% for 2026. A single filer earning $85,000 does not pay 22% on everything; only the dollars above $50,400 of taxable income are taxed at 22%. This calculator applies the official 2026 brackets from IRS Rev. Proc. 2025-32 and shows the exact tax generated in each bracket.

## How it's calculated

\`\`\`
taxable income = max(0, gross income − deduction)
deduction      = standard deduction (by filing status) or your itemized total
federal tax    = Σ (income in each bracket × that bracket's rate)
marginal rate  = rate of the top bracket your income reaches
effective rate = federal tax ÷ gross income
\`\`\`

Worked example: a single filer with $85,000 gross and the $16,100 standard deduction has $68,900 of taxable income. Tax = 10% × $12,400 + 12% × $38,000 + 22% × $18,500 = $9,870 — an effective rate of just 11.61% even though the marginal rate is 22%.

## 2026 figures (IRS Rev. Proc. 2025-32)

Standard deductions: $16,100 single or married filing separately, $32,200 married filing jointly, $24,150 head of household. The single-filer 22% bracket starts at $50,400 of taxable income and the 24% bracket at $105,700; married-filing-jointly thresholds are roughly double.

## Assumptions and limitations

This estimates federal income tax on ordinary income only. It excludes FICA payroll taxes, state and local income taxes, the Alternative Minimum Tax, self-employment tax, and tax credits such as the Child Tax Credit or Earned Income Tax Credit — credits reduce your bill dollar-for-dollar after this calculation. Long-term capital gains and qualified dividends use separate preferential rates (see our capital gains calculator). If you itemize, enter your total Schedule A deductions; most filers take the standard deduction since it is larger than their itemizable expenses.`,
    faqs: [
      {
        question: 'What are the 2026 federal tax brackets?',
        answer: 'Seven rates apply for 2026: 10%, 12%, 22%, 24%, 32%, 35%, and 37%. For single filers, the 22% bracket covers taxable income from $50,400 to $105,700 and the top 37% rate begins above $640,600. Married-filing-jointly thresholds are roughly double (source: IRS Rev. Proc. 2025-32).',
      },
      {
        question: 'What is the difference between marginal and effective tax rate?',
        answer: 'Your marginal rate is the tax on your **next** dollar of income — the top bracket you reach. Your effective rate is total tax divided by total income, which is always lower in a progressive system. A single filer at $85,000 has a 22% marginal rate but only about an 11.6% effective rate.',
      },
      {
        question: 'What is the 2026 standard deduction?',
        answer: '$16,100 for single filers and married filing separately, $32,200 for married filing jointly, and $24,150 for head of household, per IRS Rev. Proc. 2025-32.',
      },
      {
        question: 'Should I take the standard deduction or itemize?',
        answer: 'Take whichever is larger. Itemizing only helps if your deductible expenses — state and local taxes (capped), mortgage interest, charitable gifts, large medical bills — exceed your standard deduction. Roughly 9 in 10 filers take the standard deduction.',
      },
      {
        question: 'Does this include Social Security, Medicare, or state tax?',
        answer: 'No. This covers federal income tax only. Use the Paycheck Calculator to layer in FICA (7.65% for most workers) and a state income tax estimate.',
      },
      {
        question: 'Are tax credits included?',
        answer: 'No. Credits like the Child Tax Credit reduce the tax shown here dollar-for-dollar after the bracket math. A family owing $9,870 with two qualifying children could cut that by thousands.',
      },
    ],
  },
  'capital-gains-tax-calculator': {
    article: `Sell an investment for more than you paid and the IRS taxes the difference — but **how much** depends almost entirely on how long you held it. Assets held one year or less generate short-term gains taxed at your ordinary income rates (10% to 37%), while assets held longer than a year qualify for the preferential long-term rates of 0%, 15%, or 20%. This calculator estimates the 2026 federal tax either way, using the thresholds from IRS Rev. Proc. 2025-32.

## How it's calculated

\`\`\`
gain = sale price − purchase price (cost basis)

Short-term:
tax = ordinaryTax(income + gain) − ordinaryTax(income)

Long-term (gain stacks on top of taxable income):
portion below $49,450*  → 0%
portion up to $545,500* → 15%
portion above           → 20%
(*2026 single-filer breakpoints; MFJ: $98,900 / $613,700)
\`\`\`

Long-term gains "stack" on top of your other taxable income. A single filer with $40,000 of taxable income and a $20,000 long-term gain pays 0% on the first $9,450 of the gain (up to the $49,450 breakpoint) and 15% on the remaining $10,550 — a blended rate well under 15%.

## Assumptions and limitations

This estimates federal tax only. The 3.8% Net Investment Income Tax (NIIT), which applies when modified adjusted gross income exceeds $200,000 (single) or $250,000 (married filing jointly), is **not** included — high earners should add it on top. State capital gains taxes (California taxes gains as ordinary income up to 13.3%) are also excluded. Special regimes are not modeled: depreciation recapture on rentals (25%), collectibles (28%), the Section 121 home-sale exclusion ($250k/$500k), wash-sale rules, and loss harvesting. If your sale price is below your basis, the calculator reports a capital loss and $0 tax — losses first offset other gains, then up to $3,000 of ordinary income per year, with the rest carried forward.`,
    faqs: [
      {
        question: 'What counts as a long-term capital gain?',
        answer: 'You must hold the asset for **more than one year** before selling. Exactly one year or less is short-term and taxed at ordinary income rates. The clock starts the day after purchase and includes the sale date.',
      },
      {
        question: 'What are the 2026 long-term capital gains brackets?',
        answer: 'Per IRS Rev. Proc. 2025-32, the 0% rate applies up to $49,450 of taxable income for single filers ($98,900 married filing jointly), the 15% rate up to $545,500 ($613,700 MFJ), and 20% above that. Your gain stacks on top of your other taxable income to determine which bands it falls in.',
      },
      {
        question: 'Can I really pay 0% on capital gains?',
        answer: 'Yes. If your taxable income including the gain stays under $49,450 (single) or $98,900 (married filing jointly) in 2026, your long-term gain is federally tax-free. Retirees and low-income years are common opportunities to harvest gains at 0%.',
      },
      {
        question: 'Does this include the 3.8% NIIT?',
        answer: 'No. The Net Investment Income Tax adds 3.8% on investment income when your MAGI exceeds $200,000 (single) or $250,000 (married filing jointly). If you are over those thresholds, add 3.8% of the gain to the estimate shown.',
      },
      {
        question: 'What if I sold at a loss?',
        answer: 'No capital gains tax is owed. Capital losses offset capital gains first; any excess deducts up to $3,000 per year against ordinary income, and the remainder carries forward to future years.',
      },
      {
        question: 'Is the sale of my home taxed?',
        answer: 'Often not. Section 121 lets you exclude up to $250,000 of gain ($500,000 married filing jointly) on a primary residence you owned and lived in for 2 of the last 5 years. This calculator does not apply that exclusion — subtract it from your gain first.',
      },
    ],
  },
};
