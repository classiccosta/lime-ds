# Figma file conventions

Rules for organising the Lime DS Figma file. Adapted from the Material 3 Design Kit, cut down to what the free plan allows. Change a rule here and in the file together.

## Pages (3-page cap)

| Page | Holds |
|---|---|
| Cover | The project thumbnail only |
| Overview | Section 1: 1.1 Table of contents, 1.2 How it works (plan limits and production approach), 1.3 Tiers, 1.4 Naming, 1.5 Do and don't. The `.Header` helper lives here too |
| Library | Section 2, Foundations: 2.1 Colour, 2.2 Typography, 2.3 Spacing, 2.4 Radius. Section 3, Components, follows from Stage 2 |

With a paid plan the target is Material's layout: Getting started, Table of contents, one page per foundation, a divider page, then one page per component in alphabetical order.

## Frames

- **Name:** `<number> <Section> / <Topic>`, for example `2.1 Foundations / Colour`. The number is section.item, the same as in the Table of contents. Renumber when a frame is added or removed.
- **One foundation per frame.** Never two foundations in one frame.
- **Layout:** frames sit side by side, top-aligned, left to right in Table of contents order, 120px apart. Vertical auto layout, 1440px wide, background `color/bg/page` from Theme/Dark.
- **Light and Dark** are shown side by side inside the frame, each bound to its own theme collection.
- **Every frame starts with a `.Header` instance** (see below).
- **Titles:** the `.Header` title and every section heading inside a frame use `text/display` (24/32), the largest style in Lime's scale. Body text uses `text/body`. No doc-only sizes: the file keeps Lime's six text styles.

## Header component

- One component, `.Header`, used on every documentation frame.
- Three text properties: **Component** (the title), **Link** (one line saying where the rule lives, for example the docs file), **Definition** (one sentence on what the frame defines).

## Table of contents

- Frame 1.1 on the Overview page, listing every frame with its number, grouped by section (1 Overview, 2 Foundations, later 3 Components).
- Each entry links to its frame.
- Update it in the same edit that adds, renames or removes a frame.

## Helper components

- **Dot prefix:** `.Header`, `.Anything`. A dot means internal: designers don't use it, and it is hidden from publishing.
- Keep helpers on the Cover page, top-left, locked and hidden.
- Expose editable content as component text properties, not by editing layers inside instances.

## Variables and styles

- **One collection per axis of change:** Primitives, Theme/Light, Theme/Dark, Layout. Add a new collection for a new axis (density, brand) rather than mixing it in.
- **Names:** lowercase, slash-separated, as in `color/bg/page`. Unlike Material, not Title Case: the name becomes the CSS variable.
- **Text styles:** `text/<role>`. If the scale grows, `text/<role>/<size>` with an `-emphasized` suffix, as Material does.
- **Tiers:** primitive, then semantic. Material calls them `ref` and `sys`.

## Deliberately not adopted

- **Divider page and one page per component:** the free plan allows 3 pages, and there are no components yet.
- **Multi-mode colour collection** (light, dark, contrast levels): the free plan allows one mode per collection. Light and Dark are two collections with identical names.
- **Colour styles:** the colours are variables. A style per colour would duplicate them.
- **Title Case names and raw hex in semantic tokens:** semantic tokens alias primitives.

## Not covered yet

Elevation, motion, state layers (hover, pressed, disabled), density, and contrast modes. Material has all of them.

## Status of the Figma file

| Convention | In the file |
|---|---|
| Three pages, frame names | Done |
| One foundation per frame | Done (Colour, Typography, Spacing, Radius) |
| `.Header` component on every frame | Done |
| Table of contents on Cover | Done, every entry links to its frame |
| Dot-prefixed helpers | Done (`.Header`) |

Keep this table current when the file changes.
