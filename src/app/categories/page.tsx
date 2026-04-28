import Link from 'next/link';
import { allCalculators } from '@/lib/calculator-registry';
import { CATEGORIES } from '@/lib/calculator-types';
import CalculatorCard from '@/components/CalculatorCard';
import GlassCard from '@/components/GlassCard';

import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.com';

export const metadata: Metadata = {
  title: 'All Categories — AllSmartCalculator',
  description: 'Browse 100+ free calculators across 8 categories — Finance, Health, Math, Crypto, Engineering, Daily Life, Education, and Business.',
  alternates: { canonical: `${SITE_URL}/categories` },
  openGraph: {
    title: 'All Categories — AllSmartCalculator',
    description: 'Browse 100+ free calculators across 8 categories.',
    url: `${SITE_URL}/categories`,
    type: 'website',
    siteName: 'AllSmartCalculator',
  },
};

export default function CategoriesPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter mb-2 sm:mb-3">
            <span className="text-gradient">All Calculators</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant max-w-2xl">
            {allCalculators.length} tools organized by category. Jump to any section.
          </p>
        </div>

        {/* Category jump links — horizontal scroll on mobile, wrap on tablet+ */}
        <div className="mb-10 sm:mb-12 sticky top-16 sm:top-20 z-30 -mx-4 sm:-mx-5 md:-mx-8 px-4 sm:px-5 md:px-8 py-3 bg-surface/80 backdrop-blur-xl border-y border-white/5">
          <div className="flex sm:flex-wrap gap-2 overflow-x-auto sm:overflow-visible -mx-4 sm:mx-0 px-4 sm:px-0 pb-1 sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.id}`}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass glass-border hover:bg-white/5 transition-colors text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Category sections */}
        {CATEGORIES.map((cat) => {
          const calcs = allCalculators.filter((c) => c.category === cat.id);
          return (
            <section key={cat.id} id={cat.id} className="mb-12 sm:mb-16 scroll-mt-32 sm:scroll-mt-36">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div
                  className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl sm:text-2xl shadow-lg shrink-0`}
                >
                  {cat.icon}
                </div>
                <div className="min-w-0">
                  <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl tracking-tighter">
                    {cat.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant">
                    {cat.description} · {calcs.length} tools
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {calcs.map((c) => (
                  <CalculatorCard key={c.slug} calculator={c} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
