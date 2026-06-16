import { MetadataRoute } from 'next';
import { allCalculators } from '@/lib/calculator-registry';
import { CATEGORIES } from '@/lib/calculator-types';
import { getAllPosts } from '@/lib/strapi';
import { INDEXABLE_CALCULATORS } from '@/lib/indexable-calculators';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';

// Match /llms.txt: revalidate every 60s so Strapi blog posts surface
// without a redeploy. /api/revalidate also force-purges this on publish.
export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // A real lastModified (or none at all) keeps Google trusting the signal —
  // stamping `new Date()` on every regeneration gets lastmod ignored sitewide.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,                    changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/categories`,          changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/trending`,            changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/blog`,                changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/about`,               changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/methodology`,         changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/author/ankit-gupta`,  changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`,             changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/privacy`,             changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/terms`,                changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`,           changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/faq`,                  changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/editorial-policy`,     changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE_URL}/corrections`,          changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/accessibility-statement`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/sitemap.html`,         changeFrequency: 'weekly',  priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/${cat.id}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Only list indexable (rewritten, high-quality) calculators. Pages set to
  // noindex are excluded so we don't advertise them to Google or trip the
  // "submitted URL marked noindex" warning in Search Console.
  const calculatorRoutes: MetadataRoute.Sitemap = allCalculators
    .filter((calc) => INDEXABLE_CALCULATORS.has(calc.slug))
    .map((calc) => ({
      url: `${BASE_URL}/${calc.category}/${calc.slug}`,
      ...(calc.lastUpdated && { lastModified: new Date(calc.lastUpdated) }),
      changeFrequency: 'monthly',
      priority: calc.trending ? 0.8 : 0.6,
    }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    blogRoutes = posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      ...(p.publishedAt && { lastModified: new Date(p.publishedAt) }),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch {
    // Strapi unavailable at build time — sitemap still generates without blog entries
  }

  return [...staticRoutes, ...categoryRoutes, ...calculatorRoutes, ...blogRoutes];
}
