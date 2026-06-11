'use client';

import { useMemo, useState, useId } from 'react';
import { Clock, RotateCcw, X } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import ResultDisplay from '@/components/ResultDisplay';

const DAY_NAMES = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

interface DayEntry {
  clockIn: string;
  clockOut: string;
  breakMin: string;
}

const makeDefaultWeek = (): DayEntry[] =>
  DAY_NAMES.map((_, i) =>
    i < 5
      ? { clockIn: '09:00', clockOut: '17:00', breakMin: '30' }
      : { clockIn: '', clockOut: '', breakMin: '' }
  );

/** Parse "HH:MM" (24h) to minutes since midnight, or null when empty/invalid. */
function parseTimeToMinutes(t: string): number | null {
  const m = /^(\d{1,2}):(\d{2})/.exec(t);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

/**
 * Worked minutes for a day, or null when the row should be skipped
 * (missing clock-in or clock-out). out <= in is treated as an
 * overnight shift (+24h). Result is clamped to >= 0.
 */
function dayWorkedMinutes(d: DayEntry): number | null {
  const inMin = parseTimeToMinutes(d.clockIn);
  const outMin = parseTimeToMinutes(d.clockOut);
  if (inMin === null || outMin === null) return null;
  let worked = outMin - inMin;
  if (worked <= 0) worked += 24 * 60; // overnight shift
  const brk = parseFloat(d.breakMin);
  const breakMins = Number.isFinite(brk) && brk > 0 ? brk : 0;
  return Math.max(0, worked - breakMins);
}

/** 450 -> "7h 30m" */
function formatHM(totalMinutes: number): string {
  let h = Math.floor(totalMinutes / 60);
  let m = Math.round(totalMinutes - h * 60);
  if (m === 60) {
    h += 1;
    m = 0;
  }
  return `${h}h ${String(m).padStart(2, '0')}m`;
}

// Field styling mirrors SelectInput / SliderInput.
const fieldBase =
  'w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-3 py-2 font-mono text-sm font-semibold text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none transition-all';
const focusPrimary =
  'focus:border-primary/40 focus:shadow-[0_0_0_3px_rgba(189,157,255,0.15)]';
const focusSecondary =
  'focus:border-secondary/40 focus:shadow-[0_0_0_3px_rgba(83,221,252,0.15)]';
const microLabel =
  'text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant/60';

export default function TimeCardCalculator() {
  const [week, setWeek] = useState<DayEntry[]>(makeDefaultWeek);
  const [rate, setRate] = useState('20');
  const [otThreshold, setOtThreshold] = useState('40');
  const [otMultiplier, setOtMultiplier] = useState('1.5');
  const uid = useId();

  const updateDay = (index: number, patch: Partial<DayEntry>) =>
    setWeek((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));

  const clearDay = (index: number) =>
    updateDay(index, { clockIn: '', clockOut: '', breakMin: '' });

  const resetWeek = () => setWeek(makeDefaultWeek());

  const {
    dayMinutes,
    totalMinutes,
    totalHours,
    daysWorked,
    regularHours,
    overtimeHours,
    grossPay,
    errors,
  } = useMemo(() => {
    const dayMinutes = week.map(dayWorkedMinutes);
    const totalMinutes = dayMinutes.reduce<number>((s, m) => s + (m ?? 0), 0);
    const totalHours = totalMinutes / 60;
    const daysWorked = dayMinutes.filter((m) => m !== null).length;

    const errors: string[] = [];
    const r = parseFloat(rate);
    const t = parseFloat(otThreshold);
    const x = parseFloat(otMultiplier);
    const rateOk = Number.isFinite(r) && r >= 0;
    const thrOk = Number.isFinite(t) && t >= 0;
    const multOk = Number.isFinite(x) && x >= 0;
    if (!rateOk) errors.push('Enter a valid hourly rate (0 or more).');
    if (!thrOk) errors.push('Enter a valid overtime threshold in hours (0 or more).');
    if (!multOk) errors.push('Enter a valid overtime multiplier (0 or more).');

    const regularHours = thrOk ? Math.min(totalHours, t) : null;
    const overtimeHours = thrOk ? Math.max(0, totalHours - t) : null;
    const grossPay =
      rateOk && multOk && regularHours !== null && overtimeHours !== null
        ? regularHours * r + overtimeHours * r * x
        : null;

    return {
      dayMinutes,
      totalMinutes,
      totalHours,
      daysWorked,
      regularHours,
      overtimeHours,
      grossPay,
      errors,
    };
  }, [week, rate, otThreshold, otMultiplier]);

  const grossDisplay =
    grossPay === null
      ? '—'
      : `$${grossPay.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;

  const decimalHours = totalHours.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-8">
      {/* INPUT PANEL */}
      <GlassCard className="lg:col-span-3 p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 pb-5 border-b border-white/[0.06]">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-headline font-bold text-base sm:text-lg text-on-surface">
              Weekly Time Card
            </p>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Enter clock-in and clock-out times — leave a day blank to skip it
            </p>
          </div>
        </div>

        {/* Day rows */}
        <div className="flex flex-col">
          {week.map((d, i) => {
            const mins = dayMinutes[i];
            const hasAny =
              d.clockIn !== '' || d.clockOut !== '' || d.breakMin !== '';
            return (
              <div
                key={DAY_NAMES[i]}
                className="py-3 sm:py-4 border-b border-white/[0.06] last:border-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant">
                    {DAY_NAMES[i]}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-xs ${
                        mins !== null
                          ? 'text-on-surface-variant'
                          : 'text-on-surface-variant/40'
                      }`}
                    >
                      {mins !== null ? formatHM(mins) : 'Skipped'}
                    </span>
                    {hasAny && (
                      <button
                        type="button"
                        onClick={() => clearDay(i)}
                        aria-label={`Clear ${DAY_NAMES[i]}`}
                        className="p-1 rounded-lg text-on-surface-variant/60 hover:text-on-surface hover:bg-white/5 transition-colors press"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="flex flex-col gap-1 min-w-0">
                    <label htmlFor={`${uid}-in-${i}`} className={microLabel}>
                      Clock in
                    </label>
                    <input
                      id={`${uid}-in-${i}`}
                      type="time"
                      value={d.clockIn}
                      onChange={(e) => updateDay(i, { clockIn: e.target.value })}
                      className={`${fieldBase} ${focusPrimary}`}
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <label htmlFor={`${uid}-out-${i}`} className={microLabel}>
                      Clock out
                    </label>
                    <input
                      id={`${uid}-out-${i}`}
                      type="time"
                      value={d.clockOut}
                      onChange={(e) => updateDay(i, { clockOut: e.target.value })}
                      className={`${fieldBase} ${focusPrimary}`}
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <label htmlFor={`${uid}-brk-${i}`} className={microLabel}>
                      Break (min)
                    </label>
                    <input
                      id={`${uid}-brk-${i}`}
                      type="number"
                      min={0}
                      step={5}
                      inputMode="numeric"
                      placeholder="0"
                      value={d.breakMin}
                      onChange={(e) => updateDay(i, { breakMin: e.target.value })}
                      className={`${fieldBase} ${focusPrimary}`}
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pay settings */}
        <div className="mt-5 sm:mt-6 pt-5 border-t border-white/[0.06]">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant mb-3">
            Pay settings
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex flex-col gap-1 min-w-0">
              <label htmlFor={`${uid}-rate`} className={microLabel}>
                Hourly rate
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-mono text-on-surface-variant pointer-events-none">
                  $
                </span>
                <input
                  id={`${uid}-rate`}
                  type="number"
                  min={0}
                  step={0.5}
                  inputMode="decimal"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className={`${fieldBase} ${focusSecondary} pl-7`}
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <label htmlFor={`${uid}-thr`} className={microLabel}>
                OT threshold (hrs/wk)
              </label>
              <input
                id={`${uid}-thr`}
                type="number"
                min={0}
                step={1}
                inputMode="decimal"
                value={otThreshold}
                onChange={(e) => setOtThreshold(e.target.value)}
                className={`${fieldBase} ${focusSecondary}`}
                style={{ colorScheme: 'dark' }}
              />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <label htmlFor={`${uid}-mult`} className={microLabel}>
                OT multiplier (×)
              </label>
              <input
                id={`${uid}-mult`}
                type="number"
                min={0}
                step={0.1}
                inputMode="decimal"
                value={otMultiplier}
                onChange={(e) => setOtMultiplier(e.target.value)}
                className={`${fieldBase} ${focusSecondary}`}
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* RESULTS PANEL */}
      <div className="lg:col-span-2 flex flex-col gap-5 sm:gap-6">
        <GlassCard className="p-5 sm:p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="text-center py-2 sm:py-4 overflow-hidden">
              <ResultDisplay
                label="Gross pay"
                value={grossDisplay}
                size="lg"
                color="primary"
                animate={false}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-5 pt-5 border-t border-white/5">
              <div className="flex flex-col gap-1">
                <ResultDisplay
                  label="Weekly total"
                  value={formatHM(totalMinutes)}
                  size="sm"
                  color="white"
                  animate={false}
                />
                <span className="font-mono text-xs text-on-surface-variant">
                  {decimalHours} hrs decimal
                </span>
              </div>
              <ResultDisplay
                label="Days worked"
                value={daysWorked}
                decimals={0}
                size="sm"
                color="white"
              />
              <ResultDisplay
                label="Regular hours"
                value={regularHours ?? '—'}
                suffix="hrs"
                decimals={2}
                size="sm"
                color="tertiary"
              />
              <ResultDisplay
                label="Overtime hours"
                value={overtimeHours ?? '—'}
                suffix="hrs"
                decimals={2}
                size="sm"
                color="secondary"
              />
            </div>

            {errors.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-1">
                {errors.map((msg) => (
                  <p key={msg} className="text-xs text-on-surface-variant">
                    {msg}
                  </p>
                ))}
              </div>
            )}
          </div>
        </GlassCard>

        <button
          type="button"
          onClick={resetWeek}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass glass-border text-on-surface font-semibold text-sm hover:bg-white/5 transition-colors press"
        >
          <RotateCcw className="w-4 h-4 shrink-0" />
          <span>Reset week</span>
        </button>
      </div>
    </div>
  );
}
