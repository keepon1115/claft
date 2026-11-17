import type { SensorId } from '@/lib/sensors/characters';

// センサーズ5体のSVG。元イラスト（pukappy）の形・色に合わせて描き起こしたもの。
// ゲーム内で表情を切り替えたいので画像ではなくSVGにしている。
export type Mood = 'normal' | 'happy' | 'fire' | 'sleep';

const INK = '#1a1a1a';
const line = { stroke: INK, strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Eyes({ mood, y, dx = 14, cx = 60 }: { mood: Mood; y: number; dx?: number; cx?: number }) {
  if (mood === 'sleep') {
    return (
      <g fill="none" {...line} strokeWidth={2.5}>
        <path d={`M${cx - dx - 5} ${y} q5 4 10 0`} />
        <path d={`M${cx + dx - 5} ${y} q5 4 10 0`} />
      </g>
    );
  }
  if (mood === 'happy') {
    return (
      <g fill="none" {...line} strokeWidth={2.5}>
        <path d={`M${cx - dx - 5} ${y + 2} q5 -6 10 0`} />
        <path d={`M${cx + dx - 5} ${y + 2} q5 -6 10 0`} />
      </g>
    );
  }
  if (mood === 'fire') {
    const flame = (x: number) => (
      <path
        d={`M${x} ${y - 9} c5 5 7 8 7 12 a7 7 0 0 1 -14 0 c0 -3 2 -5 3 -7 c1 2 2 3 3 3 c0 -3 0 -5 1 -8z`}
        fill="#ff7a00"
        stroke="#e02800"
        strokeWidth={1.5}
      />
    );
    return (
      <g>
        {flame(cx - dx)}
        {flame(cx + dx)}
      </g>
    );
  }
  return (
    <g fill={INK}>
      <circle cx={cx - dx} cy={y} r={2.6} />
      <circle cx={cx + dx} cy={y} r={2.6} />
    </g>
  );
}

function Zzz() {
  return (
    <text x="92" y="22" fontSize="16" fontWeight="700" fill="#7a8aa0" fontFamily="sans-serif">
      z z
    </text>
  );
}

function Pochio({ mood }: { mood: Mood }) {
  const c = '#ff2a1f';
  return (
    <g>
      <path d="M92 104 c16 2 22 -10 16 -20 c-5 -8 2 -16 12 -12" fill="none" stroke={c} strokeWidth={5} strokeLinecap="round" />
      <ellipse cx="30" cy="92" rx="10" ry="13" fill={c} />
      <ellipse cx="90" cy="92" rx="10" ry="13" fill={c} />
      <ellipse cx="47" cy="128" rx="11" ry="9" fill={c} />
      <ellipse cx="73" cy="128" rx="11" ry="9" fill={c} />
      <rect x="50" y="8" width="20" height="16" fill="#fff" {...line} />
      <rect x="30" y="22" width="60" height="104" rx="7" fill="#fff" {...line} />
      {mood !== 'sleep' && mood !== 'happy' && (
        <g fill="none" {...line} strokeWidth={2.5}>
          <path d="M43 56 l8 4" />
          <path d="M77 56 l-8 4" />
        </g>
      )}
      <Eyes mood={mood} y={68} />
      <path d="M54 76 q6 6 12 0" fill="none" {...line} strokeWidth={2.5} />
    </g>
  );
}

function Kasso({ mood }: { mood: Mood }) {
  const c = '#4c8a1e';
  return (
    <g>
      <path
        d="M92 100 c14 4 20 -6 12 -10 c-8 -4 -12 6 -2 8 c12 2 16 -12 8 -16 c-8 -3 -11 7 -2 8 c11 1 14 -12 6 -16 c-6 -3 -9 5 -3 7 c8 2 11 -8 6 -14"
        fill="none"
        stroke={c}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path d="M30 62 c-8 -6 -16 -8 -20 -4 c4 6 12 10 20 10z" fill={c} />
      <path d="M90 62 c8 -6 16 -8 20 -4 c-4 6 -12 10 -20 10z" fill={c} />
      <path d="M46 112 c-3 10 -4 18 -1 22 c5 -2 8 -10 8 -22z" fill={c} />
      <path d="M74 112 c3 10 4 18 1 22 c-5 -2 -8 -10 -8 -22z" fill={c} />
      <rect x="30" y="14" width="60" height="100" rx="7" fill="#fff" {...line} />
      {mood !== 'sleep' && mood !== 'happy' && (
        <g fill="none" {...line} strokeWidth={2.2}>
          <path d="M45 42 l8 4" />
          <path d="M75 42 l-8 4" />
        </g>
      )}
      <Eyes mood={mood} y={52} dx={12} />
      <path d="M55 60 q5 7 10 0z" fill="#f0387a" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <text x="60" y="92" textAnchor="middle" fontSize="15" fill={INK} fontFamily="sans-serif" letterSpacing="3">
        XYZ
      </text>
    </g>
  );
}

function Photon({ mood }: { mood: Mood }) {
  const c = '#7ae9f2';
  return (
    <g>
      <path d="M92 108 l8 -8 l4 8 l8 -10 l4 8 l6 -12" fill="none" stroke={c} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 92 c-8 2 -12 8 -12 12 c6 0 12 -3 14 -8z" fill={c} stroke={INK} strokeWidth={1.5} />
      <path d="M96 92 c8 2 12 8 12 12 c-6 0 -12 -3 -14 -8z" fill={c} stroke={INK} strokeWidth={1.5} />
      <path d="M52 118 v14 a4 4 0 0 0 8 0 a4 4 0 0 0 8 0 v-14z" fill={c} stroke={INK} strokeWidth={1.5} />
      <rect x="22" y="40" width="76" height="80" rx="7" fill="#fff" {...line} />
      <path d="M22 78 h76" {...line} strokeWidth={2} />
      <rect x="44" y="68" width="17" height="18" fill="#fff" stroke={INK} strokeWidth={2} />
      <rect x="61" y="68" width="17" height="18" fill="#ffd27a" stroke={INK} strokeWidth={2} />
      <Eyes mood={mood === 'fire' ? 'normal' : mood} y={78} dx={8} cx={61} />
      <ellipse cx="36" cy="90" rx="5" ry="2.5" fill="#ff9ec4" />
      <ellipse cx="86" cy="90" rx="5" ry="2.5" fill="#ff9ec4" />
      <path d="M56 93 q5 5 10 0" fill="none" {...line} strokeWidth={2.2} />
      <g transform="rotate(14 80 34)">
        <ellipse cx="80" cy="40" rx="30" ry="7" fill={c} stroke={INK} strokeWidth={2} />
        <path d="M62 40 c0 -22 36 -22 36 0z" fill={c} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        <path d="M62 37 c8 5 28 5 36 0" fill="none" stroke="#f5b041" strokeWidth={4} />
      </g>
    </g>
  );
}

function Pikkari({ mood }: { mood: Mood }) {
  const c = '#ffc45c';
  return (
    <g>
      <path d="M96 104 c14 4 22 -8 14 -18 c-8 -10 4 -22 12 -14" fill="none" stroke={c} strokeWidth={5} strokeLinecap="round" />
      <ellipse cx="24" cy="92" rx="11" ry="14" fill={c} stroke={INK} strokeWidth={2} />
      <ellipse cx="96" cy="92" rx="11" ry="14" fill={c} stroke={INK} strokeWidth={2} />
      <ellipse cx="48" cy="126" rx="12" ry="9" fill={c} stroke={INK} strokeWidth={2} />
      <ellipse cx="72" cy="126" rx="12" ry="9" fill={c} stroke={INK} strokeWidth={2} />
      <rect x="24" y="40" width="72" height="82" rx="8" fill="#fff" {...line} />
      {mood === 'sleep' ? (
        <Eyes mood="sleep" y={70} dx={16} />
      ) : (
        <g fill="none" {...line} strokeWidth={2.5}>
          <path d="M40 64 l8 5 l-8 5" />
          <path d="M80 64 l-8 5 l8 5" />
        </g>
      )}
      <ellipse cx="36" cy="80" rx="5" ry="2.5" fill="#ff9ec4" />
      <ellipse cx="84" cy="80" rx="5" ry="2.5" fill="#ff9ec4" />
      {mood === 'sleep' ? (
        <path d="M55 82 q5 3 10 0" fill="none" {...line} strokeWidth={2.2} />
      ) : (
        <path d="M54 72 a6 6 0 0 1 12 0 v8 a6 6 0 0 1 -12 0z" fill="#ff2f5f" stroke={INK} strokeWidth={2} />
      )}
      <rect x="38" y="98" width="46" height="13" rx="2" fill={c} stroke={INK} strokeWidth={2} />
      <rect x="34" y="101" width="4" height="7" fill="#fff" stroke={INK} strokeWidth={1.5} />
      <path d="M63 99 l-6 6 h4 l-2 5 l7 -7 h-4z" fill="#ffe600" stroke={INK} strokeWidth={1} strokeLinejoin="round" />
    </g>
  );
}

function Oton({ mood }: { mood: Mood }) {
  const c = '#a31cf0';
  return (
    <g>
      <path d="M90 108 c12 2 16 -6 10 -12 c-6 -6 2 -12 8 -10 c8 2 8 -10 2 -14" fill="none" stroke={c} strokeWidth={5} strokeLinecap="round" />
      <ellipse cx="32" cy="98" rx="10" ry="12" fill={c} stroke={INK} strokeWidth={2} />
      <ellipse cx="88" cy="98" rx="10" ry="12" fill={c} stroke={INK} strokeWidth={2} />
      <ellipse cx="50" cy="130" rx="11" ry="8" fill={c} stroke={INK} strokeWidth={2} />
      <ellipse cx="70" cy="130" rx="11" ry="8" fill={c} stroke={INK} strokeWidth={2} />
      <path d="M33 44 c0 -40 54 -40 54 0z" fill="#666" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <g stroke="#2a2a2a" strokeWidth={1.2} opacity={0.75}>
        <path d="M38 40 l22 -24 M48 42 l24 -24 M60 42 l20 -18 M72 42 l12 -10 M82 40 l-22 -24 M72 42 l-24 -24 M60 42 l-20 -18 M48 42 l-12 -10" />
      </g>
      <rect x="32" y="42" width="56" height="6" rx="2" fill="#9a8f8f" stroke={INK} strokeWidth={1.5} />
      <rect x="33" y="48" width="54" height="80" rx="6" fill="#fff" {...line} />
      {mood === 'happy' ? (
        <Eyes mood="happy" y={84} dx={9} />
      ) : mood === 'sleep' ? (
        <Eyes mood="sleep" y={84} dx={9} />
      ) : (
        <g fill="none" {...line} strokeWidth={2.2}>
          <path d="M52 80 l-3 7" />
          <path d="M68 80 l3 7" />
        </g>
      )}
      <path d="M56 92 q4 4 8 0" fill="none" {...line} strokeWidth={2.2} />
      <g fill={c}>
        <path d="M100 30 v-12 l10 -3 v12 a4 3 0 1 1 -2 -2.6 v-6.5 l-6 1.8 v10.3 a4 3 0 1 1 -2 -2.6z" />
      </g>
    </g>
  );
}

const PARTS: Record<SensorId, (p: { mood: Mood }) => JSX.Element> = {
  pochio: Pochio,
  kasso: Kasso,
  photon: Photon,
  pikkari: Pikkari,
  oton: Oton,
};

export function SensorChar({
  id,
  mood = 'normal',
  size = 96,
  className,
  title,
}: {
  id: SensorId;
  mood?: Mood;
  size?: number | string;
  className?: string;
  title?: string;
}) {
  const Part = PARTS[id];
  return (
    <svg
      viewBox="0 0 124 142"
      width={size}
      height={typeof size === 'number' ? (size * 142) / 124 : undefined}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <Part mood={mood} />
      {mood === 'sleep' && <Zzz />}
    </svg>
  );
}
