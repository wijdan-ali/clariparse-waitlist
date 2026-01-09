# Design System + UI Spec (PDF-Tables / “Clariparse”)

Purpose: this document captures the **exact** UI design foundations and patterns used in this repo so you can duplicate the same look/feel in another project with minimal guessing.

---

## Libraries (design/UI related)

- **Next.js App Router** (`next@14`)
- **Tailwind CSS** (`tailwindcss@3`) + **tailwindcss-animate**
- **shadcn/ui-style primitives** (not a package; code lives in `components/ui/*`)
- **Radix UI** (used by shadcn primitives): `@radix-ui/react-slot`, `@radix-ui/react-label`, `@radix-ui/react-separator`
- **next-themes**: theme switching via `class` on `<html>`
- **class-variance-authority**: button variants
- **clsx + tailwind-merge**: class composition (`cn()` helper)
- **lucide-react**: icon set

Non-design but visually relevant:
- **pdfjs-dist**: renders PDF thumbnails (first page) in `PdfThumbnailCell`
- **swr**: data revalidation affects loading/placeholder states

---

## Fonts / Typography

### Primary font (actually used)
- **Antic** (Google Font) loaded via `next/font/google` in `app/fonts.ts`.
- Applied by setting `<html className={antic.variable}>` and then using CSS variable `--font-sans`.

Key wiring:
- `app/fonts.ts`: defines `--font-antic`
- `app/globals.css`:
  - sets `--font-sans: var(--font-antic, Antic), ...system fallbacks`
  - sets `body { font-family: var(--font-sans); }`

### Optional font (wired but not bundled)
- **SF Pro Display** is *not shipped*; it’s declared via `@font-face` in `app/globals.css` pointing at `public/fonts/sf-pro-display/*.woff2`.
- There is a commented-out `next/font/local` block in `app/fonts.ts` explaining licensing + placement.

### Typography conventions

- **Serif token is same as sans**: `--font-serif` points to `--font-sans` (so “serif” is just a semantic style hook).
- Used semantic classes:
  - Sidebar brand and several headings use `font-serif` anyway (still renders as Antic unless you change `--font-serif`).
- Common sizes:
  - Sidebar brand: `text-[25px]` with `tracking-tight`
  - Table name: `text-[34px]` (editable)
  - Records count: `text-[40px]`
  - Sidebar section labels: `text-[12px]`–`text-[13px]` with `tracking-[0.18em]`

---

## Theme, Colors, Radius, Shadows (the tokens)

### Dark mode strategy
- Tailwind is configured with `darkMode: ['class']`.
- Theme provider: `ThemeProvider` wraps the app in `app/layout.tsx` using `next-themes`.
- Toggle: `components/theme-toggle.tsx` toggles between `light` and `dark`.

### Token model
- The app uses **OKLCH CSS variables** and exposes them to Tailwind via `tailwind.config.js` (e.g. `bg-background` → `oklch(var(--background) / <alpha-value>)`).
- Border radius is tokenized via `--radius` and mapped to Tailwind `rounded-lg|md|sm`.

### Canonical token block (copy as-is)

This is the design source of truth. It lives in `app/globals.css` under `@layer base`.

```css
:root {
  --background: 0.9761 0.0041 91.4461;
  --foreground: 0.2417 0.0298 269.8827;
  --card: 1.0000 0 0;
  --card-foreground: 0.2417 0.0298 269.8827;
  --popover: 1.0000 0 0;
  --popover-foreground: 0.2417 0.0298 269.8827;
  --primary: 0.6333 0.0309 154.9039;
  --primary-foreground: 1.0000 0 0;
  --secondary: 0.8596 0.0291 119.9919;
  --secondary-foreground: 0.2417 0.0298 269.8827;
  --muted: 0.9251 0.0071 88.6450;
  --muted-foreground: 0.5510 0.0234 264.3637;
  --accent: 0.8242 0.0221 136.6092;
  --accent-foreground: 0.2417 0.0298 269.8827;
  --destructive: 0.5624 0.1743 26.1433;
  --destructive-foreground: 1.0000 0 0;
  --border: 0.9251 0.0071 88.6450;
  --input: 1.0000 0 0;
  --ring: 0.6333 0.0309 154.9039;
  --chart-1: 0.6333 0.0309 154.9039;
  --chart-2: 0.7209 0.0489 120.9474;
  --chart-3: 0.6744 0.0427 136.0110;
  --chart-4: 0.5510 0.0234 264.3637;
  --chart-5: 0.9251 0.0071 88.6450;
  --radius: 0.35rem;
  --sidebar: 0.9845 0.0026 106.4477;
  --sidebar-foreground: 0.2417 0.0298 269.8827;
  --sidebar-primary: 0.6333 0.0309 154.9039;
  --sidebar-primary-foreground: 1.0000 0 0;
  --sidebar-accent: 0.9251 0.0071 88.6450;
  --sidebar-accent-foreground: 0.2417 0.0298 269.8827;
  --sidebar-border: 0.9251 0.0071 88.6450;
  --sidebar-ring: 0.6333 0.0309 154.9039;
  --shadow-color: #1a1f2e;
  --shadow-opacity: 0.04;
  --shadow-blur: 2px;
  --shadow-spread: 0px;
  --shadow-offset-x: 0px;
  --shadow-offset-y: 1px;
  --letter-spacing: 0em;
  --spacing: 0.23rem;
  --shadow-2xs: 0px 1px 2px 0px hsl(225 27.7778% 14.1176% / 0.02);
  --shadow-xs: 0px 1px 2px 0px hsl(225 27.7778% 14.1176% / 0.02);
  --shadow-sm: 0px 1px 2px 0px hsl(225 27.7778% 14.1176% / 0.04), 0px 1px 2px -1px hsl(225 27.7778% 14.1176% / 0.04);
  --shadow: 0px 1px 2px 0px hsl(225 27.7778% 14.1176% / 0.04), 0px 1px 2px -1px hsl(225 27.7778% 14.1176% / 0.04);
  --shadow-md: 0px 1px 2px 0px hsl(225 27.7778% 14.1176% / 0.04), 0px 2px 4px -1px hsl(225 27.7778% 14.1176% / 0.04);
  --shadow-lg: 0px 1px 2px 0px hsl(225 27.7778% 14.1176% / 0.04), 0px 4px 6px -1px hsl(225 27.7778% 14.1176% / 0.04);
  --shadow-xl: 0px 1px 2px 0px hsl(225 27.7778% 14.1176% / 0.04), 0px 8px 10px -1px hsl(225 27.7778% 14.1176% / 0.04);
  --shadow-2xl: 0px 1px 2px 0px hsl(225 27.7778% 14.1176% / 0.10);
  --tracking-normal: 0em;
}
.dark {
  --background: 0.1448 0 0;
  --foreground: 0.9702 0 0;
  --card: 0.1822 0 0;
  --card-foreground: 0.9702 0 0;
  --popover: 0.1822 0 0;
  --popover-foreground: 0.9702 0 0;
  --primary: 0.6333 0.0309 154.9039;
  --primary-foreground: 0 0 0;
  --secondary: 0.2178 0 0;
  --secondary-foreground: 0.9702 0 0;
  --muted: 0.2178 0 0;
  --muted-foreground: 0.7058 0 0;
  --accent: 0.3709 0.0248 153.9823;
  --accent-foreground: 0.9702 0 0;
  --destructive: 0.6368 0.2078 25.3313;
  --destructive-foreground: 1.0000 0 0;
  --border: 0.2850 0 0;
  --input: 0.1822 0 0;
  --ring: 0.6333 0.0309 154.9039;
  --chart-1: 0.6333 0.0309 154.9039;
  --chart-2: 0.7209 0.0489 120.9474;
  --chart-3: 0.6744 0.0427 136.0110;
  --chart-4: 0.5510 0.0234 264.3637;
  --chart-5: 0.5096 0.0289 152.3460;
  --radius: 0.35rem;
  --sidebar: 0.1684 0 0;
  --sidebar-foreground: 0.9702 0 0;
  --sidebar-primary: 0.6333 0.0309 154.9039;
  --sidebar-primary-foreground: 1.0000 0 0;
  --sidebar-accent: 0.2178 0 0;
  --sidebar-accent-foreground: 0.9702 0 0;
  --sidebar-border: 0.2850 0 0;
  --sidebar-ring: 0.6333 0.0309 154.9039;
  --shadow-color: #000000;
  --shadow-opacity: 0.04;
  --shadow-blur: 2px;
  --shadow-spread: 0px;
  --shadow-offset-x: 0px;
  --shadow-offset-y: 1px;
  --letter-spacing: 0em;
  --spacing: 0.23rem;
  --shadow-2xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.02);
  --shadow-xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.02);
  --shadow-sm: 0px 1px 2px 0px hsl(0 0% 0% / 0.04), 0px 1px 2px -1px hsl(0 0% 0% / 0.04);
  --shadow: 0px 1px 2px 0px hsl(0 0% 0% / 0.04), 0px 1px 2px -1px hsl(0 0% 0% / 0.04);
  --shadow-md: 0px 1px 2px 0px hsl(0 0% 0% / 0.04), 0px 2px 4px -1px hsl(0 0% 0% / 0.04);
  --shadow-lg: 0px 1px 2px 0px hsl(0 0% 0% / 0.04), 0px 4px 6px -1px hsl(0 0% 0% / 0.04);
  --shadow-xl: 0px 1px 2px 0px hsl(0 0% 0% / 0.04), 0px 8px 10px -1px hsl(0 0% 0% / 0.04);
  --shadow-2xl: 0px 1px 2px 0px hsl(0 0% 0% / 0.10);
}
```

---

## Tailwind wiring (must match)

### `tailwind.config.js` conventions
- `fontFamily.sans/serif/mono` are CSS variables (so swapping fonts is a token edit).
- Color names are semantic and map to OKLCH variables:
  - `bg-background`, `text-foreground`
  - `bg-card`, `text-card-foreground`
  - `bg-sidebar`, `text-sidebar-foreground`
  - `bg-primary`, `text-primary-foreground`
  - etc.

### shadcn config (`components.json`)
- Style: `"new-york"`
- `cssVariables: true` (critical; design depends on token variables)
- Icon library: `lucide`

---

## Global CSS: scrollbars + special effects

All of these live in `app/globals.css`.

### “Notion-like” scrollbar styling (global)
- WebKit scrollbars are always visible and rounded.
- Thumb color:
  - Normal: `rgba(55, 53, 47, 0.16)`
  - Hover: `rgba(55, 53, 47, 0.24)`

### Utilities

#### `.scrollbar-hide`
- Hides scrollbars cross-browser but keeps scrolling.

#### `.sidebar-scroll` + `.sidebar-shell:hover .sidebar-scroll`
- Sidebar scrollbars are **hidden by default**, become visible only when hovering the sidebar shell.

#### `.sidebar-scroll-fade`
- Applies a bottom fade mask so the scroll area “soft stops” without a hard overlay band.

#### `.cell-hover-fade:hover .cell-text`
- Masks text on hover to fade out near the right edge (prevents action icons from visually overlapping text).
- Controlled by CSS variable `--fade-cutoff` which components set (e.g. `52px` for headers, `28px` for body cells).

#### `.grainy-surface`
- Adds a noise/grain overlay using an inline SVG turbulence tile.
- Blending: `mix-blend-mode: soft-light`
- Dark mode opacity increases.
- Used by `Card` primitive (so most cards inherit grain).

---

## Core UI primitives (shadcn-like, but customized)

### `cn()` helper
- Location: `lib/utils.ts`
- Composition: `twMerge(clsx(...))`

### Button (`components/ui/button.tsx`)

Base (applies to all variants):
- `inline-flex`, `rounded-xl`, `text-sm font-medium`
- `transition-colors`
- `focus-visible:ring-1 focus-visible:ring-ring`
- Disabled: `disabled:pointer-events-none disabled:opacity-50`
- SVG defaults: `[_svg]:size-4` etc.

Variants:
- **default**: `bg-primary text-primary-foreground shadow hover:bg-primary/90`
- **destructive**: `bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90`
- **outline**: `border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground`
- **secondary**: `bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80`
- **ghost**: `hover:bg-accent hover:text-accent-foreground`
- **link**: `text-primary underline-offset-4 hover:underline`

Sizes:
- default: `h-9 px-4 py-2`
- sm: `h-8 rounded-xl px-3 text-xs`
- lg: `h-10 rounded-xl px-8`
- icon: `h-9 w-9`

### Card (`components/ui/card.tsx`)

Card surface:
- `grainy-surface`
- `rounded-xl border bg-card text-card-foreground shadow-sm`
- Transition: `transition-[border-color,box-shadow,transform] duration-200 ease-out`
- Hover: `hover:border-ring/40`

Card layout primitives:
- Header: `p-6` + spacing
- Content: `p-6 pt-0`
- Footer: `p-6 pt-0 flex items-center`
- Title: `font-semibold leading-none tracking-tight`
- Description: `text-sm text-muted-foreground`

### Input / Textarea (`components/ui/input.tsx`, `components/ui/textarea.tsx`)
- Surface: transparent (inherits parent bg)
- Border: `border border-input`
- Focus: `focus-visible:ring-1 focus-visible:ring-ring`
- Placeholder: `text-muted-foreground`
- Disabled: opacity + cursor

### Separator (`components/ui/separator.tsx`)
- `bg-border`, 1px thick, horizontal or vertical.

### Theme toggle (`components/theme-toggle.tsx`)
- Control style matches “icon button” pattern:
  - `rounded-xl border border-border bg-card ... shadow-sm transition-colors`
  - Hover: `hover:bg-accent hover:text-accent-foreground`
- Icons:
  - Sun shown in light (`dark:hidden`)
  - Moon shown in dark (`dark:block`)

---

## Layout system

### App root layout (`app/layout.tsx`)
- Wraps everything in `ThemeProvider` with:
  - `attribute="class"`
  - `defaultTheme="system"`
  - `enableSystem`
  - `disableTransitionOnChange` (prevents ugly transitions on theme switch)

### Tables layout shell (persistent sidebar + persistent table detail client)

#### Main layout container (`app/components/TableLayout.tsx`)
- Root: `flex min-h-screen bg-background overflow-x-hidden`
- Sidebar is fixed with width `w-80` (20rem).
- Main content gets `ml-80` when sidebar is open; `ml-0` when collapsed.
- When collapsed, there is a floating “open sidebar” icon button:
  - `fixed left-4 top-4 z-50 rounded-xl border border-border bg-card ... backdrop-blur-md hover:bg-accent`

---

## Sidebar (the single most distinctive design element)

Location: `app/components/Sidebar.tsx`

### Dimensions and positioning
- Fixed left rail:
  - `fixed left-0 top-0 bottom-0 w-80 z-50`
- Collapsing:
  - Open: `translate-x-0`
  - Collapsed: `-translate-x-full`
  - Transition: `transition-transform duration-300 ease-out`

### Shell shape
- Rounded right corners: `rounded-tr-[28px] rounded-br-[28px]`
- Background color: `bg-sidebar`
- Text color: `text-sidebar-foreground`

### Background layers (stacked)
1) **Token gradient wash**:
   - `bg-gradient-to-b from-sidebar via-sidebar to-sidebar/95`
2) **Mouse-follow spotlight**:
   - Dynamic CSS vars: `--spot-x`, `--spot-y`, `--spot-o`
   - Radial gradient uses `--sidebar-primary` mixed into transparency.
3) **Extra grain layer (SVG turbulence)**:
   - Tunable constants in file:
     - `SIDEBAR_GRAIN_OPACITY`
     - `SIDEBAR_GRAIN_SCALE_PX`
     - `SIDEBAR_GRAIN_CONTRAST`
     - `SIDEBAR_GRAIN_BRIGHTNESS`
   - Blending: `mixBlendMode: 'soft-light'`

### Right edge lines (visual separation with no gap)
- Outer border line: `w-px bg-sidebar-border` (full height)
- Inner highlight: gradient line with `bg-gradient-to-b ... opacity-95`

### Top header area
- Brand link:
  - `font-serif text-[25px] tracking-tight`
  - Color: `text-sidebar-foreground/95` → hover to full opacity
- Icon buttons (theme + collapse):
  - Match the “icon button” style used elsewhere:
    - `rounded-xl border border-border bg-card ... shadow-sm backdrop-blur-md hover:bg-accent`
- Divider:
  - Hairline gradient: `h-px bg-gradient-to-r from-transparent via-sidebar-foreground/35 to-transparent`

### Primary CTA (“New Table”)
This is a reusable pattern: **glassy primary pill** + subtle hover lift.

- Wrapper:
  - `rounded-xl border border-primary/35 bg-primary text-primary-foreground`
  - `shadow-sm backdrop-blur-md`
  - Transition: `transition-[background-color,border-color,transform,box-shadow,filter]`
  - Hover:
    - `hover:-translate-y-[1px] hover:shadow-md hover:brightness-[1.03]`
  - Active:
    - `active:translate-y-0 active:brightness-[0.99]`
- Glass highlight overlay:
  - `absolute inset-0 bg-gradient-to-b from-primary-foreground/18 to-transparent`
  - opacity increases on hover
- Icon badge:
  - Circular, translucent fill: `bg-primary-foreground/14`
  - Border: `border-primary-foreground/45` → hover stronger

### Tables list (section + rows)

Section label:
- `text-[13px] font-semibold tracking-[0.18em] text-sidebar-foreground/60`

Row container:
- Rounded item: `rounded-xl border transition-[...] duration-200 ease-out`
- States:
  - **Active**: subtle `bg-sidebar-primary/10` with accent border and an inset highlight shadow.
  - **Menu open**: `bg-sidebar-accent/70` (or dark variant) + border visible.
  - **Hover**: shows `bg-sidebar-accent/70`, border appears, shadow-sm.

Row actions (“…” menu button):
- Hidden by default: `opacity-0 group-hover/table:opacity-100 transition-opacity`
- Hover: changes text color only (not background).

Menu popover:
- `fixed z-[100] w-44 rounded-xl border bg-card shadow-lg backdrop-blur-md overflow-hidden`
- Menu item:
  - `text-destructive hover:bg-destructive/10`

### Bottom segment: “MODEL” selector
- Label matches sidebar section label style.
- Segmented control:
  - container: `inline-flex w-full rounded-xl border bg-card/70 p-1 shadow-sm backdrop-blur-md`
  - active segment: `bg-primary text-primary-foreground`
  - inactive: `text-foreground/80 hover:bg-muted/40`

---

## Modal / dialog pattern

Used in:
- `AddColumnModal`
- `EditColumnModal`
- `ConfirmDialog`

### Overlay
- `fixed inset-0 z-50`
- backdrop:
  - `bg-background/60`
  - `backdrop-blur-sm`
- click-outside closes (either `onClick` or `onMouseDown` depending on component)

### Modal card
- Centered container: `flex items-center justify-center`
- Card: `shadow-xl` on top of base Card styling
- Actions: right-aligned button row, typically `ghost` cancel + default/destructive confirm.

### Inline error message pattern
Used in several screens:
- `rounded-md border border-destructive/30 bg-destructive/10 ... text-destructive`

---

## Page-level layouts

### Login page (`app/login/page.tsx`)
- Full-screen center: `min-h-screen flex items-center justify-center bg-background`
- Card:
  - `w-full max-w-md shadow-xl`
  - Header: centered title + description
- Primary action: full-width button `className="w-full"`
- Secondary action: link-variant button, `className="px-0"`

### Tables index (`app/tables/page.tsx`)
- Page padding: `p-8`
- Title: `text-3xl font-semibold`
- Empty state:
  - centered block with emoji, headline, supporting text, “New Table” button
- Non-empty: grid of cards
  - responsive columns: `md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
  - Card hover: adds `hover:shadow-md` (on top of base card hover border behavior)

### “Create new table” (`app/tables/new/page.tsx`)
- Container: `p-8 max-w-2xl`
- Form card: `shadow-sm` (keeps it subtle)

---

## Table detail page: overall composition

Location: `app/tables/[tableId]/components/TableDetailClient.tsx`

Spacing:
- Top padding: `pt-8 pb-8`
- The header/upload area uses left padding that accounts for the table gutter:
  - `pl-[100px] pr-8`

Top section:
- Editable table name (see below)
- Two side-by-side cards:
  - `RecordsCard` (w-[380px] h-[145px])
  - `UploadPanel` (w-[380px] h-[145px])
  - Wraps on small screens: `flex flex-wrap gap-5 items-stretch`

Bottom section:
- `ExtractedRowsGrid` is “full-bleed” inside main (no extra horizontal padding inside it besides its own design).

---

## Editable table title (Notion-like)

Location: `app/components/EditableTableName.tsx`

Visual:
- Uses `font-serif text-[34px] font-bold leading-[1.25]`
- Hover affordance when not editing: `hover:bg-accent/50 transition-colors`

No-layout-jump technique:
- Renders both `<h1>` and `<textarea>` in the **same CSS grid cell**.
- When editing: swaps via opacity + pointer-events (keeps geometry identical).
- Textarea is auto-resized to content to avoid height changes as you type.

Keyboard:
- `Enter` commits (blur) unless Shift is held.
- `Escape` cancels.

---

## “Spotlight + grain” card family (RecordsCard + UploadPanel)

These two cards share a cohesive mini-system:
- Fixed size: `w-[380px] h-[145px]` with `rounded-[22px]`
- Layered background:
  - mouse-follow radial spotlight (uses CSS vars `--spot-x/y/o`)
  - SVG turbulence grain layer with `mixBlendMode: soft-light`
- Foreground typography uses `font-serif`

### RecordsCard (`RecordsCard.tsx`)
- Hover border: `hover:border-ring/40`
- Counter animation:
  - smooth easing + early jitter (intentional “alive” feel)
- Grain:
  - **light mode**: subtle (`opacity-[0.14]`)
  - **dark mode**: stronger (`dark:opacity-[0.5]`)

### UploadPanel (`UploadPanel.tsx`)
- Disabled state when no columns:
  - `cursor-not-allowed` + internal error messaging
- Busy state:
  - card dims: `opacity-60`
  - shows spinner + progress bar
- Primary action button (inside card):
  - `rounded-xl border border-primary/40 bg-primary text-primary-foreground`
  - hover lift + brightness like sidebar CTA

---

## Extracted rows grid (Notion-like table)

Location: `app/tables/[tableId]/components/ExtractedRowsGrid.tsx`

This component defines most of the app’s “product feel”: table chrome, hover affordances, selection mode, editing, drag reordering, column resizing, and subtle transitions.

### Overall table chrome

- The table is horizontally scrollable:
  - outer: `overflow-x-auto`
  - inner: `min-w-max` (forces real horizontal scroll)
- Borders:
  - Outer wrapper removes left/right borders intentionally:
    - `border-x-0 border-t-0 border-b-0`
  - Header strip has:
    - top border: `border-t border-border`
    - thicker bottom border: `border-b-2 border-border`

### Gutter (Notion-style row controls)
- Fixed-width invisible left gutter: `w-24`
- Holds:
  - drag handle (six dots icon)
  - selection checkbox
  - delete row icon (when not in selection mode)
- Gutter controls appear on hover:
  - `opacity-0 group-hover/row:opacity-100`

### Column sizing system
- Constraints:
  - `MIN_COL_WIDTH = 160`
  - `DEFAULT_COL_WIDTH = 260`
  - `MAX_COL_WIDTH = 560`
- Resize handle:
  - `absolute top-0 right-[-3px] h-full w-[8px] cursor-col-resize`
  - Shows a 1px line on header hover: `group-hover/colhead:bg-border`

### Column header row

Header cell:
- `px-3 py-2 border-r border-border`
- `group/colhead cell-hover-fade transition-colors hover:bg-muted/30`
- Text:
  - `text-sm font-semibold text-foreground truncate pr-10`
- Action icons (edit/delete column):
  - container: `opacity-0 group-hover/colhead:opacity-100 transition-opacity`
  - icons are minimal, mostly color transitions:
    - edit: `hover:text-foreground`
    - delete: `hover:text-destructive`

Drag-to-reorder columns:
- Start drag by pointer-down on header (not on buttons/resize handle).
- Shows a floating “ghost” header:
  - `fixed ... bg-card/80 ... shadow-lg backdrop-blur-md`
- Uses FLIP transforms for smooth reordering:
  - `transform 180ms ease` on header cells during drag
  - and `transform 140ms ease` for body cells after drop

### Body rows

Row container:
- `group/row flex relative transition-colors duration-150 ease-out`
- Selected: `bg-primary/10`
- Row separators:
  - drawn only under the “real table” area (not under gutter):
    - `border-t border-border` on rows after the first

Drag-to-reorder rows:
- Start drag via drag-handle button in gutter.
- Ghost preview row:
  - `fixed z-[100] ... bg-card/80 ... shadow-lg backdrop-blur-md opacity: 0.7`
- Uses FLIP transforms:
  - `transform 180ms ease` while dragging.

### Selection mode

Selection checkbox:
- Base: `w-4 h-4 rounded border ring-1 ring-inset`
- Unselected:
  - `border-foreground/25 bg-card/60 ring-border/60 hover:bg-card`
- Selected:
  - `bg-primary border-primary ring-primary/30 shadow-sm` + white checkmark

Selection toolbar:
- Appears when `selectedRowIds.size > 0`
- Positioned just above the last selected row, left aligned:
  - `absolute left-3 z-20`
  - toolbar: `bg-card border border-border shadow-sm rounded-md px-3 py-2`
- Buttons:
  - Delete: `hover:text-destructive hover:bg-destructive/10 transition-colors rounded`
  - Clear: text-only hover color to foreground

### Cell view + edit interaction

Cell wrapper:
- `px-3 py-2 border-r border-border relative group/cell`
- Uses `.cell-hover-fade` when not dragging to make room for the edit icon.

Read mode content:
- text container:
  - `cell-text text-sm text-foreground pr-6 min-h-[1.5rem] overflow-x-auto scrollbar-hide whitespace-pre-wrap break-words`
- edit icon:
  - `absolute top-[2px] right-0 p-0.5 opacity-0 group-hover/cell:opacity-100`
  - `text-muted-foreground hover:text-foreground`
  - placed on `bg-background rounded` to avoid blending into text

Edit mode:
- swaps in a textarea:
  - `bg-transparent border-none focus:outline-none focus:ring-0 resize-none overflow-hidden p-0 m-0`
- autosizes height on every change.
- Save behavior:
  - blur saves
  - click-outside saves immediately (document `mousedown` listener)
  - Escape cancels
  - Cmd/Ctrl+Enter commits (blur)

### PDF column
- Fixed width: `w-[120px]`
- Left border: `border-l border-border`
- Uses `PdfThumbnailCell` inside.

### Empty states

No columns:
- Shows only an “Add Column” CTA and a centered message.
- Intentionally **does not render** table chrome lines/borders.

No rows:
- Renders header + “No rows yet…” message.

Loading skeleton:
- 3 placeholder blocks: `h-16 bg-muted animate-pulse rounded`

---

## PDF thumbnail cell

Location: `app/tables/[tableId]/components/PdfThumbnailCell.tsx`

Visual states:
- **Fallback icon tile** (no thumbnail or error):
  - `w-24 h-24 bg-muted border border-border rounded cursor-pointer hover:bg-accent transition-colors`
- **Thumbnail tile**:
  - `w-24 h-24 border border-border rounded overflow-hidden cursor-pointer`
  - Hover: `hover:opacity-80 transition-opacity`
- **Loading overlay**:
  - `absolute inset-0 bg-muted animate-pulse`
  - spinner: `border-2 border-border border-t-primary ... animate-spin`

Behavior notes (affects perceived UI stability):
- Avoids flicker by caching rendered thumbnails by PDF path (not by signed URL token).
- Opens PDF in a new tab on click.

---

## Reusable micro-patterns (copy/paste recipes)

### Icon button (used in sidebar + theme toggle + collapse/open)

Use this when you want a compact square-ish icon control:
- `inline-flex items-center justify-center rounded-xl border border-border bg-card px-2.5 py-2 text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-accent hover:text-accent-foreground`

### Glassy “primary pill” CTA (sidebar + add-column button style)

Use when you want the elevated, slightly “premium” button:
- Base:
  - `group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-primary/35 bg-primary px-2.5 py-1.5 text-[13px] font-medium text-primary-foreground shadow-sm backdrop-blur-md`
- Hover/active:
  - `transition-[transform,box-shadow,filter] duration-200 ease-out hover:-translate-y-[1px] hover:shadow-md hover:brightness-[1.03] active:translate-y-0 active:brightness-[0.99]`
- Overlay highlight:
  - `absolute inset-0 bg-gradient-to-b from-primary-foreground/18 to-transparent opacity-60 group-hover:opacity-80`

### Destructive inline alert
- `rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive`

---

## “Clone this design into a new project” checklist

Copy these files/patterns:
- `app/globals.css`
  - tokens + utilities + scrollbar styling + grain utilities
- `tailwind.config.js`
  - OKLCH token mapping + font variables + radius mapping
- `components.json`
  - shadcn configuration and aliases
- `app/fonts.ts` + `app/layout.tsx`
  - Antic font + variable wiring
- `components/theme-provider.tsx` + `components/theme-toggle.tsx`
  - next-themes integration + toggle UI
- `components/ui/*`
  - at minimum: `button.tsx`, `card.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`, `separator.tsx`
- Sidebar stack:
  - `app/components/Sidebar.tsx` + `app/components/TableLayout.tsx`
- Table “product feel”:
  - `ExtractedRowsGrid.tsx` (hover fades, selection, drag ghosts, resize handles)
  - `RecordsCard.tsx`, `UploadPanel.tsx` (spotlight + grain cards)
  - `PdfThumbnailCell.tsx`

If you copy only one thing for “instant same vibe”, copy:
- **Token block + Tailwind mapping**
- **grain + spotlight patterns**
- **rounded-xl / shadow-sm / border-border surface language**

