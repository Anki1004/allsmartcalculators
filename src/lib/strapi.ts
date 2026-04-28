const STRAPI_URL =
  process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

interface SeoFields {
  pageTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  metaRobots: string | null;
  metaOgTitle: string | null;
  metaOgDescription: string | null;
  metaOgImage: string | null;
  metaOgUrl: string | null;
  metaOgType: string | null;
  metaOgSiteName: string | null;
  metaTwitterCard: string | null;
  metaTwitterTitle: string | null;
  metaTwitterDescription: string | null;
  metaTwitterImage: string | null;
  metaTwitterSite: string | null;
  linkCanonical: string | null;
  metaAuthor: string | null;
  customSchema: Record<string, unknown> | null;
}

export interface StrapiPost extends SeoFields {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  showOnHome: boolean;
  publishedOn: string | null;
  publishedAt: string;
  createdAt: string;
  coverImage: {
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  } | null;
}

interface StrapiResponse<T> {
  data: T;
  meta: { pagination?: { page: number; pageSize: number; pageCount: number; total: number } };
}

async function strapiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    next: { revalidate: 60 },
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error(`Strapi fetch failed: ${res.status}`);
  return res.json();
}

export async function getAllPosts(): Promise<StrapiPost[]> {
  const data = await strapiGet<StrapiResponse<StrapiPost[]>>(
    '/posts?populate=coverImage&sort=publishedAt:desc'
  );
  return data.data ?? [];
}

export async function getPostBySlug(slug: string): Promise<StrapiPost | null> {
  const data = await strapiGet<StrapiResponse<StrapiPost[]>>(
    `/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=coverImage`
  );
  return data.data?.[0] ?? null;
}

export async function getFeaturedPosts(): Promise<StrapiPost[]> {
  const data = await strapiGet<StrapiResponse<StrapiPost[]>>(
    '/posts?filters[showOnHome][$eq]=true&populate=coverImage&sort=publishedAt:desc'
  );
  return data.data ?? [];
}

export function getStrapiImageUrl(url: string): string {
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

export interface StrapiCalcContent extends SeoFields {
  id: number;
  slug: string;
  calculatorName: string;
  intro: string | null;
  tips: string | null;
  formulaExplanation: string | null;
  faqs: { id: number; question: string; answer: string }[];
  relatedCalculators: string[] | null;
}

export async function getCalcContent(slug: string): Promise<StrapiCalcContent | null> {
  try {
    const data = await strapiGet<StrapiResponse<StrapiCalcContent[]>>(
      `/calculator-contents?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=faqs`
    );
    return data.data?.[0] ?? null;
  } catch {
    return null;
  }
}

export interface StrapiHomepage extends SeoFields {
  id: number;
  heroChip: string | null;
  heroHeadline: string | null;
  heroSubheadline: string | null;
  heroDescription: string | null;
  ctaHeadline: string | null;
  ctaDescription: string | null;
  bottomContent: string | null;
}

export async function getHomepage(): Promise<StrapiHomepage | null> {
  try {
    const data = await strapiGet<{ data: StrapiHomepage }>('/homepage');
    return data.data ?? null;
  } catch {
    return null;
  }
}

export interface StrapiCategoryContent extends SeoFields {
  id: number;
  topContent: string | null;
  bottomContent: string | null;
}

// Each category has its own Strapi single type for direct sidebar access.
// Map the URL slug to its corresponding single-type endpoint.
const CATEGORY_ENDPOINT: Record<string, string> = {
  finance: '/finance-page',
  health: '/health-page',
  math: '/math-page',
  crypto: '/crypto-page',
  engineering: '/engineering-page',
  'daily-life': '/daily-life-page',
  education: '/education-page',
  business: '/business-page',
};

export async function getCategoryContent(
  categorySlug: string,
): Promise<StrapiCategoryContent | null> {
  const endpoint = CATEGORY_ENDPOINT[categorySlug];
  if (!endpoint) return null;
  try {
    const data = await strapiGet<{ data: StrapiCategoryContent }>(endpoint);
    return data.data ?? null;
  } catch {
    return null;
  }
}

export interface StrapiStaticPage extends SeoFields {
  id: number;
  body: string | null;
}

async function getStaticPage(endpoint: string): Promise<StrapiStaticPage | null> {
  try {
    const data = await strapiGet<{ data: StrapiStaticPage }>(endpoint);
    return data.data ?? null;
  } catch {
    return null;
  }
}

export const getAboutPage = () => getStaticPage('/about-page');
export const getMethodologyPage = () => getStaticPage('/methodology-page');
export const getPrivacyPage = () => getStaticPage('/privacy-page');
export const getTermsPage = () => getStaticPage('/terms-page');
export const getDisclaimerPage = () => getStaticPage('/disclaimer-page');
