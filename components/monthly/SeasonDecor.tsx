import { Season } from '@/lib/monthlyData';

interface Props {
  season: Season;
  className?: string;
}

function HydrangeaDecor() {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* 傘 */}
      <ellipse cx="60" cy="38" rx="30" ry="20" fill="#7ec8c4" opacity="0.35" />
      <path d="M60 38 Q45 55 42 72" stroke="#5ba8a4" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M42 72 Q43 74 45 72 Q46 74 48 72" stroke="#5ba8a4" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* 紫陽花の花 */}
      <circle cx="20" cy="70" r="5" fill="#9b87f5" opacity="0.5" />
      <circle cx="28" cy="65" r="4.5" fill="#b89eff" opacity="0.5" />
      <circle cx="14" cy="62" r="4" fill="#7ec8c4" opacity="0.5" />
      <circle cx="22" cy="60" r="4" fill="#9b87f5" opacity="0.4" />
      <circle cx="30" cy="73" r="4.5" fill="#b89eff" opacity="0.4" />
      {/* 雨粒 */}
      <ellipse cx="85" cy="20" rx="2" ry="4" fill="#7ec8c4" opacity="0.4" transform="rotate(-15 85 20)" />
      <ellipse cx="95" cy="35" rx="2" ry="4" fill="#7ec8c4" opacity="0.3" transform="rotate(-15 95 35)" />
      <ellipse cx="105" cy="15" rx="1.5" ry="3.5" fill="#7ec8c4" opacity="0.35" transform="rotate(-15 105 15)" />
      <ellipse cx="78" cy="48" rx="1.5" ry="3.5" fill="#9b87f5" opacity="0.3" transform="rotate(-15 78 48)" />
    </svg>
  );
}

function KoinoboriDecor() {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* ポール */}
      <line x1="30" y1="10" x2="30" y2="90" stroke="#a0c4a0" strokeWidth="2" opacity="0.5" />
      {/* 吹き流し */}
      <path d="M30 14 Q50 16 52 20 Q50 24 30 26 Z" fill="#f06a6a" opacity="0.45" />
      {/* 大こいのぼり（黒） */}
      <path d="M30 30 Q65 27 70 38 Q65 50 30 48 Z" fill="#555" opacity="0.3" />
      <circle cx="37" cy="39" r="3" fill="#fff" opacity="0.5" />
      {/* 中こいのぼり（赤） */}
      <path d="M30 52 Q58 49 62 58 Q58 67 30 65 Z" fill="#f06a6a" opacity="0.35" />
      <circle cx="37" cy="58" r="2.5" fill="#fff" opacity="0.5" />
      {/* 新緑の葉 */}
      <ellipse cx="90" cy="30" rx="9" ry="6" fill="#4caf82" opacity="0.35" transform="rotate(-30 90 30)" />
      <ellipse cx="100" cy="50" rx="8" ry="5" fill="#58c3a2" opacity="0.3" transform="rotate(20 100 50)" />
      <ellipse cx="85" cy="65" rx="7" ry="4.5" fill="#4caf82" opacity="0.3" transform="rotate(-10 85 65)" />
    </svg>
  );
}

function SakuraDecor() {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="40" cy="50" r="8" fill="#f8bbd0" opacity="0.5" />
      <circle cx="80" cy="30" r="6" fill="#f48fb1" opacity="0.4" />
      <circle cx="100" cy="65" r="7" fill="#f8bbd0" opacity="0.45" />
    </svg>
  );
}

function SunflowerDecor() {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="60" cy="50" r="14" fill="#ffd66b" opacity="0.5" />
      <circle cx="60" cy="50" r="7" fill="#c8862a" opacity="0.5" />
    </svg>
  );
}

function MapleDecor() {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="60,10 70,30 90,25 75,45 85,65 60,55 35,65 45,45 30,25 50,30" fill="#e07b39" opacity="0.4" />
    </svg>
  );
}

function SnowflakeDecor() {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="60" y1="20" x2="60" y2="80" stroke="#5b8def" strokeWidth="2" opacity="0.4" />
      <line x1="30" y1="35" x2="90" y2="65" stroke="#5b8def" strokeWidth="2" opacity="0.4" />
      <line x1="30" y1="65" x2="90" y2="35" stroke="#5b8def" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

const decorMap: Record<Season, React.FC> = {
  spring: SakuraDecor,
  'early-summer': KoinoboriDecor,
  rainy: HydrangeaDecor,
  summer: SunflowerDecor,
  autumn: MapleDecor,
  winter: SnowflakeDecor,
};

export default function SeasonDecor({ season, className = '' }: Props) {
  const Decor = decorMap[season];
  return (
    <div className={className} aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <Decor />
    </div>
  );
}
