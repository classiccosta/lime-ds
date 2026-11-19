<p>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/media/readme/banner-dark.svg">
  <img alt="Lime DS — design tokens" src="docs/media/readme/banner-light.svg" width="846">
</picture>
</p>

<p>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/media/readme/tags-dark.svg">
  <img alt="Figma variables, DTCG 2025.10, WCAG 2.2 AA, light and dark" src="docs/media/readme/tags-light.svg">
</picture>
</p>

Design tokens extracted from [Lime](https://github.com/classiccosta/lime-local-ai), a
local-first chat client for the language models you run yourself
([live](https://lime-zeta-three.vercel.app)). One source of truth for colour, spacing,
radius and type: tiered variables in Figma, light and dark, exported as DTCG JSON.

<p><a href="https://www.figma.com/design/eMs1wRJxTAFePPIyqHAXJa"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/readme/figma-dark.svg"><img alt="Figma file" src="docs/media/readme/figma-light.svg"></picture></a></p>

## Pipeline

![Token pipeline: what differs and what is shared](docs/token-pipeline.svg)

## Try it

```bash
npm run build     # token-source.js → tokens/*.json, then validate
npm run compare   # tokens/ vs a fresh Figma export
```

**Edit token values in `scripts/token-source.js`.** `tokens/*.json` are generated; never
edit them. `tokens/figma-export/` is Figma's own export, kept only for checking. What to
do when Figma changes: [`docs/token-pipeline.md`](docs/token-pipeline.md).

## What's in Stage 0

- **Audit of Lime:** 32 colour tokens turned out to be 14 distinct values, and 4 contrast
  pairs failed (all borders). See [`docs/audit/AUDIT.md`](docs/audit/AUDIT.md).
- **18 semantic colour tokens,** named by purpose and aliasing a shared primitive layer,
  plus spacing, radius and 6 text styles, all bound to variables.
- **Light and dark themes** with identical token names. The light theme is new; Lime only
  had a dark one.
- **WCAG 2.2 AA** on every text, UI and focus pair, in both themes. `npm run build` fails
  if one drops below.
- **Four DTCG 2025.10 files** in `tokens/`, checked against Figma's export.

## Not yet

- **Token build for CSS, Swift and Kotlin** with CI and a live demo (Stage 1).
- **Web components** (Stencil) and Storybook, later.
- **Figma free-plan limits:** one mode per collection, 3 pages, no publishing or Dev Mode.
  Each has a workaround; see the Cover page of the Figma file.

## Docs

- [`docs/token-pipeline.md`](docs/token-pipeline.md): how tokens flow, and the rule when Figma changes
- [`docs/audit/AUDIT.md`](docs/audit/AUDIT.md): what Lime looked like before, and what we decided
- [`docs/prd/`](docs/prd/): requirements for Stages 0 and 1
