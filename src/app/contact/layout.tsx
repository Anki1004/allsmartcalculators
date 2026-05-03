import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';

export const metadata: Metadata = {
  title: 'Contact — AllSmartCalculators',
  description:
    'Contact AllSmartCalculators — report a bug, suggest a new calculator, share feedback, or partner with us. We read every message and reply fast.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: 'Contact AllSmartCalculators',
    description:
      'Report a bug, suggest a new calculator, or share feedback — we read every message.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    siteName: 'AllSmartCalculators',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
