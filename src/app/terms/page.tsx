import { Metadata } from 'next';
import GlassCard from '@/components/GlassCard';
import CmsRichText from '@/components/CmsRichText';
import { getTermsPage } from '@/lib/strapi';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.com';

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getTermsPage();
  const title = cms?.pageTitle ?? 'Terms of Service — AllSmartCalculator';
  const description =
    cms?.metaDescription ??
    'The rules of using AllSmartCalculator. Straightforward, fair, and written like a normal human wrote them.';
  const canonical = cms?.linkCanonical ?? `${SITE_URL}/terms`;
  return {
    title,
    description,
    keywords: cms?.metaKeywords ?? undefined,
    authors: [{ name: cms?.metaAuthor ?? 'AllSmartCalculator Team' }],
    robots: cms?.metaRobots ?? 'index, follow',
    alternates: { canonical },
    openGraph: {
      title: cms?.metaOgTitle ?? title,
      description: cms?.metaOgDescription ?? 'Straightforward, fair terms of use.',
      url: cms?.metaOgUrl ?? canonical,
      type: (cms?.metaOgType as 'website') ?? 'website',
      siteName: cms?.metaOgSiteName ?? 'AllSmartCalculator',
      ...(cms?.metaOgImage && { images: [{ url: cms.metaOgImage }] }),
    },
    twitter: {
      card: (cms?.metaTwitterCard as 'summary_large_image') ?? 'summary_large_image',
      title: cms?.metaTwitterTitle ?? title,
      description: cms?.metaTwitterDescription ?? description,
      site: cms?.metaTwitterSite ?? '@AllSmartCalculator',
      ...(cms?.metaTwitterImage && { images: [cms.metaTwitterImage] }),
    },
  };
}

export default async function TermsPage() {
  const cms = await getTermsPage();

  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-5 md:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-primary mb-2 sm:mb-3">Legal</p>
          <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter text-on-surface mb-3 sm:mb-4">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            These aren't written to protect us from you. They're written to be honest about what AllSmartCalculator is — and what it isn't. Plain language, no gotchas.
          </p>
          <p className="text-[11px] sm:text-xs text-on-surface-variant/50 mt-3 sm:mt-4 font-mono">Last updated April 18, 2026</p>
        </div>

        {cms?.body ? (
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <CmsRichText content={cms.body} />
          </GlassCard>
        ) : (
          <div className="flex flex-col gap-5">

          {/* Short version */}
          <GlassCard className="p-5 sm:p-6 md:p-8 border-l-2 border-primary/60">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">The short version</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              AllSmartCalculator is a free collection of browser-based calculators. You can use them for personal, educational, or professional purposes. The results are mathematical estimates — not financial, medical, or legal advice. Don't copy our product wholesale and call it your own, don't scrape the site aggressively, and don't use it for anything illegal. That's really it.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              If you want the full legal detail on each of those points, it's all below. Nothing in these terms is designed to surprise you.
            </p>
          </GlassCard>

          {/* What AllSmartCalculator is */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-4">What AllSmartCalculator is</h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">A free, browser-based tool.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">AllSmartCalculator is a collection of calculators covering finance, health, math, crypto, engineering, and everyday life. There's no subscription, no account required, and no paywall. You open it, use it, and leave — or explore. Either way, you're welcome here.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Not a financial or professional service.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">AllSmartCalculator is an educational and reference tool. It is not a bank, an investment platform, a medical service, or a licensed advisory service of any kind. The numbers it produces are a starting point for thinking, not a substitute for professional judgment.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Not affiliated with third-party institutions.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Results from our EMI calculator, compound interest calculator, or any other tool do not represent quotes, offers, or guarantees from any financial institution. Always verify with the actual provider before making any financial commitment.</p>
              </div>
            </div>
          </GlassCard>

          {/* Using the site */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-4">Using the site</h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">What you're allowed to do.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Use AllSmartCalculator freely for personal, academic, or professional purposes. Share links to specific calculators. Reference our outputs in your own notes, reports, or documents. We're glad the tools are useful.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">What you're not allowed to do.</p>
                <ul className="space-y-2 mt-2">
                  {[
                    'Copy our calculators wholesale and publish them as your own product without permission',
                    'Scrape the site in a way that degrades performance or disrupts other users',
                    'Use AllSmartCalculator for anything illegal under applicable law',
                    'Attempt to reverse engineer, tamper with, or compromise the site\'s infrastructure',
                    'Use our branding, name, or logo in a way that implies affiliation or endorsement without prior agreement',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <span className="text-primary mt-0.5 shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Embedding and linking.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">You may link to AllSmartCalculator calculators from your own site, blog, or app. If you want to embed a calculator directly or partner in some other way, get in touch — we're open to conversations about that.</p>
              </div>
            </div>
          </GlassCard>

          {/* Calculator results */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-4">Calculator results and accuracy</h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Results are estimates, not guarantees.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Every number AllSmartCalculator produces is a mathematical result based on the inputs you provide and the assumptions embedded in each formula. The EMI calculator gives you a figure, not a guarantee from your bank. The BMI calculator gives you a number, not a medical diagnosis. Real-world outcomes will differ based on factors no general-purpose calculator can anticipate.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Formula quality.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">We put genuine care into the formulas we use. They're based on standard, recognised methods and verified against known benchmarks. That said, no implementation is perfectly infallible, and the right formula for one context isn't always the right formula for another. If you find something that looks wrong, please tell us — we'd rather be corrected than quietly wrong.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Inputs are your responsibility.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">The quality of any result depends on the quality of the inputs. Garbage in, garbage out — that's not a criticism, it's just math. We don't validate whether the numbers you enter reflect your actual situation.</p>
              </div>
            </div>
          </GlassCard>

          {/* Not professional advice */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Not professional advice</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              AllSmartCalculator does not provide financial, medical, legal, tax, or any other kind of professional advice. This point matters enough that it gets its own section.
            </p>
            <ul className="space-y-3 mb-4">
              {[
                { label: 'Finance', desc: 'If you\'re taking out a mortgage, planning retirement, evaluating a business, or making any significant financial decision — please talk to a qualified financial advisor or accountant who understands your full picture.' },
                { label: 'Health', desc: 'A conversation with a doctor is worth more than any algorithm. AllSmartCalculator\'s health tools are awareness aids, not diagnostics.' },
                { label: 'Legal', desc: 'Nothing on this site is legal advice. For anything with real legal implications, consult a lawyer.' },
                { label: 'Tax', desc: 'Tax rules vary by jurisdiction and change regularly. Our tax tools give ballpark figures. File with a professional or qualified software, not just our estimate.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
                  <span className="text-primary mt-0.5 shrink-0">→</span>
                  <span><span className="font-semibold text-on-surface">{item.label}:</span> {item.desc}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              We genuinely believe our calculators are useful. Useful and sufficient are not the same thing.
            </p>
          </GlassCard>

          {/* Intellectual property */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-4">Intellectual property</h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">What's ours.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">The AllSmartCalculator name, logo, visual design, and written content are our intellectual property. You're welcome to quote or reference us with attribution, but don't replicate our branding or content in a way that implies ownership or official affiliation.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">What's not ours.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">The underlying math formulas are in the public domain — you can't copyright a formula. We don't claim ownership of standard financial or scientific methods. What we've built around them is a different matter.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Partnerships and collaborations.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">If you want to write about us, reference us in a product, or explore a collaboration, we're open to talking. Just get in touch before using our name or logo in any commercial context.</p>
              </div>
            </div>
          </GlassCard>

          {/* Availability */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Availability and uptime</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              We try to keep AllSmartCalculator running reliably. But servers go down, bugs happen, and sometimes we need to take things offline to ship improvements. We don't guarantee uptime and we're not liable for losses that result from the site being unavailable.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              If we're doing planned maintenance that will take the site offline for any meaningful stretch, we'll try to communicate it in advance — a banner on the site or a note on our social channels. Unexpected outages obviously can't be predicted, but we'll always work to resolve them quickly.
            </p>
          </GlassCard>

          {/* Limitation of liability */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Limitation of liability</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              To the extent permitted by applicable law, AllSmartCalculator and its operators are not liable for any damages arising from your use of — or inability to use — this site. That includes direct, indirect, incidental, or consequential damages.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              We've built this carefully and in good faith, but we're a free tool, not an insured financial service. The practical implication is simple: don't make high-stakes decisions — financial, medical, or otherwise — based solely on what a free web calculator tells you.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              If a country or jurisdiction doesn't allow the exclusion of certain warranties or the limitation of liability for damages, the above may not apply to you in full. In those cases, our liability is limited to the maximum extent permitted by law.
            </p>
          </GlassCard>

          {/* Third-party links */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Third-party links and services</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              AllSmartCalculator may contain links to external websites or reference external services (like exchange rate providers, regulatory bodies, or financial tools). We link to these because they're useful, not because we endorse everything they do.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              We're not responsible for the content, accuracy, or practices of any third-party site. When you leave AllSmartCalculator, the other site's terms and privacy policies apply.
            </p>
          </GlassCard>

          {/* Changes to terms */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Changes to these terms</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              We might update these terms as the product evolves. When we do, we'll update the "last updated" date at the top of this page. If something significant changes — something that materially affects your rights or how we operate — we'll try to communicate it more directly, likely through a banner on the site.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Continuing to use AllSmartCalculator after we update these terms means you're okay with the changes. If you're not, you can stop using the site — no hard feelings.
            </p>
          </GlassCard>

          {/* Governing law */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Governing law and disputes</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              These terms are governed by applicable law in the jurisdiction where AllSmartCalculator operates. If there's ever a dispute, we genuinely prefer to resolve it by talking first — most things can be sorted out without escalation.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Reach us at <span className="text-primary font-mono">hello@allsmartcalculator.com</span>. We read every message and take them seriously.
            </p>
          </GlassCard>

          </div>
        )}
      </div>
    </div>
  );
}
