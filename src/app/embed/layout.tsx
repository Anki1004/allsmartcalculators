import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Embeds must never be indexed: the calculator already has a canonical page,
// and an indexable chrome-free duplicate of it would compete with the real one.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// The site has a single root layout that renders the navbar, footer, cookie
// banner and back-to-top button for every route. Splitting the app into two
// root layouts (route groups) would mean moving every existing route directory
// — a large, unverifiable change to a live site. Instead this layout ships one
// server-rendered <style> block that only ever reaches /embed/* pages, so the
// chrome is gone in the very first byte of HTML with no flash and no pathname
// lookup (which would have forced every page on the site into dynamic
// rendering).
const EMBED_CSS = `
  header, footer,
  [aria-label="Cookie consent"],
  [aria-label="Back to top"],
  .aurora-bg, .cosmic-grain { display: none !important; }
  html, body { min-height: 0 !important; height: auto !important; overflow-x: hidden; }
  main { min-height: 0 !important; }
  body { padding: 0 !important; }
`;

export default function EmbedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: EMBED_CSS }} />
      {children}
    </>
  );
}
