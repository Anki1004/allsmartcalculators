import type { Metadata } from 'next';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { lastUpdatedLabel } from '@/lib/policy-dates';
import { breadcrumbSchema } from '@/lib/structured-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';

export const metadata: Metadata = {
  title: 'Accessibility Statement — AllSmartCalculators',
  description:
    'AllSmartCalculators accessibility statement — our WCAG 2.2 AA target, known limitations, and how to report a barrier.',
  alternates: { canonical: `${SITE_URL}/accessibility-statement` },
};

export default function AccessibilityStatementPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-5 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: SITE_URL },
              { name: 'Accessibility statement', url: `${SITE_URL}/accessibility-statement` },
            ]),
          ),
        }}
      />

      <div className="max-w-3xl mx-auto">
        <div className="mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-primary mb-2 sm:mb-3">
            Accessibility
          </p>
          <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter text-on-surface mb-3 sm:mb-4">
            Accessibility statement
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            We want every calculator on this site to be usable by everyone — including
            people who use screen readers, keyboard-only navigation, voice control, or
            need high-contrast or zoomed text.
          </p>
          <p className="text-[11px] sm:text-xs text-on-surface-variant/50 mt-3 sm:mt-4 font-mono">
            {lastUpdatedLabel('accessibility')}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Our target</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              AllSmartCalculators aims to conform to{' '}
              <a
                href="https://www.w3.org/TR/WCAG22/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                WCAG 2.2 Level AA
              </a>
              . That means the site should be perceivable, operable, understandable, and
              robust for users with a wide range of abilities and assistive technologies.
            </p>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">What we have done</h2>
            <ul className="flex flex-col gap-2 text-sm text-on-surface-variant leading-relaxed">
              {[
                'Semantic HTML landmarks (header, main, nav, footer) so screen readers can jump between sections.',
                'Visible focus ring on every interactive element. Buttons and links are reachable with Tab / Shift+Tab.',
                'Calculator sliders have keyboard equivalents (arrow keys to adjust, Home / End for min / max).',
                'Form fields have associated <label> elements; error messages are read by assistive tech.',
                'Color contrast is checked against WCAG AA (4.5:1 for normal text, 3:1 for large text) in both light and dark themes.',
                'No autoplay audio or video; no flashing content above WCAG seizure thresholds.',
                'Site works at 200% browser zoom and 400% text-only zoom without breaking layout.',
                'Cookie consent banner can be dismissed with the keyboard alone.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Known limitations</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              We are honest about gaps. The following are known issues we&apos;re actively
              working on:
            </p>
            <ul className="flex flex-col gap-2 text-sm text-on-surface-variant leading-relaxed">
              {[
                'A small number of decorative emoji in category cards are read by screen readers. We are migrating to aria-hidden icons with proper labels.',
                'Result charts (donut / line) rely on color to distinguish series. We are adding text labels and high-contrast patterns.',
                'Embedded third-party ad units (Google AdSense) are outside our direct control; their accessibility depends on the ad creative chosen by the advertiser.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-on-surface-variant/60 shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Report a barrier</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              If you hit an accessibility barrier on AllSmartCalculators — anything that
              stops you from using a calculator the way you need to — please email{' '}
              <a href="mailto:allsmartcalculators@gmail.com" className="text-primary hover:underline">
                allsmartcalculators@gmail.com
              </a>{' '}
              or use the{' '}
              <Link href="/contact" className="text-primary hover:underline">
                contact form
              </Link>
              . Include the page URL, the assistive technology you use, and a short
              description of the issue. We aim to respond within two business days and to
              ship a fix or workaround within two weeks.
            </p>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Formal complaints</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              If our response to your report is unsatisfactory, you can raise a complaint
              under the{' '}
              <a
                href="https://www.disabilityaffairs.gov.in/content/page/acts.php"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Rights of Persons with Disabilities Act, 2016
              </a>{' '}
              (India). Outside India, applicable legislation includes the EU Web
              Accessibility Directive, the UK Equality Act 2010, and Section 508 of the US
              Rehabilitation Act.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
