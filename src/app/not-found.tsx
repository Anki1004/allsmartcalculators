import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-5 py-20">
      <GlassCard className="p-8 sm:p-10 md:p-16 max-w-xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
        <div className="relative">
          <p className="font-mono text-7xl sm:text-8xl md:text-9xl font-black text-gradient mb-3 sm:mb-4">404</p>
          <h1 className="font-headline font-black text-xl sm:text-2xl md:text-3xl tracking-tighter mb-2 sm:mb-3">
            Page Not Found
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant mb-6 sm:mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-br from-primary-dim to-primary text-white font-semibold shadow-glow-primary press"
            >
              Back to Home
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
  );
}
