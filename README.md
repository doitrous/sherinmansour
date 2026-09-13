# Dr. Sherin Mansour — website

Static bilingual (Arabic RTL / English LTR) landing page. No build step, no dependencies.

## Files
- `index.html` — the page (holds both language versions)
- `styles.css` — all styling, responsive
- `app.js` — language toggle, FAQ accordion, mobile menu
- `images/` — put the photos here (see below)

## Run / deploy
Open `index.html` in a browser, or drop the whole `site/` folder on any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any web server). Nothing to install.

Local preview:
```bash
cd site && python3 -m http.server 8080
```
then open http://localhost:8080

## Language
Starts in Arabic. The **EN / ع** button in the header flips language + direction (RTL↔LTR)
and remembers the choice (localStorage). Content for both languages lives in `index.html`
— edit each language's block when you change copy.

## Add the real photos
Drop these into `site/images/` (the page shows a labelled placeholder until each exists):
`doctor.webp`, `doctor-about.webp`, `face-before-after.webp`,
`lips-result-1.webp`, `lips-result-2.webp`, `lips-before-after-2.webp`.

## Still to fill in (search index.html for the brackets)
- Real Google reviews → replace the 3 sample cards and their `[اسم العميلة]` / `[Patient name]`.
- `[ساعات العمل]` / `[Opening hours]` in the footer.

## Map
The "Location" section embeds a keyless Google Map centered on the clinic coordinates
(`24.7955007, 46.6994551`, Al Falah, Riyadh) via `www.google.com/maps/embed?pb=...`.
To show the business pin + name card instead, open the clinic on Google Maps →
**Share → Embed a map**, copy that iframe's `src`, and paste it over both iframes in
`index.html` (there are two — Arabic and English; the Arabic one uses `!1sar`, English `!1sen`).

## Wired contacts
- Booking buttons → WhatsApp `wa.me/966501659014`
- Phone → `tel:+966501659014`
- Instagram → `@dr.sherin_mansour`
Update these in `index.html` if any detail changes.
