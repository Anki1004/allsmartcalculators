import { Metadata } from 'next';
import GlassCard from '@/components/GlassCard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.com';

export const metadata: Metadata = {
  title: 'Privacy Policy — AllSmartCalculator',
  description: "Here's exactly what we do (and don't do) with any information you might share with us.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    title: 'Privacy Policy — AllSmartCalculator',
    description: "What we do (and don't do) with your information.",
    url: `${SITE_URL}/privacy`,
    type: 'website',
    siteName: 'AllSmartCalculator',
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-5 md:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-primary mb-2 sm:mb-3">Legal</p>
          <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter text-on-surface mb-3 sm:mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            Here's exactly what we do (and don't do) with any information you might share with us. Written in plain language, because privacy policies shouldn't require a law degree to understand.
          </p>
          <p className="text-[11px] sm:text-xs text-on-surface-variant/50 mt-3 sm:mt-4 font-mono">Last updated April 18, 2026</p>
        </div>

        <div className="flex flex-col gap-5">

          {/* Short version */}
          <GlassCard className="p-5 sm:p-6 md:p-8 border-l-2 border-primary/60">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">The short version</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              All calculations on AllSmartCalculator happen directly in your browser. The numbers you enter — your salary, weight, loan amount, whatever — never leave your device. We don't store them, we don't see them, and we can't access them. That's not a marketing claim; it's how the site is technically built.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              What we do collect is basic analytics (pages visited, device type, country) so we know which calculators people find useful and where to improve. If we ever run ads on the site, those ad networks collect their own data under their own policies. We don't sell your data, we don't email you unless you ask us to, and we don't use dark patterns to trick you into anything.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              If you want the detailed version, keep reading. If you just wanted to know we aren't creepy, that was it.
            </p>
          </GlassCard>

          {/* What we collect */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-4">What information we collect</h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Calculator inputs: Nothing.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">Every calculator on AllSmartCalculator runs entirely in your browser using JavaScript. When you move a slider or type a number, only your device sees it. The numbers never get sent to our servers because our servers don't need them.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Analytics data.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">We use analytics to understand which pages people visit, how long they spend, and which calculators are popular. This includes your approximate location (country/region, not address), device type, browser, and the pages you view. This data is aggregated and doesn't identify you personally.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Contact form submissions.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">If you email us or submit a contact form, we obviously have your email address and whatever you wrote. We use it only to respond to your message and don't add you to any marketing lists.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Cookies.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">We use minimal cookies — mostly for remembering your preferences (currency setting, recently used calculators) and for analytics. If you disable cookies, the site still works; you just lose the personalization.</p>
              </div>
            </div>
          </GlassCard>

          {/* Third-party services */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-2">Third-party services we use</h2>
            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">Being transparent about this matters. Here's who we work with and why.</p>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Hosting.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">The site is hosted on cloud infrastructure (such as Vercel or similar). When you visit, standard server logs record your IP address and user agent — this is industry-standard and required for the site to function. These logs are rotated regularly.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Analytics.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">We may use privacy-respecting tools like Plausible or Fathom to understand site usage. These tools may set cookies and collect anonymized usage data. We prefer tools that don't fingerprint or identify individual users.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Advertising.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">We may use Google AdSense to display ads on AllSmartCalculator. Google AdSense uses cookies to show relevant ads based on your visits to this and other websites. These networks use cookies to show relevant ads and measure performance. You can control personalized advertising through your browser settings or by visiting <a href="https://adssettings.google.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> or YourAdChoices.com.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface mb-1">Fonts and icons.</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">We load fonts from Google Fonts. When your browser fetches those fonts, Google's servers see your IP address — that's just how the web works. We don't load trackers or ad scripts from third parties beyond what's described above.</p>
              </div>
            </div>
          </GlassCard>

          {/* How we use data */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">How we use your data</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">Short list, because we don't do much with it:</p>
            <ul className="space-y-2 mb-4">
              {[
                'Improve the site based on what calculators people actually use',
                'Fix bugs and performance issues when we see them in analytics',
                'Respond to emails and support requests',
                'Show ads (if we have them) and measure whether they work',
                "Comply with legal obligations if we're ever legally required to",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
                  <span className="text-primary mt-0.5 shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <span className="text-on-surface font-semibold">What we don't do:</span> sell your data, share it with data brokers, send you spam emails, or build profiles to track you across the web. That's not a business we want to be in.
            </p>
          </GlassCard>

          {/* Advertising */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Advertising and personalization</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              If AllSmartCalculator runs ads, here's what you should know: ad networks like Google AdSense use cookies to serve ads based on your previous visits to our site and other websites. This is called "personalized advertising" and is standard across most of the web.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              You can opt out of personalized advertising from Google by visiting Google Ads Settings. For opt-outs from other networks, visit aboutads.info/choices (US) or youronlinechoices.com (EU).
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Opting out means you'll still see ads, but they won't be personalized based on your browsing history. Many people prefer this; it's your call.
            </p>
          </GlassCard>

          {/* Your rights */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Your rights (GDPR, CCPA, and others)</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">Depending on where you live, you have legal rights over your data. Even though we collect very little, these still apply:</p>
            <ul className="space-y-3 mb-4">
              {[
                { right: 'Access', desc: 'Ask what data we have about you (usually: nothing identifiable, beyond server logs).' },
                { right: 'Deletion', desc: 'Ask us to delete your data. We\'ll comply within 30 days.' },
                { right: 'Correction', desc: 'If we have incorrect data about you, you can ask us to fix it.' },
                { right: 'Portability', desc: 'Request a copy of your data in a portable format.' },
                { right: 'Opt-out', desc: 'Disable analytics and advertising cookies anytime through your browser settings.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
                  <span className="text-primary mt-0.5 shrink-0">→</span>
                  <span><span className="font-semibold text-on-surface">{item.right}:</span> {item.desc}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              To exercise any of these rights, email us through the contact page. We don't ask for extensive verification — just tell us what you'd like and we'll handle it.
            </p>
          </GlassCard>

          {/* Children */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Children's privacy</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              AllSmartCalculator is intended for general audiences and is not specifically directed at children under 13. We don't knowingly collect personal information from children under 13. If you're a parent and believe your child has provided us with personal information, contact us and we'll delete it promptly.
            </p>
          </GlassCard>

          {/* Security */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Security</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              We use standard security practices: HTTPS across the entire site, secure hosting, and minimal data collection — the best security is not having the data in the first place.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              No system is perfectly secure, but because we don't store your calculator inputs or collect personal information beyond basic analytics, even a worst-case breach would expose very little about you.
            </p>
          </GlassCard>

          {/* Changes */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Changes to this policy</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              If we update this privacy policy, we'll change the "last updated" date at the top of the page. For significant changes that affect how we handle your data, we'll do our best to notify users — most likely through a banner on the site.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              We recommend checking back occasionally if privacy matters to you, though honestly, our privacy practices aren't the kind of thing that changes often.
            </p>
          </GlassCard>

          {/* Contact */}
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Contacting us</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              If you have any questions about this privacy policy, or about how we handle data, get in touch through our contact page. We read every message and respond within a few business days.
            </p>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}
