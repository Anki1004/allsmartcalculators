import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  allCalculators,
  getCalculatorBySlug,
  getCalculatorsByCategory,
} from '@/lib/calculator-registry';
import { CATEGORIES, CalculatorCategory } from '@/lib/calculator-types';
import CalculatorEngine from '@/components/CalculatorEngine';
import CalculatorCard from '@/components/CalculatorCard';
import GlassCard from '@/components/GlassCard';

export function generateStaticParams() {
  return allCalculators.map((calc) => ({
    category: calc.category,
    slug: calc.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) return { title: 'Not Found' };
  return {
    title: `${calc.name} — CalcVerse`,
    description: calc.description,
  };
}

export default function CalculatorPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc || calc.category !== params.category) notFound();

  const categoryInfo = CATEGORIES.find((c) => c.id === calc.category);
  const related = getCalculatorsByCategory(calc.category as CalculatorCategory)
    .filter((c) => c.slug !== calc.slug)
    .slice(0, 4);

  return (
    <div className="pt-28 pb-16 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant/70 mb-4">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/categories" className="hover:text-primary transition-colors">
            {categoryInfo?.name ?? calc.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">{calc.shortName ?? calc.name}</span>
        </nav>

        {/* Title */}
        <div className="mb-10">
          <h1 className="font-headline font-black text-3xl md:text-5xl tracking-tighter text-on-surface mb-2">
            {calc.name}
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-2xl">
            {calc.description}
          </p>
        </div>

        {/* CALCULATOR — pass slug only; engine looks up the config client-side */}
        <CalculatorEngine slug={calc.slug} />

        {/* Formula & FAQs */}
        {(calc.formula || calc.faqs) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {calc.formula && (
              <GlassCard className="p-6 md:p-8">
                <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-primary mb-3">
                  Formula
                </h3>
                <code className="font-mono text-base text-on-surface block bg-surface-container-lowest p-4 rounded-xl">
                  {calc.formula}
                </code>
              </GlassCard>
            )}
            {calc.faqs && calc.faqs.length > 0 && (
              <GlassCard className="p-6 md:p-8">
                <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-primary mb-4">
                  FAQs
                </h3>
                <div className="flex flex-col gap-4">
                  {calc.faqs.map((faq, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-on-surface mb-1">{faq.q}</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>
        )}

        {/* Related calculators */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-headline font-black text-2xl md:text-3xl tracking-tighter mb-6">
              Related Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((c) => (
                <CalculatorCard key={c.slug} calculator={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
