'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useCurrency, SUPPORTED_CURRENCIES } from '@/lib/currency-context';

const QUICK = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AED', 'AUD'];
const MORE  = SUPPORTED_CURRENCIES.filter((c) => !QUICK.includes(c.code));

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const isQuick  = QUICK.includes(currency);
  const activeInfo = SUPPORTED_CURRENCIES.find((c) => c.code === currency)!;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      {/* Label */}
      <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-on-surface-variant/60 shrink-0 flex items-center gap-1.5">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        Output Currency
      </span>

      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Quick-pick pills */}
        {QUICK.map((code) => {
          const info = SUPPORTED_CURRENCIES.find((c) => c.code === code)!;
          const active = currency === code;
          return (
            <button
              key={code}
              onClick={() => setCurrency(code)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono transition-all press border ${
                active
                  ? 'bg-primary/20 border-primary/50 text-primary shadow-[0_0_12px_rgba(189,157,255,0.2)]'
                  : 'border-white/10 bg-white/[0.03] text-on-surface-variant hover:text-on-surface hover:bg-white/[0.07] hover:border-white/20'
              }`}
            >
              <span className="text-sm leading-none">{info.flag}</span>
              <span>{code}</span>
            </button>
          );
        })}

        {/* More — custom dropdown */}
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((p) => !p)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono transition-all press border ${
              !isQuick
                ? 'bg-primary/20 border-primary/50 text-primary shadow-[0_0_12px_rgba(189,157,255,0.2)]'
                : 'border-white/10 bg-white/[0.03] text-on-surface-variant hover:text-on-surface hover:bg-white/[0.07] hover:border-white/20'
            }`}
          >
            {!isQuick && (
              <span className="text-sm leading-none">{activeInfo.flag}</span>
            )}
            <span>{isQuick ? 'More' : currency}</span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl overflow-hidden border border-outline-variant/20 bg-surface-container-high/95 backdrop-blur-xl shadow-ambient z-50">
              <div className="py-1.5 max-h-64 overflow-y-auto">
                {MORE.map((c) => {
                  const active = currency === c.code;
                  return (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c.code); setOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2 text-left transition-colors hover:bg-white/5 ${active ? 'bg-primary/10' : ''}`}
                    >
                      <span className="text-base leading-none w-5">{c.flag}</span>
                      <div className="flex-1 min-w-0">
                        <span className={`text-xs font-mono font-bold block ${active ? 'text-primary' : 'text-on-surface'}`}>
                          {c.code}
                        </span>
                        <span className="text-[10px] text-on-surface-variant/50 truncate block">{c.name}</span>
                      </div>
                      {active && <Check className="w-3 h-3 text-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
