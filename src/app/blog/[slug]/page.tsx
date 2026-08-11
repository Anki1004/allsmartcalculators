import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts, getStrapiImageUrl } from '@/lib/strapi';
import { US_DELISTED_POSTS } from '@/lib/market-delist';
import { breadcrumbSchema } from '@/lib/structured-data';
import GlassCard from '@/components/GlassCard';
import { Clock, User, ArrowLeft, Calendar, Linkedin } from 'lucide-react';

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) return {};

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';
    const canonicalUrl = post.linkCanonical ?? `${siteUrl}/blog/${post.slug}`;
    const title = post.pageTitle ?? post.title;
    const description = post.metaDescription ?? post.excerpt;
    const coverImg = post.coverImage ? getStrapiImageUrl(post.coverImage.url) : undefined;
    const ogImg = post.metaOgImage ?? coverImg;
    const twitterImg = post.metaTwitterImage ?? coverImg;

    return {
      title: `${title} — AllSmartCalculators`,
      description,
      keywords: post.metaKeywords ?? undefined,
      authors: post.metaAuthor
        ? [{ name: post.metaAuthor }]
        : [{ name: 'Ankit Gupta', url: 'https://www.linkedin.com/in/ankit-gupta-data-analyst' }],
      // Code wins over the CMS here on purpose. In 2026-06 a stale Strapi
      // metaRobots value silently overrode the code allowlist and kept pages
      // noindex after they had been re-approved; the delist must not be
      // defeatable by a CMS row nobody remembers editing.
      robots: US_DELISTED_POSTS.has(params.slug)
        ? 'noindex, follow'
        : post.metaRobots ?? 'index, follow',
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: post.metaOgTitle ?? title,
        description: post.metaOgDescription ?? description,
        type: (post.metaOgType as 'article') ?? 'article',
        url: post.metaOgUrl ?? canonicalUrl,
        siteName: post.metaOgSiteName ?? 'AllSmartCalculators',
        publishedTime: post.publishedOn ?? post.publishedAt,
        ...(ogImg && { images: [{ url: ogImg, width: 1200, height: 630, alt: title }] }),
      },
      twitter: {
        card: (post.metaTwitterCard as 'summary_large_image') ?? 'summary_large_image',
        title: post.metaTwitterTitle ?? title,
        description: post.metaTwitterDescription ?? description,
        ...(post.metaTwitterSite && { site: post.metaTwitterSite }),
        ...(twitterImg && { images: [twitterImg] }),
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // No try/catch: if Strapi is unreachable the error must propagate so ISR
  // keeps the stale page instead of replacing it with a cached 404.
  const post = await getPostBySlug(params.slug);

  if (!post) notFound();

  const imgUrl = post.coverImage ? getStrapiImageUrl(post.coverImage.url) : null;
  const displayDate = post.publishedOn ?? post.publishedAt;
  const date = new Date(displayDate).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculators.com';
  const AUTHOR_LINKEDIN = 'https://www.linkedin.com/in/ankit-gupta-data-analyst';

  const jsonLd = post.customSchema ?? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.pageTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    author: {
      '@type': 'Person',
      name: post.metaAuthor ?? 'Ankit Gupta',
      url: `${siteUrl}/author/ankit-gupta`,
      sameAs: [AUTHOR_LINKEDIN],
    },
    datePublished: post.publishedOn ?? post.publishedAt,
    ...(imgUrl && { image: imgUrl }),
  };
  const crumbs = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Blog', url: `${siteUrl}/blog` },
    { name: post.title, url: `${siteUrl}/blog/${post.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-5 md:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors mb-6 sm:mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Cover image */}
        {imgUrl && (
          <div className="relative w-full h-44 sm:h-64 md:h-80 rounded-2xl overflow-hidden mb-6 sm:mb-8">
            <Image
              src={imgUrl}
              alt={post.coverImage?.alternativeText ?? post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
          </div>
        )}

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
            <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full text-primary bg-primary/10">
              {post.category}
            </span>
            {post.showOnHome && (
              <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full text-yellow-400 bg-yellow-400/10">
                Featured
              </span>
            )}
          </div>
          <h1 className="font-headline font-black text-2xl sm:text-3xl md:text-5xl tracking-tighter text-on-surface mb-3 sm:mb-4 leading-tight break-words">
            {post.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed mb-5 sm:mb-6">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm text-on-surface-variant/60 pb-5 sm:pb-6 border-b border-white/5 flex-wrap">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <Link href="/author/ankit-gupta" className="hover:text-primary transition-colors">
                {post.metaAuthor ?? 'Ankit Gupta'}
              </Link>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {post.readTime} min read
            </span>
          </div>
        </div>

        {/* Content */}
        <GlassCard className="p-5 sm:p-6 md:p-10">
          <div className="prose prose-invert prose-sm md:prose-base max-w-none break-words
            prose-headings:font-headline prose-headings:font-bold prose-headings:text-on-surface
            prose-p:text-on-surface-variant prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-on-surface
            prose-code:text-secondary prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
            prose-blockquote:border-l-primary prose-blockquote:text-on-surface-variant
            prose-li:text-on-surface-variant
            prose-hr:border-white/10
            prose-table:text-sm prose-table:my-4
            prose-th:text-on-surface prose-th:font-semibold prose-th:border-white/10 prose-th:bg-white/[0.03]
            prose-td:text-on-surface-variant prose-td:border-white/5
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </GlassCard>

        {/* Author bio — E-E-A-T: real, identifiable author with a LinkedIn link */}
        <div className="mt-8 sm:mt-10">
          <GlassCard className="p-5 sm:p-6 flex items-start gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center text-lg sm:text-xl font-headline font-black text-white shrink-0">
              A
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/60 mb-0.5">
                Written by
              </p>
              <Link
                href="/author/ankit-gupta"
                className="font-headline font-bold text-base sm:text-lg text-on-surface hover:text-primary transition-colors"
              >
                Ankit Gupta
              </Link>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1 mb-2.5">
                Solo developer and data analyst. Builds and reviews every calculator and guide on
                AllSmartCalculators.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={AUTHOR_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
                <Link
                  href="/author/ankit-gupta"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
                >
                  More from Ankit →
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Footer CTA */}
        <div className="mt-8 sm:mt-10 text-center">
          <p className="text-xs sm:text-sm text-on-surface-variant mb-3 sm:mb-4">
            Try the calculators mentioned in this article
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-primary-dim to-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Browse all calculators
          </Link>
        </div>

      </div>
    </div>
    </>
  );
}
