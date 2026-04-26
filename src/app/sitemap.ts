import { MetadataRoute } from 'next';
import { allCalculators } from '@/lib/calculator-registry';
import { CATEGORIES } from '@/lib/calculator-types';
import { getAllPosts } from '@/lib/strapi';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.tech';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,                    lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/categories`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/trending`,            lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/blog`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/about`,               lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/methodology`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/author/ankit-gupta`,  lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`,             lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/privacy`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/terms`,               lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`,          lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/${cat.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const calculatorRoutes: MetadataRoute.Sitemap = allCalculators.map((calc) => ({
    url: `${BASE_URL}/${calc.category}/${calc.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: calc.trending ? 0.8 : 0.6,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    blogRoutes = posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt ?? now),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch {
    // Strapi unavailable at build time — sitemap still generates without blog entries
  }

  return [...staticRoutes, ...categoryRoutes, ...calculatorRoutes, ...blogRoutes];
}
