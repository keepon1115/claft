'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SENSOR_BY_ID, type SensorId } from '@/lib/sensors/characters';
import { GameHeader, Stars } from './GameHeader';
import { SensorChar, type Mood } from './SensorChar';
import { useProgress } from './useProgress';

// スマホの ほんものの センサーで あそぶ ミニゲーム集。
// センサーが つかえない たんまつ（PC・きょか しなかった とき）でも、ボタンや スライダーで あそべる。

// ---- かんどの ちょうせい（じっきで ためして かえる ところ） ----
const SHAKE_GAIN = 1.5; // ふった つよさ → かっそーの あたい
const SHAKE_DECAY = 2.5; // あたいが さがる はやさ（1びょう あたり）
const TAP_BOOST = 16; // ボタン・スペースキー 1かいで ふえる あたい（ふるより すこし よわめ）
const RUN_SPEED = 0.17; // あたい 1 あたりの はやさ（m/びょう）
const CHEETAH_SPEED = 9; // チーターの はやさ（m/びょう）
const MIC_FLOOR_DB = -60; // これより しずかなら 0
const MIC_RANGE_DB = 50; // ここから 50dB で あたい 50

type Finish = (score: number) => void;

// ---------- センサー入力 ----------

type InputState = 'idle' | 'on' | 'manual';

/** マイクの おおきさ（0〜50）か、カメラの あかるさ（0〜100）を よむ */
function useLevelInput(kind: 'mic' | 'cam') {
  const value = useRef(0);
  const [state, setState] = useState<InputState>('idle');
  const stopRef = useRef<() => void>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = useCallback(async () => {
    try {
      if (kind === 'mic') {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new Ctx();
        await ctx.resume();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 1024;
        ctx.createMediaStreamSource(stream).connect(analyser);
        const buf = new Float32Array(analyser.fftSize);
        const timer = setInterval(() => {
          analyser.getFloatTimeDomainData(buf);
          let sum = 0;
          for (const v of buf) sum += v * v;
          const db = 20 * Math.log10(Math.sqrt(sum / buf.length) || 1e-6);
          const target = Math.max(0, Math.min(50, ((db - MIC_FLOOR_DB) / MIC_RANGE_DB) * 50));
          value.current += (target - value.current) * 0.4;
        }, 50);
        stopRef.current = () => {
          clearInterval(timer);
          stream.getTracks().forEach((t) => t.stop());
          void ctx.close();
        };
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: 160, height: 120 } });
        const video = videoRef.current ?? document.createElement('video');
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        await video.play();
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 12;
        const g = canvas.getContext('2d', { willReadFrequently: true });
        const timer = setInterval(() => {
          if (!g || video.readyState < 2) return;
          g.drawImage(video, 0, 0, 16, 12);
          const d = g.getImageData(0, 0, 16, 12).data;
          let sum = 0;
          for (let k = 0; k < d.length; k += 4) sum += 0.299 * d[k] + 0.587 * d[k + 1] + 0.114 * d[k + 2];
          const target = (sum / (d.length / 4) / 255) * 100;
          value.current += (target - value.current) * 0.5;
        }, 80);
        stopRef.current = () => {
          clearInterval(timer);
          stream.getTracks().forEach((t) => t.stop());
        };
      }
      setState('on');
    } catch {
      setState('manual');
    }
  }, [kind]);

  useEffect(() => () => stopRef.current?.(), []);
  return { value, state, start, videoRef };
}

/** まいフレーム よばれる ループ。dt は びょう */
function useFrame(active: boolean, fn: (dt: number) => void) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let prev = performance.now();
    const loop = (now: number) => {
      ref.current(Math.min(0.1, (now - prev) / 1000));
      prev = now;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);
}

function Meter({ value, max, id, band }: { value: number; max: number; id: SensorId; band?: [number, number] }) {
  const c = SENSOR_BY_ID[id];
  return (
    <div className="sz-meter" style={{ '--c': c.color, '--ink': c.ink } as React.CSSProperties}>
      <div className="sz-metertrack">
        {band && <span className="sz-meterband" style={{ left: `${(band[0] / max) * 100}%`, width: `${((band[1] - band[0]) / max) * 100}%` }} />}
        <span className="sz-meterfill" style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <p>
        {c.name}の あたい <b>{Math.round(value)}</b>
        <small> ／ {max}</small>
      </p>
    </div>
  );
}

// ---------- 1. ぽちお：やるきスイッチ れんだ ----------

function PochioGame({ onFinish }: { onFinish: Finish }) {
  const [taps, setTaps] = useState(0);
  const [left, setLeft] = useState(10);
  const [pressed, setPressed] = useState(false);
  const started = taps > 0;
  const st = useRef({ taps: 0, left: 10, done: false });
  st.current.taps = taps;
  useFrame(started, (dt) => {
    const s = st.current;
    if (s.done) return;
    s.left -= dt;
    setLeft(s.left);
    if (s.left <= 0) {
      s.done = true;
      onFinish(s.taps);
    }
  });
  const fire = taps >= 25;
  return (
    <div className="sz-mini">
      <p className="sz-timer">のこり {Math.max(0, left).toFixed(1)} びょう</p>
      <button
        type="button"
        className={`sz-bigtap ${pressed ? 'down' : ''}`}
        onPointerDown={() => {
          setPressed(true);
          if (left > 0) setTaps((n) => n + 1);
        }}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && !e.repeat && left > 0) setTaps((n) => n + 1);
        }}
        aria-label="やるきスイッチを おす"
      >
        <SensorChar id="pochio" size={170} mood={fire ? 'fire' : 'normal'} />
      </button>
      <p className="sz-count">
        <b>{taps}</b> かい
      </p>
      <p className="sz-sub">
        ぽちおの あたい <b>{pressed ? 0 : 1}</b>（{pressed ? 'おしている' : 'おしていない'}）
        {!started && ' ／ ぽちおを タップで スタート'}
      </p>
    </div>
  );
}

// ---------- 2. かっそー：チーターと かけっこ ----------

type MotionCtor = { requestPermission?: () => Promise<string> };

function KassoGame({ onFinish }: { onFinish: Finish }) {
  const [phase, setPhase] = useState<'ready' | 'run'>('ready');
  const level = useRef(0);
  const [view, setView] = useState({ level: 0, me: 0, cheetah: 0, time: 0 });
  const st = useRef({ me: 0, cheetah: 0, time: 0, done: false });

  const start = async () => {
    const DM = (window as unknown as { DeviceMotionEvent?: MotionCtor }).DeviceMotionEvent;
    try {
      await DM?.requestPermission?.();
    } catch {
      // きょか されなくても ボタンで はしれる
    }
    setPhase('run');
  };

  useEffect(() => {
    if (phase !== 'run') return;
    let prev: { x: number; y: number; z: number } | null = null;
    const onMotion = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity;
      if (!a || a.x === null || a.y === null || a.z === null) return;
      if (prev) {
        const delta = Math.abs(a.x - prev.x) + Math.abs(a.y - prev.y) + Math.abs(a.z - prev.z);
        if (delta > 1.5) level.current = Math.min(100, level.current + delta * SHAKE_GAIN);
      }
      prev = { x: a.x, y: a.y, z: a.z };
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' && !e.repeat) {
        e.preventDefault();
        level.current = Math.min(100, level.current + TAP_BOOST);
      }
    };
    window.addEventListener('devicemotion', onMotion);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('devicemotion', onMotion);
      window.removeEventListener('keydown', onKey);
    };
  }, [phase]);

  useFrame(phase === 'run', (dt) => {
    const s = st.current;
    if (s.done) return;
    level.current *= Math.exp(-dt * SHAKE_DECAY);
    s.time += dt;
    s.me = Math.min(100, s.me + level.current * RUN_SPEED * dt);
    s.cheetah = Math.min(100, s.cheetah + CHEETAH_SPEED * dt);
    setView({ level: level.current, me: s.me, cheetah: s.cheetah, time: s.time });
    if (s.me >= 100) {
      s.done = true;
      onFinish(-Math.round(s.time * 10) / 10);
    }
  });

  if (phase === 'ready')
    return (
      <div className="sz-mini">
        <SensorChar id="kasso" size={130} />
        <button type="button" className="sz-btn primary big" onClick={start}>
          よーい、ドン！
        </button>
        <p className="sz-sub">スマホの うごきセンサーを つかうよ。きかれたら「きょか」を えらんでね。</p>
      </div>
    );

  return (
    <div className="sz-mini">
      <p className="sz-timer">{view.time.toFixed(1)} びょう</p>
      <div className="sz-track" aria-hidden>
        <div className="sz-lane">
          <span style={{ left: `${view.cheetah * 0.86}%` }} className="sz-runner">
            <span className="sz-cheetah" />
          </span>
        </div>
        <div className="sz-lane">
          <span style={{ left: `${view.me * 0.86}%` }} className="sz-runner">
            <SensorChar id="kasso" size={46} mood={view.level > 50 ? 'happy' : 'normal'} />
          </span>
        </div>
        <span className="sz-finish">ゴール</span>
      </div>
      <p className="sz-count">
        <b>{Math.floor(view.me)}</b> m
      </p>
      <Meter value={view.level} max={100} id="kasso" />
      <button type="button" className="sz-btn big" onPointerDown={() => (level.current = Math.min(100, level.current + TAP_BOOST))}>
        スマホを ふる！（ここを れんだ でも OK）
      </button>
    </div>
  );
}

// ---------- 3・4. おとん／ピッカリー：おだいの はんいに あわせる ----------

type Band = { text: string; range: [number, number] };

function BandGame({
  id,
  kind,
  max,
  bands,
  manualLabel,
  startLabel,
  note,
  onFinish,
}: {
  id: SensorId;
  kind: 'mic' | 'cam';
  max: number;
  bands: Band[];
  manualLabel: string;
  startLabel: string;
  note: string;
  onFinish: Finish;
}) {
  const input = useLevelInput(kind);
  const [view, setView] = useState({ value: 0, left: 20, hold: 0, score: 0, band: 0 });
  const st = useRef({ left: 20, hold: 0, score: 0, band: 0, done: false });
  const HOLD = 0.8;

  useFrame(input.state !== 'idle', (dt) => {
    const s = st.current;
    if (s.done) return;
    const v = input.value.current;
    const [lo, hi] = bands[s.band].range;
    s.left -= dt;
    s.hold = v >= lo && v <= hi ? s.hold + dt : Math.max(0, s.hold - dt * 2);
    if (s.hold >= HOLD) {
      s.score++;
      s.hold = 0;
      s.band = (s.band + 1 + Math.floor(Math.random() * (bands.length - 1))) % bands.length;
    }
    setView({ value: v, left: s.left, hold: s.hold, score: s.score, band: s.band });
    if (s.left <= 0) {
      s.done = true;
      onFinish(s.score);
    }
  });

  const band = bands[view.band];
  const inBand = view.value >= band.range[0] && view.value <= band.range[1];
  const mood: Mood = inBand ? 'happy' : id === 'pikkari' && view.value < 25 ? 'sleep' : 'normal';

  const video = kind === 'cam' && <video ref={input.videoRef} className={`sz-cam ${input.state === 'on' ? '' : 'off'}`} muted playsInline />;

  // <video> は さいしょから おなじ ばしょに おいておく（とちゅうで つくりなおすと えいぞうが きれる）
  if (input.state === 'idle')
    return (
      <div className="sz-mini">
        {video}
        <SensorChar id={id} size={130} />
        <button type="button" className="sz-btn primary big" onClick={input.start}>
          {startLabel}
        </button>
        <p className="sz-sub">{note}</p>
      </div>
    );

  return (
    <div className="sz-mini">
      {video}
      <p className="sz-timer">のこり {Math.max(0, view.left).toFixed(1)} びょう</p>
      <p className={`sz-order ${inBand ? 'ok' : ''}`}>{band.text}</p>
      <div className="sz-holdring" style={{ '--p': view.hold / HOLD } as React.CSSProperties}>
        <SensorChar id={id} size={120} mood={mood} />
      </div>
      <Meter value={view.value} max={max} id={id} band={band.range} />
      {input.state === 'manual' && (
        <label className="sz-manual">
          {manualLabel}
          <input type="range" min={0} max={max} defaultValue={0} onChange={(e) => (input.value.current = Number(e.target.value))} />
        </label>
      )}
      <p className="sz-count">
        <b>{view.score}</b> かい せいこう
      </p>
    </div>
  );
}

const OtonGame = ({ onFinish }: { onFinish: Finish }) => (
  <BandGame
    id="oton"
    kind="mic"
    max={50}
    bands={[
      { text: 'しーっ… しずかに', range: [0, 8] },
      { text: 'ちいさな こえで ♪', range: [12, 24] },
      { text: 'げんきな こえで ♪♪', range: [26, 38] },
      { text: 'おもいっきり シャウト！', range: [40, 50] },
    ]}
    manualLabel="マイクが つかえないので、スライダーで こえの おおきさを かえてね"
    startLabel="マイクを つかって スタート"
    note="おとは この スマホの なかで はかるだけ。ろくおんも そうしんも しないよ。"
    onFinish={onFinish}
  />
);

const PikkariGame = ({ onFinish }: { onFinish: Finish }) => (
  <BandGame
    id="pikkari"
    kind="cam"
    max={100}
    bands={[
      { text: 'あかるい ところへ むけて！', range: [55, 100] },
      { text: 'カメラを かくして くらく！', range: [0, 20] },
    ]}
    manualLabel="カメラが つかえないので、スライダーで あかるさを かえてね"
    startLabel="カメラを つかって スタート"
    note="カメラは あかるさを はかるだけ。えいぞうは ほぞんも そうしんも しないよ。"
    onFinish={onFinish}
  />
);

// ---------- 5. フォットん：しろくろ きおく ----------

function PhotonGame({ onFinish }: { onFinish: Finish }) {
  const [round, setRound] = useState(1);
  const [pattern, setPattern] = useState<boolean[]>([]);
  const [answer, setAnswer] = useState<boolean[]>(Array(9).fill(false));
  const [phase, setPhase] = useState<'show' | 'input' | 'right' | 'wrong'>('show');
  const [lastValue, setLastValue] = useState<number | null>(null);

  useEffect(() => {
    const count = Math.min(7, 2 + round);
    const cells = Array<boolean>(9).fill(false);
    let placed = 0;
    while (placed < count) {
      const k = Math.floor(Math.random() * 9);
      if (!cells[k]) {
        cells[k] = true;
        placed++;
      }
    }
    setPattern(cells);
    setAnswer(Array(9).fill(false));
    setPhase('show');
    setLastValue(null);
    const t = setTimeout(() => setPhase('input'), 1400 + count * 250);
    return () => clearTimeout(t);
  }, [round]);

  const check = () => {
    const ok = pattern.every((v, k) => v === answer[k]);
    setPhase(ok ? 'right' : 'wrong');
    setTimeout(() => (ok ? setRound((r) => r + 1) : onFinish(round - 1)), ok ? 900 : 1800);
  };

  const cells = phase === 'input' ? answer : pattern;
  return (
    <div className="sz-mini">
      <p className="sz-timer">{round} もんめ</p>
      <p className={`sz-order ${phase === 'right' ? 'ok' : ''}`}>
        {phase === 'show' && 'くろい マスを おぼえて！'}
        {phase === 'input' && 'くろかった マスを タップ'}
        {phase === 'right' && 'せいかい！'}
        {phase === 'wrong' && 'ざんねん… こたえは これ'}
      </p>
      <div className="sz-memory">
        {cells.map((on, k) => (
          <button
            key={k}
            type="button"
            className={on ? 'black' : ''}
            disabled={phase !== 'input'}
            aria-pressed={on}
            aria-label={`${k + 1}ばんの マス`}
            onClick={() => {
              setAnswer((a) => a.map((v, j) => (j === k ? !v : v)));
              setLastValue(answer[k] ? 90 : 10);
            }}
          />
        ))}
      </div>
      <div className="sz-photonrow">
        <SensorChar id="photon" size={70} mood={phase === 'right' ? 'happy' : 'normal'} />
        <p className="sz-sub">
          フォットんの あたい <b>{lastValue ?? '−'}</b>
          <br />
          しろは 90、くろは 10。くろは ひかりを はねかえさない。
        </p>
      </div>
      <button type="button" className="sz-btn primary big" disabled={phase !== 'input'} onClick={check}>
        これで こたえる
      </button>
    </div>
  );
}

// ---------- いちらん と わく ----------

type MiniDef = {
  id: SensorId;
  title: string;
  uses: string;
  how: string;
  format: (score: number) => string;
  stars: (score: number) => number;
  Game: (p: { onFinish: Finish }) => JSX.Element;
};

const MINIS: MiniDef[] = [
  {
    id: 'pochio',
    title: 'やるきスイッチ れんだ',
    uses: 'タッチ',
    how: '10びょうで ぽちおを なんかい タッチ できるかな。25かいを こえると ぽちおが もえる！',
    format: (s) => `${s} かい`,
    stars: (s) => (s >= 50 ? 3 : s >= 30 ? 2 : 1),
    Game: PochioGame,
  },
  {
    id: 'kasso',
    title: 'チーターと かけっこ',
    uses: 'スマホを ふる',
    how: 'スマホを ふって かっそーを はしらせよう。あいぼうの チーターより はやく 100m！',
    format: (s) => `${(-s).toFixed(1)} びょう`,
    stars: (s) => (-s <= 9 ? 3 : -s <= 11.1 ? 2 : 1),
    Game: KassoGame,
  },
  {
    id: 'photon',
    title: 'しろくろ きおく',
    uses: 'きおくりょく',
    how: 'フォットんが みせる しろと くろの もようを おぼえて、おなじ マスを タップしよう。',
    format: (s) => `${s} もん`,
    stars: (s) => (s >= 5 ? 3 : s >= 3 ? 2 : 1),
    Game: PhotonGame,
  },
  {
    id: 'pikkari',
    title: 'ひかりで じゅうでん',
    uses: 'カメラの あかるさ',
    how: '「あかるく」「くらく」の おだいに あわせて、カメラを むけたり かくしたり。20びょうで なんかい できる？',
    format: (s) => `${s} かい`,
    stars: (s) => (s >= 8 ? 3 : s >= 5 ? 2 : 1),
    Game: PikkariGame,
  },
  {
    id: 'oton',
    title: 'おとんの ライブ',
    uses: 'マイクの こえ',
    how: 'おだいの おおきさで こえを だそう。おとんの あたいは 0〜50。20びょうで なんかい あわせられる？',
    format: (s) => `${s} かい`,
    stars: (s) => (s >= 8 ? 3 : s >= 5 ? 2 : 1),
    Game: OtonGame,
  },
];

function MiniFrame({ def, onExit }: { def: MiniDef; onExit: () => void }) {
  const [phase, setPhase] = useState<'intro' | 'play' | 'result'>('intro');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const { progress, record } = useProgress();
  const c = SENSOR_BY_ID[def.id];
  const key = `mini-${def.id}`;
  const best = progress[key];

  const finish = useCallback(
    (s: number) => {
      setScore(s);
      record(key, s);
      setPhase('result');
    },
    [key, record],
  );

  return (
    <section className="sz-miniframe" style={{ '--c': c.color, '--ink': c.ink } as React.CSSProperties}>
      <div className="sz-levelbar">
        <button type="button" className="sz-btn ghost" onClick={onExit}>
          ミニゲーム いちらん
        </button>
        <div className="sz-levelname">
          <small>
            {c.name}（{c.sensor}）
          </small>
          <strong>{def.title}</strong>
        </div>
      </div>
      {phase === 'intro' && (
        <div className="sz-mini">
          <SensorChar id={def.id} size={150} />
          <p className="sz-how">{def.how}</p>
          <button type="button" className="sz-btn primary big" onClick={() => setPhase('play')}>
            あそぶ
          </button>
          {best !== undefined && <p className="sz-sub">じこベスト：{def.format(best)}</p>}
        </div>
      )}
      {phase === 'play' && <def.Game key={round} onFinish={finish} />}
      {phase === 'result' && (
        <div className="sz-mini">
          <p className="sz-resulthead">けっか</p>
          <SensorChar id={def.id} size={120} mood={def.stars(score) >= 2 ? (def.id === 'pochio' ? 'fire' : 'happy') : 'normal'} />
          <p className="sz-count">
            <b>{def.format(score)}</b>
          </p>
          <Stars n={def.stars(score)} />
          {best !== undefined && <p className="sz-sub">じこベスト：{def.format(best)}</p>}
          <div className="sz-resultbtns">
            <button
              type="button"
              className="sz-btn primary"
              onClick={() => {
                setRound((r) => r + 1);
                setPhase('play');
              }}
            >
              もういちど
            </button>
            <button type="button" className="sz-btn" onClick={onExit}>
              ほかの ゲーム
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export function MiniGames() {
  const [current, setCurrent] = useState<SensorId | null>(null);
  const { progress } = useProgress();
  const def = MINIS.find((m) => m.id === current);

  return (
    <main className="sz-game">
      <GameHeader title="センサーズ・ミニゲーム" sub="スマホの ほんものの センサーで、5にんと あそぼう。" />
      {def ? (
        <MiniFrame key={def.id} def={def} onExit={() => setCurrent(null)} />
      ) : (
        <ul className="sz-minilist">
          {MINIS.map((m) => {
            const c = SENSOR_BY_ID[m.id];
            const best = progress[`mini-${m.id}`];
            return (
              <li key={m.id}>
                <button type="button" className="sz-minicard" style={{ '--c': c.color, '--ink': c.ink } as React.CSSProperties} onClick={() => setCurrent(m.id)}>
                  <SensorChar id={m.id} size={72} />
                  <span className="sz-minitext">
                    <small>
                      {c.name}・{m.uses}
                    </small>
                    <strong>{m.title}</strong>
                    <span>{best !== undefined ? `じこベスト ${m.format(best)}` : 'まだ あそんでいない'}</span>
                  </span>
                  {best !== undefined && <Stars n={m.stars(best)} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
