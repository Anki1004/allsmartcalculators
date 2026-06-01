// USD-based fallback rates from open.er-api.com, last checked 2026-05-31 UTC.
// The live /api/rates endpoint refreshes hourly; these are only used offline.
export const FALLBACK_RATES_UPDATED_AT = 'Sun, 31 May 2026 00:02:31 +0000';

export const FALLBACK_EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.857782,
  GBP: 0.743623,
  JPY: 159.246559,
  INR: 95.204347,
  CAD: 1.379086,
  AUD: 1.393744,
  CHF: 0.781936,
  CNY: 6.786741,
  SGD: 1.276736,
  HKD: 7.836224,
  NZD: 1.67339,
  SEK: 9.247172,
  NOK: 9.249652,
  DKK: 6.401034,
  MXN: 17.347676,
  BRL: 5.046576,
  ZAR: 16.222649,
  AED: 3.6725,
  SAR: 3.75,
  KRW: 1506.777943,
  THB: 32.51664,
  MYR: 3.965403,
  IDR: 17861.042497,
  PHP: 61.578873,
  PKR: 278.69369,
  BDT: 122.732549,
  NGN: 1371.872879,
  EGP: 52.220184,
  TRY: 45.887003,
};

export const SUPPORTED_EXCHANGE_RATE_CODES = Object.keys(FALLBACK_EXCHANGE_RATES);
