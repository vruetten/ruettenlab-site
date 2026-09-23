# ruettenlab-site

The development site for the Princeton laboratory. The specification is `/Users/ruettenv/Documents/princeton/lab_website/HOW_WE_WORK.md`.

Astro 7.3.4, installed 2026-09-23. Content collections live in `src/content.config.ts` with the `glob` loader. The installed Astro skill names `src/content/` and `<ViewTransitions />`, which this project does not follow.

`npm run dev` serves `http://127.0.0.1:4321/ruettenlab-site/`. `npm run build` runs `scripts/check-weight.mjs` and fails when a page is over 30 KB of JavaScript, 20 KB of CSS, 120 KB of fonts, or 400 KB total, or when a page other than a research thread ships any JavaScript.

## Weight, measured 2026-09-23 from `npm run build`

Direction A, home page, before the volume label was centered: 0 bytes of JavaScript, 1000 bytes of CSS, 0 bytes of fonts, 1000 bytes total.

Direction B, home page: 0 bytes of JavaScript, 1119 bytes of CSS, 0 bytes of fonts, 1119 bytes total.

No typeface file is installed. Both directions use the system sans.

Direction A was shown without a microscopy volume. The first screen says "No volume yet".

Neither direction has been chosen. Both stylesheets load, and the header switches between them. The choice is stored in the browser. The same switch sets light or dark. With no stored color, the page follows the system.

## Not done yet

The GitHub repository is not created. `gh api user` on 2026-09-23 returned no plan name, so it is still unknown whether a private repository can publish Pages. The workflow in `.github/workflows/pages.yml` is ready. Publishing waits on two answers: whether the public preview may show `vms.ruetten@gmail.com` instead of `email@example.com`, and whether the repository may be public. DNS for `wholisticlab.org` is unchanged.

The checklist used for a later interface review is `web-interface-guidelines-2026-09-23.md`, saved from the upstream file on 2026-09-23.
