import { MetadataRoute } from 'next';
import { allCalculators } from '@/lib/calculator-registry';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://calcverse.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,           lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/categories`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/trending`,   lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/about`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/privacy`,    lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/terms`,      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`, lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ];

  const calculatorRoutes: MetadataRoute.Sitemap = allCalculators.map((calc) => ({
    url: `${BASE_URL}/${calc.category}/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: calc.trending ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...calculatorRoutes];
}
