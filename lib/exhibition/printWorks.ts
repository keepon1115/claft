import { absoluteUrl } from '../seo';
import { fetchExhibitionBySlug, fetchWorks } from './queries';
import type { Work } from './types';
import { extractYouTubeId } from './youtube';

/* ============================================================
   なんでも展示会：印刷ページ用の作品データ
   - 「作品管理シート」を表示のたびに直接読む（シートを直せばページも変わる）
   - シートを読めないとき（共有が「制限付き」など）は、Webの作品一覧と同じ
     Supabase の取り込み済みデータで代用する
   展示会が替わったら、下の展示会設定を差し替える。
============================================================ */

const SHEET_ID = '1yAAM9b_eE5aR7NQ4esVQrUkBb828mbEVajkMH6PP_3I';
const SHEET_GID = '394850179';
const EXHIBITION_SLUG = 'nandemo-2026-11';
const EXHIBITION_PATH = '/futurecraft/Exhibition2611';
/** 各ページ右下に出す開催年月 */
export const EVENT_DATE = '2026.11';

export const SHEET_EDIT_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit?gid=${SHEET_GID}`;

export interface PrintWork {
  title: string;
  description: string;
  /** 上に大きく出す画像。無ければ YouTube のサムネイルを使う */
  imageUrl: string | null;
  youtubeId: string | null;
  /** オンライン展示内の作品へのリンク */
  qrUrl: string | null;
}

export interface PrintWorksResult {
  works: PrintWork[];
  source: 'sheet' | 'supabase';
  /** シートを読めなかった理由（source が supabase のときだけ入る） */
  sheetError: string | null;
  onlineLookupFailed: boolean;
}

interface RawWork {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
}

function toPrintWork(raw: RawWork, onlineId: string | null): PrintWork | null {
  const youtubeId = raw.videoUrl ? extractYouTubeId(raw.videoUrl) : null;
  // 動画URLの列に画像のURLが入っている行は、画像として扱う
  const imageUrl = raw.imageUrl || (raw.videoUrl && !youtubeId ? raw.videoUrl : '') || null;
  if (!raw.title || (!imageUrl && !youtubeId)) return null;

  const qrUrl = onlineId ? absoluteUrl(`${EXHIBITION_PATH}#work-${onlineId}`) : null;
  return { title: raw.title, description: raw.description, imageUrl, youtubeId, qrUrl };
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

export function worksFromCsv(text: string, onlineWorks: Work[]): PrintWork[] {
  const rows = parseCsv(text);
  const header = (rows[0] ?? []).map((h) => h.trim());
  const col = (...names: string[]) => header.findIndex((h) => names.includes(h));
  const idx = {
    title: col('作品名'),
    author: col('名前', 'ニックネーム'),
    description: col('説明文'),
    imageUrl: col('画像URL', '画像 URL'),
    videoUrl: col('動画URL'),
    remove: col('削除'),
  };
  if (idx.title < 0) throw new Error('見出し行に「作品名」が見つかりません');

  // CSV取り込み時と同じ「作品名＋名前」で照合する。候補が複数ある場合はリンクを付けない。
  const onlineIds = new Map<string, string | null>();
  for (const work of onlineWorks) {
    const key = `${work.title}\u0000${work.author_nickname}`;
    onlineIds.set(key, onlineIds.has(key) ? null : work.id);
  }

  const cell = (r: string[], i: number) => (i >= 0 ? (r[i] ?? '').trim() : '');
  const works: PrintWork[] = [];
  for (const r of rows.slice(1)) {
    if (cell(r, idx.remove) === '削除') continue;
    const title = cell(r, idx.title);
    const author = cell(r, idx.author);
    const onlineId = author ? onlineIds.get(`${title}\u0000${author}`) ?? null : null;
    const work = toPrintWork(
      {
        title,
        description: cell(r, idx.description),
        imageUrl: cell(r, idx.imageUrl),
        videoUrl: cell(r, idx.videoUrl),
      },
      onlineId,
    );
    if (work) works.push(work);
  }
  return works;
}

async function fetchFromSheet(onlineWorks: Promise<Work[]>): Promise<PrintWork[]> {
  const res = await fetch(
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`,
    { cache: 'no-store' },
  );
  // 共有が「制限付き」だと、CSVではなくログイン画面（HTML）が返る
  if (!res.ok || !(res.headers.get('content-type') ?? '').includes('text/csv')) {
    throw new Error(`シートが「リンクを知っている全員が閲覧可」になっていません（HTTP ${res.status}）`);
  }
  return worksFromCsv(await res.text(), await onlineWorks);
}

async function fetchOnlineWorks(): Promise<Work[]> {
  const exhibition = await fetchExhibitionBySlug(EXHIBITION_SLUG);
  if (!exhibition) return [];
  const works = await fetchWorks(exhibition.id);
  return works.filter((w) => w.thumbnail_url || w.youtube_url || w.story_made);
}

function printWorksFromOnline(works: Work[]): PrintWork[] {
  // 列の対応は scripts/import-nandemo-works.mjs を参照
  return works
    .map((w) =>
      toPrintWork(
        {
          title: w.title,
          description: w.author_intro ?? '',
          imageUrl: w.thumbnail_url ?? '',
          videoUrl: w.youtube_url ?? '',
        },
        w.id,
      ),
    )
    .filter((w): w is PrintWork => w !== null);
}

export async function fetchPrintWorks(): Promise<PrintWorksResult> {
  let onlineLookupFailed = false;
  const onlineWorks = fetchOnlineWorks().catch(() => {
    onlineLookupFailed = true;
    return [];
  });
  try {
    const works = await fetchFromSheet(onlineWorks);
    return { works, source: 'sheet', sheetError: null, onlineLookupFailed };
  } catch (e) {
    const sheetError = e instanceof Error ? e.message : String(e);
    const works = printWorksFromOnline(await onlineWorks);
    return { works, source: 'supabase', sheetError, onlineLookupFailed };
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
