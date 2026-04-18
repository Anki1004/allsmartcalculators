import Link from 'next/link';
import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-dim to-primary" />
              <span className="font-headline text-xl font-black tracking-tighter text-gradient">
                CalcVerse
              </span>
            </div>
            <p className="text-sm text-on-surface-variant max-w-xs mb-6">
              100+ beautifully crafted calculators for every life decision.
              Calculate anything. Beautifully.
            </p>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg glass glass-border flex items-center justify-center hover:bg-white/5 transition-colors press"
                >
                  <Icon className="w-4 h-4 text-primary" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Categories',
              links: [
                { label: 'Finance',     href: '/categories#finance' },
                { label: 'Health',      href: '/categories#health' },
                { label: 'Math',        href: '/categories#math' },
                { label: 'Crypto',      href: '/categories#crypto' },
                { label: 'Engineering', href: '/categories#engineering' },
              ],
            },
            {
              title: 'Explore',
              links: [
                { label: 'Trending',    href: '/trending' },
                { label: 'Categories',  href: '/categories' },
                { label: 'About',       href: '/about' },
                { label: 'Contact',     href: '/contact' },
              ],
            },
            {
              title: 'Legal',
              links: [
                { label: 'Privacy Policy',   href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Disclaimer',       href: '/disclaimer' },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold tracking-widest uppercase text-primary mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-on-surface-variant/60">
            © {new Date().getFullYear()} CalcVerse. All calculations made with care.
          </p>
          <p className="text-xs text-on-surface-variant/60 font-mono">
            v1.0.0 · Made with stars ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
