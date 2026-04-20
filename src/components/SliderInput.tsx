'use client';

import { useState, useEffect } from 'react';
import { cn, formatNumber } from '@/lib/utils';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  formatValue?: (v: number) => string;
  color?: 'primary' | 'secondary' | 'tertiary';
}

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  formatValue,
  color = 'primary',
}: SliderInputProps) {
  const [raw, setRaw] = useState(String(value));

  // Keep raw in sync when slider or external change updates value
  useEffect(() => {
    setRaw(String(value));
  }, [value]);

  const percentage = ((value - min) / (max - min)) * 100;

  const colorMap = {
    primary: { start: '#8a4cfc', end: '#bd9dff', text: 'text-primary' },
    secondary: { start: '#40ceed', end: '#53ddfc', text: 'text-secondary' },
    tertiary: { start: '#58e7ab', end: '#9bffce', text: 'text-tertiary' },
  };

  const displayValue = formatValue
    ? formatValue(value)
    : `${prefix ?? ''}${formatNumber(value, 0)}${suffix ? ` ${suffix}` : ''}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setRaw(str);
    const num = parseFloat(str);
    if (!isNaN(num)) onChange(num);
  };

  const handleBlur = () => {
    const num = parseFloat(raw);
    if (isNaN(num) || raw.trim() === '') {
      onChange(min);
      setRaw(String(min));
    } else {
      const clamped = Math.min(max, Math.max(min, num));
      onChange(clamped);
      setRaw(String(clamped));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant">
          {label}
        </label>
        <span className={cn('font-mono text-lg font-bold', colorMap[color].text)}>
          {displayValue}
        </span>
      </div>

      {/* Number input */}
      <div className="relative">
        <input
          type="number"
          value={raw}
          onChange={handleInputChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          step={step}
          className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 pr-12 font-mono text-base font-semibold text-on-surface focus:outline-none focus:border-primary/40 focus:shadow-[0_0_0_3px_rgba(189,157,255,0.15)] transition-all"
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-mono text-on-surface-variant pointer-events-none">
            {suffix}
          </span>
        )}
      </div>

      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="cosmic-slider w-full"
          style={{
            background: `linear-gradient(to right, ${colorMap[color].start}, ${colorMap[color].end} ${percentage}%, #1d2347 ${percentage}%)`,
          }}
        />
      </div>
    </div>
  );
}
