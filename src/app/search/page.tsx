import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Search as SearchIcon } from 'lucide-react';
import { searchCalculators } from '@/lib/calculator-registry';
import CalculatorCard from '@/components/CalculatorCard';
import GlassCard from '@/components/GlassCard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.tech';

interface SearchPageProps {
  searchParams: { q?: string };
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  const q = (searchParams.q ?? '').trim();
  const title = q
    ? `"${q}" — Search Results | AllSmartCalculator`
    : 'Search Calculators | AllSmartCalculator';
  const description = q
    ? `Search results for "${q}" across 100+ free calculators on AllSmartCalculator.`
    : 'Search 100+ free calculators across finance, health, math, crypto, engineering, daily life, education, and business.';

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/search` },
    // Don't index empty/duplicated search result pages
    robots: q ? 'noindex, follow' : 'noindex, follow',
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/search${q ? `?q=${encodeURIComponent(q)}` : ''}`,
      type: 'website',
      siteName: 'AllSmartCalculator',
    },
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const q = (searchParams.q ?? '').trim();
  const results = q ? searchCalculators(q) : [];

  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant/70 mb-4 flex-wrap"
        >
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-primary">Search</span>
        </nav>

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-primary mb-2 sm:mb-3">Search</p>
          <h1 className="font-headline font-black text-2xl sm:text-4xl md:text-6xl tracking-tighter text-on-surface mb-3 sm:mb-4 break-words">
            {q ? `Results for "${q}"` : 'Search calculators'}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant max-w-2xl">
            {q
              ? `${results.length} ${results.length === 1 ? 'calculator matches' : 'calculators match'} your query.`
              : 'Use the search bar (Ctrl/⌘ + K) to find any of our 100+ calculators by name, category, or keyword.'}
          </p>
        </div>

        {/* Results or empty-state */}
        {q && results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {results.map((c) => (
              <CalculatorCard key={c.slug} calculator={c} />
            ))}
          </div>
        ) : (
          <GlassCard className="p-6 sm:p-10 md:p-16 text-center">
            <SearchIcon className="w-9 h-9 sm:w-10 sm:h-10 text-primary/40 mx-auto mb-4" />
            <h2 className="font-headline font-bold text-lg sm:text-xl text-on-surface mb-2">
              {q ? 'No calculators matched' : 'Start by typing a query'}
            </h2>
            <p className="text-sm text-on-surface-variant max-w-md mx-auto mb-5 sm:mb-6">
              {q
                ? 'Try a broader keyword (e.g. "loan", "BMI", "GST") or browse all calculators by category.'
                : 'Open the search modal with Ctrl + K, or browse by category to find what you need.'}
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-primary-dim to-primary text-white font-semibold text-sm shadow-glow-primary press"
            >
              Browse all categories
            </Link>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
