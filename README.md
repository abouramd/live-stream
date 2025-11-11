````markdown
# 🎬 Watch Live - Live Sports Streaming Platform

A modern, high-performance live sports streaming platform built with **Next.js 16**, **React 19**, **Shadcn/ui**, **Tailwind CSS**, and **GSAP animations**.

## ✨ Features

### 🎯 Core Features
- **Live Match Streaming** - Watch sports matches in real-time with multiple streaming sources
- **Multi-Source Support** - Automatic failover and choice of streaming providers
- **Sport Categories** - Filter matches by sport (football, basketball, tennis, etc.)
- **Search Functionality** - Find matches by title or teams
- **Dark Mode Support** - Built-in theme switching with next-themes

### 🎨 UI/UX Enhancements
- **Sticky Header Navigation** - Quick access to home, live matches, and GitHub
- **Hero Section** - Featured match display with call-to-action
- **Enhanced Match Cards** - Live status badges, team information, and source count
- **Skeleton Loaders** - Smooth loading states for better perceived performance
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### ✨ GSAP Animations
- **Page Transitions** - Smooth fade-in animations on route changes
- **Card Hover Effects** - Interactive lift and shadow effects
- **Stagger Animations** - Progressive element entrance animations
- **Live Badge Pulse** - Attention-grabbing pulse animation for live matches
- **Scroll Triggers** - Scroll-based animations for engagement
- **Hero Animations** - Coordinated animations for hero section elements

### ⚡ Performance Optimizations
- **Next.js Image Optimization** - Automatic WebP/AVIF conversion with lazy loading
- **Compression** - Gzip compression enabled
- **Minification** - SWC minification for smaller bundles
- **Static Generation** - Pre-rendered sport pages for instant loading
- **Incremental Static Regeneration (ISR)** - Stale-while-revalidate strategy

### 🔍 SEO & Metadata
- **Dynamic Metadata** - Page-specific titles and descriptions
- **Open Graph Tags** - Rich preview for social media sharing
- **Structured Data** - JSON-LD schema for search engines
- **Robots.txt** - Proper crawling directives
- **Sitemap** - Dynamic XML sitemap generation
- **Canonical URLs** - Prevent duplicate content issues

### ♿ Accessibility
- **WCAG 2.1 AA Compliant** - Full keyboard navigation support
- **Focus Indicators** - Clear focus states for all interactive elements
- **Semantic HTML** - Proper heading hierarchy and ARIA labels
- **Color Contrast** - Meets minimum WCAG AA standards

### 📱 PWA Support
- **Web Manifest** - Install as app capability
- **Offline Support** - Ready for service worker integration
- **App Icons** - Customizable icons for different platforms

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library with latest features |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **Shadcn/ui** | High-quality React components |
| **GSAP** | Professional animations |
| **next-themes** | Dark mode support |
| **TypeScript** | Type safety and DX |
| **Lucide React** | Beautiful icons |

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Bouramdane/watch-live.git
cd watch-live

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 📁 Project Structure

```
watch-live/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Homepage with hero section
│   ├── globals.css             # Global styles and animations
│   ├── sports/
│   │   └── [sportId]/
│   │       └── page.tsx        # Sport-specific matches page
│   ├── stream/
│   │   └── [matchId]/
│   │       └── page.tsx        # Stream player page
│   ├── sitemap.xml/
│   │   └── route.ts            # Dynamic sitemap generation
│   └── metadata.ts             # Shared metadata
│
├── components/
│   ├── header.tsx              # Sticky navigation header
│   ├── hero-section.tsx        # Featured match display
│   ├── match-card.tsx          # Match card with animations
│   ├── footer.tsx              # Enhanced footer with links
│   ├── skeleton-loaders.tsx    # Loading state components
│   ├── theme-provider.tsx      # Dark mode provider
│   ├── theme-toggle-button.tsx # Theme toggle control
│   └── ui/                     # Shadcn/ui components
│
├── hooks/
│   └── useGsap.ts              # GSAP animation hooks
│
├── lib/
│   ├── gsap-animations.ts      # Reusable GSAP functions
│   ├── api.ts                  # API integration
│   ├── types.ts                # TypeScript interfaces
│   └── utils.ts                # Utility functions
│
├── public/
│   ├── robots.txt              # SEO robots.txt
│   └── site.webmanifest        # PWA manifest
│
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## 🚀 Getting Started

Run the development server and visit [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

### Key Features to Explore

1. **Homepage** - See the hero section with featured matches and animations
2. **Match Cards** - Hover to see lift and shadow animations
3. **Navigation** - Use the sticky header to navigate
4. **Dark Mode** - Toggle theme in the top-right corner
5. **Responsive Design** - Resize browser to see mobile layout

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)

## 🚀 Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

```bash
npm run build
npm start
```

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Built by [Abdelhay Bouramdane](https://github.com/abouramd)

---

**Built with ❤️ for sports enthusiasts worldwide**
````
