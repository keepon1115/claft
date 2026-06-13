'use client';

import { useState } from 'react';
import { MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import type { Comment, CommentType } from '@/lib/exhibition/types';
import { COMMENT_TYPES, COMMENT_TYPE_META } from '@/lib/exhibition/types';

const TYPE_COLORS: Record<CommentType, string> = {
  cheer: '#E04E2C',
  review: '#2E7D7D',
  question: '#F2B544',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

/**
 * コメント投稿フォーム＋公開済みコメント一覧。
 * 送信後は「届きました／確認後に公開されます」を出すだけで、
 * その場でリストには追加しない（公開はAI承認 or 運営承認後）。
 */
export default function CommentSection({
  workId,
  initialComments,
}: {
  workId: string;
  initialComments: Comment[];
}) {
  const [type, setType] = useState<CommentType>('cheer');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          commentType: type,
          body: body.trim(),
          displayName: name.trim() || undefined,
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

  return (
    <div className="space-y-10">
      {/* ----------------------- 投稿フォーム ----------------------- */}
      <div className="relative rounded-[28px] border-2 border-[#1F1810] bg-white p-6 sm:p-8 shadow-[6px_6px_0_0_#1F1810]">
        <span className="absolute -top-3 left-8 w-16 h-6 bg-[#F2B544]/80 rotate-[-3deg] shadow-sm rounded-[2px]" />
        <h3 className="font-display text-xl sm:text-2xl mb-5 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-[#E04E2C]" />
          作者にことばを届けよう
        </h3>

        {sent ? (
          <div className="rounded-2xl bg-[#2E7D7D]/10 border border-[#2E7D7D]/40 p-6 text-center">
            <CheckCircle2 className="w-10 h-10 text-[#2E7D7D] mx-auto mb-3" />
            <p className="font-display text-lg text-[#2E7D7D]">届きました！</p>
            <p className="font-body text-sm text-[#1F1810]/70 mt-2 leading-relaxed">
              コメントは確認後に公開されます。
              <br />
              作者に届くのを楽しみにしていてね。
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="font-handwritten mt-4 text-sm text-[#2E7D7D] underline underline-offset-4"
            >
              もうひとつ書く
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            {/* 種別タブ */}
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="コメントの種類">
              {COMMENT_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={type === t}
                  onClick={() => setType(t)}
                  className={`font-display rounded-full border-2 px-5 py-2 text-sm transition-all ${
                    type === t
                      ? 'border-[#1F1810] text-[#FFF8EC] shadow-[2px_2px_0_0_#1F1810]'
                      : 'border-[#1F1810]/30 bg-white text-[#1F1810]/60 hover:border-[#1F1810]'
                  }`}
                  style={type === t ? { backgroundColor: TYPE_COLORS[t] } : undefined}
                >
                  {COMMENT_TYPE_META[t].label}
                </button>
              ))}
            </div>

            {/* 書きやすくする「問い」 */}
            <p className="font-handwritten text-base text-[#2E7D7D]">
              {COMMENT_TYPE_META[type].prompt}
            </p>

            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={500}
              rows={4}
              required
              placeholder="ここに書いてね（500文字まで）"
              className="font-body w-full rounded-2xl border-2 border-[#1F1810]/20 bg-[#FFF8EC] p-4 text-base leading-relaxed focus:border-[#2E7D7D] focus:outline-none"
            />

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                placeholder="ニックネーム（なくてもOK）"
                className="font-body flex-1 rounded-full border-2 border-[#1F1810]/20 bg-[#FFF8EC] px-5 py-3 text-sm focus:border-[#2E7D7D] focus:outline-none"
              />
              <button
                type="submit"
                disabled={sending || !body.trim()}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1F1810] px-7 py-3 font-display text-[#FFF8EC] transition-colors duration-300 hover:bg-[#E04E2C] disabled:opacity-40"
              >
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                {sending ? 'おくっています…' : 'おくる'}
              </button>
            </div>

            {error && <p className="font-body text-sm text-[#E04E2C]">{error}</p>}

            <p className="font-body text-xs leading-relaxed text-[#1F1810]/50">
              ※ 本名・住所・学校名などの個人情報は書かないでね。コメントは確認のうえで公開されます。
            </p>
          </form>
        )}
      </div>

      {/* ----------------------- 公開済みコメント ----------------------- */}
      <div className="space-y-5">
        <p className="font-handwritten text-[#1F1810]/60">
          とどいたことば（{initialComments.length}件）
        </p>
        {initialComments.length === 0 && (
          <p className="font-body rounded-2xl border-2 border-dashed border-[#1F1810]/20 p-6 text-center text-sm text-[#1F1810]/50">
            まだコメントはありません。さいしょのひとことを届けてみよう。
          </p>
        )}
        {initialComments.map((c) => (
          <article
            key={c.id}
            className="relative rounded-[20px] bg-white p-5 sm:p-6 shadow-[0_12px_30px_-18px_rgba(31,24,16,0.4)]"
          >
            <header className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className="font-display rounded-full px-3 py-0.5 text-[11px] text-[#FFF8EC]"
                style={{ backgroundColor: TYPE_COLORS[c.comment_type] }}
              >
                {COMMENT_TYPE_META[c.comment_type].label}
              </span>
              <span className="font-handwritten text-sm text-[#1F1810]/70">
                {c.display_name || 'ななしさん'}
              </span>
              <time className="font-body text-xs text-[#1F1810]/40">{formatDate(c.created_at)}</time>
            </header>
            <p className="font-body whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-[#1F1810]/85">
              {c.body}
            </p>

            {/* 作者の返信（対話として並ぶ） */}
            {(c.author_replies ?? []).map((r) => (
              <div
                key={r.id}
                className="mt-4 ml-4 sm:ml-8 rounded-[16px] border-l-4 border-[#2E7D7D] bg-[#2E7D7D]/8 p-4"
                style={{ backgroundColor: 'rgba(46,125,125,0.08)' }}
              >
                <p className="font-handwritten mb-1 text-xs text-[#2E7D7D]">作者より</p>
                <p className="font-body whitespace-pre-wrap text-sm leading-relaxed text-[#1F1810]/85">
                  {r.body}
                </p>
              </div>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}
