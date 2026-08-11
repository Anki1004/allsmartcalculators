import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCalculatorBySlug } from '@/lib/calculator-registry';
import CalculatorEngine from '@/components/CalculatorEngine';
import CustomCalculator from '@/components/custom/CustomCalculator';
import EmbedFrameSupport from '@/components/EmbedFrameSupport';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';

interface PageProps {
  params: { category: string; slug: string };
  searchParams: { theme?: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const calc = getCalculatorBySlug(params.slug);
  return {
    title: calc ? `${calc.name} — embed` : 'Calculator embed',
    robots: { index: false, follow: false },
  };
}

/**
 * Chrome-free version of a calculator, meant to be dropped into someone else's
 * page in an iframe.
 *
 * Worth being clear about what this does and does not do for SEO: the link
 * inside this page is on our own domain, so it passes us nothing. The backlink
 * comes entirely from the attribution anchor in the snippet the host pastes
 * *outside* the iframe — which is why EmbedSnippet always ships the iframe and
 * the anchor together, and why the snippet must not be reduced to just the
 * iframe tag.
 */
export default function EmbedCalculatorPage({ params, searchParams }: PageProps) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc || calc.category !== params.category) notFound();

  const canonicalHref = `${SITE_URL}/${calc.category}/${calc.slug}`;

  return (
    <div className="px-3 py-4 sm:px-4 sm:py-5">
      <EmbedFrameSupport theme={searchParams.theme} />

      <h1 className="font-headline font-bold text-lg sm:text-xl tracking-tight text-on-surface mb-3">
        {calc.name}
      </h1>

      {calc.custom ? (
        <CustomCalculator type={calc.custom} />
      ) : (
        <CalculatorEngine slug={calc.slug} />
      )}

      <p className="mt-4 text-[11px] text-on-surface-variant/70">
        <a
          href={canonicalHref}
          target="_blank"
          rel="noopener"
          className="text-primary hover:underline font-semibold"
        >
          {calc.name}
        </a>{' '}
        by{' '}
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener"
          className="text-primary hover:underline"
        >
          AllSmartCalculators
        </a>
        {(calc.category === 'finance' || calc.category === 'health' || calc.category === 'crypto') && (
          <> — estimates for information only, not professional advice.</>
        )}
      </p>
    </div>
  );
}
