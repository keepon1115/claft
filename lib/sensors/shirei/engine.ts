import type { SensorId } from '@/lib/sensors/characters';

// 「しれいを だそう」のルール本体（純粋関数）。
// ロボットは 1ターンごとに 5つの センサーの あたいを よみ、
// うえから じゅんに「もし〜なら」を しらべて、さいしょに あてはまった しれいを 1つ じっこうする。
//
// マップの記号:
//   #  かべ     .  しろい ゆか    G  ゴール      b  くろい ゆか（しるし）
//   *  くらい ゆか（トンネル）    /  さかみち    X  ふみきり
//   > < ^ v  スタート（むき つき）

export type Facing = 0 | 1 | 2 | 3; // 0=みぎ 1=した 2=ひだり 3=うえ
const VEC: [number, number][] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export type CondId = 'touch' | 'black' | 'dark' | 'sound' | 'slope';
export type ActId = 'F' | 'R' | 'L' | 'W' | 'LF' | 'DASH';
export type Rule = { cond: CondId; act: ActId };
export type Program = { rules: Rule[]; otherwise: ActId };

export const CONDS: Record<CondId, { sensor: SensorId; label: string; note: string }> = {
  touch: { sensor: 'pochio', label: 'ぽちお ＝ 0', note: 'まえが かべ' },
  black: { sensor: 'photon', label: 'フォットん ＜ 50', note: 'ゆかが くろい' },
  dark: { sensor: 'pikkari', label: 'ピッカリー ＜ 50', note: 'まわりが くらい' },
  sound: { sensor: 'oton', label: 'おとん ＞ 25', note: 'おとが なっている' },
  slope: { sensor: 'kasso', label: 'かっそー ＞ 60', note: 'さかみちで かたむいている' },
};

export const ACTS: Record<ActId, string> = {
  F: 'まえに すすむ',
  R: 'みぎへ まがる',
  L: 'ひだりへ まがる',
  W: 'とまって まつ',
  LF: 'ライトを つけて すすむ',
  DASH: 'ダッシュ する',
};

export type ShireiLevelDef = {
  id: string;
  title: string;
  hint: string;
  map: string[];
  conds: CondId[];
  acts: ActId[];
  /** おける「もし〜なら」の かず */
  slots: number;
  /** ライトに つかえる でんち */
  battery?: number;
  /** ふみきり：period ターンごとに、from〜to の あいだ チーターが とおる */
  crossing?: { period: number; from: number; to: number };
};

export type SensorValues = Record<SensorId, number>;

export type Frame = {
  t: number;
  x: number;
  y: number;
  dir: Facing;
  sensors: SensorValues;
  /** この ターンに えらばれた ルール（-1 は「それいがい」、null は さいしょの コマ） */
  rule: number | null;
  act: ActId | null;
  light: boolean;
  battery: number;
  danger: boolean;
};

export type Outcome =
  | { status: 'clear' }
  | { status: 'fail'; reason: 'dark' | 'cheetah' | 'crash' | 'battery' | 'loop' | 'timeout' };

export const FAIL_TEXT: Record<Exclude<Outcome, { status: 'clear' }>['reason'], string> = {
  dark: 'くらくて まえが みえない！ くらい ところでは ライトを つけよう。',
  cheetah: 'チーターと ぶつかった！ おとが なっている あいだは まとう。',
  crash: 'ダッシュで かべに げきとつ！ ダッシュは さかみち だけに しよう。',
  battery: 'でんちが きれた！ ライトは くらい ところ だけで つかおう。',
  loop: 'おなじ ところを ぐるぐる… しれいを みなおそう。',
  timeout: 'じかんぎれ。ゴールに とどかなかった。',
};

export const MAX_TICKS = 60;

type Parsed = { w: number; h: number; grid: string[][]; x: number; y: number; dir: Facing };

export function parseMap(map: string[]): Parsed {
  const grid = map.map((r) => r.split(''));
  let x = 0;
  let y = 0;
  let dir: Facing = 0;
  grid.forEach((row, yy) =>
    row.forEach((ch, xx) => {
      const d = '>v<^'.indexOf(ch);
      if (d >= 0) {
        x = xx;
        y = yy;
        dir = d as Facing;
        row[xx] = '.';
      }
    }),
  );
  return { w: Math.max(...map.map((r) => r.length)), h: map.length, grid, x, y, dir };
}

export function simulate(level: ShireiLevelDef, program: Program): { frames: Frame[]; outcome: Outcome } {
  const p = parseMap(level.map);
  const at = (x: number, y: number) => p.grid[y]?.[x] ?? '#';
  const danger = (t: number) => {
    const c = level.crossing;
    if (!c) return false;
    const m = t % c.period;
    return m >= c.from && m <= c.to;
  };
  let { x, y, dir } = p;
  let battery = level.battery ?? 0;
  const sense = (t: number): SensorValues => {
    const [dx, dy] = VEC[dir];
    const here = at(x, y);
    const ahead = at(x + dx, y + dy);
    return {
      pochio: ahead === '#' ? 0 : 1,
      photon: here === 'b' ? 10 : 90,
      pikkari: here === '*' ? 10 : 90,
      oton: ahead === 'X' && danger(t) ? 40 : 5,
      kasso: here === '/' ? 70 : 50,
    };
  };
  const holds = (c: CondId, s: SensorValues) =>
    c === 'touch' ? s.pochio === 0 : c === 'black' ? s.photon < 50 : c === 'dark' ? s.pikkari < 50 : c === 'sound' ? s.oton > 25 : s.kasso > 60;

  const frames: Frame[] = [
    { t: 0, x, y, dir, sensors: sense(0), rule: null, act: null, light: false, battery, danger: danger(0) },
  ];
  const seen = new Set<string>();
  const period = level.crossing?.period ?? 1;

  for (let t = 0; t < MAX_TICKS; t++) {
    const sk = `${x},${y},${dir},${battery},${t % period}`;
    if (seen.has(sk)) return { frames, outcome: { status: 'fail', reason: 'loop' } };
    seen.add(sk);

    const s = sense(t);
    let rule = program.rules.findIndex((r) => holds(r.cond, s));
    const act = rule >= 0 ? program.rules[rule].act : program.otherwise;
    if (rule < 0) rule = -1;
    const here = at(x, y);
    let fail: Exclude<Outcome, { status: 'clear' }>['reason'] | null = null;
    let light = false;

    const forward = () => {
      const [dx, dy] = VEC[dir];
      if (at(x + dx, y + dy) === '#') return false;
      x += dx;
      y += dy;
      return true;
    };

    if (act === 'R' || act === 'L') {
      dir = ((dir + (act === 'R' ? 1 : 3)) % 4) as Facing;
      if (here === '*') fail = 'dark';
      else if (here !== '/') forward();
    } else if (act === 'F') {
      if (here === '*') fail = 'dark';
      else if (here !== '/') forward(); // さかみちでは すべって すすめない
    } else if (act === 'LF') {
      light = true;
      if (battery <= 0) fail = 'battery';
      else {
        battery--;
        if (here !== '/') forward();
      }
    } else if (act === 'DASH') {
      if (here === '*') fail = 'dark';
      else if (here === '/') forward();
      else if (!forward() || (at(x, y) !== 'G' && !forward())) fail = 'crash';
    }

    if (!fail && at(x, y) === 'X' && danger(t)) fail = 'cheetah';
    frames.push({ t: t + 1, x, y, dir, sensors: sense(t + 1), rule, act, light, battery, danger: danger(t + 1) });
    if (fail) return { frames, outcome: { status: 'fail', reason: fail } };
    if (at(x, y) === 'G') return { frames, outcome: { status: 'clear' } };
  }
  return { frames, outcome: { status: 'fail', reason: 'timeout' } };
}
