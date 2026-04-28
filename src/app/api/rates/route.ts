import { NextResponse } from 'next/server';

// Revalidate cached response every hour server-side
export const revalidate = 3600;

const SUPPORTED = [
  'USD','EUR','GBP','JPY','INR','CAD','AUD','CHF',
  'CNY','SGD','AED','SAR','MXN','BRL','KRW','ZAR',
  'TRY','NZD','HKD','SEK',
];

// Fallback rates (USD base) used if the external API is down
const FALLBACK_UPDATED_AT = '2025-04-01T00:00:00.000Z';

const FALLBACK: Record<string, number> = {
  USD: 1, EUR: 0.921, GBP: 0.780, JPY: 153.8, INR: 84.47, CAD: 1.383,
  AUD: 1.582, CHF: 0.888, CNY: 7.291, SGD: 1.330, AED: 3.672, SAR: 3.751,
  MXN: 20.18, BRL: 5.75, KRW: 1363, ZAR: 18.47, TRY: 38.05, NZD: 1.728,
  HKD: 7.780, SEK: 10.36,
};

export async function GET() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`API responded ${res.status}`);

    const data = await res.json();

    if (data.result !== 'success') throw new Error('API returned error result');

    const rates: Record<string, number> = {};
    for (const code of SUPPORTED) {
      rates[code] = data.rates[code] ?? FALLBACK[code];
    }

    return NextResponse.json({
      rates,
      updatedAt: data.time_last_update_utc ?? new Date().toUTCString(),
      source: 'live',
    });
  } catch (err) {
    console.warn('[rates] falling back to hardcoded rates:', err);
    return NextResponse.json({
      rates: FALLBACK,
      updatedAt: FALLBACK_UPDATED_AT,
      source: 'fallback',
    });
  }
}
