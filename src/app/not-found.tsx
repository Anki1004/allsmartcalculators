import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <GlassCard className="p-10 md:p-16 max-w-xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
        <div className="relative">
          <p className="font-mono text-8xl md:text-9xl font-black text-gradient mb-4">404</p>
          <h1 className="font-headline font-black text-2xl md:text-3xl tracking-tighter mb-3">
            Calculator Not Found
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant mb-8">
            The equation didn't balance. This page doesn't exist.
          </p>
          <Link
            href="/"
            className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-br from-primary-dim to-primary text-white font-semibold shadow-glow-primary press"
          >
            Back to Home
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
