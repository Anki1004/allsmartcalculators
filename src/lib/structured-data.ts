// Reusable JSON-LD builders. Each returns a plain object so callers can JSON.stringify
// and inject via <script type="application/ld+json"> directly.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const PERSON_ID = `${SITE_URL}/author/ankit-gupta#person`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'AllSmartCalculators',
    url: SITE_URL,
    logo: `${SITE_URL}/logo-full.png`,
    sameAs: ['https://www.linkedin.com/in/ankit-gupta-data-analyst'],
    founder: { '@type': 'Person', '@id': PERSON_ID, name: 'Ankit Gupta' },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'allsmartcalculators@gmail.com',
        url: `${SITE_URL}/contact`,
        availableLanguage: ['English', 'Hindi'],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: 'AllSmartCalculators',
    inLanguage: 'en-IN',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export type Crumb = { name: string; url: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export type FaqEntry = { q: string; a: string };

export function faqSchema(faqs: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
