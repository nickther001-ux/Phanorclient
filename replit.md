# Phanor Distribution Inc.
Premium meat & seafood distribution digital flagship for B2B (restaurants/markets) and B2C (households) clients in Montreal.

## Run & Operate
- `npm run dev` — start Vite dev server on port 5000
- `npm run build` — production build

## Stack
- React 18 + TypeScript
- Vite 6 (port 5000)
- React Router v6
- Framer Motion (animations)
- Lucide React (icons)
- Tailwind CSS v4 (configured via vite plugin)
- Google Fonts: Bebas Neue, Montserrat, Roboto

## Where things live
- `src/App.tsx` — router entry point
- `src/pages/` — page components (Home, Shop, BookHonors, Logistics, About)
- `src/components/` — shared components (Navbar, Footer, PhanorAI widget)
- `src/index.css` — global styles + CSS variables
- `public/logo.png` — Crown & Bull logo
- `attached_assets/` — original uploaded assets

## Architecture decisions
- Single-page app (React Router) — no backend yet; forms and orders are UI-only stubs
- Tailwind CSS v4 used via Vite plugin (not PostCSS config)
- CSS custom properties for brand tokens: --onyx, --gold, --white
- Framer Motion for all scroll-triggered animations and page transitions
- PhanorAI widget is a client-side calculator (no API calls required)

## Product
- **Home** — cinematic hero, Phanor Standard features, Sovereign Circle referral, SMS Drop signup
- **Shop** — toggleable B2C bundles / B2B wholesale cases with FAIBLE STOCK badges
- **Book Honors** — luxury catering inquiry form
- **Logistics** — cold chain transparency + Montreal delivery zones (1–5)
- **About** — Widler Junior Phanor origin story
- **Phanor AI Widget** — floating consumption calculator + bundle generator

## User preferences
- French primary language, English for brand positioning
- No emojis in the UI
- "Industrial-Luxury" aesthetic: Onyx Black, Sovereign Gold, Architect White
- Brand: Crown & Bull logo mark

## Gotchas
- Logo file is `/public/logo.png` — import as `/logo.png` in React
- Port must be 5000 for Replit webview
- Tailwind v4 uses `@import "tailwindcss"` syntax in CSS, not v3 directives

## Pointers
- Brand palette: #1A1A1A (onyx), #C5A059 (gold), #F5F5F5 (white)
- Contact: 438-373-7253 | feedme.meat01@gmail.com | Montreal, QC
