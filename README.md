# Wingo IB landing (design draft)

A design draft of the landing page each Wingo Markets IB (introducing broker) gets for their own audience. The page is in Persian, right to left, and written in the IB's own voice. Built with Vite, React, Tailwind CSS v4 and `lucide-react` icons. Animation uses GSAP + ScrollTrigger with Lenis smooth scrolling, the same motion setup as the trick-or-trade campaign (`src/motion/`).

The page has a light and a dark theme. It follows the visitor's system setting until they use the switch in the header; their choice is then remembered in the browser. With "reduce motion" turned on in the system, all animation and smooth scrolling are off and the page is static.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
npm run preview  # serve dist/ on http://localhost:4173
```

## Setting up an IB

One build serves every IB. Everything that differs per IB lives in `ib.json`, which sits next to `index.html` in the built site (`public/ib.json` in the source, `dist/ib.json` after a build). To set up or change an IB, edit that file on the server. No rebuild is needed.

`public/ib.json` is the real setup of the first IB (Taraneh Akbari) and is the template for the next ones: copy it and replace the values.

```json
{
  "name": "ترانه اکبری",
  "nameLatin": "Taraneh Akbari",
  "initials": "ت‌ا",
  "bio": "…",
  "logo": null,
  "photo": "taraneh-akbari.webp",
  "panelUrl": "https://clientx.wingomarkets.com/links/go/1771",
  "telegram": "iamtarane",
  "instagram": "tarane.trade",
  "colors": { "brand": "#1e3a8a", "brandInk": "#ffffff" },
  "offer": {
    "mode": "both", "account": "pro",
    "minDeposit": "۱۰۰ دلار", "start": "۲۸ آبان ۱۴۰۵", "deadline": "۳۰ آذر ۱۴۰۵",
    "cards": [{ "tag": "آفر اول", "title": "…", "body": "… **bold** …", "cta": "…" }],
    "termsTitle": "…",
    "terms": ["…", "…"],
    "faqs": [{ "q": "…", "a": "…" }]
  }
}
```

| Field | What it does |
|---|---|
| `name` | IB name in the header, hero, quote and page title |
| `nameLatin` | IB name in the English text in the footer |
| `initials` | Shown in the header when there is no logo |
| `bio` | The short introduction under the name |
| `logo`, `photo` | Image file name, path or URL. A name such as `taraneh-akbari.webp` is read from next to `ib.json`. `null` shows a placeholder. Prepare the photo with `npm run photo` (below) |
| `telegram`, `instagram` | The IB's usernames, with or without `@`. Shown in the header, under the bio, in the footer, and Telegram also in the FAQ ("other question?" then goes to the IB's Telegram instead of Wingo support). `null` or left out hides them |
| `panelUrl` | The IB's ClientX link, opened by the "continue to the Wingo panel" button. Must start with `https://` |
| `colors.brand` | The IB's colour: buttons, highlights, the globe and the step markers. Any CSS colour |
| `colors.brandInk` | Text colour on top of `brand`. Use a dark colour for a light `brand` and white for a dark one |
| `offer.mode` | Offer type at `/`: `both` (bonus and PRO-account offers side by side, the default), `bonus` or `account` |
| `offer.account` | Account at `/`: `starter`, `ecn`, `pro` or `goldflex` |
| `offer.minDeposit`, `offer.start`, `offer.deadline` | Shown in the offer card, terms and FAQ. Dates are free text (Jalali) |
| `offer.cards` | The offer cards in `both` mode, in priority order. Each needs `tag`, `title`, `body`, `cta`; `**…**` in `body` is bold |
| `offer.termsTitle`, `offer.terms` | Heading and paragraphs of the terms section (bonus and `both` modes). Left out: a default built from `start`/`deadline` |
| `offer.faqs` | IB-specific questions (`q`, `a`), shown after the first FAQ. In `a` (and in `terms` and card `body`), `**…**` is bold and `[text](https://…)` is a link |

Any field can be left out; the page then uses the value built into `src/config/ib.ts`. A value that isn't valid (an unknown account, a colour the browser can't read, a panel link that isn't `https://`) is ignored the same way. If the file is missing or isn't valid JSON, the page still loads with the built-in values and logs a warning in the browser console.

### IB photo

Never upload the original photo; it is usually several MB and slows the page. Run:

```bash
npm run photo -- path/to/original.png taraneh-akbari
```

This crops to the hero's 4:5 frame (keeping the face), resizes to 840×1050 and writes `public/taraneh-akbari.webp` (the first IB's 2 MB PNG became 38 KB). Upload that file next to `ib.json` on the server (or keep it in `public/` so the build copies it) and set `"photo": "taraneh-akbari.webp"`.

The page fetches `ib.json` fresh on every visit, bypassing the browser and CDN caches, so an edit shows on the next page load.

The Wingo logo, account icons and colours, legal text and Wingo links are the same for every IB and are not in `ib.json`.

## Pages

Each combination of offer type and account has its own address. There is no menu between them.

| Address | Offer type | Account |
|---|---|---|
| `/` | Set by `offer.mode` in `ib.json` | Set by `offer.account` in `ib.json` |
| `/both` | Bonus + PRO account, side by side | Set by `offer.account` (page colour only) |
| `/bonus/starter` | Exclusive bonus | Starter |
| `/bonus/ecn` | Exclusive bonus | ECN |
| `/bonus/pro` | Exclusive bonus | Pro |
| `/bonus/goldflex` | Exclusive bonus | GoldFlex |
| `/account/starter` | Specific account | Starter |
| `/account/ecn` | Specific account | ECN |
| `/account/pro` | Specific account | Pro |
| `/account/goldflex` | Specific account | GoldFlex |

Any other address shows a "page not found" screen with a link back to `/`.

To check the mobile layout, resize the browser or use the device toolbar in DevTools. The page is responsive, so there is no separate mobile page.

**Hosting:** `npm run build` writes a copy of the page at every address above (for example `dist/bonus/pro/index.html`, `dist/both/index.html`) plus a `404.html`, so a static host such as GitHub Pages serves each address directly. If you add an account, add it to `scripts/routes.mjs` as well as `src/config/ib.ts`.

## Where things live

| File | Contents |
|---|---|
| `public/ib.json` | The per-IB values, read when the page loads (see "Setting up an IB") |
| `src/config/ib.ts` | Built-in defaults for those values, plus account details, Wingo links and the fixed legal text |
| `src/config/load.ts` | Fetches `ib.json`, checks each value and applies the IB's colours |
| `src/content.ts` | All page copy for both offer types |
| `src/landing/Landing.tsx` | The page sections (animation hooks are `data-*` attributes) |
| `src/landing/ThemeToggle.tsx` | Light/dark switch |
| `src/motion/core.ts` | Motion helpers: Lenis, count-up, magnetic buttons, card tilt, particles, pausing loops off screen |
| `src/motion/page.ts` | What animates on this page and when |
| `src/index.css` | Fonts, light and dark colours and the CSS side of the animations. Every IB-coloured shade is worked out from `colors.brand` |
| `public/brand/` | Wingo logo, account icons, account glow images, globe, MT5 mockup and payment logos, all from wingomarkets.com. The globe is recoloured to the IB's colour on the page |

## Before publishing

For each IB, fill in every field of `ib.json`. The sample file has placeholder values, and the panel link must be replaced with the approved ClientX link for that IB.

Then search the code for `TODO_CONFIRM`. Each one marks draft text shared by all IBs that needs sign-off:

- FAQ answers, the text used in the specific-account offer type, and the short line under each account name.
- The link to Wingo's page on withdrawal methods and timing.

Do not edit the risk warning or the registered office address. Both are copied word for word from the footer of Wingo's Persian site.
