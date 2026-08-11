import type { CalcInlineContent } from './types';

// Every rupee figure below was produced by the same calculate() the page runs
// and checked by hand before being written into the prose.

export const indiaPropertyContent: Record<string, CalcInlineContent> = {
  'loan-against-property-calculator': {
    article: `A loan against property lets you borrow against something you already own, at roughly half the rate an unsecured personal loan costs. The trade is that the lender can take the property if you default.

## What the numbers look like

On a property valued at ₹1,00,00,000 with a 60% loan-to-value at 9.5% over 15 years:

| | |
|---|---|
| Loan you can raise | ₹60,00,000 |
| Monthly EMI | ₹62,653 |
| Total interest over 15 years | ₹52,77,627 |
| Processing fee at 1% | ₹60,000 |
| **Total cost of borrowing** | **₹53,37,627** |

Read that interest figure carefully. Over fifteen years you repay ₹1.13 crore on a ₹60 lakh loan. The rate looks reasonable; the tenure is what makes it expensive.

## Loan to value is the lender's number, not yours

Lenders typically advance 50–70% of *their* valuation, not of what you believe the property is worth or what the neighbour's flat sold for. A property you value at ₹1 crore may be assessed at ₹80 lakh, and 60% of that is ₹48 lakh rather than the ₹60 lakh you planned around.

LTV also varies by property type. Self-occupied residential usually attracts the highest ratio, commercial less, and land or under-construction property least of all — some lenders will not accept land at all.

## Where LAP sits against the alternatives

- **Top-up on an existing home loan** — around 0.25–1% above your current home loan rate. Cheapest of the three, minimal paperwork, no fresh valuation. Capped at the original sanction limit less your outstanding, so it will not fund a large requirement.
- **Loan against property** — roughly 9–12%, tenure to 15 years, end use almost unrestricted.
- **Personal loan** — roughly 11–18%, tenure capped near 5–7 years, no security.

Always check the top-up first. For ₹5–15 lakh it is nearly always cheaper and faster.

## Tenure is the lever that matters most

Stretching the tenure lowers the EMI and raises the total cost, and the effect is not small. On the ₹60 lakh loan above, moving from 10 years to 20 cuts the EMI from about ₹77,650 to ₹55,930 — but total interest rises from roughly ₹33.2 lakh to ₹74.2 lakh.

Borrow over the shortest tenure whose EMI you can comfortably service, and prepay when you can. Floating-rate LAP to an individual generally carries no prepayment penalty, though fixed-rate loans and loans to firms often do — read the sanction letter rather than relying on the branch.

## Before you sign

**Clear title is non-negotiable.** Disputed ownership, missing chain documents, unapproved construction or ancestral property with several heirs will stop the application, and sorting it out takes months.

**Expect six to eight weeks.** Legal verification, technical valuation and a personal discussion. LAP is not a solution to an urgent cash need.

**The interest is only deductible depending on end use** — as a business expense if used for business, or under Section 24(b) if used to buy or build residential property. Used for a wedding or a holiday, there is no deduction at all.`,
    faqs: [
      { question: 'How much can I borrow against my property?', answer: 'Typically 50–70% of the lender’s own valuation, not of what you think the property is worth. On a ₹1 crore valuation at 60% LTV, that is ₹60,00,000. The ratio depends on property type — self-occupied residential attracts the highest LTV, commercial less, and land or under-construction property least, with some lenders refusing land entirely.' },
      { question: 'What is the interest rate on a loan against property?', answer: 'Roughly 9–12% in the Indian market, well below the 11–18% typical of unsecured personal loans, because the lender holds your property as security. At 9.5% over 15 years, a ₹60,00,000 LAP costs ₹62,653 a month and ₹52.8 lakh in total interest.' },
      { question: 'Is a LAP cheaper than a top-up on my home loan?', answer: 'No — a top-up is usually cheaper, at around 0.25–1% above your existing home loan rate, with minimal paperwork and no fresh valuation. Its limitation is size: it is capped at your original sanction limit less the outstanding. Check the top-up first; for ₹5–15 lakh it almost always wins.' },
      { question: 'Is loan against property interest tax deductible?', answer: 'Only depending on what you spend it on. Used for business, the interest is deductible as a business expense under Section 37. Used to buy or construct residential property, it may be claimed under Section 24(b). Used for personal purposes — a wedding, a holiday, consolidating card debt — there is no deduction at all, which is the most common use case.' },
      { question: 'How long does a LAP take to process?', answer: 'Six to eight weeks is normal. The lender must verify legal title, commission a technical valuation and usually conduct a personal discussion. This makes LAP unsuitable for an urgent cash requirement — start the process well before you need the money.' },
      { question: 'Can I prepay a loan against property without penalty?', answer: 'On a floating-rate loan to an individual, generally yes. Fixed-rate loans and loans to companies or firms commonly carry a foreclosure charge of 2–4% of the outstanding. Since a 15-year LAP accrues enormous interest, prepayment is where most of the saving is — check the sanction letter for the exact terms before assuming it is free.' },
    ],
  },

  'home-loan-balance-transfer-calculator': {
    article: `Switching your home loan to a cheaper lender is worth doing when the rate gap is real and the remaining tenure is long. Below a certain gap it is paperwork for nothing, and the way to tell is payback period, not the headline saving.

## The payback test

On a ₹30,00,000 outstanding balance with 15 years left and a 0.5% switching cost of ₹15,000:

| Rate cut | EMI falls by | Fee recovered in | Net saving |
|---|---|---|---|
| 0.10% | ₹181 | 83 months | ₹17,539 |
| 0.25% | ₹451 | 33 months | ₹66,175 |
| 0.50% | ₹899 | 17 months | ₹1,46,774 |
| 1.00% | ₹1,785 | 8 months | ₹3,06,220 |
| 1.50% | ₹2,657 | 6 months | ₹4,63,292 |

A 0.5% cut recovers the fee in seventeen months and saves ₹1.47 lakh — clearly worth doing. A 0.1% cut takes nearly seven years to recover a ₹15,000 fee, which is not.

## Ask your existing lender first

This is the step most borrowers skip, and it is free. Lenders routinely offer a **rate conversion** — reducing your rate to the one they are advertising to new customers — for a small fee, often a fraction of a percent of the outstanding.

Older loans drift above the current card rate over time, so there is often a gap to close without changing lender at all. Call, ask what conversion would cost, and only start a balance transfer if the answer is unsatisfactory. Mentioning that you have an offer from another lender tends to help.

## Remaining tenure matters more than the rate

A balance transfer saves interest on the years still to run. With eighteen years left, a 0.5% cut is worth a great deal. With four years left, most of your interest has already been paid and the same cut saves comparatively little while costing the same fee.

As a rough guide, a transfer is rarely worth the effort with fewer than five years remaining, however attractive the new rate looks.

## What "switching cost" actually includes

The processing fee is the visible part. Budget also for:

- **Legal and technical valuation charges** at the new lender
- **Stamp duty** on the fresh loan agreement in some states
- **MOD charges** — memorandum of deposit of title deeds, re-registered with the new lender
- **Foreclosure formalities** at the old lender, plus the time to collect your original documents

Half a percent of the outstanding is a reasonable working estimate for a home loan; get the new lender's written breakdown before committing.

## Watch the tenure reset

The trap in a balance transfer is that the new lender may offer a fresh twenty-year tenure, which lowers the EMI attractively and quietly puts you back at the start of the amortisation curve. You end up paying more interest overall despite the lower rate.

Insist on keeping the **remaining** tenure rather than accepting a new full-length one. The calculator above assumes you do; if you accept a reset, the saving shown does not apply.`,
    faqs: [
      { question: 'How much rate difference makes a balance transfer worth it?', answer: 'Judge it by payback period rather than a fixed threshold. On a ₹30,00,000 balance with 15 years left and a ₹15,000 switching cost, a 0.5% cut recovers the fee in 17 months and saves ₹1.47 lakh — clearly worth it. A 0.1% cut takes 83 months to recover the same fee, which is not. Anything recovering the cost inside two years is a straightforward yes.' },
      { question: 'Should I ask my current lender before switching?', answer: 'Always, and it costs nothing. Most lenders offer a rate conversion that brings your rate down to the one they advertise to new customers, for a small fee — often far cheaper than a full transfer. Older loans drift above the current card rate over time, so there is frequently a gap to close without changing lender at all. Mentioning a competing offer tends to help.' },
      { question: 'What are the real costs of a home loan balance transfer?', answer: 'The processing fee is only part of it. Add legal and technical valuation charges at the new lender, stamp duty on the fresh loan agreement in some states, MOD charges for re-registering the deposit of title deeds, and the time cost of foreclosure formalities and document collection at the old lender. Around 0.5% of the outstanding is a reasonable working estimate.' },
      { question: 'Is a balance transfer worth it near the end of my loan?', answer: 'Usually not. A transfer saves interest only on the years still to run, and by the final years most of your interest has already been paid while the fee stays the same. With fewer than about five years remaining it is rarely worth the effort, however attractive the new rate looks.' },
      { question: 'Will my tenure reset when I transfer?', answer: 'It can, and this is the trap. New lenders often offer a fresh full-length tenure, which lowers the EMI attractively and puts you back at the start of the amortisation curve — where almost every rupee is interest. Insist on retaining the remaining tenure. The savings in this calculator assume you do; accept a reset and they do not apply.' },
      { question: 'Does a balance transfer affect my CIBIL score?', answer: 'Mildly and briefly. The new lender runs a hard enquiry, and closing the old account slightly shortens your average account age. Both effects are small and fade within months, and a well-serviced new loan is a positive record. The old account should be reported as "closed", not "settled" — check your report afterwards, because "settled" implies you paid less than you owed and does real damage.' },
    ],
  },

  'home-loan-tax-benefit-calculator': {
    article: `A home loan's headline rate is not what it costs you if you are claiming the deductions. Under the old regime, tax relief can knock well over a percentage point off the effective rate — and under the new regime it knocks off nothing at all.

## Year one on a ₹40 lakh loan

₹40,00,000 at 8.75% over 20 years, taxpayer at the 30% slab, old regime:

| | |
|---|---|
| Interest paid in year 1 | ₹3,46,952 |
| Principal repaid in year 1 | ₹77,230 |
| Claimable under Section 24(b) — capped at ₹2,00,000 | ₹2,00,000 |
| Claimable under 80C — the principal | ₹77,230 |
| **Tax saved this year** | **₹83,169** |
| **Effective interest rate after tax** | **7.24%** |

The same loan on the new regime saves **₹0**, and the effective rate stays 8.75%.

## Two separate deductions, two separate caps

**Section 24(b)** covers the interest, capped at ₹2,00,000 a year for a self-occupied property. Notice that year-one interest of ₹3,46,952 is well above the cap — so a large loan hits the ceiling immediately and the extra interest earns no relief.

**Section 80C** covers the principal, within the shared ₹1,50,000 limit. Shared is the operative word: EPF, ELSS, life insurance premiums, children's tuition fees and PPF all compete for the same ₹1,50,000. If your EPF alone is ₹1,20,000, only ₹30,000 of home loan principal actually earns anything.

## The deduction shrinks every year

Early EMIs are almost entirely interest, so the Section 24(b) benefit is at its maximum in the first years and falls away later — while the 80C principal component rises. On a ₹40 lakh loan the interest crosses below the ₹2,00,000 cap somewhere in the second decade, and the tax benefit declines from there.

This matters for the prepay-or-invest decision. The tax argument for keeping the loan is strongest at the start and weakest at the end, which is the opposite of most people's intuition.

## Let-out property works differently

The ₹2,00,000 cap applies to a **self-occupied** property. For a let-out property, the full interest is deductible against rental income — but the net loss you can set off against other heads of income is restricted to ₹2,00,000 a year, with the balance carried forward for up to eight years.

## The new regime removes all of it

No Section 24(b) on a self-occupied property, no 80C. If you are on the new regime, your home loan costs exactly its stated rate.

This is worth running properly rather than assuming. For someone with a large home loan and a substantial HRA claim, the deductions can be enough to push the old regime past its break-even — see the [old vs new regime calculator](/finance/old-vs-new-tax-regime-calculator), which computes the exact deduction figure at which the two are equal.`,
    faqs: [
      { question: 'How much tax does a home loan actually save?', answer: 'On a ₹40,00,000 loan at 8.75% over 20 years for a 30%-slab taxpayer on the old regime, year one saves ₹83,169 — from ₹2,00,000 of interest under Section 24(b) plus ₹77,230 of principal under 80C. That brings the effective interest rate down from 8.75% to about 7.24%. On the new regime the saving is zero.' },
      { question: 'What is the limit on home loan interest deduction?', answer: '₹2,00,000 a year under Section 24(b) for a self-occupied property. On a ₹40 lakh loan, first-year interest is around ₹3,46,952 — comfortably above the cap — so a large loan hits the ceiling immediately and the excess interest earns no relief at all.' },
      { question: 'Does the principal repayment count under 80C?', answer: 'Yes, but within the shared ₹1,50,000 limit, and "shared" is the point. EPF, ELSS, PPF, life insurance premiums and children’s tuition fees all draw on the same ₹1,50,000. If your EPF contribution alone is ₹1,20,000, only ₹30,000 of home loan principal actually produces any additional benefit.' },
      { question: 'Why does my home loan tax benefit fall every year?', answer: 'Because early EMIs are almost entirely interest and later ones almost entirely principal. The Section 24(b) benefit is at its maximum in the first years and declines once annual interest drops below the ₹2,00,000 cap — somewhere in the second decade on a ₹40 lakh loan. The tax case for keeping the loan is therefore strongest at the start, not the end.' },
      { question: 'Are the rules different for a rented-out property?', answer: 'Yes. The ₹2,00,000 cap applies to a self-occupied property. For a let-out property the entire interest is deductible against rental income, but the net loss you can set off against other income heads is limited to ₹2,00,000 a year, with the remainder carried forward for up to eight years.' },
      { question: 'Do home loan deductions work in the new tax regime?', answer: 'No. Neither Section 24(b) on a self-occupied property nor 80C survives the new regime, so your loan costs exactly its stated rate. For someone with a large loan and a substantial HRA claim, those lost deductions are often the main reason the old regime still wins — worth computing rather than assuming.' },
    ],
  },

  'rent-vs-buy-calculator': {
    article: `"Rent is money down the drain" is the most repeated and least examined claim in Indian personal finance. The honest test is not whether you own something at the end — it is which choice leaves you with more money.

## The comparison that actually works

Both sides must be measured the same way: **net worth after N years.**

- **If you buy**, your net worth is the property's value minus what you still owe.
- **If you rent**, your net worth is what your invested money grew to — the down payment you never spent, plus every month's difference between the EMI and the rent.

Anything less than this is not a comparison. Counting the house but ignoring what the down payment would have earned stacks the deck; counting rent as "wasted" while ignoring interest paid stacks it the other way.

## A worked case

An ₹80,00,000 flat, 20% down, 8.75% over 20 years. A similar flat rents for ₹25,000 a month. Assume 5% property appreciation, 7% annual rent increases, and 12% on invested money. After **10 years**:

| | |
|---|---|
| EMI | ₹56,557 |
| Property value at year 10 | ₹1,30,31,157 |
| Net worth if you buy (value − outstanding) | **₹85,18,355** |
| Net worth if you rent and invest | **₹1,09,07,784** |

Renting and investing is ahead by roughly **₹23.9 lakh**.

The reason is the rent-to-price ratio. ₹25,000 a month on an ₹80 lakh flat is a gross yield of 3.75% — typical for Indian metros and very low by global standards. The buyer is paying 8.75% to hold an asset appreciating at 5%, while the renter pays 3.75% of the asset's value annually and invests the rest at 12%.

## Change the assumptions and the answer flips

This result is not a law of nature. It is sensitive to four numbers:

- **Property appreciation.** At 9% instead of 5%, buying wins comfortably.
- **Investment return.** At 8% instead of 12%, buying wins.
- **Rent-to-price ratio.** In a city where the same flat rents for ₹45,000, buying wins.
- **How long you stay.** The buyer's transaction costs — stamp duty, registration, brokerage — are paid up front and amortise over time. Under five years, buying almost never wins.

Run your own numbers. Anyone quoting a universal answer is selling something.

## What this model leaves out

Deliberately, so you can add them yourself:

- **Stamp duty, registration and brokerage** — commonly 6–8% of the price, paid on day one, and a real cost to the buyer that this model ignores.
- **Maintenance and property tax** — society charges, repairs and municipal tax, typically 0.5–1% of value a year, also on the buyer.
- **Home loan tax benefits**, which reduce the buyer's effective rate under the old regime.
- **Rental insecurity** — being asked to move, deposits, and the cost and disruption of shifting.

The first two favour renting and the third favours buying, so they partly offset. The fourth is not financial and is often the actual reason people buy, which is a perfectly good reason as long as it is named honestly rather than dressed up as an investment case.`,
    faqs: [
      { question: 'Is renting really cheaper than buying in India?', answer: 'Often, on the numbers, in metro cities. On an ₹80,00,000 flat with 20% down at 8.75%, against ₹25,000 rent, 5% appreciation and 12% investment returns, renting and investing the difference is about ₹23.9 lakh ahead after 10 years. The driver is the rent-to-price ratio: ₹25,000 on ₹80 lakh is a 3.75% gross yield, so the buyer pays 8.75% to hold an asset appreciating at 5%.' },
      { question: 'What is the right way to compare renting and buying?', answer: 'Compare net worth after N years, measured the same way on both sides. The buyer’s net worth is property value minus outstanding loan. The renter’s is the invested down payment plus every month’s difference between EMI and rent, compounded. Counting the house but ignoring what the down payment would have earned is not a comparison.' },
      { question: 'When does buying win?', answer: 'When property appreciation is high (9% rather than 5% flips it), when investment returns are modest (8% rather than 12% flips it), when the rent-to-price ratio is high — a city where the same flat rents for ₹45,000 rather than ₹25,000 — and when you stay long enough to amortise the upfront costs. Under five years, buying almost never wins.' },
      { question: 'Does this include stamp duty and maintenance?', answer: 'No, deliberately. Stamp duty, registration and brokerage typically total 6–8% of the price and are paid on day one; maintenance and property tax run about 0.5–1% of value a year. Both fall on the buyer and both make the buying case worse than shown. Home loan tax benefits under the old regime push the other way and partly offset them.' },
      { question: 'What return should I assume on invested money?', answer: '12% is a common assumption for Indian equity over long horizons and is broadly consistent with long-run Nifty total returns, but it is an assumption rather than a promise. Run the comparison at 10% and 8% as well. If renting only wins at 12%, the case is weaker than it looks — and the same discipline applies to the property appreciation figure.' },
      { question: 'Should I buy for reasons other than money?', answer: 'Yes, and it is a perfectly good reason — security of tenure, not being asked to move, freedom to renovate, and being close to family matter to most people and do not appear in any spreadsheet. The honest approach is to name that as the reason rather than dressing it up as an investment case. Knowing you are paying a premium for stability is different from believing you are making money.' },
    ],
  },

  'percentile-to-rank-calculator': {
    article: `Percentile is not percentage, and the confusion costs students real anxiety every results season.

A **percentage** is your marks out of 100. A **percentile** is the share of candidates who scored at or below you. Scoring 98.5 percentile does not mean you got 98.5% of the marks — it means 98.5% of the candidates who sat the exam scored no better than you did.

## The conversion

    Rank ≈ (100 − percentile) ÷ 100 × total candidates

With 12,00,000 candidates and a 98.5 percentile:

    (100 − 98.5) ÷ 100 × 12,00,000 = 18,000

You are roughly 18,000th, and about 11,82,000 candidates are below you.

## Why small percentile differences matter enormously at the top

| Percentile | Rank out of 12,00,000 |
|---|---|
| 99.9 | 1,200 |
| 99.5 | 6,000 |
| 99.0 | 12,000 |
| 98.0 | 24,000 |
| 95.0 | 60,000 |
| 90.0 | 1,20,000 |

The gap between 99.9 and 99.0 is nine-tenths of a percentile — and 10,800 rank positions. This is why aspirants chase decimal places that look trivial written down.

It also explains why JEE Main percentiles are published to seven decimal places. At the top of a twelve-lakh field, the fourth decimal separates individual candidates.

## Where this estimate is approximate

**Normalisation across sessions.** JEE Main runs in multiple sessions with different question papers, and raw scores are normalised into percentiles per session. Your final rank is computed from the best of your session percentiles, not from a single raw score.

**Category ranks are separate.** The formula gives an approximate All India Rank in the open field. Category ranks (OBC-NCL, SC, ST, EWS, PwD) are computed within each category's own pool and will be numerically much better than your AIR.

**Ties.** Where candidates share a percentile, tie-breaking rules — subject-wise scores, then age in some exams — decide the ordering, so your actual rank can differ slightly.

**The candidate count is the input you are most likely to get wrong.** Use the number who actually *appeared*, not the number who registered. The gap is routinely 5–10%, and using registrations inflates your estimated rank.

## Which exams this works for

Any percentile-based exam where you know the field size: JEE Main, CAT, CUET, CMAT, MAT, and most state CETs. It does not apply to NEET, which publishes marks and ranks directly rather than percentiles, or to exams with sectional cut-offs where the composite percentile does not map cleanly onto a single rank.`,
    faqs: [
      { question: 'How do I convert percentile to rank?', answer: 'Rank ≈ (100 − percentile) ÷ 100 × total candidates who appeared. At 98.5 percentile in a field of 12,00,000, that is (1.5 ÷ 100) × 12,00,000 = 18,000. The figure is an estimate, because normalisation across sessions and tie-breaking rules shift individual ranks slightly.' },
      { question: 'Is percentile the same as percentage?', answer: 'No, and this is the most common misunderstanding. Percentage is your marks out of 100. Percentile is the share of candidates who scored at or below you. A 98.5 percentile means 98.5% of candidates did no better than you — your actual marks might be 60% or 90%, depending on how hard the paper was.' },
      { question: 'Why do small percentile differences change my rank so much?', answer: 'Because the field is enormous. In 12,00,000 candidates, 99.9 percentile is rank 1,200 and 99.0 percentile is rank 12,000 — nine-tenths of a percentile separating 10,800 positions. This is why JEE Main publishes percentiles to seven decimal places: at the top of the distribution, the fourth decimal separates individual candidates.' },
      { question: 'Does this give my category rank?', answer: 'No — it estimates the All India Rank in the open field. Category ranks for OBC-NCL, SC, ST, EWS and PwD candidates are computed within each category’s own pool and are numerically much better than the corresponding AIR. To estimate a category rank you would need the number of candidates in that category, not the overall total.' },
      { question: 'Should I use registered or appeared candidates?', answer: 'Appeared, always. The gap between registrations and actual attendance is routinely 5–10%, and using the registration figure inflates your estimated rank by roughly that much. Exam authorities publish the appeared count with the results; use that number.' },
      { question: 'Does this work for NEET?', answer: 'No. NEET publishes marks and All India Ranks directly rather than percentiles, so there is nothing to convert. This calculator applies to percentile-based exams where you know the field size — JEE Main, CAT, CUET, CMAT, MAT and most state CETs.' },
    ],
  },

  'sgpa-calculator': {
    article: `SGPA is a **credit-weighted** average, not a simple one. Every Indian university computes it that way, and averaging your grade points without weighting them produces a number your university never issued.

## The formula

    SGPA = Σ (grade points × credits) ÷ Σ credits

A five-subject semester:

| Subject | Grade points | Credits | Points × credits |
|---|---|---|---|
| 1 | 9 | 4 | 36 |
| 2 | 8 | 4 | 32 |
| 3 | 7 | 3 | 21 |
| 4 | 9 | 3 | 27 |
| 5 | 8 | 2 | 16 |
| **Total** | | **16** | **132** |

    SGPA = 132 ÷ 16 = 8.25

The simple average of those grade points is 8.20. Close here, but the gap widens whenever your strongest and weakest subjects carry different credit loads.

## Why the weighting matters more than it looks

Credits represent teaching hours and workload. A four-credit core paper counts twice as much as a two-credit lab.

The practical consequence: a poor grade in a high-credit core subject damages your SGPA far more than the same grade in a low-credit elective. If you have limited revision time, the credits column tells you where to spend it — and it is the column students most often ignore.

Conversely, a strong grade in a two-credit elective moves your SGPA very little. Choosing an easy elective to lift your average is a strategy that mostly does not work.

## SGPA, CGPA and percentage

- **SGPA** — one semester, credit-weighted.
- **CGPA** — all semesters together, weighted by each semester's total credits.

CGPA is **not** the plain average of your SGPAs unless every semester carried identical credits. Semesters with heavier credit loads pull the CGPA more, which is why a strong final-year semester with a project may lift your CGPA more than you expect.

Converting the CGPA to a percentage is a separate step, and the rule differs by university — VTU deducts 0.75, Anna University multiplies by 10 with no deduction, CBSE uses 9.5. Use your own university's page rather than a generic formula.

## Grade point scales are not universal

Most Indian universities use a 10-point scale where O or A+ is 10, but the letters and their mark bands differ. Some use a 4-point scale for international comparability, particularly at postgraduate level.

Enter the grade points from your own marksheet rather than converting from marks yourself. The marksheet is what the university computed, and it accounts for internal assessment weightings and moderation that raw marks do not show.

## Backlogs

A failed subject usually enters with zero grade points but its credits still count, which drags the SGPA down hard — a four-credit failure in a sixteen-credit semester costs you two full grade points. Once cleared, most universities recompute using the new grade, though some record the original attempt separately. Check your own regulation; the treatment varies.`,
    faqs: [
      { question: 'How is SGPA calculated?', answer: 'SGPA = the sum of (grade points × credits) for every subject, divided by the total credits. For subjects scoring 9, 8, 7, 9 and 8 with credits 4, 4, 3, 3 and 2, that is 132 ÷ 16 = 8.25. The simple average of those grade points is 8.20 — close here, but the gap widens when your best and worst subjects carry different credit loads.' },
      { question: 'What is the difference between SGPA and CGPA?', answer: 'SGPA covers one semester; CGPA covers all semesters together, weighted by each semester’s total credits. CGPA is not the plain average of your SGPAs unless every semester carried identical credits — semesters with heavier credit loads pull the CGPA more, which is why a strong final-year project semester can lift it more than expected.' },
      { question: 'Why do credits matter so much?', answer: 'Credits represent teaching hours and workload, so a four-credit core paper counts twice as much as a two-credit lab. A poor grade in a high-credit core subject damages your SGPA far more than the same grade in a low-credit elective — and a strong grade in a two-credit elective barely moves it. If revision time is limited, the credits column tells you where to spend it.' },
      { question: 'How do I convert SGPA to percentage?', answer: 'Compute your CGPA first, then apply your university’s own conversion rule — they differ substantially. VTU, AKTU and JNTU deduct 0.75 before multiplying by 10; Osmania and GTU deduct 0.5; Anna University multiplies by 10 with no deduction; CBSE uses 9.5. Applying a formula from another university understates or overstates your result by several points.' },
      { question: 'How does a backlog affect my SGPA?', answer: 'A failed subject normally enters with zero grade points while its credits still count, which drags the SGPA down sharply — a four-credit failure in a sixteen-credit semester costs two full grade points. Most universities recompute once the paper is cleared, using the new grade, but some record the original attempt separately. The treatment varies, so check your own regulation.' },
      { question: 'Should I enter marks or grade points?', answer: 'Grade points, taken directly from your marksheet. Converting marks to grade points yourself misses internal assessment weightings and any moderation the university applied, so the figure you derive will not match the one it issued. The marksheet is the authoritative record.' },
    ],
  },
};
