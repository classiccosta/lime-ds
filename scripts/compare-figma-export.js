#!/usr/bin/env node
/**
 * Compares tokens/ (generated from source) with tokens/figma-export/ (native
 * Figma "Export mode" output). Usage: node scripts/compare-figma-export.js
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const R = (f) => JSON.parse(fs.readFileSync(path.join(root, f), 'utf8'));
const flat = (o, pre = []) =>
  Object.entries(o)
    .filter(([k]) => k !== '$extensions')
    .flatMap(([k, v]) => (v && typeof v === 'object' && '$value' in v ? [[[...pre, k].join('.'), v]] : v && typeof v === 'object' ? flat(v, [...pre, k]) : []));
const hex = (c) => '#' + c.components.map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
const issues = [];
let checked = 0;
const gp = new Map(flat(R('tokens/primitive.json')));
const np = new Map(flat(R('tokens/figma-export/primitive.json')));
if (gp.size !== np.size) issues.push(`primitive count ${gp.size} vs ${np.size}`);
for (const [k, g] of gp) {
  const n = np.get(k);
  checked++;
  if (!n) { issues.push(`missing in native: ${k}`); continue; }
  if (g.$type === 'color') {
    if (hex(g.$value) !== hex(n.$value)) issues.push(`colour ${k}: ${hex(g.$value)} vs ${hex(n.$value)}`);
    if (Math.abs((g.$value.alpha ?? 1) - (n.$value.alpha ?? 1)) > 1e-3) issues.push(`alpha ${k}`);
  } else {
    const gv = typeof g.$value === 'object' ? g.$value.value : g.$value;
    if (Math.abs(gv - n.$value) > 1e-4) issues.push(`value ${k}: ${gv} vs ${n.$value}`);
  }
}
for (const f of ['semantic.light', 'semantic.dark', 'semantic.layout']) {
  const g = new Map(flat(R(`tokens/${f}.json`)));
  const n = new Map(flat(R(`tokens/figma-export/${f}.json`)));
  if (g.size !== n.size) issues.push(`${f} count ${g.size} vs ${n.size}`);
  for (const [k, gt] of g) {
    const nt = n.get(k);
    checked++;
    if (!nt) { issues.push(`${f}: missing ${k}`); continue; }
    const target = gt.$value.slice(1, -1).replace(/\./g, '/');
    const ex = nt.$extensions ?? {};
    if (ex['com.figma.aliasData']?.targetVariableName !== target) issues.push(`${f}: alias ${k}: ${ex['com.figma.aliasData']?.targetVariableName} vs ${target}`);
    if (!nt.$description) issues.push(`${f}: no description ${k}`);
    if (!ex['com.figma.codeSyntax']?.WEB) issues.push(`${f}: no code syntax ${k}`);
    if (!(ex['com.figma.scopes'] ?? []).length) issues.push(`${f}: no scopes ${k}`);
  }
}
const nativeAliasRefs = [...flat(R('tokens/figma-export/semantic.light.json'))].filter(([, t]) => typeof t.$value === 'string' && t.$value.startsWith('{')).length;
const types = new Set();
for (const f of ['primitive', 'semantic.layout', 'semantic.light']) for (const [, t] of flat(R(`tokens/figma-export/${f}.json`))) types.add(`${f}:${t.$type}`);
console.log(JSON.stringify({ checked, issueCount: issues.length, issues: issues.slice(0, 20), nativeDtcgAliasRefsInLight: nativeAliasRefs, nativeTypes: [...types] }, null, 2));
if (issues.length) process.exit(1);
