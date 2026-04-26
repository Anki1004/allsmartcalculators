import Link from 'next/link';
import { allCalculators } from '@/lib/calculator-registry';
import { CATEGORIES } from '@/lib/calculator-types';
import CalculatorCard from '@/components/CalculatorCard';
import GlassCard from '@/components/GlassCard';

import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.tech';

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
    <div className="pt-28 pb-16 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-headline font-black text-4xl md:text-6xl tracking-tighter mb-3">
            <span className="text-gradient">All Calculators</span>
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-2xl">
            {allCalculators.length} tools organized by category. Jump to any section.
          </p>
        </div>

        {/* Category jump links */}
        <div className="flex flex-wrap gap-2 mb-12 sticky top-20 z-30 py-3 -mx-5 md:-mx-8 px-5 md:px-8 bg-surface/80 backdrop-blur-xl border-y border-white/5">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass glass-border hover:bg-white/5 transition-colors text-sm font-semibold"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </a>
          ))}
        </div>

        {/* Category sections */}
        {CATEGORIES.map((cat) => {
          const calcs = allCalculators.filter((c) => c.category === cat.id);
          return (
            <section key={cat.id} id={cat.id} className="mb-16 scroll-mt-36">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-lg`}
                >
                  {cat.icon}
                </div>
                <div>
                  <h2 className="font-headline font-black text-2xl md:text-3xl tracking-tighter">
                    {cat.name}
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    {cat.description} · {calcs.length} tools
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
