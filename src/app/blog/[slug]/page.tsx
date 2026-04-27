import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts, getStrapiImageUrl } from '@/lib/strapi';
import GlassCard from '@/components/GlassCard';
import { Clock, User, ArrowLeft, Calendar } from 'lucide-react';

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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://allsmartcalculator.tech';
    const canonicalUrl = post.linkCanonical ?? `${siteUrl}/blog/${post.slug}`;
    const title = post.pageTitle ?? post.title;
    const description = post.metaDescription ?? post.excerpt;
    const coverImg = post.coverImage ? getStrapiImageUrl(post.coverImage.url) : undefined;
    const ogImg = post.metaOgImage ?? coverImg;
    const twitterImg = post.metaTwitterImage ?? coverImg;

    return {
      title: `${title} — AllSmartCalculator`,
      description,
      keywords: post.metaKeywords ?? undefined,
      authors: [{ name: post.metaAuthor ?? 'AllSmartCalculator Team' }],
      robots: post.metaRobots ?? 'index, follow',
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: post.metaOgTitle ?? title,
        description: post.metaOgDescription ?? description,
        type: (post.metaOgType as 'article') ?? 'article',
        url: post.metaOgUrl ?? canonicalUrl,
        siteName: post.metaOgSiteName ?? 'AllSmartCalculator',
        publishedTime: post.publishedAt,
        ...(ogImg && { images: [{ url: ogImg, width: 1200, height: 630, alt: title }] }),
      },
      twitter: {
        card: (post.metaTwitterCard as 'summary_large_image') ?? 'summary_large_image',
        title: post.metaTwitterTitle ?? title,
        description: post.metaTwitterDescription ?? description,
        site: post.metaTwitterSite ?? '@AllSmartCalculator',
        ...(twitterImg && { images: [twitterImg] }),
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  const imgUrl = post.coverImage ? getStrapiImageUrl(post.coverImage.url) : null;
  const displayDate = post.publishedOn ?? post.publishedAt;
  const date = new Date(displayDate).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  const jsonLd = post.customSchema ?? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.pageTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    author: { '@type': 'Person', name: post.metaAuthor ?? 'AllSmartCalculator Team' },
    datePublished: post.publishedAt,
    ...(imgUrl && { image: imgUrl }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
              {post.metaAuthor ?? 'AllSmartCalculator Team'}
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
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </GlassCard>

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
