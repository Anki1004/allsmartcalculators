import type { Metadata } from 'next';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { Linkedin, Mail, Calculator, Code2, BarChart3, ChevronRight } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.tech';
const AUTHOR_URL = `${SITE_URL}/author/ankit-gupta`;
const LINKEDIN_URL = 'https://www.linkedin.com/in/ankit-gupta-data-analyst';

export const metadata: Metadata = {
  title: 'Ankit Gupta — Builder of AllSmartCalculator',
  description:
    'Ankit Gupta is a solo developer and data analyst who builds, maintains, and reviews every calculator on AllSmartCalculator. Background, focus areas, and how to reach him.',
  alternates: { canonical: AUTHOR_URL },
  openGraph: {
    title: 'Ankit Gupta — Builder of AllSmartCalculator',
    description:
      'Solo developer and data analyst behind every calculator on AllSmartCalculator.',
    url: AUTHOR_URL,
    type: 'profile',
    siteName: 'AllSmartCalculator',
  },
};

const expertise = [
  {
    icon: Calculator,
    title: 'Calculator design & verification',
    text: 'Implements every formula on AllSmartCalculator, cross-checks results against textbook references and industry tools, and writes the explanatory content that goes with each calculator.',
  },
  {
    icon: Code2,
    title: 'Web engineering',
    text: 'Builds the site end-to-end: Next.js app router, TypeScript, Tailwind, and a Strapi CMS for the editorial layer. Focused on speed, accessibility, and Core Web Vitals.',
  },
  {
    icon: BarChart3,
    title: 'Data & finance literacy',
    text: 'Background as a data analyst, with day-to-day work in personal finance topics — EMI structures, SIP modelling, Indian tax slabs, and household budgeting.',
  },
];

export default function AuthorPage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ankit Gupta',
    url: AUTHOR_URL,
    jobTitle: 'Founder & Builder',
    worksFor: { '@type': 'Organization', name: 'AllSmartCalculator', url: SITE_URL },
    sameAs: [LINKEDIN_URL],
    knowsAbout: [
      'Personal finance calculators',
      'EMI and amortization',
      'SIP and compound interest',
      'BMI and health screening tools',
      'Indian income tax (new regime, old regime, HRA)',
      'Web performance and SEO',
    ],
    description:
      'Solo developer and data analyst who builds, maintains, and reviews every calculator on AllSmartCalculator.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-5 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant/70 mb-4 flex-wrap"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-primary">Ankit Gupta</span>
          </nav>

          {/* Hero */}
          <div className="flex flex-col md:flex-row items-start gap-5 sm:gap-8 mb-8 sm:mb-12">
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center shadow-glow-primary text-3xl sm:text-5xl font-headline font-black text-white shrink-0">
              A
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-primary mb-2">
                Author
              </p>
              <h1 className="font-headline font-black text-2xl sm:text-3xl md:text-5xl tracking-tighter text-on-surface mb-2 sm:mb-3">
                Ankit Gupta
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed mb-4 sm:mb-5 max-w-2xl">
                Solo developer and data analyst. Builds, maintains, and reviews every
                calculator on AllSmartCalculator. Based in India; writing in English
                for an India-first, globally relevant audience.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass glass-border hover:bg-white/5 transition-colors press text-sm font-semibold text-on-surface"
                >
                  <Linkedin className="w-4 h-4 text-primary" />
                  LinkedIn
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass glass-border hover:bg-white/5 transition-colors press text-sm font-semibold text-on-surface"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Bio */}
          <GlassCard className="p-5 sm:p-6 md:p-8 mb-6 sm:mb-8">
            <h2 className="font-headline font-bold text-lg sm:text-xl md:text-2xl text-on-surface mb-3 sm:mb-4">
              About
            </h2>
            <div className="flex flex-col gap-3 sm:gap-4 text-sm md:text-base text-on-surface-variant leading-relaxed">
              <p>
                I started AllSmartCalculator because the existing calculator hubs
                online — even the most popular ones — feel like they were built in
                2008: cluttered, ad-ridden, and painful to use on a phone. I wanted
                a calculator site that respected the reader: clean design, fast
                response, no dark patterns, no email walls.
              </p>
              <p>
                I write or review every calculator that ships. That includes the
                math (cross-checking each formula against textbook sources and
                published references), the explanatory content alongside it, and
                the limitations section that tells you when not to trust the
                number. For India-specific finance tools — EMI, SIP, GST, HRA,
                income tax — I use official sources (RBI, IT department, SEBI)
                and make assumptions explicit.
              </p>
              <p>
                I'm not a CA, a doctor, or a registered financial advisor. The
                calculators on this site are honest tools for thinking, not
                substitutes for professional advice. The{' '}
                <Link href="/disclaimer" className="text-primary hover:underline font-semibold">
                  disclaimer
                </Link>{' '}
                is worth reading; the{' '}
                <Link href="/methodology" className="text-primary hover:underline font-semibold">
                  methodology page
                </Link>{' '}
                explains how I build and verify each tool.
              </p>
            </div>
          </GlassCard>

          {/* Expertise */}
          <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl tracking-tighter mb-5 sm:mb-6">
            Areas of focus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-12">
            {expertise.map((item) => {
              const Icon = item.icon;
              return (
                <GlassCard key={item.title} className="p-5 sm:p-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center shadow-glow-primary mb-3 sm:mb-4">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-headline font-bold text-base text-on-surface mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {item.text}
                  </p>
                </GlassCard>
              );
            })}
          </div>

          {/* Editorial principles */}
          <GlassCard className="p-5 sm:p-6 md:p-8 mb-6 sm:mb-8">
            <h2 className="font-headline font-bold text-xl md:text-2xl text-on-surface mb-4">
              How I work
            </h2>
            <ul className="flex flex-col gap-3 text-sm md:text-base text-on-surface-variant leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-primary shrink-0 mt-0.5">→</span>
                <span>
                  <strong className="text-on-surface">Sources first.</strong> Every formula links back
                  to a recognised source: WHO for BMI, RBI for repo rate, IT
                  department for tax slabs, SEBI for mutual-fund disclosures.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary shrink-0 mt-0.5">→</span>
                <span>
                  <strong className="text-on-surface">Show the math.</strong> Every calculator pairs the
                  formula with a worked example. The result is never a black box.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary shrink-0 mt-0.5">→</span>
                <span>
                  <strong className="text-on-surface">Be honest about limits.</strong> Every calculator
                  has a limitations section. If a tool can't tell you something
                  important, that's said up front.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary shrink-0 mt-0.5">→</span>
                <span>
                  <strong className="text-on-surface">Fix in public.</strong> Found a bug, a wrong
                  formula, or outdated tax slabs? Email me — corrections ship
                  fast and are noted on the page.
                </span>
              </li>
            </ul>
          </GlassCard>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Link
              href="/methodology"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-primary-dim to-primary text-white font-semibold text-sm shadow-glow-primary press"
            >
              Read the methodology
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass glass-border text-on-surface font-semibold text-sm hover:bg-white/5 transition-colors"
            >
              Browse all calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
