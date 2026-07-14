import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { Search } from 'lucide-react';
import { getPopularCalculators, TOTAL_CALCULATORS } from '@/lib/calculator-registry';

export default function NotFound() {
  const popular = getPopularCalculators(8);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-5 py-20">
      <div className="max-w-2xl w-full">
        <GlassCard className="p-8 sm:p-10 md:p-14 text-center relative overflow-hidden mb-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative">
            <p className="font-mono text-6xl sm:text-7xl md:text-8xl font-black text-gradient mb-3 sm:mb-4">404</p>
            <h1 className="font-headline font-black text-xl sm:text-2xl md:text-3xl tracking-tighter mb-2 sm:mb-3">
              Page Not Found
            </h1>
            <p className="text-sm md:text-base text-on-surface-variant mb-6 sm:mb-8 max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has moved. Try a search,
              or jump to one of our most-used calculators below.
            </p>

            {/* Search box — routes to /search?q= so the existing search page handles it */}
            <form
              action="/search"
              method="get"
              className="flex items-center gap-2 max-w-md mx-auto mb-6"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 pointer-events-none" />
                <input
                  type="search"
                  name="q"
                  placeholder={`Search ${TOTAL_CALCULATORS} calculators…`}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-3 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/50"
                  aria-label="Search calculators"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-3 rounded-xl bg-gradient-to-br from-primary-dim to-primary text-white text-sm font-semibold shadow-glow-primary"
              >
                Search
              </button>
            </form>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl glass glass-border text-on-surface font-semibold text-sm hover:bg-white/5 transition-colors"
              >
                Back to home
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl glass glass-border text-on-surface font-semibold text-sm hover:bg-white/5 transition-colors"
              >
                Browse all categories
              </Link>
              <Link
                href="/sitemap.html"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl glass glass-border text-on-surface font-semibold text-sm hover:bg-white/5 transition-colors"
              >
                HTML sitemap
              </Link>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 sm:p-6">
          <h2 className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-primary mb-3">
            Popular calculators
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {popular.map((calc) => (
              <li key={calc.slug}>
                <Link
                  href={`/${calc.category}/${calc.slug}`}
                  className="block px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:text-primary hover:bg-white/[0.04] transition-colors"
                >
                  {calc.name}
                </Link>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
