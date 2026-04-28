import { Metadata } from 'next';
import GlassCard from '@/components/GlassCard';
import CmsRichText from '@/components/CmsRichText';
import { getDisclaimerPage } from '@/lib/strapi';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.com';

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getDisclaimerPage();
  const title = cms?.pageTitle ?? 'Disclaimer — AllSmartCalculator';
  const description =
    cms?.metaDescription ??
    "Important context about AllSmartCalculator calculator results — what they mean, what they don't, and when to go beyond them.";
  const canonical = cms?.linkCanonical ?? `${SITE_URL}/disclaimer`;
  return {
    title,
    description,
    keywords: cms?.metaKeywords ?? undefined,
    authors: [{ name: cms?.metaAuthor ?? 'AllSmartCalculator Team' }],
    robots: cms?.metaRobots ?? 'index, follow',
    alternates: { canonical },
    openGraph: {
      title: cms?.metaOgTitle ?? title,
      description:
        cms?.metaOgDescription ??
        'Calculator results are estimates, not financial, medical, legal, or professional advice.',
      url: cms?.metaOgUrl ?? canonical,
      type: (cms?.metaOgType as 'website') ?? 'website',
      siteName: cms?.metaOgSiteName ?? 'AllSmartCalculator',
      ...(cms?.metaOgImage && { images: [{ url: cms.metaOgImage }] }),
    },
    twitter: {
      card: (cms?.metaTwitterCard as 'summary_large_image') ?? 'summary_large_image',
      title: cms?.metaTwitterTitle ?? title,
      description: cms?.metaTwitterDescription ?? description,
      site: cms?.metaTwitterSite ?? '@AllSmartCalculator',
      ...(cms?.metaTwitterImage && { images: [cms.metaTwitterImage] }),
    },
  };
}

export default async function DisclaimerPage() {
  const cms = await getDisclaimerPage();

  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-5 md:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-primary mb-2 sm:mb-3">Legal</p>
          <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter text-on-surface mb-3 sm:mb-4">
            Disclaimer
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            Calculators are powerful thinking tools. Here's what ours can — and can't — do for you.
          </p>
          <p className="text-[11px] sm:text-xs text-on-surface-variant/50 mt-3 sm:mt-4 font-mono">Last updated April 18, 2026</p>
        </div>

        {cms?.body ? (
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <CmsRichText content={cms.body} />
          </GlassCard>
        ) : (
          <div className="flex flex-col gap-5">

          {/* Quick summary */}
          <GlassCard className="p-5 sm:p-6 md:p-8 border-l-2 border-primary/60">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">The quick summary</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              AllSmartCalculator results are mathematical estimates for informational use only. They are not financial, medical, legal, or professional advice of any kind. For decisions that genuinely matter — taking out a loan, managing a health condition, filing taxes — verify your numbers with a qualified professional who understands your full situation.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              We've built these calculators carefully and we believe they're useful. But useful and sufficient aren't the same thing. This page explains exactly where the line is.
            </p>
          </GlassCard>

          {/* Numbers are a starting point */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-4">Numbers are a starting point, not an endpoint</h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">How our calculators work.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Every calculator on AllSmartCalculator takes inputs you provide and runs them through a formula. The output is a mathematical result — not a prediction, not a promise, and not personalised advice. Change the inputs and you'll change the answer. That's how math works.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">What affects real-world outcomes.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Real outcomes depend on factors that no general-purpose calculator can account for: your specific circumstances, changing market conditions, institutional terms, regulatory rules, and countless other variables. Our output is a model, not a mirror of reality.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">How to use results well.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Use our numbers to build intuition, compare scenarios, and prepare for conversations with professionals — not to make final decisions on your own. An AllSmartCalculator result that makes you ask better questions has done its job.</p>
              </div>
            </div>
          </GlassCard>

          {/* Finance calculators */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-4">Financial calculators</h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">What they cover.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Our finance section includes tools for loans, EMI, compound interest, investments, savings goals, retirement projections, tax estimates, and more. These can be genuinely useful for planning and comparison — but they're based on simplified models with assumptions baked in.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">What they can't account for.</p>
                <ul className="space-y-2 mt-2">
                  {[
                    'Loan products include fees, insurance, prepayment penalties, and terms that no general calculator can anticipate',
                    'Investment returns depend on markets that don\'t move in straight lines — past performance does not predict future performance',
                    'Tax figures depend on jurisdiction-specific rules that change regularly and interact with your specific income situation',
                    'Retirement projections assume constant returns and don\'t model sequence-of-returns risk or inflation variance',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <span className="text-primary mt-0.5 shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Our recommendation.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Treat these results as educated ballpark figures, not quotes or guarantees. Before taking out a loan, making a significant investment, or filing anything tax-related, speak with a qualified financial advisor or accountant.</p>
              </div>
            </div>
          </GlassCard>

          {/* Health calculators */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-4">Health calculators</h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">What they cover.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Our health tools calculate BMI, calorie needs, heart rate zones, ideal body weight, water intake, sleep recommendations, pregnancy timelines, and more. These are useful for building awareness and setting rough starting points.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">The limitations you should know.</p>
                <ul className="space-y-2 mt-2">
                  {[
                    'BMI is a population-level screening tool with well-documented limitations when applied to individuals — it doesn\'t account for muscle mass, bone density, or body composition',
                    'Calorie calculators give estimates based on population averages; your actual metabolism depends on factors no formula fully captures',
                    'Heart rate zones are approximations — individual variation is significant and exercise tolerance is personal',
                    'Sleep and hydration recommendations are general guidelines, not personalised prescriptions',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <span className="text-primary mt-0.5 shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Not a medical assessment.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Nothing on AllSmartCalculator replaces a conversation with a doctor, dietitian, or other qualified health professional — especially if you're managing a health condition, pregnant, or making a decision with real health consequences.</p>
              </div>
            </div>
          </GlassCard>

          {/* Currency exchange rates */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-4">Currency exchange rates</h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">How our rates work.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">The currency converter uses reference rates that are updated periodically. These are indicative figures intended for rough comparison and general awareness — not live, real-time interbank rates.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">What our rates are not.</p>
                <ul className="space-y-2 mt-2">
                  {[
                    'Not the rate you\'ll get from your bank — banks add a spread',
                    'Not the rate your credit card will charge — card networks have their own conversion fees',
                    'Not the rate at an airport currency exchange — often the worst rates available',
                    'Not suitable for finalising international business transactions or contract valuations',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <span className="text-primary mt-0.5 shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Best use.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Use the converter for rough comparisons, travel budgeting, and getting a general sense of value. For actual transactions, always check the rate directly with your bank or payment provider at the time of the transaction.</p>
              </div>
            </div>
          </GlassCard>

          {/* Crypto and investment */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-4">Crypto and investment calculators</h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Scenarios, not forecasts.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Calculators in this section help you model what-if scenarios — what $1,000 might grow to at a given annual return, what a DCA strategy looks like over time, and so on. These are arithmetic exercises, not predictions. The calculator has no idea what markets will actually do.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Past performance disclaimer.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Past performance of any asset — including cryptocurrencies, stocks, or indices — does not predict future performance. A calculation that shows your investment doubling at 15% annual growth is showing you the math of that scenario, not the likelihood of it happening.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Crypto-specific risks.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Crypto markets are highly volatile, operate 24/7, are largely unregulated in many jurisdictions, and can move dramatically in short periods. These calculators do not model risk — they model growth. Never invest more than you can afford to lose, and be sceptical of any tool (including ours) that makes this seem simple.</p>
              </div>
            </div>
          </GlassCard>

          {/* Engineering and scientific */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-4">Engineering and scientific calculators</h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Appropriate uses.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Our engineering tools are suitable for learning, coursework, estimation, and preliminary calculation. They're useful for developing intuition about how systems behave and for checking ballpark figures before doing more rigorous analysis.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Not for safety-critical decisions.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">These tools should not be used as the sole basis for any engineering decision where safety is involved. Load calculations, electrical specifications, structural assessments, fluid systems — any real-world application that matters needs to be verified by a licensed engineer using appropriate professional tools, codes of practice, and safety factors.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Unit assumptions.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">We clearly indicate units where applicable, but always double-check that your inputs match the expected units. Unit errors are one of the most common sources of calculation mistakes in practice.</p>
              </div>
            </div>
          </GlassCard>

          {/* Formula accuracy */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-4">Formula accuracy and error reporting</h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">How we build our calculators.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">We implement standard, recognised formulas for each calculator — the same methods used in textbooks, industry tools, and academic references. Results are cross-checked against known benchmarks and tested for edge cases before release.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">We can still be wrong.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Formulas can be implemented with subtle errors. Assumptions that hold in one context don't always hold in another. We're not infallible, and we don't pretend to be. If something looks wrong to you, trust that instinct — check it, and then tell us.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">How to report an issue.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">If you find a result that looks incorrect or a formula that seems to be misapplied, please contact us at <span className="text-primary font-mono">hello@allsmartcalculator.com</span>. We take these reports seriously and would much rather fix a mistake than leave it quietly in place.</p>
              </div>
            </div>
          </GlassCard>

          {/* In short */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">The bottom line</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              Use AllSmartCalculator to learn, explore, stress-test your assumptions, and get a feel for numbers. Use professionals when the stakes are real.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              We genuinely believe the calculators here are useful — that's why we built them, and why we keep improving them. But there's a meaningful difference between a tool that helps you think and a service that tells you what to do. We're the former. Please treat us that way.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              If you have any questions about how a specific calculator works or what assumptions it makes, get in touch. We're happy to explain the methodology behind any tool on the site.
            </p>
          </GlassCard>

          </div>
        )}
      </div>
    </div>
  );
}
