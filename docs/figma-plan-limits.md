# Figma free-plan limits and production approach

The Lime DS Figma file is built on the free plan. Each limit was checked in the file, not assumed. This table used to sit in the file itself; it lives here now so the file only shows the design system.

| Limit | What the free plan does | What this file does | Production approach |
|---|---|---|---|
| Modes per collection | One mode only (`addMode`: "Limited to 1 modes only"). | Two collections with identical names, Theme/Light and Theme/Dark, both aliasing Primitives. Exported as two files and merged into one theme set in Stage 1. | One Theme collection with Light and Dark modes; extended collections for brands and density. |
| Pages per file | 3 pages (`createPage`: "Starter plan only comes with 3 pages"). | Cover, Overview and Library. Numbered frames replace pages. | One page per foundation and per component; cover, changelog and getting-started pages. |
| Library publishing and analytics | Not available. | Public Community file. | Publish the library; track adoption and detach rates with analytics. |
| Dev Mode and Code Connect | Not available. | Code syntax and descriptions on every variable. | Dev Mode handoff and Code Connect mapped to the web components. |
| Branching and merging | Not available. | Git PRs in the `lime-ds` repo from Stage 1. | Branch the library, review, merge; changes land as PRs via automated sync. |
| Hiding primitives from publishing | The setting exists, but publishing is unavailable. | Primitives have empty scopes and a "do not apply directly" description. | Hide the Primitives collection from publishing. |

Also on the free plan: a cap on Figma MCP calls with no published reset.
