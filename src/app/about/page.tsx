import GlassCard from '@/components/GlassCard';
import { TOTAL_CALCULATORS } from '@/lib/calculator-registry';
import { Sparkles, Zap, Shield, Heart, Linkedin } from 'lucide-react';

export const metadata = {
  title: 'About — AllSmartCalculator',
  description: 'The story behind AllSmartCalculator.',
};

const values = [
  {
    icon: Sparkles,
    title: 'Obsessive Design',
    text: 'Every pixel, transition, and number is crafted with intent. No templates. No shortcuts.',
  },
  {
    icon: Zap,
    title: 'Blazing Fast',
    text: 'Sub-100ms calculations. Static pages. Zero loading states on the core work.',
  },
  {
    icon: Shield,
    title: 'Always Free',
    text: 'No paywalls. No ads. No email capture. Just great tools, available to everyone.',
  },
  {
    icon: Heart,
    title: 'Open to Feedback',
    text: 'Found a bug? Want a new calculator? We build in public and ship fast.',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-headline font-black text-4xl md:text-7xl tracking-tighter mb-6">
          <span className="text-on-surface">I built</span>{' '}
          <span className="text-gradient">AllSmartCalculator</span>
          <br />
          <span className="text-on-surface">because math deserves better.</span>
        </h1>
        <p className="text-base md:text-xl text-on-surface-variant max-w-3xl mb-6 leading-relaxed">
          Every calculator site on the internet looks like it was built in 2008. Cluttered,
          ugly, ad-ridden, and painful to use. I wanted to find out — what if calculators could feel like
          a Stripe dashboard meets Apple Vision Pro? So I built it.
        </p>
        <p className="text-sm md:text-base text-on-surface-variant/80 max-w-3xl mb-16 leading-relaxed">
          AllSmartCalculator is a personal passion project — kept free, open, and ad-free on purpose.
          No subscriptions, no email walls, no hidden monetization. If it ever needs to sustain itself,
          it&apos;ll be through optional sponsorships, never your data.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { v: `${TOTAL_CALCULATORS}+`, l: 'Calculators' },
            { v: '8', l: 'Categories' },
            { v: '$0', l: 'Cost to use' },
            { v: '0', l: 'Ads Ever' },
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

        {/* Values */}
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

        {/* Built by */}
        <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tighter mb-8">
          Built by
        </h2>
        <GlassCard className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center shadow-glow-primary text-3xl font-headline font-black text-white shrink-0">
              A
            </div>
            <div className="flex-1">
              <h3 className="font-headline font-bold text-2xl text-on-surface mb-1">
                Ankit Gupta
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4 max-w-xl">
                Solo developer and the human behind every calculator on this site.
                Building tools I&apos;d actually want to use, in public. Reach out — feedback,
                bug reports, and calculator ideas all welcome.
              </p>
              <a
                href="https://www.linkedin.com/in/ankit-gupta-data-analyst"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass glass-border hover:bg-white/5 transition-colors press text-sm font-semibold text-on-surface"
              >
                <Linkedin className="w-4 h-4 text-primary" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
