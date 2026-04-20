'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';
import NavCurrencyPicker from './NavCurrencyPicker';
import { useTheme } from '@/lib/theme-context';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/80 backdrop-blur-xl border-b border-white/5 shadow-ambient'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center shadow-glow-primary group-hover:scale-105 transition-transform">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 text-white"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="8" y1="6" x2="16" y2="6" />
              <line x1="8" y1="10" x2="10" y2="10" />
              <line x1="12" y1="10" x2="14" y2="10" />
              <line x1="8" y1="14" x2="10" y2="14" />
              <line x1="12" y1="14" x2="14" y2="14" />
              <line x1="8" y1="18" x2="10" y2="18" />
              <line x1="12" y1="18" x2="14" y2="18" />
            </svg>
          </div>
          <span className="font-headline text-2xl font-black tracking-tighter text-gradient">
            CalcVerse
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/categories"
            className="text-sm font-medium text-on-surface/80 hover:text-primary transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/trending"
            className="text-sm font-medium text-on-surface/80 hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
            Trending
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-on-surface/80 hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-on-surface/80 hover:text-primary transition-colors"
          >
            Blog
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <NavCurrencyPicker />

          <button
            aria-label="Toggle theme"
            onClick={toggle}
            className="p-2.5 rounded-xl glass glass-border hover:bg-white/5 transition-colors press"
          >
            {theme === 'dark'
              ? <Sun className="w-4 h-4 text-primary" />
              : <Moon className="w-4 h-4 text-primary" />
            }
          </button>

          <button
            aria-label="Search"
            onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
            className="p-2.5 rounded-xl glass glass-border hover:bg-white/5 transition-colors press"
          >
            <Search className="w-4 h-4 text-primary" />
          </button>
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl glass glass-border hover:bg-white/5 transition-colors press"
          >
            {mobileOpen ? (
              <X className="w-4 h-4 text-primary" />
            ) : (
              <Menu className="w-4 h-4 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-white/5">
          <nav className="flex flex-col p-6 gap-4">
            <Link
              href="/categories"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-on-surface hover:text-primary transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/trending"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-on-surface hover:text-primary transition-colors"
            >
              Trending
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-on-surface hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-on-surface hover:text-primary transition-colors"
            >
              Blog
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
