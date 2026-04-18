'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ResultDisplayProps {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'tertiary' | 'white';
  animate?: boolean;
}

export default function ResultDisplay({
  label,
  value,
  prefix,
  suffix,
  decimals = 2,
  size = 'md',
  color = 'white',
  animate = true,
}: ResultDisplayProps) {
  const [displayValue, setDisplayValue] = useState(typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (typeof value !== 'number' || !animate) {
      setDisplayValue(value);
      return;
    }

    const start = typeof displayValue === 'number' ? displayValue : 0;
    const end = value;
    const duration = 600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplayValue(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, animate]);

  const sizes = {
    sm: 'text-xl md:text-2xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
    xl: 'text-5xl md:text-7xl',
  };

  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
    white: 'text-on-surface',
  };

  const formatted =
    typeof displayValue === 'number'
      ? displayValue.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : displayValue;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant">
        {label}
      </span>
      <div
        className={cn(
          'font-mono font-bold tracking-tight',
          sizes[size],
          colors[color]
        )}
        style={
          color === 'primary'
            ? { textShadow: '0 0 30px rgba(189, 157, 255, 0.3)' }
            : color === 'secondary'
            ? { textShadow: '0 0 30px rgba(83, 221, 252, 0.3)' }
            : undefined
        }
      >
        {prefix}
        {formatted}
        {suffix && <span className="text-on-surface-variant ml-1 text-[0.6em]">{suffix}</span>}
      </div>
    </div>
  );
}
