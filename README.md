# Wingo IB landing (design draft)

A design draft of the landing page each Wingo Markets IB (introducing broker) gets for their own audience. The page is in Persian, right to left, and written in the IB's own voice. Built with Vite, React, Tailwind CSS v4 and `lucide-react` icons. Animation uses GSAP + ScrollTrigger with Lenis smooth scrolling, the same motion setup as the trick-or-trade campaign (`src/motion/`).

The page has a light and a dark theme. It follows the visitor's system setting until they use the switch in the header; their choice is then remembered in the browser. With "reduce motion" turned on in the system, all animation and smooth scrolling are off and the page is static.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
npm run preview  # serve dist/ on http://localhost:4173
```

## Pages

Each combination of offer type and account has its own address. There is no menu between them.

| Address | Offer type | Account |
|---|---|---|
| `/` | Exclusive bonus | The one set in `offer.account` in `src/config/ib.ts` (currently Pro) |
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

**Hosting:** `npm run build` writes a copy of the page at every address above (for example `dist/bonus/pro/index.html`) plus a `404.html`, so a static host such as GitHub Pages serves each address directly. If you add an account, add it to `scripts/routes.mjs` as well as `src/config/ib.ts`.

## Where things live

| File | Contents |
|---|---|
| `src/config/ib.ts` | Every per-IB value: name, photo, bio, panel link, minimum deposit, deadline, account details, Wingo links and the fixed legal text |
| `src/content.ts` | All page copy for both offer types |
| `src/landing/Landing.tsx` | The page sections (animation hooks are `data-*` attributes) |
| `src/landing/ThemeToggle.tsx` | Light/dark switch |
| `src/motion/core.ts` | Motion helpers: Lenis, count-up, magnetic buttons, card tilt, particles, pausing loops off screen |
| `src/motion/page.ts` | What animates on this page and when |
| `src/index.css` | Fonts, light and dark colors (taken from wingomarkets.com) and the CSS side of the animations |
| `public/brand/` | Wingo logo, account icons, account glow images, globe, MT5 mockup and payment logos, all from wingomarkets.com |

To add the IB's photo or logo, set `ib.photo` or `ib.logo` in `src/config/ib.ts`. While they are `null`, the page shows a placeholder.

## Before publishing

Search the code for `TODO_CONFIRM`. Each one marks a sample value or draft text that needs sign-off:

- The IB's panel link. The current one is a placeholder; it must be replaced with the approved ClientX link for that IB.
- Minimum deposit, deadline and the IB's bio.
- FAQ answers, the text used in the specific-account offer type, and the short line under each account name.
- The link to Wingo's page on withdrawal methods and timing.
- The English spelling of the IB's name, used in the English footer text.

Do not edit the risk warning or the registered office address. Both are copied word for word from the footer of Wingo's Persian site.
