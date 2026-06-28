// Single source of truth for "Last updated" / "Last reviewed" dates shown on
// editorial and legal pages. Update the ISO date when the page substantively
// changes. The display formatter is co-located so every page shows the same
// "May 21, 2026" style without each page reformatting itself.

export const POLICY_DATES = {
  privacy: '2026-06-28',
  terms: '2026-05-21',
  disclaimer: '2026-05-21',
  methodology: '2026-05-21',
  editorialPolicy: '2026-05-21',
  corrections: '2026-05-21',
  accessibility: '2026-05-21',
  faq: '2026-05-21',
} as const;

export type PolicyKey = keyof typeof POLICY_DATES;

export function formatPolicyDate(iso: string): string {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function lastUpdatedLabel(key: PolicyKey): string {
  return `Last updated ${formatPolicyDate(POLICY_DATES[key])}`;
}
