# Figma file conventions

Rules for organising the Lime DS Figma file. Adapted from the Material 3 Design Kit, cut down to what the free plan allows. Change a rule here and in the file together.

## Pages (3-page cap)

| Page | Holds |
|---|---|
| Cover | The project thumbnail only |
| Overview | Section 1: 1.1 Table of contents, 1.2 Tiers, 1.3 Naming, 1.4 Do and don't. The `.Header` helper lives here too |
| Library | Section 2, Foundations: 2.1 Colour, 2.2 Typography, 2.3 Spacing, 2.4 Radius, 2.5 Token reference (every token with its Figma name, token path and CSS variable). Section 3, Components, follows from Stage 2 |

With a paid plan the target is Material's layout: Getting started, Table of contents, one page per foundation, a divider page, then one page per component in alphabetical order.

## Frames

- **Name:** `<number> <Section> / <Topic>`, for example `2.1 Foundations / Colour`. The number is section.item, the same as in the Table of contents. Renumber when a frame is added or removed.
- **One foundation per frame.** Never two foundations in one frame.
- **Layout:** frames sit side by side, top-aligned, left to right in Table of contents order, 120px apart. Vertical auto layout, 1440px wide, background `color/bg/page` from Theme/Dark.
- **Light and Dark** are shown side by side inside the frame, each bound to its own theme collection.
- **Every frame starts with a `.Header` instance** (see below).
- **Numbered titles:** the `.Header` title starts with the frame number, for example `2.1 Colour`, matching the frame name and the Table of contents.
- **Text colour:** all text on the dark doc frames is `color/text/primary` (white). `color/text/secondary` is too faint to read at this size, so the `.Header` link and definition use primary too.
- **Titles:** the `.Header` title is 40/48 and every section heading inside a frame is 28/36, both bold, `color/text/primary`. These sizes are documentation-only and set directly on the layers. They are not text styles or variables, because Lime's scale stops at 24 and the DS must not grow tokens for the docs. Body text uses `text/body`. Lime's six text styles stay untouched.

## Header component

- One component, `.Header`, used on every documentation frame.
- Two text properties: **Component** (the title) and **Definition** (one or two short sentences on what the frame defines). The Table of contents hides its Definition. Pointers to the docs live in the repo, not on the boards.
- Illustrations in 1.4 Do and don't use fixed colours on purpose: they depict Light and Dark side by side, so they are not bound to variables.
- **Spacing inside a board:** 32px between the header and each content block (list, table, diagram). Colour keeps 56px between its larger sheets.
- Keep board text short. No audit numbers on boards: the audit lives in `docs/audit/`.

## Table of contents

- Frame 1.1 on the Overview page, listing every frame with its number, grouped by section (1 Overview, 2 Foundations, later 3 Components).
- Each entry links to its frame.
- Layout: one auto-layout block per section (bold label, then its entries indented 32px, 14px apart). Sections are 40px apart.
- Update it in the same edit that adds, renames or removes a frame.

## Helper components

- **Dot prefix:** `.Header`, `.Anything`. A dot means internal: designers don't use it, and it is hidden from publishing.
- Keep helpers on the Overview page, top-left, locked and hidden.
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
| Table of contents (1.1) | Done, numbered, every entry links to its frame |
| Numbered frames and sections | Done |
| Cover holds only the thumbnail | Done |
| Dot-prefixed helpers | Done (`.Header`) |

Keep this table current when the file changes.
