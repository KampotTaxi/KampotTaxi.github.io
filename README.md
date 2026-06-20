# Kampot Taxi by Tha

Static multi-page GitHub Pages website for Kampot Taxi by Tha, a private taxi and driver service based in Kampot, Cambodia.

This is intentionally a multi-page route catalog, not a single-page site.

## Open locally

Open `index.html` directly in a browser. The site is static and does not require a server.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. In GitHub, open **Settings > Pages**.
3. Select **Deploy from a branch**.
4. Choose the `main` branch and `/root`.
5. Save and wait for GitHub Pages to publish.

The site uses relative paths for CSS, JavaScript, route pages, and assets.

## Update route prices

Route source data lives in `data/routes.js`. Static route cards and detail pages are generated from the same route data used by this build. If prices change, update `data/routes.js` and the visible static HTML pages, or rerun the local generator at `tools/generate-site.mjs`.

## Update contact numbers

Update WhatsApp and Telegram values in:

- `tools/generate-site.mjs`
- `script.js`
- `data/routes.js` only if route message titles change

Current values:

- WhatsApp display: `012960940`
- WhatsApp deep link number: `+85512960940`
- Telegram display: `0964800081`

Do not invent a Telegram username.

## Vehicle photos

The expected image paths are:

- `assets/images/kampot-taxi-van-front.jpg`
- `assets/images/kampot-taxi-van-scenic.jpg`
- `assets/images/kampot-taxi-suv-highlander.jpg`

The photos were not found locally during this rebuild, so the site uses styled photo placeholders that reference these paths. Add the real vehicle photos with those exact filenames when available.

## Domain

Preferred future domain: kampottaxibytha.com, pending availability and purchase.

After the domain is purchased/configured, update:

- Canonical URLs in generated HTML
- `robots.txt`
- `sitemap.xml`

## Backend

Version 1 has no backend and no data storage. Booking requests open WhatsApp. Telegram is shown as a secondary contact method.

If future backend work is requested, prefer Parse on Back4App: https://www.back4app.com.
