'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cv-cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cv-cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cv-cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-surface-container border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-2xl backdrop-blur-xl">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-on-surface-variant leading-relaxed">
            We use cookies for analytics and to show relevant ads via Google AdSense. See our{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{' '}
            for details.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors rounded-xl hover:bg-white/5"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-sm font-semibold rounded-xl bg-gradient-to-br from-primary-dim to-primary text-white shadow-glow-primary press"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
