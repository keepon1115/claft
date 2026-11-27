import type { PrintStory } from '@/lib/studentPrintData';

// A5 縦・片面・1人1枚。大きな画像＋名前・学年・ひとこと紹介・好きなこと・自分のキャラ・強み
export const printCss = `
@page { size: A5 portrait; margin: 6mm; }
html, body { background: #fff !important; }
.pr-root { background: #fff; color: #2b2b2b; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.pr-sheet { width: 136mm; height: 197.5mm; margin: 0 auto; box-sizing: border-box; overflow: hidden;
  display: flex; flex-direction: column; gap: 3.5mm; break-after: page; page-break-after: always; }
.pr-sheet:last-child { break-after: auto; page-break-after: auto; }
.pr-sheet p { margin: 0; white-space: pre-line; }
/* 日本語を文節で折り返す（「実現す／る人」のような切れ方を防ぐ）。Chrome 119以降 */
.pr-phrase { word-break: auto-phrase; line-break: strict; }
.pr-photo { position: relative; flex: none; width: 106mm; height: 106mm; margin: 2mm auto 0; }
.pr-photo::before { content: ''; position: absolute; inset: 0; transform: translate(3mm, 3mm); background: #f0b429; border-radius: 6mm; }
.pr-photo-in { position: relative; width: 100%; height: 100%; box-sizing: border-box; border: 2.5px solid #34c6be; border-radius: 6mm;
  background: #fff; overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 150pt; line-height: 1; }
.pr-photo-in img { width: 100%; height: 100%; object-fit: cover; display: block; }
.pr-head { display: flex; align-items: baseline; justify-content: center; gap: 3mm; margin-top: 2mm; }
.pr-name { font-weight: 900; font-size: 30pt; line-height: 1.1; margin: 0; }
.pr-grade { font-size: 10pt; font-weight: 700; color: #1f9a93; border: 1.5px solid #34c6be; border-radius: 99px; padding: .3mm 3mm; white-space: nowrap; }
.pr-intro { text-align: center; text-wrap: balance; font-weight: 700; font-size: 12.5pt; line-height: 1.5;
  background: #fff8e6; border: 2px solid #f0b429; border-radius: 4mm; padding: 2mm 4mm; }
.pr-intro--s { font-size: 11.5pt; }
.pr-items { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; justify-content: space-evenly; border-top: 1.5px dotted #34c6be; }
.pr-row { display: grid; grid-template-columns: 22mm 1fr; gap: 3mm; padding: 1.8mm 0; border-bottom: 1.5px dotted #34c6be;
  font-family: var(--font-noto), sans-serif; font-size: 11pt; line-height: 1.5; }
.pr-items--s .pr-row { font-size: 10pt; line-height: 1.45; }
.pr-label { font-family: var(--font-zen), sans-serif; font-weight: 900; color: #1f9a93; font-size: 10pt; }
@media screen { .pr-sheet { outline: 1px dashed #ccc; margin: 8mm auto; } }
`;

// 印刷に足りる大きさで読む（元画像は1254px角）
function iconSrc(url: string): string {
  return url.includes('microcms-assets.io') ? `${url}?w=1254&h=1254&fit=crop` : url;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="pr-row">
      <p className="pr-label">{label}</p>
      <p className="pr-phrase">{value}</p>
    </div>
  );
}

export function PrintSheet({ student: s }: { student: PrintStory }) {
  const likes = s.likes.join('、');
  // 文章が長い人だけ、少し小さくする（JSで測らず、文字数で切り替える）
  const itemsLen = likes.length + (s.character?.length ?? 0) + (s.strengths?.length ?? 0);

  return (
    <section className="pr-sheet">
      <div className="pr-photo">
        <div className="pr-photo-in">
          {s.iconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={iconSrc(s.iconUrl)} alt="" />
          ) : (
            <span aria-hidden="true">{s.avatarEmoji}</span>
          )}
        </div>
      </div>
      <div className="pr-head">
        <h1 className="pr-name">{s.name}</h1>
        <span className="pr-grade">{s.grade}</span>
      </div>
      <p className={`pr-intro pr-phrase ${s.shortIntro.length > 44 ? 'pr-intro--s' : ''}`}>{s.shortIntro}</p>
      <div className={`pr-items ${itemsLen > 170 ? 'pr-items--s' : ''}`}>
        {likes && <Row label="好きなこと" value={likes} />}
        {s.character && <Row label="自分のキャラ" value={s.character} />}
        {s.strengths && <Row label="強み" value={s.strengths} />}
      </div>
    </section>
  );
}
