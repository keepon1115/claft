'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

/** 作者がコメントに返信するフォーム */
export default function ReplyForm({ token, commentId }: { token: string; commentId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending || !body.trim()) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/author/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, commentId, body: body.trim() }),
      });
      const json = await res.json();
      if (!json?.ok) throw new Error('failed');
      setBody('');
      setOpen(false);
      router.refresh();
    } catch {
      setError('送信できませんでした。もう一度ためしてください。');
    } finally {
      setSending(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-handwritten mt-3 text-sm text-[#2E7D7D] underline underline-offset-4 hover:text-[#E04E2C]"
      >
        ＋ 返信を書く
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={1000}
        rows={3}
        required
        autoFocus
        placeholder="ありがとうの気持ちや、質問へのこたえを書こう"
        className="font-body w-full rounded-2xl border-2 border-[#2E7D7D]/40 bg-white p-4 text-sm leading-relaxed focus:border-[#2E7D7D] focus:outline-none"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={sending || !body.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-[#2E7D7D] px-5 py-2 font-display text-sm text-[#FFF8EC] hover:bg-[#1F1810] transition-colors disabled:opacity-40"
        >
          <Send className="h-3.5 w-3.5" />
          {sending ? 'おくっています…' : '返信する'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="font-body text-xs text-[#1F1810]/50 underline"
        >
          やめる
        </button>
      </div>
      {error && <p className="font-body text-xs text-[#E04E2C]">{error}</p>}
    </form>
  );
}
