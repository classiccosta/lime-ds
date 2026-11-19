# Lime DS

Design tokens extracted from [Lime](https://github.com/classiccosta/lime-local-ai) ([live](https://lime-zeta-three.vercel.app)), a local-first LLM chat client. Lime stays in production untouched; this project is the case study.

**Figma file:** https://www.figma.com/design/eMs1wRJxTAFePPIyqHAXJa

| Stage | What | State |
|---|---|---|
| 0 | Audit of Lime, Figma foundations, DTCG tokens | Done |
| 1 | Monorepo, token build (CSS, Swift, Kotlin), CI, demo | Next |
| 2+ | Web components (Stencil), Storybook | Later |

## Where things are

| Path | What |
|---|---|
| `scripts/token-source.js` | **Edit token values here.** |
| `tokens/*.json` | Generated DTCG files. The pipeline input. Do not edit. |
| `tokens/figma-export/` | Figma's own export, kept only for checking. |
| `docs/audit/AUDIT.md` | What Lime looked like before, and what we decided. (The audit script itself is local and private.) |
| `docs/token-pipeline.md` | How tokens flow, and what to do when Figma changes. |
| `docs/prd/` | Requirements for Stages 0 and 1. |

## Commands

```bash
npm run build     # source → tokens/*.json, then validate
npm run compare   # tokens/ vs a fresh Figma export
```

Figma free-plan limits and their workarounds are listed on the Cover page of the Figma file.
