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
import { ArrowRight, Flame, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const trending = getTrendingCalculators(8);
  const popular = getPopularCalculators(4);

  return (
    <div className="relative">
      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Live counter chip */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glass-border mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-[0.15em] uppercase text-tertiary">
              2.4M+ Calculations Today
            </span>
          </div>

          {/* Hero headline */}
          <h1 className="font-headline font-black tracking-tighter text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 animate-fade-up">
            <span className="text-on-surface">{TOTAL_CALCULATORS}+ Calculators.</span>
            <br />
            <span className="text-gradient">One Beautiful Place.</span>
          </h1>

          <p
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Premium financial, health, crypto, and scientific calculators crafted with
            obsessive attention to detail. Calculate anything, beautifully.
          </p>

          {/* Search bar */}
          <div
            className="max-w-2xl mb-16 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <HomeSearchBar />
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories#${cat.id}`}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full glass glass-border hover:bg-white/5 transition-all press"
              >
                <span className="text-base">{cat.icon}</span>
                <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section className="py-20 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center shadow-glow-primary">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tighter">
                  Trending Now
                </h2>
                <p className="text-sm text-on-surface-variant mt-1">
                  Most-used calculators this week
                </p>
              </div>
            </div>
            <Link
              href="/trending"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trending.map((calc) => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="py-20 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tighter">
                Explore Categories
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                {TOTAL_CALCULATORS} calculators across 8 categories
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES.map((cat) => {
              const count = allCalculators.filter((c) => c.category === cat.id).length;
              return (
                <Link key={cat.id} href={`/categories#${cat.id}`} className="group magnetic">
                  <GlassCard className="p-6 h-full hover:bg-white/[0.06] transition-all group-hover:scale-[1.02]">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {cat.icon}
                    </div>
                    <h3 className="font-headline font-bold text-lg text-on-surface mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                      {cat.description}
                    </p>
                    <p className="text-xs font-mono font-bold text-primary">
                      {count} tools →
                    </p>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* MOST POPULAR */}
      <section className="py-20 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-dim to-secondary flex items-center justify-center shadow-glow-secondary">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tighter">
                Most Popular
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Top calculators of all time
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {popular.map((calc) => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <GlassCard className="p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative">
              <h3 className="font-headline font-black text-3xl md:text-5xl tracking-tighter mb-4">
                <span className="text-on-surface">Calculate Anything.</span>{' '}
                <span className="text-gradient">Beautifully.</span>
              </h3>
              <p className="text-base md:text-lg text-on-surface-variant max-w-xl mx-auto mb-8">
                Free forever. No signups. No ads. Just beautiful calculators that work.
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-br from-primary-dim to-primary text-white font-semibold shadow-glow-primary hover:shadow-[0_0_60px_rgba(189,157,255,0.6)] transition-shadow press"
              >
                Explore All {TOTAL_CALCULATORS} Tools
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
