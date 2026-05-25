# MMIA4 Homepage — Design Spec
**Date:** 2026-05-25  
**Status:** Approved

---

## Overview

A single `index.html` file at the root of the MMIA4 repo that serves as the entry point for `https://kazafk.github.io/mmia4/`. It presents two projects as a creative editorial hub and links visitors directly to each one.

---

## Concept

**Editorial Hub** — the Guide's warm neo-brutalist aesthetic (cream background, bold navy type, chunky borders and shadows) serves as the unifying shell. The two project cards make each world tangible: one dark and cinematic, one light and editorial.

Language: **French throughout**.  
Animations: **impactful, entrance-sequenced**, CSS + vanilla JS (no framework dependency).

---

## Layout (A — Grand héros)

```
┌─────────────────────────────────────┐
│  NAV  (sticky, blurred)             │
├─────────────────────────────────────┤
│                                     │
│  HERO  (headline → subtitle)        │
│        animated glow orbs in bg     │
│                                     │
├─────────────────────────────────────┤
│  MARQUEE  (dark ticker)             │
├─────────────────────────────────────┤
│                                     │
│  PROJECTS  ┌──────┐  ┌──────┐      │
│            │ dark │  │light │      │
│            │card 1│  │card 2│      │
│            └──────┘  └──────┘      │
│                                     │
├─────────────────────────────────────┤
│  FOOTER  (minimal dark bar)         │
└─────────────────────────────────────┘
```

---

## Design System

| Token        | Value     | Usage                          |
|-------------|-----------|-------------------------------|
| `--cream`   | `#FAF6EE` | Page background                |
| `--navy`    | `#0A1428` | Text, borders, card 1 bg       |
| `--orange`  | `#FF5A36` | Primary accent, CTAs           |
| `--yellow`  | `#FFD93D` | Subtitle border, card 2 shadow |
| `--mint`    | `#00C49A` | Nav pulse dot, stat label      |
| `--sky`     | `#38bdf8` | Card 1 accent (from Project 1) |

**Fonts (Google Fonts):**
- `Bricolage Grotesque` — display headings, body
- `Fraunces` — italic serif accent (hero "conviction", card 2 subtitle)
- `JetBrains Mono` — tags, labels, CTAs

---

## Sections

### 1. Nav
- Sticky, `backdrop-filter: blur(12px)`, 92% opacity cream background
- Left: `MMIA4` logo, orange `4`
- Right: animated mint pulse dot + `Édition 2026` dark pill tag
- Entrance: slides down from top on load (opacity + translateY)

### 2. Hero
- **Badge:** orange pill tag `↗ Projets IA & Management` with blinking dot — animates in first
- **Headline:** `DEUX OUTILS. UNE conviction.` — each word animates in with staggered translateY (120ms between words). "conviction" uses Fraunces italic in orange
- **Subtitle:** one paragraph (French), left-bordered with `#FFD93D`, max-width 520px — fades in after headline
- **Stats row:** 3 mono labels with colored dots (orange, sky, mint) — fades in with subtitle
- **Background:** two radial gradient orbs (orange-tinted top-right, yellow-tinted bottom-center) animating with CSS `@keyframes` — always visible, slow drift

### 3. Marquee
- Dark navy background, infinite left-scroll
- Text: alternating content labels and orange `★` separators
- Items: `IA & Management`, `Expérience Interactive`, `Guide du Manager`, `Édition 2026`, `Assurance & IA`, `Prompt Builder`

### 4. Project Cards
Two cards side by side in a CSS grid. Both scroll-triggered via `IntersectionObserver` (stagger 120ms).

**Card 1 — L'Expérience Interactive (dark)**
- Background: `#020617` (deepest navy from Project 1)
- Visual area (200px): animated sky-blue and purple radial glow orbs + subtle grid overlay + ghost italic title text + pill badge
- Body: card number `01` in faint ghost serif, sky-blue mono tag, white headline, muted description
- CTA: sky-blue button, arrow widens on hover
- Border shadow: `6px 6px 0 var(--sky)`, grows to `10px 10px` on hover
- Hover: card lifts `translate(-2px, -4px)`
- Link: `ia-management-experience.html`

**Card 2 — Le Guide du Manager (light)**
- Background: `#ffffff`
- Visual area (200px): giant ghost number `02` + three colored feature chips (Glossaire, Quiz, Prompt builder)
- Body: card number `02` ghost serif, orange mono tag, navy headline with Fraunces italic, muted description
- CTA: orange button with navy border + box-shadow, grows on hover
- Border shadow: `6px 6px 0 var(--yellow)`, grows on hover
- Hover: card lifts `translate(-2px, -4px)`
- Link: `Guide/` (built React app deployed by GitHub Actions)

### 5. Footer
- Dark navy background, full-width
- Left: `MMIA4` logo in cream, orange accent
- Right: mono label `IA & Management · Édition 2026` in muted cream

---

## Animation Sequence

| Delay | Element | Animation |
|-------|---------|-----------|
| 100ms | Nav | `opacity 0→1`, `translateY(-12px → 0)` |
| 300ms | Hero badge | `opacity 0→1`, `translateY(10px → 0)` |
| 500ms | Word 1 "Deux" | `opacity 0→1`, `translateY(30px → 0)` |
| 620ms | Word 2 "outils." | same |
| 740ms | Word 3 "Une" | same |
| 860ms | Word 4 "conviction." | same |
| 1010ms | Subtitle + stats row | `opacity 0→1`, `translateY(12px → 0)` |
| on scroll | Section header | `opacity 0→1`, `translateY(12px → 0)` |
| on scroll | Card 1 | `opacity 0→1`, `translateY(24px → 0)` |
| on scroll +120ms | Card 2 | same |

All entrance transitions: `0.5–0.6s ease`. Orb animations: slow CSS `@keyframes` with `alternate` (6–10s). Marquee: `18s linear infinite`.

---

## File

- **Output:** `C:\Repos\MMIA4\index.html` (single self-contained file, no build step)
- **Dependencies:** Google Fonts CDN only
- **No framework, no bundler** — pure HTML/CSS/JS

---

## GitHub Pages Compatibility

The GitHub Actions workflow (`deploy.yml`) already copies all root `.html` files to `_site/`. `index.html` will be picked up automatically and served at `https://kazafk.github.io/mmia4/`.

The `Guide/` link targets the built output at `https://kazafk.github.io/mmia4/Guide/` which is deployed by the same workflow.

---

## Out of Scope

- No routing or SPA behavior
- No contact form or newsletter
- No analytics
- Other HTML files (`viewer.html`, `mvp_ai_manager.html`, etc.) are not featured on this homepage
