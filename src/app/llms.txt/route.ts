// Lists the indexable subset only. /llms.txt is a discovery surface for AI
// engines, so advertising pages we tell Googlebot to skip would contradict the
// robots meta — and those pages are the not-yet-rewritten ones we don't want
// cited yet.
import { indexableCalculators, INDEXED_CATEGORIES } from '@/lib/calculator-registry';
import { getAllPosts } from '@/lib/strapi';
import { US_DELISTED_POSTS } from '@/lib/market-delist';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';

// Revalidate every 60s so new Strapi blog posts surface in /llms.txt without a rebuild.
export const revalidate = 60;

export async function GET() {
  const lines: string[] = [
    `# AllSmartCalculators — Free Online Calculators`,
    ``,
    `> AllSmartCalculators is a free collection of ${indexableCalculators.length} interactive calculators covering finance, health, math, and education. All calculators are instant, mobile-friendly, and require no signup.`,
    ``,
    `## URL`,
    ``,
    BASE_URL,
    ``,
    `## About`,
    ``,
    `AllSmartCalculators helps users make better decisions with fast, accurate calculators. Every formula is reviewed by Ankit Gupta and sourced from authoritative references (RBI, WHO, IT Department, SEBI). No signup required — just clean tools that respect the reader.`,
    ``,
    `## Key Pages`,
    ``,
    `- [Home](${BASE_URL}/): Browse all ${indexableCalculators.length} calculators`,
    `- [Categories](${BASE_URL}/categories): All ${INDEXED_CATEGORIES.length} calculator categories`,
    `- [Trending](${BASE_URL}/trending): Most-used calculators`,
    `- [Blog](${BASE_URL}/blog): Calculator guides and long-form explainers`,
    `- [About](${BASE_URL}/about): About AllSmartCalculators`,
    `- [Methodology](${BASE_URL}/methodology): How calculators are built and verified`,
    `- [Author: Ankit Gupta](${BASE_URL}/author/ankit-gupta): Builder and reviewer`,
    `- [Contact](${BASE_URL}/contact): Reach out`,
    ``,
    `## Calculator Categories`,
    ``,
  ];

  for (const cat of INDEXED_CATEGORIES) {
    lines.push(`- [${cat.name}](${BASE_URL}/${cat.id}): ${cat.description}`);
  }
  lines.push(``);

  lines.push(`## Calculators by Category`);
  lines.push(``);

  for (const cat of INDEXED_CATEGORIES) {
    const calcs = indexableCalculators.filter((c) => c.category === cat.id);
    if (calcs.length === 0) continue;
    lines.push(`### ${cat.name} (${calcs.length} calculators)`);
    lines.push(``);
    for (const calc of calcs) {
      lines.push(`- [${calc.name}](${BASE_URL}/${calc.category}/${calc.slug}): ${calc.description}`);
    }
    lines.push(``);
  }

  // Blog posts (dynamic from Strapi). Skipped silently if Strapi is unreachable.
  try {
    const posts = (await getAllPosts()).filter((p) => !US_DELISTED_POSTS.has(p.slug));
    if (posts.length > 0) {
      lines.push(`## Blog Posts`);
      lines.push(``);
      for (const post of posts) {
        const excerpt = post.excerpt?.replace(/\s+/g, ' ').trim() ?? '';
        lines.push(
          `- [${post.title}](${BASE_URL}/blog/${post.slug})${excerpt ? ': ' + excerpt : ''}`,
        );
      }
      lines.push(``);
    }
  } catch {
    // Strapi unreachable at request time — skip the blog section instead of failing the route.
  }

  lines.push(`## Legal`);
  lines.push(``);
  lines.push(`- [Privacy](${BASE_URL}/privacy): Privacy policy`);
  lines.push(`- [Terms](${BASE_URL}/terms): Terms of service`);
  lines.push(`- [Disclaimer](${BASE_URL}/disclaimer): YMYL disclaimer for finance, health, and crypto results`);
  lines.push(``);

  lines.push(`## Sitemap`);
  lines.push(``);
  lines.push(`${BASE_URL}/sitemap.xml`);

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=60, must-revalidate',
    },
  });
}
