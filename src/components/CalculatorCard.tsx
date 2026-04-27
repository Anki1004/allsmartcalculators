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
      <GlassCard className="h-full p-4 sm:p-6 hover:bg-white/[0.06] transition-all duration-300 group-hover:scale-[1.02]">
        <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
          <CalculatorIcon icon={calculator.icon} category={calculator.category} size="md" />
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {calculator.trending && (
              <span className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary">
                <Flame className="w-2.5 h-2.5" />
                Hot
              </span>
            )}
            <ArrowUpRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary group-hover:rotate-12 transition-all" />
          </div>
        </div>

        <h3 className="font-headline font-bold text-base sm:text-lg text-on-surface mb-1.5 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {calculator.name}
        </h3>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed line-clamp-2">
          {calculator.description}
        </p>

        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-between gap-2">
          <span className="text-[11px] sm:text-xs font-medium text-primary truncate">
            Open calculator →
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-on-surface-variant/60 truncate">
            {calculator.category}
          </span>
        </div>
      </GlassCard>
    </Link>
  );
}
