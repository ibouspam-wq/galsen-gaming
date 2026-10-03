# Design Brief

## Direction

Neon Hardware — a dark-first premium gaming storefront where electric violet and blue accents cut through near-black surfaces like RGB light in a dark room.

## Tone

Refined high-tech luxury: restrained and clean, never overloaded, with light used as the only decoration.

## Differentiation

Subtle RGB-inspired glow — thin gradient borders and low-opacity violet halos that activate on hover — makes hardware feel lit from within, not painted on.

## Color Palette

| Token      | OKLCH        | Role                                    |
| ---------- | ------------ | --------------------------------------- |
| background | 0.13 0.022 285 | Near-black violet-tinted page base      |
| foreground | 0.96 0.008 285 | White / light-grey primary text         |
| card       | 0.17 0.026 285 | Elevated product & content surfaces     |
| primary    | 0.62 0.24 292  | Electric violet — primary CTA, active   |
| accent     | 0.72 0.16 245  | Electric blue — highlights, secondary   |
| muted      | 0.22 0.028 285 | Subtle fills, chips, inactive surfaces  |
| muted-fg   | 0.68 0.02 285  | Secondary / description text            |
| success    | 0.7 0.16 150   | In-stock, confirmation                  |
| destructive| 0.62 0.21 25   | Errors, remove, out-of-stock            |

## Typography

- Display: Space Grotesk — hero, section headings, product names, logo
- Body: DM Sans — paragraphs, nav, labels, descriptions
- Mono: JetBrains Mono — prices, SKUs, spec values
- Scale: hero `text-4xl md:text-6xl font-bold tracking-tight`, h2 `text-2xl md:text-4xl font-bold tracking-tight`, label `text-xs font-semibold tracking-widest uppercase`, body `text-base text-muted-foreground`

## Elevation & Depth

Flat near-black base with layered card surfaces (L 0.17) and one restrained glow tier — `shadow-elevated` for lift, `shadow-glow-primary`/`glow-accent` reserved for hover and primary CTAs only.

## Structural Zones

| Zone    | Background        | Border                     | Notes                                          |
| ------- | ----------------- | -------------------------- | ---------------------------------------------- |
| Header  | bg-card           | border-b border-border     | Sticky, backdrop-blur, logo + violet cart badge |
| Content | bg-background     | —                          | Alternate sections with bg-muted/30            |
| Footer  | bg-muted/40       | border-t border-border     | Muted links, small print, brand mark           |

## Spacing & Rhythm

Generous section gaps (`py-16 md:py-24`), content grouped in `gap-6` grids, micro-spacing `gap-2`/`gap-3` inside cards; container max 1400px centered.

## Component Patterns

- Buttons: pill (`rounded-full`) primary filled violet with `glow-primary` on hover; secondary outlined `border-border` → violet border on hover; 180ms transitions
- Cards: `rounded-2xl` on `bg-card` with 1px `border-border`, `border-gradient` + `shadow-elevated` on hover, image zoom `scale-105`
- Badges: small pill, uppercase mono-free label; "Nouveau" violet-tinted, "Promo" accent blue, "Rupture" destructive

## Motion

- Entrance: `animate-fade-up` 350ms staggered on hero and grid items
- Hover: 180ms `transition-fast` on cards, buttons, links; border/glow shift only
- Decorative: `animate-pulse-glow` on ambient halo behind hero; no bouncing, no parallax

## Constraints

- Dark-first: `.dark` is the primary theme; light tokens are a soft inverse only
- Accent violet/blue used sparingly — max one glowing element per viewport region
- No full-page gradients, no rainbow; depth comes from layered surfaces and light
- All color via semantic tokens only — no raw hex/rgb in components
- French UI copy throughout; fluid desktop/tablet/mobile

## Signature Detail

Thin animated gradient borders (violet→blue) that ignite on hover, turning each product card into a piece of powered-on hardware.
