import type { Metadata } from 'next';
import Link from 'next/link';
import { LabPageHeader } from '@/components/lab/LabPageHeader';

export const metadata: Metadata = { title: 'アプリの使い方 | キープオンラボ' };

// アプリの使い方：初めての人向けの機能ガイド（ヘッダーの「?」から開く）
export default function GuidePage() {
  return (
    <>
      <LabPageHeader title="アプリの使い方" />
      <main className="lab-page-body">
        <p className="lab-lead">
          はじめまして！　このアプリは、キープオンラボに通うみなさんと保護者の方のための
          「見て・知って・動ける」アプリです。よく使う機能を順番にご紹介します。
        </p>

        <div className="lab-card">
          <h3><span aria-hidden="true">🚶</span>下の「ラボの歩き方」＝はじめの一歩</h3>
          <p>
            まず最初にのぞいてほしいボタン。好きなことから発表・イベント・キャリアへと、
            ラボでの学びがどう広がっていくかの流れ（ロードマップ）を見られます。迷ったらここから。
          </p>
        </div>

        <div className="lab-card">
          <h3><span aria-hidden="true">🟠</span>下のオレンジのボタン＝受講予約</h3>
          <p>
            いちばんよく使うボタンです。ふだんの授業の予約と、
            発表会などのイベント予約をここから行えます。
          </p>
        </div>

        <div className="lab-card">
          <h3><span aria-hidden="true">🤝</span>面談申込</h3>
          <p>
            お子さまの様子や進路のこと、気になることがあれば個別面談へ。
            希望日時を送ると、ラボから折り返しご連絡します。
          </p>
        </div>

        <div className="lab-card">
          <h3><span aria-hidden="true">💌</span>右上の手紙マーク＝アイデア箱</h3>
          <p>
            「こんなのあったらいいな」をラボに送れる場所。
            キープオンラボは、受け取るだけじゃなく<b>言う・つくる側にまわれる</b>0→1コミュニティです。
          </p>
        </div>

        <div className="lab-card">
          <h3><span aria-hidden="true">⭕</span>上の丸いボタン＝ストーリー</h3>
          <p>
            募集イベント・発表会・キャリアインタビューなど6つのカテゴリの最新の様子を、
            タップ→スワイプでさくっと見られます。最後のカードから詳しいページへ進めます。
          </p>
        </div>

        <div className="lab-card">
          <h3><span aria-hidden="true">📰</span>まんなか＝お知らせ・活動報告</h3>
          <p>
            ラボからのお知らせや活動の様子が新しい順に並びます。
            気になるカードは「くわしく見る →」からどうぞ。
          </p>
        </div>

        <div className="lab-card">
          <h3><span aria-hidden="true">🔔</span>プッシュ通知とホーム画面追加</h3>
          <p>
            新しいイベントの募集を見逃さないように、<Link href="/lab/settings" style={{ fontWeight: 700, color: 'var(--green-deep)', textDecoration: 'underline' }}>設定</Link>から
            通知をONに。スマホのホーム画面に追加すると、アプリのようにすぐ開けます。
          </p>
        </div>
      </main>
    </>
  );
}
