# SEO Audit — Follow-ups

This file tracks what was done in code and what still needs to happen outside the repo.
Pair with `AllSmartCalculator_SEO_Audit.docx` (the source audit) when prioritising.

Last updated: 2026-04-26

---

## ✅ Shipped in this pass

### Critical fixes (Days 1–14)

- **CalcVerse → AllSmartCalculator** — codebase audit confirmed no rendered "CalcVerse"
  brand strings. Only `cv-theme` localStorage key remains (purely internal,
  invisible to crawlers). `README.md` heading also updated. **If "CalcVerse"
  still appears on any rendered page (e.g. BMI), it is coming from the Strapi
  CMS row** — see "Strapi seed updates" below.
- **`robots.ts`** — verified, points at `/sitemap.xml`. No change needed.
- **`sitemap.ts`** — rewritten to include the new `/blog`, `/methodology`,
  `/author/ankit-gupta`, all `/<category>` landing pages, and dynamically all
  blog posts from Strapi.
- **404 status** — `not-found.tsx` exists and Next.js automatically returns
  HTTP 404 for unmatched routes that hit it.
- **Sitewide canonical + OG/Twitter** — `metadataBase`, default OG, Twitter
  card, and `applicationName` added in `src/app/layout.tsx`. Per-page
  canonicals added/verified on: home, categories, single category, blog
  index, blog post, calculator pages, about, contact (via layout), trending,
  privacy, terms, disclaimer, methodology, author.

### Calculator page template (Days 1–14, Days 15–45)

- **Type extended** — `CalculatorConfig` now supports `intro`, `howItWorks`,
  `ranges`, `limitations`, `seo` (title / description / applicationCategory /
  rating / sources), `lastUpdated`, `reviewedBy`.
- **Calculator page** — `[category]/[slug]/page.tsx` rebuilt. Now renders, in
  order: breadcrumb → H1 → description → reviewed-by + last-updated line →
  indexable 80–120 word intro → calculator → CMS overlay → "How X is
  calculated" + formula → Categories/Ranges table → Limitations → FAQs
  (`<details>` with on-page UI) → Sources & references → Related calculators →
  YMYL disclaimer link.
- **JSON-LD** — three blocks now emitted on every calculator page:
  `WebApplication` (with publisher, dateModified, optional aggregateRating),
  `BreadcrumbList`, and `FAQPage` (when FAQs exist; aggregates registry FAQs
  + CMS FAQs).
- **Title format** — defaults to "{Name} — Free Online Tool | AllSmartCalculator"
  when no per-calc `seo.title` is set; CMS `pageTitle` and `seo.title`
  override.

### E-E-A-T pages

- **`/author/ankit-gupta`** — full author page with bio, expertise areas,
  editorial principles, LinkedIn link, `Person` JSON-LD.
- **`/methodology`** — explains formula sourcing, verification, primary
  sources by domain, corrections policy.
- **`/about`** — rebuilt: data sources summary, links to methodology + author
  + disclaimer, contact info, hero re-pitched around India-finance focus.
- **Footer** — added Methodology and Author links.
- **Disclaimer** — fixed "A AllSmartCalculator" → "An AllSmartCalculator"
  typo. Existing copy is already strong on YMYL framing; no other changes.

### CWV / pilot content

- **Recharts deferred** — `DonutChart` is now loaded via `next/dynamic` with
  `ssr: false`. Saves ~80KB gz from initial JS for every calculator page,
  fixing the audit's CWV note about chart libraries.
- **BMI calculator** — full pilot content: `intro`, `formula`, `howItWorks`,
  `ranges` (WHO + Asian cutoffs), `limitations`, 6 FAQs, `seo` (title /
  description / sources: WHO, CDC), `reviewedBy`, `lastUpdated`.
- **EMI calculator** — same pilot content: India-specific bank rate ranges,
  worked example for ₹50 lakh @ 8.5% × 20yr, 6 FAQs, sources (RBI), etc.

---

## 🔜 To do — code work I did NOT ship

These are ranked roughly by effort × payoff. None are blocked; all are pure code work
that can be done in follow-up PRs.

### Priority 1 — finish the template rollout

- **Roll the same `intro`/`howItWorks`/`ranges`/`limitations`/`faqs`/`seo`/
  `reviewedBy`/`lastUpdated` fields out to the next ~18 calculators** (audit
  says top 20). Suggested order:
  - Finance: SIP, mortgage, compound-interest, loan-eligibility, income-tax
  - Health: BMR, calorie, age (whatever is in the registry as top 4)
  - Build new: GST, HRA, Income Tax India (new + old regime toggle), PPF, NPS, FD, Lumpsum, CIBIL estimator
- **India-finance calculators that don't exist yet** in the registry — these
  need `inputs`, `outputs`, `calculate()` plus the SEO fields. Audit lists
  GST, HRA, PPF, NPS, FD, Lumpsum, CIBIL estimator. Income Tax already exists
  but should be split into India-specific new vs old regime.

### Priority 2 — programmatic long-tail (Days 46–90)

- **Programmatic EMI variants** — generate ~20 pages from a templated route
  like `/finance/emi-calculator/[amount]-[tenure]` for "EMI calculator for
  ₹X home loan over Y years." Audit warns: must use the same full content
  template — never thin programmatic pages (Helpful Content Update bait).
- **Programmatic SIP variants** — same pattern, "₹X per month for Y years".
- **Currency-pair pages** — "100 USD to INR", "1 BTC to INR" — high
  evergreen volume.

### Priority 3 — embeddable widget v1 (Days 46–90)

- Build an `<iframe>` embed of (start with) the EMI calculator with required
  attribution link back to AllSmartCalculator. This is how omnicalculator and
  inchcalculator built their backlink profiles per the audit.
- Likely lives at `/embed/[category]/[slug]` with a stripped-down layout.

### Priority 4 — publisher logo

- `WebApplication` JSON-LD emits `publisher.name` but no logo. Add a
  square logo at `/public/logo-512.png` and reference it in the
  `publisher.logo` ImageObject across calculator + author + organisation
  schemas. Improves rich-result eligibility.

### Priority 5 — `<organization>` JSON-LD on the home page

- Add an `Organization` JSON-LD block to the home page with logo, sameAs (LinkedIn,
  Twitter once they exist), and `contactPoint`.

---

## 🌐 To do — outside the repo (you, not Claude)

These are the items the audit lists that cannot be done by code alone.

### Days 1–14 critical

- [ ] **Submit `/sitemap.xml` to Google Search Console.** Verify domain
  ownership first (DNS TXT record on the .tech domain via Vercel).
- [ ] **Submit `/sitemap.xml` to Bing Webmaster Tools.**
- [ ] **Connect GA4** — add `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var if you
  want analytics beyond Vercel Analytics (which is already wired).
- [ ] **Run PageSpeed Insights** against `/`, `/health/bmi-calculator`,
  `/finance/emi-calculator`, `/finance/mortgage-calculator`,
  `/finance/sip-calculator`. Document baseline LCP/INP/CLS scores.
  Re-test after the recharts dynamic-import change to confirm INP gain.
- [ ] **Verify `/robots.txt` and `/sitemap.xml`** load on production. Visit
  `https://allsmartcalculator.tech/robots.txt` and confirm 200, no 404.
- [ ] **Test 404 status** — visit `/finance/fake-calc` and confirm response
  is HTTP 404 (not 200 with redirect). Use `curl -I` or Chrome DevTools
  Network tab.
- [ ] **Strapi CMS audit for "CalcVerse" string.** The audit observed
  "CalcVerse" in the BMI page title — the codebase has no such string, so
  it must be a stale `pageTitle` value in the Strapi `calculator-contents`
  collection. Open Strapi admin, search every row's `pageTitle`,
  `metaOgTitle`, `metaTwitterTitle`, `metaOgSiteName` for "CalcVerse" and
  replace with "AllSmartCalculator".

### Days 15–45 — content & links

- [ ] **Publish first 4 blog posts** (audit posts 1, 3, 4, 8):
  - "How to Calculate EMI: The Formula, Examples & Common Mistakes"
  - "BMI for Indian Adults: Why the Global Cutoffs Are Wrong"
  - "GST Calculation Explained: Inclusive vs Exclusive, with Examples"
  - "Daily Calorie Needs: TDEE, BMR, and the Math Behind Weight Loss"
  - Each: 1,500–2,500 words, FAQ section, internal links to the relevant
    calculator. Author byline = Ankit Gupta. Add to Strapi `posts` collection.
- [ ] **Submit to 15 "best free calculators" listicles.** Target 3 placements.

### Days 46–90 — authority

- [ ] **First original data study.** "What India calculated in Q1 2026."
  Pitch to Mint, Economic Times, Business Standard. Needs aggregated
  query-volume data, which means turning on event tracking first.
- [ ] **HARO daily, Reddit weekly.** Habit work, no code involved.

### Domain & infra

- [ ] **Add Twitter handle.** `@AllSmartCalculator` is referenced in the
  default Twitter card meta — register the actual handle or change the
  reference in `src/app/layout.tsx`.
- [ ] **Open Graph fallback image.** No default OG image is configured. Add
  one at `/public/og-default.png` (1200×630) and reference in
  `layout.tsx` `metadata.openGraph.images`.
- [ ] **Set `NEXT_PUBLIC_SITE_URL` in Vercel env.** Currently defaults to
  `https://allsmartcalculator.tech` if not set, but make the env explicit
  for safety (also flips for preview deployments).

---

## 90-day target check (audit baseline)

| Metric                            | Target (Jul 2026) | Where it depends on this PR                 |
|-----------------------------------|-------------------|---------------------------------------------|
| Indexed pages in GSC              | 100+              | Sitemap now lists all routes ✅             |
| Schema-marked pages               | 100% of calcs     | Every calc page now emits 3 JSON-LD blocks ✅ |
| Core Web Vitals — % URLs passing  | 90%+              | Recharts deferred ✅; verify in PSI         |
| Keywords ranking in top 10        | 8–15 (long-tail)  | Needs blog posts + India-finance buildout   |
| Referring domains                 | 25–40             | Outside-the-repo work                       |
| Organic clicks per day            | 300–500           | All of the above                            |
