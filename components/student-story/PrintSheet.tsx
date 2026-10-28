import QRCode from 'qrcode';
import type { StudentStory } from '@/lib/studentData';

const SITE = 'https://claft.keeponlearning.fun';

export const printCss = `
@page { size: A4 portrait; margin: 12mm; }
.pr-root { background: #fff; color: #2b2b2b; }
.pr-sheet { width: 186mm; height: 273mm; margin: 0 auto; padding: 0; box-sizing: border-box; overflow: hidden;
  display: flex; flex-direction: column; gap: 3.5mm; font-size: 11pt; line-height: 1.6; break-after: page; page-break-after: always; }
.pr-sheet:last-child { break-after: auto; page-break-after: auto; }
.pr-sheet.pr-m { font-size: 10pt; line-height: 1.5; }
.pr-sheet.pr-s { font-size: 9pt; line-height: 1.45; }
.pr-sheet.pr-xs { font-size: 8pt; line-height: 1.4; }
.pr-head { display: flex; align-items: center; gap: 4mm; }
.pr-emoji { font-size: 30pt; width: 18mm; height: 18mm; border: 1.5px solid #34c6be; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.pr-name { font-size: 1.7em; font-weight: 800; margin: 0; }
.pr-grade { color: #777; margin: 0; }
.pr-quote { font-size: 1.35em; font-weight: 700; margin: 0; }
.pr-box { border: 1px solid #ddd; border-radius: 3mm; padding: 2.5mm 3.5mm; }
.pr-label { font-weight: 800; color: #1f9a93; font-size: .85em; margin: 0 0 .5mm; }
.pr-box p { margin: 0; white-space: pre-line; }
.pr-later { border: 2px solid #f0b429; background: #fff8e6; }
.pr-qrs { margin-top: auto; display: flex; gap: 8mm; justify-content: center; align-items: flex-end; }
.pr-qr { text-align: center; font-weight: 700; font-size: .9em; }
.pr-qr svg { width: 30mm; height: 30mm; display: block; margin: 0 auto 1mm; }
@media screen { .pr-sheet { border: 1px dashed #ccc; margin: 8mm auto; padding: 0; } .pr-root { padding: 8mm 0; background: #eee; } }
@media print { .pr-sheet { margin: 0 auto; border: 0; } .pr-root { padding: 0; background: #fff; } }
`;

// 文字数に応じて段階的に文字サイズを下げる（JSで測らず、クラスを切り替える）
function sizeClass(s: StudentStory): string {
  const n =
    (s.quote?.length ?? 0) + s.shortIntro.length + s.likes.join('、').length +
    (s.laterConnection?.length ?? 0) + (s.visitorQuestion?.length ?? 0) +
    s.currentActions.reduce((a, x) => a + x.title.length + x.description.length, 0);
  if (n < 380) return '';
  if (n < 560) return 'pr-m';
  if (n < 760) return 'pr-s';
  return 'pr-xs';
}

const qr = (text: string) => QRCode.toString(text, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' });

export async function PrintSheet({ student: s }: { student: StudentStory }) {
  const storySvg = await qr(`${SITE}/student-story/${s.slug}`);
  const videoSvg = s.exhibitVideoUrl ? await qr(s.exhibitVideoUrl) : null;

  return (
    <section className={`pr-sheet ${sizeClass(s)}`}>
      <div className="pr-head">
        <div className="pr-emoji">{s.avatarEmoji}</div>
        <div>
          <h1 className="pr-name">{s.name}</h1>
          <p className="pr-grade">{s.grade}</p>
        </div>
      </div>
      {s.quote && <p className="pr-quote">「{s.quote}」</p>}
      <div className="pr-box">
        <p>{s.shortIntro}</p>
      </div>
      {s.likes.length > 0 && (
        <div className="pr-box">
          <p className="pr-label">好きなこと</p>
          <p>{s.likes.join('、')}</p>
        </div>
      )}
      {s.currentActions.length > 0 && (
        <div className="pr-box">
          <p className="pr-label">今、挑戦していること</p>
          {s.currentActions.map((a, i) => (
            <p key={i}>
              {a.emoji} <b>{a.title}</b>
              {'\n'}
              {a.description}
            </p>
          ))}
        </div>
      )}
      {s.laterConnection && (
        <div className="pr-box pr-later">
          <p className="pr-label">後からつながったこと</p>
          <p>{s.laterConnection}</p>
        </div>
      )}
      {s.visitorQuestion && (
        <div className="pr-box">
          <p className="pr-label">{s.name}から、あなたへの質問</p>
          <p>{s.visitorQuestion}</p>
        </div>
      )}
      <div className="pr-qrs">
        <div className="pr-qr">
          <div dangerouslySetInnerHTML={{ __html: storySvg }} />
          ストーリーを読む
        </div>
        {videoSvg && (
          <div className="pr-qr">
            <div dangerouslySetInnerHTML={{ __html: videoSvg }} />
            発表を見る
          </div>
        )}
      </div>
    </section>
  );
}
