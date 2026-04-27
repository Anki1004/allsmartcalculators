'use client';

import { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { getCalculatorBySlug } from '@/lib/calculator-registry';
import SliderInput from './SliderInput';
import SelectInput from './SelectInput';
import ResultDisplay from './ResultDisplay';
import GlassCard from './GlassCard';
import { Save, Share2, FileDown, Check, Sparkles } from 'lucide-react';
import { useCurrency } from '@/lib/currency-context';
import CalculatorIcon from './CalculatorIcon';

// Defer recharts (~80KB gz) until the chart actually renders post-interaction.
const DonutChart = dynamic(() => import('./DonutChart'), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[240px]" aria-hidden />,
});

interface CalculatorEngineProps {
  slug: string;
}

export default function CalculatorEngine({ slug }: CalculatorEngineProps) {
  const config = getCalculatorBySlug(slug);
  const { rate, symbol } = useCurrency();

  // Convert USD output value to selected currency
  const cvtVal = (prefix: string | undefined, val: number | string) =>
    prefix === '$' && typeof val === 'number' ? val * rate : val;
  const cvtPfx = (prefix: string | undefined) =>
    prefix === '$' ? symbol : prefix;

  // Initialize state from config defaults (must run before any early return)
  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    if (config) {
      config.inputs.forEach((inp) => (initial[inp.key] = inp.default));
    }
    return initial;
  });
  const [hasInteracted, setHasInteracted] = useState(false);

  // Recompute outputs whenever inputs change
  const results = useMemo(() => {
    if (!config) return {};
    try {
      return config.calculate(values);
    } catch (e) {
      return {};
    }
  }, [values, config]);

  if (!config) {
    return (
      <GlassCard className="p-8 text-center">
        <p className="text-on-surface-variant">Calculator not found.</p>
      </GlassCard>
    );
  }

  const updateValue = (key: string, v: number) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (!hasInteracted) setHasInteracted(true);
  };

  const [toast, setToast] = useState('');

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }, []);

  const handleSave = useCallback(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cv-saved') ?? '[]');
      saved.unshift({
        id: Date.now(),
        calculator: config.name,
        slug,
        inputs: values,
        results,
        savedAt: new Date().toISOString(),
      });
      localStorage.setItem('cv-saved', JSON.stringify(saved.slice(0, 50)));
      showToast('Saved!');
    } catch {
      showToast('Could not save.');
    }
  }, [config.name, slug, values, results, showToast]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const title = `${config.name} — AllSmartCalculator`;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        showToast('Link copied!');
      }
    } catch {
      showToast('Could not share.');
    }
  }, [config.name, showToast]);

  const handleExport = useCallback(() => {
    const lines: string[] = [
      `AllSmartCalculator — ${config.name}`,
      `Exported: ${new Date().toLocaleString()}`,
      '',
      '── INPUTS ──',
      ...config.inputs.map((inp) => {
        const val = values[inp.key];
        const prefix = inp.prefix ?? '';
        const suffix = inp.suffix ?? '';
        return `${inp.label}: ${prefix}${val}${suffix}`;
      }),
      '',
      '── RESULTS ──',
      ...config.outputs.map((out) => {
        const raw = results[out.key] ?? 0;
        const val = cvtVal(out.prefix, raw);
        const prefix = cvtPfx(out.prefix) ?? '';
        const suffix = out.suffix ?? '';
        return `${out.label}: ${prefix}${typeof val === 'number' ? val.toLocaleString() : val}${suffix}`;
      }),
      '',
      'allsmartcalculator.com',
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${slug}-results.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast('Exported!');
  }, [config, slug, values, results, cvtVal, cvtPfx, showToast]);

  const primaryOutput = config.outputs.find((o) => o.primary) ?? config.outputs[0];
  const secondaryOutputs = config.outputs.filter((o) => o !== primaryOutput);

  // Donut chart data if applicable
  const donutData =
    config.chartType === 'donut' && results
      ? config.outputs
          .filter((o) => typeof results[o.key] === 'number' && (results[o.key] as number) > 0)
          .slice(0, 3)
          .map((o, idx) => ({
            name: o.label,
            value: Number(results[o.key]) || 0,
            color: (['primary', 'secondary', 'tertiary'] as const)[idx] ?? 'primary',
          }))
      : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-8">
      {/* INPUT PANEL */}
      <GlassCard className="lg:col-span-3 p-4 sm:p-6 md:p-8">
        {/* Icon header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-white/[0.06]">
          <CalculatorIcon icon={config.icon} category={config.category} size="lg" idle />
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant/60 mb-0.5 truncate">
              {config.category}
            </p>
            <p className="text-xs sm:text-sm font-semibold text-on-surface-variant">
              Adjust the inputs below
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 sm:gap-8">
          {config.inputs.map((input) => {
            if (input.type === 'select') {
              return (
                <SelectInput
                  key={input.key}
                  label={input.label}
                  value={values[input.key]}
                  onChange={(v) => {
                    setValues((prev) => ({ ...prev, [input.key]: v }));
                    if (!hasInteracted) setHasInteracted(true);
                  }}
                  options={input.options ?? []}
                  color={input.color ?? 'primary'}
                />
              );
            }
            return (
              <SliderInput
                key={input.key}
                label={input.label}
                value={Number(values[input.key]) || 0}
                onChange={(v) => updateValue(input.key, v)}
                min={input.min ?? 0}
                max={input.max ?? 100}
                step={input.step ?? 1}
                prefix={input.prefix}
                suffix={input.suffix}
                color={input.color ?? 'primary'}
                formatValue={input.formatValue}
              />
            );
          })}
        </div>
      </GlassCard>

      {/* RESULTS PANEL */}
      <div className="lg:col-span-2 flex flex-col gap-5 sm:gap-6">
        {/* Primary result hero */}
        <GlassCard className="p-5 sm:p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            {hasInteracted ? (
              <>
                <div className="text-center py-2 sm:py-4 overflow-hidden">
                  <ResultDisplay
                    label={primaryOutput.label}
                    value={cvtVal(primaryOutput.prefix, results[primaryOutput.key] ?? 0)}
                    prefix={cvtPfx(primaryOutput.prefix)}
                    suffix={primaryOutput.suffix}
                    decimals={primaryOutput.decimals ?? 2}
                    size="xl"
                    color="white"
                  />
                </div>

                {/* Secondary results */}
                {secondaryOutputs.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/5">
                    {secondaryOutputs.slice(0, 4).map((out) => (
                      <ResultDisplay
                        key={out.key}
                        label={out.label}
                        value={cvtVal(out.prefix, results[out.key] ?? 0)}
                        prefix={cvtPfx(out.prefix)}
                        suffix={out.suffix}
                        decimals={out.decimals ?? 2}
                        size="sm"
                        color={out.color ?? 'white'}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10 sm:py-12 md:py-16 flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <p className="font-headline font-bold text-base sm:text-lg text-on-surface mb-1">
                    Ready when you are
                  </p>
                  <p className="text-xs sm:text-sm text-on-surface-variant max-w-xs mx-auto leading-relaxed px-2">
                    Adjust the {config.inputs.length === 1 ? 'input' : 'inputs'} on the left to see your {primaryOutput.label.toLowerCase()}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Chart */}
        {hasInteracted && config.chartType === 'donut' && donutData.length > 0 && (
          <GlassCard className="p-4 sm:p-6 aspect-square max-h-[260px] sm:max-h-[280px]">
            <DonutChart data={donutData} />
          </GlassCard>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          {toast && (
            <div className="flex items-center justify-center gap-2 text-xs text-tertiary font-semibold animate-fade-up">
              <Check className="w-3.5 h-3.5" />
              {toast}
            </div>
          )}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <button
              onClick={handleSave}
              disabled={!hasInteracted}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-3 rounded-xl bg-gradient-to-br from-primary-dim to-primary text-white font-semibold text-xs sm:text-sm shadow-glow-primary press hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <Save className="w-4 h-4 shrink-0" />
              <span>Save</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-3 rounded-xl glass glass-border text-on-surface font-semibold text-xs sm:text-sm hover:bg-white/5 transition-colors press"
            >
              <Share2 className="w-4 h-4 shrink-0" />
              <span>Share</span>
            </button>
            <button
              onClick={handleExport}
              disabled={!hasInteracted}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-3 rounded-xl glass glass-border text-on-surface font-semibold text-xs sm:text-sm hover:bg-white/5 transition-colors press disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FileDown className="w-4 h-4 shrink-0" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
