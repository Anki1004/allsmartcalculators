// AdSense ads.txt — derived from NEXT_PUBLIC_ADSENSE_CLIENT (e.g. ca-pub-1234567890123456).
// Google requires the publisher ID without the "ca-" prefix in ads.txt.

const RAW = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? '';
const PUBLISHER_ID = RAW.startsWith('ca-') ? RAW.slice(3) : RAW;

export const revalidate = 3600;

export async function GET() {
  if (!PUBLISHER_ID) {
    return new Response('# ads.txt not configured: set NEXT_PUBLIC_ADSENSE_CLIENT\n', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  const body = `google.com, ${PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
