'use client';

import { useEffect } from 'react';

interface EmbedFrameSupportProps {
  /** `?theme=light` on the embed URL. Anything else falls through to dark. */
  theme?: string;
}

/**
 * Two things an iframed calculator needs that a normal page does not.
 *
 * 1. Theme. The site stores the theme in localStorage, which inside an iframe
 *    belongs to our origin, not the host's — so an embed on a light-coloured
 *    blog would always render dark. `?theme=light` lets the host pick.
 *
 * 2. Height. Calculator height varies by tool and by viewport, and a host
 *    cannot know it in advance. This posts the measured height to the parent
 *    whenever it changes. Hosts that paste only the iframe get a sensible
 *    fixed height; hosts that add the optional listener get auto-resize.
 */
export default function EmbedFrameSupport({ theme }: EmbedFrameSupportProps) {
  useEffect(() => {
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (window.parent === window) return;

    let last = 0;
    const post = () => {
      const height = Math.ceil(document.documentElement.scrollHeight);
      if (height === last) return;
      last = height;
      // '*' rather than a fixed origin: the whole point is that we do not know
      // which site has embedded us. The message carries no user data.
      window.parent.postMessage({ type: 'asc-embed-height', height }, '*');
    };

    post();
    const observer = new ResizeObserver(post);
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, []);

  return null;
}
