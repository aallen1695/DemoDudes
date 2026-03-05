# Demo Dudes Multi-Page Demo Site

Bootstrap-based, multi-page fictional site for Demo Dudes Inc. with a shared layout system.

## What was built

- Left vertical icon-first navigation
- Shared template injection via `assets/js/layout.js` (sidebar, header, footer)
- Modern brand theme using the provided palette
- Funnel flow: `vsl.html` -> `orderform.html` -> `upsell.html` -> `thank-you.html`
- Legal/compliance pages: privacy, CCPA/GDPR, do-not-sell
- Blog hub + 10 individual posts with CTA blocks on each post
- Contact and member login UI pages (demo only, non-functional)

## Step-by-step: run locally

1. From project root, run a static server:
   - `python3 -m http.server 8080`
2. Open `http://localhost:8080/index.html`.

## Update shared template in one place

- Edit `assets/js/layout.js` to change:
  - Sidebar nav links/icons
  - Global header action button
  - Footer links/text

All pages using `data-include` sections inherit those changes automatically.

## Replace branding assets

Current files are local placeholders:

- `assets/images/demo-dudes-logo.svg`
- `assets/images/demo-dudes-icon.svg`

To use your attached official assets, replace these files (or update image paths in `assets/js/layout.js` and `index.html`).

## Recommended software

- `python3` (quick static server)
- Optional: `prettier` for consistent HTML/CSS/JS formatting
- Optional: VS Code + Live Server extension for rapid page iteration
