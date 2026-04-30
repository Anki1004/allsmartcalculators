import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-12 sm:mt-16 md:mt-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <Link href="/" aria-label="AllSmartCalculators home" className="inline-block mb-4">
              {/* Light theme */}
              <Image
                src="/logo-full.png"
                alt="AllSmartCalculators.com"
                width={376}
                height={141}
                className="block dark:hidden h-14 sm:h-16 w-auto"
              />
              {/* Dark theme (white text variant) */}
              <Image
                src="/logo-full-dark.png"
                alt="AllSmartCalculators.com"
                width={376}
                height={141}
                className="hidden dark:block h-14 sm:h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-on-surface-variant max-w-xs">
              100+ beautifully crafted calculators for every life decision.
              Calculate anything. Beautifully.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: 'Categories',
              links: [
                { label: 'Finance',     href: '/finance' },
                { label: 'Health',      href: '/health' },
                { label: 'Math',        href: '/math' },
                { label: 'Crypto',      href: '/crypto' },
                { label: 'Engineering', href: '/engineering' },
              ],
            },
            {
              title: 'Explore',
              links: [
                { label: 'Trending',    href: '/trending' },
                { label: 'Categories',  href: '/categories' },
                { label: 'Blog',        href: '/blog' },
                { label: 'About',       href: '/about' },
                { label: 'Methodology', href: '/methodology' },
                { label: 'Contact',     href: '/contact' },
              ],
            },
            {
              title: 'Legal',
              links: [
                { label: 'Privacy Policy',   href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Disclaimer',       href: '/disclaimer' },
                { label: 'Author',           href: '/author/ankit-gupta' },
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

        <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-center md:text-left">
          <p className="text-[11px] sm:text-xs text-on-surface-variant/60">
            © {new Date().getFullYear()} AllSmartCalculator. All calculations made with care.
          </p>
          <p className="text-[11px] sm:text-xs text-on-surface-variant/60">
            Built by{' '}
            <a
              href="https://www.linkedin.com/in/ankit-gupta-data-analyst"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              Ankit Gupta
            </a>
            {' '}— say hi.
          </p>
        </div>
      </div>
    </footer>
  );
}
