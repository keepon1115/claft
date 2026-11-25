'use client';

import { useEffect, useState, useTransition } from 'react';
import type { StoryCard, StoryCategory } from '@/lib/lab/stories.data';
import { publishLabStories } from './actions';

type CardDraft = Omit<StoryCard, 'id'> & { id?: string; draftKey: string };
type DraftField = Exclude<keyof StoryCard, 'id' | 'theme'>;

const fieldClass = 'mt-1 min-h-11 w-full rounded-lg border border-black/25 bg-white px-3 py-2 text-base focus:border-[var(--brand-deep)] focus:outline focus:outline-2 focus:outline-[var(--brand)]';
const buttonClass = 'inline-flex min-h-11 items-center justify-center rounded-lg border border-black/20 bg-white px-3 text-sm font-bold hover:bg-black/5 disabled:opacity-40';
const publishClass = 'inline-flex min-h-11 items-center rounded-lg bg-[var(--brand)] px-5 text-sm font-bold hover:brightness-95 disabled:opacity-50';
const themeLabels = { navy: '紺', orange: 'オレンジ', green: '緑' };
const themeBackground = { navy: 'bg-[#1b2743]', orange: 'bg-[#96411d]', green: 'bg-[#236251]' };

function makeDrafts(cards: StoryCard[]): CardDraft[] {
  return cards.map((card) => ({ ...card, draftKey: card.id }));
}

function cardName(card: CardDraft) {
  const fileName = (card.imageUrl || card.videoUrl)?.split(/[?#]/)[0].split('/').at(-1);
  return card.title || card.date || fileName || '新しいカード';
}

function CardField({ card, field, label, onChange, required = false, type = 'text' }: {
  card: CardDraft;
  field: DraftField;
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: 'text' | 'date' | 'url';
}) {
  return <label className="block text-sm font-bold">
    {label}
    <input className={`${fieldClass} font-normal`} value={card[field] ?? ''} type={type}
      required={required} onChange={(event) => onChange(event.target.value)} />
  </label>;
}

export function StoryEditor({ categories, revision }: { categories: StoryCategory[]; revision: number }) {
  const [published, setPublished] = useState(categories);
  const [version, setVersion] = useState(revision);
  const [slug, setSlug] = useState(categories[0].slug);
  const category = published.find((item) => item.slug === slug)!;
  const [drafts, setDrafts] = useState(() => makeDrafts(categories[0].cards));
  const [expanded, setExpanded] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ error?: string; message?: string }>({});
  const [pending, startTransition] = useTransition();
  const cards = drafts.map(({ draftKey: _key, ...card }) => card);
  const dirty = JSON.stringify(cards) !== JSON.stringify(category.cards);
  const removedCount = category.cards.filter(({ id }) => !drafts.some((draft) => draft.id === id)).length;

  useEffect(() => {
    if (!dirty) return;
    function preventExit(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = '';
    }
    window.addEventListener('beforeunload', preventExit);
    return () => window.removeEventListener('beforeunload', preventExit);
  }, [dirty]);

  function changeCategory(value: string) {
    if (dirty && !window.confirm('未公開の変更を取り消して、カテゴリを切り替えますか？')) return;
    setSlug(value);
    setDrafts(makeDrafts(published.find((item) => item.slug === value)!.cards));
    setExpanded(null);
    setNotice({});
  }

  function addCard() {
    const draftKey = crypto.randomUUID();
    const date = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo', dateStyle: 'short' }).format(new Date());
    setDrafts([{ draftKey, date, emoji: category.cards[0]?.emoji ?? category.emoji, theme: 'navy', title: '', text: '' }, ...drafts]);
    setExpanded(draftKey);
  }

  function updateCard(key: string, change: Partial<CardDraft>) {
    setDrafts(drafts.map((card) => card.draftKey === key ? { ...card, ...change } : card));
  }

  function moveCard(index: number, direction: -1 | 1) {
    const reordered = [...drafts];
    [reordered[index], reordered[index + direction]] = [reordered[index + direction], reordered[index]];
    setDrafts(reordered);
  }

  function publish(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (removedCount > 0 && !window.confirm(`${removedCount}枚を公開ページから外します。この内容で公開しますか？`)) return;
    setNotice({});
    startTransition(async () => {
      try {
        const result = await publishLabStories(version, slug, cards);
        if ('error' in result) {
          setNotice({ error: result.error });
          return;
        }
        setPublished(published.map((item) => item.slug === slug ? { ...item, cards: result.cards } : item));
        setVersion(result.revision);
        setDrafts(makeDrafts(result.cards));
        setExpanded(null);
        setNotice({ message: '公開しました。' });
      } catch {
        setNotice({ error: '通信が中断しました。「ラボで確認」から掲載内容を確認してください。' });
      }
    });
  }

  return (
    <form onSubmit={publish}>
      <fieldset disabled={pending} className="min-w-0">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <label className="min-w-48 text-sm font-bold">
            カテゴリ
            <select className={fieldClass} value={slug} onChange={(event) => changeCategory(event.target.value)}>
              {published.map((item) => <option key={item.slug} value={item.slug}>{item.emoji} {item.label.replaceAll('\n', '')}</option>)}
            </select>
          </label>
          <button type="button" onClick={addCard} className={buttonClass} disabled={drafts.length >= 60}>＋ カードを追加</button>
        </div>

        <h2 className="mb-2 font-bold">掲載順</h2>
        {!drafts.length && <p className="rounded-xl border border-dashed border-black/30 bg-white p-5 text-sm">カードを追加すると、このカテゴリを掲載できます。</p>}
        <ol className="space-y-2">
          {drafts.map((card, index) => (
            <li key={card.draftKey} className="overflow-hidden rounded-xl border border-black/20 bg-white">
              <div className="flex flex-wrap items-center gap-3 p-3 sm:flex-nowrap">
                <span aria-label={`${index + 1}枚目`} className="w-6 shrink-0 text-center text-sm tabular-nums">{index + 1}</span>
                <div className={`relative flex h-[4.5rem] w-11 shrink-0 items-center justify-center overflow-hidden rounded-md text-lg ${themeBackground[card.theme]}`}>
                  <span aria-hidden="true">{card.emoji}</span>
                  {card.imageUrl?.startsWith('https://') && <img src={card.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-contain" />}
                </div>
                <div className="min-w-0 flex-1 break-all">
                  <p className="font-bold">{cardName(card)}</p>
                  {card.linkLabel && <p className="text-sm text-black/70">{card.linkLabel}</p>}
                </div>
                <div className="ml-auto flex flex-wrap gap-2">
                  <button type="button" className={buttonClass} onClick={() => moveCard(index, -1)} disabled={index === 0} aria-label={`${index + 1}枚目を上に移動`}>↑</button>
                  <button type="button" className={buttonClass} onClick={() => moveCard(index, 1)} disabled={index === drafts.length - 1} aria-label={`${index + 1}枚目を下に移動`}>↓</button>
                  <button type="button" className={buttonClass} aria-expanded={expanded === card.draftKey} onClick={() => setExpanded(expanded === card.draftKey ? null : card.draftKey)}>
                    {expanded === card.draftKey ? '閉じる' : '編集'}
                  </button>
                </div>
              </div>

              {/* フォームに値を残し、閉じたカードもサーバー側で検証する。 */}
              {expanded === card.draftKey && <div className="space-y-4 border-t border-black/15 bg-[#FFFCF6] p-4 sm:p-5">
                <div className="grid gap-3 sm:grid-cols-[11rem_minmax(0,1fr)]">
                  <CardField card={card} field="date" label="日付" type="date" required={!card.id} onChange={(date) => updateCard(card.draftKey, { date: date || undefined })} />
                  <CardField card={card} field="imageUrl" label="画像URL" type="url" onChange={(imageUrl) => updateCard(card.draftKey, { imageUrl: imageUrl.trim() || undefined })} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <CardField card={card} field="linkUrl" label="ボタンのリンク（任意）" type="url" onChange={(linkUrl) => updateCard(card.draftKey, { linkUrl: linkUrl.trim() || undefined })} />
                  <CardField card={card} field="linkLabel" label="ボタンの文言（任意）" onChange={(linkLabel) => updateCard(card.draftKey, { linkLabel: linkLabel || undefined })} />
                </div>
                <details>
                  <summary className="min-h-11 cursor-pointer py-2 text-sm font-bold">文章・動画・背景色</summary>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <CardField card={card} field="title" label="タイトル" onChange={(title) => updateCard(card.draftKey, { title })} />
                    <CardField card={card} field="videoUrl" label="動画URL" onChange={(videoUrl) => updateCard(card.draftKey, { videoUrl: videoUrl.trim() || undefined })} />
                    <label className="block text-sm font-bold sm:col-span-2">本文
                      <textarea value={card.text} rows={3} className={`${fieldClass} font-normal`} onChange={(event) => updateCard(card.draftKey, { text: event.target.value })} />
                    </label>
                    <label className="block text-sm font-bold">背景色
                      <select className={fieldClass} value={card.theme} onChange={(event) => updateCard(card.draftKey, { theme: event.target.value as StoryCard['theme'] })}>
                        {Object.entries(themeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                      </select>
                    </label>
                    <CardField card={card} field="emoji" label="絵文字" onChange={(emoji) => updateCard(card.draftKey, { emoji })} />
                  </div>
                </details>
                <button type="button" className="min-h-11 text-sm font-bold text-[#902a14] underline underline-offset-4" onClick={() => {
                  setDrafts(drafts.filter((item) => item.draftKey !== card.draftKey));
                  setExpanded(null);
                }}>このカードを削除</button>
              </div>}
            </li>
          ))}
        </ol>

        <div className="sticky bottom-0 z-10 mt-6 flex flex-wrap items-center gap-3 border-t border-black/20 bg-[#FFF8EC] py-3">
          <button type="submit" className={publishClass} disabled={!dirty || pending}>{pending ? '公開中…' : '公開する'}</button>
          {dirty && <button type="button" className={buttonClass} onClick={() => {
            setDrafts(makeDrafts(category.cards));
            setExpanded(null);
            setNotice({});
          }}>変更を取り消す</button>}
          {dirty && !pending && <p className="text-sm">未公開の変更があります{removedCount ? `（削除${removedCount}枚）` : ''}</p>}
          {notice.error && <p role="alert" className="w-full text-sm font-bold text-[#902a14]">{notice.error}</p>}
          {notice.message && !dirty && <p role="status" className="text-sm font-bold">{notice.message}</p>}
        </div>
      </fieldset>
    </form>
  );
}
