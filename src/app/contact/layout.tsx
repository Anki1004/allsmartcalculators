import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';

export const metadata: Metadata = {
  title: 'Contact — AllSmartCalculators',
  description:
    'Report a bug, suggest a calculator, or get in touch with AllSmartCalculators. We read every message.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: 'Contact AllSmartCalculators',
    description:
      'Report a bug, suggest a calculator, or get in touch with AllSmartCalculators.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    siteName: 'AllSmartCalculators',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
