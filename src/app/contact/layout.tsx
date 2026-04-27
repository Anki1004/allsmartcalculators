import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.com';

export const metadata: Metadata = {
  title: 'Contact — AllSmartCalculator',
  description:
    'Report a bug, suggest a calculator, or get in touch with AllSmartCalculator. We read every message.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: 'Contact AllSmartCalculator',
    description:
      'Report a bug, suggest a calculator, or get in touch with AllSmartCalculator.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    siteName: 'AllSmartCalculator',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
