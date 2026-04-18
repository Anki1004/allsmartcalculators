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
        // Cosmic Glass Design System (from Stitch DESIGN.md)
        surface: '#080c25',
        'surface-dim': '#080c25',
        'surface-bright': '#232950',
        'surface-container-lowest': '#000000',
        'surface-container-low': '#0c112d',
        'surface-container': '#121735',
        'surface-container-high': '#181d3e',
        'surface-container-highest': '#1d2347',
        'surface-variant': '#1d2347',
        'surface-tint': '#bd9dff',

        primary: '#bd9dff',
        'primary-dim': '#8a4cfc',
        'primary-container': '#b28cff',
        'primary-fixed': '#b28cff',
        'primary-fixed-dim': '#a67aff',
        'on-primary': '#3c0089',
        'on-primary-container': '#2e006c',
        'inverse-primary': '#742fe5',

        secondary: '#53ddfc',
        'secondary-dim': '#40ceed',
        'secondary-container': '#00687a',
        'secondary-fixed': '#65e1ff',
        'secondary-fixed-dim': '#48d4f3',
        'on-secondary': '#004b58',
        'on-secondary-container': '#ecfaff',
        'on-secondary-fixed': '#003a45',
        'on-secondary-fixed-variant': '#005969',

        tertiary: '#9bffce',
        'tertiary-dim': '#58e7ab',
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

        'on-surface': '#e2e3ff',
        'on-surface-variant': '#a6a9c9',
        'on-background': '#e2e3ff',
        background: '#080c25',

        outline: '#707392',
        'outline-variant': '#424662',
        'inverse-surface': '#fbf8ff',
        'inverse-on-surface': '#505370',
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
      backdropBlur: {
        xs: '2px',
      },
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
