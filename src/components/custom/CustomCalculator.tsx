'use client';

import dynamic from 'next/dynamic';
import GlassCard from '../GlassCard';

// Each bespoke calculator is lazy-loaded so its code only ships on its own
// page — the shared [category]/[slug] chunk stays lean.
const loading = () => (
  <GlassCard className="p-8 min-h-[320px]" aria-hidden>
    <div className="h-full w-full" />
  </GlassCard>
);

const ScientificCalculator = dynamic(() => import('./ScientificCalculator'), { loading });
const TimeCardCalculator = dynamic(() => import('./TimeCardCalculator'), { loading });
const RandomNumberGenerator = dynamic(() => import('./RandomNumberGenerator'), { loading });

export type CustomCalculatorType = 'scientific' | 'time-card' | 'random-number';

export default function CustomCalculator({ type }: { type: CustomCalculatorType }) {
  switch (type) {
    case 'scientific':
      return <ScientificCalculator />;
    case 'time-card':
      return <TimeCardCalculator />;
    case 'random-number':
      return <RandomNumberGenerator />;
    default:
      return null;
  }
}
