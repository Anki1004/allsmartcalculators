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
    const title = `${post.seoTitle ?? post.title} — CalcVerse`;
    const description = post.seoDescription ?? post.excerpt;
    const imgUrl = post.coverImage ? getStrapiImageUrl(post.coverImage.url) : undefined;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://calcverse.app';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `${siteUrl}/blog/${post.slug}`,
        publishedTime: post.publishedAt,
        authors: [post.author],
        ...(imgUrl && { images: [{ url: imgUrl, width: 1200, height: 630, alt: post.title }] }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(imgUrl && { images: [imgUrl] }),
      },
      alternates: {
        canonical: `${siteUrl}/blog/${post.slug}`,
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
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="pt-28 pb-20 px-5 md:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Cover image */}
        {imgUrl && (
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
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
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-primary bg-primary/10">
              {post.category}
            </span>
            {post.featured && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full text-yellow-400 bg-yellow-400/10">
                Featured
              </span>
            )}
          </div>
          <h1 className="font-headline font-black text-3xl md:text-5xl tracking-tighter text-on-surface mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-5 text-sm text-on-surface-variant/60 pb-6 border-b border-white/5">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </span>
          </div>
        </div>

        {/* Content */}
        <GlassCard className="p-6 md:p-10">
          <div className="prose prose-invert prose-sm md:prose-base max-w-none
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
        <div className="mt-10 text-center">
          <p className="text-sm text-on-surface-variant mb-4">
            Try the calculators mentioned in this article
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-dim to-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Browse all calculators
          </Link>
        </div>

      </div>
    </div>
  );
}
