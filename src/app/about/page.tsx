import type { Metadata } from 'next';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { TOTAL_CALCULATORS } from '@/lib/calculator-registry';
import {
  Sparkles,
  Zap,
  Shield,
  Heart,
  Linkedin,
  BookOpen,
  Mail,
  ChevronRight,
  ShieldCheck,
  RefreshCcw,
} from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.tech';

export const metadata: Metadata = {
  title: 'About — AllSmartCalculator',
  description:
    'How AllSmartCalculator is built, who builds it, and the methodology, sources, and review process behind every calculator on the site.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About AllSmartCalculator',
    description:
      'How AllSmartCalculator is built, who builds it, and the methodology behind every calculator.',
    url: `${SITE_URL}/about`,
    type: 'website',
    siteName: 'AllSmartCalculator',
  },
};

const values = [
  {
    icon: Sparkles,
    title: 'Obsessive design',
    text: 'Every pixel, transition, and number is crafted with intent. No templates, no shortcuts.',
  },
  {
    icon: Zap,
    title: 'Blazing fast',
    text: 'Sub-100ms calculations. Static pages. Zero loading states on the core work.',
  },
  {
    icon: Shield,
    title: 'Always free',
    text: 'No paywalls, no ads, no email capture. Just great tools, available to everyone.',
  },
  {
    icon: Heart,
    title: 'Built in public',
    text: 'Found a bug? Want a new calculator? We ship fixes fast and credit them on the page.',
  },
];

const trustBlocks = [
  {
    icon: BookOpen,
    title: 'Methodology',
    text: 'How we pick formulas, verify outputs, and write the supporting content. Includes our full primary-source list.',
    href: '/methodology',
    cta: 'Read the methodology',
  },
  {
    icon: ShieldCheck,
    title: 'Author',
    text: 'Every calculator is built and reviewed by Ankit Gupta. Background, focus areas, and editorial principles.',
    href: '/author/ankit-gupta',
    cta: 'About the author',
  },
  {
    icon: RefreshCcw,
    title: 'Disclaimer',
    text: "What our calculators are — and aren't. When to trust the number, and when to call a professional.",
    href: '/disclaimer',
    cta: 'Read the disclaimer',
  },
];

const sourceList = [
  'WHO and CDC for health categories and BMI cutoffs (global and Asian-specific)',
  'RBI for repo rate, monetary policy, and the fair-practice code on retail loans',
  'IT department of India for income tax slabs, HRA exemption, and Section 80 deductions',
  'SEBI and AMFI for mutual-fund disclosures and SIP modelling assumptions',
  'IRDAI for insurance regulations and rate references',
  'NIST and Wolfram MathWorld for scientific units and formula references',
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant/70 mb-6"
        >
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">About</span>
        </nav>

        {/* Hero */}
        <h1 className="font-headline font-black text-4xl md:text-7xl tracking-tighter mb-6">
          <span className="text-on-surface">I built</span>{' '}
          <span className="text-gradient">AllSmartCalculator</span>
          <br />
          <span className="text-on-surface">because math deserves better.</span>
        </h1>
        <p className="text-base md:text-xl text-on-surface-variant max-w-3xl mb-6 leading-relaxed">
          Every calculator site on the internet looks like it was built in 2008 —
          cluttered, ugly, ad-ridden, and painful to use on a phone. AllSmartCalculator
          is the opposite: clean, fast, free, ad-free, and honest about its limits.
          {TOTAL_CALCULATORS}+ calculators across 8 categories, all built and
          reviewed by one person, in public.
        </p>
        <p className="text-sm md:text-base text-on-surface-variant/80 max-w-3xl mb-12 leading-relaxed">
          The site has a particular focus on India-specific finance tools —
          EMI, SIP, GST, HRA, income tax, PPF, NPS — where most existing
          options are bank aggregators with cluttered, ad-heavy interfaces.
          For everything else (health, math, crypto, engineering, daily life),
          the bar is the same: the right formula, a clear explanation, an
          honest limitations section, and zero friction.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { v: `${TOTAL_CALCULATORS}+`, l: 'Calculators' },
            { v: '8', l: 'Categories' },
            { v: '$0', l: 'Cost to use' },
            { v: '0', l: 'Ads ever' },
          ].map((s) => (
            <GlassCard key={s.l} className="p-6 text-center">
              <p className="font-mono font-black text-3xl md:text-4xl text-gradient mb-1">
                {s.v}
              </p>
              <p className="text-xs uppercase tracking-[0.15em] text-on-surface-variant">
                {s.l}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Principles */}
        <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tighter mb-8">
          The principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <GlassCard key={v.title} className="p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center shadow-glow-primary mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-headline font-bold text-xl text-on-surface mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{v.text}</p>
              </GlassCard>
            );
          })}
        </div>

        {/* Trust blocks (E-E-A-T) */}
        <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tighter mb-3">
          How we earn trust
        </h2>
        <p className="text-sm md:text-base text-on-surface-variant mb-8 max-w-2xl">
          Calculators in finance, health, and tax can change real-world decisions.
          Three pages explain how we approach that responsibility.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {trustBlocks.map((t) => {
            const Icon = t.icon;
            return (
              <GlassCard key={t.title} className="p-6 flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center shadow-glow-primary mb-4">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-headline font-bold text-base text-on-surface mb-2">
                  {t.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-5 flex-1">
                  {t.text}
                </p>
                <Link
                  href={t.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  {t.cta} <ChevronRight className="w-4 h-4" />
                </Link>
              </GlassCard>
            );
          })}
        </div>

        {/* Data sources summary */}
        <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tighter mb-6">
          Data sources, in short
        </h2>
        <GlassCard className="p-6 md:p-8 mb-20">
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-5">
            Every calculator names its sources on the page itself. At a sitewide
            level, the primary references are:
          </p>
          <ul className="flex flex-col gap-3">
            {sourceList.map((s) => (
              <li
                key={s}
                className="flex items-start gap-2 text-sm text-on-surface-variant leading-relaxed"
              >
                <span className="text-primary shrink-0 mt-0.5">→</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-on-surface-variant/60 mt-5">
            Full per-domain list:{' '}
            <Link href="/methodology" className="text-primary hover:underline font-semibold">
              methodology page
            </Link>
            .
          </p>
        </GlassCard>

        {/* Built by */}
        <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tighter mb-8">
          Built by
        </h2>
        <GlassCard className="p-8 md:p-10 mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center shadow-glow-primary text-3xl font-headline font-black text-white shrink-0">
              A
            </div>
            <div className="flex-1">
              <h3 className="font-headline font-bold text-2xl text-on-surface mb-1">
                Ankit Gupta
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4 max-w-xl">
                Solo developer and data analyst. Builds, maintains, and reviews
                every calculator on AllSmartCalculator. Based in India; writing in
                English for an India-first, globally relevant audience.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/author/ankit-gupta"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-primary-dim to-primary text-white font-semibold text-sm shadow-glow-primary press"
                >
                  <BookOpen className="w-4 h-4" />
                  Full author page
                </Link>
                <a
                  href="https://www.linkedin.com/in/ankit-gupta-data-analyst"
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
        </GlassCard>

        {/* Contact */}
        <GlassCard className="p-6 md:p-8 border-l-2 border-primary/60">
          <h2 className="font-headline font-bold text-lg md:text-xl text-on-surface mb-3">
            How to reach us
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-2">
            Calculator suggestion, bug report, formula correction, or general
            feedback —{' '}
            <span className="text-primary font-mono">hello@allsmartcalculator.tech</span>{' '}
            or use the{' '}
            <Link href="/contact" className="text-primary hover:underline font-semibold">
              contact form
            </Link>
            . We read every message.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
