import { getPopularCalculators, getTrendingCalculators } from '@/lib/calculator-registry';
import CalculatorCard from '@/components/CalculatorCard';
import GlassCard from '@/components/GlassCard';
import { Flame, TrendingUp } from 'lucide-react';

import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.com';

export const metadata: Metadata = {
  title: 'Trending Calculators — AllSmartCalculator',
  description: 'The most-used calculators right now — EMI, SIP, BMI, mortgage, compound interest, and more. Updated continuously.',
  alternates: { canonical: `${SITE_URL}/trending` },
  openGraph: {
    title: 'Trending Calculators — AllSmartCalculator',
    description: 'The most-used calculators right now.',
    url: `${SITE_URL}/trending`,
    type: 'website',
    siteName: 'AllSmartCalculator',
  },
};

export default function TrendingPage() {
  const trending = getTrendingCalculators(20);
  const popular = getPopularCalculators(20);

  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass glass-border mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.15em] uppercase text-tertiary">
              Updated Live
            </span>
          </div>
          <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter mb-2 sm:mb-3">
            <span className="text-gradient">Trending Now</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant max-w-2xl">
            Real-time leaderboard of what people are calculating right now.
          </p>
        </div>

        {/* Hot right now */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center shadow-glow-primary shrink-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl tracking-tighter">
              🔥 Hot This Week
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trending.map((calc, idx) => (
              <div key={calc.slug} className="relative">
                <div className="absolute -top-3 -left-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-mono font-black text-xs sm:text-sm shadow-glow-primary">
                  {idx + 1}
                </div>
                <CalculatorCard calculator={calc} />
              </div>
            ))}
          </div>
        </section>

        {/* All-time leaderboard */}
        <section>
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-secondary-dim to-secondary flex items-center justify-center shadow-glow-secondary shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl tracking-tighter">
              All-Time Leaderboard
            </h2>
          </div>

          <GlassCard className="overflow-hidden">
            <div className="divide-y divide-white/5">
              {popular.map((calc, idx) => (
                <a
                  key={calc.slug}
                  href={`/${calc.category}/${calc.slug}`}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 hover:bg-white/[0.03] transition-colors group"
                >
                  <span className="font-mono font-black text-base sm:text-xl md:text-2xl w-7 sm:w-10 text-center text-on-surface-variant/50 group-hover:text-primary transition-colors shrink-0">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-headline font-bold text-sm sm:text-base md:text-lg text-on-surface truncate group-hover:text-primary transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs md:text-sm text-on-surface-variant truncate">
                      {calc.description}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono text-xs sm:text-sm md:text-base font-bold text-tertiary">
                      {(calc.usageCount ?? 0).toLocaleString()}
                    </p>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-on-surface-variant/60">
                      uses
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
