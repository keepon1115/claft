import Image from 'next/image';
import campaignImg from '@/public/lab-icons/campaign.png';

// 掲載期限（JST・YYYY-MM-DD）。この日を過ぎたら自動で非表示になる。
// ストーリーの visibleUntil（lib/lab/content.ts）と同じ考え方。
const VISIBLE_UNTIL = '2026-12-31';

const LINE_URL = 'https://lin.ee/OUvutfN';

// フィード常設：紹介割キャンペーンの固定カード。
// カード全体が1つのLINEリンク。左に正方形の告知画像、右に文言そのものを兼ねた緑ボタン。
export function LabCampaignCard() {
  const todayJst = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  if (VISIBLE_UNTIL < todayJst) return null;

  return (
    <a className="lab-campaign" href={LINE_URL} target="_blank" rel="noopener noreferrer">
      <Image
        className="lab-campaign-img"
        src={campaignImg}
        alt="12月までの紹介割キャンペーン！お友だちを紹介すると初月受講料20%OFF"
        sizes="(max-width: 480px) 63vw, 300px"
      />
      <span className="lab-campaign-body">
        <span className="lab-campaign-btn">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3C6.75 3 2.5 6.55 2.5 10.9c0 3.9 3.36 7.17 7.9 7.8.3.06.7.2.8.46.1.24.06.62.03.87l-.13 1c-.04.3-.24 1.16 1.02.63 1.26-.53 6.8-4 9.27-6.85 1.7-1.87 2.51-3.77 2.51-5.91C23.9 6.55 19.65 3 14.4 3z" />
          </svg>
          <span className="lab-campaign-btn-text">
            紹介割希望
            <br />
            の方はLINEで！
          </span>
        </span>
      </span>
    </a>
  );
}
