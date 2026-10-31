# Byte by Shubh

A responsive, animated personal tech/AI creator landing page built with Next.js App Router, TypeScript, CSS and Framer Motion.

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Before publishing

1. In `app/page.tsx`, replace the Instagram, YouTube and GitHub placeholder URLs in the `social-links` section with your actual profile URLs.
2. Update the metadata in `app/layout.tsx` if you want a different title or description.
3. Update copy, project status and experiment cards in `app/page.tsx` as your work evolves.
4. Deploy the project to Vercel by importing the repository. The default Next.js build settings are sufficient.

## Notes

- The live clock is rendered in India Standard Time.
- Animations respect the visitor's reduced-motion accessibility preference.
- Google Fonts are loaded from Google Fonts; system fallbacks remain available if the font service is blocked.
- No backend or database is required for this static landing page.
