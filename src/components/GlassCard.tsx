import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'subtle';
  glow?: boolean;
}

export default function GlassCard({
  className,
  variant = 'default',
  glow = false,
  children,
  ...props
}: GlassCardProps) {
  const variants = {
    default: 'bg-white/[0.03] backdrop-blur-xl',
    elevated: 'bg-surface-container-high/80 backdrop-blur-xl',
    subtle: 'bg-surface-container-low/60 backdrop-blur-lg',
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden',
        variants[variant],
        glow && 'shadow-glow-primary',
        className
      )}
      {...props}
    >
      {/* Ghost border (top + left highlight) */}
      <div className="absolute inset-0 rounded-2xl border-t border-l border-outline-variant/15 pointer-events-none" />
      {children}
    </div>
  );
}
