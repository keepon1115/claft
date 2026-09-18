'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { LineIcon } from './craft/LineIcon';

type Props = {
  /** GA4計測用の設置場所ラベル（'hero' | 'diagnosis' | 'flow' | 'hope-cta' など） */
  location: string;
  /** 縦の余白を詰めた省スペース版 */
  compact?: boolean;
  /** LINE登録でできることの補足ブロックを表示するか */
  withLineNote?: boolean;
  /** LINEボタンの下に「CLAFTという希望」ボタンを縦並びで出すか */
  withHope?: boolean;
};

// サイト全体共通の CV 導線：LINE相談を主導線に、必要な場所では「CLAFTという希望」への
// テキストリンクをその下に縦並びで添える。
export function CtaPair({ location, compact = false, withLineNote = false, withHope = false }: Props) {
  return (
    <div className={`cta-pair ${compact ? 'cta-pair--compact' : ''}`}>
      <div className="cta-pair-btn">
        <a
          className="craft-sticker craft-sticker--line"
          href="https://lin.ee/wcsFK9A"
          target="_blank"
          rel="noopener"
          onClick={() => trackEvent('cta_line_click', { location })}
        >
          <LineIcon width={20} />
          LINEで気軽に相談
        </a>
        <p className="cta-pair-note">まずは、聞くだけでも。</p>
      </div>

      {withHope && (
        <Link
          href="/claft-hope"
          className="craft-sticker craft-sticker--ghost cta-pair-hope"
          onClick={() => trackEvent('cta_hope_click', { location })}
        >
          「CLAFT」という希望 ― なぜCLAFTをつくったのか
        </Link>
      )}

      {withLineNote && (
        <p className="cd-tip cta-pair-linenote">
          LINE登録でできること：①資料をすぐ受け取る　②個別の質問　③体験日程の調整
        </p>
      )}
    </div>
  );
}
