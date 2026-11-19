# Stage 1: Monorepo + tokens package

## Goal
A `lime-ds` monorepo with one package: a token pipeline that builds CSS, Swift and Kotlin from the DTCG files, guarded by CI and shown on a live demo.

Lime is the case study, not a dependency. Adopting the tokens in Lime is an optional follow-up, never a blocker.

## Starts from (Stage 0)
The four files in `tokens/` (`primitive`, `semantic.light`, `semantic.dark`, `semantic.layout`), generated from `scripts/token-source.js`. Figma's own export in `tokens/figma-export/` is a check, not an input. See `docs/token-pipeline.md`.

## Out of scope
Components (later, as Stencil web components with Storybook), React wrappers, changesets, NPM publishing, empty placeholder folders.

## Repo
```
lime-ds/
├─ packages/tokens/    tokens/, sd.config.js (Style Dictionary v5), dist/, tests/
├─ apps/docs/          demo page, generated from the tokens
├─ docs/               audit/, token-pipeline.md, prd/
├─ scripts/
├─ .github/workflows/ci.yml
└─ pnpm-workspace.yaml
```

## Requirements

**1. Monorepo.** pnpm workspaces, Node LTS, lockfile committed, Style Dictionary pinned to v5 (needs Node 22+). Tested: v4.4.0 outputs `[object Object]` for our colour and dimension values; v5.8.0 outputs `#1b1e1c`, `4px` and keeps aliases as `var(--lime-…)`. Root scripts: `build`, `test`, `dev`.

**2. packages/tokens.**
- Input: the four files, names unchanged. Layout (spacing, radius) is emitted once in `:root`, not per theme. Aliases are real DTCG references, so the CSS keeps `var(--lime-…)` links to primitives.
- Outputs: `css/variables.css` (`:root` light, `[data-theme="dark"]`, prefix `--lime-`), `ios/Tokens.swift`, `android/` (XML or Kotlin, decide).
- Vitest tests: snapshot of every output · WCAG 2.2 AA contrast on all text and UI pairs in both themes · every semantic token aliases a primitive and has a description · Light and Dark have the same names · files agree with `tokens/figma-export/`.

**3. apps/docs.** Static page generated from the tokens (no hand-written values): colour with light/dark toggle and contrast badges, spacing, radius, type. Per token, tabs for CSS, Swift and Kotlin. Includes `docs/audit/before.png` and links to Figma and the audit.

**4. CI/CD.** GitHub Actions on PR and main: install, build, test; red on any test or contrast failure. Vercel deploys `apps/docs` from main, with a preview per PR.

**5. Versioning.** Tag `tokens-v1.0.0`, hand-written `CHANGELOG.md` (added, changed, broken). New token = minor, value change = patch, rename or remove = major with a deprecated alias for one version.

**6. Lime adoption (optional, after 1 to 5).** Tokens only. Install from the `tokens-v1.0.0` tag (fallback: copy `variables.css`), alias Lime's variables onto `--lime-…`, replace leftover palette classes, add a theme toggle. One PR with before and after screenshots; no redesign.

## README must include
Problem and solution in 3 lines with the pipeline diagram · "Done by hand at KPMG, automated here" · "Lime is the case study, the DS is the extraction" · plan limits and the production approach (the table in `docs/figma-plan-limits.md`, plus `docs/token-pipeline.md`) · links to demo, Figma and audit.

## Acceptance
- [ ] `pnpm build` generates CSS, Swift and Android outputs
- [ ] `pnpm test` runs all tests; CI is red on failure
- [ ] Demo live on Vercel with PR previews, values only from token files
- [ ] Tag `tokens-v1.0.0` and a CHANGELOG entry
- [ ] README has the plan-limits and production section
- [ ] Optional: Lime adoption PR merged

## Open decisions
Commit `dist/` or build in CI only · Android as XML or Kotlin · Lime install via tag or copied CSS · optional Claude Design System artifact as an extra docs view.

## Timebox
About 1 day (setup 2h, tokens and tests 4h, docs 3h, CI 1h). Lime adoption: +2 to 3h.
