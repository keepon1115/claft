import QRCode from 'qrcode';
import { buildTimelineEvents, type StudentStory } from '@/lib/studentData';

const SITE = 'https://claft.keeponlearning.fun';

export const printCss = `
@page { size: A4 portrait; margin: 12mm; }
html, body { background: #fff !important; }
.pr-root { background: #fff; color: #2b2b2b; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.pr-sheet { position: relative; width: 186mm; height: 272.5mm; margin: 0 auto; box-sizing: border-box;
  display: flex; flex-direction: column; gap: 5mm; font-size: 16pt; line-height: 1.65; break-after: page; page-break-after: always; }
.pr-sheet:last-child { break-after: auto; page-break-after: auto; }
.pr-l { font-size: 14pt; line-height: 1.6; }
.pr-m { font-size: 12pt; line-height: 1.55; }
.pr-s { font-size: 10.5pt; line-height: 1.5; }
.pr-sheet p { margin: 0; white-space: pre-line; }
.pr-icon { position: absolute; top: 0; right: 0; width: 50mm; height: 50mm; box-sizing: border-box; border: 2px solid #34c6be; border-radius: 4mm;
  background: #fff; overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 80pt; line-height: 1; }
.pr-icon img { width: 100%; height: 100%; object-fit: cover; display: block; }
.pr-head { min-height: 50mm; padding-right: 56mm; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; gap: 2mm; }
.pr-name { font-size: 30pt; line-height: 1.25; font-weight: 800; margin: 0; }
.pr-grade { color: #777; font-size: 12pt; }
.pr-intro { font-weight: 700; }
.pr-box { flex: 1 1 auto; display: flex; flex-direction: column; justify-content: center; gap: 1mm; border: 1px solid #d9d9d9; border-left: 2mm solid #34c6be; border-radius: 3mm; padding: 3mm 4.5mm; }
.pr-label { font-weight: 800; color: #1f9a93; font-size: 11pt; line-height: 1.4; }
.pr-action-title { font-weight: 800; }
.pr-qr { display: flex; align-items: center; justify-content: flex-end; gap: 3mm; font-weight: 700; font-size: 11pt; }
.pr-qr-img svg { display: block; width: 28mm; height: 28mm; }
.pr-qr--small .pr-qr-img svg { width: 22mm; height: 22mm; }
.pr-backname { font-size: 12pt; font-weight: 800; color: #777; }
.pr-vision { display: flex; flex-direction: column; gap: 2.5mm; border: 2px solid #f0b429; background: #fff8e6; border-radius: 4mm; padding: 5mm 6mm; }
.pr-vision-main { font-size: 1.3em; line-height: 1.5; font-weight: 800; }
.pr-goal { border-top: 1.5px dotted #f0b429; padding-top: 2.5mm; }
.pr-section { font-size: 1.15em; font-weight: 800; color: #1f9a93; }
.pr-timeline { flex: 1 1 auto; display: flex; flex-direction: column; justify-content: space-evenly; gap: 2mm; list-style: none; margin: 0; padding: 0 0 0 7mm; border-left: 1.5px dashed #bbb; margin-left: 2mm; }
.pr-event { position: relative; }
.pr-event::before { content: '★'; position: absolute; left: -9.1mm; top: 0; color: #e5c56a; font-size: 12pt; line-height: 1.5; background: #fff; }
.pr-event--now::before { color: #34c6be; }
.pr-date { font-size: .8em; font-weight: 700; color: #777; }
.pr-tag { display: inline-block; margin-left: 2mm; padding: 0 2mm; border: 1px solid #34c6be; border-radius: 99px; font-size: .9em; font-weight: 500; color: #1f9a93; }
.pr-now { margin-left: 2mm; color: #1f9a93; font-weight: 800; }
.pr-event-title { font-weight: 800; }
.pr-event-desc { font-size: .88em; color: #555; }
@media screen { .pr-sheet { outline: 1px dashed #ccc; margin: 8mm auto; } }
`;

// 文字数に応じて段階的に文字サイズを変える（JSで測らず、クラスを切り替える）
function tier(n: number, limits: [number, number, number]): string {
  if (n < limits[0]) return '';
  if (n < limits[1]) return 'pr-l';
  if (n < limits[2]) return 'pr-m';
  return 'pr-s';
}

function frontSize(s: StudentStory): string {
  const n =
    s.shortIntro.length + s.likes.join('、').length + (s.character?.length ?? 0) + (s.strengths?.length ?? 0) +
    s.currentActions.reduce((a, x) => a + x.title.length + x.description.length, 0);
  return tier(n, [280, 420, 620]);
}

function backSize(s: StudentStory): string {
  const events = buildTimelineEvents(s);
  const n =
    (s.futureVision?.text.length ?? 0) * 1.5 + (s.futureVision?.subText?.length ?? 0) + (s.goalThisYear?.length ?? 0) +
    events.reduce((a, e) => a + 30 + e.title.length + (e.description?.length ?? 0), 0);
  return tier(n, [220, 380, 560]);
}

// 2.8MBあるような元画像は、印刷に足りる大きさに縮めて読む
function iconSrc(url: string): string {
  return url.includes('microcms-assets.io') ? `${url}?w=800&h=800&fit=crop` : url;
}

const qr = (text: string) => QRCode.toString(text, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' });

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="pr-box">
      <p className="pr-label">{label}</p>
      <p>{value}</p>
    </div>
  );
}

export async function PrintSheet({ student: s }: { student: StudentStory }) {
  const workSvg = s.workUrl ? await qr(s.workUrl) : null;
  const storySvg = await qr(`${SITE}/student-story/${s.slug}`);
  const events = buildTimelineEvents(s);

  return (
    <>
      {/* 表面 */}
      <section className={`pr-sheet ${frontSize(s)}`}>
        <div className="pr-icon">
          {s.iconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={iconSrc(s.iconUrl)} alt="" />
          ) : (
            <span aria-hidden="true">{s.avatarEmoji}</span>
          )}
        </div>
        <div className="pr-head">
          <h1 className="pr-name">{s.name}</h1>
          <p className="pr-grade">{s.grade}</p>
          <p className="pr-intro">{s.shortIntro}</p>
        </div>
        {s.likes.length > 0 && <Item label="好きなこと" value={s.likes.join('、')} />}
        {s.character && <Item label="自分のキャラ" value={s.character} />}
        {s.strengths && <Item label="強み" value={s.strengths} />}
        {s.currentActions.length > 0 && (
          <div className="pr-box">
            <p className="pr-label">今、挑戦していること</p>
            {s.currentActions.map((a, i) => (
              <div key={i}>
                <p className="pr-action-title">
                  {a.emoji} {a.title}
                </p>
                {a.description && <p>{a.description}</p>}
              </div>
            ))}
          </div>
        )}
        {workSvg && (
          <div className="pr-qr">
            作品を見る
            <div className="pr-qr-img" dangerouslySetInnerHTML={{ __html: workSvg }} />
          </div>
        )}
      </section>

      {/* 裏面 */}
      <section className={`pr-sheet ${backSize(s)}`}>
        <p className="pr-backname">{s.name}</p>
        {s.futureVision && (
          <div className="pr-vision">
            <p className="pr-label">なりたい姿・将来のイメージ</p>
            <p className="pr-vision-main">{s.futureVision.text}</p>
            {s.futureVision.subText && <p>{s.futureVision.subText}</p>}
            {s.goalThisYear && (
              <div className="pr-goal">
                <p className="pr-label">今年の目標</p>
                <p>{s.goalThisYear}</p>
              </div>
            )}
          </div>
        )}
        {events.length > 0 && (
          <>
            <p className="pr-section">スクールでの歩み</p>
            <ul className="pr-timeline">
              {events.map((e, i) => (
                <li key={i} className={`pr-event ${e.isCurrent ? 'pr-event--now' : ''}`}>
                  <p className="pr-date">
                    {e.date}
                    {e.category && <span className="pr-tag">{e.category}</span>}
                    {e.isCurrent && <span className="pr-now">NOW</span>}
                  </p>
                  <p className="pr-event-title">{e.title}</p>
                  {e.description && <p className="pr-event-desc">{e.description}</p>}
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="pr-qr pr-qr--small">
          ストーリーを読む
          <div className="pr-qr-img" dangerouslySetInnerHTML={{ __html: storySvg }} />
        </div>
      </section>
    </>
  );
}
