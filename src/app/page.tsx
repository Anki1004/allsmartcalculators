import type { Metadata } from 'next';
import Link from 'next/link';
import {
  allCalculators,
  getTrendingCalculators,
  getPopularCalculators,
  TOTAL_CALCULATORS,
} from '@/lib/calculator-registry';
import { CATEGORIES } from '@/lib/calculator-types';
import CalculatorCard from '@/components/CalculatorCard';
import GlassCard from '@/components/GlassCard';
import HomeSearchBar from '@/components/HomeSearchBar';
import CmsRichText from '@/components/CmsRichText';
import { ArrowRight, Flame, TrendingUp } from 'lucide-react';
import { getHomepage } from '@/lib/strapi';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.tech';

export async function generateMetadata(): Promise<Metadata> {
  const hp = await getHomepage();

  const title =
    hp?.pageTitle ?? 'Free Online Calculators — 101+ Tools (EMI, BMI, GPA & More) | AllSmartCalculator';
  const description =
    hp?.metaDescription ??
    '101+ free online calculators for finance, health, math, crypto, engineering, education and business. EMI, SIP, BMI, GST, GPA, percentage — fast, ad-free, no signup.';
  const keywords = hp?.metaKeywords
    ? hp.metaKeywords.split(',').map((k) => k.trim())
    : [
        'free online calculators',
        'online calculator',
        'EMI calculator',
        'SIP calculator',
        'BMI calculator',
        'GST calculator',
        'mortgage calculator',
        'GPA calculator',
        'percentage calculator',
        'crypto calculator',
      ];
  const robots = hp?.metaRobots ?? 'index, follow';
  const canonical = hp?.linkCanonical ?? SITE_URL;

  return {
    title,
    description,
    keywords,
    authors: hp?.metaAuthor ? [{ name: hp.metaAuthor }] : [{ name: 'AllSmartCalculator Team' }],
    robots,
    alternates: { canonical },
    openGraph: {
      title: hp?.metaOgTitle ?? title,
      description: hp?.metaOgDescription ?? description,
      type: (hp?.metaOgType as 'website') ?? 'website',
      url: hp?.linkCanonical ?? SITE_URL,
      siteName: hp?.metaOgSiteName ?? 'AllSmartCalculator',
      ...(hp?.metaOgImage ? { images: [{ url: hp.metaOgImage }] } : {}),
    },
    twitter: {
      card: (hp?.metaTwitterCard as 'summary_large_image') ?? 'summary_large_image',
      title: hp?.metaTwitterTitle ?? title,
      description: hp?.metaTwitterDescription ?? description,
      site: hp?.metaTwitterSite ?? '@AllSmartCalculator',
      ...(hp?.metaTwitterImage ? { images: [hp.metaTwitterImage] } : {}),
    },
  };
}

export default async function HomePage() {
  const trending = getTrendingCalculators(8);
  const popular = getPopularCalculators(4);
  const hp = await getHomepage();

  // Keyword-led H1 (default). CMS can still override via heroHeadline if you want
  // to keep the brand-led version on a campaign.
  const heroHeadline =
    hp?.heroHeadline ?? `Free Online Calculators — ${TOTAL_CALCULATORS} Tools`;
  const heroSubheadline =
    hp?.heroSubheadline ?? 'for Finance, Health, Math & More.';
  const heroDescription =
    hp?.heroDescription ??
    'Premium financial, health, crypto, and scientific calculators crafted with obsessive attention to detail. Calculate anything, beautifully.';
  const ctaHeadline = hp?.ctaHeadline ?? 'Calculate Anything.';
  const ctaDescription =
    hp?.ctaDescription ?? 'Free forever. No signups. No ads. Just beautiful calculators that work.';
  const bottomContent = hp?.bottomContent ?? null;

  // ── Site-wide JSON-LD: Organization + WebSite (with SearchAction) ──
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AllSmartCalculator',
    url: SITE_URL,
    description:
      '101+ free online calculators for finance, health, math, crypto, engineering, education and business.',
    founder: {
      '@type': 'Person',
      name: 'Ankit Gupta',
      url: `${SITE_URL}/author/ankit-gupta`,
    },
    sameAs: ['https://www.linkedin.com/in/ankit-gupta-data-analyst'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AllSmartCalculator',
    url: SITE_URL,
    inLanguage: 'en',
    publisher: { '@type': 'Organization', name: 'AllSmartCalculator', url: SITE_URL },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* HERO */}
      <section className="pt-20 pb-8 sm:pt-24 sm:pb-10 md:pt-28 md:pb-12 px-4 sm:px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero headline */}
          <h1 className="font-headline font-black tracking-tighter text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-5 animate-fade-up break-words">
            <span className="text-on-surface">{heroHeadline}</span>
            <br />
            <span className="text-gradient">{heroSubheadline}</span>
          </h1>

          {/* Search bar — moved above description for faster access */}
          <div
            className="max-w-2xl mb-6 sm:mb-8 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <HomeSearchBar />
          </div>

          <p
            className="text-sm sm:text-base md:text-lg text-on-surface-variant max-w-2xl mb-8 sm:mb-12 leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            {heroDescription}
          </p>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 sm:gap-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories#${cat.id}`}
                className="group flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full glass glass-border hover:bg-white/5 transition-all press"
              >
                <span className="text-sm sm:text-base">{cat.icon}</span>
                <span className="text-xs sm:text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start sm:items-center justify-between gap-3 mb-6 sm:mb-10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center shadow-glow-primary shrink-0">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="font-headline font-black text-2xl sm:text-3xl md:text-4xl tracking-tighter">
                  Trending Now
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 sm:mt-1">
                  Most-used calculators this week
                </p>
              </div>
            </div>
            <Link
              href="/trending"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold text-primary hover:gap-3 transition-all whitespace-nowrap shrink-0 mt-1 sm:mt-0"
            >
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">All</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trending.map((calc) => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES WITH CALCULATORS */}
      <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
            <div className="min-w-0">
              <h2 className="font-headline font-black text-2xl sm:text-3xl md:text-4xl tracking-tighter">
                Browse by Category
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 sm:mt-1">
                {TOTAL_CALCULATORS} calculators across {CATEGORIES.length} categories
              </p>
            </div>
            <Link
              href="/categories"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold text-primary hover:gap-3 transition-all whitespace-nowrap shrink-0 mt-1 sm:mt-0"
            >
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">All</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-8 sm:gap-10">
            {CATEGORIES.map((cat) => {
              const catCalcs = allCalculators
                .filter((c) => c.category === cat.id)
                .sort((a, b) => (b.usageCount ?? 0) - (a.usageCount ?? 0))
                .slice(0, 4);
              return (
                <div key={cat.id}>
                  {/* Category header */}
                  <div className="flex items-start sm:items-center justify-between gap-3 mb-5 sm:mb-6">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-lg sm:text-xl shadow-lg shrink-0`}>
                        {cat.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-headline font-black text-lg sm:text-xl md:text-2xl tracking-tighter text-on-surface">
                          {cat.name}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-on-surface-variant mt-0.5 line-clamp-2">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/${cat.id}`}
                      className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold text-primary hover:gap-2.5 transition-all whitespace-nowrap shrink-0 mt-1 sm:mt-0"
                    >
                      <span className="hidden sm:inline">All {allCalculators.filter((c) => c.category === cat.id).length} tools</span>
                      <span className="sm:hidden">{allCalculators.filter((c) => c.category === cat.id).length}</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Link>
                  </div>

                  {/* Top 4 calculators in this category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {catCalcs.map((calc) => (
                      <CalculatorCard key={calc.slug} calculator={calc} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MOST POPULAR */}
      <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-secondary-dim to-secondary flex items-center justify-center shadow-glow-secondary shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="font-headline font-black text-2xl sm:text-3xl md:text-4xl tracking-tighter">
                Most Popular
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 sm:mt-1">
                Top calculators of all time
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {popular.map((calc) => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-10 md:py-14 px-4 sm:px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <GlassCard className="p-6 sm:p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative">
              <h3 className="font-headline font-black text-2xl sm:text-3xl md:text-5xl tracking-tighter mb-3 sm:mb-4">
                <span className="text-on-surface">{ctaHeadline}</span>{' '}
                <span className="text-gradient">Beautifully.</span>
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-on-surface-variant max-w-xl mx-auto mb-6 sm:mb-8">
                {ctaDescription}
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-br from-primary-dim to-primary text-white text-sm sm:text-base font-semibold shadow-glow-primary hover:shadow-[0_0_60px_rgba(189,157,255,0.6)] transition-shadow press"
              >
                <span className="hidden sm:inline">Explore All {TOTAL_CALCULATORS} Tools</span>
                <span className="sm:hidden">Explore {TOTAL_CALCULATORS} Tools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* CMS BOTTOM CONTENT — editable from Strapi (homepage.bottomContent) */}
      {bottomContent && (
        <section className="py-8 sm:py-10 md:py-14 px-4 sm:px-5 md:px-8">
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-5 sm:p-6 md:p-10">
              <CmsRichText content={bottomContent} />
            </GlassCard>
          </div>
        </section>
      )}
    </div>
  );
}
