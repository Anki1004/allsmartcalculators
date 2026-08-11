import type { CalcInlineContent } from './types';

// Figures in this file were computed from the same functions the calculators
// use (src/lib/india-tax.ts) and checked by hand. If FY_LABEL changes, the
// worked examples here go stale with it — search for "FY 2025-26" before
// shipping a new assessment year.

export const indiaSalaryContent: Record<string, CalcInlineContent> = {
  'in-hand-salary-calculator': {
    article: `The gap between the CTC on your offer letter and the money that lands in your account each month is larger than most people expect, and almost none of it is negotiable once you have signed.

## Where a ₹12 lakh CTC actually goes

Take a ₹12,00,000 CTC with basic set at 40%, working in Karnataka, on the new tax regime.

| | Annual |
|---|---|
| CTC on the offer letter | ₹12,00,000 |
| Less: employer PF contribution | −₹57,600 |
| **Gross salary** | **₹11,42,400** |
| Less: your own PF contribution | −₹57,600 |
| Less: professional tax (Karnataka) | −₹2,400 |
| Less: income tax | −₹0 |
| **Annual in-hand** | **₹10,82,400** |
| **Monthly in-hand** | **₹90,200** |

₹1,17,600 of that CTC never reaches your account in cash — it goes into your EPF, which is your money but locked. The "₹1 lakh a month" job pays ₹90,200.

## The employer PF line is the one people miss

Indian CTC includes the employer's PF contribution, which is 12% of basic. It is genuinely yours, and it compounds at the EPFO rate, but it is not salary. Two offers with identical CTC but different basic percentages produce different take-home: a higher basic means more PF on both sides, which means less cash now and more retirement corpus later.

This is worth checking before you compare offers. A ₹14 lakh CTC at 50% basic and a ₹14 lakh CTC at 30% basic differ by roughly ₹33,600 a year in cash.

## Professional tax depends on where you sit, not where you are paid

Professional tax is a state levy, capped at ₹2,500 a year by Article 276 of the Constitution. Karnataka, Maharashtra, West Bengal, Tamil Nadu, Telangana and several others charge it. **Delhi, Uttar Pradesh, Haryana and Rajasthan do not charge it at all.**

It is a small number, but it is the reason a national "in-hand salary calculator" that ignores your state is wrong for every user — either by ₹2,500 or by nothing, and it cannot tell which.

## The regime choice is where the real money is

Under the new regime, income up to ₹12,75,000 for a salaried person is entirely tax-free, because the ₹75,000 standard deduction brings taxable income to ₹12,00,000 and the Section 87A rebate wipes out the tax on that.

But the new regime allows almost no deductions. No 80C, no 80D, no HRA exemption, no Section 24(b) on a self-occupied home loan. The old regime allows all of them but has higher rates and a much smaller standard deduction.

At a ₹15,00,000 salary the new regime charges ₹97,500. The old regime charges ₹1,95,000 if you claim ₹2,00,000 of deductions — twice as much. You would need to be claiming **₹5,43,750** of deductions before the old regime catches up.

That break-even figure is the whole decision, and most salaried people never compute it. Our [old vs new regime calculator](/finance/old-vs-new-tax-regime-calculator) works it out for your own salary.

## What this calculator assumes

- You are a salaried individual under 60.
- PF is computed on your actual basic, which is what most private employers do. Some restrict it to the ₹15,000 statutory wage ceiling, which raises take-home and lowers your EPF.
- Gratuity, if it appears in your CTC, is not deducted here — it is not paid monthly and you only receive it after five years.
- Variable pay and bonuses are treated as part of CTC rather than modelled separately.

Figures are for FY 2025-26 (AY 2026-27). Slabs, the standard deduction and the 87A rebate all move in the Union Budget — check the year shown on the page before relying on it in April.`,
    faqs: [
      {
        question: 'Why is my in-hand salary so much lower than my CTC?',
        answer: 'Three things sit between them. The employer PF contribution is inside CTC but never reaches you in cash. Your own PF contribution is deducted from gross. Then income tax and state professional tax come off what is left. On a ₹12,00,000 CTC at 40% basic in Karnataka, that is ₹1,17,600 of PF plus ₹2,400 of professional tax, leaving ₹10,82,400 a year — ₹90,200 a month.',
      },
      {
        question: 'Does a higher basic salary mean more or less take-home?',
        answer: 'Less cash now, more retirement corpus. PF is 12% of basic from both you and your employer, so raising basic from 30% to 50% of CTC on a ₹14 lakh package moves roughly ₹33,600 a year out of your bank account and into EPF. It is not lost — it compounds at the EPFO rate and is tax-free after five years of service — but it is not spendable this month.',
      },
      {
        question: 'Which states charge professional tax?',
        answer: 'It is a state levy capped at ₹2,500 a year. Maharashtra, Karnataka, West Bengal, Tamil Nadu, Telangana, Andhra Pradesh, Gujarat, Kerala, Madhya Pradesh, Odisha, Bihar, Assam and Punjab charge it. Delhi, Uttar Pradesh, Haryana and Rajasthan do not. The calculator applies your state’s figure because a national average would be wrong for everyone.',
      },
      {
        question: 'Should I pick the old or the new tax regime?',
        answer: 'Compute your break-even deduction rather than following a rule of thumb. At a ₹15,00,000 salary the new regime charges ₹97,500 and the old regime charges ₹1,95,000 with ₹2,00,000 of deductions — you would need ₹5,43,750 of deductions before the old regime wins. Most salaried people claim nowhere near that, which is why the new regime suits the majority. If you have a large home-loan interest deduction under Section 24(b), run the numbers before assuming.',
      },
      {
        question: 'Is income up to ₹12.75 lakh really tax-free?',
        answer: 'For a salaried person on the new regime, yes. The ₹75,000 standard deduction brings a ₹12,75,000 salary down to ₹12,00,000 of taxable income, and the Section 87A rebate cancels the ₹60,000 of tax that would otherwise apply at that level. One rupee more and the rebate is lost entirely, so the tax jumps sharply just above the threshold.',
      },
      {
        question: 'Does this include gratuity and variable pay?',
        answer: 'Gratuity is not deducted from monthly take-home here — it is not paid monthly, and you are only entitled to it after five years of continuous service. Use the gratuity calculator for that separately. Variable pay and bonuses are treated as part of CTC; if a large share of your package is a performance bonus paid annually, your actual monthly cash will be lower than shown and the bonus month much higher.',
      },
    ],
  },

  'gratuity-calculator': {
    article: `Gratuity is a statutory payment your employer owes you for long service. It is not a bonus and not discretionary — the Payment of Gratuity Act, 1972 makes it a legal entitlement once you have completed five years.

## The formula

    Gratuity = (15 × last drawn basic+DA × completed years) ÷ 26

The 15 represents fifteen days of wages for every completed year. The 26 is the number of working days in a month the Act assumes, treating Sundays as unpaid. Dividing by 26 rather than 30 makes each day worth slightly more, which is deliberate and in your favour.

**Worked example.** Last drawn basic plus DA of ₹50,000 a month, seven years and seven months of service:

    (15 × 50,000 × 8) ÷ 26 = ₹2,30,769

## The six-month rule is worth a full year

Notice that seven years and seven months counted as **eight** years, not seven.

Service beyond six months in the final year rounds up to a complete year. Service of exactly six months or less is dropped. On the example above, that rounding is worth ₹28,846 — leaving at seven years and five months instead of seven years and seven months costs you that much.

If you are resigning close to an anniversary, it is worth checking the date.

## The five-year rule, and its exception

No gratuity is payable before five years of continuous service. Four years and eleven months earns nothing.

Courts have accepted four years and 240 days as qualifying in some cases, on the reasoning that 240 days constitutes a year of continuous service under the Act. This is not universally applied and depends on your establishment and the jurisdiction. Do not plan a resignation around it.

The five-year condition is waived entirely if service ends because of death or disablement.

## Tax: the ₹20 lakh cap is an exemption, not a limit

Gratuity received is exempt from tax up to ₹20,00,000 for non-government employees. Above that, the excess is taxable as salary income.

Two things people get wrong here. First, the cap is a **lifetime** limit across all employers, not per job — if you received ₹8 lakh of exempt gratuity at a previous employer, only ₹12 lakh remains exempt. Second, an employer may pay more than the formula produces; the Act sets a floor, not a ceiling. Anything above the statutory amount is taxable regardless of the cap.

## Who is covered

The Act applies to establishments with ten or more employees. Once covered, an establishment stays covered even if headcount later falls below ten.

If your employer is not covered by the Act, gratuity may still be payable under your contract, but the formula is usually (15 × last drawn salary × years) ÷ 30 rather than ÷ 26, and the exemption calculation differs. Check your appointment letter.`,
    faqs: [
      {
        question: 'What is the gratuity formula in India?',
        answer: 'Gratuity = (15 × last drawn basic + DA × completed years of service) ÷ 26. The 15 is fifteen days of wages per year of service and the 26 is the working days per month the Payment of Gratuity Act assumes. On ₹50,000 basic+DA with 8 counted years, that is (15 × 50,000 × 8) ÷ 26 = ₹2,30,769.',
      },
      {
        question: 'Do 7 years and 7 months count as 7 years or 8?',
        answer: 'Eight. Service of more than six months in the final year rounds up to a full year; six months or less is dropped. On ₹50,000 basic that rounding is worth ₹28,846, so if you are resigning near an anniversary the exact date matters. Seven years and five months would count as seven.',
      },
      {
        question: 'Can I get gratuity before completing 5 years?',
        answer: 'Generally no — five years of continuous service is the statutory condition, and four years and eleven months earns nothing. Courts have accepted four years plus 240 days in some cases on the basis that 240 days constitutes a year of continuous service, but this is not applied uniformly and should not be planned around. The five-year rule is waived entirely if service ends due to death or disablement.',
      },
      {
        question: 'Is gratuity taxable?',
        answer: 'It is exempt up to ₹20,00,000 for non-government employees, and the excess above that is taxed as salary. Two catches: the ₹20 lakh ceiling is a lifetime limit across all employers, not per job — prior exempt gratuity eats into it — and an employer paying more than the statutory formula makes the excess taxable regardless of the cap.',
      },
      {
        question: 'Is gratuity calculated on basic salary or gross salary?',
        answer: 'On last drawn basic plus dearness allowance only. HRA, special allowance, conveyance, bonuses and variable pay are excluded. This is why gratuity on a ₹1,00,000 monthly gross with ₹40,000 basic is calculated on the ₹40,000, not the ₹1,00,000 — a common and expensive misunderstanding when estimating an exit payout.',
      },
      {
        question: 'Which employers have to pay gratuity?',
        answer: 'The Payment of Gratuity Act covers establishments employing ten or more people, and once covered an establishment remains covered even if headcount later drops. If your employer falls outside the Act, gratuity may still be payable under your contract, but the divisor is usually 30 rather than 26 and the exemption is computed differently. Your appointment letter is the place to check.',
      },
    ],
  },

  'hra-exemption-calculator': {
    article: `House Rent Allowance is not automatically tax-free. Section 10(13A) exempts the **least** of three figures, and which one binds decides how much of your HRA you actually keep.

## The three limits

1. The HRA you actually received
2. Rent paid, minus 10% of basic salary
3. 50% of basic if you live in a metro; 40% if you do not

Your exemption is the smallest of the three. Everything above it is added back to taxable salary.

**Worked example.** Basic ₹6,00,000, HRA received ₹3,00,000, rent paid ₹3,60,000, living in Bengaluru.

| Limit | Amount |
|---|---|
| HRA received | ₹3,00,000 |
| Rent − 10% of basic (₹3,60,000 − ₹60,000) | ₹3,00,000 |
| 40% of basic (non-metro) | ₹2,40,000 |

The exemption is **₹2,40,000**, and ₹60,000 of HRA stays taxable — because Bengaluru is not a metro for this purpose.

Move the same person to Delhi and the third limit becomes 50% of basic, or ₹3,00,000. The exemption rises to ₹3,00,000 and nothing is taxable. Same salary, same rent, ₹60,000 difference in taxable income.

## "Metro" means exactly four cities

For Section 10(13A), the metros are **Delhi, Mumbai, Kolkata and Chennai**. That is the complete list.

Bengaluru, Hyderabad, Pune, Ahmedabad and Gurugram are non-metro for HRA purposes, regardless of how expensive they are or what any other law says. This is the single most common error in self-computed HRA, and it consistently overstates the exemption by 10% of basic.

## The rules people trip over

**PAN of the landlord.** If your annual rent exceeds ₹1,00,000, you must report the landlord's PAN to your employer. Without it the exemption is generally disallowed at the TDS stage, and you would have to claim it at filing with the risk of a query.

**Paying rent to a parent works — with conditions.** The arrangement must be genuine: your parent must actually own the property, there should be a rent agreement, the money must be transferred by bank rather than handed over in cash, and your parent must declare the rent as income in their own return. Done properly this is legitimate tax planning. Done as a paper arrangement it is the kind of claim that attracts scrutiny.

**You cannot claim HRA on a property you own and live in.** You can claim both HRA and a home loan deduction if you rent in one city and have a let-out or under-construction property elsewhere, but not for a self-occupied home in the same city you claim rent for.

**No HRA under the new regime.** This is the big one. The new tax regime removes the HRA exemption entirely. If you are on the new regime, this calculator tells you what you are giving up, not what you can claim — run the [old vs new regime comparison](/finance/old-vs-new-tax-regime-calculator) before deciding.

## If you receive no HRA

Section 80GG allows a deduction for rent paid when your salary includes no HRA component — limited to the least of ₹5,000 a month, 25% of total income, or rent minus 10% of total income. It is a far smaller relief, and it too is unavailable under the new regime.`,
    faqs: [
      {
        question: 'How is HRA exemption calculated?',
        answer: 'It is the least of three figures: the HRA you actually received; rent paid minus 10% of basic salary; and 50% of basic if you live in a metro or 40% if you do not. On basic ₹6,00,000, HRA ₹3,00,000 and rent ₹3,60,000 in a non-metro, the three come to ₹3,00,000, ₹3,00,000 and ₹2,40,000 — so ₹2,40,000 is exempt and ₹60,000 stays taxable.',
      },
      {
        question: 'Is Bengaluru a metro for HRA purposes?',
        answer: 'No. For Section 10(13A) the metros are exactly four cities: Delhi, Mumbai, Kolkata and Chennai. Bengaluru, Hyderabad, Pune, Gurugram and Ahmedabad are non-metro, so the third limit is 40% of basic rather than 50%. Treating Bengaluru as a metro is the most common error in self-computed HRA and overstates the exemption by 10% of basic.',
      },
      {
        question: 'Can I claim HRA if I pay rent to my parents?',
        answer: 'Yes, if the arrangement is genuine. Your parent must actually own the property, there should be a rent agreement, rent should move by bank transfer rather than cash, and your parent must declare it as rental income in their own return. Done properly it is legitimate. Done as a paper arrangement with no money actually changing hands, it is the kind of claim that draws a notice.',
      },
      {
        question: 'Do I need my landlord’s PAN?',
        answer: 'If your annual rent exceeds ₹1,00,000, yes — you must report the landlord’s PAN to your employer. Without it, employers generally disallow the exemption when computing TDS, leaving you to claim it at filing and defend it if queried. Ask for the PAN before you sign the lease rather than in March.',
      },
      {
        question: 'Can I claim HRA and a home loan deduction together?',
        answer: 'Yes, in the right circumstances. If you rent in the city you work in and own a property elsewhere that is let out or still under construction, both claims can stand. What you cannot do is claim HRA for rent while also treating a property in the same city as self-occupied. The two claims must describe a situation that is actually possible.',
      },
      {
        question: 'Is HRA exemption available under the new tax regime?',
        answer: 'No. The new regime removes the HRA exemption along with 80C, 80D and most other deductions. For someone paying substantial rent in a metro, the lost HRA exemption is often the single largest reason the old regime still wins — which is exactly what the break-even calculation in the old vs new regime calculator is designed to surface.',
      },
    ],
  },

  'leave-encashment-calculator': {
    article: `Unused earned leave is money. When you resign or retire, most Indian employers pay out the balance — and the arithmetic is simpler than gratuity, with one important difference.

## The formula

    Payout = (last drawn basic + DA ÷ 30) × unused leave days

Note the **30**, not the 26 used for gratuity. Leave encashment is conventionally computed on a calendar-month basis. Assuming the two use the same divisor overstates a leave payout by about 15%, which is a common and disappointing surprise.

**Worked example.** Basic plus DA of ₹60,000 a month with 45 unused leave days:

    (₹60,000 ÷ 30) × 45 = ₹2,000 × 45 = ₹90,000

## What counts as encashable leave

Only **earned leave** or **privilege leave** is normally encashable. Casual leave and sick leave usually lapse at the end of the year and are not paid out.

Most employers also cap accumulation — commonly at 30, 45 or 60 days — and anything above the cap simply disappears each year rather than accruing. If you have been carrying a large balance for years on the assumption it is banked, check the policy; the cap is often lower than people believe.

## Tax treatment

**On retirement or resignation from a non-government employer**, leave encashment is exempt up to a ceiling that was raised substantially in 2023, to ₹25,00,000. Above that it is taxable as salary.

The exemption is computed as the least of several figures — the actual amount received, ten months of average salary, the statutory ceiling, and the cash equivalent of unavailed leave capped at 30 days per completed year of service. The last one catches people out: even with a 60-day balance, the exempt calculation may only recognise 30 days per year served.

**Government employees** receive leave encashment on retirement fully exempt.

**While still employed**, leave encashment is fully taxable as salary. There is no exemption for encashing leave mid-career, only on exit. This is worth knowing before you choose to encash rather than take a break.

## Before you resign

Three things are worth checking in the same week:

1. **Your actual encashable balance**, not your total leave balance. HR can confirm which categories are payable.
2. **Whether the payout uses basic+DA or gross.** Most use basic+DA, which is considerably less.
3. **How it interacts with your notice period.** Some employers let you offset unserved notice against leave balance rather than paying a buyout in cash — often the cheaper route. The [notice period buyout calculator](/finance/notice-period-buyout-calculator) shows what the alternative would cost.`,
    faqs: [
      {
        question: 'How is leave encashment calculated?',
        answer: 'Payout = (last drawn basic + DA ÷ 30) × unused leave days. On ₹60,000 basic+DA with 45 days of unused leave, that is ₹2,000 per day × 45 = ₹90,000. Note the divisor is 30, not the 26 used for gratuity — assuming they are the same overstates a leave payout by roughly 15%.',
      },
      {
        question: 'Is leave encashment taxable?',
        answer: 'On resignation or retirement from a non-government employer it is exempt up to ₹25,00,000, with the exempt amount being the least of several figures including ten months of average salary and 30 days of leave per completed year of service. Government employees are fully exempt on retirement. Encashing leave while still employed is fully taxable with no exemption at all.',
      },
      {
        question: 'Which types of leave can be encashed?',
        answer: 'Normally only earned leave or privilege leave. Casual leave and sick leave typically lapse annually and are not paid out. Most employers also cap how much earned leave can accumulate — often at 30, 45 or 60 days — and anything beyond the cap is lost each year rather than banked, so a long-held balance may be smaller than you think.',
      },
      {
        question: 'Is leave encashment calculated on basic or gross salary?',
        answer: 'Almost always on basic plus dearness allowance, not gross. On a ₹1,50,000 gross with ₹60,000 basic, a 45-day payout is ₹90,000 rather than ₹2,25,000. Check your policy document, because a minority of employers do use gross and the difference is large.',
      },
      {
        question: 'Can I use leave balance instead of paying a notice buyout?',
        answer: 'Many employers allow it — you adjust unserved notice days against your leave balance rather than paying cash. It is usually cheaper than a buyout, because the buyout may be computed on gross while encashment is on basic. Ask HR explicitly; it is often permitted but rarely offered unprompted.',
      },
      {
        question: 'Do I get leave encashment if I am terminated?',
        answer: 'Earned leave already accrued is generally payable regardless of how employment ends, since it represents work already done. The tax exemption on resignation or retirement applies in the same way. Terms can vary with your contract and the reason for termination, so the appointment letter and any settlement agreement are what govern.',
      },
    ],
  },

  'notice-period-buyout-calculator': {
    article: `You have an offer that starts in a month. Your contract says ninety days. The difference is a number, and this works out what it is.

## The arithmetic

    Buyout = (monthly salary ÷ 30) × unserved days

**Worked example.** Monthly salary ₹80,000, ninety-day notice, serving thirty days:

    Unserved days = 90 − 30 = 60
    Buyout = (₹80,000 ÷ 30) × 60 = ₹1,60,000

## Gross or basic — read the contract, not the calculator

This is the variable that changes the answer most, and it is entirely determined by your employment agreement.

Some contracts compute the buyout on **gross monthly salary**. Others compute it on **basic only**. On the example above with basic at 40% of salary, a basic-only clause makes the buyout ₹64,000 instead of ₹1,60,000 — a difference of ₹96,000 on identical facts.

Find the clause before you negotiate anything. It is usually under "Termination" or "Separation" and is frequently one sentence long.

## What to check before you commit

**Whether leave balance can be adjusted.** Many employers allow unserved notice to be offset against accrued earned leave rather than paid in cash. This is often substantially cheaper, since encashment is normally computed on basic while the buyout may be on gross. Ask explicitly — it is commonly permitted but rarely volunteered.

**Whether your new employer will reimburse.** Notice buyout reimbursement is a normal ask in the Indian market, particularly for senior roles and when the employer wants you to join sooner. Raise it during offer negotiation, not after you have resigned — the leverage disappears the moment you accept.

**Whether the buyout is taxable.** A buyout you pay is not deductible from your income. If your new employer reimburses it, that reimbursement is generally treated as taxable salary in your hands. So a ₹1,60,000 reimbursement is worth roughly ₹1,10,000 after tax at the 30% slab — worth factoring into what you ask for.

**Whether the relieving letter is conditional.** Some employers withhold the relieving letter until the buyout is paid. Since most Indian employers require a relieving letter from your previous job before confirming your appointment, this is not a bill you can simply decline to pay.

## Negotiating it down

Notice periods are frequently negotiable in practice even when they look fixed in writing, particularly if you can complete a handover cleanly or if your team has capacity. A well-managed exit with a documented handover often earns a reduced notice period at no cost, which beats any buyout arithmetic.

Ask before you assume the contract is the final word.`,
    faqs: [
      {
        question: 'How is a notice period buyout calculated?',
        answer: 'Buyout = (monthly salary ÷ 30) × unserved days. On ₹80,000 a month with a 90-day notice period where you serve 30 days, the 60 unserved days cost ₹1,60,000. Whether "monthly salary" means gross or basic is set by your contract and changes the answer dramatically.',
      },
      {
        question: 'Is the buyout calculated on gross or basic salary?',
        answer: 'It depends entirely on your employment agreement — both are common. On ₹80,000 monthly with basic at 40%, a gross-based clause gives ₹1,60,000 for 60 days while a basic-only clause gives ₹64,000. The clause is usually under "Termination" or "Separation" and is often a single sentence. Read it before negotiating anything.',
      },
      {
        question: 'Can I use my leave balance instead of paying?',
        answer: 'Many employers permit unserved notice to be adjusted against accrued earned leave. It is frequently cheaper, since leave encashment is usually computed on basic while the buyout may be on gross. It is commonly allowed but rarely offered unprompted, so ask HR directly and get the answer in writing.',
      },
      {
        question: 'Will my new employer pay my notice buyout?',
        answer: 'Reimbursement is a normal ask in the Indian market, especially for senior roles or when the employer wants an early start date. Raise it during offer negotiation — once you have accepted and resigned, the leverage is gone. Note that the reimbursement is generally taxable salary in your hands, so a ₹1,60,000 reimbursement is worth about ₹1,10,000 net at the 30% slab.',
      },
      {
        question: 'Can I just refuse to pay and leave?',
        answer: 'In practice this is difficult, because most employers withhold the relieving letter until dues are settled, and most Indian employers require a relieving letter from your previous job before confirming your appointment. The buyout is therefore usually enforceable through that route rather than through litigation. Negotiating a reduced notice period is a far better strategy than declining to pay.',
      },
      {
        question: 'Is a notice period actually negotiable?',
        answer: 'Often, yes — more often than the contract suggests. A clean, documented handover and a team with capacity to absorb your work give a manager real reasons to agree to a shorter notice at no cost. That outcome beats any buyout arithmetic, so ask before assuming the written period is final.',
      },
    ],
  },

  'old-vs-new-tax-regime-calculator': {
    article: `The regime question has a precise answer for your salary, and it is a single number: how much you would need to be claiming in deductions before the old regime beats the new one.

Below that figure, the new regime wins and nothing else matters. Above it, the old regime does.

## A ₹15 lakh salary, worked through

| | New regime | Old regime (₹2,00,000 deductions) |
|---|---|---|
| Gross salary | ₹15,00,000 | ₹15,00,000 |
| Standard deduction | −₹75,000 | −₹50,000 |
| Other deductions | — | −₹2,00,000 |
| **Taxable income** | **₹14,25,000** | **₹12,50,000** |
| **Tax including cess** | **₹97,500** | **₹1,95,000** |

The old regime charges exactly twice as much, despite taxing ₹1,75,000 less income. Its rates are simply higher: 30% starts at ₹10,00,000 under the old regime and only at ₹24,00,000 under the new one.

**The break-even is ₹5,43,750.** That is how much you would need to be claiming — 80C plus 80D plus HRA plus home loan interest plus everything else combined — before the old regime matches the new one at this salary.

## Why most salaried people fall short of break-even

The pieces available under the old regime, at their realistic maximums:

- **80C** — ₹1,50,000, and it is shared with EPF, home loan principal, children's tuition and life insurance. Often already full without any new investment.
- **80D** — ₹25,000 for your own health cover, ₹50,000 more for senior-citizen parents.
- **Standard deduction** — ₹50,000, but the new regime gives ₹75,000, so this is a net loss of ₹25,000.
- **Section 24(b)** — up to ₹2,00,000 of home loan interest on a self-occupied property. This is the big one.
- **HRA exemption** — no fixed cap; on a large rent in a metro this can be substantial.
- **80CCD(1B)** — ₹50,000 extra for NPS.

Without a home loan or a large metro rent, most people land somewhere between ₹1,50,000 and ₹2,50,000. That is nowhere near ₹5,43,750, which is why the new regime is the better answer for the majority of salaried taxpayers.

## Where the old regime still wins

Add a ₹2,00,000 Section 24(b) home loan interest deduction and a ₹3,00,000 HRA exemption to a full ₹1,50,000 of 80C and you are past ₹6,00,000 — comfortably above break-even. Someone paying a large rent in Delhi or Mumbai while servicing a home loan on a let-out property elsewhere is exactly the profile the old regime still serves.

## The one that survives in the new regime

Almost every deduction disappears under the new regime, with one important exception: **Section 80CCD(2)**, the deduction for your *employer's* contribution to your NPS, remains available.

If your employer offers NPS as part of the salary structure, restructuring some CTC into an employer NPS contribution gives you a deduction that works on the new regime, where nothing else does. It is one of very few remaining levers and is widely underused.

## Practical notes

You may switch regimes each year if you have only salary income. If you have business or professional income, the choice is far more restricted — you can generally move out of the new regime only once.

Figures here are for FY 2025-26 (AY 2026-27). Slabs, the standard deduction and the 87A rebate all move in the Union Budget, so re-run this after each February before locking in a declaration.`,
    faqs: [
      {
        question: 'How do I decide between the old and new tax regime?',
        answer: 'Find your break-even deduction — the total deductions at which the two regimes charge identical tax. At a ₹15,00,000 salary that figure is ₹5,43,750. If your realistic 80C, 80D, HRA and home-loan claims add up to less than that, the new regime wins and no amount of tax planning under the old regime will change it.',
      },
      {
        question: 'Why is the old regime worse even though it allows more deductions?',
        answer: 'Because its rates are much higher and its standard deduction is smaller. The old regime hits 30% at ₹10,00,000 of taxable income; the new regime only at ₹24,00,000. It also gives ₹50,000 of standard deduction against the new regime’s ₹75,000. At ₹15,00,000 the old regime charges ₹1,95,000 with ₹2,00,000 of deductions, against ₹97,500 under the new one — twice as much despite taxing less income.',
      },
      {
        question: 'Which deductions do I lose under the new regime?',
        answer: '80C, 80D, HRA exemption, Section 24(b) home loan interest on a self-occupied property, 80CCD(1B), 80G, LTA and most other exemptions. What you keep is the ₹75,000 standard deduction, the ₹60,000 Section 87A rebate up to ₹12,00,000 of taxable income, and Section 80CCD(2) for your employer’s NPS contribution.',
      },
      {
        question: 'Is there any deduction that still works in the new regime?',
        answer: 'Section 80CCD(2) — your employer’s contribution to your NPS, up to 14% of salary under the new regime. If your employer offers NPS in the salary structure, moving part of your CTC into it produces a deduction that survives where nothing else does. It is one of the few remaining tax-planning levers for a new-regime salaried taxpayer and is widely underused.',
      },
      {
        question: 'Can I switch between regimes every year?',
        answer: 'If your income is only from salary, yes — you may choose afresh each assessment year, and you can even pick a different regime at filing from the one you declared to your employer. If you have business or professional income, the choice is far more restricted: you can generally opt out of the new regime only once, and returning to it closes the door again.',
      },
      {
        question: 'Who should still choose the old regime?',
        answer: 'Someone whose deductions genuinely clear the break-even. The realistic profile is a taxpayer with a full ₹1,50,000 of 80C, a ₹2,00,000 Section 24(b) home loan interest claim, and a large HRA exemption from renting in Delhi, Mumbai, Kolkata or Chennai. Those three together comfortably exceed ₹5,00,000. Without a home loan or a substantial metro rent, it is very hard to get there.',
      },
    ],
  },
};
