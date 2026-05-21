import type { Metadata } from 'next';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { lastUpdatedLabel } from '@/lib/policy-dates';
import { breadcrumbSchema } from '@/lib/structured-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';

export const metadata: Metadata = {
  title: 'Editorial Policy — AllSmartCalculators',
  description:
    'How AllSmartCalculators researches, fact-checks, reviews, and corrects every calculator and article — including independence, sources, and AI-assistance disclosure.',
  alternates: { canonical: `${SITE_URL}/editorial-policy` },
};

export default function EditorialPolicyPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-5 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: SITE_URL },
              { name: 'Editorial policy', url: `${SITE_URL}/editorial-policy` },
            ]),
          ),
        }}
      />

      <div className="max-w-3xl mx-auto">
        <div className="mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-primary mb-2 sm:mb-3">Editorial</p>
          <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter text-on-surface mb-3 sm:mb-4">
            Editorial policy
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            How we research, fact-check, review, and correct everything published on
            AllSmartCalculators — written so you can hold us to it.
          </p>
          <p className="text-[11px] sm:text-xs text-on-surface-variant/50 mt-3 sm:mt-4 font-mono">
            {lastUpdatedLabel('editorialPolicy')}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Independence</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              AllSmartCalculators is independently owned and operated by Ankit Gupta. We are
              not paid by any bank, broker, mutual-fund house, insurer, gym, supplement
              brand, or government body to recommend their products. Our only revenue source
              is contextual advertising delivered by Google AdSense.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              We do not accept payment to publish, promote, or rank any product or service.
              If that ever changes (paid placements, sponsored guides, affiliate links) we
              will label every such unit clearly and disclose the commercial relationship at
              the top of the page.
            </p>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Sources we rely on</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              Every calculator and article cites at least one primary source. We prefer
              official government or regulator publications over secondary commentary.
              Typical sources by topic:
            </p>
            <ul className="flex flex-col gap-2 text-sm text-on-surface-variant leading-relaxed">
              {[
                ['Finance & tax', 'Reserve Bank of India (RBI), Income Tax Department of India, SEBI, NPCI, Ministry of Finance circulars.'],
                ['Health & fitness', 'World Health Organization (WHO), Indian Council of Medical Research (ICMR), peer-reviewed clinical studies indexed on PubMed.'],
                ['Math & science', 'Standard textbooks (NCERT, Khanna, Stewart) and peer-reviewed journals; results cross-checked against Wolfram Alpha or equivalent reference engines.'],
                ['Crypto & markets', 'Public on-chain data, exchange documentation, and India\'s Income Tax Act sections 115BBH and 194S for tax treatment.'],
              ].map(([k, v]) => (
                <li key={k} className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">→</span>
                  <span><strong className="text-on-surface">{k}.</strong> {v}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">How we fact-check a new calculator</h2>
            <ol className="flex flex-col gap-2 text-sm text-on-surface-variant leading-relaxed list-decimal pl-5">
              <li>Identify the canonical formula and at least one primary source.</li>
              <li>Implement the formula in TypeScript. Add inline references in the source code so future reviewers can verify the choice.</li>
              <li>Cross-check the result against at least two independent tools (an official government calculator where available, and a widely used industry tool).</li>
              <li>Pick three real-world test inputs (low, middle, high) and document the expected outputs in our internal review log.</li>
              <li>Write the on-page explanation, list assumptions and limitations, and link the primary source.</li>
              <li>Publish only when results match every independent tool to within rounding tolerance.</li>
            </ol>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Review cadence</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              Each calculator carries a <em>Last updated</em> date showing the most recent
              substantive review. Time-sensitive tools — income tax, GST, PPF, FD rates,
              ICMR BMI cutoffs — are reviewed at least once a year and immediately after
              any regulator announces a change. Evergreen tools (compound interest, ohm&apos;s
              law, BMR) are reviewed every two years.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Reviews are documented in version control; you can audit our history through
              the project&apos;s git log.
            </p>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Use of AI assistance</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              We use large language models (Claude, ChatGPT, Gemini) as drafting and code-review
              assistants — never as a primary source. Every fact, formula, and number that
              appears on the site is verified by a human against the primary sources listed
              above before publishing.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              The site does not auto-publish AI-generated content. Articles and explanations
              may start as AI drafts but are edited, fact-checked, and signed off by Ankit
              Gupta personally.
            </p>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Corrections</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Found a wrong number, broken formula, or out-of-date slab? Email{' '}
              <a href="mailto:allsmartcalculators@gmail.com" className="text-primary hover:underline">
                allsmartcalculators@gmail.com
              </a>{' '}
              or use the{' '}
              <Link href="/contact" className="text-primary hover:underline">
                contact form
              </Link>
              . Every confirmed correction is logged publicly on the{' '}
              <Link href="/corrections" className="text-primary hover:underline">
                corrections page
              </Link>{' '}
              with the date the issue was flagged, what changed, and a link to the fix.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
