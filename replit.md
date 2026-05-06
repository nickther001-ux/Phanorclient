# Phanor Distribution Inc.
Premium meat & seafood distribution digital flagship for B2B (restaurants/markets) and B2C (households) clients in Montreal.

## Run & Operate
- `npm run dev` — start Vite dev server on port 5000
- `npm run build` — production build
- `npm run start` — vite preview on port 5000 (production)

## Stack
- React 18 + TypeScript
- Vite 6 (port 5000)
- React Router v6
- Framer Motion (animations)
- Lucide React (icons)
- Tailwind CSS v4 (configured via vite plugin)
- Google Fonts: Bebas Neue, Montserrat, Roboto

## Where things live
- `src/App.tsx` — router entry point, wraps tree in `<LangProvider>`
- `src/pages/` — page components (Home, Shop, BookHonors, Logistics, About)
- `src/components/` — shared components (Navbar, Footer, PhanorAI widget)
- `src/context/LangContext.tsx` — FR/EN language context (`useLang()` hook)
- `src/translations.ts` — all FR + EN string keys (`TranslationKey` type)
- `src/index.css` — global styles + CSS variables + `.form-label`, `.form-input`, `.page-top`, `.gold-rule`
- `public/logo.png` — Crown & Bull logo

## Architecture decisions
- Single-page app (React Router) — no backend yet; forms and orders are UI-only stubs
- Tailwind CSS v4 used via Vite plugin (not PostCSS config); spacing utilities supplement with explicit inline styles for reliability
- CSS custom properties for brand tokens: `--onyx`, `--gold`, `--white`; mirrored as Tailwind `@theme` vars
- `<main style={{ paddingTop: '5.5rem' }}>` in App.tsx handles global navbar clearance — do NOT add per-page top padding
- Bilingual system: `LangContext` holds `lang` state; `t(key)` resolves from `translations.ts`; toggle lives in Navbar (FR | EN pill)
- Max-width `1200px` on all content wrappers; `margin: 0 auto` for centering on wide screens
- Framer Motion for all scroll-triggered animations and page transitions
- PhanorAI widget is a client-side calculator (no API calls required)

## Product
- **Home** — cinematic hero, Phanor Standard 3-column features, Sovereign Circle 2-col referral grid, SMS Drop signup (centered)
- **Shop** — toggleable B2C bundles / B2B wholesale cases with FAIBLE STOCK badges
- **Book Honors** — luxury catering inquiry form (gold borders, high-contrast labels)
- **Logistics** — cold chain 4-column pillars, 50/50 CSS grid zones + map placeholder
- **About** — Widler Junior Phanor origin story, stats row, sticky visual column
- **Phanor AI Widget** — floating consumption calculator + bundle generator

## User preferences
- French primary language, English secondary (FR|EN toggle in navbar)
- No emojis in the UI
- "Industrial-Luxury" aesthetic: Onyx Black, Sovereign Gold, Architect White
- Brand: Crown & Bull logo mark

## Gotchas
- Logo file is `/public/logo.png` — import as `/logo.png` in React
- Port must be 5000 for Replit webview
- Tailwind v4 uses `@import "tailwindcss"` syntax in CSS, not v3 directives
- `.page-top` CSS class applies `padding-top: 7rem` on sub-pages (not needed on Home, which uses `h-[100dvh]`)

## Pointers
- Brand palette: #1A1A1A (onyx), #C5A059 (gold), #F5F5F5 (white)
- Contact: 438-373-7253 | feedme.meat01@gmail.com | Montreal, QC
