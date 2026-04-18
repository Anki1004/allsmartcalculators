import Link from 'next/link';
import { ArrowUpRight, Flame } from 'lucide-react';
import { CalculatorConfig } from '@/lib/calculator-types';
import GlassCard from './GlassCard';
import CalculatorIcon from './CalculatorIcon';

interface CalculatorCardProps {
  calculator: CalculatorConfig;
  size?: 'sm' | 'md' | 'lg';
}

export default function CalculatorCard({ calculator }: CalculatorCardProps) {
  return (
    <Link
      href={`/${calculator.category}/${calculator.slug}`}
      className="group block magnetic"
    >
      <GlassCard className="h-full p-6 hover:bg-white/[0.06] transition-all duration-300 group-hover:scale-[1.02]">
        <div className="flex items-start justify-between mb-4">
          <CalculatorIcon icon={calculator.icon} category={calculator.category} size="md" />
          <div className="flex items-center gap-2">
            {calculator.trending && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-wider text-primary">
                <Flame className="w-2.5 h-2.5" />
                Hot
              </span>
            )}
            <ArrowUpRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary group-hover:rotate-12 transition-all" />
          </div>
        </div>

        <h3 className="font-headline font-bold text-lg text-on-surface mb-2 group-hover:text-primary transition-colors">
          {calculator.name}
        </h3>
        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2">
          {calculator.description}
        </p>

        {calculator.usageCount && (
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-on-surface-variant">
              {calculator.usageCount.toLocaleString()} uses
            </span>
            <span className="text-xs uppercase tracking-wider text-on-surface-variant/60">
              {calculator.category}
            </span>
          </div>
        )}
      </GlassCard>
    </Link>
  );
}
