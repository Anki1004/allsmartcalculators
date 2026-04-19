const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

export interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: number;
  featured: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
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
    `/posts?filters[slug][$eq]=${slug}&populate=coverImage`
  );
  return data.data?.[0] ?? null;
}

export async function getFeaturedPosts(): Promise<StrapiPost[]> {
  const data = await strapiGet<StrapiResponse<StrapiPost[]>>(
    '/posts?filters[featured][$eq]=true&populate=coverImage&sort=publishedAt:desc'
  );
  return data.data ?? [];
}

export function getStrapiImageUrl(url: string): string {
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

export interface StrapiCalcContent {
  id: number;
  slug: string;
  calculatorName: string;
  intro: string | null;
  tips: string | null;
  formulaExplanation: string | null;
  faqs: { id: number; question: string; answer: string }[];
  relatedCalculators: string[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
}

export async function getCalcContent(slug: string): Promise<StrapiCalcContent | null> {
  try {
    const data = await strapiGet<StrapiResponse<StrapiCalcContent[]>>(
      `/calculator-contents?filters[slug][$eq]=${slug}&populate=faqs`
    );
    return data.data?.[0] ?? null;
  } catch {
    return null;
  }
}
