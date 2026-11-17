import type { SensorId } from '@/lib/sensors/characters';

// センサーズ・パズルのルール本体（純粋関数）。画面（PuzzleGame.tsx）と
// 解けるかの検証（scripts/sensors-verify.ts）の両方がこのファイルを使う。
//
// マップの記号:
//   #  かべ          .  ゆか           G  ゴール
//   o  あな          B  はこ           S  スイッチ（ぽちおが ぶつかると ドアが きりかわる）
//   D  しまったドア   d  あいたドア      ~  かくれた ゆか（フォットんが みると あらわれる）
//   *  くらい ゆか    Z  みはりロボ
//   1 ぽちお  2 かっそー  3 フォットん  4 ピッカリー  5 おとん
//
// キャラごとのルール:
//   ぽちお     … はこを おせる。スイッチを おせる。
//   かっそー   … とまれない（なにかに あたるまで すべる）。あなは とびこえる。
//   フォットん … たて・よこの まっすぐ さきに ある「かくれた ゆか」を みつける（いちど みたら きえない）。
//   ピッカリー … まわり2マスを てらす。くらい ゆかは てらされて いないと ほかの こは はいれない。
//   おとん     … 2マス いないの みはりロボを うたで ねむらせる（はなれると おきる）。

export type Dir = 'U' | 'D' | 'L' | 'R';
export const DIRS: Record<Dir, [number, number]> = { U: [0, -1], D: [0, 1], L: [-1, 0], R: [1, 0] };

export type Tile = 'wall' | 'floor' | 'goal' | 'pit' | 'hidden' | 'dark' | 'switch' | 'doorC' | 'doorO' | 'guard';

export type LevelDef = {
  id: string;
  title: string;
  hint: string;
  /** めやすの てかず（検証スクリプトで もとめた 最少手数。p10 だけは 模範手順の 手数） */
  par: number;
  map: string[];
};

export type Level = LevelDef & {
  w: number;
  h: number;
  tiles: Tile[][];
  start: State;
};

export type CharState = { id: SensorId; x: number; y: number; out: boolean };

export type State = {
  chars: CharState[];
  boxes: string[];
  filled: string[];
  revealed: string[];
  flipped: boolean;
  moves: number;
};

export type BlockReason = 'wall' | 'pit' | 'dark' | 'watch' | 'door' | 'char' | 'box' | 'guard';
export type StepEvent =
  | { type: 'move' }
  | { type: 'slide'; length: number }
  | { type: 'push'; filled: boolean }
  | { type: 'switch' }
  | { type: 'blocked'; reason: BlockReason };

export type StepResult = { state: State | null; event: StepEvent; goal: boolean };

const CHAR_OF: Record<string, SensorId> = { '1': 'pochio', '2': 'kasso', '3': 'photon', '4': 'pikkari', '5': 'oton' };
const TILE_OF: Record<string, Tile> = {
  '#': 'wall',
  '.': 'floor',
  G: 'goal',
  o: 'pit',
  B: 'floor',
  S: 'switch',
  D: 'doorC',
  d: 'doorO',
  '~': 'hidden',
  '*': 'dark',
  Z: 'guard',
};

export const key = (x: number, y: number) => `${x},${y}`;

export function parseLevel(def: LevelDef): Level {
  const h = def.map.length;
  const w = Math.max(...def.map.map((r) => r.length));
  const tiles: Tile[][] = [];
  const chars: CharState[] = [];
  const boxes: string[] = [];
  for (let y = 0; y < h; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < w; x++) {
      const ch = def.map[y][x] ?? '#';
      if (CHAR_OF[ch]) {
        chars.push({ id: CHAR_OF[ch], x, y, out: false });
        row.push('floor');
      } else {
        if (ch === 'B') boxes.push(key(x, y));
        const t = TILE_OF[ch];
        if (!t) throw new Error(`unknown tile "${ch}" in level ${def.id}`);
        row.push(t);
      }
    }
    tiles.push(row);
  }
  chars.sort((a, b) => order(a.id) - order(b.id));
  const level: Level = { ...def, w, h, tiles, start: null as unknown as State };
  const start: State = { chars, boxes: boxes.sort(), filled: [], revealed: [], flipped: false, moves: 0 };
  level.start = { ...start, revealed: reveal(level, start) };
  return level;
}

const ORDER: SensorId[] = ['pochio', 'kasso', 'photon', 'pikkari', 'oton'];
const order = (id: SensorId) => ORDER.indexOf(id);

export function tileAt(level: Level, x: number, y: number): Tile {
  if (x < 0 || y < 0 || x >= level.w || y >= level.h) return 'wall';
  return level.tiles[y][x];
}

const find = (s: State, id: SensorId) => s.chars.find((c) => c.id === id && !c.out);

/** ドアが いま しまって いるか */
export function doorClosed(level: Level, s: State, x: number, y: number) {
  const t = tileAt(level, x, y);
  return (t === 'doorC' && !s.flipped) || (t === 'doorO' && s.flipped);
}

/** あなとして ふるまう マスか（うめて いない あな／みつけて いない かくれた ゆか） */
export function isHole(level: Level, s: State, x: number, y: number) {
  const t = tileAt(level, x, y);
  const k = key(x, y);
  if (t === 'pit') return !s.filled.includes(k);
  if (t === 'hidden') return !s.revealed.includes(k) && !s.filled.includes(k);
  return false;
}

/** くらい ゆかが てらされて いるか（ピッカリーの まわり2マス） */
export function isLit(s: State, x: number, y: number, pik = find(s, 'pikkari')) {
  return !!pik && Math.max(Math.abs(pik.x - x), Math.abs(pik.y - y)) <= 2;
}

/** みはりロボが ねむって いるか（おとんが 2マス いない） */
export function guardAsleep(s: State, gx: number, gy: number, oton = find(s, 'oton')) {
  return !!oton && Math.abs(oton.x - gx) + Math.abs(oton.y - gy) <= 2;
}

/** おきている みはりロボの となりか */
export function isWatched(level: Level, s: State, x: number, y: number, oton = find(s, 'oton')) {
  for (const [dx, dy] of Object.values(DIRS)) {
    const gx = x + dx;
    const gy = y + dy;
    if (tileAt(level, gx, gy) === 'guard' && !guardAsleep(s, gx, gy, oton)) return true;
  }
  return false;
}

function solidReason(level: Level, s: State, x: number, y: number): BlockReason | null {
  const t = tileAt(level, x, y);
  if (t === 'wall' || t === 'switch') return 'wall';
  if (t === 'guard') return 'guard';
  if (doorClosed(level, s, x, y)) return 'door';
  if (s.boxes.includes(key(x, y))) return 'box';
  if (s.chars.some((c) => !c.out && c.x === x && c.y === y)) return 'char';
  return null;
}

/** そのキャラが (x,y) に はいれない りゆう。はいれるなら null */
function blockReason(level: Level, s: State, c: CharState, x: number, y: number): BlockReason | null {
  const solid = solidReason(level, s, x, y);
  if (solid) return solid;
  if (isHole(level, s, x, y)) return 'pit';
  if (tileAt(level, x, y) === 'dark' && c.id !== 'pikkari' && !isLit(s, x, y)) return 'dark';
  // おとんは はいった さきで うたうので、みはりロボの となりでも へいき
  const oton = c.id === 'oton' ? { ...c, x, y } : undefined;
  if (isWatched(level, s, x, y, oton ?? find(s, 'oton'))) return 'watch';
  return null;
}

/** フォットんが みつけた かくれた ゆか（いままでの ぶんも ふくむ） */
function reveal(level: Level, s: State): string[] {
  const p = find(s, 'photon');
  if (!p) return s.revealed;
  let out = s.revealed;
  for (const [dx, dy] of Object.values(DIRS)) {
    let x = p.x + dx;
    let y = p.y + dy;
    while (true) {
      const t = tileAt(level, x, y);
      if (t === 'wall' || t === 'switch' || t === 'guard' || doorClosed(level, s, x, y)) break;
      if (s.boxes.includes(key(x, y))) break;
      if (t === 'hidden' && !out.includes(key(x, y))) out = [...out, key(x, y)].sort();
      x += dx;
      y += dy;
    }
  }
  return out;
}

function finish(level: Level, s: State, idx: number, event: StepEvent): StepResult {
  const c = s.chars[idx];
  const goal = tileAt(level, c.x, c.y) === 'goal';
  const chars = goal ? s.chars.map((v, i) => (i === idx ? { ...v, out: true } : v)) : s.chars;
  const next: State = { ...s, chars, moves: s.moves + 1 };
  return { state: { ...next, revealed: reveal(level, next) }, event, goal };
}

const withChar = (s: State, idx: number, x: number, y: number): State => ({
  ...s,
  chars: s.chars.map((v, i) => (i === idx ? { ...v, x, y } : v)),
});

export function step(level: Level, s: State, idx: number, dir: Dir): StepResult {
  const c = s.chars[idx];
  const [dx, dy] = DIRS[dir];
  const blocked = (reason: BlockReason): StepResult => ({ state: null, event: { type: 'blocked', reason }, goal: false });
  if (!c || c.out) return blocked('wall');
  const tx = c.x + dx;
  const ty = c.y + dy;

  if (c.id === 'kasso') {
    let x = c.x;
    let y = c.y;
    let length = 0;
    let reason: BlockReason = 'wall';
    while (true) {
      // あなが つづく あいだは とびこえて、その さきの マスを みる
      let nx = x + dx;
      let ny = y + dy;
      let jumped = 0;
      while (isHole(level, s, nx, ny)) {
        nx += dx;
        ny += dy;
        jumped++;
      }
      const r = blockReason(level, s, c, nx, ny);
      if (r) {
        reason = jumped ? 'pit' : r;
        break;
      }
      x = nx;
      y = ny;
      length += jumped + 1;
      if (tileAt(level, x, y) === 'goal') break;
    }
    if (!length) return blocked(reason);
    return finish(level, withChar(s, idx, x, y), idx, { type: 'slide', length });
  }

  if (c.id === 'pochio') {
    if (tileAt(level, tx, ty) === 'switch') {
      const next = { ...s, flipped: !s.flipped, moves: s.moves + 1 };
      return { state: { ...next, revealed: reveal(level, next) }, event: { type: 'switch' }, goal: false };
    }
    const bk = key(tx, ty);
    if (s.boxes.includes(bk)) {
      const bx = tx + dx;
      const by = ty + dy;
      const r = solidReason(level, s, bx, by);
      if (r) return blocked(r === 'wall' ? 'box' : r);
      if (tileAt(level, bx, by) === 'goal') return blocked('box');
      const fill = isHole(level, s, bx, by);
      const boxes = s.boxes.filter((b) => b !== bk);
      const pushed: State = fill
        ? { ...s, boxes, filled: [...s.filled, key(bx, by)].sort() }
        : { ...s, boxes: [...boxes, key(bx, by)].sort() };
      const r2 = blockReason(level, pushed, c, tx, ty);
      if (r2) return blocked(r2);
      return finish(level, withChar(pushed, idx, tx, ty), idx, { type: 'push', filled: fill });
    }
  }

  const r = blockReason(level, s, c, tx, ty);
  if (r) return blocked(r);
  return finish(level, withChar(s, idx, tx, ty), idx, { type: 'move' });
}

export const isCleared = (s: State) => s.chars.every((c) => c.out);

export function stateKey(s: State) {
  return (
    s.chars.map((c) => (c.out ? 'x' : key(c.x, c.y))).join('|') +
    `/${s.boxes.join(';')}/${s.filled.join(';')}/${s.revealed.join(';')}/${s.flipped ? 1 : 0}`
  );
}

/** はば優先で 最少手数の 手順を さがす（検証用） */
export function solve(level: Level, limit = 400000): { moves: number; path: string } | null {
  const seen = new Set<string>([stateKey(level.start)]);
  let frontier: { s: State; path: string }[] = [{ s: level.start, path: '' }];
  while (frontier.length) {
    const next: typeof frontier = [];
    for (const { s, path } of frontier) {
      for (let i = 0; i < s.chars.length; i++) {
        if (s.chars[i].out) continue;
        for (const d of Object.keys(DIRS) as Dir[]) {
          const r = step(level, s, i, d);
          if (!r.state) continue;
          const k = stateKey(r.state);
          if (seen.has(k)) continue;
          seen.add(k);
          const p = `${path}${i + 1}${d} `;
          if (isCleared(r.state)) return { moves: r.state.moves, path: p.trim() };
          next.push({ s: r.state, path: p });
        }
      }
    }
    if (seen.size > limit) return null;
    frontier = next;
  }
  return null;
}
