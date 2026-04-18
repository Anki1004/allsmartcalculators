# CalcVerse

> 100+ premium calculators in a cosmic glassmorphism design. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ What's Inside

- **100+ calculators** across 8 categories (Finance, Health, Math, Crypto, Engineering, Daily Life, Education, Business)
- **Fully template-driven** — add a new calculator in 5 minutes by writing a config object
- **Premium Cosmic Glass design** — glassmorphism, aurora backgrounds, animated gradients, grain texture
- **Fully responsive** — mobile-first, works from 375px to 4K
- **SEO-optimized** — each calculator gets its own static page with metadata
- **Zero runtime dependencies** on calculations — everything is pure TypeScript

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

## 🏗️ Project Structure

```
calcverse/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with aurora background
│   │   ├── page.tsx                # Homepage
│   │   ├── globals.css             # Cosmic Glass CSS system
│   │   ├── not-found.tsx           # 404 page
│   │   ├── about/page.tsx          # About page
│   │   ├── categories/page.tsx     # All calculators grouped
│   │   ├── trending/page.tsx       # Leaderboard
│   │   └── [category]/
│   │       └── [slug]/
│   │           └── page.tsx        # Dynamic calculator page
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── GlassCard.tsx
│   │   ├── SliderInput.tsx
│   │   ├── ResultDisplay.tsx
│   │   ├── CalculatorEngine.tsx    # Main reusable calculator
│   │   ├── CalculatorCard.tsx
│   │   └── DonutChart.tsx
│   └── lib/
│       ├── utils.ts
│       ├── calculator-types.ts     # TypeScript types
│       ├── calculator-registry.ts  # Combines all calculators
│       └── calculators/
│           ├── finance.ts          # 20 finance calculators
│           ├── health.ts           # 15 health calculators
│           ├── math.ts             # 15 math calculators
│           ├── crypto.ts           # 10 crypto calculators
│           ├── engineering.ts      # 10 engineering calculators
│           ├── daily-life.ts       # 10 daily-life calculators
│           ├── education.ts        # 10 education calculators
│           └── business.ts         # 10 business calculators
├── package.json
├── tailwind.config.js              # Cosmic Glass design tokens
├── tsconfig.json
└── next.config.js
```

## ➕ Adding a New Calculator

Adding a calculator is a 3-step, 5-minute process.

### 1. Open the category file

For a finance calculator, open `src/lib/calculators/finance.ts`.

### 2. Add a config object

```typescript
{
  slug: 'my-new-calculator',
  name: 'My New Calculator',
  category: 'finance',
  icon: 'DollarSign',        // any lucide-react icon name
  description: 'What this calculator does.',
  trending: true,            // optional
  usageCount: 1000,          // optional, for sorting
  chartType: 'donut',        // 'donut' | 'bar' | 'line' | 'none'

  inputs: [
    {
      key: 'amount',
      label: 'Amount',
      type: 'slider',
      min: 0,
      max: 100000,
      step: 100,
      default: 1000,
      prefix: '$',
      color: 'primary',
    },
    // ... more inputs
  ],

  outputs: [
    {
      key: 'result',
      label: 'Result',
      prefix: '$',
      primary: true,          // main display
      color: 'white',
    },
    // ... more outputs
  ],

  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    return {
      result: amount * 1.1,
    };
  },

  formula: 'result = amount × 1.1',    // optional
  faqs: [                              // optional
    { q: 'What is this?', a: 'A test.' },
  ],
}
```

### 3. That's it!

The calculator is automatically:
- Listed on the homepage (if trending)
- Shown in its category
- Given a dedicated page at `/finance/my-new-calculator`
- Indexed for search
- SEO-optimized

## 🎨 Design System

The design system is called **Cosmic Glass** — a hybrid of glassmorphism and neumorphism with an aurora gradient background.

### Key tokens (from `tailwind.config.js`)

| Token | Value | Usage |
|-------|-------|-------|
| `surface` | `#080c25` | Main background |
| `primary` | `#bd9dff` | Primary accent (violet) |
| `primary-dim` | `#8a4cfc` | Deeper violet for gradients |
| `secondary` | `#53ddfc` | Cyan accent |
| `tertiary` | `#9bffce` | Mint/green accent |

### Typography

- **Display**: Space Grotesk (tight tracking, black weight)
- **Body**: Inter
- **Mono/Numbers**: JetBrains Mono

### Signature effects

- **Aurora background** — two floating colored orbs with blur
- **Cosmic grain** — SVG noise overlay at 4% opacity
- **Glass cards** — `bg-white/[0.03]` + `backdrop-blur-xl`
- **Ghost borders** — top-left gradient highlight catches "specular light"
- **Gradient borders** — `linear-gradient(#0c112d, #0c112d) padding-box, linear-gradient(135deg, #8a4cfc, #53ddfc) border-box`

## 🚢 Deployment

### Vercel (recommended, zero config)

```bash
npm i -g vercel
vercel
```

### Other platforms

```bash
npm run build
npm run start
```

Outputs a fully static site (all 100+ calculator pages pre-rendered) — perfect for Cloudflare Pages, Netlify, or any static host.

## 📈 SEO Strategy

Each calculator page:
- Gets its own URL: `/{category}/{slug}`
- Generates unique `<title>` and `<meta description>`
- Is pre-rendered at build time (`generateStaticParams`)
- Gets structured data (add JSON-LD in the dynamic page if desired)

**Recommended next steps for 50K+ organic traffic:**
1. Add FAQ schema (JSON-LD) to each calculator page
2. Write 500-1000 word educational content per calculator below the tool
3. Create a sitemap.xml (Next.js does this automatically via `app/sitemap.ts`)
4. Submit to Google Search Console
5. Build backlinks from finance/health blogs

## 📝 License

MIT — do whatever you want with it.

## ⭐ Built with

- [Next.js 14](https://nextjs.org/) — App Router + Server Components
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Recharts](https://recharts.org/) — Chart visualizations
- [Lucide React](https://lucide.dev/) — Icon library
- [Framer Motion](https://www.framer.com/motion/) — Animation library

---

**Design System**: Cosmic Glass · **Built by**: You. **Built on**: The Stitch design by Google + Claude.
