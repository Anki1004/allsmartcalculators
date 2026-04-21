import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CurrencyProvider } from '@/lib/currency-context';
import { ThemeProvider } from '@/lib/theme-context';
import SearchModal from '@/components/SearchModal';
import CookieConsent from '@/components/CookieConsent';

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

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: 'CalcVerse — 100+ Calculators. One Beautiful Place.',
  description:
    'Premium calculator hub with 100+ trending calculators for Finance, Health, Math, Crypto, Engineering, Education and more. Beautiful, fast, and free.',
  keywords: [
    'calculator',
    'EMI calculator',
    'SIP calculator',
    'BMI calculator',
    'crypto calculator',
    'financial calculator',
    'math calculator',
  ],
  openGraph: {
    title: 'CalcVerse — 100+ Calculators',
    description: 'Calculate anything. Beautifully.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('cv-theme');document.documentElement.classList.remove('dark','light');document.documentElement.classList.add(t||'dark');})()` }} />
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
      </body>
    </html>
  );
}
