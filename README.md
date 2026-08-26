# Wedding Invitation Cards

Digital invitation cards built for Anas Hussain & Aiman Farrukh, August 2026.
Four independent cards served from one Next.js app, routed by hostname.

## The four cards

| Route | Domain | Card |
|---|---|---|
| `/ember` | anas-aiman-walima | Groom's Walima |
| `/baraat` | anas-aiman-baraat | Groom's Baraat |
| `/bride/wedding` | aiman-anas-baraat | Bride's Baraat |
| `/bride/walima` | aiman-anas-walima | Bride's Walima |

## How the routing works

Host-based rewrites live in `next.config.mjs` under **`beforeFiles`**.
This matters: `afterFiles` never fires when `/` already matches a page, so the
rewrites silently do nothing. If you reuse this, keep them in `beforeFiles`.

## Structure

- `app/EmberCard.js` / `WalimaCard.js` — Walima cards (share the `.ember` CSS block)
- `app/BaraatCard.js` / `BrideWeddingCard.js` — Baraat cards (share the `.baraat` CSS block)
- `app/BrideWalimaCard.js` — bride's Walima, composed from EmberCard with names reordered
- `app/countdown.js` — countdown, "today is the day", and post-event states
- `app/globals.css` — all styling. `.ember` and `.baraat` are the two design systems.

Content is independent per file, but **CSS is shared in pairs**. Changing an
`.ember` rule affects both Walima cards; `.baraat` affects both Baraat cards.

## Countdown states

Each card moves through four states driven by two timestamps:

```js
const TARGET_ISO = "2026-08-22T20:30:00+05:00";  // event start
const OVER_ISO   = "2026-08-23T00:00:00+05:00";  // rollover to thank-you
```

before → counting down · on the day → "Today is the day" · during → live
· after `OVER_ISO` → thank-you message.

## Notes for reuse

- Route-scoped icons go in `app/<route>/icon.png`. Do **not** add a root
  `app/favicon.ico`, it gets injected into every route and overrides them.
- Audio: `public/nasheed.mp3` (Walima), `public/baraat-audio.mp3` (Baraat).
- Gate images are real generated images, not CSS. `backface-visibility: hidden`
  breaks the gate opening past 90 degrees, so it is deliberately not set.

## Deploy

```bash
npx vercel@latest deploy --prod --yes
npx vercel@latest alias set <deployment-url> <domain>.vercel.app
```

All four domains alias to the same deployment.
