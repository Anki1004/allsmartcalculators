'use client';

export const CONSENT_KEY = 'cv-cookie-consent';
export const CONSENT_EVENT = 'cv-consent-changed';

export type ConsentChoice = 'accepted' | 'declined' | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readConsent(): ConsentChoice {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'accepted' || v === 'declined' ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: 'accepted' | 'declined') {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // localStorage may be disabled — still update Consent Mode for this session
  }

  const granted: 'granted' | 'denied' = choice === 'accepted' ? 'granted' : 'denied';
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted,
      analytics_storage: granted,
    });
  }

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}
