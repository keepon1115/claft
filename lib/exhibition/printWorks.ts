import { fetchExhibitionBySlug, fetchWorks } from './queries';
import { extractYouTubeId } from './youtube';

/* ============================================================
   なんでも展示会：印刷ページ用の作品データ
   - 「作品管理シート」を表示のたびに直接読む（シートを直せばページも変わる）
   - シートを読めないとき（共有が「制限付き」など）は、Webの作品一覧と同じ
     Supabase の取り込み済みデータで代用する
   展示会が替わったら、下の3つの定数を差し替える。
============================================================ */

const SHEET_ID = '1yAAM9b_eE5aR7NQ4esVQrUkBb828mbEVajkMH6PP_3I';
const SHEET_GID = '394850179';
const EXHIBITION_SLUG = 'nandemo-2026-11';

export const SHEET_EDIT_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit?gid=${SHEET_GID}`;

export interface PrintWork {
  title: string;
  description: string;
  /** 上に大きく出す画像。無ければ YouTube のサムネイルを使う */
  imageUrl: string | null;
  youtubeId: string | null;
  /** QRコードの行き先（作品URLがあればそれ、無ければ動画） */
  qrUrl: string | null;
  qrLabel: string;
}

export interface PrintWorksResult {
  works: PrintWork[];
  source: 'sheet' | 'supabase';
  /** シートを読めなかった理由（source が supabase のときだけ入る） */
  sheetError: string | null;
}

interface RawWork {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  workUrl: string;
  buttonLabel: string;
}

function toPrintWork(raw: RawWork): PrintWork | null {
  const youtubeId = raw.videoUrl ? extractYouTubeId(raw.videoUrl) : null;
  // 動画URLの列に画像のURLが入っている行は、画像として扱う
  const imageUrl = raw.imageUrl || (raw.videoUrl && !youtubeId ? raw.videoUrl : '') || null;
  if (!raw.title || (!imageUrl && !youtubeId)) return null;

  let qrUrl: string | null = null;
  let qrLabel = '';
  if (raw.workUrl) {
    qrUrl = raw.workUrl;
    qrLabel = raw.buttonLabel || '作品をみる';
  } else if (youtubeId) {
    qrUrl = `https://youtu.be/${youtubeId}`;
    qrLabel = '動画をみる';
  }
  return { title: raw.title, description: raw.description, imageUrl, youtubeId, qrUrl, qrLabel };
}

// RFC4180 の簡易CSVパーサ（引用符・""エスケープ・セル内改行に対応）
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
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

export function worksFromCsv(text: string): PrintWork[] {
  const rows = parseCsv(text);
  const header = (rows[0] ?? []).map((h) => h.trim());
  const col = (...names: string[]) => header.findIndex((h) => names.includes(h));
  const idx = {
    title: col('作品名'),
    description: col('説明文'),
    imageUrl: col('画像URL', '画像 URL'),
    videoUrl: col('動画URL'),
    workUrl: col('作品URL', '作品リンク'),
    buttonLabel: col('ボタン文言'),
    remove: col('削除'),
  };
  if (idx.title < 0) throw new Error('見出し行に「作品名」が見つかりません');

  const cell = (r: string[], i: number) => (i >= 0 ? (r[i] ?? '').trim() : '');
  const works: PrintWork[] = [];
  for (const r of rows.slice(1)) {
    if (cell(r, idx.remove) === '削除') continue;
    const work = toPrintWork({
      title: cell(r, idx.title),
      description: cell(r, idx.description),
      imageUrl: cell(r, idx.imageUrl),
      videoUrl: cell(r, idx.videoUrl),
      workUrl: cell(r, idx.workUrl),
      buttonLabel: cell(r, idx.buttonLabel),
    });
    if (work) works.push(work);
  }
  return works;
}

async function fetchFromSheet(): Promise<PrintWork[]> {
  const res = await fetch(
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`,
    { cache: 'no-store' },
  );
  // 共有が「制限付き」だと、CSVではなくログイン画面（HTML）が返る
  if (!res.ok || !(res.headers.get('content-type') ?? '').includes('text/csv')) {
    throw new Error(`シートが「リンクを知っている全員が閲覧可」になっていません（HTTP ${res.status}）`);
  }
  return worksFromCsv(await res.text());
}

async function fetchFromSupabase(): Promise<PrintWork[]> {
  const exhibition = await fetchExhibitionBySlug(EXHIBITION_SLUG);
  if (!exhibition) return [];
  const works = await fetchWorks(exhibition.id);
  // 列の対応は scripts/import-nandemo-works.mjs を参照
  return works
    .map((w) =>
      toPrintWork({
        title: w.title,
        description: w.author_intro ?? '',
        imageUrl: w.thumbnail_url ?? '',
        videoUrl: w.youtube_url ?? '',
        workUrl: w.story_made ?? '',
        buttonLabel: w.story_devised ?? '',
      }),
    )
    .filter((w): w is PrintWork => w !== null);
}

export async function fetchPrintWorks(): Promise<PrintWorksResult> {
  try {
    return { works: await fetchFromSheet(), source: 'sheet', sheetError: null };
  } catch (e) {
    const sheetError = e instanceof Error ? e.message : String(e);
    const works = await fetchFromSupabase().catch(() => []);
    return { works, source: 'supabase', sheetError };
  }
}

/** 印刷に耐える大きさの YouTube サムネイルを探す（無い動画もあるので順に試す） */
export async function youTubeThumbnailForPrint(id: string): Promise<string> {
  for (const name of ['maxresdefault', 'hq720']) {
    const url = `https://i.ytimg.com/vi/${id}/${name}.jpg`;
    const ok = await fetch(url, { method: 'HEAD', next: { revalidate: 3600 } })
      .then((r) => r.ok)
      .catch(() => false);
    if (ok) return url;
  }
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
