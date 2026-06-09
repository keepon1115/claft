// Generates nav-proposal.svg — BEFORE vs AFTER sidebar design comparison

const fs = require('fs');

// ── Palette ──────────────────────────────────────────────────────────────────
const TEAL      = '#34C6BE';
const TEAL_LIGHT = 'rgba(52,198,190,0.08)';
const TEAL_MID   = 'rgba(52,198,190,0.16)';
const TEAL_NEW   = 'rgba(52,198,190,0.18)';
const INK900    = '#111827';
const INK800    = '#1f2937';
const INK700    = '#374151';
const INK500    = '#6b7280';
const INK300    = '#d1d5db';
const SHADOW    = 'rgba(0,0,0,0.07)';
const BG        = '#F8FAFB';
const WHITE     = '#ffffff';

// ── Canvas ────────────────────────────────────────────────────────────────────
const W = 1280, H = 2000;
const PAD = 56;
const PANEL_W = 520;
const LEFT_X  = PAD;
const RIGHT_X = W - PAD - PANEL_W;
const NAV_W   = PANEL_W;
const CORNER  = 16;

// ── Nav data ─────────────────────────────────────────────────────────────────
// type: 'standalone' | 'parent' | 'child'
const BEFORE_ITEMS = [
  { label: 'トップ',              type: 'before_item', arrow: true },
  { label: '「CLAFT」という希望', type: 'before_item', arrow: true },
  { label: 'ロードマップ',        type: 'before_sub',  arrow: false },
  { label: 'メンバーのストーリー', type: 'before_item', arrow: true },
  { label: 'PBL(課題解決型学習)', type: 'before_item', arrow: true },
  { label: 'Yononaka(対話ワーク)', type: 'before_item', arrow: true },
  { label: '授業レポ',            type: 'before_sub',  arrow: false },
  { label: 'AIロボット社会',      type: 'before_sub',  arrow: false },
  { label: '教室オーナーの方へ',   type: 'before_sub',  arrow: false },
  { label: 'ミライクラフト',      type: 'before_item', arrow: true },
  { label: 'PLAY CLAFT',         type: 'before_sub',  arrow: false },
  { label: 'STEAMキャンプ',       type: 'before_sub',  arrow: false },
  { label: 'なんでも展示会',      type: 'before_sub',  arrow: false },
  { label: 'ジブンクラフト',      type: 'before_item', arrow: true },
  { label: 'コース・料金',        type: 'before_item', arrow: true },
];

const AFTER_ITEMS = [
  { label: 'トップ',              type: 'standalone' },
  { label: 'お知らせ・活動報告',   type: 'standalone', isNew: true },
  { label: '「CLAFT」という希望', type: 'parent' },
  { label: 'ロードマップ',        type: 'child' },
  { label: 'メンバーのストーリー', type: 'parent' },
  { label: 'PBL(課題解決型学習)', type: 'parent' },
  { label: 'Yononaka(対話ワーク)', type: 'parent' },
  { label: '授業レポ',            type: 'child' },
  { label: 'AIロボット社会',      type: 'child' },
  { label: '教室オーナーの方へ',   type: 'child' },
  { label: 'ミライクラフト',      type: 'parent' },
  { label: 'PLAY CLAFT',         type: 'child' },
  { label: 'STEAMキャンプ',       type: 'child' },
  { label: 'なんでも展示会',      type: 'child' },
  { label: 'ジブンクラフト',      type: 'parent' },
  { label: 'コース・料金',        type: 'parent' },
];

// ── Item height helpers ────────────────────────────────────────────────────────
function beforeItemHeight(item) {
  return item.type === 'before_sub' ? 42 : 48;
}
function afterItemHeight(item) {
  if (item.type === 'child') return 38;
  if (item.type === 'parent') return 50;
  return 46; // standalone
}
function beforeGap(item) { return 4; }
function afterGap(item, next) {
  if (!next) return 0;
  if (item.type !== 'child' && next.type === 'child') return 2;
  if (item.type === 'child' && next.type !== 'child') return 8;
  if (item.type === 'parent' || item.type === 'standalone') return 5;
  return 3;
}

// ── Geometry ─────────────────────────────────────────────────────────────────
function totalBeforeHeight() {
  return BEFORE_ITEMS.reduce((h, item) => h + beforeItemHeight(item) + 4, 0);
}
function totalAfterHeight() {
  return AFTER_ITEMS.reduce((h, item, i) => {
    const next = AFTER_ITEMS[i + 1];
    return h + afterItemHeight(item) + afterGap(item, next);
  }, 0);
}

// ── SVG helpers ───────────────────────────────────────────────────────────────
function rect(x, y, w, h, fill, rx = 0, opts = '') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" rx="${rx}" ${opts}/>`;
}
function text(x, y, content, opts = {}) {
  const {
    size = 15, weight = 400, fill = INK900, anchor = 'start',
    family = "'Yu Gothic UI', 'Meiryo', 'BIZ UDGothic', sans-serif"
  } = opts;
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" dominant-baseline="middle">${content}</text>`;
}
function line(x1, y1, x2, y2, stroke, width = 1) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}"/>`;
}
function circle(cx, cy, r, fill) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}
function shadow(x, y, w, h, rx) {
  // Soft drop shadow via filter
  return `<rect x="${x+1}" y="${y+2}" width="${w}" height="${h}" fill="rgba(0,0,0,0.06)" rx="${rx}" filter="url(#blur2)"/>`;
}

// ── Build BEFORE nav ──────────────────────────────────────────────────────────
function buildBefore(startX, startY) {
  let svgParts = [];
  let y = startY;

  BEFORE_ITEMS.forEach((item) => {
    const h = beforeItemHeight(item);
    const isActive = item.label === 'トップ';
    const indent = item.type === 'before_sub' ? 8 : 0;
    const bgColor = isActive ? 'rgba(52,198,190,0.1)' :
                    item.type === 'before_sub' ? 'rgba(0,0,0,0.02)' :
                    WHITE;
    const borderColor = isActive ? 'rgba(52,198,190,0.25)' : 'rgba(0,0,0,0.08)';
    const textSize = item.type === 'before_sub' ? 14 : 15;
    const textWeight = item.type === 'before_sub' ? 500 : 600;
    const textColor = item.type === 'before_sub' ? INK700 : INK900;

    // Background + border
    svgParts.push(rect(startX + indent, y, NAV_W - indent, h, bgColor, 8,
      `stroke="${borderColor}" stroke-width="1"`));

    // Arrow (right side)
    if (item.arrow) {
      svgParts.push(text(startX + NAV_W - 20, y + h/2,
        '›', { size: 20, weight: 400, fill: INK500 }));
    }

    // Label
    svgParts.push(text(startX + indent + 16, y + h/2,
      item.label, { size: textSize, weight: textWeight, fill: textColor }));

    y += h + 4;
  });

  return svgParts.join('\n');
}

// ── Build AFTER nav ───────────────────────────────────────────────────────────
function buildAfter(startX, startY) {
  let svgParts = [];
  let y = startY;

  AFTER_ITEMS.forEach((item, i) => {
    const h = afterItemHeight(item);
    const next = AFTER_ITEMS[i + 1];

    if (item.type === 'standalone') {
      // Clean standalone row
      const bg = item.isNew ? 'rgba(52,198,190,0.06)' : WHITE;
      const border = item.isNew ? 'rgba(52,198,190,0.2)' : 'rgba(0,0,0,0.08)';
      svgParts.push(rect(startX, y, NAV_W, h, bg, 10,
        `stroke="${border}" stroke-width="1"`));
      // Arrow for non-new items
      if (!item.isNew) {
        svgParts.push(text(startX + NAV_W - 20, y + h/2,
          '›', { size: 20, weight: 400, fill: INK500 }));
      }
      svgParts.push(text(startX + 16, y + h/2,
        item.label, { size: 15, weight: 600, fill: INK900 }));
      // NEW badge
      if (item.isNew) {
        const bx = startX + NAV_W - 58;
        const by = y + h/2 - 10;
        svgParts.push(rect(bx, by, 48, 20, TEAL, 99));
        svgParts.push(text(bx + 24, by + 10, 'NEW',
          { size: 10, weight: 700, fill: WHITE, anchor: 'middle',
            family: "'BricolageGrotesque', 'Yu Gothic UI', sans-serif" }));
      }
    }

    else if (item.type === 'parent') {
      // Parent: teal left-bar + tinted bg + bold text + arrow
      svgParts.push(rect(startX, y, NAV_W, h, TEAL_LIGHT, 10,
        `stroke="rgba(52,198,190,0.15)" stroke-width="1"`));
      // Teal accent bar (left edge)
      svgParts.push(rect(startX, y + 4, 3, h - 8, TEAL, 99));
      // Arrow
      svgParts.push(text(startX + NAV_W - 20, y + h/2,
        '›', { size: 20, weight: 400, fill: TEAL }));
      // Label
      svgParts.push(text(startX + 20, y + h/2,
        item.label, { size: 16, weight: 700, fill: INK900 }));
    }

    else if (item.type === 'child') {
      // Child: indented, smaller, dot prefix, subdued bg
      const indent = 24;
      svgParts.push(rect(startX + indent, y, NAV_W - indent, h,
        'rgba(0,0,0,0.025)', 8,
        'stroke="rgba(0,0,0,0.06)" stroke-width="1"'));
      // Dot
      svgParts.push(circle(startX + indent + 14, y + h/2, 3, TEAL));
      // Label
      svgParts.push(text(startX + indent + 26, y + h/2,
        item.label, { size: 14, weight: 400, fill: INK700 }));
    }

    y += h + afterGap(item, next);
  });

  return svgParts.join('\n');
}

// ── Section labels ─────────────────────────────────────────────────────────────
function sectionLabel(x, y, title, subtitle, accent) {
  return [
    rect(x, y - 2, 3, 36, accent, 99),
    text(x + 14, y + 9, title,
      { size: 22, weight: 700, fill: INK900,
        family: "'BricolageGrotesque', 'Yu Gothic UI', sans-serif" }),
    text(x + 14, y + 30, subtitle,
      { size: 12, weight: 400, fill: INK500,
        family: "'InstrumentSans-Regular', 'Yu Gothic UI', sans-serif" }),
  ].join('\n');
}

// ── Annotation helpers ─────────────────────────────────────────────────────────
function annotation(x, y, label, color = TEAL) {
  return [
    rect(x, y - 10, label.length * 7.2 + 16, 22, color + '22', 99),
    text(x + 8, y + 1, label, { size: 11, weight: 600, fill: color }),
  ].join('\n');
}

// ── Main SVG ───────────────────────────────────────────────────────────────────
function buildSVG() {
  const navTopY = 240;

  // Compute total nav heights
  const beforeH = totalBeforeHeight();
  const afterH  = totalAfterHeight();
  const panelH  = Math.max(beforeH, afterH) + 48;

  const svgH = navTopY + panelH + 200;

  const beforeNavY = navTopY + 80;
  const afterNavY  = navTopY + 80;

  const midX = W / 2;

  const parts = [];

  // ── Defs ──────────────────────────────────────────────────────────────────
  parts.push(`
<defs>
  <filter id="blur2" x="-10%" y="-10%" width="120%" height="120%">
    <feGaussianBlur stdDeviation="4"/>
  </filter>
  <filter id="panelShadow" x="-5%" y="-3%" width="115%" height="115%">
    <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="rgba(0,0,0,0.08)"/>
  </filter>
</defs>`);

  // ── Background ─────────────────────────────────────────────────────────────
  parts.push(rect(0, 0, W, svgH, BG));

  // Subtle grid pattern
  for (let x = 0; x < W; x += 40) {
    parts.push(line(x, 0, x, svgH, 'rgba(0,0,0,0.025)'));
  }
  for (let y = 0; y < svgH; y += 40) {
    parts.push(line(0, y, W, y, 'rgba(0,0,0,0.025)'));
  }

  // ── Header ─────────────────────────────────────────────────────────────────
  // Top accent bar
  parts.push(rect(0, 0, W, 6, TEAL));

  // Header section
  parts.push(rect(0, 6, W, 120, WHITE));
  parts.push(line(0, 126, W, 126, INK300));

  // Title
  parts.push(text(PAD, 50, 'CLAFT Navigation',
    { size: 13, weight: 500, fill: TEAL,
      family: "'GeistMono-Regular', monospace" }));
  parts.push(text(PAD, 80, 'サイドナビゲーション — デザイン改善提案',
    { size: 28, weight: 700, fill: INK900,
      family: "'BricolageGrotesque', 'Yu Gothic UI', sans-serif" }));
  parts.push(text(PAD, 110, 'Visual Hierarchy Redesign  ·  大項目 / 小項目の視認性向上  ·  お知らせ追加',
    { size: 14, weight: 400, fill: INK500,
      family: "'InstrumentSans-Regular', 'Yu Gothic UI', sans-serif" }));

  // CLAFT teal dot accent
  parts.push(circle(W - PAD - 10, 66, 28, TEAL_LIGHT));
  parts.push(circle(W - PAD - 10, 66, 16, TEAL));
  parts.push(text(W - PAD - 10, 66, 'C',
    { size: 15, weight: 700, fill: WHITE, anchor: 'middle',
      family: "'BricolageGrotesque', sans-serif" }));

  // ── Panel backgrounds ───────────────────────────────────────────────────────
  const leftPanelX  = LEFT_X;
  const rightPanelX = RIGHT_X;

  // Left panel (BEFORE)
  parts.push(`<rect x="${leftPanelX}" y="${navTopY - 20}" width="${PANEL_W}" height="${panelH + 20}" fill="${WHITE}" rx="${CORNER}" filter="url(#panelShadow)"/>`);
  // Right panel (AFTER)
  parts.push(`<rect x="${rightPanelX}" y="${navTopY - 20}" width="${PANEL_W}" height="${panelH + 20}" fill="${WHITE}" rx="${CORNER}" filter="url(#panelShadow)"/>`);

  // ── Section labels ──────────────────────────────────────────────────────────
  parts.push(sectionLabel(leftPanelX + 20, navTopY, 'BEFORE', '現状 — 大項目と小項目の区別が不明瞭', INK300));
  parts.push(sectionLabel(rightPanelX + 20, navTopY, 'AFTER', '改善案 — 明確な視覚的階層構造', TEAL));

  // ── Nav items ────────────────────────────────────────────────────────────────
  parts.push(buildBefore(leftPanelX + 16, beforeNavY));
  parts.push(buildAfter(rightPanelX + 16, afterNavY));

  // ── Divider ──────────────────────────────────────────────────────────────────
  // Arrow between panels
  const arrowY = navTopY + panelH / 2;
  const arrowX1 = leftPanelX + PANEL_W + 20;
  const arrowX2 = rightPanelX - 20;
  const arrowMid = (arrowX1 + arrowX2) / 2;

  parts.push(rect(arrowX1, arrowY - 1, arrowX2 - arrowX1, 2, TEAL));
  // Arrowhead
  parts.push(`<polygon points="${arrowX2},${arrowY} ${arrowX2-10},${arrowY-6} ${arrowX2-10},${arrowY+6}" fill="${TEAL}"/>`);
  // Circle on left
  parts.push(circle(arrowX1, arrowY, 5, TEAL));

  // ── Legend ───────────────────────────────────────────────────────────────────
  const legendY = navTopY + panelH + 40;
  parts.push(rect(PAD, legendY, W - PAD*2, 80, WHITE, 12,
    `stroke="${INK300}" stroke-width="1"`));

  const legItems = [
    { color: INK900, label: '大項目（親）', desc: 'teal左アクセントバー + 太字 + 背景ティント', x: PAD + 32 },
    { color: INK700, label: '小項目（子）', desc: '24px インデント + ドット + 小フォント', x: PAD + 260 },
    { color: TEAL,   label: 'NEW バッジ',   desc: 'お知らせ・活動報告 をトップ直下に追加', x: PAD + 488 },
    { color: INK500, label: 'スタンドアロン', desc: '区切りなし・シンプルなボタン', x: PAD + 720 },
  ];

  legItems.forEach(({ color, label, desc, x }) => {
    parts.push(circle(x, legendY + 22, 5, color));
    parts.push(text(x + 12, legendY + 22, label,
      { size: 13, weight: 600, fill: INK900,
        family: "'Yu Gothic UI', 'Meiryo', sans-serif" }));
    parts.push(text(x + 12, legendY + 42, desc,
      { size: 11, weight: 400, fill: INK500,
        family: "'Yu Gothic UI', 'Meiryo', sans-serif" }));
    parts.push(line(x + 12, legendY + 28, x + 12 + desc.length * 6.8, legendY + 28,
      'rgba(0,0,0,0.06)'));
  });

  // ── Footer ─────────────────────────────────────────────────────────────────
  const footerY = legendY + 100;
  parts.push(rect(0, footerY, W, 60, WHITE));
  parts.push(line(0, footerY, W, footerY, INK300));
  parts.push(text(PAD, footerY + 30, 'CLAFT by KEEPON — ナビゲーション改善提案  v1.0  2026',
    { size: 12, weight: 400, fill: INK500,
      family: "'GeistMono-Regular', 'Yu Gothic UI', monospace" }));
  parts.push(text(W - PAD, footerY + 30, 'Design: Structured Transparency',
    { size: 12, weight: 400, fill: INK300, anchor: 'end',
      family: "'GeistMono-Regular', monospace" }));

  // ── Compose ────────────────────────────────────────────────────────────────
  const totalH = footerY + 60;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${totalH}" viewBox="0 0 ${W} ${totalH}">
  <style>
    text { font-smoothing: antialiased; -webkit-font-smoothing: antialiased; }
  </style>
${parts.join('\n')}
</svg>`;
}

// ── Write output ────────────────────────────────────────────────────────────────
const svgContent = buildSVG();
fs.writeFileSync(__dirname + '/nav-proposal.svg', svgContent, 'utf8');
console.log('✓ nav-proposal.svg written to', __dirname);
