import type { Metadata } from 'next';
import Link from 'next/link';
import { allCalculators } from '@/lib/calculator-registry';
import { CATEGORIES } from '@/lib/calculator-types';
import GlassCard from '@/components/GlassCard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';

export const metadata: Metadata = {
  title: 'Sitemap — AllSmartCalculators',
  description:
    'Human-readable sitemap of every page on AllSmartCalculators — all 104+ calculators grouped by category, plus content and legal pages.',
  alternates: { canonical: `${SITE_URL}/sitemap.html` },
  robots: { index: true, follow: true },
};

const TOP_LEVEL = [
  { label: 'Home', href: '/' },
  { label: 'All categories', href: '/categories' },
  { label: 'Trending calculators', href: '/trending' },
  { label: 'Search', href: '/search' },
  { label: 'Blog', href: '/blog' },
];

const ABOUT_PAGES = [
  { label: 'About', href: '/about' },
  { label: 'Author — Ankit Gupta', href: '/author/ankit-gupta' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'Editorial policy', href: '/editorial-policy' },
  { label: 'Corrections log', href: '/corrections' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const LEGAL_PAGES = [
  { label: 'Privacy policy', href: '/privacy' },
  { label: 'Terms of service', href: '/terms' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Accessibility statement', href: '/accessibility-statement' },
];

export default function SitemapHtmlPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-primary mb-2 sm:mb-3">
            Sitemap
          </p>
          <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter text-on-surface mb-3 sm:mb-4">
            Every page on AllSmartCalculators
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant max-w-2xl">
            A human-friendly index. For the machine-readable version, see{' '}
            <a href="/sitemap.xml" className="text-primary hover:underline">
              /sitemap.xml
            </a>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
          <GlassCard className="p-5 sm:p-6">
            <h2 className="text-[11px] font-bold tracking-widest uppercase text-primary mb-3">Top-level</h2>
            <ul className="flex flex-col gap-1.5">
              {TOP_LEVEL.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-sm text-on-surface hover:text-primary transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard className="p-5 sm:p-6">
            <h2 className="text-[11px] font-bold tracking-widest uppercase text-primary mb-3">About &amp; editorial</h2>
            <ul className="flex flex-col gap-1.5">
              {ABOUT_PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-sm text-on-surface hover:text-primary transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard className="p-5 sm:p-6">
            <h2 className="text-[11px] font-bold tracking-widest uppercase text-primary mb-3">Legal</h2>
            <ul className="flex flex-col gap-1.5">
              {LEGAL_PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-sm text-on-surface hover:text-primary transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl tracking-tighter mb-5 sm:mb-6">
          Calculators by category
        </h2>
        <div className="flex flex-col gap-5 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const calcs = allCalculators
              .filter((c) => c.category === cat.id)
              .sort((a, b) => a.name.localeCompare(b.name));
            if (calcs.length === 0) return null;
            return (
              <GlassCard key={cat.id} className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-lg shrink-0`}>
                      {cat.icon}
                    </div>
                    <div className="min-w-0">
                      <Link href={`/${cat.id}`} className="font-headline font-bold text-base sm:text-lg text-on-surface hover:text-primary transition-colors">
                        {cat.name}
                      </Link>
                      <p className="text-xs text-on-surface-variant">{calcs.length} calculators</p>
                    </div>
                  </div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1.5">
                  {calcs.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.category}/${c.slug}`}
                        className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
