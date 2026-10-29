# Mira Dental Studio — concept website

Example site for the **Standard** web package (up to 5 pages, booking form, FAQ, opt-in form).
Mira Dental Studio is a fictional clinic in Almaty; all names, numbers and reviews are invented.

React 19 · Vite · TypeScript · Tailwind CSS 4 · React Router. No backend.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, build, prerender every route into dist/
npm run preview    # serve dist/
```

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, trust row, featured services, studio banner, before/after, team, testimonials, FAQ, opt-in |
| `/services` | 6 services with duration and "from" price, insurance note, FAQ |
| `/services/:slug` | Service detail: description, steps, what's included, price card |
| `/team` | 4 dentists with bio modals, studio photos, reviews |
| `/results` | 4 draggable before/after sliders (SVG illustrations), reviews |
| `/contact` | 4-step booking with mocked schedule and `.ics` download, address, hours, map, FAQ |

## Where things live

- **Text (EN/RU):** `src/i18n/en.ts` and `src/i18n/ru.ts`. Every visible string is there.
- **Contact details, hours, map pin, site URL:** `src/config.ts`.
- **Services (price, visit length, photo):** `src/data/services.ts`. **Team:** `src/data/team.ts`.
- **Brand tokens (colours, fonts):** `@theme` in `src/index.css`.
- **Mocked schedule:** `src/lib/schedule.ts` (stable per day, closed Sundays, lunch 13–14, ~40% booked).

## Images

Photos live in `public/images/` (hero, clinic-1..3, team-1..4, service-whitening/aligners/implants,
banner-wide, og). After adding or replacing one, run:

```bash
npm run images
```

This writes responsive sizes to `public/images/r/`, `src/data/image-sizes.json`, `public/og.jpg`
and the PNG favicons. Veneers and kids dentistry have no photo, so they use an illustrated panel.

## Fonts

Newsreader (headings) and Instrument Sans (body) are self-hosted via Fontsource. Neither has
Cyrillic, so Russian text falls back to Literata and Golos Text; those files load only on RU pages.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project**, import the repo. Vercel detects Vite; keep the defaults
   (build `npm run build`, output `dist`).
3. Deploy. Every route is prerendered to its own `index.html`; `vercel.json` adds the SPA
   fallback rewrite and long-cache headers for `/assets` and `/images`.
4. If the domain is not `mira-dental-jade.vercel.app`, change `SITE_URL` in `src/config.ts`
   (canonical URLs, Open Graph images and `sitemap.xml` use it), then redeploy.

Or from the terminal: `npx vercel` (preview) and `npx vercel --prod`.
