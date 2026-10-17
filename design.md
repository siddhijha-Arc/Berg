# Generative AI — Style Reference
> 8-bit playground on clean white paper. A white canvas interrupted by flat colored bands and scattered pixel-art creatures, held together by one bold geometric typeface and zero shadows.

**Theme:** light

Source measurements are normalized; roles and recommendations are interpreted. Font summary lists are independent, not paired by position. HTML examples are reconstructions, not source components.

fal uses a playful generative-canvas language: clean white surfaces, one bold geometric sans (focal) at compressed tracking, dark filled buttons that sit flat against brightly-colored full-bleed section bands, and scattered 8-bit pixel art decorations in lime, violet, and pink that break the otherwise minimal developer-tool grid. Color is used sectionally — each band gets its own flat wash (sky-blue hero, lime highlight, violet CTA strip, pink testimonial accent) — so the page reads like a series of colored panels stitched together by white gutters. Components stay flat and sharp: 4px button radii, 12px card radii, hairline #e5e7eb borders, no shadows, no gradients, no rounded-pill controls. The pixel creatures are the only decorative noise on an otherwise quiet, text-forward canvas — they signal 'creative playground' without ever competing with the type.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Pixel Lime | `#f1ffd2` | `--color-pixel-lime` | Green wash for highlight backgrounds, decorative bands, and soft emphasis behind content. |
| Sky Cyan | `#99ecff` | `--color-sky-cyan` | Hero band background, full-bleed section washes, pixel-art fill — the signature page-anchoring color |
| Electric Violet | `#6120ee` | `--color-electric-violet` | Inline links, underlined text accents, dark-band pixel highlights — the primary brand chromatic |
| Deep Ultraviolet | `#4a17b0` | `--color-deep-ultraviolet` | Dark section backgrounds, card pixel-art fills, footer band — deeper companion to Electric Violet |
| Lavender Pixel | `#ab77ff` | `--color-lavender-pixel` | Pixel-art creature fills, soft decorative blocks — lighter violet for the 8-bit illustrations |
| Lilac Wash | `#d0b7f9` | `--color-lilac-wash` | Soft card surfaces, pastel pixel fills, announcement-bar tint |
| Bubblegum Pink | `#ffddfa` | `--color-bubblegum-pink` | Testimonial-section accent blocks, pixel-art creature fill, soft card surfaces |
| Forest Pixel | `#004012` | `--color-forest-pixel` | Dark pixel-art detail strokes and creature outlines — the deep contrast pixel in illustrations |
| Cobalt Pixel | `#0a4dce` | `--color-cobalt-pixel` | Pixel-art creature accent details, decorative icon strokes |
| Paper White | `#ffffff` | `--color-paper-white` | Page canvas, card surfaces, button text on dark fills |
| Hairline Gray | `#e5e7eb` | `--color-hairline-gray` | Universal border, divider, card outline — the only structural border color (1960 occurrences) |
| Fog Surface | `#f4f4f5` | `--color-fog-surface` | Card backgrounds, secondary surfaces, button hover grounds |
| Ink Black | `#000000` | `--color-ink-black` | Primary display headline color, maximum-contrast text |
| Graphite | `#1b1b1d` | `--color-graphite` | Primary text, nav links, icon fills — the dominant readable text color |
| Carbon | `#252527` | `--color-carbon` | Dark filled button background — the only button fill color, white text on top |
| Obsidian | `#121216` | `--color-obsidian` | Darkest surface for inverted sections, near-black backgrounds |
| Slate Body | `#383a42` | `--color-slate-body` | Body paragraph text, secondary copy |
| Ash | `#787882` | `--color-ash` | Muted helper text, captions, tertiary metadata |

## Tokens — Typography

### focal — Primary brand typeface — used for all display, heading, and body text. A custom geometric sans with high x-height and compressed apertures. The aggressive negative tracking on display sizes (60-120px) creates a dense, architectural headline block; at 16-18px it stays open enough for body reading. Weight 700 carries the display work, 500-600 handles subheadings, 400 is body. The tight tracking is the signature: other geometric sans would feel loose at 80px; focal feels like solid colored bars of type. · `--font-focal`
- **Substitute:** Inter Tight, Satoshi, General Sans
- **Weights:** 400, 500, 600, 700
- **Sizes:** 10, 12, 14, 16, 18, 24, 30, 36, 40, 48, 60, 80, 120
- **Line height:** 0.83, 0.88, 0.90, 1.00, 1.11, 1.20, 1.33, 1.40, 1.43, 1.50, 1.56, 1.60
- **Letter spacing:** 0 to -0.04em — tightens as size increases: -0.04em at 120px, -0.025em at 60-80px, -0.02em at 30-48px, -0.01em at 16-24px, normal at 14px and below

### Chivo Mono — Monospace for code snippets, terminal output, and technical metadata. · `--font-chivo-mono`
- **Substitute:** JetBrains Mono, IBM Plex Mono, Geist Mono
- **Weights:** 400
- **Sizes:** 14

### publicSansRounded — UI controls — buttons, tags, nav CTAs, small icon labels. · `--font-publicsansrounded`
- **Substitute:** Public Sans, Nunito, DM Sans
- **Weights:** 400, 600, 700
- **Sizes:** 14, 16, 24

## Tokens — Spacing & Shapes

**Base unit:** 8px
**Density:** comfortable

### Border Radius
- tags: 4px
- cards: 8-12px
- images: 4-8px
- inputs: 4px
- buttons: 4px

### Layout
- **Page max-width:** 1200px
- **Section gap:** 64-80px
- **Card padding:** 24-32px
- **Element gap:** 8-16px

## Components & Styling Rules
- **Dark Filled Button:** Background `#252527`, text `#ffffff`, radius 4px, padding 12px 20px, no shadow.
- **White Outlined Button:** Background `#ffffff`, text `#1b1b1d`, border 1px solid `#1b1b1d`, radius 4px, padding 12px 20px.
- **Top Navigation Bar:** Background `#ffffff`, height ~64px, max-width 1200px, bottom border 1px `#e5e7eb`.
- **Hero Section:** Full-bleed background `#99ecff` (sky cyan), bold geometric heading, sharp angular cards, 8-bit pixel art decorations.
- **No Shadows:** Zero elevation shadows across the system. Separation via hairline `1px #e5e7eb` borders and flat color blocks.
