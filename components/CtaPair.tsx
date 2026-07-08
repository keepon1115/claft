'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

type Props = {
  /** GA4計測用の設置場所ラベル（'hero' | 'diagnosis' | 'flow' | 'hope-cta' など） */
  location: string;
  /** 縦の余白を詰めた省スペース版 */
  compact?: boolean;
  /** LINE登録でできることの補足ブロックを表示するか */
  withLineNote?: boolean;
};

// サイト全体共通の CV 導線：LINE相談｜無料体験申込 の並列2択。
export function CtaPair({ location, compact = false, withLineNote = false }: Props) {
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
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          LINEで気軽に相談
        </a>
        <p className="cta-pair-note">まずは、聞くだけでも。</p>
      </div>

      <div className="cta-pair-btn">
        <Link
          className="craft-sticker"
          href="/contact?type=taiken"
          onClick={() => trackEvent('cta_taiken_click', { location })}
        >
          1ヶ月無料体験に申し込む
        </Link>
      </div>

      {withLineNote && (
        <p className="cd-tip cta-pair-linenote">
          LINE登録でできること：①資料をすぐ受け取る　②個別の質問　③体験日程の調整
        </p>
      )}
    </div>
  );
}
