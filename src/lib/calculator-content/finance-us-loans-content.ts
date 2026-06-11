import type { CalcInlineContent } from './types';

export const financeUsLoansContent: Record<string, CalcInlineContent> = {
  'sales-tax-calculator': {
    article: `Sales tax in the United States is set at the state level: 45 states plus the District of Columbia charge a statewide rate in 2026, and most allow counties and cities to add their own local taxes on top. This calculator works in two directions — add tax to a pre-tax price to see what you'll pay at the register, or start from a receipt total and extract how much of it was tax.

## How it's calculated

\`\`\`
Add tax:   tax = price × rate ÷ 100
           total = price + tax
Reverse:   pre-tax price = total ÷ (1 + rate ÷ 100)
           tax = total − pre-tax price
\`\`\`

Pick a state to use its 2026 statewide base rate, or choose "Custom rate" and dial in any combined rate with the slider. The reverse mode is the correct way to back tax out of a total — multiplying the total by the rate overstates the tax, because the tax was charged on the smaller pre-tax amount.

**Important: this tool uses state BASE rates only.** Local county, city, and special-district taxes stack on top of the state rate in 38 states, so the combined rate at the register is often 1–3 percentage points higher. Louisiana and Tennessee, for example, both average roughly 9.5% combined once local taxes are included, even though their state base rates are 5% and 7%. If you know your exact combined local rate, select "Custom rate" and enter it.

Five states charge no statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. Alaska is the exception among them — it allows local jurisdictions to levy their own sales taxes, which can run as high as roughly 7.5% in some boroughs.

Other limitations to keep in mind: many states exempt or reduce the rate on groceries, prescription drugs, and clothing, and some hold annual sales-tax holidays. Business owners should also note that this tool computes tax on a single transaction; it is not a substitute for nexus analysis or filing software when you sell into multiple states.`,
    faqs: [
      {
        question: 'Which states have no sales tax in 2026?',
        answer: 'Five states charge no statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. Note that Alaska allows local jurisdictions to charge their own sales tax, so purchases there are not always tax-free.',
      },
      {
        question: 'Why is the tax on my receipt higher than my state\'s rate?',
        answer: 'Most states allow counties, cities, and special districts to add local sales taxes on top of the state base rate. The combined rate at the register can be 1–3 percentage points higher than the state rate. Use the "Custom rate" option with your exact combined rate for a precise result.',
      },
      {
        question: 'How do I back sales tax out of a total?',
        answer: 'Divide the total by (1 + rate ÷ 100) to get the pre-tax price, then subtract. For a $107.25 receipt at 7.25%: $107.25 ÷ 1.0725 = $100.00 pre-tax, so the tax was $7.25. Do not multiply the total by the rate — that overstates the tax.',
      },
      {
        question: 'Is sales tax deductible on my federal return?',
        answer: 'If you itemize, you can deduct state and local **sales** taxes instead of state and local **income** taxes — whichever is larger — as part of the SALT deduction, subject to the SALT cap. This mainly helps residents of states with no income tax, like Texas, Florida, and Tennessee.',
      },
      {
        question: 'Does this calculator include county or city sales tax?',
        answer: 'No. The state dropdown uses 2026 statewide base rates only. Local taxes vary by ZIP code and can add several percentage points. Select "Custom rate" and enter your combined state + local rate for an exact figure.',
      },
    ],
  },
  'auto-loan-calculator': {
    article: `An auto loan is a fixed-payment amortizing loan: every month you pay the same amount, with the early payments mostly covering interest and the later ones mostly paying down principal. This calculator builds the loan from the deal itself — vehicle price, sales tax, down payment, and trade-in — then computes your payment and a month-by-month amortization schedule.

## How it's calculated

\`\`\`
Loan amount  P = price + price × tax% ÷ 100 − down payment − trade-in
Monthly rate r = APR ÷ 1200,  n = months
Payment      M = P × r × (1 + r)^n ÷ ((1 + r)^n − 1)
Total interest = M × n − P
\`\`\`

For example, financing $30,000 at 6% APR over 60 months gives a payment of $579.98 and about $4,799 of total interest. Stretching the same loan to 84 months drops the payment but raises the lifetime interest cost substantially — that trade-off is the most important number on this page.

**A note on trade-ins and tax:** many states (including Texas, Florida, and most others) only charge sales tax on the price *minus* your trade-in value, which lowers the tax bill. A handful of states — notably California — tax the full price regardless of trade-in. For simplicity, this tool taxes the full vehicle price, so in trade-in-credit states your real tax (and loan amount) may be slightly lower than shown. Set the tax slider to 0 and add tax yourself if you want full control.

Other assumptions and limitations: documentation fees, title, registration, extended warranties, and GAP insurance are excluded — these are often rolled into the loan at the dealership and would raise the financed amount. APR is assumed fixed for the life of the loan, which is standard for US auto loans. The calculator also assumes your down payment and trade-in together don't exceed the price plus tax; if they do, the loan amount floors at $0.

A common affordability rule of thumb is 20/4/10: put at least 20% down, finance for no more than 4 years, and keep total vehicle costs under 10% of gross income.`,
    faqs: [
      {
        question: 'How is a monthly car payment calculated?',
        answer: 'With the standard amortization formula: M = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the amount financed, r is the monthly rate (APR ÷ 1200), and n is the number of months. A $30,000 loan at 6% APR for 60 months works out to $579.98 per month.',
      },
      {
        question: 'Does a trade-in reduce the sales tax on a car?',
        answer: 'In most states, yes — tax is charged on the price minus the trade-in value. A few states, such as California, tax the full price. This calculator taxes the full price as a simplification, so your actual tax may be a bit lower in trade-in-credit states.',
      },
      {
        question: 'Is a 72- or 84-month auto loan a bad idea?',
        answer: 'Longer terms lower the monthly payment but significantly raise total interest and increase the time you spend "underwater" (owing more than the car is worth). If you need 72+ months to afford the payment, consider a cheaper vehicle or a larger down payment.',
      },
      {
        question: 'What is the difference between APR and interest rate?',
        answer: 'The interest rate is the cost of borrowing the principal; APR (annual percentage rate) also folds in certain mandatory financing fees, making it the better number for comparing loan offers. This calculator treats your input as the APR.',
      },
      {
        question: 'What does the amortization table show?',
        answer: 'Each row breaks one monthly payment into its interest portion (balance × monthly rate) and principal portion (the rest), then shows the remaining balance. Early in the loan more of each payment goes to interest; the split shifts toward principal over time.',
      },
    ],
  },
  'student-loan-calculator': {
    article: `Federal student loans on the Standard Repayment Plan amortize over 120 months (10 years), while consolidation and many private loans stretch to 15, 20, or 25 years. This calculator computes the required monthly payment for your balance, rate, and term — then simulates what happens when you add an extra amount to every payment: how many months you shave off, and how much interest you never have to pay.

## How it's calculated

\`\`\`
Monthly rate r = APR ÷ 1200,  n = term in months
Base payment M = P × r × (1 + r)^n ÷ ((1 + r)^n − 1)

With extra:  each month, interest = balance × r
             principal = (M + extra) − interest
             repeat until balance = 0
\`\`\`

For example, a $30,000 balance at 6.5% over 10 years requires $340.64 per month and costs about $10,877 in total interest. The extra-payment scenario is computed by month-by-month simulation rather than a closed-form formula, because the final payment is almost always a partial one.

Why extra payments are so effective: every extra dollar goes straight to principal, and student loan interest accrues daily on the outstanding principal. Shrinking the principal early in the loan eliminates all the future interest that principal would have generated. Federal student loans (and nearly all private ones) have **no prepayment penalty**, but you should tell your servicer in writing to apply overpayments to principal immediately rather than advancing your due date.

Assumptions and limitations: this tool models a single fixed-rate loan with monthly compounding. If you hold several loans at different rates, run them separately — and if you're choosing where to send extra money, the "avalanche" method (highest rate first) minimizes total interest. Income-driven repayment plans (IBR, and the plans that replaced SAVE under the 2025 reconciliation law) set payments from your income rather than amortization, so this calculator doesn't apply to them. Interest that capitalizes after deferment or forbearance should be included in the balance you enter.`,
    faqs: [
      {
        question: 'What is the standard repayment term for federal student loans?',
        answer: 'The federal Standard Repayment Plan is 120 months (10 years). Direct Consolidation Loans can run 10–30 years depending on balance, and private lenders commonly offer 5-, 10-, 15-, and 20-year terms.',
      },
      {
        question: 'How much does an extra $100 per month actually help?',
        answer: 'A lot. On a $30,000 loan at 6.5% over 10 years, paying $100 extra each month pays the loan off in 86 months instead of 120 — nearly 3 years early — and saves about $3,347 of interest. Use the extra-payment slider and watch the "Months to Payoff" and "Interest Saved" outputs update live.',
      },
      {
        question: 'Is there a penalty for paying off student loans early?',
        answer: 'No. Federal student loans never carry prepayment penalties, and essentially all US private student loans are penalty-free too. Just instruct your servicer to apply extra amounts to principal, not to future payments.',
      },
      {
        question: 'Is student loan interest tax deductible?',
        answer: 'Up to $2,500 of student loan interest per year is deductible as an above-the-line deduction (no itemizing required), subject to income phase-outs. Your servicer reports interest paid on Form 1098-E.',
      },
      {
        question: 'Does this calculator work for income-driven repayment plans?',
        answer: 'No. Income-driven plans set your payment as a share of discretionary income rather than amortizing the balance over a fixed term. This calculator models standard fixed-payment repayment, which is how most private loans and the federal Standard Plan work.',
      },
    ],
  },
  'house-affordability-calculator': {
    article: `How much house you can afford depends less on the sticker price and more on the monthly payment your income can support. US lenders typically screen mortgage applications with the **28/36 rule**: housing costs (principal, interest, taxes, insurance — PITI) shouldn't exceed 28% of gross monthly income, and total debt payments — housing plus car loans, student loans, and credit-card minimums — shouldn't exceed 36%. This calculator applies both limits, takes the tighter one, and solves backwards for the home price that fits.

## How it's calculated

\`\`\`
Front-end cap = income/12 × 0.28
Back-end cap  = income/12 × 0.36 − monthly debts
PITI budget   = min(front-end, back-end), floored at 0

Payment factor f = r(1+r)^n ÷ ((1+r)^n − 1),  r = rate/1200
Solve for the loan L in:
  budget = L×f + (L + down) × tax%/1200 + insurance/12 + HOA
  L = (budget − down × tax%/1200 − insurance/12 − HOA) ÷ (f + tax%/1200)
Home price = L + down payment
\`\`\`

Property tax is modeled as a percentage of the full home value (loan plus down payment), which is why the down payment appears inside the algebra — a bigger house means a bigger tax bill, even on the portion you paid cash for. The US average effective property tax rate is roughly 1.1% of home value per year, but it ranges from about 0.3% in Hawaii to over 2% in New Jersey and Illinois.

Assumptions and limitations: the 28/36 rule is a conservative guideline, not a hard limit — conventional loans routinely close at back-end DTIs up to 45%, and FHA loans can go higher, so a lender may approve you for more than this tool shows. Private mortgage insurance (PMI), typically required when the down payment is below 20% of the price, is **not** modeled and would reduce your affordable price somewhat. Closing costs (commonly 2–5% of the loan) and ongoing maintenance are also excluded. Treat the result as a sustainable budget, then get a formal pre-approval before house hunting.`,
    faqs: [
      {
        question: 'What is the 28/36 rule?',
        answer: 'A lending guideline: spend no more than 28% of gross monthly income on housing (PITI), and no more than 36% on all debt payments combined (housing plus car loans, student loans, and card minimums). This calculator uses whichever limit is tighter for you.',
      },
      {
        question: 'How much house can I afford on $90,000 a year?',
        answer: 'With $400/month in other debts, $40,000 down, a 6.5% 30-year mortgage, 1.1% property tax, and $1,800/year insurance, the 28/36 rule supports about a $2,100 monthly PITI payment — roughly a $304,000 home with a $264,000 loan. Adjust the sliders to match your situation.',
      },
      {
        question: 'Does this calculator include PMI?',
        answer: 'No. Private mortgage insurance is typically required when you put down less than 20% and usually costs 0.3%–1.5% of the loan per year. If your down payment is under 20%, expect your true affordable price to be somewhat lower than shown.',
      },
      {
        question: 'Can a lender approve me for more than the 28/36 rule allows?',
        answer: 'Often, yes. Conventional underwriting commonly allows back-end DTIs up to about 45%, and FHA loans can stretch further with compensating factors. But the 28/36 rule is a better guide to what is comfortably sustainable, especially once maintenance and utilities are added.',
      },
      {
        question: 'Why does my down payment raise the affordable price by slightly less than its dollar amount?',
        answer: 'Your monthly budget (the 28%/36% limit) depends only on income and debts, so the down payment does not change it. Every down-payment dollar still adds directly to the price, but property tax on that extra home value eats a small slice of the fixed PITI budget. The net effect is about $0.87 of price per $1 down at the default 6.5% rate and 1.1% property tax, and exactly $1 only when property tax is 0%.',
      },
    ],
  },
  'inflation-calculator': {
    article: `Inflation quietly compounds: at just 3% per year, prices double roughly every 24 years, and a dollar loses half its purchasing power. This calculator converts an amount of money between any two years — from 1950 out to a projected 2076 — using a constant average annual inflation rate that you control. Set the end year *earlier* than the start year and it works in reverse, deflating the amount instead.

## How it's calculated

\`\`\`
years = end year − start year
equivalent value = amount × (1 + rate ÷ 100) ^ years
total change % = (equivalent ÷ amount − 1) × 100
\`\`\`

For example, $100 in 2000 grows to about $215.66 in 2026 dollars at a 3% average rate — a 115.7% total increase across 26 years. Because the exponent can be negative, the same math answers "what was $100 of today's money worth in 1980?" without any extra steps.

**This is a constant-rate model, not a CPI lookup.** Actual US inflation, measured by the Bureau of Labor Statistics CPI-U index, varies year to year: it averaged close to 3.0% from 1950 through the mid-2020s, but ran near 0–2% through the 2010s, spiked above 9% in mid-2022, and then cooled back toward the Federal Reserve's 2% target. For precise historical conversions you'd chain the actual CPI-U index values for each year (a future version of this tool will do exactly that); for planning and intuition, a long-run average of 2.5–3.5% is the standard assumption.

Inflation matters for more than groceries. Salaries, rents, and retirement targets all need an inflation adjustment to compare across decades, and the IRS inflation-adjusts dozens of federal tax figures every year — the 2026 brackets and standard deduction in IRS Rev. Proc. 2025-32 are themselves a CPI-based recalculation. When projecting investments, subtract your assumed inflation rate from nominal returns to think in "real" terms: a 7% return during 3% inflation grows your purchasing power by only about 4% a year.`,
    faqs: [
      {
        question: 'What inflation rate should I use for projections?',
        answer: 'The Federal Reserve targets 2%, while the long-run US average since 1950 is close to 3%. Most financial planners use 2.5%–3% for forward projections. Use a higher rate to stress-test retirement or savings plans.',
      },
      {
        question: 'How fast does inflation halve my purchasing power?',
        answer: 'Use the rule of 72: divide 72 by the inflation rate to get the approximate doubling time for prices. At 3%, prices double (and purchasing power halves) in about 24 years; at 6%, in about 12 years.',
      },
      {
        question: 'Is this based on actual CPI data?',
        answer: 'Not yet — it applies a constant average annual rate that you choose, which is ideal for planning and what-if scenarios. Exact historical conversions require chaining the BLS CPI-U index year by year, which actual yearly inflation rates only approximate on average.',
      },
      {
        question: 'Can I calculate backwards, e.g. what 2026 dollars were worth in 1990?',
        answer: 'Yes. Set the start year to 2026 and the end year to 1990. The years spanned become negative and the formula deflates the amount, showing the smaller historical equivalent.',
      },
      {
        question: 'Why do tax brackets change with inflation?',
        answer: 'The IRS adjusts federal tax brackets, the standard deduction, and dozens of other figures annually using a CPI-based formula to prevent "bracket creep" — for tax year 2026 those adjustments are published in IRS Rev. Proc. 2025-32.',
      },
    ],
  },
};
