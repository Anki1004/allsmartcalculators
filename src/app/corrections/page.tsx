import type { Metadata } from 'next';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { lastUpdatedLabel } from '@/lib/policy-dates';
import { breadcrumbSchema } from '@/lib/structured-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';

export const metadata: Metadata = {
  title: 'Corrections — AllSmartCalculators',
  description:
    'Public log of every correction we have published on AllSmartCalculators — what was wrong, what changed, and when.',
  alternates: { canonical: `${SITE_URL}/corrections` },
};

type Correction = {
  date: string;
  page: string;
  pageHref?: string;
  what: string;
  fix: string;
};

// Add a new entry at the top of this array each time a correction ships.
// Keep entries short and factual. Link to the affected page in `pageHref`.
const CORRECTIONS: Correction[] = [
  {
    date: "2026-09-18",
    page: "JNTU CGPA to Percentage Calculator",
    pageHref: "/education/jntu-cgpa-to-percentage",
    what: "The page stated that JNTU Hyderabad, Kakinada and Anantapur all convert CGPA with (CGPA − 0.75) × 10. JNTUH's own B.Tech Academic Regulations (R22, clause 11.2) specify (CGPA − 0.5) × 10, so every JNTUH percentage the page produced was 2.5 points too low.",
    fix: "The calculator now asks which university issued the marks memo: JNTUH uses (CGPA − 0.5) × 10 and JNTUK (CGPA − 0.75) × 10. JNTUA was removed until its regulation has been read, because published sources disagree on its rule.",
  },
  {
    date: "2026-09-10",
    page: "GST Calculator",
    pageHref: "/finance/gst-calculator",
    what: "The page title, meta description and social preview still advertised the 5%, 12%, 18% and 28% GST slabs. The 12% and 28% slabs were abolished from 22 September 2025, when the structure moved to 5%, 18% and a 40% de-merit rate.",
    fix: "All four fields now describe the 5% / 18% / 40% structure. The calculator itself already carried the current rates; only the descriptive copy was out of date.",
  },
];

export default function CorrectionsPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-5 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: SITE_URL },
              { name: 'Corrections', url: `${SITE_URL}/corrections` },
            ]),
          ),
        }}
      />

      <div className="max-w-3xl mx-auto">
        <div className="mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-primary mb-2 sm:mb-3">
            Editorial
          </p>
          <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter text-on-surface mb-3 sm:mb-4">
            Corrections log
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            Every time we publish a correction, we record it here — the page it affected,
            what was wrong, and what changed. Built so you can hold us to our{' '}
            <Link href="/editorial-policy" className="text-primary hover:underline">
              editorial policy
            </Link>
            .
          </p>
          <p className="text-[11px] sm:text-xs text-on-surface-variant/50 mt-3 sm:mt-4 font-mono">
            {lastUpdatedLabel('corrections')}
          </p>
        </div>

        {CORRECTIONS.length === 0 ? (
          <GlassCard className="p-6 sm:p-8 text-center">
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              No corrections have been published yet. When one is, it will appear here with
              the date, the affected page, and a short note on what changed.
            </p>
            <p className="text-xs text-on-surface-variant/70">
              Spotted an issue? Email{' '}
              <a href="mailto:allsmartcalculators@gmail.com" className="text-primary hover:underline">
                allsmartcalculators@gmail.com
              </a>{' '}
              or use the{' '}
              <Link href="/contact" className="text-primary hover:underline">
                contact form
              </Link>
              .
            </p>
          </GlassCard>
        ) : (
          <div className="flex flex-col gap-4">
            {CORRECTIONS.map((c, i) => (
              <GlassCard key={i} className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <time className="text-xs font-mono text-on-surface-variant/70">{c.date}</time>
                  {c.pageHref ? (
                    <Link href={c.pageHref} className="text-sm font-semibold text-primary hover:underline">
                      {c.page}
                    </Link>
                  ) : (
                    <span className="text-sm font-semibold text-on-surface">{c.page}</span>
                  )}
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-1">
                  <strong className="text-on-surface">What was wrong:</strong> {c.what}
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  <strong className="text-on-surface">Fix:</strong> {c.fix}
                </p>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
