#!/usr/bin/env node
/**
 * Builds DTCG (spec 2025.10) token files from scripts/token-source.js and
 * validates them. Output: tokens/primitive.json, semantic.light.json,
 * semantic.dark.json, semantic.layout.json.
 *
 * These files are derived from the same source the Figma file was built from.
 * They are NOT a native Figma export: diff them against Figma's "Export mode"
 * output before treating them as the Stage 1 input.
 *
 * Usage: node scripts/build-dtcg.js
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { prim, alpha, themes, desc, layout, space, radius, fontSize, fontWeight, lineHeight, letterSpacing, fontFamily } from './token-source.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'tokens');

// DTCG files are merged into one namespace, so a path may live in only one file.
const seenPaths = new Map();
const set = (obj, p, token, file = 'primitive.json') => {
  if (seenPaths.has(p) && seenPaths.get(p) !== file) throw new Error(`path collision: ${p} is in ${seenPaths.get(p)} and ${file}`);
  seenPaths.set(p, file);
  const parts = p.split('/');
  let o = obj;
  for (const k of parts.slice(0, -1)) o = o[k] ??= {};
  if (o[parts.at(-1)]) throw new Error(`duplicate token ${p}`);
  o[parts.at(-1)] = token;
};
const rgb = (h) => [1, 3, 5].map((i) => +(parseInt(h.slice(i, i + 2), 16) / 255).toFixed(4));
const color = (h) => ({ colorSpace: 'srgb', components: rgb(h), hex: h });
const colorA = ([r, g, b, a]) => ({ colorSpace: 'srgb', components: [r, g, b], alpha: a });
const px = (v) => ({ value: v, unit: 'px' });
const ref = (name) => `{${name.replace(/\//g, '.')}}`;

// ---- primitive.json
const primitive = {};
for (const [n, h] of Object.entries(prim)) set(primitive, n, { $type: 'color', $value: color(h) });
for (const [n, a] of Object.entries(alpha)) set(primitive, n, { $type: 'color', $value: colorA(a) });
for (const v of space) set(primitive, `space/${v}`, { $type: 'dimension', $value: px(v) });
for (const [k, v] of Object.entries(radius)) set(primitive, `radius/${k}`, { $type: 'dimension', $value: px(v) });
for (const v of fontSize) set(primitive, `font/size/${v}`, { $type: 'dimension', $value: px(v) });
for (const v of fontWeight) set(primitive, `font/weight/${v}`, { $type: 'fontWeight', $value: v });
for (const v of lineHeight) set(primitive, `font/line-height/${v}`, { $type: 'dimension', $value: px(v) });
for (const [k, v] of Object.entries(letterSpacing)) set(primitive, `font/letter-spacing/${k}`, { $type: 'dimension', $value: px(v) });
for (const [k, v] of Object.entries(fontFamily)) set(primitive, `font/family/${k}`, { $type: 'fontFamily', $value: v });

// ---- semantic
const semantic = (theme) => {
  const o = {};
  for (const [n, target] of Object.entries(themes[theme]))
    set(o, n, { $type: 'color', $value: ref(`color/${target}`), $description: desc[n] }, "semantic.theme");
  return o;
};
const semLight = semantic('light');
const semDark = semantic('dark');
const semLayout = {};
for (const [n, target, d] of layout) set(semLayout, n, { $type: 'dimension', $value: ref(target), $description: d }, 'semantic.layout');

const files = { 'primitive.json': primitive, 'semantic.light.json': semLight, 'semantic.dark.json': semDark, 'semantic.layout.json': semLayout };
fs.mkdirSync(outDir, { recursive: true });
for (const [f, o] of Object.entries(files)) fs.writeFileSync(path.join(outDir, f), JSON.stringify(o, null, 2) + '\n');

// ---- validation
const flat = (o, pre = []) =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' && '$value' in v ? [[[...pre, k].join('.'), v]] : flat(v, [...pre, k])));
const prims = new Map(flat(primitive));
const errors = [];
let semanticCount = 0, aliasCount = 0;
for (const [label, o] of [['light', semLight], ['dark', semDark], ['layout', semLayout]])
  for (const [n, t] of flat(o)) {
    semanticCount++;
    const m = /^\{(.+)\}$/.exec(t.$value);
    if (!m) errors.push(`${label}: ${n} is not an alias`);
    else if (!prims.has(m[1])) errors.push(`${label}: ${n} -> ${m[1]} does not resolve`);
    else aliasCount++;
    if (!t.$description) errors.push(`${label}: ${n} has no description`);
  }
const names = (o) => flat(o).map(([n]) => n).sort().join('|');
if (names(semLight) !== names(semDark)) errors.push('light and dark token names differ');

// contrast (same pairs as the Figma Foundations page)
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const resolve = (theme, k) => {
  const target = themes[theme]['color/' + k];
  const n = 'color/' + target;
  return alpha[n] ?? [1, 3, 5].map((i) => parseInt(prim[n].slice(i, i + 2), 16));
};
const pairs = [
  ...['bg/page', 'bg/surface', 'bg/inset', 'bg/sidebar', 'bg/subtle', 'bg/hover', 'action/secondary/bg'].map((b) => ['text/primary', b, 4.5]),
  ...['bg/page', 'bg/surface', 'bg/inset', 'bg/sidebar', 'bg/subtle', 'bg/hover'].map((b) => ['text/secondary', b, 4.5]),
  ['action/primary/fg', 'action/primary/bg', 4.5],
  ...['bg/page', 'bg/surface', 'feedback/error/bg-subtle'].map((b) => ['feedback/error/fg', b, 4.5]),
  ['text/on-scrim', 'scrim', 4.5],
  ['focus/ring', 'bg/page', 3], ['focus/ring', 'bg/surface', 3],
  ['border/strong', 'bg/page', 3], ['border/strong', 'bg/surface', 3], ['border/strong', 'bg/subtle', 3],
  ['action/primary/bg', 'bg/page', 3], ['action/primary/bg', 'bg/surface', 3],
];
let contrastChecked = 0;
for (const theme of ['light', 'dark'])
  for (const [a, b, need] of pairs) {
    const fg = resolve(theme, a);
    let bg;
    if (b === 'scrim') { const pg = resolve(theme, 'bg/page'); const al = alpha['color/alpha/black-60']; bg = [0, 1, 2].map((i) => al[i] * al[3] + pg[i] * (1 - al[3])); }
    else bg = resolve(theme, b);
    const r = ratio(fg, bg);
    contrastChecked++;
    if (r < need) errors.push(`${theme}: ${a} on ${b} = ${r.toFixed(2)} (needs ${need})`);
  }

const counts = Object.fromEntries(Object.entries(files).map(([f, o]) => [f, flat(o).length]));
console.log(JSON.stringify({ counts, semanticCount, aliasCount, contrastChecked, errors }, null, 2));
if (errors.length) process.exit(1);
