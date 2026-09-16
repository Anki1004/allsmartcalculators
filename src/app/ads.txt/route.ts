// AdSense ads.txt — derived from NEXT_PUBLIC_ADSENSE_CLIENT (e.g. ca-pub-1234567890123456),
// falling back to the known publisher ID so /ads.txt always verifies even before the env var is set.
// Google requires the publisher ID without the "ca-" prefix in ads.txt.
//
// 2026-09-16: the fallback moved from pub-4038748014813222 to pub-7915789258796102. The owner had
// two AdSense accounts (one per site), which Google's one-account-per-person policy can disable
// together; every site now consolidates on the 7915… account and the old one is being closed.
// The Vercel production env var was switched the same day, so the fallback and the env agree.

const RAW = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-7915789258796102').trim();
const PUBLISHER_ID = RAW.startsWith('ca-') ? RAW.slice(3) : RAW;

export const revalidate = 3600;

export async function GET() {
  const body = `google.com, ${PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
