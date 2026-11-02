// メンバーストーリー公開用シート(CSV) → data/student-stories.json
// 使い方: npm run import:stories -- <CSVフォルダ> --dry-run   ← 書き込まず、差分だけ表示
//         npm run import:stories -- <CSVフォルダ>             ← 実際に反映
// フォルダには members.csv / timeline.csv / likesHistory.csv を置く。運用は docs/MEMBER_STORIES_SHEET_RULES.md
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

const MARK = '【要確認】';
const OUT = path.resolve(process.cwd(), 'data/student-stories.json');

type Row = Record<string, string>;

// RFC4180: ダブルクォート囲み・""エスケープ・引用内改行に対応
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  const src = text.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"' && src[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const SLUG = /^[a-z0-9-]+$/;

// 1行目=英語の項目名。2行目の日本語の説明行は、slug が不正な形なので読み飛ばす
function readSheet(dir: string, name: string): Row[] {
  const file = path.join(dir, `${name}.csv`);
  if (!fs.existsSync(file)) throw new Error(`${name}.csv がありません`);
  const [heads, ...rest] = parseCsv(fs.readFileSync(file, 'utf8'));
  const rows = rest
    .map((cells) => Object.fromEntries(heads.map((h, i) => [h.trim(), (cells[i] ?? '').trim()])) as Row)
    .filter((r) => Object.values(r).some(Boolean));
  if (rows[0] && !SLUG.test(rows[0].slug ?? '')) rows.shift();
  return rows;
}

const hidden: { slug: string; field: string }[] = [];
const warnings: string[] = [];

// 【要確認】を含む / hiddenFields にある項目は空にする
function clean(slug: string, field: string, value: string | undefined, hiddenSet = new Set<string>()): string {
  const v = (value ?? '').trim();
  if (!v) return '';
  if (v.includes(MARK) || hiddenSet.has(field)) {
    hidden.push({ slug, field });
    return '';
  }
  return v;
}

const split = (s: string) => s.split('、').map((t) => t.trim()).filter(Boolean);

const required = z.object({
  slug: z.string().regex(SLUG),
  name: z.string().min(1),
  grade: z.string().min(1),
  shortIntro: z.string().min(1),
});

type Story = Record<string, unknown> & { slug: string };

function printDiff(prev: Story[], next: Story[]) {
  let changes = 0;
  for (const n of next) {
    const p = prev.find((s) => s.slug === n.slug);
    if (!p) {
      console.log(`追加: ${n.slug}`);
      changes++;
      continue;
    }
    for (const key of new Set([...Object.keys(p), ...Object.keys(n)])) {
      if (JSON.stringify(p[key]) === JSON.stringify(n[key])) continue;
      console.log(`更新: ${n.slug}.${key}\n  前: ${JSON.stringify(p[key])}\n  後: ${JSON.stringify(n[key])}`);
      changes++;
    }
  }
  for (const p of prev) {
    if (!next.some((n) => n.slug === p.slug)) {
      console.log(`削除: ${p.slug}`);
      changes++;
    }
  }
  if (!changes) console.log('変更なし');
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const dir = args.find((a) => !a.startsWith('--'));
  if (!dir) throw new Error('使い方: npm run import:stories -- <CSVフォルダ> [--dry-run]');

  const members = readSheet(dir, 'members');
  const timelineRows = readSheet(dir, 'timeline');
  const likesRows = readSheet(dir, 'likesHistory');
  const prev: Story[] = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : [];

  const drafts: string[] = [];
  const stories: Story[] = [];

  for (const m of members) {
    const slug = (m.slug ?? '').trim();
    if (!slug) continue;
    if (m.status !== '公開') {
      drafts.push(`${slug}（${m.name || '-'}）`);
      continue;
    }
    const hs = new Set(split(m.hiddenFields ?? ''));
    const g = (f: string) => clean(slug, f, m[f], hs);
    const old = prev.find((s) => s.slug === slug);

    // 読み取りで絵文字が文字化けしていたら、今の値を保つ
    const emoji = (field: string, current: unknown, fallback: string) => {
      const v = g(field);
      if (!/[\u0080-ÿ]/.test(v)) return v || fallback;
      warnings.push(`${slug}: ${field} が文字化けしているため、今の値を保ちました`);
      return typeof current === 'string' ? current : fallback;
    };
    const url = (field: string) => {
      const v = g(field);
      if (v && !v.startsWith('https://')) throw new Error(`${slug}: ${field} は https:// で始めてください（${v}）`);
      return v;
    };

    // 必須項目は検証（要確認で空になる場合もエラーにする）
    const req = required.safeParse({ slug, name: g('name'), grade: g('grade'), shortIntro: g('shortIntro') });
    if (!req.success) throw new Error(`必須項目(slug,name,grade,shortIntro)が不足: ${slug}`);

    const oldActions = (old?.currentActions ?? []) as { emoji?: string }[];
    const actions: { title: string; description: string; emoji: string; tags?: string[] }[] = [];
    for (const key of Object.keys(m).filter((k) => /^action\d+_title$/.test(k))) {
      const n = key.match(/\d+/)![0];
      const title = g(`action${n}_title`);
      if (!title) continue;
      const tags = split(g(`action${n}_tags`));
      actions.push({
        title,
        description: g(`action${n}_desc`),
        emoji: emoji(`action${n}_emoji`, oldActions[actions.length]?.emoji, '✨'),
        ...(tags.length ? { tags } : {}),
      });
    }

    const visionText = g('vision_text');
    const visionSub = g('vision_subText');
    const likesHistory = likesRows
      .filter((i) => i.slug === slug)
      .map((i) => ({ date: clean(slug, 'likesHistory.date', i.date), likes: clean(slug, 'likesHistory.likes', i.likes) }))
      .filter((i) => i.date && i.likes)
      .sort((a, b) => a.date.localeCompare(b.date));

    const timeline = timelineRows
      .filter((t) => t.slug === slug && t.public === '○')
      .map((t) => {
        const title = clean(slug, 'timeline.title', t.title);
        const description = clean(slug, 'timeline.desc', t.desc);
        const category = clean(slug, 'timeline.category', t.category);
        const date = clean(slug, 'timeline.date', t.date);
        return { date, title, ...(category ? { category } : {}), ...(description ? { description } : {}) };
      })
      .filter((t) => t.date && t.title)
      .sort((a, b) => a.date.localeCompare(b.date));

    const opt = (k: string, v: string) => (v ? { [k]: v } : {});
    stories.push({
      slug,
      name: req.data.name,
      grade: req.data.grade,
      avatarEmoji: emoji('avatarEmoji', old?.avatarEmoji, '🌟'),
      ...opt('iconUrl', url('iconUrl')),
      shortIntro: req.data.shortIntro,
      likes: split(g('likes')),
      ...opt('character', g('character')),
      ...opt('strengths', g('strengths')),
      ...opt('motivationEnv', g('motivationEnv')),
      ...(visionText ? { futureVision: { text: visionText, ...opt('subText', visionSub) } } : {}),
      ...opt('goalThisYear', g('goal_thisYear')),
      currentActions: actions,
      ...opt('quote', g('quote')),
      ...opt('laterConnection', g('laterConnection')),
      ...opt('visitorQuestion', g('visitorQuestion')),
      ...opt('workUrl', url('workUrl')),
      ...opt('exhibitVideoUrl', url('exhibitVideoUrl')),
      ...opt('updatedAt', g('updatedAt')),
      interestTags: split(g('interestTags')),
      likesHistory,
      timeline,
    });
  }

  console.log(`公開 ${stories.length} 人\n\n【差分】`);
  printDiff(prev, stories);
  if (warnings.length) console.log(`\n【警告】\n${warnings.map((w) => `  ${w}`).join('\n')}`);

  console.log('\n【要確認】/hiddenFields で非公開にした項目:');
  if (!hidden.length) console.log('  なし');
  for (const h of hidden) console.log(`  ${h.slug}: ${h.field}`);
  console.log('\n下書きのため出力しなかった人:');
  if (!drafts.length) console.log('  なし');
  for (const d of drafts) console.log(`  ${d}`);

  if (dryRun) {
    console.log('\nお試し実行のため、書き込んでいません。');
    return;
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(stories, null, 2) + '\n', 'utf8');
  console.log(`\n出力: ${path.relative(process.cwd(), OUT)}`);
}

try {
  main();
} catch (e) {
  console.error('取り込みエラー:', (e as Error).message);
  process.exit(1);
}
