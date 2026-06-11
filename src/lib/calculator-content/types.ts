// Server-only inline content for calculators (fallback when Strapi is empty).
// Kept OUT of src/lib/calculators/* so the long markdown strings never enter
// the client bundle — the 'use client' engine imports the whole registry.
export interface CalcInlineContent {
  article?: string;
  faqs?: { question: string; answer: string }[];
}
