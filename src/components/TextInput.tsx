'use client';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  color?: 'primary' | 'secondary' | 'tertiary';
}

export default function TextInput({
  label,
  value,
  onChange,
  placeholder,
  color = 'primary',
}: TextInputProps) {
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
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 font-mono text-sm font-semibold text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none transition-all ${focusMap[color]}`}
        style={{ colorScheme: 'dark' }}
      />
    </div>
  );
}
