// 運用ルール: 予定の追加・編集は Google カレンダーのみで行う（コード変更不要）。
// - CLAFT専用の予定: CLAFTカレンダー（CLAFT_CALENDAR_ID）
// - 全体共通の予定: キープオンカレンダー（KEEPON_CALENDAR_ID）
// 各予定の説明欄に必要に応じて以下を記載（すべて任意）:
//   対象: （自由記述）
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
  applyUrl?: string;    // 説明欄「申込:」
  category?: string;    // 説明欄「カテゴリ:」
  broadcastUrl?: string; // 説明欄「配信:」
  rawDescription?: string;
}

function parseDescription(
  description: string | undefined
): Pick<CalendarEvent, 'audience' | 'applyUrl' | 'category' | 'broadcastUrl'> {
  if (!description) return {};
  const result: Pick<CalendarEvent, 'audience' | 'applyUrl' | 'category' | 'broadcastUrl'> = {};
  for (const line of description.split('\n')) {
    const t = line.trim();
    if (t.startsWith('対象:')) result.audience = t.slice(3).trim();
    else if (t.startsWith('申込:')) result.applyUrl = t.slice(3).trim();
    else if (t.startsWith('カテゴリ:')) result.category = t.slice(5).trim();
    else if (t.startsWith('配信:')) result.broadcastUrl = t.slice(3).trim();
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
