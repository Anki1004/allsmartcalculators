import { CalcInlineContent } from './types';
import { financeUsTaxContent } from './finance-us-tax-content';
import { financeUsLoansContent } from './finance-us-loans-content';
import { financeUsRetirementContent } from './finance-us-retirement-content';
import { healthUsContent } from './health-us-content';
import { dailyLifeUsContent } from './daily-life-us-content';
import { mathUsContent } from './math-us-content';

export type { CalcInlineContent } from './types';

/** Inline article + FAQ fallbacks keyed by calculator slug.
    Only imported from server components — never from the client engine. */
export const CALC_INLINE_CONTENT: Record<string, CalcInlineContent> = {
  ...financeUsTaxContent,
  ...financeUsLoansContent,
  ...financeUsRetirementContent,
  ...healthUsContent,
  ...dailyLifeUsContent,
  ...mathUsContent,
};
