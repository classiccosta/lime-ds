// Single source for the Lime DS tokens. Mirrors the Figma file (eMs1wRJxTAFePPIyqHAXJa).
// Names use Figma slash paths; build-dtcg.js turns them into DTCG groups.
export const prim = {
 "color/base/white": "#ffffff",
 "color/base/black": "#000000",
 "color/neutral/50": "#f5f7f4",
 "color/neutral/100": "#e9ede7",
 "color/neutral/200": "#d3d9d0",
 "color/neutral/300": "#a8aea5",
 "color/neutral/400": "#7d857b",
 "color/neutral/500": "#565d56",
 "color/neutral/600": "#383d37",
 "color/neutral/700": "#2a2e2a",
 "color/neutral/800": "#222623",
 "color/neutral/900": "#1b1e1c",
 "color/neutral/950": "#161917",
 "color/lime/300": "#dcf266",
 "color/lime/400": "#d2ee46",
 "color/lime/500": "#b3cc2c",
 "color/lime/700": "#5c6c0b",
 "color/lime/800": "#4a5809",
 "color/lime/900": "#3a4607",
 "color/lime/950": "#14170f",
 "color/red/100": "#fdecea",
 "color/red/400": "#f0796d",
 "color/red/700": "#b3261e",
 "color/red/900": "#3a1c19"
};
export const alpha = {"color/alpha/black-60":[0,0,0,0.6]};
export const themes = {
 "light": {
  "color/bg/page": "neutral/50",
  "color/bg/surface": "base/white",
  "color/bg/inset": "neutral/100",
  "color/bg/sidebar": "neutral/100",
  "color/bg/subtle": "neutral/100",
  "color/bg/hover": "neutral/200",
  "color/bg/scrim": "alpha/black-60",
  "color/text/primary": "neutral/900",
  "color/text/secondary": "neutral/500",
  "color/text/on-scrim": "base/white",
  "color/border/default": "neutral/200",
  "color/border/strong": "neutral/400",
  "color/focus/ring": "lime/700",
  "color/action/primary/bg": "lime/700",
  "color/action/primary/fg": "base/white",
  "color/action/primary/bg-hover": "lime/800",
  "color/action/primary/bg-pressed": "lime/900",
  "color/action/disabled/bg": "neutral/200",
  "color/action/disabled/fg": "neutral/400",
  "color/action/secondary/bg": "neutral/200",
  "color/feedback/error/fg": "red/700",
  "color/feedback/error/bg-subtle": "red/100"
 },
 "dark": {
  "color/bg/page": "neutral/900",
  "color/bg/surface": "neutral/800",
  "color/bg/inset": "neutral/950",
  "color/bg/sidebar": "neutral/900",
  "color/bg/subtle": "neutral/700",
  "color/bg/hover": "neutral/700",
  "color/bg/scrim": "alpha/black-60",
  "color/text/primary": "neutral/50",
  "color/text/secondary": "neutral/300",
  "color/text/on-scrim": "base/white",
  "color/border/default": "neutral/600",
  "color/border/strong": "neutral/400",
  "color/focus/ring": "lime/400",
  "color/action/primary/bg": "lime/400",
  "color/action/primary/fg": "lime/950",
  "color/action/primary/bg-hover": "lime/300",
  "color/action/primary/bg-pressed": "lime/500",
  "color/action/disabled/bg": "neutral/700",
  "color/action/disabled/fg": "neutral/500",
  "color/action/secondary/bg": "neutral/700",
  "color/feedback/error/fg": "red/400",
  "color/feedback/error/bg-subtle": "red/900"
 }
};
export const desc = {
'color/bg/page':'App background. Use behind everything. Not for cards or panels: use bg/surface.',
'color/bg/surface':'Raised surfaces: cards, popovers, dialogs, composer. Not for page background.',
'color/bg/inset':'Recessed areas such as code blocks. Sits below the page in dark, a shade under it in light.',
'color/bg/sidebar':'Sidebar panel background only.',
'color/bg/subtle':'Quiet fills for muted blocks, tags, skeletons. Not for interactive hover: use bg/hover.',
'color/bg/hover':'Hover and selected fill for list items and menu rows.',
'color/bg/scrim':'Overlay behind modals and sheets. Always pair with text/on-scrim.',
'color/text/primary':'Default text and icons. Use on bg/page, surface, inset, sidebar, subtle and hover.',
'color/text/secondary':'Supporting text: captions, hints, metadata. Not for disabled state.',
'color/text/on-scrim':'Text and icons placed on bg/scrim, e.g. image lightbox controls.',
'color/border/default':'Decorative dividers and card outlines. Below 3:1 by design: do not use for input outlines.',
'color/border/strong':'Borders that identify a control (inputs, checkboxes). Meets 3:1 on page and surface.',
'color/focus/ring':'Keyboard focus indicator. Meets 3:1 on page and surface in both themes.',
'color/action/primary/bg':'Fill of the primary call to action. Pair with action/primary/fg.',
'color/action/primary/fg':'Text and icons on action/primary/bg.',
'color/action/secondary/bg':'Fill of secondary buttons. Text on it is text/primary.',
'color/feedback/error/fg':'Error text and icons. Not for destructive fills.',
'color/action/primary/bg-hover':'Primary action background while hovered. Pair with action/primary/fg.',
'color/action/primary/bg-pressed':'Primary action background while pressed. Pair with action/primary/fg.',
'color/action/disabled/bg':'Background of any disabled control.',
'color/action/disabled/fg':'Text and icons of any disabled control. Exempt from WCAG contrast: inactive controls need not meet it.',
'color/feedback/error/bg-subtle':'Background of error banners and inline error blocks. Pair with feedback/error/fg.'};


// Primitive numbers and strings. [name, value, unit]
export const space = [0, 2, 4, 6, 8, 12, 16, 24, 32, 48];
export const radius = { 0: 0, 6: 6, 8: 8, 10: 10, 14: 14, 9999: 9999 };
export const fontSize = [12, 14, 16, 18, 20, 24];
export const fontWeight = [400, 500, 600, 700];
export const lineHeight = [16, 20, 24, 28, 32];
export const letterSpacing = { 0: 0, wide: 0.6 };
export const fontFamily = { sans: 'Archivo', mono: 'JetBrains Mono' };

// Layout semantic tokens: [name, primitive target, description]
export const layout = [];
for (const [k, v, u] of [['xs', 4, 'Tightest gap or padding'], ['sm', 8, 'Small gap or padding'], ['md', 12, 'Default padding inside controls'], ['lg', 16, 'Default gap between blocks and padding inside cards'], ['xl', 24, 'Roomy padding and gaps between groups'], ['2xl', 32, 'Gap between sections'], ['3xl', 48, 'Largest gap, for page-level separation']])
  layout.push([`space/${k}`, `space/${v}`, `${u} (${v}px). Works for padding and gaps.`]);
for (const [k, v, u] of [['sm', 6, 'Small chips, kbd, tooltips'], ['md', 8, 'Buttons, inputs, menu items'], ['lg', 10, 'Cards, composer, list rows'], ['xl', 14, 'Popovers, dialogs, sheets'], ['full', 9999, 'Pills, avatars, round icon buttons']])
  layout.push([`radius/${k}`, `radius/${v}`, `${u}.`]);

// Semantic typography: composite tokens built from primitives. Text styles live
// in Figma as styles, not variables, so these are generated in the repo only.
// [name, family, weight, size, line-height, letter-spacing, description]
export const textStyles = [
  ['display', 'sans', 700, 24, 32, '0', 'Hero titles and empty states.'],
  ['heading', 'sans', 600, 18, 28, '0', 'Section and dialog titles.'],
  ['body', 'sans', 400, 14, 20, '0', 'Default text for messages and controls.'],
  ['body-small', 'sans', 400, 12, 16, '0', 'Captions, helper and meta text.'],
  ['label', 'sans', 600, 12, 16, 'wide', 'Small uppercase labels, with wide letter spacing.'],
  ['code', 'mono', 400, 12, 16, '0', 'Inline code and code blocks.'],
];
