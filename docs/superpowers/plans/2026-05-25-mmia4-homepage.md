# MMIA4 Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `index.html` at the repo root — a French editorial hub homepage that links to the two MMIA4 projects with impactful entrance animations.

**Architecture:** Single self-contained HTML file. CSS custom properties for the design system. Vanilla JS with `IntersectionObserver` for scroll-triggered reveals and a sequential async entrance animation on load. No build step, no framework.

**Tech Stack:** HTML5, CSS3 (custom properties, keyframe animations), vanilla JS ES2020, Google Fonts CDN (Bricolage Grotesque, Fraunces, JetBrains Mono).

**Reference spec:** `docs/superpowers/specs/2026-05-25-mmia4-homepage-design.md`

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `index.html` | Complete homepage — all sections, styles, and scripts inline |

No other files need to be created or modified. The GitHub Actions workflow (`deploy.yml`) already copies all root `*.html` files to `_site/`, so `index.html` will be served at `https://kazafk.github.io/mmia4/` automatically.

---

## Task 1: HTML skeleton + design system CSS

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create the file with DOCTYPE, head, and CSS foundation**

Create `C:\Repos\MMIA4\index.html` with this exact content:

```html
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MMIA4 — IA & Management</title>
<meta name="description" content="Deux outils pensés pour les managers qui veulent comprendre l'IA sans bullshit.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,900&family=Fraunces:ital,wght@0,400;1,400;1,700&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --cream:  #FAF6EE;
  --navy:   #0A1428;
  --orange: #FF5A36;
  --yellow: #FFD93D;
  --mint:   #00C49A;
  --sky:    #38bdf8;
  --violet: #2E1B7A;
}

html { scroll-behavior: smooth; }

body {
  background: var(--cream);
  color: var(--navy);
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  overflow-x: hidden;
}
</style>
</head>
<body>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `C:\Repos\MMIA4\index.html` in a browser. Expected: blank cream page, no console errors, fonts loading in Network tab.

---

## Task 2: Nav section

**Files:**
- Modify: `index.html` — add nav HTML inside `<body>`, add nav CSS inside `<style>`

- [ ] **Step 1: Add nav CSS** — paste inside `<style>` before `</style>`:

```css
/* ── NAV ── */
nav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(250,246,238,0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 2px solid var(--navy);
  padding: 14px 40px;
  display: flex; align-items: center; justify-content: space-between;
  opacity: 0;
  transform: translateY(-12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
nav.visible { opacity: 1; transform: translateY(0); }

.nav-logo {
  font-size: 1.15rem; font-weight: 900; letter-spacing: -0.04em;
  color: var(--navy);
}
.nav-logo span { color: var(--orange); }

.nav-right { display: flex; align-items: center; gap: 12px; }

.nav-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
  background: var(--navy); color: var(--cream);
  padding: 4px 10px; border-radius: 4px;
}

.nav-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--mint);
  animation: pulse-dot 2.5s infinite;
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0,196,154,0.4); }
  50%       { box-shadow: 0 0 0 6px rgba(0,196,154,0); }
}
```

- [ ] **Step 2: Add nav HTML** — paste inside `<body>`:

```html
<nav id="nav">
  <span class="nav-logo">MM<span>IA</span>4</span>
  <div class="nav-right">
    <div class="nav-dot"></div>
    <span class="nav-tag">Édition 2026</span>
  </div>
</nav>
```

- [ ] **Step 3: Verify in browser**

Refresh. Expected: nav bar invisible (opacity 0) — it will animate in via JS in Task 6. Check that the sticky positioning doesn't cause horizontal scrollbar.

---

## Task 3: Hero section

**Files:**
- Modify: `index.html` — add hero CSS + HTML

- [ ] **Step 1: Add hero CSS** — paste inside `<style>`:

```css
/* ── HERO ── */
.hero {
  padding: 80px 40px 64px;
  border-bottom: 2px solid var(--navy);
  position: relative;
  overflow: hidden;
  min-height: 520px;
  display: flex; flex-direction: column; justify-content: space-between;
}

/* Animated background orbs */
.hero::before {
  content: '';
  position: absolute; top: -100px; right: -80px;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(255,90,54,0.10) 0%, transparent 65%);
  border-radius: 50%;
  animation: orb1 8s ease-in-out infinite alternate;
  pointer-events: none;
}
.hero::after {
  content: '';
  position: absolute; bottom: -80px; left: 20%;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(255,217,61,0.13) 0%, transparent 65%);
  border-radius: 50%;
  animation: orb2 10s ease-in-out infinite alternate;
  pointer-events: none;
}
@keyframes orb1 {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(30px,20px) scale(1.1); }
}
@keyframes orb2 {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(-20px,-30px) scale(1.08); }
}

.hero-top { position: relative; z-index: 2; }

/* Badge */
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--orange); color: var(--navy);
  border: 2px solid var(--navy);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
  padding: 5px 14px; border-radius: 100px;
  box-shadow: 3px 3px 0 var(--navy);
  margin-bottom: 28px;
  opacity: 0; transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.hero-badge.visible { opacity: 1; transform: translateY(0); }
.hero-badge::before {
  content: '';
  width: 6px; height: 6px; border-radius: 50%; background: var(--navy);
  animation: blink 1.5s step-end infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

/* Headline */
.hero-title {
  font-size: clamp(3.2rem, 8vw, 7rem);
  font-weight: 900; letter-spacing: -0.04em; line-height: 0.88;
  text-transform: uppercase; color: var(--navy);
  max-width: 820px; position: relative; z-index: 2;
  margin-bottom: 36px;
}
.hero-title .word {
  display: inline-block;
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.hero-title .word.visible { opacity: 1; transform: translateY(0); }
.hero-title .accent {
  font-family: 'Fraunces', serif;
  font-style: italic; font-weight: 700;
  color: var(--orange); text-transform: none;
}

/* Subtitle row */
.hero-sub-row {
  display: flex; align-items: flex-start; gap: 48px;
  position: relative; z-index: 2;
  opacity: 0; transform: translateY(12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.hero-sub-row.visible { opacity: 1; transform: translateY(0); }

.hero-sub {
  font-size: 1rem; color: rgba(10,20,40,0.65); line-height: 1.65;
  max-width: 520px;
  border-left: 4px solid var(--yellow); padding-left: 16px;
  font-weight: 400;
}
.hero-sub strong { color: var(--navy); font-weight: 700; }

.hero-stats {
  display: flex; flex-direction: column; gap: 10px; flex-shrink: 0;
}
.stat {
  display: flex; align-items: center; gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  color: rgba(10,20,40,0.45);
}
.stat-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.stat-dot.orange { background: var(--orange); }
.stat-dot.sky    { background: var(--sky); }
.stat-dot.mint   { background: var(--mint); }

@media (max-width: 640px) {
  .hero { padding: 48px 24px 40px; }
  .hero-sub-row { flex-direction: column; gap: 20px; }
  .hero-stats { flex-direction: row; flex-wrap: wrap; }
}
```

- [ ] **Step 2: Add hero HTML** — paste inside `<body>` after `</nav>`:

```html
<section class="hero">
  <div class="hero-top">
    <div class="hero-badge" id="hero-badge">
      ↗ Projets IA &amp; Management
    </div>

    <h1 class="hero-title">
      <span class="word" id="w1">Deux</span>&thinsp;<span class="word" id="w2">outils.</span><br>
      <span class="word" id="w3">Une</span>&thinsp;<span class="word accent" id="w4">conviction.</span>
    </h1>

    <div class="hero-sub-row" id="hero-sub">
      <p class="hero-sub">
        Deux formats pensés pour les managers qui veulent comprendre l'IA
        <strong>sans bullshit</strong> — une expérience immersive en&nbsp;3D
        et un guide interactif de <strong>15&nbsp;minutes</strong> prêt à l'emploi.
      </p>
      <div class="hero-stats">
        <div class="stat"><span class="stat-dot orange"></span>Expérience interactive</div>
        <div class="stat"><span class="stat-dot sky"></span>Cinématique &amp; 3D</div>
        <div class="stat"><span class="stat-dot mint"></span>Guide en 15 minutes</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verify in browser**

Refresh. Expected: hero section visible with cream background, glowing orbs drifting, badge/headline invisible (will animate in via JS). Layout should not overflow horizontally on desktop.

---

## Task 4: Marquee + project cards

**Files:**
- Modify: `index.html` — add marquee + cards CSS + HTML

- [ ] **Step 1: Add marquee + cards CSS** — paste inside `<style>`:

```css
/* ── MARQUEE ── */
.marquee-wrap {
  border-top: 2px solid var(--navy);
  border-bottom: 2px solid var(--navy);
  background: var(--navy);
  overflow: hidden; white-space: nowrap;
  padding: 11px 0;
}
.marquee-inner {
  display: inline-flex;
  animation: marquee 20s linear infinite;
}
.marquee-inner span {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
  color: rgba(250,246,238,0.4);
  padding: 0 20px;
}
.marquee-inner span.mk { color: var(--orange); }
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* ── PROJECTS ── */
.projects {
  padding: 64px 40px 88px;
}

.projects-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 36px;
  opacity: 0; transform: translateY(12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.projects-header.visible { opacity: 1; transform: translateY(0); }

.projects-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(10,20,40,0.4);
}
.projects-count {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(10,20,40,0.35);
  border: 1.5px solid rgba(10,20,40,0.18);
  padding: 3px 10px; border-radius: 100px;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 768px) {
  .projects { padding: 48px 24px 64px; }
  .cards-grid { grid-template-columns: 1fr; }
}

/* ── CARD BASE ── */
.project-card {
  border: 2.5px solid var(--navy);
  border-radius: 16px; overflow: hidden;
  text-decoration: none; display: block;
  opacity: 0; transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease,
              box-shadow 0.25s ease, translate 0.25s ease;
}
.project-card.visible { opacity: 1; transform: translateY(0); }
.project-card:hover { translate: -2px -4px; }

/* ── CARD 1: DARK (ia-management-experience.html) ── */
.card-dark { background: var(--navy); box-shadow: 6px 6px 0 var(--sky); }
.card-dark:hover { box-shadow: 10px 10px 0 var(--sky); }

.card-dark .card-visual {
  height: 200px; position: relative; overflow: hidden;
  background: #020617;
  border-bottom: 2px solid rgba(56,189,248,0.25);
}
.card-dark .card-visual::before {
  content: '';
  position: absolute; top: -60px; right: -60px;
  width: 280px; height: 280px;
  background: radial-gradient(circle, rgba(56,189,248,0.22) 0%, transparent 65%);
  border-radius: 50%;
  animation: float1 6s ease-in-out infinite alternate;
}
.card-dark .card-visual::after {
  content: '';
  position: absolute; bottom: -40px; left: -40px;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 65%);
  border-radius: 50%;
  animation: float2 8s ease-in-out infinite alternate;
}
@keyframes float1 { from{transform:translate(0,0) scale(1)} to{transform:translate(20px,15px) scale(1.1)} }
@keyframes float2 { from{transform:translate(0,0) scale(1)} to{transform:translate(-15px,-20px) scale(1.05)} }

.card-dark .visual-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px);
  background-size: 28px 28px;
}
.card-dark .visual-ghost {
  position: absolute; bottom: 12px; left: 20px;
  font-family: 'Fraunces', serif; font-style: italic;
  font-size: 1.5rem; font-weight: 700; color: rgba(255,255,255,0.08);
  line-height: 1.1; user-select: none; pointer-events: none;
}
.card-dark .visual-badge {
  position: absolute; top: 16px; left: 20px;
  background: rgba(56,189,248,0.12);
  border: 1px solid rgba(56,189,248,0.35);
  color: var(--sky);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.55rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
  padding: 4px 10px; border-radius: 100px;
}

.card-dark .card-body { padding: 24px 24px 22px; }
.card-dark .card-num {
  font-family: 'Fraunces', serif; font-style: italic;
  font-size: 2.8rem; font-weight: 700; color: rgba(255,255,255,0.07);
  line-height: 1; margin-bottom: 2px;
}
.card-dark .card-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.58rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--sky); margin-bottom: 8px;
}
.card-dark .card-title {
  font-size: 1.5rem; font-weight: 900; color: #fff;
  letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 10px;
}
.card-dark .card-desc {
  font-size: 0.83rem; color: rgba(255,255,255,0.48);
  line-height: 1.6; margin-bottom: 22px;
}
.card-dark .card-cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--sky); color: var(--navy);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  padding: 10px 20px; border-radius: 6px;
  border: 2px solid rgba(255,255,255,0.12);
  transition: gap 0.2s ease;
}
.card-dark:hover .card-cta { gap: 14px; }

/* ── CARD 2: LIGHT (Guide/) ── */
.card-light { background: #fff; box-shadow: 6px 6px 0 var(--yellow); }
.card-light:hover { box-shadow: 10px 10px 0 var(--yellow); }

.card-light .card-visual {
  height: 200px; position: relative; overflow: hidden;
  background: var(--cream);
  border-bottom: 2.5px solid var(--navy);
}
.card-light .v-number {
  position: absolute; bottom: -16px; right: 12px;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 7.5rem; font-weight: 900; color: rgba(10,20,40,0.055);
  letter-spacing: -0.06em; line-height: 1;
  user-select: none; pointer-events: none;
}
.card-light .v-chips {
  position: absolute; top: 16px; left: 20px;
  display: flex; flex-direction: column; gap: 7px;
}
.v-chip {
  display: inline-flex; align-items: center; gap: 6px;
  border: 1.5px solid var(--navy); border-radius: 100px;
  padding: 4px 12px; font-family: 'JetBrains Mono', monospace;
  font-size: 0.55rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  box-shadow: 2px 2px 0 var(--navy);
}
.v-chip.c-orange { background: var(--orange); color: #fff; border-color: var(--navy); }
.v-chip.c-yellow { background: var(--yellow); color: var(--navy); }
.v-chip.c-mint   { background: var(--mint);   color: var(--navy); }
.v-chip-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: 0.55; }

.card-light .card-body { padding: 24px 24px 22px; }
.card-light .card-num {
  font-family: 'Fraunces', serif; font-style: italic;
  font-size: 2.8rem; font-weight: 700; color: rgba(10,20,40,0.06);
  line-height: 1; margin-bottom: 2px;
}
.card-light .card-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.58rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--orange); margin-bottom: 8px;
}
.card-light .card-title {
  font-size: 1.5rem; font-weight: 900; color: var(--navy);
  letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 10px;
}
.card-light .card-title em {
  font-family: 'Fraunces', serif; font-style: italic;
  font-weight: 400; color: var(--orange);
}
.card-light .card-desc {
  font-size: 0.83rem; color: rgba(10,20,40,0.52);
  line-height: 1.6; margin-bottom: 22px;
}
.card-light .card-cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--orange); color: #fff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  padding: 10px 20px; border-radius: 6px;
  border: 2px solid var(--navy);
  box-shadow: 3px 3px 0 var(--navy);
  transition: gap 0.2s ease, box-shadow 0.2s ease;
}
.card-light:hover .card-cta { gap: 14px; box-shadow: 5px 5px 0 var(--navy); }
```

- [ ] **Step 2: Add marquee + cards HTML** — paste inside `<body>` after `</section>` (hero):

```html
<!-- MARQUEE -->
<div class="marquee-wrap" aria-hidden="true">
  <div class="marquee-inner">
    <span>IA &amp; Management</span><span class="mk">★</span>
    <span>Expérience Interactive</span><span class="mk">★</span>
    <span>Guide du Manager</span><span class="mk">★</span>
    <span>Édition 2026</span><span class="mk">★</span>
    <span>Assurance &amp; IA</span><span class="mk">★</span>
    <span>Prompt Builder</span><span class="mk">★</span>
    <span>IA &amp; Management</span><span class="mk">★</span>
    <span>Expérience Interactive</span><span class="mk">★</span>
    <span>Guide du Manager</span><span class="mk">★</span>
    <span>Édition 2026</span><span class="mk">★</span>
    <span>Assurance &amp; IA</span><span class="mk">★</span>
    <span>Prompt Builder</span><span class="mk">★</span>
  </div>
</div>

<!-- PROJECTS -->
<section class="projects">
  <div class="projects-header" id="proj-header">
    <span class="projects-label">Choisissez votre format</span>
    <span class="projects-count">02 projets disponibles</span>
  </div>

  <div class="cards-grid">

    <!-- CARD 1: dark — L'Expérience Interactive -->
    <a class="project-card card-dark" id="card1"
       href="ia-management-experience.html">
      <div class="card-visual">
        <div class="visual-grid"></div>
        <div class="visual-badge">◉ Immersif · 3D · Animé</div>
        <div class="visual-ghost">L'Expérience<br>Interactive</div>
      </div>
      <div class="card-body">
        <div class="card-num">01</div>
        <div class="card-tag">◉ Projet 01 — Expérience</div>
        <h2 class="card-title">L'Expérience<br>Interactive</h2>
        <p class="card-desc">Une plongée cinématique dans l'univers de l'IA &amp; du management. Animations GSAP, environnement 3D Spline, narration visuelle. Pour les esprits curieux qui aiment être surpris.</p>
        <span class="card-cta">Explorer le projet <span aria-hidden="true">→</span></span>
      </div>
    </a>

    <!-- CARD 2: light — Le Guide du Manager -->
    <a class="project-card card-light" id="card2"
       href="Guide/">
      <div class="card-visual">
        <div class="v-number">02</div>
        <div class="v-chips">
          <span class="v-chip c-orange"><span class="v-chip-dot"></span>Glossaire décrypté</span>
          <span class="v-chip c-yellow"><span class="v-chip-dot"></span>Quiz de niveau</span>
          <span class="v-chip c-mint"><span class="v-chip-dot"></span>Prompt builder</span>
        </div>
      </div>
      <div class="card-body">
        <div class="card-num">02</div>
        <div class="card-tag">◎ Projet 02 — Éditorial</div>
        <h2 class="card-title">Le Guide<br><em>du Manager</em></h2>
        <p class="card-desc">Tout ce qu'un manager doit savoir sur l'IA en 15&nbsp;minutes chrono. Métaphores acérées, schémas vectoriels, playground de prompts et quiz interactif. Zéro jargon inutile.</p>
        <span class="card-cta">Lire le guide <span aria-hidden="true">→</span></span>
      </div>
    </a>

  </div>
</section>
```

- [ ] **Step 3: Verify in browser**

Refresh. Expected: marquee ticker scrolling left, two cards visible (opacity 0, will animate in via JS), dark card on left with glow orbs animating, light card on right with ghost number and feature chips. No horizontal overflow.

---

## Task 5: Footer + JS entrance animations

**Files:**
- Modify: `index.html` — add footer CSS + HTML, add `<script>` block before `</body>`

- [ ] **Step 1: Add footer CSS** — paste inside `<style>`:

```css
/* ── FOOTER ── */
footer {
  border-top: 2px solid var(--navy);
  padding: 22px 40px;
  display: flex; align-items: center; justify-content: space-between;
  background: var(--navy);
}
.footer-logo {
  font-size: 0.9rem; font-weight: 900; letter-spacing: -0.03em; color: var(--cream);
}
.footer-logo span { color: var(--orange); }
.footer-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.55rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
  color: rgba(250,246,238,0.3);
}
@media (max-width: 480px) {
  footer { flex-direction: column; gap: 8px; text-align: center; padding: 20px 24px; }
}
```

- [ ] **Step 2: Add footer HTML** — paste inside `<body>` after the projects `</section>`:

```html
<footer>
  <span class="footer-logo">MM<span>IA</span>4</span>
  <span class="footer-meta">IA &amp; Management · Édition 2026</span>
</footer>
```

- [ ] **Step 3: Add JS entrance animation** — paste before `</body>`:

```html
<script>
(async function () {
  function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

  // 1. Nav slides down
  await wait(80);
  document.getElementById('nav').classList.add('visible');

  // 2. Hero badge fades up
  await wait(220);
  document.getElementById('hero-badge').classList.add('visible');

  // 3. Headline words stagger in
  const words = ['w1', 'w2', 'w3', 'w4'];
  for (let i = 0; i < words.length; i++) {
    await wait(i === 0 ? 200 : 130);
    document.getElementById(words[i]).classList.add('visible');
  }

  // 4. Subtitle + stats row
  await wait(160);
  document.getElementById('hero-sub').classList.add('visible');

  // 5. Scroll-triggered: section header + cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.getElementById('proj-header').style.transitionDelay = '0s';
  document.getElementById('card1').style.transitionDelay = '0.08s';
  document.getElementById('card2').style.transitionDelay = '0.2s';

  ['proj-header', 'card1', 'card2'].forEach(id => {
    observer.observe(document.getElementById(id));
  });
})();
</script>
```

- [ ] **Step 4: Full visual verification**

Open `C:\Repos\MMIA4\index.html` in browser. Check each item:

| Check | Expected |
|-------|----------|
| On load | Nav slides in from top within 100ms |
| On load | Orange badge appears, then headline words animate in one by one |
| On load | Subtitle fades in after headline |
| Scroll down | Section header fades up, then Card 1 then Card 2 stagger in |
| Hover Card 1 | Card lifts, sky-blue shadow grows, CTA arrow widens |
| Hover Card 2 | Card lifts, yellow shadow grows, CTA arrow widens |
| Click Card 1 | Navigates to `ia-management-experience.html` |
| Click Card 2 | Navigates to `Guide/` (will 404 locally — correct, Guide needs to be built first) |
| Marquee | Scrolls left continuously, no jump |
| Mobile (< 768px) | Cards stack vertically, hero text scales down |
| Background orbs | Drift slowly, visible but subtle |

---

## Task 6: Commit and push

**Files:**
- Commit: `index.html`

- [ ] **Step 1: Stage and commit**

```bash
git -C "C:\Repos\MMIA4" add index.html
git -C "C:\Repos\MMIA4" -c user.name="Kazafk" -c user.email="florent.caste@gmail.com" commit -m "feat: add homepage (editorial hub with two project cards)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

Expected output: `[master xxxxxxx] feat: add homepage ...`

- [ ] **Step 2: Push**

```bash
git -C "C:\Repos\MMIA4" push
```

Expected: `master -> master` push confirmation.

- [ ] **Step 3: Wait for GitHub Actions and verify**

1. Go to `https://github.com/Kazafk/mmia4/actions` — wait for the "Deploy to GitHub Pages" workflow to complete (≈ 2 min).
2. Open `https://kazafk.github.io/mmia4/` — homepage should load with all animations.
3. Click **Card 1** → should navigate to `https://kazafk.github.io/mmia4/ia-management-experience.html`.
4. Click **Card 2** → should navigate to `https://kazafk.github.io/mmia4/Guide/`.
