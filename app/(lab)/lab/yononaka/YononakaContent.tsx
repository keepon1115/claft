import Link from 'next/link';
import { CHOKOTTO_TOPICS, YONONAKA_LINKS } from '@/lib/lab/yononaka';

function VideoLink({ id, href, label }: { id: string; href: string; label: string }) {
  return (
    <a className="yn-video" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
      <span className="yn-video-play" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
      </span>
    </a>
  );
}

export function YononakaContent() {
  const [latest, ...past] = CHOKOTTO_TOPICS;

  return (
    <main className="lab-page-body yn-page">
      <header className="yn-hero">
        <span className="yn-eyebrow">ちょこっとYononaka</span>
        <p>Yononakaのちょこっとバージョンです！</p>
      </header>

      {/* 今週のお題（主役） */}
      <section className="yn-topic" aria-labelledby="yn-topic-h">
        <p className="yn-topic-label" id="yn-topic-h">
          <span className="yn-dot" aria-hidden="true" />
          今週のお題 <b>{latest.no}</b>
        </p>
        <p className="yn-topic-title">{latest.title}</p>
        <ul className="yn-tags">
          <li>約1分</li>
          <li>ひとことでOK</li>
          <li>正解なし</li>
        </ul>
        <a className="yn-cta" href={latest.formUrl} target="_blank" rel="noopener noreferrer">
          ひとこと答える
          <span aria-hidden="true"> →</span>
        </a>
      </section>

      {past.length > 0 && (
        <>
          <h3 className="yn-h3">これまでのお題</h3>
          <ul className="yn-past">
            {past.map((t) => (
              <li key={t.no}>
                <a href={t.formUrl} target="_blank" rel="noopener noreferrer">
                  <span className="yn-past-no">{t.no}</span>
                  <span className="yn-past-title">{t.title}</span>
                  <span className="yn-past-arrow" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Yononakaって？ */}
      <h3 className="yn-h3">Yononakaって、なに？</h3>
      <section className="yn-card">
        <p>
          スクールで毎週出てくるワード「Yononaka」。世の中の身近なことをテーマに、正解がひとつでないお題へ
          「自分はこう思う！」を参加者同士で共有しながら、理解を深めるアクティブラーニングです。
          毎月1回以上、オンラインで開催しています。
        </p>
        <VideoLink id={YONONAKA_LINKS.introVideoId} href={YONONAKA_LINKS.introVideo} label="Yononakaの紹介動画を見る" />
        <p className="yn-note">▶ 授業の様子がわかる動画です</p>
      </section>

      {/* 源流 */}
      <h3 className="yn-h3">元になった授業「よのなか科」</h3>
      <section className="yn-card">
        <p>
          つくったのは藤原和博さん。リクルートで営業とマネジメントを25年経験したのち、2003年に東京・杉並区の和田中学校で、
          都内の義務教育では初の民間人校長になった方です。
        </p>
        <p>
          正解をひとつ覚えるのではなく、生徒同士が意見を持ち寄って、自分が納得できる答えを自分でつくっていく。
          「アクティブラーニング」という言葉が広まるずっと前から、公立の教室で実践されてきた手法です。
        </p>
        <VideoLink id={YONONAKA_LINKS.fujiwaraVideoId} href={YONONAKA_LINKS.fujiwaraVideo} label="藤原和博さんの授業動画を見る" />
        <p className="yn-note">
          370万回以上再生。おすすめは前半の30分ほど。「正解を早く正確に出す力」と「正解のない場所で、自分も相手も納得できる答えを紡ぐ力」は別ものだという話です。
        </p>
        <a className="yn-link" href={YONONAKA_LINKS.yononakaNet} target="_blank" rel="noopener noreferrer">
        藤原和博さんの公式HPはこちら →
        </a>
      </section>

      {/* 締めの問い */}
      <blockquote className="yn-quote">
        AIに聞けば「正解っぽいもの」が数秒で返ってくる時代。<br />
        そこに<b>自分のならではの考え</b>をどう重ねますか？
      </blockquote>
      <p className="yn-closing">
        自分が思っていること、感じていることを、そのまま外に出してみる。その習慣がつく場所が、Yononakaです。
      </p>

      {/* 本編申込 */}
      <section className="yn-card yn-entry">
        <h3>Yononaka本編に参加してみる</h3>
        <Link className="yn-cta" href={YONONAKA_LINKS.entry}>
          申込はこちら <span aria-hidden="true">→</span>
        </Link>
        <span className="yn-anchor" aria-hidden="true" />
      </section>
    </main>
  );
}
