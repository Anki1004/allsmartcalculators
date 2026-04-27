import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { allCalculators, getCalculatorsByCategory } from '@/lib/calculator-registry';
import { CATEGORIES, CalculatorCategory } from '@/lib/calculator-types';
import { getCategoryContent } from '@/lib/strapi';
import CalculatorCard from '@/components/CalculatorCard';
import GlassCard from '@/components/GlassCard';
import CmsRichText from '@/components/CmsRichText';

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const cat = CATEGORIES.find((c) => c.id === params.category);
  if (!cat) return { title: 'Not Found' };
  const calcs = getCalculatorsByCategory(cat.id as CalculatorCategory);
  const cms = await getCategoryContent(cat.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.tech';
  const url = `${siteUrl}/${cat.id}`;
  const title = cms?.pageTitle ?? `${cat.name} Calculators — AllSmartCalculator`;
  const description =
    cms?.metaDescription ??
    `${calcs.length} free ${cat.name.toLowerCase()} calculators. ${cat.description}.`;
  const canonical = cms?.linkCanonical ?? url;
  return {
    title,
    description,
    keywords: cms?.metaKeywords ?? undefined,
    authors: [{ name: cms?.metaAuthor ?? 'AllSmartCalculator Team' }],
    robots: cms?.metaRobots ?? 'index, follow',
    alternates: { canonical },
    openGraph: {
      title: cms?.metaOgTitle ?? title,
      description: cms?.metaOgDescription ?? description,
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

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const cat = CATEGORIES.find((c) => c.id === params.category);
  if (!cat) notFound();

  const calcs = getCalculatorsByCategory(cat.id as CalculatorCategory);
  const trending = calcs.filter((c) => c.trending);
  const rest = calcs.filter((c) => !c.trending);
  const cms = await getCategoryContent(cat.id);

  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-5 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant/70 mb-4 flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-primary">{cat.name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 sm:gap-5 mb-8 sm:mb-10">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl sm:text-3xl shadow-lg shrink-0`}>
            {cat.icon}
          </div>
          <div className="min-w-0">
            <h1 className="font-headline font-black text-2xl sm:text-3xl md:text-5xl tracking-tighter text-on-surface">
              {cat.name} Calculators
            </h1>
            <p className="text-sm sm:text-base text-on-surface-variant mt-1">
              {cat.description} · {calcs.length} free tools
            </p>
          </div>
        </div>

        {/* CMS top content — editable per-category in Strapi */}
        {cms?.topContent && (
          <section className="mb-8 sm:mb-10">
            <GlassCard className="p-5 sm:p-6 md:p-8">
              <CmsRichText content={cms.topContent} />
            </GlassCard>
          </section>
        )}

        {/* Trending in this category */}
        {trending.length > 0 && (
          <section className="mb-10 sm:mb-12">
            <h2 className="font-headline font-bold tracking-tight text-on-surface-variant uppercase text-[11px] sm:text-xs tracking-[0.15em] mb-4">
              Trending
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {trending.map((c) => (
                <CalculatorCard key={c.slug} calculator={c} />
              ))}
            </div>
          </section>
        )}

        {/* All calculators */}
        <section>
          {trending.length > 0 && (
            <h2 className="font-headline font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase text-on-surface-variant mb-4">
              All {cat.name} Calculators
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {(trending.length > 0 ? rest : calcs).map((c) => (
              <CalculatorCard key={c.slug} calculator={c} />
            ))}
          </div>
        </section>

        {/* Browse other categories */}
        <section className="mt-12 sm:mt-16">
          <h2 className="font-headline font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase text-on-surface-variant mb-4">
            Browse other categories
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {CATEGORIES.filter((c) => c.id !== cat.id).map((c) => (
              <Link
                key={c.id}
                href={`/${c.id}`}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass glass-border hover:bg-white/5 transition-colors text-xs sm:text-sm font-semibold"
              >
                <span>{c.icon}</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* CMS bottom content — editable per-category in Strapi */}
        {cms?.bottomContent && (
          <section className="mt-10 sm:mt-12">
            <GlassCard className="p-5 sm:p-6 md:p-8">
              <CmsRichText content={cms.bottomContent} />
            </GlassCard>
          </section>
        )}

      </div>
    </div>
  );
}
