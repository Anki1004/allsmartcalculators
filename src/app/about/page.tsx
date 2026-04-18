import GlassCard from '@/components/GlassCard';
import { TOTAL_CALCULATORS } from '@/lib/calculator-registry';
import { Sparkles, Zap, Shield, Heart } from 'lucide-react';

export const metadata = {
  title: 'About — CalcVerse',
  description: 'The story behind CalcVerse.',
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
          <span className="text-on-surface">We built</span>{' '}
          <span className="text-gradient">CalcVerse</span>
          <br />
          <span className="text-on-surface">because math deserves better.</span>
        </h1>
        <p className="text-base md:text-xl text-on-surface-variant max-w-3xl mb-16 leading-relaxed">
          Every calculator site on the internet looks like it was built in 2008. Cluttered,
          ugly, ad-ridden, and painful to use. We thought — what if calculators could feel like
          a Stripe dashboard meets Apple Vision Pro? So we built it.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { v: `${TOTAL_CALCULATORS}+`, l: 'Calculators' },
            { v: '8', l: 'Categories' },
            { v: '2.4M+', l: 'Daily Calculations' },
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
          Our principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
}
