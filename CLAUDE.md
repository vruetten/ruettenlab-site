# Instructions for agents working in `ruettenlab-site`

The WHOLISTIC lab website: an Astro static site, published with GitHub Pages at
https://www.wholisticlab.org. This repository is **public** (the account is on GitHub Free,
and Pages on Free serves only public repositories), so nothing private goes in it: no
correspondence, no prices, no personal contact details beyond what the site itself shows.

## How a change reaches the live site

- A push to `main` runs `.github/workflows/pages.yml`, which runs `npm ci` and
  `npm run build` and deploys `dist/` to Pages. A run took about a minute on 2026-10-07.
- A push to any other branch publishes nothing. `water-shimmer` is the working branch the
  local server usually runs; keep it level with `main` once work is published.
- `npm run build` ends with `scripts/check-weight.mjs`. If it fails, the deploy fails and
  the live site stays as it was. It allows JavaScript only on pages that move: the home
  page (the water) and the research thread pages.
- GitHub serves pages with `Cache-Control: max-age=600`, so a browser can show the old page
  for up to ten minutes after a deploy. Compare the `Last-Modified` header with the deploy
  time before diagnosing a "change that did not appear".

## Domain and paths

- `astro.config.mjs` sets `site: 'https://www.wholisticlab.org'` and `base: '/'`. Pages live
  at the root (`/news/`), and the local server is http://localhost:4321/. Build every
  internal link with `siteHref()` from `src/site.ts`; never write a path prefix by hand.
- The custom domain `www.wholisticlab.org` is stored in the repository's Pages settings
  (read it with `gh api repos/vruetten/ruettenlab-site/pages`), not in a `CNAME` file, so
  deploys keep it. HTTPS is enforced and the certificate is issued by GitHub.
- `http://wholisticlab.org` and the old address `https://vruetten.github.io/ruettenlab-site/`
  both redirect to `https://www.wholisticlab.org/` with the path kept (checked 2026-10-07).
- DNS is managed in Squarespace Domains (squarespace.com → Domains → wholisticlab.org → DNS).
  The custom records are four `A` records on `@` to 185.199.108.153, .109.153, .110.153 and
  .111.153; four `AAAA` records on `@` to 2606:50c0:8000::153 through 8003::153; `CNAME www`
  to `vruetten.github.io`; and the `TXT _github-pages-challenge-vruetten` record that keeps
  the domain verified on the GitHub account. Leave the "Email Security" preset (SPF, DMARC,
  DKIM saying the domain sends no mail) and the "Squarespace Domain Connect" preset alone.
- Changing `base` or the domain breaks every link on the old address at once. Ship such a
  change in the same push as the Pages setting change, never ahead of it.

## Journal

`journal/` holds one append-only entry per working session (rules in `journal/README.md`).
Add an entry at the end of a session that changed the site.

## Committing

The shell has no git identity configured. Commit as the repository's author:

```
git -c user.name="Virginie Ruetten" -c user.email="15912669+vruetten@users.noreply.github.com" commit ...
```

Never force-push. `originals/` is git-ignored and holds full-resolution source images
kept for reference on this Mac only, never published; it has no copy on GitHub.
`originals/princeton-campus-3840x2160.png` (14 MB) is the source of
`src/assets/news/princeton.jpg` and `public/backdrops/princeton.jpg`; resize from it when a
larger version is needed. `features.md` at the root is untracked as of 2026-10-07; ask
Virginie before committing it.

## Content

- News items live in `src/content/news/*.md`; the schema is in `src/content.config.ts`.
  The News page orders by date alone, newest first. An item with an `image` renders as a
  photo card; an item without one renders as a brief tile, and consecutive briefs share a
  grid cell two at a time (three when a run has odd length). A brief's `logo` names a PNG
  in `src/assets/news/logos/` with a transparent background; the page draws its shape in
  the text colour.
- The home page lists the ten newest items that are not `size: small`.
- A page gets the full-window photo backdrop with `backdrop: backdrops/<file>` in its
  front matter (see `src/pages/join.md`).
- The home-page water is `src/components/WaterSurface.astro` (WebGL2 with float textures).
  Its stars sit on `src/assets/koi-whirl.png`. Below 960 px wide the panel drops under the
  news list. Chrome pauses animation in a window that is behind another one, so test the
  canvas in a front window or in headless Chromium.
