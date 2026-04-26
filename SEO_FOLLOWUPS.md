# SEO Audit — Follow-ups

This file tracks what was done in code across three SEO audits and what still
needs to happen outside the repo.

Last updated: 2026-04-26

---

## ✅ Shipped in code (commits `7023f47`, `28e6c86`, and the wave-3 push)

### Brand & infrastructure
- **CalcVerse → AllSmartCalculator** — no rendered "CalcVerse" brand strings
  in source. Only `cv-theme` localStorage key remains. README updated.
  Any remaining "CalcVerse" on a live page is a stale Strapi
  `calculator-contents` row — see Strapi action below.
- **`robots.ts`** — points at `/sitemap.xml`. Disallows `/api/`.
- **`sitemap.ts`** — async; lists all 100+ calculator URLs, all 8 category
  landing pages, the new `/blog`, `/methodology`, `/author/ankit-gupta`,
  `/search`, and dynamically all blog posts from Strapi.
- **404** — `not-found.tsx` returns HTTP 404 automatically via Next.js.
- **`manifest.webmanifest`** — PWA-ready manifest at `/public/`. Theme
  color, scope, categories, name, short name configured.
- **Viewport export** — `themeColor` moved to `viewport` export
  (Next.js 14 best practice).

### Sitewide metadata
- **`metadataBase`**, default OG/Twitter card, `applicationName` configured
  in `src/app/layout.tsx`.
- **Per-page canonical + OG + Twitter** added to: home, categories, single
  category, blog index, blog post, calculator pages, about, contact (via
  layout), trending, privacy, terms, disclaimer, methodology, author,
  search.

### Homepage
- **H1 rewritten** from brand-led ("101+ Calculators. One Beautiful Place.")
  to keyword-led ("Free Online Calculators — N Tools for Finance, Health,
  Math & More.") — CMS still overrides if you want.
- **Title rewritten** to "Free Online Calculators — 101+ Tools (EMI, BMI,
  GPA & More) | AllSmartCalculator" — keyword-front-loaded.
- **Meta description** rewritten with keywords + value prop + ad-free claim.
- **Organization JSON-LD** — name, founder (Person → /author/ankit-gupta),
  sameAs (LinkedIn).
- **WebSite JSON-LD** with **SearchAction** — points at `/search?q={...}`.

### `/search` route (new)
- Live route at `/search?q=<query>` that uses `searchCalculators()` to render
  matching calculator cards. Empty-state UI when no query or no matches.
- `noindex, follow` so search-result pages don't compete with calc pages
  in the index.

### Calculator page template
- **Type extended** — `CalculatorConfig` now supports `intro`, `howItWorks`,
  `ranges`, `limitations`, `seo` (title/description/applicationCategory/
  rating/sources), `lastUpdated`, `reviewedBy`.
- **Page template** — `[category]/[slug]/page.tsx` rebuilt. Renders:
  breadcrumb → H1 → description → reviewed-by + last-updated → indexable
  intro → calculator → CMS overlay → "How X is calculated" + formula →
  ranges table → limitations → FAQs (`<details>`) → sources → related
  calculators → YMYL disclaimer link (finance/health/crypto).
- **3 JSON-LD blocks per calc**: `WebApplication` (publisher, dateModified,
  optional aggregateRating), `BreadcrumbList`, and `FAQPage` (when FAQs
  exist; merges registry FAQs + CMS FAQs).

### Full template content (22 calcs total now)
Calculators with the complete template (intro, formula, howItWorks, ranges,
limitations, FAQs, sources, reviewedBy, lastUpdated):

**Wave 1** (commit `7023f47`): BMI, EMI
**Wave 2** (commit `28e6c86`): SIP, mortgage, BMR, calorie, GST, PPF, NPS, FD,
HRA (new), CIBIL (new), lumpsum (new)
**Wave 3** (this push): GPA, percentage, tip, currency converter, compound
interest, ROI, discount, crypto profit, age

That covers every calc the audits explicitly call out as a Tier-1 target.

### Sitewide title rewrites
- All ~100 calculators have a per-calc `seo.title` ("Keyword: Hook |
  AllSmartCalculator", ≤60 chars) and `seo.description` (~150 chars).
- Replaces the generic default title in SERP for every page.

### E-E-A-T pages (existing from wave 1)
- `/about` — rebuilt with data sources summary, links to methodology +
  author + disclaimer.
- `/methodology` — formula sourcing, verification process, primary sources,
  corrections policy.
- `/author/ankit-gupta` — bio, expertise, principles, `Person` JSON-LD.
- `/disclaimer` — strong YMYL framing (existing copy).
- Footer links to all four.

### CWV
- **Recharts deferred** via `next/dynamic` in `CalculatorEngine.tsx`
  (`ssr: false`). Removes ~80KB gz from initial JS for every calc page.
- All Google Fonts already use `display: swap`.

---

## 🔜 Next code work — Priority 1 (highest leverage)

### Roll the full template to remaining ~75 calcs
Same pattern as BMI/EMI/SIP — fill `intro`, `howItWorks`, `ranges`,
`limitations`, `faqs`, optional `sources`, `lastUpdated`, `reviewedBy`.
Every remaining calc has `seo.title`/`seo.description` already, so SERP
display is fine — but content depth still wins ranking.

Suggested order (by audit priority + est. search volume):
1. Income Tax Calculator (split into India new vs old regime)
2. RD, Mutual Fund Returns, Loan Eligibility, Stock P/L, Net Worth (finance)
3. Macro, Body Fat, Water Intake, Pregnancy Due Date, Heart Rate Zone (health)
4. Quadratic, Statistics, Logarithm, Trigonometry (math)
5. Bitcoin Mining, Ethereum Gas, Staking Rewards, DCA, Impermanent Loss (crypto)
6. Ohm's Law, Voltage Divider, Power, Concrete (engineering)
7. CGPA, Grade, Final Exam Score, Attendance (education)
8. CAGR, Profit Margin, Markup, Customer LTV, ROAS (business)
9. Fuel Cost, Date Difference, Cooking Conversion, Paint, Countdown (daily-life)

### Programmatic long-tail (audit Days 46–90)
- Generate 20 EMI variant pages — `/finance/emi-calculator/[amount]-[tenure]`
  templated for "EMI for ₹X home loan over Y years". Same full template;
  never thin.
- Same for SIP variants and currency-pair pages.

---

## 🔜 Next code work — Priority 2

### Embeddable widget v1
- Build `/embed/[category]/[slug]` route with stripped-down layout:
  no nav, no footer, just the calculator + "Powered by AllSmartCalculator"
  attribution link. This is how omnicalculator and inchcalculator built
  their backlink profiles.
- Start with EMI calculator.

### `Organization.logo` ImageObject
- Add `/public/logo-512.png` (square) and reference it in
  `publisher.logo` across all schema blocks. Required for some rich-result
  eligibility (recipe, news; nice-to-have for WebApplication).

### OG image
- Add `/public/og-default.png` (1200×630) and reference in
  `metadata.openGraph.images` in `layout.tsx`. Currently no fallback,
  so social shares show generic preview.

---

## 🌐 To do — outside the repo (you, not Claude)

These items the audits call for that cannot be done by code alone.

### Days 1–14 critical
- [ ] **Submit `/sitemap.xml` to Google Search Console.** Verify domain
  ownership first (DNS TXT record on .tech via Vercel).
- [ ] **Submit `/sitemap.xml` to Bing Webmaster Tools.**
- [ ] **Add IndexNow ping** for new/updated calc pages — Bing supports it,
  Google ignores it but no harm.
- [ ] **Connect GA4** — add `NEXT_PUBLIC_GA_MEASUREMENT_ID` env. Vercel
  Analytics is already wired, but GA4 gives Search-Console-linkable data.
- [ ] **Run PageSpeed Insights** baseline against `/`,
  `/health/bmi-calculator`, `/finance/emi-calculator`,
  `/finance/mortgage-calculator`, `/finance/sip-calculator`. Document
  scores. Re-run after the recharts dynamic-import change to verify INP
  gain.
- [ ] **Verify `/robots.txt` and `/sitemap.xml`** load on production.
- [ ] **Test 404 status** — visit `/finance/fake-calc` and confirm response
  is HTTP 404 (not 200 with redirect). Use `curl -I` or DevTools.
- [ ] **Strapi CMS audit for "CalcVerse" string.** The audit observed
  "CalcVerse" in the BMI page title — code is clean, so it must be a
  stale `pageTitle` value in the Strapi `calculator-contents` collection.
  Open Strapi admin, search every row's `pageTitle`, `metaOgTitle`,
  `metaTwitterTitle`, `metaOgSiteName` for "CalcVerse" → replace with
  "AllSmartCalculator".

### Blog content (Days 15–45)
The blog index still reads "No posts yet" because Strapi has no posts.
The audit lists 8 pillar guides; the first 4 to publish:
- [ ] "Complete Guide to EMI & Loan Calculations" (target: how to calculate emi)
- [ ] "Understanding BMI: A Practical Health Guide" (target: what is a healthy bmi)
- [ ] "Crypto Tax 2026: Reporting & Calculations" (target: crypto tax calculator)
- [ ] "Master Percentages: Math for Daily Life" (target: percentage formula)

Each: 2,500 words, FAQ section with FAQPage schema (Strapi handles this via
`customSchema`), internal links to the relevant calculators, author byline =
Ankit Gupta. Add to Strapi `posts` collection.

### Days 46–90
- [ ] **First original data study.** "What India calculated in Q1 2026" —
  needs aggregated query-volume data (turn on event tracking first).
  Pitch to Mint, Economic Times, Business Standard.
- [ ] **HARO daily, Reddit weekly.** Habit work; targets in audit Section 6.
- [ ] **Submit to 15 "best free calculators" listicles.** Target 3 placements.

### Domain & infra
- [ ] **Add Twitter handle.** `@AllSmartCalculator` is referenced in Twitter
  card meta — register the handle or change the reference in
  `src/app/layout.tsx`.
- [ ] **Set `NEXT_PUBLIC_SITE_URL` in Vercel env** for safety + correct
  preview deployments.

---

## 90-day target check

| Metric                            | Target (Jul 2026) | Where it depends on this PR                 |
|-----------------------------------|-------------------|---------------------------------------------|
| Indexed pages in GSC              | 100+              | Sitemap lists all routes ✅                  |
| Schema-marked pages               | 100% of calcs     | Every calc emits 3 JSON-LD blocks ✅         |
| Homepage Organization + WebSite   | Present           | ✅                                          |
| Core Web Vitals — % URLs passing  | 90%+              | Recharts deferred ✅; verify in PSI         |
| Per-calc full template            | Top 22+ calcs     | ✅ (vs target of "top 20")                   |
| Per-calc title + description      | 100% of calcs     | ✅                                          |
| Keywords ranking in top 10        | 8–15 (long-tail)  | Needs blog posts + remaining template fill   |
| Referring domains                 | 25–40             | Outside-the-repo (embed widget recommended)  |
| Organic clicks per day            | 300–500           | All of the above                             |
