'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SENSOR_BY_ID, type SensorId } from '@/lib/sensors/characters';
import {
  DIRS,
  doorClosed,
  guardAsleep,
  isCleared,
  isLit,
  isWatched,
  key,
  step,
  tileAt,
  type BlockReason,
  type Dir,
  type Level,
  type State,
  type StepEvent,
} from '@/lib/sensors/puzzle/engine';
import { LEVELS } from '@/lib/sensors/puzzle/levels';
import { GameHeader, Stars } from './GameHeader';
import { SensorChar, type Mood } from './SensorChar';
import { useProgress } from './useProgress';

const POWER: Record<SensorId, string> = {
  pochio: 'はこと スイッチを おせる',
  kasso: 'とまれない・あなを とびこえる',
  photon: 'まっすぐ さきの かくれた ゆかを みつける',
  pikkari: 'まわり 2マスを てらす',
  oton: 'うたで みはりロボを ねむらせる',
};

const BLOCK_TEXT: Partial<Record<BlockReason, string>> = {
  pit: 'あなが あって すすめない！',
  dark: 'くらくて すすめない。ピッカリーを ちかくに つれて こよう。',
  watch: 'みはりロボが みている！ おとんの うたで ねむらせよう。',
  door: 'ドアが しまっている。ぽちおで スイッチを おそう。',
};

const starsFor = (moves: number, par: number) => (moves <= par ? 3 : moves <= par * 1.5 ? 2 : 1);

/** えらんでいる キャラの「センサーの あたい」。ルールには かんけいない、センサーの はたらきを みせる ための ひょうじ */
function sensorValue(level: Level, s: State, id: SensorId, last: StepEvent | null): { value: number; note: string } {
  const c = s.chars.find((v) => v.id === id);
  if (!c) return { value: 0, note: '' };
  if (id === 'pochio') {
    const pressed = last?.type === 'push' || last?.type === 'switch' || last?.type === 'blocked';
    return { value: pressed ? 0 : 1, note: pressed ? 'なにかに タッチした！' : 'なにも さわっていない' };
  }
  if (id === 'kasso') {
    const v = last?.type === 'slide' ? Math.min(100, last.length * 20) : 0;
    return { value: v, note: v ? 'ビューンと うごいた！' : 'とまっている' };
  }
  if (id === 'photon') {
    let best = 9;
    for (const [dx, dy] of Object.values(DIRS)) {
      for (let d = 1; d < 9; d++) {
        const x = c.x + dx * d;
        const y = c.y + dy * d;
        const t = tileAt(level, x, y);
        if (t === 'wall' || t === 'switch' || t === 'guard' || doorClosed(level, s, x, y) || s.boxes.includes(key(x, y))) {
          best = Math.min(best, d);
          break;
        }
      }
    }
    return { value: Math.max(0, 100 - (best - 1) * 25), note: best <= 1 ? 'すぐ ちかくに ものが ある' : 'ものは とおくに ある' };
  }
  if (id === 'pikkari') {
    const dark = tileAt(level, c.x, c.y) === 'dark';
    return { value: dark ? 10 : 90, note: dark ? 'まわりが くらい' : 'まわりが あかるい' };
  }
  let singing = false;
  for (let y = 0; y < level.h; y++)
    for (let x = 0; x < level.w; x++) if (level.tiles[y][x] === 'guard' && guardAsleep(s, x, y)) singing = true;
  return { value: singing ? 45 : 5, note: singing ? 'うたごえが ひびいている' : 'しずか' };
}

function TileView({ level, s, x, y }: { level: Level; s: State; x: number; y: number }) {
  const t = tileAt(level, x, y);
  const k = key(x, y);
  let cls = 'floor';
  let inner: React.ReactNode = null;
  if (t === 'wall') cls = 'wall';
  else if (t === 'goal') {
    cls = 'goal';
    inner = <span className="sz-goalmark">ゴール</span>;
  } else if (t === 'pit') cls = s.filled.includes(k) ? 'filled' : 'pit';
  else if (t === 'hidden') cls = s.filled.includes(k) ? 'filled' : s.revealed.includes(k) ? 'found' : 'pit hidden';
  else if (t === 'dark') cls = isLit(s, x, y) ? 'lit' : 'dark';
  else if (t === 'switch') {
    cls = 'wall';
    inner = <span className={`sz-switch ${s.flipped ? 'on' : ''}`} />;
  } else if (t === 'doorC' || t === 'doorO') cls = doorClosed(level, s, x, y) ? 'door closed' : 'door open';
  else if (t === 'guard') {
    const asleep = guardAsleep(s, x, y);
    cls = 'floor';
    inner = (
      <span className={`sz-guard ${asleep ? 'asleep' : ''}`}>
        <i />
        {asleep && <b>z</b>}
      </span>
    );
  }
  const watched = t !== 'wall' && t !== 'guard' && t !== 'switch' && isWatched(level, s, x, y);
  return (
    <div className={`sz-tile ${cls} ${watched ? 'watched' : ''}`}>
      {inner}
      {s.boxes.includes(k) && <span className="sz-box" />}
    </div>
  );
}

function Play({ level, index, onExit, onNext }: { level: Level; index: number; onExit: () => void; onNext: (() => void) | null }) {
  const [history, setHistory] = useState<State[]>([level.start]);
  const s = history[history.length - 1];
  const [sel, setSel] = useState<SensorId>(level.start.chars[0].id);
  const [last, setLast] = useState<{ id: SensorId; event: StepEvent } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [bump, setBump] = useState(0);
  const { record } = useProgress();
  const cleared = isCleared(s);
  const stars = starsFor(s.moves, level.par);

  useEffect(() => {
    if (cleared) record(level.id, stars);
  }, [cleared, level.id, record, stars]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const move = useCallback(
    (dir: Dir) => {
      if (cleared) return;
      const idx = s.chars.findIndex((c) => c.id === sel && !c.out);
      if (idx < 0) return;
      const r = step(level, s, idx, dir);
      setLast({ id: sel, event: r.event });
      if (!r.state) {
        setBump((n) => n + 1);
        if (r.event.type === 'blocked') {
          const reason = r.event.reason;
          const text = reason === 'box' && sel !== 'pochio' ? 'はこは ぽちおしか おせない。' : BLOCK_TEXT[reason];
          if (text) setToast(text);
        }
        return;
      }
      setToast(null);
      setHistory((h) => [...h, r.state as State]);
      if (r.goal) {
        const rest = r.state.chars.find((c) => !c.out);
        if (rest) setSel(rest.id);
      }
    },
    [cleared, level, s, sel],
  );

  const undo = useCallback(() => {
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
    setLast(null);
    setToast(null);
  }, []);
  const reset = useCallback(() => {
    setHistory([level.start]);
    setSel(level.start.chars[0].id);
    setLast(null);
    setToast(null);
  }, [level]);

  // もどした あとに、えらんでいた キャラが まだ いなければ えらびなおす
  useEffect(() => {
    if (!s.chars.some((c) => c.id === sel && !c.out)) {
      const rest = s.chars.find((c) => !c.out);
      if (rest) setSel(rest.id);
    }
  }, [s, sel]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const dir = ({ ArrowUp: 'U', ArrowDown: 'D', ArrowLeft: 'L', ArrowRight: 'R', w: 'U', s: 'D', a: 'L', d: 'R' } as Record<string, Dir>)[e.key];
      if (dir) {
        e.preventDefault();
        move(dir);
      } else if (e.key === 'z' || e.key === 'Backspace') undo();
      else if (e.key === 'r') reset();
      else if (e.key === 'Tab' || e.key === ' ') {
        e.preventDefault();
        const alive = s.chars.filter((c) => !c.out);
        const i = alive.findIndex((c) => c.id === sel);
        if (alive.length) setSel(alive[(i + 1) % alive.length].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [move, undo, reset, s, sel]);

  // ばんめんの スワイプで うごかす
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => (touch.current = { x: e.clientX, y: e.clientY });
  const onPointerUp = (e: React.PointerEvent) => {
    const t = touch.current;
    touch.current = null;
    if (!t) return;
    const dx = e.clientX - t.x;
    const dy = e.clientY - t.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'R' : 'L') : dy > 0 ? 'D' : 'U');
  };

  const sv = sensorValue(level, s, sel, last && last.id === sel ? last.event : null);
  const info = SENSOR_BY_ID[sel];
  const moodOf = (id: SensorId): Mood => {
    if (id === 'pochio' && last?.id === 'pochio' && (last.event.type === 'switch' || last.event.type === 'push')) return 'fire';
    if (id === 'oton' && sensorValue(level, s, 'oton', null).value > 25) return 'happy';
    return 'normal';
  };

  return (
    <div className="sz-play">
      <div className="sz-levelbar">
        <button type="button" className="sz-btn ghost" onClick={onExit}>
          ステージ いちらん
        </button>
        <div className="sz-levelname">
          <small>ステージ {index + 1}</small>
          <strong>{level.title}</strong>
        </div>
        <div className="sz-moves" aria-live="polite">
          <small>てかず</small>
          <strong>{s.moves}</strong>
          <small>めやす {level.par}</small>
        </div>
      </div>

      <p className="sz-hint">{level.hint}</p>

      <div
        className="sz-board"
        style={{ '--cols': level.w, '--rows': level.h } as React.CSSProperties}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {Array.from({ length: level.h }, (_, y) =>
          Array.from({ length: level.w }, (_, x) => <TileView key={key(x, y)} level={level} s={s} x={x} y={y} />),
        )}
        {s.chars.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`sz-piece ${c.id === sel ? 'sel' : ''} ${c.out ? 'out' : ''} ${c.id === 'pikkari' ? 'glow' : ''}`}
            style={{ left: `${(c.x / level.w) * 100}%`, top: `${(c.y / level.h) * 100}%`, '--c': SENSOR_BY_ID[c.id].color } as React.CSSProperties}
            onClick={() => !c.out && setSel(c.id)}
            aria-label={`${SENSOR_BY_ID[c.id].name}を えらぶ`}
            aria-pressed={c.id === sel}
            disabled={c.out}
          >
            <span key={c.id === sel ? bump : 0} className={c.id === sel && bump ? 'sz-bump' : ''}>
              <SensorChar id={c.id} size="100%" mood={moodOf(c.id)} />
            </span>
          </button>
        ))}
        {toast && (
          <div className="sz-toast" role="status">
            {toast}
          </div>
        )}
      </div>

      <div className="sz-team" role="group" aria-label="うごかす キャラ">
        {s.chars.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`sz-teamchip ${c.id === sel ? 'sel' : ''}`}
            style={{ '--c': SENSOR_BY_ID[c.id].color } as React.CSSProperties}
            onClick={() => setSel(c.id)}
            disabled={c.out}
            aria-pressed={c.id === sel}
          >
            <SensorChar id={c.id} size={34} />
            <span>{c.out ? 'ゴール！' : SENSOR_BY_ID[c.id].name}</span>
          </button>
        ))}
      </div>

      <div className="sz-controls">
        <div className="sz-readout" style={{ '--c': info.color, '--ink': info.ink } as React.CSSProperties}>
          <strong>{info.name}</strong>
          <span className="sz-power">{POWER[sel]}</span>
          <span className="sz-value">
            {info.sensor}の あたい <b>{sv.value}</b>
          </span>
          <span className="sz-valuenote">{sv.note}</span>
        </div>
        <div className="sz-dpad" role="group" aria-label="うごかす むき">
          {(['U', 'L', 'R', 'D'] as Dir[]).map((d) => (
            <button key={d} type="button" className={`sz-arrow ${d}`} onClick={() => move(d)} aria-label={{ U: 'うえ', D: 'した', L: 'ひだり', R: 'みぎ' }[d]}>
              <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
                <path d="M12 4 L21 17 H3 Z" fill="currentColor" />
              </svg>
            </button>
          ))}
        </div>
        <div className="sz-tools">
          <button type="button" className="sz-btn" onClick={undo} disabled={history.length < 2}>
            1て もどす
          </button>
          <button type="button" className="sz-btn" onClick={reset} disabled={history.length < 2}>
            さいしょから
          </button>
        </div>
      </div>

      {cleared && (
        <div className="sz-overlay" role="dialog" aria-label="クリア">
          <div className="sz-result">
            <p className="sz-resulthead">クリア！</p>
            <Stars n={stars} />
            <p>
              {s.moves}て で クリア（めやす {level.par}て）
            </p>
            <div className="sz-resultbtns">
              <button type="button" className="sz-btn" onClick={reset}>
                もういちど
              </button>
              {onNext ? (
                <button type="button" className="sz-btn primary" onClick={onNext}>
                  つぎの ステージ
                </button>
              ) : (
                <button type="button" className="sz-btn primary" onClick={onExit}>
                  ステージ いちらん
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PuzzleGame() {
  const [index, setIndex] = useState<number | null>(null);
  const { progress } = useProgress();
  const unlocked = useMemo(() => LEVELS.map((lv, i) => i === 0 || !!progress[LEVELS[i - 1].id] || !!progress[lv.id]), [progress]);

  return (
    <main className="sz-game">
      <GameHeader title="センサーズ・パズル" sub="5にんの とくいわざを つないで、みんなを ゴールへ。" />
      {index === null ? (
        <>
          <ul className="sz-levels">
            {LEVELS.map((lv, i) => (
              <li key={lv.id}>
                <button type="button" className="sz-levelcard" disabled={!unlocked[i]} onClick={() => setIndex(i)}>
                  <span className="sz-levelno">{i + 1}</span>
                  <span className="sz-leveltitle">{unlocked[i] ? lv.title : 'まえの ステージを クリアしよう'}</span>
                  <span className="sz-levelcast">
                    {lv.start.chars.map((c) => (
                      <SensorChar key={c.id} id={c.id} size={26} />
                    ))}
                  </span>
                  <Stars n={progress[lv.id] ?? 0} />
                </button>
              </li>
            ))}
          </ul>
          <p className="sz-keys">キーボード：やじるしキーで うごく ／ スペースで キャラこうたい ／ Z で 1て もどす</p>
        </>
      ) : (
        <Play
          key={LEVELS[index].id}
          level={LEVELS[index]}
          index={index}
          onExit={() => setIndex(null)}
          onNext={index + 1 < LEVELS.length ? () => setIndex(index + 1) : null}
        />
      )}
    </main>
  );
}
