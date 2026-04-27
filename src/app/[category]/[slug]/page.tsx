import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, CalendarDays, ExternalLink } from 'lucide-react';
import {
  allCalculators,
  getCalculatorBySlug,
  getCalculatorsByCategory,
} from '@/lib/calculator-registry';
import { CATEGORIES, CalculatorCategory } from '@/lib/calculator-types';
import { getCalcContent } from '@/lib/strapi';
import CalculatorEngine from '@/components/CalculatorEngine';
import CalculatorCard from '@/components/CalculatorCard';
import GlassCard from '@/components/GlassCard';
import CalculatorCMS from '@/components/CalculatorCMS';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.tech';

const APPLICATION_CATEGORY_BY_CATEGORY: Record<string, string> = {
  finance: 'FinanceApplication',
  health: 'HealthApplication',
  math: 'EducationalApplication',
  crypto: 'FinanceApplication',
  engineering: 'UtilitiesApplication',
  'daily-life': 'UtilitiesApplication',
  education: 'EducationalApplication',
  business: 'BusinessApplication',
};

export function generateStaticParams() {
  return allCalculators.map((calc) => ({
    category: calc.category,
    slug: calc.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) return { title: 'Not Found' };

  const cms = await getCalcContent(params.slug);
  const pageUrl = `${SITE_URL}/${params.category}/${params.slug}`;

  // Title precedence: CMS > seo override > sensible default ("X Calculator | AllSmartCalculator")
  const baseTitle = cms?.pageTitle ?? calc.seo?.title ?? `${calc.name} — Free Online Tool`;
  const title = baseTitle.includes('AllSmartCalculator')
    ? baseTitle
    : `${baseTitle} | AllSmartCalculator`;
  const description = cms?.metaDescription ?? calc.seo?.description ?? calc.description;
  const canonicalUrl = cms?.linkCanonical ?? pageUrl;

  return {
    title,
    description,
    keywords: cms?.metaKeywords ?? undefined,
    authors: [{ name: cms?.metaAuthor ?? calc.reviewedBy?.name ?? 'AllSmartCalculator Team' }],
    robots: cms?.metaRobots ?? 'index, follow',
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: cms?.metaOgTitle ?? title,
      description: cms?.metaOgDescription ?? description,
      type: (cms?.metaOgType as 'website') ?? 'website',
      url: cms?.metaOgUrl ?? canonicalUrl,
      siteName: cms?.metaOgSiteName ?? 'AllSmartCalculator',
      ...(cms?.metaOgImage && { images: [{ url: cms.metaOgImage, width: 1200, height: 630, alt: title }] }),
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

export default async function CalculatorPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc || calc.category !== params.category) notFound();

  const categoryInfo = CATEGORIES.find((c) => c.id === calc.category);
  const related = getCalculatorsByCategory(calc.category as CalculatorCategory)
    .filter((c) => c.slug !== calc.slug)
    .slice(0, 4);

  const cms = await getCalcContent(params.slug);
  const pageUrl = `${SITE_URL}/${params.category}/${params.slug}`;
  const lastUpdated = calc.lastUpdated ?? '2026-04-26';
  const lastUpdatedDisplay = new Date(lastUpdated).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // ── JSON-LD: WebApplication + BreadcrumbList + (FAQPage if FAQs exist) ──
  const faqs = calc.faqs ?? [];
  const cmsFaqs = (cms?.faqs ?? []).map((f) => ({ q: f.question, a: f.answer }));
  const allFaqs = [...faqs, ...cmsFaqs];

  const webAppSchema = cms?.customSchema ?? {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calc.name,
    url: pageUrl,
    description: calc.seo?.description ?? calc.description,
    applicationCategory:
      calc.seo?.applicationCategory ??
      APPLICATION_CATEGORY_BY_CATEGORY[calc.category] ??
      'UtilitiesApplication',
    operatingSystem: 'Any (web browser)',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    dateModified: lastUpdated,
    publisher: {
      '@type': 'Organization',
      name: 'AllSmartCalculator',
      url: SITE_URL,
    },
    ...(calc.seo?.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: calc.seo.rating.value,
        reviewCount: calc.seo.rating.count,
      },
    }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryInfo?.name ?? calc.category,
        item: `${SITE_URL}/${calc.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: calc.shortName ?? calc.name,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = allFaqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: allFaqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant/70 mb-4 flex-wrap"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link
              href={`/${calc.category}`}
              className="hover:text-primary transition-colors"
            >
              {categoryInfo?.name ?? calc.category}
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-primary truncate max-w-[60vw]">{calc.shortName ?? calc.name}</span>
          </nav>

          {/* Title */}
          <div className="mb-5 sm:mb-6">
            <h1 className="font-headline font-black text-2xl sm:text-3xl md:text-5xl tracking-tighter text-on-surface mb-2 break-words">
              {calc.name}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-on-surface-variant max-w-2xl">
              {calc.description}
            </p>
          </div>

          {/* Author / Reviewed-by + last updated (E-E-A-T) */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-on-surface-variant/80 mb-8">
            {calc.reviewedBy ? (
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-tertiary" />
                Reviewed by{' '}
                {calc.reviewedBy.href ? (
                  <Link
                    href={calc.reviewedBy.href}
                    className="text-primary font-semibold hover:underline"
                  >
                    {calc.reviewedBy.name}
                  </Link>
                ) : (
                  <span className="text-primary font-semibold">
                    {calc.reviewedBy.name}
                  </span>
                )}
                <span>· {calc.reviewedBy.credential}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-tertiary" />
                Built by{' '}
                <Link
                  href="/author/ankit-gupta"
                  className="text-primary font-semibold hover:underline"
                >
                  Ankit Gupta
                </Link>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-on-surface-variant/60" />
              <time dateTime={lastUpdated}>Last updated {lastUpdatedDisplay}</time>
            </span>
          </div>

          {/* Indexable intro (above-the-fold so the page has content even if JS-heavy) */}
          {calc.intro && (
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed max-w-3xl mb-8 border-l-2 border-primary/40 pl-4">
              {calc.intro}
            </p>
          )}

          {/* CALCULATOR */}
          <CalculatorEngine slug={calc.slug} />

          {/* CMS content from Strapi (intro, tips, formula, FAQs) */}
          <CalculatorCMS slug={calc.slug} />

          {/* How it works + Formula */}
          {(calc.howItWorks || calc.formula) && (
            <section className="mt-10 sm:mt-12">
              <GlassCard className="p-5 sm:p-6 md:p-8">
                <h2 className="font-headline font-bold text-lg sm:text-xl md:text-2xl text-on-surface mb-3 sm:mb-4">
                  How {calc.shortName ?? calc.name} is calculated
                </h2>
                {calc.howItWorks && (
                  <p className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
                    {calc.howItWorks}
                  </p>
                )}
                {calc.formula && (
                  <code className="font-mono text-xs sm:text-sm md:text-base text-on-surface block bg-surface-container-lowest p-3 sm:p-4 rounded-xl overflow-x-auto whitespace-pre">
                    {calc.formula}
                  </code>
                )}
              </GlassCard>
            </section>
          )}

          {/* Categories / Ranges reference table */}
          {calc.ranges && calc.ranges.rows.length > 0 && (
            <section className="mt-6 sm:mt-8">
              <GlassCard className="p-5 sm:p-6 md:p-8">
                <h2 className="font-headline font-bold text-lg sm:text-xl md:text-2xl text-on-surface mb-4 sm:mb-5">
                  {calc.ranges.title}
                </h2>
                <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
                  <table className="w-full text-xs sm:text-sm min-w-[480px]">
                    <thead>
                      <tr className="border-b border-white/10 text-left">
                        <th className="py-3 pr-4 sm:pr-6 text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-primary">
                          Category
                        </th>
                        <th className="py-3 pr-4 sm:pr-6 text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-primary">
                          Range
                        </th>
                        <th className="py-3 text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-primary">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {calc.ranges.rows.map((row) => (
                        <tr key={row.label} className="border-b border-white/5 last:border-0">
                          <td className="py-3 pr-4 sm:pr-6 font-semibold text-on-surface">
                            {row.label}
                          </td>
                          <td className="py-3 pr-4 sm:pr-6 font-mono text-on-surface-variant">
                            {row.range}
                          </td>
                          <td className="py-3 text-on-surface-variant/80">
                            {row.note ?? '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </section>
          )}

          {/* Limitations (E-E-A-T honesty signal) */}
          {calc.limitations && calc.limitations.length > 0 && (
            <section className="mt-6 sm:mt-8">
              <GlassCard className="p-5 sm:p-6 md:p-8">
                <h2 className="font-headline font-bold text-lg sm:text-xl md:text-2xl text-on-surface mb-3 sm:mb-4">
                  Limitations &amp; what this calculator can&apos;t tell you
                </h2>
                <ul className="flex flex-col gap-3">
                  {calc.limitations.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm md:text-base text-on-surface-variant leading-relaxed"
                    >
                      <span className="text-primary shrink-0 mt-0.5">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </section>
          )}

          {/* FAQs (in-page; the JSON-LD FAQPage block above mirrors this) */}
          {calc.faqs && calc.faqs.length > 0 && (
            <section className="mt-6 sm:mt-8">
              <GlassCard className="p-5 sm:p-6 md:p-8">
                <h2 className="font-headline font-bold text-lg sm:text-xl md:text-2xl text-on-surface mb-4 sm:mb-5">
                  Frequently asked questions
                </h2>
                <div className="divide-y divide-white/5">
                  {calc.faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group py-3 sm:py-4 first:pt-0 last:pb-0"
                    >
                      <summary className="flex items-center justify-between gap-3 cursor-pointer list-none text-sm md:text-base font-semibold text-on-surface hover:text-primary transition-colors">
                        <span className="flex-1">{faq.q}</span>
                        <ChevronRight className="w-4 h-4 shrink-0 text-on-surface-variant group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="mt-3 text-sm md:text-base text-on-surface-variant leading-relaxed">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </GlassCard>
            </section>
          )}

          {/* Sources / outbound authority links (E-E-A-T) */}
          {calc.seo?.sources && calc.seo.sources.length > 0 && (
            <section className="mt-6 sm:mt-8">
              <GlassCard className="p-5 sm:p-6 md:p-8">
                <h2 className="font-headline font-bold text-base md:text-lg text-on-surface mb-3">
                  Sources &amp; references
                </h2>
                <ul className="flex flex-col gap-2">
                  {calc.seo.sources.map((src) => (
                    <li key={src.url}>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary hover:underline break-words"
                      >
                        {src.label}
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </section>
          )}

          {/* Related calculators */}
          {related.length > 0 && (
            <section className="mt-12 sm:mt-16">
              <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl tracking-tighter mb-5 sm:mb-6">
                Related calculators
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {related.map((c) => (
                  <CalculatorCard key={c.slug} calculator={c} />
                ))}
              </div>
            </section>
          )}

          {/* Disclaimer link for YMYL categories */}
          {(calc.category === 'finance' ||
            calc.category === 'health' ||
            calc.category === 'crypto') && (
            <p className="mt-10 sm:mt-12 text-[11px] sm:text-xs text-on-surface-variant/60 max-w-3xl leading-relaxed">
              Results from this calculator are estimates for informational use only —
              not financial, medical, or professional advice. Read our{' '}
              <Link
                href="/disclaimer"
                className="text-primary hover:underline font-semibold"
              >
                full disclaimer
              </Link>{' '}
              before acting on any number you see here.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
