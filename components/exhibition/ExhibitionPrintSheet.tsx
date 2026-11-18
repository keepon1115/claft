import QRCode from 'qrcode';
import { EVENT_DATE, youTubeThumbnailForPrint, type PrintWork } from '@/lib/exhibition/printWorks';

// A4 縦・1作品1枚。上＝画像（動画はサムネイル）、真ん中＝作品名、下＝説明文、最下段＝QR（左）と展示会名（右）
export const exhibitionPrintCss = `
@page { size: A4 portrait; margin: 10mm; }
html, body { background: #fff !important; }
.ex-root { background: #fff; color: #1f1810; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.ex-sheet { width: 190mm; height: 276mm; margin: 0 auto; box-sizing: border-box; overflow: hidden;
  display: flex; flex-direction: column; break-after: page; page-break-after: always; }
.ex-sheet:last-child { break-after: auto; page-break-after: auto; }
.ex-media { flex: 0 0 auto; display: flex; justify-content: center; }
.ex-media img { display: block; max-width: 100%; max-height: 128mm; border-radius: 5mm; }
.ex-media--video img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
.ex-body { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; gap: 6mm; padding: 9mm 6mm 0; }
.ex-title { margin: 0; font-size: 42pt; line-height: 1.3; font-weight: 800; letter-spacing: .02em; }
.ex-title--l { font-size: 32pt; }
.ex-desc { margin: 0; font-size: 26pt; line-height: 1.7; white-space: pre-line; }
.ex-desc--l { font-size: 22pt; }
.ex-desc--m { font-size: 19pt; }
.ex-desc--s { font-size: 16pt; line-height: 1.6; }
.ex-foot { flex: 0 0 auto; display: flex; align-items: flex-end; justify-content: space-between; gap: 6mm;
  margin-top: 4mm; padding: 5mm 2mm 0; border-top: .6mm solid #e6ded2; }
.ex-qr { display: flex; align-items: center; gap: 5mm; }
.ex-qr-img { background: #fff; border: 1.2mm solid #c8102e; border-radius: 3mm; padding: 2.5mm; }
.ex-qr-img svg { display: block; width: 34mm; height: 34mm; }
.ex-qr-text { display: flex; flex-direction: column; gap: 2mm; }
.ex-qr-label { align-self: flex-start; background: #c8102e; color: #fff; font-weight: 800; font-size: 22pt; line-height: 1.2;
  padding: 2.5mm 6mm; border-radius: 3mm; }
.ex-qr-hint { font-size: 12pt; color: #6b6259; font-weight: 700; }
.ex-event { margin: 0 0 0 auto; text-align: right; font-weight: 800; color: #6b6259; line-height: 1.25; }
.ex-event-no { display: block; font-size: 30pt; line-height: 1.1; color: #c8102e; letter-spacing: .04em; margin-bottom: 1.5mm; }
.ex-event-date { display: block; font-size: 14pt; letter-spacing: .08em; }
.ex-event-name { display: block; font-size: 20pt; color: #1f1810; }
.ex-event-logo { display: block; width: 46mm; height: auto; margin: 2.5mm 0 0 auto; }
.ex-notice { max-width: 190mm; margin: 6mm auto; padding: 4mm 5mm; border: 1px solid #f0b429; border-radius: 3mm; background: #fff8e6; font-size: 10.5pt; line-height: 1.7; }
@media screen { .ex-sheet { outline: 1px dashed #ccc; margin: 8mm auto; } }
@media print { .ex-notice { display: none; } }
`;

// 元画像が大きすぎると PDF が重くなるので、印刷に足りる大きさに縮めて読む
function imageSrc(url: string): string {
  return url.includes('microcms-assets.io') && !url.includes('?') ? `${url}?w=1600` : url;
}

export async function ExhibitionPrintSheet({ work, no }: { work: PrintWork; no: number }) {
  const src = work.imageUrl
    ? imageSrc(work.imageUrl)
    : work.youtubeId
      ? await youTubeThumbnailForPrint(work.youtubeId)
      : null;
  const qrSvg = work.qrUrl
    ? await QRCode.toString(work.qrUrl, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' })
    : null;

  const titleSize = work.title.length > 12 ? 'ex-title--l' : '';
  const n = work.description.length;
  const descSize = n > 170 ? 'ex-desc--s' : n > 110 ? 'ex-desc--m' : n > 65 ? 'ex-desc--l' : '';

  return (
    <section className="ex-sheet">
      <div className={`ex-media ${work.imageUrl ? '' : 'ex-media--video'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {src && <img src={src} alt="" />}
      </div>
      <div className="ex-body">
        <h1 className={`ex-title ${titleSize}`}>{work.title}</h1>
        {work.description && <p className={`ex-desc ${descSize}`}>{work.description}</p>}
      </div>
      <footer className="ex-foot">
        {qrSvg && (
          <div className="ex-qr">
            <div className="ex-qr-img" dangerouslySetInnerHTML={{ __html: qrSvg }} />
            <div className="ex-qr-text">
              <span className="ex-qr-label">{work.qrLabel}</span>
              <span className="ex-qr-hint">スマホのカメラで読み取ってね</span>
            </div>
          </div>
        )}
        <p className="ex-event">
          <span className="ex-event-no">No.{String(no).padStart(2, '0')}</span>
          <span className="ex-event-date">{EVENT_DATE}</span>
          <span className="ex-event-name">なんでも展示会</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ex-event-logo" src="/assets/images/keepon-logo.png" alt="Keepon キープオン" />
        </p>
      </footer>
    </section>
  );
}
