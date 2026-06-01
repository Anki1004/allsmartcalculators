import { NextResponse } from 'next/server';
import {
  FALLBACK_EXCHANGE_RATES,
  FALLBACK_RATES_UPDATED_AT,
  SUPPORTED_EXCHANGE_RATE_CODES,
} from '@/lib/exchange-rates';

// Revalidate cached response every hour server-side
export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`API responded ${res.status}`);

    const data = await res.json();

    if (data.result !== 'success') throw new Error('API returned error result');

    const rates: Record<string, number> = {};
    for (const code of SUPPORTED_EXCHANGE_RATE_CODES) {
      rates[code] = data.rates[code] ?? FALLBACK_EXCHANGE_RATES[code];
    }

    return NextResponse.json({
      rates,
      updatedAt: data.time_last_update_utc ?? new Date().toUTCString(),
      source: 'live',
    });
  } catch (err) {
    console.warn('[rates] falling back to hardcoded rates:', err);
    return NextResponse.json({
      rates: FALLBACK_EXCHANGE_RATES,
      updatedAt: FALLBACK_RATES_UPDATED_AT,
      source: 'fallback',
    });
  }
}
