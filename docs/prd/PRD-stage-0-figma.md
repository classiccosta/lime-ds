# Stage 0: Audit + Figma foundations

**Status: done.** Left for you: publish the Figma file as a public Community file.

## Goal
Turn Lime's styles into a token system in Figma: tiered variables, purpose-based names, scoped and documented, light and dark, exported as DTCG JSON. Built on the free Figma plan, with its limits documented.

## What was built
- **Audit** of Lime: a local, private script → `docs/audit/AUDIT.md`. The script is not in the repo.
- **Figma file** with 4 variable collections (Primitives, Theme/Light, Theme/Dark, Layout), 6 text styles, and 3 pages (Cover with plan limits, Foundations, Guidelines).
- **4 DTCG files** in `tokens/`, built from `scripts/token-source.js`. Steps and the update rule: `docs/token-pipeline.md`.

## Standard we followed
- **Tiers:** primitive, then semantic. Component tokens only when 3+ components share a value.
- **Primitives** are raw and never applied directly. **Semantic** tokens are aliases only, one hop from a primitive.
- **Names:** slash path = token path = CSS variable (`color/bg/surface` → `--lime-color-bg-surface`). Name by purpose, not appearance. Rename in place, never delete and recreate.
- **Every variable** has scopes and Web code syntax; every semantic variable has a description.
- **Accessibility:** WCAG 2.2 AA in both themes (text 4.5:1, UI and focus 3:1). The dark theme is its own decision, not an inversion.
- **Type:** variables for family, size, weight, line height and letter spacing; text styles use only those.
- **Spacing and radius:** one scale each, no fixed widths in primitives.

## Free-plan limits found
One mode per collection (so Light and Dark are two collections with identical names), 3 pages per file, no library publishing, Dev Mode or branching, and a cap on Figma MCP calls. Workarounds are in frame 1.2 of the Overview page.

## Decisions
- **Native Figma export vs Tokens Studio:** the native export resolves aliases and uses non-DTCG types, so DTCG is generated from `token-source.js` and the native export is kept only to check.
- **Type ratio:** keep Lime's six sizes (12 to 24), ratio about 1.15, nearest named ratio 1.125.

## Acceptance (all met)
Mode limit checked · semantic tokens alias primitives, Light and Dark names identical · scopes, code syntax and descriptions everywhere · names follow the guide · all contrast pairs pass in both themes · text styles use variables only · export validates and round-trips · audit numbers come from the script · plan limits page present.
