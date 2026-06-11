'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Delete } from 'lucide-react';
import GlassCard from '../GlassCard';
import ResultDisplay from '../ResultDisplay';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────────────────────────────────────
 * Expression evaluator — hand-rolled lexer + recursive-descent parser.
 * No eval(), no new Function(). Supports + − × ÷ ^ (right-assoc), parens,
 * unary minus, sin/cos/tan/asin/acos/atan/log/ln/√, postfix ! % x²,
 * constants π and e, DEG/RAD trig modes.
 * ──────────────────────────────────────────────────────────────────────────── */

class CalcError extends Error {}

type Tok =
  | { t: 'num'; v: number }
  | { t: 'op'; v: string } // + - * / ^ ( ) ! % ²
  | { t: 'func'; v: string } // sin cos tan asin acos atan log ln sqrt
  | { t: 'const'; v: 'pi' | 'e' };

const FUNC_NAMES = new Set([
  'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', 'sqrt',
]);

// number: 12 / 12. / .5 / 1.5e+30 (exponent form appears via memory recall)
const NUM_RE = /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/;

function lex(src: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (ch === ' ') {
      i++;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      const m = NUM_RE.exec(src.slice(i));
      if (!m) throw new CalcError('Error');
      const v = Number(m[0]);
      if (Number.isNaN(v)) throw new CalcError('Error');
      toks.push({ t: 'num', v });
      i += m[0].length;
      continue;
    }
    if (/[a-zA-Z]/.test(ch)) {
      const m = /^[a-zA-Z]+/.exec(src.slice(i));
      const word = (m ? m[0] : '').toLowerCase();
      if (FUNC_NAMES.has(word)) toks.push({ t: 'func', v: word });
      else if (word === 'pi') toks.push({ t: 'const', v: 'pi' });
      else if (word === 'e') toks.push({ t: 'const', v: 'e' });
      else throw new CalcError('Error');
      i += word.length;
      continue;
    }
    switch (ch) {
      case 'π':
        toks.push({ t: 'const', v: 'pi' });
        break;
      case '√':
        toks.push({ t: 'func', v: 'sqrt' });
        break;
      case '×':
        toks.push({ t: 'op', v: '*' });
        break;
      case '÷':
        toks.push({ t: 'op', v: '/' });
        break;
      case '−':
      case '-':
        toks.push({ t: 'op', v: '-' });
        break;
      case '²':
        toks.push({ t: 'op', v: '²' });
        break;
      case '+':
      case '*':
      case '/':
      case '^':
      case '(':
      case ')':
      case '!':
      case '%':
        toks.push({ t: 'op', v: ch });
        break;
      default:
        throw new CalcError('Error');
    }
    i++;
  }
  return toks;
}

function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0 || n > 170) {
    throw new CalcError('n! needs an integer 0–170');
  }
  let r = 1;
  for (let k = 2; k <= n; k++) r *= k;
  return r;
}

function applyFunc(name: string, x: number, deg: boolean): number {
  const toRad = (v: number) => (deg ? (v * Math.PI) / 180 : v);
  const fromRad = (v: number) => (deg ? (v * 180) / Math.PI : v);
  let r: number;
  switch (name) {
    case 'sin':
      r = Math.sin(toRad(x));
      break;
    case 'cos':
      r = Math.cos(toRad(x));
      break;
    case 'tan':
      r = Math.tan(toRad(x));
      // tan blows up near odd multiples of 90° — treat as undefined
      if (Math.abs(r) > 1e15) throw new CalcError('tan is undefined here');
      break;
    case 'asin':
    case 'acos':
      if (x < -1 || x > 1) throw new CalcError('Needs a value from −1 to 1');
      r = fromRad(name === 'asin' ? Math.asin(x) : Math.acos(x));
      break;
    case 'atan':
      r = fromRad(Math.atan(x));
      break;
    case 'log':
      if (x <= 0) throw new CalcError('log needs a positive number');
      r = Math.log10(x);
      break;
    case 'ln':
      if (x <= 0) throw new CalcError('ln needs a positive number');
      r = Math.log(x);
      break;
    case 'sqrt':
      if (x < 0) throw new CalcError('√ of a negative number');
      r = Math.sqrt(x);
      break;
    default:
      throw new CalcError('Error');
  }
  // Snap float dust like sin(180°) = 1.2e-16 to a clean zero.
  if (Math.abs(r) < 1e-12) r = 0;
  if (!Number.isFinite(r)) throw new CalcError('Error');
  return r;
}

/**
 * Grammar (recursive descent):
 *   Expr    := Term  (('+' | '-') Term)*
 *   Term    := Unary (('*' | '/') Unary)*
 *   Unary   := ('-' | '+') Unary | Power
 *   Power   := Postfix ('^' Unary)?            — right-associative
 *   Postfix := Primary ('!' | '%' | '²')*
 *   Primary := number | π | e | func '(' Expr ')' | '(' Expr ')'
 * Closing parens may be omitted at the very end (auto-close while typing).
 */
function evaluate(src: string, deg: boolean): number {
  const toks = lex(src);
  if (toks.length === 0) throw new CalcError('Error');
  let pos = 0;

  const peekOp = (...ops: string[]): string | null => {
    const t = toks[pos];
    return t && t.t === 'op' && ops.indexOf(t.v) !== -1 ? t.v : null;
  };

  function expr(): number {
    let v = term();
    let op = peekOp('+', '-');
    while (op) {
      pos++;
      const r = term();
      v = op === '+' ? v + r : v - r;
      op = peekOp('+', '-');
    }
    return v;
  }

  function term(): number {
    let v = unary();
    let op = peekOp('*', '/');
    while (op) {
      pos++;
      const r = unary();
      if (op === '*') v *= r;
      else {
        if (r === 0) throw new CalcError('Cannot divide by zero');
        v /= r;
      }
      op = peekOp('*', '/');
    }
    return v;
  }

  function unary(): number {
    if (peekOp('-')) {
      pos++;
      return -unary();
    }
    if (peekOp('+')) {
      pos++;
      return unary();
    }
    return power();
  }

  function power(): number {
    const base = postfix();
    if (peekOp('^')) {
      pos++;
      const exponent = unary();
      return Math.pow(base, exponent);
    }
    return base;
  }

  function postfix(): number {
    let v = primary();
    for (;;) {
      if (peekOp('!')) {
        pos++;
        v = factorial(v);
      } else if (peekOp('%')) {
        pos++;
        v = v / 100;
      } else if (peekOp('²')) {
        pos++;
        v = v * v;
      } else break;
    }
    return v;
  }

  function closeParen(): void {
    if (peekOp(')')) {
      pos++;
      return;
    }
    if (pos >= toks.length) return; // auto-close at end of input
    throw new CalcError('Error');
  }

  function primary(): number {
    const t = toks[pos];
    if (!t) throw new CalcError('Incomplete expression');
    if (t.t === 'num') {
      pos++;
      return t.v;
    }
    if (t.t === 'const') {
      pos++;
      return t.v === 'pi' ? Math.PI : Math.E;
    }
    if (t.t === 'func') {
      pos++;
      if (!peekOp('(')) throw new CalcError('Error');
      pos++;
      const arg = expr();
      closeParen();
      return applyFunc(t.v, arg, deg);
    }
    if (t.t === 'op' && t.v === '(') {
      pos++;
      const v = expr();
      closeParen();
      return v;
    }
    throw new CalcError('Error');
  }

  const result = expr();
  if (pos !== toks.length) throw new CalcError('Error');
  if (!Number.isFinite(result)) throw new CalcError('Error');
  return result;
}

/* ── formatting helpers ──────────────────────────────────────────────────── */

function formatDisplay(v: number): string {
  if (!Number.isFinite(v)) return 'Error';
  const a = Math.abs(v);
  if (a !== 0 && (a >= 1e15 || a < 1e-9)) {
    return v.toExponential(9).replace(/\.?0+e/, 'e');
  }
  const cleaned = parseFloat(v.toPrecision(13));
  return cleaned.toLocaleString('en-US', { maximumFractionDigits: 10 });
}

/** Tokens the lexer can re-read, e.g. for "ANS + …" continuation and MR. */
function numberToTokens(v: number): string[] {
  const abs = String(Math.abs(parseFloat(v.toPrecision(15))));
  return v < 0 ? ['−', abs] : [abs];
}

const NUM_TOK = /^(?:[0-9.]+(?:[eE][+-]?\d+)?)$/;
const isNumTok = (t: string) => NUM_TOK.test(t);
const isOpTok = (t: string) =>
  t === '+' || t === '−' || t === '×' || t === '÷' || t === '^';
const isFuncTok = (t: string) => t.length > 1 && t.charAt(t.length - 1) === '(';

/* ── keypad button ───────────────────────────────────────────────────────── */

type KeyVariant = 'digit' | 'op' | 'fn' | 'mem' | 'danger' | 'equals' | 'toggle';

const KEY_VARIANTS: Record<KeyVariant, string> = {
  digit: 'bg-white/5 hover:bg-white/10 text-on-surface text-lg',
  op: 'bg-white/5 hover:bg-white/10 text-secondary text-xl',
  fn: 'bg-white/[0.03] hover:bg-white/[0.08] text-on-surface-variant text-sm',
  mem: 'bg-white/[0.03] hover:bg-white/[0.08] text-on-surface-variant text-xs tracking-wider',
  danger: 'bg-white/[0.03] hover:bg-white/[0.08] text-error text-sm',
  equals:
    'bg-gradient-to-br from-primary-dim to-primary text-white text-xl shadow-glow-primary hover:opacity-90',
  toggle: 'bg-white/[0.03] hover:bg-white/[0.08] text-tertiary text-xs tracking-wider',
};

interface KeyProps {
  label: React.ReactNode;
  onPress: () => void;
  variant?: KeyVariant;
  ariaLabel?: string;
  className?: string;
  dimmed?: boolean;
}

function Key({ label, onPress, variant = 'fn', ariaLabel, className, dimmed }: KeyProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      aria-label={ariaLabel}
      className={cn(
        'h-12 sm:h-14 rounded-xl flex items-center justify-center font-mono font-semibold select-none press transition-colors border border-white/[0.06]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        KEY_VARIANTS[variant],
        dimmed && 'opacity-40',
        className
      )}
    >
      {label}
    </button>
  );
}

/* ── component ───────────────────────────────────────────────────────────── */

type FinalResult =
  | { ok: true; value: number }
  | { ok: false; message: string };

interface CalcState {
  tokens: string[];
  final: FinalResult | null;
  justEvaluated: boolean;
}

export default function ScientificCalculator() {
  const [state, setState] = useState<CalcState>({
    tokens: [],
    final: null,
    justEvaluated: false,
  });
  const [degMode, setDegMode] = useState(true); // true = DEG, false = RAD
  const [memory, setMemory] = useState<number | null>(null);
  const exprRef = useRef<HTMLDivElement>(null);

  // Live preview — evaluates silently as you type; errors stay quiet until '='.
  const preview = useMemo(() => {
    if (state.justEvaluated || state.tokens.length === 0) return null;
    try {
      return evaluate(state.tokens.join(''), degMode);
    } catch {
      return null;
    }
  }, [state, degMode]);

  // Keep the expression scrolled to its end as it grows.
  useEffect(() => {
    const el = exprRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [state.tokens]);

  /* ── key press handlers ── */

  // digits, '.', constants, functions, '(' — these start a NEW expression after '='
  const pressFresh = (tok: string) => {
    setState((s) =>
      s.justEvaluated
        ? { tokens: [tok], final: null, justEvaluated: false }
        : { ...s, tokens: [...s.tokens, tok], final: null }
    );
  };

  // ')' and postfix ! % ² — these CONTINUE from the last result after '='
  const pressContinuing = (tok: string) => {
    setState((s) => {
      if (s.justEvaluated && s.final && s.final.ok) {
        return {
          tokens: [...numberToTokens(s.final.value), tok],
          final: null,
          justEvaluated: false,
        };
      }
      return {
        tokens: [...s.tokens, tok],
        final: null,
        justEvaluated: false,
      };
    });
  };

  const pressOp = (op: string) => {
    setState((s) => {
      if (s.justEvaluated && s.final && s.final.ok) {
        return {
          tokens: [...numberToTokens(s.final.value), op],
          final: null,
          justEvaluated: false,
        };
      }
      const tk = [...s.tokens];
      const last = tk.length > 0 ? tk[tk.length - 1] : null;
      if (last === null || last === '(' || isFuncTok(last)) {
        // only a unary minus makes sense at the start of a (sub)expression
        if (op === '−') tk.push('−');
        return { tokens: tk, final: null, justEvaluated: false };
      }
      // A minus right after ×, ÷, or ^ is a unary sign on the next operand
      // (e.g. 2×−3 = −6), not a replacement of the trailing operator.
      if (op === '−' && (last === '×' || last === '÷' || last === '^')) {
        tk.push('−');
        return { tokens: tk, final: null, justEvaluated: false };
      }
      if (isOpTok(last)) tk[tk.length - 1] = op; // replace a trailing operator
      else tk.push(op);
      return { tokens: tk, final: null, justEvaluated: false };
    });
  };

  const pressPlusMinus = () => {
    setState((s) => {
      if (s.justEvaluated && s.final && s.final.ok) {
        return {
          tokens: numberToTokens(-s.final.value),
          final: null,
          justEvaluated: false,
        };
      }
      const tk = [...s.tokens];
      // locate the trailing number run (digits / '.' / a constant)
      let start = tk.length;
      const last = tk.length > 0 ? tk[tk.length - 1] : null;
      if (last === 'π' || last === 'e') {
        start = tk.length - 1;
      } else {
        while (start > 0 && isNumTok(tk[start - 1])) start--;
      }
      const unaryBefore = (idx: number): boolean => {
        if (idx <= 0) return false;
        if (tk[idx - 1] !== '−') return false;
        if (idx - 1 === 0) return true;
        const prev = tk[idx - 2];
        return prev === '(' || isOpTok(prev) || isFuncTok(prev);
      };
      if (start === tk.length) {
        // no trailing number — toggle a pending unary minus where one is legal
        if (last === '−' && unaryBefore(tk.length)) tk.pop();
        else if (last === null || last === '(' || isOpTok(last) || isFuncTok(last)) {
          tk.push('−');
        }
        // after ')', '!', '%', '²' there is nothing simple to negate — ignore
        return { tokens: tk, final: null, justEvaluated: false };
      }
      if (unaryBefore(start)) tk.splice(start - 1, 1);
      else tk.splice(start, 0, '−');
      return { tokens: tk, final: null, justEvaluated: false };
    });
  };

  const pressEquals = () => {
    setState((s) => {
      if (s.tokens.length === 0) return s;
      try {
        const v = evaluate(s.tokens.join(''), degMode);
        return { ...s, final: { ok: true, value: v }, justEvaluated: true };
      } catch (err) {
        const message =
          err instanceof CalcError && err.message ? err.message : 'Error';
        return { ...s, final: { ok: false, message }, justEvaluated: true };
      }
    });
  };

  const pressBackspace = () => {
    setState((s) => ({
      tokens: s.tokens.slice(0, -1),
      final: null,
      justEvaluated: false,
    }));
  };

  const pressClear = () => {
    setState({ tokens: [], final: null, justEvaluated: false });
  };

  /* ── memory ── */

  const currentValue: number | null =
    state.final && state.final.ok ? state.final.value : preview;

  const memoryAdd = (sign: 1 | -1) => {
    if (currentValue === null) return;
    setMemory((m) => (m ?? 0) + sign * currentValue);
  };

  const memoryRecall = () => {
    if (memory === null) return;
    const toks = numberToTokens(memory);
    setState((s) => {
      if (s.justEvaluated) {
        return { tokens: toks, final: null, justEvaluated: false };
      }
      // replace a trailing number entry instead of gluing digits together
      const tk = [...s.tokens];
      while (tk.length > 0 && isNumTok(tk[tk.length - 1])) tk.pop();
      return { tokens: [...tk, ...toks], final: null, justEvaluated: false };
    });
  };

  /* ── keyboard support ── */

  const keyHandlerRef = useRef<(e: KeyboardEvent) => void>();
  // Keep a "latest handler" ref so the single window listener never goes stale.
  useEffect(() => {
    keyHandlerRef.current = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        if (target.isContentEditable) return;
      }
      const k = e.key;
      let handled = true;
      if (k >= '0' && k <= '9') pressFresh(k);
      else if (k === '.') pressFresh('.');
      else if (k === '+') pressOp('+');
      else if (k === '-') pressOp('−');
      else if (k === '*') pressOp('×');
      else if (k === '/') pressOp('÷');
      else if (k === '^') pressOp('^');
      else if (k === '(') pressFresh('(');
      else if (k === ')') pressContinuing(')');
      else if (k === '%') pressContinuing('%');
      else if (k === '!') pressContinuing('!');
      else if (k === 'Enter' || k === '=') pressEquals();
      else if (k === 'Backspace') pressBackspace();
      else if (k === 'Escape') pressClear();
      else handled = false;
      if (handled) e.preventDefault();
    };
  });

  useEffect(() => {
    const fn = (e: KeyboardEvent) => keyHandlerRef.current?.(e);
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  /* ── render ── */

  const expressionText = state.tokens.join('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-8">
      {/* DISPLAY PANEL — first in DOM so it sits on top on mobile */}
      <GlassCard
        className="lg:col-span-2 lg:order-2 p-5 sm:p-6 md:p-8 relative"
        role="region"
        aria-label="Calculator display"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col gap-4 sm:gap-5">
          {/* status badges */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-tertiary px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              {degMode ? 'DEG' : 'RAD'}
            </span>
            {memory !== null && (
              <span
                className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary px-2.5 py-1 rounded-full bg-white/5 border border-white/10 truncate max-w-[60%]"
                title={`Memory: ${formatDisplay(memory)}`}
              >
                M {formatDisplay(memory)}
              </span>
            )}
          </div>

          {/* expression */}
          <div
            ref={exprRef}
            className="font-mono text-base sm:text-lg text-on-surface-variant text-right whitespace-nowrap overflow-x-auto min-h-[1.75rem] pb-1"
            aria-label="Current expression"
          >
            {expressionText || <span className="opacity-40">0</span>}
          </div>

          {/* result line */}
          <div className="border-t border-white/5 pt-4 sm:pt-5" aria-live="polite">
            {state.final && !state.final.ok ? (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant">
                  Result
                </span>
                <p className="font-mono font-bold tracking-tight text-2xl sm:text-3xl text-error break-words">
                  {state.final.message}
                </p>
              </div>
            ) : state.final && state.final.ok ? (
              <ResultDisplay
                label="Result"
                value={formatDisplay(state.final.value)}
                size="lg"
                color="primary"
                animate={false}
              />
            ) : preview !== null ? (
              <ResultDisplay
                label="Preview"
                value={formatDisplay(preview)}
                size="lg"
                color="white"
                animate={false}
              />
            ) : (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-on-surface-variant">
                  Result
                </span>
                <p className="font-mono font-bold tracking-tight text-2xl sm:text-3xl text-on-surface-variant/30">
                  —
                </p>
              </div>
            )}
          </div>

          <p className="hidden lg:block text-[11px] leading-relaxed text-on-surface-variant/60">
            Tip: your keyboard works too — digits, + − * / ^ ( ) % !, Enter for
            =, Backspace, Esc to clear.
          </p>
        </div>
      </GlassCard>

      {/* KEYPAD PANEL */}
      <GlassCard
        className="lg:col-span-3 lg:order-1 p-3 sm:p-5 md:p-6"
        role="region"
        aria-label="Calculator keypad"
      >
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5">
          {/* memory row */}
          <Key label="MC" variant="mem" onPress={() => setMemory(null)} dimmed={memory === null} ariaLabel="Memory clear" />
          <Key label="MR" variant="mem" onPress={memoryRecall} dimmed={memory === null} ariaLabel="Memory recall" />
          <Key label="M+" variant="mem" onPress={() => memoryAdd(1)} dimmed={currentValue === null} ariaLabel="Memory add" />
          <Key label="M−" variant="mem" onPress={() => memoryAdd(-1)} dimmed={currentValue === null} ariaLabel="Memory subtract" />

          {/* clear / edit row (5 keys, nested grid) */}
          <div className="col-span-4 grid grid-cols-5 gap-1.5 sm:gap-2.5">
            <Key label="C" variant="danger" onPress={pressClear} ariaLabel="Clear all" />
            <Key
              label={<Delete className="w-4 h-4" />}
              variant="fn"
              onPress={pressBackspace}
              ariaLabel="Backspace"
            />
            <Key label="(" variant="fn" onPress={() => pressFresh('(')} ariaLabel="Open parenthesis" />
            <Key label=")" variant="fn" onPress={() => pressContinuing(')')} ariaLabel="Close parenthesis" />
            <Key label="%" variant="fn" onPress={() => pressContinuing('%')} ariaLabel="Percent" />
          </div>

          {/* function rows */}
          <Key label="sin" variant="fn" onPress={() => pressFresh('sin(')} />
          <Key label="cos" variant="fn" onPress={() => pressFresh('cos(')} />
          <Key label="tan" variant="fn" onPress={() => pressFresh('tan(')} />
          <Key
            label={degMode ? 'DEG' : 'RAD'}
            variant="toggle"
            onPress={() => setDegMode((d) => !d)}
            ariaLabel={`Angle unit: ${degMode ? 'degrees' : 'radians'}. Press to switch.`}
          />

          <Key label="asin" variant="fn" onPress={() => pressFresh('asin(')} />
          <Key label="acos" variant="fn" onPress={() => pressFresh('acos(')} />
          <Key label="atan" variant="fn" onPress={() => pressFresh('atan(')} />
          <Key label="xʸ" variant="fn" onPress={() => pressOp('^')} ariaLabel="Power" />

          <Key label="log" variant="fn" onPress={() => pressFresh('log(')} />
          <Key label="ln" variant="fn" onPress={() => pressFresh('ln(')} />
          <Key label="√" variant="fn" onPress={() => pressFresh('√(')} ariaLabel="Square root" />
          <Key label="x²" variant="fn" onPress={() => pressContinuing('²')} ariaLabel="Square" />

          <Key label="n!" variant="fn" onPress={() => pressContinuing('!')} ariaLabel="Factorial" />
          <Key label="π" variant="fn" onPress={() => pressFresh('π')} ariaLabel="Pi" />
          <Key label="e" variant="fn" onPress={() => pressFresh('e')} ariaLabel="Euler's number" />
          <Key label="±" variant="fn" onPress={pressPlusMinus} ariaLabel="Toggle sign" />

          {/* digit rows */}
          <Key label="7" variant="digit" onPress={() => pressFresh('7')} />
          <Key label="8" variant="digit" onPress={() => pressFresh('8')} />
          <Key label="9" variant="digit" onPress={() => pressFresh('9')} />
          <Key label="÷" variant="op" onPress={() => pressOp('÷')} ariaLabel="Divide" />

          <Key label="4" variant="digit" onPress={() => pressFresh('4')} />
          <Key label="5" variant="digit" onPress={() => pressFresh('5')} />
          <Key label="6" variant="digit" onPress={() => pressFresh('6')} />
          <Key label="×" variant="op" onPress={() => pressOp('×')} ariaLabel="Multiply" />

          <Key label="1" variant="digit" onPress={() => pressFresh('1')} />
          <Key label="2" variant="digit" onPress={() => pressFresh('2')} />
          <Key label="3" variant="digit" onPress={() => pressFresh('3')} />
          <Key label="−" variant="op" onPress={() => pressOp('−')} ariaLabel="Subtract" />

          <Key label="0" variant="digit" onPress={() => pressFresh('0')} />
          <Key label="." variant="digit" onPress={() => pressFresh('.')} ariaLabel="Decimal point" />
          <Key label="=" variant="equals" onPress={pressEquals} ariaLabel="Equals" />
          <Key label="+" variant="op" onPress={() => pressOp('+')} ariaLabel="Add" />
        </div>
      </GlassCard>
    </div>
  );
}
