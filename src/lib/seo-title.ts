// <title> brand suffix, applied by the calculator, category and blog metadata generators.
//
// Until 2026-09-16 every page appended " | AllSmartCalculators" (calculators) or
// " — AllSmartCalculators" (blog, categories) unconditionally, and 121 of the 145 sitemap
// titles ran past 60 characters — 102 past 70. Google and Bing cut a title around 60
// characters (pixels, really), so the brand was the part that got cut, and on the longest
// titles the engines rewrote the whole thing. The brand already appears in og:site_name,
// the Organization/WebSite schema and the breadcrumb, so it is not lost when it is dropped
// from <title>.
//
// Rule: strip any brand suffix the CMS or a fallback already carries, then append the
// suffix only while the whole title stays within MAX_TITLE characters.

const BRAND = 'AllSmartCalculators';
const SUFFIX = ` | ${BRAND}`;
const MAX_TITLE = 60;
// " | Brand", " — Brand", " – Brand", " - Brand" at the end of the string.
const TRAILING_BRAND = /\s*[|—–-]\s*AllSmartCalculators\s*$/u;

export function seoTitle(base: string): string {
  const stripped = base.replace(TRAILING_BRAND, '').trim();
  return stripped.length + SUFFIX.length <= MAX_TITLE ? `${stripped}${SUFFIX}` : stripped;
}
