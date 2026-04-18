'use client';

import { Sparkles } from 'lucide-react';

export default function HomeSearchBar() {
  const open = () => window.dispatchEvent(new CustomEvent('open-search'));

  return (
    <button
      onClick={open}
      className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl glass glass-border hover:bg-white/[0.05] hover:shadow-glow-primary transition-all text-left group"
    >
      <Sparkles className="w-4 h-4 text-primary shrink-0" />
      <span className="flex-1 text-base text-on-surface-variant/50 font-body">
        Try 'EMI for car loan' or 'BMI calculator'…
      </span>
      <span className="hidden md:flex items-center gap-1 shrink-0">
        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-on-surface-variant/40">
          Ctrl
        </kbd>
        <span className="text-[10px] text-on-surface-variant/30">+</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-on-surface-variant/40">
          K
        </kbd>
      </span>
    </button>
  );
}
