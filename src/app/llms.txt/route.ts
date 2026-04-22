import { allCalculators } from '@/lib/calculator-registry';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.tech';

export const dynamic = 'force-static';

export function GET() {
  const categories: Record<string, typeof allCalculators> = {};
  for (const calc of allCalculators) {
    if (!categories[calc.category]) categories[calc.category] = [];
    categories[calc.category].push(calc);
  }

  const categoryLabels: Record<string, string> = {
    finance: 'Finance & Investment',
    health: 'Health & Fitness',
    math: 'Math & Numbers',
    crypto: 'Crypto & Web3',
    engineering: 'Engineering & Science',
    'daily-life': 'Daily Life & Home',
    education: 'Education & Students',
    business: 'Business & Marketing',
  };

  const lines: string[] = [
    `# AllSmartCalculator — Free Online Calculators`,
    ``,
    `> AllSmartCalculator is a free collection of ${allCalculators.length}+ interactive calculators covering finance, health, math, crypto, engineering, education, and everyday life. All calculators are instant, mobile-friendly, and require no login.`,
    ``,
    `## URL`,
    ``,
    `${BASE_URL}`,
    ``,
    `## About`,
    ``,
    `AllSmartCalculator helps users make better decisions with fast, accurate calculators. Every calculator provides real-time results as you adjust sliders, with clear output labels and no ads cluttering the experience.`,
    ``,
    `## Calculators by Category`,
    ``,
  ];

  for (const [cat, calcs] of Object.entries(categories)) {
    lines.push(`### ${categoryLabels[cat] ?? cat} (${calcs.length} calculators)`);
    lines.push('');
    for (const calc of calcs) {
      lines.push(`- [${calc.name}](${BASE_URL}/${calc.category}/${calc.slug}): ${calc.description}`);
    }
    lines.push('');
  }

  lines.push(`## Key Features`);
  lines.push('');
  lines.push(`- ${allCalculators.length}+ free calculators, no login required`);
  lines.push(`- Real-time slider-based inputs with instant results`);
  lines.push(`- Works on mobile, tablet, and desktop`);
  lines.push(`- Categories: Finance, Health, Math, Crypto, Engineering, Daily Life, Education, Business`);
  lines.push(`- Blog with guides on personal finance, health, and crypto`);
  lines.push('');
  lines.push(`## Sitemap`);
  lines.push('');
  lines.push(`${BASE_URL}/sitemap.xml`);

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
