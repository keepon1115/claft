import QRCode from 'qrcode';
import { youTubeThumbnailForPrint, type PrintWork } from '@/lib/exhibition/printWorks';

// A4 縦・1作品1枚。上＝画像（動画はサムネイル）＋QR、真ん中＝作品名、下＝説明文
export const exhibitionPrintCss = `
@page { size: A4 portrait; margin: 10mm; }
html, body { background: #fff !important; }
.ex-root { background: #fff; color: #1f1810; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.ex-sheet { width: 190mm; height: 276mm; margin: 0 auto; box-sizing: border-box; overflow: hidden;
  display: flex; flex-direction: column; break-after: page; page-break-after: always; }
.ex-sheet:last-child { break-after: auto; page-break-after: auto; }
.ex-media { position: relative; flex: 0 0 auto; display: flex; justify-content: center; border-radius: 5mm; }
.ex-media img { display: block; max-width: 100%; max-height: 130mm; border-radius: 5mm; }
.ex-media--video img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
.ex-qr { position: absolute; left: 4mm; bottom: -14mm; display: flex; align-items: center; }
.ex-qr-img { background: #fff; border: 1.2mm solid #c8102e; border-radius: 3mm; padding: 2.5mm; }
.ex-qr-img svg { display: block; width: 36mm; height: 36mm; }
.ex-qr-label { background: #c8102e; color: #fff; font-weight: 800; font-size: 22pt; line-height: 1.2;
  padding: 3mm 6mm 3mm 5mm; border-radius: 0 4mm 4mm 0; }
.ex-body { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; gap: 8mm; padding: 12mm 6mm 0; }
.ex-body--qr { padding-top: 24mm; }
.ex-title { margin: 0; font-size: 42pt; line-height: 1.3; font-weight: 800; letter-spacing: .02em; }
.ex-title--l { font-size: 32pt; }
.ex-desc { margin: 0; font-size: 25pt; line-height: 1.7; white-space: pre-line; }
.ex-desc--l { font-size: 21pt; }
.ex-desc--m { font-size: 18pt; }
.ex-desc--s { font-size: 15pt; line-height: 1.6; }
.ex-notice { max-width: 190mm; margin: 6mm auto; padding: 4mm 5mm; border: 1px solid #f0b429; border-radius: 3mm; background: #fff8e6; font-size: 10.5pt; line-height: 1.7; }
@media screen { .ex-sheet { outline: 1px dashed #ccc; margin: 8mm auto; } }
@media print { .ex-notice { display: none; } }
`;

// 元画像が大きすぎると PDF が重くなるので、印刷に足りる大きさに縮めて読む
function imageSrc(url: string): string {
  return url.includes('microcms-assets.io') && !url.includes('?') ? `${url}?w=1600` : url;
}

export async function ExhibitionPrintSheet({ work }: { work: PrintWork }) {
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
        {qrSvg && (
          <div className="ex-qr">
            <div className="ex-qr-img" dangerouslySetInnerHTML={{ __html: qrSvg }} />
            <div className="ex-qr-label">{work.qrLabel}</div>
          </div>
        )}
      </div>
      <div className={`ex-body ${qrSvg ? 'ex-body--qr' : ''}`}>
        <h1 className={`ex-title ${titleSize}`}>{work.title}</h1>
        {work.description && <p className={`ex-desc ${descSize}`}>{work.description}</p>}
      </div>
    </section>
  );
}
