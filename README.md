# 🦷 Cabinet Sourire Doré — Luxury Dental Clinic Website

> **Stack:** Next.js 14 (App Router) · Tailwind CSS · Framer Motion · Lucide React  
> **Languages:** French (LTR) + Arabic (RTL) — seamless bilingual toggle  
> **Design:** Minimalist Luxury Dark Mode — Charcoal × Metallic Gold × Pearl

---

## Folder Structure

```
sourire-dore/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, LanguageProvider
│   ├── globals.css         # Global styles — grain texture, glass utils, RTL overrides
│   └── page.tsx            # Home page — assembles all sections
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx      # Glassmorphic nav — scroll effect, lang toggle, mobile menu
│   └── sections/
│       ├── HeroSection.tsx       # Ken Burns hero — parallax, floating orbs, stats
│       ├── ServicesSection.tsx   # Bento grid — magnetic hover glow per-card
│       ├── BeforeAfterSection.tsx# Drag comparison slider — mouse + touch
│       └── BookingSection.tsx    # 3-step form + WhatsApp/phone info panel
│
├── lib/
│   └── LanguageContext.tsx # Complete bilingual context — all FR + AR strings
│
├── tailwind.config.ts      # Full design token system — colors, keyframes, shadows
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open
open http://localhost:3000
```

---

## Design System

### Color Palette

| Token           | Hex          | Usage                     |
|-----------------|--------------|---------------------------|
| `--charcoal`    | `#101010`    | Page background           |
| `--graphite`    | `#1A1A1A`    | Section backgrounds       |
| `--surface`     | `#181818`    | Cards, panels             |
| `--gold`        | `#C9A84C`    | Primary accent            |
| `--gold-light`  | `#E8C96A`    | Gradient starts, hovers   |
| `--gold-dim`    | `#8A6E30`    | Borders, gradient ends    |
| `--pearl`       | `#F5F0E8`    | Primary text              |
| `--text-muted`  | `#9A9A9A`    | Secondary text            |

### Typography

| Role          | Font                | Weight  |
|---------------|---------------------|---------|
| FR Headings   | Playfair Display    | 400–700 |
| FR Body       | Inter               | 300–600 |
| AR Everything | Readex Pro          | 300–600 |

### Motion Principles

- **Entrance:** `opacity 0→1` + `translateY(50px→0)` — `ease: [0.19, 1, 0.22, 1]`
- **Stagger:** `0.1s` per child via `staggerChildren`
- **Hero parallax:** `useScroll` + `useTransform` on Y axis
- **Floating orbs:** `y: [0, -28, 0]` over 8s loop
- **Ken Burns:** `scale 1→1.08` + `translate` over 20s alternate
- **Service hover:** `translateY(-6px)` + magnetic radial glow at cursor position

---

## Bilingual System

The `LanguageContext` provides:

```tsx
const { locale, dir, t, toggleLocale } = useLanguage();
// locale: "fr" | "ar"
// dir:    "ltr" | "rtl"
// t:      full Translations object
// toggleLocale: () => void
```

**What switches on toggle:**
- `<html lang>` and `<html dir>` attributes
- `font-family` (Inter → Readex Pro)
- All UI strings via `t.*`
- CSS `logical properties` (`padding-inline-start`, `margin-inline-end`)
- WhatsApp float button side (`end-7` adapts automatically)
- `localStorage` persistence across sessions

---

## Key Components

### `HeroSection`
- Layered background: base gradient + Ken Burns orb + grid overlay
- `useScroll` + `useTransform` for parallax depth on scroll
- Staggered text reveal with `containerVariants` + `staggerChildren`
- Two floating SVG tooth ornaments (decorative)
- Scroll hint with CSS-animated pulse line

### `ServicesSection`
- CSS Grid Bento layout: `grid-cols-3`, featured card spans 2 cols, tall card spans 2 rows
- Per-card `MouseEvent` tracking → radial gradient glow follows cursor
- `whileInView` entrance with individual `delay` stagger

### `BeforeAfterSection`
- Custom drag slider with `clipPath: inset(0 X% 0 0)` on the "after" panel
- Works with both mouse and touch events
- Before/After labels in current locale

### `BookingSection`
- 3-step `AnimatePresence` form with slide transitions between panels
- `InfoPanel` with phone (+213), WhatsApp deep link, email
- Hours of operation in locale language
- Success state with spring-scale checkmark animation

---

## Adding More Sections

To add the **Testimonials**, **About**, or **Location/Map** sections:

1. Create `components/sections/TestimonialsSection.tsx`
2. Use `t.testimonials.*` from `LanguageContext`
3. Import and add to `app/page.tsx` between dividers
4. For the map: embed a styled Google Maps iframe or use `@react-google-maps/api`

---

## Production Checklist

- [ ] Replace placeholder phone `+213 555 00 00 00` with real number
- [ ] Update WhatsApp link `wa.me/213XXXXXXXXX`
- [ ] Replace `contact@souriredore.dz` with real email
- [ ] Update address in `location` translations
- [ ] Add real before/after images (replace SVG illustrations)
- [ ] Add Google Maps embed or API key
- [ ] Set up form submission (EmailJS / Resend / custom API route)
- [ ] Add `sitemap.xml` and `robots.txt`
- [ ] Configure Vercel / cPanel deployment
- [ ] Add Google Analytics or Plausible
