import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export default function BlogPostNotFound() {
  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-5 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors mb-6 sm:mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <GlassCard className="p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative">
            <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 text-primary/40 mx-auto mb-4" />
            <h1 className="font-headline font-black text-2xl sm:text-3xl md:text-4xl tracking-tighter mb-3">
              Article Not Found
            </h1>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-md mx-auto mb-6 sm:mb-8">
              This blog post doesn&apos;t exist or may have been removed. Browse the latest articles from our blog instead.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-br from-primary-dim to-primary text-white font-semibold shadow-glow-primary press"
              >
                All blog posts
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl glass glass-border text-on-surface font-semibold hover:bg-white/5 transition-colors"
              >
                Browse calculators
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
