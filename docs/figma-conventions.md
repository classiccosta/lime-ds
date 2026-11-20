# Figma file conventions

Rules for organising the Lime Design System Figma file. Adapted from the Material 3 Design Kit, cut down to what the free plan allows. Change a rule here and in the file together.

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
- **Long topics stack as boards in a column.** When a sheet is hard to read, split it into independent boards stacked vertically at the same X, 120px apart. Names: `2.1 Foundations / Colour primitives`, `... / Colour semantic`, `... / Colour contrast`; 2.5 has one board per category (colours, typography, spacing, radius). Each board has its own `.Header`. The generated sheet sits in a frame named `Sheets`.
- **Layout:** frames sit side by side, top-aligned, left to right in Table of contents order, 120px apart (stacked boards: see below). Vertical auto layout, 1440px wide (1.1 Table of contents is 1000px), background `color/bg/page` from Theme/Dark.
- **Light and Dark** are shown side by side inside the frame, each bound to its own theme collection.
- **Every frame starts with a `.Header` instance and ends with a `.Footer` instance** (see below).
- **Corners:** every frame has corner radius `radius/md`, bound to the Layout variable, never a raw number.
- **Numbered titles:** the `.Header` title starts with the frame number, for example `2.1 Colour`, matching the frame name and the Table of contents.
- **Text colour:** all text on the dark doc frames is `color/text/primary` (white). `color/text/secondary` is too faint to read at this size, so the `.Header` link and definition use primary too.
- **Titles:** the `.Header` title is 40/48 and every section heading inside a frame is 28/36, both bold, `color/text/primary`. These sizes are documentation-only and set directly on the layers. They are not text styles or variables, because Lime's scale stops at 24 and the DS must not grow tokens for the docs. Body text uses `text/body`. Lime's six text styles stay untouched.

## Header and footer components

Modelled on the OutSystems UI Figma kit: a brand strip on top, a small note at the bottom.

- One component, `.Header`, used on every documentation frame. It opens with a **brand strip**: the Lime logo, the `Lime Design System` wordmark and a version pill, then 32px of extra space before the title and definition. The strip is small on purpose: logo 28px, wordmark 14px, pill 9px. The logo is a lime tile (`#d2ee46`, corner radius about 12%) with a dark terminal prompt, the same mark as the Cover card. It reads on light and dark backgrounds, because the tile carries its own colour. It is a fixed-colour illustration, not bound to variables. The app's own favicon is the inverse (dark tile, lime prompt) and is left alone.
- One component, `.Footer`, closes every documentation frame: a 1px divider, 32px below the content, and one small grey line, `Lime Design System · Figma UI Kit`. It is the only muted text on the boards (12px, `#a8aea5`, 7:1 on the board background), so the white-text rule below does not apply to it. In the 1000px-wide 1.1 frame the instance is resized to 872px.
- The version pill follows `package.json` (`v0.1.0`). Update it in the `.Header` component when the version changes; every frame follows.
- `.Header` has two text properties: **Component** (the title) and **Definition** (one or two short sentences on what the frame defines). The Table of contents hides its Definition. Pointers to the docs live in the repo, not on the boards.
- Illustrations in 1.4 Do and don't use fixed colours on purpose: they depict Light and Dark side by side, so they are not bound to variables.
- **Spacing inside a board:** 32px between the header and each content block (list, table, diagram). Inside a board, sheets keep their own gaps.
- Keep board text short. No audit numbers on boards: the audit lives in `docs/audit/`.

## Cover

The Cover page holds one 1600x960 thumbnail, modelled on the OutSystems UI cover: less is more. Content: the title `Lime Design System`, one subtitle (`Figma UI Kit · Version 0.1.0`), two chips (`Design tokens`, `Light & dark mode`) and the logo tile (corner radius 8). Nothing else: no top bar, no palette strip, no slogan. Wording must stay true as the library grows (components, layouts, screens), so it names the kind of file and the version, not what is in it today. Update the version here and in the `.Header` pill together. Write the name in full, `Lime Design System`, never `Lime DS`, everywhere in the file.

## Table of contents

- Frame 1.1 on the Overview page, listing every numbered frame, grouped by section (1 Overview, 2 Foundations, later 3 Components). Stacked boards (2.1, 2.5) are one entry; it links to the top board.
- Each entry links to its frame.
- Layout: one auto-layout block per section (bold label, then its entries indented 32px, 14px apart). Sections are 40px apart.
- Update it in the same edit that adds, renames or removes a frame.

## Helper components

- **Dot prefix:** `.Header`, `.Footer`, `.Anything`. A dot means internal: designers don't use it, and it is hidden from publishing.
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

Elevation, motion, state layers, density, and contrast modes. State colour tokens (hover, pressed, disabled) exist; state layers do not. Material has all of them.

## Status of the Figma file

| Convention | In the file |
|---|---|
| Three pages, frame names | Done |
| One foundation per frame | Done (Colour, Typography, Spacing, Radius, Token reference) |
| Stacked boards named `<number> Foundations / <Topic> <part>` | Done (2.1 three boards, 2.5 four boards) |
| `.Header` component on every frame | Done |
| Table of contents (1.1) | Done, numbered, every entry links to its frame |
| Numbered frames and sections | Done |
| Cover holds only the thumbnail | Done |
| Dot-prefixed helpers | Done (`.Header`, `.Footer`) |
| Brand strip in `.Header`, `.Footer` on every frame | Done (14 frames) |
| Frame corners bound to `radius/md` | Done (14 frames) |

Keep this table current when the file changes.
