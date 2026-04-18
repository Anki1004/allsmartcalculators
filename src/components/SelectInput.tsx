'use client';

interface SelectInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: { label: string; value: string | number }[];
  color?: 'primary' | 'secondary' | 'tertiary';
}

export default function SelectInput({
  label,
  value,
  onChange,
  options,
  color = 'primary',
}: SelectInputProps) {
  const focusMap = {
    primary: 'focus:border-primary/40 focus:shadow-[0_0_0_3px_rgba(189,157,255,0.15)]',
    secondary: 'focus:border-secondary/40 focus:shadow-[0_0_0_3px_rgba(83,221,252,0.15)]',
    tertiary: 'focus:border-tertiary/40 focus:shadow-[0_0_0_3px_rgba(155,255,206,0.15)]',
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant">
        {label}
      </label>
      <div className="relative">
        <select
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 pr-10 font-mono text-sm font-semibold text-on-surface focus:outline-none transition-all appearance-none cursor-pointer ${focusMap[color]}`}
          style={{ colorScheme: 'dark' }}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
