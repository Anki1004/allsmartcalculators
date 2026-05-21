import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, decimals = 2, locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

// Pick a number-formatting locale from the active currency code. INR is the
// only currency where the Indian lakh / crore grouping is meaningful for us;
// everything else uses the en-US 3-digit grouping users expect online.
export function localeForCurrency(currency: string): string {
  return currency === 'INR' ? 'en-IN' : 'en-US';
}
