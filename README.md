# Portfolio — Umair Rasheed

Single-page portfolio built with React 19 + Vite + Tailwind CSS v4.
Grayscale theme — black/gray in dark mode, white in light mode, toggle in
the top-right of the nav.

## Setup

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Structure

```
portfolio/
├── index.html          # entry HTML, fonts, meta tags
├── vite.config.js       # Vite + Tailwind v4 plugin
├── src/
│   ├── main.jsx          # React root
│   ├── App.jsx             # entire page: hero card, about, experience, skills, projects, contact
│   └── index.css            # theme tokens (CSS vars for light/dark) + Tailwind import
```

## Still needs your input

1. **Your photo** — `App.jsx` already imports `src/assets/avatar.jpg` and
   renders it in the hero circle. Just replace that file with your real
   photo, same filename (`avatar.jpg`) — no code changes needed. A gray
   placeholder image ships in this zip so the project builds out of the box;
   swap it out before deploying.
   (Note: the path must be imported like this, not referenced as a raw
   string like `"/assets/avatar.jpg"` — that string form only works for
   files in a top-level `public/` folder, not `src/`, and silently 404s.)
2. **GitHub / LinkedIn URLs** — fill in the `SOCIALS` object near the top of
   `App.jsx` (currently empty strings). Once filled, the icon buttons in the
   hero and the contact cards activate automatically — no other changes
   needed.
3. **Experience bullets** — the two roles in the `EXPERIENCE` array have
   placeholder lines (`// add 2-3 real achievements...`). Swap in real
   specifics and accurate dates.

## Deploy

Static Vite build — deploys straight to Vercel or Netlify with the Vite
framework preset, no server needed.
