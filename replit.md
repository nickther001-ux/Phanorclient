# Phanor Distribution Inc.
Premium meat & seafood distribution digital flagship for B2B (restaurants/markets) and B2C (households) clients in Montreal.

## Run & Operate
- `npm run dev` — start both Vite (port 5000) + Express API (port 3001) via concurrently
- `npm run build` — TypeScript check + Vite production build
- `npm run start` — production preview (Vite + Express concurrently)
- Required secrets: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`
- Optional secrets: `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

## Stack
- React 18 + TypeScript (Vite 6, port 5000)
- React Router v6
- Framer Motion (animations), Lucide React (icons)
- Tailwind CSS v4 (Vite plugin)
- Google Fonts: Bebas Neue, Montserrat, Roboto
- Leaflet + react-leaflet v4 (Logistics delivery map)
- **i18next + react-i18next** — bilingual FR/EN with localStorage persistence
- **Express 5** backend on port 3001 (proxied via Vite `/api/*`)
- **Replit PostgreSQL** — tables: products, orders, users, admins
- **bcrypt + JWT** — admin authentication (8h token, signed with SESSION_SECRET)
- **Stripe SDK** — webhook handler ready, activate with STRIPE_SECRET_KEY
- **Cloudinary** — direct frontend upload (unsigned preset), activate with VITE_CLOUDINARY_* vars

## Where things live
- `src/App.tsx` — router; `/admin` is outside the Navbar/Footer wrapper
- `src/pages/` — Home, Shop, BookHonors, Logistics, About, **Admin**
- `src/components/` — Navbar, Footer, DeliveryMap, PhanorAI
- `src/context/LangContext.tsx` — `useLang()` hook backed by i18next (same API, all pages unchanged)
- `src/i18n.ts` — i18next config (LanguageDetector, localStorage key: `phanor_lang`)
- `src/locales/fr.json` + `src/locales/en.json` — all translation strings
- `src/translations.ts` — kept for `TranslationKey` TypeScript type only
- `server/index.ts` — Express entry, mounts all routes
- `server/db.ts` — pg Pool + `initDb()` (creates tables + seeds admin on first boot)
- `server/middleware/auth.ts` — `requireAuth` middleware + `signToken()`
- `server/routes/` — auth, products, orders, webhooks

## Architecture decisions
- `LangContext` wraps i18next internally — zero changes needed to page components; same `useLang()` / `t(key)` API
- Express backend runs alongside Vite dev server; Vite proxies `/api/*` → `http://localhost:3001`
- Admin is seeded automatically on startup from `ADMIN_EMAIL` + `ADMIN_PASSWORD` env vars (only if no admin row exists)
- Stripe webhook requires raw body — mounted before `express.json()` using `express.raw()`
- Cloudinary upload is direct from browser (XHR with progress) using unsigned preset — no file goes through the backend
- `/admin` route excluded from public Navbar/Footer layout via outer `<Routes>` wrapper in App.tsx
- Max-width `1200px` on all content wrappers; `<main style={{ paddingTop: '5.5rem' }}>` handles navbar clearance globally

## Product
- **Home** — cinematic hero, Phanor Standard 3-col features, Sovereign Circle referral grid, SMS Drop signup
- **Shop** — B2C / B2B visual selector cards; product data currently static (will pull from `/api/products`)
- **Traiteur (BookHonors)** — luxury catering inquiry form
- **Logistics** — cold chain pillars, delivery zones + live Leaflet map (CartoDB dark tiles)
- **About** — origin story, stats, sticky visual column
- **Admin (`/admin`)** — JWT-protected dashboard: product CRUD + Cloudinary image upload with progress bar, order management with status control
- **PhanorAI** — floating consumption calculator + bundle generator (client-side)

## User preferences
- French primary language, English secondary (FR|EN toggle in navbar, persisted to localStorage)
- No emojis in the UI
- "Industrial-Luxury" aesthetic: Onyx Black (#1A1A1A), Sovereign Gold (#C5A059), Architect White (#F5F5F5)
- Brand: Crown & Bull logo mark

## Gotchas
- Logo: `/public/logo.png` → import as `/logo.png` in React
- Port 5000 required for Replit webview; API on 3001 (never exposed directly)
- Tailwind v4: `@import "tailwindcss"` syntax (not v3 directives)
- Tailwind v4 responsive utilities (`md:flex`) unreliable — use explicit CSS `@media` in `index.css` or inline `style={{}}`
- tsconfig.json `"include": ["src"]` only — server files typed by tsx at runtime, not tsc build
- pg requires `ssl: { rejectUnauthorized: false }` for Replit's hosted PostgreSQL

## Pointers
- Brand palette: #1A1A1A (onyx), #C5A059 (gold), #F5F5F5 (white)
- Contact: 438-373-7253 | feedme.meat01@gmail.com | Montreal, QC
- Stripe setup: dashboard.stripe.com → Developers → Webhooks → add endpoint `https://your-domain/api/webhooks/stripe`
- Cloudinary setup: cloudinary.com → Settings → Upload → Upload presets → Add unsigned preset
