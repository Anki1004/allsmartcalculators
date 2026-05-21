import { getPopularCalculators, getTrendingCalculators } from '@/lib/calculator-registry';
import CalculatorCard from '@/components/CalculatorCard';
import GlassCard from '@/components/GlassCard';
import { Flame, TrendingUp } from 'lucide-react';

import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';

export const metadata: Metadata = {
  title: 'Trending Calculators — AllSmartCalculators',
  description:
    'Hand-picked trending calculators on AllSmartCalculators — EMI, SIP, BMI, GST, mortgage, currency converter & compound interest. Editor-curated list.',
  alternates: { canonical: `${SITE_URL}/trending` },
  openGraph: {
    title: 'Trending Calculators — AllSmartCalculators',
    description:
      'EMI, SIP, BMI, GST, mortgage & compound interest — hand-picked trending tools.',
    url: `${SITE_URL}/trending`,
    type: 'website',
    siteName: 'AllSmartCalculators',
  },
};

export default function TrendingPage() {
  const trending = getTrendingCalculators(20);
  const featured = getPopularCalculators(20);

  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass glass-border mb-4 sm:mb-6">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.15em] uppercase text-tertiary">
              Editor's Picks
            </span>
          </div>
          <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter mb-2 sm:mb-3">
            <span className="text-gradient">Trending Calculators</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant max-w-2xl">
            A hand-picked list of the calculators we think most people land here looking for —
            covering everyday money, health, and math decisions.
          </p>
        </div>

        {/* Trending picks */}
        {trending.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center shadow-glow-primary shrink-0">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl tracking-tighter">
                Trending now
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {trending.map((calc) => (
                <CalculatorCard key={calc.slug} calculator={calc} />
              ))}
            </div>
          </section>
        )}

        {/* All featured */}
        <section>
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-secondary-dim to-secondary flex items-center justify-center shadow-glow-secondary shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl tracking-tighter">
              Featured calculators
            </h2>
          </div>

          <GlassCard className="overflow-hidden">
            <div className="divide-y divide-white/5">
              {featured.map((calc) => (
                <a
                  key={calc.slug}
                  href={`/${calc.category}/${calc.slug}`}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 hover:bg-white/[0.03] transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-headline font-bold text-sm sm:text-base md:text-lg text-on-surface truncate group-hover:text-primary transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs md:text-sm text-on-surface-variant truncate">
                      {calc.description}
                    </p>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 shrink-0 capitalize">
                    {calc.category.replace('-', ' ')}
                  </span>
                </a>
              ))}
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
