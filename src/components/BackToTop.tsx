'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { CONSENT_EVENT, readConsent } from '@/lib/consent';

const SHOW_AFTER_PX = 600;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Push the button up while the cookie banner is open so they don't overlap
    // on phones / tablets. Once the user accepts or declines, drop back down.
    setBannerOpen(readConsent() === null);
    const onConsentChange = () => setBannerOpen(false);
    window.addEventListener(CONSENT_EVENT, onConsentChange);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener(CONSENT_EVENT, onConsentChange);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed right-5 sm:right-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-primary-dim to-primary text-white shadow-glow-primary flex items-center justify-center hover:scale-110 transition-all ${
        bannerOpen ? 'bottom-32 sm:bottom-28' : 'bottom-5 sm:bottom-6'
      }`}
    >
      <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  );
}
