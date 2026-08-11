'use client';

import { useState } from 'react';
import { Check, Code2, Copy } from 'lucide-react';

interface EmbedSnippetProps {
  category: string;
  slug: string;
  name: string;
  siteUrl: string;
}

/**
 * "Embed this calculator" block.
 *
 * The attribution anchor is not decoration and must not be removed to tidy the
 * snippet up. The iframe content is served from our own domain, so nothing
 * inside it is a backlink; the anchor sitting outside the iframe, in the host's
 * own HTML, is the only part of this that a search engine attributes to us.
 * That is the entire mechanism by which calculator sites build link profiles.
 */
export default function EmbedSnippet({ category, slug, name, siteUrl }: EmbedSnippetProps) {
  const [copied, setCopied] = useState(false);

  const pageUrl = `${siteUrl}/${category}/${slug}`;
  const embedUrl = `${siteUrl}/embed/${category}/${slug}`;

  const snippet = `<iframe src="${embedUrl}" title="${name}" width="100%" height="620" style="border:0;border-radius:12px;max-width:100%" loading="lazy"></iframe>
<p style="font-size:13px"><a href="${pageUrl}">${name}</a> by <a href="${siteUrl}">AllSmartCalculators</a></p>`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is blocked in some embedded/insecure contexts — the textarea
      // below is selectable, so the user can still copy manually.
    }
  };

  return (
    <section className="mt-12 sm:mt-16">
      <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl tracking-tighter mb-2">
        Embed this calculator
      </h2>
      <p className="text-sm text-on-surface-variant mb-4 max-w-2xl">
        Free to use on your own site — no signup, no key, no limits. Paste this
        where you want the calculator to appear. Please keep the attribution
        line; it is the only thing we ask in return.
      </p>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-white/10">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-on-surface-variant">
            <Code2 className="w-3.5 h-3.5" />
            HTML
          </span>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea
          readOnly
          value={snippet}
          rows={4}
          onFocus={(e) => e.currentTarget.select()}
          className="w-full bg-transparent px-4 py-3 font-mono text-[11px] sm:text-xs leading-relaxed text-on-surface-variant resize-y outline-none"
        />
      </div>

      <p className="mt-3 text-xs text-on-surface-variant/70 max-w-2xl">
        Add <code className="text-secondary">?theme=light</code> to the embed URL for
        a light background. The frame reports its own height to the parent window
        as a <code className="text-secondary">asc-embed-height</code> message if you
        would rather size it automatically than use the fixed 620px.
      </p>
    </section>
  );
}
