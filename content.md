# AllSmartCalculator — Content Reference

Last extracted: 2026-04-28
Source: hardcoded content in calcverse Next.js app (excludes Strapi CMS overrides).

---

## Site-wide

### Navbar

**Logo / brand text**: AllSmartCalculator

**Desktop & mobile nav links**:
- Categories (`/categories`)
- Trending (`/trending`)
- About (`/about`)
- Blog (`/blog`)

**Action buttons**:
- Toggle theme (Sun/Moon icon)
- Search (opens search modal via Ctrl/Cmd + K)
- Menu (mobile only)

**Mobile-only currency picker label**: "Output currency"

### Footer

**Brand tagline**: 100+ beautifully crafted calculators for every life decision. Calculate anything. Beautifully.

**Column: Categories**
- Finance (`/finance`)
- Health (`/health`)
- Math (`/math`)
- Crypto (`/crypto`)
- Engineering (`/engineering`)

**Column: Explore**
- Trending (`/trending`)
- Categories (`/categories`)
- Blog (`/blog`)
- About (`/about`)
- Methodology (`/methodology`)
- Contact (`/contact`)

**Column: Legal**
- Privacy Policy (`/privacy`)
- Terms of Service (`/terms`)
- Disclaimer (`/disclaimer`)
- Author (`/author/ankit-gupta`)

**Bottom bar**:
- © {year} AllSmartCalculator. All calculations made with care.
- Built by [Ankit Gupta](https://www.linkedin.com/in/ankit-gupta-data-analyst) — say hi.

---

## Homepage

### Metadata fallbacks
- **Title**: Free Online Calculators — 101+ Tools (EMI, BMI, GPA & More) | AllSmartCalculator
- **Description**: 101+ free online calculators for finance, health, math, crypto, engineering, education and business. EMI, SIP, BMI, GST, GPA, percentage — fast, ad-free, no signup.
- **Default keywords**: free online calculators, online calculator, EMI calculator, SIP calculator, BMI calculator, GST calculator, mortgage calculator, GPA calculator, percentage calculator, crypto calculator
- **Default author**: AllSmartCalculator Team
- **OG site name**: AllSmartCalculator
- **Twitter handle**: @AllSmartCalculator

### Hero section
- **Headline (H1)**: Free Online Calculators — {TOTAL_CALCULATORS} Tools
- **Subheadline**: for Finance, Health, Math & More.
- **Description**: Premium financial, health, crypto, and scientific calculators crafted with obsessive attention to detail. Calculate anything, beautifully.
- **Below**: Category chips for all 8 categories (icon + name)

### Trending section
- **Heading**: Trending Now
- **Sub**: Most-used calculators this week
- **CTA**: View All / All

### Browse by Category section
- **Heading**: Browse by Category
- **Sub**: {TOTAL_CALCULATORS} calculators across {CATEGORIES.length} categories
- **CTA**: View All / All
- **Per-category CTA**: All {N} tools / {N}

### Most Popular section
- **Heading**: Most Popular
- **Sub**: Top calculators of all time

### Bottom CTA section
- **Headline**: Calculate Anything. Beautifully.
- **Description**: Free forever. No signups. No ads. Just beautiful calculators that work.
- **CTA button**: Explore All {TOTAL_CALCULATORS} Tools / Explore {TOTAL_CALCULATORS} Tools

### Organization JSON-LD description (also surfaced as content)
"101+ free online calculators for finance, health, math, crypto, engineering, education and business."

---

## Static pages

### /about

**Metadata fallbacks**
- Title: About — AllSmartCalculator
- Description: How AllSmartCalculator is built, who builds it, and the methodology, sources, and review process behind every calculator on the site.
- OG title: About AllSmartCalculator
- OG description: How AllSmartCalculator is built, who builds it, and the methodology behind every calculator.

**Breadcrumb**: Home › About

**H1**: I built AllSmartCalculator because math deserves better.

**Lead paragraph**: Every calculator site on the internet looks like it was built in 2008 — cluttered, ugly, ad-ridden, and painful to use on a phone. AllSmartCalculator is the opposite: clean, fast, free, ad-free, and honest about its limits. {TOTAL_CALCULATORS}+ calculators across 8 categories, all built and reviewed by one person, in public.

**Second paragraph**: The site has a particular focus on India-specific finance tools — EMI, SIP, GST, HRA, income tax, PPF, NPS — where most existing options are bank aggregators with cluttered, ad-heavy interfaces. For everything else (health, math, crypto, engineering, daily life), the bar is the same: the right formula, a clear explanation, an honest limitations section, and zero friction.

**Stats grid**:
- {TOTAL_CALCULATORS}+ — Calculators
- 8 — Categories
- $0 — Cost to use
- 0 — Ads ever

**Section: The principles**
1. **Obsessive design** — Every pixel, transition, and number is crafted with intent. No templates, no shortcuts.
2. **Blazing fast** — Sub-100ms calculations. Static pages. Zero loading states on the core work.
3. **Always free** — No paywalls, no ads, no email capture. Just great tools, available to everyone.
4. **Built in public** — Found a bug? Want a new calculator? We ship fixes fast and credit them on the page.

**Section: How we earn trust**
Intro: Calculators in finance, health, and tax can change real-world decisions. Three pages explain how we approach that responsibility.

- **Methodology** — How we pick formulas, verify outputs, and write the supporting content. Includes our full primary-source list. CTA: "Read the methodology"
- **Author** — Every calculator is built and reviewed by Ankit Gupta. Background, focus areas, and editorial principles. CTA: "About the author"
- **Disclaimer** — What our calculators are — and aren't. When to trust the number, and when to call a professional. CTA: "Read the disclaimer"

**Section: Data sources, in short**
Intro: Every calculator names its sources on the page itself. At a sitewide level, the primary references are:

- WHO and CDC for health categories and BMI cutoffs (global and Asian-specific)
- RBI for repo rate, monetary policy, and the fair-practice code on retail loans
- IT department of India for income tax slabs, HRA exemption, and Section 80 deductions
- SEBI and AMFI for mutual-fund disclosures and SIP modelling assumptions
- IRDAI for insurance regulations and rate references
- NIST and Wolfram MathWorld for scientific units and formula references

Footer: Full per-domain list: methodology page.

**Section: Built by**
- Name: Ankit Gupta
- Bio: Solo developer and data analyst. Builds, maintains, and reviews every calculator on AllSmartCalculator. Based in India; writing in English for an India-first, globally relevant audience.
- Buttons: Full author page · LinkedIn · Contact

**Contact card**:
- Heading: How to reach us
- Body: Calculator suggestion, bug report, formula correction, or general feedback — hello@allsmartcalculator.com or use the contact form. We read every message.

---

### /methodology

**Metadata fallbacks**
- Title: Methodology — How AllSmartCalculator Builds Its Calculators
- Description: How every calculator on AllSmartCalculator is built, sourced, verified, and updated — including data sources, formula references, and our review process.

**Breadcrumb**: Home › About › Methodology

**Eyebrow**: Methodology
**H1**: How we build & verify every calculator
**Lead**: AllSmartCalculator is a free public tool that touches money and health decisions — categories where being wrong has real consequences. This page is our public commitment to how we get it right, and how we tell you when we can't.
**Date stamp**: Last updated April 26, 2026

**Section: Editorial principles**
1. **Recognised formulas only** — Every calculator implements the standard, recognised formula for its domain — the same one in textbooks, official handbooks, and industry tools. We never invent shortcuts that change the answer.
2. **Cross-checked against benchmarks** — Before launch, each calculator is tested against known input/output pairs from at least one external reference (a textbook problem, a published bank EMI table, or an authoritative comparison tool).
3. **Honest about limits** — Every calculator ships with a limitations section that names what the tool can't do — it doesn't model fees, it assumes constant rates, it uses a population average. We'd rather you trust us less than misuse the result.
4. **Updated when reality changes** — Tax slabs, GST rates, repo rates, and WHO guidance all change. Calculators that depend on changing inputs carry a visible "last updated" date and are reviewed against the source at least annually — and immediately when the source changes.

**Section: How a calculator gets built**
1. **Pick the formula.** We start from a single recognised source — a textbook, an official regulator handbook, or a peer-reviewed reference — and use exactly the formula it specifies. No averaging across sources, no undocumented adjustments.
2. **Implement and unit-test.** The formula is implemented in TypeScript and unit-tested against worked examples from the source. For finance calculators we additionally verify outputs against at least one major Indian bank's published EMI table or one official mutual-fund projection. Discrepancies of more than 0.5% are investigated before launch.
3. **Write the explainer.** Every calculator ships with a plain-language explanation of the formula, a worked example, a categories or ranges table where applicable, a frank limitations section, and 4–8 FAQs. The goal is that the calculator alone should be enough to understand the topic; the page should not require a textbook on the side.
4. **Add structured data.** Each page emits JSON-LD for WebApplication, BreadcrumbList, and — where FAQs are present — FAQPage. This is what allows results to appear with rich snippets in search and to be cited cleanly in AI Overviews and assistants.
5. **Date-stamp and review.** Every calculator carries a visible "last updated" date and is reviewed against its source at least annually. Tax-slab, repo-rate, and GST-rate dependent calculators are reviewed immediately whenever the source changes.

**Section: Primary sources**

*Indian finance & tax*
- RBI — repo rate, monetary policy, fair-practice code (https://www.rbi.org.in/)
- IT department of India — tax slabs (new & old regime) (https://www.incometax.gov.in/iec/foportal/)
- SEBI — mutual funds, investor protection (https://www.sebi.gov.in/)
- IRDAI — insurance regulations and rates (https://www.irdai.gov.in/)
- GSTN — GST rates and council updates (https://www.gst.gov.in/)

*Health*
- WHO — BMI classifications (global and Asian-specific) (https://www.who.int/)
- CDC — adult BMI, calorie needs, growth charts (https://www.cdc.gov/)
- ICMR — Indian dietary and nutrition guidelines (https://www.icmr.gov.in/)

*Math, engineering & general*
- NIST — units, constants, scientific reference (https://www.nist.gov/)
- Wolfram MathWorld — formula reference (https://mathworld.wolfram.com/)

**Corrections policy**
If you spot a wrong number, a misapplied formula, or an outdated reference, we'd much rather hear about it than not. Email hello@allsmartcalculator.com with the calculator URL, the inputs you used, and the expected result.

Confirmed corrections ship within 48 hours. Material corrections (anything that would have changed a user's decision) are noted on the calculator page itself, with the date of the change.

**CTAs**: About AllSmartCalculator · Read the disclaimer

---

### /author/ankit-gupta

**Metadata fallbacks**
- Title: Ankit Gupta — Builder of AllSmartCalculator
- Description: Ankit Gupta is a solo developer and data analyst who builds, maintains, and reviews every calculator on AllSmartCalculator. Background, focus areas, and how to reach him.
- OG type: profile

**Breadcrumb**: Home › About › Ankit Gupta

**Eyebrow**: Author
**H1**: Ankit Gupta
**Subhead**: Solo developer and data analyst. Builds, maintains, and reviews every calculator on AllSmartCalculator. Based in India; writing in English for an India-first, globally relevant audience.
**Buttons**: LinkedIn · Contact

**Person JSON-LD knowsAbout**:
- Personal finance calculators
- EMI and amortization
- SIP and compound interest
- BMI and health screening tools
- Indian income tax (new regime, old regime, HRA)
- Web performance and SEO

**Section: About**
Para 1: I started AllSmartCalculator because the existing calculator hubs online — even the most popular ones — feel like they were built in 2008: cluttered, ad-ridden, and painful to use on a phone. I wanted a calculator site that respected the reader: clean design, fast response, no dark patterns, no email walls.

Para 2: I write or review every calculator that ships. That includes the math (cross-checking each formula against textbook sources and published references), the explanatory content alongside it, and the limitations section that tells you when not to trust the number. For India-specific finance tools — EMI, SIP, GST, HRA, income tax — I use official sources (RBI, IT department, SEBI) and make assumptions explicit.

Para 3: I'm not a CA, a doctor, or a registered financial advisor. The calculators on this site are honest tools for thinking, not substitutes for professional advice. The disclaimer is worth reading; the methodology page explains how I build and verify each tool.

**Section: Areas of focus**
- **Calculator design & verification** — Implements every formula on AllSmartCalculator, cross-checks results against textbook references and industry tools, and writes the explanatory content that goes with each calculator.
- **Web engineering** — Builds the site end-to-end: Next.js app router, TypeScript, Tailwind, and a Strapi CMS for the editorial layer. Focused on speed, accessibility, and Core Web Vitals.
- **Data & finance literacy** — Background as a data analyst, with day-to-day work in personal finance topics — EMI structures, SIP modelling, Indian tax slabs, and household budgeting.

**Section: How I work**
- **Sources first.** Every formula links back to a recognised source: WHO for BMI, RBI for repo rate, IT department for tax slabs, SEBI for mutual-fund disclosures.
- **Show the math.** Every calculator pairs the formula with a worked example. The result is never a black box.
- **Be honest about limits.** Every calculator has a limitations section. If a tool can't tell you something important, that's said up front.
- **Fix in public.** Found a bug, a wrong formula, or outdated tax slabs? Email me — corrections ship fast and are noted on the page.

**CTAs**: Read the methodology · Browse all calculators

---

### /privacy

**Metadata fallbacks**
- Title: Privacy Policy — AllSmartCalculator
- Description: Here's exactly what we do (and don't do) with any information you might share with us.

**Eyebrow**: Legal
**H1**: Privacy Policy
**Lead**: Here's exactly what we do (and don't do) with any information you might share with us. Written in plain language, because privacy policies shouldn't require a law degree to understand.
**Date stamp**: Last updated April 18, 2026

**Section: The short version**
- Para 1: All calculations on AllSmartCalculator happen directly in your browser. The numbers you enter — your salary, weight, loan amount, whatever — never leave your device. We don't store them, we don't see them, and we can't access them. That's not a marketing claim; it's how the site is technically built.
- Para 2: What we do collect is basic analytics (pages visited, device type, country) so we know which calculators people find useful and where to improve. If we ever run ads on the site, those ad networks collect their own data under their own policies. We don't sell your data, we don't email you unless you ask us to, and we don't use dark patterns to trick you into anything.
- Para 3: If you want the detailed version, keep reading. If you just wanted to know we aren't creepy, that was it.

**Section: What information we collect**
- **Calculator inputs: Nothing.** Every calculator on AllSmartCalculator runs entirely in your browser using JavaScript. When you move a slider or type a number, only your device sees it. The numbers never get sent to our servers because our servers don't need them.
- **Analytics data.** We use analytics to understand which pages people visit, how long they spend, and which calculators are popular. This includes your approximate location (country/region, not address), device type, browser, and the pages you view. This data is aggregated and doesn't identify you personally.
- **Contact form submissions.** If you email us or submit a contact form, we obviously have your email address and whatever you wrote. We use it only to respond to your message and don't add you to any marketing lists.
- **Cookies.** We use minimal cookies — mostly for remembering your preferences (currency setting, recently used calculators) and for analytics. If you disable cookies, the site still works; you just lose the personalization.

**Section: Third-party services we use**
Intro: Being transparent about this matters. Here's who we work with and why.

- **Hosting.** The site is hosted on cloud infrastructure (such as Vercel or similar). When you visit, standard server logs record your IP address and user agent — this is industry-standard and required for the site to function. These logs are rotated regularly.
- **Analytics.** We may use privacy-respecting tools like Plausible or Fathom to understand site usage. These tools may set cookies and collect anonymized usage data. We prefer tools that don't fingerprint or identify individual users.
- **Advertising.** We may use Google AdSense to display ads on AllSmartCalculator. Google AdSense uses cookies to show relevant ads based on your visits to this and other websites. These networks use cookies to show relevant ads and measure performance. You can control personalized advertising through your browser settings or by visiting Google Ads Settings or YourAdChoices.com.
- **Fonts and icons.** We load fonts from Google Fonts. When your browser fetches those fonts, Google's servers see your IP address — that's just how the web works. We don't load trackers or ad scripts from third parties beyond what's described above.

**Section: How we use your data**
Intro: Short list, because we don't do much with it:

- Improve the site based on what calculators people actually use
- Fix bugs and performance issues when we see them in analytics
- Respond to emails and support requests
- Show ads (if we have them) and measure whether they work
- Comply with legal obligations if we're ever legally required to

What we don't do: sell your data, share it with data brokers, send you spam emails, or build profiles to track you across the web. That's not a business we want to be in.

**Section: Advertising and personalization**
- Para 1: If AllSmartCalculator runs ads, here's what you should know: ad networks like Google AdSense use cookies to serve ads based on your previous visits to our site and other websites. This is called "personalized advertising" and is standard across most of the web.
- Para 2: You can opt out of personalized advertising from Google by visiting Google Ads Settings. For opt-outs from other networks, visit aboutads.info/choices (US) or youronlinechoices.com (EU).
- Para 3: Opting out means you'll still see ads, but they won't be personalized based on your browsing history. Many people prefer this; it's your call.

**Section: Your rights (GDPR, CCPA, and others)**
Intro: Depending on where you live, you have legal rights over your data. Even though we collect very little, these still apply:

- **Access**: Ask what data we have about you (usually: nothing identifiable, beyond server logs).
- **Deletion**: Ask us to delete your data. We'll comply within 30 days.
- **Correction**: If we have incorrect data about you, you can ask us to fix it.
- **Portability**: Request a copy of your data in a portable format.
- **Opt-out**: Disable analytics and advertising cookies anytime through your browser settings.

To exercise any of these rights, email us through the contact page. We don't ask for extensive verification — just tell us what you'd like and we'll handle it.

**Section: Children's privacy**
AllSmartCalculator is intended for general audiences and is not specifically directed at children under 13. We don't knowingly collect personal information from children under 13. If you're a parent and believe your child has provided us with personal information, contact us and we'll delete it promptly.

**Section: Security**
- Para 1: We use standard security practices: HTTPS across the entire site, secure hosting, and minimal data collection — the best security is not having the data in the first place.
- Para 2: No system is perfectly secure, but because we don't store your calculator inputs or collect personal information beyond basic analytics, even a worst-case breach would expose very little about you.

**Section: Changes to this policy**
- Para 1: If we update this privacy policy, we'll change the "last updated" date at the top of the page. For significant changes that affect how we handle your data, we'll do our best to notify users — most likely through a banner on the site.
- Para 2: We recommend checking back occasionally if privacy matters to you, though honestly, our privacy practices aren't the kind of thing that changes often.

**Section: Contacting us**
If you have any questions about this privacy policy, or about how we handle data, get in touch through our contact page. We read every message and respond within a few business days.

---

### /terms

**Metadata fallbacks**
- Title: Terms of Service — AllSmartCalculator
- Description: The rules of using AllSmartCalculator. Straightforward, fair, and written like a normal human wrote them.

**Eyebrow**: Legal
**H1**: Terms of Service
**Lead**: These aren't written to protect us from you. They're written to be honest about what AllSmartCalculator is — and what it isn't. Plain language, no gotchas.
**Date stamp**: Last updated April 18, 2026

**Section: The short version**
- Para 1: AllSmartCalculator is a free collection of browser-based calculators. You can use them for personal, educational, or professional purposes. The results are mathematical estimates — not financial, medical, or legal advice. Don't copy our product wholesale and call it your own, don't scrape the site aggressively, and don't use it for anything illegal. That's really it.
- Para 2: If you want the full legal detail on each of those points, it's all below. Nothing in these terms is designed to surprise you.

**Section: What AllSmartCalculator is**
- **A free, browser-based tool.** AllSmartCalculator is a collection of calculators covering finance, health, math, crypto, engineering, and everyday life. There's no subscription, no account required, and no paywall. You open it, use it, and leave — or explore. Either way, you're welcome here.
- **Not a financial or professional service.** AllSmartCalculator is an educational and reference tool. It is not a bank, an investment platform, a medical service, or a licensed advisory service of any kind. The numbers it produces are a starting point for thinking, not a substitute for professional judgment.
- **Not affiliated with third-party institutions.** Results from our EMI calculator, compound interest calculator, or any other tool do not represent quotes, offers, or guarantees from any financial institution. Always verify with the actual provider before making any financial commitment.

**Section: Using the site**
- **What you're allowed to do.** Use AllSmartCalculator freely for personal, academic, or professional purposes. Share links to specific calculators. Reference our outputs in your own notes, reports, or documents. We're glad the tools are useful.
- **What you're not allowed to do.**
  - Copy our calculators wholesale and publish them as your own product without permission
  - Scrape the site in a way that degrades performance or disrupts other users
  - Use AllSmartCalculator for anything illegal under applicable law
  - Attempt to reverse engineer, tamper with, or compromise the site's infrastructure
  - Use our branding, name, or logo in a way that implies affiliation or endorsement without prior agreement
- **Embedding and linking.** You may link to AllSmartCalculator calculators from your own site, blog, or app. If you want to embed a calculator directly or partner in some other way, get in touch — we're open to conversations about that.

**Section: Calculator results and accuracy**
- **Results are estimates, not guarantees.** Every number AllSmartCalculator produces is a mathematical result based on the inputs you provide and the assumptions embedded in each formula. The EMI calculator gives you a figure, not a guarantee from your bank. The BMI calculator gives you a number, not a medical diagnosis. Real-world outcomes will differ based on factors no general-purpose calculator can anticipate.
- **Formula quality.** We put genuine care into the formulas we use. They're based on standard, recognised methods and verified against known benchmarks. That said, no implementation is perfectly infallible, and the right formula for one context isn't always the right formula for another. If you find something that looks wrong, please tell us — we'd rather be corrected than quietly wrong.
- **Inputs are your responsibility.** The quality of any result depends on the quality of the inputs. Garbage in, garbage out — that's not a criticism, it's just math. We don't validate whether the numbers you enter reflect your actual situation.

**Section: Not professional advice**
Intro: AllSmartCalculator does not provide financial, medical, legal, tax, or any other kind of professional advice. This point matters enough that it gets its own section.

- **Finance**: If you're taking out a mortgage, planning retirement, evaluating a business, or making any significant financial decision — please talk to a qualified financial advisor or accountant who understands your full picture.
- **Health**: A conversation with a doctor is worth more than any algorithm. AllSmartCalculator's health tools are awareness aids, not diagnostics.
- **Legal**: Nothing on this site is legal advice. For anything with real legal implications, consult a lawyer.
- **Tax**: Tax rules vary by jurisdiction and change regularly. Our tax tools give ballpark figures. File with a professional or qualified software, not just our estimate.

Closing: We genuinely believe our calculators are useful. Useful and sufficient are not the same thing.

**Section: Intellectual property**
- **What's ours.** The AllSmartCalculator name, logo, visual design, and written content are our intellectual property. You're welcome to quote or reference us with attribution, but don't replicate our branding or content in a way that implies ownership or official affiliation.
- **What's not ours.** The underlying math formulas are in the public domain — you can't copyright a formula. We don't claim ownership of standard financial or scientific methods. What we've built around them is a different matter.
- **Partnerships and collaborations.** If you want to write about us, reference us in a product, or explore a collaboration, we're open to talking. Just get in touch before using our name or logo in any commercial context.

**Section: Availability and uptime**
- Para 1: We try to keep AllSmartCalculator running reliably. But servers go down, bugs happen, and sometimes we need to take things offline to ship improvements. We don't guarantee uptime and we're not liable for losses that result from the site being unavailable.
- Para 2: If we're doing planned maintenance that will take the site offline for any meaningful stretch, we'll try to communicate it in advance — a banner on the site or a note on our social channels. Unexpected outages obviously can't be predicted, but we'll always work to resolve them quickly.

**Section: Limitation of liability**
- Para 1: To the extent permitted by applicable law, AllSmartCalculator and its operators are not liable for any damages arising from your use of — or inability to use — this site. That includes direct, indirect, incidental, or consequential damages.
- Para 2: We've built this carefully and in good faith, but we're a free tool, not an insured financial service. The practical implication is simple: don't make high-stakes decisions — financial, medical, or otherwise — based solely on what a free web calculator tells you.
- Para 3: If a country or jurisdiction doesn't allow the exclusion of certain warranties or the limitation of liability for damages, the above may not apply to you in full. In those cases, our liability is limited to the maximum extent permitted by law.

**Section: Third-party links and services**
- Para 1: AllSmartCalculator may contain links to external websites or reference external services (like exchange rate providers, regulatory bodies, or financial tools). We link to these because they're useful, not because we endorse everything they do.
- Para 2: We're not responsible for the content, accuracy, or practices of any third-party site. When you leave AllSmartCalculator, the other site's terms and privacy policies apply.

**Section: Changes to these terms**
- Para 1: We might update these terms as the product evolves. When we do, we'll update the "last updated" date at the top of this page. If something significant changes — something that materially affects your rights or how we operate — we'll try to communicate it more directly, likely through a banner on the site.
- Para 2: Continuing to use AllSmartCalculator after we update these terms means you're okay with the changes. If you're not, you can stop using the site — no hard feelings.

**Section: Governing law and disputes**
- Para 1: These terms are governed by applicable law in the jurisdiction where AllSmartCalculator operates. If there's ever a dispute, we genuinely prefer to resolve it by talking first — most things can be sorted out without escalation.
- Para 2: Reach us at hello@allsmartcalculator.com. We read every message and take them seriously.

---

### /disclaimer

**Metadata fallbacks**
- Title: Disclaimer — AllSmartCalculator
- Description: Important context about AllSmartCalculator calculator results — what they mean, what they don't, and when to go beyond them.

**Eyebrow**: Legal
**H1**: Disclaimer
**Lead**: Calculators are powerful thinking tools. Here's what ours can — and can't — do for you.
**Date stamp**: Last updated April 18, 2026

**Section: The quick summary**
- Para 1: AllSmartCalculator results are mathematical estimates for informational use only. They are not financial, medical, legal, or professional advice of any kind. For decisions that genuinely matter — taking out a loan, managing a health condition, filing taxes — verify your numbers with a qualified professional who understands your full situation.
- Para 2: We've built these calculators carefully and we believe they're useful. But useful and sufficient aren't the same thing. This page explains exactly where the line is.

**Section: Numbers are a starting point, not an endpoint**
- **How our calculators work.** Every calculator on AllSmartCalculator takes inputs you provide and runs them through a formula. The output is a mathematical result — not a prediction, not a promise, and not personalised advice. Change the inputs and you'll change the answer. That's how math works.
- **What affects real-world outcomes.** Real outcomes depend on factors that no general-purpose calculator can account for: your specific circumstances, changing market conditions, institutional terms, regulatory rules, and countless other variables. Our output is a model, not a mirror of reality.
- **How to use results well.** Use our numbers to build intuition, compare scenarios, and prepare for conversations with professionals — not to make final decisions on your own. An AllSmartCalculator result that makes you ask better questions has done its job.

**Section: Financial calculators**
- **What they cover.** Our finance section includes tools for loans, EMI, compound interest, investments, savings goals, retirement projections, tax estimates, and more. These can be genuinely useful for planning and comparison — but they're based on simplified models with assumptions baked in.
- **What they can't account for.**
  - Loan products include fees, insurance, prepayment penalties, and terms that no general calculator can anticipate
  - Investment returns depend on markets that don't move in straight lines — past performance does not predict future performance
  - Tax figures depend on jurisdiction-specific rules that change regularly and interact with your specific income situation
  - Retirement projections assume constant returns and don't model sequence-of-returns risk or inflation variance
- **Our recommendation.** Treat these results as educated ballpark figures, not quotes or guarantees. Before taking out a loan, making a significant investment, or filing anything tax-related, speak with a qualified financial advisor or accountant.

**Section: Health calculators**
- **What they cover.** Our health tools calculate BMI, calorie needs, heart rate zones, ideal body weight, water intake, sleep recommendations, pregnancy timelines, and more. These are useful for building awareness and setting rough starting points.
- **The limitations you should know.**
  - BMI is a population-level screening tool with well-documented limitations when applied to individuals — it doesn't account for muscle mass, bone density, or body composition
  - Calorie calculators give estimates based on population averages; your actual metabolism depends on factors no formula fully captures
  - Heart rate zones are approximations — individual variation is significant and exercise tolerance is personal
  - Sleep and hydration recommendations are general guidelines, not personalised prescriptions
- **Not a medical assessment.** Nothing on AllSmartCalculator replaces a conversation with a doctor, dietitian, or other qualified health professional — especially if you're managing a health condition, pregnant, or making a decision with real health consequences.

**Section: Currency exchange rates**
- **How our rates work.** The currency converter uses reference rates that are updated periodically. These are indicative figures intended for rough comparison and general awareness — not live, real-time interbank rates.
- **What our rates are not.**
  - Not the rate you'll get from your bank — banks add a spread
  - Not the rate your credit card will charge — card networks have their own conversion fees
  - Not the rate at an airport currency exchange — often the worst rates available
  - Not suitable for finalising international business transactions or contract valuations
- **Best use.** Use the converter for rough comparisons, travel budgeting, and getting a general sense of value. For actual transactions, always check the rate directly with your bank or payment provider at the time of the transaction.

**Section: Crypto and investment calculators**
- **Scenarios, not forecasts.** Calculators in this section help you model what-if scenarios — what $1,000 might grow to at a given annual return, what a DCA strategy looks like over time, and so on. These are arithmetic exercises, not predictions. The calculator has no idea what markets will actually do.
- **Past performance disclaimer.** Past performance of any asset — including cryptocurrencies, stocks, or indices — does not predict future performance. A calculation that shows your investment doubling at 15% annual growth is showing you the math of that scenario, not the likelihood of it happening.
- **Crypto-specific risks.** Crypto markets are highly volatile, operate 24/7, are largely unregulated in many jurisdictions, and can move dramatically in short periods. These calculators do not model risk — they model growth. Never invest more than you can afford to lose, and be sceptical of any tool (including ours) that makes this seem simple.

**Section: Engineering and scientific calculators**
- **Appropriate uses.** Our engineering tools are suitable for learning, coursework, estimation, and preliminary calculation. They're useful for developing intuition about how systems behave and for checking ballpark figures before doing more rigorous analysis.
- **Not for safety-critical decisions.** These tools should not be used as the sole basis for any engineering decision where safety is involved. Load calculations, electrical specifications, structural assessments, fluid systems — any real-world application that matters needs to be verified by a licensed engineer using appropriate professional tools, codes of practice, and safety factors.
- **Unit assumptions.** We clearly indicate units where applicable, but always double-check that your inputs match the expected units. Unit errors are one of the most common sources of calculation mistakes in practice.

**Section: Formula accuracy and error reporting**
- **How we build our calculators.** We implement standard, recognised formulas for each calculator — the same methods used in textbooks, industry tools, and academic references. Results are cross-checked against known benchmarks and tested for edge cases before release.
- **We can still be wrong.** Formulas can be implemented with subtle errors. Assumptions that hold in one context don't always hold in another. We're not infallible, and we don't pretend to be. If something looks wrong to you, trust that instinct — check it, and then tell us.
- **How to report an issue.** If you find a result that looks incorrect or a formula that seems to be misapplied, please contact us at hello@allsmartcalculator.com. We take these reports seriously and would much rather fix a mistake than leave it quietly in place.

**Section: The bottom line**
- Para 1: Use AllSmartCalculator to learn, explore, stress-test your assumptions, and get a feel for numbers. Use professionals when the stakes are real.
- Para 2: We genuinely believe the calculators here are useful — that's why we built them, and why we keep improving them. But there's a meaningful difference between a tool that helps you think and a service that tells you what to do. We're the former. Please treat us that way.
- Para 3: If you have any questions about how a specific calculator works or what assumptions it makes, get in touch. We're happy to explain the methodology behind any tool on the site.

---

### /contact

**Eyebrow**: Contact
**H1**: Get in touch
**Lead**: We genuinely read every message. Whether you found a bug, want to suggest a calculator, or just have feedback — we'd love to hear from you. We usually respond within a couple of business days.

**Category selector cards**:
- **Report a bug** — Something broken or giving wrong results?
- **Suggest a calculator** — Got an idea for a new tool we should build?
- **General feedback** — Comments, questions, or just want to say hi?
- **Legal or privacy** — Questions about data, terms, or rights?

**Form labels & placeholders**:
- Your name — "How should we address you?"
- Email address — "you@example.com"
- Subject — "A one-line summary"
- Message — "Tell us what's on your mind. Specific details help — which calculator, what you expected, what happened, etc."
- Submit button: "Send message" (sending state: "Sending…")
- Footer note: "By submitting, you agree to our privacy policy. We'll only use your info to respond."

**Sent state**:
- Heading: Message sent
- Body: Thanks for reaching out. We'll get back to you at {email} within a couple of business days.
- Reset link: "Send another message"

**Bottom info cards**:
- **Prefer email?** — You can reach us directly at the address below. We read everything. (hello@allsmartcalculator.com)
- **Response time** — We aim to respond within 2–3 business days. If it's urgent or about a broken calculator affecting many users, we usually get to it faster.

---

### /blog

**Metadata**
- Title: Blog — AllSmartCalculator
- Description: Practical guides on finance, health, math, and crypto — written to help you get more out of every calculation.

**Eyebrow**: Blog
**H1**: Tips & Insights
**Lead**: Practical guides on finance, health, math, and more — written to help you get more out of every calculation.

**Section labels**:
- Featured
- Latest / All Posts

**Empty state**:
- Heading: No posts yet
- Body: Check back soon — we're working on the first articles.

**Post card meta**: Category badge, "Featured" tag (if showOnHome), author name (default "AllSmartCalculator Team"), read time in min, publication date.

---

### /categories

**Metadata**
- Title: All Categories — AllSmartCalculator
- Description: Browse 100+ free calculators across 8 categories — Finance, Health, Math, Crypto, Engineering, Daily Life, Education, and Business.

**H1**: All Calculators
**Lead**: {N} tools organized by category. Jump to any section.

**Per-category subhead format**: {category description} · {N} tools

(Sticky chip-row of all 8 categories at top.)

---

### /trending

**Metadata**
- Title: Trending Calculators — AllSmartCalculator
- Description: The most-used calculators right now — EMI, SIP, BMI, mortgage, compound interest, and more. Updated continuously.

**Live status pill**: "Updated Live"
**H1**: Trending Now
**Lead**: Real-time leaderboard of what people are calculating right now.

**Section: Hot This Week** (with flame emoji prefix)
**Section: All-Time Leaderboard**
- Each row shows: rank (zero-padded), calculator name, description, usage count, "uses" label.

---

### /search

**Metadata (dynamic)**
- Title (with query): "{q}" — Search Results | AllSmartCalculator
- Title (empty): Search Calculators | AllSmartCalculator
- Description (with query): Search results for "{q}" across 100+ free calculators on AllSmartCalculator.
- Description (empty): Search 100+ free calculators across finance, health, math, crypto, engineering, daily life, education, and business.

**Breadcrumb**: Home › Search

**Eyebrow**: Search
**H1 (with query)**: Results for "{q}"
**H1 (empty)**: Search calculators
**Lead (with query)**: {N} calculator(s) match your query.
**Lead (empty)**: Use the search bar (Ctrl/⌘ + K) to find any of our 100+ calculators by name, category, or keyword.

**Empty state card (no results)**:
- Heading: No calculators matched
- Body: Try a broader keyword (e.g. "loan", "BMI", "GST") or browse all calculators by category.
- CTA: Browse all categories

**Empty state card (no query)**:
- Heading: Start by typing a query
- Body: Open the search modal with Ctrl + K, or browse by category to find what you need.
- CTA: Browse all categories

---

## Categories

Source: `src/lib/calculator-types.ts` — `CATEGORIES` array (icons/colors omitted).

| ID | Name | Description |
|----|------|-------------|
| `finance` | Finance | Loans, investments, taxes, and money |
| `health` | Health | BMI, calories, fitness and wellness |
| `math` | Math | Scientific, statistical, and calculus |
| `crypto` | Crypto | Bitcoin, staking, DeFi and trading |
| `engineering` | Engineering | Electrical, mechanical, and civil |
| `daily-life` | Daily Life | Tips, travel, cooking and more |
| `education` | Education | GPA, grades, and study tools |
| `business` | Business | ROI, margins, and SaaS metrics |

---

## Calculators


### Finance

(category description: Loans, investments, taxes, and money)

#### Currency Converter (`currency-converter`)
- **Short name**: Currency
- **Description**: Convert between 30 major world currencies instantly with reference rates — see the converted amount, exchange rate, and inverse rate.
- **Intro**: A currency converter takes an amount in one currency and translates it to another using the current exchange rate. This calculator covers 30 major world currencies with reference rates updated periodically. Reference rates are accurate for budgeting, comparison, and travel planning — but they are not the rate you will get from your bank, credit card, or airport kiosk. Banks add a spread of 0.5–3%, cards add 1–3% conversion fees plus the network mid-rate, and airport exchanges are routinely 5–10% worse than reference. Use this tool to know the real value; use your bank or a service like Wise to actually transfer.
- **Formula**: `converted = amount × (rate_to ÷ rate_from)`
- **How it works**: All rates are quoted against USD as the base. To convert from currency A to currency B, the calculator divides by A's USD rate and multiplies by B's USD rate. ₹1 lakh ÷ 83.4 (USD/INR) × 0.91 (USD/EUR) = ~€1,090. The inverse rate is just 1 divided by the forward rate, so 1 EUR = roughly 1.10 USD = ₹91. For real transactions, expect a 1–3% premium over the reference rate.
- **Ranges — Typical retail currency-conversion costs (April 2026)**:
  | Label | Range | Note |
  |-------|-------|------|
  | Reference / mid-market rate | 0% spread | What this calculator returns; what banks see |
  | Multi-currency cards (Wise, Revolut) | 0.3 – 0.8% | Closest to mid-market for retail |
  | Standard credit card abroad | 1.5 – 3.0% | Visa/Mastercard add ~1%, bank adds 1–2% |
  | Indian bank wire (SWIFT) | 0.5 – 1.5% + flat fee | Plus correspondent bank fees |
  | Airport currency exchange | 5 – 10% | Worst rates in retail; avoid |
  | Hotel front-desk exchange | 8 – 15% | Even worse than airport — only as last resort |
- **Limitations**:
  - Rates are reference rates updated periodically — they are not live interbank rates. For a transaction worth investigating in detail, check the rate at the moment of execution with your provider.
  - Rates do not include fees, spreads, or markups. Your bank will quote a worse rate; expect 1–3% above reference for cards, 0.5–1.5% for good remittance providers, 5%+ for airport exchanges.
  - Doesn't handle cryptocurrency conversions. Use the dedicated crypto-to-USD calculator for those.
  - For business invoicing and contract valuations, use the official RBI reference rate (for Indian rupees) or the ECB reference rate (for euros) on the relevant invoice date — not a retail converter.
- **FAQs**:
  - **Q**: Where do these exchange rates come from?
    **A**: They are reference (mid-market) rates updated periodically. Mid-market rate is the midpoint between the buy and sell rates banks use among themselves — it is the "true" rate before any retail markup.
  - **Q**: Why is the bank rate different from this calculator?
    **A**: Banks add a margin (typically 1–3% for retail) on top of the mid-market rate. Credit-card networks like Visa/Mastercard add ~1%, and your bank usually adds another 1–2%. The total spread between the rate you see here and what your bank charges is the bank's revenue.
  - **Q**: What is the cheapest way to convert currency?
    **A**: For travel: a multi-currency card from Wise, Revolut, or Niyo (in India) — usually 0.3–0.8% above mid-market. For one-time large transfers: Wise or OFX for retail; SWIFT wire for institutional. Avoid airport kiosks and hotel exchanges — they're the worst rates retail customers see.
  - **Q**: How often are these rates updated?
    **A**: Reference rates here are updated periodically and reflect recent market levels. For minute-by-minute trading rates, use a currency-trading platform. For most planning purposes (travel budgets, invoice estimates) the rates here are accurate within ±1%.
  - **Q**: Can I use this for invoices and tax filing?
    **A**: For directional reference, yes. For official filings, no — use the RBI reference rate (India), ECB reference rate (Eurozone), or your tax authority's prescribed rate on the transaction date. Tax authorities will not accept retail-converter rates.
- **SEO title**: Currency Converter: 30 World Currencies, Live Rates
- **SEO description**: Free currency converter for 30 major world currencies including USD, EUR, GBP, INR, JPY, AUD. See live conversion, exchange rate, and inverse rate.
- **Sources**:
  - [RBI — reference rates](https://www.rbi.org.in/Scripts/ReferenceRateArchive.aspx)
  - [ECB — euro reference rates](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### EMI Calculator (`emi-calculator`)
- **Description**: Calculate Equated Monthly Instalments for home, personal, car, and education loans — with interest split and total payable.
- **Intro**: EMI (Equated Monthly Instalment) is the fixed monthly payment a borrower makes to repay a loan over a chosen tenure. Each EMI is split between interest and principal: in the early years most of it goes to interest, and the principal share grows as the balance falls. Use this calculator to compare loan amounts, tenures, and rates side-by-side before you sign — change any slider to see how the monthly outflow and the total interest paid both move.
- **Formula**: `EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)`
- **How it works**: P is the loan principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the tenure in months (years × 12). For a ₹50 lakh home loan at 8.5% over 20 years, r = 0.0070833 and n = 240, giving an EMI of about ₹43,391. Over the full tenure you pay roughly ₹1.04 crore — about ₹54 lakh of which is interest. Stretching the tenure lowers the EMI but raises total interest sharply; shortening it does the opposite.
- **Ranges — Typical EMI rate brackets in India (April 2026)**:
  | Label | Range | Note |
  |-------|-------|------|
  | Home loan (salaried) | 8.35% – 9.50% p.a. | Repo-linked; ranges by bank, CIBIL, and LTV |
  | Home loan (self-employed) | 8.75% – 10.25% p.a. | Slightly higher risk loading |
  | Loan against property | 9.00% – 12.50% p.a. | Secured but priced above home loans |
  | Car loan (new) | 8.75% – 11.50% p.a. | Lower for select manufacturers |
  | Personal loan | 10.50% – 22.00% p.a. | Unsecured; CIBIL-driven |
  | Education loan (India) | 8.30% – 13.50% p.a. | Public-sector banks at the lower end |
- **Limitations**:
  - This calculator uses a simple reducing-balance EMI formula. It doesn't model processing fees, GST on those fees, prepayment penalties, late-payment charges, or insurance premiums that lenders sometimes bundle in.
  - It assumes the interest rate stays fixed for the whole tenure. Floating-rate loans (most home loans in India) reset whenever the RBI repo rate or the bank's spread changes, so your real EMI can move.
  - Loan eligibility is not the same as the EMI number. Banks typically cap your total EMIs at 40–50% of net monthly income, and they look at credit score, employer category, and existing obligations.
  - Prepayment changes everything. A single lump-sum prepayment in year 3 of a 20-year loan can cut total interest by 15–25% — model it separately if you plan to.
- **FAQs**:
  - **Q**: How is EMI calculated in India?
    **A**: Indian banks use the same standard EMI formula: EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where P is the principal, r is the monthly interest rate, and n is the number of months. The result is your fixed monthly outflow on a reducing-balance loan.
  - **Q**: What's the EMI for a ₹50 lakh home loan at 8.5% for 20 years?
    **A**: About ₹43,391 per month. Total payable over 20 years is roughly ₹1.04 crore — of which ₹54 lakh is interest and ₹50 lakh is principal. Plug your own amount, rate, and tenure into the calculator above to see the exact split.
  - **Q**: Does paying more EMIs reduce interest?
    **A**: Paying more than the EMI in any month is treated as a partial prepayment and goes directly to the principal, which cuts the interest you pay over the rest of the loan. Even small extra payments early in the tenure compound into large interest savings.
  - **Q**: Can I change my EMI mid-tenure?
    **A**: Yes — most Indian banks let you raise the EMI (which shortens the tenure) or extend the tenure (which lowers the EMI) once a year on home loans. Personal loans are usually fixed for the full tenure.
  - **Q**: Is the EMI from this calculator the same as what my bank will quote?
    **A**: It will be very close on the math, but bank quotes often include processing fees (0.25–1% of the loan), GST on those fees, and sometimes insurance. Use this number as the headline EMI; ask the bank for the all-in monthly outflow before you sign.
  - **Q**: Mortgage calculator vs EMI calculator — what's the difference?
    **A**: Functionally the same math. 'EMI calculator' is the term used in India and South Asia for any reducing-balance instalment loan. 'Mortgage calculator' is the US/UK term and usually focuses on home loans, often adding property tax and insurance lines. The core monthly principal-and-interest figure is identical.
- **SEO title**: EMI Calculator — Home, Personal, Car & Education Loan EMIs
- **SEO description**: Free EMI calculator for home, personal, car, and education loans. See your monthly EMI, total interest, and full payment split with the standard reducing-balance formula.
- **Sources**:
  - [RBI — current repo rate & policy](https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx)
  - [RBI — fair-practice code for retail loans](https://www.rbi.org.in/Scripts/NotificationUser.aspx)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### SIP Calculator (`sip-calculator`)
- **Description**: Project the future value of a Systematic Investment Plan — see how a fixed monthly contribution compounds over years.
- **Intro**: A SIP (Systematic Investment Plan) is a way to invest a fixed amount in a mutual fund every month, automatically. Two things make it powerful: rupee-cost averaging (you buy more units when prices are low and fewer when they're high) and compounding (your gains start earning their own gains). This calculator projects the future value of a SIP using the standard FV-of-annuity formula, with returns compounded monthly. Move the sliders to compare time horizons, contribution sizes, and expected returns — equity SIPs in India have averaged 11–13% over rolling 10-year windows.
- **Formula**: `FV = P × [((1 + r)ⁿ − 1) ÷ r] × (1 + r)`
- **How it works**: P is your monthly contribution, r is the expected monthly return (annual rate ÷ 12 ÷ 100), and n is the number of months. The formula assumes you invest at the start of each month. ₹10,000 a month for 20 years at 12% p.a. grows to roughly ₹99 lakh — of which ₹24 lakh is what you put in and ₹75 lakh is compound returns. Doubling the tenure from 10 to 20 years more than quadruples the corpus, which is why "start early" matters more than "invest more."
- **Ranges — Realistic long-term return ranges (Indian equity SIPs)**:
  | Label | Range | Note |
  |-------|-------|------|
  | Pessimistic (large-cap) | 8 – 10% p.a. | Use for capital-preservation goals |
  | Base case (diversified equity) | 11 – 13% p.a. | Long-run average for Nifty 50 / Nifty 500 |
  | Optimistic (mid- and small-cap) | 13 – 16% p.a. | Higher volatility; expect deep drawdowns |
  | Debt / hybrid SIPs | 6 – 9% p.a. | Lower volatility; suitable for short horizons |
  | Inflation drag | 5 – 6% p.a. | Subtract from nominal returns for real corpus |
- **Limitations**:
  - The calculator assumes a constant return rate. Real markets don't deliver 12% every year — you might get +30%, then −15%, then +8%. Sequence-of-returns risk matters most near retirement, less when you're early in the SIP.
  - Doesn't model expense ratio (typically 0.5–2% for active funds, 0.1–0.3% for index funds), exit loads, or capital-gains tax. Net returns are 1–3% lower than gross.
  - Step-up SIPs (raising the contribution 5–10% each year) compound dramatically faster than fixed SIPs, but this calculator assumes a flat monthly amount.
  - Past returns don't predict the future. The 11–13% Indian-equity average is based on 25-year data and is not a guarantee for the next 10.
- **FAQs**:
  - **Q**: How is SIP return calculated?
    **A**: Using the future-value-of-annuity formula: FV = P × [((1+r)ⁿ−1)÷r] × (1+r), where P is the monthly investment, r is the monthly return rate, and n is the number of months. The (1+r) at the end reflects investing at the start of the month.
  - **Q**: What's the realistic return on a SIP in India?
    **A**: Indian equity diversified funds have averaged 11–13% per annum over rolling 10-year windows since 2000. Large-cap-focused SIPs cluster around 10–11%; mid- and small-cap SIPs can hit 13–16% but with much deeper drawdowns. Use 12% as a base case, then sensitivity-test ±3%.
  - **Q**: SIP vs lumpsum — which is better?
    **A**: If you have the lumpsum and the market goes straight up, lumpsum wins. If markets fall in the middle, SIP wins (you accumulate units cheaper). Empirically, on Indian equities since 2000, lumpsum at the start has won about 60% of 10-year periods — but SIP has lower regret and is psychologically easier to stick with.
  - **Q**: What is a step-up SIP?
    **A**: A SIP where your monthly contribution increases each year — usually by 5–10%, matching salary growth. ₹10,000/month with a 10% annual step-up over 20 years grows about 75% larger than a flat ₹10,000 SIP at the same return rate.
  - **Q**: Are SIP returns guaranteed?
    **A**: No. SIPs invest in mutual funds; equity mutual funds carry market risk. The calculator output is a projection assuming a constant return rate — real returns will fluctuate year to year and the final corpus could be 20–40% above or below the projection.
  - **Q**: How is SIP taxed in India?
    **A**: For equity funds: gains held over 12 months are LTCG, taxed at 12.5% above ₹1.25 lakh per year (post-Budget 2024). Each SIP instalment is treated as a separate investment for the holding-period clock. For debt funds, gains are added to your income and taxed at slab rate.
- **SEO title**: SIP Calculator — Mutual Fund SIP Returns Over Time
- **SEO description**: Free SIP calculator. Project your mutual fund corpus from monthly contribution, expected return, and tenure. See total invested vs total gains side-by-side.
- **Sources**:
  - [AMFI India — historical fund returns](https://www.amfiindia.com/)
  - [SEBI — investor education on mutual funds](https://investor.sebi.gov.in/)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### Compound Interest Calculator (`compound-interest-calculator`)
- **Description**: See how a one-time principal grows under compound interest at any rate, tenure, and compounding frequency (daily, monthly, quarterly, yearly).
- **Intro**: Compound interest is interest that earns interest. A principal grows by the rate each period, and in the next period the new (larger) balance grows by the rate again — so growth accelerates. Albert Einstein supposedly called it the eighth wonder of the world; whether or not he did, the math is the single most important concept in personal finance. This calculator returns the future value of a one-time principal at any rate, tenure, and compounding frequency. For recurring contributions, use the SIP or RD calculators.
- **Formula**: `A = P × (1 + r/n)^(n×t)`
- **How it works**: P is the principal, r is the annual rate as a decimal, n is the number of compounding periods per year, and t is the tenure in years. ₹1 lakh at 8% compounded annually for 10 years = 1,00,000 × 1.08^10 = ₹2,15,892. Same money compounded monthly grows to ₹2,21,964 — about ₹6K more, just from frequency. Compounding daily adds another ₹500. The compounding frequency matters less than people think; the rate and the tenure matter much more. Doubling either roughly doubles the gain.
- **Ranges — Rule of 72 — years for money to double at common rates**:
  | Label | Range | Note |
  |-------|-------|------|
  | 4% (savings, FD) | ~18 years to 2x | 72 ÷ 4 = 18 |
  | 6% (debt funds, PPF approx) | ~12 years to 2x | 72 ÷ 6 = 12 |
  | 8% (balanced) | ~9 years to 2x | 72 ÷ 8 = 9 |
  | 10% (equity index) | ~7.2 years to 2x | 72 ÷ 10 = 7.2 |
  | 12% (Indian equity historic) | ~6 years to 2x | 72 ÷ 12 = 6 |
  | 15% (aggressive) | ~4.8 years to 2x | 72 ÷ 15 = 4.8 |
  | 24% (credit-card debt) | ~3 years to 2x | Same math; this is why CC debt destroys |
- **Limitations**:
  - Calculator assumes a constant interest rate. Real fixed deposits and savings accounts have rates that change; investment returns swing dramatically. The longer the tenure, the more this assumption diverges from reality.
  - Doesn't model inflation. A real-return calculator subtracts inflation (typically 5–6% in India, 2–3% in developed markets) to give purchasing-power growth, not nominal growth.
  - Doesn't model taxes. Interest from FDs and savings is taxed at slab rate; debt-MF gains are slab-rate; equity LTCG is 12.5% above ₹1.25L. Always compare investments on post-tax compound returns.
  - For ongoing recurring contributions (SIP, RD), this formula understates final value because each new contribution also compounds. Use the dedicated SIP or RD calculator instead.
- **FAQs**:
  - **Q**: What is the formula for compound interest?
    **A**: A = P × (1 + r/n)^(n×t), where A is the final amount, P is the principal, r is the annual rate as a decimal, n is the number of compounding periods per year, and t is the tenure in years. The interest earned is A − P.
  - **Q**: How is compound interest different from simple interest?
    **A**: Simple interest is principal × rate × time — the principal earns the same amount each year. Compound interest reinvests the interest each period, so the base grows. Over 10 years at 10% on ₹1L: simple gives ₹2L; compound gives ₹2.59L. Over 30 years the gap is massive — ₹4L vs ₹17.4L.
  - **Q**: What's the Rule of 72?
    **A**: A shortcut: years to double ≈ 72 ÷ annual return%. So at 12% your money doubles in ~6 years; at 8% in ~9 years. It's accurate within ~3% for rates between 6% and 20%.
  - **Q**: Does compounding more frequently meaningfully increase returns?
    **A**: Less than people expect. Going from yearly to monthly compounding at 10% adds about 0.4 percentage points to the effective annual rate. Going from monthly to daily adds another 0.05. Continuous compounding is the theoretical limit (e^rt) and only marginally better than daily.
  - **Q**: Should I assume my returns will compound at 12% forever?
    **A**: No. Long-run averages are useful starting points (Indian equity ~12%, US equity ~10%, debt 6–8%) but actual outcomes have wide variance. Always run sensitivity analysis at ±3% from your assumed rate before making a financial decision.
- **SEO title**: Compound Interest Calculator: Daily, Monthly, Yearly
- **SEO description**: Free compound interest calculator. See how a principal grows over years at any interest rate, with compounding frequency from yearly to daily.
- **Sources**:
  - [Investor.gov — compound interest explainer](https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### Mortgage Calculator (`mortgage-calculator`)
- **Description**: Calculate monthly mortgage payments — principal and interest split, total interest paid, and full payment schedule.
- **Intro**: A mortgage calculator returns your monthly principal-and-interest payment for a home loan, given the home price, your down payment, the interest rate, and the loan term. It uses the same reducing-balance amortization formula every bank does, so the headline monthly number you see here will match what a lender quotes — give or take taxes, insurance, and fees that vary by jurisdiction. Use it to test what-if scenarios before you talk to a lender: a bigger down payment, a 15-year vs 30-year term, or a half-percent lower rate.
- **Formula**: `M = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)`
- **How it works**: P is the loan amount (home price minus down payment), r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly payments (years × 12). On a $360,000 loan at 6.5% over 30 years, the monthly payment is $2,275 and you pay $459,005 in interest over the life of the loan — more than the original principal. Drop the term to 15 years and the monthly jumps to $3,136, but lifetime interest falls to $204,403. Always look at lifetime interest, not just the monthly.
- **Ranges — Mortgage rates by term and credit profile (US, April 2026)**:
  | Label | Range | Note |
  |-------|-------|------|
  | 30-year fixed (excellent credit) | 6.25% – 6.75% | FICO 760+, 20% down |
  | 30-year fixed (good credit) | 6.75% – 7.25% | FICO 700–759 |
  | 15-year fixed | 5.50% – 6.25% | ~0.75% below 30-year on average |
  | 5/1 ARM | 6.00% – 6.75% | Fixed for 5 years, then adjusts annually |
  | FHA loan | 6.50% – 7.00% | Lower down payment (3.5%) but with MIP |
  | Jumbo (>$766,550) | 6.75% – 7.50% | Above conforming loan limit |
- **Limitations**:
  - This calculator returns principal and interest only — your real monthly housing cost includes property tax (typically 0.5–2% of home value annually), homeowners insurance, and PMI if your down payment is below 20%. Add 0.5–1% of home price per year as a rough total housing cost.
  - It assumes a fixed rate for the full term. ARMs (adjustable-rate mortgages) reset on a schedule — model the worst-case rate cap if you're considering one.
  - Closing costs (2–5% of the loan amount) and lender fees are not included. Get a Loan Estimate from at least three lenders before committing.
  - Doesn't model prepayment savings. Even one extra principal-only payment a year on a 30-year loan can shave 4–5 years off the term and save 15–20% of total interest.
- **FAQs**:
  - **Q**: How is a mortgage payment calculated?
    **A**: Using the standard amortization formula M = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ−1), where P is the loan amount, r is the monthly interest rate, and n is the number of months. Each month, part of the payment goes to interest on the remaining balance and part to principal — early in the loan, most of it is interest.
  - **Q**: What is the difference between a 15-year and a 30-year mortgage?
    **A**: A 15-year loan has a higher monthly payment but a much lower total interest cost — typically 50–60% less than a 30-year on the same principal. A 30-year is easier on cash flow but you pay roughly the original loan amount again in interest over the life of the loan.
  - **Q**: How much house can I afford?
    **A**: A common rule is your monthly mortgage (principal, interest, taxes, insurance) shouldn't exceed 28% of gross monthly income, and total debt payments shouldn't exceed 36%. For a $7,500/mo gross salary, that caps mortgage at $2,100/mo and total debt at $2,700/mo.
  - **Q**: Is a mortgage calculator the same as an EMI calculator?
    **A**: Functionally yes — both use the reducing-balance formula. "EMI calculator" is the term used in India and South Asia; "mortgage calculator" is the US/UK term and usually focuses on home loans, sometimes adding tax and insurance lines. The core monthly principal-and-interest number is identical.
  - **Q**: Should I make extra principal payments?
    **A**: Almost always yes, if your loan has no prepayment penalty. An extra $200/month on a $300,000 30-year loan at 6.5% saves $103,000 in interest and ends the loan 6 years early. The earlier in the loan you do it, the bigger the impact.
  - **Q**: What is PMI and when can I drop it?
    **A**: Private Mortgage Insurance is required by lenders when your down payment is below 20% — it protects the lender, not you. You can request cancellation when your loan-to-value hits 80%, and it auto-cancels at 78% for conventional loans.
- **SEO title**: Mortgage Calculator — Monthly Payment, Interest & Term
- **SEO description**: Free mortgage calculator. See your monthly payment, total interest, and principal split for any home price, down payment, rate, and loan term.
- **Sources**:
  - [CFPB — Loan Estimate explainer](https://www.consumerfinance.gov/owning-a-home/loan-estimate/)
  - [Freddie Mac — weekly Primary Mortgage Market Survey](https://www.freddiemac.com/pmms)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### Loan Eligibility Calculator (`loan-eligibility-calculator`)
- **Description**: Find out how much loan you can qualify for.
- **SEO title**: Loan Eligibility Calculator: How Much Loan You Qualify For
- **SEO description**: Free loan eligibility calculator. Find your maximum eligible loan amount and max EMI based on income, existing obligations, rate, and tenure.

#### Income Tax Calculator (`income-tax-calculator`)
- **Description**: Estimate your annual income tax liability.
- **SEO title**: Income Tax Calculator: Estimate Your Annual Tax
- **SEO description**: Free income tax calculator. Estimate annual tax liability, take-home pay, and effective tax rate for any salary and total deduction amount.

#### Retirement Calculator (`retirement-calculator`)
- **Description**: Plan how much you need to retire comfortably.
- **SEO title**: Retirement Calculator: How Much You Need to Retire
- **SEO description**: Free retirement corpus calculator. Project the savings you need to retire comfortably — adjusted for inflation and your expected return rate.

#### Fixed Deposit Calculator (`fd-calculator`)
- **Description**: Calculate maturity value of fixed deposits.
- **Intro**: A Fixed Deposit (FD) is the simplest interest-bearing instrument: deposit a lump sum with a bank for a fixed tenure, get a guaranteed interest rate, and receive principal plus interest at maturity. This calculator uses the standard quarterly-compounding formula that every Indian bank uses for cumulative FDs. Move the sliders to compare amounts, rates, and tenures — useful when you're comparing one bank's 7.0% three-year FD against another's 6.75%, or deciding whether to lock in for two years vs five.
- **Formula**: `Maturity = P × (1 + r/4)^(4t)`
- **How it works**: P is the deposit amount, r is the annual interest rate as a decimal, and t is the tenure in years. Indian banks compound FD interest quarterly by convention. ₹1 lakh at 7% for 3 years grows to ₹1,22,925 — about ₹22,925 in interest. The same amount at 7.5% for the same tenure earns ₹2,500 more; over five years, that 0.5% gap compounds to about ₹6,500. Always compare the effective yield (annualised) when the compounding frequency differs across banks.
- **Ranges — Indicative FD rates (April 2026 — verify before booking)**:
  | Label | Range | Note |
  |-------|-------|------|
  | SBI / large public-sector banks | 6.50% – 7.10% p.a. | For 1–5 year cumulative FDs |
  | HDFC / ICICI / Axis (private) | 6.75% – 7.40% p.a. | Slight premium over PSU |
  | Small finance banks | 7.50% – 8.50% p.a. | Higher rate, lower DICGC comfort beyond ₹5L |
  | Senior citizens (+0.50%) | +0.25% – 0.75% additional | Most banks; auto-applied |
  | Tax-saver FD (5-year lock-in) | 6.50% – 7.50% p.a. | Eligible for 80C deduction up to ₹1.5L |
- **Limitations**:
  - Calculator assumes a cumulative FD (interest reinvested, paid at maturity). If you choose a non-cumulative FD with monthly or quarterly payouts, the maturity value equals the principal — the interest comes to you periodically.
  - Interest is fully taxable — added to your income and taxed at your slab rate. The effective post-tax return on a 7% FD at the 30% slab is just 4.9%. Compare against PPF (tax-free) or debt mutual funds for the right horizon.
  - Doesn't model TDS. Banks deduct 10% TDS once cumulative interest crosses ₹40,000 per year (₹50,000 for senior citizens). Submit Form 15G/H if your total income is below the taxable threshold.
  - Premature withdrawal penalties (typically 0.5–1% reduction) and the loss of compounding aren't modelled. Don't book an FD with money you might need before maturity.
- **FAQs**:
  - **Q**: How is FD interest calculated in India?
    **A**: Indian banks compound FD interest quarterly using the formula M = P × (1 + r/4)^(4t), where P is the principal, r is the annual rate as a decimal, and t is the tenure in years. The result is the maturity value; subtract the principal for the interest earned.
  - **Q**: Is FD interest taxable?
    **A**: Yes. FD interest is fully taxable as "Income from Other Sources" at your applicable slab rate. Banks deduct 10% TDS once your annual FD interest crosses ₹40,000 (₹50,000 for senior citizens). The 5-year tax-saver FD lets you claim up to ₹1.5L under Section 80C, but the interest is still taxable.
  - **Q**: Which is better — FD or PPF?
    **A**: For taxable savings under 5 years, FD wins on flexibility and rate. For 15+ year tax-free compounding with EEE status, PPF wins decisively — at 7.1% tax-free vs FD at 7% taxable, the post-tax gap is huge for top-bracket investors. Use both: PPF for the long horizon, FD for shorter goals.
  - **Q**: What is the safest amount to keep in one FD?
    **A**: ₹5 lakh per bank per depositor is insured by DICGC. If you have more than ₹5L to deposit, split across multiple banks for full coverage. Public-sector banks are systemically safer than small finance banks even within the DICGC limit.
  - **Q**: Can I break an FD early?
    **A**: Yes, but most banks charge a 0.5–1% penalty on the applicable rate (whichever is lower — the original rate or the rate that would have applied for the actual tenure held). For very short premature withdrawals, you may earn less than a savings-account rate.
- **SEO title**: FD Calculator — Fixed Deposit Maturity & Interest
- **SEO description**: Free FD calculator with quarterly compounding. See your fixed deposit maturity value, total interest, and effective yield for any deposit, rate, and tenure.
- **Sources**:
  - [RBI — bank deposit rates and norms](https://www.rbi.org.in/)
  - [DICGC — deposit insurance up to ₹5L](https://www.dicgc.org.in/)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### Recurring Deposit Calculator (`rd-calculator`)
- **Description**: Calculate returns on monthly recurring deposits.
- **SEO title**: RD Calculator: Recurring Deposit Maturity & Interest
- **SEO description**: Free RD calculator. See your recurring deposit maturity value, total deposited, and interest earned at any monthly amount, rate, and tenure.

#### Mutual Fund Returns (`mutual-fund-returns`)
- **Description**: Calculate returns on lump sum MF investments.
- **SEO title**: Mutual Fund Returns Calculator: Future Value of MF
- **SEO description**: Free mutual fund returns calculator. Project the future value and total gain on a one-time MF investment at any expected annual return rate.

#### Stock Profit/Loss (`stock-profit-loss`)
- **Description**: Calculate gains or losses on stock trades.
- **SEO title**: Stock Profit/Loss Calculator: Trade Returns & %
- **SEO description**: Free stock profit/loss calculator. Compute gain or loss in absolute terms and percent return for any buy/sell trade across any quantity of shares.

#### Dividend Yield Calculator (`dividend-yield-calculator`)
- **Description**: Calculate annual dividend yield on a stock.
- **SEO title**: Dividend Yield Calculator: Annual Yield & Income
- **SEO description**: Free dividend yield calculator. Get the annual yield % on a stock and your total annual dividend income from any share count and price.

#### Credit Card Interest (`credit-card-interest`)
- **Description**: How much credit card interest will cost you.
- **SEO title**: Credit Card Interest Calculator: Months to Payoff
- **SEO description**: Free credit card interest calculator. See how many months it takes to clear a balance and how much total interest you pay at any APR and monthly payment.

#### Debt Payoff Calculator (`debt-payoff-calculator`)
- **Description**: Plan when you will be debt-free.
- **SEO title**: Debt Payoff Calculator: When You Will Be Debt-Free
- **SEO description**: Free debt payoff calculator. See months to debt-free and total interest paid at any monthly payment, debt amount, and interest rate.

#### Net Worth Calculator (`net-worth-calculator`)
- **Description**: Calculate your total net worth.
- **SEO title**: Net Worth Calculator: Assets, Liabilities, Ratio
- **SEO description**: Free net worth calculator. Subtract liabilities from assets to see your true net worth and asset/liability ratio — the simplest financial-health metric.

#### Salary to Hourly (`salary-to-hourly`)
- **Description**: Convert annual salary to hourly rate.
- **SEO title**: Salary to Hourly Calculator: Annual to Hourly Rate
- **SEO description**: Free salary-to-hourly converter. Turn any annual salary into hourly, daily, weekly, and monthly rates — based on your real hours and weeks worked.

#### Tip Calculator (`tip-calculator`)
- **Description**: Split a restaurant bill fairly with tip — get tip amount, total, and per-person share for any group size.
- **Intro**: A tip calculator handles the dinner-out math: take the pre-tax bill, multiply by the tip percentage, add it back to the total, and split among the diners. This calculator does all three. The defaults assume tipping is on the pre-tax amount (the standard convention) and that the split is equal. Tipping norms vary widely by country — 18–22% in the US, 10% in much of Europe, often built into service charge in India and Japan. The formula is the same; just dial the % to match where you are.
- **Formula**: `tip = bill × (tip% ÷ 100) · total = bill + tip · per-person = total ÷ people`
- **How it works**: An $80 bill at 18% tip is $80 × 0.18 = $14.40 tip, $94.40 total, and split between two people gives $47.20 each. For service charges already added (common in India, UK), tip on the pre-service-charge subtotal — don't double-pay. For very large groups (8+), restaurants often auto-add gratuity — check the bill before tipping again.
- **Ranges — Tipping conventions by country (April 2026)**:
  | Label | Range | Note |
  |-------|-------|------|
  | United States — sit-down | 18 – 22% | On pre-tax subtotal; 20% is the new default |
  | United States — counter / takeaway | 0 – 10% | Tip jars optional; no expectation |
  | Canada | 15 – 20% | Tipping culture similar to US |
  | United Kingdom | 10 – 15% | Often included as "service charge"; check bill first |
  | Continental Europe | 5 – 10% | Round up; service often included |
  | India | 5 – 10% | 5–10% if no service charge; nothing if service charge already added |
  | Japan | 0% | Tipping is generally not customary; can offend |
  | Middle East / Gulf | 10 – 15% | Service charge often included; small extra appreciated |
- **Limitations**:
  - Calculator assumes equal split. For uneven splits (alcohol drinkers vs non-drinkers, dietary differences), use a per-item bill split — most apps like Splitwise handle this directly.
  - Tip is calculated on the pre-tax bill in the US convention. If your bill includes tax already and you tip on the tax-inclusive total, you're slightly over-tipping (about 8% over).
  - Doesn't check whether service charge is already included. Always inspect the bill — restaurants in India, UK, France, and several other countries auto-add 10–15% service charge.
  - For groups of 8+ in the US, gratuity is often auto-added to the bill (typically 18%). Don't tip on top.
- **FAQs**:
  - **Q**: How much should I tip in the US?
    **A**: For sit-down restaurants, 18–22% on the pre-tax subtotal is the current norm. 20% is the safe default. For exceptional service tip 25%; for poor service the etiquette is to leave 15% and speak to the manager — not to leave nothing.
  - **Q**: Should I tip on tax?
    **A**: No, by convention you tip on the pre-tax subtotal. In practice the difference is small (~8% of the tip amount) and many people just tip on the total. Both are accepted; tipping on subtotal is technically correct.
  - **Q**: How do I tip when paying with a credit card?
    **A**: Either write the tip on the slip or hand cash separately to the server. Cash tips usually reach the server faster and avoid card-processing deductions some restaurants take. Either is fine.
  - **Q**: Do I tip on a service charge?
    **A**: Generally no — the service charge is the tip. If the service was exceptional and you want to add more, that's optional. Always check the bill before tipping; "service charge included" lines are easy to miss.
  - **Q**: How do I split a bill unevenly when one person ordered more?
    **A**: Use a per-item bill splitter — list each item, assign to the person who ordered it, add proportional tax and tip. Apps like Splitwise, Tab, or even a quick spreadsheet handle this. This calculator only does equal splits.
- **SEO title**: Tip Calculator: Split Bills & Tip Fairly
- **SEO description**: Free tip calculator. Calculate tip amount, total bill, and per-person split for any bill amount, tip percentage, and group size.
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### GST Calculator (`gst-calculator`)
- **Description**: Calculate GST inclusive & exclusive amounts.
- **Intro**: GST (Goods and Services Tax) in India is a multi-slab indirect tax that replaced VAT, service tax, excise duty, and most other indirect taxes in 2017. The four standard slabs are 5%, 12%, 18%, and 28%, with a few special rates outside that. This calculator works both ways: enter a base amount and add GST (exclusive calculation), or know the post-GST total and back out the base (inclusive calculation). Use it for invoicing, expense reconciliation, or just sanity-checking what a vendor charged you.
- **Formula**: `GST = Amount × (rate ÷ 100) · Total = Amount + GST · Net (from inclusive) = Amount × 100 ÷ (100 + rate)`
- **How it works**: If your input is the base amount (the pre-GST price): the GST amount is base × rate%, and the total is base + GST. ₹1,000 at 18% gives ₹180 GST and ₹1,180 total. To go the other way — you have ₹1,180 and want to know the base — use base = 1,180 × 100 ÷ 118 = ₹1,000. For inter-state transactions, GST splits as IGST (full rate); for intra-state, it splits 50/50 as CGST + SGST. The total is the same.
- **Ranges — GST slabs in India (April 2026)**:
  | Label | Range | Note |
  |-------|-------|------|
  | 0% (exempt) | Nil | Unbranded food grains, fresh produce, healthcare, education |
  | 5% | Essentials | Branded packaged food, footwear under ₹1,000, cab rides |
  | 12% | Standard goods | Frozen meat, processed food, business-class flights, smartphones |
  | 18% | Most services | Software, telecom, restaurants (AC), professional services — most B2B |
  | 28% | Luxury / sin | Cars, ACs, premium electronics, tobacco, aerated drinks |
  | 28% + cess | Sin / luxury+ | Tobacco, pan masala, large SUVs — additional compensation cess |
- **Limitations**:
  - Calculator assumes a single GST rate per transaction. Composite invoices (e.g. mixed-rate restaurant bills) need to be split line by line — apply the right rate to each item.
  - Composition scheme rates (1% for traders, 5% for restaurants) are not standard slabs and aren't intended for end-consumer pricing comparisons.
  - Reverse charge mechanism (RCM), where the buyer pays GST instead of the seller, isn't modelled. Applies mostly to specific notified goods/services and unregistered-supplier purchases.
  - Doesn't compute input tax credit (ITC). For business GST returns, you offset GST collected against GST paid on inputs — that's a returns-filing exercise, not a per-transaction calc.
- **FAQs**:
  - **Q**: How do I calculate GST on a price?
    **A**: GST = price × (rate ÷ 100). For ₹1,000 at 18% GST, the GST amount is ₹180 and the total is ₹1,180. To extract GST from an inclusive price, use: net = inclusive × 100 ÷ (100 + rate); GST = inclusive − net.
  - **Q**: What is the difference between inclusive and exclusive GST?
    **A**: Exclusive GST: the price you see does not include GST — you add it on top (₹1,000 + 18% GST = ₹1,180 total). Inclusive GST: the price you see already includes GST — you back-calculate to find the base. Indian retail prices are usually inclusive (MRP); B2B invoices are usually exclusive.
  - **Q**: What are the current GST slabs in India?
    **A**: Five standard slabs: 0%, 5%, 12%, 18%, and 28%. Most services sit at 18%. Cars, premium electronics, and luxury items are at 28%. Sin goods (tobacco, aerated drinks, large SUVs) attract 28% plus an additional compensation cess that varies by category.
  - **Q**: What is CGST, SGST, and IGST?
    **A**: For transactions within a state, GST is split equally between CGST (Central) and SGST (State) — 18% becomes 9% CGST + 9% SGST. For inter-state transactions, the full amount goes as IGST (Integrated). The total tax is the same; only the split differs.
  - **Q**: When is GST exempt or zero-rated?
    **A**: Truly exempt (no GST): unbranded food grains, fresh fruit and vegetables, milk, healthcare services, education up to higher secondary. Zero-rated (technically taxed at 0% with input credit): exports and supplies to SEZ units. Exemption is broader than zero-rating because exempt goods can't claim input credit.
- **SEO title**: GST Calculator India — Inclusive & Exclusive GST Amount
- **SEO description**: Free GST calculator for India. Add GST to a base amount or extract GST from an inclusive price. Supports all current slabs (5%, 12%, 18%, 28%).
- **Sources**:
  - [GST portal — current rates and notifications](https://www.gst.gov.in/)
  - [CBIC — GST rate finder](https://cbic-gst.gov.in/)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### PPF Calculator (`ppf-calculator`)
- **Description**: Calculate Public Provident Fund maturity.
- **Intro**: PPF (Public Provident Fund) is the most popular long-term tax-free savings scheme in India. It carries a 15-year lock-in (extendable in 5-year blocks), an annual deposit cap of ₹1.5 lakh, government-set interest rates revised quarterly (currently 7.1% for Q1 2026), and full EEE tax status — contributions are 80C deductible, interest is tax-free, and maturity is tax-free. This calculator projects the maturity value assuming you contribute the same amount annually at the start of each year. For most middle-class Indian investors, maxing PPF for 15 years is the highest-quality fixed-income exposure available.
- **Formula**: `M = P × [((1 + r)ⁿ − 1) ÷ r] × (1 + r)`
- **How it works**: P is the annual contribution, r is the annual rate (currently 7.1%), and n is the number of years. ₹1.5 lakh contributed every year for 15 years at 7.1% grows to about ₹40.7 lakh — ₹22.5 lakh of which is your principal and ₹18.2 lakh is tax-free interest. Extend the account by 5 more years (without further contribution) and the corpus crosses ₹57 lakh just by sitting there. Contribute before the 5th of each month to earn interest for that month — interest is calculated on the lowest balance between the 5th and the month-end.
- **Ranges — PPF — historical interest rates (set quarterly by Government of India)**:
  | Label | Range | Note |
  |-------|-------|------|
  | Current (Q1 FY26) | 7.10% p.a. | Revised quarterly; check before extrapolating |
  | 5-year average | 7.10% – 7.90% | Has been at 7.1% for several quarters |
  | 10-year average | ~7.5% | Trended down from 8%+ in early 2010s |
  | Maximum annual contribution | ₹1.5 lakh | Across all PPF accounts in your name |
  | Lock-in | 15 years | Extendable in 5-year blocks indefinitely |
  | Partial withdrawal | From year 7 | Up to 50% of balance at end of year 4 |
- **Limitations**:
  - PPF rates are reset quarterly by the government. The calculator assumes a constant rate over the full tenure — your actual maturity value will differ as rates change.
  - Maximum contribution is ₹1.5 lakh per financial year, summed across PPF accounts of one PAN. Excess contributions don't earn interest and aren't 80C-eligible.
  - Doesn't model the loan facility (available years 3–6 against your PPF balance) or the partial-withdrawal option (from year 7), both of which interrupt the compound growth.
  - Assumes you contribute at the start of each year (best for interest accrual). Contributions later in the year earn interest only from the month after deposit.
- **FAQs**:
  - **Q**: How is PPF interest calculated?
    **A**: PPF interest is calculated monthly on the lowest balance between the 5th and the last day of the month, but credited annually on March 31. The rate is set quarterly by the government — currently 7.1%. The calculator approximates this as annual compounding on the year-start balance, which is what most online calculators (including bank ones) use.
  - **Q**: What's the maximum I can invest in PPF?
    **A**: ₹1.5 lakh per financial year, total across all PPF accounts in your name. This is the same as the Section 80C limit, so a single PPF contribution at ₹1.5L exhausts your 80C bucket — or you can split it with ELSS, EPF, life insurance, etc.
  - **Q**: Is PPF interest taxable?
    **A**: No. PPF has full EEE tax status: contributions are deductible under 80C (up to ₹1.5L), interest accumulated each year is tax-free, and the maturity amount is tax-free. This is rare in Indian fixed-income and a big reason PPF is a staple of long-term portfolios.
  - **Q**: Can I withdraw PPF money before 15 years?
    **A**: Partial withdrawal is allowed from the 7th financial year — up to 50% of the balance at the end of the 4th year preceding the withdrawal. Full premature closure is permitted only after 5 years and only for specific reasons (serious illness, higher education) with a 1% rate penalty.
  - **Q**: PPF vs ELSS — which is better?
    **A**: Both offer 80C deduction. PPF gives 7.1% guaranteed and tax-free with 15-year lock-in; ELSS gives expected 11–13% (volatile, equity-linked) with 3-year lock-in. For risk-averse investors or the bond portion of a portfolio: PPF. For longer-horizon equity exposure: ELSS. Most balanced portfolios hold both.
- **SEO title**: PPF Calculator — Public Provident Fund Maturity Value
- **SEO description**: Free PPF calculator. Project your Public Provident Fund maturity for any yearly contribution and tenure. Tax-free returns at the current 7.1% PPF rate.
- **Sources**:
  - [India Post — PPF rules](https://www.indiapost.gov.in/Financial/Pages/Content/Public-Provident-Fund.aspx)
  - [NSI — small-savings interest rates](https://www.nsiindia.gov.in/)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### NPS Calculator (`nps-calculator`)
- **Description**: Plan your National Pension Scheme returns.
- **Intro**: NPS (National Pension System) is a market-linked, voluntary, defined-contribution pension scheme regulated by PFRDA. You contribute monthly until age 60, the corpus grows in a mix of equity, corporate debt, and government bonds, and at maturity you must take at least 40% as an annuity (lifelong pension) and can take up to 60% as a lump sum. This calculator projects your retirement corpus assuming a constant blended return rate. NPS gets you an extra ₹50,000 tax deduction under Section 80CCD(1B) — over and above the 80C limit — which makes it the cheapest tax-saver per rupee of deduction.
- **Formula**: `Corpus = M × [((1 + r)ⁿ − 1) ÷ r] × (1 + r) · Pension/month ≈ Annuitised 40% × 6% ÷ 12`
- **How it works**: M is your monthly contribution, r is the monthly return rate (annual ÷ 12 ÷ 100), and n is the number of months until age 60. ₹5,000/month at 10% from age 30 to 60 grows to about ₹1.13 crore. At maturity, 40% (₹45 lakh) buys an annuity yielding ~6% — that's ₹22,500/month pension for life. The other 60% (₹68 lakh) comes as a lump sum, tax-free. The pension portion is taxable as income in the year you receive it.
- **Ranges — NPS — return ranges by Active Choice asset allocation**:
  | Label | Range | Note |
  |-------|-------|------|
  | Aggressive (75% equity, max allowed) | 11 – 13% p.a. expected | Cap on equity drops with age past 50 |
  | Balanced (50% equity) | 9 – 11% p.a. expected | Most common allocation |
  | Conservative (25% equity) | 8 – 10% p.a. expected | Lower volatility, lower upside |
  | Auto Choice (LC50) | ~9 – 11% p.a. | Lifecycle fund — equity tapers automatically with age |
  | Government bonds only | ~7 – 8% p.a. | Tier II option only for risk-averse savers |
- **Limitations**:
  - Calculator assumes a constant return rate. NPS returns are market-linked — equity portion can fluctuate ±20% in a year, debt portion ±2–4%. Run sensitivity analysis at 8%, 10%, and 12%.
  - Doesn't model the 60/40 split rule at maturity. 60% can be taken as tax-free lump sum; 40% mandatorily buys an annuity, the rate of which depends on the annuity provider you choose at age 60 (currently 5–6.5% range).
  - Annuity income is fully taxable as income in the year received. NPS is tax-deferred, not tax-free like PPF — keep this in mind when comparing.
  - Equity allocation is capped at 75% in Active Choice; this cap reduces every year after age 50 to 50% equity by age 60. Long-horizon return projections at 12%+ assume the 75% cap stays in place, which it won't for the last decade.
- **FAQs**:
  - **Q**: How is NPS pension calculated?
    **A**: At age 60, at least 40% of your accumulated NPS corpus is used to buy an annuity from a PFRDA-empanelled insurer. The annuity rate (currently 5–6.5%) sets your monthly pension. ₹50 lakh annuitised at 6% gives ₹25,000/month for life. The remaining 60% is paid as a tax-free lump sum.
  - **Q**: What is the difference between NPS Tier 1 and Tier 2?
    **A**: Tier 1 is the mandatory retirement account — locked until 60, eligible for tax deductions. Tier 2 is a voluntary investment account — fully liquid, no tax deduction (except for government employees), no withdrawal restrictions. Most retail subscribers use only Tier 1.
  - **Q**: Is NPS better than PPF?
    **A**: Different roles. PPF: guaranteed 7.1% tax-free, 15-year horizon, ₹1.5L cap. NPS: market-linked 10–12% expected (taxable on annuity), 60-year lock-in, additional ₹50,000 deduction under 80CCD(1B). Use both — PPF for the bond portion of your retirement bucket, NPS for the equity-tilted long-horizon piece.
  - **Q**: How much tax can I save with NPS?
    **A**: Up to ₹50,000 deduction under Section 80CCD(1B) — over and above the ₹1.5L 80C limit — exclusive to NPS Tier 1 contributions. At the 30% slab, that's ₹15,000 saved annually. Employer NPS contributions (up to 10% of basic) are additionally deductible under 80CCD(2).
  - **Q**: Can I exit NPS before 60?
    **A**: Yes, but with restrictions. Premature exit before age 60 requires you to use 80% of the corpus for an annuity (only 20% as lump sum). After 5 years of contributing and only after 60 do you get the full 60/40 split. Don't enter NPS with money you might need before retirement.
- **SEO title**: NPS Calculator — National Pension System Corpus & Pension
- **SEO description**: Free NPS calculator. Project your retirement corpus, monthly pension, and lump-sum withdrawal under the National Pension System for any monthly contribution.
- **Sources**:
  - [PFRDA — official NPS portal](https://www.npscra.nsdl.co.in/)
  - [NPS Trust — scheme returns](https://www.npstrust.org.in/)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### Lumpsum Calculator (`lumpsum-calculator`)
- **Description**: Project the future value of a one-time mutual fund or equity lumpsum investment.
- **Intro**: A lumpsum calculator projects what a single one-time investment will be worth after a chosen tenure at an assumed compound growth rate. It's the right tool when you have a windfall — bonus, inheritance, sale proceeds — and want to compare what equity, debt, or hybrid funds might do with it. Unlike a SIP (which spreads contributions across months), a lumpsum is fully exposed to the market on day one — better when markets go straight up, worse when they fall before recovering. Use this calculator to size that bet against tenure and expected return.
- **Formula**: `FV = P × (1 + r)ⁿ`
- **How it works**: P is the lumpsum amount, r is the expected annual return (as a decimal), and n is the tenure in years. ₹10 lakh invested at 12% for 10 years grows to ₹31 lakh — a 3.1x money multiplier. Stretch to 20 years and it becomes ₹96 lakh (9.6x). The longer the horizon, the more the result depends on the rate assumption — at 10 years a 2% rate difference doubles your final corpus delta; at 20 years it quadruples.
- **Ranges — Lumpsum return assumptions by asset class (long-run averages)**:
  | Label | Range | Note |
  |-------|-------|------|
  | Indian equity (Nifty 500) | 11 – 13% p.a. | Long-run average, but expect ±25% annual swings |
  | Indian large-cap | 10 – 12% p.a. | Lower volatility, slight return drag vs broader market |
  | Hybrid / balanced funds | 9 – 11% p.a. | 60–70% equity, lower drawdowns |
  | Debt mutual funds | 6 – 8% p.a. | Taxed at slab rate post-2023 |
  | Gold (long-run INR) | 8 – 10% p.a. | Volatile; useful as portfolio diversifier |
  | Bank FD / RD | 6.5 – 7.5% p.a. | Guaranteed, but post-tax return at top slab is just 4.5–5% |
- **Limitations**:
  - Assumes a constant compound rate. Real markets deliver returns in lumpy sequences — a single bad first year can halve your 10-year result vs the same average return spread evenly. This is sequence-of-returns risk.
  - Doesn't model expense ratio (0.5–2% for active funds, 0.1–0.3% for index funds) or exit load. Net returns are 1–2% lower than gross.
  - Doesn't model tax. Equity LTCG (held >1 year) is taxed at 12.5% above ₹1.25L per year; debt MFs are slab-rate taxed; gold is slab-rate. Compare on post-tax returns when picking between options.
  - Lumpsum vs SIP comparison depends entirely on what markets do during the SIP period. The calculator can't tell you which will win — only the math of each.
- **FAQs**:
  - **Q**: What is the formula for lumpsum return?
    **A**: Future value = P × (1 + r)ⁿ, where P is the principal, r is the annual return rate as a decimal, and n is the tenure in years. For ₹10L at 12% over 10 years, FV = 10,00,000 × 1.12¹⁰ = ₹31,05,848.
  - **Q**: Lumpsum vs SIP — which is better?
    **A**: Depends on the market path. If markets go up steadily, lumpsum wins (you're fully invested earlier). If markets fall during the SIP window, SIP wins (you accumulate units cheaper). Empirically over Indian equity history, lumpsum has won about 60% of 10-year periods — but SIP is psychologically easier and avoids the regret of timing badly.
  - **Q**: How much tax do I pay on lumpsum mutual fund gains?
    **A**: For equity funds held over 12 months: 12.5% LTCG on gains above ₹1.25L per year (post Budget 2024). Held under 12 months: 20% STCG. For debt funds bought after April 2023: gains taxed at your slab rate regardless of holding period.
  - **Q**: What rate should I assume for an Indian equity lumpsum?
    **A**: 11–13% as a base case for diversified equity over 10+ years, based on rolling Nifty 500 returns since 2000. Stress-test at 8% (pessimistic) and 14% (optimistic). Never assume a single point estimate — model the range.
  - **Q**: How long should I hold a lumpsum investment?
    **A**: For equity, minimum 5 years to ride out a typical bear market; ideally 10+ for the long-run averages to dominate noise. For debt funds, holding period depends on duration risk and tax treatment — short-duration funds for under 3 years, longer for over 3.
- **SEO title**: Lumpsum Calculator — One-Time Investment Future Value
- **SEO description**: Free lumpsum calculator. Project the future value of a one-time mutual fund, equity, or fixed-income investment at any expected return rate and tenure.
- **Sources**:
  - [AMFI India — historical fund returns](https://www.amfiindia.com/)
  - [SEBI — investor education](https://investor.sebi.gov.in/)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### HRA Calculator (`hra-calculator`)
- **Description**: Calculate exempt and taxable HRA under Section 10(13A) — old regime tax saving on house rent.
- **Intro**: HRA (House Rent Allowance) is one of the most generous tax breaks for salaried Indians who rent — but only under the old tax regime. The exempt portion is the lowest of three numbers: actual HRA received, 50% of basic+DA for metro residents (40% non-metro), and rent paid in excess of 10% of basic+DA. The remainder is added to your taxable salary. This calculator computes all three legs and shows the lower-bound exemption plus the tax you save at the 30% slab. If you switched to the new regime in FY 2023-24, HRA exemption is no longer available — model your old vs new regime decision carefully.
- **Formula**: `Exempt HRA = MIN(actual HRA, 50%/40% × basic, rent − 10% × basic)`
- **How it works**: All three legs are evaluated, and the smallest one is the exempt amount. Example: ₹6L basic, ₹2.4L HRA, ₹3L rent, metro. Leg 1 = ₹2.4L (HRA received). Leg 2 = ₹3L (50% of basic). Leg 3 = ₹3L − ₹60K = ₹2.4L. Minimum is ₹2.4L — entirely exempt. The remaining ₹0 of HRA is taxable. At the 30% slab, this saves ₹72,000 in tax. If your rent is low or your HRA is higher than 50% of basic, your exemption shrinks because Leg 3 (or Leg 2) becomes binding.
- **Ranges — HRA exemption legs — the lowest of three is exempt**:
  | Label | Range | Note |
  |-------|-------|------|
  | Leg 1 | Actual HRA received | Whatever your CTC structure says |
  | Leg 2 (metro) | 50% × (Basic + DA) | Mumbai, Delhi, Kolkata, Chennai |
  | Leg 2 (non-metro) | 40% × (Basic + DA) | All other cities |
  | Leg 3 | Rent paid − 10% × (Basic + DA) | If negative, this leg = 0 |
  | Required regime | Old regime only | New regime: no HRA exemption |
  | PAN of landlord | Required if rent > ₹1L/yr | Otherwise full HRA is taxable |
- **Limitations**:
  - Calculator assumes annual figures. If your basic, HRA, or rent changed mid-year (e.g. job switch, rent increase), compute monthly and sum — using annual averages over-estimates exemption.
  - Doesn't validate against new tax regime. From FY 2023-24, the new regime is the default — and HRA, 80C, and most exemptions are not available there. Switching back to old regime requires explicit declaration.
  - Doesn't model the case where you own the house. You can't claim HRA on rent paid to yourself or to a spouse (the IT department disallows this).
  - Rent paid to your parents counts only if (a) they declare it as rental income in their return, (b) you have a rent agreement, and (c) you actually transfer the rent monthly. Cash payments without paper trail are routinely disallowed.
- **FAQs**:
  - **Q**: How is HRA exemption calculated under Section 10(13A)?
    **A**: The exempt portion is the minimum of: (1) actual HRA received, (2) 50% of basic+DA for metro cities or 40% for non-metro, (3) actual rent paid minus 10% of basic+DA. The remainder of HRA is added to your taxable salary.
  - **Q**: What counts as a metro city for HRA?
    **A**: For HRA Section 10(13A), only four cities qualify: Mumbai, Delhi, Kolkata, Chennai. Bengaluru, Hyderabad, Pune, Gurgaon — all non-metro for HRA purposes (40% cap), even though they're metros in everyday usage.
  - **Q**: Can I claim HRA in the new tax regime?
    **A**: No. Section 10(13A) HRA exemption is available only in the old tax regime. The new regime (default from FY 2023-24) has lower slabs but disallows HRA, 80C, 80D, LTA, and most other exemptions. Run both before choosing.
  - **Q**: Can I claim HRA if I pay rent to my parents?
    **A**: Yes, but with conditions: there must be a written rent agreement, you must transfer rent monthly via bank (not cash), and your parents must declare it as rental income in their return. If they're below the taxable threshold, no tax — but the declaration is mandatory.
  - **Q**: Do I need landlord PAN to claim HRA?
    **A**: Yes, if your annual rent exceeds ₹1 lakh. You need the landlord's PAN — without it, your employer cannot allow HRA exemption, and the IT department will disallow it on assessment.
  - **Q**: What's the maximum HRA exemption I can claim?
    **A**: There is no absolute cap — the exemption depends on your basic, your HRA, your rent, and your city. In practice, for a metro resident with a 40% HRA in CTC and rent at 30% of basic, you can typically exempt 80–95% of HRA received.
- **SEO title**: HRA Calculator — House Rent Allowance Exemption (India)
- **SEO description**: Free HRA calculator under Section 10(13A). Calculate your HRA exemption, taxable portion, and tax saved at the 30% slab — old regime only.
- **Sources**:
  - [IT Department — Section 10(13A) rules](https://incometaxindia.gov.in/)
  - [CBDT — HRA exemption circular](https://www.incometax.gov.in/iec/foportal/)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### CIBIL Score Estimator (`cibil-calculator`)
- **Description**: Estimate where your CIBIL score sits based on credit habits — utilisation, payment history, account age, and inquiries.
- **Intro**: CIBIL (now TransUnion CIBIL) is the most widely used credit score in India. Banks pull it before approving any loan or card, and a score above 750 typically gets you the best interest rates while below 650 gets most applications rejected. The actual score is computed by CIBIL using your full credit bureau record — this calculator gives you a directional estimate based on the five factors that drive most of the variance: payment history, credit utilisation, account age, recent inquiries, and credit mix. Use it to identify your weakest lever, not as a substitute for your real score (free at cibil.com).
- **Formula**: `Composite (0–100) = 0.35 × payment + 0.30 × utilisation + 0.15 × age + 0.10 × inquiries + 0.10 × mix · CIBIL ≈ 300 + composite × 6`
- **How it works**: The five factors are weighted by their typical impact on CIBIL: payment history (35%) is by far the biggest, followed by credit utilisation (30%), account age (15%), and recent inquiries plus credit mix (10% each). The composite is a 0–100 score that maps roughly linearly to the CIBIL band of 300–900. The estimator also surfaces the lowest-scoring factor as your "biggest lever" — the single change that would move your real score the most.
- **Ranges — CIBIL bands — what each means for borrowing**:
  | Label | Range | Note |
  |-------|-------|------|
  | 800–900 · Excellent | ~10% of borrowers | Best rates, instant approvals, premium card eligibility |
  | 750–799 · Good | ~25% of borrowers | Standard rates, most loans approved smoothly |
  | 700–749 · Fair | ~25% of borrowers | Approval likely but at higher rates; may need co-applicant |
  | 650–699 · Poor | ~20% of borrowers | Mostly NBFCs; rates 2–4% above standard |
  | 300–649 · Very poor | ~20% of borrowers | Most lenders decline; rebuild before applying |
  | NTC (No Score) | No history | Build with a secured card or small consumer loan |
- **Limitations**:
  - This is an estimator, not your real CIBIL score. The actual score uses ~258 data points from your credit history; this calculator captures the five biggest. Real and estimated scores typically agree within ±50 points but can diverge by more.
  - For your real score, get the free annual report at cibil.com or via Bank/UPI partner apps (most show CIBIL free of charge). Soft inquiries from these apps don't affect your score.
  - Doesn't model settlements, write-offs, or DPD (days past due) on closed accounts — all of which depress real CIBIL scores significantly even after the account is closed.
  - Score-band-to-percentage mapping is directional based on lender benchmarks; actual distribution varies by bureau, year, and population sampled.
- **FAQs**:
  - **Q**: How is CIBIL score calculated?
    **A**: CIBIL combines payment history (35%), credit utilisation (30%), length of credit history (15%), credit mix (10%), and new credit / hard inquiries (10%). Scores range from 300 (worst) to 900 (best); 750+ is considered good for loan approval.
  - **Q**: What is a good CIBIL score?
    **A**: 750 or above is considered good — most lenders give standard rates above this threshold. 800+ unlocks the best rates and premium products. Below 700, expect higher rates or rejections; below 650, most loans get declined.
  - **Q**: How can I improve my CIBIL score?
    **A**: In order of impact: (1) pay every EMI and credit-card bill in full and on time; (2) drop credit-card utilisation below 30% of limit; (3) avoid applying for new credit for 6+ months; (4) keep your oldest cards open even if unused; (5) maintain a healthy mix of secured (home loan) and unsecured (cards) credit.
  - **Q**: How long does it take to fix a low CIBIL score?
    **A**: Six months of perfect payments and low utilisation typically moves the needle by 30–50 points. Recovery from a write-off, settlement, or 90+ days past due takes 18–24 months. Bankruptcy or wilful default stays for 7 years.
  - **Q**: Does checking my own CIBIL score lower it?
    **A**: No. Self-checks are "soft inquiries" and have zero impact. Only "hard inquiries" — when a lender pulls your report for a loan or card application — affect your score. Even hard inquiries count for only 10% of the total.
  - **Q**: Where can I check my actual CIBIL score?
    **A**: Free once a year at cibil.com (mandated by RBI). Free monthly through partner apps — most major banks (HDFC, ICICI, SBI), CRED, BankBazaar, and Paisabazaar offer ongoing free CIBIL access. These checks are soft inquiries and safe.
- **SEO title**: CIBIL Score Estimator — Estimate Your Credit Score
- **SEO description**: Free CIBIL score estimator. Get a directional credit score from your payment history, utilisation, account age, inquiries, and credit mix — plus the biggest lever to improve it.
- **Sources**:
  - [TransUnion CIBIL — official portal](https://www.cibil.com/)
  - [RBI — credit information bureau norms](https://www.rbi.org.in/)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

---

### Health

(category description: BMI, calories, fitness and wellness)

#### BMI Calculator (`bmi-calculator`)
- **Description**: Calculate your Body Mass Index in seconds — with WHO categories and Asian-specific cutoffs.
- **Intro**: BMI (Body Mass Index) is a weight-for-height ratio used to screen adults for underweight, normal weight, overweight, and obesity. The number itself does not measure body fat directly, but population studies link BMI bands to broad health risks, which is why doctors and public-health agencies still use it. This calculator returns your BMI alongside both the global WHO categories and the lower Asian-specific cutoffs that the WHO recommends for South and East Asian populations.
- **Formula**: `BMI = weight (kg) ÷ height (m)²`
- **How it works**: Convert your height to metres (170 cm → 1.70 m), square it, then divide your weight in kilograms by the result. A 70 kg person at 1.70 m has a BMI of 70 ÷ (1.70 × 1.70) = 24.2, which sits at the top of the global "Normal" range but is already in the "Overweight" range under the Asian cutoff (≥ 23). For pounds and inches, multiply (weight in lb ÷ height in in²) by 703.
- **Ranges — BMI categories — WHO global vs. Asian cutoffs**:
  | Label | Range | Note |
  |-------|-------|------|
  | Underweight | BMI < 18.5 | Same under both standards |
  | Normal | 18.5 – 24.9 (global) · 18.5 – 22.9 (Asian) | Asian range is narrower |
  | Overweight | 25 – 29.9 (global) · 23 – 24.9 (Asian) | Indian guidance follows the Asian cutoff |
  | Obese — Class I | 30 – 34.9 (global) · ≥ 25 (Asian) | Asian threshold for action is much lower |
  | Obese — Class II | 35 – 39.9 | High health risk |
  | Obese — Class III | ≥ 40 | Very high risk; clinical follow-up advised |
- **Limitations**:
  - BMI doesn't distinguish muscle from fat — athletes and very muscular people often score 'overweight' or 'obese' despite low body-fat percentage.
  - It doesn't account for fat distribution. Two people with the same BMI can have very different visceral fat (the kind that drives metabolic risk).
  - Standard global cutoffs underestimate risk for South Asians, East Asians, and several other ethnic groups, which is why Indian and Asian guidance uses the lower cutoffs above.
  - BMI is less accurate for older adults (muscle loss inflates 'normal' readings) and for children, who need age- and sex-specific BMI percentile charts instead.
  - It says nothing about diet quality, fitness, blood pressure, blood sugar, or any other clinical marker. Treat it as one screening number, not a diagnosis.
- **FAQs**:
  - **Q**: What is a healthy BMI?
    **A**: For most adults, a BMI between 18.5 and 24.9 falls in the WHO "normal" range. For people of South Asian, East Asian, and several other ancestries, the WHO recommends a lower upper bound of 22.9, with 23–24.9 already counted as overweight.
  - **Q**: What's the BMI range for Indian adults?
    **A**: Indian guidance follows the WHO Asian cutoffs: underweight < 18.5, normal 18.5–22.9, overweight 23–24.9, obese ≥ 25. These are tighter than the global ranges because South Asians develop diabetes, hypertension, and cardiovascular disease at lower BMIs than European populations.
  - **Q**: Does BMI work for athletes or very muscular people?
    **A**: Not well. BMI uses total weight, so heavy muscle reads as 'overweight' or 'obese' even when body-fat percentage is low. Athletes, weightlifters, and bodybuilders should use body-fat percentage, waist-to-height ratio, or DEXA scans instead.
  - **Q**: Should men and women use the same BMI calculator?
    **A**: Yes — the formula and adult cutoffs are identical for men and women. Body composition does differ on average between sexes, but BMI itself is sex-neutral. For children and teens (under 20), use age- and sex-specific BMI percentile charts.
  - **Q**: What happens if my BMI is high — should I worry?
    **A**: A high BMI is a screening signal, not a diagnosis. It tells your doctor to look more carefully at metabolic markers (fasting glucose, lipid profile, blood pressure, waist circumference). Action depends on those tests, not on the BMI number alone.
  - **Q**: Why doesn't BMI use waist size?
    **A**: Because it pre-dates the research on visceral fat. Waist circumference and waist-to-height ratio are now considered better single indicators of metabolic risk, and many clinicians use them alongside BMI rather than instead of it.
- **SEO title**: BMI Calculator — Body Mass Index for Adults (with Asian Cutoffs)
- **SEO description**: Free BMI calculator with WHO categories and Asian-specific cutoffs for Indian adults. See your ideal weight range, healthy BMI, and what the result really means.
- **Sources**:
  - [WHO — BMI classification (global)](https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/body-mass-index)
  - [WHO — Asian-specific BMI cutoffs (Lancet 2004)](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(03)15268-3/fulltext)
  - [CDC — About Adult BMI](https://www.cdc.gov/bmi/adult-calculator/index.html)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### BMR Calculator (`bmr-calculator`)
- **Description**: Calculate your Basal Metabolic Rate — the calories your body burns at complete rest.
- **Intro**: BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest — to keep your heart beating, your lungs breathing, your brain firing, and your cells turning over. It accounts for roughly 60–75% of your daily calorie burn even if you do nothing. This calculator uses the Mifflin-St Jeor equation, the formula most clinicians and nutrition apps treat as the modern default for healthy adults. Layer activity on top to estimate your TDEE (total daily energy expenditure).
- **Formula**: `BMR (men) = 10 × kg + 6.25 × cm − 5 × age + 5 · BMR (women) = 10 × kg + 6.25 × cm − 5 × age − 161`
- **How it works**: The Mifflin-St Jeor equation predicts BMR from weight, height, age, and sex. A 30-year-old man at 70 kg and 170 cm has a BMR of 1,649 cal/day; a woman of the same dimensions sits closer to 1,483 cal/day (the −166 offset between formulas reflects average body composition). Multiply BMR by an activity factor — 1.2 sedentary, 1.375 light, 1.55 moderate, 1.725 very active, 1.9 athlete — to get TDEE, the total calories you burn in a day.
- **Ranges — Activity multipliers (BMR × factor = TDEE)**:
  | Label | Range | Note |
  |-------|-------|------|
  | Sedentary | BMR × 1.2 | Desk job, little or no exercise |
  | Lightly active | BMR × 1.375 | 1–3 days a week of light exercise |
  | Moderately active | BMR × 1.55 | 3–5 days a week of moderate exercise |
  | Very active | BMR × 1.725 | 6–7 days a week of hard exercise |
  | Athlete / physical job | BMR × 1.9 | Daily training plus active occupation |
- **Limitations**:
  - Mifflin-St Jeor predicts BMR within ±10% for most healthy adults. Outliers — very lean athletes, people with thyroid disorders, post-menopausal women on hormone therapy — can sit further off the predicted value.
  - It assumes a standard adult body composition. Two 70 kg people with very different muscle-to-fat ratios will have different real BMRs even though the formula returns the same number.
  - Activity multipliers are rough population averages. Real daily burn varies by NEAT (non-exercise activity thermogenesis) — fidgeting, posture, walking around — which is huge between individuals.
  - BMR drops about 1–2% per decade after age 20, mostly due to muscle loss. The age term in the formula approximates this; resistance training partially offsets it.
- **FAQs**:
  - **Q**: What is BMR vs TDEE?
    **A**: BMR is the calories you burn at total rest. TDEE (total daily energy expenditure) is BMR multiplied by an activity factor — it includes everything you do during the day. To lose weight, eat below TDEE; to gain, eat above it.
  - **Q**: Why does this calculator use Mifflin-St Jeor and not Harris-Benedict?
    **A**: Mifflin-St Jeor was published in 1990 and validated in 2005 against modern body-composition data; it predicts BMR more accurately than the older Harris-Benedict equation (1919) for today's population. Most clinical nutritionists default to it.
  - **Q**: Should I eat my BMR or my TDEE?
    **A**: Eat at least your BMR — going below it consistently slows your metabolism and is hard to sustain. Aim for TDEE for maintenance, TDEE − 300 to 500 cal for steady fat loss, TDEE + 200 to 500 for lean muscle gain.
  - **Q**: Does muscle increase BMR?
    **A**: Yes, but less dramatically than fitness magazines claim. Each kg of muscle burns about 13 calories per day at rest, vs. 4.5 for fat. The bigger benefit of muscle is metabolic — better insulin sensitivity and post-workout calorie burn.
  - **Q**: Why is my actual weight loss slower than calculated?
    **A**: Predicted TDEE has ±10% error, you may be tracking food intake low by 20–30% (very common), and your body adapts to a deficit by lowering NEAT. If progress stalls for 3+ weeks, recompute with current weight and tighten tracking before cutting calories further.
- **SEO title**: BMR Calculator — Basal Metabolic Rate (Mifflin-St Jeor)
- **SEO description**: Free BMR calculator using the Mifflin-St Jeor equation. See your basal metabolic rate, TDEE for 5 activity levels, and how many calories your body burns at rest.
- **Sources**:
  - [Mifflin-St Jeor equation (1990 publication)](https://pubmed.ncbi.nlm.nih.gov/2305711/)
  - [ADA review confirming Mifflin as modern default (2005)](https://pubmed.ncbi.nlm.nih.gov/15883556/)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### Calorie Calculator (`calorie-calculator`)
- **Description**: Daily calorie needs to maintain, lose, or gain weight — based on your BMR and activity level.
- **Intro**: Daily calorie needs depend on four things: your basal metabolic rate (the calories you burn at rest), how active you are, and whether you want to maintain, lose, or gain weight. This calculator combines the Mifflin-St Jeor BMR formula with a standard activity multiplier and a 500 cal/day deficit or surplus to give the three target numbers most people care about. The 500 cal figure isn't arbitrary — a deficit of that size produces roughly 0.45 kg (1 lb) of fat loss per week.
- **Formula**: `TDEE = BMR × activity factor · loss target = TDEE − 500 · gain target = TDEE + 500`
- **How it works**: First we compute BMR using the Mifflin-St Jeor equation. Then we multiply by an activity factor (1.2 sedentary up to 1.9 athlete) to get TDEE — your true daily burn. To lose ~0.5 kg/week, eat 500 cal below TDEE; to gain lean muscle slowly, eat 500 cal above. Faster rates work short-term but are harder to sustain and risk muscle loss (when cutting) or fat gain (when bulking).
- **Ranges — Calorie targets — what each level usually looks like**:
  | Label | Range | Note |
  |-------|-------|------|
  | Aggressive cut | TDEE − 750 to 1000 | ~1 kg/week loss; only sustainable for short blocks |
  | Steady cut | TDEE − 500 | ~0.5 kg/week loss; the standard recommendation |
  | Mild cut | TDEE − 250 | ~0.25 kg/week; minimises muscle loss |
  | Maintenance | TDEE | Hold current weight; recompute monthly |
  | Lean bulk | TDEE + 250 to 500 | ~0.25–0.5 kg/week gain; minimises fat gain |
- **Limitations**:
  - TDEE estimates are accurate to about ±10–15%. If you don't lose weight at your calculated 'lose' target after 2–3 weeks, your real TDEE is probably lower than predicted.
  - Most people under-report food intake by 20–30%. A "1,800 calorie diet" tracked casually is often actually 2,200+. Tighten tracking before cutting calories further.
  - Doesn't model the metabolic adaptation of long deficits. After 8–12 weeks of dieting, BMR drops 5–15% beyond what weight loss alone would predict — periodic diet breaks help.
  - For special populations — pregnancy, lactation, eating-disorder recovery, athletes in season — work with a dietitian rather than relying on a generic calculator.
- **FAQs**:
  - **Q**: How many calories should I eat to lose weight?
    **A**: A 500 cal/day deficit from your TDEE produces about 0.5 kg (1 lb) of fat loss per week, which is the rate most evidence-based guidelines recommend. Faster rates work but are harder to sustain and risk muscle loss.
  - **Q**: Why am I not losing weight at my calculated calorie target?
    **A**: Three usual reasons: (1) you're under-reporting food intake — very common, especially with restaurant meals and oils; (2) your TDEE is at the low end of the ±15% range; (3) you've adapted to the deficit and need a 1–2 week diet break before resuming.
  - **Q**: Is 1,200 calories enough for women?
    **A**: 1,200 cal/day is the floor most professional bodies recommend for adult women — going below it is hard to sustain and risks micronutrient deficiencies. If your "lose weight" target is below 1,200, eat 1,200 and add steps instead of cutting further.
  - **Q**: Should I count calories every day forever?
    **A**: No. Use tracking to learn what your portions look like — most people only need to track for 4–8 weeks before they can eyeball it. Long-term, a weekly weigh-in and adjustments to portion size beats forever-tracking.
  - **Q**: How is this different from the BMR calculator?
    **A**: The BMR calculator returns just your basal metabolic rate — the calories you burn at rest. This calorie calculator multiplies BMR by your activity level (TDEE) and then offsets it by ±500 cal to give weight-loss and weight-gain targets directly.
- **SEO title**: Calorie Calculator — Daily Calories to Lose, Gain or Maintain
- **SEO description**: Free daily calorie calculator. See your TDEE, weight-loss target (TDEE − 500), and weight-gain target. Uses Mifflin-St Jeor BMR with 5 activity levels.
- **Sources**:
  - [NIH — Body weight planner methodology](https://www.niddk.nih.gov/bwp)
  - [Mifflin-St Jeor equation (BMR base)](https://pubmed.ncbi.nlm.nih.gov/2305711/)
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26

#### Macro Calculator (`macro-calculator`)
- **Description**: Calculate protein, carbs, and fat ratios.
- **SEO title**: Macro Calculator: Protein, Carbs & Fat in Grams
- **SEO description**: Free macro calculator. Convert your daily calorie target into grams of protein, carbs, and fat at any custom split. Donut chart of your macro mix.

#### Body Fat % (`body-fat-calculator`)
- **Description**: Estimate body fat percentage.
- **SEO title**: Body Fat Calculator: U.S. Navy Method
- **SEO description**: Free body fat percentage calculator using the U.S. Navy circumference method. Just waist, neck, and height — no calipers needed. Includes fitness band.

#### Ideal Weight (`ideal-weight-calculator`)
- **Description**: Find your ideal weight based on height.
- **SEO title**: Ideal Weight Calculator: Devine, Robinson & Miller
- **SEO description**: Free ideal-weight calculator. Compare three classical formulas (Devine, Robinson, Miller) for healthy adult weight given height — useful for fitness goals.

#### Water Intake (`water-intake-calculator`)
- **Description**: Daily water needs based on weight & activity.
- **SEO title**: Water Intake Calculator: Daily Hydration Goal
- **SEO description**: Free water intake calculator. Get your daily hydration target in litres, glasses, and ounces — adjusted for body weight and exercise minutes.

#### Pregnancy Due Date (`pregnancy-due-date`)
- **Description**: Estimate your baby's due date.
- **SEO title**: Pregnancy Due Date Calculator: Weeks Remaining
- **SEO description**: Free pregnancy due-date calculator. Estimate your baby's arrival date, weeks remaining, and current trimester from days since your last period.

#### Ovulation Calculator (`ovulation-calculator`)
- **Description**: Find your fertile window.
- **SEO title**: Ovulation Calculator: Fertile Window by Cycle
- **SEO description**: Free ovulation calculator. Identify your ovulation day and fertile window for any cycle length. Useful for trying to conceive or natural family planning.

#### Heart Rate Zone (`heart-rate-zone`)
- **Description**: Training zones based on age.
- **SEO title**: Heart Rate Zone Calculator: Max HR, Fat-Burn, Cardio
- **SEO description**: Free heart rate zone calculator. Get your max heart rate and the BPM ranges for fat-burn (60–70%) and cardio (70–85%) training zones — by age.

#### VO2 Max (`vo2-max-calculator`)
- **Description**: Estimate aerobic fitness capacity.
- **SEO title**: VO2 Max Calculator: Cooper 12-Minute Run Test
- **SEO description**: Free VO2 max calculator using the Cooper 12-minute run test. Estimate your aerobic fitness capacity and see how it compares to your age band.

#### Running Pace (`pace-calculator`)
- **Description**: Calculate running pace per km/mile.
- **SEO title**: Running Pace Calculator: min/km, min/mi & Speed
- **SEO description**: Free running pace calculator. Convert any distance and time into pace per km, pace per mile, and average speed in km/h. Useful for race planning.

#### One-Rep Max (`one-rep-max`)
- **Description**: Calculate your 1RM for any lift.
- **SEO title**: One-Rep Max Calculator: Estimate 1RM Safely
- **SEO description**: Free one-rep max (1RM) calculator. Estimate your true 1RM from any sub-max set and get target weights for 5-rep (85%) and 10-rep (70%) training.

#### Sleep Cycle (`sleep-cycle-calculator`)
- **Description**: Best bedtime based on wake time.
- **SEO title**: Sleep Cycle Calculator: Best Bedtime by Wake Time
- **SEO description**: Free sleep cycle calculator. Get bedtime suggestions for 4, 5, and 6 sleep cycles so you wake at the end of a cycle, not in the middle.

#### Age Calculator (`age-calculator`)
- **Description**: Calculate your exact age in years, total months, and total days from any date of birth — accurate down to the day.
- **Intro**: An age calculator returns the exact time elapsed between a date of birth and today. Useful for legal documents (passport, school admission, pension), date math ("how old will my grandchild be in 2040?"), or just curiosity. This calculator handles leap years correctly using the 365.25-day average, so the result is accurate within a day. For age-on-a-specific-date (not today), subtract the years between today and that date from the result.
- **Formula**: `age (years) = days_elapsed ÷ 365.25 · age (months) = years × 12 · age (days) = days_elapsed`
- **How it works**: The calculator subtracts the date of birth from today's date, gets the total milliseconds elapsed, and converts to days, months, and years. The 365.25-day year accounts for leap years — over a long span, the average year is 365.25 days (because three regular years and one leap year average to that). For someone born 15 June 1995, today (26 April 2026) the result is 30 years, 366 total months, 11,273 total days. The calculator returns floored integers; the actual fraction of the next year is always positive but rounded down.
- **Ranges — Age milestones in India (legal & social)**:
  | Label | Range | Note |
  |-------|-------|------|
  | 14 | End of compulsory education (Article 21A) | Free education to 14 |
  | 15 | Minimum employment age | With restrictions; 18 for hazardous work |
  | 18 | Voting age | Also marriage age for females; criminal majority |
  | 21 | Marriage age (males) | Drinking age in most states |
  | 25 | Eligible for Lok Sabha contest | Plus state assembly |
  | 30 | Eligible for Rajya Sabha contest | Upper house of Parliament |
  | 60 | Senior citizen status | Tax benefits, FD rate premium, fare concessions |
  | 80 | Super senior citizen | Additional tax exemptions |
- **Limitations**:
  - Calculator uses today's system date. For age on a specific past or future date, you'd need to enter that as the reference (most age calculators don't expose this — use a date difference calculator instead).
  - Years are calculated using 365.25 days/year — accurate for most purposes but off by a day or two for very specific date arithmetic. For exact day-count, use the day-count output rather than computing from years.
  - For pets, plants, or non-human ages, this calculator works but the "age milestones" table is human-specific.
  - Doesn't handle the leap-day birthday edge case (29 February). Such people are typically considered to age on 28 Feb in non-leap years for legal purposes.
- **FAQs**:
  - **Q**: How is age calculated?
    **A**: Subtract the date of birth from the current date, get the elapsed days, divide by 365.25 to get years (the 0.25 averages in leap years). Most calculators floor the result — your "age" is the integer years completed.
  - **Q**: How old will I be on a specific future date?
    **A**: Subtract your birth date from the future date and divide by 365.25. This calculator uses today as the reference; for a specific date, mentally add the years between today and that date to your current age.
  - **Q**: How do I calculate age in days?
    **A**: Subtract the birth date from today and the result in days is your exact age in days. This is what the calculator outputs in its "Total Days" field. Useful for milestone tracking ("our baby turns 1,000 days old").
  - **Q**: Why are years sometimes 365 days and sometimes 366?
    **A**: A leap year (every 4 years, except century years not divisible by 400) has 366 days to keep the calendar aligned with Earth's orbit. Over the long term the average is 365.25 days — that's the number used in age calculations. Over short periods (1–4 years) you'll be off by a day or two if you use 365.
  - **Q**: Does the calculator work for people born before 1900?
    **A**: Yes, JavaScript Date handles dates back to 1 Jan 1970 natively, but slider inputs starting at 1900 cover anyone reasonably alive today. For historical figures or genealogy, the math is the same — pull years and divide.
- **SEO title**: Age Calculator: Exact Years, Months & Days
- **SEO description**: Free age calculator. Get your exact age in years, total months, and total days from your date of birth — accurate down to the day.
- **Reviewed by**: Ankit Gupta — Builder · AllSmartCalculator
- **Last updated**: 2026-04-26
