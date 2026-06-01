// AdSense ads.txt — derived from NEXT_PUBLIC_ADSENSE_CLIENT (e.g. ca-pub-1234567890123456),
// falling back to the known publisher ID so /ads.txt always verifies even before the env var is set.
// Google requires the publisher ID without the "ca-" prefix in ads.txt.

const RAW = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-4038748014813222';
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
