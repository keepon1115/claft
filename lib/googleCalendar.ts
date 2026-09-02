// 運用ルール: 予定の追加・編集は Google カレンダーのみで行う（コード変更不要）。
// - CLAFT専用の予定: CLAFTカレンダー（CLAFT_CALENDAR_ID）
// - 全体共通の予定: キープオンカレンダー（KEEPON_CALENDAR_ID）
//
// 【時間・場所】Googleカレンダーの通常の「日時」「場所」欄に入力するだけで反映される。
//   - 時間帯（例 13:00〜15:00）は開始/終了時刻から自動表示。
//   - 場所はカレンダーの「場所」欄をそのまま表示。
//   ※下記の説明欄タグ「時間:」「場所:」を書いた場合はそちらが優先（上書き）される。
//
// 【画像】説明欄に「画像: 公開URL」を1行貼ると、カードにサムネイル表示される。
//   - microCMSのメディアにアップロード → 公開URLをコピーして貼るのが推奨。
//   - http(s):// で始まる公開URLのみ有効。
//
// 各予定の説明欄に必要に応じて以下を記載（すべて任意）:
//   対象: （自由記述）
//   画像: （公開画像URL。microCMS推奨）
//   場所: （説明欄で上書きしたい場合のみ。通常はカレンダーの場所欄でOK）
//   時間: （説明欄で上書きしたい場合のみ。通常は自動表示）
//   申込: （フォームURL）
//   カテゴリ: （検定/発表会/Yononaka/ワークショップ/展示会 等）
//   配信: （告知したWeekly/MonthlyのURL）
//   ボタン文言: （申込ボタンの表示文言。省略時は「申し込む」）

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;        // ISO（終日予定は YYYY-MM-DD、時刻ありは dateTime）
  end?: string;
  allDay: boolean;
  location?: string;
  source: 'keepon' | 'claft';
  audience?: string;    // 説明欄「対象:」
  time?: string;        // 開始/終了時刻から自動生成。説明欄「時間:」があれば上書き
  applyUrl?: string;    // 説明欄「申込:」
  category?: string;    // 説明欄「カテゴリ:」
  broadcastUrl?: string; // 説明欄「配信:」
  imageUrl?: string;    // 説明欄「画像:」（公開URL／microCMS推奨）
  applyButtonLabel?: string; // 説明欄「ボタン文言:」（省略時は「申し込む」）
  rawDescription?: string;
}

// Google Calendar API returns HTML-formatted descriptions (e.g. <br> line breaks,
// URLs wrapped in <a href="https://www.google.com/url?q=REAL_URL&...">REAL_URL</a>).
// This helper strips tags and decodes entities, keeping anchor text (the real URL).
function stripHtml(html: string): string {
  return html
    .replace(/<a\s[^>]*>([\s\S]*?)<\/a>/gi, (_m, inner) =>
      inner.replace(/<[^>]+>/g, '').trim()
    )
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

type ParsedFields = Pick<
  CalendarEvent,
  | 'audience'
  | 'location'
  | 'time'
  | 'applyUrl'
  | 'category'
  | 'broadcastUrl'
  | 'imageUrl'
  | 'applyButtonLabel'
>;

function parseDescription(description: string | undefined): ParsedFields {
  if (!description) return {};
  const result: ParsedFields = {};

  // Normalize HTML line breaks to \n before splitting
  const normalized = description.replace(/<br\s*\/?>/gi, '\n');

  for (const line of normalized.split('\n')) {
    const t = stripHtml(line).trim();
    // Support both full-width（：）and half-width（:）colons
    if (/^対象[：:]/.test(t)) result.audience = t.replace(/^対象[：:]\s*/, '');
    else if (/^場所[：:]/.test(t)) result.location = t.replace(/^場所[：:]\s*/, '');
    else if (/^時間[：:]/.test(t)) result.time = t.replace(/^時間[：:]\s*/, '');
    else if (/^申込[：:]/.test(t)) result.applyUrl = t.replace(/^申込[：:]\s*/, '');
    else if (/^カテゴリ[：:]/.test(t)) result.category = t.replace(/^カテゴリ[：:]\s*/, '');
    else if (/^配信[：:]/.test(t)) result.broadcastUrl = t.replace(/^配信[：:]\s*/, '');
    else if (/^ボタン文言[：:]/.test(t)) result.applyButtonLabel = t.replace(/^ボタン文言[：:]\s*/, '');
    else if (/^画像[：:]/.test(t)) {
      const url = t.replace(/^画像[：:]\s*/, '');
      // 公開URL（http/https）のみ許可。それ以外は無視（安全側）。
      if (/^https?:\/\//i.test(url)) result.imageUrl = url;
    }
  }
  return result;
}

/** 開始/終了の dateTime から「13:00〜15:00」形式の時間帯を生成（時刻あり予定のみ） */
function deriveTimeRange(
  startDateTime: string | undefined,
  endDateTime: string | undefined
): string | undefined {
  if (!startDateTime) return undefined;
  const fmt = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };
  const s = fmt(startDateTime);
  if (!s) return undefined;
  const e = endDateTime ? fmt(endDateTime) : null;
  return e ? `${s}〜${e}` : s;
}

async function fetchCalendar(
  calendarId: string,
  apiKey: string,
  source: 'keepon' | 'claft'
): Promise<CalendarEvent[]> {
  const timeMin = new Date();
  timeMin.setHours(0, 0, 0, 0);

  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
  );
  url.searchParams.set('key', apiKey);
  url.searchParams.set('timeMin', timeMin.toISOString());
  url.searchParams.set('singleEvents', 'true');
  url.searchParams.set('orderBy', 'startTime');
  url.searchParams.set('maxResults', '50');

  const res = await fetch(url.toString(), { next: { revalidate: 600 } });
  if (!res.ok) {
    throw new Error(`Calendar fetch failed: ${res.status} (${calendarId})`);
  }

  const data = await res.json();
  return (data.items ?? []).map((item: any): CalendarEvent => {
    const allDay = Boolean(item.start?.date && !item.start?.dateTime);
    return {
      id: item.id,
      title: item.summary ?? '(タイトルなし)',
      start: allDay
        ? (item.start.date as string)
        : (item.start.dateTime ?? item.start.date),
      end: allDay
        ? item.end?.date
        : (item.end?.dateTime ?? item.end?.date),
      allDay,
      location: item.location,
      // 開始/終了時刻から自動生成（説明欄「時間:」があれば下の spread で上書き）
      time: allDay ? undefined : deriveTimeRange(item.start?.dateTime, item.end?.dateTime),
      source,
      rawDescription: item.description,
      ...parseDescription(item.description),
    };
  });
}

export async function getUpcomingEvents(): Promise<{
  events: CalendarEvent[];
  error?: string;
}> {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const keeponId = process.env.KEEPON_CALENDAR_ID;
  const claftId = process.env.CLAFT_CALENDAR_ID;

  if (!apiKey || !keeponId || !claftId) {
    return {
      events: [],
      error:
        '環境変数（GOOGLE_CALENDAR_API_KEY / KEEPON_CALENDAR_ID / CLAFT_CALENDAR_ID）が設定されていません',
    };
  }

  try {
    const [keeponEvents, claftEvents] = await Promise.all([
      fetchCalendar(keeponId, apiKey, 'keepon'),
      fetchCalendar(claftId, apiKey, 'claft'),
    ]);

    const events = [...keeponEvents, ...claftEvents].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    return { events };
  } catch (e) {
    console.error('[googleCalendar] fetch error:', e);
    return { events: [], error: '予定の取得に失敗しました' };
  }
}
