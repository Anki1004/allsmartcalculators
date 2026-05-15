import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CurrencyProvider } from '@/lib/currency-context';
import { ThemeProvider } from '@/lib/theme-context';
import { TOTAL_CALCULATORS } from '@/lib/calculator-registry';

// Lazy-load components that are interactive but not part of the critical
// above-the-fold render path. Saves ~15-20% off the main bundle on mobile,
// which is the biggest contributor to TBT on slow devices.
const SearchModal = dynamic(() => import('@/components/SearchModal'), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/CookieConsent'), { ssr: false });
const ConsentGatedAnalytics = dynamic(() => import('@/components/ConsentGatedAnalytics'), { ssr: false });

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';

// TODO: Replace src/app/opengraph-image.png with a 1200x630 version for proper
// Twitter `summary_large_image` and LinkedIn previews. Current asset is 500x500
// — Next.js auto-detects dimensions from the file, so swapping the PNG fixes
// the og:image:width / og:image:height tags automatically (no code change).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'AllSmartCalculators',
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
  title: `AllSmartCalculators — ${TOTAL_CALCULATORS} Calculators. One Beautiful Place.`,
  description: `Premium calculator hub with ${TOTAL_CALCULATORS} trending calculators for Finance, Health, Math, Crypto, Engineering, Education and more. Beautiful, fast, and free.`,
  authors: [
    {
      name: 'Ankit Gupta',
      url: 'https://www.linkedin.com/in/ankit-gupta-data-analyst',
    },
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `AllSmartCalculators — ${TOTAL_CALCULATORS} Calculators`,
    description: 'Calculate anything. Beautifully.',
    type: 'website',
    url: SITE_URL,
    siteName: 'AllSmartCalculators',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AllSmartCalculators',
    title: `AllSmartCalculators — ${TOTAL_CALCULATORS} Calculators`,
    description: 'Calculate anything. Beautifully.',
  },
};

export const viewport: Viewport = {
  themeColor: '#bd9dff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Google Consent Mode v2 — defaults MUST run before any Google scripts.
            Restores prior choice from localStorage so returning users don't see a denied flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});try{var c=localStorage.getItem('cv-cookie-consent');if(c==='accepted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}})();`,
          }}
        />
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('cv-theme');document.documentElement.classList.remove('dark','light');document.documentElement.classList.add(t||'dark');})()` }} />
        {ADSENSE_CLIENT && (
          <>
            <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
              crossOrigin="anonymous"
            />
          </>
        )}
      </head>
      <body className="bg-surface text-on-surface font-body antialiased min-h-screen overflow-x-hidden">
        <div className="aurora-bg" />
        <div className="cosmic-grain" />
        <ThemeProvider>
          <CurrencyProvider>
            <SearchModal />
            <CookieConsent />
            <div className="relative z-10">
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </div>
          </CurrencyProvider>
        </ThemeProvider>
        <ConsentGatedAnalytics />
        {/* Google Analytics 4 — loaded after window-load to keep it off the
            critical path. Consent Mode v2 defaults already ran in <head>
            (modeled pings when denied, full tracking on accept). */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              id="ga4-loader"
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="ga4-init"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `gtag('js', new Date());gtag('config', '${GA_MEASUREMENT_ID}');`,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
