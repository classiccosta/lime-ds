# Token pipeline

![Token pipeline: what differs and what is shared](token-pipeline.svg)

| | Production | This project |
|---|---|---|
| Source of truth | Figma | `scripts/token-source.js` |
| JSON arrives | Automatic sync | `npm run build` |
| Drift check | Sync opens a PR | `npm run compare` |

This project is flipped because the Figma free plan has no sync, and Figma's own export drops alias references and uses non-DTCG types.

## When Figma changes

**Rule: `token-source.js` leads, Figma follows.** A change made only in Figma is not done.

If a token was changed in Figma by hand:

1. Export all four collections (Variables panel, right-click the mode, "Export mode") into `tokens/figma-export/`.
2. `npm run compare` lists what differs.
3. Copy those changes into `scripts/token-source.js`.
4. `npm run build`, then `npm run compare`. Both must come back clean.
5. Commit source, `tokens/` and the changelog line together.

To change a token on purpose: edit `token-source.js`, run `npm run build`, mirror it in Figma, then `npm run compare`.

Also:

- `tokens/*.json` are generated. Never edit them.
- Rename or delete a token only with a deprecated alias for one version.
- A failing contrast check blocks the change. Fix the value, not the check.
