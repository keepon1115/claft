import Link from 'next/link';
import { NOTE_ARTICLES, SENSORS, type SensorId } from '@/lib/sensors/characters';
import { SensorChar } from '@/components/sensors/SensorChar';

export const metadata = {
  title: { absolute: 'センサーズ ゲームランド | CLAFT' },
};

type Game = {
  no: number;
  title: string;
  text: string;
  cast: SensorId[];
  href?: string;
  color: string;
};

const ALL: SensorId[] = ['pochio', 'kasso', 'photon', 'pikkari', 'oton'];

const GAMES: Game[] = [
  {
    no: 1,
    title: 'センサーズ・パズル',
    text: '5にんの とくいわざを つないで、みんなを ゴールへ。ぜんぶで 10ステージ。',
    cast: ALL,
    href: '/sensors/puzzle',
    color: '#f4511e',
  },
  {
    no: 2,
    title: 'センサーズ・ミニゲーム',
    text: 'スマホを ふったり、こえを だしたり。ほんものの センサーで あそぶ 5つの ゲーム。',
    cast: ALL,
    href: '/sensors/mini',
    color: '#00b877',
  },
  {
    no: 3,
    title: 'しれいを だそう',
    text: '「もし ぽちおが 0なら まがる」。センサーの あたいで ロボットを うごかす プログラミング。',
    cast: ALL,
    href: '/sensors/shirei',
    color: '#1565d8',
  },
  {
    no: 4,
    title: 'センサーズの いちにち',
    text: 'センサーズの まいにちを のぞく ショートアニメ。',
    cast: ['oton', 'pikkari'],
    color: '#f5a300',
  },
  {
    no: 5,
    title: 'センサーズと ふれあい',
    text: 'へやを くらくすると ねむる、てを たたくと おどる。いっしょに すごす アプリ。',
    cast: ['pochio', 'photon'],
    color: '#8b5cf6',
  },
];

const LOGO = [
  { ch: 'セ', color: '#f4511e', rot: -5 },
  { ch: 'ン', color: '#00b877', rot: 4 },
  { ch: 'サ', color: '#1565d8', rot: -3 },
  { ch: 'ー', color: '#f5a300', rot: 5 },
  { ch: 'ズ', color: '#8b5cf6', rot: -4 },
];

export default function SensorsHub() {
  return (
    <main className="sz-hub">
      <header className="sz-hero">
        <h1>
          <span className="sz-logo" aria-label="センサーズ">
            {LOGO.map((l) => (
              <span key={l.ch} style={{ background: l.color, transform: `rotate(${l.rot}deg)` }} aria-hidden>
                {l.ch}
              </span>
            ))}
          </span>
          <span className="sz-logosub">ゲームランド</span>
        </h1>
        <p className="sz-lead">
          ロボットの「センサー」が キャラクターに なった センサーズ。
          <br />
          あそびながら、センサーの はたらきが わかる。
        </p>
        <div className="sz-lineup">
          {SENSORS.map((c, i) => (
            <span key={c.id} style={{ animationDelay: `${i * -0.5}s` }}>
              <SensorChar id={c.id} size="100%" title={c.name} />
            </span>
          ))}
        </div>
      </header>

      <section aria-labelledby="sz-games">
        <h2 id="sz-games" className="sz-h2">
          ゲームを えらぶ
        </h2>
        <ol className="sz-gamelist">
          {GAMES.map((g) => {
            const body = (
              <>
                <span className="sz-gameno" style={{ background: g.color }}>
                  {g.no}
                </span>
                <span className="sz-gametext">
                  <strong>{g.title}</strong>
                  <span>{g.text}</span>
                </span>
                <span className="sz-gamecast" aria-hidden>
                  {g.cast.map((id) => (
                    <SensorChar key={id} id={id} size={30} />
                  ))}
                </span>
                <span className={`sz-gamecta ${g.href ? '' : 'soon'}`}>{g.href ? 'あそぶ →' : 'じゅんびちゅう'}</span>
              </>
            );
            return (
              <li key={g.no}>
                {g.href ? (
                  <Link href={g.href} className="sz-gamecard">
                    {body}
                  </Link>
                ) : (
                  <div className="sz-gamecard soon">{body}</div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="sz-zukan">
        <h2 id="sz-zukan" className="sz-h2">
          センサーズ ずかん
        </h2>
        <ul className="sz-zukan">
          {SENSORS.map((c) => (
            <li key={c.id} style={{ '--c': c.color, '--ink': c.ink } as React.CSSProperties}>
              <div className="sz-zukanhead">
                <SensorChar id={c.id} size={84} />
                <div>
                  <h3>{c.name}</h3>
                  <p className="sz-zukansensor">{c.sensor}</p>
                  <p className="sz-zukanability">{c.ability}</p>
                </div>
              </div>
              <p>{c.personality}</p>
              <dl>
                <div>
                  <dt>あたい</dt>
                  <dd>
                    <b>{c.range}</b>
                    <br />
                    {c.rangeNote}
                  </dd>
                </div>
                <div>
                  <dt>のうりょく</dt>
                  <dd>{c.abilityNote}</dd>
                </div>
                <div>
                  <dt>しゅっしん</dt>
                  <dd>{c.from}</dd>
                </div>
                <div>
                  <dt>あいぼう</dt>
                  <dd>
                    {c.buddy}。{c.buddyNote}
                  </dd>
                </div>
                <div>
                  <dt>まいにち</dt>
                  <dd>{c.routine}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sz-more" className="sz-more">
        <h2 id="sz-more" className="sz-h2">
          もっと しりたい
        </h2>
        <ul>
          {NOTE_ARTICLES.map((n) => (
            <li key={n.href}>
              <a href={n.href} target="_blank" rel="noopener noreferrer">
                {n.title}（note）
              </a>
            </li>
          ))}
          <li>
            <a href="https://www.keeponlearning.fun/sensors" target="_blank" rel="noopener noreferrer">
              センサーズの しょうかいページ
            </a>
          </li>
        </ul>
      </section>

      <footer className="sz-foot">
        <p>
          センサーズは、スクール生の「ロボットプログラミングを もっと しってほしい」という おもいから うまれた
          スクールプロジェクト「キャラづくり」の キャラクターです。
        </p>
        <p>
          イラスト：
          <a href="https://pukappy.base.shop/" target="_blank" rel="noopener noreferrer">
            pukappy
          </a>
          　／　
          <Link href="/">CLAFT トップへ</Link>
        </p>
      </footer>
    </main>
  );
}
