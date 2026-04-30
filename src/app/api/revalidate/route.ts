import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// On-demand cache purge endpoint. Strapi calls this on every content
// create/update/delete via a global lifecycle hook in strapi/src/index.ts.
// Always purges /sitemap.xml and /llms.txt; targets specific routes when
// the changed content type maps to one (blog posts, single-type pages).
//
// Auth: caller must send `x-revalidate-secret: <REVALIDATE_SECRET>`.

interface Payload {
  model?: string;   // singular name e.g. 'post', 'about-page'
  uid?: string;     // full UID e.g. 'api::post.post'
  slug?: string;
  action?: string;
}

const SINGLE_TYPE_TO_PATH: Record<string, string> = {
  'homepage': '/',
  'about-page': '/about',
  'methodology-page': '/methodology',
  'privacy-page': '/privacy',
  'terms-page': '/terms',
  'disclaimer-page': '/disclaimer',
  'author-page': '/author/ankit-gupta',
  'finance-page': '/finance',
  'health-page': '/health',
  'math-page': '/math',
  'crypto-page': '/crypto',
  'engineering-page': '/engineering',
  'daily-life-page': '/daily-life',
  'education-page': '/education',
  'business-page': '/business',
};

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret');
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as Payload;
  const { model, slug } = body;
  const purged: string[] = [];

  // Always refresh the SEO surfaces.
  revalidatePath('/sitemap.xml');
  revalidatePath('/llms.txt');
  purged.push('/sitemap.xml', '/llms.txt');

  if (model === 'post') {
    revalidatePath('/blog');
    purged.push('/blog');
    if (slug) {
      revalidatePath(`/blog/${slug}`);
      purged.push(`/blog/${slug}`);
    }
  } else if (model && SINGLE_TYPE_TO_PATH[model]) {
    const path = SINGLE_TYPE_TO_PATH[model];
    revalidatePath(path);
    purged.push(path);
  } else if (model === 'calculator-content' && slug) {
    // Slug alone doesn't tell us the category — refresh the whole category
    // shell on next visit by purging the layout. Per-page revalidate window
    // (60s) handles the rest.
    revalidatePath(`/`, 'layout');
    purged.push('/ (layout)');
  }

  return NextResponse.json({
    revalidated: true,
    at: new Date().toISOString(),
    model: model ?? null,
    slug: slug ?? null,
    purged,
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    hint: 'POST with x-revalidate-secret header. Body: { model, slug, action }.',
  });
}
