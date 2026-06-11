'use client';

import { useState } from 'react';
import GlassCard from '../GlassCard';
import SelectInput from '../SelectInput';
import ResultDisplay from '../ResultDisplay';
import { AlertCircle, Check, Copy, Dices, RefreshCw } from 'lucide-react';

const MAX_COUNT = 1000;
// Keep |min| and |max| well inside Number.MAX_SAFE_INTEGER so the range size
// (max - min + 1) stays float-exact for Math.random() scaling.
const ABS_LIMIT = 1_000_000_000_000_000; // 1e15
// Below this range size we shuffle the actual pool (exact, no retries);
// above it we rejection-sample with a Set (count <= 1000, so collisions
// against a 100k+ range are vanishingly rare).
const FISHER_YATES_LIMIT = 100_000;

const focusMap = {
  primary: 'focus:border-primary/40 focus:shadow-[0_0_0_3px_rgba(189,157,255,0.15)]',
  secondary: 'focus:border-secondary/40 focus:shadow-[0_0_0_3px_rgba(83,221,252,0.15)]',
  tertiary: 'focus:border-tertiary/40 focus:shadow-[0_0_0_3px_rgba(155,255,206,0.15)]',
} as const;

interface NumberFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  color?: keyof typeof focusMap;
  placeholder?: string;
}

/** Plain integer text field styled to match SelectInput / SliderInput fields. */
function NumberField({ label, value, onChange, color = 'primary', placeholder }: NumberFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant">
        {label}
      </label>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9-]/g, ''))}
        placeholder={placeholder}
        aria-label={label}
        className={`w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 font-mono text-base font-semibold text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none transition-all ${focusMap[color]}`}
      />
    </div>
  );
}

/** Strict whole-number parse: returns null for empty / malformed input. */
function parseWhole(raw: string): number | null {
  const t = raw.trim();
  if (!/^-?\d+$/.test(t)) return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

export default function RandomNumberGenerator() {
  const [minRaw, setMinRaw] = useState('1');
  const [maxRaw, setMaxRaw] = useState('100');
  const [countRaw, setCountRaw] = useState('1');
  const [allowDuplicates, setAllowDuplicates] = useState('yes');
  const [sortOrder, setSortOrder] = useState('none');

  const [results, setResults] = useState<number[] | null>(null);
  const [prevResults, setPrevResults] = useState<number[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const updateField = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    setError(null);
  };

  const handleGenerate = () => {
    setCopyState('idle');

    const min = parseWhole(minRaw);
    if (min === null) {
      setError('Please enter a valid whole number for Min.');
      return;
    }
    const max = parseWhole(maxRaw);
    if (max === null) {
      setError('Please enter a valid whole number for Max.');
      return;
    }
    if (Math.abs(min) > ABS_LIMIT || Math.abs(max) > ABS_LIMIT) {
      setError('Min and Max must be within ±1,000,000,000,000,000.');
      return;
    }
    if (min > max) {
      setError('Min must be less than or equal to Max.');
      return;
    }
    const count = parseWhole(countRaw);
    if (count === null || count < 1) {
      setError('How many must be a whole number of at least 1.');
      return;
    }
    if (count > MAX_COUNT) {
      setError(`You can generate at most ${MAX_COUNT.toLocaleString('en-US')} numbers at once.`);
      return;
    }

    const rangeSize = max - min + 1;
    const unique = allowDuplicates === 'no';

    if (unique && count > rangeSize) {
      setError(
        `Without duplicates, you can draw at most ${rangeSize.toLocaleString('en-US')} unique ${
          rangeSize === 1 ? 'number' : 'numbers'
        } from ${min.toLocaleString('en-US')} to ${max.toLocaleString('en-US')}. Lower "How many" or allow duplicates.`
      );
      return;
    }

    let drawn: number[];
    if (!unique) {
      drawn = Array.from({ length: count }, () => min + Math.floor(Math.random() * rangeSize));
    } else if (rangeSize <= FISHER_YATES_LIMIT) {
      // Partial Fisher–Yates over the full pool: the first `count` slots end
      // up as a uniform random sample without replacement.
      const pool = new Array<number>(rangeSize);
      for (let i = 0; i < rangeSize; i++) pool[i] = min + i;
      for (let i = 0; i < count; i++) {
        const j = i + Math.floor(Math.random() * (rangeSize - i));
        const tmp = pool[i];
        pool[i] = pool[j];
        pool[j] = tmp;
      }
      drawn = pool.slice(0, count);
    } else {
      // Huge range: rejection sampling with a Set.
      const seen = new Set<number>();
      while (seen.size < count) {
        seen.add(min + Math.floor(Math.random() * rangeSize));
      }
      drawn = Array.from(seen);
    }

    if (sortOrder === 'asc') drawn = [...drawn].sort((a, b) => a - b);

    setError(null);
    setPrevResults(results);
    setResults(drawn);
  };

  const handleCopy = async () => {
    if (!results || results.length === 0) return;
    try {
      await navigator.clipboard.writeText(results.join(', '));
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    setTimeout(() => setCopyState('idle'), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-8">
      {/* INPUT PANEL */}
      <GlassCard className="lg:col-span-3 p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-white/[0.06]">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Dices className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant/60 mb-0.5 truncate">
              Random Number Generator
            </p>
            <p className="text-xs sm:text-sm font-semibold text-on-surface-variant">
              Set your range, then roll
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <NumberField
              label="Min"
              value={minRaw}
              onChange={updateField(setMinRaw)}
              color="primary"
              placeholder="1"
            />
            <NumberField
              label="Max"
              value={maxRaw}
              onChange={updateField(setMaxRaw)}
              color="primary"
              placeholder="100"
            />
          </div>

          <NumberField
            label={`How many (max ${MAX_COUNT.toLocaleString('en-US')})`}
            value={countRaw}
            onChange={updateField(setCountRaw)}
            color="secondary"
            placeholder="1"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <SelectInput
              label="Allow duplicates"
              value={allowDuplicates}
              onChange={(v) => {
                setAllowDuplicates(v);
                setError(null);
              }}
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
              color="secondary"
            />
            <SelectInput
              label="Sort results"
              value={sortOrder}
              onChange={setSortOrder}
              options={[
                { label: 'None', value: 'none' },
                { label: 'Ascending', value: 'asc' },
              ]}
              color="tertiary"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-xl bg-error-container/20 border border-error/20 px-4 py-3 text-xs sm:text-sm font-semibold text-error"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleGenerate}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-br from-primary-dim to-primary text-white font-semibold text-sm sm:text-base shadow-glow-primary press hover:opacity-90 transition-opacity"
          >
            <Dices className="w-5 h-5 shrink-0" />
            Generate
          </button>
        </div>
      </GlassCard>

      {/* RESULTS PANEL */}
      <div className="lg:col-span-2 flex flex-col gap-5 sm:gap-6">
        <GlassCard className="p-5 sm:p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            {results ? (
              <>
                {results.length === 1 ? (
                  <div className="text-center py-4 sm:py-6 overflow-hidden">
                    <ResultDisplay
                      label="Your number"
                      value={results[0]}
                      decimals={0}
                      size="xl"
                      color="primary"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant">
                      Your numbers ({results.length.toLocaleString('en-US')})
                    </span>
                    <div className="flex flex-wrap gap-2 max-h-[340px] overflow-y-auto pr-1">
                      {results.map((n, i) => (
                        <span
                          key={i}
                          className="font-mono text-sm font-semibold text-on-surface bg-white/5 border border-white/10 rounded-lg px-3 py-1.5"
                        >
                          {n.toLocaleString('en-US')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {prevResults && prevResults.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-white/5">
                    <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-on-surface-variant/50 mb-1.5">
                      Previous roll
                    </p>
                    <p className="font-mono text-xs text-on-surface-variant/40 break-words leading-relaxed max-h-16 overflow-hidden">
                      {prevResults.join(', ')}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10 sm:py-12 md:py-16 flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Dices className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <p className="font-headline font-bold text-base sm:text-lg text-on-surface mb-1">
                    Feeling lucky?
                  </p>
                  <p className="text-xs sm:text-sm text-on-surface-variant max-w-xs mx-auto leading-relaxed px-2">
                    Set a range on the left and hit Generate to roll your numbers.
                  </p>
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          {copyState !== 'idle' && (
            <div
              className={`flex items-center justify-center gap-2 text-xs font-semibold ${
                copyState === 'copied' ? 'text-tertiary' : 'text-error'
              }`}
              role="status"
            >
              {copyState === 'copied' ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5" />
              )}
              {copyState === 'copied' ? 'Copied!' : 'Could not copy.'}
            </div>
          )}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!results}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-3 rounded-xl glass glass-border text-on-surface font-semibold text-xs sm:text-sm hover:bg-white/5 transition-colors press disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Copy className="w-4 h-4 shrink-0" />
              <span>Copy all</span>
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!results}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-3 rounded-xl glass glass-border text-on-surface font-semibold text-xs sm:text-sm hover:bg-white/5 transition-colors press disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-4 h-4 shrink-0" />
              <span>Generate again</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
