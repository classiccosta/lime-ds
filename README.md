<p>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/media/readme/banner-dark.svg">
  <img alt="Lime Design System — design tokens" src="docs/media/readme/banner-light.svg" width="846">
</picture>
</p>

<p>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/media/readme/tags-dark.svg">
  <img alt="Figma variables, DTCG 2025.10, WCAG 2.2 AA, light and dark" src="docs/media/readme/tags-light.svg">
</picture>
</p>

Design tokens extracted from [Lime](https://github.com/classiccosta/lime-local-ai) ([live](https://lime-zeta-three.vercel.app)). Figma variables in, DTCG JSON out.

<p><a href="https://www.figma.com/community/file/1705316793159745808"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/readme/figma-dark.svg"><img alt="Figma UI Kit" src="docs/media/readme/figma-light.svg"></picture></a></p>

## What exists

- **Figma UI Kit:** Cover, Overview (tiers, naming, do and don't), Library (colour, typography, spacing, radius, token reference).
- **Variables:** Primitives, Theme/Light, Theme/Dark, Layout. Semantic tokens alias primitives.
- **Text styles:** 6, bound to variables.
- **Themes:** light and dark, identical token names.
- **Accessibility:** WCAG 2.2 AA on every text, UI and focus pair, both themes.
- **Tokens:** 5 DTCG 2025.10 files in `tokens/`.

## How it works

![Token pipeline: what differs and what is shared](docs/token-pipeline.svg)

```bash
npm run build     # scripts/token-source.js → tokens/*.json, then validate
npm run compare   # tokens/ vs a fresh Figma export
```

- Edit values in `scripts/token-source.js` only. `tokens/*.json` are generated.
- `tokens/figma-export/` is Figma's own export, kept for checking.
- `npm run build` fails if a contrast pair drops below AA.
- When Figma changes: [`docs/token-pipeline.md`](docs/token-pipeline.md).

## Not yet

- Token build for CSS, Swift and Kotlin, CI, live demo (Stage 1).
- Web components (Stencil) and Storybook.

## Docs

- [`docs/token-pipeline.md`](docs/token-pipeline.md): token flow and the update rule
- [`docs/figma-conventions.md`](docs/figma-conventions.md): how the Figma file is organised
- [`docs/figma-plan-limits.md`](docs/figma-plan-limits.md): free-plan limits and workarounds
- [`docs/audit/AUDIT.md`](docs/audit/AUDIT.md): Lime before, and what we decided
- [`docs/prd/`](docs/prd/): Stage 0 and 1 requirements
