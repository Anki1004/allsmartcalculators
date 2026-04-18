'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchCalculators } from '@/lib/calculator-registry';
import { CATEGORIES } from '@/lib/calculator-types';
import type { CalculatorConfig } from '@/lib/calculator-types';

const HINTS = ['EMI', 'BMI', 'SIP', 'crypto', 'health', 'tax', 'compound', 'calories'];

function getCategoryIcon(cat: string) {
  return CATEGORIES.find((c) => c.id === cat)?.icon ?? '🔢';
}

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CalculatorConfig[]>([]);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  /* open via event or Ctrl+K */
  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener('open-search', onOpen);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('open-search', onOpen); window.removeEventListener('keydown', onKey); };
  }, []);

  /* focus on open, reset on close */
  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 40); }
    else { setQuery(''); setResults([]); setActive(0); }
  }, [open]);

  /* live search */
  useEffect(() => {
    const q = query.trim();
    if (!q) { setResults([]); setActive(0); return; }
    setResults(searchCalculators(q).slice(0, 9));
    setActive(0);
  }, [query]);

  const go = (calc: CalculatorConfig) => {
    router.push(`/${calc.category}/${calc.slug}`);
    setOpen(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    if (e.key === 'Enter' && results[active]) go(results[active]);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center px-4 pt-[8vh]"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-surface/75 backdrop-blur-2xl" />

      {/* Panel */}
      <div
        className="relative w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKey}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 bg-surface-container-high border border-outline-variant/30 rounded-2xl px-5 py-4 shadow-ambient">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search — try 'health', 'BMI', 'loan', 'crypto'…"
            className="flex-1 bg-transparent outline-none text-base text-on-surface placeholder:text-on-surface-variant/40 font-body"
          />
          <div className="flex items-center gap-2 shrink-0">
            <kbd className="hidden sm:block px-2 py-0.5 rounded-md bg-surface-container text-[10px] font-mono text-on-surface-variant border border-outline-variant/30">
              ESC
            </kbd>
            <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-white/5 transition-colors">
              <X className="w-4 h-4 text-on-surface-variant" />
            </button>
          </div>
        </div>

        {/* Results list */}
        {results.length > 0 && (
          <div className="mt-2 bg-surface-container-high border border-outline-variant/30 rounded-2xl overflow-hidden shadow-ambient">
            {results.map((calc, idx) => (
              <button
                key={calc.slug}
                onClick={() => go(calc)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 text-left border-b border-white/[0.04] last:border-0 transition-colors ${
                  idx === active ? 'bg-primary/10' : 'hover:bg-white/[0.04]'
                }`}
              >
                <span className="text-xl w-7 shrink-0 leading-none">{getCategoryIcon(calc.category)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-sm text-on-surface">{calc.name}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {calc.category}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">{calc.description}</p>
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 ${idx === active ? 'text-primary' : 'text-outline'}`} />
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {query.trim() !== '' && results.length === 0 && (
          <div className="mt-2 bg-surface-container-high border border-outline-variant/30 rounded-2xl px-5 py-10 text-center shadow-ambient">
            <p className="text-sm text-on-surface-variant">
              No calculators for{' '}
              <span className="text-on-surface font-semibold">"{query}"</span>
            </p>
          </div>
        )}

        {/* Hint chips shown when empty */}
        {query === '' && (
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50 self-center mr-1">
              Try:
            </span>
            {HINTS.map((h) => (
              <button
                key={h}
                onClick={() => setQuery(h)}
                className="px-3 py-1 rounded-full text-xs font-mono font-semibold glass glass-border text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors"
              >
                {h}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
