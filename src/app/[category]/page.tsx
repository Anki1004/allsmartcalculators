import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { allCalculators, getCalculatorsByCategory } from '@/lib/calculator-registry';
import { CATEGORIES, CalculatorCategory } from '@/lib/calculator-types';
import CalculatorCard from '@/components/CalculatorCard';

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
  return {
    title: `${cat.name} Calculators — CalcVerse`,
    description: `${calcs.length} free ${cat.name.toLowerCase()} calculators. ${cat.description}`,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = CATEGORIES.find((c) => c.id === params.category);
  if (!cat) notFound();

  const calcs = getCalculatorsByCategory(cat.id as CalculatorCategory);
  const trending = calcs.filter((c) => c.trending);
  const rest = calcs.filter((c) => !c.trending);

  return (
    <div className="pt-28 pb-16 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant/70 mb-4">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">{cat.name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-5 mb-10">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl shadow-lg shrink-0`}>
            {cat.icon}
          </div>
          <div>
            <h1 className="font-headline font-black text-3xl md:text-5xl tracking-tighter text-on-surface">
              {cat.name} Calculators
            </h1>
            <p className="text-base text-on-surface-variant mt-1">
              {cat.description} · {calcs.length} free tools
            </p>
          </div>
        </div>

        {/* Trending in this category */}
        {trending.length > 0 && (
          <section className="mb-12">
            <h2 className="font-headline font-bold text-lg tracking-tight text-on-surface-variant uppercase text-xs tracking-[0.15em] mb-4">
              Trending
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {trending.map((c) => (
                <CalculatorCard key={c.slug} calculator={c} />
              ))}
            </div>
          </section>
        )}

        {/* All calculators */}
        <section>
          {trending.length > 0 && (
            <h2 className="font-headline font-bold text-xs tracking-[0.15em] uppercase text-on-surface-variant mb-4">
              All {cat.name} Calculators
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {(trending.length > 0 ? rest : calcs).map((c) => (
              <CalculatorCard key={c.slug} calculator={c} />
            ))}
          </div>
        </section>

        {/* Browse other categories */}
        <section className="mt-16">
          <h2 className="font-headline font-bold text-xs tracking-[0.15em] uppercase text-on-surface-variant mb-4">
            Browse other categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.filter((c) => c.id !== cat.id).map((c) => (
              <Link
                key={c.id}
                href={`/${c.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass glass-border hover:bg-white/5 transition-colors text-sm font-semibold"
              >
                <span>{c.icon}</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
