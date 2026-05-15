/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'calcverse-strapi.onrender.com', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
    ],
  },
  compiler: {
    // Strip console.log/info/warn in production; keep console.error so
    // genuine failures still surface in browser devtools.
    removeConsole: {
      exclude: ['error'],
    },
  },
  experimental: {
    // Tree-shake heavy icon and util libs so unused exports don't ship.
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
};

module.exports = nextConfig;
