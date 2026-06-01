'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FALLBACK_EXCHANGE_RATES } from './exchange-rates';

export const SUPPORTED_CURRENCIES = [
  { code: 'USD', symbol: '$',   name: 'US Dollar',          flag: '🇺🇸' },
  { code: 'EUR', symbol: '€',   name: 'Euro',               flag: '🇪🇺' },
  { code: 'GBP', symbol: '£',   name: 'British Pound',      flag: '🇬🇧' },
  { code: 'JPY', symbol: '¥',   name: 'Japanese Yen',       flag: '🇯🇵' },
  { code: 'INR', symbol: '₹',   name: 'Indian Rupee',       flag: '🇮🇳' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar',    flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$',  name: 'Australian Dollar',  flag: '🇦🇺' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc',        flag: '🇨🇭' },
  { code: 'CNY', symbol: '¥',   name: 'Chinese Yuan',       flag: '🇨🇳' },
  { code: 'SGD', symbol: 'S$',  name: 'Singapore Dollar',   flag: '🇸🇬' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham',         flag: '🇦🇪' },
  { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal',        flag: '🇸🇦' },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso',       flag: '🇲🇽' },
  { code: 'BRL', symbol: 'R$',  name: 'Brazilian Real',     flag: '🇧🇷' },
  { code: 'KRW', symbol: '₩',   name: 'South Korean Won',   flag: '🇰🇷' },
  { code: 'ZAR', symbol: 'R',   name: 'South African Rand', flag: '🇿🇦' },
  { code: 'TRY', symbol: '₺',   name: 'Turkish Lira',       flag: '🇹🇷' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', flag: '🇳🇿' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar',   flag: '🇭🇰' },
  { code: 'SEK', symbol: 'kr',  name: 'Swedish Krona',      flag: '🇸🇪' },
];

const CACHE_KEY = 'cv-rates-v2';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in ms

function getCachedRates(): Record<string, number> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { rates, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return rates;
  } catch {
    return null;
  }
}

function setCachedRates(rates: Record<string, number>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ rates, ts: Date.now() }));
  } catch {}
}

interface CurrencyContextType {
  currency: string;
  setCurrency: (c: string) => void;
  rate: number;
  symbol: string;
  flag: string;
  rates: Record<string, number>;
  ratesReady: boolean;
}

// India-first audience: ₹ amounts, RBI/CIBIL references in calculator copy.
// Default to INR when the user has no stored preference; localStorage hydration
// below still wins for returning visitors.
const DEFAULT_CURRENCY = 'INR';

const CurrencyContext = createContext<CurrencyContextType>({
  currency: DEFAULT_CURRENCY,
  setCurrency: () => {},
  rate: 1,
  symbol: '₹',
  flag: '🇮🇳',
  rates: FALLBACK_EXCHANGE_RATES,
  ratesReady: false,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState(DEFAULT_CURRENCY);
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_EXCHANGE_RATES);
  const [ratesReady, setRatesReady] = useState(false);

  useEffect(() => {
    // Restore saved currency preference
    const saved = localStorage.getItem('cv-currency');
    if (saved && FALLBACK_EXCHANGE_RATES[saved]) setCurrencyState(saved);

    // Try cache first, then fetch live
    const cached = getCachedRates();
    if (cached) {
      setRates(cached);
      setRatesReady(true);
      return;
    }

    fetch('/api/rates')
      .then((r) => r.json())
      .then(({ rates: live }) => {
        setRates(live);
        setCachedRates(live);
        setRatesReady(true);
      })
      .catch(() => setRatesReady(true)); // use fallback silently
  }, []);

  const setCurrency = (c: string) => {
    setCurrencyState(c);
    localStorage.setItem('cv-currency', c);
  };

  const info = SUPPORTED_CURRENCIES.find((c) => c.code === currency) ?? SUPPORTED_CURRENCIES[0];

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        rate: rates[currency] ?? 1,
        symbol: info.symbol,
        flag: info.flag,
        rates,
        ratesReady,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
