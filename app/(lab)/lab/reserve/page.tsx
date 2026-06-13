import type { Metadata } from 'next';
import { LabPageHeader } from '@/components/lab/LabPageHeader';
import { EXTERNAL_LINKS } from '@/lib/lab/content';

export const metadata: Metadata = { title: '受講予約 | キープオンラボ' };

// ③ 受講予約：画像ボタン2つ → 外部リンク（仕様で確定済みURL）
export default function ReservePage() {
  return (
    <>
      <LabPageHeader title="受講予約" />
      <main className="lab-page-body">
        <p className="lab-lead">
          どちらの予約をしますか？　タップすると予約ページが開きます。
        </p>

        <a
          className="lab-bigbtn accent"
          href={EXTERNAL_LINKS.reserveLesson}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="big-emoji" aria-hidden="true">🎓</span>
          <b>受講予約</b>
          <span className="desc">
            ふだんの授業の予約はこちら。<br />
            予約サイト（select-type）が開きます
          </span>
          <span className="go">予約ページを開く →</span>
        </a>

        <a
          className="lab-bigbtn"
          href={EXTERNAL_LINKS.reserveEvent}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="big-emoji" aria-hidden="true">🎪</span>
          <b>イベント予約</b>
          <span className="desc">
            発表会・Yononakaなどのイベントは<br />
            CLAFTホームページのお知らせから
          </span>
          <span className="go">イベント一覧を見る →</span>
        </a>
      </main>
    </>
  );
}
