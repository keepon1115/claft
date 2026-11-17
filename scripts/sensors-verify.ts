// センサーズのゲームが「ちゃんと解ける」ことを確かめる検証スクリプト。
//   npx tsx scripts/sensors-verify.ts
import { LEVELS } from '../lib/sensors/puzzle/levels';
import { isCleared, solve, step, type Dir } from '../lib/sensors/puzzle/engine';
import { SHIREI_LEVELS } from '../lib/sensors/shirei/levels';
import { simulate, type ActId, type CondId, type Program } from '../lib/sensors/shirei/engine';

let ok = true;
const bad = (msg: string) => {
  ok = false;
  console.log(`  ✗ ${msg}`);
};

// ---- パズル ----
// 5人ステージは 状態が 多すぎて 総当たりできないので、模範手順を 再生して 確かめる。
// 手順の 書きかた：「<なんばんめの キャラ><むき>」。キャラは ぽちお→かっそー→フォットん→ピッカリー→おとん の じゅん。
const REPLAY: Record<string, string> = {
  p10:
    '1R 1D 1R 1D 1R 1U 3R 3R 3R 3D 3D 4R 4U 4R 4R 4D 4R 4R 4R 4R 4D ' +
    '5U 5U 5R 5R 5R 5D 5R 5R 5R 5R 5R 5D 3U 3R 3R 3R 3R 3R 3R 3U 3U ' +
    '1D 1D 1R 1R 1R 1R 1R 1R 1U 1U 4U 4R 4R 4U 4U 2R 2U 5U 5R 5U 5U',
};

console.log('== パズル ==');
for (const lv of LEVELS) {
  let moves: number | null = null;
  if (REPLAY[lv.id]) {
    let s = lv.start;
    for (const m of REPLAY[lv.id].split(' ')) {
      const r = step(lv, s, Number(m[0]) - 1, m[1] as Dir);
      if (!r.state) {
        bad(`${lv.id}: 模範手順の ${m} が 動けない`);
        break;
      }
      s = r.state;
    }
    if (isCleared(s)) moves = s.moves;
  } else {
    moves = solve(lv)?.moves ?? null;
  }
  console.log(`${lv.id} ${lv.title}: ${moves === null ? '解けない' : `${moves}手`}（par ${lv.par}）`);
  if (moves === null) bad(`${lv.id} が 解けない`);
  else if (moves !== lv.par) bad(`${lv.id} の par(${lv.par}) が 最少手数(${moves}) と ちがう`);
}

// ---- しれい ----
const ANSWERS: Record<string, Program> = {
  s1: { rules: [], otherwise: 'F' },
  s2: { rules: [{ cond: 'touch', act: 'R' }], otherwise: 'F' },
  s3: { rules: [{ cond: 'black', act: 'L' }, { cond: 'touch', act: 'R' }], otherwise: 'F' },
  s4: { rules: [{ cond: 'dark', act: 'LF' }], otherwise: 'F' },
  s5: { rules: [{ cond: 'sound', act: 'W' }], otherwise: 'F' },
  s6: { rules: [{ cond: 'slope', act: 'DASH' }, { cond: 'touch', act: 'R' }], otherwise: 'F' },
  s7: {
    rules: [
      { cond: 'dark', act: 'LF' },
      { cond: 'sound', act: 'W' },
      { cond: 'slope', act: 'DASH' },
      { cond: 'black', act: 'L' },
      { cond: 'touch', act: 'R' },
    ],
    otherwise: 'F',
  },
};

/** その ステージで つかえる ブロックだけで、rules こ以下の しれいを ぜんぶ ためす */
function countSolutions(lv: (typeof SHIREI_LEVELS)[number], maxRules: number) {
  let n = 0;
  const rec = (rules: { cond: CondId; act: ActId }[]) => {
    for (const o of lv.acts)
      if (simulate(lv, { rules, otherwise: o }).outcome.status === 'clear') n++;
    if (rules.length >= maxRules) return;
    for (const c of lv.conds) {
      if (rules.some((r) => r.cond === c)) continue;
      for (const a of lv.acts) rec([...rules, { cond: c, act: a }]);
    }
  };
  rec([]);
  return n;
}

console.log('== しれい ==');
for (const lv of SHIREI_LEVELS) {
  const ans = ANSWERS[lv.id];
  const r = simulate(lv, ans);
  const fewer = lv.slots > 0 ? countSolutions(lv, Math.min(lv.slots - 1, 3)) : 0;
  console.log(
    `${lv.id} ${lv.title}: 模範解答=${r.outcome.status}（${r.frames.length - 1}ターン） / ルールを へらして 解ける しれい=${fewer}こ`,
  );
  if (r.outcome.status !== 'clear') bad(`${lv.id} の 模範解答が クリアできない`);
  if (ans.rules.length > lv.slots) bad(`${lv.id} の 模範解答が スロット数を こえている`);
  if (fewer > 0) bad(`${lv.id} は センサーを つかわなくても 解けてしまう`);
}

console.log(ok ? '\nOK: ぜんぶ 解ける' : '\nNG');
process.exit(ok ? 0 : 1);
