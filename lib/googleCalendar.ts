// 運用ルール: 予定の追加・編集は Google カレンダーのみで行う（コード変更不要）。
// - CLAFT専用の予定: CLAFTカレンダー（CLAFT_CALENDAR_ID）
// - 全体共通の予定: キープオンカレンダー（KEEPON_CALENDAR_ID）
// 各予定の説明欄に必要に応じて以下を記載（すべて任意）:
//   対象: （自由記述）
//   場所: （開催場所）← Googleカレンダーの「場所」欄ではなく説明欄に記載
//   時間: （例: 13:00〜15:00）← 補足的な時間帯の記載
//   申込: （フォームURL）
//   カテゴリ: （検定/発表会/Yononaka/ワークショップ/展示会 等）
//   配信: （告知したWeekly/MonthlyのURL）

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;        // ISO（終日予定は YYYY-MM-DD、時刻ありは dateTime）
  end?: string;
  allDay: boolean;
  location?: string;
  source: 'keepon' | 'claft';
  audience?: string;    // 説明欄「対象:」
  time?: string;        // 説明欄「時間:」
  applyUrl?: string;    // 説明欄「申込:」
  category?: string;    // 説明欄「カテゴリ:」
  broadcastUrl?: string; // 説明欄「配信:」
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

function parseDescription(
  description: string | undefined
): Pick<CalendarEvent, 'audience' | 'location' | 'time' | 'applyUrl' | 'category' | 'broadcastUrl'> {
  if (!description) return {};
  const result: Pick<CalendarEvent, 'audience' | 'location' | 'time' | 'applyUrl' | 'category' | 'broadcastUrl'> = {};

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
  }
  return result;
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

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
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
