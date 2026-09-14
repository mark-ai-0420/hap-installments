# HAP Installments Design System (DESIGN.md)

This document defines the visual world, design tokens, typography, component rules, and craft standards for **HAP Installments**. Any future feature iteration, page addition, or component update must adhere to these specifications.

---

## 1. Product Identity & Design Direction

- **Product**: Short-term monthly installment payment assistance for tuition and travel in the Philippines.
- **Value Proposition**: Direct school and vendor disbursement, 3% fixed add-on rate, no hidden charges, and transparent repayment schedules.
- **Design Language**: Modern Financial Editorial & Restrained Tactile Craft.
- **Target Audience**: Students, parents, working professionals, and families seeking predictable, stress-free installment schedules.
- **Design Dials**:
  - `DESIGN_VARIANCE: 7` (Refined, asymmetric, purposeful editorial hierarchy)
  - `MOTION_INTENSITY: 4` (Restrained, smooth, physics-aware, strictly accessible)
  - `VISUAL_DENSITY: 3` (Generous whitespace, scannable financial amounts, zero cognitive clutter)

---

## 2. Color Palette & Token System

All colors are registered under `@theme inline` in [`src/app/globals.css`](file:///Users/markhuelgas/Documents/antigravity/hap-installments/src/app/globals.css). Never hardcode arbitrary unverified hex values in components.

### 2.1 Brand Tokens

| Token Name | Value | Contrast on White | Primary Usage |
|---|---|:---:|---|
| `--color-brand-charcoal` | `#3D454A` | **9.1:1** (AAA) | Headings, primary titles, dark buttons |
| `--color-brand-charcoal-dark` | `#1E2326` | **15.2:1** (AAA) | Footers, dark section backdrops, high-contrast text |
| `--color-brand-charcoal-muted` | `#4F5961` | **7.4:1** (AAA) | Secondary labels, subheadings, metadata |
| `--color-brand-accent` | `#1F6F94` | **5.4:1** (AA) | Primary interactive accents, active tabs, primary CTAs (white text) |
| `--color-brand-accent-hover` | `#175775` | **6.8:1** (AAA) | Button and link hover states |
| `--color-brand-accent-light` | `#66B3D6` | — | Decorative SVG accents, subtle borders, highlight rings |
| `--color-brand-accent-subtle` | `#F0F7FB` | — | Light blue pill badges, info banner backdrops |
| `--color-brand-amber` | `#B45309` | **5.2:1** (AA) | Upfront installment indicators, fee highlights |
| `--color-brand-amber-subtle` | `#FEF3C7` | — | Upfront option highlight pills (`bg-amber-100 text-amber-800`) |
| `--color-surface-bg` | `#FAFAFA` | — | Page background, off-white card wells |

### 2.2 Strict Contrast Policy
- **Never** use `#66B3D6` for body text or button foregrounds on light backgrounds (contrast is only 2.24:1).
- **Always** use `#1F6F94` for primary accent copy, icons with semantic meaning, and buttons with white text (contrast $\ge 5.4:1$).
- **Always** use `#B45309` for warning or upfront badge text (contrast $\ge 5.1:1$).

---

## 3. Typography & Hierarchy

Font family: **Inter** loaded via `next/font/google` (`--font-inter`, `--font-sans`).

### 3.1 Type Scale

```
Display Hero:   text-4xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-black tracking-tight leading-[1.08]
Section H2:     text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-brand-charcoal
Card H3:        text-xl sm:text-2xl font-bold tracking-tight text-brand-charcoal
Eyebrow Pill:   text-xs font-bold uppercase tracking-[0.2em] text-brand-accent
Body Large:     text-lg sm:text-xl text-slate-600 font-normal leading-relaxed
Body Base:      text-sm sm:text-base text-slate-600 font-normal leading-relaxed
Metric / Value: text-3xl sm:text-4xl md:text-5xl font-black text-brand-charcoal tabular-nums
```

### 3.2 Tabular Numbers Rule
Any element rendering currency values, percentages, monthly payment breakdowns, or dates **must** include the `tabular-nums` utility class. This prevents column shifting and layout jitter as numbers change.

---

## 4. Spacing, Shapes & Surfaces

### 4.1 Border Radii
- **`rounded-full`**: Action pills, CTA buttons, status badges, stepper buttons.
- **`rounded-3xl`** (`24px`): Feature cards, calculator containers, schedule wrappers.
- **`rounded-2xl`** (`16px`): Input fields, icon containers, tenure selection tabs.
- **`rounded-xl`** (`12px`): Dropdown items, mobile nav links, secondary tags.

### 4.2 Shadows & Borders
- Favor tactile borders over heavy shadows: `border border-slate-200/90 shadow-xs`.
- On interactive hover: `hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`.
- Section divides: `border-b border-slate-200/50` or `border-t border-slate-100`.

### 4.3 Section Atmospheres
- Avoid generic artificial grid overlays and harsh radial glow spheres.
- Use restrained atmospheric washes:
  `bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(31,111,148,0.08),rgba(250,250,250,0))]`

---

## 5. Component Patterns

### 5.1 Buttons
- **Primary CTA**:
  ```tsx
  <Button asChild className="bg-[#1F6F94] hover:bg-[#175775] text-white rounded-full px-8 sm:px-10 py-6 sm:py-7 min-h-[48px] font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:transform-none">
    <a href="https://www.facebook.com/hap.installments">Message us</a>
  </Button>
  ```
- **Secondary / Outline**:
  ```tsx
  <Button asChild variant="outline" className="rounded-full px-8 sm:px-10 py-6 sm:py-7 min-h-[48px] font-semibold text-[#3D454A] border-slate-300 hover:bg-slate-50 transition-all duration-300 bg-white shadow-xs motion-reduce:transition-none motion-reduce:transform-none">
    <Link href="#how-it-works">Learn more</Link>
  </Button>
  ```
- **Steppers & Icon Buttons**:
  - Touch targets must be at least **44×44px** (`h-11 w-11 shrink-0 rounded-full`).
  - Focus indicators must be prominent: `focus-visible:ring-2 focus-visible:ring-[#1F6F94]`.

### 5.2 Mobile-First Data Presentation
For data-dense schedules or financial breakdowns:
- **Mobile (`md:hidden`)**: Stacked card view showing month, due date, principal, and total payment.
- **Desktop (`hidden md:block`)**: Accessible table with `scope="col"`, `tabIndex={0}`, `role="region"`, and clear keyboard focus ring.

### 5.3 Semantic Content Structure
- Sequential processes must use `<ol>` with numbered badge indicators.
- Feature and trust points must use `<ul role="list">` with `<li>` tags.
- Decorative SVGs and icons must always carry `aria-hidden="true"`.

---

## 6. Accessibility & Motion Guidelines (A11y Floor)

1. **WCAG AA Compliance**:
   - Contrast ratio $\ge 4.5:1$ for normal text; $\ge 3:1$ for large headings and UI icons.
   - Touch targets $\ge 44\times 44\text{px}$ on mobile.
2. **Reduced Motion**:
   - In `globals.css`: `@media (prefers-reduced-motion: reduce)` globally disables jarring animations and scroll behavior.
   - At component level: Every transform, hover translation, or scale must include `motion-reduce:transition-none motion-reduce:transform-none hover:motion-reduce:translate-y-0`.

---

## 7. Anti-Patterns (Strictly Banned)

| Banned Anti-Pattern | Why Banned | What to Use Instead |
|---|---|---|
| **Gradient Text Heading** (`bg-clip-text bg-gradient`) | Generic AI slop, hurts readability | Solid high-contrast brand typography (`text-[#1F6F94]` or `text-[#3D454A]`) |
| **Multi-layer Blurred Radial Orbs** (`blur-[120px]`) | AI template trope, degrades financial authority | Restrained atmospheric gradients, clean card surfaces |
| **Sub-44px Mobile Controls** | Causes mis-taps on smartphones | Explicit `min-h-[44px] min-w-[44px]` or `h-11 w-11` buttons |
| **Giant 5% Opacity Background Watermarks** | Outdated 2020 web template aesthetic | Structured feature pills, clear requirement lists, category badges |
| **Unlinked Brand Hex Codes** | Fractures theming across files | CSS variables in `@theme inline` (`--color-brand-*`) |
| **Cards-Inside-Cards Recursion** | Visual noise and container bloating | Flat tactile cards with subtle separators (`border-t border-slate-100`) |

---

## 8. Directory & Asset Conventions

- **Global Styles**: [`src/app/globals.css`](file:///Users/markhuelgas/Documents/antigravity/hap-installments/src/app/globals.css) (Tailwind v4 `@theme`, font variables, `@media` accessibility).
- **Root Layout & Meta**: [`src/app/layout.tsx`](file:///Users/markhuelgas/Documents/antigravity/hap-installments/src/app/layout.tsx) (Inter font variable, OpenGraph 1200×630 metadata).
- **Core Components**:
  - `Logo.tsx` & `LogoLink.tsx`: Accessible SVG logo with stepped bars and brand wordmark.
  - `MobileNav.tsx`: Radix UI Sheet drawer with $\ge 44\text{px}$ touch targets.
  - `SampleInstallmentCalculator.tsx`: Client component computing Option A / Option B, add-on rates, and dual mobile-card/desktop-table schedules.
- **Static Assets**: [`public/og-image.jpg`](file:///Users/markhuelgas/Documents/antigravity/hap-installments/public/og-image.jpg) (1200×630 verified OpenGraph image).
