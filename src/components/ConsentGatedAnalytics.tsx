'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { CONSENT_EVENT, readConsent } from '@/lib/consent';

export default function ConsentGatedAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const update = () => setAllowed(readConsent() === 'accepted');
    update();
    window.addEventListener(CONSENT_EVENT, update as EventListener);
    return () => window.removeEventListener(CONSENT_EVENT, update as EventListener);
  }, []);

  if (!allowed) return null;
  return <Analytics />;
}
