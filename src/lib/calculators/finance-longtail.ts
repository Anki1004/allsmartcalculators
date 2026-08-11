import { CalculatorConfig } from '../calculator-types';

// ─────────────────────────────────────────────────────────────────────────────
// Long-tail finance calculators built around a FEATURE the base tool does not
// have. The base emi-calculator takes only amount/rate/tenure and the base
// sip-calculator only amount/return/duration, so "EMI calculator with
// prepayment", "SIP step-up calculator" and "XIRR calculator" had nowhere to
// land. A page targeting those queries without the underlying feature is a
// doorway page — it ranks below the head page and earns nothing. These carry
// the real maths.
//
// `prefix: '$'` is the codebase's sentinel for "render the user's selected
// currency symbol" (see cvtPfx in CalculatorEngine). Default currency is INR.
// ─────────────────────────────────────────────────────────────────────────────

/** Standard reducing-balance EMI. Returns 0 for degenerate inputs. */
function emiFor(principal: number, monthlyRate: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  if (monthlyRate === 0) return principal / months;
  const growth = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * growth) / (growth - 1);
}

export const financeLongtailCalculators: CalculatorConfig[] = [
  {
    slug: 'emi-prepayment-calculator',
    name: 'EMI Prepayment Calculator',
    shortName: 'EMI Prepayment',
    category: 'finance',
    icon: 'TrendingDown',
    description:
      'See exactly how much interest a part-prepayment saves you and how many months it cuts off your loan — for extra monthly payments, a yearly lump sum, or both.',
    chartType: 'donut',
    inputs: [
      { key: 'principal', label: 'Loan Amount', type: 'slider', min: 100000, max: 20000000, step: 50000, default: 2500000, prefix: '$', color: 'primary' },
      { key: 'rate', label: 'Interest Rate', type: 'slider', min: 5, max: 20, step: 0.05, default: 8.75, suffix: '%', color: 'secondary' },
      { key: 'tenure', label: 'Original Tenure', type: 'slider', min: 1, max: 30, step: 1, default: 20, suffix: 'Years', color: 'tertiary' },
      { key: 'extraMonthly', label: 'Extra Paid Every Month', type: 'slider', min: 0, max: 100000, step: 500, default: 5000, prefix: '$', color: 'primary' },
      { key: 'yearlyLump', label: 'Yearly Lump Sum (bonus, etc.)', type: 'slider', min: 0, max: 1000000, step: 10000, default: 0, prefix: '$', color: 'secondary' },
    ],
    outputs: [
      { key: 'interestSaved', label: 'Interest Saved', prefix: '$', primary: true, color: 'white' },
      { key: 'monthsSaved', label: 'Months Cut Off', decimals: 0, color: 'secondary' },
      { key: 'newTenureYears', label: 'New Tenure (Years)', decimals: 1, color: 'tertiary' },
      { key: 'emi', label: 'Base EMI', prefix: '$' },
      { key: 'originalInterest', label: 'Interest Without Prepayment', prefix: '$' },
      { key: 'newInterest', label: 'Interest With Prepayment', prefix: '$' },
    ],
    calculate: (i) => {
      const principal = Number(i.principal);
      const monthlyRate = Number(i.rate) / 12 / 100;
      const months = Number(i.tenure) * 12;
      const extraMonthly = Number(i.extraMonthly);
      const yearlyLump = Number(i.yearlyLump);

      const emi = emiFor(principal, monthlyRate, months);
      const originalInterest = emi * months - principal;

      // Amortise month by month with the extra payments applied to principal.
      let balance = principal;
      let paid = 0;
      let elapsed = 0;
      // 600 months is a hard stop: if EMI + extra never exceeds the monthly
      // interest the loan never amortises and this would spin forever.
      const MAX_MONTHS = 600;
      while (balance > 0.01 && elapsed < MAX_MONTHS) {
        const interest = balance * monthlyRate;
        let payment = emi + extraMonthly;
        // Lump sum lands at the end of each completed year, not month 0.
        if (elapsed > 0 && (elapsed + 1) % 12 === 0) payment += yearlyLump;
        if (payment <= interest && yearlyLump === 0) break; // never amortises
        if (payment > balance + interest) payment = balance + interest;
        balance = balance + interest - payment;
        paid += payment;
        elapsed += 1;
      }

      const amortised = balance <= 0.01;
      const newInterest = amortised ? paid - principal : originalInterest;
      const newMonths = amortised ? elapsed : months;

      return {
        emi,
        originalInterest,
        newInterest,
        interestSaved: Math.max(0, originalInterest - newInterest),
        monthsSaved: Math.max(0, months - newMonths),
        newTenureYears: newMonths / 12,
      };
    },
    buildTable: (i) => {
      const principal = Number(i.principal);
      const monthlyRate = Number(i.rate) / 12 / 100;
      const months = Number(i.tenure) * 12;
      const emi = emiFor(principal, monthlyRate, months);
      if (emi <= 0) return null;

      // What each extra-EMI level buys you — the comparison people actually want.
      const rows: (string | number)[][] = [];
      const baseInterest = emi * months - principal;
      for (const extra of [0, 2000, 5000, 10000, 25000]) {
        let balance = principal;
        let paid = 0;
        let elapsed = 0;
        while (balance > 0.01 && elapsed < 600) {
          const interest = balance * monthlyRate;
          let payment = emi + extra;
          if (payment <= interest) break;
          if (payment > balance + interest) payment = balance + interest;
          balance = balance + interest - payment;
          paid += payment;
          elapsed += 1;
        }
        if (balance > 0.01) continue;
        rows.push([
          extra === 0 ? 'No prepayment' : `+${extra.toLocaleString('en-IN')}/month`,
          `${(elapsed / 12).toFixed(1)} yrs`,
          Math.round(paid - principal).toLocaleString('en-IN'),
          Math.round(baseInterest - (paid - principal)).toLocaleString('en-IN'),
        ]);
      }
      return {
        title: 'What each level of prepayment actually buys you',
        headers: ['Extra paid', 'Loan closes in', 'Total interest', 'Interest saved'],
        rows,
      };
    },
    relatedSlugs: ['emi-calculator', 'mortgage-calculator', 'loan-eligibility-calculator', 'compound-interest-calculator'],
    seo: {
      title: 'EMI Prepayment Calculator: Interest Saved & Tenure Cut',
      description:
        'Free EMI calculator with prepayment. Enter an extra monthly amount or a yearly lump sum and see the exact interest saved and how many months come off your home loan.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },

  {
    slug: 'sip-step-up-calculator',
    name: 'Step-Up SIP Calculator',
    shortName: 'Step-Up SIP',
    category: 'finance',
    icon: 'TrendingUp',
    description:
      'Increase your SIP by a fixed percentage every year and see what that does to your corpus — the top-up SIP maths that a flat SIP calculator cannot show.',
    chartType: 'donut',
    inputs: [
      { key: 'monthly', label: 'Starting Monthly SIP', type: 'slider', min: 500, max: 200000, step: 500, default: 10000, prefix: '$', color: 'primary' },
      { key: 'stepUp', label: 'Annual Step-Up', type: 'slider', min: 0, max: 30, step: 1, default: 10, suffix: '%', color: 'secondary' },
      { key: 'returnRate', label: 'Expected Return', type: 'slider', min: 1, max: 25, step: 0.5, default: 12, suffix: '%', color: 'tertiary' },
      { key: 'years', label: 'Investment Period', type: 'slider', min: 1, max: 40, step: 1, default: 15, suffix: 'Years' },
    ],
    outputs: [
      { key: 'futureValue', label: 'Corpus at Maturity', prefix: '$', primary: true, color: 'white' },
      { key: 'invested', label: 'Total Invested', prefix: '$', color: 'secondary' },
      { key: 'gains', label: 'Wealth Gained', prefix: '$', color: 'tertiary' },
      { key: 'flatValue', label: 'Corpus if SIP Never Increased', prefix: '$' },
      { key: 'stepUpAdvantage', label: 'Extra From Stepping Up', prefix: '$' },
      { key: 'finalSip', label: 'Final Year Monthly SIP', prefix: '$' },
    ],
    calculate: (i) => {
      const start = Number(i.monthly);
      const stepUp = Number(i.stepUp) / 100;
      const monthlyReturn = Number(i.returnRate) / 12 / 100;
      const months = Number(i.years) * 12;

      let value = 0;
      let invested = 0;
      let sip = start;
      for (let m = 0; m < months; m++) {
        // Step up at the start of each new year, not month 0.
        if (m > 0 && m % 12 === 0) sip *= 1 + stepUp;
        value = (value + sip) * (1 + monthlyReturn);
        invested += sip;
      }

      // Same horizon, same return, no annual increase — the honest comparison.
      let flat = 0;
      for (let m = 0; m < months; m++) flat = (flat + start) * (1 + monthlyReturn);

      return {
        futureValue: value,
        invested,
        gains: value - invested,
        flatValue: flat,
        stepUpAdvantage: value - flat,
        finalSip: sip,
      };
    },
    buildTable: (i) => {
      const start = Number(i.monthly);
      const monthlyReturn = Number(i.returnRate) / 12 / 100;
      const months = Number(i.years) * 12;
      const rows: (string | number)[][] = [];
      for (const pct of [0, 5, 10, 15, 20]) {
        let value = 0;
        let invested = 0;
        let sip = start;
        for (let m = 0; m < months; m++) {
          if (m > 0 && m % 12 === 0) sip *= 1 + pct / 100;
          value = (value + sip) * (1 + monthlyReturn);
          invested += sip;
        }
        rows.push([
          pct === 0 ? 'No step-up' : `${pct}% a year`,
          Math.round(invested).toLocaleString('en-IN'),
          Math.round(value).toLocaleString('en-IN'),
          Math.round(value - invested).toLocaleString('en-IN'),
        ]);
      }
      return {
        title: 'Step-up rate vs final corpus (same starting SIP)',
        headers: ['Step-up', 'Total invested', 'Corpus', 'Wealth gained'],
        rows,
      };
    },
    relatedSlugs: ['sip-calculator', 'lumpsum-calculator', 'mutual-fund-returns', 'xirr-calculator'],
    seo: {
      title: 'Step-Up SIP Calculator: Top-Up Your SIP Every Year',
      description:
        'Free step-up SIP calculator. Raise your SIP 5–20% a year and see the corpus, total invested and exactly how much more you end up with than a flat SIP.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },

  {
    slug: 'xirr-calculator',
    name: 'XIRR Calculator',
    shortName: 'XIRR',
    category: 'finance',
    icon: 'Percent',
    description:
      'Work out the true annualised return on a SIP, where every instalment was invested for a different length of time — and see why the simpler CAGR number overstates it.',
    chartType: 'none',
    inputs: [
      { key: 'monthly', label: 'Monthly Investment', type: 'slider', min: 500, max: 200000, step: 500, default: 10000, prefix: '$', color: 'primary' },
      { key: 'years', label: 'Years Invested', type: 'slider', min: 1, max: 40, step: 1, default: 10, suffix: 'Years', color: 'secondary' },
      { key: 'currentValue', label: 'Value Today', type: 'slider', min: 10000, max: 100000000, step: 10000, default: 2300000, prefix: '$', color: 'tertiary' },
    ],
    outputs: [
      { key: 'xirr', label: 'XIRR (True Annualised Return)', suffix: '%', decimals: 2, primary: true, color: 'white' },
      { key: 'naiveCagr', label: 'CAGR on Total Invested (misleading)', suffix: '%', decimals: 2, color: 'secondary' },
      { key: 'invested', label: 'Total Invested', prefix: '$', color: 'tertiary' },
      { key: 'absoluteReturn', label: 'Absolute Return', suffix: '%', decimals: 2 },
      { key: 'gains', label: 'Gains', prefix: '$' },
    ],
    calculate: (i) => {
      const monthly = Number(i.monthly);
      const months = Number(i.years) * 12;
      const finalValue = Number(i.currentValue);
      const invested = monthly * months;

      // Future value of a monthly annuity-due at monthly rate r, minus the
      // actual value — solved for r by bisection. Bisection rather than
      // Newton-Raphson: it cannot diverge, and the function is monotonic in r
      // so a sign change is guaranteed inside the bracket.
      const fv = (r: number) =>
        r === 0
          ? monthly * months
          : monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);

      let low = -0.9 / 12;
      let high = 1; // 100% a month — far beyond any real fund
      let monthlyRate = 0;
      if (finalValue > 0 && months > 0 && monthly > 0) {
        if (fv(low) > finalValue) {
          monthlyRate = low; // total wipeout, clamp
        } else if (fv(high) < finalValue) {
          monthlyRate = high;
        } else {
          for (let n = 0; n < 200; n++) {
            monthlyRate = (low + high) / 2;
            if (fv(monthlyRate) > finalValue) high = monthlyRate;
            else low = monthlyRate;
          }
        }
      }

      const xirr = (Math.pow(1 + monthlyRate, 12) - 1) * 100;

      // The number people wrongly quote: treat the whole invested amount as if
      // it had been a lump sum on day one. Always lower than the real XIRR for
      // a growing SIP, because most instalments were not invested that long.
      const naiveCagr =
        invested > 0 && months > 0
          ? (Math.pow(finalValue / invested, 12 / months) - 1) * 100
          : 0;

      return {
        xirr,
        naiveCagr,
        invested,
        gains: finalValue - invested,
        absoluteReturn: invested > 0 ? ((finalValue - invested) / invested) * 100 : 0,
      };
    },
    relatedSlugs: ['sip-calculator', 'sip-step-up-calculator', 'cagr-calculator', 'mutual-fund-returns'],
    seo: {
      title: 'XIRR Calculator for SIP: Your True Annualised Return',
      description:
        'Free XIRR calculator for mutual fund SIPs. Enter your monthly amount, years and current value to get the real annualised return — and see how it differs from CAGR.',
      applicationCategory: 'FinanceApplication',
    },
    lastUpdated: '2026-08-11',
    reviewedBy: { name: 'Ankit Gupta', credential: 'Builder · AllSmartCalculators', href: '/author/ankit-gupta' },
  },
];
