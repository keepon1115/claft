'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const QUICK_CHIPS = ['すごい！', 'まねしたい', 'もっと見たい'];

/**
 * コメント送信専用のミニフォーム。
 * 送った本人にも「他の人のコメント」は見せない（作者にだけ届く設計）。
 * commentType は Phase 1 では常に 'cheer' 固定で送る。
 */
export default function CommentSection({ workId }: { workId: string }) {
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addChip(chip: string) {
    setBody((prev) => (prev ? `${prev} ${chip}` : chip));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending || !body.trim()) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/exhibition/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workId,
          commentType: 'cheer',
          body: body.trim(),
          nickname: name.trim() || undefined,
        }),
      });
      const json = await res.json();
      if (!json?.ok) throw new Error('failed');
      setSent(true);
      setBody('');
    } catch {
      setError('送信できませんでした。少し時間をおいて、もう一度ためしてください。');
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-[#2E7D7D]/10 border border-[#2E7D7D]/40 p-4 text-center">
        <CheckCircle2 className="w-6 h-6 text-[#2E7D7D] mx-auto mb-1.5" />
        <p className="font-display text-sm text-[#2E7D7D]">届きました！ 作者さんにだけ届きます。</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="font-handwritten mt-2 text-xs text-[#2E7D7D] underline underline-offset-4"
        >
          もうひとつ書く
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2.5">
      <div className="flex flex-wrap gap-1.5">
        {QUICK_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => addChip(chip)}
            className="font-handwritten rounded-full border border-[#1F1810]/25 bg-[#FFF8EC] px-3 py-1 text-xs text-[#1F1810]/70 hover:border-[#2E7D7D] hover:text-[#2E7D7D]"
          >
            {chip}
          </button>
        ))}
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={500}
        rows={2}
        required
        placeholder="作者さんにひとこと（500文字まで）"
        className="font-body w-full rounded-xl border-2 border-[#1F1810]/20 bg-[#FFF8EC] p-3 text-sm leading-relaxed focus:border-[#2E7D7D] focus:outline-none"
      />

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={30}
          placeholder="ニックネーム（なくてもOK）"
          className="font-body flex-1 rounded-full border-2 border-[#1F1810]/20 bg-[#FFF8EC] px-4 py-2 text-xs focus:border-[#2E7D7D] focus:outline-none"
        />
        <button
          type="submit"
          disabled={sending || !body.trim()}
          className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1F1810] px-5 py-2 font-display text-sm text-[#FFF8EC] transition-colors duration-300 hover:bg-[#E04E2C] disabled:opacity-40"
        >
          <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          {sending ? 'おくっています…' : 'おくる'}
        </button>
      </div>

      {error && <p className="font-body text-xs text-[#E04E2C]">{error}</p>}

      <p className="font-body text-[11px] leading-relaxed text-[#1F1810]/50">
        ※ 本名・住所・学校名などの個人情報は書かないでね。コメントは作者さんにだけ届きます。
      </p>
    </form>
  );
}
