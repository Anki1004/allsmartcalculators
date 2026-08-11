import type { CalcInlineContent } from './types';

export const financeLongtailContent: Record<string, CalcInlineContent> = {
  'emi-prepayment-calculator': {
    article: `A regular EMI calculator answers one question: what will I pay every month? This one answers the question that actually saves money — what happens if I pay a bit more than I have to?

The answer is usually larger than people expect, and the reason is that every extra rupee goes straight to principal. Your EMI is fixed by the bank; the interest portion of it is calculated on whatever you still owe. Knock the balance down early and every future month's interest is computed on a smaller number. The saving compounds for the rest of the loan.

## A number worth holding on to

Take a ₹25,00,000 home loan at 8.75% for 20 years. The EMI is about ₹22,093, and across 240 months you would repay roughly ₹53.0 lakh — about ₹28.0 lakh of it pure interest.

Now pay ₹5,000 extra every month. Nothing else changes: same rate, same bank, same loan. The loan closes in **12 years and 10 months** instead of 20, and total interest drops to roughly ₹16.7 lakh. That single ₹5,000 habit saves about **₹11.4 lakh** in interest and buys back more than seven years of your life without the loan.

Look at it as total money leaving your account. Without prepayment you repay ₹53.0 lakh. With it you repay ₹41.7 lakh. The extra ₹5,000 a month adds up to ₹7.7 lakh over those 154 months — and it still leaves you ₹11.4 lakh ahead, because every rupee of it stopped interest from accruing for the rest of the loan.

| Extra paid monthly | Loan closes in | Total interest | Interest saved |
|---|---|---|---|
| Nothing | 20 years | ₹28.0 lakh | — |
| ₹2,000 | 16 yrs 3 mo | ₹21.9 lakh | ₹6.2 lakh |
| ₹5,000 | 12 yrs 10 mo | ₹16.7 lakh | ₹11.4 lakh |
| ₹10,000 | 9 yrs 8 mo | ₹12.1 lakh | ₹15.9 lakh |
| ₹25,000 | 5 yrs 8 mo | ₹6.7 lakh | ₹21.3 lakh |

## Reduce the EMI or reduce the tenure?

When you make a part-prepayment, most Indian banks ask which you want. It is not a small question.

- **Reduce tenure** keeps the EMI the same and ends the loan sooner. This saves dramatically more interest, because the interest you skip is the interest from the *last* years of the loan.
- **Reduce EMI** keeps the tenure the same and lowers the monthly outgo. It frees up cash flow now and saves comparatively little.

If you can afford the current EMI, reduce the tenure. The only reason to choose the lower EMI is if the monthly payment is genuinely straining you. This calculator models the reduce-tenure option, which is the one that produces the numbers above.

## Timing matters more than amount

Prepayment in year 2 is worth far more than the same amount in year 15, because early EMIs are almost entirely interest. On the ₹25 lakh loan above, the first EMI splits roughly ₹18,229 interest and ₹3,864 principal. By month 200 that has flipped. A lump sum in the first third of the loan removes principal that would otherwise have accrued interest for another fifteen years; the same lump sum near the end removes almost nothing.

## What the banks are allowed to charge

Under RBI rules, banks and NBFCs cannot levy a foreclosure or prepayment penalty on **floating-rate** home loans taken by individuals. That covers most Indian home loans. Fixed-rate loans, and loans to non-individuals, can still carry a charge — typically 2–4% of the outstanding amount. Personal loans and car loans routinely carry prepayment charges, often with a lock-in of 6–12 months before you may prepay at all.

Check your sanction letter before assuming prepayment is free. On a fixed-rate loan a 3% charge on ₹5 lakh is ₹15,000 up front, which can outweigh the saving if you are late in the tenure.

## Prepay, or invest the money instead?

The honest comparison is after-tax. A home loan at 8.75% is effectively cheaper than 8.75% if you are claiming the Section 24(b) interest deduction under the old tax regime — at the 30% slab, an 8.75% loan costs roughly 6.1% after tax. Under the new regime there is no such deduction on a self-occupied property, so the full 8.75% is what you pay.

Prepaying is a guaranteed, risk-free 8.75% return. An equity SIP might do better over fifteen years, but *might* is doing real work in that sentence. A reasonable split many borrowers land on: prepay enough to clear the loan before retirement, invest the rest.`,
    faqs: [
      {
        question: 'Is it better to reduce the EMI or reduce the tenure when I prepay?',
        answer:
          'Reduce the tenure, if you can comfortably keep paying the current EMI. Cutting the tenure removes the final years of the loan, and those years carry interest you would otherwise pay on a balance that stays outstanding for longer. Reducing the EMI keeps you in the loan for the full original term and saves far less. On a ₹25 lakh, 20-year loan at 8.75%, a ₹5,000 monthly extra saves about ₹11.4 lakh when applied to tenure — choosing the lower-EMI option instead saves a fraction of that.',
      },
      {
        question: 'Will my bank charge me a penalty for prepaying my home loan?',
        answer:
          'Not on a floating-rate home loan taken by an individual — RBI prohibits foreclosure and prepayment charges on those. Fixed-rate home loans, loans to companies or firms, most personal loans and most car loans can still carry a charge, usually 2–4% of the amount prepaid, sometimes with a 6–12 month lock-in first. Your sanction letter states the exact terms; read that rather than relying on what the branch tells you over the phone.',
      },
      {
        question: 'When is the best time to make a part-prepayment?',
        answer:
          'As early as possible. Early EMIs are overwhelmingly interest — on a ₹25 lakh loan at 8.75%, the first instalment is about ₹18,229 interest and only ₹3,864 principal. Money you remove from the balance in year 2 stops accruing interest for the remaining eighteen years. The identical amount paid in year 18 has almost nothing left to save. If you receive an annual bonus, applying it every year from the start is worth substantially more than saving it up for one large prepayment later.',
      },
      {
        question: 'Should I prepay my home loan or invest the money in mutual funds?',
        answer:
          'Prepayment is a guaranteed return equal to your loan rate; equity is a higher expected return with real risk. Compare them after tax. Under the old regime, Section 24(b) lets you deduct home-loan interest, so an 8.75% loan costs roughly 6.1% at the 30% slab — which makes investing more attractive. Under the new regime there is no such deduction on a self-occupied home, so you are genuinely paying 8.75%, and prepaying looks much stronger. Many borrowers split the difference: prepay enough to clear the loan before retirement, invest whatever is left.',
      },
      {
        question: 'Does prepaying affect my CIBIL score?',
        answer:
          'Closing a loan early is not penalised, and the account is reported as "closed" rather than "settled" — the distinction matters, because "settled" indicates you paid less than you owed and does damage your score. A fully prepaid loan is a positive repayment record. The only mild effect is that closing your oldest credit account slightly shortens your average account age, which is a small factor. It is not a reason to keep a loan running.',
      },
      {
        question: 'How much extra do I need to pay to close a 20-year loan in 15?',
        answer:
          'On a ₹25,00,000 loan at 8.75% with a ₹22,093 EMI, an extra ₹2,893 a month — about 13% more than the required payment — closes it in 15 years. Push that to ₹5,000 extra and it closes in 12 years and 10 months. A useful reference point: paying one extra EMI a year, spread as roughly ₹1,841 a month, cuts the loan to about 16 years 6 months and saves ₹5.8 lakh. The relationship is steeply non-linear, so run your own numbers on the slider rather than scaling these.',
      },
    ],
  },

  'sip-step-up-calculator': {
    article: `A flat SIP calculator assumes you will invest the same amount at 45 that you started with at 25. Almost nobody does. A step-up SIP — also called a top-up SIP — raises your monthly contribution by a fixed percentage every year, usually in line with your salary. This calculator shows what that habit is actually worth.

## The gap is larger than it looks

Start a ₹10,000 monthly SIP at an assumed 12% annual return and run it for 15 years. You invest ₹18 lakh and end with roughly ₹50.5 lakh.

Now step it up by 10% a year — ₹11,000 in year 2, ₹12,100 in year 3, and so on. By the final year you are investing about ₹38,000 a month, which is a meaningful sum but one that arrived gradually alongside fifteen years of raises. You invest about ₹38.1 lakh in total and end with roughly **₹86.8 lakh**.

That is ₹36.4 lakh more than the flat SIP. You put in ₹20.1 lakh more, so the extra contributions generated another ₹16.3 lakh of returns on their own. This is the entire argument for stepping up: the increases start early enough to compound.

## Why 10% is the usual default

A 10% annual step-up roughly tracks Indian salary growth over a career, which means the increase should not feel like a sacrifice — the higher SIP is being funded by income you did not have last year. It also comfortably outpaces inflation, so your investment grows in real terms rather than merely keeping pace.

If your income is lumpy — business, commissions, variable pay — a percentage step-up may fit badly. A fixed-amount top-up (raise the SIP by ₹2,000 every year regardless) is easier to sustain, though it becomes a shrinking percentage over time.

## The step-up does not fix a bad return assumption

12% is a common assumption for Indian equity funds over long horizons, and it is defensible against the long-run Nifty total-return record. It is not a promise. Fifteen-year windows have delivered materially less, and sequence matters: a poor decade followed by a strong one produces a very different outcome from the reverse, even at the same average.

Run the calculator at 10% and at 8% as well. If the plan only works at 12%, it is not a plan. The step-up habit is valuable precisely because it gives you a buffer against a lower-than-hoped return without needing to find a large lump sum later.

## Setting it up in practice

Most Indian fund houses and platforms support a step-up instruction directly in the SIP mandate — you set the percentage or amount and the frequency once, and the increase happens automatically. This matters more than it sounds. A step-up you have to remember to do manually every year is a step-up that quietly stops happening in year three.

Check that your bank mandate limit (the NACH e-mandate cap) is set high enough to accommodate fifteen years of increases. A mandate capped at ₹15,000 will silently fail once your stepped-up SIP crosses it, and the failure usually surfaces as a missed instalment rather than an alert.`,
    faqs: [
      {
        question: 'What is a step-up SIP and how is it different from a normal SIP?',
        answer:
          'A normal SIP invests the same amount every month for the entire tenure. A step-up SIP (also called a top-up SIP) raises that amount by a set percentage or a fixed sum every year — typically 10% annually, roughly tracking salary growth. The maths is otherwise identical; the difference is that your contributions grow, so more money spends more time compounding. On a ₹10,000 SIP over 15 years at 12%, a 10% annual step-up turns a ₹50.5 lakh corpus into about ₹86.8 lakh.',
      },
      {
        question: 'How much should I step up my SIP each year?',
        answer:
          '10% is the common default because it approximates typical Indian salary growth, so the increase is funded by income you did not previously have. If your raises are smaller, 5% is still substantially better than nothing. If your income is irregular — business income, variable pay, commissions — a fixed-rupee top-up such as ₹2,000 a year is easier to sustain than a percentage. The table above compares 0%, 5%, 10%, 15% and 20% on your own numbers.',
      },
      {
        question: 'Is 12% a realistic return assumption for a step-up SIP?',
        answer:
          '12% is a widely used assumption for Indian diversified equity funds over long horizons and is broadly consistent with long-run Nifty total returns, but it is an assumption and not a guarantee. Individual fifteen-year windows have delivered meaningfully less. Run the calculator at 10% and 8% as well — if your goal only works at 12%, it needs either a longer horizon or a higher contribution, not a more optimistic spreadsheet.',
      },
      {
        question: 'Can I set up an automatic step-up with my fund house?',
        answer:
          'Yes. Most Indian AMCs and investment platforms support a step-up instruction inside the SIP mandate itself — you choose the percentage or amount and the frequency once, and the increase applies automatically each year. Do use the automatic option rather than planning to raise it manually; a manual step-up reliably stops happening after a year or two. Also check your NACH e-mandate limit is high enough to cover the stepped-up amounts years from now, or the debit will simply fail.',
      },
      {
        question: 'Does a step-up SIP change how my returns are taxed?',
        answer:
          'No — the step-up affects how much you invest, not how gains are taxed. Each instalment is treated as a separate purchase for capital-gains purposes, so every monthly contribution has its own holding period. For equity funds, units held over 12 months qualify as long-term; the rest are short-term. Because a step-up SIP concentrates more of your money in later instalments, a larger share of your corpus will be short-term if you redeem soon after stopping.',
      },
      {
        question: 'Is a step-up SIP better than simply starting with a larger SIP?',
        answer:
          'Starting larger is mathematically better if you can genuinely afford it — earlier money compounds longest. The step-up exists because most people cannot afford their future SIP today. Its real advantage is behavioural: it commits your future raises to investing before lifestyle inflation absorbs them. If you can start at ₹20,000 today, do that and step it up as well; the two are not alternatives.',
      },
    ],
  },

  'xirr-calculator': {
    article: `If you have ever looked at a SIP that turned ₹12 lakh into ₹23 lakh and tried to work out what annual return that represents, you have run into the problem XIRR solves. The money did not go in all at once. Your first instalment has been invested for ten years; last month's has been invested for one month. Any single "return" figure has to account for that.

## What XIRR actually measures

XIRR — extended internal rate of return — is the constant annual rate that would have produced your current value given the exact dates and sizes of every cash flow. It is the number to quote when someone asks "what return did your SIP give?"

For a monthly SIP the maths reduces to solving for the rate *r* in the future-value-of-an-annuity equation, then annualising it. There is no closed-form solution, so it is found numerically — this calculator uses bisection, which converges reliably because the value grows monotonically with the rate.

## The number most people quote instead is wrong

Take ₹10,000 a month for 10 years, now worth ₹23,00,000. Total invested is ₹12,00,000.

The tempting calculation is to treat ₹12 lakh as if it had been a lump sum on day one: (23 ÷ 12) raised to the power of 1/10, minus 1, which gives about **6.7%**. That figure is simply wrong, and it understates your return badly.

The actual XIRR here is about **12.5%** — nearly double. The reason is that your ₹12 lakh was never invested for ten years. On average, each rupee was invested for a bit over five. To reach ₹23 lakh with money that was only invested for half the period, the rate has to be much higher than the naive calculation suggests.

## XIRR vs CAGR — when to use which

CAGR is correct when there is exactly one inflow and one outflow. Bought ₹1 lakh of a fund in 2016, worth ₹2.6 lakh today? CAGR is the right measure, and for that case CAGR and XIRR give the identical answer.

XIRR is correct the moment there is more than one cash flow, in either direction — a SIP, an SWP, top-ups, partial redemptions, a lump sum added midway. Real portfolios are almost always in this category.

The practical consequence: **do not compare your SIP's XIRR against a fund's advertised CAGR.** The fund's CAGR is a point-to-point figure for a lump sum held over that window. Your XIRR reflects your own contribution timing. They can differ substantially in either direction, and neither is lying.

## Where the assumption in this calculator sits

This tool models a level monthly investment made on the same day each month. If your contributions varied, or you made lump-sum top-ups, or you redeemed partway, the true XIRR will differ — for irregular flows, the XIRR() function in Excel or Google Sheets with your actual transaction dates is the precise route. The CAS statement from CAMS or KFintech gives you every dated transaction you need to build that sheet.

## A caveat worth knowing

XIRR assumes interim cash flows are reinvested at the same rate — a standard IRR assumption that rarely holds exactly. It also becomes unstable when cash flows change sign more than once (money in, money out, money in again), where more than one mathematically valid answer can exist. For an ordinary accumulating SIP neither issue arises.`,
    faqs: [
      {
        question: 'What is the difference between XIRR and CAGR?',
        answer:
          'CAGR measures the annual growth rate between exactly two points — one investment in, one value out. XIRR measures the annualised return when money went in or out at multiple different times, weighting each cash flow by how long it was actually invested. For a lump sum they give the same answer. For a SIP they diverge sharply: ₹10,000 a month for 10 years now worth ₹23 lakh has an XIRR of about 12.5%, while naively treating the ₹12 lakh invested as a day-one lump sum gives about 6.7%.',
      },
      {
        question: 'Why is my SIP XIRR higher than the return I calculated myself?',
        answer:
          'Almost certainly because you treated your total invested amount as if it had all been invested on day one. It was not — your most recent instalments have been invested for months, not years. Since a smaller effective time produced the same final value, the true annual rate must be higher. This is the single most common mistake in evaluating a SIP, and it consistently makes good returns look mediocre.',
      },
      {
        question: 'Should I compare my XIRR to the fund’s published returns?',
        answer:
          'Not directly. A fund’s published CAGR or "trailing return" is a point-to-point figure for a lump sum invested at the start of that window. Your XIRR depends on when your own money went in. If you started your SIP just before a drawdown, your XIRR will trail the fund’s CAGR even though you did nothing wrong; if you started before a rally, it will beat it. To judge the fund itself, compare its returns to its benchmark and category. To judge your own outcome, use XIRR.',
      },
      {
        question: 'What is a good XIRR for an equity SIP in India?',
        answer:
          'There is no fixed threshold, but a useful frame: over a full market cycle of seven years or more, a diversified Indian equity fund delivering an XIRR in the 11–14% range is performing broadly in line with long-run expectations. Over shorter windows XIRR is dominated by market conditions rather than fund quality — a two-year XIRR tells you about the market, not about your fund. Judge it against the fund’s benchmark over the same period rather than against an absolute number.',
      },
      {
        question: 'How do I calculate XIRR when my investments were irregular?',
        answer:
          'Use the XIRR() function in Excel or Google Sheets. Put every transaction date in one column and the amount in the next — investments as negative numbers, redemptions and the current value as positive — then call XIRR(values, dates). Your consolidated account statement from CAMS or KFintech lists every dated transaction across all your funds, which is exactly the input the function needs. This calculator assumes a level monthly investment, so it will not match an irregular history precisely.',
      },
      {
        question: 'Can XIRR be negative, and what does that mean?',
        answer:
          'Yes. A negative XIRR means your portfolio is worth less than you put in, on a time-weighted basis. It is common and expected in the first year or two of an equity SIP, especially if you started near a market peak — the early instalments simply have not had time to recover. A negative XIRR over seven or more years is a genuine signal worth investigating; over eighteen months it is mostly noise.',
      },
    ],
  },
};
