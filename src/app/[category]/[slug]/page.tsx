import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, CalendarDays } from 'lucide-react';
import {
  allCalculators,
  getCalculatorBySlug,
  getCalculatorsByCategory,
} from '@/lib/calculator-registry';
import { CATEGORIES, CalculatorCategory } from '@/lib/calculator-types';
import { getCalcContent } from '@/lib/strapi';
import CalculatorEngine from '@/components/CalculatorEngine';
import CalculatorCard from '@/components/CalculatorCard';
import CalculatorCMS from '@/components/CalculatorCMS';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';

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

  // Title precedence: CMS > seo override > sensible default ("X Calculator | AllSmartCalculators")
  const baseTitle = cms?.pageTitle ?? calc.seo?.title ?? `${calc.name} — Free Online Tool`;
  const title = baseTitle.includes('AllSmartCalculators')
    ? baseTitle
    : `${baseTitle} | AllSmartCalculators`;
  const description = cms?.metaDescription ?? calc.seo?.description ?? calc.description;
  const canonicalUrl = cms?.linkCanonical ?? pageUrl;

  return {
    title,
    description,
    keywords: cms?.metaKeywords ?? undefined,
    authors: cms?.metaAuthor
      ? [{ name: cms.metaAuthor }]
      : calc.reviewedBy?.name
        ? [{ name: calc.reviewedBy.name }]
        : [{ name: 'Ankit Gupta', url: 'https://www.linkedin.com/in/ankit-gupta-data-analyst' }],
    robots: cms?.metaRobots ?? 'index, follow',
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: cms?.metaOgTitle ?? title,
      description: cms?.metaOgDescription ?? description,
      type: (cms?.metaOgType as 'website') ?? 'website',
      url: cms?.metaOgUrl ?? canonicalUrl,
      siteName: cms?.metaOgSiteName ?? 'AllSmartCalculators',
      ...(cms?.metaOgImage && { images: [{ url: cms.metaOgImage, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: (cms?.metaTwitterCard as 'summary_large_image') ?? 'summary_large_image',
      title: cms?.metaTwitterTitle ?? title,
      description: cms?.metaTwitterDescription ?? description,
      ...(cms?.metaTwitterSite && { site: cms.metaTwitterSite }),
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
  // FAQs come from Strapi only.
  const allFaqs = (cms?.faqs ?? []).map((f) => ({ q: f.question, a: f.answer }));

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
      name: 'AllSmartCalculators',
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

          {/* CALCULATOR — first thing the user sees so they can act immediately */}
          <CalculatorEngine slug={calc.slug} />

          {/* All page content (long-form article + FAQ accordion) is authored
             in Strapi as a single `content` markdown field. CalculatorCMS
             renders nothing when the field is empty. */}
          <CalculatorCMS slug={calc.slug} />

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
