import type { Metadata } from 'next';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import CmsRichText from '@/components/CmsRichText';
import { getMethodologyPage } from '@/lib/strapi';
import {
  ChevronRight,
  BookCheck,
  GitCompareArrows,
  Scale,
  RefreshCcw,
  ExternalLink,
} from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.com';
const PAGE_URL = `${SITE_URL}/methodology`;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getMethodologyPage();
  const title =
    cms?.pageTitle ?? 'Methodology — How AllSmartCalculator Builds Its Calculators';
  const description =
    cms?.metaDescription ??
    'How every calculator on AllSmartCalculator is built, sourced, verified, and updated — including data sources, formula references, and our review process.';
  const canonical = cms?.linkCanonical ?? PAGE_URL;
  return {
    title,
    description,
    keywords: cms?.metaKeywords ?? undefined,
    authors: [{ name: cms?.metaAuthor ?? 'AllSmartCalculator Team' }],
    robots: cms?.metaRobots ?? 'index, follow',
    alternates: { canonical },
    openGraph: {
      title: cms?.metaOgTitle ?? 'How AllSmartCalculator Builds Its Calculators',
      description:
        cms?.metaOgDescription ??
        'Sources, formulas, verification process, and update cadence behind every calculator.',
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

const principles = [
  {
    icon: BookCheck,
    title: 'Recognised formulas only',
    text: 'Every calculator implements the standard, recognised formula for its domain — the same one in textbooks, official handbooks, and industry tools. We never invent shortcuts that change the answer.',
  },
  {
    icon: GitCompareArrows,
    title: 'Cross-checked against benchmarks',
    text: 'Before launch, each calculator is tested against known input/output pairs from at least one external reference (a textbook problem, a published bank EMI table, or an authoritative comparison tool).',
  },
  {
    icon: Scale,
    title: 'Honest about limits',
    text: "Every calculator ships with a limitations section that names what the tool can't do — it doesn't model fees, it assumes constant rates, it uses a population average. We'd rather you trust us less than misuse the result.",
  },
  {
    icon: RefreshCcw,
    title: 'Updated when reality changes',
    text: 'Tax slabs, GST rates, repo rates, and WHO guidance all change. Calculators that depend on changing inputs carry a visible "last updated" date and are reviewed against the source at least annually — and immediately when the source changes.',
  },
];

const sources = [
  {
    domain: 'Indian finance & tax',
    items: [
      { label: 'RBI — repo rate, monetary policy, fair-practice code', url: 'https://www.rbi.org.in/' },
      { label: 'IT department of India — tax slabs (new & old regime)', url: 'https://www.incometax.gov.in/iec/foportal/' },
      { label: 'SEBI — mutual funds, investor protection', url: 'https://www.sebi.gov.in/' },
      { label: 'IRDAI — insurance regulations and rates', url: 'https://www.irdai.gov.in/' },
      { label: 'GSTN — GST rates and council updates', url: 'https://www.gst.gov.in/' },
    ],
  },
  {
    domain: 'Health',
    items: [
      { label: 'WHO — BMI classifications (global and Asian-specific)', url: 'https://www.who.int/' },
      { label: 'CDC — adult BMI, calorie needs, growth charts', url: 'https://www.cdc.gov/' },
      { label: 'ICMR — Indian dietary and nutrition guidelines', url: 'https://www.icmr.gov.in/' },
    ],
  },
  {
    domain: 'Math, engineering & general',
    items: [
      { label: 'NIST — units, constants, scientific reference', url: 'https://www.nist.gov/' },
      { label: 'Wolfram MathWorld — formula reference', url: 'https://mathworld.wolfram.com/' },
    ],
  },
];

export default async function MethodologyPage() {
  const cms = await getMethodologyPage();

  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-5 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant/70 mb-4 flex-wrap"
        >
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-primary">Methodology</span>
        </nav>

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-primary mb-2 sm:mb-3">Methodology</p>
          <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter text-on-surface mb-3 sm:mb-4">
            How we build &amp; verify every calculator
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            AllSmartCalculator is a free public tool that touches money and health
            decisions — categories where being wrong has real consequences. This
            page is our public commitment to how we get it right, and how we
            tell you when we can&apos;t.
          </p>
          <p className="text-[11px] sm:text-xs text-on-surface-variant/50 mt-3 sm:mt-4 font-mono">
            Last updated April 26, 2026
          </p>
        </div>

        {cms?.body ? (
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <CmsRichText content={cms.body} />
          </GlassCard>
        ) : (
          <>
        {/* Principles */}
        <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl tracking-tighter mb-5 sm:mb-6">
          Editorial principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-10 sm:mb-12">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <GlassCard key={p.title} className="p-5 sm:p-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center shadow-glow-primary mb-3 sm:mb-4">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-headline font-bold text-base text-on-surface mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{p.text}</p>
              </GlassCard>
            );
          })}
        </div>

        {/* Process */}
        <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl tracking-tighter mb-5 sm:mb-6">
          How a calculator gets built
        </h2>
        <GlassCard className="p-5 sm:p-6 md:p-8 mb-10 sm:mb-12">
          <ol className="flex flex-col gap-5 text-sm md:text-base text-on-surface-variant leading-relaxed">
            <li>
              <p className="font-semibold text-on-surface mb-1">1. Pick the formula.</p>
              <p>
                We start from a single recognised source — a textbook, an official
                regulator handbook, or a peer-reviewed reference — and use exactly
                the formula it specifies. No averaging across sources, no
                undocumented adjustments.
              </p>
            </li>
            <li>
              <p className="font-semibold text-on-surface mb-1">2. Implement and unit-test.</p>
              <p>
                The formula is implemented in TypeScript and unit-tested against
                worked examples from the source. For finance calculators we
                additionally verify outputs against at least one major Indian
                bank&apos;s published EMI table or one official mutual-fund
                projection. Discrepancies of more than 0.5% are investigated
                before launch.
              </p>
            </li>
            <li>
              <p className="font-semibold text-on-surface mb-1">3. Write the explainer.</p>
              <p>
                Every calculator ships with a plain-language explanation of the
                formula, a worked example, a categories or ranges table where
                applicable, a frank limitations section, and 4–8 FAQs. The goal
                is that the calculator alone should be enough to understand the
                topic; the page should not require a textbook on the side.
              </p>
            </li>
            <li>
              <p className="font-semibold text-on-surface mb-1">4. Add structured data.</p>
              <p>
                Each page emits JSON-LD for WebApplication, BreadcrumbList, and —
                where FAQs are present — FAQPage. This is what allows results
                to appear with rich snippets in search and to be cited cleanly
                in AI Overviews and assistants.
              </p>
            </li>
            <li>
              <p className="font-semibold text-on-surface mb-1">5. Date-stamp and review.</p>
              <p>
                Every calculator carries a visible &quot;last updated&quot; date
                and is reviewed against its source at least annually. Tax-slab,
                repo-rate, and GST-rate dependent calculators are reviewed
                immediately whenever the source changes.
              </p>
            </li>
          </ol>
        </GlassCard>

        {/* Sources */}
        <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl tracking-tighter mb-5 sm:mb-6">
          Primary sources
        </h2>
        <div className="flex flex-col gap-4 sm:gap-5 mb-10 sm:mb-12">
          {sources.map((s) => (
            <GlassCard key={s.domain} className="p-5 sm:p-6 md:p-8">
              <h3 className="font-headline font-bold text-base sm:text-lg text-on-surface mb-3 sm:mb-4">
                {s.domain}
              </h3>
              <ul className="flex flex-col gap-2 sm:gap-2.5">
                {s.items.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-1.5 text-xs sm:text-sm text-primary hover:underline break-words"
                    >
                      <span>{item.label}</span>
                      <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        {/* Corrections */}
        <GlassCard className="p-5 sm:p-6 md:p-8 border-l-2 border-primary/60">
          <h2 className="font-headline font-bold text-base sm:text-lg md:text-xl text-on-surface mb-3">
            Corrections policy
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-3 break-words">
            If you spot a wrong number, a misapplied formula, or an outdated
            reference, we&apos;d much rather hear about it than not. Email{' '}
            <span className="text-primary font-mono break-all">hello@allsmartcalculator.com</span>{' '}
            with the calculator URL, the inputs you used, and the expected result.
          </p>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Confirmed corrections ship within 48 hours. Material corrections
            (anything that would have changed a user&apos;s decision) are noted
            on the calculator page itself, with the date of the change.
          </p>
        </GlassCard>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-primary-dim to-primary text-white font-semibold text-sm shadow-glow-primary press"
          >
            About AllSmartCalculator
          </Link>
          <Link
            href="/disclaimer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass glass-border text-on-surface font-semibold text-sm hover:bg-white/5 transition-colors"
          >
            Read the disclaimer
          </Link>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
