/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        'surface-dim': 'var(--color-surface-dim)',
        'surface-bright': 'var(--color-surface-bright)',
        'surface-container-lowest': 'var(--color-surface-container-lowest)',
        'surface-container-low': 'var(--color-surface-container-low)',
        'surface-container': 'var(--color-surface-container)',
        'surface-container-high': 'var(--color-surface-container-high)',
        'surface-container-highest': 'var(--color-surface-container-highest)',
        'surface-variant': 'var(--color-surface-variant)',
        'surface-tint': 'var(--color-surface-tint)',

        primary: 'var(--color-primary)',
        'primary-dim': 'var(--color-primary-dim)',
        'primary-container': '#b28cff',
        'primary-fixed': '#b28cff',
        'primary-fixed-dim': '#a67aff',
        'on-primary': '#3c0089',
        'on-primary-container': '#2e006c',
        'inverse-primary': '#742fe5',

        secondary: 'var(--color-secondary)',
        'secondary-dim': 'var(--color-secondary-dim)',
        'secondary-container': '#00687a',
        'secondary-fixed': '#65e1ff',
        'secondary-fixed-dim': '#48d4f3',
        'on-secondary': '#004b58',
        'on-secondary-container': '#ecfaff',
        'on-secondary-fixed': '#003a45',
        'on-secondary-fixed-variant': '#005969',

        tertiary: 'var(--color-tertiary)',
        'tertiary-dim': 'var(--color-tertiary-dim)',
        'tertiary-container': '#69f6b8',
        'tertiary-fixed': '#69f6b8',
        'tertiary-fixed-dim': '#58e7ab',
        'on-tertiary': '#006443',
        'on-tertiary-container': '#005a3c',
        'on-tertiary-fixed': '#00452d',
        'on-tertiary-fixed-variant': '#006544',

        error: '#ff6e84',
        'error-dim': '#d73357',
        'error-container': '#a70138',
        'on-error': '#490013',
        'on-error-container': '#ffb2b9',

        'on-surface': 'var(--color-on-surface)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        'on-background': 'var(--color-on-background)',
        background: 'var(--color-background)',

        outline: 'var(--color-outline)',
        'outline-variant': 'var(--color-outline-variant)',
        'inverse-surface': 'var(--color-inverse-surface)',
        'inverse-on-surface': 'var(--color-inverse-on-surface)',
      },
      fontFamily: {
        headline: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        label: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'count-up': 'count-up 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'count-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'glow-primary': '0 0 40px rgba(189, 157, 255, 0.3)',
        'glow-secondary': '0 0 40px rgba(83, 221, 252, 0.3)',
        'ambient': '0 30px 60px rgba(0, 0, 0, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
