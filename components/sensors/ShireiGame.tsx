'use client';

import { useEffect, useMemo, useState } from 'react';
import { SENSORS, SENSOR_BY_ID } from '@/lib/sensors/characters';
import {
  ACTS,
  CONDS,
  FAIL_TEXT,
  parseMap,
  simulate,
  type ActId,
  type CondId,
  type Frame,
  type Outcome,
  type Program,
  type ShireiLevelDef,
} from '@/lib/sensors/shirei/engine';
import { SHIREI_LEVELS } from '@/lib/sensors/shirei/levels';
import { GameHeader, Stars } from './GameHeader';
import { SensorChar } from './SensorChar';
import { useProgress } from './useProgress';

const TILE_CLASS: Record<string, string> = { '#': 'wall', '.': 'floor', G: 'goal', b: 'black', '*': 'tunnel', '/': 'slope', X: 'cross' };
const SPEEDS = [
  { label: 'ゆっくり', ms: 800 },
  { label: 'ふつう', ms: 450 },
  { label: 'はやい', ms: 200 },
];

function Play({ level, index, onExit, onNext }: { level: ShireiLevelDef; index: number; onExit: () => void; onNext: (() => void) | null }) {
  const map = useMemo(() => parseMap(level.map), [level]);
  const [program, setProgram] = useState<Program>({ rules: [], otherwise: 'W' });
  const [run, setRun] = useState<{ frames: Frame[]; outcome: Outcome } | null>(null);
  const [i, setI] = useState(0);
  const [speed, setSpeed] = useState(1);
  const { record } = useProgress();

  const start: Frame = useMemo(() => simulate(level, { rules: [], otherwise: 'W' }).frames[0], [level]);
  const frame = run ? run.frames[i] : start;
  const playing = !!run && i < run.frames.length - 1;
  const done = !!run && !playing;
  const cleared = done && run.outcome.status === 'clear';
  const failed = done && run.outcome.status === 'fail' ? run.outcome.reason : null;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setI((n) => n + 1), SPEEDS[speed].ms);
    return () => clearTimeout(t);
  }, [playing, i, speed]);

  useEffect(() => {
    if (cleared) record(level.id, 1);
  }, [cleared, level.id, record]);

  const go = () => {
    setRun(simulate(level, program));
    setI(0);
  };
  const stop = () => {
    setRun(null);
    setI(0);
  };
  const edit = (next: Program) => {
    setProgram(next);
    stop();
  };
  const setRule = (n: number, patch: Partial<{ cond: CondId; act: ActId }>) =>
    edit({ ...program, rules: program.rules.map((r, k) => (k === n ? { ...r, ...patch } : r)) });
  const swap = (n: number, m: number) => {
    const rules = [...program.rules];
    [rules[n], rules[m]] = [rules[m], rules[n]];
    edit({ ...program, rules });
  };

  // いま じっこう された しれい（つぎの コマに うつる きっかけ）
  const fired = run && i > 0 ? run.frames[i].rule : null;
  const firedCond = fired !== null && fired >= 0 ? program.rules[fired]?.cond : null;
  const locked = playing;
  const showCheetah = frame.danger || failed === 'cheetah';

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
        <div className="sz-moves">
          <small>ターン</small>
          <strong>{frame.t}</strong>
        </div>
      </div>
      <p className="sz-hint">{level.hint}</p>

      <div className="sz-shirei">
        <div className="sz-stage">
          <div className="sz-board" style={{ '--cols': map.w, '--rows': map.h } as React.CSSProperties}>
            {map.grid.map((row, y) =>
              row.map((ch, x) => (
                <div key={`${x},${y}`} className={`sz-tile ${TILE_CLASS[ch] ?? 'floor'}`}>
                  {ch === 'G' && <span className="sz-goalmark">ゴール</span>}
                  {ch === 'X' && showCheetah && <span className="sz-cheetah" aria-label="チーター" />}
                  {ch === 'X' && showCheetah && <span className="sz-bell">カン カン</span>}
                </div>
              )),
            )}
            <div
              className={`sz-robot ${frame.light ? 'light' : ''} ${failed ? 'fail' : ''} ${cleared ? 'win' : ''}`}
              style={{ left: `${(frame.x / map.w) * 100}%`, top: `${(frame.y / map.h) * 100}%` }}
            >
              <svg viewBox="-4 -4 48 48" width="100%" height="100%" style={{ display: 'block', transform: `rotate(${frame.dir * 90}deg)` }} aria-label="ロボット">
                <rect x="6" y="8" width="26" height="24" rx="5" fill="#fff" stroke="#1a1a1a" strokeWidth="2.5" />
                <rect x="3" y="5" width="12" height="6" rx="3" fill="#1a1a1a" />
                <rect x="3" y="29" width="12" height="6" rx="3" fill="#1a1a1a" />
                <path d="M30 13 L38 20 L30 27 Z" fill="#ff2a1f" stroke="#1a1a1a" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="22" cy="15" r="2.2" fill="#1a1a1a" />
                <circle cx="22" cy="25" r="2.2" fill="#1a1a1a" />
              </svg>
            </div>
          </div>

          <ul className="sz-sensors" aria-label="センサーの あたい">
            {SENSORS.map((c) => {
              const cond = (Object.keys(CONDS) as CondId[]).find((k) => CONDS[k].sensor === c.id) as CondId;
              const used = level.conds.includes(cond);
              return (
                <li key={c.id} className={`${used ? '' : 'off'} ${firedCond === cond ? 'fired' : ''}`} style={{ '--c': c.color, '--ink': c.ink } as React.CSSProperties}>
                  <SensorChar id={c.id} size={36} mood={firedCond === cond ? (c.id === 'pochio' ? 'fire' : 'happy') : 'normal'} />
                  <span>{c.name}</span>
                  <b>{frame.sensors[c.id]}</b>
                </li>
              );
            })}
          </ul>
          {level.battery !== undefined && (
            <p className="sz-battery">
              ライトの でんち
              <span aria-label={`のこり ${frame.battery}`}>
                {Array.from({ length: level.battery }, (_, k) => (
                  <i key={k} className={k < frame.battery ? 'on' : ''} />
                ))}
              </span>
            </p>
          )}
        </div>

        <div className="sz-program">
          <p className="sz-loop">ずっと くりかえす</p>
          <ol>
            {program.rules.map((r, n) => (
              <li key={n} className={`sz-rule ${fired === n ? 'fired' : ''}`} style={{ '--c': SENSOR_BY_ID[CONDS[r.cond].sensor].color } as React.CSSProperties}>
                <span className="sz-kw">もし</span>
                <select value={r.cond} disabled={locked} onChange={(e) => setRule(n, { cond: e.target.value as CondId })} aria-label={`${n + 1}ばんめの じょうけん`}>
                  {level.conds.map((c) => (
                    <option key={c} value={c}>
                      {CONDS[c].label}（{CONDS[c].note}）
                    </option>
                  ))}
                </select>
                <span className="sz-kw">なら</span>
                <select value={r.act} disabled={locked} onChange={(e) => setRule(n, { act: e.target.value as ActId })} aria-label={`${n + 1}ばんめの しれい`}>
                  {level.acts.map((a) => (
                    <option key={a} value={a}>
                      {ACTS[a]}
                    </option>
                  ))}
                </select>
                <span className="sz-ruletools">
                  <button type="button" disabled={locked || n === 0} onClick={() => swap(n, n - 1)} aria-label="うえへ">
                    ↑
                  </button>
                  <button type="button" disabled={locked || n === program.rules.length - 1} onClick={() => swap(n, n + 1)} aria-label="したへ">
                    ↓
                  </button>
                  <button type="button" disabled={locked} onClick={() => edit({ ...program, rules: program.rules.filter((_, k) => k !== n) })} aria-label="けす">
                    ×
                  </button>
                </span>
              </li>
            ))}
            <li className={`sz-rule else ${fired === -1 ? 'fired' : ''}`}>
              <span className="sz-kw">{program.rules.length ? 'それいがいは' : 'いつも'}</span>
              <select value={program.otherwise} disabled={locked} onChange={(e) => edit({ ...program, otherwise: e.target.value as ActId })} aria-label="それいがいの しれい">
                {level.acts.map((a) => (
                  <option key={a} value={a}>
                    {ACTS[a]}
                  </option>
                ))}
              </select>
            </li>
          </ol>
          {level.slots > 0 && (
            <button
              type="button"
              className="sz-btn add"
              disabled={locked || program.rules.length >= level.slots}
              onClick={() => edit({ ...program, rules: [...program.rules, { cond: level.conds[0], act: level.acts[0] }] })}
            >
              ＋「もし〜なら」を ふやす（あと {level.slots - program.rules.length}こ）
            </button>
          )}

          <div className="sz-runbar">
            {playing ? (
              <button type="button" className="sz-btn" onClick={stop}>
                とめる
              </button>
            ) : (
              <button type="button" className="sz-btn primary" onClick={go}>
                {done ? 'もういちど スタート' : 'スタート'}
              </button>
            )}
            <div className="sz-speed" role="group" aria-label="はやさ">
              {SPEEDS.map((sp, k) => (
                <button key={sp.label} type="button" className={k === speed ? 'on' : ''} onClick={() => setSpeed(k)} aria-pressed={k === speed}>
                  {sp.label}
                </button>
              ))}
            </div>
          </div>
          {failed && (
            <p className="sz-fail" role="status">
              {FAIL_TEXT[failed]}
            </p>
          )}
        </div>
      </div>

      {cleared && (
        <div className="sz-overlay" role="dialog" aria-label="クリア">
          <div className="sz-result">
            <p className="sz-resulthead">ゴール！</p>
            <Stars n={1} max={1} />
            <p>
              {frame.t}ターンで とうちゃく。つかった「もし」は {program.rules.length}こ。
            </p>
            <div className="sz-resultbtns">
              <button type="button" className="sz-btn" onClick={stop}>
                しれいを みなおす
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

export function ShireiGame() {
  const [index, setIndex] = useState<number | null>(null);
  const { progress } = useProgress();
  const unlocked = SHIREI_LEVELS.map((lv, k) => k === 0 || !!progress[SHIREI_LEVELS[k - 1].id] || !!progress[lv.id]);

  return (
    <main className="sz-game">
      <GameHeader title="しれいを だそう" sub="センサーの あたいを つかって、ロボットに しれいを だそう。" />
      {index === null ? (
        <ul className="sz-levels">
          {SHIREI_LEVELS.map((lv, k) => (
            <li key={lv.id}>
              <button type="button" className="sz-levelcard" disabled={!unlocked[k]} onClick={() => setIndex(k)}>
                <span className="sz-levelno">{k + 1}</span>
                <span className="sz-leveltitle">{unlocked[k] ? lv.title : 'まえの ステージを クリアしよう'}</span>
                <span className="sz-levelcast">
                  {lv.conds.map((c) => (
                    <SensorChar key={c} id={CONDS[c].sensor} size={26} />
                  ))}
                </span>
                <Stars n={progress[lv.id] ? 1 : 0} max={1} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <Play
          key={SHIREI_LEVELS[index].id}
          level={SHIREI_LEVELS[index]}
          index={index}
          onExit={() => setIndex(null)}
          onNext={index + 1 < SHIREI_LEVELS.length ? () => setIndex(index + 1) : null}
        />
      )}
    </main>
  );
}
