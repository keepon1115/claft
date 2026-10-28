// メンバーストーリー管理シート(xlsx) → data/student-stories.json
// 使い方: npm run import:stories -- <xlsxのパス>   （引数なしなら環境変数 STORIES_XLSX）
// 公開してよい情報だけを抜き出す。interviews は slug / date / likes3 以外を読まない。
import fs from 'node:fs';
import path from 'node:path';
import ExcelJS from 'exceljs';
import JSZip from 'jszip';
import { z } from 'zod';

const MARK = '【要確認】';
const OUT = path.resolve(process.cwd(), 'data/student-stories.json');

type Row = Record<string, string>;

// Excelのコメント(メモ)の関係定義が exceljs と相性が悪いので、読む前に取り除く
async function loadWorkbook(file: string) {
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  for (const name of Object.keys(zip.files).filter((n) => n.endsWith('.rels'))) {
    const xml = await zip.file(name)!.async('string');
    const cleaned = xml
      .split('<Relationship ')
      .filter((p, i) => i === 0 || !/(comments|vmlDrawing)"/.test(p))
      .join('<Relationship ');
    zip.file(name, cleaned);
  }
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(await zip.generateAsync({ type: 'nodebuffer' }));
  return wb;
}

const pad = (n: number) => String(n).padStart(2, '0');

function cellText(v: ExcelJS.CellValue): string {
  if (v == null) return '';
  if (v instanceof Date) return `${v.getUTCFullYear()}-${pad(v.getUTCMonth() + 1)}`;
  if (typeof v === 'object') {
    const o = v as unknown as Record<string, unknown>;
    if (Array.isArray(o.richText)) return (o.richText as { text: string }[]).map((t) => t.text).join('');
    if (typeof o.hyperlink === 'string') return o.hyperlink; // URLセルはリンク先を採用
    if ('result' in o) return cellText(o.result as ExcelJS.CellValue);
    if (typeof o.text === 'string') return o.text;
    return '';
  }
  return String(v).trim();
}

// 1行目=英語の項目名、2行目=日本語の説明、データは3行目から
function readSheet(wb: ExcelJS.Workbook, name: string, allow?: string[]): Row[] {
  const ws = wb.getWorksheet(name);
  if (!ws) throw new Error(`シート「${name}」がありません`);
  const heads: string[] = [];
  ws.getRow(1).eachCell({ includeEmpty: true }, (c, i) => {
    heads[i] = cellText(c.value);
  });
  const rows: Row[] = [];
  for (let r = 3; r <= ws.rowCount; r++) {
    const row: Row = {};
    let any = false;
    heads.forEach((h, i) => {
      if (!h || (allow && !allow.includes(h))) return; // 許可外の列は読まない
      const t = cellText(ws.getRow(r).getCell(i).value);
      if (t) any = true;
      row[h] = t;
    });
    if (any) rows.push(row);
  }
  return rows;
}

const hidden: { slug: string; field: string }[] = [];

// 【要確認】を含む / hiddenFields にある項目は空にする
function clean(slug: string, field: string, value: string | undefined, hiddenSet: Set<string>): string {
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
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  grade: z.string().min(1),
  shortIntro: z.string().min(1),
});

async function main() {
  const file = process.argv[2] || process.env.STORIES_XLSX;
  if (!file) throw new Error('xlsxのパスを引数か環境変数 STORIES_XLSX で渡してください');
  const wb = await loadWorkbook(path.resolve(file));

  const members = readSheet(wb, 'members');
  const timelineRows = readSheet(wb, 'timeline');
  const interviewRows = readSheet(wb, 'interviews', ['slug', 'date', 'likes3']);

  const drafts: string[] = [];
  const stories: unknown[] = [];

  for (const m of members) {
    const slug = (m.slug ?? '').trim();
    if (!slug) continue;
    if (m.status !== '公開') {
      drafts.push(`${slug}（${m.name || '-'}）`);
      continue;
    }
    const hs = new Set(split(m.hiddenFields ?? ''));
    const g = (f: string) => clean(slug, f, m[f], hs);

    // 必須項目は検証（要確認で空になる場合もエラーにする）
    const req = required.safeParse({ slug, name: g('name'), grade: g('grade'), shortIntro: g('shortIntro') });
    if (!req.success) throw new Error(`必須項目(slug,name,grade,shortIntro)が不足: ${slug}`);

    const actions: { title: string; description: string; emoji: string; tags?: string[] }[] = [];
    for (const key of Object.keys(m).filter((k) => /^action\d+_title$/.test(k))) {
      const n = key.match(/\d+/)![0];
      const title = g(`action${n}_title`);
      if (!title) continue;
      const tags = split(g(`action${n}_tags`));
      actions.push({
        title,
        description: g(`action${n}_desc`),
        emoji: g(`action${n}_emoji`) || '✨',
        ...(tags.length ? { tags } : {}),
      });
    }

    const visionText = g('vision_text');
    const visionSub = g('vision_subText');
    const likesHistory = interviewRows
      .filter((i) => i.slug === slug)
      .map((i) => ({ date: clean(slug, 'interviews.date', i.date, new Set()), likes: clean(slug, 'likes3', i.likes3, new Set()) }))
      .filter((i) => i.date && i.likes)
      .sort((a, b) => a.date.localeCompare(b.date));

    const timeline = timelineRows
      .filter((t) => t.slug === slug && t.public === '○')
      .map((t) => {
        const title = clean(slug, 'timeline.title', t.title, new Set());
        const description = clean(slug, 'timeline.desc', t.desc, new Set());
        const category = clean(slug, 'timeline.category', t.category, new Set());
        const date = clean(slug, 'timeline.date', t.date, new Set());
        return { date, title, ...(category ? { category } : {}), ...(description ? { description } : {}) };
      })
      .filter((t) => t.date && t.title)
      .sort((a, b) => a.date.localeCompare(b.date));

    const opt = (k: string, v: string) => (v ? { [k]: v } : {});
    stories.push({
      slug,
      name: req.data.name,
      grade: req.data.grade,
      avatarEmoji: g('avatarEmoji') || '🌟',
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
      ...opt('exhibitVideoUrl', g('exhibitVideoUrl')),
      ...opt('updatedAt', g('updatedAt')),
      interestTags: split(g('interestTags')),
      likesHistory,
      timeline,
    });
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(stories, null, 2) + '\n', 'utf8');

  console.log(`出力: ${path.relative(process.cwd(), OUT)}（公開 ${stories.length} 人）`);
  console.log('\n【要確認】/hiddenFields で非公開にした項目:');
  if (!hidden.length) console.log('  なし');
  for (const h of hidden) console.log(`  ${h.slug}: ${h.field}`);
  console.log('\n下書きのため出力しなかった人:');
  if (!drafts.length) console.log('  なし');
  for (const d of drafts) console.log(`  ${d}`);
}

main().catch((e) => {
  console.error('取り込みエラー:', e.message);
  process.exit(1);
});
