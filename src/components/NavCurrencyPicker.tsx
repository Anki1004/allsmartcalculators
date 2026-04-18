'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useCurrency, SUPPORTED_CURRENCIES } from '@/lib/currency-context';

export default function NavCurrencyPicker() {
  const { currency, setCurrency, flag } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={ref} className="relative hidden md:block">
      {/* Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass glass-border hover:bg-white/5 transition-colors text-xs font-bold font-mono text-on-surface"
      >
        <span className="text-sm leading-none">{flag}</span>
        <span>{currency}</span>
        <ChevronDown
          className={`w-3 h-3 text-on-surface-variant transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden border border-outline-variant/20 bg-surface-container-high/95 backdrop-blur-xl shadow-ambient z-[999]">
          <div className="py-1.5 max-h-72 overflow-y-auto">
            {SUPPORTED_CURRENCIES.map((c) => {
              const active = currency === c.code;
              return (
                <button
                  key={c.code}
                  onClick={() => { setCurrency(c.code); setOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2 text-left transition-colors hover:bg-white/5 ${
                    active ? 'bg-primary/10' : ''
                  }`}
                >
                  <span className="text-base leading-none w-5">{c.flag}</span>
                  <span className={`text-xs font-mono font-bold ${active ? 'text-primary' : 'text-on-surface'}`}>
                    {c.code}
                  </span>
                  <span className="ml-auto text-[10px] text-on-surface-variant/50 font-mono">
                    {c.symbol}
                  </span>
                  {active && <Check className="w-3 h-3 text-primary ml-1 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
