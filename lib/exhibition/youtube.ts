/** YouTube URL から動画IDを取り出す（watch / youtu.be / shorts / embed 対応） */
export function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('/')[0] || null;
    if (u.hostname.endsWith('youtube.com') || u.hostname.endsWith('youtube-nocookie.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v');
      const m = u.pathname.match(/^\/(embed|shorts|live)\/([\w-]{6,})/);
      if (m) return m[2];
    }
    return null;
  } catch {
    return null;
  }
}

export function youTubeThumbnail(url: string): string | null {
  const id = extractYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}
