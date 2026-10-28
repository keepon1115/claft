// YouTubeのURLから動画IDと開始秒を取り出す（youtu.be / watch?v= の両対応）
export function parseYouTube(url: string): { id: string; start?: number } | null {
  try {
    const u = new URL(url);
    const id = u.hostname.includes('youtu.be') ? u.pathname.slice(1) : u.searchParams.get('v');
    if (!id) return null;
    const t = parseInt(u.searchParams.get('t') ?? '', 10);
    return { id, ...(t > 0 ? { start: t } : {}) };
  } catch {
    return null;
  }
}

export function youtubeEmbedUrl(id: string, start?: number): string {
  return `https://www.youtube-nocookie.com/embed/${id}${start ? `?start=${start}` : ''}`;
}
