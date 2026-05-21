import type { Metadata } from 'next';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { faqSchema, breadcrumbSchema } from '@/lib/structured-data';
import { lastUpdatedLabel } from '@/lib/policy-dates';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';

export const metadata: Metadata = {
  title: 'FAQ — AllSmartCalculators',
  description:
    'Frequently asked questions about AllSmartCalculators — how the calculators work, are they accurate, do they store your data, do they cost anything, and how to suggest one.',
  alternates: { canonical: `${SITE_URL}/faq` },
};

const FAQS = [
  {
    q: 'Are the calculators on AllSmartCalculators free?',
    a: 'Yes. Every calculator on the site is free to use, with no signup, no paywall, and no usage limits. The site is supported by Google AdSense — you may see ads, but the tools themselves stay free.',
  },
  {
    q: 'Do you store the numbers I type into the calculators?',
    a: 'No. Every calculator runs entirely in your browser using JavaScript. The values you enter — income, weight, loan amount, etc. — never leave your device and are never sent to our servers.',
  },
  {
    q: 'How accurate are the results?',
    a: 'For each calculator we publish the formula we use and link to a primary source — RBI / Income Tax India for finance, WHO / ICMR for health, peer-reviewed sources for math. We also list the limitations of each tool. Results are good enough to make planning decisions, but for legally or medically important decisions you should still consult a qualified professional.',
  },
  {
    q: 'Are the financial calculators India-specific?',
    a: 'Yes — the finance calculators (income tax, EMI, SIP, GST, PPF, HRA, etc.) assume Indian rules and rupee inputs by default. The income tax calculator supports both the new and old regimes for FY 2025-26 / AY 2026-27. You can switch currency in the navigation bar for non-India calculations where the math is currency-neutral (compound interest, loan payment, etc.).',
  },
  {
    q: 'Who is behind AllSmartCalculators?',
    a: 'AllSmartCalculators is built and maintained by Ankit Gupta, a data analyst based in India. Every calculator is hand-coded and reviewed against textbook references and primary sources. You can read more on the author page.',
  },
  {
    q: 'I found a wrong result / bug. How do I report it?',
    a: 'Email allsmartcalculators@gmail.com or use the contact form. We log every reported issue and publish corrections on the corrections page. Please include the calculator name, the inputs you used, and what you think the correct result should be.',
  },
  {
    q: 'Why do I see ads, and can I turn off personalized ones?',
    a: 'Ads from Google AdSense pay for the site. We use Google Consent Mode v2, so until you accept the cookie banner, AdSense receives a "denied" signal and serves only non-personalized ads. You can also opt out of personalized advertising at adssettings.google.com or youronlinechoices.com (EU).',
  },
  {
    q: 'Can I suggest a calculator that you don\'t have?',
    a: 'Absolutely. Use the contact form, pick "Suggest a calculator", and tell us what you want and what inputs/outputs you expect. We prioritize calculators that solve common India-finance, health, or daily-life questions.',
  },
  {
    q: 'Do the calculators work offline or on slow connections?',
    a: 'Once a calculator page has loaded, the calculations themselves work offline because they run in your browser. The site is optimized for fast loads on mobile networks — most pages clock in under 100 KB of JavaScript.',
  },
  {
    q: 'Can I embed a calculator on my own site?',
    a: 'Not yet — we plan to release official embeds in a future update. For now, please link to the calculator page rather than copying its code; that way users always get the latest formula and we can fix bugs centrally.',
  },
];

export default function FaqPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-5 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: SITE_URL },
              { name: 'FAQ', url: `${SITE_URL}/faq` },
            ]),
          ),
        }}
      />

      <div className="max-w-3xl mx-auto">
        <div className="mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-primary mb-2 sm:mb-3">FAQ</p>
          <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter text-on-surface mb-3 sm:mb-4">
            Frequently asked questions
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            Quick answers to the things most people ask before using the calculators or
            sending us an email.
          </p>
          <p className="text-[11px] sm:text-xs text-on-surface-variant/50 mt-3 sm:mt-4 font-mono">
            {lastUpdatedLabel('faq')}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {FAQS.map((item) => (
            <GlassCard key={item.q} className="p-5 sm:p-6">
              <details className="group">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-3">
                  <h2 className="font-headline font-semibold text-base sm:text-lg text-on-surface group-open:text-primary transition-colors">
                    {item.q}
                  </h2>
                  <span className="text-on-surface-variant/60 text-xl leading-none mt-0.5 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-sm text-on-surface-variant leading-relaxed mt-3">{item.a}</p>
              </details>
            </GlassCard>
          ))}
        </div>

        <p className="text-xs text-on-surface-variant/60 mt-8 text-center">
          Didn&apos;t find your answer? <Link href="/contact" className="text-primary hover:underline">Get in touch</Link>.
        </p>
      </div>
    </div>
  );
}
