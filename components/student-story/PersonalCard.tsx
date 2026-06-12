import type { CSSProperties } from 'react';
import { DoodleIcon, type DoodleIconName } from '@/components/craft/DoodleIcon';

export type StudentProfile = {
  name: string;
  grade: string;
  likes: string[];
  character: string;
  motivationEnv: string;
  avatarEmoji?: string;
};

type PersonalCardProps = {
  profile: StudentProfile;
};

export function PersonalCard({ profile }: PersonalCardProps) {
  return (
    <section className="py-8 px-4 reveal">
      <div className="craft-paper craft-tilt p-6" style={{ '--rot': '-0.5deg' } as CSSProperties}>
        <span className="craft-tape" aria-hidden="true" />

        {/* アバターと名前 */}
        <div className="flex items-center gap-4 mb-6">
          <div className="ss-avatar">{profile.avatarEmoji || '🌟'}</div>
          <div>
            <h2 className="heading-md mb-1">{profile.name}</h2>
            <p className="body-sm text-[var(--ink-500)]">{profile.grade}</p>
          </div>
        </div>

        {/* プロフィール項目 */}
        <div className="space-y-4">
          <ProfileItem label="好きなこと" value={profile.likes.join('、')} icon="heart" accentRgb="var(--pink-rgb)" />
          <ProfileItem label="自分のキャラ" value={profile.character} icon="sparkle" accentRgb="224 158 22" />
          <ProfileItem label="やる気が出る環境" value={profile.motivationEnv} icon="bolt" accentRgb="var(--brand-rgb)" />
        </div>
      </div>
    </section>
  );
}

function ProfileItem({
  label,
  value,
  icon,
  accentRgb
}: {
  label: string;
  value: string;
  icon: DoodleIconName;
  accentRgb: string;
}) {
  return (
    <div className="ss-item" style={{ '--accent-rgb': accentRgb } as CSSProperties}>
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color: 'rgb(var(--accent-rgb))' }} aria-hidden="true">
          <DoodleIcon name={icon} size={20} />
        </span>
        <span className="text-[var(--text-sm)] font-bold text-[var(--ink-600)]">{label}</span>
      </div>
      <p className="body-base text-[var(--ink-800)] m-0">{value}</p>
    </div>
  );
}
