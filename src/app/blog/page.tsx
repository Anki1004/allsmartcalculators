import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getStrapiImageUrl, StrapiPost } from '@/lib/strapi';
import GlassCard from '@/components/GlassCard';
import { Clock, User, ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog — CalcVerse',
  description: 'Tips, guides, and insights on finance, health, math, crypto, and more.',
};

const CATEGORY_COLORS: Record<string, string> = {
  Finance: 'text-primary bg-primary/10',
  Health: 'text-tertiary bg-tertiary/10',
  Math: 'text-secondary bg-secondary/10',
  Crypto: 'text-yellow-400 bg-yellow-400/10',
  Engineering: 'text-orange-400 bg-orange-400/10',
  'Daily Life': 'text-pink-400 bg-pink-400/10',
  Education: 'text-blue-400 bg-blue-400/10',
  Business: 'text-purple-400 bg-purple-400/10',
  General: 'text-on-surface-variant bg-white/5',
};

function PostCard({ post }: { post: StrapiPost }) {
  const imgUrl = post.coverImage ? getStrapiImageUrl(post.coverImage.url) : null;
  const categoryStyle = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS.General;
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <GlassCard className="h-full overflow-hidden hover:border-primary/20 transition-all duration-300">
        {imgUrl && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={imgUrl}
              alt={post.coverImage?.alternativeText ?? post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryStyle}`}>
              {post.category}
            </span>
            {post.showOnHome && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full text-yellow-400 bg-yellow-400/10">
                Featured
              </span>
            )}
          </div>
          <h2 className="font-headline font-bold text-lg text-on-surface leading-snug mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-on-surface-variant/60">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {post.metaAuthor ?? 'CalcVerse Team'}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime} min read
              </span>
            </div>
            <span>{date}</span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

export default async function BlogPage() {
  let posts: StrapiPost[] = [];
  try {
    posts = await getAllPosts();
  } catch {
    // Strapi offline or no posts yet
  }

  const featured = posts.filter((p) => p.showOnHome);
  const rest = posts.filter((p) => !p.showOnHome);

  return (
    <div className="pt-28 pb-20 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-3">Blog</p>
          <h1 className="font-headline font-black text-4xl md:text-6xl tracking-tighter text-on-surface mb-4">
            Tips & Insights
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            Practical guides on finance, health, math, and more — written to help you get more out of every calculation.
          </p>
        </div>

        {posts.length === 0 ? (
          <GlassCard className="p-16 text-center">
            <BookOpen className="w-12 h-12 text-primary/40 mx-auto mb-4" />
            <h2 className="font-headline font-bold text-xl text-on-surface mb-2">No posts yet</h2>
            <p className="text-sm text-on-surface-variant">
              Check back soon — we're working on the first articles.
            </p>
          </GlassCard>
        ) : (
          <>
            {/* Featured posts */}
            {featured.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xs font-bold tracking-widest uppercase text-primary mb-5">Featured</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featured.map((post) => <PostCard key={post.id} post={post} />)}
                </div>
              </div>
            )}

            {/* All posts */}
            {rest.length > 0 && (
              <div>
                <h2 className="text-xs font-bold tracking-widest uppercase text-primary mb-5">
                  {featured.length > 0 ? 'Latest' : 'All Posts'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => <PostCard key={post.id} post={post} />)}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
