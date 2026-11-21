### **ayniradar-design-system**

Apply the official AyniRadar visual identity and "Noche de emergencia" dark UI design system using Poppins typography, standardized color tokens (\#0D1520, \#16222F, \#E9F1F5, \#2BB673, \#4FB3F0, \#F5B324, \#EF5A4C), WCAG-safe contrast rules, map severity ramps, and the AyniRadar brand logo. Use whenever designing or coding UI components, Next.js/React pages, Tailwind/CSS styles, dashboards, heatmaps, alert cards, QR donation modals, presentations, or documents for AyniRadar.

#### **Instructions**

# **AyniRadar Design System**

Standardize typography (Poppins), dark-mode color hierarchy ("Noche de emergencia"), semantic alert states, map visualizations, and logo usage across all AyniRadar interfaces and deliverables.

## **When to Use**

* Building UI components, dashboards, landing pages, or modals for AyniRadar in Next.js, React, HTML, or Tailwind CSS  
* Styling headings, body text, KPIs, badges, buttons, tables, forms, and alert notifications  
* Applying consistent severity colors to maps, heatmaps, choropleths, and institutional alert levels  
* Placing the AyniRadar brand logo (assets/ayniradar-logo.png) in headers, cards, or reports

## **Reference Assets**

* Load references/tokens.css when generating CSS custom properties, Tailwind v4 @theme configuration, or Next.js Poppins font setup.  
* Reference assets/ayniradar-logo.png for the official AyniRadar emblem and wordmark.

## **1\. Color System ("Noche de emergencia")**

Use the core palette strictly by semantic role so dark emergency dashboards stay calm, legible, and high-contrast during rapid scanning.

### **Core Brand and Surface Tokens**

| Token | Hex | Role |
| :---- | :---- | :---- |
| \--bg-canvas | \#0D1520 | Main application background, shell, and page canvas |
| \--bg-surface | \#16222F | Cards, sidebars, drawers, modals, and floating map panels |
| \--bg-surface-elevated | \#1E2E3F | Card hover states, dropdown menus, table headers, active tabs |
| \--border-subtle | \#243447 | Default 1px dividers, card borders, and table grid lines |
| \--border-strong | \#33485F | Input borders, interactive controls, and emphasized outlines |

### **Text Hierarchy Tokens**

| Token | Hex | Usage |
| :---- | :---- | :---- |
| \--text-primary | \#E9F1F5 | H1-H3 headings, KPI numbers, primary body copy, active nav items |
| \--text-secondary | \#A6B9C7 | Subtitles, lead descriptions, table column headers, secondary metadata |
| \--text-muted | \#6F879A | Timestamps, input placeholders, helper copy, map attribution, footnotes |
| \--text-inverse | \#0D1520 | Text and icons placed on top of solid accent buttons or solid status pills |

### **Semantic Accent Tokens**

| Role | Solid Hex | Hover Hex | Soft Surface (Badges/Callouts) | Border (40-45%) |
| :---- | :---- | :---- | :---- | :---- |
| **Primario** (CTA, Safe, QR Verified) | \#2BB673 | \#34C981 | rgba(43, 182, 115, 0.15) | rgba(43, 182, 115, 0.40) |
| **Info** (Hydrology, Weather, Neutral) | \#4FB3F0 | \#69C1F5 | rgba(79, 179, 240, 0.15) | rgba(79, 179, 240, 0.40) |
| **Alerta** (Warning, Level 1-2, Radar) | \#F5B324 | \#F8C34D | rgba(245, 179, 36, 0.16) | rgba(245, 179, 36, 0.45) |
| **Peligro** (Critical, Level 3, Fire) | \#EF5A4C | \#F37266 | rgba(239, 90, 76, 0.16) | rgba(239, 90, 76, 0.45) |

## **2\. Typography Standard (Poppins)**

Load **Poppins** with weights 400, 500, 600, and 700 (via next/font/google in Next.js or Google Fonts in standalone HTML). Set font-variant-numeric: tabular-nums on all KPI counters, coordinates, timestamps, and donation totals so live values align without jitter.

| Level | Size (rem / px) | Weight | Line Height | Tracking | Color Token | Usage |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Display / Hero KPI** | 2.25rem (36px) | 700 Bold | 1.15 | \-0.025em | \--text-primary | Main KPI figures and hero headlines |
| **H1 (Page Title)** | 1.75rem (28px) | 700 Bold | 1.20 | \-0.02em | \--text-primary | Top-level view and report titles |
| **H2 (Section Title)** | 1.375rem (22px) | 600 SemiBold | 1.25 | \-0.015em | \--text-primary | Major dashboard sections and modal titles |
| **H3 (Card Title)** | 1.0625rem (17px) | 600 SemiBold | 1.35 | \-0.01em | \--text-primary | Panel titles, alert card headers, chart titles |
| **Eyebrow / Overline** | 0.75rem (12px) | 600 SemiBold | 1.20 | 0.08em (uppercase) | \--color-info or \--text-secondary | Category kickers, department tags, section labels |
| **Body Primary** | 0.9375rem (15px) | 400 Regular | 1.60 | 0 | \--text-primary | Main paragraphs and alert descriptions (max 70ch) |
| **Body Secondary** | 0.875rem (14px) | 400 Regular | 1.50 | 0 | \--text-secondary | Supporting copy, table rows, filter labels |
| **UI Control / Button** | 0.875rem (14px) | 600 SemiBold | 1.20 | 0.01em | \--text-inverse or \--text-primary | Buttons, tabs, navigation links |
| **Caption / Badge** | 0.75rem (12px) | 500 Medium | 1.30 | 0.01em | \--text-muted or semantic color | Timestamps, coordinates, status chips |

## **3\. Component and Map Rules**

1. **Buttons and CTAs**

   * Primary action (e.g., "Donar con QR", "Emitir Alerta"): background \#2BB673, text \#0D1520 (600), hover \#34C981.  
   * Secondary action: background \#16222F, border 1px solid \#33485F, text \#E9F1F5, hover \#1E2E3F.  
   * Destructive or critical override: background \#EF5A4C, text \#0D1520 (600), hover \#F37266.  
   * Focus rings: 2px solid \#4FB3F0 with 2px offset for clear keyboard visibility on dark surfaces.  
2. **Alert Cards and Status Badges**

    Prefer tinted dark badges over full solid blocks to avoid visual fatigue on dense dashboards: use the Soft Surface fill, 1px Border, and the solid semantic hex for text and icon. Reserve solid accent backgrounds for primary CTA buttons and active radar indicators.

3. **Maps, Heatmaps, and Institutional Escalation**

   * Use dark basemaps harmonized with \#0D1520 so data layers stand out immediately.  
   * Map hazard severity consistently: \#4FB3F0 (low / hydrological info) \-\> \#2BB673 (monitored / normal) \-\> \#F5B324 (Nivel 1-2 Alerta Municipal/Departamental) \-\> \#EF5A4C (Nivel 3 Alerta Roja / Peligro Critico).  
   * Keep floating map legends and filter drawers on \#16222F (or rgba(22, 34, 47, 0.92) with backdrop-filter: blur(8px)) and 1px solid \#243447.  
4. **Logo Usage (assets/ayniradar-logo.png)**

    The AyniRadar emblem combines a green left hand (\#2BB673), a blue right hand (\#4FB3F0), and a central amber radar beacon (\#F5B324) over a dark slate wordmark on a light background.

   * On dark \#0D1520 or \#16222F navbars, never place the raw light-background PNG as an unstyled white square. Wrap it in a compact light rounded container (background: \#F7FAFC; padding: 6px 12px; border-radius: 12px;) OR pair the circular emblem with a native dark-mode wordmark in Poppins Bold (700) using \#E9F1F5 for "Ayni" and \#2BB673 or \#4FB3F0 for "Radar".  
   * Preserve clear space around the logo equal to at least 25% of its height and keep navbar height at least 36px.

## **Gotchas**

* **White text fails WCAG on bright accents:** \#FFFFFF on \#2BB673, \#4FB3F0, or \#F5B324 produces poor contrast. Always use \#0D1520 (\--text-inverse) for text and icons on solid accent fills.  
* **Avoid pure \#000000 or \#FFFFFF:** Pure black and pure white create harsh halation in dark emergency rooms. Stick to \#0D1520, \#16222F, and \#E9F1F5.  
* **Do not overuse \#EF5A4C:** Reserve danger red strictly for active critical threats, Nivel 3 alerts, or destructive actions so urgent warnings never blend into decorative UI.  
* **Prevent layout shift in live feeds:** Always apply tabular-nums to Poppins for live metrics (FRP, PM2.5, river discharge, exposed population, QR amounts).

