import { ExhibitionPrintSheet, exhibitionPrintCss } from '@/components/exhibition/ExhibitionPrintSheet';
import { fetchPrintWorks, SHEET_EDIT_URL } from '@/lib/exhibition/printWorks';

// シートの変更をすぐ反映するため、表示のたびに読み直す
export const dynamic = 'force-dynamic';

export const metadata = { title: 'なんでも展示会 印刷用（全作品）', robots: { index: false, follow: false } };

export default async function ExhibitionPrintAllPage() {
  const { works, source, sheetError } = await fetchPrintWorks();

  return (
    <div className="ex-root">
      <style dangerouslySetInnerHTML={{ __html: exhibitionPrintCss }} />
      {/* 画面だけの案内（印刷・PDFには出ない） */}
      <div className="ex-notice">
        {source === 'sheet' ? (
          <>全 {works.length} 作品。<a href={SHEET_EDIT_URL}>作品管理シート</a>の今の内容を表示しています。</>
        ) : (
          <>
            作品管理シートを直接読めなかったため、Webの作品一覧に取り込み済みの内容（全 {works.length} 作品）を表示しています。
            <br />
            理由：{sheetError}
          </>
        )}
        <br />
        印刷・PDF保存：ブラウザの印刷で、用紙「A4」・余白「既定」・「背景のグラフィック」オン。
      </div>
      {works.map((w, i) => (
        <ExhibitionPrintSheet key={i} work={w} />
      ))}
    </div>
  );
}
